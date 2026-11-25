import { expect, test, type Page } from "@playwright/test";

// v6.4 design / interaction review fixes.

/** Text of each rendered line of an element, measured from per-character client rects. */
async function renderedLines(page: Page, selector: string): Promise<string[]> {
  return page.locator(selector).first().evaluate((el) => {
    const lines = new Map<number, string>();
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent ?? "";
      for (let i = 0; i < text.length; i += 1) {
        if (!text[i].trim()) continue;
        const range = document.createRange();
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const rect = range.getClientRects()[0];
        if (!rect) continue;
        const key = Math.round(rect.top / 4);
        lines.set(key, (lines.get(key) ?? "") + text[i]);
      }
    }
    return [...lines.entries()].sort((a, b) => a[0] - b[0]).map(([, t]) => t);
  });
}

test.describe("v6.4 UX review fixes", () => {
  // Lewis chose on 2026-11-25 to remove the floating "Rationale AI" pill: it covered the
  // home intro and the /contact submit button. AI stays at /ai and in Cmd+K.
  for (const [route, w, h] of [["/", 1440, 900], ["/contact", 375, 812], ["/zh/contact", 375, 812]] as const) {
    test(`no floating assistant button covers ${route} at ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto(route, { waitUntil: "networkidle" });
      await expect(page.locator(".studio-assistant-pill, .studio-assistant-wrap")).toHaveCount(0);
      await expect(page.getByRole("button", { name: /Rationale AI|查设计依据/ })).toHaveCount(0);
    });
  }

  test("home lists all six cases at once, no carousel", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".feat-deck")).toHaveCount(0);
    const cards = page.locator(".feat-grid .feat-card");
    await expect(cards).toHaveCount(6);
    for (const slug of ["maze", "walkie", "lamplight", "autofill", "onthebeat", "grassland"]) {
      const link = page.locator(`.feat-grid a[href="/projects/${slug}"]`).first();
      await link.scrollIntoViewIfNeeded();
      await expect(link, slug).toBeVisible();
    }
    // External repo / live links stay on the cards, as siblings of the card link.
    await expect(page.locator(".feat-grid a a")).toHaveCount(0);
    await expect(page.locator('.feat-grid .feat-actions a[href*="github.com/LewisSwan24/walkie"]')).toHaveCount(1);
  });

  test("zh home headline never leaves a single Han character alone on a line at 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/zh", { waitUntil: "networkidle" });
    const lines = await renderedLines(page, "section.hero h1");
    expect(lines.length).toBeGreaterThan(1);
    for (const line of lines) {
      const han = line.replace(/[^一-鿿]/g, "");
      expect(han.length, `orphaned line: ${JSON.stringify(lines)}`).not.toBe(1);
    }
    expect(lines.some((l) => l.includes("软硬件")), JSON.stringify(lines)).toBe(true);
  });
});
