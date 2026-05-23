import { describe, expect, it } from "vitest";
import { getHiringManagerDebrief, hiringRoleIds } from "@/lib/proof";

describe("hiring manager debrief", () => {
  it("summarizes second-round debrief work for every role", () => {
    const board = getHiringManagerDebrief("en");

    expect(board.hero.headline).toContain("Hiring manager debrief");
    expect(board.shortlistRoute).toBe("/hire/shortlist");
    expect(board.scorecardRoute).toBe("/hire/scorecard");
    expect(board.interviewRoute).toBe("/hire/interview");
    expect(board.compareRoute).toBe("/hire/compare");
    expect(board.reviewRoute).toBe("/hire/review");
    expect(board.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    expect(board.summary).toHaveLength(4);
  });

  it("includes complete role debrief routes and proof anchors", () => {
    const board = getHiringManagerDebrief("en");

    for (const role of board.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.shortlistRoute).toBe("/hire/shortlist");
      expect(role.scorecardRoute).toBe("/hire/scorecard");
      expect(role.interviewRoute).toBe("/hire/interview");
      expect(role.compareRoute).toBe("/hire/compare");
      expect(role.reviewRoute).toBe("/hire/review");
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=debrief`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.managerBrief).toBeTruthy();
      expect(role.secondRoundQuestion).toBeTruthy();
      expect(role.nextAction).toBeTruthy();
    }
  });

  it("keeps Chinese debrief content structurally aligned", () => {
    const board = getHiringManagerDebrief("zh");

    expect(board.hero.headline).toContain("debrief");
    expect(board.roles).toHaveLength(4);
    expect(board.summary).toHaveLength(4);
    expect(board.close.primaryAction.href).toBe("/contact");
  });
});
