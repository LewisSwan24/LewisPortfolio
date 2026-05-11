import { describe, expect, it } from "vitest";
import { getHiringKickoffAlignment, hiringRoleIds } from "@/lib/proof";

describe("hiring kickoff alignment", () => {
  it("summarizes first-project kickoff alignment for every role", () => {
    const pack = getHiringKickoffAlignment("en");

    expect(pack.hero.headline).toContain("Kickoff");
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

  it("includes complete role kickoff routes and proof anchors", () => {
    const pack = getHiringKickoffAlignment("en");

    for (const role of pack.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.onboardingRoute).toBe("/hire/onboarding");
      expect(role.offerRoute).toBe("/hire/offer");
      expect(role.decisionRoute).toBe("/hire/decision");
      expect(role.debriefRoute).toBe("/hire/debrief");
      expect(role.shortlistRoute).toBe("/hire/shortlist");
      expect(role.scorecardRoute).toBe("/hire/scorecard");
      expect(role.interviewRoute).toBe("/hire/interview");
      expect(role.compareRoute).toBe("/hire/compare");
      expect(role.reviewRoute).toBe("/hire/review");
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=kickoff`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.kickoffSignal).toBeTruthy();
      expect(role.firstProjectBrief).toBeTruthy();
      expect(role.successMetric).toBeTruthy();
      expect(role.stakeholderQuestion).toBeTruthy();
      expect(role.deliveryArtifact).toBeTruthy();
      expect(role.riskGuardrail).toBeTruthy();
      expect(role.nextAction).toBeTruthy();
    }
  });

  it("keeps Chinese kickoff alignment content structurally aligned", () => {
    const pack = getHiringKickoffAlignment("zh");

    expect(pack.hero.headline).toContain("Kickoff");
    expect(pack.roles).toHaveLength(4);
    expect(pack.summary).toHaveLength(4);
    expect(pack.close.primaryAction.href).toBe("/contact");
  });
});
