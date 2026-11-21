import { ALL_CASE_RECORDS } from "@/data/cases";
import {
  CaseRecordSchema,
  type CaseCardCopy,
  type CaseNarrativeCopy,
  type CaseRecord,
  type RoleTrack,
} from "./schema";
import type { CurrentProjectSlug } from "@/lib/project-routes";

export type CaseLocale = "en" | "zh";

const CASE_MAP = new Map<CurrentProjectSlug, CaseRecord>(
  ALL_CASE_RECORDS.map((record) => [record.slug, record])
);

export function getAllCases(): readonly CaseRecord[] {
  return ALL_CASE_RECORDS;
}

export function getListedCases(): readonly CaseRecord[] {
  return ALL_CASE_RECORDS.filter((record) => record.status === "listed");
}

export function getFeaturedDeckCases(): readonly CaseRecord[] {
  return ALL_CASE_RECORDS.filter(
    (record) => record.status === "listed" && typeof record.featuredOrder === "number"
  ).sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999));
}

export function getCaseBySlug(slug: string): CaseRecord | undefined {
  return CASE_MAP.get(slug as CurrentProjectSlug);
}

export function getCaseRecordOrThrow(slug: CurrentProjectSlug): CaseRecord {
  const record = CASE_MAP.get(slug);
  if (!record) {
    throw new Error(`Unknown case slug in CaseRegistry: "${slug}"`);
  }
  return record;
}

export function getCaseCard(slug: CurrentProjectSlug, locale: CaseLocale): CaseCardCopy {
  return getCaseRecordOrThrow(slug).card[locale];
}

export function getCaseNarrative(
  slug: CurrentProjectSlug,
  locale: CaseLocale
): CaseNarrativeCopy {
  return getCaseRecordOrThrow(slug).narrative[locale];
}

export function getCasesByRoleTrack(track: RoleTrack): readonly CaseRecord[] {
  return getListedCases().filter((record) => record.roleTracks.includes(track));
}

export function getCaseSearchIndex(locale: CaseLocale) {
  return getListedCases().map((record) => {
    const card = record.card[locale];
    return {
      type: "project" as const,
      slug: record.slug,
      title: card.title,
      description: card.sub,
      tags: [card.kicker, card.m1, card.m2, card.m3],
    };
  });
}

export interface CaseValidationIssue {
  slug: string;
  message: string;
}

export function validateCaseRegistry(): {
  ok: boolean;
  total: number;
  listed: number;
  issues: CaseValidationIssue[];
} {
  const issues: CaseValidationIssue[] = [];
  const seenSlugs = new Set<string>();

  for (const record of ALL_CASE_RECORDS) {
    if (seenSlugs.has(record.slug)) {
      issues.push({ slug: record.slug, message: "Duplicate slug in ALL_CASE_RECORDS" });
    }
    seenSlugs.add(record.slug);

    const parsed = CaseRecordSchema.safeParse(record);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        issues.push({
          slug: record.slug,
          message: `${issue.path.join(".")}: ${issue.message}`,
        });
      }
    }

    if (record.status === "listed" && !record.cover) {
      issues.push({
        slug: record.slug,
        message: "Every listed case must declare a real cover image",
      });
    }
  }

  return {
    ok: issues.length === 0,
    total: ALL_CASE_RECORDS.length,
    listed: getListedCases().length,
    issues,
  };
}
