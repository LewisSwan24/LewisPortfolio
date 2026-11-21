import { getApplicationPackets } from "./application-packets";
import { getFollowThroughBriefs } from "./follow-through";
import { getRolePackets } from "./role-packets";
import {
  getCaseReviewMeta,
  getRegistryReviewWindow,
} from "@/lib/cases/registry";
import type {
  ProofFreshnessStatus,
  ProofMaintenanceEntry,
  ProofMaintenanceReport,
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

  const reviewRoomEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-proof-review-room`,
    roleId: packet.id,
    claimId: `${packet.id}-proof-review-room`,
    surface: "review-room",
    href: "/hire/review",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the public proof review room still summarizes this role's routes, anchors, claims, and next actions.",
  }));

  const comparisonEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-role-comparison`,
    roleId: packet.id,
    claimId: `${packet.id}-role-comparison`,
    surface: "role-comparison",
    href: "/hire/compare",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the role comparison board still points this role to the right lane, packet, follow-through plan, and proof anchor.",
  }));

  const agendaEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-interview-agenda`,
    roleId: packet.id,
    claimId: `${packet.id}-interview-agenda`,
    surface: "interview-agenda",
    href: "/hire/interview",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the interview agenda still points this role to the right first question, proof anchor, packet, and follow-through plan.",
  }));

  const scorecardEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-scorecard`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-scorecard`,
    surface: "hiring-scorecard",
    href: "/hire/scorecard",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring scorecard still points this role to the right proof anchor, boundary, prompts, and next action.",
  }));

  const shortlistEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-shortlist`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-shortlist`,
    surface: "hiring-shortlist",
    href: "/hire/shortlist",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring shortlist memo still points this role to the right proof anchor, boundary, manager note, and next action.",
  }));

  const debriefEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-debrief`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-debrief`,
    surface: "hiring-debrief",
    href: "/hire/debrief",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring manager debrief still points this role to the right proof anchor, boundary, manager brief, second-round question, and next action.",
  }));

  const decisionEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-decision`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-decision`,
    surface: "hiring-decision",
    href: "/hire/decision",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring decision pack still points this role to the right proof anchor, remaining risk, close question, and next action.",
  }));

  const offerEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-offer`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-offer`,
    surface: "hiring-offer",
    href: "/hire/offer",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring offer readiness pack still points this role to the right proof anchor, validation note, onboarding focus, readiness question, and next action.",
  }));

  const onboardingEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-onboarding`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-onboarding`,
    surface: "hiring-onboarding",
    href: "/hire/onboarding",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring onboarding readiness pack still points this role to the right proof anchor, first-week focus, first-30-days outcome, onboarding risk, manager question, and next action.",
  }));

  const kickoffEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-kickoff`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-kickoff`,
    surface: "hiring-kickoff",
    href: "/hire/kickoff",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring kickoff alignment pack still points this role to the right proof anchor, first project brief, success metric, stakeholder question, delivery artifact, risk guardrail, and next action.",
  }));

  const impactEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-impact`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-impact`,
    surface: "hiring-impact",
    href: "/hire/impact",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring impact review pack still points this role to the right proof anchor, review metric, first-month evidence, stakeholder checkpoint, delivery review, risk watch, and next milestone.",
  }));

  const growthEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-growth`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-growth`,
    surface: "hiring-growth",
    href: "/hire/growth",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring growth roadmap pack still points this role to the right proof anchor, growth signal, 90-day outcome, team leverage, capability transfer, operating rhythm, risk to monitor, and next review.",
  }));

  const retentionEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-retention`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-retention`,
    surface: "hiring-retention",
    href: "/hire/retention",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring retention readiness pack still points this role to the right proof anchor, retention signal, long-term fit, manager support, team dependency, durability risk, review cadence, and next retention question.",
  }));

  const partnershipEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-partnership`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-partnership`,
    surface: "hiring-partnership",
    href: "/hire/partnership",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring partnership operating pack still points this role to the right proof anchor, partnership signal, operating agreement, manager touchpoint, team ritual, escalation rule, success review, and next partnership action.",
  }));

  const commandEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-command`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-command`,
    surface: "hiring-command",
    href: "/hire/command",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring command center still points this role to the right proof anchor, command sequence, decision focus, manager risk, team handoff, escalation trigger, and next command action.",
  }));

  const briefingEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-briefing`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-briefing`,
    surface: "hiring-briefing",
    href: "/hire/briefing",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring briefing room still points this role to the right proof anchor, stakeholder context, opening context, evidence to inspect, risk to resolve, handoff note, follow-up owner, and next briefing action.",
  }));

  const readinessEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-readiness`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-readiness`,
    surface: "hiring-readiness",
    href: "/hire/readiness",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring readiness gate still points this role to the right proof anchor, readiness score, proven evidence, validation gap, stakeholder owner, decision gate, recommended route, and next readiness action.",
  }));

  const actionEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-action`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-action`,
    surface: "hiring-action",
    href: "/hire/action",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring action board still points this role to the right proof anchor, readiness score, action owner, first action, route to open, fallback, and next action.",
  }));

  const trackerEntries: ProofMaintenanceEntry[] = getRolePackets("en").map((packet) => ({
    id: `${packet.id}-hiring-tracker`,
    roleId: packet.id,
    claimId: `${packet.id}-hiring-tracker`,
    surface: "hiring-tracker",
    href: "/hire/tracker",
    reviewedAt,
    nextReviewAt,
    status: "fresh",
    ownerNote:
      "Confirm the hiring follow-up tracker still points this role to the right proof anchor, owner, due window, evidence dependency, escalation path, and closeout signal.",
  }));

  return [
    ...roleEntries,
    ...applicationEntries,
    ...followThroughEntries,
    ...reviewRoomEntries,
    ...comparisonEntries,
    ...agendaEntries,
    ...scorecardEntries,
    ...shortlistEntries,
    ...debriefEntries,
    ...decisionEntries,
    ...offerEntries,
    ...onboardingEntries,
    ...kickoffEntries,
    ...impactEntries,
    ...growthEntries,
    ...retentionEntries,
    ...partnershipEntries,
    ...commandEntries,
    ...briefingEntries,
    ...readinessEntries,
    ...actionEntries,
    ...trackerEntries,
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
