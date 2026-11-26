import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { getAllInteractionPatterns } from "@/data/patterns/patterns-data";
import { PatternWorkbenchClient } from "@/components/patterns/PatternWorkbenchClient";

const replaceMock = vi.fn();
let currentPatternParam: string | null = null;

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => (key === "pattern" ? currentPatternParam : null),
    toString: () => (currentPatternParam ? `pattern=${currentPatternParam}` : ""),
  }),
  useRouter: () => ({ replace: replaceMock }),
  usePathname: () => "/en/patterns",
}));

vi.mock("@/components/LocalizedLink", () => ({
  LocalizedLink: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/patterns/pattern-simulators", () => ({
  getPatternSimulator: () => () => <div data-testid="mock-live-widget">Live Widget</div>,
}));

describe("PatternWorkbenchClient (v4.7)", () => {
  const patterns = getAllInteractionPatterns();

  it("renders all 6 patterns, switches selection via ?pattern query, and toggles Rule vs Anti-Pattern", () => {
    currentPatternParam = null;
    replaceMock.mockClear();

    render(<PatternWorkbenchClient patterns={patterns} locale="en" />);

    expect(screen.getByTestId("pattern-active-title")).toHaveTextContent(
      "Physical Key Commitment Gate"
    );
    expect(screen.getByTestId("mock-live-widget")).toBeInTheDocument();

    const targetBtn = screen.getByRole("button", {
      name: /Three-Tier Confidence Split/i,
    });
    fireEvent.click(targetBtn);
    expect(replaceMock).toHaveBeenCalledWith(
      "/en/patterns?pattern=three-tier-confidence-split",
      { scroll: false }
    );

    const antiBtn = screen.getByRole("button", { name: "Common Anti-Pattern" });
    fireEvent.click(antiBtn);
    expect(antiBtn).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("pattern-compare-box")).toHaveAttribute(
      "data-mode",
      "anti-pattern"
    );
  });

  it("filters by category and announces snippet copy status cleanly", async () => {
    currentPatternParam = "default-safe-focus-lock";
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });

    render(<PatternWorkbenchClient patterns={patterns} locale="en" />);

    expect(screen.getByTestId("pattern-active-title")).toHaveTextContent(
      "Default-Safe Focus Lock"
    );

    fireEvent.click(screen.getByRole("button", { name: "AI Boundaries" }));
    expect(
      screen.queryByRole("button", { name: /Physical Key Commitment Gate/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Three-Tier Confidence Split/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Copy snippet" }));
    expect(await screen.findByTestId("pattern-copy-status")).toHaveTextContent(
      /Copied components\/RiskDecisionCard\.tsx/
    );
  });

  // /patterns renders this on the server (v6.7.1), so its first HTML must name
  // every pattern for crawlers and no-JS visitors. Moved from the v6.3 check on
  // the old placeholder list, which the page no longer sends.
  it("server-renders every pattern title in both locales", () => {
    currentPatternParam = null;
    const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;");
    for (const locale of ["en", "zh"] as const) {
      const html = renderToStaticMarkup(<PatternWorkbenchClient patterns={patterns} locale={locale} />);
      for (const p of patterns) {
        expect(html).toContain(esc(p.title[locale]));
      }
    }
  });
});
