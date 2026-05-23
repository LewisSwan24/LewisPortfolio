import { describe, expect, it } from "vitest";
import { getInterviewAgendaBoard, hiringRoleIds } from "@/lib/proof";

describe("interview agenda board", () => {
  it("summarizes first-interview prep for every role", () => {
    const board = getInterviewAgendaBoard("en");

    expect(board.hero.headline).toContain("Interview agenda");
    expect(board.compareRoute).toBe("/hire/compare");
    expect(board.reviewRoute).toBe("/hire/review");
    expect(board.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    expect(board.agendaPhases).toHaveLength(4);
  });

  it("includes complete role interview routes and proof anchors", () => {
    const board = getInterviewAgendaBoard("en");

    for (const role of board.roles) {
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=interview`);
      expect(role.compareRoute).toBe("/hire/compare");
      expect(role.reviewRoute).toBe("/hire/review");
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.firstQuestion).toBeTruthy();
      expect(role.agendaItems.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("keeps Chinese agenda content structurally aligned", () => {
    const board = getInterviewAgendaBoard("zh");

    expect(board.hero.headline).toContain("面试");
    expect(board.roles).toHaveLength(4);
    expect(board.agendaPhases).toHaveLength(4);
    expect(board.close.primaryAction.href).toBe("/contact");
  });
});
