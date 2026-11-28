import { expect, test, type Page } from "@playwright/test";

/**
 * v6.7.1: the two tests that failed now and then in CI (v48 CLS on /patterns,
 * v55 focus-obscured on /hire) were each catching a real page bug. These pin
 * the bugs themselves, so they fail every time instead of only on a slow run.
 */

// /patterns used to server-render a 232px placeholder for the live sandbox and
// load the real widget (about 687px) only after hydration. On a slow CI runner
// that landed after networkidle, mid-scroll, and pushed the page down (CLS 0.316).
// The lazy widget also made the server send a plain list first and swap in the
// workbench a moment later, a ~0.024 shift on most loads.
for (const path of ["/en/patterns", "/zh/patterns", "/en/patterns?pattern=default-safe-focus-lock"]) {
  test(`the live sandbox is in the server HTML of ${path}`, async ({ request }) => {
    const html = await (await request.get(path)).text();
    expect(html).toContain('data-testid="pattern-live-sandbox"');
    expect(html).not.toContain("case-sim-skeleton");
    expect(html).not.toContain("BAILOUT_TO_CLIENT_SIDE_RENDERING");
    expect(html).not.toContain("pattern-ssr-list");
  });
}

async function focusSkipLink(page: Page, route: string, browserName: string) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route, { waitUntil: "networkidle" });
  await page.locator("body").focus();
  if (browserName === "webkit") {
    // Safari's Tab skips links unless "Press Tab to highlight each item" is
    // on, and Playwright's WebKit has no way to turn it on. Focus it directly:
    // what this test checks is where the focused link sits.
    await page.locator(".skip-link").focus();
  } else {
    await page.keyboard.press("Tab");
  }
  // Let the slide-in transition finish before measuring.
  await page.evaluate(() =>
    Promise.all((document.activeElement?.getAnimations() ?? []).map((a) => a.finished)),
  );
}

for (const route of ["/en", "/en/hire", "/zh/patterns"]) {
  test(`the focused skip link is readable and above the nav on ${route}`, async ({ page, browserName }) => {
    await focusSkipLink(page, route, browserName);
    const probe = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const r = el.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return {
        isSkip: el.classList.contains("skip-link"),
        width: r.width,
        height: r.height,
        top: r.top,
        onTop: !!hit && (hit === el || el.contains(hit)),
        hit: hit ? `${hit.tagName}.${String(hit.className).slice(0, 30)}` : null,
      };
    });
    expect(probe.isSkip).toBe(true);
    expect(probe.width, JSON.stringify(probe)).toBeGreaterThanOrEqual(24);
    expect(probe.height, JSON.stringify(probe)).toBeGreaterThanOrEqual(24);
    expect(probe.top, JSON.stringify(probe)).toBeGreaterThanOrEqual(0);
    expect(probe.onTop, JSON.stringify(probe)).toBe(true);
  });
}
