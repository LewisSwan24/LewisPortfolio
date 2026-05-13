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
    expect(report.checkedRoutes).toContain("/hire/decision");
    expect(report.checkedRoutes).toContain("/hire/offer");
    expect(report.checkedRoutes).toContain("/hire/onboarding");
    expect(report.checkedRoutes).toContain("/hire/kickoff");
    expect(report.checkedRoutes).toContain("/hire/impact");
    expect(report.checkedRoutes).toContain("/hire/growth");
    expect(report.checkedRoutes).toContain("/hire/retention");
    expect(report.checkedRoutes).toContain("/hire/partnership");
    expect(report.checkedRoutes).toContain("/hire/command");
    expect(report.checkedRoutes).toContain("/hire/briefing");
    expect(report.checkedRoutes).toContain("/hire/readiness");
    expect(report.checkedRoutes).toContain("/hire/action");
    expect(report.checkedRoutes).toContain("/hire/tracker");

    expect(report.maintenanceEntries).toBe(getProofMaintenanceEntries().length);
    expect(report.checkedAnchors).toBeGreaterThanOrEqual(20);
  });
});
