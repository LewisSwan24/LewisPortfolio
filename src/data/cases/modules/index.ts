import type { CaseModulesRecord } from "@/lib/cases/modules-schema";
import { walkieModules } from "./walkie-modules";
import { lamplightModules } from "./lamplight-modules";
import { autofillModules } from "./autofill-modules";
import { mazeModules } from "./maze-modules";
import { onthebeatModules } from "./onthebeat-modules";
import { grasslandModules } from "./grassland-modules";

const ALL_LISTED_CASE_MODULES: readonly CaseModulesRecord[] = [
  walkieModules,
  lamplightModules,
  autofillModules,
  mazeModules,
  onthebeatModules,
  grasslandModules,
];

const CASE_MODULES_MAP = new Map<string, CaseModulesRecord>(
  ALL_LISTED_CASE_MODULES.map((record) => [record.slug, record])
);

export function getCaseDepthModules(slug: string): CaseModulesRecord | null {
  return CASE_MODULES_MAP.get(slug) ?? null;
}

export function getAllListedCaseModules(): readonly CaseModulesRecord[] {
  return ALL_LISTED_CASE_MODULES;
}
