import { describe, expect, it } from "vitest";
import { getProofReleaseBundle } from "@/lib/proof";

describe("proof release bundle", () => {
  it("summarizes a deterministic proof release bundle", () => {
    const bundle = getProofReleaseBundle("2026-05-10");

    expect(bundle.label).toBe("proof-release-2026-05-10");
    expect(bundle.status).toBe("ready");
    expect(bundle.outputDir).toBe("docs/proof-release/2026-05-10");
    expect(bundle.summary.roles).toBe(4);
    expect(bundle.summary.routes).toBe(31);
    // 92: maintenance roleEntries flatMaps over the English proofClaims.
    // Removing the fabricated AI Interview Assistant took the ai-ux packet
    // from three claims to two, and accessibility from three to two.
    expect(bundle.summary.maintenanceEntries).toBe(92);
    expect(bundle.summary.anchors).toBeGreaterThan(0);
    expect(bundle.commands).toContain("pnpm proof:bundle");
  });

  it("attaches handoff markdown and artifact metadata", () => {
    const bundle = getProofReleaseBundle("2026-05-10");
    const [handoffArtifact, manifestArtifact] = bundle.artifacts;

    expect(bundle.handoff.filename).toBe("proof-handoff-2026-05-10.md");
    expect(bundle.handoff.content).toContain("# Proof Handoff Manifest");
    expect(handoffArtifact).toEqual({
      kind: "handoff-markdown",
      filename: "proof-handoff-2026-05-10.md",
      format: "markdown",
      bytes: bundle.handoff.content.length,
    });
    expect(manifestArtifact).toMatchObject({
      kind: "release-manifest",
      filename: "proof-release-2026-05-10.json",
      format: "json",
    });
    expect(manifestArtifact?.bytes).toBeGreaterThan(0);
  });
});
