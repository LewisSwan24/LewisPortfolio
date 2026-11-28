import { beforeEach, describe, expect, it } from "vitest";
import { getTelemetrySummary, recordTelemetrySample, resetTelemetryForTests } from "@/lib/vitals-store";

/**
 * v7.0 block 4 (P3): the field LCP p75 of 6.9 s could not be acted on because it
 * mixed every route. The summary now also gives LCP and INP p75 per route group.
 */
describe("vitals summary by route group", () => {
  beforeEach(() => resetTelemetryForTests());

  it("reports LCP and INP p75 for each route group separately", () => {
    for (const v of [900, 1000, 1100, 1200]) recordTelemetrySample({ metric: "LCP", value: v, routeGroup: "home" });
    for (const v of [5000, 6000, 7000, 8000]) recordTelemetrySample({ metric: "LCP", value: v, routeGroup: "case" });
    recordTelemetrySample({ metric: "INP", value: 120, routeGroup: "lab" });

    const s = getTelemetrySummary();
    expect(s.p75ByRouteGroup.home.LCP).toBe(1200);
    expect(s.p75ByRouteGroup.case.LCP).toBe(8000);
    expect(s.p75ByRouteGroup.lab.INP).toBe(120);
    expect(s.p75ByRouteGroup.lab.LCP).toBeNull();
    expect(s.p75ByRouteGroup.blog).toBeUndefined();
  });
});
