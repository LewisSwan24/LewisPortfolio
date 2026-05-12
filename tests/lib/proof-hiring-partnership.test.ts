import { describe, expect, it } from "vitest";
import { getHiringPartnershipOperatingPack, hiringRoleIds } from "@/lib/proof";

describe("hiring partnership operating pack", () => {
  it("summarizes partnership operating agreements for every role", () => {
    const pack = getHiringPartnershipOperatingPack("en");

    expect(pack.hero.headline).toContain("Partnership");
    expect(pack.retentionRoute).toBe("/hire/retention");
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

  it("includes complete role partnership routes and proof anchors", () => {
    const pack = getHiringPartnershipOperatingPack("en");

    for (const role of pack.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.retentionRoute).toBe("/hire/retention");
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
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=partnership`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.partnershipSignal).toBeTruthy();
      expect(role.operatingAgreement).toBeTruthy();
      expect(role.managerTouchpoint).toBeTruthy();
      expect(role.teamRitual).toBeTruthy();
      expect(role.escalationRule).toBeTruthy();
      expect(role.successReview).toBeTruthy();
      expect(role.nextPartnershipAction).toBeTruthy();
    }
  });

  it("keeps Chinese partnership operating content structurally aligned", () => {
    const pack = getHiringPartnershipOperatingPack("zh");

    expect(pack.hero.headline).toContain("Partnership");
    expect(pack.roles).toHaveLength(4);
    expect(pack.summary).toHaveLength(4);
    expect(pack.close.primaryAction.href).toBe("/contact");
  });
});
