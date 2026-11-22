import { getListedCases } from "@/lib/cases/registry";
import type { ProofLocale } from "@/lib/portfolio-proof";

export type ComparatorFocusFilter = "all" | "ai-trust" | "physical" | "rules";

export interface DecisionComparatorRow {
  slug: string;
  title: string;
  kicker: string;
  decisionTitle: string;
  humanTension: string;
  rejectedOption: string;
  rejectedFlaw: string;
  chosenTradeoff: string;
  residualCostOrRisk: string;
  themes: Exclude<ComparatorFocusFilter, "all">[];
}

const SLUG_FOCUS_MAP: Record<string, Exclude<ComparatorFocusFilter, "all">[]> = {
  walkie: ["ai-trust", "physical"],
  lamplight: ["ai-trust", "rules"],
  autofill: ["ai-trust", "rules"],
  maze: ["physical"],
  onthebeat: ["physical", "ai-trust"],
  grassland: ["rules"],
};

export function getDecisionComparatorRows(locale: ProofLocale): DecisionComparatorRow[] {
  const listed = getListedCases();
  const rows: DecisionComparatorRow[] = [];

  for (const record of listed) {
    const primary = record.designDecisions?.[0];
    if (!primary) continue;
    const rejected = primary.rejectedAlternatives[0];
    rows.push({
      slug: record.slug,
      title: record.card[locale].title,
      kicker: record.card[locale].kicker,
      decisionTitle: primary.decisionTitle[locale],
      humanTension: primary.humanTension[locale],
      rejectedOption: rejected?.option[locale] ?? "",
      rejectedFlaw: rejected?.flaw[locale] ?? "",
      chosenTradeoff: primary.chosenTradeoff[locale],
      residualCostOrRisk: primary.residualCostOrRisk[locale],
      themes: SLUG_FOCUS_MAP[record.slug] ?? ["rules"],
    });
  }

  return rows;
}
