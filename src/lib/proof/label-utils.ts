const inheritedLabelPattern =
  /^(?:Briefing signal|Capability transfer|Current signal|Decision focus|Decision gate|Delivery artifact|Delivery review|Durability risk|Escalation rule|First-30-days outcome|First-month evidence|Handoff note|Interview note|Kickoff signal|Long-term fit|Manager support|Manager touchpoint|Next briefing action|Next command action|Next partnership action|Next retention question|Next review|Offer signal|Onboarding note|Onboarding signal|Operating agreement|Operating rhythm|Opening move|Partnership signal|Proof gate|Readiness signal|Retention signal|Review cadence|Risk guardrail|Risk to monitor|Risk watch|Stakeholder context|Success review|Team dependency|Team handoff|Team ritual|Validation note|90-day outcome):\s*/i;

export function stripInheritedProofLabels(value: string): string {
  let normalized = value.trim();
  let previous = "";

  while (normalized && normalized !== previous) {
    previous = normalized;
    normalized = normalized.replace(inheritedLabelPattern, "").trim();
  }

  return normalized;
}

export function prefixedProofCopy(prefix: string, value: string): string {
  return `${prefix}: ${stripInheritedProofLabels(value)}`;
}
