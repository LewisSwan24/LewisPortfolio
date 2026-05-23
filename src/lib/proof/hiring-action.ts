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
      eyebrow: "Stage 39 hiring action",
      headline: "面向 proof-backed next steps 的 Hiring Action Board。",
      subhead:
        "一个 action board，把 readiness score 转成 recruiter、manager、interview、onboarding 和 proof-review 的下一步动作。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring readiness", href: "/hire/readiness" },
    },
    summary: [
      {
        id: "action-routes",
        label: "Action routes",
        value: "18",
        detail:
          "这个 board 把 action、readiness、briefing、command 和所有 shared hiring proof route 放进同一条 workflow。",
      },
      {
        id: "role-actions",
        label: "Role actions",
        value: "4",
        detail:
          "每条 role lane 都命名 owner、first action、proof anchor、route、fallback 和 success signal。",
      },
      {
        id: "action-owners",
        label: "Owner types",
        value: "5",
        detail:
          "Recruiter、hiring manager、interview panel、onboarding partner 和 proof reviewer 都有具体 next move。",
      },
      {
        id: "release-proof",
        label: "Release proof",
        value: "Tracked",
        detail:
          "Action lanes 会进入 proof maintenance、validation、handoff export、release bundle 和 browser route sweep。",
      },
    ],
    sequence: [
      {
        id: "recruiter-outreach",
        label: "Action 01",
        title: "Recruiter outreach",
        owner: "Recruiter",
        action: "打开 role lane，检查 proof anchor，并带着 role context 联系 Lewis。",
        proofFocus: "Role-specific proof claim、evidence 和 boundary。",
        successSignal: "第一条 message 明确 role、proof anchor 和要解决的问题。",
        route: "/hire/action",
        actionLabel: "Open action board",
      },
      {
        id: "manager-validation",
        label: "Action 02",
        title: "Manager validation",
        owner: "Hiring manager",
        action: "打开 recommended route，判断 validation gap 是否可以接受。",
        proofFocus: "Readiness score、decision gate 和 route to open。",
        successSignal: "Manager 不必重读所有 surface，也能说 ready、validate 或 monitor。",
        route: "/hire/readiness",
        actionLabel: "Open readiness gate",
      },
      {
        id: "panel-prompt",
        label: "Action 03",
        title: "Interview panel prompt",
        owner: "Interview panel",
        action: "用 role question 形成第一轮 interview prompt 和 evidence follow-up。",
        proofFocus: "Interview note、proof boundary 和 follow-through route。",
        successSignal: "Interview 测试真实不确定性，而不是重复讲项目。",
        route: "/hire/interview",
        actionLabel: "Open interview agenda",
      },
      {
        id: "onboarding-handoff",
        label: "Action 04",
        title: "Onboarding handoff",
        owner: "Onboarding partner",
        action: "把 readiness score 转成 first-week expectation 和 support boundary。",
        proofFocus: "Onboarding note、partnership route 和 first-week action。",
        successSignal: "First project 有明确 support owner 和 proof-linked expectation。",
        route: "/hire/onboarding",
        actionLabel: "Open onboarding plan",
      },
      {
        id: "proof-review-fallback",
        label: "Action 05",
        title: "Proof review fallback",
        owner: "Proof reviewer",
        action: "如果 lane 被卡住，先打开 proof review，检查 anchor，再推进。",
        proofFocus: "Anchor freshness、boundary clarity 和 fallback route。",
        successSignal: "Blocked lane 只有一个 proof issue 要解决，而不是 vague concern。",
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
          "一条简短 contact note，命名 role context、proof anchor 和 first question。",
        route: "/hire/action",
        actionLabel: "Open outreach note",
        proofLabel: "Outreach proof",
      },
      {
        id: "manager-action-note",
        label: "Artifact 02",
        title: "Manager action note",
        body:
          "面向 manager 的 note，把 readiness state 转成 route、validation gap 和 decision。",
        route: "/hire/readiness",
        actionLabel: "Open manager note",
        proofLabel: "Manager proof",
      },
      {
        id: "panel-prompt-note",
        label: "Artifact 03",
        title: "Panel prompt note",
        body:
          "面向 panel 的 note，把 proof boundary 转成 focused interview prompt。",
        route: "/hire/interview",
        actionLabel: "Open panel route",
        proofLabel: "Panel proof",
      },
      {
        id: "handoff-note",
        label: "Artifact 04",
        title: "Onboarding action note",
        body:
          "一条 handoff note，把 readiness score 连接到 first-week expectation 和 support owner。",
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
      title: "当 readiness 需要一个具体 next move 时，使用 action board。",
      body:
        "选择 role lane，确认 owner，打开 route；如果 proof question 仍然 blocked，就使用 fallback。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring readiness", href: "/hire/readiness" },
    },
  },
} as const;

const routeLabels: Record<HiringActionBoardSharedRoute, string> = {
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
};

function actionState(score: HiringReadinessScore, route: HiringActionBoardSharedRoute): string {
  if (score === "Ready") {
    return `Ready to open the ${routeLabels[route]} with a proof-backed owner and first action.`;
  }

  if (score === "Validate") {
    return `Validate the remaining question in the ${routeLabels[route]} before advancing.`;
  }

  return `Monitor the lane in the ${routeLabels[route]} until the proof boundary is clearer.`;
}

function ownerFor(score: HiringReadinessScore): string {
  if (score === "Ready") return "Recruiter plus hiring manager";
  if (score === "Validate") return "Hiring manager plus interview panel";
  return "Proof reviewer plus hiring manager";
}

function firstAction(role: HiringReadinessGateRole): string {
  if (role.readinessScore === "Ready") {
    return `Open the ${routeLabels[role.recommendedRoute]} and contact Lewis with the role context.`;
  }

  if (role.readinessScore === "Validate") {
    return `Open the ${routeLabels[role.recommendedRoute]} and test the decision gate before outreach.`;
  }

  return `Open the ${routeLabels[role.recommendedRoute]} and inspect the proof boundary before moving forward.`;
}

function buildActionRole(role: HiringReadinessGateRole): HiringActionBoardRole {
  const routeToOpen = role.recommendedRoute;

  return {
    id: role.id,
    label: role.label,
    readinessScore: role.readinessScore,
    actionState: actionState(role.readinessScore, routeToOpen),
    actionOwner: ownerFor(role.readinessScore),
    firstAction: firstAction(role),
    proofToOpen: `${role.proof.claim} ${role.proof.evidence}`,
    routeToOpen,
    recruiterAction: `Use the proof anchor to write a role-specific outreach note for ${role.label}.`,
    managerAction: `Use the decision gate to choose ${role.readinessScore}, validation, or fallback for ${role.label}.`,
    panelAction: `Use the interview note to test the real uncertainty for ${role.label}.`,
    onboardingAction: `Use the onboarding note to name first-week support for ${role.label}.`,
    fallbackAction: `If blocked, open proof review and inspect the boundary before contacting Lewis.`,
    successSignal: `The next message names ${role.label}, the proof anchor, the owner, and the route to open.`,
    blockingRisk: role.validationGap,
    nextAction: `Open the ${routeLabels[routeToOpen]} and resolve the decision gate.`,
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
  const roles = readiness.roles.map(buildActionRole);

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
