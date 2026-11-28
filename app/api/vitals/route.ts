import { NextResponse } from "next/server";
import { kvIncrementRateLimit } from "@/lib/server/kv";
import { kvReadVitals, kvRecordVital } from "@/lib/server/vitals-kv";
import { isAutomatedUserAgent } from "@/lib/vitals-filter";
import {
  getTelemetrySummary,
  recordTelemetrySample,
  summarizeVitals,
  VitalsBeaconSchema,
} from "@/lib/vitals-store";

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = VitalsBeaconSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Strict schema validation failed." },
      { status: 400 }
    );
  }

  // v7.1 block 2: crawlers, CI and lab runs are acknowledged but not counted.
  if (isAutomatedUserAgent(req.headers.get("user-agent"))) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const entry = parsed.data;
  // Upstash when configured (shared, kept 30 days); this instance's memory otherwise.
  if (!(await kvRecordVital(entry))) recordTelemetrySample(entry);

  // Optional Upstash Redis counter aggregation when configured (never stores PII)
  await kvIncrementRateLimit(`rum:route:${entry.routeGroup}`, 60 * 60 * 24 * 30);
  if (entry.interactionTarget) {
    await kvIncrementRateLimit(`rum:target:${entry.interactionTarget}`, 60 * 60 * 24 * 30);
  }

  return NextResponse.json({ ok: true, stored: true });
}

export async function GET() {
  const snapshot = await kvReadVitals();
  return NextResponse.json({
    ok: true,
    summary: snapshot ? summarizeVitals(snapshot, "kv") : getTelemetrySummary(),
  });
}
