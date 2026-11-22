import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProofMaintenanceView } from "@/components/hiring/ProofMaintenanceComponents";
import { getProofMaintenanceReport, getProofUiLabels } from "@/lib/proof";

describe("proof maintenance components", () => {
  const labels = getProofUiLabels("en");
  const report = getProofMaintenanceReport("2026-05-10");

  it("renders review buckets and tracked proof surfaces", () => {
    render(<ProofMaintenanceView labels={labels} report={report} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Proof maintenance/i })
    ).toBeVisible();
    expect(screen.getAllByText(/Fresh/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { level: 2, name: /Review queue/i })).toBeVisible();
    expect(screen.getAllByText(/role-room/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/application-packet/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/follow-through/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/role-comparison/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/interview-agenda/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /ux-product-ia/i })).toHaveAttribute(
      "href",
      "/projects/lamplight#decision-timeline"
    );
  });
});
