import { describe, expect, it } from "vitest";
import { getHiringScorecardBoard, hiringRoleIds } from "@/lib/proof";

describe("hiring scorecard board", () => {
  it("summarizes post-interview scoring for every role", () => {
    const board = getHiringScorecardBoard("en");

    expect(board.hero.headline).toContain("Hiring scorecard");
    expect(board.interviewRoute).toBe("/hire/interview");
    expect(board.compareRoute).toBe("/hire/compare");
    expect(board.reviewRoute).toBe("/hire/review");
    expect(board.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    expect(board.criteria).toHaveLength(4);
  });

  it("includes complete role scorecard routes and proof anchors", () => {
    const board = getHiringScorecardBoard("en");

    for (const role of board.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.interviewRoute).toBe("/hire/interview");
      expect(role.compareRoute).toBe("/hire/compare");
      expect(role.reviewRoute).toBe("/hire/review");
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=scorecard`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.scorePrompts.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps Chinese scorecard content structurally aligned", () => {
    const board = getHiringScorecardBoard("zh");

    expect(board.hero.headline).toContain("评分");
    expect(board.roles).toHaveLength(4);
    expect(board.criteria).toHaveLength(4);
    expect(board.close.primaryAction.href).toBe("/contact");
  });
});
