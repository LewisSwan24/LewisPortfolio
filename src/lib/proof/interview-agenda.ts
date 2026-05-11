import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getRolePackets } from "./role-packets";
import type {
  HiringRoleId,
  InterviewAgendaBoard,
  InterviewAgendaRolePrep,
  ProofLocale,
} from "./types";

const agendaCopy = {
  en: {
    hero: {
      eyebrow: "Stage 24 interview agenda",
      headline: "Interview agenda for the first focused call.",
      subhead:
        "A role-aware agenda that turns proof anchors, questions, and boundaries into a practical first conversation.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Compare role paths", href: "/hire/compare" },
    },
    phases: [
      {
        id: "frame",
        label: "01",
        title: "Frame the role need",
        body: "Start by naming the opening and choosing the closest proof-backed role lane.",
      },
      {
        id: "anchor",
        label: "02",
        title: "Open one proof anchor",
        body: "Inspect one case section before asking broad portfolio questions.",
      },
      {
        id: "question",
        label: "03",
        title: "Ask the strongest question",
        body: "Use the role-specific question to test reasoning, trade-offs, and method choice.",
      },
      {
        id: "boundary",
        label: "04",
        title: "Validate the boundary",
        body: "End by clarifying what the evidence proves and what needs validation next.",
      },
    ],
    close: {
      title: "Use this agenda after choosing a role lane.",
      body:
        "The fastest path is compare roles, inspect one anchor, then run the interview around one question and one boundary.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Open proof review", href: "/hire/review" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 24 interview agenda",
      headline: "第一次聚焦面试的议程。",
      subhead:
        "把岗位路径、证据锚点、追问问题和边界整理成可直接使用的第一次沟通计划。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "比较岗位路径", href: "/hire/compare" },
    },
    phases: [
      {
        id: "frame",
        label: "01",
        title: "先定义岗位需求",
        body: "先说明招聘岗位，再选择最接近的 proof-backed 岗位路径。",
      },
      {
        id: "anchor",
        label: "02",
        title: "打开一个证据锚点",
        body: "先检查一个案例段落，再开始问宽泛的作品集问题。",
      },
      {
        id: "question",
        label: "03",
        title: "问最关键的问题",
        body: "用岗位问题检查推理、取舍和方法选择。",
      },
      {
        id: "boundary",
        label: "04",
        title: "验证证据边界",
        body: "最后确认这些证据证明什么，以及下一步还需要验证什么。",
      },
    ],
    close: {
      title: "选好岗位路径后，用这个议程准备面试。",
      body: "最快路径是：比较岗位、检查一个 anchor，再围绕一个问题和一个边界展开面试。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "打开 proof review", href: "/hire/review" },
    },
  },
} as const;

function buildRolePrep(role: HiringRoleId, locale: ProofLocale): InterviewAgendaRolePrep {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);

  if (!packet || !applicationPacket || !followThrough) {
    throw new Error(`Missing interview agenda data for ${role}`);
  }

  const proof = packet.proofClaims[0];
  const firstQuestion =
    packet.interviewQuestions[0]?.question ??
    followThrough.decisionQuestions[0] ??
    applicationPacket.interviewFocus[0];

  return {
    id: packet.id,
    label: packet.label,
    fitThesis: packet.fitThesis,
    proof: {
      claim: proof.claim,
      evidence: proof.evidence,
      boundary: proof.boundary,
      href: proof.strongestAnchor,
    },
    firstQuestion,
    agendaItems: followThrough.meetingAgenda.slice(0, 4),
    decisionQuestions: followThrough.decisionQuestions.slice(0, 3),
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
    contactRoute: `/contact?role=${packet.id}&intent=interview`,
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
  };
}

export function getInterviewAgendaBoard(locale: ProofLocale): InterviewAgendaBoard {
  const copy = agendaCopy[locale];
  const roles = getRolePackets(locale).map((packet) => buildRolePrep(packet.id, locale));

  return {
    locale,
    hero: copy.hero,
    agendaPhases: copy.phases.map((phase) => ({ ...phase })),
    roles,
    hireRoute: "/hire",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    close: copy.close,
  };
}
