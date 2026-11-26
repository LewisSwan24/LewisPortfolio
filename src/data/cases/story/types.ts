/**
 * Story-first case copy (v6.6). Every sentence here is cut or merged from
 * the existing case data, proof copy and narrative; nothing new is claimed.
 * This file has no path-alias imports so e2e specs can load it directly.
 */

export type StoryLocale = "en" | "zh";

export const STORY_SLUGS = ["maze", "walkie", "lamplight", "autofill", "onthebeat", "grassland"] as const;
export type StorySlug = (typeof STORY_SLUGS)[number];

export interface StoryDecision {
  /** Anchor id, unique on the page. Other places link here instead of retelling it. */
  id: string;
  title: string;
  conflict: string;
  chosen: string;
  gaveUp: string;
  evidence: string;
}

export interface StoryStateRow {
  state: string;
  what: string;
  recovery: string;
}

export interface StoryLimit {
  title: string;
  body: string;
}

export interface StoryTextLink {
  href: string;
  label: string;
}

export interface CaseStoryCopy {
  /** First screen: one sentence each. */
  problem: string;
  roleLine: string;
  result: string;
  /** Problem section, about 150 words, says who it was for. */
  problemBody: readonly string[];
  decisions: readonly [StoryDecision, StoryDecision, StoryDecision];
  /** One line under the simulator: what to watch for. */
  watchFor: string;
  /** Other ways in, as plain text links (second demo, Replay Studio, lab). */
  tryLinks?: readonly StoryTextLink[];
  built: {
    body: readonly string[];
    tested: readonly string[];
    states: readonly StoryStateRow[];
  };
  outcome: {
    body: readonly string[];
    limits: readonly StoryLimit[];
    next: string;
  };
}

export type CaseStory = Record<StoryLocale, CaseStoryCopy>;

/** Count words the way the budget is set: English words, or Han characters for zh. */
export function countStoryUnits(text: string, locale: StoryLocale): number {
  if (locale === "zh") return (text.match(/[一-鿿]/g) ?? []).length;
  return text.split(/\s+/).filter(Boolean).length;
}

export const STORY_BUDGET: Record<StoryLocale, { min: number; max: number }> = {
  en: { min: 1200, max: 1500 },
  zh: { min: 2200, max: 2800 },
};

export const STORY_MAX_H2 = 7;
