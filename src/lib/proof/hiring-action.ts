import { getHiringReadinessGate } from "./hiring-readiness";
import type {
  HiringActionBoardArtifact,
  HiringActionBoardPack,
  HiringActionBoardRole,
  HiringActionBoardSharedRoute,
  HiringReadinessGateRole,
  HiringReadinessScore,
  ProofLocale,
} from "./types";

const actionCopy = {
  en: {
    hero: {
      eyebrow: "Stage 39 hiring action",
      headline: "Hiring Action Board for proof-backed next steps.",
      subhead:
        "An action board that turns readiness scores into recruiter, manager, interview, onboarding, and proof-review moves for each hiring role.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring readiness", href: "/hire/readiness" },
    },
    summary: [
      {
        id: "action-routes",
        label: "Action routes",
        value: "18",
        detail:
          "The board keeps action, readiness, briefing, command, and every shared hiring proof route in one workflow.",
      },
      {
        id: "role-actions",
        label: "Role actions",
        value: "4",
        detail:
          "Each role lane names an owner, first action, proof anchor, route, fallback, and success signal.",
      },
      {
        id: "action-owners",
        label: "Owner types",
        value: "5",
        detail:
          "Recruiter, hiring manager, interview panel, onboarding partner, and proof reviewer each get a concrete next move.",
      },
      {
        id: "release-proof",
        label: "Release proof",
        value: "Tracked",
        detail:
          "Action lanes join proof maintenance, validation, handoff export, release bundle, and browser route sweeps.",
      },
    ],
    sequence: [
      {
        id: "recruiter-outreach",
        label: "Action 01",
        title: "Recruiter outreach",
        owner: "Recruiter",
        action: "Open the role lane, check the proof anchor, and contact Lewis with the role context.",
        proofFocus: "Role-specific proof claim, evidence, and boundary.",
        successSignal: "The first message names the role, proof anchor, and question to resolve.",
        route: "/hire/action",
        actionLabel: "Open action board",
      },
      {
        id: "manager-validation",
        label: "Action 02",
        title: "Manager validation",
        owner: "Hiring manager",
        action: "Open the recommended route and decide whether the validation gap is acceptable.",
        proofFocus: "Readiness score, decision gate, and route to open.",
        successSignal: "The manager can say ready, validate, or monitor without rereading every surface.",
        route: "/hire/readiness",
        actionLabel: "Open readiness gate",
      },
      {
        id: "panel-prompt",
        label: "Action 03",
        title: "Interview panel prompt",
        owner: "Interview panel",
        action: "Use the role question to shape the first interview prompt and evidence follow-up.",
        proofFocus: "Interview note, proof boundary, and follow-through route.",
        successSignal: "The interview tests the actual uncertainty instead of retelling the project.",
        route: "/hire/interview",
        actionLabel: "Open interview agenda",
      },
      {
        id: "onboarding-handoff",
        label: "Action 04",
        title: "Onboarding handoff",
        owner: "Onboarding partner",
        action: "Translate the readiness score into a first-week expectation and support boundary.",
        proofFocus: "Onboarding note, partnership route, and first-week action.",
        successSignal: "The first project has a named support owner and proof-linked expectation.",
        route: "/hire/onboarding",
        actionLabel: "Open onboarding plan",
      },
      {
        id: "proof-review-fallback",
        label: "Action 05",
        title: "Proof review fallback",
        owner: "Proof reviewer",
        action: "If the lane is blocked, open proof review and inspect the anchor before advancing.",
        proofFocus: "Anchor freshness, boundary clarity, and fallback route.",
        successSignal: "The blocked lane has one proof issue to resolve, not a vague concern.",
        route: "/hire/review",
        actionLabel: "Open proof review",
      },
    ],
    artifacts: [
      {
        id: "outreach-note",
        label: "Artifact 01",
        title: "Recruiter outreach note",
        body:
          "A short contact note that names role context, proof anchor, and the first question to resolve.",
        route: "/hire/action",
        actionLabel: "Open outreach note",
        proofLabel: "Outreach proof",
      },
      {
        id: "manager-action-note",
        label: "Artifact 02",
        title: "Manager action note",
        body:
          "A manager-facing note that turns readiness state into a route, validation gap, and decision.",
        route: "/hire/readiness",
        actionLabel: "Open manager note",
        proofLabel: "Manager proof",
      },
      {
        id: "panel-prompt-note",
        label: "Artifact 03",
        title: "Panel prompt note",
        body:
          "A panel note that turns proof boundary into a focused interview prompt.",
        route: "/hire/interview",
        actionLabel: "Open panel route",
        proofLabel: "Panel proof",
      },
      {
        id: "handoff-note",
        label: "Artifact 04",
        title: "Onboarding action note",
        body:
          "A handoff note that connects readiness score to first-week expectation and support owner.",
        route: "/hire/onboarding",
        actionLabel: "Open handoff route",
        proofLabel: "Handoff proof",
      },
    ],
    statePrefix: "Action state",
    ownerPrefix: "Action owner",
    firstPrefix: "First action",
    proofPrefix: "Proof to open",
    recruiterPrefix: "Recruiter action",
    managerPrefix: "Manager action",
    panelPrefix: "Panel action",
    onboardingPrefix: "Onboarding action",
    fallbackPrefix: "Fallback action",
    signalPrefix: "Success signal",
    riskPrefix: "Blocking risk",
    nextPrefix: "Next action",
    close: {
      title: "Use the action board when readiness needs a concrete next move.",
      body:
        "Choose the role lane, confirm the owner, open the route, and use the fallback if the proof question is still blocked.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring readiness", href: "/hire/readiness" },
    },
  },
  zh: {
    hero: {
      eyebrow: "第 39 阶段 · 招聘行动板",
      headline: "把证据和准备度转成下一步行动。",
      subhead:
        "一个行动板，把准备度评分转成招聘方、经理、面试小组、入职伙伴和证据评审的下一步动作。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "准备度检查", href: "/hire/readiness" },
    },
    summary: [
      {
        id: "action-routes",
        label: "行动路径",
        value: "18",
        detail:
          "这个页面把行动、准备度、简报、控制台和招聘证据路径放进同一套工作流。",
      },
      {
        id: "role-actions",
        label: "岗位动作",
        value: "4",
        detail:
          "每条岗位路径都明确负责人、第一步行动、证据锚点、打开路径、备选动作和成功信号。",
      },
      {
        id: "action-owners",
        label: "负责人类型",
        value: "5",
        detail:
          "招聘方、招聘经理、面试小组、入职伙伴和证据评审人都有具体下一步。",
      },
      {
        id: "release-proof",
        label: "发布证据",
        value: "已追踪",
        detail:
          "行动路径会纳入证据维护、验证、交接导出、发布包和浏览器路径巡检。",
      },
    ],
    sequence: [
      {
        id: "recruiter-outreach",
        label: "行动 01",
        title: "招聘方首次沟通",
        owner: "招聘方",
        action: "打开岗位路径，检查证据锚点，并带着岗位背景联系 Lewis。",
        proofFocus: "岗位对应的证据主张、证据内容和边界。",
        successSignal: "第一条消息明确岗位、证据锚点和要解决的问题。",
        route: "/hire/action",
        actionLabel: "打开行动板",
      },
      {
        id: "manager-validation",
        label: "行动 02",
        title: "经理验证",
        owner: "招聘经理",
        action: "打开推荐路径，判断剩余验证缺口是否可以接受。",
        proofFocus: "准备度评分、决策门槛和应打开的路径。",
        successSignal: "经理不必重读所有页面，也能判断通过、继续验证或观察。",
        route: "/hire/readiness",
        actionLabel: "打开准备度检查",
      },
      {
        id: "panel-prompt",
        label: "行动 03",
        title: "面试小组提示",
        owner: "面试小组",
        action: "用岗位问题形成第一轮面试提示和证据追问。",
        proofFocus: "面试记录、证据边界和后续跟进路径。",
        successSignal: "面试验证真实不确定性，而不是重复讲项目。",
        route: "/hire/interview",
        actionLabel: "打开面试议程",
      },
      {
        id: "onboarding-handoff",
        label: "行动 04",
        title: "入职交接",
        owner: "入职伙伴",
        action: "把准备度评分转成第一周预期和支持边界。",
        proofFocus: "入职记录、协作路径和第一周行动。",
        successSignal: "第一个项目有明确支持负责人和证据关联预期。",
        route: "/hire/onboarding",
        actionLabel: "打开入职计划",
      },
      {
        id: "proof-review-fallback",
        label: "行动 05",
        title: "证据评审备选路径",
        owner: "证据评审人",
        action: "如果路径被卡住，先打开证据评审，检查证据锚点，再继续推进。",
        proofFocus: "证据新鲜度、边界清晰度和备选路径。",
        successSignal: "被卡住的路径只有一个明确证据问题，而不是泛泛的担心。",
        route: "/hire/review",
        actionLabel: "打开证据评审",
      },
    ],
    artifacts: [
      {
        id: "outreach-note",
        label: "材料 01",
        title: "招聘方沟通记录",
        body:
          "一条简短联系记录，说明岗位背景、证据锚点和第一轮要解决的问题。",
        route: "/hire/action",
        actionLabel: "打开沟通记录",
        proofLabel: "沟通证据",
      },
      {
        id: "manager-action-note",
        label: "材料 02",
        title: "经理行动记录",
        body:
          "面向经理的记录，把准备度状态转成打开路径、验证缺口和决策。",
        route: "/hire/readiness",
        actionLabel: "打开经理记录",
        proofLabel: "经理证据",
      },
      {
        id: "panel-prompt-note",
        label: "材料 03",
        title: "面试小组提示记录",
        body:
          "面向面试小组的记录，把证据边界转成聚焦的面试提示。",
        route: "/hire/interview",
        actionLabel: "打开面试路径",
        proofLabel: "面试证据",
      },
      {
        id: "handoff-note",
        label: "材料 04",
        title: "入职行动记录",
        body:
          "一条交接记录，把准备度评分连接到第一周预期和支持负责人。",
        route: "/hire/onboarding",
        actionLabel: "打开交接路径",
        proofLabel: "交接证据",
      },
    ],
    statePrefix: "行动状态",
    ownerPrefix: "行动负责人",
    firstPrefix: "第一步行动",
    proofPrefix: "要打开的证据",
    recruiterPrefix: "招聘方动作",
    managerPrefix: "经理动作",
    panelPrefix: "面试小组动作",
    onboardingPrefix: "入职动作",
    fallbackPrefix: "备选动作",
    signalPrefix: "成功信号",
    riskPrefix: "阻塞风险",
    nextPrefix: "下一步行动",
    close: {
      title: "准备度需要具体下一步时，使用行动板。",
      body:
        "选择岗位路径，确认负责人，打开对应页面；如果证据问题仍被卡住，就使用备选动作。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "准备度检查", href: "/hire/readiness" },
    },
  },
} as const;

const routeLabels: Record<ProofLocale, Record<HiringActionBoardSharedRoute, string>> = {
  en: {
    "/hire/action": "action board",
    "/hire/readiness": "readiness gate",
    "/hire/briefing": "briefing room",
    "/hire/command": "command center",
    "/hire/partnership": "partnership operating pack",
    "/hire/retention": "retention readiness pack",
    "/hire/growth": "growth roadmap",
    "/hire/impact": "impact review",
    "/hire/kickoff": "kickoff plan",
    "/hire/onboarding": "onboarding plan",
    "/hire/offer": "offer readiness pack",
    "/hire/decision": "decision pack",
    "/hire/debrief": "manager debrief",
    "/hire/shortlist": "shortlist memo",
    "/hire/scorecard": "hiring scorecard",
    "/hire/interview": "interview agenda",
    "/hire/compare": "role comparison",
    "/hire/review": "proof review",
  },
  zh: {
    "/hire/action": "行动板",
    "/hire/readiness": "准备度检查",
    "/hire/briefing": "招聘简报",
    "/hire/command": "招聘控制台",
    "/hire/partnership": "协作运行包",
    "/hire/retention": "留任准备包",
    "/hire/growth": "成长路线图",
    "/hire/impact": "影响复盘",
    "/hire/kickoff": "启动计划",
    "/hire/onboarding": "入职计划",
    "/hire/offer": "Offer 准备包",
    "/hire/decision": "决策包",
    "/hire/debrief": "经理复盘",
    "/hire/shortlist": "候选摘要",
    "/hire/scorecard": "招聘评分板",
    "/hire/interview": "面试议程",
    "/hire/compare": "岗位比较",
    "/hire/review": "证据评审",
  },
};

function readinessLabel(locale: ProofLocale, score: HiringReadinessScore): string {
  if (locale === "zh") {
    if (score === "Ready") return "可推进";
    if (score === "Validate") return "需验证";
    return "继续观察";
  }

  return score;
}

function actionState(
  score: HiringReadinessScore,
  route: HiringActionBoardSharedRoute,
  locale: ProofLocale
): string {
  const routeName = routeLabels[locale][route];

  if (score === "Ready") {
    return locale === "zh"
      ? `可以打开${routeName}，并带着证据、负责人和第一步行动推进。`
      : `Ready to open the ${routeName} with a proof-backed owner and first action.`;
  }

  if (score === "Validate") {
    return locale === "zh"
      ? `推进前先在${routeName}里验证剩余问题。`
      : `Validate the remaining question in the ${routeName} before advancing.`;
  }

  return locale === "zh"
    ? `先在${routeName}里观察这条路径，直到证据边界更清楚。`
    : `Monitor the lane in the ${routeName} until the proof boundary is clearer.`;
}

function ownerFor(score: HiringReadinessScore, locale: ProofLocale): string {
  if (locale === "zh") {
    if (score === "Ready") return "招聘方和招聘经理";
    if (score === "Validate") return "招聘经理和面试小组";
    return "证据评审人和招聘经理";
  }

  if (score === "Ready") return "Recruiter plus hiring manager";
  if (score === "Validate") return "Hiring manager plus interview panel";
  return "Proof reviewer plus hiring manager";
}

function firstAction(role: HiringReadinessGateRole, locale: ProofLocale): string {
  const routeName = routeLabels[locale][role.recommendedRoute];

  if (role.readinessScore === "Ready") {
    return locale === "zh"
      ? `打开${routeName}，并带着岗位背景联系 Lewis。`
      : `Open the ${routeName} and contact Lewis with the role context.`;
  }

  if (role.readinessScore === "Validate") {
    return locale === "zh"
      ? `打开${routeName}，先验证决策门槛，再发出沟通。`
      : `Open the ${routeName} and test the decision gate before outreach.`;
  }

  return locale === "zh"
    ? `打开${routeName}，先检查证据边界，再决定是否推进。`
    : `Open the ${routeName} and inspect the proof boundary before moving forward.`;
}

function buildActionRole(
  role: HiringReadinessGateRole,
  locale: ProofLocale
): HiringActionBoardRole {
  const routeToOpen = role.recommendedRoute;
  const routeName = routeLabels[locale][routeToOpen];

  return {
    id: role.id,
    label: role.label,
    readinessScore: role.readinessScore,
    actionState: actionState(role.readinessScore, routeToOpen, locale),
    actionOwner: ownerFor(role.readinessScore, locale),
    firstAction: firstAction(role, locale),
    proofToOpen: `${role.proof.claim} ${role.proof.evidence}`,
    routeToOpen,
    recruiterAction:
      locale === "zh"
        ? `用证据锚点为 ${role.label} 写一条岗位定制沟通记录。`
        : `Use the proof anchor to write a role-specific outreach note for ${role.label}.`,
    managerAction:
      locale === "zh"
        ? `用决策门槛为 ${role.label} 选择${readinessLabel(locale, role.readinessScore)}、继续验证或备选动作。`
        : `Use the decision gate to choose ${role.readinessScore}, validation, or fallback for ${role.label}.`,
    panelAction:
      locale === "zh"
        ? `用面试记录验证 ${role.label} 的真实不确定性。`
        : `Use the interview note to test the real uncertainty for ${role.label}.`,
    onboardingAction:
      locale === "zh"
        ? `用入职记录为 ${role.label} 明确第一周支持。`
        : `Use the onboarding note to name first-week support for ${role.label}.`,
    fallbackAction:
      locale === "zh"
        ? "如果被卡住，先打开证据评审，检查边界后再联系 Lewis。"
        : "If blocked, open proof review and inspect the boundary before contacting Lewis.",
    successSignal:
      locale === "zh"
        ? `下一条消息明确 ${role.label}、证据锚点、负责人和要打开的${routeName}。`
        : `The next message names ${role.label}, the proof anchor, the owner, and the route to open.`,
    blockingRisk: role.validationGap,
    nextAction:
      locale === "zh"
        ? `打开${routeName}，并解决决策门槛。`
        : `Open the ${routeName} and resolve the decision gate.`,
    proof: {
      claim: role.proof.claim,
      evidence: role.proof.evidence,
      boundary: role.proof.boundary,
      href: role.proof.href,
    },
    roleRoute: role.roleRoute,
    packetRoute: role.packetRoute,
    followThroughRoute: role.followThroughRoute,
    actionRoute: "/hire/action",
    readinessRoute: "/hire/readiness",
    briefingRoute: "/hire/briefing",
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
    contactRoute: `/contact?role=${role.id}&intent=action`,
  };
}

function buildActionArtifacts(
  locale: ProofLocale,
  roles: HiringActionBoardRole[]
): HiringActionBoardArtifact[] {
  const fallbackHref = roles[0]?.proof.href;

  if (!fallbackHref) {
    throw new Error(`Missing hiring action artifacts for ${locale}`);
  }

  return actionCopy[locale].artifacts.map((artifact, index) => ({
    id: artifact.id,
    label: artifact.label,
    title: artifact.title,
    body: artifact.body,
    route: artifact.route,
    actionLabel: artifact.actionLabel,
    proofLabel: artifact.proofLabel,
    proofHref: roles[index % roles.length]?.proof.href ?? fallbackHref,
  }));
}

export function getHiringActionBoard(locale: ProofLocale): HiringActionBoardPack {
  const copy = actionCopy[locale];
  const readiness = getHiringReadinessGate(locale);
  const roles = readiness.roles.map((role) => buildActionRole(role, locale));

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    sequence: copy.sequence.map((step) => ({ ...step })),
    roles,
    artifacts: buildActionArtifacts(locale, roles),
    hireRoute: "/hire",
    actionRoute: "/hire/action",
    readinessRoute: "/hire/readiness",
    briefingRoute: "/hire/briefing",
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
