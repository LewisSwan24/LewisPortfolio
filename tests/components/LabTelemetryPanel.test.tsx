import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { LabTelemetryPanel } from "@/components/lab/LabTelemetryPanel";

function summary(overrides: Record<string, unknown> = {}) {
  return {
    source: "kv",
    windowDays: 30,
    sampleCount: 64,
    metricsP75: { LCP: 3100, INP: 180, CLS: 0.02, FCP: 900, TTFB: 400 },
    byRouteGroup: {
      case: { LCP: { p75: 3100, count: 40 }, INP: { p75: 180, count: 12 } },
      home: { LCP: { p75: 1800, count: 12 } },
    },
    daily: [
      { day: "2026-11-27", routeGroup: "case", metric: "LCP", p75: 2900, count: 20 },
      { day: "2026-11-28", routeGroup: "case", metric: "LCP", p75: 3300, count: 20 },
      { day: "2026-11-28", routeGroup: "case", metric: "INP", p75: 180, count: 12 },
      { day: "2026-11-28", routeGroup: "home", metric: "LCP", p75: 1800, count: 12 },
    ],
    totalsByRouteGroup: { case: 52, home: 12 },
    interactionsByTarget: {},
    ...overrides,
  };
}

function mockApi(body: unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({ ok: true, summary: body }), { status: 200 })),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("LabTelemetryPanel field-data dashboard", () => {
  it("renders nothing until there are samples", async () => {
    mockApi(summary({ sampleCount: 0, byRouteGroup: {}, daily: [] }));
    const { container } = render(<LabTelemetryPanel locale="en" />);
    await new Promise((r) => setTimeout(r, 0));
    expect(container).toBeEmptyDOMElement();
  });

  it("shows a route group × metric table with p75, sample count and a word rating", async () => {
    mockApi(summary());
    render(<LabTelemetryPanel locale="en" />);
    const table = await screen.findByRole("table");
    const rows = within(table).getAllByRole("row");
    expect(rows.map((r) => r.querySelector("th")?.textContent ?? "")).toEqual(
      expect.arrayContaining([expect.stringContaining("Home"), expect.stringContaining("Case pages")]),
    );
    const caseRow = rows.find((r) => r.textContent?.includes("Case pages"))!;
    expect(caseRow.textContent).toContain("3.1 s");
    expect(caseRow.textContent).toContain("Needs improvement");
    expect(caseRow.textContent).toContain("n = 40");
    expect(caseRow.textContent).toContain("180 ms");
    expect(caseRow.textContent).toContain("Good");
    const homeRow = rows.find((r) => r.textContent?.includes("Home"))!;
    expect(homeRow.textContent).toContain("No data");
    expect(screen.getByText(/LCP \(p75\)/)).toBeInTheDocument();
  });

  it("says where the numbers come from", async () => {
    mockApi(summary());
    render(<LabTelemetryPanel locale="en" />);
    expect(await screen.findByText(/last 30 days/i)).toHaveTextContent(/64 samples/);
    expect(screen.getByText(/last 30 days/i)).toHaveTextContent(/all servers/i);
  });

  it("says when the numbers are only this server's memory", async () => {
    mockApi(summary({ source: "memory" }));
    render(<LabTelemetryPanel locale="en" />);
    expect(await screen.findByText(/last 30 days/i)).toHaveTextContent(/this server only/i);
  });

  it("switches the trend metric with pressed-state buttons", async () => {
    mockApi(summary());
    render(<LabTelemetryPanel locale="en" />);
    const lcp = await screen.findByRole("button", { name: "LCP" });
    const inp = screen.getByRole("button", { name: "INP" });
    expect(lcp).toHaveAttribute("aria-pressed", "true");
    expect(inp).toHaveAttribute("aria-pressed", "false");
    const trends = screen.getByRole("list", { name: /30-day trend/i });
    expect(within(trends).getByText(/Case pages/).closest("li")?.textContent).toContain("2.9 s → 3.3 s");

    fireEvent.click(inp);
    expect(inp).toHaveAttribute("aria-pressed", "true");
    const caseTrend = within(screen.getByRole("list", { name: /30-day trend/i })).getByText(/Case pages/).closest("li");
    expect(caseTrend?.textContent).toContain("180 ms");
    expect(caseTrend?.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses Simplified Chinese on /zh", async () => {
    mockApi(summary());
    render(<LabTelemetryPanel locale="zh" />);
    const table = await screen.findByRole("table");
    expect(table.textContent).toContain("案例页");
    expect(table.textContent).toContain("需改进");
    expect(screen.getByText(/最近 30 天/)).toBeInTheDocument();
  });
});
