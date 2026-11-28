/**
 * Lightweight Upstash Redis / Vercel KV REST client.
 * Uses native Web Fetch so zero extra runtime dependencies are bundled,
 * and returns null gracefully whenever KV environment variables are absent.
 */

const BRIEF_TTL_SECONDS = 60 * 60 * 24 * 60; // 60 days

interface KvConfig {
  url: string;
  token: string;
}

export function getKvConfig(): KvConfig | null {
  // Vercel's storage integration may add the KV_REST_API_* names instead.
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  const url = upstashUrl && upstashToken ? upstashUrl : process.env.KV_REST_API_URL?.trim();
  const token = upstashUrl && upstashToken ? upstashToken : process.env.KV_REST_API_TOKEN?.trim();
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

export function isKvConfigured(): boolean {
  return getKvConfig() !== null;
}

export async function kvPipeline(commands: Array<Array<string | number>>): Promise<Array<{ result?: unknown }> | null> {
  const cfg = getKvConfig();
  if (!cfg) return null;

  try {
    const res = await fetch(`${cfg.url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as Array<{ result?: unknown }>;
  } catch {
    return null;
  }
}

export async function kvGetJson<T>(key: string): Promise<T | null> {
  const results = await kvPipeline([["GET", key]]);
  const raw = results?.[0]?.result;
  if (typeof raw !== "string" || !raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function kvSetJson<T>(
  key: string,
  value: T,
  ttlSeconds: number = BRIEF_TTL_SECONDS
): Promise<boolean> {
  const results = await kvPipeline([
    ["SET", key, JSON.stringify(value), "EX", ttlSeconds],
  ]);
  return results?.[0]?.result === "OK";
}

export async function kvRecordBriefView(
  shortId: string
): Promise<{ count: number; lastViewedAt: string } | null> {
  const key = `brief:views:${shortId}`;
  const now = new Date().toISOString();
  const results = await kvPipeline([
    ["HINCRBY", key, "count", 1],
    ["HSET", key, "lastViewedAt", now],
    ["EXPIRE", key, BRIEF_TTL_SECONDS],
  ]);
  const count = Number(results?.[0]?.result);
  if (!Number.isFinite(count)) return null;
  return { count, lastViewedAt: now };
}

export async function kvGetBriefViews(
  shortId: string
): Promise<{ count: number; lastViewedAt: string } | null> {
  const key = `brief:views:${shortId}`;
  const results = await kvPipeline([["HGETALL", key]]);
  const raw = results?.[0]?.result;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const map: Record<string, string> = {};
  for (let i = 0; i + 1 < raw.length; i += 2) {
    map[String(raw[i])] = String(raw[i + 1]);
  }
  const count = Number(map.count ?? "0");
  if (!Number.isFinite(count)) return null;
  return { count, lastViewedAt: map.lastViewedAt ?? "" };
}

export async function kvIncrementRateLimit(
  key: string,
  windowSeconds: number
): Promise<number | null> {
  const results = await kvPipeline([["INCR", key]]);
  const count = Number(results?.[0]?.result);
  if (!Number.isFinite(count)) return null;
  if (count === 1) {
    await kvPipeline([["EXPIRE", key, windowSeconds]]);
  }
  return count;
}
