import type { ProofLocale } from "@/lib/proof";

const routeLabels: Record<ProofLocale, Record<string, string>> = {
  en: {
    "/hire/review": "Open proof review",
    "/hire/compare": "Compare role paths",
    "/hire/readiness": "Hiring readiness",
    "/hire/briefing": "Hiring briefing",
    "/hire/tracker": "Hiring tracker",
    "/hire/action": "Hiring action",
    "/hire/command": "Hiring command",
    "/hire/partnership": "Partnership operating",
  },
  zh: {
    "/hire/review": "打开证据评审",
    "/hire/compare": "比较岗位路径",
    "/hire/readiness": "准备度检查",
    "/hire/briefing": "招聘简报",
    "/hire/tracker": "跟进追踪",
    "/hire/action": "行动板",
    "/hire/command": "招聘控制台",
    "/hire/partnership": "协作运行包",
  },
};

export function getHiringViewCopy(locale: ProofLocale) {
  const zh = locale === "zh";

  return {
    proofReady: zh ? "证据就绪" : "Proof ready",
    contactReady: zh ? "联系就绪" : "Contact ready",
    nextAction: zh ? "下一步" : "Next action",
    closeoutRule: zh ? "收尾规则" : "Closeout rule",
    roleSummary: zh ? "岗位摘要" : "Role summary",
    role: zh ? "岗位" : "Role",
    packet: zh ? "材料包" : "Packet",
    followThrough: zh ? "跟进" : "Follow-through",
    contact: zh ? "联系" : "Contact",
    inspectProofAnchor: zh ? "查看证据锚点" : "Inspect proof anchor",
    recommendedRoute: zh ? "推荐路径" : "Recommended route",
    reviewRoute: zh ? "复查路径" : "Review route",
    proofFocus: zh ? "证据重点" : "Proof focus",
    openingMove: zh ? "打开动作" : "Opening move",
    decisionFocus: zh ? "决策重点" : "Decision focus",
    managerQuestion: zh ? "经理问题" : "Manager question",
    completionSignal: zh ? "完成信号" : "Completion signal",
    openRoute: zh ? "打开路径" : "Open route",
    proofAnchor: zh ? "证据锚点" : "Proof anchor",
    scorecard: {
      criteriaEyebrow: zh ? "决策框架" : "Decision frame",
      criteriaTitle: zh ? "评分标准" : "Score criteria",
      criteriaIntro: zh
        ? "只评价证据能支持的内容。每条标准都把候选判断绑定到岗位需求、证据锚点、边界和下一步行动。"
        : "Score only what the proof can support. Each criterion keeps the shortlist decision tied to a role need, evidence anchor, boundary, and next action.",
      rolesEyebrow: zh ? "岗位路径" : "Role lanes",
      rolesTitle: zh ? "岗位评分卡" : "Role scorecards",
      rolesIntro: zh
        ? "每条路径都把候选判断拆成岗位判断、证据锚点、边界、评分提示和可打开的下一步。"
        : "Each lane keeps the shortlist decision inspectable: role thesis, proof anchor, boundary, prompts, and route actions stay in one place.",
      recommendationRule: zh ? "推荐规则" : "Recommendation rule",
      evidenceToScore: zh ? "评分证据" : "Evidence to score",
      boundaryBeforeShortlist: zh ? "进入候选名单前的边界" : "Boundary before shortlist",
      scorePrompts: zh ? "评分提示" : "Score prompts",
    },
    action: {
      summaryEyebrow: zh ? "行动框架" : "Action frame",
      summaryTitle: zh ? "行动摘要" : "Action summary",
      summaryIntro: zh
        ? "准备度明确后，用这块行动板快速看到负责人、路径、证据锚点和备选动作。"
        : "Use this board after readiness is known and the hiring reader needs the owner, route, proof anchor, and fallback for the next move.",
      sequenceEyebrow: zh ? "行动顺序" : "Action sequence",
      sequenceTitle: zh ? "行动顺序" : "Action sequence",
      sequenceIntro: zh
        ? "每个行动都明确负责人、第一步、证据重点、成功信号和对应路径，减少重复判断。"
        : "Each action names an owner, first move, proof focus, success signal, and route so the hiring reader can keep momentum without guessing.",
      rolesEyebrow: zh ? "岗位路径" : "Role lanes",
      rolesTitle: zh ? "岗位行动路径" : "Role action lanes",
      rolesIntro: zh
        ? "每条路径把准备度转成负责人、第一步、应打开的证据、路径、成功信号、阻塞风险和备选动作。"
        : "Each lane turns readiness into owner, first action, proof to open, route to open, success signal, blocking risk, and fallback.",
      artifactsEyebrow: zh ? "可复用动作" : "Reusable actions",
      artifactsTitle: zh ? "行动材料" : "Action artifacts",
      artifactsIntro: zh
        ? "这些材料把岗位行动、证据锚点和负责人压缩成招聘方、经理、面试小组和入职交接可用的短记录。"
        : "These artifacts package role action, proof anchor, and owner into short notes for recruiter, manager, panel, and onboarding handoff.",
      proofForAction: zh ? "行动证据" : "Proof for action",
      actionOwner: zh ? "行动负责人" : "Action owner",
      firstAction: zh ? "第一步行动" : "First action",
      proofFocus: zh ? "证据重点" : "Proof focus",
      proofToOpen: zh ? "要打开的证据" : "Proof to open",
      routeToOpen: zh ? "要打开的路径" : "Route to open",
      recruiterAction: zh ? "招聘方动作" : "Recruiter action",
      managerAction: zh ? "经理动作" : "Manager action",
      panelAction: zh ? "面试小组动作" : "Panel action",
      onboardingAction: zh ? "入职动作" : "Onboarding action",
      fallbackAction: zh ? "备选动作" : "Fallback action",
      successSignal: zh ? "成功信号" : "Success signal",
      blockingRisk: zh ? "阻塞风险" : "Blocking risk",
    },
    command: {
      summaryEyebrow: zh ? "控制框架" : "Command frame",
      summaryTitle: zh ? "控制台摘要" : "Command summary",
      summaryIntro: zh
        ? "用一个页面选择证据路径、检查岗位路径，并把同一条证据信号从评审延续到协作运行。"
        : "Use one board to choose a proof route, inspect a role lane, and keep the same evidence signal alive from review through partnership.",
      sequenceEyebrow: zh ? "路径顺序" : "Route order",
      sequenceTitle: zh ? "控制台顺序" : "Command sequence",
      sequenceIntro: zh
        ? "每一步都明确经理问题、证据重点、完成信号和应打开的路径，避免深层页变成无差别目录。"
        : "Each step names the manager question, proof focus, completion signal, and route to open when that moment is the real blocker.",
      rolesEyebrow: zh ? "岗位路径" : "Role lanes",
      rolesTitle: zh ? "岗位控制路径" : "Role command lanes",
      rolesIntro: zh
        ? "每条路径汇总当前信号、决策重点、证据门槛、经理风险、团队交接、跟进节奏、升级触发点和下一步行动。"
        : "Each lane pulls together the current signal, decision focus, proof gate, manager risk, team handoff, ritual, escalation trigger, and next action.",
      checkpointsEyebrow: zh ? "运行护栏" : "Operating guardrails",
      checkpointsTitle: zh ? "运行检查点" : "Operating checkpoints",
      checkpointsIntro: zh
        ? "这些检查点避免控制台变成另一张长列表：先看证据，再命名风险，提前规划预期，最后复查连续性。"
        : "These checkpoints keep the command center from becoming another list: proof first, risk named, expectations planned, continuity reviewed.",
      proofBeforeAction: zh ? "行动前证据" : "Proof before command action",
      proofGate: zh ? "证据门槛" : "Proof gate",
      managerRisk: zh ? "经理风险" : "Manager risk",
      teamHandoff: zh ? "团队交接" : "Team handoff",
      followUpRitual: zh ? "跟进节奏" : "Follow-up ritual",
      escalationTrigger: zh ? "升级触发点" : "Escalation trigger",
      nextCommandAction: zh ? "下一步控制台行动" : "Next command action",
    },
    briefing: {
      summaryEyebrow: zh ? "简报框架" : "Briefing frame",
      summaryTitle: zh ? "简报摘要" : "Briefing summary",
      summaryIntro: zh
        ? "当证据已经准备好，但不同读者需要不同阅读路径、决策问题和下一步页面时，用这页做分流。"
        : "Use this room when the hiring proof is ready, but each stakeholder needs a different reading path, decision question, and next route.",
      stakeholdersEyebrow: zh ? "读者路径" : "Audience routes",
      stakeholdersTitle: zh ? "读者简报" : "Stakeholder briefs",
      stakeholdersIntro: zh
        ? "每份简报都明确读者、证据重点、要问的问题，以及打开下一页前该做的判断。"
        : "Each brief names the reader, the proof focus, the question to ask, and the decision they should make before opening the next surface.",
      rolesEyebrow: zh ? "岗位路径" : "Role lanes",
      rolesTitle: zh ? "岗位简报路径" : "Role briefing lanes",
      rolesIntro: zh
        ? "每条路径把控制台信号转成读者背景、开场背景、证据、决策问题、风险、交接、负责人和下一步行动。"
        : "Each lane turns the command-center signal into stakeholder context, opening context, evidence, decision question, risk, handoff, owner, and next action.",
      artifactsEyebrow: zh ? "可复用交接" : "Reusable handoff",
      artifactsTitle: zh ? "简报材料" : "Briefing artifacts",
      artifactsIntro: zh
        ? "这些材料把路径、证据锚点和可执行交接记录打包，让读者不用重读整站也能继续判断。"
        : "These artifacts package the route, proof anchor, and practical handoff note a stakeholder can reuse without rereading the entire portfolio.",
      readingFocus: zh ? "阅读重点" : "Reading focus",
      questionToAsk: zh ? "要问的问题" : "Question to ask",
      decisionToMake: zh ? "要做的判断" : "Decision to make",
      proofForBriefing: zh ? "简报证据" : "Proof for this briefing",
      stakeholderContext: zh ? "读者背景" : "Stakeholder context",
      openingContext: zh ? "开场背景" : "Opening context",
      evidenceToInspect: zh ? "要检查的证据" : "Evidence to inspect",
      decisionQuestion: zh ? "决策问题" : "Decision question",
      riskToResolve: zh ? "要解决的风险" : "Risk to resolve",
      handoffNote: zh ? "交接记录" : "Handoff note",
      followUpOwner: zh ? "跟进负责人" : "Follow-up owner",
      nextBriefingAction: zh ? "下一步简报行动" : "Next briefing action",
    },
    readiness: {
      summaryEyebrow: zh ? "准备度框架" : "Readiness frame",
      summaryTitle: zh ? "准备度摘要" : "Readiness summary",
      summaryIntro: zh
        ? "当证据已经完成简报，读者需要对某条岗位路径判断可推进、需验证或继续观察时，用这页做决策门。"
        : "Use this gate when the proof has been briefed and the hiring reader needs a clear go, validate, or monitor path for a specific role lane.",
      gatesEyebrow: zh ? "决策门" : "Decision gates",
      gatesTitle: zh ? "门槛检查" : "Gate checks",
      gatesIntro: zh
        ? "每个检查把笼统的正向信号转成具体通过条件、失败模式和下一条应打开的路径。"
        : "Each check turns a broad positive signal into a concrete pass condition, failure mode, and route to open next.",
      rolesEyebrow: zh ? "岗位路径" : "Role lanes",
      rolesTitle: zh ? "岗位准备度路径" : "Role readiness lanes",
      rolesIntro: zh
        ? "每条路径说明准备度状态、已证明证据、验证缺口、负责人、决策门、推荐路径和下一步行动。"
        : "Each lane names the readiness state, proven evidence, validation gap, owner, decision gate, route, and next action for the hiring reader.",
      artifactsEyebrow: zh ? "可复用判断" : "Reusable decisions",
      artifactsTitle: zh ? "准备度材料" : "Readiness artifacts",
      artifactsIntro: zh
        ? "这些材料把准备度状态、路径和证据锚点压缩成招聘方、经理和入职交接可用的短记录。"
        : "These artifacts package readiness state, route, and proof anchor into short notes for recruiter, manager, and onboarding handoff.",
      signal: zh ? "信号" : "Signal",
      passCondition: zh ? "通过条件" : "Pass condition",
      failureMode: zh ? "失败模式" : "Failure mode",
      nextRoute: zh ? "下一条路径" : "Next route",
      proofForReadiness: zh ? "准备度证据" : "Proof for readiness",
      provenEvidence: zh ? "已证明证据" : "Proven evidence",
      validationGap: zh ? "验证缺口" : "Validation gap",
      stakeholderOwner: zh ? "负责读者" : "Stakeholder owner",
      decisionGate: zh ? "决策门" : "Decision gate",
      recruiterNote: zh ? "招聘方记录" : "Recruiter note",
      interviewNote: zh ? "面试记录" : "Interview note",
      onboardingNote: zh ? "入职记录" : "Onboarding note",
      nextReadinessAction: zh ? "下一步准备度行动" : "Next readiness action",
    },
    tracker: {
      summaryEyebrow: zh ? "追踪框架" : "Tracker frame",
      summaryTitle: zh ? "追踪摘要" : "Tracker summary",
      summaryIntro: zh
        ? "行动板打开后，用这个追踪页把负责人、截止窗口、依赖、升级和收尾放在同一处。"
        : "Use this tracker after the action board is open and the hiring reader needs ownership, due window, dependency, escalation, and closeout in one place.",
      stagesEyebrow: zh ? "跟进顺序" : "Follow-up sequence",
      stagesTitle: zh ? "跟进阶段" : "Follow-up stages",
      stagesIntro: zh
        ? "每个阶段都明确负责人、跟进动作、追踪信号、路径和收尾规则，避免路径无人负责。"
        : "Each stage names the owner, follow-up action, tracking signal, route, and closeout rule so the lane does not stay unowned.",
      rolesEyebrow: zh ? "岗位路径" : "Role lanes",
      rolesTitle: zh ? "岗位追踪路径" : "Role tracker lanes",
      rolesIntro: zh
        ? "每条路径把行动状态转成可见负责人、截止窗口、依赖、升级路径、收尾信号和证据锚点。"
        : "Each lane turns action state into a visible owner, due window, dependency, escalation path, closeout signal, and proof anchor.",
      artifactsEyebrow: zh ? "可复用跟进" : "Reusable follow-ups",
      artifactsTitle: zh ? "追踪材料" : "Tracker artifacts",
      artifactsIntro: zh
        ? "这些材料把负责人、依赖、升级和收尾记录打包，让跟进可以审计，而不是停留在暗示。"
        : "These artifacts package owner, dependency, escalation, and closeout notes so follow-up is auditable instead of implied.",
      proofDependency: zh ? "证据依赖" : "Proof dependency",
      followUpOwner: zh ? "跟进负责人" : "Follow-up owner",
      followUpAction: zh ? "跟进动作" : "Follow-up action",
      trackingSignal: zh ? "追踪信号" : "Tracking signal",
      dueWindow: zh ? "截止窗口" : "Due window",
      evidenceDependency: zh ? "证据依赖" : "Evidence dependency",
      routeToReview: zh ? "复查路径" : "Route to review",
      nextFollowUp: zh ? "下一次跟进" : "Next follow-up",
      escalationPath: zh ? "升级路径" : "Escalation path",
      closeoutSignal: zh ? "收尾信号" : "Closeout signal",
      followUpRisk: zh ? "跟进风险" : "Follow-up risk",
    },
    readinessStatus(status: string) {
      if (!zh) return status;
      if (status === "Ready") return "可推进";
      if (status === "Validate") return "需验证";
      if (status === "Monitor") return "继续观察";
      return status;
    },
    trackerStatus(status: string) {
      if (!zh) return status;
      if (status === "Ready") return "可推进";
      if (status === "Waiting") return "等待中";
      if (status === "Blocked") return "被阻塞";
      return status;
    },
    routeLabel(href: string, fallback: string) {
      return routeLabels[locale][href] ?? fallback;
    },
  };
}
