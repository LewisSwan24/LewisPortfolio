import { isKvConfigured, kvPipeline } from "./kv";
import type { VitalsBeacon, VitalsSnapshot } from "@/lib/vitals-store";

// v7.1 block 2 (review P3): field data that survives cold starts and is shared
// by every server instance. One Redis list per UTC day, metric and route group
// holds the raw values (capped), so p75 is computed from real samples. An index
// set lists the keys, so a summary reads only keys that exist. Nothing here is
// tied to a person: no IP, user agent, URL or id is stored.

export const VITALS_WINDOW_DAYS = 30;
export const VITALS_DAILY_CAP = 2000;
const KEY_TTL_SECONDS = 31 * 24 * 60 * 60;
const INDEX_KEY = "rum:v2:index";
const DAY_MS = 24 * 60 * 60 * 1000;

const METRICS = new Set(["LCP", "INP", "CLS", "FCP", "TTFB"]);

function utcDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function vitalsKey(day: string, metric: string, group: string): string {
  return `rum:v2:${day}:${metric}:${group}`;
}

function interactionKey(day: string, group: string, target: string): string {
  return `rum:v2:${day}:INTERACTION:${group}:${target}`;
}

export async function kvRecordVital(entry: VitalsBeacon, now: Date = new Date()): Promise<boolean> {
  if (!isKvConfigured()) return false;
  const day = utcDay(now);
  const commands: Array<Array<string | number>> =
    entry.metric === "INTERACTION"
      ? (() => {
          const key = interactionKey(day, entry.routeGroup, entry.interactionTarget ?? "none");
          return [
            ["INCR", key],
            ["EXPIRE", key, KEY_TTL_SECONDS],
            ["SADD", INDEX_KEY, key],
            ["EXPIRE", INDEX_KEY, KEY_TTL_SECONDS],
          ];
        })()
      : (() => {
          const key = vitalsKey(day, entry.metric, entry.routeGroup);
          return [
            ["RPUSH", key, String(entry.value)],
            ["LTRIM", key, -VITALS_DAILY_CAP, -1],
            ["EXPIRE", key, KEY_TTL_SECONDS],
            ["SADD", INDEX_KEY, key],
            ["EXPIRE", INDEX_KEY, KEY_TTL_SECONDS],
          ];
        })();
  const results = await kvPipeline(commands);
  return results !== null;
}

type ParsedKey =
  | { kind: "list"; key: string; day: string; metric: string; routeGroup: string }
  | { kind: "count"; key: string; day: string; routeGroup: string; target: string };

function parseKey(key: string): ParsedKey | null {
  const parts = key.split(":");
  if (parts[0] !== "rum" || parts[1] !== "v2" || !/^\d{4}-\d{2}-\d{2}$/.test(parts[2] ?? "")) return null;
  const [, , day, metric, routeGroup, target] = parts;
  if (metric === "INTERACTION" && parts.length === 6 && routeGroup && target) {
    return { kind: "count", key, day, routeGroup, target };
  }
  if (METRICS.has(metric) && parts.length === 5 && routeGroup) return { kind: "list", key, day, metric, routeGroup };
  return null;
}

/** The last VITALS_WINDOW_DAYS days of samples, or null when Upstash is absent or unreachable. */
export async function kvReadVitals(now: Date = new Date()): Promise<VitalsSnapshot | null> {
  if (!isKvConfigured()) return null;
  const index = await kvPipeline([["SMEMBERS", INDEX_KEY]]);
  if (!index) return null;
  const members = Array.isArray(index[0]?.result) ? (index[0].result as unknown[]).map(String) : [];

  const today = utcDay(now);
  const oldest = utcDay(new Date(now.getTime() - (VITALS_WINDOW_DAYS - 1) * DAY_MS));
  const live: ParsedKey[] = [];
  const stale: string[] = [];
  for (const key of members) {
    const parsed = parseKey(key);
    if (!parsed || parsed.day < oldest) stale.push(key);
    else if (parsed.day <= today) live.push(parsed);
  }

  const commands: Array<Array<string | number>> = live.map((k) =>
    k.kind === "list" ? ["LRANGE", k.key, 0, -1] : ["GET", k.key],
  );
  if (stale.length) commands.push(["SREM", INDEX_KEY, ...stale]);
  const results = commands.length ? await kvPipeline(commands) : [];
  if (!results) return null;

  const snapshot: VitalsSnapshot = { samples: [], interactions: [] };
  live.forEach((k, i) => {
    const result = results[i]?.result;
    if (k.kind === "list") {
      if (!Array.isArray(result)) return;
      for (const raw of result) {
        const value = Number(raw);
        if (Number.isFinite(value)) {
          snapshot.samples.push({ day: k.day, metric: k.metric, routeGroup: k.routeGroup, value });
        }
      }
    } else {
      const count = Number(result);
      if (Number.isFinite(count) && count > 0) {
        snapshot.interactions.push({ day: k.day, routeGroup: k.routeGroup, target: k.target, count });
      }
    }
  });
  return snapshot;
}
