import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringBriefingRoom } from "./hiring-briefing";
import { prefixedProofCopy, stripInheritedProofLabels } from "./label-utils";
import { getRolePackets } from "./role-packets";
import type {
  HiringBriefingRoomRole,
  HiringReadinessGateArtifact,
  HiringReadinessGatePack,
  HiringReadinessGateRole,
  HiringReadinessGateSharedRoute,
  HiringReadinessScore,
  HiringRoleId,
  ProofLocale,
  RolePacket,
} from "./types";

const readinessCopy = {
  en: {
    hero: {
      eyebrow: "Stage 38 hiring readiness",
      headline: "Hiring Readiness Gate for decision-ready role lanes.",
      subhead:
        "A readiness gate that turns stakeholder briefings into contact, interview, offer, onboarding, or proof-review decisions for each hiring role.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring briefing", href: "/hire/briefing" },
    },
    summary: [
      {
        id: "readiness-routes",
        label: "Readiness routes",
        value: "17",
        detail:
          "The gate keeps readiness, briefing, command, and every shared hiring proof route in one decision path.",
      },
      {
        id: "role-lanes",
        label: "Role lanes",
        value: "4",
        detail:
          "Each role lane names what is proven, what needs validation, who owns the next step, and which route to open.",
      },
      {
        id: "decision-states",
        label: "Decision states",
        value: "3",
        detail:
          "Ready, Validate, and Monitor states make it clear whether the next action is contact, interview, or proof review.",
      },
      {
        id: "release-proof",
        label: "Release proof",
        value: "Tracked",
        detail:
          "Readiness lanes join proof maintenance, validation, handoff export, release bundle, and browser route sweeps.",
      },
    ],
    gates: [
      {
        id: "proof-ready",
        label: "Gate 01",
        title: "Proof ready",
        signal: "The role lane has a named proof anchor and a clear boundary.",
        passCondition: "A stakeholder can inspect the anchor without needing context from another page.",
        failureMode: "The reader sees claims but cannot tell which evidence should settle them.",
        nextRoute: "Open proof review or the role packet.",
        route: "/hire/review",
        actionLabel: "Open proof review",
      },
      {
        id: "conversation-ready",
        label: "Gate 02",
        title: "Conversation ready",
        signal: "The role lane has a question, owner, and contact intent.",
        passCondition: "Recruiter or manager can start the next conversation with one role-specific note.",
        failureMode: "The next step is a generic contact request instead of a role-shaped decision.",
        nextRoute: "Open briefing or contact Lewis.",
        route: "/hire/briefing",
        actionLabel: "Open briefing",
      },
      {
        id: "decision-ready",
        label: "Gate 03",
        title: "Decision ready",
        signal: "The remaining risk is explicit and tied to a decision route.",
        passCondition: "A manager can choose close, validate, or redirect without rereading every surface.",
        failureMode: "The lane feels positive but the decision risk is still unnamed.",
        nextRoute: "Open decision pack.",
        route: "/hire/decision",
        actionLabel: "Open decision pack",
      },
      {
        id: "handoff-ready",
        label: "Gate 04",
        title: "Handoff ready",
        signal: "The first operating expectation and owner are already named.",
        passCondition: "The team can carry the same proof signal into onboarding and partnership.",
        failureMode: "The hire looks strong but the first-week expectation is still vague.",
        nextRoute: "Open onboarding or partnership operating.",
        route: "/hire/onboarding",
        actionLabel: "Open onboarding plan",
      },
    ],
    artifacts: [
      {
        id: "readiness-score-note",
        label: "Artifact 01",
        title: "Readiness score note",
        body:
          "A quick summary of whether the role lane is ready now, needs validation, or should be monitored.",
        route: "/hire/readiness",
        actionLabel: "Open readiness gate",
        proofLabel: "Readiness proof",
      },
      {
        id: "recruiter-contact-note",
        label: "Artifact 02",
        title: "Recruiter contact note",
        body:
          "A recruiter-facing note that turns role proof into a contact reason and first screening path.",
        route: "/hire/briefing",
        actionLabel: "Open recruiter brief",
        proofLabel: "Contact proof",
      },
      {
        id: "manager-decision-note",
        label: "Artifact 03",
        title: "Manager decision note",
        body:
          "A manager-facing note that names the decision gate, validation gap, and next route.",
        route: "/hire/decision",
        actionLabel: "Open decision note",
        proofLabel: "Decision proof",
      },
      {
        id: "onboarding-readiness-note",
        label: "Artifact 04",
        title: "Onboarding readiness note",
        body:
          "A handoff note for turning readiness into first-week expectations and partnership cadence.",
        route: "/hire/onboarding",
        actionLabel: "Open onboarding note",
        proofLabel: "Handoff proof",
      },
    ],
    signalPrefix: "Readiness signal",
    evidencePrefix: "Proven evidence",
    gapPrefix: "Validation gap",
    ownerPrefix: "Stakeholder owner",
    gatePrefix: "Decision gate",
    recruiterPrefix: "Recruiter note",
    interviewPrefix: "Interview note",
    onboardingPrefix: "Onboarding note",
    actionPrefix: "Next readiness action",
    close: {
      title: "Use the readiness gate when the hiring reader needs a go/no-go path.",
      body:
        "Choose the role lane, inspect the readiness state, and open the recommended route before starting the next hiring conversation.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring briefing", href: "/hire/briefing" },
    },
  },
  zh: {
    hero: {
      eyebrow: "第 38 阶段 · 招聘准备度",
      headline: "把岗位路径转成可推进、需验证或继续观察的判断。",
      subhead:
        "一个准备度检查页，把读者简报转成每个招聘方向的联系、面试、Offer、入职或证据评审判断。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "招聘简报", href: "/hire/briefing" },
    },
    summary: [
      {
        id: "readiness-routes",
        label: "准备度路径",
        value: "17",
        detail:
          "这个检查页把准备度、简报、控制台和所有共享招聘证据路径放进同一条决策路径。",
      },
      {
        id: "role-lanes",
        label: "岗位路径",
        value: "4",
        detail:
          "每条岗位路径都说明已证明什么、还要验证什么、谁负责下一步，以及应该打开哪条路径。",
      },
      {
        id: "decision-states",
        label: "决策状态",
        value: "3",
        detail:
          "可推进、需验证和继续观察三种状态说明下一步应该是联系、面试还是证据评审。",
      },
      {
        id: "release-proof",
        label: "发布证据",
        value: "已追踪",
        detail:
          "准备度路径会进入证据维护、验证、交接导出、发布包和浏览器路径巡检。",
      },
    ],
    gates: [
      {
        id: "proof-ready",
        label: "门槛 01",
        title: "证据就绪",
        signal: "岗位路径有明确证据锚点和清晰边界。",
        passCondition: "读者不需要跳到其他页面补上下文，也能检查锚点。",
        failureMode: "读者看到了主张，但不知道哪条证据可以支撑它们。",
        nextRoute: "打开证据评审或岗位材料包。",
        route: "/hire/review",
        actionLabel: "打开证据评审",
      },
      {
        id: "conversation-ready",
        label: "门槛 02",
        title: "沟通就绪",
        signal: "岗位路径有问题、负责人和联系意图。",
        passCondition: "招聘方或经理可以用一条岗位定制记录开始下一次对话。",
        failureMode: "下一步只是泛泛联系请求，而不是岗位形态明确的判断。",
        nextRoute: "打开招聘简报或联系 Lewis。",
        route: "/hire/briefing",
        actionLabel: "打开招聘简报",
      },
      {
        id: "decision-ready",
        label: "门槛 03",
        title: "决策就绪",
        signal: "剩余风险已经明确，并且连接到决策路径。",
        passCondition: "经理不必重读所有页面，也能选择收尾、继续验证或调整方向。",
        failureMode: "路径看起来很强，但决策风险还没有被命名。",
        nextRoute: "打开决策包。",
        route: "/hire/decision",
        actionLabel: "打开决策包",
      },
      {
        id: "handoff-ready",
        label: "门槛 04",
        title: "交接就绪",
        signal: "第一条运行预期和负责人已经命名。",
        passCondition: "团队可以把同一个证据信号带进入职和协作。",
        failureMode: "候选人看起来很强，但第一周预期仍然模糊。",
        nextRoute: "打开入职计划或协作运行包。",
        route: "/hire/onboarding",
        actionLabel: "打开入职计划",
      },
    ],
    artifacts: [
      {
        id: "readiness-score-note",
        label: "材料 01",
        title: "准备度评分记录",
        body:
          "快速说明这条岗位路径现在可推进、需要验证，还是应该继续观察。",
        route: "/hire/readiness",
        actionLabel: "打开准备度检查",
        proofLabel: "准备度证据",
      },
      {
        id: "recruiter-contact-note",
        label: "材料 02",
        title: "招聘方联系记录",
        body:
          "面向招聘方的记录，把岗位证据转成联系理由和第一轮筛选路径。",
        route: "/hire/briefing",
        actionLabel: "打开招聘方简报",
        proofLabel: "联系证据",
      },
      {
        id: "manager-decision-note",
        label: "材料 03",
        title: "经理决策记录",
        body:
          "面向经理的记录，命名决策门、验证缺口和下一条路径。",
        route: "/hire/decision",
        actionLabel: "打开决策记录",
        proofLabel: "决策证据",
      },
      {
        id: "onboarding-readiness-note",
        label: "材料 04",
        title: "入职准备记录",
        body:
          "一条交接记录，把准备度转成第一周预期和协作节奏。",
        route: "/hire/onboarding",
        actionLabel: "打开入职记录",
        proofLabel: "交接证据",
      },
    ],
    signalPrefix: "准备度信号",
    evidencePrefix: "已证明证据",
    gapPrefix: "验证缺口",
    ownerPrefix: "负责读者",
    gatePrefix: "决策门",
    recruiterPrefix: "招聘方记录",
    interviewPrefix: "面试记录",
    onboardingPrefix: "入职记录",
    actionPrefix: "下一步准备度行动",
    close: {
      title: "当招聘读者需要推进或不推进路径时，使用准备度检查。",
      body:
        "选择岗位路径，检查准备度状态，并在开始下一次招聘对话前打开推荐路径。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "招聘简报", href: "/hire/briefing" },
    },
  },
} as const;

const readinessScores: Record<HiringRoleId, HiringReadinessScore> = {
  "ux-product": "Ready",
  "ux-research": "Validate",
  "ai-ux": "Monitor",
  accessibility: "Ready",
};

const recommendedRoutes: Record<HiringRoleId, HiringReadinessGateSharedRoute> = {
  "ux-product": "/hire/decision",
  "ux-research": "/hire/interview",
  "ai-ux": "/hire/review",
  accessibility: "/hire/onboarding",
};

const recommendedRouteLabels: Record<
  ProofLocale,
  Partial<Record<HiringReadinessGateSharedRoute, string>>
> = {
  en: {
    "/hire/decision": "decision pack",
    "/hire/interview": "interview agenda",
    "/hire/review": "proof review",
    "/hire/onboarding": "onboarding plan",
  },
  zh: {
    "/hire/decision": "决策包",
    "/hire/interview": "面试议程",
    "/hire/review": "证据评审",
    "/hire/onboarding": "入职计划",
  },
};

function prefixed(prefix: string, value: string): string {
  return prefixedProofCopy(prefix, value);
}

function routeLabel(route: HiringReadinessGateSharedRoute, locale: ProofLocale): string {
  return recommendedRouteLabels[locale][route] ?? (locale === "zh" ? "下一条招聘路径" : "next hiring route");
}

function readinessSignal(
  score: HiringReadinessScore,
  route: HiringReadinessGateSharedRoute,
  decisionQuestion: string,
  locale: ProofLocale
): string {
  const label = routeLabel(route, locale);

  if (locale === "zh") {
    if (score === "Ready") {
      return `这条路径可以进入${label}，证据锚点和验证缺口都已经清楚。`;
    }

    if (score === "Validate") {
      return `先用面试验证这个问题，再进入${label}: ${decisionQuestion}`;
    }

    return `先留在证据评审，直到这个问题有更清楚的答案: ${decisionQuestion}`;
  }

  if (score === "Ready") {
    return `Ready to open the ${label} with a named proof anchor and explicit validation gap.`;
  }

  if (score === "Validate") {
    return `Validate the remaining question before opening the ${label}: ${decisionQuestion}`;
  }

  return `Monitor proof fit in the ${label} before advancing the conversation: ${decisionQuestion}`;
}

function stakeholderOwner(
  route: HiringReadinessGateSharedRoute,
  locale: ProofLocale
): string {
  const label = routeLabel(route, locale);

  if (locale === "zh") {
    return `招聘方先检查证据锚点，招聘经理负责${label}判断。`;
  }

  return `Recruiter screens the proof anchor; hiring manager owns the ${label} decision.`;
}

function onboardingReadinessNote(
  route: HiringReadinessGateSharedRoute,
  score: HiringReadinessScore,
  locale: ProofLocale
): string {
  const label = routeLabel(route, locale);

  if (locale === "zh") {
    const state = score === "Ready" ? "可推进" : score === "Validate" ? "需验证" : "继续观察";
    return `把${state}状态带进${label}，并在第一周计划里写清验证边界。`;
  }

  return `Carry the ${score} state into the ${label} and name the validation boundary in the first-week plan.`;
}

function buildReadinessRole(
  packet: RolePacket,
  locale: ProofLocale,
  briefingRoles: HiringBriefingRoomRole[]
): HiringReadinessGateRole {
  const role = packet.id;
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);
  const briefingRole = briefingRoles.find((candidate) => candidate.id === role);

  if (!applicationPacket || !followThrough || !briefingRole) {
    throw new Error(`Missing hiring readiness gate data for ${role}`);
  }

  const copy = readinessCopy[locale];
  const proofItem = applicationPacket.proof[0];
  const provenEvidence = proofItem?.evidence ?? briefingRole.proof.evidence;
  const validationGap =
    applicationPacket.boundaries[0] ??
    followThrough.boundaries[0] ??
    briefingRole.riskToResolve;
  const interviewNote =
    followThrough.decisionQuestions[0] ??
    applicationPacket.interviewFocus[0] ??
    briefingRole.decisionQuestion;
  const decisionQuestion = stripInheritedProofLabels(briefingRole.decisionQuestion);
  const recommendedRoute = recommendedRoutes[role];
  const score = readinessScores[role];

  return {
    id: packet.id,
    label: packet.label,
    readinessSignal: `${copy.signalPrefix}: ${readinessSignal(
      score,
      recommendedRoute,
      decisionQuestion,
      locale
    )}`,
    readinessScore: score,
    provenEvidence: prefixed(copy.evidencePrefix, provenEvidence),
    validationGap: prefixed(copy.gapPrefix, validationGap),
    stakeholderOwner: `${copy.ownerPrefix}: ${stakeholderOwner(recommendedRoute, locale)}`,
    decisionGate: prefixed(copy.gatePrefix, decisionQuestion),
    recommendedRoute,
    recruiterNote: prefixed(copy.recruiterPrefix, briefingRole.stakeholderContext),
    interviewNote: prefixed(copy.interviewPrefix, interviewNote),
    onboardingNote: `${copy.onboardingPrefix}: ${onboardingReadinessNote(
      recommendedRoute,
      score,
      locale
    )}`,
    nextReadinessAction:
      locale === "zh"
        ? `${copy.actionPrefix}: 打开${routeLabel(recommendedRoute, locale)}并解决: ${decisionQuestion}`
        : `${copy.actionPrefix}: Open the ${routeLabel(
            recommendedRoute,
            locale
          )} and resolve: ${decisionQuestion}`,
    proof: {
      claim: briefingRole.proof.claim,
      evidence: briefingRole.proof.evidence,
      boundary: briefingRole.proof.boundary,
      href: briefingRole.proof.href,
    },
    roleRoute: packet.route,
    packetRoute: applicationPacket.route,
    followThroughRoute: followThrough.route,
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
    contactRoute: `/contact?role=${packet.id}&intent=readiness`,
  };
}

function buildReadinessArtifacts(
  locale: ProofLocale,
  roles: HiringReadinessGateRole[]
): HiringReadinessGateArtifact[] {
  const fallbackHref = roles[0]?.proof.href;

  if (!fallbackHref) {
    throw new Error(`Missing hiring readiness artifacts for ${locale}`);
  }

  return readinessCopy[locale].artifacts.map((artifact, index) => ({
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

export function getHiringReadinessGate(locale: ProofLocale): HiringReadinessGatePack {
  const copy = readinessCopy[locale];
  const briefingRoles = getHiringBriefingRoom(locale).roles;
  const rolePackets = getRolePackets(locale);
  const roles = rolePackets.map((packet) => buildReadinessRole(packet, locale, briefingRoles));

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    gates: copy.gates.map((gate) => ({ ...gate })),
    roles,
    artifacts: buildReadinessArtifacts(locale, roles),
    hireRoute: "/hire",
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
