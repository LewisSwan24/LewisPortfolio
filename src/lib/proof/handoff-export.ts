import { getProofHandoffManifest } from "./handoff";
import type { ProofHandoffExport, ProofHandoffManifest } from "./types";

function renderCommands(commands: string[]) {
  return commands.map((command) => `- \`${command}\``).join("\n");
}

function renderRoles(manifest: ProofHandoffManifest) {
  return manifest.roles
    .map((role) =>
      [
        `### ${role.label}`,
        "",
        `- Role route: \`${role.roleRoute}\``,
        `- Packet route: \`${role.packetRoute}\``,
        `- Follow-through route: \`${role.followThroughRoute}\``,
        `- Claims: ${role.claimCount}`,
        `- Strongest cases: ${role.strongestCases.join(", ")}`,
        `- Proof anchors: ${role.proofAnchors.map((anchor) => `\`${anchor}\``).join(", ")}`,
      ].join("\n")
    )
    .join("\n\n");
}

function renderMarkdown(manifest: ProofHandoffManifest) {
  return [
    "# Proof Handoff Manifest",
    "",
    `Generated: ${manifest.generatedAt}`,
    `Status: ${manifest.status}`,
    "",
    "## Validation",
    "",
    `- OK: ${manifest.validation.ok ? "yes" : "no"}`,
    `- Routes checked: ${manifest.validation.checkedRoutes}`,
    `- Anchors checked: ${manifest.validation.checkedAnchors}`,
    `- Errors: ${manifest.validation.errors}`,
    `- Warnings: ${manifest.validation.warnings}`,
    "",
    "## Maintenance",
    "",
    `Maintenance: ${manifest.maintenance.total} total, ${manifest.maintenance.fresh} fresh, ${manifest.maintenance.watch} watch, ${manifest.maintenance.stale} stale`,
    `- Missing review metadata: ${manifest.maintenance.missingReview}`,
    "",
    "## Commands",
    "",
    renderCommands(manifest.commands),
    "",
    "## Shared Routes",
    "",
    "- Compare route: `/hire?view=compare`",
    "- Interview route: `/hire?view=interview`",
    "- Scorecard route: `/hire?view=scorecard`",
    "- Shortlist route: `/hire?view=shortlist`",
    "- Debrief route: `/hire?view=debrief`",
    "- Decision route: `/hire?view=decision`",
    "- Offer route: `/hire?view=offer`",
    "- Onboarding route: `/hire?view=onboarding`",
    "- Kickoff route: `/hire?view=kickoff`",
    "- Impact route: `/hire?view=impact`",
    "- Growth route: `/hire?view=growth`",
    "- Retention route: `/hire?view=retention`",
    "- Partnership route: `/hire?view=partnership`",
    "- Command route: `/hire?view=command`",
    "- Briefing route: `/hire?view=briefing`",
    "- Readiness route: `/hire?view=readiness`",
    "- Action route: `/hire?view=action`",
    "- Tracker route: `/hire?view=tracker`",
    "- Review route: `/hire?view=review`",
    "",
    "## Roles",
    "",
    renderRoles(manifest),
    "",
  ].join("\n");
}

export function getProofHandoffExport(
  generatedAt = new Date().toISOString().slice(0, 10)
): ProofHandoffExport {
  const manifest = getProofHandoffManifest(generatedAt);

  return {
    generatedAt,
    format: "markdown",
    filename: `proof-handoff-${generatedAt}.md`,
    content: renderMarkdown(manifest),
  };
}
