import { describe, expect, it } from "vitest";
import { getHiringShortlistMemo, hiringRoleIds } from "@/lib/proof";

describe("hiring shortlist memo", () => {
  it("summarizes shortlist decisions for every role", () => {
    const memo = getHiringShortlistMemo("en");

    expect(memo.hero.headline).toContain("Shortlist memo");
    expect(memo.scorecardRoute).toBe("/hire/scorecard");
    expect(memo.interviewRoute).toBe("/hire/interview");
    expect(memo.compareRoute).toBe("/hire/compare");
    expect(memo.reviewRoute).toBe("/hire/review");
    expect(memo.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    expect(memo.summary).toHaveLength(4);
  });

  it("includes complete role memo routes and proof anchors", () => {
    const memo = getHiringShortlistMemo("en");

    for (const role of memo.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.scorecardRoute).toBe("/hire/scorecard");
      expect(role.interviewRoute).toBe("/hire/interview");
      expect(role.compareRoute).toBe("/hire/compare");
      expect(role.reviewRoute).toBe("/hire/review");
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=scorecard`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.managerNote).toBeTruthy();
      expect(role.nextAction).toBeTruthy();
    }
  });

  it("keeps Chinese shortlist content structurally aligned", () => {
    const memo = getHiringShortlistMemo("zh");

    expect(memo.hero.headline).toContain("Shortlist");
    expect(memo.roles).toHaveLength(4);
    expect(memo.summary).toHaveLength(4);
    expect(memo.close.primaryAction.href).toBe("/contact");
  });
});
