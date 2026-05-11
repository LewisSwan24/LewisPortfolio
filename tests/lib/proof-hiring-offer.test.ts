import { describe, expect, it } from "vitest";
import { getHiringOfferReadiness, hiringRoleIds } from "@/lib/proof";

describe("hiring offer readiness", () => {
  it("summarizes offer-readiness work for every role", () => {
    const pack = getHiringOfferReadiness("en");

    expect(pack.hero.headline).toContain("Offer readiness");
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

  it("includes complete role offer routes and proof anchors", () => {
    const pack = getHiringOfferReadiness("en");

    for (const role of pack.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.decisionRoute).toBe("/hire/decision");
      expect(role.debriefRoute).toBe("/hire/debrief");
      expect(role.shortlistRoute).toBe("/hire/shortlist");
      expect(role.scorecardRoute).toBe("/hire/scorecard");
      expect(role.interviewRoute).toBe("/hire/interview");
      expect(role.compareRoute).toBe("/hire/compare");
      expect(role.reviewRoute).toBe("/hire/review");
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=offer`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.offerSignal).toBeTruthy();
      expect(role.validationNote).toBeTruthy();
      expect(role.onboardingFocus).toBeTruthy();
      expect(role.readinessQuestion).toBeTruthy();
      expect(role.nextAction).toBeTruthy();
    }
  });

  it("keeps Chinese offer-readiness content structurally aligned", () => {
    const pack = getHiringOfferReadiness("zh");

    expect(pack.hero.headline).toContain("Offer readiness");
    expect(pack.roles).toHaveLength(4);
    expect(pack.summary).toHaveLength(4);
    expect(pack.close.primaryAction.href).toBe("/contact");
  });
});
