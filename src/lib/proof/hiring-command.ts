import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringGrowthRoadmap } from "./hiring-growth";
import { getHiringImpactReview } from "./hiring-impact";
import { getHiringPartnershipOperatingPack } from "./hiring-partnership";
import { getHiringRetentionReadiness } from "./hiring-retention";
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
        actionLabel: "Partnership operating",
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
      eyebrow: "Stage 36 hiring command",
      headline: "面向 manager-ready proof 的 Hiring Command Center。",
      subhead:
        "一个 operating board，用来选择下一条 hiring proof route，检查最强 role lane，并把同一个 signal 从 interview review 延续到 partnership operating。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Partnership operating", href: "/hire/partnership" },
    },
    summary: [
      {
        id: "command-routes",
        label: "Command routes",
        value: "14",
        detail: "这个 sequence 覆盖 hire 首页之后的全部 shared hiring proof surface。",
      },
      {
        id: "role-lanes",
        label: "Role lanes",
        value: "4",
        detail: "每个招聘方向都有一条 command lane，包含 proof、risk、handoff 和 next action。",
      },
      {
        id: "decision-chain",
        label: "Decision chain",
        value: "End-to-end",
        detail: "Manager 可以从 proof review 走到 partnership operating，且不丢上下文。",
      },
      {
        id: "maintenance",
        label: "Maintenance",
        value: "Tracked",
        detail: "Command lanes 会进入同一套 proof maintenance 和 release bundle 检查。",
      },
    ],
    sequence: [
      {
        id: "scan-proof",
        label: "Scan proof",
        route: "/hire/review",
        actionLabel: "Open proof review",
        managerQuestion: "招聘对话应该从哪个 proof anchor 开始？",
        proofFocus: "Role claims、anchors、freshness 和 handoff readiness。",
        completionSignal: "Manager 已经有一条 role lane 和一个 strongest case 可以检查。",
      },
      {
        id: "compare-roles",
        label: "Compare role paths",
        route: "/hire/compare",
        actionLabel: "Compare role paths",
        managerQuestion: "哪种 role shape 最接近团队问题？",
        proofFocus: "Fit thesis、strongest proof、tradeoff 和 recommended next step。",
        completionSignal: "Role path 已经窄到可以准备 interview agenda。",
      },
      {
        id: "prepare-interview",
        label: "Prepare interview",
        route: "/hire/interview",
        actionLabel: "Interview agenda",
        managerQuestion: "哪个问题可以直接测试 proof boundary？",
        proofFocus: "First question、agenda items、decision questions 和 proof anchor。",
        completionSignal: "Interview 有具体 evidence path，而不是泛泛筛选。",
      },
      {
        id: "score-candidates",
        label: "Score candidates",
        route: "/hire/scorecard",
        actionLabel: "Hiring scorecard",
        managerQuestion: "哪些 score prompts 能区分 proof 和 assertion？",
        proofFocus: "Criteria、recommendation、boundary 和 score prompts。",
        completionSignal: "Manager 可以用同一套 scoring frame 比较 evidence。",
      },
      {
        id: "build-shortlist",
        label: "Build shortlist",
        route: "/hire/shortlist",
        actionLabel: "Shortlist memo",
        managerQuestion: "什么应该进入 shortlist，什么还需要验证？",
        proofFocus: "Manager note、shortlist reason、boundary 和 next action。",
        completionSignal: "Shortlist 有明确 role lane，而不是宽泛 portfolio scan。",
      },
      {
        id: "debrief-manager",
        label: "Debrief manager",
        route: "/hire/debrief",
        actionLabel: "Manager debrief",
        managerQuestion: "Second-round conversation 应该解决什么？",
        proofFocus: "Debrief thesis、manager brief、second-round question 和 next action。",
        completionSignal: "下一轮对话有清晰的 risk 和 evidence focus。",
      },
      {
        id: "decide-close-fit",
        label: "Decide close fit",
        route: "/hire/decision",
        actionLabel: "Decision pack",
        managerQuestion: "这个 role 的 remaining risk 是否可以接受？",
        proofFocus: "Decision signal、final recommendation、remaining risk 和 close question。",
        completionSignal: "Manager 有明确 yes、no 或 validate-next decision。",
      },
      {
        id: "prepare-offer",
        label: "Prepare offer",
        route: "/hire/offer",
        actionLabel: "Offer readiness",
        managerQuestion: "Offer close 前要先对齐哪个 onboarding focus？",
        proofFocus: "Offer signal、validation note、onboarding focus 和 readiness question。",
        completionSignal: "Offer path 已命名第一条 practical operating expectation。",
      },
      {
        id: "plan-onboarding",
        label: "Plan onboarding",
        route: "/hire/onboarding",
        actionLabel: "Onboarding plan",
        managerQuestion: "First week 和 first 30 days 应该证明什么？",
        proofFocus: "First-week focus、30-day outcome、onboarding risk 和 manager question。",
        completionSignal: "First month 有 proof-backed learning 和 delivery frame。",
      },
      {
        id: "align-kickoff",
        label: "Align kickoff",
        route: "/hire/kickoff",
        actionLabel: "Kickoff plan",
        managerQuestion: "什么 project brief 可以把 hiring proof 转成 team delivery？",
        proofFocus: "First project brief、success metric、stakeholder question 和 guardrail。",
        completionSignal: "First project 有已命名 artifact 和 risk guardrail。",
      },
      {
        id: "review-impact",
        label: "Review impact",
        route: "/hire/impact",
        actionLabel: "Impact review",
        managerQuestion: "哪些 first-month evidence 应该算作真实 progress？",
        proofFocus: "Impact signal、review metric、first-month evidence 和 risk watch。",
        completionSignal: "Team 可以 review actual contribution，而不是 onboarding activity。",
      },
      {
        id: "plan-growth",
        label: "Plan growth",
        route: "/hire/growth",
        actionLabel: "Growth roadmap",
        managerQuestion: "什么应该在 day 90 前复利？",
        proofFocus: "90-day outcome、team leverage、capability transfer 和 operating rhythm。",
        completionSignal: "下一次 review 有具体 growth signal 和 monitoring risk。",
      },
      {
        id: "check-retention",
        label: "Check retention",
        route: "/hire/retention",
        actionLabel: "Retention readiness",
        managerQuestion: "什么 support 能让 contribution 保持 durable？",
        proofFocus: "Long-term fit、manager support、team dependency 和 review cadence。",
        completionSignal: "Team 理解 Lewis 如何在 90 天之后继续复利。",
      },
      {
        id: "operate-partnership",
        label: "Operate partnership",
        route: "/hire/partnership",
        actionLabel: "Partnership operating",
        managerQuestion: "什么 working agreement 能让 partnership 持续有效？",
        proofFocus: "Operating agreement、manager touchpoint、team ritual 和 escalation rule。",
        completionSignal: "Role lane 有 practical operating agreement 和 review loop。",
      },
    ],
    checkpoints: [
      {
        id: "proof-before-preference",
        label: "Checkpoint 01",
        title: "先看 proof，再谈偏好。",
        body:
          "先用 command sequence 选择 proof surface，再讨论 role title、seniority 或 team fit。",
        route: "/hire/review",
      },
      {
        id: "risk-before-close",
        label: "Checkpoint 02",
        title: "Close 前先命名 risk。",
        body:
          "通过 scorecard、shortlist、debrief 和 decision surfaces，让 remaining risk 变明确。",
        route: "/hire/decision",
      },
      {
        id: "onboarding-before-offer",
        label: "Checkpoint 03",
        title: "Offer close 前先规划 operating expectations。",
        body:
          "用 offer、onboarding 和 kickoff surfaces，把 evidence 转成 first-week 和 first-project expectations。",
        route: "/hire/onboarding",
      },
      {
        id: "continuity-after-start",
        label: "Checkpoint 04",
        title: "开始工作后继续追踪同一个 signal。",
        body:
          "用 impact、growth、retention 和 partnership surfaces，复盘 proof 是否仍然匹配 team reality。",
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
      title: "当招聘对话需要一条明确 route 时，使用 command center。",
      body:
        "选择最接近的 hiring moment，打开 proof route，检查 role lane，再用 command action 把下一次对话锚定在 evidence 上。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Partnership operating", href: "/hire/partnership" },
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
    currentSignal: `${copy.signalPrefix}: ${partnershipRole.partnershipSignal}`,
    decisionFocus: `${copy.focusPrefix}: ${decisionQuestion}`,
    openingMove: `${copy.movePrefix}: ${openingMove}`,
    proofGate: `${copy.gatePrefix}: ${proofGate}`,
    managerRisk: `${copy.riskPrefix}: ${retentionRole.durabilityRisk}`,
    teamHandoff: `${copy.handoffPrefix}: ${teamHandoff}`,
    followUpRitual: `${copy.ritualPrefix}: ${partnershipRole.teamRitual}`,
    escalationTrigger: `${copy.escalationPrefix}: ${partnershipRole.escalationRule}`,
    nextCommandAction: `${copy.actionPrefix}: ${partnershipRole.nextPartnershipAction}`,
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
