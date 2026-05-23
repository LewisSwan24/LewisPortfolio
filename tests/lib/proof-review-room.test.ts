import { describe, expect, it } from "vitest";
import { getProofReviewRoom, hiringRoleIds } from "@/lib/proof";

describe("proof review room", () => {
  it("summarizes the proof system for recruiter review", () => {
    const room = getProofReviewRoom("en", "2026-05-10");

    expect(room.status).toBe("ready");
    expect(room.hero.headline).toContain("Proof review room");
    expect(room.signals.map((signal) => signal.id)).toEqual([
      "validation",
      "maintenance",
      "handoff",
      "export",
      "bundle",
    ]);
    expect(room.commands.map((command) => command.command)).toContain("pnpm proof:bundle");
    expect(room.bundle.outputDir).toBe("docs/proof-release/2026-05-10");
    expect(room.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    expect(room.anchorLedger.length).toBeGreaterThan(0);
  });

  it("includes complete route coverage for each hiring role", () => {
    const room = getProofReviewRoom("en", "2026-05-10");

    for (const role of room.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.contactRoute).toBe(`/contact?role=${role.id}`);
      expect(role.claimCount).toBeGreaterThanOrEqual(2);
      expect(role.proofAnchorCount).toBe(role.anchorHrefs.length);
      expect(role.primaryClaim).toBeTruthy();
    }
  });

  it("keeps Chinese review content structurally aligned", () => {
    const room = getProofReviewRoom("zh", "2026-05-10");

    expect(room.hero.headline).toContain("Proof");
    expect(room.roles).toHaveLength(4);
    expect(room.signals).toHaveLength(5);
    expect(room.readingSequence).toHaveLength(4);
    expect(room.close.primaryAction.href).toBe("/contact");
  });
});
