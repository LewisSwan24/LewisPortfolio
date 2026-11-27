import { expect, test, type Browser, type Page } from "@playwright/test";

/**
 * v6.9 phase B (second full-site review): readable on a phone.
 * R01 diagrams open large, R03/R06 /blog topics fold, R07 /projects order,
 * R20 /about diagram, R21 /lab states + replay ticks, R23 /lab audit list.
 */

const PHONE = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } as const;
const DESKTOP = { viewport: { width: 1440, height: 900 } } as const;

async function open(browser: Browser, path: string, opts: object = PHONE) {
  const ctx = await browser.newContext({ ...opts, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(path, { waitUntil: "networkidle" });
  return { ctx, page };
}

/** Smallest rendered SVG label (px) inside `root`, measured from text boxes. */
function minLabelPx(page: Page, rootSelector: string) {
  return page.evaluate((sel) => {
    const root = document.querySelector(sel);
    if (!root) return -1;
    let min = Infinity;
    for (const t of root.querySelectorAll("svg text")) {
      const r = t.getBoundingClientRect();
      if (r.height === 0 || !t.textContent?.trim()) continue;
      const svg = (t as SVGTextElement).ownerSVGElement!;
      const vb = svg.viewBox.baseVal;
      const scale = vb && vb.width ? svg.getBoundingClientRect().width / vb.width : 1;
      const fs = parseFloat(getComputedStyle(t).fontSize) * scale;
      min = Math.min(min, fs);
    }
    return min === Infinity ? -1 : Math.round(min * 10) / 10;
  }, rootSelector);
}

test.describe("R01 case diagrams open at a readable size", () => {
  const CASES = ["/en/projects/gapmapper", "/zh/projects/rules", "/en/projects/spectra", "/en/projects/connect", "/zh/projects/walkie", "/en/projects/autofill"];

  for (const path of CASES) {
    test(`every small-text diagram has an enlarge button: ${path}`, async ({ browser }) => {
      test.setTimeout(60_000);
      const { ctx, page } = await open(browser, path);
      // Appendix diagrams count too.
      await page.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
      await page.waitForTimeout(400);
      const orphans = await page.evaluate(() => {
        const out: string[] = [];
        for (const svg of document.querySelectorAll("main svg")) {
          if (svg.closest(".cs-related, .case-build-media-stage, dialog")) continue;
          const vb = (svg as SVGSVGElement).viewBox.baseVal;
          const w = svg.getBoundingClientRect().width;
          if (!vb || !vb.width || w === 0) continue;
          const tiny = [...svg.querySelectorAll("text")].some(
            (t) => t.textContent?.trim() && parseFloat(getComputedStyle(t).fontSize) * (w / vb.width) < 11
          );
          if (tiny && !svg.closest("[data-diagram-zoom]")) out.push(`${svg.getAttribute("class") ?? ""} ${vb.width}x${vb.height}`);
        }
        return out;
      });
      expect(orphans, "diagrams with labels under 11px and no enlarge button").toEqual([]);
      await ctx.close();
    });
  }

  test("enlarging shows labels at 11px or more and scrolls sideways", async ({ browser }) => {
    for (const path of ["/en/projects/gapmapper", "/zh/projects/walkie"]) {
      const { ctx, page } = await open(browser, path);
      const trigger = page.locator("[data-diagram-zoom] [data-diagram-zoom-trigger]").first();
      await trigger.scrollIntoViewIfNeeded();
      await trigger.click();
      const dialog = page.locator("dialog[data-diagram-zoom-dialog][open]");
      await expect(dialog).toBeVisible();
      await page.waitForTimeout(300);
      expect(await minLabelPx(page, "dialog[data-diagram-zoom-dialog][open]"), path).toBeGreaterThanOrEqual(11);
      // The drawing starts at its left edge and the rest is reached by scrolling
      // (a centred flex stage pushed the left side out of reach).
      const edge = await page.evaluate(() => {
        const stage = document.querySelector("dialog[open] .diagram-zoom-stage")!;
        const svg = stage.querySelector("svg")!;
        return { left: svg.getBoundingClientRect().left - stage.getBoundingClientRect().left, scroll: stage.scrollLeft, over: stage.scrollWidth - stage.clientWidth };
      });
      expect(edge.left, `${path} drawing left edge inside the stage`).toBeGreaterThanOrEqual(0);
      expect(edge.scroll).toBe(0);
      expect(edge.over, `${path} stage scrolls sideways`).toBeGreaterThan(0);
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await ctx.close();
    }
  });

  test("gallery lightbox shows drawings at full size on a phone", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/en/projects/walkie");
    const trigger = page.locator(".case-build-trigger--overlay").first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    const img = page.locator(".case-lightbox[open] .case-lightbox-stage img");
    await expect(img).toBeVisible();
    const size = await img.evaluate((el: HTMLImageElement) => ({
      shown: el.getBoundingClientRect().width,
      natural: Number(el.getAttribute("width")),
      svg: el.src.endsWith(".svg"),
    }));
    expect(size.svg).toBe(true);
    expect(size.shown, "drawing keeps at least its natural width").toBeGreaterThanOrEqual(size.natural);
    await ctx.close();
  });
});

test.describe("R03/R06 /blog topics", () => {
  test("posts are above the fold and topic chips fold behind one button", async ({ browser }) => {
    for (const [path, label] of [["/en/blog", /^All topics \((\d+)\)$/], ["/zh/blog", /^全部主题 \((\d+)\)$/]] as const) {
      const { ctx, page } = await open(browser, path, DESKTOP);
      const firstPost = await page.evaluate(() => document.querySelector("main .idx-flag-title")!.getBoundingClientRect().top);
      expect(firstPost, `${path} first post top`).toBeLessThan(900);
      const toggle = page.getByRole("button", { name: label });
      await expect(toggle).toBeVisible();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      const n = Number(label.exec((await toggle.textContent())!.trim())![1]);
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      const chips = page.locator("[role=tablist] .idx-filter");
      await expect(chips).toHaveCount(n + 1); // + "All"
      await ctx.close();
    }
  });

  test("no tag duplicates a cluster name", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/en/blog", DESKTOP);
    const toggle = page.getByRole("button", { name: /^All topics/ });
    if (await toggle.count()) await toggle.click();
    await expect(page.locator("[role=tablist] .idx-filter", { hasText: /^CS x IxD$/ })).toHaveCount(0);
    await ctx.close();
  });

  // The 60 topic chips reflowed between rows when the web font replaced the
  // fallback (chip 715 -> 674px): CLS 0.17 on 2 of 3 first visits. The total
  // height did not change, so this measures the shift itself, over 3 cold loads.
  test("first visit does not shift (desktop, 3 cold loads)", async ({ browser }) => {
    test.setTimeout(60_000);
    const values: number[] = [];
    for (let i = 0; i < 3; i++) {
      const ctx = await browser.newContext(DESKTOP);
      await ctx.addInitScript(() => {
        (window as unknown as { __cls: number }).__cls = 0;
        new PerformanceObserver((list) => {
          for (const e of list.getEntries() as Array<PerformanceEntry & { value: number; hadRecentInput: boolean }>) {
            if (!e.hadRecentInput) (window as unknown as { __cls: number }).__cls += e.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
      });
      const page = await ctx.newPage();
      await page.goto("/en/blog", { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1500);
      values.push(await page.evaluate(() => (window as unknown as { __cls: number }).__cls));
      await ctx.close();
    }
    expect(Math.max(...values), `CLS per load: ${values.join(", ")}`).toBeLessThan(0.02);
  });
});

test.describe("R07 /projects on a phone", () => {
  for (const path of ["/en/projects", "/zh/projects"]) {
    test(`first case title is on the first screen: ${path}`, async ({ browser }) => {
      const { ctx, page } = await open(browser, path);
      const top = await page.evaluate(() => {
        const titles = [...document.querySelectorAll("main h2, main h3")].filter((h) => /MazeRunners|Walkie|Grassland|草原铁潮|Lamplight|Autofill|On The Beat/.test(h.textContent ?? ""));
        const visible = titles.find((h) => h.getBoundingClientRect().height > 0);
        return visible ? visible.getBoundingClientRect().bottom : Infinity;
      });
      expect(top).toBeLessThanOrEqual(844);
      // The Pattern Atlas card still exists, below the list.
      await expect(page.getByRole("link", { name: /Pattern Atlas|交互模式图谱/ }).filter({ visible: true })).toHaveCount(1);
      await ctx.close();
    });
  }
});

test.describe("R20 /about training diagram", () => {
  test("hidden on a phone, shown on desktop", async ({ browser }) => {
    const phone = await open(browser, "/en/about");
    // The drawing goes; its caption (the same facts in words) stays.
    await expect(phone.page.locator("main .editorial-svg-figure svg")).toBeHidden();
    await expect(phone.page.locator("main .editorial-svg-figure figcaption")).toBeVisible();
    await phone.ctx.close();
    const desk = await open(browser, "/en/about", DESKTOP);
    await expect(desk.page.locator("main .editorial-svg-figure svg")).toBeVisible();
    await desk.ctx.close();
  });
});

test.describe("R21 /lab states and replay ticks", () => {
  test("phone: each state of the graph has a button that selects it", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/en/lab");
    const buttons = page.locator("[data-testid^=fsm-state-btn-]");
    await expect(buttons.first()).toBeVisible();
    const nodes = await page.locator("#fsm-explorer svg g[transform]").count();
    await expect(buttons).toHaveCount(nodes);
    const second = buttons.nth(1);
    const label = (await second.textContent())!.trim();
    await second.click();
    await expect(page.getByTestId("fsm-active-state")).toHaveText(label);
    await expect(second).toHaveAttribute("aria-pressed", "true");
    await ctx.close();
  });

  test("replay timeline tick labels are at least 11px on phone and desktop", async ({ browser }) => {
    for (const opts of [PHONE, DESKTOP]) {
      const { ctx, page } = await open(browser, "/en/studio/replay", opts);
      await page.locator("[class*=waveformBox] svg").first().waitFor();
      const sizes = await page.evaluate(() => {
        const box = [...document.querySelectorAll("[class*=waveformBox]")].find((b) => b.getBoundingClientRect().width > 0)!;
        return [...box.querySelectorAll("*")]
          .filter((el) => /^\d+ms$/.test(el.textContent?.trim() ?? "") && el.children.length === 0)
          .map((el) => {
            if (el instanceof SVGTextElement) {
              const svg = el.ownerSVGElement!;
              return parseFloat(getComputedStyle(el).fontSize) * (svg.getBoundingClientRect().width / svg.viewBox.baseVal.width);
            }
            return parseFloat(getComputedStyle(el).fontSize);
          });
      });
      expect(sizes.length).toBeGreaterThan(1);
      expect(Math.min(...sizes)).toBeGreaterThanOrEqual(11);
      // No two labels touch.
      const overlaps = await page.evaluate(() => {
        const box = [...document.querySelectorAll("[class*=waveformBox]")].find((b) => b.getBoundingClientRect().width > 0)!;
        const rs = [...box.querySelectorAll("*")]
          .filter((el) => /^\d+ms$/.test(el.textContent?.trim() ?? "") && el.children.length === 0)
          .map((el) => el.getBoundingClientRect());
        let n = 0;
        for (let i = 0; i < rs.length; i++)
          for (let j = i + 1; j < rs.length; j++) {
            const a = rs[i], b = rs[j];
            if (a.left < b.right + 4 && b.left < a.right + 4 && a.top < b.bottom && b.top < a.bottom) n++;
          }
        return n;
      });
      expect(overlaps, "tick labels closer than 4px").toBe(0);
      await ctx.close();
    }
  });
});

test.describe("R23 /lab audit list on a phone", () => {
  test("shows 6 cards, then all after 'Show all'", async ({ browser }) => {
    for (const [path, name] of [["/en/lab", /^Show all \d+$/], ["/zh/lab", /^显示全部 \d+ 条$/]] as const) {
      const { ctx, page } = await open(browser, path);
      const cards = page.locator("[data-testid^=audit-card-]");
      const total = await cards.count();
      expect(total).toBeGreaterThan(6);
      await expect(cards.filter({ visible: true })).toHaveCount(6);
      await page.getByRole("button", { name }).click();
      await expect(cards.filter({ visible: true })).toHaveCount(total);
      await ctx.close();
    }
  });

  test("desktop still shows every card", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/en/lab", DESKTOP);
    const cards = page.locator("[data-testid^=audit-card-]");
    await expect(cards.filter({ visible: true })).toHaveCount(await cards.count());
    await ctx.close();
  });
});
