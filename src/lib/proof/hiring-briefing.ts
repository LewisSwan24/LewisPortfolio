import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringGrowthRoadmap } from "./hiring-growth";
import { getHiringPartnershipOperatingPack } from "./hiring-partnership";
import { getHiringRetentionReadiness } from "./hiring-retention";
import { prefixedProofCopy } from "./label-utils";
import { getRolePackets } from "./role-packets";
import type {
  HiringBriefingRoomArtifact,
  HiringBriefingRoomPack,
  HiringBriefingRoomRole,
  HiringGrowthRoadmapRole,
  HiringPartnershipOperatingRole,
  HiringRetentionReadinessRole,
  HiringRoleId,
  ProofLocale,
  RolePacket,
} from "./types";

const briefingCopy = {
  en: {
    hero: {
      eyebrow: "Stage 37 hiring briefing",
      headline: "Hiring Briefing Room for stakeholder-ready handoff.",
      subhead:
        "A briefing surface that turns the hiring command center into readable handoff notes for recruiters, hiring managers, design leads, interview panels, and onboarding partners.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring command", href: "/hire/command" },
    },
    summary: [
      {
        id: "stakeholders",
        label: "Stakeholders",
        value: "5",
        detail:
          "Recruiter, hiring manager, design lead, interview panel, and onboarding partner each get a focused reading path.",
      },
      {
        id: "role-briefs",
        label: "Role briefs",
        value: "4",
        detail:
          "Every hiring role converts command-center signal into opening context, evidence, risk, handoff, and next action.",
      },
      {
        id: "route-links",
        label: "Route links",
        value: "15",
        detail:
          "The room links command, partnership, retention, growth, impact, kickoff, onboarding, offer, decision, debrief, shortlist, scorecard, interview, compare, and review surfaces.",
      },
      {
        id: "release-proof",
        label: "Release proof",
        value: "Tracked",
        detail:
          "Briefing lanes join proof maintenance, validation, handoff export, release bundle, and browser route sweeps.",
      },
    ],
    stakeholders: [
      {
        id: "recruiter",
        label: "Recruiter",
        goal: "Find the fastest proof-backed way to introduce Lewis without flattening the role fit.",
        readingFocus: "Command route, role lane, packet route, and a short contact intent.",
        questionToAsk: "Which role signal should start the screen or outreach note?",
        decisionToMake: "Pick the role packet and next conversation owner.",
        route: "/hire/command",
        actionLabel: "Open hiring command",
      },
      {
        id: "hiring-manager",
        label: "Hiring manager",
        goal: "Translate portfolio evidence into a close-fit decision and a visible risk.",
        readingFocus: "Decision pack, risk note, proof boundary, and next briefing action.",
        questionToAsk: "What remaining risk must be resolved before the team commits?",
        decisionToMake: "Choose whether to close, validate, or redirect the role path.",
        route: "/hire/decision",
        actionLabel: "Open decision pack",
      },
      {
        id: "design-lead",
        label: "Design lead",
        goal: "Inspect the strongest proof anchor before judging craft, systems, or product judgment.",
        readingFocus: "Proof review, artifact links, case anchor, and evidence-to-inspect note.",
        questionToAsk: "Which artifact shows the actual operating quality, not just the outcome?",
        decisionToMake: "Choose the case anchor that should frame the portfolio review.",
        route: "/hire/review",
        actionLabel: "Open proof review",
      },
      {
        id: "interview-panel",
        label: "Interview panel",
        goal: "Turn each role lane into interview questions that test evidence and boundary.",
        readingFocus: "Interview agenda, decision question, proof gate, and role follow-through.",
        questionToAsk: "Which question should test the claimed contribution directly?",
        decisionToMake: "Select the interview route and the evidence to inspect live.",
        route: "/hire/interview",
        actionLabel: "Open interview agenda",
      },
      {
        id: "onboarding-partner",
        label: "Onboarding partner",
        goal: "Carry the same proof signal into first-week expectations and first-project setup.",
        readingFocus: "Onboarding plan, kickoff plan, partnership operating, and follow-up owner.",
        questionToAsk: "What should the first week prove for this team context?",
        decisionToMake: "Name the first operating expectation and owner.",
        route: "/hire/onboarding",
        actionLabel: "Open onboarding plan",
      },
    ],
    artifacts: [
      {
        id: "proof-reading-list",
        label: "Artifact 01",
        title: "Proof reading list",
        body:
          "A compact path from briefing signal to proof review, designed for someone who needs evidence before role preference.",
        route: "/hire/review",
        actionLabel: "Open proof reading",
        proofLabel: "Proof anchor",
      },
      {
        id: "interview-question-brief",
        label: "Artifact 02",
        title: "Interview question brief",
        body:
          "A question-first note that lets an interview panel test the claimed contribution and the boundary around it.",
        route: "/hire/interview",
        actionLabel: "Open interview brief",
        proofLabel: "Question proof",
      },
      {
        id: "decision-risk-note",
        label: "Artifact 03",
        title: "Decision risk note",
        body:
          "A manager-facing note that keeps the close decision honest by naming the risk still worth resolving.",
        route: "/hire/decision",
        actionLabel: "Open decision note",
        proofLabel: "Risk proof",
      },
      {
        id: "handoff-operating-note",
        label: "Artifact 04",
        title: "Handoff operating note",
        body:
          "A practical handoff note for turning interview evidence into onboarding, kickoff, and partnership expectations.",
        route: "/hire/partnership",
        actionLabel: "Open handoff note",
        proofLabel: "Handoff proof",
      },
    ],
    signalPrefix: "Briefing signal",
    stakeholderPrefix: "Stakeholder context",
    openingPrefix: "Opening context",
    evidencePrefix: "Evidence to inspect",
    questionPrefix: "Decision question",
    riskPrefix: "Risk to resolve",
    handoffPrefix: "Handoff note",
    ownerPrefix: "Follow-up owner",
    actionPrefix: "Next briefing action",
    close: {
      title: "Use the briefing room when the proof is strong but the audience is mixed.",
      body:
        "Pick the stakeholder, open the matching route, and use the role lane to keep the handoff specific enough for a real hiring conversation.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring command", href: "/hire/command" },
    },
  },
  zh: {
    hero: {
      eyebrow: "第 37 阶段 · 招聘简报",
      headline: "把招聘证据转成不同读者能接手的简报。",
      subhead:
        "把招聘控制台转成招聘方、招聘经理、设计负责人、面试小组和入职伙伴都能快速使用的交接简报。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "招聘控制台", href: "/hire/command" },
    },
    summary: [
      {
        id: "stakeholders",
        label: "读者角色",
        value: "5",
        detail:
          "招聘方、招聘经理、设计负责人、面试小组和入职伙伴各有一条聚焦阅读路径。",
      },
      {
        id: "role-briefs",
        label: "岗位简报",
        value: "4",
        detail:
          "每个招聘方向都会把控制台信号转成开场背景、证据、风险、交接和下一步行动。",
      },
      {
        id: "route-links",
        label: "页面链接",
        value: "15",
        detail:
          "简报页连接控制台、协作、留任、成长、影响、启动、入职、Offer、决策、复盘、候选、评分、面试、比较和评审页面。",
      },
      {
        id: "release-proof",
        label: "发布证据",
        value: "已追踪",
        detail:
          "简报路径会进入证据维护、验证、交接导出、发布包和浏览器路径巡检。",
      },
    ],
    stakeholders: [
      {
        id: "recruiter",
        label: "招聘方",
        goal: "用最快的证据路径介绍 Lewis，同时不压扁岗位匹配判断。",
        readingFocus: "控制台路径、岗位路径、材料包路径和简短联系意图。",
        questionToAsk: "筛选或沟通记录应该从哪条岗位信号开始？",
        decisionToMake: "选择岗位材料包和下一次对话负责人。",
        route: "/hire/command",
        actionLabel: "打开招聘控制台",
      },
      {
        id: "hiring-manager",
        label: "招聘经理",
        goal: "把作品集证据转成接近匹配判断和一个可见风险。",
        readingFocus: "决策包、风险记录、证据边界和下一步简报行动。",
        questionToAsk: "团队承诺前还必须解决哪个剩余风险？",
        decisionToMake: "选择收尾、继续验证或调整岗位路径。",
        route: "/hire/decision",
        actionLabel: "打开决策包",
      },
      {
        id: "design-lead",
        label: "设计负责人",
        goal: "在判断设计能力、系统能力或产品判断前先检查最强证据锚点。",
        readingFocus: "证据评审、材料链接、案例锚点和待检查证据记录。",
        questionToAsk: "哪个材料展示实际运行质量，而不只是结果？",
        decisionToMake: "选择作品集评审应该使用的案例锚点。",
        route: "/hire/review",
        actionLabel: "打开证据评审",
      },
      {
        id: "interview-panel",
        label: "面试小组",
        goal: "把每条岗位路径转成能测试证据和边界的面试问题。",
        readingFocus: "面试议程、决策问题、证据门槛和岗位跟进。",
        questionToAsk: "哪个问题可以直接测试声称的贡献？",
        decisionToMake: "选择面试路径和要现场检查的证据。",
        route: "/hire/interview",
        actionLabel: "打开面试议程",
      },
      {
        id: "onboarding-partner",
        label: "入职伙伴",
        goal: "把同一个证据信号带到第一周预期和第一个项目设置。",
        readingFocus: "入职计划、启动计划、协作运行和跟进负责人。",
        questionToAsk: "这个团队背景下第一周应该证明什么？",
        decisionToMake: "命名第一条运行预期和负责人。",
        route: "/hire/onboarding",
        actionLabel: "打开入职计划",
      },
    ],
    artifacts: [
      {
        id: "proof-reading-list",
        label: "材料 01",
        title: "证据阅读清单",
        body:
          "从简报信号到证据评审的紧凑路径，适合先看证据再谈岗位偏好的读者。",
        route: "/hire/review",
        actionLabel: "打开证据阅读",
        proofLabel: "证据锚点",
      },
      {
        id: "interview-question-brief",
        label: "材料 02",
        title: "面试问题简报",
        body:
          "一条问题优先的记录，帮助面试小组测试声称贡献以及它的边界。",
        route: "/hire/interview",
        actionLabel: "打开面试简报",
        proofLabel: "问题证据",
      },
      {
        id: "decision-risk-note",
        label: "材料 03",
        title: "决策风险记录",
        body:
          "面向经理的记录，通过明确剩余风险，让收尾判断保持诚实。",
        route: "/hire/decision",
        actionLabel: "打开决策记录",
        proofLabel: "风险证据",
      },
      {
        id: "handoff-operating-note",
        label: "材料 04",
        title: "交接运行记录",
        body:
          "一条可执行交接记录，把面试证据转成入职、启动和协作预期。",
        route: "/hire/partnership",
        actionLabel: "打开交接记录",
        proofLabel: "交接证据",
      },
    ],
    signalPrefix: "简报信号",
    stakeholderPrefix: "读者背景",
    openingPrefix: "开场背景",
    evidencePrefix: "要检查的证据",
    questionPrefix: "决策问题",
    riskPrefix: "要解决的风险",
    handoffPrefix: "交接记录",
    ownerPrefix: "跟进负责人",
    actionPrefix: "下一步简报行动",
    close: {
      title: "当证据很强但读者混合时，使用招聘简报。",
      body:
        "选择读者，打开对应路径，再用岗位路径让交接具体到可以进入真实招聘对话。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "招聘控制台", href: "/hire/command" },
    },
  },
} as const;

function buildBriefingRole(
  packet: RolePacket,
  locale: ProofLocale,
  partnershipRoles: HiringPartnershipOperatingRole[],
  retentionRoles: HiringRetentionReadinessRole[],
  growthRoles: HiringGrowthRoadmapRole[]
): HiringBriefingRoomRole {
  const role: HiringRoleId = packet.id;
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);
  const partnershipRole = partnershipRoles.find((candidate) => candidate.id === role);
  const retentionRole = retentionRoles.find((candidate) => candidate.id === role);
  const growthRole = growthRoles.find((candidate) => candidate.id === role);

  if (
    !applicationPacket ||
    !followThrough ||
    !partnershipRole ||
    !retentionRole ||
    !growthRole
  ) {
    throw new Error(`Missing hiring briefing room data for ${role}`);
  }

  const copy = briefingCopy[locale];
  const openingContext =
    applicationPacket.summary || followThrough.summary || partnershipRole.operatingAgreement;
  const evidenceToInspect =
    applicationPacket.proof[0]?.evidence ??
    followThrough.preCallEvidence[0]?.reason ??
    partnershipRole.proof.evidence;
  const decisionQuestion =
    followThrough.decisionQuestions[0] ??
    applicationPacket.interviewFocus[0] ??
    retentionRole.nextRetentionQuestion;
  const handoffNote =
    partnershipRole.operatingAgreement || retentionRole.managerSupport || growthRole.teamLeverage;
  const followUpOwner =
    partnershipRole.managerTouchpoint || retentionRole.reviewCadence || growthRole.operatingRhythm;

  return {
    id: packet.id,
    label: packet.label,
    briefingSignal: prefixedProofCopy(copy.signalPrefix, partnershipRole.partnershipSignal),
    stakeholderContext: prefixedProofCopy(copy.stakeholderPrefix, packet.fitThesis),
    openingContext: prefixedProofCopy(copy.openingPrefix, openingContext),
    evidenceToInspect: prefixedProofCopy(copy.evidencePrefix, evidenceToInspect),
    decisionQuestion: prefixedProofCopy(copy.questionPrefix, decisionQuestion),
    riskToResolve: prefixedProofCopy(copy.riskPrefix, retentionRole.durabilityRisk),
    handoffNote: prefixedProofCopy(copy.handoffPrefix, handoffNote),
    followUpOwner: prefixedProofCopy(copy.ownerPrefix, followUpOwner),
    nextBriefingAction: prefixedProofCopy(
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
    contactRoute: `/contact?role=${packet.id}&intent=briefing`,
  };
}

function buildBriefingArtifacts(
  locale: ProofLocale,
  roles: HiringBriefingRoomRole[]
): HiringBriefingRoomArtifact[] {
  const fallbackHref = roles[0]?.proof.href;

  if (!fallbackHref) {
    throw new Error(`Missing hiring briefing artifacts for ${locale}`);
  }

  return briefingCopy[locale].artifacts.map((artifact, index) => ({
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

export function getHiringBriefingRoom(locale: ProofLocale): HiringBriefingRoomPack {
  const copy = briefingCopy[locale];
  const partnershipRoles = getHiringPartnershipOperatingPack(locale).roles;
  const retentionRoles = getHiringRetentionReadiness(locale).roles;
  const growthRoles = getHiringGrowthRoadmap(locale).roles;
  const rolePackets = getRolePackets(locale);
  const roles = rolePackets.map((packet) =>
    buildBriefingRole(
      packet,
      locale,
      partnershipRoles,
      retentionRoles,
      growthRoles
    )
  );

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    stakeholders: copy.stakeholders.map((stakeholder) => ({ ...stakeholder })),
    roles,
    artifacts: buildBriefingArtifacts(locale, roles),
    hireRoute: "/hire",
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
