export type ProjectEvidenceSlug = "connect" | "spectra" | "ai" | "circles";
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
    href: `/projects/${ProjectEvidenceSlug}` | "/resume" | "/contact";
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
    | "/hire/review"
    | `/contact?role=${HiringRoleId}`
    | `/contact?role=${HiringRoleId}&intent=scorecard`
    | `/contact?role=${HiringRoleId}&intent=debrief`
    | `/contact?role=${HiringRoleId}&intent=decision`
    | `/contact?role=${HiringRoleId}&intent=offer`
    | `/contact?role=${HiringRoleId}&intent=onboarding`;
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

export type ProofReviewSignalId =
  | "validation"
  | "maintenance"
  | "handoff"
  | "export"
  | "bundle";

export type ProofReviewCommandStatus = "ready" | "blocked";

export interface ProofReviewAction {
  label: string;
  href: string;
}

export interface ProofReviewHero {
  eyebrow: string;
  headline: string;
  subhead: string;
  status: string;
  primaryAction: ProofReviewAction;
  secondaryAction: ProofReviewAction;
}

export interface ProofReviewSignal {
  id: ProofReviewSignalId;
  label: string;
  value: string;
  detail: string;
  status: ProofReviewCommandStatus;
}

export interface ProofReviewCommand {
  command: string;
  label: string;
  detail: string;
  status: ProofReviewCommandStatus;
}

export interface ProofReviewRoleCard {
  id: HiringRoleId;
  label: string;
  fitThesis: string;
  roleRoute: `/hire/${HiringRoleId}`;
  packetRoute: ApplicationPacketRoute;
  followThroughRoute: FollowThroughRoute;
  contactRoute: `/contact?role=${HiringRoleId}`;
  strongestCases: ProjectEvidenceSlug[];
  claimCount: number;
  proofAnchorCount: number;
  anchorHrefs: CaseReaderHref[];
  primaryClaim: string;
}

export interface ProofReviewAnchorLedgerItem {
  id: string;
  roleId: HiringRoleId;
  roleLabel: string;
  claim: string;
  evidence: string;
  boundary: string;
  href: CaseReaderHref;
}

export interface ProofReviewReadingStep {
  id: string;
  label: string;
  title: string;
  body: string;
  href: string;
  actionLabel: string;
}

export interface ProofReviewBundlePanel {
  label: string;
  outputDir: string;
  handoffFilename: string;
  manifestFilename: string;
  summary: string;
}

export interface ProofReviewClose {
  title: string;
  body: string;
  primaryAction: ProofReviewAction;
  secondaryAction: ProofReviewAction;
}

export interface ProofReviewRoom {
  generatedAt: string;
  locale: ProofLocale;
  status: ProofHandoffStatus;
  hero: ProofReviewHero;
  signals: ProofReviewSignal[];
  commands: ProofReviewCommand[];
  roles: ProofReviewRoleCard[];
  anchorLedger: ProofReviewAnchorLedgerItem[];
  readingSequence: ProofReviewReadingStep[];
  bundle: ProofReviewBundlePanel;
  close: ProofReviewClose;
}

export interface RoleComparisonAction {
  label: string;
  href: string;
}

export interface RoleComparisonHero {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryAction: RoleComparisonAction;
  secondaryAction: RoleComparisonAction;
}

export interface RoleComparisonCriterion {
  id: string;
  label: string;
  question: string;
}

export interface RoleComparisonProof {
  claim: string;
  evidence: string;
  boundary: string;
  href: CaseReaderHref;
}

export interface RoleComparisonLane {
  id: HiringRoleId;
  label: string;
  fitThesis: string;
  strongestCases: ProjectEvidenceSlug[];
  claimCount: number;
  anchorCount: number;
  roleRoute: `/hire/${HiringRoleId}`;
  packetRoute: ApplicationPacketRoute;
  followThroughRoute: FollowThroughRoute;
  contactRoute: `/contact?role=${HiringRoleId}`;
  reviewRoute: "/hire/review";
  strongestProof: RoleComparisonProof;
  interviewQuestion: string;
  recommendedNextStep: string;
}

export interface RoleComparisonDecisionStep {
  id: string;
  label: string;
  title: string;
  body: string;
}

export interface RoleComparisonClose {
  title: string;
  body: string;
  primaryAction: RoleComparisonAction;
  secondaryAction: RoleComparisonAction;
}

export interface RoleComparisonBoard {
  locale: ProofLocale;
  hero: RoleComparisonHero;
  criteria: RoleComparisonCriterion[];
  roles: RoleComparisonLane[];
  decisionSequence: RoleComparisonDecisionStep[];
  hireRoute: "/hire";
  reviewRoute: "/hire/review";
  close: RoleComparisonClose;
}

export interface InterviewAgendaAction {
  label: string;
  href: string;
}

export interface InterviewAgendaHero {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryAction: InterviewAgendaAction;
  secondaryAction: InterviewAgendaAction;
}

export interface InterviewAgendaPhase {
  id: string;
  label: string;
  title: string;
  body: string;
}

export interface InterviewAgendaProof {
  claim: string;
  evidence: string;
  boundary: string;
  href: CaseReaderHref;
}

export interface InterviewAgendaRolePrep {
  id: HiringRoleId;
  label: string;
  fitThesis: string;
  proof: InterviewAgendaProof;
  firstQuestion: string;
  agendaItems: string[];
  decisionQuestions: string[];
  roleRoute: `/hire/${HiringRoleId}`;
  packetRoute: ApplicationPacketRoute;
  followThroughRoute: FollowThroughRoute;
  contactRoute: `/contact?role=${HiringRoleId}&intent=interview`;
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
}

export interface InterviewAgendaClose {
  title: string;
  body: string;
  primaryAction: InterviewAgendaAction;
  secondaryAction: InterviewAgendaAction;
}

export interface InterviewAgendaBoard {
  locale: ProofLocale;
  hero: InterviewAgendaHero;
  agendaPhases: InterviewAgendaPhase[];
  roles: InterviewAgendaRolePrep[];
  hireRoute: "/hire";
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
  close: InterviewAgendaClose;
}

export interface HiringScorecardAction {
  label: string;
  href: string;
}

export interface HiringScorecardHero {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryAction: HiringScorecardAction;
  secondaryAction: HiringScorecardAction;
}

export interface HiringScorecardCriterion {
  id: string;
  label: string;
  question: string;
}

export interface HiringScorecardProof {
  claim: string;
  evidence: string;
  boundary: string;
  href: CaseReaderHref;
}

export interface HiringScorecardRole {
  id: HiringRoleId;
  label: string;
  fitThesis: string;
  recommendation: string;
  proof: HiringScorecardProof;
  scorePrompts: string[];
  roleRoute: `/hire/${HiringRoleId}`;
  packetRoute: ApplicationPacketRoute;
  followThroughRoute: FollowThroughRoute;
  interviewRoute: "/hire/interview";
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
  contactRoute: `/contact?role=${HiringRoleId}&intent=scorecard`;
}

export interface HiringScorecardClose {
  title: string;
  body: string;
  primaryAction: HiringScorecardAction;
  secondaryAction: HiringScorecardAction;
}

export interface HiringScorecardBoard {
  locale: ProofLocale;
  hero: HiringScorecardHero;
  criteria: HiringScorecardCriterion[];
  roles: HiringScorecardRole[];
  hireRoute: "/hire";
  interviewRoute: "/hire/interview";
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
  close: HiringScorecardClose;
}

export interface HiringShortlistAction {
  label: string;
  href: string;
}

export interface HiringShortlistHero {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryAction: HiringShortlistAction;
  secondaryAction: HiringShortlistAction;
}

export interface HiringShortlistSummaryItem {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface HiringShortlistProof {
  claim: string;
  evidence: string;
  boundary: string;
  href: CaseReaderHref;
}

export interface HiringShortlistRole {
  id: HiringRoleId;
  label: string;
  decisionLabel: string;
  shortlistThesis: string;
  proof: HiringShortlistProof;
  managerNote: string;
  nextAction: string;
  roleRoute: `/hire/${HiringRoleId}`;
  packetRoute: ApplicationPacketRoute;
  followThroughRoute: FollowThroughRoute;
  scorecardRoute: "/hire/scorecard";
  interviewRoute: "/hire/interview";
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
  contactRoute: `/contact?role=${HiringRoleId}&intent=scorecard`;
}

export interface HiringShortlistClose {
  title: string;
  body: string;
  primaryAction: HiringShortlistAction;
  secondaryAction: HiringShortlistAction;
}

export interface HiringShortlistMemo {
  locale: ProofLocale;
  hero: HiringShortlistHero;
  summary: HiringShortlistSummaryItem[];
  roles: HiringShortlistRole[];
  hireRoute: "/hire";
  scorecardRoute: "/hire/scorecard";
  interviewRoute: "/hire/interview";
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
  close: HiringShortlistClose;
}

export interface HiringManagerDebriefAction {
  label: string;
  href: string;
}

export interface HiringManagerDebriefHero {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryAction: HiringManagerDebriefAction;
  secondaryAction: HiringManagerDebriefAction;
}

export interface HiringManagerDebriefSummaryItem {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface HiringManagerDebriefProof {
  claim: string;
  evidence: string;
  boundary: string;
  href: CaseReaderHref;
}

export interface HiringManagerDebriefRole {
  id: HiringRoleId;
  label: string;
  managerBrief: string;
  debriefThesis: string;
  proof: HiringManagerDebriefProof;
  secondRoundQuestion: string;
  nextAction: string;
  roleRoute: `/hire/${HiringRoleId}`;
  packetRoute: ApplicationPacketRoute;
  followThroughRoute: FollowThroughRoute;
  shortlistRoute: "/hire/shortlist";
  scorecardRoute: "/hire/scorecard";
  interviewRoute: "/hire/interview";
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
  contactRoute: `/contact?role=${HiringRoleId}&intent=debrief`;
}

export interface HiringManagerDebriefClose {
  title: string;
  body: string;
  primaryAction: HiringManagerDebriefAction;
  secondaryAction: HiringManagerDebriefAction;
}

export interface HiringManagerDebriefBoard {
  locale: ProofLocale;
  hero: HiringManagerDebriefHero;
  summary: HiringManagerDebriefSummaryItem[];
  roles: HiringManagerDebriefRole[];
  hireRoute: "/hire";
  shortlistRoute: "/hire/shortlist";
  scorecardRoute: "/hire/scorecard";
  interviewRoute: "/hire/interview";
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
  close: HiringManagerDebriefClose;
}

export interface HiringDecisionPackAction {
  label: string;
  href: string;
}

export interface HiringDecisionPackHero {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryAction: HiringDecisionPackAction;
  secondaryAction: HiringDecisionPackAction;
}

export interface HiringDecisionPackSummaryItem {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface HiringDecisionPackProof {
  claim: string;
  evidence: string;
  boundary: string;
  href: CaseReaderHref;
}

export interface HiringDecisionPackRole {
  id: HiringRoleId;
  label: string;
  decisionSignal: string;
  finalRecommendation: string;
  remainingRisk: string;
  closeQuestion: string;
  nextAction: string;
  proof: HiringDecisionPackProof;
  roleRoute: `/hire/${HiringRoleId}`;
  packetRoute: ApplicationPacketRoute;
  followThroughRoute: FollowThroughRoute;
  debriefRoute: "/hire/debrief";
  shortlistRoute: "/hire/shortlist";
  scorecardRoute: "/hire/scorecard";
  interviewRoute: "/hire/interview";
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
  contactRoute: `/contact?role=${HiringRoleId}&intent=decision`;
}

export interface HiringDecisionPackClose {
  title: string;
  body: string;
  primaryAction: HiringDecisionPackAction;
  secondaryAction: HiringDecisionPackAction;
}

export interface HiringDecisionPack {
  locale: ProofLocale;
  hero: HiringDecisionPackHero;
  summary: HiringDecisionPackSummaryItem[];
  roles: HiringDecisionPackRole[];
  hireRoute: "/hire";
  debriefRoute: "/hire/debrief";
  shortlistRoute: "/hire/shortlist";
  scorecardRoute: "/hire/scorecard";
  interviewRoute: "/hire/interview";
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
  close: HiringDecisionPackClose;
}

export interface HiringOfferReadinessAction {
  label: string;
  href: string;
}

export interface HiringOfferReadinessHero {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryAction: HiringOfferReadinessAction;
  secondaryAction: HiringOfferReadinessAction;
}

export interface HiringOfferReadinessSummaryItem {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface HiringOfferReadinessProof {
  claim: string;
  evidence: string;
  boundary: string;
  href: CaseReaderHref;
}

export interface HiringOfferReadinessRole {
  id: HiringRoleId;
  label: string;
  offerSignal: string;
  validationNote: string;
  onboardingFocus: string;
  readinessQuestion: string;
  nextAction: string;
  proof: HiringOfferReadinessProof;
  roleRoute: `/hire/${HiringRoleId}`;
  packetRoute: ApplicationPacketRoute;
  followThroughRoute: FollowThroughRoute;
  decisionRoute: "/hire/decision";
  debriefRoute: "/hire/debrief";
  shortlistRoute: "/hire/shortlist";
  scorecardRoute: "/hire/scorecard";
  interviewRoute: "/hire/interview";
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
  contactRoute: `/contact?role=${HiringRoleId}&intent=offer`;
}

export interface HiringOfferReadinessClose {
  title: string;
  body: string;
  primaryAction: HiringOfferReadinessAction;
  secondaryAction: HiringOfferReadinessAction;
}

export interface HiringOfferReadinessPack {
  locale: ProofLocale;
  hero: HiringOfferReadinessHero;
  summary: HiringOfferReadinessSummaryItem[];
  roles: HiringOfferReadinessRole[];
  hireRoute: "/hire";
  decisionRoute: "/hire/decision";
  debriefRoute: "/hire/debrief";
  shortlistRoute: "/hire/shortlist";
  scorecardRoute: "/hire/scorecard";
  interviewRoute: "/hire/interview";
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
  close: HiringOfferReadinessClose;
}

export interface HiringOnboardingReadinessAction {
  label: string;
  href: string;
}

export interface HiringOnboardingReadinessHero {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryAction: HiringOnboardingReadinessAction;
  secondaryAction: HiringOnboardingReadinessAction;
}

export interface HiringOnboardingReadinessSummaryItem {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface HiringOnboardingReadinessProof {
  claim: string;
  evidence: string;
  boundary: string;
  href: CaseReaderHref;
}

export interface HiringOnboardingReadinessRole {
  id: HiringRoleId;
  label: string;
  onboardingSignal: string;
  firstWeekFocus: string;
  firstThirtyDaysOutcome: string;
  onboardingRisk: string;
  managerQuestion: string;
  nextAction: string;
  proof: HiringOnboardingReadinessProof;
  roleRoute: `/hire/${HiringRoleId}`;
  packetRoute: ApplicationPacketRoute;
  followThroughRoute: FollowThroughRoute;
  offerRoute: "/hire/offer";
  decisionRoute: "/hire/decision";
  debriefRoute: "/hire/debrief";
  shortlistRoute: "/hire/shortlist";
  scorecardRoute: "/hire/scorecard";
  interviewRoute: "/hire/interview";
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
  contactRoute: `/contact?role=${HiringRoleId}&intent=onboarding`;
}

export interface HiringOnboardingReadinessClose {
  title: string;
  body: string;
  primaryAction: HiringOnboardingReadinessAction;
  secondaryAction: HiringOnboardingReadinessAction;
}

export interface HiringOnboardingReadinessPack {
  locale: ProofLocale;
  hero: HiringOnboardingReadinessHero;
  summary: HiringOnboardingReadinessSummaryItem[];
  roles: HiringOnboardingReadinessRole[];
  hireRoute: "/hire";
  offerRoute: "/hire/offer";
  decisionRoute: "/hire/decision";
  debriefRoute: "/hire/debrief";
  shortlistRoute: "/hire/shortlist";
  scorecardRoute: "/hire/scorecard";
  interviewRoute: "/hire/interview";
  compareRoute: "/hire/compare";
  reviewRoute: "/hire/review";
  close: HiringOnboardingReadinessClose;
}
