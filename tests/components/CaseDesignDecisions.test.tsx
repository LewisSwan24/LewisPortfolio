import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseDesignDecisions } from "@/components/case/CaseDesignDecisions";
import { walkieCase } from "@/data/cases/walkie";

describe("CaseDesignDecisions", () => {
  it("renders nothing when decisions are missing or empty", () => {
    const { container: emptyContainer } = render(
      <CaseDesignDecisions decisions={[]} locale="en" />
    );
    expect(emptyContainer.firstChild).toBeNull();

    const { container: undefContainer } = render(
      <CaseDesignDecisions decisions={undefined} locale="zh" />
    );
    expect(undefContainer.firstChild).toBeNull();
  });

  it("renders structured human-centered design tradeoffs in English", () => {
    const decisions = walkieCase.designDecisions;
    render(<CaseDesignDecisions decisions={decisions} locale="en" />);

    expect(document.getElementById("design-decisions")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Design Decisions & Tradeoffs/i })
    ).toBeInTheDocument();

    for (const item of decisions ?? []) {
      expect(screen.getByText(item.decisionTitle.en)).toBeInTheDocument();
      expect(screen.getByText(item.humanTension.en)).toBeInTheDocument();
      expect(screen.getByText(item.chosenTradeoff.en)).toBeInTheDocument();
      expect(screen.getByText(item.residualCostOrRisk.en)).toBeInTheDocument();
      for (const alt of item.rejectedAlternatives) {
        expect(screen.getByText(alt.option.en)).toBeInTheDocument();
        expect(screen.getByText(alt.flaw.en)).toBeInTheDocument();
      }
    }
  });

  it("renders structured human-centered design tradeoffs in Chinese", () => {
    const decisions = walkieCase.designDecisions;
    render(<CaseDesignDecisions decisions={decisions} locale="zh" />);

    expect(document.getElementById("design-decisions")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /设计决策与取舍论证/i })
    ).toBeInTheDocument();

    for (const item of decisions ?? []) {
      expect(screen.getByText(item.decisionTitle.zh)).toBeInTheDocument();
      expect(screen.getByText(item.humanTension.zh)).toBeInTheDocument();
      expect(screen.getByText(item.chosenTradeoff.zh)).toBeInTheDocument();
      expect(screen.getByText(item.residualCostOrRisk.zh)).toBeInTheDocument();
    }
  });
});
