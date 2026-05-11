import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringOfferReadiness } from "./hiring-offer";
import { getRolePackets } from "./role-packets";
import type {
  HiringOnboardingReadinessPack,
  HiringOnboardingReadinessRole,
  HiringRoleId,
  ProofLocale,
} from "./types";

const onboardingCopy = {
  en: {
    hero: {
      eyebrow: "Stage 30 onboarding readiness",
      headline: "Onboarding readiness plan for the first 30 days.",
      subhead:
        "A post-offer manager board for turning proof, validation notes, and role focus into a practical first-week and first-30-days start plan.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Offer readiness", href: "/hire/offer" },
    },
    summary: [
      {
        id: "role-lanes",
        label: "Role lanes",
        value: "4",
        detail: "Every hiring role has an onboarding-readiness lane.",
      },
      {
        id: "first-week",
        label: "First week",
        value: "Focused",
        detail: "Each lane names the first work focus for the role.",
      },
      {
        id: "first-30-days",
        label: "First 30 days",
        value: "Outcome-led",
        detail: "Each lane frames the early success outcome to validate.",
      },
      {
        id: "manager-question",
        label: "Manager question",
        value: "Ready",
        detail: "Each lane gives one question to align onboarding expectations.",
      },
    ],
    signalPrefix: "Onboarding signal",
    weekPrefix: "First-week focus",
    thirtyPrefix: "First-30-days outcome",
    riskPrefix: "Onboarding risk",
    nextActionPrefix: "Next action:",
    close: {
      title: "Use onboarding readiness after the offer signal is clear.",
      body:
        "Open the closest role lane, confirm the proof anchor, align the first-week focus, and use the manager question to set the first 30 days.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Offer readiness", href: "/hire/offer" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 30 onboarding readiness",
      headline: "用于前 30 天启动的 Onboarding readiness plan。",
      subhead:
        "一个 post-offer manager board，把 proof、validation notes 和岗位 focus 转成第一周与前 30 天的实际启动计划。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Offer readiness", href: "/hire/offer" },
    },
    summary: [
      {
        id: "role-lanes",
        label: "岗位路径",
        value: "4",
        detail: "每个招聘方向都有一条 onboarding-readiness lane。",
      },
      {
        id: "first-week",
        label: "第一周",
        value: "聚焦",
        detail: "每条路径都说明这个岗位的第一阶段工作焦点。",
      },
      {
        id: "first-30-days",
        label: "前 30 天",
        value: "结果导向",
        detail: "每条路径都定义早期成功结果，方便验证。",
      },
      {
        id: "manager-question",
        label: "Manager question",
        value: "Ready",
        detail: "每条路径都有一个问题，用来对齐 onboarding expectations。",
      },
    ],
    signalPrefix: "Onboarding signal",
    weekPrefix: "First-week focus",
    thirtyPrefix: "First-30-days outcome",
    riskPrefix: "Onboarding risk",
    nextActionPrefix: "下一步：",
    close: {
      title: "当 offer signal 明确后，用 onboarding readiness 对齐启动。",
      body:
        "打开最接近的岗位路径，确认证据锚点，对齐第一周 focus，再用 manager question 设定前 30 天。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Offer readiness", href: "/hire/offer" },
    },
  },
} as const;

function buildOnboardingRole(
  role: HiringRoleId,
  locale: ProofLocale
): HiringOnboardingReadinessRole {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);
  const offerRole = getHiringOfferReadiness(locale).roles.find(
    (candidate) => candidate.id === role
  );

  if (!packet || !applicationPacket || !followThrough || !offerRole) {
    throw new Error(`Missing hiring onboarding readiness data for ${role}`);
  }

  const copy = onboardingCopy[locale];
  const firstWeekFocus =
    offerRole.onboardingFocus ?? followThrough.meetingAgenda[0] ?? applicationPacket.interviewFocus[0];
  const firstThirtyDaysOutcome =
    followThrough.meetingAgenda[3] ??
    followThrough.meetingAgenda[2] ??
    applicationPacket.interviewFocus[1] ??
    firstWeekFocus;
  const onboardingRisk =
    applicationPacket.boundaries[0] ?? offerRole.validationNote ?? offerRole.proof.boundary;
  const managerQuestion =
    followThrough.decisionQuestions[1] ??
    followThrough.decisionQuestions[0] ??
    offerRole.readinessQuestion;

  return {
    id: packet.id,
    label: packet.label,
    onboardingSignal: `${copy.signalPrefix}: ${offerRole.offerSignal}`,
    firstWeekFocus: `${copy.weekPrefix}: ${firstWeekFocus}`,
    firstThirtyDaysOutcome: `${copy.thirtyPrefix}: ${firstThirtyDaysOutcome}`,
    onboardingRisk: `${copy.riskPrefix}: ${onboardingRisk}`,
    managerQuestion,
    nextAction: `${copy.nextActionPrefix} ${followThrough.meetingAgenda[0] ?? offerRole.nextAction}`,
    proof: {
      claim: offerRole.proof.claim,
      evidence: offerRole.proof.evidence,
      boundary: offerRole.proof.boundary,
      href: offerRole.proof.href,
    },
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
    offerRoute: "/hire/offer",
    decisionRoute: "/hire/decision",
    debriefRoute: "/hire/debrief",
    shortlistRoute: "/hire/shortlist",
    scorecardRoute: "/hire/scorecard",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    contactRoute: `/contact?role=${packet.id}&intent=onboarding`,
  };
}

export function getHiringOnboardingReadiness(
  locale: ProofLocale
): HiringOnboardingReadinessPack {
  const copy = onboardingCopy[locale];
  const roles = getRolePackets(locale).map((packet) => buildOnboardingRole(packet.id, locale));

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    roles,
    hireRoute: "/hire",
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
