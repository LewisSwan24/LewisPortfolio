import { createHash } from "node:crypto";
import { kvIncrementRateLimit } from "./kv";

interface MemoryBucket {
  count: number;
  resetAt: number;
}

const memoryBuckets = new Map<string, MemoryBucket>();

export function resetMemoryRateLimiterForTests(): void {
  memoryBuckets.clear();
}

export function extractClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "127.0.0.1";
}

export function hashClientIp(ip: string, now: Date = new Date()): string {
  const day = now.toISOString().slice(0, 10);
  const dailySalt =
    process.env.PORTFOLIO_ADMIN_SECRET?.trim() ||
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    "lewis-portfolio-rl-salt";
  return createHash("sha256").update(`${day}:${ip}:${dailySalt}`).digest("hex").slice(0, 24);
}

export async function checkContactRateLimit(
  ip: string,
  limit: number = 3,
  windowSeconds: number = 600,
  nowMs: number = Date.now()
): Promise<{ allowed: boolean; remaining: number; backend: "kv" | "memory" }> {
  const ipHash = hashClientIp(ip, new Date(nowMs));
  const key = `rl:contact:${ipHash}`;

  const kvCount = await kvIncrementRateLimit(key, windowSeconds);
  if (kvCount !== null) {
    return {
      allowed: kvCount <= limit,
      remaining: Math.max(0, limit - kvCount),
      backend: "kv",
    };
  }

  // Prune expired buckets opportunistically to keep memory bounded
  for (const [k, entry] of memoryBuckets.entries()) {
    if (entry.resetAt <= nowMs) memoryBuckets.delete(k);
  }

  const current = memoryBuckets.get(key);
  if (!current || current.resetAt <= nowMs) {
    memoryBuckets.set(key, { count: 1, resetAt: nowMs + windowSeconds * 1000 });
    return { allowed: true, remaining: Math.max(0, limit - 1), backend: "memory" };
  }

  current.count += 1;
  return {
    allowed: current.count <= limit,
    remaining: Math.max(0, limit - current.count),
    backend: "memory",
  };
}
