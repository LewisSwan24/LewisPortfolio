import "@/lib/zod-jitless";
import { z } from "zod";

export const VitalsBeaconSchema = z
  .object({
    metric: z.enum(["LCP", "INP", "CLS", "FCP", "TTFB", "INTERACTION"]),
    value: z.number().min(0).max(60000),
    routeGroup: z.enum(["home", "projects", "case", "hire", "lab", "blog", "brief", "other"]),
    interactionTarget: z
      .enum(["specimen", "simulator", "rationale-ai", "comparator", "brief-print"])
      .optional(),
  })
  .strict();

export type VitalsBeacon = z.infer<typeof VitalsBeaconSchema>;

// In-memory store: used when Upstash is not configured (local dev, e2e) and
// as the fallback when it cannot be reached. It holds one instance's recent
// beacons only; src/lib/server/vitals-kv.ts is the shared, persistent store.
const MAX_SAMPLES = 300;
const WINDOW_DAYS = 30;
const recentSamples: Array<VitalsBeacon & { day: string }> = [];

export function resetTelemetryForTests(): void {
  recentSamples.length = 0;
}

export function recordTelemetrySample(entry: VitalsBeacon, now: Date = new Date()): void {
  recentSamples.push({ ...entry, day: now.toISOString().slice(0, 10) });
  if (recentSamples.length > MAX_SAMPLES) {
    recentSamples.shift();
  }
}

export interface VitalsSnapshot {
  samples: { day: string; metric: string; routeGroup: string; value: number }[];
  interactions: { day: string; routeGroup: string; target: string; count: number }[];
}

function getMemorySnapshot(): VitalsSnapshot {
  const snapshot: VitalsSnapshot = { samples: [], interactions: [] };
  const counts = new Map<string, VitalsSnapshot["interactions"][number]>();
  for (const s of recentSamples) {
    if (s.metric !== "INTERACTION") {
      snapshot.samples.push({ day: s.day, metric: s.metric, routeGroup: s.routeGroup, value: s.value });
      continue;
    }
    const target = s.interactionTarget ?? "none";
    const key = `${s.day}|${s.routeGroup}|${target}`;
    const row = counts.get(key) ?? { day: s.day, routeGroup: s.routeGroup, target, count: 0 };
    row.count++;
    counts.set(key, row);
  }
  snapshot.interactions = [...counts.values()];
  return snapshot;
}

function p75(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.floor(sorted.length * 0.75));
  return sorted[idx] ?? null;
}

const SUMMARY_METRICS = ["LCP", "INP", "CLS", "FCP", "TTFB"] as const;
type SummaryMetric = (typeof SUMMARY_METRICS)[number];
type Cell = { p75: number | null; count: number };

export interface VitalsSummary {
  source: "kv" | "memory";
  windowDays: number;
  sampleCount: number;
  metricsP75: Record<SummaryMetric, number | null>;
  /** v7.0 block 4 (P3) shape, kept for existing readers. */
  p75ByRouteGroup: Record<string, { LCP: number | null; INP: number | null }>;
  byRouteGroup: Record<string, Partial<Record<SummaryMetric, Cell>>>;
  daily: Array<{ day: string; routeGroup: string; metric: string; p75: number | null; count: number }>;
  totalsByRouteGroup: Record<string, number>;
  interactionsByTarget: Record<string, number>;
}

/** p75 and sample counts per route group and metric, overall and per day. */
export function summarizeVitals(snapshot: VitalsSnapshot, source: "kv" | "memory"): VitalsSummary {
  const groups = new Map<string, number[]>();
  const push = (key: string, value: number) => {
    const list = groups.get(key) ?? [];
    list.push(value);
    groups.set(key, list);
  };
  const totalsByRouteGroup: Record<string, number> = {};
  for (const s of snapshot.samples) {
    push(`m|${s.metric}`, s.value);
    push(`g|${s.routeGroup}|${s.metric}`, s.value);
    push(`d|${s.day}|${s.routeGroup}|${s.metric}`, s.value);
    totalsByRouteGroup[s.routeGroup] = (totalsByRouteGroup[s.routeGroup] ?? 0) + 1;
  }
  const interactionsByTarget: Record<string, number> = {};
  let interactionCount = 0;
  for (const i of snapshot.interactions) {
    interactionCount += i.count;
    totalsByRouteGroup[i.routeGroup] = (totalsByRouteGroup[i.routeGroup] ?? 0) + i.count;
    if (i.target !== "none") interactionsByTarget[i.target] = (interactionsByTarget[i.target] ?? 0) + i.count;
  }

  const metricsP75 = Object.fromEntries(
    SUMMARY_METRICS.map((m) => [m, p75(groups.get(`m|${m}`) ?? [])]),
  ) as Record<SummaryMetric, number | null>;

  const byRouteGroup: VitalsSummary["byRouteGroup"] = {};
  const p75ByRouteGroup: VitalsSummary["p75ByRouteGroup"] = {};
  const daily: VitalsSummary["daily"] = [];
  for (const [key, values] of groups) {
    const parts = key.split("|");
    if (parts[0] === "g") {
      const [, group, metric] = parts;
      (byRouteGroup[group] ??= {})[metric as SummaryMetric] = { p75: p75(values), count: values.length };
    } else if (parts[0] === "d") {
      const [, day, routeGroup, metric] = parts;
      daily.push({ day, routeGroup, metric, p75: p75(values), count: values.length });
    }
  }
  for (const [group, cells] of Object.entries(byRouteGroup)) {
    p75ByRouteGroup[group] = { LCP: cells.LCP?.p75 ?? null, INP: cells.INP?.p75 ?? null };
  }
  daily.sort((a, b) =>
    a.day !== b.day ? a.day.localeCompare(b.day) : a.routeGroup !== b.routeGroup ? a.routeGroup.localeCompare(b.routeGroup) : a.metric.localeCompare(b.metric),
  );

  return {
    source,
    windowDays: WINDOW_DAYS,
    sampleCount: snapshot.samples.length + interactionCount,
    metricsP75,
    p75ByRouteGroup,
    byRouteGroup,
    daily,
    totalsByRouteGroup,
    interactionsByTarget,
  };
}

export function getTelemetrySummary(): VitalsSummary {
  return summarizeVitals(getMemorySnapshot(), "memory");
}
