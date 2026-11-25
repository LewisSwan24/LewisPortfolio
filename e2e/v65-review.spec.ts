import { expect, test, type Page } from "@playwright/test";

// v6.5 core-page fixes from the v6.4 design / UX review. Lewis ticked every item (「全部修」, 2026-11-25).

/** Text of each rendered line of an element, measured from per-character client rects. */
async function renderedLines(page: Page, selector: string, index = 0): Promise<string[]> {
  return page.locator(selector).nth(index).evaluate((el) => {
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

test.describe("v6.5 core review fixes", () => {
  test("C04: the home headline is not faded in from transparent", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const faded = await page.locator("section.hero h1").evaluate((h1) => {
      const out: string[] = [];
      for (let el: Element | null = h1; el; el = el.parentElement) {
        for (const anim of el.getAnimations()) {
          const frames = (anim.effect as KeyframeEffect | null)?.getKeyframes() ?? [];
          if (frames.some((f) => f.opacity !== undefined && Number(f.opacity) < 0.9)) {
            out.push(`${el.tagName}.${el.className}`);
          }
        }
      }
      return out;
    });
    expect(faded).toEqual([]);
  });

  test("C05: headline fits in four lines and the PDF CV link is in the first screen", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    const lines = await renderedLines(page, "section.hero h1");
    expect(lines.length, JSON.stringify(lines)).toBeLessThanOrEqual(4);
    const box = await page.locator(".hero-pdf-link").boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThanOrEqual(900);
  });

  test("C03: on a phone the hero shows one readable card, not an overlapping stack", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const route of ["/", "/zh"]) {
      await page.goto(route, { waitUntil: "networkidle" });
      const cards = await page.locator(".hero-deck .deck-card").evaluateAll((els) =>
        els
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return getComputedStyle(el).display !== "none" && r.width > 0 && r.height > 0;
          })
          .map((el) => ({
            w: el.getBoundingClientRect().width,
            overflowX: el.scrollWidth - el.clientWidth,
            overflowY: el.scrollHeight - el.clientHeight,
          })),
      );
      expect(cards, route).toHaveLength(1);
      expect(cards[0].w, route).toBeGreaterThanOrEqual(300);
      expect(cards[0].overflowX, route).toBeLessThanOrEqual(1);
      expect(cards[0].overflowY, route).toBeLessThanOrEqual(1);
      await expect(page.locator(".deck-counter")).toBeHidden();
    }
  });

  test("C14: the deck has one hint line, not two", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".deck-hint")).toHaveCount(0);
    await expect(page.locator(".deck-kbd")).toBeVisible();
  });

  test("C13: the specimen-axes scatter plot is gone from the home page", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".specimen-section")).toHaveCount(0);
  });

  for (const [w, visible] of [[1440, false], [1024, false], [375, true]] as const) {
    test(`C06: menu toggle ${visible ? "shows" : "is hidden"} at ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const toggle = page.locator(".pd-mobile-toggle");
      if (visible) await expect(toggle).toBeVisible();
      else await expect(toggle).toBeHidden();
    });
  }

  test("C07/C10: /hire is short; the interview material lives on /interview", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/hire", { waitUntil: "networkidle" });
    await expect(page.locator('[data-testid^="hire-market-"]')).toHaveCount(0);
    await expect(page.locator('main a[href="/contact"]').first()).toBeVisible();
    await expect(page.locator('main a[href="/resume"]').first()).toBeVisible();
    await expect(page.locator('main a[href="/interview"]').first()).toBeAttached();
    const height = await page.evaluate(() => document.querySelector("main")!.scrollHeight);
    expect(height / 812).toBeLessThan(10);

    await page.goto("/interview", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("#hire-decks-heading")).toBeAttached();
  });

  for (const [w, h] of [[375, 812], [1440, 900]] as const) {
    test(`C09: zh /hire headings never leave one Han character alone at ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      for (const route of ["/zh/hire", "/zh/interview"]) {
        await page.goto(route, { waitUntil: "networkidle" });
        const count = await page.locator("main h1, main h2, main h3").count();
        for (let i = 0; i < count; i += 1) {
          const lines = await renderedLines(page, "main h1, main h2, main h3", i);
          for (const line of lines) {
            const han = line.replace(/[^一-鿿]/g, "");
            expect(han.length === 1 && line.trim().length <= 2, `${route} orphan: ${JSON.stringify(lines)}`).toBe(false);
          }
        }
      }
    });
  }

  test("C12: the zh header links to the resume by name", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/zh", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".pd-nav-links").getByRole("link", { name: "招聘与简历" })).toBeVisible();
  });

  test("C17: /resume leads with the name and the role, and offers Tailor CV", async ({ page }) => {
    await page.goto("/resume", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1")).toContainText("Lewis Dong");
    await expect(page.locator("main h1")).toContainText("Interaction & Product Designer");
    await expect(page.getByRole("link", { name: /Tailor CV/ })).toBeVisible();
    await page.goto("/zh/resume", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1")).toContainText("交互与产品设计师");
  });

  for (const [w, h] of [[1440, 900], [375, 812]] as const) {
    test(`C18: block links on /resume and /contact are at least 24px tall at ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      for (const route of ["/resume", "/contact", "/zh/resume", "/zh/contact"]) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        const small = await page.locator("main a, main button").evaluateAll((els) =>
          els
            .filter((el) => {
              const r = el.getBoundingClientRect();
              if (r.width === 0 || r.height === 0) return false;
              // Links inside a sentence are exempt (WCAG 2.5.8 inline exception), except the
              // stand-alone hint link on /contact, which reads as a button.
              const inline = getComputedStyle(el).display === "inline" && !el.closest(".contact-hire-hint");
              return !inline && r.height < 24;
            })
            .map((el) => `${el.textContent?.trim().slice(0, 30)} ${Math.round(el.getBoundingClientRect().height)}px`),
        );
        expect(small, route).toEqual([]);
      }
    });
  }

  test("C19: zh labels are at least 12px", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const route of ["/zh", "/zh/hire"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const small = await page.locator("main .label, main small").evaluateAll((els) =>
        els
          .filter((el) => el.getBoundingClientRect().width > 0 && parseFloat(getComputedStyle(el).fontSize) < 12)
          .map((el) => `${el.textContent?.trim().slice(0, 20)} ${getComputedStyle(el).fontSize}`),
      );
      expect(small, route).toEqual([]);
    }
  });

  test("C20: /hire buttons keep at least 16px from the text above", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/hire", { waitUntil: "domcontentloaded" });
    const gap = await page.locator(".interview-room-primary-actions").evaluate((el) => {
      const prev = el.previousElementSibling!;
      return el.getBoundingClientRect().top - prev.getBoundingClientRect().bottom;
    });
    expect(gap).toBeGreaterThanOrEqual(16);
  });
});
