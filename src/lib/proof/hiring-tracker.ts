import { getHiringActionBoard } from "./hiring-action";
import type {
  HiringActionBoardRole,
  HiringFollowUpTrackerArtifact,
  HiringFollowUpTrackerPack,
  HiringFollowUpTrackerRole,
  HiringFollowUpTrackerSharedRoute,
  HiringFollowUpTrackerStatus,
  ProofLocale,
} from "./types";

const trackerCopy = {
  en: {
    hero: {
      eyebrow: "Stage 40 hiring tracker",
      headline: "Hiring Follow-up Tracker for proof-backed momentum.",
      subhead:
        "A follow-up tracker that turns action-board lanes into owner, due window, status, evidence dependency, escalation, and closeout signals.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring action", href: "/hire/action" },
    },
    summary: [
      {
        id: "tracked-lanes",
        label: "Tracked lanes",
        value: "4",
        detail:
          "Each hiring role gets a follow-up owner, status, due window, proof dependency, escalation path, and closeout signal.",
      },
      {
        id: "tracker-statuses",
        label: "Tracker statuses",
        value: "3",
        detail:
          "Ready, Waiting, and Blocked states translate action-board readiness into a practical follow-up queue.",
      },
      {
        id: "follow-up-routes",
        label: "Follow-up routes",
        value: "19",
        detail:
          "The tracker links action, readiness, briefing, command, long-term hiring surfaces, role packets, and proof review.",
      },
      {
        id: "release-proof",
        label: "Release proof",
        value: "Tracked",
        detail:
          "Tracker lanes are counted by validation, proof maintenance, handoff export, release bundle, and browser route sweeps.",
      },
    ],
    stages: [
      {
        id: "capture-owner",
        label: "Track 01",
        title: "Capture the owner",
        owner: "Recruiter",
        followUpAction: "Assign the lane to a named follow-up owner after the action board is opened.",
        trackingSignal: "The lane has one person responsible for the next message.",
        closeoutRule: "Close only when the owner has opened the proof anchor and route.",
        route: "/hire/action",
        actionLabel: "Open action board",
      },
      {
        id: "check-dependency",
        label: "Track 02",
        title: "Check evidence dependency",
        owner: "Hiring manager",
        followUpAction: "Confirm which proof anchor, decision gate, or validation gap controls the next step.",
        trackingSignal: "The lane names the exact evidence dependency instead of a generic concern.",
        closeoutRule: "Close when the dependency is accepted, resolved, or escalated to proof review.",
        route: "/hire/readiness",
        actionLabel: "Open readiness gate",
      },
      {
        id: "schedule-response",
        label: "Track 03",
        title: "Schedule the response",
        owner: "Recruiter plus panel",
        followUpAction: "Set the response window and send the role-specific prompt or follow-up.",
        trackingSignal: "The due window is visible and tied to one route.",
        closeoutRule: "Close when the response has a role, proof anchor, and next question.",
        route: "/hire/interview",
        actionLabel: "Open interview agenda",
      },
      {
        id: "escalate-blocker",
        label: "Track 04",
        title: "Escalate the blocker",
        owner: "Proof reviewer",
        followUpAction: "If the lane is blocked, open proof review and inspect the boundary before another message.",
        trackingSignal: "The escalation path is proof-specific and names what must change.",
        closeoutRule: "Close when the blocker has one documented resolution path.",
        route: "/hire/review",
        actionLabel: "Open proof review",
      },
      {
        id: "close-loop",
        label: "Track 05",
        title: "Close the loop",
        owner: "Hiring manager",
        followUpAction: "Record the closeout signal and move the lane to onboarding, decision, or archive.",
        trackingSignal: "The lane has a clear owner, outcome, and next hiring route.",
        closeoutRule: "Close when the lane no longer needs another unowned follow-up.",
        route: "/hire/tracker",
        actionLabel: "Open tracker",
      },
    ],
    artifacts: [
      {
        id: "owner-note",
        label: "Artifact 01",
        title: "Owner note",
        body:
          "A short note naming the follow-up owner, route to review, proof dependency, and due window.",
        route: "/hire/tracker",
        actionLabel: "Open owner note",
        proofLabel: "Owner proof",
      },
      {
        id: "dependency-note",
        label: "Artifact 02",
        title: "Evidence dependency note",
        body:
          "A manager note that explains which proof anchor or validation gap controls the next follow-up.",
        route: "/hire/readiness",
        actionLabel: "Open readiness",
        proofLabel: "Dependency proof",
      },
      {
        id: "escalation-note",
        label: "Artifact 03",
        title: "Escalation note",
        body:
          "A proof-review note that converts a blocked lane into one boundary question and resolution path.",
        route: "/hire/review",
        actionLabel: "Open escalation note",
        proofLabel: "Escalation proof",
      },
      {
        id: "closeout-note",
        label: "Artifact 04",
        title: "Closeout note",
        body:
          "A final note that records the closeout signal and the next route for decision, onboarding, or archive.",
        route: "/hire/action",
        actionLabel: "Open action",
        proofLabel: "Closeout proof",
      },
    ],
    close: {
      title: "Use the tracker when an action lane needs ownership and a visible closeout rule.",
      body:
        "Open the lane, confirm the owner and due window, inspect the proof dependency, and close only when the route or blocker is explicit.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring action", href: "/hire/action" },
    },
  },
  zh: {
    hero: {
      eyebrow: "Stage 40 hiring tracker",
      headline: "面向 proof-backed momentum 的 Hiring Follow-up Tracker。",
      subhead:
        "一个 follow-up tracker，把 action-board lane 转成 owner、due window、status、evidence dependency、escalation 和 closeout signal。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring action", href: "/hire/action" },
    },
    summary: [
      {
        id: "tracked-lanes",
        label: "Tracked lanes",
        value: "4",
        detail:
          "每个 hiring role 都有 follow-up owner、status、due window、proof dependency、escalation path 和 closeout signal。",
      },
      {
        id: "tracker-statuses",
        label: "Tracker statuses",
        value: "3",
        detail:
          "Ready、Waiting、Blocked 把 action-board readiness 转成实际 follow-up queue。",
      },
      {
        id: "follow-up-routes",
        label: "Follow-up routes",
        value: "19",
        detail:
          "Tracker 会链接 action、readiness、briefing、command、长期 hiring surfaces、role packets 和 proof review。",
      },
      {
        id: "release-proof",
        label: "Release proof",
        value: "Tracked",
        detail:
          "Tracker lanes 会进入 validation、proof maintenance、handoff export、release bundle 和 browser route sweep。",
      },
    ],
    stages: [
      {
        id: "capture-owner",
        label: "Track 01",
        title: "Capture the owner",
        owner: "Recruiter",
        followUpAction: "打开 action board 后，把 lane 分配给明确 follow-up owner。",
        trackingSignal: "这个 lane 有一个人负责下一条 message。",
        closeoutRule: "只有 owner 打开 proof anchor 和 route 后才能 close。",
        route: "/hire/action",
        actionLabel: "Open action board",
      },
      {
        id: "check-dependency",
        label: "Track 02",
        title: "Check evidence dependency",
        owner: "Hiring manager",
        followUpAction: "确认哪个 proof anchor、decision gate 或 validation gap 控制下一步。",
        trackingSignal: "Lane 命名具体 evidence dependency，而不是泛泛的担心。",
        closeoutRule: "Dependency 被接受、解决或升级到 proof review 后才能 close。",
        route: "/hire/readiness",
        actionLabel: "Open readiness gate",
      },
      {
        id: "schedule-response",
        label: "Track 03",
        title: "Schedule the response",
        owner: "Recruiter plus panel",
        followUpAction: "设置 response window，并发送 role-specific prompt 或 follow-up。",
        trackingSignal: "Due window 可见，并绑定到一个 route。",
        closeoutRule: "Response 带有 role、proof anchor 和 next question 后才能 close。",
        route: "/hire/interview",
        actionLabel: "Open interview agenda",
      },
      {
        id: "escalate-blocker",
        label: "Track 04",
        title: "Escalate the blocker",
        owner: "Proof reviewer",
        followUpAction: "如果 lane 被卡住，先打开 proof review，检查 boundary，再继续发 message。",
        trackingSignal: "Escalation path 指向具体 proof，并说明要改变什么。",
        closeoutRule: "Blocker 有一个 documented resolution path 后才能 close。",
        route: "/hire/review",
        actionLabel: "Open proof review",
      },
      {
        id: "close-loop",
        label: "Track 05",
        title: "Close the loop",
        owner: "Hiring manager",
        followUpAction: "记录 closeout signal，并把 lane 移到 onboarding、decision 或 archive。",
        trackingSignal: "Lane 有明确 owner、outcome 和 next hiring route。",
        closeoutRule: "Lane 不再需要另一个无人负责的 follow-up 后才能 close。",
        route: "/hire/tracker",
        actionLabel: "Open tracker",
      },
    ],
    artifacts: [
      {
        id: "owner-note",
        label: "Artifact 01",
        title: "Owner note",
        body:
          "一条短 note，命名 follow-up owner、route to review、proof dependency 和 due window。",
        route: "/hire/tracker",
        actionLabel: "Open owner note",
        proofLabel: "Owner proof",
      },
      {
        id: "dependency-note",
        label: "Artifact 02",
        title: "Evidence dependency note",
        body:
          "一条 manager note，说明哪个 proof anchor 或 validation gap 控制下一步 follow-up。",
        route: "/hire/readiness",
        actionLabel: "Open readiness",
        proofLabel: "Dependency proof",
      },
      {
        id: "escalation-note",
        label: "Artifact 03",
        title: "Escalation note",
        body:
          "一条 proof-review note，把 blocked lane 转成一个 boundary question 和 resolution path。",
        route: "/hire/review",
        actionLabel: "Open escalation note",
        proofLabel: "Escalation proof",
      },
      {
        id: "closeout-note",
        label: "Artifact 04",
        title: "Closeout note",
        body:
          "一条 final note，记录 closeout signal，以及 decision、onboarding 或 archive 的下一条 route。",
        route: "/hire/action",
        actionLabel: "Open action",
        proofLabel: "Closeout proof",
      },
    ],
    close: {
      title: "当 action lane 需要 ownership 和可见 closeout rule 时，使用 tracker。",
      body:
        "打开 lane，确认 owner 和 due window，检查 proof dependency；只有 route 或 blocker 明确后才 close。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring action", href: "/hire/action" },
    },
  },
} as const;

const routeLabels: Record<HiringFollowUpTrackerSharedRoute, string> = {
  "/hire/tracker": "follow-up tracker",
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

const inheritedLabelPattern =
  /^(?:Action state|Action owner|First action|Proof to open|Recruiter action|Manager action|Panel action|Onboarding action|Fallback action|Success signal|Blocking risk|Next action|Readiness signal|Briefing signal|Validation gap):\s*/i;

function stripInheritedLabel(value: string): string {
  return value.replace(inheritedLabelPattern, "");
}

function trackerStatus(role: HiringActionBoardRole): HiringFollowUpTrackerStatus {
  if (role.readinessScore === "Ready") return "Ready";
  if (role.readinessScore === "Validate") return "Waiting";
  return "Blocked";
}

function statusDetail(status: HiringFollowUpTrackerStatus, route: HiringFollowUpTrackerSharedRoute): string {
  if (status === "Ready") {
    return `Ready for follow-up after opening the ${routeLabels[route]}.`;
  }

  if (status === "Waiting") {
    return `Waiting on one proof dependency before the ${routeLabels[route]} can advance.`;
  }

  return `Blocked until proof review clarifies the dependency behind the ${routeLabels[route]}.`;
}

function dueWindow(status: HiringFollowUpTrackerStatus): string {
  if (status === "Ready") return "Next outreach window";
  if (status === "Waiting") return "After manager validation";
  return "After proof review";
}

function buildTrackerRole(role: HiringActionBoardRole): HiringFollowUpTrackerRole {
  const status = trackerStatus(role);
  const routeToReview = role.routeToOpen;

  return {
    id: role.id,
    label: role.label,
    trackerStatus: status,
    trackerStatusDetail: statusDetail(status, routeToReview),
    followUpOwner: role.actionOwner,
    dueWindow: dueWindow(status),
    evidenceDependency: stripInheritedLabel(role.blockingRisk),
    routeToReview,
    nextFollowUp: `Open the ${routeLabels[routeToReview]} and send the next ${role.label} follow-up with the proof anchor attached.`,
    escalationPath: `If ${role.label} remains ${status.toLowerCase()}, open proof review before sending another message.`,
    closeoutSignal: `Close when ${role.label} has an owner, proof anchor, route, and next hiring decision recorded.`,
    followUpRisk: stripInheritedLabel(role.fallbackAction),
    proof: {
      claim: role.proof.claim,
      evidence: role.proof.evidence,
      boundary: role.proof.boundary,
      href: role.proof.href,
    },
    roleRoute: role.roleRoute,
    packetRoute: role.packetRoute,
    followThroughRoute: role.followThroughRoute,
    trackerRoute: "/hire/tracker",
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
    contactRoute: `/contact?role=${role.id}&intent=tracker`,
  };
}

function buildTrackerArtifacts(
  locale: ProofLocale,
  roles: HiringFollowUpTrackerRole[]
): HiringFollowUpTrackerArtifact[] {
  const fallbackHref = roles[0]?.proof.href;

  if (!fallbackHref) {
    throw new Error(`Missing hiring tracker artifacts for ${locale}`);
  }

  return trackerCopy[locale].artifacts.map((artifact, index) => ({
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

export function getHiringFollowUpTracker(locale: ProofLocale): HiringFollowUpTrackerPack {
  const copy = trackerCopy[locale];
  const actionBoard = getHiringActionBoard(locale);
  const roles = actionBoard.roles.map(buildTrackerRole);

  return {
    locale,
    hero: copy.hero,
    summary: copy.summary.map((item) => ({ ...item })),
    stages: copy.stages.map((stage) => ({ ...stage })),
    roles,
    artifacts: buildTrackerArtifacts(locale, roles),
    hireRoute: "/hire",
    trackerRoute: "/hire/tracker",
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
