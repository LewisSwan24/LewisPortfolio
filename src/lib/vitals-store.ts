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

const MAX_SAMPLES = 300;
const recentSamples: VitalsBeacon[] = [];
const routeGroupTotals: Record<string, number> = {};
const interactionTotals: Record<string, number> = {};

export function resetTelemetryForTests(): void {
  recentSamples.length = 0;
  for (const key of Object.keys(routeGroupTotals)) delete routeGroupTotals[key];
  for (const key of Object.keys(interactionTotals)) delete interactionTotals[key];
}

export function recordTelemetrySample(entry: VitalsBeacon): void {
  recentSamples.push(entry);
  if (recentSamples.length > MAX_SAMPLES) {
    recentSamples.shift();
  }

  routeGroupTotals[entry.routeGroup] = (routeGroupTotals[entry.routeGroup] ?? 0) + 1;
  if (entry.interactionTarget) {
    interactionTotals[entry.interactionTarget] =
      (interactionTotals[entry.interactionTarget] ?? 0) + 1;
  }
}

function p75(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.floor(sorted.length * 0.75));
  return sorted[idx] ?? null;
}

export function getTelemetrySummary() {
  const byMetric = (m: VitalsBeacon["metric"]) =>
    recentSamples.filter((s) => s.metric === m).map((s) => s.value);

  return {
    sampleCount: recentSamples.length,
    totalsByRouteGroup: { ...routeGroupTotals },
    interactionsByTarget: { ...interactionTotals },
    metricsP75: {
      LCP: p75(byMetric("LCP")),
      INP: p75(byMetric("INP")),
      CLS: p75(byMetric("CLS")),
      FCP: p75(byMetric("FCP")),
      TTFB: p75(byMetric("TTFB")),
    },
  };
}
