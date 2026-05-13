import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringGrowthRoadmap } from "./hiring-growth";
import { getHiringImpactReview } from "./hiring-impact";
import { getHiringKickoffAlignment } from "./hiring-kickoff";
import { getHiringOnboardingReadiness } from "./hiring-onboarding";
import { prefixedProofCopy } from "./label-utils";
import { getRolePackets } from "./role-packets";
import type {
  HiringGrowthRoadmapRole,
  HiringImpactReviewRole,
  HiringKickoffAlignmentRole,
  HiringOnboardingReadinessRole,
  HiringRetentionReadinessPack,
  HiringRetentionReadinessRole,
  HiringRoleId,
  ProofLocale,
} from "./types";

const retentionCopy = {
  en: {
    hero: {
      eyebrow: "Stage 34 retention readiness",
      headline: "Retention readiness pack for long-term fit.",
      subhead:
        "A manager-ready board for turning 90-day growth into durable contribution, manager support, team dependency, risk monitoring, review cadence, and the next retention question.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Growth roadmap", href: "/hire/growth" },
    },
    summary: [
      {
        id: "retention-lanes",
        label: "Retention lanes",
        value: "4",
        detail: "Every hiring role has a long-term retention lane.",
      },
      {
        id: "long-term-fit",
        label: "Long-term fit",
        value: "Visible",
        detail: "Each lane states how the 90-day outcome can keep compounding.",
      },
      {
        id: "manager-support",
        label: "Manager support",
        value: "Explicit",
        detail: "Each lane names what support keeps the work durable.",
      },
      {
        id: "review-cadence",
        label: "Review cadence",
        value: "Practical",
        detail: "Each lane gives a review rhythm and a retention question.",
      },
    ],
    signalPrefix: "Retention signal",
    fitPrefix: "Long-term fit",
    supportPrefix: "Manager support",
    dependencyPrefix: "Team dependency",
    riskPrefix: "Durability risk",
    cadencePrefix: "Review cadence",
    questionPrefix: "Next retention question",
    close: {
      title: "Use retention readiness after the 90-day growth signal is visible.",
      body:
        "Open the closest role lane, inspect the proof anchor, compare long-term fit with manager support, then use the retention question to decide how Lewis should keep compounding with the team.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Growth roadmap", href: "/hire/growth" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 34 retention readiness",
      headline: "用于长期匹配的 Retention readiness pack。",
      subhead:
        "一个 manager-ready board，用来把 90-day growth 转成 durable contribution、manager support、team dependency、risk monitoring、review cadence 和 next retention question。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Growth roadmap", href: "/hire/growth" },
    },
    summary: [
      {
        id: "retention-lanes",
        label: "Retention 路径",
        value: "4",
        detail: "每个招聘方向都有一条 long-term retention lane。",
      },
      {
        id: "long-term-fit",
        label: "长期匹配",
        value: "可见",
        detail: "每条路径都说明 90-day outcome 如何继续复利。",
      },
      {
        id: "manager-support",
        label: "Manager support",
        value: "明确",
        detail: "每条路径都说明什么支持可以让工作更稳定。",
      },
      {
        id: "review-cadence",
        label: "复盘节奏",
        value: "实际",
        detail: "每条路径都有 review rhythm 和 retention question。",
      },
    ],
    signalPrefix: "Retention signal",
    fitPrefix: "Long-term fit",
    supportPrefix: "Manager support",
    dependencyPrefix: "Team dependency",
    riskPrefix: "Durability risk",
    cadencePrefix: "Review cadence",
    questionPrefix: "Next retention question",
    close: {
      title: "当 90-day growth signal 已经可见后，用 retention readiness 判断长期合作。",
      body:
        "打开最接近的岗位路径，检查 proof anchor，把 long-term fit 和 manager support 对照，再用 retention question 判断 Lewis 如何继续为团队复利。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Growth roadmap", href: "/hire/growth" },
    },
  },
} as const;

function buildRetentionRole(
  role: HiringRoleId,
  locale: ProofLocale,
  growthRoles: HiringGrowthRoadmapRole[],
  impactRoles: HiringImpactReviewRole[],
  kickoffRoles: HiringKickoffAlignmentRole[],
  onboardingRoles: HiringOnboardingReadinessRole[]
): HiringRetentionReadinessRole {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);
  const growthRole = growthRoles.find((candidate) => candidate.id === role);
  const impactRole = impactRoles.find((candidate) => candidate.id === role);
  const kickoffRole = kickoffRoles.find((candidate) => candidate.id === role);
  const onboardingRole = onboardingRoles.find((candidate) => candidate.id === role);

  if (!packet || !applicationPacket || !followThrough || !growthRole || !impactRole || !kickoffRole || !onboardingRole) {
    throw new Error(`Missing hiring retention readiness data for ${role}`);
  }

  const copy = retentionCopy[locale];
  const managerSupport =
    onboardingRole.managerQuestion ??
    followThrough.decisionQuestions[0] ??
    growthRole.nextReview;
  const teamDependency =
    kickoffRole.deliveryArtifact ?? growthRole.teamLeverage ?? impactRole.firstMonthEvidence;
  const reviewCadence =
    growthRole.operatingRhythm ??
    followThrough.meetingAgenda[1] ??
    impactRole.stakeholderCheckpoint;
  const nextQuestion =
    followThrough.decisionQuestions[1] ??
    followThrough.decisionQuestions[0] ??
    growthRole.nextReview;

  return {
    id: packet.id,
    label: packet.label,
    retentionSignal: prefixedProofCopy(copy.signalPrefix, growthRole.nextReview),
    longTermFit: prefixedProofCopy(copy.fitPrefix, growthRole.ninetyDayOutcome),
    managerSupport: prefixedProofCopy(copy.supportPrefix, managerSupport),
    teamDependency: prefixedProofCopy(copy.dependencyPrefix, teamDependency),
    durabilityRisk: prefixedProofCopy(
      copy.riskPrefix,
      growthRole.riskToMonitor || impactRole.riskWatch
    ),
    reviewCadence: prefixedProofCopy(copy.cadencePrefix, reviewCadence),
    nextRetentionQuestion: prefixedProofCopy(copy.questionPrefix, nextQuestion),
    proof: {
      claim: growthRole.proof.claim,
      evidence: growthRole.proof.evidence,
      boundary: growthRole.proof.boundary,
      href: growthRole.proof.href,
    },
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
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
    contactRoute: `/contact?role=${packet.id}&intent=retention`,
  };
}

export function getHiringRetentionReadiness(locale: ProofLocale): HiringRetentionReadinessPack {
  const copy = retentionCopy[locale];
  const growthRoles = getHiringGrowthRoadmap(locale).roles;
  const impactRoles = getHiringImpactReview(locale).roles;
  const kickoffRoles = getHiringKickoffAlignment(locale).roles;
  const onboardingRoles = getHiringOnboardingReadiness(locale).roles;
  const roles = getRolePackets(locale).map((packet) =>
    buildRetentionRole(packet.id, locale, growthRoles, impactRoles, kickoffRoles, onboardingRoles)
  );

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    roles,
    hireRoute: "/hire",
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
