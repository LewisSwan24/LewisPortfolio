import { expect, test, type Page } from "@playwright/test";

/**
 * v7.0 P1-a (Lewis 28 Nov 2026, 「P1-a CSS reveal」): case pages reveal the journey
 * rail and rejection archive with CSS scroll-driven animation instead of GSAP.
 * The profile put GSAP's style reads at about 250 ms on a 4x-slowed phone.
 */

const CASES = ["/projects/walkie", "/zh/projects/onthebeat", "/projects/maze"];

async function gsapScripts(page: Page, path: string) {
  const hits: string[] = [];
  page.on("response", async (res) => {
    const url = res.url();
    if (!url.includes("/_next/static/chunks/") || !url.endsWith(".js")) return;
    try {
      const body = await res.text();
      // `_gsap` is the cache property GSAP core and its plugins put on targets;
      // a page chunk that only names ScrollTrigger in an import does not have it.
      if (body.includes("_gsap")) hits.push(url.split("/").pop()!);
    } catch {
      // body gone after navigation; ignore
    }
  });
  await page.goto(path, { waitUntil: "networkidle" });
  // Open the appendix and scroll through, so anything lazy gets its chance to load.
  await page.evaluate(() => document.querySelectorAll("details").forEach((d) => ((d as HTMLDetailsElement).open = true)));
  for (let y = 0; y < 30; y++) {
    // scrollBy, not mouse.wheel: Playwright has no wheel in mobile WebKit.
    await page.evaluate(() => window.scrollBy(0, 1200));
    await page.waitForTimeout(60);
  }
  await page.waitForLoadState("networkidle");
  return hits;
}

for (const path of CASES) {
  test(`${path} loads no GSAP and has no GSAP-driven reveal`, async ({ page }) => {
    await page.setViewportSize({ width: 412, height: 823 });
    expect(await gsapScripts(page, path)).toEqual([]);
    await expect(page.locator("[data-motion-mode]")).toHaveCount(0);
  });
}

test("the rail items end fully visible, and do not animate under reduced motion", async ({ browser }) => {
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion });
    const page = await ctx.newPage();
    await page.goto("/projects/walkie#for-interviewers", { waitUntil: "networkidle" });
    const items = page.locator("[data-css-reveal] [data-focus-item]");
    expect(await items.count(), reducedMotion).toBeGreaterThan(2);
    const last = items.last();
    await last.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(600);
    const s = await last.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { opacity: Number(cs.opacity), anim: cs.animationName };
    });
    expect(s.opacity, reducedMotion).toBeGreaterThanOrEqual(0.99);
    if (reducedMotion === "reduce") expect(s.anim).toBe("none");
    await ctx.close();
  }
});
