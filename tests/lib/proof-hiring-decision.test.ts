import { describe, expect, it } from "vitest";
import { getHiringDecisionPack, hiringRoleIds } from "@/lib/proof";

describe("hiring decision pack", () => {
  it("summarizes final decision work for every role", () => {
    const pack = getHiringDecisionPack("en");

    expect(pack.hero.headline).toContain("Hiring decision pack");
    expect(pack.debriefRoute).toBe("/hire/debrief");
    expect(pack.shortlistRoute).toBe("/hire/shortlist");
    expect(pack.scorecardRoute).toBe("/hire/scorecard");
    expect(pack.interviewRoute).toBe("/hire/interview");
    expect(pack.compareRoute).toBe("/hire/compare");
    expect(pack.reviewRoute).toBe("/hire/review");
    expect(pack.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    expect(pack.summary).toHaveLength(4);
  });

  it("includes complete role decision routes and proof anchors", () => {
    const pack = getHiringDecisionPack("en");

    for (const role of pack.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.debriefRoute).toBe("/hire/debrief");
      expect(role.shortlistRoute).toBe("/hire/shortlist");
      expect(role.scorecardRoute).toBe("/hire/scorecard");
      expect(role.interviewRoute).toBe("/hire/interview");
      expect(role.compareRoute).toBe("/hire/compare");
      expect(role.reviewRoute).toBe("/hire/review");
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=decision`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.decisionSignal).toBeTruthy();
      expect(role.remainingRisk).toBeTruthy();
      expect(role.closeQuestion).toBeTruthy();
      expect(role.nextAction).toBeTruthy();
    }
  });

  it("keeps Chinese decision content structurally aligned", () => {
    const pack = getHiringDecisionPack("zh");

    expect(pack.hero.headline).toContain("decision");
    expect(pack.roles).toHaveLength(4);
    expect(pack.summary).toHaveLength(4);
    expect(pack.close.primaryAction.href).toBe("/contact");
  });
});
