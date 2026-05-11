import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringOnboardingReadiness } from "./hiring-onboarding";
import { getHiringOfferReadiness } from "./hiring-offer";
import { getRolePackets } from "./role-packets";
import type {
  HiringKickoffAlignmentPack,
  HiringKickoffAlignmentRole,
  HiringRoleId,
  ProofLocale,
} from "./types";

const kickoffCopy = {
  en: {
    hero: {
      eyebrow: "Stage 31 kickoff alignment",
      headline: "Kickoff alignment pack for the first project.",
      subhead:
        "A manager-ready board for turning onboarding readiness into the first project brief, success metric, stakeholder question, delivery artifact, and risk guardrail.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Onboarding plan", href: "/hire/onboarding" },
    },
    summary: [
      {
        id: "project-lanes",
        label: "Project lanes",
        value: "4",
        detail: "Every hiring role has a first-project kickoff lane.",
      },
      {
        id: "success-metric",
        label: "Success metric",
        value: "Explicit",
        detail: "Each lane names what early success should prove.",
      },
      {
        id: "stakeholder-question",
        label: "Stakeholder question",
        value: "Ready",
        detail: "Each lane gives one question to align context before work starts.",
      },
      {
        id: "delivery-artifact",
        label: "Delivery artifact",
        value: "Concrete",
        detail: "Each lane names the artifact Lewis should produce first.",
      },
    ],
    signalPrefix: "Kickoff signal",
    briefPrefix: "First project brief",
    metricPrefix: "Success metric",
    artifactPrefix: "Delivery artifact",
    guardrailPrefix: "Risk guardrail",
    nextActionPrefix: "Next action:",
    close: {
      title: "Use kickoff alignment when the manager is ready to scope the first project.",
      body:
        "Open the closest role lane, inspect the proof anchor, align the first artifact, then use the stakeholder question to remove ambiguity before work starts.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Onboarding plan", href: "/hire/onboarding" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 31 kickoff alignment",
      headline: "用于第一个项目的 Kickoff alignment pack。",
      subhead:
        "一个 manager-ready board，把 onboarding readiness 转成 first project brief、success metric、stakeholder question、delivery artifact 和 risk guardrail。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Onboarding plan", href: "/hire/onboarding" },
    },
    summary: [
      {
        id: "project-lanes",
        label: "项目路径",
        value: "4",
        detail: "每个招聘方向都有一条 first-project kickoff lane。",
      },
      {
        id: "success-metric",
        label: "成功指标",
        value: "明确",
        detail: "每条路径都说明早期成功应该证明什么。",
      },
      {
        id: "stakeholder-question",
        label: "Stakeholder question",
        value: "Ready",
        detail: "每条路径都有一个问题，用来在开始前对齐上下文。",
      },
      {
        id: "delivery-artifact",
        label: "交付物",
        value: "具体",
        detail: "每条路径都说明 Lewis 最先应产出的 artifact。",
      },
    ],
    signalPrefix: "Kickoff signal",
    briefPrefix: "First project brief",
    metricPrefix: "Success metric",
    artifactPrefix: "Delivery artifact",
    guardrailPrefix: "Risk guardrail",
    nextActionPrefix: "下一步：",
    close: {
      title: "当 manager 准备定义第一个项目时，用 kickoff alignment 对齐范围。",
      body:
        "打开最接近的岗位路径，检查 proof anchor，对齐第一个 artifact，再用 stakeholder question 消除启动前的不确定性。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Onboarding plan", href: "/hire/onboarding" },
    },
  },
} as const;

function buildKickoffRole(role: HiringRoleId, locale: ProofLocale): HiringKickoffAlignmentRole {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);
  const onboardingRole = getHiringOnboardingReadiness(locale).roles.find(
    (candidate) => candidate.id === role
  );
  const offerRole = getHiringOfferReadiness(locale).roles.find(
    (candidate) => candidate.id === role
  );

  if (!packet || !applicationPacket || !followThrough || !onboardingRole || !offerRole) {
    throw new Error(`Missing hiring kickoff alignment data for ${role}`);
  }

  const copy = kickoffCopy[locale];
  const firstProjectSource =
    applicationPacket.interviewFocus[0] ?? onboardingRole.firstWeekFocus ?? packet.fitThesis;
  const successMetricSource =
    applicationPacket.interviewFocus[1] ??
    followThrough.meetingAgenda[2] ??
    onboardingRole.firstThirtyDaysOutcome;
  const stakeholderQuestion =
    followThrough.decisionQuestions[0] ?? onboardingRole.managerQuestion;
  const deliveryArtifactSource =
    followThrough.meetingAgenda[1] ??
    applicationPacket.proof[0]?.claim ??
    offerRole.onboardingFocus;
  const riskSource =
    applicationPacket.boundaries[0] ??
    onboardingRole.onboardingRisk ??
    offerRole.validationNote;

  return {
    id: packet.id,
    label: packet.label,
    kickoffSignal: `${copy.signalPrefix}: ${onboardingRole.onboardingSignal}`,
    firstProjectBrief: `${copy.briefPrefix}: ${firstProjectSource}`,
    successMetric: `${copy.metricPrefix}: ${successMetricSource}`,
    stakeholderQuestion,
    deliveryArtifact: `${copy.artifactPrefix}: ${deliveryArtifactSource}`,
    riskGuardrail: `${copy.guardrailPrefix}: ${riskSource}`,
    nextAction: `${copy.nextActionPrefix} ${stakeholderQuestion}`,
    proof: {
      claim: onboardingRole.proof.claim,
      evidence: onboardingRole.proof.evidence,
      boundary: onboardingRole.proof.boundary,
      href: onboardingRole.proof.href,
    },
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
    onboardingRoute: "/hire/onboarding",
    offerRoute: "/hire/offer",
    decisionRoute: "/hire/decision",
    debriefRoute: "/hire/debrief",
    shortlistRoute: "/hire/shortlist",
    scorecardRoute: "/hire/scorecard",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    contactRoute: `/contact?role=${packet.id}&intent=kickoff`,
  };
}

export function getHiringKickoffAlignment(locale: ProofLocale): HiringKickoffAlignmentPack {
  const copy = kickoffCopy[locale];
  const roles = getRolePackets(locale).map((packet) => buildKickoffRole(packet.id, locale));

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    roles,
    hireRoute: "/hire",
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
