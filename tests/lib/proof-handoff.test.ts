import { describe, expect, it } from "vitest";
import { getProofHandoffManifest, hiringRoleIds } from "@/lib/proof";

describe("proof handoff manifest", () => {
  it("summarizes the current proof system as ready", () => {
    const manifest = getProofHandoffManifest("2026-05-10");

    expect(manifest.status).toBe("ready");
    expect(manifest.validation.ok).toBe(true);
    expect(manifest.maintenance.missingReview).toBe(0);
    expect(manifest.commands).toContain("pnpm proof:validate");
  });

  it("includes all role handoff routes", () => {
    const manifest = getProofHandoffManifest("2026-05-10");

    expect(manifest.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    for (const role of manifest.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.claimCount).toBeGreaterThanOrEqual(2);
      expect(role.proofAnchors.length).toBeGreaterThanOrEqual(2);
    }
  });
});
