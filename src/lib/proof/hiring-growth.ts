import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringImpactReview } from "./hiring-impact";
import { getHiringKickoffAlignment } from "./hiring-kickoff";
import { getHiringOnboardingReadiness } from "./hiring-onboarding";
import { getRolePackets } from "./role-packets";
import type {
  HiringGrowthRoadmapPack,
  HiringGrowthRoadmapRole,
  HiringImpactReviewRole,
  HiringKickoffAlignmentRole,
  HiringOnboardingReadinessRole,
  HiringRoleId,
  ProofLocale,
} from "./types";

const growthCopy = {
  en: {
    hero: {
      eyebrow: "Stage 33 growth roadmap",
      headline: "Growth roadmap pack for the next 90 days.",
      subhead:
        "A manager-ready board for extending first-month impact into team leverage, capability transfer, operating rhythm, risk monitoring, and the next review checkpoint.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Impact review", href: "/hire/impact" },
    },
    summary: [
      {
        id: "growth-lanes",
        label: "Growth lanes",
        value: "4",
        detail: "Every hiring role has a 90-day growth lane.",
      },
      {
        id: "team-leverage",
        label: "Team leverage",
        value: "Visible",
        detail: "Each lane names how the early project should compound for the team.",
      },
      {
        id: "capability-transfer",
        label: "Capability transfer",
        value: "Practical",
        detail: "Each lane connects onboarding outcomes to repeatable team practice.",
      },
      {
        id: "next-review",
        label: "Next review",
        value: "Scheduled",
        detail: "Each lane gives the manager a concrete review question.",
      },
    ],
    signalPrefix: "Growth signal",
    outcomePrefix: "90-day outcome",
    leveragePrefix: "Team leverage",
    transferPrefix: "Capability transfer",
    rhythmPrefix: "Operating rhythm",
    riskPrefix: "Risk to monitor",
    reviewPrefix: "Next review",
    close: {
      title: "Use the growth roadmap once first-month impact is visible.",
      body:
        "Open the closest role lane, inspect the proof anchor, compare the impact signal with the 90-day outcome, then use the next review question to decide how the work should compound.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Impact review", href: "/hire/impact" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 33 growth roadmap",
      headline: "用于未来 90 天的 Growth roadmap pack。",
      subhead:
        "一个 manager-ready board，用来把 first-month impact 延展成 team leverage、capability transfer、operating rhythm、risk monitoring 和 next review checkpoint。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Impact review", href: "/hire/impact" },
    },
    summary: [
      {
        id: "growth-lanes",
        label: "Growth 路径",
        value: "4",
        detail: "每个招聘方向都有一条 90-day growth lane。",
      },
      {
        id: "team-leverage",
        label: "团队杠杆",
        value: "可见",
        detail: "每条路径都说明 early project 如何为团队复利。",
      },
      {
        id: "capability-transfer",
        label: "能力转移",
        value: "实际",
        detail: "每条路径把 onboarding outcomes 连接到可复用的团队实践。",
      },
      {
        id: "next-review",
        label: "下一次复盘",
        value: "已定位",
        detail: "每条路径都给 manager 一个具体的 review question。",
      },
    ],
    signalPrefix: "Growth signal",
    outcomePrefix: "90-day outcome",
    leveragePrefix: "Team leverage",
    transferPrefix: "Capability transfer",
    rhythmPrefix: "Operating rhythm",
    riskPrefix: "Risk to monitor",
    reviewPrefix: "Next review",
    close: {
      title: "当 first-month impact 已经可见后，用 growth roadmap 推进。",
      body:
        "打开最接近的岗位路径，检查 proof anchor，把 impact signal 和 90-day outcome 对照，再用 next review question 判断工作如何复利。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Impact review", href: "/hire/impact" },
    },
  },
} as const;

function buildGrowthRole(
  role: HiringRoleId,
  locale: ProofLocale,
  impactRoles: HiringImpactReviewRole[],
  kickoffRoles: HiringKickoffAlignmentRole[],
  onboardingRoles: HiringOnboardingReadinessRole[]
): HiringGrowthRoadmapRole {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);
  const impactRole = impactRoles.find((candidate) => candidate.id === role);
  const kickoffRole = kickoffRoles.find((candidate) => candidate.id === role);
  const onboardingRole = onboardingRoles.find((candidate) => candidate.id === role);

  if (!packet || !applicationPacket || !followThrough || !impactRole || !kickoffRole || !onboardingRole) {
    throw new Error(`Missing hiring growth roadmap data for ${role}`);
  }

  const copy = growthCopy[locale];
  const operatingRhythm =
    followThrough.meetingAgenda[1] ??
    followThrough.meetingAgenda[0] ??
    impactRole.stakeholderCheckpoint;
  const nextReview =
    followThrough.decisionQuestions[0] ??
    onboardingRole.managerQuestion ??
    impactRole.nextMilestone;

  return {
    id: packet.id,
    label: packet.label,
    growthSignal: `${copy.signalPrefix}: ${impactRole.nextMilestone}`,
    ninetyDayOutcome: `${copy.outcomePrefix}: ${impactRole.firstMonthEvidence}`,
    teamLeverage: `${copy.leveragePrefix}: ${kickoffRole.deliveryArtifact}`,
    capabilityTransfer: `${copy.transferPrefix}: ${onboardingRole.firstThirtyDaysOutcome}`,
    operatingRhythm: `${copy.rhythmPrefix}: ${operatingRhythm}`,
    riskToMonitor: `${copy.riskPrefix}: ${impactRole.riskWatch}`,
    nextReview: `${copy.reviewPrefix}: ${nextReview}`,
    proof: {
      claim: impactRole.proof.claim,
      evidence: impactRole.proof.evidence,
      boundary: impactRole.proof.boundary,
      href: impactRole.proof.href,
    },
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
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
    contactRoute: `/contact?role=${packet.id}&intent=growth`,
  };
}

export function getHiringGrowthRoadmap(locale: ProofLocale): HiringGrowthRoadmapPack {
  const copy = growthCopy[locale];
  const impactRoles = getHiringImpactReview(locale).roles;
  const kickoffRoles = getHiringKickoffAlignment(locale).roles;
  const onboardingRoles = getHiringOnboardingReadiness(locale).roles;
  const roles = getRolePackets(locale).map((packet) =>
    buildGrowthRole(packet.id, locale, impactRoles, kickoffRoles, onboardingRoles)
  );

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    roles,
    hireRoute: "/hire",
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
