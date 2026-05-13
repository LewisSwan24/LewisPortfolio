import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringDecisionPack } from "./hiring-decision";
import { prefixedProofCopy } from "./label-utils";
import { getRolePackets } from "./role-packets";
import type {
  HiringOfferReadinessPack,
  HiringOfferReadinessRole,
  HiringRoleId,
  ProofLocale,
} from "./types";

const offerCopy = {
  en: {
    hero: {
      eyebrow: "Stage 29 offer readiness",
      headline: "Offer readiness pack before the final conversation.",
      subhead:
        "A compact board for confirming proof, validation notes, onboarding focus, and the final question before an offer conversation.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Decision pack", href: "/hire/decision" },
    },
    summary: [
      {
        id: "offer-lanes",
        label: "Offer lanes",
        value: "4",
        detail: "Every role has a final offer-readiness lane.",
      },
      {
        id: "proof-anchor",
        label: "Proof anchor",
        value: "1 per lane",
        detail: "Each offer lane keeps the case anchor visible.",
      },
      {
        id: "validation-note",
        label: "Validation note",
        value: "Explicit",
        detail: "Each lane names what still needs a final check.",
      },
      {
        id: "onboarding-focus",
        label: "Onboarding focus",
        value: "Ready",
        detail: "The pack gives a practical first-work focus for the role.",
      },
    ],
    signalPrefix: "Offer signal",
    validationPrefix: "Final validation",
    onboardingPrefix: "Onboarding focus",
    nextActionPrefix: "Next action:",
    close: {
      title: "Use offer readiness to keep the final step specific.",
      body:
        "Open the closest role lane, inspect the proof anchor, ask the readiness question, then use the contact route with the remaining validation note.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Decision pack", href: "/hire/decision" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 29 offer readiness",
      headline: "最终沟通前使用的 Offer readiness pack。",
      subhead:
        "一个紧凑的 board，用来确认 proof、validation notes、onboarding focus 和 offer conversation 前的最后问题。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Decision pack", href: "/hire/decision" },
    },
    summary: [
      {
        id: "offer-lanes",
        label: "Offer 路径",
        value: "4",
        detail: "每个岗位方向都有一条 offer-readiness lane。",
      },
      {
        id: "proof-anchor",
        label: "证据锚点",
        value: "每条 1 个",
        detail: "每条 offer lane 都保留可检查的案例锚点。",
      },
      {
        id: "validation-note",
        label: "验证备注",
        value: "明确",
        detail: "每条路径都会说明最后还需要检查什么。",
      },
      {
        id: "onboarding-focus",
        label: "入职焦点",
        value: "Ready",
        detail: "这个 pack 给出对应岗位的第一阶段工作焦点。",
      },
    ],
    signalPrefix: "Offer signal",
    validationPrefix: "Final validation",
    onboardingPrefix: "Onboarding focus",
    nextActionPrefix: "下一步：",
    close: {
      title: "用 offer readiness 保持最终步骤具体。",
      body:
        "打开最接近的岗位路径，检查证据锚点，问 readiness question，再带着剩余验证备注联系 Lewis。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Decision pack", href: "/hire/decision" },
    },
  },
} as const;

function buildOfferRole(role: HiringRoleId, locale: ProofLocale): HiringOfferReadinessRole {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);
  const decisionRole = getHiringDecisionPack(locale).roles.find(
    (candidate) => candidate.id === role
  );

  if (!packet || !applicationPacket || !followThrough || !decisionRole) {
    throw new Error(`Missing hiring offer readiness data for ${role}`);
  }

  const copy = offerCopy[locale];
  const proof = decisionRole.proof;
  const readinessQuestion =
    decisionRole.closeQuestion ??
    followThrough.decisionQuestions[0] ??
    applicationPacket.interviewFocus[0];
  const onboardingFocus =
    followThrough.meetingAgenda[2] ??
    applicationPacket.interviewFocus[0] ??
    decisionRole.nextAction;

  return {
    id: packet.id,
    label: packet.label,
    offerSignal: prefixedProofCopy(copy.signalPrefix, decisionRole.finalRecommendation),
    validationNote: prefixedProofCopy(copy.validationPrefix, decisionRole.remainingRisk),
    onboardingFocus: prefixedProofCopy(copy.onboardingPrefix, onboardingFocus),
    readinessQuestion,
    nextAction: `${copy.nextActionPrefix} ${followThrough.decisionQuestions[0] ?? decisionRole.nextAction}`,
    proof: {
      claim: proof.claim,
      evidence: proof.evidence,
      boundary: proof.boundary,
      href: proof.href,
    },
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
    decisionRoute: "/hire/decision",
    debriefRoute: "/hire/debrief",
    shortlistRoute: "/hire/shortlist",
    scorecardRoute: "/hire/scorecard",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    contactRoute: `/contact?role=${packet.id}&intent=offer`,
  };
}

export function getHiringOfferReadiness(locale: ProofLocale): HiringOfferReadinessPack {
  const copy = offerCopy[locale];
  const roles = getRolePackets(locale).map((packet) => buildOfferRole(packet.id, locale));

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    roles,
    hireRoute: "/hire",
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
