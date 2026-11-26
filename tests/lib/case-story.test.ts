import { describe, expect, it } from "vitest";
import { getCaseStory } from "@/data/cases/story";
import { STORY_SLUGS, countStoryUnits, STORY_BUDGET, type CaseStoryCopy } from "@/data/cases/story/types";

/**
 * v6.6 story-first case pages (review rows 01, 02, 03, 04, 09).
 * The rendered-page checks live in e2e/v66-case-story.spec.ts.
 */

function allText(copy: CaseStoryCopy): string {
  return [
    copy.problem,
    copy.roleLine,
    copy.result,
    ...copy.problemBody,
    ...copy.decisions.flatMap((d) => [d.title, d.conflict, d.chosen, d.gaveUp, d.evidence]),
    copy.watchFor,
    ...copy.built.body,
    ...copy.built.tested,
    ...copy.built.states.flatMap((s) => [s.state, s.what, s.recovery]),
    ...copy.outcome.body,
    ...copy.outcome.limits.flatMap((l) => [l.title, l.body]),
    copy.outcome.next,
  ].join(" ");
}

describe("case story copy", () => {
  for (const slug of STORY_SLUGS) {
    for (const locale of ["en", "zh"] as const) {
      describe(`${slug} (${locale})`, () => {
        const story = getCaseStory(slug);
        const copy = story?.[locale];

        it("exists with a one-sentence problem and result for the first screen", () => {
          expect(copy).toBeDefined();
          expect(copy!.problem.length).toBeGreaterThan(20);
          expect(copy!.result.length).toBeGreaterThan(20);
          expect(copy!.roleLine.length).toBeGreaterThan(5);
        });

        it("tells exactly three decisions, each with conflict, choice, cost and evidence", () => {
          expect(copy!.decisions).toHaveLength(3);
          for (const d of copy!.decisions) {
            expect(d.title.trim().length).toBeGreaterThan(3);
            for (const field of [d.conflict, d.chosen, d.gaveUp, d.evidence]) {
              expect(field.trim().length).toBeGreaterThan(10);
            }
          }
          const ids = copy!.decisions.map((d) => d.id);
          expect(new Set(ids).size).toBe(3);
          const titles = copy!.decisions.map((d) => d.title);
          expect(new Set(titles).size).toBe(3);
        });

        it("collapses the state matrix into a table of five rows", () => {
          expect(copy!.built.states).toHaveLength(5);
        });

        it("keeps the story copy under the page budget", () => {
          expect(countStoryUnits(allText(copy!), locale)).toBeLessThanOrEqual(STORY_BUDGET[locale].max);
        });

        it("tells each decision once: no decision title is repeated elsewhere in the story", () => {
          const rest = allText({
            ...copy!,
            decisions: copy!.decisions.map((d) => ({ ...d, title: "" })) as unknown as CaseStoryCopy["decisions"],
          });
          for (const d of copy!.decisions) {
            expect(rest.includes(d.title)).toBe(false);
          }
        });
      });
    }

    it(`${slug}: en and zh share decision anchors`, () => {
      const story = getCaseStory(slug)!;
      expect(story.zh.decisions.map((d) => d.id)).toEqual(story.en.decisions.map((d) => d.id));
    });
  }
});
