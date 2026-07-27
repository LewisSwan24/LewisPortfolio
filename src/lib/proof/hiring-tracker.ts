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
      eyebrow: "第 40 阶段 · 跟进追踪",
      headline: "把行动路径转成可跟进的节奏。",
      subhead:
        "一个跟进追踪页，把行动板里的路径转成负责人、截止窗口、状态、证据依赖、升级路径和收尾信号。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "行动板", href: "/hire/action" },
    },
    summary: [
      {
        id: "tracked-lanes",
        label: "已追踪路径",
        value: "4",
        detail:
          "每个招聘角色都有跟进负责人、状态、截止窗口、证据依赖、升级路径和收尾信号。",
      },
      {
        id: "tracker-statuses",
        label: "跟进状态",
        value: "3",
        detail:
          "可推进、等待中、被阻塞三种状态会把行动板准备度转成实际跟进队列。",
      },
      {
        id: "follow-up-routes",
        label: "跟进路径",
        value: "19",
        detail:
          "追踪页会连接行动、准备度、简报、控制台、长期招聘页面、岗位材料和证据评审。",
      },
      {
        id: "release-proof",
        label: "发布证据",
        value: "已追踪",
        detail:
          "跟进路径会纳入验证、证据维护、交接导出、发布包和浏览器路径巡检。",
      },
    ],
    stages: [
      {
        id: "capture-owner",
        label: "跟进 01",
        title: "确认负责人",
        owner: "招聘方",
        followUpAction: "打开行动板后，把路径分配给明确的跟进负责人。",
        trackingSignal: "这条路径有一个人负责下一条消息。",
        closeoutRule: "只有负责人打开证据锚点和对应路径后才能收尾。",
        route: "/hire/action",
        actionLabel: "打开行动板",
      },
      {
        id: "check-dependency",
        label: "跟进 02",
        title: "检查证据依赖",
        owner: "招聘经理",
        followUpAction: "确认哪个证据锚点、决策门槛或验证缺口控制下一步。",
        trackingSignal: "路径命名具体证据依赖，而不是泛泛的担心。",
        closeoutRule: "依赖被接受、解决或升级到证据评审后才能收尾。",
        route: "/hire/readiness",
        actionLabel: "打开准备度检查",
      },
      {
        id: "schedule-response",
        label: "跟进 03",
        title: "安排回应窗口",
        owner: "招聘方和面试小组",
        followUpAction: "设置回应窗口，并发送岗位定制提示或跟进消息。",
        trackingSignal: "截止窗口可见，并绑定到一个路径。",
        closeoutRule: "回应带有岗位、证据锚点和下一步问题后才能收尾。",
        route: "/hire/interview",
        actionLabel: "打开面试议程",
      },
      {
        id: "escalate-blocker",
        label: "跟进 04",
        title: "升级阻塞点",
        owner: "证据评审人",
        followUpAction: "如果路径被卡住，先打开证据评审，检查边界，再继续发消息。",
        trackingSignal: "升级路径指向具体证据，并说明要改变什么。",
        closeoutRule: "阻塞点有一个记录过的解决路径后才能收尾。",
        route: "/hire/review",
        actionLabel: "打开证据评审",
      },
      {
        id: "close-loop",
        label: "跟进 05",
        title: "闭环记录",
        owner: "招聘经理",
        followUpAction: "记录收尾信号，并把路径移到入职、决策或归档。",
        trackingSignal: "路径有明确负责人、结果和下一条招聘路径。",
        closeoutRule: "路径不再需要另一个无人负责的跟进后才能收尾。",
        route: "/hire/tracker",
        actionLabel: "打开追踪页",
      },
    ],
    artifacts: [
      {
        id: "owner-note",
        label: "材料 01",
        title: "负责人记录",
        body:
          "一条短记录，说明跟进负责人、要复查的路径、证据依赖和截止窗口。",
        route: "/hire/tracker",
        actionLabel: "打开负责人记录",
        proofLabel: "负责人证据",
      },
      {
        id: "dependency-note",
        label: "材料 02",
        title: "证据依赖记录",
        body:
          "一条经理记录，说明哪个证据锚点或验证缺口控制下一步跟进。",
        route: "/hire/readiness",
        actionLabel: "打开准备度",
        proofLabel: "依赖证据",
      },
      {
        id: "escalation-note",
        label: "材料 03",
        title: "升级记录",
        body:
          "一条证据评审记录，把被阻塞的路径转成一个边界问题和解决路径。",
        route: "/hire/review",
        actionLabel: "打开升级记录",
        proofLabel: "升级证据",
      },
      {
        id: "closeout-note",
        label: "材料 04",
        title: "收尾记录",
        body:
          "一条最终记录，写明收尾信号，以及决策、入职或归档的下一条路径。",
        route: "/hire/action",
        actionLabel: "打开行动",
        proofLabel: "收尾证据",
      },
    ],
    close: {
      title: "行动路径需要负责人和可见收尾规则时，使用追踪页。",
      body:
        "打开路径，确认负责人和截止窗口，检查证据依赖；只有路径或阻塞点明确后才收尾。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "行动板", href: "/hire/action" },
    },
  },
} as const;

const routeLabels: Record<ProofLocale, Record<HiringFollowUpTrackerSharedRoute, string>> = {
  en: {
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
  },
  zh: {
    "/hire/tracker": "跟进追踪页",
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

function statusLabel(locale: ProofLocale, status: HiringFollowUpTrackerStatus): string {
  if (locale === "zh") {
    if (status === "Ready") return "可推进";
    if (status === "Waiting") return "等待中";
    return "被阻塞";
  }

  return status;
}

function statusDetail(
  status: HiringFollowUpTrackerStatus,
  route: HiringFollowUpTrackerSharedRoute,
  locale: ProofLocale
): string {
  const routeName = routeLabels[locale][route];

  if (status === "Ready") {
    return locale === "zh"
      ? `打开${routeName}后即可跟进。`
      : `Ready for follow-up after opening the ${routeName}.`;
  }

  if (status === "Waiting") {
    return locale === "zh"
      ? `${routeName}推进前，还在等待一个证据依赖。`
      : `Waiting on one proof dependency before the ${routeName} can advance.`;
  }

  return locale === "zh"
    ? `在证据评审澄清${routeName}背后的依赖前，这条路径保持阻塞。`
    : `Blocked until proof review clarifies the dependency behind the ${routeName}.`;
}

function dueWindow(status: HiringFollowUpTrackerStatus, locale: ProofLocale): string {
  if (locale === "zh") {
    if (status === "Ready") return "下一次沟通窗口";
    if (status === "Waiting") return "经理验证后";
    return "证据评审后";
  }

  if (status === "Ready") return "Next outreach window";
  if (status === "Waiting") return "After manager validation";
  return "After proof review";
}

function buildTrackerRole(
  role: HiringActionBoardRole,
  locale: ProofLocale
): HiringFollowUpTrackerRole {
  const status = trackerStatus(role);
  const routeToReview = role.routeToOpen;
  const routeName = routeLabels[locale][routeToReview];
  const readableStatus = statusLabel(locale, status);

  return {
    id: role.id,
    label: role.label,
    trackerStatus: status,
    trackerStatusDetail: statusDetail(status, routeToReview, locale),
    followUpOwner: role.actionOwner,
    dueWindow: dueWindow(status, locale),
    evidenceDependency: stripInheritedLabel(role.blockingRisk),
    routeToReview,
    nextFollowUp:
      locale === "zh"
        ? `打开${routeName}，并带着证据锚点发送 ${role.label} 的下一次跟进。`
        : `Open the ${routeName} and send the next ${role.label} follow-up with the proof anchor attached.`,
    escalationPath:
      locale === "zh"
        ? `如果 ${role.label} 仍然${readableStatus}，先打开证据评审，再发送下一条消息。`
        : `If ${role.label} remains ${status.toLowerCase()}, open proof review before sending another message.`,
    closeoutSignal:
      locale === "zh"
        ? `${role.label} 记录了负责人、证据锚点、路径和下一步招聘决策后再收尾。`
        : `Close when ${role.label} has an owner, proof anchor, route, and next hiring decision recorded.`,
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
  const roles = actionBoard.roles.map((role) => buildTrackerRole(role, locale));

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
