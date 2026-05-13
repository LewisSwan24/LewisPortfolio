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
      eyebrow: "Stage 38 hiring readiness",
      headline: "面向 decision-ready role lanes 的 Hiring Readiness Gate。",
      subhead:
        "一个 readiness gate，把 stakeholder briefings 转成每个招聘方向的 contact、interview、offer、onboarding 或 proof-review decision。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring briefing", href: "/hire/briefing" },
    },
    summary: [
      {
        id: "readiness-routes",
        label: "Readiness routes",
        value: "17",
        detail:
          "这个 gate 把 readiness、briefing、command 和所有 shared hiring proof route 放进同一条 decision path。",
      },
      {
        id: "role-lanes",
        label: "Role lanes",
        value: "4",
        detail:
          "每条 role lane 都说明已证明什么、还要验证什么、谁负责下一步，以及应该打开哪条 route。",
      },
      {
        id: "decision-states",
        label: "Decision states",
        value: "3",
        detail:
          "Ready、Validate 和 Monitor 三种状态说明下一步应该是 contact、interview 还是 proof review。",
      },
      {
        id: "release-proof",
        label: "Release proof",
        value: "Tracked",
        detail:
          "Readiness lanes 会进入 proof maintenance、validation、handoff export、release bundle 和 browser route sweep。",
      },
    ],
    gates: [
      {
        id: "proof-ready",
        label: "Gate 01",
        title: "Proof ready",
        signal: "Role lane 有明确 proof anchor 和清晰 boundary。",
        passCondition: "Stakeholder 不需要跳到其他页面补上下文，也能检查 anchor。",
        failureMode: "Reader 看到了 claims，但不知道哪条 evidence 可以 settle 它们。",
        nextRoute: "Open proof review or the role packet.",
        route: "/hire/review",
        actionLabel: "Open proof review",
      },
      {
        id: "conversation-ready",
        label: "Gate 02",
        title: "Conversation ready",
        signal: "Role lane 有 question、owner 和 contact intent。",
        passCondition: "Recruiter 或 manager 可以用一条 role-specific note 开始下一次对话。",
        failureMode: "Next step 只是 generic contact request，而不是 role-shaped decision。",
        nextRoute: "Open briefing or contact Lewis.",
        route: "/hire/briefing",
        actionLabel: "Open briefing",
      },
      {
        id: "decision-ready",
        label: "Gate 03",
        title: "Decision ready",
        signal: "Remaining risk 已经明确，并且连接到 decision route。",
        passCondition: "Manager 不必重读所有 surface，也能选择 close、validate 或 redirect。",
        failureMode: "Lane 看起来很强，但 decision risk 还没有被命名。",
        nextRoute: "Open decision pack.",
        route: "/hire/decision",
        actionLabel: "Open decision pack",
      },
      {
        id: "handoff-ready",
        label: "Gate 04",
        title: "Handoff ready",
        signal: "First operating expectation 和 owner 已经命名。",
        passCondition: "Team 可以把同一个 proof signal 带进 onboarding 和 partnership。",
        failureMode: "Hire 看起来 strong，但 first-week expectation 仍然模糊。",
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
          "快速说明这条 role lane 是 ready now、needs validation，还是 should be monitored。",
        route: "/hire/readiness",
        actionLabel: "Open readiness gate",
        proofLabel: "Readiness proof",
      },
      {
        id: "recruiter-contact-note",
        label: "Artifact 02",
        title: "Recruiter contact note",
        body:
          "Recruiter-facing note，把 role proof 转成 contact reason 和 first screening path。",
        route: "/hire/briefing",
        actionLabel: "Open recruiter brief",
        proofLabel: "Contact proof",
      },
      {
        id: "manager-decision-note",
        label: "Artifact 03",
        title: "Manager decision note",
        body:
          "Manager-facing note，命名 decision gate、validation gap 和 next route。",
        route: "/hire/decision",
        actionLabel: "Open decision note",
        proofLabel: "Decision proof",
      },
      {
        id: "onboarding-readiness-note",
        label: "Artifact 04",
        title: "Onboarding readiness note",
        body:
          "Handoff note，把 readiness 转成 first-week expectations 和 partnership cadence。",
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
      title: "当 hiring reader 需要 go/no-go path 时，使用 readiness gate。",
      body:
        "选择 role lane，检查 readiness state，并在开始下一次 hiring conversation 前打开 recommended route。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring briefing", href: "/hire/briefing" },
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

const recommendedRouteLabels: Partial<Record<HiringReadinessGateSharedRoute, string>> = {
  "/hire/decision": "decision pack",
  "/hire/interview": "interview agenda",
  "/hire/review": "proof review",
  "/hire/onboarding": "onboarding plan",
};

function prefixed(prefix: string, value: string): string {
  return prefixedProofCopy(prefix, value);
}

function routeLabel(route: HiringReadinessGateSharedRoute): string {
  return recommendedRouteLabels[route] ?? "next hiring route";
}

function readinessSignal(
  score: HiringReadinessScore,
  route: HiringReadinessGateSharedRoute,
  decisionQuestion: string,
  locale: ProofLocale
): string {
  const label = routeLabel(route);

  if (locale === "zh") {
    if (score === "Ready") {
      return `这条 lane 可以进入 ${label}，proof anchor 和 validation gap 都已经清楚。`;
    }

    if (score === "Validate") {
      return `先用 interview 验证这个 question，再进入 ${label}: ${decisionQuestion}`;
    }

    return `先留在 proof review，直到这个 question 有更清楚的 answer: ${decisionQuestion}`;
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
  const label = routeLabel(route);

  if (locale === "zh") {
    return `Recruiter 先检查 proof anchor，hiring manager 负责 ${label} decision。`;
  }

  return `Recruiter screens the proof anchor; hiring manager owns the ${label} decision.`;
}

function onboardingReadinessNote(
  route: HiringReadinessGateSharedRoute,
  score: HiringReadinessScore,
  locale: ProofLocale
): string {
  const label = routeLabel(route);

  if (locale === "zh") {
    return `把 ${score} state 带进 ${label}，并在 first-week plan 里写清 validation boundary。`;
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
    nextReadinessAction: `${copy.actionPrefix}: Open the ${routeLabel(
      recommendedRoute
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
