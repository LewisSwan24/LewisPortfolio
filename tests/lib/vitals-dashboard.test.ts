import { describe, expect, it } from "vitest";
import {
  buildDailySeries,
  buildTableRows,
  formatMetricValue,
  MIN_DAY_SAMPLES,
  MIN_RATED_SAMPLES,
  rateValue,
  sparklineGeometry,
} from "@/lib/vitals-dashboard";

describe("rateValue (Google's Core Web Vitals thresholds)", () => {
  it.each([
    ["LCP", 2500, "good"],
    ["LCP", 2501, "needs-improvement"],
    ["LCP", 4000, "needs-improvement"],
    ["LCP", 4001, "poor"],
    ["INP", 200, "good"],
    ["INP", 201, "needs-improvement"],
    ["INP", 500, "needs-improvement"],
    ["INP", 501, "poor"],
    ["CLS", 0.1, "good"],
    ["CLS", 0.11, "needs-improvement"],
    ["CLS", 0.25, "needs-improvement"],
    ["CLS", 0.26, "poor"],
    ["TTFB", 800, "good"],
    ["TTFB", 1800, "needs-improvement"],
    ["TTFB", 1801, "poor"],
  ] as const)("%s %s → %s", (metric, value, rating) => {
    expect(rateValue(metric, value, MIN_RATED_SAMPLES)).toBe(rating);
  });

  it("does not rate a cell with too few samples, and says when there is none", () => {
    expect(MIN_RATED_SAMPLES).toBe(10);
    expect(rateValue("LCP", 9000, MIN_RATED_SAMPLES - 1)).toBe("few-samples");
    expect(rateValue("LCP", null, 0)).toBe("none");
  });
});

describe("formatMetricValue", () => {
  it.each([
    ["LCP", 850, "850 ms"],
    ["LCP", 2430, "2.4 s"],
    ["TTFB", 1000, "1.0 s"],
    ["INP", 96, "96 ms"],
    ["CLS", 0.054, "0.05"],
    ["CLS", 0, "0"],
  ] as const)("%s %s → %s", (metric, value, text) => {
    expect(formatMetricValue(metric, value)).toBe(text);
  });

  it("renders null as an en dash", () => {
    expect(formatMetricValue("LCP", null)).toBe("–");
  });
});

describe("buildTableRows", () => {
  it("lists route groups in site order, only those with samples, with a cell per metric", () => {
    const rows = buildTableRows({
      case: { LCP: { p75: 3100, count: 40 }, INP: { p75: 180, count: 12 } },
      home: { CLS: { p75: 0.02, count: 3 } },
    });
    expect(rows.map((r) => r.group)).toEqual(["home", "case"]);
    expect(rows[1].cells.LCP).toEqual({ p75: 3100, count: 40, rating: "needs-improvement" });
    expect(rows[1].cells.INP).toEqual({ p75: 180, count: 12, rating: "good" });
    expect(rows[1].cells.TTFB).toEqual({ p75: null, count: 0, rating: "none" });
    expect(rows[0].cells.CLS.rating).toBe("few-samples");
  });
});

describe("buildDailySeries", () => {
  const daily = [
    { day: "2026-11-26", routeGroup: "case", metric: "LCP", p75: 2000, count: 5 },
    { day: "2026-11-27", routeGroup: "case", metric: "LCP", p75: 9000, count: MIN_DAY_SAMPLES - 1 },
    { day: "2026-11-28", routeGroup: "case", metric: "LCP", p75: 3000, count: 8 },
    { day: "2026-11-28", routeGroup: "home", metric: "LCP", p75: 1000, count: 8 },
    { day: "2026-11-28", routeGroup: "case", metric: "INP", p75: 100, count: 8 },
  ];

  it("returns one slot per day for the window, ending on the given day", () => {
    const series = buildDailySeries(daily, "LCP", "case", "2026-11-28", 30);
    expect(series).toHaveLength(30);
    expect(series[0].day).toBe("2026-10-30");
    expect(series[29]).toEqual({ day: "2026-11-28", value: 3000, count: 8 });
  });

  it("leaves days with too few samples empty, and ignores other groups and metrics", () => {
    const series = buildDailySeries(daily, "LCP", "case", "2026-11-28", 30);
    expect(series[27]).toEqual({ day: "2026-11-26", value: 2000, count: 5 });
    expect(series[28]).toEqual({ day: "2026-11-27", value: null, count: MIN_DAY_SAMPLES - 1 });
    expect(series[0]).toEqual({ day: "2026-10-30", value: null, count: 0 });
  });
});

describe("sparklineGeometry", () => {
  it("scales values to the box with zero at the bottom and breaks the line at gaps", () => {
    const g = sparklineGeometry([10, 20, null, 40, 20], { width: 100, height: 40, max: 40 });
    expect(g.path).toBe("M0,30 L25,20 M75,0 L100,20");
    expect(g.dots).toEqual([]);
  });

  it("draws an isolated day as a dot, since a one-point line is invisible", () => {
    const g = sparklineGeometry([null, 10, null, 20, 30], { width: 100, height: 40, max: 40 });
    expect(g.path).toBe("M75,20 L100,10");
    expect(g.dots).toEqual([{ x: 25, y: 30 }]);
  });

  it("handles an empty series and a single slot", () => {
    expect(sparklineGeometry([null, null], { width: 100, height: 40, max: 10 })).toEqual({ path: "", dots: [] });
    expect(sparklineGeometry([5], { width: 100, height: 40, max: 10 })).toEqual({ path: "", dots: [{ x: 50, y: 20 }] });
  });
});
