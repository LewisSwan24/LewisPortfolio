import type { InterviewQuestionBankItem, ProofLocale } from "./types";

export interface ProofUiLabels {
  rolePackets: string;
  pickHiringContext: string;
  bestProof: string;
  bestProofForRole: string;
  interviewRoute: string;
  interviewQuestions: string;
  doNotOverclaim: string;
  shouldNotOverclaim: string;
  nextStep: string;
  rolePacketCloseTitle: string;
  rolePacketCloseBody: string;
  generalHireRoom: string;
  strongestCase: string;
  roleContext: string;
  openRolePacket: string;
  bestInterviewAngle: string;
  limit: string;
  evidenceBrief: string;
  evidenceBriefTitle: string;
  evidenceBriefIntro: string;
  questionsWorthAsking: string;
  questionsIntro: string;
  inspectEvidence: string;
  boundaries: string;
  boundariesTitle: string;
  boundariesIntro: string;
  seeRelatedProof: string;
  applicationPacket: string;
  openApplicationPacket: string;
  packetProofSnapshot: string;
  packetInterviewFocus: string;
  packetBoundaries: string;
  packetActions: string;
  printPacket: string;
  followThrough: string;
  openFollowThrough: string;
  sendableEmail: string;
  copyEmail: string;
  copiedEmail: string;
  openMailClient: string;
  preCallEvidence: string;
  meetingAgenda: string;
  decisionQuestions: string;
  proofMaintenance: string;
  maintenanceReviewQueue: string;
  maintenanceCoverage: string;
  maintenanceMissing: string;
  maintenanceFresh: string;
  maintenanceWatch: string;
  maintenanceStale: string;
  maintenanceGenerated: string;
  maintenanceClaim: string;
  maintenanceRole: string;
  maintenanceSurface: string;
  maintenanceReviewed: string;
  maintenanceNextReview: string;
  maintenanceStatus: string;
  groupLabels: Record<InterviewQuestionBankItem["group"], string>;
}

const labels: Record<ProofLocale, ProofUiLabels> = {
  en: {
    rolePackets: "Role packets",
    pickHiringContext: "Pick the hiring context first.",
    bestProof: "Best proof",
    bestProofForRole: "Best proof for this role",
    interviewRoute: "Interview route",
    interviewQuestions: "Interview questions to ask",
    doNotOverclaim: "Scope note",
    shouldNotOverclaim: "Scope & testing boundaries",
    nextStep: "Next step",
    rolePacketCloseTitle: "Use this packet to choose the interview path.",
    rolePacketCloseBody:
      "Start with the strongest proof, then inspect the research and prototyping boundaries behind each decision.",
    generalHireRoom: "General hire overview",
    strongestCase: "Strongest case",
    roleContext: "Role context",
    openRolePacket: "Open role packet",
    bestInterviewAngle: "Best interview angle",
    limit: "Scope & next step",
    evidenceBrief: "Evidence brief",
    evidenceBriefTitle: "What to inspect before the call.",
    evidenceBriefIntro:
      "Each link jumps directly to the relevant interaction decision inside a case instead of making you scan everything.",
    questionsWorthAsking: "Questions worth asking.",
    questionsIntro:
      "Use these prompts to examine how I frame problems and resolve interaction trade-offs, not just finished visuals.",
    inspectEvidence: "Inspect decision",
    boundaries: "Project Scope",
    boundariesTitle: "Context & testing boundaries.",
    boundariesIntro: "Clear context makes usability findings and prototype evidence far more useful in review.",
    seeRelatedProof: "See related proof",
    applicationPacket: "Application packet",
    openApplicationPacket: "Open application packet",
    packetProofSnapshot: "Proof snapshot",
    packetInterviewFocus: "Interview focus",
    packetBoundaries: "Boundaries",
    packetActions: "Packet actions",
    printPacket: "Print packet",
    followThrough: "Follow-through",
    openFollowThrough: "Open next-step plan",
    sendableEmail: "Sendable email",
    copyEmail: "Copy email",
    copiedEmail: "Copied",
    openMailClient: "Open mail client",
    preCallEvidence: "Pre-call evidence",
    meetingAgenda: "Interview agenda",
    decisionQuestions: "Decision questions",
    proofMaintenance: "Proof maintenance",
    maintenanceReviewQueue: "Review queue",
    maintenanceCoverage: "Coverage",
    maintenanceMissing: "Missing review metadata",
    maintenanceFresh: "Fresh",
    maintenanceWatch: "Watch",
    maintenanceStale: "Stale",
    maintenanceGenerated: "Generated",
    maintenanceClaim: "Claim",
    maintenanceRole: "Role",
    maintenanceSurface: "Surface",
    maintenanceReviewed: "Reviewed",
    maintenanceNextReview: "Next review",
    maintenanceStatus: "Status",
    groupLabels: {
      product: "Product judgment",
      research: "Research rigor",
      accessibility: "Accessibility",
      ai: "AI trust",
      limits: "Limits",
    },
  },
  zh: {
    rolePackets: "岗位包",
    pickHiringContext: "先选择招聘语境。",
    bestProof: "最强证明",
    bestProofForRole: "这个岗位最该看的证明",
    interviewRoute: "面试追问路径",
    interviewQuestions: "适合追问的问题",
    doNotOverclaim: "验证边界",
    shouldNotOverclaim: "适用范围与当前验证条件",
    nextStep: "下一步",
    rolePacketCloseTitle: "对照这份简报安排面试沟通重点。",
    rolePacketCloseBody:
      "可以先从最有代表性的案例入手，再顺着追问清单核对研究条件与实验边界。",
    generalHireRoom: "回到综合概览",
    strongestCase: "代表案例",
    roleContext: "岗位语境",
    openRolePacket: "打开岗位简报",
    bestInterviewAngle: "最适合追问的切入点",
    limit: "边界与下一步",
    evidenceBrief: "案例速览",
    evidenceBriefTitle: "通话前最值得点开的几处。",
    evidenceBriefIntro:
      "每条摘要都直连案例里的核心转折段落，不用在长篇介绍里反复翻找。",
    questionsWorthAsking: "值得聊的设计问题。",
    questionsIntro: "这些问题面向我的调研判断、原型取舍与交互逻辑，不只停留在成稿画面。",
    inspectEvidence: "查看该处推理",
    boundaries: "验证语境",
    boundariesTitle: "每件作品的真实边界与下一步。",
    boundariesIntro: "把测试条件和尚待验证的问题交代清楚，探讨交互方案才更有针对性。",
    seeRelatedProof: "查看相关证明",
    applicationPacket: "申请包",
    openApplicationPacket: "打开申请包",
    packetProofSnapshot: "证明摘要",
    packetInterviewFocus: "面试关注点",
    packetBoundaries: "边界",
    packetActions: "申请包操作",
    printPacket: "打印申请包",
    followThrough: "后续推进",
    openFollowThrough: "打开下一步计划",
    sendableEmail: "可发送邮件",
    copyEmail: "复制邮件",
    copiedEmail: "已复制",
    openMailClient: "打开邮件客户端",
    preCallEvidence: "面试前证据",
    meetingAgenda: "面试议程",
    decisionQuestions: "决策问题",
    proofMaintenance: "证明维护",
    maintenanceReviewQueue: "复查队列",
    maintenanceCoverage: "覆盖范围",
    maintenanceMissing: "缺少复查元数据",
    maintenanceFresh: "新鲜",
    maintenanceWatch: "观察",
    maintenanceStale: "过期",
    maintenanceGenerated: "生成时间",
    maintenanceClaim: "主张",
    maintenanceRole: "岗位",
    maintenanceSurface: "页面",
    maintenanceReviewed: "已复查",
    maintenanceNextReview: "下次复查",
    maintenanceStatus: "状态",
    groupLabels: {
      product: "产品判断",
      research: "研究严谨性",
      accessibility: "无障碍",
      ai: "AI 信任",
      limits: "边界",
    },
  },
};

export function getProofUiLabels(locale: ProofLocale): ProofUiLabels {
  return labels[locale];
}
