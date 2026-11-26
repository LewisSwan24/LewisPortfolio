import { expect, test, type Page } from "@playwright/test";

/**
 * v6.7: the seven unlisted cases take the v6.6 page layout with their copy
 * untouched (Lewis picked 「只換版面」 on 2026-11-26). First screen = problem,
 * result and role as one lede beside the cover; the long-form story and its
 * limits stay in the page; methods, evidence, process artifacts and the
 * interview pack move into one collapsed appendix.
 */

const UNLISTED = ["spectra", "rules", "gapmapper", "fencepost", "connect", "hoop", "pricewise"] as const;

async function open(page: Page, path: string, width = 1440, height = 900) {
  await page.setViewportSize({ width, height });
  await page.goto(path, { waitUntil: "networkidle" });
}

for (const slug of UNLISTED) {
  for (const locale of ["en", "zh"] as const) {
    test.describe(`v6.7 unlisted · /${locale}/projects/${slug}`, () => {
      test("first screen is a lede beside the cover, no boxed summary", async ({ page }) => {
        await open(page, `/${locale}/projects/${slug}`);
        await expect(page.locator("main[data-case-layout='lede']")).toHaveCount(1);
        for (const attr of ["data-story-problem", "data-story-result", "data-story-role"]) {
          const p = page.locator(`.cs-hero [${attr}]`);
          await expect(p).toHaveCount(1);
          expect((await p.textContent())?.trim().length ?? 0).toBeGreaterThan(10);
        }
        const problem = await page.locator(".cs-hero [data-story-problem]").boundingBox();
        expect(problem!.y + problem!.height).toBeLessThanOrEqual(900);
        const cover = await page.locator(".cs-hero .cs-cover img, .cs-hero .cs-cover svg").first().boundingBox();
        expect(cover!.y).toBeLessThan(900);
        // The boxed summary and the mood pill are gone from the page body.
        await expect(page.locator("main .case-summary:not(details.case-appendix .case-summary)")).toHaveCount(0);
        await expect(page.locator(".cs-hero .lab-pill-row")).toHaveCount(0);
      });

      test("story and limits stay in the page, the rest is one collapsed appendix", async ({ page }) => {
        await open(page, `/${locale}/projects/${slug}`);
        expect(await page.locator("main h2").count()).toBeLessThanOrEqual(7);
        const appendix = page.locator("details.case-appendix#for-interviewers");
        await expect(appendix).toHaveCount(1);
        expect(await appendix.getAttribute("open")).toBeNull();
        for (const id of ["long-form", "outcome-limits"]) {
          await expect(page.locator(`#${id}`)).toBeVisible();
          await expect(appendix.locator(`#${id}`)).toHaveCount(0);
        }
        await expect(appendix.locator(".case-interview-pack")).toHaveCount(1);
        await expect(appendix.locator("#snapshot")).toHaveCount(1);
        await expect(page.locator(`.cs-jump a[href="#for-interviewers"]`)).toHaveCount(1);
      });
    });
  }
}

test("a hash into the appendix opens it", async ({ page }) => {
  await open(page, "/projects/connect#interview-pack");
  await expect(page.locator("details.case-appendix")).toHaveAttribute("open", "");
  await expect(page.locator(".case-interview-pack")).toBeVisible();
});

test("unlisted pages do not overflow on mobile", async ({ page }) => {
  for (const slug of UNLISTED) {
    await open(page, `/projects/${slug}`, 390, 844);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, slug).toBeLessThanOrEqual(1);
  }
});
