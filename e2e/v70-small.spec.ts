import { expect, test, type Browser, type Page } from "@playwright/test";

/**
 * v7.0 block 3: the small items left from the v6.9 review (Lewis 28 Nov 2026,
 * 「14 項照建議全做」). Plan: side-session-notes v7-0-block3-plan.md.
 */

const PHONE = { width: 390, height: 844 };

async function h1Lines(browser: Browser, path: string, width: number, blockFonts: boolean) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  if (blockFonts) await page.route(/\.woff2?$/, (r) => r.abort());
  await page.goto(path, { waitUntil: "networkidle" });
  if (!blockFonts) await page.evaluate(() => document.fonts.ready);
  const lines = await page.evaluate(() => {
    const h = document.querySelector("main h1") as HTMLElement;
    return Math.round(h.getBoundingClientRect().height / parseFloat(getComputedStyle(h).lineHeight));
  });
  await ctx.close();
  return lines;
}

test("R05 /lab headline keeps its line count when the web font loads", async ({ browser }) => {
  test.setTimeout(90_000);
  for (const width of [1024, 1280, 1440, 1680]) {
    const web = await h1Lines(browser, "/lab", width, false);
    const fallback = await h1Lines(browser, "/lab", width, true);
    expect(fallback, `@${width}`).toBe(web);
  }
});

test("R24 /studio/replay headline is at most three lines on desktop", async ({ browser }) => {
  test.setTimeout(60_000);
  for (const width of [1024, 1280, 1440]) {
    expect(await h1Lines(browser, "/studio/replay", width, false), `@${width}`).toBeLessThanOrEqual(3);
  }
});

test.describe("R25 /lab lead in plain words", () => {
  test("en", async ({ page }) => {
    await page.goto("/lab");
    const lead = page.locator(".lab-hero .sub");
    await expect(lead).not.toContainText("V4 Swiss Editorial");
    await expect(lead).not.toContainText("paper-motion curve layer");
    await expect(lead).toContainText("three projects");
  });
  test("zh", async ({ page }) => {
    await page.goto("/zh/lab");
    const lead = page.locator(".lab-hero .sub");
    await expect(lead).not.toContainText("V4 Swiss Editorial");
    await expect(lead).toContainText("三个项目");
  });
});

/** Visible text below 11px, as "path: text (size)". */
async function tinyText(page: Page) {
  return page.evaluate(() => {
    const out: string[] = [];
    const walker = document.createTreeWalker(document.querySelector("main") ?? document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set<Element>();
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const el = n.parentElement;
      if (!el || seen.has(el) || !n.textContent?.trim()) continue;
      seen.add(el);
      if (el.closest("svg, [aria-hidden='true'], .sr-only")) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const size = parseFloat(getComputedStyle(el).fontSize);
      if (size < 11) out.push(`${n.textContent.trim().slice(0, 30)} (${size}px)`);
    }
    return out;
  });
}

test.describe("R26 no UI text below 11px", () => {
  for (const path of ["/", "/hire", "/interview", "/contact", "/projects", "/projects/walkie", "/zh/hire", "/zh/projects/walkie"]) {
    for (const viewport of [PHONE, { width: 1440, height: 900 }]) {
      test(`${path} @${viewport.width}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto(path, { waitUntil: "networkidle" });
        expect(await tinyText(page)).toEqual([]);
      });
    }
  }

  test("/vault lineage graph tags", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/vault#lineage-graph", { waitUntil: "networkidle" });
    expect(await tinyText(page)).toEqual([]);
  });
});

test("R27 blog author links are at least 24px tall", async ({ page }) => {
  await page.goto("/blog/ux-research-methods-guide");
  const links = page.locator(".blog-bio-links a");
  expect(await links.count()).toBeGreaterThan(1);
  for (const h of await links.evaluateAll((as) => as.map((a) => a.getBoundingClientRect().height))) {
    expect(h).toBeGreaterThanOrEqual(24);
  }
});

test("R28 /hire shows the link to copy by hand when the clipboard fails", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("blocked")) },
      configurable: true,
    });
  });
  await page.goto("/hire");
  await page.getByRole("button", { name: /Copy tailored link/ }).click();
  const field = page.getByRole("textbox", { name: /link/i });
  await expect(field).toBeVisible();
  await expect(field).toHaveValue(/\/hire/);
});

test("R29 Spectra cover draws its settings as labels, not pill buttons", async ({ page }) => {
  await page.goto("/projects/spectra");
  const svg = page.locator(".viz-spectra svg").first();
  await expect(svg).toBeAttached();
  await expect(svg.locator('rect[rx="13"]')).toHaveCount(0);
  await expect(svg.locator("text", { hasText: "LETTER" })).toHaveCount(1);
});

test.describe("R30 home hero card and label", () => {
  test("no line carries two markers", async ({ page }) => {
    await page.goto("/");
    const doubled = await page.locator(".dc-body li").evaluateAll((lis) =>
      lis
        .filter((li) => li.textContent?.trim().startsWith("→"))
        .filter((li) => getComputedStyle(li, "::before").display !== "none")
        .map((li) => li.textContent?.slice(0, 30))
    );
    expect(doubled).toEqual([]);
  });
  test("the label uses the site's own words", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".hero-focus-strip > span").first()).toHaveText("Education · Skills");
    await page.goto("/zh");
    await expect(page.locator(".hero-focus-strip > span").first()).toHaveText("教育经历 · 技能");
  });
});

test.describe("R31 tab titles", () => {
  test("/interview names Lewis once", async ({ page }) => {
    await page.goto("/interview");
    expect((await page.title()).match(/Lewis Dong/g)?.length).toBe(1);
    await page.goto("/zh/interview");
    expect((await page.title()).match(/Lewis Dong/g)?.length).toBe(1);
  });
  test("the 404 tab says not found", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    expect(await page.title()).toMatch(/^404/);
  });
});

async function sameLine(page: Page, selector: string, text: string) {
  return page.locator(selector).first().evaluate((el, text) => {
    const full = el.textContent ?? "";
    const start = full.indexOf(text);
    if (start < 0) return `missing ${text}`;
    // Walk text nodes to build a range over the phrase.
    const range = document.createRange();
    let pos = 0;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let set = 0;
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const len = n.textContent!.length;
      if (!set && start < pos + len) { range.setStart(n, start - pos); set = 1; }
      if (set && start + text.length <= pos + len) { range.setEnd(n, start + text.length - pos); break; }
      pos += len;
    }
    const tops = new Set([...range.getClientRects()].map((r) => Math.round(r.top)));
    return tops.size === 1 ? "one line" : `split over ${tops.size} lines`;
  }, text);
}

test.describe("R32 zh headings do not split their phrases", () => {
  test("/zh/about h1 on a phone keeps 「让人能找到路」 together", async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("/zh/about");
    await page.evaluate(() => document.fonts.ready);
    expect(await sameLine(page, "main h1", "让人能找到路")).toBe("one line");
  });
  test("/zh/hire lens heading keeps 直接筛出 together", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/zh/hire");
    await page.evaluate(() => document.fonts.ready);
    expect(await sameLine(page, "#role-lens-heading", "直接筛出")).toBe("one line");
  });
});

test("R33 zh connect role line ends with a full stop", async ({ page }) => {
  await page.goto("/zh/projects/connect");
  await expect(page.getByText(/71 场研究与测试里的 14 场。/).first()).toBeAttached();
});

test("/lab audit counter on a phone counts the cards it shows", async ({ page }) => {
  await page.setViewportSize(PHONE);
  await page.goto("/lab");
  const status = page.getByTestId("heuristic-count-status");
  await expect(status).toHaveText(/Showing 6 of \d+/);
  await page.getByRole("button", { name: /^Show all \d+$/ }).click();
  const total = Number((await status.textContent())!.match(/of (\d+)/)![1]);
  await expect(status).toHaveText(new RegExp(`Showing ${total} of ${total}`));
});

test.describe("role label and leftovers", () => {
  test("OG image and /about diagram drop 'Design Engineering'", async ({ page, request }) => {
    await page.goto("/about");
    await expect(page.locator("main")).not.toContainText("Design Engineering Proof");
    const og = await request.get("/opengraph-image");
    expect(og.status()).toBe(200);
  });
  test("/lab chart label is plain", async ({ page }) => {
    await page.goto("/lab");
    await expect(page.locator('[aria-label*="specimen coordinate frame"]')).toHaveCount(0);
  });
  test("zh vault card footer is in Chinese", async ({ page }) => {
    await page.goto("/zh/vault");
    const card = page.locator('[data-testid^="vault-card-"]').first();
    await card.locator("details > summary").click();
    await expect(card).not.toContainText("Unlisted");
  });
});
