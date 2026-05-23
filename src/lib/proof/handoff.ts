import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getProofMaintenanceReport } from "./maintenance";
import { getRolePackets } from "./role-packets";
import { getProofValidationReport } from "./validation";
import type {
  HiringRoleId,
  ProofHandoffManifest,
  ProofHandoffRole,
} from "./types";

function buildRoleHandoff(role: HiringRoleId): ProofHandoffRole {
  const packet = getRolePackets("en").find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, "en");
  const followThrough = getFollowThroughBrief(role, "en");

  if (!packet || !applicationPacket || !followThrough) {
    throw new Error(`Missing proof handoff data for ${role}`);
  }

  return {
    id: packet.id,
    label: packet.label,
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
    claimCount: packet.proofClaims.length,
    strongestCases: packet.strongestCases,
    proofAnchors: packet.proofClaims.map((claim) => claim.strongestAnchor),
  };
}

export function getProofHandoffManifest(
  generatedAt = new Date().toISOString().slice(0, 10)
): ProofHandoffManifest {
  const validation = getProofValidationReport(generatedAt);
  const maintenance = getProofMaintenanceReport(generatedAt);
  const roles = getRolePackets("en").map((packet) => buildRoleHandoff(packet.id));

  return {
    generatedAt,
    status: validation.ok && maintenance.missingReview.length === 0 ? "ready" : "blocked",
    roles,
    validation: {
      ok: validation.ok,
      checkedRoutes: validation.checkedRoutes.length,
      checkedAnchors: validation.checkedAnchors,
      errors: validation.errors.length,
      warnings: validation.warnings.length,
    },
    maintenance: {
      total: maintenance.entries.length,
      fresh: maintenance.fresh.length,
      watch: maintenance.watch.length,
      stale: maintenance.stale.length,
      missingReview: maintenance.missingReview.length,
    },
    commands: ["pnpm proof:validate", "pnpm proof:handoff"],
  };
}
