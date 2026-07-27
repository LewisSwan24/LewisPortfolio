import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringGrowthRoadmap } from "./hiring-growth";
import { getHiringImpactReview } from "./hiring-impact";
import { getHiringPartnershipOperatingPack } from "./hiring-partnership";
import { getHiringRetentionReadiness } from "./hiring-retention";
import { prefixedProofCopy } from "./label-utils";
import { getRolePackets } from "./role-packets";
import type {
  HiringCommandCenterCheckpoint,
  HiringCommandCenterPack,
  HiringCommandCenterRole,
  HiringGrowthRoadmapRole,
  HiringImpactReviewRole,
  HiringPartnershipOperatingRole,
  HiringRetentionReadinessRole,
  HiringRoleId,
  ProofLocale,
} from "./types";

const commandCopy = {
  en: {
    hero: {
      eyebrow: "Stage 36 hiring command",
      headline: "Hiring Command Center for manager-ready proof.",
      subhead:
        "One operating board for choosing the next hiring proof route, inspecting the strongest role lane, and carrying the same signal from interview review through partnership operating.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Partnership operating", href: "/hire/partnership" },
    },
    summary: [
      {
        id: "command-routes",
        label: "Command routes",
        value: "14",
        detail: "The sequence covers every shared hiring proof surface after the main hire page.",
      },
      {
        id: "role-lanes",
        label: "Role lanes",
        value: "4",
        detail: "Every hiring role gets one command lane with proof, risk, handoff, and next action.",
      },
      {
        id: "decision-chain",
        label: "Decision chain",
        value: "End-to-end",
        detail: "Managers can move from proof review to partnership operating without losing context.",
      },
      {
        id: "maintenance",
        label: "Maintenance",
        value: "Tracked",
        detail: "Command lanes join the same proof maintenance and release bundle checks.",
      },
    ],
    sequence: [
      {
        id: "scan-proof",
        label: "Scan proof",
        route: "/hire/review",
        actionLabel: "Open proof review",
        managerQuestion: "Which proof anchor should the hiring conversation start from?",
        proofFocus: "Role claims, anchors, freshness, and handoff readiness.",
        completionSignal: "The manager has one role lane and one strongest case to inspect.",
      },
      {
        id: "compare-roles",
        label: "Compare role paths",
        route: "/hire/compare",
        actionLabel: "Compare role paths",
        managerQuestion: "Which role shape matches the team problem most closely?",
        proofFocus: "Fit thesis, strongest proof, tradeoff, and recommended next step.",
        completionSignal: "The role path is narrow enough for an interview agenda.",
      },
      {
        id: "prepare-interview",
        label: "Prepare interview",
        route: "/hire/interview",
        actionLabel: "Interview agenda",
        managerQuestion: "What question should test the proof boundary directly?",
        proofFocus: "First question, agenda items, decision questions, and proof anchor.",
        completionSignal: "The interview has a concrete evidence path instead of generic screening.",
      },
      {
        id: "score-candidates",
        label: "Score candidates",
        route: "/hire/scorecard",
        actionLabel: "Hiring scorecard",
        managerQuestion: "Which score prompts separate proof from assertion?",
        proofFocus: "Criteria, recommendation, boundary, and score prompts.",
        completionSignal: "The manager can compare evidence using the same scoring frame.",
      },
      {
        id: "build-shortlist",
        label: "Build shortlist",
        route: "/hire/shortlist",
        actionLabel: "Shortlist memo",
        managerQuestion: "What should stay in the shortlist and what still needs validation?",
        proofFocus: "Manager note, shortlist reason, boundary, and next action.",
        completionSignal: "The shortlist has a reasoned role lane instead of a broad portfolio scan.",
      },
      {
        id: "debrief-manager",
        label: "Debrief manager",
        route: "/hire/debrief",
        actionLabel: "Manager debrief",
        managerQuestion: "What should the second-round conversation resolve?",
        proofFocus: "Debrief thesis, manager brief, second-round question, and next action.",
        completionSignal: "The next conversation has a tight risk and evidence focus.",
      },
      {
        id: "decide-close-fit",
        label: "Decide close fit",
        route: "/hire/decision",
        actionLabel: "Decision pack",
        managerQuestion: "Is the remaining risk acceptable for this role?",
        proofFocus: "Decision signal, final recommendation, remaining risk, and close question.",
        completionSignal: "The manager has a clear yes, no, or validate-next decision.",
      },
      {
        id: "prepare-offer",
        label: "Prepare offer",
        route: "/hire/offer",
        actionLabel: "Offer readiness",
        managerQuestion: "What onboarding focus should be agreed before offer close?",
        proofFocus: "Offer signal, validation note, onboarding focus, and readiness question.",
        completionSignal: "The offer path names the first practical operating expectation.",
      },
      {
        id: "plan-onboarding",
        label: "Plan onboarding",
        route: "/hire/onboarding",
        actionLabel: "Onboarding plan",
        managerQuestion: "What should the first week and first 30 days prove?",
        proofFocus: "First-week focus, 30-day outcome, onboarding risk, and manager question.",
        completionSignal: "The first month has a proof-backed learning and delivery frame.",
      },
      {
        id: "align-kickoff",
        label: "Align kickoff",
        route: "/hire/kickoff",
        actionLabel: "Kickoff plan",
        managerQuestion: "What project brief turns hiring proof into team delivery?",
        proofFocus: "First project brief, success metric, stakeholder question, and guardrail.",
        completionSignal: "The first project has a named artifact and risk guardrail.",
      },
      {
        id: "review-impact",
        label: "Review impact",
        route: "/hire/impact",
        actionLabel: "Impact review",
        managerQuestion: "What first-month evidence should count as real progress?",
        proofFocus: "Impact signal, review metric, first-month evidence, and risk watch.",
        completionSignal: "The team can review actual contribution instead of onboarding activity.",
      },
      {
        id: "plan-growth",
        label: "Plan growth",
        route: "/hire/growth",
        actionLabel: "Growth roadmap",
        managerQuestion: "What should compound by day 90?",
        proofFocus: "90-day outcome, team leverage, capability transfer, and operating rhythm.",
        completionSignal: "The next review has a concrete growth signal and monitoring risk.",
      },
      {
        id: "check-retention",
        label: "Check retention",
        route: "/hire/retention",
        actionLabel: "Retention readiness",
        managerQuestion: "What support keeps the contribution durable?",
        proofFocus: "Long-term fit, manager support, team dependency, and review cadence.",
        completionSignal: "The team understands how Lewis can keep compounding after 90 days.",
      },
      {
        id: "operate-partnership",
        label: "Operate partnership",
        route: "/hire/partnership",
        actionLabel: "Open partnership route",
        managerQuestion: "What working agreement keeps the partnership useful?",
        proofFocus: "Operating agreement, manager touchpoint, team ritual, and escalation rule.",
        completionSignal: "The role lane has a practical operating agreement and review loop.",
      },
    ],
    checkpoints: [
      {
        id: "proof-before-preference",
        label: "Checkpoint 01",
        title: "Start with proof before preference.",
        body:
          "Use the command sequence to choose a proof surface before debating role title, seniority, or team fit.",
        route: "/hire/review",
      },
      {
        id: "risk-before-close",
        label: "Checkpoint 02",
        title: "Name the risk before close.",
        body:
          "Move through scorecard, shortlist, debrief, and decision surfaces until the remaining risk is explicit.",
        route: "/hire/decision",
      },
      {
        id: "onboarding-before-offer",
        label: "Checkpoint 03",
        title: "Plan operating expectations before offer close.",
        body:
          "Use offer, onboarding, and kickoff surfaces to turn evidence into first-week and first-project expectations.",
        route: "/hire/onboarding",
      },
      {
        id: "continuity-after-start",
        label: "Checkpoint 04",
        title: "Keep the same signal after start.",
        body:
          "Use impact, growth, retention, and partnership surfaces to review whether the proof still matches team reality.",
        route: "/hire/partnership",
      },
    ],
    signalPrefix: "Current signal",
    focusPrefix: "Decision focus",
    movePrefix: "Opening move",
    gatePrefix: "Proof gate",
    riskPrefix: "Manager risk",
    handoffPrefix: "Team handoff",
    ritualPrefix: "Follow-up ritual",
    escalationPrefix: "Escalation trigger",
    actionPrefix: "Next command action",
    close: {
      title: "Use the command center when the hiring conversation needs one route.",
      body:
        "Pick the nearest hiring moment, open the proof route, inspect the role lane, and use the command action to keep the next conversation anchored in evidence.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Partnership operating", href: "/hire/partnership" },
    },
  },
  zh: {
    hero: {
      eyebrow: "第 36 阶段 · 招聘控制台",
      headline: "把招聘证据整理成经理可判断的路径。",
      subhead:
        "一个运行看板，用来选择下一条招聘证据路径，检查最强岗位路径，并把同一条信号从面试评审延续到协作运行。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "协作运行包", href: "/hire/partnership" },
    },
    summary: [
      {
        id: "command-routes",
        label: "控制路径",
        value: "14",
        detail: "这套顺序覆盖招聘首页之后的所有共享招聘证据页面。",
      },
      {
        id: "role-lanes",
        label: "岗位路径",
        value: "4",
        detail: "每个招聘方向都有一条控制路径，包含证据、风险、交接和下一步行动。",
      },
      {
        id: "decision-chain",
        label: "决策链路",
        value: "端到端",
        detail: "经理可以从证据评审走到协作运行，并且不丢失上下文。",
      },
      {
        id: "maintenance",
        label: "维护状态",
        value: "已追踪",
        detail: "控制路径会进入同一套证据维护和发布包检查。",
      },
    ],
    sequence: [
      {
        id: "scan-proof",
        label: "扫描证据",
        route: "/hire/review",
        actionLabel: "打开证据评审",
        managerQuestion: "招聘对话应该从哪个证据锚点开始？",
        proofFocus: "岗位主张、证据锚点、新鲜度和交接准备度。",
        completionSignal: "经理已经有一条岗位路径和一个最强案例可以检查。",
      },
      {
        id: "compare-roles",
        label: "比较岗位路径",
        route: "/hire/compare",
        actionLabel: "比较岗位路径",
        managerQuestion: "哪种岗位形态最接近团队问题？",
        proofFocus: "匹配判断、最强证据、取舍和推荐下一步。",
        completionSignal: "岗位路径已经窄到可以准备面试议程。",
      },
      {
        id: "prepare-interview",
        label: "准备面试",
        route: "/hire/interview",
        actionLabel: "面试议程",
        managerQuestion: "哪个问题可以直接测试证据边界？",
        proofFocus: "首个问题、议程项目、决策问题和证据锚点。",
        completionSignal: "面试有具体证据路径，而不是泛泛筛选。",
      },
      {
        id: "score-candidates",
        label: "评分候选",
        route: "/hire/scorecard",
        actionLabel: "招聘评分板",
        managerQuestion: "哪些评分提示能区分证据和断言？",
        proofFocus: "评分标准、推荐规则、边界和评分提示。",
        completionSignal: "经理可以用同一套评分框架比较证据。",
      },
      {
        id: "build-shortlist",
        label: "建立候选摘要",
        route: "/hire/shortlist",
        actionLabel: "候选摘要",
        managerQuestion: "什么应该进入候选名单，什么还需要验证？",
        proofFocus: "经理记录、候选理由、边界和下一步行动。",
        completionSignal: "候选摘要有明确岗位路径，而不是宽泛浏览作品集。",
      },
      {
        id: "debrief-manager",
        label: "经理复盘",
        route: "/hire/debrief",
        actionLabel: "经理复盘",
        managerQuestion: "第二轮对话应该解决什么？",
        proofFocus: "复盘判断、经理简报、第二轮问题和下一步行动。",
        completionSignal: "下一轮对话有清晰的风险和证据重点。",
      },
      {
        id: "decide-close-fit",
        label: "判断接近匹配",
        route: "/hire/decision",
        actionLabel: "决策包",
        managerQuestion: "这个岗位的剩余风险是否可以接受？",
        proofFocus: "决策信号、最终推荐、剩余风险和收尾问题。",
        completionSignal: "经理有明确的通过、不通过或继续验证判断。",
      },
      {
        id: "prepare-offer",
        label: "准备 Offer",
        route: "/hire/offer",
        actionLabel: "Offer 准备",
        managerQuestion: "Offer 收尾前要先对齐哪个入职重点？",
        proofFocus: "Offer 信号、验证记录、入职重点和准备度问题。",
        completionSignal: "Offer 路径已经命名第一条实际运行预期。",
      },
      {
        id: "plan-onboarding",
        label: "规划入职",
        route: "/hire/onboarding",
        actionLabel: "入职计划",
        managerQuestion: "第一周和前 30 天应该证明什么？",
        proofFocus: "第一周重点、30 天结果、入职风险和经理问题。",
        completionSignal: "第一个月有证据支撑的学习和交付框架。",
      },
      {
        id: "align-kickoff",
        label: "对齐启动",
        route: "/hire/kickoff",
        actionLabel: "启动计划",
        managerQuestion: "什么项目简报可以把招聘证据转成团队交付？",
        proofFocus: "首个项目简报、成功指标、相关方问题和风险护栏。",
        completionSignal: "第一个项目有已命名材料和风险护栏。",
      },
      {
        id: "review-impact",
        label: "复盘影响",
        route: "/hire/impact",
        actionLabel: "影响复盘",
        managerQuestion: "哪些第一个月证据应该算作真实进展？",
        proofFocus: "影响信号、复盘指标、第一个月证据和风险观察。",
        completionSignal: "团队可以复盘真实贡献，而不是只看入职活动。",
      },
      {
        id: "plan-growth",
        label: "规划成长",
        route: "/hire/growth",
        actionLabel: "成长路线图",
        managerQuestion: "什么应该在 day 90 前复利？",
        proofFocus: "90 天结果、团队杠杆、能力迁移和运行节奏。",
        completionSignal: "下一次复盘有具体成长信号和监控风险。",
      },
      {
        id: "check-retention",
        label: "检查留任",
        route: "/hire/retention",
        actionLabel: "留任准备",
        managerQuestion: "什么支持能让贡献保持耐久？",
        proofFocus: "长期匹配、经理支持、团队依赖和复盘节奏。",
        completionSignal: "Team 理解 Lewis 如何在 90 天之后继续复利。",
      },
      {
        id: "operate-partnership",
        label: "运行协作",
        route: "/hire/partnership",
        actionLabel: "打开协作路径",
        managerQuestion: "什么工作协议能让协作持续有效？",
        proofFocus: "运行协议、经理触点、团队仪式和升级规则。",
        completionSignal: "岗位路径有实际运行协议和复盘闭环。",
      },
    ],
    checkpoints: [
      {
        id: "proof-before-preference",
        label: "检查点 01",
        title: "先看证据，再谈偏好。",
        body:
          "先用控制台顺序选择证据页面，再讨论岗位名称、资历或团队匹配。",
        route: "/hire/review",
      },
      {
        id: "risk-before-close",
        label: "检查点 02",
        title: "收尾前先命名风险。",
        body:
          "通过评分板、候选摘要、复盘和决策页面，让剩余风险变明确。",
        route: "/hire/decision",
      },
      {
        id: "onboarding-before-offer",
        label: "检查点 03",
        title: "Offer 收尾前先规划运行预期。",
        body:
          "用 Offer、入职和启动页面，把证据转成第一周和第一个项目预期。",
        route: "/hire/onboarding",
      },
      {
        id: "continuity-after-start",
        label: "检查点 04",
        title: "开始工作后继续追踪同一个信号。",
        body:
          "用影响、成长、留任和协作页面，复盘证据是否仍然匹配团队现实。",
        route: "/hire/partnership",
      },
    ],
    signalPrefix: "当前信号",
    focusPrefix: "决策重点",
    movePrefix: "打开动作",
    gatePrefix: "证据门槛",
    riskPrefix: "经理风险",
    handoffPrefix: "团队交接",
    ritualPrefix: "跟进节奏",
    escalationPrefix: "升级触发点",
    actionPrefix: "下一步控制台行动",
    close: {
      title: "当招聘对话需要一条明确路径时，使用招聘控制台。",
      body:
        "选择最接近的招聘时刻，打开证据路径，检查岗位路径，再用控制台行动把下一次对话锚定在证据上。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "协作运行包", href: "/hire/partnership" },
    },
  },
} as const;

function buildCommandRole(
  role: HiringRoleId,
  locale: ProofLocale,
  partnershipRoles: HiringPartnershipOperatingRole[],
  retentionRoles: HiringRetentionReadinessRole[],
  growthRoles: HiringGrowthRoadmapRole[],
  impactRoles: HiringImpactReviewRole[]
): HiringCommandCenterRole {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);
  const partnershipRole = partnershipRoles.find((candidate) => candidate.id === role);
  const retentionRole = retentionRoles.find((candidate) => candidate.id === role);
  const growthRole = growthRoles.find((candidate) => candidate.id === role);
  const impactRole = impactRoles.find((candidate) => candidate.id === role);

  if (
    !packet ||
    !applicationPacket ||
    !followThrough ||
    !partnershipRole ||
    !retentionRole ||
    !growthRole ||
    !impactRole
  ) {
    throw new Error(`Missing hiring command center data for ${role}`);
  }

  const copy = commandCopy[locale];
  const decisionQuestion =
    followThrough.decisionQuestions[0] ?? applicationPacket.interviewFocus[0] ?? growthRole.nextReview;
  const openingMove =
    followThrough.meetingAgenda[0] ?? applicationPacket.interviewFocus[0] ?? packet.fitThesis;
  const proofGate =
    applicationPacket.proof[0]?.claim ?? partnershipRole.proof.claim;
  const teamHandoff =
    impactRole.deliveryReview ?? retentionRole.teamDependency ?? growthRole.teamLeverage;

  return {
    id: packet.id,
    label: packet.label,
    currentSignal: prefixedProofCopy(copy.signalPrefix, partnershipRole.partnershipSignal),
    decisionFocus: prefixedProofCopy(copy.focusPrefix, decisionQuestion),
    openingMove: prefixedProofCopy(copy.movePrefix, openingMove),
    proofGate: prefixedProofCopy(copy.gatePrefix, proofGate),
    managerRisk: prefixedProofCopy(copy.riskPrefix, retentionRole.durabilityRisk),
    teamHandoff: prefixedProofCopy(copy.handoffPrefix, teamHandoff),
    followUpRitual: prefixedProofCopy(copy.ritualPrefix, partnershipRole.teamRitual),
    escalationTrigger: prefixedProofCopy(
      copy.escalationPrefix,
      partnershipRole.escalationRule
    ),
    nextCommandAction: prefixedProofCopy(
      copy.actionPrefix,
      partnershipRole.nextPartnershipAction
    ),
    proof: {
      claim: partnershipRole.proof.claim,
      evidence: partnershipRole.proof.evidence,
      boundary: partnershipRole.proof.boundary,
      href: partnershipRole.proof.href,
    },
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
    commandRoute: "/hire/command",
    partnershipRoute: "/hire/partnership",
    retentionRoute: "/hire/retention",
    growthRoute: "/hire/growth",
    impactRoute: "/hire/impact",
    kickoffRoute: "/hire/kickoff",
    onboardingRoute: "/hire/onboarding",
    offerRoute: "/hire/offer",
    decisionRoute: "/hire/decision",
    debriefRoute: "/hire/debrief",
    shortlistRoute: "/hire/shortlist",
    scorecardRoute: "/hire/scorecard",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    contactRoute: `/contact?role=${packet.id}&intent=command`,
  };
}

function buildCheckpoints(
  locale: ProofLocale,
  roles: HiringCommandCenterRole[]
): HiringCommandCenterCheckpoint[] {
  const fallbackHref = roles[0]?.proof.href;

  if (!fallbackHref) {
    throw new Error(`Missing hiring command checkpoints for ${locale}`);
  }

  return commandCopy[locale].checkpoints.map((checkpoint, index) => ({
    id: checkpoint.id,
    label: checkpoint.label,
    title: checkpoint.title,
    body: checkpoint.body,
    route: checkpoint.route,
    proofHref: roles[index % roles.length]?.proof.href ?? fallbackHref,
  }));
}

export function getHiringCommandCenter(locale: ProofLocale): HiringCommandCenterPack {
  const copy = commandCopy[locale];
  const partnershipRoles = getHiringPartnershipOperatingPack(locale).roles;
  const retentionRoles = getHiringRetentionReadiness(locale).roles;
  const growthRoles = getHiringGrowthRoadmap(locale).roles;
  const impactRoles = getHiringImpactReview(locale).roles;
  const roles = getRolePackets(locale).map((packet) =>
    buildCommandRole(
      packet.id,
      locale,
      partnershipRoles,
      retentionRoles,
      growthRoles,
      impactRoles
    )
  );

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    sequence: copy.sequence.map((step) => ({ ...step })),
    roles,
    checkpoints: buildCheckpoints(locale, roles),
    hireRoute: "/hire",
    commandRoute: "/hire/command",
    partnershipRoute: "/hire/partnership",
    retentionRoute: "/hire/retention",
    growthRoute: "/hire/growth",
    impactRoute: "/hire/impact",
    kickoffRoute: "/hire/kickoff",
    onboardingRoute: "/hire/onboarding",
    offerRoute: "/hire/offer",
    decisionRoute: "/hire/decision",
    debriefRoute: "/hire/debrief",
    shortlistRoute: "/hire/shortlist",
    scorecardRoute: "/hire/scorecard",
    interviewRoute: "/hire/interview",
    compareRoute: "/hire/compare",
    reviewRoute: "/hire/review",
    close: copy.close,
  };
}
