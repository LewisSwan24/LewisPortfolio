import { expect, test, type Page } from "@playwright/test";
import { getCaseStory } from "../src/data/cases/story";
import { STORY_BUDGET, STORY_MAX_H2, STORY_SLUGS } from "../src/data/cases/story/types";

/**
 * v6.6 story-first case pages: review rows 01, 02, 03, 04 and 09
 * (docs/reviews/2026-11-ux-review.md, 「案例頁可以改成的樣子」).
 */

async function open(page: Page, path: string, width = 1440, height = 900) {
  await page.setViewportSize({ width, height });
  await page.goto(path, { waitUntil: "networkidle" });
}

/** Text of <main> outside the collapsed appendix, the side rail and the prev/next links. */
async function storyText(page: Page): Promise<string> {
  return page.evaluate(() => {
    const main = document.querySelector("main")!.cloneNode(true) as HTMLElement;
    main
      .querySelectorAll("details.case-appendix, .cs-jump, .cs-breadcrumb, .case-related, nav, script, style, svg")
      .forEach((n) => n.remove());
    return (main.textContent ?? "").replace(/\s+/g, " ").trim();
  });
}

function units(text: string, locale: "en" | "zh"): number {
  if (locale === "zh") return (text.match(/[一-鿿]/g) ?? []).length;
  return text.split(/\s+/).filter(Boolean).length;
}

for (const slug of STORY_SLUGS) {
  for (const locale of ["en", "zh"] as const) {
    test.describe(`v6.6 story · /${locale}/projects/${slug}`, () => {
      const story = getCaseStory(slug);

      test("01/02: at most seven H2, appendix collapsed by default", async ({ page }) => {
        await open(page, `/${locale}/projects/${slug}`);
        const h2 = await page.locator("main h2").count();
        expect(h2).toBeLessThanOrEqual(STORY_MAX_H2);
        const appendix = page.locator("details.case-appendix");
        await expect(appendix).toHaveCount(1);
        expect(await appendix.getAttribute("open")).toBeNull();
      });

      test("09: first screen shows the problem, role, result and a real image", async ({ page }) => {
        expect(story, "story copy").toBeDefined();
        const copy = story![locale];
        await open(page, `/${locale}/projects/${slug}`);
        const problem = page.locator("[data-story-problem]");
        const result = page.locator("[data-story-result]");
        await expect(problem).toHaveText(copy.problem);
        await expect(result).toHaveText(copy.result);
        await expect(page.locator("[data-story-role]")).toHaveText(copy.roleLine);
        for (const loc of [problem, result]) {
          const box = await loc.boundingBox();
          expect(box!.y + box!.height).toBeLessThanOrEqual(900);
        }
        const img = page.locator(".cs-hero .cs-cover img, .cs-hero .cs-cover svg").first();
        const box = await img.boundingBox();
        expect(box!.y).toBeLessThan(900);
      });

      test("02: story outside the appendix stays under the word budget", async ({ page }) => {
        await open(page, `/${locale}/projects/${slug}`);
        const n = units(await storyText(page), locale);
        expect(n, `${slug} ${locale} counted ${n}`).toBeLessThanOrEqual(STORY_BUDGET[locale].max);
      });

      test("03: each decision is told once outside the appendix", async ({ page }) => {
        expect(story, "story copy").toBeDefined();
        const copy = story![locale];
        await open(page, `/${locale}/projects/${slug}`);
        const text = await storyText(page);
        for (const d of copy.decisions) {
          await expect(page.locator(`[id="${d.id}"]`)).toHaveCount(1);
          expect(text.split(d.title).length - 1, d.title).toBe(1);
        }
      });
    });
  }
}

test("04: a link into the appendix opens it", async ({ page }) => {
  await open(page, "/en/projects/maze#red-team-defense");
  await expect(page.locator("details.case-appendix")).toHaveAttribute("open", "");
  await expect(page.locator("#red-team-defense")).toBeVisible();
});

test("09: first screen also holds problem and result on mobile", async ({ page }) => {
  await open(page, "/en/projects/maze", 375, 812);
  for (const sel of ["[data-story-problem]", "[data-story-result]"]) {
    const box = await page.locator(sel).boundingBox();
    expect(box!.y + box!.height).toBeLessThanOrEqual(812);
  }
});
