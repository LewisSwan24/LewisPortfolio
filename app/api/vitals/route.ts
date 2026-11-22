import { NextResponse } from "next/server";
import { kvIncrementRateLimit } from "@/lib/server/kv";
import {
  getTelemetrySummary,
  recordTelemetrySample,
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

  const entry = parsed.data;
  recordTelemetrySample(entry);

  // Optional Upstash Redis counter aggregation when configured (never stores PII)
  await kvIncrementRateLimit(`rum:route:${entry.routeGroup}`, 60 * 60 * 24 * 30);
  if (entry.interactionTarget) {
    await kvIncrementRateLimit(`rum:target:${entry.interactionTarget}`, 60 * 60 * 24 * 30);
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    summary: getTelemetrySummary(),
  });
}
