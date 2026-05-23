import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getRolePackets } from "./role-packets";
import type {
  HiringRoleId,
  HiringScorecardBoard,
  HiringScorecardRole,
  ProofLocale,
} from "./types";

const scorecardCopy = {
  en: {
    hero: {
      eyebrow: "Stage 25 hiring scorecard",
      headline: "Hiring scorecard for the shortlist decision.",
      subhead:
        "A proof-backed board for scoring role fit after the first call without hiding the decision behind automation.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Interview agenda", href: "/hire/interview" },
    },
    criteria: [
      {
        id: "role-fit",
        label: "Role fit",
        question: "Does the opening match the strongest proof-backed role lane?",
      },
      {
        id: "evidence",
        label: "Evidence",
        question: "Which case anchor supports the shortlist decision?",
      },
      {
        id: "boundary",
        label: "Boundary",
        question: "What should be validated before making the claim stronger?",
      },
      {
        id: "follow-through",
        label: "Follow-through",
        question: "Which next route should the recruiter open after scoring?",
      },
    ],
    recommendation: "Shortlist if the proof anchor matches the role problem and the boundary is acceptable.",
    close: {
      title: "Use the scorecard after the first focused call.",
      body:
        "The scorecard is a decision aid: choose the closest role lane, open one proof anchor, then contact Lewis with the remaining validation question.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Open proof review", href: "/hire/review" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 25 hiring scorecard",
      headline: "用于 shortlist 决策的招聘评分板。",
      subhead:
        "一个 proof-backed 评分板，用来在第一次沟通后评估岗位匹配，而不是用自动化系统隐藏判断。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "面试议程", href: "/hire/interview" },
    },
    criteria: [
      {
        id: "role-fit",
        label: "岗位匹配",
        question: "当前岗位是否匹配最强的 proof-backed 岗位路径？",
      },
      {
        id: "evidence",
        label: "证据",
        question: "哪个案例锚点支持 shortlist 决策？",
      },
      {
        id: "boundary",
        label: "边界",
        question: "在加强这个判断前，还需要验证什么？",
      },
      {
        id: "follow-through",
        label: "后续行动",
        question: "评分后招聘方应该打开哪条下一步路径？",
      },
    ],
    recommendation: "如果证据锚点匹配岗位问题，并且边界可以接受，就适合进入 shortlist。",
    close: {
      title: "第一次聚焦沟通后使用这个评分板。",
      body:
        "这个评分板是 decision aid：选择最接近的岗位路径，打开一个证据锚点，再带着剩余验证问题联系 Lewis。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "打开 proof review", href: "/hire/review" },
    },
  },
} as const;

function buildScorecardRole(role: HiringRoleId, locale: ProofLocale): HiringScorecardRole {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);

  if (!packet || !applicationPacket || !followThrough) {
    throw new Error(`Missing hiring scorecard data for ${role}`);
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
    recommendation: scorecardCopy[locale].recommendation,
    proof: {
      claim: proof.claim,
      evidence: proof.evidence,
      boundary: proof.boundary,
      href: proof.strongestAnchor,
    },
    scorePrompts: [
      firstQuestion,
      followThrough.decisionQuestions[0],
      proof.nextValidation,
    ].filter(Boolean),
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    contactRoute: `/contact?role=${packet.id}&intent=scorecard`,
  };
}

export function getHiringScorecardBoard(locale: ProofLocale): HiringScorecardBoard {
  const copy = scorecardCopy[locale];
  const roles = getRolePackets(locale).map((packet) => buildScorecardRole(packet.id, locale));

  return {
    locale,
    hero: copy.hero,
    criteria: copy.criteria.map((criterion) => ({ ...criterion })),
    roles,
    hireRoute: "/hire",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    close: copy.close,
  };
}
