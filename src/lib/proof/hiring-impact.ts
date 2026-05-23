import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringKickoffAlignment } from "./hiring-kickoff";
import { getHiringOnboardingReadiness } from "./hiring-onboarding";
import { getHiringOfferReadiness } from "./hiring-offer";
import { prefixedProofCopy } from "./label-utils";
import { getRolePackets } from "./role-packets";
import type {
  HiringImpactReviewPack,
  HiringImpactReviewRole,
  HiringRoleId,
  ProofLocale,
} from "./types";

const impactCopy = {
  en: {
    hero: {
      eyebrow: "Stage 32 early impact",
      headline: "Impact review pack for the first month.",
      subhead:
        "A manager-ready board for reviewing first-project outcomes, early evidence, stakeholder checkpoints, delivery quality, and the next milestone after kickoff.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Kickoff plan", href: "/hire/kickoff" },
    },
    summary: [
      {
        id: "impact-lanes",
        label: "Impact lanes",
        value: "4",
        detail: "Every hiring role has a first-month impact lane.",
      },
      {
        id: "review-metric",
        label: "Review metric",
        value: "Specific",
        detail: "Each lane names what the early review should measure.",
      },
      {
        id: "evidence",
        label: "Evidence",
        value: "Visible",
        detail: "Each lane keeps the proof anchor and first-month signal together.",
      },
      {
        id: "next-milestone",
        label: "Next milestone",
        value: "Scoped",
        detail: "Each lane gives the manager a concrete next checkpoint.",
      },
    ],
    signalPrefix: "Impact signal",
    metricPrefix: "Review metric",
    evidencePrefix: "First-month evidence",
    deliveryPrefix: "Delivery review",
    riskPrefix: "Risk watch",
    milestonePrefix: "Next milestone:",
    close: {
      title: "Use impact review after the first project has a real signal.",
      body:
        "Open the closest role lane, inspect the proof anchor, compare the kickoff metric with the first-month evidence, then use the next milestone to extend the working relationship.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Kickoff plan", href: "/hire/kickoff" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 32 early impact",
      headline: "用于第一个月复盘的 Impact review pack。",
      subhead:
        "一个 manager-ready board，用来复盘 first-project outcomes、early evidence、stakeholder checkpoints、delivery quality 和 kickoff 之后的 next milestone。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Kickoff plan", href: "/hire/kickoff" },
    },
    summary: [
      {
        id: "impact-lanes",
        label: "Impact 路径",
        value: "4",
        detail: "每个招聘方向都有一条 first-month impact lane。",
      },
      {
        id: "review-metric",
        label: "复盘指标",
        value: "具体",
        detail: "每条路径都说明 early review 应该衡量什么。",
      },
      {
        id: "evidence",
        label: "证据",
        value: "可见",
        detail: "每条路径把 proof anchor 和 first-month signal 放在一起。",
      },
      {
        id: "next-milestone",
        label: "下一里程碑",
        value: "明确",
        detail: "每条路径都给 manager 一个具体的 next checkpoint。",
      },
    ],
    signalPrefix: "Impact signal",
    metricPrefix: "Review metric",
    evidencePrefix: "First-month evidence",
    deliveryPrefix: "Delivery review",
    riskPrefix: "Risk watch",
    milestonePrefix: "下一里程碑：",
    close: {
      title: "当第一个项目出现真实信号后，用 impact review 做复盘。",
      body:
        "打开最接近的岗位路径，检查 proof anchor，把 kickoff metric 和 first-month evidence 对照，再用 next milestone 延续合作。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Kickoff plan", href: "/hire/kickoff" },
    },
  },
} as const;

function buildImpactRole(role: HiringRoleId, locale: ProofLocale): HiringImpactReviewRole {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);
  const kickoffRole = getHiringKickoffAlignment(locale).roles.find(
    (candidate) => candidate.id === role
  );
  const onboardingRole = getHiringOnboardingReadiness(locale).roles.find(
    (candidate) => candidate.id === role
  );
  const offerRole = getHiringOfferReadiness(locale).roles.find(
    (candidate) => candidate.id === role
  );

  if (!packet || !applicationPacket || !followThrough || !kickoffRole || !onboardingRole || !offerRole) {
    throw new Error(`Missing hiring impact review data for ${role}`);
  }

  const copy = impactCopy[locale];
  const stakeholderCheckpoint =
    onboardingRole.managerQuestion ??
    kickoffRole.stakeholderQuestion ??
    offerRole.readinessQuestion;
  const nextMilestone =
    followThrough.meetingAgenda[3] ??
    followThrough.meetingAgenda[2] ??
    onboardingRole.nextAction;

  return {
    id: packet.id,
    label: packet.label,
    impactSignal: prefixedProofCopy(copy.signalPrefix, kickoffRole.successMetric),
    reviewMetric: prefixedProofCopy(copy.metricPrefix, kickoffRole.successMetric),
    firstMonthEvidence: prefixedProofCopy(
      copy.evidencePrefix,
      onboardingRole.firstThirtyDaysOutcome
    ),
    stakeholderCheckpoint,
    deliveryReview: prefixedProofCopy(copy.deliveryPrefix, kickoffRole.deliveryArtifact),
    riskWatch: prefixedProofCopy(copy.riskPrefix, kickoffRole.riskGuardrail),
    nextMilestone: `${copy.milestonePrefix} ${nextMilestone}`,
    proof: {
      claim: kickoffRole.proof.claim,
      evidence: kickoffRole.proof.evidence,
      boundary: kickoffRole.proof.boundary,
      href: kickoffRole.proof.href,
    },
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
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
    contactRoute: `/contact?role=${packet.id}&intent=impact`,
  };
}

export function getHiringImpactReview(locale: ProofLocale): HiringImpactReviewPack {
  const copy = impactCopy[locale];
  const roles = getRolePackets(locale).map((packet) => buildImpactRole(packet.id, locale));

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    roles,
    hireRoute: "/hire",
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
