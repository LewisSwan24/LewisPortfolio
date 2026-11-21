import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  CreateBriefInputSchema,
  decodeStatelessBrief,
  encodeStatelessBrief,
  generateShortBriefId,
  isShortBriefId,
  type BriefPayload,
} from "@/lib/server/brief-codec";
import { isKvConfigured, kvGetBriefViews, kvGetJson, kvSetJson } from "@/lib/server/kv";

function isAuthorized(req: Request): boolean {
  const configuredSecret = process.env.PORTFOLIO_ADMIN_SECRET?.trim();
  if (!configuredSecret) return true;

  const authHeader = req.headers.get("authorization") ?? "";
  const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  const candidate = bearer || req.headers.get("x-admin-secret")?.trim() || "";
  if (!candidate) return false;

  const a = Buffer.from(candidate, "utf8");
  const b = Buffer.from(configuredSecret, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized: valid admin secret required." },
      { status: 401 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = CreateBriefInputSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", issues: parsed.error.issues.map((i) => i.message) },
      { status: 400 }
    );
  }

  const payload: BriefPayload = {
    ...parsed.data,
    createdAt: new Date().toISOString(),
  };

  if (isKvConfigured()) {
    const shortId = generateShortBriefId();
    const saved = await kvSetJson(`brief:v1:${shortId}`, payload);
    if (saved) {
      return NextResponse.json({
        ok: true,
        mode: "kv",
        id: shortId,
        url: `/${payload.locale}/brief/${shortId}`,
      });
    }
  }

  const token = encodeStatelessBrief(payload, process.env.PORTFOLIO_ADMIN_SECRET);
  return NextResponse.json({
    ok: true,
    mode: "stateless",
    id: token,
    url: `/${payload.locale}/brief/${token}`,
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")?.trim();
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing brief id." }, { status: 400 });
  }

  if (id.startsWith("s_")) {
    const payload = decodeStatelessBrief(id, process.env.PORTFOLIO_ADMIN_SECRET);
    if (!payload) {
      return NextResponse.json({ ok: false, error: "Brief not found or invalid signature." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, mode: "stateless", id, payload, views: null });
  }

  if (!isShortBriefId(id) || !isKvConfigured()) {
    return NextResponse.json({ ok: false, error: "Brief not found." }, { status: 404 });
  }

  const payload = await kvGetJson<BriefPayload>(`brief:v1:${id}`);
  if (!payload) {
    return NextResponse.json({ ok: false, error: "Brief not found." }, { status: 404 });
  }
  const views = await kvGetBriefViews(id);
  return NextResponse.json({ ok: true, mode: "kv", id, payload, views });
}
