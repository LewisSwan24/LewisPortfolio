import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringRetentionReadiness } from "./hiring-retention";
import { prefixedProofCopy } from "./label-utils";
import { getRolePackets } from "./role-packets";
import type {
  HiringPartnershipOperatingPack,
  HiringPartnershipOperatingRole,
  HiringRetentionReadinessRole,
  HiringRoleId,
  ProofLocale,
} from "./types";

const partnershipCopy = {
  en: {
    hero: {
      eyebrow: "Stage 35 partnership operating",
      headline: "Partnership operating pack for long-term work.",
      subhead:
        "A manager-ready board for turning retention readiness into an operating agreement, manager touchpoint, team ritual, escalation rule, success review, and next partnership action.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Retention readiness", href: "/hire/retention" },
    },
    summary: [
      {
        id: "partnership-lanes",
        label: "Partnership lanes",
        value: "4",
        detail: "Every hiring role has a long-term operating lane.",
      },
      {
        id: "agreement",
        label: "Agreement",
        value: "Practical",
        detail: "Each lane names the working agreement that keeps contribution clear.",
      },
      {
        id: "ritual",
        label: "Team ritual",
        value: "Repeatable",
        detail: "Each lane gives one team behavior that keeps the partnership visible.",
      },
      {
        id: "escalation",
        label: "Escalation",
        value: "Defined",
        detail: "Each lane states how to surface ambiguity before it slows delivery.",
      },
    ],
    signalPrefix: "Partnership signal",
    agreementPrefix: "Operating agreement",
    touchpointPrefix: "Manager touchpoint",
    ritualPrefix: "Team ritual",
    escalationPrefix: "Escalation rule",
    reviewPrefix: "Success review",
    actionPrefix: "Next partnership action",
    close: {
      title: "Use partnership operating once retention is the real decision.",
      body:
        "Open the closest role lane, inspect the proof anchor, agree the operating ritual, then use the escalation rule and success review to keep the partnership useful.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Retention readiness", href: "/hire/retention" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 35 partnership operating",
      headline: "用于长期工作的 Partnership operating pack。",
      subhead:
        "一个 manager-ready board，用来把 retention readiness 转成 operating agreement、manager touchpoint、team ritual、escalation rule、success review 和 next partnership action。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Retention readiness", href: "/hire/retention" },
    },
    summary: [
      {
        id: "partnership-lanes",
        label: "Partnership 路径",
        value: "4",
        detail: "每个招聘方向都有一条 long-term operating lane。",
      },
      {
        id: "agreement",
        label: "合作协议",
        value: "实际",
        detail: "每条路径都说明怎样让贡献保持清晰。",
      },
      {
        id: "ritual",
        label: "团队节奏",
        value: "可重复",
        detail: "每条路径都有一个让合作保持可见的团队行为。",
      },
      {
        id: "escalation",
        label: "升级规则",
        value: "已定义",
        detail: "每条路径都说明如何在不确定性拖慢交付前暴露问题。",
      },
    ],
    signalPrefix: "Partnership signal",
    agreementPrefix: "Operating agreement",
    touchpointPrefix: "Manager touchpoint",
    ritualPrefix: "Team ritual",
    escalationPrefix: "Escalation rule",
    reviewPrefix: "Success review",
    actionPrefix: "Next partnership action",
    close: {
      title: "当 retention 是真实决策时，用 partnership operating 对齐长期合作。",
      body:
        "打开最接近的岗位路径，检查 proof anchor，对齐 operating ritual，再用 escalation rule 和 success review 保持合作有效。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Retention readiness", href: "/hire/retention" },
    },
  },
} as const;

function buildPartnershipRole(
  role: HiringRoleId,
  locale: ProofLocale,
  retentionRoles: HiringRetentionReadinessRole[]
): HiringPartnershipOperatingRole {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);
  const retentionRole = retentionRoles.find((candidate) => candidate.id === role);

  if (!packet || !applicationPacket || !followThrough || !retentionRole) {
    throw new Error(`Missing hiring partnership operating data for ${role}`);
  }

  const copy = partnershipCopy[locale];
  const managerTouchpoint =
    followThrough.decisionQuestions[0] ?? retentionRole.managerSupport;
  const teamRitual =
    retentionRole.reviewCadence ?? followThrough.meetingAgenda[1] ?? managerTouchpoint;
  const escalationRule =
    applicationPacket.boundaries[0] ?? retentionRole.durabilityRisk;
  const successReview =
    retentionRole.nextRetentionQuestion ?? followThrough.decisionQuestions[1] ?? teamRitual;

  return {
    id: packet.id,
    label: packet.label,
    partnershipSignal: prefixedProofCopy(copy.signalPrefix, retentionRole.retentionSignal),
    operatingAgreement: prefixedProofCopy(copy.agreementPrefix, retentionRole.longTermFit),
    managerTouchpoint: prefixedProofCopy(copy.touchpointPrefix, managerTouchpoint),
    teamRitual: prefixedProofCopy(copy.ritualPrefix, teamRitual),
    escalationRule: prefixedProofCopy(copy.escalationPrefix, escalationRule),
    successReview: prefixedProofCopy(copy.reviewPrefix, successReview),
    nextPartnershipAction: prefixedProofCopy(
      copy.actionPrefix,
      retentionRole.nextRetentionQuestion
    ),
    proof: {
      claim: retentionRole.proof.claim,
      evidence: retentionRole.proof.evidence,
      boundary: retentionRole.proof.boundary,
      href: retentionRole.proof.href,
    },
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
    retentionRoute: "/hire/retention",
    growthRoute: "/hire/growth",
    impactRoute: "/hire/impact",
    kickoffRoute: "/hire/kickoff",
    onboardingRoute: "/hire/onboarding",
    offerRoute: "/hire/offer",
    decisionRoute: "/hire/decision",
    debriefRoute: "/hire/debrief",
    shortlistRoute: "/hire/shortlist",
    scorecardRoute: "/hire/scorecard",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    contactRoute: `/contact?role=${packet.id}&intent=partnership`,
  };
}

export function getHiringPartnershipOperatingPack(
  locale: ProofLocale
): HiringPartnershipOperatingPack {
  const copy = partnershipCopy[locale];
  const retentionRoles = getHiringRetentionReadiness(locale).roles;
  const roles = getRolePackets(locale).map((packet) =>
    buildPartnershipRole(packet.id, locale, retentionRoles)
  );

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    roles,
    hireRoute: "/hire",
    retentionRoute: "/hire/retention",
    growthRoute: "/hire/growth",
    impactRoute: "/hire/impact",
    kickoffRoute: "/hire/kickoff",
    onboardingRoute: "/hire/onboarding",
    offerRoute: "/hire/offer",
    decisionRoute: "/hire/decision",
    debriefRoute: "/hire/debrief",
    shortlistRoute: "/hire/shortlist",
    scorecardRoute: "/hire/scorecard",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    close: copy.close,
  };
}
