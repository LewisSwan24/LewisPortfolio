import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringManagerDebrief } from "./hiring-debrief";
import { getHiringScorecardBoard } from "./hiring-scorecard";
import { getHiringShortlistMemo } from "./hiring-shortlist";
import { getRolePackets } from "./role-packets";
import type {
  HiringDecisionPack,
  HiringDecisionPackRole,
  HiringRoleId,
  ProofLocale,
} from "./types";

const decisionCopy = {
  en: {
    hero: {
      eyebrow: "Stage 28 hiring decision",
      headline: "Hiring decision pack for the final manager call.",
      subhead:
        "A final proof-backed board for deciding what to validate before moving Lewis into an offer conversation or a deeper interview loop.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Manager debrief", href: "/hire/debrief" },
    },
    summary: [
      {
        id: "decision-lanes",
        label: "Decision lanes",
        value: "4",
        detail: "Every hiring role gets a final manager-ready lane.",
      },
      {
        id: "proof-anchor",
        label: "Proof anchor",
        value: "1 per lane",
        detail: "Each decision starts from one inspectable case anchor.",
      },
      {
        id: "remaining-risk",
        label: "Remaining risk",
        value: "Explicit",
        detail: "The pack names what still needs validation before a stronger claim.",
      },
      {
        id: "next-action",
        label: "Next action",
        value: "Ready",
        detail: "Each lane points to contact, packet, follow-through, and review routes.",
      },
    ],
    signalPrefix: "Decision signal",
    recommendationPrefix: "Move forward when",
    riskPrefix: "Remaining risk",
    nextActionPrefix: "Next action:",
    close: {
      title: "Use the decision pack when the manager needs a yes/no path.",
      body:
        "Pick the lane that matches the role, inspect the proof anchor, ask the close question, then decide whether the remaining risk is acceptable.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Manager debrief", href: "/hire/debrief" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 28 hiring decision",
      headline: "用于最终 manager call 的 hiring decision pack。",
      subhead:
        "一个 proof-backed final board，用来判断在进入 offer conversation 或更深面试前还需要验证什么。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Manager debrief", href: "/hire/debrief" },
    },
    summary: [
      {
        id: "decision-lanes",
        label: "决策路径",
        value: "4",
        detail: "每个招聘方向都有一条 manager-ready final lane。",
      },
      {
        id: "proof-anchor",
        label: "证据锚点",
        value: "每条 1 个",
        detail: "每条 decision 都从一个可检查的案例段落开始。",
      },
      {
        id: "remaining-risk",
        label: "剩余风险",
        value: "明确",
        detail: "这个 pack 会说明在加强判断前还需要验证什么。",
      },
      {
        id: "next-action",
        label: "下一步",
        value: "Ready",
        detail: "每条路径都指向联系、申请包、后续计划和 review routes。",
      },
    ],
    signalPrefix: "Decision signal",
    recommendationPrefix: "当这个条件成立时推进：",
    riskPrefix: "Remaining risk",
    nextActionPrefix: "下一步：",
    close: {
      title: "当 manager 需要 yes/no path 时使用 decision pack。",
      body:
        "选择最匹配的岗位路径，检查证据锚点，问 close question，再判断剩余风险是否可以接受。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Manager debrief", href: "/hire/debrief" },
    },
  },
} as const;

function buildDecisionRole(role: HiringRoleId, locale: ProofLocale): HiringDecisionPackRole {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);
  const scorecardRole = getHiringScorecardBoard(locale).roles.find(
    (candidate) => candidate.id === role
  );
  const shortlistRole = getHiringShortlistMemo(locale).roles.find(
    (candidate) => candidate.id === role
  );
  const debriefRole = getHiringManagerDebrief(locale).roles.find(
    (candidate) => candidate.id === role
  );

  if (
    !packet ||
    !applicationPacket ||
    !followThrough ||
    !scorecardRole ||
    !shortlistRole ||
    !debriefRole
  ) {
    throw new Error(`Missing hiring decision data for ${role}`);
  }

  const copy = decisionCopy[locale];
  const proof = debriefRole.proof;
  const closeQuestion =
    debriefRole.secondRoundQuestion ??
    followThrough.decisionQuestions[0] ??
    applicationPacket.interviewFocus[0];
  const nextAction =
    followThrough.meetingAgenda[1] ??
    followThrough.decisionQuestions[0] ??
    shortlistRole.nextAction;

  return {
    id: packet.id,
    label: packet.label,
    decisionSignal: `${copy.signalPrefix}: ${shortlistRole.managerNote}`,
    finalRecommendation: `${copy.recommendationPrefix} ${scorecardRole.recommendation}`,
    remainingRisk: `${copy.riskPrefix}: ${proof.boundary}`,
    closeQuestion,
    nextAction: `${copy.nextActionPrefix} ${nextAction}`,
    proof: {
      claim: proof.claim,
      evidence: proof.evidence,
      boundary: proof.boundary,
      href: proof.href,
    },
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
    debriefRoute: "/hire/debrief",
    shortlistRoute: "/hire/shortlist",
    scorecardRoute: "/hire/scorecard",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    contactRoute: `/contact?role=${packet.id}&intent=decision`,
  };
}

export function getHiringDecisionPack(locale: ProofLocale): HiringDecisionPack {
  const copy = decisionCopy[locale];
  const roles = getRolePackets(locale).map((packet) => buildDecisionRole(packet.id, locale));

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    roles,
    hireRoute: "/hire",
    debriefRoute: "/hire/debrief",
    shortlistRoute: "/hire/shortlist",
    scorecardRoute: "/hire/scorecard",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    close: copy.close,
  };
}
