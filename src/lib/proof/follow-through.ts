import { hiringRoleIds } from "./anchors";
import { getApplicationPacket } from "./application-packets";
import type {
  FollowThroughAction,
  FollowThroughBrief,
  HiringRoleId,
  ProofLocale,
} from "./types";

const followThroughCopy = {
  en: {
    headlineSuffix: "follow-through plan",
    summaryPrefix: "A practical next-step plan for",
    emailPrefix: "Interview follow-up for",
    emailIntro: "Hi, I am sharing Lewis Dong's role-specific packet for",
    emailClose:
      "Useful next step: review the linked proof, then use the agenda to decide whether to schedule a first interview.",
    copyEmail: "Copy email",
    openMail: "Open mail client",
    packet: "Open application packet",
    roleRoom: "Open full role room",
    contact: "Contact Lewis with role context",
    resume: "Open resume",
    agendaLead: "Review the strongest proof before discussing fit.",
    evidenceQuestion: "Which proof point is strongest for this opening?",
    boundaryQuestion: "Which boundary needs validation in the interview?",
  },
  zh: {
    headlineSuffix: "后续推进计划",
    summaryPrefix: "给招聘方的下一步行动计划：",
    emailPrefix: "Lewis Dong 岗位面试后续：",
    emailIntro: "你好，我想分享 Lewis Dong 针对这个岗位的申请包：",
    emailClose:
      "建议下一步：先查看链接里的证明，再用面试议程判断是否安排第一轮面试。",
    copyEmail: "复制邮件",
    openMail: "打开邮件客户端",
    packet: "打开申请包",
    roleRoom: "打开完整岗位页",
    contact: "附带岗位信息联系 Lewis",
    resume: "查看简历",
    agendaLead: "先看最强证明，再讨论岗位匹配。",
    evidenceQuestion: "这个岗位最强的证明点是什么？",
    boundaryQuestion: "哪个边界需要在面试里验证？",
  },
} as const;

function followThroughActions(
  role: HiringRoleId,
  locale: ProofLocale
): FollowThroughAction[] {
  const copy = followThroughCopy[locale];

  return [
    { kind: "copy-email", label: copy.copyEmail },
    { kind: "mailto", label: copy.openMail },
    { kind: "packet", label: copy.packet, href: `/contact?role=${role}` },
    { kind: "role-room", label: copy.roleRoom, href: `/hire?role=${role}` },
    { kind: "contact", label: copy.contact, href: `/contact?role=${role}&intent=interview` },
    { kind: "resume", label: copy.resume, href: "/resume" },
  ];
}

export function buildFollowThroughMailto(
  email: string,
  brief: Pick<FollowThroughBrief, "emailSubject" | "emailBody">
): `mailto:${string}` {
  const params = new URLSearchParams({
    subject: brief.emailSubject,
    body: brief.emailBody,
  });

  return `mailto:${email}?${params.toString()}`;
}

export function getFollowThroughBrief(
  role: string,
  locale: ProofLocale
): FollowThroughBrief | undefined {
  if (!hiringRoleIds.includes(role as HiringRoleId)) return undefined;

  const packet = getApplicationPacket(role, locale);
  if (!packet) return undefined;

  const copy = followThroughCopy[locale];
  const topProof = packet.proof.slice(0, 3);
  const topQuestions = packet.interviewFocus.slice(0, 4);

  return {
    id: packet.id,
    route: `/contact?role=${packet.id}&intent=interview`,
    label: packet.label,
    headline: `${packet.label} ${copy.headlineSuffix}`,
    summary: `${copy.summaryPrefix} ${packet.summary}`,
    emailSubject: `${copy.emailPrefix} ${packet.label}`,
    emailBody: `${copy.emailIntro} ${packet.label}.\n\n${packet.summary}\n\n${copy.emailClose}`,
    preCallEvidence: topProof.map((item) => ({
      id: item.id,
      label: item.claim,
      href: item.href,
      reason: item.evidence,
    })),
    meetingAgenda: [copy.agendaLead, ...topQuestions],
    decisionQuestions: [
      copy.evidenceQuestion,
      copy.boundaryQuestion,
      ...topProof.slice(0, 2).map((item) => item.boundary),
    ],
    boundaries: packet.boundaries.slice(0, 3),
    actions: followThroughActions(packet.id, locale),
  };
}

export function getFollowThroughBriefs(locale: ProofLocale): FollowThroughBrief[] {
  return hiringRoleIds.map((role) => {
    const brief = getFollowThroughBrief(role, locale);
    if (!brief) throw new Error(`Missing follow-through brief for ${role}`);
    return brief;
  });
}
