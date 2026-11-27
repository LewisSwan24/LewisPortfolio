import { expect, test, type Browser } from "@playwright/test";

/**
 * v6.9 phase A (second full-site review, findings R02, R04, R18, R19, R22).
 * Facts and stability only: no copy changes.
 */

test.describe("R02 lineage graph column counts", () => {
  for (const path of ["/en/studio/graph", "/zh/studio/graph"]) {
    test(`each column header counts the nodes it heads: ${path}`, async ({ page }) => {
      await page.goto(path);
      const result = await page.evaluate(() => {
        const layers = ["vault", "flagship", "pattern", "cluster"];
        const headers = [...document.querySelectorAll("[class*=colHeader]:not([class*=colHeaderRow])")]
          .map((el) => el.textContent?.trim() ?? "")
          .filter((t) => /\(\d+\)$/.test(t));
        return layers.map((layer, i) => ({
          layer,
          header: headers[i],
          said: Number(/\((\d+)\)$/.exec(headers[i] ?? "")?.[1]),
          nodes: document.querySelectorAll(`[data-testid^="graph-node-${layer}:"]`).length,
        }));
      });
      for (const col of result) {
        expect(col.nodes, `${col.layer} has nodes`).toBeGreaterThan(0);
        expect(col.said, `${col.layer}: "${col.header}"`).toBe(col.nodes);
      }
    });
  }
});

test.describe("R22 hardware twin toggle", () => {
  test("no 'Restore 3D' button when 3D cannot run (reduced motion)", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    for (const path of ["/en/studio/replay", "/zh/studio/replay"]) {
      await page.goto(path);
      await expect(page.getByTestId("hardware-twin-svg")).toBeVisible();
      await expect(page.getByTestId("twin-toggle-fallback"), path).toHaveCount(0);
    }
    await ctx.close();
  });
});

test.describe("R19 hiring pages share the site's left edge", () => {
  for (const path of ["/en/hire", "/zh/hire", "/en/interview", "/zh/interview"]) {
    test(`every .container in main lines up with the header: ${path}`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(path);
      const edges = await page.evaluate(() => {
        const logo = document.querySelector("header a")!.getBoundingClientRect().left;
        const boxes = [...document.querySelectorAll("main .container")].map((el) => {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          return {
            cls: (el as HTMLElement).className,
            left: Math.round(r.left + parseFloat(cs.paddingLeft)),
            right: Math.round(r.right - parseFloat(cs.paddingRight)),
          };
        });
        return { logo: Math.round(logo), right: Math.round(innerWidth - logo), boxes };
      });
      expect(edges.boxes.length).toBeGreaterThan(0);
      for (const b of edges.boxes) {
        expect(b.left, `${b.cls} left`).toBe(edges.logo);
        expect(b.right, `${b.cls} right`).toBe(edges.right);
      }
      await ctx.close();
    });
  }
});

async function metaHeight(browser: Browser, path: string, width: number, blockFonts: boolean) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  if (blockFonts) await page.route(/\.woff2?$/, (r) => r.abort());
  await page.goto(path, { waitUntil: "networkidle" });
  if (!blockFonts) await page.evaluate(() => document.fonts.ready);
  const h = await page.evaluate(() => document.querySelector(".cs-hero .cs-meta")!.getBoundingClientRect().height);
  await ctx.close();
  return h;
}

test.describe("R04 case meta row does not change height when the web font arrives", () => {
  for (const path of ["/en/projects/walkie", "/zh/projects/connect", "/zh/projects/gapmapper", "/zh/projects/hoop"]) {
    test(path, async ({ browser }) => {
      test.setTimeout(90_000);
      for (const width of [1280, 1440]) {
        const web = await metaHeight(browser, path, width, false);
        const fallback = await metaHeight(browser, path, width, true);
        expect(Math.abs(fallback - web), `${path} @${width}: fallback ${fallback} vs web ${web}`).toBeLessThan(1);
      }
    });
  }
});

test.describe("R18 back-to-top on phones", () => {
  test("hidden while reading down, shown on scroll up, never focusable while hidden", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto("/en/about");
    const scrollTo = async (y: number) => {
      await page.evaluate((target) => window.scrollTo(0, target), y);
      await page.waitForTimeout(450);
    };
    const read = () =>
      page.evaluate(() => {
        const b = document.querySelector<HTMLButtonElement>("[data-testid=back-to-top], button[aria-label=\"Back to top\"]")!;
        const cs = getComputedStyle(b);
        return { opacity: Number(cs.opacity), pe: cs.pointerEvents, tab: b.tabIndex };
      });

    for (const y of [600, 1200, 1800, 2400]) await scrollTo(y);
    const down = await read();
    expect(down.opacity, "scrolling down: hidden").toBe(0);
    expect(down.pe).toBe("none");
    expect(down.tab, "hidden button is not in the tab order").toBe(-1);

    await scrollTo(2200);
    await scrollTo(2000);
    const up = await read();
    expect(up.opacity, "scrolling up: shown").toBe(1);
    expect(up.tab).toBe(0);
    await ctx.close();
  });

  test("desktop keeps showing it once past the threshold", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto("/en/about");
    for (const y of [600, 1200, 1800]) {
      await page.evaluate((target) => window.scrollTo(0, target), y);
      await page.waitForTimeout(450);
    }
    const opacity = await page.evaluate(
      () => Number(getComputedStyle(document.querySelector("[data-testid=back-to-top], button[aria-label=\"Back to top\"]")!).opacity)
    );
    expect(opacity).toBe(1);
    await ctx.close();
  });
});
