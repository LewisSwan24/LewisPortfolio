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
    doNotOverclaim: "Do not overclaim",
    shouldNotOverclaim: "What this packet should not overclaim",
    nextStep: "Next step",
    rolePacketCloseTitle: "Use this packet to choose the interview path.",
    rolePacketCloseBody:
      "Start with the strongest proof, then use the interview questions to inspect the boundary behind the claim.",
    generalHireRoom: "General hire room",
    strongestCase: "Strongest case",
    roleContext: "Role context",
    openRolePacket: "Open role packet",
    bestInterviewAngle: "Best interview angle",
    limit: "Limit",
    evidenceBrief: "Evidence brief",
    evidenceBriefTitle: "What to inspect before the call.",
    evidenceBriefIntro:
      "Each proof point links to a case section instead of asking the reader to browse everything.",
    questionsWorthAsking: "Questions worth asking.",
    questionsIntro:
      "Use these to inspect how I reason, not just what the final screens looked like.",
    inspectEvidence: "Inspect evidence",
    boundaries: "Boundaries",
    boundariesTitle: "What I would not overclaim.",
    boundariesIntro: "These limits make the evidence more useful, not weaker.",
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
    doNotOverclaim: "不要过度声称",
    shouldNotOverclaim: "这个岗位包不应该过度声称什么",
    nextStep: "下一步",
    rolePacketCloseTitle: "用这个岗位包选择面试路径。",
    rolePacketCloseBody:
      "先看最强证明，再用面试问题检查每个主张背后的证据边界。",
    generalHireRoom: "通用招聘判断页",
    strongestCase: "最强案例",
    roleContext: "岗位上下文",
    openRolePacket: "返回岗位包",
    bestInterviewAngle: "最适合追问的面试角度",
    limit: "边界",
    evidenceBrief: "证据摘要",
    evidenceBriefTitle: "面试前最值得检查的内容。",
    evidenceBriefIntro:
      "每个证明点都直接链接到案例段落，不需要读者自己浏览全部项目。",
    questionsWorthAsking: "值得追问的问题。",
    questionsIntro: "用这些问题检查我的推理方式，而不只是最终界面。",
    inspectEvidence: "查看证据",
    boundaries: "边界",
    boundariesTitle: "我不会过度声称什么。",
    boundariesIntro: "这些边界让证据更有用，而不是更弱。",
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
