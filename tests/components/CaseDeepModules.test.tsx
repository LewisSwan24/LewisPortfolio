import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { walkieModules } from "@/data/cases/modules/walkie-modules";
import { CaseJourneyRail } from "@/components/case/deep/CaseJourneyRail";
import { CaseStateMatrixTable } from "@/components/case/deep/CaseStateMatrixTable";
import { CaseRejectionArchive } from "@/components/case/deep/CaseRejectionArchive";

// v6.5 removed the Case Reader Lens switcher (review row 05) and its
// ?focus= region; the depth modules render on their own.
describe("CaseDeepModules UI components (v4.6)", () => {
  it("renders Journey, 5-State Matrix, and Rejection Archive", () => {
    const { container } = render(
      <div>
        <CaseJourneyRail stages={walkieModules.journey} locale="en" />
        <CaseStateMatrixTable states={walkieModules.stateMatrix} locale="en" />
        <CaseRejectionArchive entries={walkieModules.rejectionArchive} locale="en" />
      </div>
    );

    expect(container.querySelectorAll("#journey-map ol > li")).toHaveLength(
      walkieModules.journey.length
    );
    expect(container.querySelectorAll("#state-matrix table tbody tr")).toHaveLength(5);
    expect(container.querySelectorAll("#rejection-archive ol > li")).toHaveLength(
      walkieModules.rejectionArchive.length
    );
  });

  it("labels the stage-progress strip with the short stage names", () => {
    const { container } = render(<CaseJourneyRail stages={walkieModules.journey} locale="en" />);
    const chips = [...container.querySelectorAll("nav button")].map((el) => el.textContent ?? "");
    expect(chips.length).toBe(walkieModules.journey.length);
    walkieModules.journey.forEach((stage, i) => {
      expect(chips[i]).toContain(stage.shortTitle.en);
    });
  });
});
