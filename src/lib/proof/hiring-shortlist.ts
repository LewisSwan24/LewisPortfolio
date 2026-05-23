import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringScorecardBoard } from "./hiring-scorecard";
import { getRolePackets } from "./role-packets";
import type {
  HiringRoleId,
  HiringShortlistMemo,
  HiringShortlistRole,
  ProofLocale,
} from "./types";

const shortlistCopy = {
  en: {
    hero: {
      eyebrow: "Stage 26 shortlist memo",
      headline: "Shortlist memo for the hiring manager.",
      subhead:
        "A compact memo that turns the scorecard into a role lane, proof anchor, boundary, and next action a recruiter can share.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring scorecard", href: "/hire/scorecard" },
    },
    summary: [
      {
        id: "role-lanes",
        label: "Role lanes",
        value: "4",
        detail: "Each memo lane maps to one hiring role path.",
      },
      {
        id: "proof-anchor",
        label: "Proof anchor",
        value: "1 per lane",
        detail: "Every shortlist note includes a case section to inspect.",
      },
      {
        id: "boundary-check",
        label: "Boundary check",
        value: "Required",
        detail: "The memo keeps the shortlist honest before moving forward.",
      },
      {
        id: "next-action",
        label: "Next action",
        value: "Ready",
        detail: "Open the packet, follow-through plan, or contact route.",
      },
    ],
    decisionLabel: "Shortlist lane",
    thesisPrefix: "Shortlist this lane when the opening needs",
    managerNotePrefix: "Hiring-manager note",
    managerNoteMiddle: "is the proof to forward; validate",
    nextActionPrefix: "Next action:",
    close: {
      title: "Forward one lane with one proof anchor.",
      body:
        "The memo is intentionally small: pick the closest lane, share the proof anchor, then contact Lewis with the remaining validation question.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring scorecard", href: "/hire/scorecard" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 26 shortlist memo",
      headline: "给 hiring manager 的 Shortlist memo。",
      subhead:
        "一个紧凑的 memo，把评分板转换成岗位路径、证据锚点、边界和下一步行动，方便招聘方分享。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring scorecard", href: "/hire/scorecard" },
    },
    summary: [
      {
        id: "role-lanes",
        label: "岗位路径",
        value: "4",
        detail: "每条 memo lane 对应一个招聘岗位方向。",
      },
      {
        id: "proof-anchor",
        label: "证据锚点",
        value: "每条 1 个",
        detail: "每条 shortlist note 都包含一个可检查的案例段落。",
      },
      {
        id: "boundary-check",
        label: "边界检查",
        value: "必须",
        detail: "在推进前保留证据边界，避免过度承诺。",
      },
      {
        id: "next-action",
        label: "下一步",
        value: "Ready",
        detail: "打开申请包、后续计划，或带上下文联系。",
      },
    ],
    decisionLabel: "Shortlist lane",
    thesisPrefix: "当岗位需要这个能力时，优先 shortlist 这一条：",
    managerNotePrefix: "Hiring-manager note",
    managerNoteMiddle: "是建议转发的证据；还需要验证",
    nextActionPrefix: "下一步：",
    close: {
      title: "转发一条岗位路径和一个证据锚点。",
      body:
        "这个 memo 故意保持简短：选择最接近的岗位路径，分享证据锚点，再带着剩余验证问题联系 Lewis。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring scorecard", href: "/hire/scorecard" },
    },
  },
} as const;

function buildShortlistRole(role: HiringRoleId, locale: ProofLocale): HiringShortlistRole {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);
  const scorecardRole = getHiringScorecardBoard(locale).roles.find(
    (candidate) => candidate.id === role
  );

  if (!packet || !applicationPacket || !followThrough || !scorecardRole) {
    throw new Error(`Missing hiring shortlist data for ${role}`);
  }

  const copy = shortlistCopy[locale];
  const proof = scorecardRole.proof;
  const nextAction =
    followThrough.decisionQuestions[0] ??
    applicationPacket.interviewFocus[0] ??
    proof.boundary;

  return {
    id: packet.id,
    label: packet.label,
    decisionLabel: copy.decisionLabel,
    shortlistThesis: `${copy.thesisPrefix} ${packet.fitThesis}`,
    proof: {
      claim: proof.claim,
      evidence: proof.evidence,
      boundary: proof.boundary,
      href: proof.href,
    },
    managerNote: `${copy.managerNotePrefix}: ${proof.claim} ${copy.managerNoteMiddle} ${proof.boundary}.`,
    nextAction: `${copy.nextActionPrefix} ${nextAction}`,
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
    scorecardRoute: "/hire/scorecard",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    contactRoute: scorecardRole.contactRoute,
  };
}

export function getHiringShortlistMemo(locale: ProofLocale): HiringShortlistMemo {
  const copy = shortlistCopy[locale];
  const roles = getRolePackets(locale).map((packet) => buildShortlistRole(packet.id, locale));

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    roles,
    hireRoute: "/hire",
    scorecardRoute: "/hire/scorecard",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    close: copy.close,
  };
}
