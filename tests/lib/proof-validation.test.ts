import { describe, expect, it } from "vitest";
import {
  getProofMaintenanceEntries,
  getProofValidationReport,
  hiringRoleIds,
} from "@/lib/proof";

describe("proof validation report", () => {
  it("passes for the current proof registry", () => {
    const report = getProofValidationReport("2026-05-10");

    expect(report.ok).toBe(true);
    expect(report.errors).toEqual([]);
    expect(report.checkedLocales).toEqual(["en", "zh"]);
  });

  it("covers all role, packet, follow-through, and maintenance surfaces", () => {
    const report = getProofValidationReport("2026-05-10");

    for (const role of hiringRoleIds) {
      expect(report.checkedRoutes).toContain(`/hire?role=${role}`);
      expect(report.checkedRoutes).toContain(`/contact?role=${role}`);
      expect(report.checkedRoutes).toContain(`/contact?role=${role}&intent=interview`);
    }
    for (const view of [
      "review",
      "compare",
      "interview",
      "scorecard",
      "shortlist",
      "debrief",
      "decision",
      "offer",
      "onboarding",
      "kickoff",
      "impact",
      "growth",
      "retention",
      "partnership",
      "command",
      "briefing",
      "readiness",
      "action",
      "tracker",
    ]) {
      expect(report.checkedRoutes).toContain(`/hire?view=${view}`);
    }

    expect(report.maintenanceEntries).toBe(getProofMaintenanceEntries().length);
    expect(report.checkedAnchors).toBeGreaterThanOrEqual(20);
  });
});
