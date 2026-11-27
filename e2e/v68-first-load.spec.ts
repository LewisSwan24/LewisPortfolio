import { expect, test, type Browser } from "@playwright/test";

/**
 * v6.8 phase A: the first visit must not jump when the web fonts arrive.
 *
 * The hero h1 was capped at 15ch (20ch on posts). `ch` is the width of "0" in
 * whichever font is rendering, and the Space Grotesk fallback's "0" is about 6%
 * narrower, so the box itself narrowed until the font loaded. On /en/patterns at
 * 1280px that made the headline 4 lines instead of 3, then 3 again: a 0.024
 * layout shift on every first visit.
 */

const PAGES = ["/en/patterns", "/en/projects/walkie", "/zh/projects/maze", "/en/blog/accessibility-in-design"];

async function heroBox(browser: Browser, path: string, width: number, blockFonts: boolean) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  if (blockFonts) await page.route(/\.woff2?$/, (r) => r.abort());
  await page.goto(path, { waitUntil: "networkidle" });
  if (!blockFonts) await page.evaluate(() => document.fonts.ready);
  const box = await page.evaluate(() => {
    const h1 = document.querySelector(".cs-hero h1") as HTMLElement;
    return { maxWidth: getComputedStyle(h1).maxWidth, height: h1.getBoundingClientRect().height };
  });
  await ctx.close();
  return box;
}

for (const path of PAGES) {
  test(`hero h1 width does not depend on the loaded font: ${path}`, async ({ browser }) => {
    // Six full page loads in one test: 9 s locally, past the 30 s default on a
    // slow CI runner (PR #35, run 45940926994).
    test.setTimeout(90_000);
    for (const width of [768, 1280, 1440]) {
      const web = await heroBox(browser, path, width, false);
      const fallback = await heroBox(browser, path, width, true);
      expect(fallback.maxWidth, `${path} @${width}`).toBe(web.maxWidth);
    }
  });
}

test("/en/patterns headline keeps its line count when the font loads", async ({ browser }) => {
  test.setTimeout(120_000); // eight full page loads
  for (const width of [768, 1024, 1280, 1440]) {
    const web = await heroBox(browser, "/en/patterns", width, false);
    const fallback = await heroBox(browser, "/en/patterns", width, true);
    // Same line count; allow sub-pixel rounding between the two fonts.
    expect(Math.abs(fallback.height - web.height), `@${width}: ${fallback.height} vs ${web.height}`).toBeLessThan(1);
  }
});
