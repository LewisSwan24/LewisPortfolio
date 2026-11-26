import type { CaseStory, StorySlug } from "./types";
import { autofillStory } from "./autofill";
import { grasslandStory } from "./grassland";
import { lamplightStory } from "./lamplight";
import { mazeStory } from "./maze";
import { onthebeatStory } from "./onthebeat";
import { walkieStory } from "./walkie";

const STORIES: Partial<Record<StorySlug, CaseStory | undefined>> = {
  maze: mazeStory,
  walkie: walkieStory,
  lamplight: lamplightStory,
  autofill: autofillStory,
  onthebeat: onthebeatStory,
  grassland: grasslandStory,
};

export function getCaseStory(slug: string): CaseStory | undefined {
  return STORIES[slug as StorySlug];
}

export function hasCaseStory(slug: string): boolean {
  return getCaseStory(slug) !== undefined;
}
