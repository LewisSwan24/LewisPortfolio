import { describe, expect, it } from "vitest";
import { getHiringRetentionReadiness, hiringRoleIds } from "@/lib/proof";

describe("hiring retention readiness", () => {
  it("summarizes retention readiness for every role", () => {
    const pack = getHiringRetentionReadiness("en");

    expect(pack.hero.headline).toContain("Retention");
    expect(pack.growthRoute).toBe("/hire/growth");
    expect(pack.impactRoute).toBe("/hire/impact");
    expect(pack.kickoffRoute).toBe("/hire/kickoff");
    expect(pack.onboardingRoute).toBe("/hire/onboarding");
    expect(pack.offerRoute).toBe("/hire/offer");
    expect(pack.decisionRoute).toBe("/hire/decision");
    expect(pack.debriefRoute).toBe("/hire/debrief");
    expect(pack.shortlistRoute).toBe("/hire/shortlist");
    expect(pack.scorecardRoute).toBe("/hire/scorecard");
    expect(pack.interviewRoute).toBe("/hire/interview");
    expect(pack.compareRoute).toBe("/hire/compare");
    expect(pack.reviewRoute).toBe("/hire/review");
    expect(pack.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    expect(pack.summary).toHaveLength(4);
  });

  it("includes complete role retention routes and proof anchors", () => {
    const pack = getHiringRetentionReadiness("en");

    for (const role of pack.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.growthRoute).toBe("/hire/growth");
      expect(role.impactRoute).toBe("/hire/impact");
      expect(role.kickoffRoute).toBe("/hire/kickoff");
      expect(role.onboardingRoute).toBe("/hire/onboarding");
      expect(role.offerRoute).toBe("/hire/offer");
      expect(role.decisionRoute).toBe("/hire/decision");
      expect(role.debriefRoute).toBe("/hire/debrief");
      expect(role.shortlistRoute).toBe("/hire/shortlist");
      expect(role.scorecardRoute).toBe("/hire/scorecard");
      expect(role.interviewRoute).toBe("/hire/interview");
      expect(role.compareRoute).toBe("/hire/compare");
      expect(role.reviewRoute).toBe("/hire/review");
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=retention`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.retentionSignal).toBeTruthy();
      expect(role.longTermFit).toBeTruthy();
      expect(role.managerSupport).toBeTruthy();
      expect(role.teamDependency).toBeTruthy();
      expect(role.durabilityRisk).toBeTruthy();
      expect(role.reviewCadence).toBeTruthy();
      expect(role.nextRetentionQuestion).toBeTruthy();
    }
  });

  it("keeps Chinese retention readiness content structurally aligned", () => {
    const pack = getHiringRetentionReadiness("zh");

    expect(pack.hero.headline).toContain("Retention");
    expect(pack.roles).toHaveLength(4);
    expect(pack.summary).toHaveLength(4);
    expect(pack.close.primaryAction.href).toBe("/contact");
  });
});
