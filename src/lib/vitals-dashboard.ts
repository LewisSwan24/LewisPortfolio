// v7.1 block 3: pure helpers behind the /lab field-data dashboard.

export const DASHBOARD_METRICS = ["LCP", "INP", "CLS", "TTFB"] as const;
export type DashboardMetric = (typeof DASHBOARD_METRICS)[number];

export const ROUTE_GROUP_ORDER = ["home", "projects", "case", "hire", "lab", "blog", "brief", "other"] as const;

/** A p75 from fewer samples than this is shown but not rated. */
export const MIN_RATED_SAMPLES = 10;
/** A day with fewer samples than this is a gap in the trend line. */
export const MIN_DAY_SAMPLES = 3;

/**
 * Google's published Core Web Vitals thresholds (web.dev): at or under the
 * first is "good", over the second is "poor". TTFB uses web.dev's guidance.
 */
export const THRESHOLDS: Record<DashboardMetric, readonly [number, number]> = {
  LCP: [2500, 4000],
  INP: [200, 500],
  CLS: [0.1, 0.25],
  TTFB: [800, 1800],
};

export type Rating = "good" | "needs-improvement" | "poor" | "few-samples" | "none";

export function rateValue(metric: DashboardMetric, p75: number | null, count: number): Rating {
  if (p75 === null || count === 0) return "none";
  if (count < MIN_RATED_SAMPLES) return "few-samples";
  const [good, poor] = THRESHOLDS[metric];
  if (p75 <= good) return "good";
  if (p75 <= poor) return "needs-improvement";
  return "poor";
}

export function formatMetricValue(metric: DashboardMetric, value: number | null): string {
  if (value === null) return "–";
  if (metric === "CLS") return value === 0 ? "0" : value.toFixed(2);
  return value < 1000 ? `${Math.round(value)} ms` : `${(value / 1000).toFixed(1)} s`;
}

type Cell = { p75: number | null; count: number };
export type ByRouteGroup = Record<string, Partial<Record<string, Cell>>>;
export interface TableRow {
  group: (typeof ROUTE_GROUP_ORDER)[number];
  cells: Record<DashboardMetric, Cell & { rating: Rating }>;
}

export function buildTableRows(byRouteGroup: ByRouteGroup): TableRow[] {
  const rows: TableRow[] = [];
  for (const group of ROUTE_GROUP_ORDER) {
    const source = byRouteGroup[group];
    if (!source) continue;
    const cells = {} as TableRow["cells"];
    let any = false;
    for (const metric of DASHBOARD_METRICS) {
      const cell = source[metric];
      const p75 = cell && cell.count > 0 ? cell.p75 : null;
      const count = cell?.count ?? 0;
      if (count > 0) any = true;
      cells[metric] = { p75, count, rating: rateValue(metric, p75, count) };
    }
    if (any) rows.push({ group, cells });
  }
  return rows;
}

export interface DailyRow {
  day: string;
  routeGroup: string;
  metric: string;
  p75: number | null;
  count: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** One slot per day, oldest first, ending on `endDay` (YYYY-MM-DD, UTC). */
export function buildDailySeries(
  daily: DailyRow[],
  metric: DashboardMetric,
  group: string,
  endDay: string,
  days: number,
): Array<{ day: string; value: number | null; count: number }> {
  const byDay = new Map<string, DailyRow>();
  for (const row of daily) if (row.metric === metric && row.routeGroup === group) byDay.set(row.day, row);
  const end = Date.parse(`${endDay}T00:00:00Z`);
  const series = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(end - i * DAY_MS).toISOString().slice(0, 10);
    const row = byDay.get(day);
    const count = row?.count ?? 0;
    series.push({ day, value: row && count >= MIN_DAY_SAMPLES ? row.p75 : null, count });
  }
  return series;
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * SVG path for a sparkline with zero at the bottom. Gaps (null) break the
 * line; a value with no neighbour is returned as a dot, since a one-point
 * line would be invisible.
 */
export function sparklineGeometry(
  values: Array<number | null>,
  { width, height, max }: { width: number; height: number; max: number },
): { path: string; dots: Array<{ x: number; y: number }> } {
  const n = values.length;
  const x = (i: number) => round(n === 1 ? width / 2 : (i * width) / (n - 1));
  const y = (v: number) => round(height - (Math.min(v, max) / (max || 1)) * height);
  const parts: string[] = [];
  const dots: Array<{ x: number; y: number }> = [];
  let run: number[] = [];
  const flush = () => {
    if (run.length === 1) dots.push({ x: x(run[0]), y: y(values[run[0]] as number) });
    else if (run.length > 1) {
      parts.push(run.map((i, k) => `${k === 0 ? "M" : "L"}${x(i)},${y(values[i] as number)}`).join(" "));
    }
    run = [];
  };
  values.forEach((v, i) => {
    if (v === null) flush();
    else run.push(i);
  });
  flush();
  return { path: parts.join(" "), dots };
}
