import { describe, expect, it } from "vitest";
import { getProofHandoffExport, hiringRoleIds } from "@/lib/proof";

describe("proof handoff export", () => {
  it("renders a deterministic markdown handoff", () => {
    const exportArtifact = getProofHandoffExport("2026-05-10");

    expect(exportArtifact.format).toBe("markdown");
    expect(exportArtifact.filename).toBe("proof-handoff-2026-05-10.md");
    expect(exportArtifact.content).toContain("# Proof Handoff Manifest");
    expect(exportArtifact.content).toContain("Status: ready");
    expect(exportArtifact.content).toContain("pnpm proof:validate");
    expect(exportArtifact.content).toContain("Maintenance: 92 total");
    for (const view of [
      "compare",
      "interview",
      "scorecard",
      "shortlist",
      "debrief",
      "decision",
      "offer",
      "onboarding",
      "kickoff",
      "impact",
      "growth",
      "retention",
      "partnership",
      "command",
      "briefing",
      "readiness",
      "action",
      "tracker",
    ]) {
      expect(exportArtifact.content).toContain(`/hire?view=${view}`);
    }
  });

  it("includes every role route in the markdown", () => {
    const exportArtifact = getProofHandoffExport("2026-05-10");

    for (const role of hiringRoleIds) {
      expect(exportArtifact.content).toContain(`/hire?role=${role}`);
      expect(exportArtifact.content).toContain(`/contact?role=${role}`);
      expect(exportArtifact.content).toContain(`/contact?role=${role}&intent=interview`);
    }
  });
});
