import { describe, expect, it } from "vitest";
import { getHiringImpactReview, hiringRoleIds } from "@/lib/proof";

describe("hiring impact review", () => {
  it("summarizes first-month impact review for every role", () => {
    const pack = getHiringImpactReview("en");

    expect(pack.hero.headline).toContain("Impact");
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

  it("includes complete role impact routes and proof anchors", () => {
    const pack = getHiringImpactReview("en");

    for (const role of pack.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
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
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=impact`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.impactSignal).toBeTruthy();
      expect(role.reviewMetric).toBeTruthy();
      expect(role.firstMonthEvidence).toBeTruthy();
      expect(role.stakeholderCheckpoint).toBeTruthy();
      expect(role.deliveryReview).toBeTruthy();
      expect(role.riskWatch).toBeTruthy();
      expect(role.nextMilestone).toBeTruthy();
    }
  });

  it("keeps Chinese impact review content structurally aligned", () => {
    const pack = getHiringImpactReview("zh");

    expect(pack.hero.headline).toContain("Impact");
    expect(pack.roles).toHaveLength(4);
    expect(pack.summary).toHaveLength(4);
    expect(pack.close.primaryAction.href).toBe("/contact");
  });
});
