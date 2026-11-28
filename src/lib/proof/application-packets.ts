import { hiringRoleIds } from "./anchors";
import { getRolePacket } from "./role-packets";
import type {
  ApplicationPacket,
  ApplicationPacketAction,
  HiringRoleId,
  ProofLocale,
} from "./types";

const packetCopy = {
  en: {
    headlineSuffix: "application packet",
    summaryPrefix: "A one-page recruiter packet for",
    roleRoom: "Open full role room",
    contact: "Contact Lewis for this role",
    next: "Open next-step plan",
    resume: "Open resume",
    compose: "Customize tailored A4 dossier",
    patterns: "Inspect Pattern Atlas",
    lab: "Inspect Lab FSM graphs",
    critique: "Open A4 critique print studio",
  },
  zh: {
    headlineSuffix: "申请包",
    summaryPrefix: "给招聘方的一页岗位申请包：",
    roleRoom: "打开完整岗位页",
    contact: "按这个岗位联系 Lewis",
    next: "打开下一步计划",
    resume: "查看简历",
    compose: "定制双语 A4 履历",
    patterns: "查看交互模式图谱",
    lab: "查看实验室状态机",
    critique: "打开 A4 评注打印",
  },
} as const;

function packetActions(role: HiringRoleId, locale: ProofLocale): ApplicationPacketAction[] {
  const copy = packetCopy[locale];

  return [
    { kind: "role-room", label: copy.roleRoom, href: `/hire?role=${role}` },
    { kind: "compose", label: copy.compose, href: "/resume/compose" },
    { kind: "patterns", label: copy.patterns, href: "/patterns" },
    { kind: "lab", label: copy.lab, href: "/lab#fsm-explorer" },
    { kind: "critique", label: copy.critique, href: "/brief/print" },
    { kind: "contact", label: copy.contact, href: `/contact?role=${role}` },
    { kind: "next", label: copy.next, href: `/contact?role=${role}&intent=interview` },
    { kind: "resume", label: copy.resume, href: "/resume" },
  ];
}

export function getApplicationPacket(
  role: string,
  locale: ProofLocale
): ApplicationPacket | undefined {
  if (!hiringRoleIds.includes(role as HiringRoleId)) return undefined;

  const packet = getRolePacket(role as HiringRoleId, locale);
  if (!packet) return undefined;

  const copy = packetCopy[locale];

  return {
    id: packet.id,
    route: `/contact?role=${packet.id}`,
    label: packet.label,
    headline: `${packet.label} ${copy.headlineSuffix}`,
    summary: `${copy.summaryPrefix} ${packet.fitThesis}`,
    proof: packet.proofClaims.map((claim) => ({
      id: claim.id,
      claim: claim.claim,
      evidence: claim.evidence,
      href: claim.strongestAnchor,
      boundary: claim.boundary,
    })),
    interviewFocus: packet.interviewQuestions.map((question) => question.question),
    boundaries: packet.proofClaims.map((claim) => claim.boundary),
    actions: packetActions(packet.id, locale),
  };
}

export function getApplicationPackets(locale: ProofLocale): ApplicationPacket[] {
  return hiringRoleIds.map((role) => {
    const packet = getApplicationPacket(role, locale);
    if (!packet) throw new Error(`Missing application packet for ${role}`);
    return packet;
  });
}
