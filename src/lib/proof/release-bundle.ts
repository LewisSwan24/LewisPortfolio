import { getProofHandoffExport } from "./handoff-export";
import { getProofHandoffManifest } from "./handoff";
import type { ProofReleaseBundle, ProofReleaseBundleArtifact } from "./types";

function buildReleaseManifestBytes(input: Omit<ProofReleaseBundle, "artifacts">) {
  let releaseManifestBytes = 0;
  let artifacts: ProofReleaseBundleArtifact[] = [];

  for (let index = 0; index < 3; index += 1) {
    artifacts = [
      {
        kind: "handoff-markdown",
        filename: input.handoff.filename,
        format: input.handoff.format,
        bytes: input.handoff.content.length,
      },
      {
        kind: "release-manifest",
        filename: `${input.label}.json`,
        format: "json",
        bytes: releaseManifestBytes,
      },
    ];

    releaseManifestBytes = `${JSON.stringify({ ...input, artifacts }, null, 2)}\n`.length;
  }

  return artifacts;
}

export function getProofReleaseBundle(
  generatedAt = new Date().toISOString().slice(0, 10)
): ProofReleaseBundle {
  const manifest = getProofHandoffManifest(generatedAt);
  const handoff = getProofHandoffExport(generatedAt);
  const commands = [...manifest.commands, "pnpm proof:export", "pnpm proof:bundle"];
  const bundleBase: Omit<ProofReleaseBundle, "artifacts"> = {
    generatedAt,
    label: `proof-release-${generatedAt}`,
    status: manifest.status,
    outputDir: `docs/proof-release/${generatedAt}`,
    handoff,
    commands,
    summary: {
      roles: manifest.roles.length,
      routes: manifest.validation.checkedRoutes,
      anchors: manifest.validation.checkedAnchors,
      maintenanceEntries: manifest.maintenance.total,
    },
  };

  return {
    ...bundleBase,
    artifacts: buildReleaseManifestBytes(bundleBase),
  };
}
