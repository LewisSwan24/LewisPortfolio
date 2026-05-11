import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringScorecardBoard } from "./hiring-scorecard";
import { getHiringShortlistMemo } from "./hiring-shortlist";
import { getRolePackets } from "./role-packets";
import type {
  HiringManagerDebriefBoard,
  HiringManagerDebriefRole,
  HiringRoleId,
  ProofLocale,
} from "./types";

const debriefCopy = {
  en: {
    hero: {
      eyebrow: "Stage 27 hiring debrief",
      headline: "Hiring manager debrief for the second round.",
      subhead:
        "A concise board for turning the shortlist memo into the next manager conversation: brief, proof anchor, boundary, question, and action.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Shortlist memo", href: "/hire/shortlist" },
    },
    summary: [
      {
        id: "manager-context",
        label: "Manager context",
        value: "Ready",
        detail: "Each lane gives a manager-facing brief, not private notes.",
      },
      {
        id: "proof-anchor",
        label: "Proof anchor",
        value: "1 per lane",
        detail: "The debrief points to a case section worth opening first.",
      },
      {
        id: "second-round",
        label: "Second round",
        value: "Question",
        detail: "Each lane includes one focused follow-up question.",
      },
      {
        id: "boundary",
        label: "Boundary",
        value: "Explicit",
        detail: "The manager can see what still needs validation.",
      },
    ],
    briefPrefix: "Manager brief",
    thesisPrefix: "Use this debrief when the role need matches",
    nextActionPrefix: "Next action:",
    close: {
      title: "Use the debrief before deeper interview loops.",
      body:
        "Pick the closest lane, forward one proof anchor, then ask the second-round question that validates the boundary.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Shortlist memo", href: "/hire/shortlist" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 27 hiring debrief",
      headline: "给第二轮沟通使用的 hiring manager debrief。",
      subhead:
        "一个简洁的 debrief board，把 shortlist memo 转成下一轮 manager 沟通：说明、证据锚点、边界、问题和行动。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Shortlist memo", href: "/hire/shortlist" },
    },
    summary: [
      {
        id: "manager-context",
        label: "Manager context",
        value: "Ready",
        detail: "每条路径都有面向 manager 的 brief，不包含私有备注。",
      },
      {
        id: "proof-anchor",
        label: "证据锚点",
        value: "每条 1 个",
        detail: "debrief 会指向最值得先打开的案例段落。",
      },
      {
        id: "second-round",
        label: "第二轮",
        value: "Question",
        detail: "每条路径都有一个聚焦的 follow-up question。",
      },
      {
        id: "boundary",
        label: "边界",
        value: "明确",
        detail: "manager 可以看到哪些内容仍需要验证。",
      },
    ],
    briefPrefix: "Manager brief",
    thesisPrefix: "当岗位需求匹配这个方向时使用这条 debrief：",
    nextActionPrefix: "下一步：",
    close: {
      title: "在进入更深面试环节前使用 debrief。",
      body:
        "选择最接近的岗位路径，转发一个证据锚点，再用第二轮问题验证边界。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Shortlist memo", href: "/hire/shortlist" },
    },
  },
} as const;

function buildDebriefRole(role: HiringRoleId, locale: ProofLocale): HiringManagerDebriefRole {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);
  const scorecardRole = getHiringScorecardBoard(locale).roles.find(
    (candidate) => candidate.id === role
  );
  const shortlistRole = getHiringShortlistMemo(locale).roles.find(
    (candidate) => candidate.id === role
  );

  if (!packet || !applicationPacket || !followThrough || !scorecardRole || !shortlistRole) {
    throw new Error(`Missing hiring debrief data for ${role}`);
  }

  const copy = debriefCopy[locale];
  const proof = shortlistRole.proof;
  const secondRoundQuestion =
    packet.interviewQuestions[1]?.question ??
    followThrough.decisionQuestions[1] ??
    applicationPacket.interviewFocus[0];

  return {
    id: packet.id,
    label: packet.label,
    managerBrief: `${copy.briefPrefix}: ${shortlistRole.managerNote}`,
    debriefThesis: `${copy.thesisPrefix} ${packet.fitThesis}`,
    proof: {
      claim: proof.claim,
      evidence: proof.evidence,
      boundary: proof.boundary,
      href: proof.href,
    },
    secondRoundQuestion,
    nextAction: `${copy.nextActionPrefix} ${followThrough.meetingAgenda[0] ?? shortlistRole.nextAction}`,
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
    shortlistRoute: "/hire/shortlist",
    scorecardRoute: "/hire/scorecard",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    contactRoute: `/contact?role=${packet.id}&intent=debrief`,
  };
}

export function getHiringManagerDebrief(locale: ProofLocale): HiringManagerDebriefBoard {
  const copy = debriefCopy[locale];
  const roles = getRolePackets(locale).map((packet) => buildDebriefRole(packet.id, locale));

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    roles,
    hireRoute: "/hire",
    shortlistRoute: "/hire/shortlist",
    scorecardRoute: "/hire/scorecard",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    close: copy.close,
  };
}
