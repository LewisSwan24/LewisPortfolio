import { expect, test, type Page } from "@playwright/test";

/**
 * v6.5 case-page review fixes (docs/reviews/2026-11-ux-review.md,
 * table 「待你勾選：6 個案例頁」, rows 05, 07, 08, 10 to 22).
 */

const SLUGS = ["maze", "walkie", "lamplight", "autofill", "onthebeat", "grassland"] as const;

async function open(page: Page, path: string, width = 1440, height = 900) {
  await page.setViewportSize({ width, height });
  await page.goto(path, { waitUntil: "networkidle" });
}

async function loadSimulator(page: Page) {
  const frame = page.locator("#interactive-demo");
  await frame.scrollIntoViewIfNeeded();
  const stage = frame.locator(".case-sim-stage");
  // Scrolling near the frame mounts it on its own; the button is a fallback.
  if ((await stage.getAttribute("data-mounted")) !== "true") {
    await frame
      .getByRole("button", { name: /Load interactive prototype|立即加载体验/ })
      .click({ timeout: 3000 })
      .catch(() => undefined);
  }
  await expect(stage).toHaveAttribute("data-mounted", "true");
}

test.describe("v6.5 case review fixes", () => {
  test("05: the Case Reader Lens switcher is gone (en + zh)", async ({ page }) => {
    await open(page, "/en/projects/walkie");
    await expect(page.getByText("Case Reader Lens")).toHaveCount(0);
    await expect(page.getByRole("group", { name: "Choose review lens" })).toHaveCount(0);
    await expect(page.getByTestId("case-lens-callout")).toHaveCount(0);

    await open(page, "/zh/projects/walkie");
    await expect(page.getByText("审阅视角切换器")).toHaveCount(0);
  });

  test("07: text before/after renders as two whole cards, side by side on desktop and stacked on mobile", async ({
    page,
  }) => {
    // v6.6: the before/after cards sit in the collapsed appendix; the hash opens it.
    await open(page, "/en/projects/maze#process-artifacts");
    const stage = page.locator("#process-artifacts");
    await expect(stage.locator("[role='slider']")).toHaveCount(0);
    const cards = stage.locator(".proc-compare > figure");
    await expect(cards).toHaveCount(2);
    await cards.first().scrollIntoViewIfNeeded();
    const [a, b] = [await cards.nth(0).boundingBox(), await cards.nth(1).boundingBox()];
    expect(a && b).toBeTruthy();
    expect(Math.abs(a!.y - b!.y)).toBeLessThanOrEqual(2);
    expect(b!.x).toBeGreaterThanOrEqual(a!.x + a!.width - 1);

    await open(page, "/en/projects/maze#process-artifacts", 375, 812);
    const m = page.locator("#process-artifacts .proc-compare > figure");
    await m.first().scrollIntoViewIfNeeded();
    const [c, d] = [await m.nth(0).boundingBox(), await m.nth(1).boundingBox()];
    expect(d!.y).toBeGreaterThanOrEqual(c!.y + c!.height - 1);
  });

  for (const slug of SLUGS) {
    test(`08: /en/projects/${slug} side TOC follows page order with no duplicate labels`, async ({
      page,
    }) => {
      await open(page, `/en/projects/${slug}`);
      const result = await page.evaluate(() => {
        const links = [...document.querySelectorAll<HTMLAnchorElement>(".cs-jump ol a")];
        const ids = links.map((a) => a.getAttribute("href")!.slice(1));
        const labels = links.map((a) => (a.textContent ?? "").trim().toLowerCase());
        const missing = ids.filter((id) => !document.getElementById(id));
        let outOfOrder: string[] = [];
        for (let i = 1; i < ids.length; i += 1) {
          const prev = document.getElementById(ids[i - 1]!);
          const next = document.getElementById(ids[i]!);
          if (!prev || !next) continue;
          if (!(prev.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING)) {
            outOfOrder = [...outOfOrder, `${ids[i - 1]} > ${ids[i]}`];
          }
        }
        return { missing, outOfOrder, dupes: labels.filter((l, i) => labels.indexOf(l) !== i) };
      });
      expect(result.missing).toEqual([]);
      expect(result.outOfOrder).toEqual([]);
      expect(result.dupes).toEqual([]);
    });
  }

  test("10: research-vault and red-team tabs wrap inside a 375px viewport", async ({ page }) => {
    await open(page, "/en/projects/walkie", 375, 812);
    const overflow = await page.evaluate(() =>
      [...document.querySelectorAll("#research-vault [role='tab'], #red-team-defense [role='tab']")]
        .filter((tab) => {
          const el = tab as HTMLElement;
          const box = el.getBoundingClientRect();
          return el.scrollWidth > el.clientWidth + 1 || box.right > window.innerWidth;
        })
        .map((tab) => (tab.textContent ?? "").trim())
    );
    expect(overflow).toEqual([]);
  });

  test("11: the lab card no longer claims to be interactive and lab entries are text links", async ({
    page,
  }) => {
    await open(page, "/en/projects/walkie");
    await expect(page.getByRole("heading", { name: /Interactive State Machine/i })).toHaveCount(0);
    const labLink = page.locator('main a[href*="/lab?demo=walkie"]');
    await expect(labLink).toHaveCount(1);
    await expect(labLink).not.toHaveClass(/\bbtn\b/);

    await open(page, "/zh/projects/walkie");
    await expect(page.getByRole("heading", { name: /交互状态机/ })).toHaveCount(0);

    await open(page, "/en/projects/maze");
    const replay = page.locator('main a[href*="/studio/replay"]');
    await expect(replay).toHaveCount(1);
    await expect(replay).not.toHaveClass(/\bbtn\b/);
  });

  test("12: on a 375px screen the maze hero shows a readable photo and no overlay callout", async ({
    page,
  }) => {
    await open(page, "/en/projects/maze", 375, 812);
    await expect(page.locator(".cs-cover figcaption")).toBeHidden();
    await expect(page.locator(".cs-cover .viz")).toBeHidden();
    await expect(page.locator(".cs-cover img")).toBeVisible();

    // v6.6 (review row 09): the desktop first screen also shows the real photo.
    await open(page, "/en/projects/maze");
    await expect(page.locator(".cs-cover img")).toBeVisible();
  });

  test("13: zh case headings balance and paragraphs avoid orphans", async ({ page }) => {
    await open(page, "/zh/projects/maze");
    const styles = await page.evaluate(() => {
      const wrap = (sel: string) => {
        const el = document.querySelector(sel);
        if (!el) return "missing";
        const cs = getComputedStyle(el) as CSSStyleDeclaration & { textWrapStyle?: string };
        return `${cs.textWrapStyle ?? ""} ${cs.getPropertyValue("text-wrap")}`;
      };
      return { h2: wrap("#problem h2"), h3: wrap("#outcome-limits h3"), p: wrap("#problem p") };
    });
    expect(styles.h2).toContain("balance");
    expect(styles.h3).toContain("balance");
    expect(styles.p).toContain("pretty");
  });

  for (const slug of ["onthebeat", "grassland", "maze"] as const) {
    test(`14: /en/projects/${slug} simulator frame height follows its content`, async ({ page }) => {
      await open(page, `/en/projects/${slug}`);
      await loadSimulator(page);
      const gap = await page.evaluate(() => {
        const stage = document.querySelector("#interactive-demo .case-sim-stage") as HTMLElement;
        const leaves = [...stage.querySelectorAll<HTMLElement>("*")].filter(
          (el) => el.children.length === 0 && el.getClientRects().length > 0
        );
        const contentBottom = Math.max(...leaves.map((el) => el.getBoundingClientRect().bottom));
        return stage.getBoundingClientRect().bottom - contentBottom;
      });
      // Stage padding is about 32px; the old 700px floor left 280 to 420px.
      expect(gap).toBeLessThanOrEqual(48);
    });
  }

  test("15: the research quote cards have no filter", async ({ page }) => {
    await open(page, "/en/projects/maze");
    await expect(page.getByRole("group", { name: "Filter research quotes" })).toHaveCount(0);
    await open(page, "/zh/projects/maze");
    await expect(page.getByRole("group", { name: "筛选调研原声" })).toHaveCount(0);
  });

  for (const slug of SLUGS) {
    test(`16: /en/projects/${slug} journey progress labels are not truncated`, async ({ page }) => {
      await open(page, `/en/projects/${slug}`);
      const cut = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("#journey-map [class*='trackerTitle']")]
          .filter((el) => el.scrollWidth > el.clientWidth + 1)
          .map((el) => el.textContent)
      );
      expect(cut).toEqual([]);
    });
  }

  for (const slug of SLUGS) {
    test(`17: /en/projects/${slug} has at most one primary button outside the running simulator`, async ({
      page,
    }) => {
      await open(page, `/en/projects/${slug}`);
      const primaries = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("main .btn-primary")]
          .filter((el) => !el.closest(".case-sim-stage[data-mounted='true']"))
          .filter((el) => el.getClientRects().length > 0)
          .map((el) => (el.textContent ?? "").trim())
      );
      expect(primaries.length, primaries.join(" | ")).toBeLessThanOrEqual(1);
    });
  }

  test.describe("17: touch devices", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    test("hide the Shift+P shortcut hint", async ({ page }) => {
      await page.goto("/en/projects/walkie", { waitUntil: "networkidle" });
      const trigger = page.getByRole("button", { name: /Presentation mode/i });
      await expect(trigger).toBeVisible();
      await expect(trigger).not.toContainText("Shift+P", { useInnerText: true });
    });
  });

  test("18: On The Beat simulator shows every option neutral before the first pick", async ({ page }) => {
    await open(page, "/en/projects/onthebeat");
    await loadSimulator(page);
    const stage = page.locator("#interactive-demo .case-sim-stage");
    await expect(stage.locator(".btn-primary")).toHaveCount(0);
    await expect(stage.locator("[aria-pressed='true'], .active")).toHaveCount(0);
  });

  for (const slug of SLUGS) {
    test(`19: /zh/projects/${slug} eyebrows do not tack an English line onto Chinese`, async ({
      page,
    }) => {
      await open(page, `/zh/projects/${slug}`);
      const mixed = await page.evaluate(() =>
        [...document.querySelectorAll("main .eyebrow, main .label, main [class*='eyebrow']")]
          .map((el) => (el.textContent ?? "").trim())
          .filter((text) => {
            const parts = text.split("·").map((p) => p.trim());
            const hasHan = parts.some((p) => /[一-鿿]/.test(p));
            const latinOnly = parts.some((p) => /^[A-Za-z0-9 &'-]{6,}$/.test(p) && /[A-Za-z]{3}/.test(p));
            return hasHan && latinOnly;
          })
      );
      expect(mixed).toEqual([]);
    });
  }

  for (const slug of SLUGS) {
    test(`20: /en/projects/${slug} evidence links name their section and stay on the page`, async ({
      page,
    }) => {
      await open(page, `/en/projects/${slug}`);
      const bad = await page.evaluate((current) => {
        const links = [
          ...document.querySelectorAll<HTMLAnchorElement>(
            "#interview-pack .case-interview-meta a, #red-team-defense a"
          ),
        ];
        // Red-team panel only renders the active lens; that is enough here.
        return links
          .map((a) => ({ href: a.getAttribute("href") ?? "", text: (a.textContent ?? "").trim() }))
          .filter(({ href, text }) => {
            const samePage = href.includes(`/projects/${current}#`);
            const generic = /Inspect the evidence|Inspect source evidence/i.test(text);
            const anchorOk = !href.startsWith("#") || Boolean(document.getElementById(href.slice(1)));
            return samePage || generic || !anchorOk;
          });
      }, slug);
      expect(bad).toEqual([]);
      const anchors = page.locator("#interview-pack .case-interview-meta a[href^='#']");
      expect(await anchors.count()).toBeGreaterThan(0);
    });
  }

  test("21: breadcrumb links are at least 24px tall", async ({ page }) => {
    await open(page, "/en/projects/maze");
    const heights = await page
      .locator(".cs-breadcrumb a")
      .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
    expect(heights.length).toBeGreaterThan(0);
    for (const h of heights) expect(h).toBeGreaterThanOrEqual(24);
  });

  test("22: interview pack sits on the main grid with a left-aligned heading", async ({ page }) => {
    // v6.6: the pack sits in the collapsed appendix; the hash opens it.
    await open(page, "/en/projects/maze#interview-pack");
    const m = await page.evaluate(() => {
      const left = (sel: string) => document.querySelector(sel)!.getBoundingClientRect().left;
      return {
        title: left("#interview-pack-title"),
        label: left(".case-interview-pack-head .label"),
        grid: left("#outcome-limits"),
        align: getComputedStyle(document.querySelector("#interview-pack-title")!).textAlign,
      };
    });
    expect(Math.abs(m.title - m.grid)).toBeLessThanOrEqual(2);
    expect(Math.abs(m.title - m.label)).toBeLessThanOrEqual(2);
    expect(["left", "start"]).toContain(m.align);
  });
});
