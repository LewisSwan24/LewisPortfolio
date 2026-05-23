import { describe, expect, it } from "vitest";
import { getHiringOnboardingReadiness, hiringRoleIds } from "@/lib/proof";

describe("hiring onboarding readiness", () => {
  it("summarizes onboarding-readiness work for every role", () => {
    const pack = getHiringOnboardingReadiness("en");

    expect(pack.hero.headline).toContain("Onboarding");
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

  it("includes complete role onboarding routes and proof anchors", () => {
    const pack = getHiringOnboardingReadiness("en");

    for (const role of pack.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.offerRoute).toBe("/hire/offer");
      expect(role.decisionRoute).toBe("/hire/decision");
      expect(role.debriefRoute).toBe("/hire/debrief");
      expect(role.shortlistRoute).toBe("/hire/shortlist");
      expect(role.scorecardRoute).toBe("/hire/scorecard");
      expect(role.interviewRoute).toBe("/hire/interview");
      expect(role.compareRoute).toBe("/hire/compare");
      expect(role.reviewRoute).toBe("/hire/review");
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=onboarding`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.firstWeekFocus).toBeTruthy();
      expect(role.firstThirtyDaysOutcome).toBeTruthy();
      expect(role.onboardingRisk).toBeTruthy();
      expect(role.managerQuestion).toBeTruthy();
      expect(role.nextAction).toBeTruthy();
    }
  });

  it("keeps Chinese onboarding-readiness content structurally aligned", () => {
    const pack = getHiringOnboardingReadiness("zh");

    expect(pack.hero.headline).toContain("Onboarding");
    expect(pack.roles).toHaveLength(4);
    expect(pack.summary).toHaveLength(4);
    expect(pack.close.primaryAction.href).toBe("/contact");
  });
});
