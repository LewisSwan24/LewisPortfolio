import { describe, expect, it } from "vitest";
import { getRoleComparisonBoard, hiringRoleIds } from "@/lib/proof";

describe("role comparison board", () => {
  it("summarizes all role paths for recruiter comparison", () => {
    const board = getRoleComparisonBoard("en");

    expect(board.hero.headline).toContain("Compare role paths");
    expect(board.reviewRoute).toBe("/hire/review");
    expect(board.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    expect(board.criteria).toHaveLength(4);
    expect(board.decisionSequence.length).toBeGreaterThanOrEqual(3);
  });

  it("includes complete action routes and proof anchors for each role", () => {
    const board = getRoleComparisonBoard("en");

    for (const role of board.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.contactRoute).toBe(`/contact?role=${role.id}`);
      expect(role.reviewRoute).toBe("/hire/review");
      expect(role.claimCount).toBeGreaterThanOrEqual(2);
      expect(role.anchorCount).toBeGreaterThanOrEqual(2);
      expect(role.strongestProof.href).toContain("#");
      expect(role.strongestProof.boundary).toBeTruthy();
      expect(role.interviewQuestion).toBeTruthy();
    }
  });

  it("keeps Chinese comparison content structurally aligned", () => {
    const board = getRoleComparisonBoard("zh");

    expect(board.hero.headline).toContain("岗位");
    expect(board.roles).toHaveLength(4);
    expect(board.criteria).toHaveLength(4);
    expect(board.decisionSequence).toHaveLength(4);
    expect(board.close.primaryAction.href).toBe("/contact");
  });
});
