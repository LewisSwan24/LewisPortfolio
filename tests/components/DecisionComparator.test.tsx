import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { DecisionComparator } from "@/components/case/DecisionComparator";
import { getDecisionComparatorRows } from "@/lib/cases/comparator";

describe("DecisionComparator", () => {
  it("compares all 6 listed cases with human tension, rejected paths, chosen tradeoff, and residual cost first", () => {
    render(<DecisionComparator rows={getDecisionComparatorRows("en")} locale="en" />);

    expect(screen.getByRole("columnheader", { name: /Case/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Human tension/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Rejected alternative/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Chosen tradeoff/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Residual cost/i })).toBeInTheDocument();

    const desktopRows = screen.getAllByTestId("comparator-row");
    expect(desktopRows).toHaveLength(6);

    fireEvent.click(screen.getByRole("button", { name: /AI Trust & Agency/i }));
    expect(screen.getAllByTestId("comparator-row").length).toBeLessThan(6);
    expect(screen.getAllByTestId("comparator-row").length).toBeGreaterThanOrEqual(3);
  });

  it("renders accessible mobile accordions without headings inside summary", () => {
    const { container } = render(
      <DecisionComparator rows={getDecisionComparatorRows("zh")} locale="zh" />
    );

    const summaries = container.querySelectorAll("details > summary");
    expect(summaries.length).toBe(6);
    for (const summary of summaries) {
      expect(summary.querySelector("h1, h2, h3, h4, h5, h6")).toBeNull();
    }
  });
});
