import { describe, expect, it } from "vitest";
import { getHiringGrowthRoadmap, hiringRoleIds } from "@/lib/proof";

describe("hiring growth roadmap", () => {
  it("summarizes 90-day growth planning for every role", () => {
    const pack = getHiringGrowthRoadmap("en");

    expect(pack.hero.headline).toContain("Growth");
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

  it("includes complete role growth routes and proof anchors", () => {
    const pack = getHiringGrowthRoadmap("en");

    for (const role of pack.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
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
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=growth`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.growthSignal).toBeTruthy();
      expect(role.ninetyDayOutcome).toBeTruthy();
      expect(role.teamLeverage).toBeTruthy();
      expect(role.capabilityTransfer).toBeTruthy();
      expect(role.operatingRhythm).toBeTruthy();
      expect(role.riskToMonitor).toBeTruthy();
      expect(role.nextReview).toBeTruthy();
    }
  });

  it("keeps Chinese growth roadmap content structurally aligned", () => {
    const pack = getHiringGrowthRoadmap("zh");

    expect(pack.hero.headline).toContain("Growth");
    expect(pack.roles).toHaveLength(4);
    expect(pack.summary).toHaveLength(4);
    expect(pack.close.primaryAction.href).toBe("/contact");
  });
});
