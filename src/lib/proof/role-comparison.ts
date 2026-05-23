import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getRolePackets } from "./role-packets";
import type {
  HiringRoleId,
  ProofLocale,
  RoleComparisonBoard,
  RoleComparisonLane,
} from "./types";

const comparisonCopy = {
  en: {
    hero: {
      eyebrow: "Stage 23 role comparison",
      headline: "Compare role paths before the first call.",
      subhead:
        "A compact hiring board for choosing the best role lane, strongest proof anchor, interview question, and next action.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Open proof review", href: "/hire/review" },
    },
    criteria: [
      {
        id: "fit",
        label: "Fit",
        question: "Which opening most closely matches the proof lane?",
      },
      {
        id: "evidence",
        label: "Evidence",
        question: "Which case anchor should be checked before the call?",
      },
      {
        id: "boundary",
        label: "Boundary",
        question: "What should not be overclaimed in the interview?",
      },
      {
        id: "next",
        label: "Next action",
        question: "Should the reader open a packet, follow-through plan, or contact route?",
      },
    ],
    decisionSequence: [
      {
        id: "role",
        label: "01",
        title: "Choose the closest role lane",
        body: "Start from the opening, then pick the lane whose fit thesis names the real job problem.",
      },
      {
        id: "anchor",
        label: "02",
        title: "Verify one strong anchor",
        body: "Open the strongest case anchor before reading every page or scheduling a call.",
      },
      {
        id: "boundary",
        label: "03",
        title: "Check the boundary",
        body: "Use the boundary to keep the conversation honest and specific.",
      },
      {
        id: "action",
        label: "04",
        title: "Send the focused next step",
        body: "Open the packet or follow-through plan, then contact Lewis with the role context attached.",
      },
    ],
    recommendedNextStep: "Open the packet, then use the follow-through plan before outreach.",
    close: {
      title: "Use this board before choosing an interview path.",
      body:
        "The comparison view is for triage. Once a lane is clear, move into the role room, packet, or follow-through route.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Back to hire room", href: "/hire" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 23 role comparison",
      headline: "先比较岗位路径，再安排第一次沟通。",
      subhead:
        "一个紧凑的招聘比较板，用来选择最合适的岗位路径、最强证据锚点、面试问题和下一步行动。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "打开 proof review", href: "/hire/review" },
    },
    criteria: [
      {
        id: "fit",
        label: "匹配",
        question: "哪个岗位最接近当前招聘需求？",
      },
      {
        id: "evidence",
        label: "证据",
        question: "面试前应该先检查哪个案例锚点？",
      },
      {
        id: "boundary",
        label: "边界",
        question: "面试里不应该过度声称什么？",
      },
      {
        id: "next",
        label: "下一步",
        question: "读者应该打开申请包、后续计划，还是联系路径？",
      },
    ],
    decisionSequence: [
      {
        id: "role",
        label: "01",
        title: "选择最接近的岗位路径",
        body: "先看招聘需求，再选择 fit thesis 最贴近真实岗位问题的路径。",
      },
      {
        id: "anchor",
        label: "02",
        title: "验证一个最强锚点",
        body: "不要先读完整个作品集，先打开最强案例锚点。",
      },
      {
        id: "boundary",
        label: "03",
        title: "检查证据边界",
        body: "用 boundary 让面试问题保持具体、诚实。",
      },
      {
        id: "action",
        label: "04",
        title: "发送聚焦的下一步",
        body: "打开申请包或后续计划，再带着岗位上下文联系 Lewis。",
      },
    ],
    recommendedNextStep: "先打开申请包，再用后续计划准备联系。",
    close: {
      title: "先用这个比较板选择面试路径。",
      body: "比较页用于快速筛选。路径清楚后，再进入岗位页、申请包或后续计划。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "回到 hire room", href: "/hire" },
    },
  },
} as const;

function buildLane(role: HiringRoleId, locale: ProofLocale): RoleComparisonLane {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);

  if (!packet || !applicationPacket || !followThrough) {
    throw new Error(`Missing role comparison data for ${role}`);
  }

  const strongestProof = packet.proofClaims[0];
  const interviewQuestion =
    packet.interviewQuestions[0]?.question ??
    followThrough.decisionQuestions[0] ??
    applicationPacket.interviewFocus[0];

  return {
    id: packet.id,
    label: packet.label,
    fitThesis: packet.fitThesis,
    strongestCases: packet.strongestCases,
    claimCount: packet.proofClaims.length,
    anchorCount: packet.proofClaims.length,
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
    contactRoute: `/contact?role=${packet.id}`,
    reviewRoute: "/hire/review",
    strongestProof: {
      claim: strongestProof.claim,
      evidence: strongestProof.evidence,
      boundary: strongestProof.boundary,
      href: strongestProof.strongestAnchor,
    },
    interviewQuestion,
    recommendedNextStep: comparisonCopy[locale].recommendedNextStep,
  };
}

export function getRoleComparisonBoard(locale: ProofLocale): RoleComparisonBoard {
  const copy = comparisonCopy[locale];
  const roles = getRolePackets(locale).map((packet) => buildLane(packet.id, locale));

  return {
    locale,
    hero: copy.hero,
    criteria: copy.criteria.map((criterion) => ({ ...criterion })),
    roles,
    decisionSequence: copy.decisionSequence.map((step) => ({ ...step })),
    hireRoute: "/hire",
    reviewRoute: "/hire/review",
    close: copy.close,
  };
}
