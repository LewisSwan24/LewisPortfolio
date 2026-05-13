import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getHiringGrowthRoadmap } from "./hiring-growth";
import { getHiringPartnershipOperatingPack } from "./hiring-partnership";
import { getHiringRetentionReadiness } from "./hiring-retention";
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
      eyebrow: "Stage 37 hiring briefing",
      headline: "面向 stakeholder-ready handoff 的 Hiring Briefing Room。",
      subhead:
        "把 hiring command center 转成 recruiter、hiring manager、design lead、interview panel 和 onboarding partner 都能快速使用的 briefing surface。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring command", href: "/hire/command" },
    },
    summary: [
      {
        id: "stakeholders",
        label: "Stakeholders",
        value: "5",
        detail:
          "Recruiter、hiring manager、design lead、interview panel 和 onboarding partner 各有一条 focused reading path。",
      },
      {
        id: "role-briefs",
        label: "Role briefs",
        value: "4",
        detail:
          "每个招聘方向都会把 command-center signal 转成 opening context、evidence、risk、handoff 和 next action。",
      },
      {
        id: "route-links",
        label: "Route links",
        value: "15",
        detail:
          "Briefing room 连接 command、partnership、retention、growth、impact、kickoff、onboarding、offer、decision、debrief、shortlist、scorecard、interview、compare 和 review。",
      },
      {
        id: "release-proof",
        label: "Release proof",
        value: "Tracked",
        detail:
          "Briefing lanes 会进入 proof maintenance、validation、handoff export、release bundle 和 browser route sweep。",
      },
    ],
    stakeholders: [
      {
        id: "recruiter",
        label: "Recruiter",
        goal: "用最快的 proof-backed 方式介绍 Lewis，同时不压扁 role fit。",
        readingFocus: "Command route、role lane、packet route 和简短 contact intent。",
        questionToAsk: "Screen 或 outreach note 应该从哪条 role signal 开始？",
        decisionToMake: "选择 role packet 和下一次对话 owner。",
        route: "/hire/command",
        actionLabel: "Open hiring command",
      },
      {
        id: "hiring-manager",
        label: "Hiring manager",
        goal: "把 portfolio evidence 转成 close-fit decision 和一个 visible risk。",
        readingFocus: "Decision pack、risk note、proof boundary 和 next briefing action。",
        questionToAsk: "Team commit 前还必须解决哪个 remaining risk？",
        decisionToMake: "选择 close、validate 或 redirect role path。",
        route: "/hire/decision",
        actionLabel: "Open decision pack",
      },
      {
        id: "design-lead",
        label: "Design lead",
        goal: "在判断 craft、systems 或 product judgment 前先检查 strongest proof anchor。",
        readingFocus: "Proof review、artifact links、case anchor 和 evidence-to-inspect note。",
        questionToAsk: "哪个 artifact 展示实际 operating quality，而不只是 outcome？",
        decisionToMake: "选择 portfolio review 应该使用的 case anchor。",
        route: "/hire/review",
        actionLabel: "Open proof review",
      },
      {
        id: "interview-panel",
        label: "Interview panel",
        goal: "把每条 role lane 转成能测试 evidence 和 boundary 的 interview questions。",
        readingFocus: "Interview agenda、decision question、proof gate 和 role follow-through。",
        questionToAsk: "哪个问题可以直接测试 claimed contribution？",
        decisionToMake: "选择 interview route 和要现场检查的 evidence。",
        route: "/hire/interview",
        actionLabel: "Open interview agenda",
      },
      {
        id: "onboarding-partner",
        label: "Onboarding partner",
        goal: "把同一个 proof signal 带到 first-week expectations 和 first-project setup。",
        readingFocus: "Onboarding plan、kickoff plan、partnership operating 和 follow-up owner。",
        questionToAsk: "这个 team context 下 first week 应该证明什么？",
        decisionToMake: "命名第一条 operating expectation 和 owner。",
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
          "从 briefing signal 到 proof review 的 compact path，适合先看 evidence 再谈 role preference 的读者。",
        route: "/hire/review",
        actionLabel: "Open proof reading",
        proofLabel: "Proof anchor",
      },
      {
        id: "interview-question-brief",
        label: "Artifact 02",
        title: "Interview question brief",
        body:
          "Question-first note，帮助 interview panel 测试 claimed contribution 以及它的 boundary。",
        route: "/hire/interview",
        actionLabel: "Open interview brief",
        proofLabel: "Question proof",
      },
      {
        id: "decision-risk-note",
        label: "Artifact 03",
        title: "Decision risk note",
        body:
          "Manager-facing note，通过明确 remaining risk，让 close decision 保持诚实。",
        route: "/hire/decision",
        actionLabel: "Open decision note",
        proofLabel: "Risk proof",
      },
      {
        id: "handoff-operating-note",
        label: "Artifact 04",
        title: "Handoff operating note",
        body:
          "Practical handoff note，把 interview evidence 转成 onboarding、kickoff 和 partnership expectations。",
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
      title: "当 proof 很强但 audience 混合时，用 briefing room。",
      body:
        "选择 stakeholder，打开对应 route，再用 role lane 让 handoff 具体到可以进入真实招聘对话。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "Hiring command", href: "/hire/command" },
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
    briefingSignal: `${copy.signalPrefix}: ${partnershipRole.partnershipSignal}`,
    stakeholderContext: `${copy.stakeholderPrefix}: ${packet.fitThesis}`,
    openingContext: `${copy.openingPrefix}: ${openingContext}`,
    evidenceToInspect: `${copy.evidencePrefix}: ${evidenceToInspect}`,
    decisionQuestion: `${copy.questionPrefix}: ${decisionQuestion}`,
    riskToResolve: `${copy.riskPrefix}: ${retentionRole.durabilityRisk}`,
    handoffNote: `${copy.handoffPrefix}: ${handoffNote}`,
    followUpOwner: `${copy.ownerPrefix}: ${followUpOwner}`,
    nextBriefingAction: `${copy.actionPrefix}: ${partnershipRole.nextPartnershipAction}`,
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
