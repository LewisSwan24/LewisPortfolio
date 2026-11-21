export type ProjectEvidenceSlug =
  | "connect"
  | "spectra"
  | "maze"
  | "vigil"
  | "hoop"
  | "pricewise"
  | "gapmapper"
  | "rules"
  | "grassland"
  | "onthebeat"
  | "lamplight"
  | "autofill"
  | "walkie"
  | "fencepost";
export type ProofLocale = "en" | "zh";

export interface CareerSnapshotStat {
  value: string;
  label: string;
  detail: string;
}

export interface CareerSnapshot {
  headline: string;
  summary: string;
  status: string;
  stats: CareerSnapshotStat[];
}

export interface CapabilityPillar {
  id: string;
  title: string;
  summary: string;
  proof: string;
  href: `/projects/${ProjectEvidenceSlug}`;
}

export interface ProjectEvidence {
  slug: ProjectEvidenceSlug;
  href: `/projects/${ProjectEvidenceSlug}`;
  problemType: string;
  challenge: string;
  methods: string[];
  sample: string;
  outcome: string;
  proves: string;
}

export interface CaseSummary {
  challenge: string;
  role: string;
  methods: string[];
  evidence: string[];
  outcome: string;
  next: string;
}

export interface RoleFit {
  availability: string;
  roles: string[];
  bestFit: string[];
  proofLinks: Array<{
    label: string;
    href: `/projects/${ProjectEvidenceSlug}` | "/resume" | "/contact" | "/hire#ai-trust-thread";
  }>;
}

export interface HiringPath {
  time: string;
  title: string;
  action: string;
  href: `/projects/${ProjectEvidenceSlug}` | "/projects" | "/resume" | "/contact";
}

export interface CaseDecision {
  label: string;
  choice: string;
  evidence: string;
  tradeoff: string;
  impact: string;
}

export interface CaseEvidenceItem {
  method: string;
  sample: string;
  question: string;
  finding: string;
  implication: string;
}

export interface CaseIteration {
  version: string;
  change: string;
  reason: string;
  improvement: string;
}

export interface CaseLimit {
  constraint: string;
  whyItMatters: string;
  nextValidation: string;
}

/**
 * Only `limits` reaches a reader. The decision timeline, the evidence board and
 * the interview takeaway were folded into the `cs.<slug>.*` narrative in
 * src/messages/{en,zh}.json; app/[locale]/projects/[slug]/page.tsx keeps their
 * anchors alive as empty `case-anchor` divs so existing proof links still land,
 * and renders nothing from `decisions`, `evidence`, `iterations` or `takeaway`.
 *
 * They are kept because they are the interview-prep version of each case and
 * tests/lib/portfolio-proof.test.ts holds them to a standard. But writing case
 * copy here does not publish it — put anything a reader should see in
 * messages.json, and verify against the served HTML rather than the source.
 */
export interface CaseDepth {
  decisions: CaseDecision[];
  evidence: CaseEvidenceItem[];
  iterations: CaseIteration[];
  limits: CaseLimit[];
  takeaway: string;
}

export interface HiringHero {
  headline: string;
  subhead: string;
  status: string;
}

export interface HiringSignal {
  value: string;
  label: string;
  detail: string;
}

export interface ProofRoute {
  audience: string;
  title: string;
  claim: string;
  evidence: string;
  href: `/projects/${ProjectEvidenceSlug}` | CaseReaderHref;
}

export interface ConversionAction {
  label: string;
  href: "/projects" | "/resume" | "/contact" | `/projects/${ProjectEvidenceSlug}`;
}

export interface ConversionPrompt {
  title: string;
  body: string;
  primaryAction: ConversionAction;
  secondaryAction: ConversionAction;
}

export interface HiringConversion {
  hero: HiringHero;
  signals: HiringSignal[];
  proofRoutes: ProofRoute[];
  closingPrompt: ConversionPrompt;
}

export interface CaseInterviewScan {
  proves: string;
  inspect: string[];
  questions: string[];
  bestFit: string[];
}

export type CaseReaderAnchorId =
  | "snapshot"
  | "interviewer-scan"
  | "artifact"
  | "decision-timeline"
  | "evidence-board"
  | "iteration-gallery"
  | "outcome-limits"
  | "interview-takeaway"
  | "long-form"
  | "related-projects";

export type CaseReaderHref = `/projects/${ProjectEvidenceSlug}#${CaseReaderAnchorId}`;

export interface CaseReaderSection {
  id: CaseReaderAnchorId;
  label: string;
  description: string;
}

export interface CaseReaderMode {
  id: "scan" | "manager" | "research" | "interview";
  label: string;
  description: string;
  anchorIds: CaseReaderAnchorId[];
}

export interface CaseInterviewPrompt {
  question: string;
  reason: string;
  anchorId: CaseReaderAnchorId;
}

export interface CaseReaderGuide {
  sections: CaseReaderSection[];
  modes: CaseReaderMode[];
  prompts: CaseInterviewPrompt[];
}

export type HiringRoleId =
  | "ux-product"
  | "ux-research"
  | "ai-ux"
  | "accessibility";

export type EvidenceStrength = "primary" | "supporting" | "none";

export interface HiringRoleFit {
  id: HiringRoleId;
  label: string;
  fit: string;
  proofLinks: Array<{
    label: string;
    href: `/projects/${ProjectEvidenceSlug}` | CaseReaderHref;
  }>;
  bestCases: ProjectEvidenceSlug[];
  risk: string;
  interviewAngle: string;
}

export interface EvidenceMatrixCell {
  strength: EvidenceStrength;
  proof: string;
  href: CaseReaderHref;
}

export interface EvidenceMatrixCapability {
  id: string;
  label: string;
  summary: string;
  cases: Partial<Record<ProjectEvidenceSlug, EvidenceMatrixCell>>;
}

export interface CaseInterviewAnswer {
  id: string;
  question: string;
  answer: string;
  evidenceHref: CaseReaderHref;
  boundary: string;
}

export interface CaseInterviewPack {
  answers: CaseInterviewAnswer[];
  managerFollowUp: CaseInterviewAnswer;
}

export interface InterviewDecisionSignal {
  label: string;
  value: string;
  detail: string;
}

export interface InterviewDecisionBrief {
  eyebrow: string;
  headline: string;
  subhead: string;
  status: string;
  signals: InterviewDecisionSignal[];
  primaryAction: ConversionAction;
  secondaryAction: ConversionAction;
}

export interface InterviewEvidenceBriefItem {
  id: string;
  capability: string;
  caseSlug: ProjectEvidenceSlug;
  proof: string;
  whyItMatters: string;
  href: CaseReaderHref;
}

export type InterviewQuestionGroup =
  | "product"
  | "research"
  | "accessibility"
  | "ai"
  | "limits";

export interface InterviewQuestionBankItem {
  id: string;
  group: InterviewQuestionGroup;
  question: string;
  proves: string;
  caseSlug: ProjectEvidenceSlug;
  href: CaseReaderHref;
}

export interface InterviewBoundaryNote {
  id: string;
  claim: string;
  boundary: string;
  validation: string;
  href?: CaseReaderHref;
}

export interface InterviewDecisionRoom {
  brief: InterviewDecisionBrief;
  evidenceBrief: InterviewEvidenceBriefItem[];
  questionBank: InterviewQuestionBankItem[];
  boundaries: InterviewBoundaryNote[];
}

export interface ProofClaim {
  id: string;
  claim: string;
  evidence: string;
  boundary: string;
  strongestAnchor: CaseReaderHref;
  nextValidation: string;
}

export interface RolePacket {
  id: HiringRoleId;
  route: `/hire/${HiringRoleId}`;
  label: string;
  headline: string;
  fitThesis: string;
  strongestCases: ProjectEvidenceSlug[];
  proofClaims: ProofClaim[];
  interviewQuestions: CaseInterviewAnswer[];
  primaryAction: ConversionAction;
  secondaryAction: ConversionAction;
  /** Where the role's evidence is gathered on /hire, when it spans several cases. */
  thread?: {
    label: string;
    href: "/hire#ai-trust-thread";
  };
}

/**
 * One entry in the /hire "AI and trust" thread. `who` says who did the work
 * (solo, or which course team), because the thread spans team projects.
 */
export interface AiTrustThreadEntry {
  slug: ProjectEvidenceSlug;
  caseName: string;
  who: string;
  body: string;
  href: CaseReaderHref;
}

export interface AiTrustThread {
  eyebrow: string;
  title: string;
  /** Opens by admitting there is no finished AI-native product. */
  intro: string;
  entries: AiTrustThreadEntry[];
  /** The closing limit sentence. Tested in both locales. */
  limit: string;
  linkLabel: string;
  /** The one-line marker case pages on the thread carry back to /hire. */
  caseMarker: {
    label: string;
    link: string;
  };
}

export type ApplicationPacketRoute = `/hire/${HiringRoleId}/packet`;

export type ApplicationPacketActionHref =
  | `/hire/${HiringRoleId}`
  | `/hire/${HiringRoleId}/next`
  | `/contact?role=${HiringRoleId}`
  | "/resume";

export interface ApplicationPacketAction {
  kind: "role-room" | "contact" | "next" | "resume";
  label: string;
  href: ApplicationPacketActionHref;
}

export interface ApplicationPacketProofItem {
  id: string;
  claim: string;
  evidence: string;
  href: CaseReaderHref;
  boundary: string;
}

export interface ApplicationPacket {
  id: HiringRoleId;
  route: ApplicationPacketRoute;
  label: string;
  headline: string;
  summary: string;
  proof: ApplicationPacketProofItem[];
  interviewFocus: string[];
  boundaries: string[];
  actions: ApplicationPacketAction[];
}

export type FollowThroughRoute = `/hire/${HiringRoleId}/next`;

export type FollowThroughActionHref =
  | FollowThroughRoute
  | ApplicationPacketRoute
  | `/hire/${HiringRoleId}`
  | `/contact?role=${HiringRoleId}&intent=interview`
  | "/resume"
  | `mailto:${string}`;

export interface FollowThroughAction {
  kind: "mailto" | "copy-email" | "packet" | "role-room" | "contact" | "resume";
  label: string;
  href?: FollowThroughActionHref;
}

export interface FollowThroughEvidenceItem {
  id: string;
  label: string;
  href: CaseReaderHref;
  reason: string;
}

export interface FollowThroughBrief {
  id: HiringRoleId;
  route: FollowThroughRoute;
  label: string;
  headline: string;
  summary: string;
  emailSubject: string;
  emailBody: string;
  preCallEvidence: FollowThroughEvidenceItem[];
  meetingAgenda: string[];
  decisionQuestions: string[];
  boundaries: string[];
  actions: FollowThroughAction[];
}

export type ProofFreshnessStatus = "fresh" | "watch" | "stale";

export type ProofMaintenanceSurface =
  | "role-room"
  | "application-packet"
  | "follow-through"
  | "role-comparison"
  | "interview-agenda"
  | "hiring-scorecard"
  | "hiring-shortlist"
  | "hiring-debrief"
  | "hiring-decision"
  | "hiring-offer"
  | "hiring-onboarding"
  | "hiring-kickoff"
  | "hiring-impact"
  | "hiring-growth"
  | "hiring-retention"
  | "hiring-partnership"
  | "hiring-command"
  | "hiring-briefing"
  | "hiring-readiness"
  | "hiring-action"
  | "hiring-tracker"
  | "review-room"
  | "contact";

export interface ProofMaintenanceEntry {
  id: string;
  roleId: HiringRoleId;
  claimId: string;
  surface: ProofMaintenanceSurface;
  href:
    | CaseReaderHref
    | `/hire/${HiringRoleId}`
    | ApplicationPacketRoute
    | FollowThroughRoute
    | "/hire/compare"
    | "/hire/interview"
    | "/hire/scorecard"
    | "/hire/shortlist"
    | "/hire/debrief"
    | "/hire/decision"
    | "/hire/offer"
    | "/hire/onboarding"
    | "/hire/kickoff"
    | "/hire/impact"
    | "/hire/growth"
    | "/hire/retention"
    | "/hire/partnership"
    | "/hire/command"
    | "/hire/briefing"
    | "/hire/readiness"
    | "/hire/action"
    | "/hire/tracker"
    | "/hire/review"
    | `/contact?role=${HiringRoleId}`
    | `/contact?role=${HiringRoleId}&intent=scorecard`
    | `/contact?role=${HiringRoleId}&intent=debrief`
    | `/contact?role=${HiringRoleId}&intent=decision`
    | `/contact?role=${HiringRoleId}&intent=offer`
    | `/contact?role=${HiringRoleId}&intent=onboarding`
    | `/contact?role=${HiringRoleId}&intent=kickoff`
    | `/contact?role=${HiringRoleId}&intent=impact`
    | `/contact?role=${HiringRoleId}&intent=growth`
    | `/contact?role=${HiringRoleId}&intent=retention`
    | `/contact?role=${HiringRoleId}&intent=partnership`
    | `/contact?role=${HiringRoleId}&intent=command`
    | `/contact?role=${HiringRoleId}&intent=briefing`
    | `/contact?role=${HiringRoleId}&intent=readiness`
    | `/contact?role=${HiringRoleId}&intent=action`
    | `/contact?role=${HiringRoleId}&intent=tracker`;
  reviewedAt: string;
  nextReviewAt: string;
  status: ProofFreshnessStatus;
  ownerNote: string;
}

export interface ProofMaintenanceReport {
  generatedAt: string;
  entries: ProofMaintenanceEntry[];
  fresh: ProofMaintenanceEntry[];
  watch: ProofMaintenanceEntry[];
  stale: ProofMaintenanceEntry[];
  missingReview: string[];
}

export type ProofValidationSeverity = "error" | "warning";

export interface ProofValidationIssue {
  id: string;
  severity: ProofValidationSeverity;
  area: string;
  message: string;
  locale?: ProofLocale;
  roleId?: HiringRoleId;
  href?: string;
}

export interface ProofValidationReport {
  generatedAt: string;
  ok: boolean;
  checkedRoutes: string[];
  checkedAnchors: number;
  checkedLocales: ProofLocale[];
  maintenanceEntries: number;
  issues: ProofValidationIssue[];
  errors: ProofValidationIssue[];
  warnings: ProofValidationIssue[];
}

export type ProofHandoffStatus = "ready" | "blocked";

export interface ProofHandoffRole {
  id: HiringRoleId;
  label: string;
  roleRoute: `/hire/${HiringRoleId}`;
  packetRoute: ApplicationPacketRoute;
  followThroughRoute: FollowThroughRoute;
  claimCount: number;
  strongestCases: ProjectEvidenceSlug[];
  proofAnchors: CaseReaderHref[];
}

export interface ProofHandoffValidationSummary {
  ok: boolean;
  checkedRoutes: number;
  checkedAnchors: number;
  errors: number;
  warnings: number;
}

export interface ProofHandoffMaintenanceSummary {
  total: number;
  fresh: number;
  watch: number;
  stale: number;
  missingReview: number;
}

export interface ProofHandoffManifest {
  generatedAt: string;
  status: ProofHandoffStatus;
  roles: ProofHandoffRole[];
  validation: ProofHandoffValidationSummary;
  maintenance: ProofHandoffMaintenanceSummary;
  commands: string[];
}

export type ProofHandoffExportFormat = "markdown";

export interface ProofHandoffExport {
  generatedAt: string;
  format: ProofHandoffExportFormat;
  filename: string;
  content: string;
}

export type ProofReleaseBundleArtifactKind = "handoff-markdown" | "release-manifest";
export type ProofReleaseBundleArtifactFormat = "markdown" | "json";

export interface ProofReleaseBundleArtifact {
  kind: ProofReleaseBundleArtifactKind;
  filename: string;
  format: ProofReleaseBundleArtifactFormat;
  bytes: number;
}

export interface ProofReleaseBundleSummary {
  roles: number;
  routes: number;
  anchors: number;
  maintenanceEntries: number;
}

export interface ProofReleaseBundle {
  generatedAt: string;
  label: string;
  status: ProofHandoffStatus;
  outputDir: string;
  handoff: ProofHandoffExport;
  artifacts: ProofReleaseBundleArtifact[];
  commands: string[];
  summary: ProofReleaseBundleSummary;
}




























































































































































