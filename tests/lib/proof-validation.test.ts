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
      expect(report.checkedRoutes).toContain(`/hire/${role}`);
      expect(report.checkedRoutes).toContain(`/hire/${role}/packet`);
      expect(report.checkedRoutes).toContain(`/hire/${role}/next`);
    }
    expect(report.checkedRoutes).toContain("/hire/review");
    expect(report.checkedRoutes).toContain("/hire/compare");
    expect(report.checkedRoutes).toContain("/hire/interview");
    expect(report.checkedRoutes).toContain("/hire/scorecard");
    expect(report.checkedRoutes).toContain("/hire/shortlist");
    expect(report.checkedRoutes).toContain("/hire/debrief");

    expect(report.maintenanceEntries).toBe(getProofMaintenanceEntries().length);
    expect(report.checkedAnchors).toBeGreaterThanOrEqual(20);
  });
});
