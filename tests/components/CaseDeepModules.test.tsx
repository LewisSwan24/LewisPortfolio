import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { walkieModules } from "@/data/cases/modules/walkie-modules";
import { CaseReviewLensSwitch } from "@/components/case/deep/CaseReviewLensSwitch";
import { CaseFocusRegion } from "@/components/case/deep/CaseFocusRegion";
import { CaseJourneyRail } from "@/components/case/deep/CaseJourneyRail";
import { CaseStateMatrixTable } from "@/components/case/deep/CaseStateMatrixTable";
import { CaseRejectionArchive } from "@/components/case/deep/CaseRejectionArchive";

const replaceMock = vi.fn();
let currentFocusParam: string | null = null;

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => (key === "focus" ? currentFocusParam : null),
    toString: () => (currentFocusParam ? `focus=${currentFocusParam}` : ""),
  }),
  useRouter: () => ({ replace: replaceMock }),
  usePathname: () => "/en/projects/walkie",
}));

describe("CaseDeepModules UI components (v4.6)", () => {
  it("renders CaseReviewLensSwitch with aria-pressed buttons and updates ?focus query", () => {
    currentFocusParam = null;
    replaceMock.mockClear();

    render(<CaseReviewLensSwitch callouts={walkieModules.lensCallouts} locale="en" />);

    const allBtn = screen.getByRole("button", { name: "All" });
    const aiTrustBtn = screen.getByRole("button", { name: "AI Trust & Rules" });

    expect(allBtn).toHaveAttribute("aria-pressed", "true");
    expect(aiTrustBtn).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByTestId("case-lens-callout")).toHaveTextContent(
      walkieModules.lensCallouts.all.en
    );

    fireEvent.click(aiTrustBtn);
    expect(replaceMock).toHaveBeenCalledWith("/en/projects/walkie?focus=ai-trust", {
      scroll: false,
    });
  });

  it("reflects ?focus=systems-hardware in CaseFocusRegion and renders Journey, 5-State Matrix, and Rejection Archive", () => {
    currentFocusParam = "systems-hardware";

    const { container } = render(
      <CaseFocusRegion>
        <CaseJourneyRail stages={walkieModules.journey} locale="en" />
        <CaseStateMatrixTable states={walkieModules.stateMatrix} locale="en" />
        <CaseRejectionArchive entries={walkieModules.rejectionArchive} locale="en" />
      </CaseFocusRegion>
    );

    const focusRoot = container.querySelector("#case-deep-root");
    expect(focusRoot).toHaveAttribute("data-active-focus", "systems-hardware");
    expect(container.querySelectorAll("#journey-map ol > li")).toHaveLength(
      walkieModules.journey.length
    );
    expect(container.querySelectorAll("#state-matrix table tbody tr")).toHaveLength(5);
    expect(container.querySelectorAll("#rejection-archive ol > li")).toHaveLength(
      walkieModules.rejectionArchive.length
    );
  });
});
