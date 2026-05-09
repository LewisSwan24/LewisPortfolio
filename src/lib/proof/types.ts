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
  | `/contact?role=${HiringRoleId}`
  | "/resume";

export interface ApplicationPacketAction {
  kind: "role-room" | "contact" | "resume";
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
