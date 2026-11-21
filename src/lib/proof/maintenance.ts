import { getApplicationPackets } from "./application-packets";
import { getFollowThroughBriefs } from "./follow-through";
import { getRolePackets } from "./role-packets";
import {
  getCaseReviewMeta,
  getRegistryReviewWindow,
} from "@/lib/cases/registry";
import type {
  ConsolidatedHiringView,
  ProofFreshnessStatus,
  ProofMaintenanceEntry,
  ProofMaintenanceReport,
  ProofMaintenanceSurface,
} from "./types";

const watchWindowDays = 30;
const dayMs = 24 * 60 * 60 * 1000;

function extractCaseSlugFromHref(href: string): string | undefined {
  const match = href.match(/^\/projects\/([^#/?]+)/);
  return match?.[1];
}

function statusFor(
  entryNextReviewAt: string,
  generatedAt: string
): ProofFreshnessStatus {
  const reviewDate = new Date(`${entryNextReviewAt}T00:00:00.000Z`);
  const generatedDate = new Date(`${generatedAt}T00:00:00.000Z`);
  const daysUntilReview = Math.ceil(
    (reviewDate.getTime() - generatedDate.getTime()) / dayMs
  );

  if (daysUntilReview < 0) return "stale";
  if (daysUntilReview <= watchWindowDays) return "watch";
  return "fresh";
}

function buildProofMaintenanceEntries(): ProofMaintenanceEntry[] {
  const { reviewedAt, nextReviewAt } = getRegistryReviewWindow();

  const roleEntries: ProofMaintenanceEntry[] = getRolePackets("en").flatMap((packet) =>
    packet.proofClaims.map((claim) => {
      const linkedSlug = extractCaseSlugFromHref(claim.strongestAnchor);
      const caseReview = linkedSlug ? getCaseReviewMeta(linkedSlug) : undefined;
      return {
        id: `${packet.id}-${claim.id}-role-room`,
        roleId: packet.id,
        claimId: claim.id,
        surface: "role-room",
        href: claim.strongestAnchor,
        reviewedAt: caseReview?.reviewedAt ?? reviewedAt,
        nextReviewAt: caseReview?.nextReviewAt ?? nextReviewAt,
        status: "fresh",
        ownerNote:
          caseReview?.auditNote ??
          "Re-check claim, anchor, boundary, and next validation before refreshing role-room proof.",
      };
    })
  );

  const applicationEntries: ProofMaintenanceEntry[] = getApplicationPackets("en").map((packet) => ({
    id: `${packet.id}-application-packet`,
    roleId: packet.id,
    claimId: `${packet.id}-application-packet`,
    surface: "application-packet",
    href: packet.route,
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm packet proof, interview focus, and boundaries still match the source role room.",
  }));

  const followThroughEntries: ProofMaintenanceEntry[] = getFollowThroughBriefs("en").map((brief) => ({
    id: `${brief.id}-follow-through`,
    roleId: brief.id,
    claimId: `${brief.id}-follow-through`,
    surface: "follow-through",
    href: brief.route,
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm follow-through email, agenda, decision questions, and packet links still match the role.",
  }));

  const consolidatedViews: Array<{
    idSuffix: string;
    surface: ProofMaintenanceSurface;
    view: ConsolidatedHiringView;
    ownerNote: string;
  }> = [
    {
      idSuffix: "proof-review-room",
      surface: "review-room",
      view: "review",
      ownerNote:
        "Confirm the consolidated hiring review still summarizes this role's routes, anchors, claims, and next actions.",
    },
    {
      idSuffix: "role-comparison",
      surface: "role-comparison",
      view: "compare",
      ownerNote:
        "Confirm the role comparison view still points this role to the right lane, dossier, follow-through plan, and proof anchor.",
    },
    {
      idSuffix: "interview-agenda",
      surface: "interview-agenda",
      view: "interview",
      ownerNote:
        "Confirm the interview agenda still points this role to the right first question, proof anchor, dossier, and follow-through plan.",
    },
    {
      idSuffix: "hiring-scorecard",
      surface: "hiring-scorecard",
      view: "scorecard",
      ownerNote:
        "Confirm the hiring scorecard view still points this role to the right proof anchor, boundary, prompts, and next action.",
    },
    {
      idSuffix: "hiring-shortlist",
      surface: "hiring-shortlist",
      view: "shortlist",
      ownerNote:
        "Confirm the hiring shortlist memo view still points this role to the right proof anchor, boundary, manager note, and next action.",
    },
    {
      idSuffix: "hiring-debrief",
      surface: "hiring-debrief",
      view: "debrief",
      ownerNote:
        "Confirm the hiring manager debrief view still points this role to the right proof anchor, boundary, manager brief, second-round question, and next action.",
    },
    {
      idSuffix: "hiring-decision",
      surface: "hiring-decision",
      view: "decision",
      ownerNote:
        "Confirm the hiring decision pack view still points this role to the right proof anchor, remaining risk, close question, and next action.",
    },
    {
      idSuffix: "hiring-offer",
      surface: "hiring-offer",
      view: "offer",
      ownerNote:
        "Confirm the hiring offer readiness view still points this role to the right proof anchor, validation note, onboarding focus, readiness question, and next action.",
    },
    {
      idSuffix: "hiring-onboarding",
      surface: "hiring-onboarding",
      view: "onboarding",
      ownerNote:
        "Confirm the hiring onboarding readiness view still points this role to the right proof anchor, first-week focus, first-30-days outcome, onboarding risk, manager question, and next action.",
    },
    {
      idSuffix: "hiring-kickoff",
      surface: "hiring-kickoff",
      view: "kickoff",
      ownerNote:
        "Confirm the hiring kickoff alignment view still points this role to the right proof anchor, first project brief, success metric, stakeholder question, delivery artifact, risk guardrail, and next action.",
    },
    {
      idSuffix: "hiring-impact",
      surface: "hiring-impact",
      view: "impact",
      ownerNote:
        "Confirm the hiring impact review view still points this role to the right proof anchor, review metric, first-month evidence, stakeholder checkpoint, delivery review, risk watch, and next milestone.",
    },
    {
      idSuffix: "hiring-growth",
      surface: "hiring-growth",
      view: "growth",
      ownerNote:
        "Confirm the hiring growth roadmap view still points this role to the right proof anchor, growth signal, 90-day outcome, team leverage, capability transfer, operating rhythm, risk to monitor, and next review.",
    },
    {
      idSuffix: "hiring-retention",
      surface: "hiring-retention",
      view: "retention",
      ownerNote:
        "Confirm the hiring retention readiness view still points this role to the right proof anchor, retention signal, long-term fit, manager support, team dependency, durability risk, review cadence, and next retention question.",
    },
    {
      idSuffix: "hiring-partnership",
      surface: "hiring-partnership",
      view: "partnership",
      ownerNote:
        "Confirm the hiring partnership operating view still points this role to the right proof anchor, partnership signal, operating agreement, manager touchpoint, team ritual, escalation rule, success review, and next partnership action.",
    },
    {
      idSuffix: "hiring-command",
      surface: "hiring-command",
      view: "command",
      ownerNote:
        "Confirm the hiring command view still points this role to the right proof anchor, command sequence, decision focus, manager risk, team handoff, escalation trigger, and next command action.",
    },
    {
      idSuffix: "hiring-briefing",
      surface: "hiring-briefing",
      view: "briefing",
      ownerNote:
        "Confirm the hiring briefing view still points this role to the right proof anchor, stakeholder context, opening context, evidence to inspect, risk to resolve, handoff note, follow-up owner, and next briefing action.",
    },
    {
      idSuffix: "hiring-readiness",
      surface: "hiring-readiness",
      view: "readiness",
      ownerNote:
        "Confirm the hiring readiness gate view still points this role to the right proof anchor, readiness score, proven evidence, validation gap, stakeholder owner, decision gate, recommended route, and next readiness action.",
    },
    {
      idSuffix: "hiring-action",
      surface: "hiring-action",
      view: "action",
      ownerNote:
        "Confirm the hiring action board view still points this role to the right proof anchor, readiness score, action owner, first action, route to open, fallback, and next action.",
    },
    {
      idSuffix: "hiring-tracker",
      surface: "hiring-tracker",
      view: "tracker",
      ownerNote:
        "Confirm the hiring follow-up tracker view still points this role to the right proof anchor, owner, due window, evidence dependency, escalation path, and closeout signal.",
    },
  ];

  const packets = getRolePackets("en");
  const consolidatedViewEntries: ProofMaintenanceEntry[] = consolidatedViews.flatMap((config) =>
    packets.map((packet) => ({
      id: `${packet.id}-${config.idSuffix}`,
      roleId: packet.id,
      claimId: `${packet.id}-${config.idSuffix}`,
      surface: config.surface,
      href: `/hire?view=${config.view}` as const,
      reviewedAt,
      nextReviewAt,
      status: "fresh" as const,
      ownerNote: config.ownerNote,
    }))
  );

  return [
    ...roleEntries,
    ...applicationEntries,
    ...followThroughEntries,
    ...consolidatedViewEntries,
  ];
}

export function getProofMaintenanceEntries(): ProofMaintenanceEntry[] {
  return buildProofMaintenanceEntries().map((entry) => ({ ...entry }));
}

export function getProofMaintenanceReport(
  generatedAt = new Date().toISOString().slice(0, 10)
): ProofMaintenanceReport {
  const entries = getProofMaintenanceEntries().map((entry) => ({
    ...entry,
    status: statusFor(entry.nextReviewAt, generatedAt),
  }));

  return {
    generatedAt,
    entries,
    fresh: entries.filter((entry) => entry.status === "fresh"),
    watch: entries.filter((entry) => entry.status === "watch"),
    stale: entries.filter((entry) => entry.status === "stale"),
    missingReview: entries
      .filter((entry) => !entry.reviewedAt || !entry.nextReviewAt)
      .map((entry) => entry.id),
  };
}
