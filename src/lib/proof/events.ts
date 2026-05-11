import type { CaseReaderAnchorId, HiringRoleId, ProjectEvidenceSlug } from "./types";

type ProofSource = "hire" | "hire-role" | "home" | "work" | "resume" | "contact";

interface ProofAnchorEventInput {
  source: ProofSource;
  role?: HiringRoleId;
  caseSlug: ProjectEvidenceSlug;
  anchorId: CaseReaderAnchorId;
}

interface ConversionEventInput {
  source: ProofSource;
  role?: HiringRoleId;
  action: "contact" | "resume" | "projects" | "hire";
}

export function proofAnchorEventAttrs(input: ProofAnchorEventInput) {
  return {
    "data-proof-event": "proof_anchor_click",
    "data-proof-source": input.source,
    ...(input.role ? { "data-proof-role": input.role } : {}),
    "data-proof-case": input.caseSlug,
    "data-proof-anchor": input.anchorId,
  };
}

export function conversionEventAttrs(input: ConversionEventInput) {
  return {
    "data-proof-event": "conversion_action_click",
    "data-proof-source": input.source,
    ...(input.role ? { "data-proof-role": input.role } : {}),
    "data-proof-action": input.action,
  };
}
