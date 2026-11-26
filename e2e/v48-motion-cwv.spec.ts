import { expect, test } from "@playwright/test";

test.describe("v4.8 Manuscript Choreography, Dark SVG Calibration & CWV", () => {
  test("maintains CLS <= 0.02 and zero console errors while scrolling Home, Walkie & Patterns", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const text = msg.text();
        if (!text.includes("_vercel/insights")) {
          errors.push(`console.error: ${text}`);
        }
      }
    });

    await page.addInitScript(() => {
      const w = window as unknown as {
        __v48Cls: number;
        __v48Shifts: Array<{ value: number; time: number; sources: string[] }>;
      };
      w.__v48Cls = 0;
      w.__v48Shifts = [];
      if ("PerformanceObserver" in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const shift = entry as PerformanceEntry & {
              hadRecentInput?: boolean;
              value?: number;
              sources?: Array<{ node?: Element | null }>;
            };
            if (!shift.hadRecentInput && typeof shift.value === "number") {
              w.__v48Cls += shift.value;
              if (shift.value > 0.002) {
                w.__v48Shifts.push({
                  value: Number(shift.value.toFixed(4)),
                  time: Math.round(entry.startTime),
                  sources: (shift.sources ?? []).map((s) => {
                    const ext = s as unknown as {
                      node?: Element | null;
                      previousRect?: DOMRectReadOnly;
                      currentRect?: DOMRectReadOnly;
                    };
                    if (!ext.node) return "?";
                    const p = ext.previousRect;
                    const c = ext.currentRect;
                    return `${ext.node.tagName}#${ext.node.id}[prevY=${p ? Math.round(p.top) : "?"},curY=${c ? Math.round(c.top) : "?"},h=${c ? Math.round(c.height) : "?"}]`;
                  }),
                });
              }
            }
          }
        });
        observer.observe({ type: "layout-shift", buffered: true });
      }
    });

    for (const route of ["/en", "/en/projects/walkie", "/en/patterns"]) {
      await page.goto(route, { waitUntil: "networkidle" });
      const beforeHeights = await page.evaluate(() =>
        Array.from(document.querySelectorAll("main > *, #case-deep-root > *")).map((el, i) => ({
          i,
          tag: el.tagName + (el.id ? "#" + el.id : "") + "." + String(el.className).slice(0, 25),
          h: Math.round(el.getBoundingClientRect().height),
        }))
      );
      await page.evaluate(async () => {
        const total = document.body.scrollHeight;
        for (const ratio of [0.25, 0.5, 0.75, 1]) {
          window.scrollTo({ top: Math.round(total * ratio), behavior: "instant" });
          await new Promise((r) => setTimeout(r, 150));
        }
      });
      const heightDiffs = await page.evaluate((prev) => {
        const cur = Array.from(document.querySelectorAll("main > *, #case-deep-root > *"));
        return prev
          .map((p, i) => {
            const h2 = cur[i] ? Math.round(cur[i].getBoundingClientRect().height) : -1;
            return p.h !== h2 ? `${p.tag}: ${p.h} -> ${h2}` : null;
          })
          .filter(Boolean);
      }, beforeHeights);

      const stats = await page.evaluate(() => {
        const w = window as unknown as {
          __v48Cls: number;
          __v48Shifts: Array<{ value: number; sources: string[] }>;
        };
        return { cls: w.__v48Cls ?? 0, shifts: w.__v48Shifts ?? [] };
      });
      expect(
        stats.cls,
        `Route ${route} CLS=${stats.cls.toFixed(4)} heightDiffs=${JSON.stringify(heightDiffs)} shifts=${JSON.stringify(stats.shifts)}`
      ).toBeLessThanOrEqual(0.02);
    }

    expect(errors).toEqual([]);
  });

  test("adapts vector architecture SVGs to #141413 / #181816 in dark mode and supports journey tracker", async ({
    page,
  }) => {
    // v6.6: the journey sits in the collapsed appendix; the hash opens it.
    await page.goto("/en/projects/walkie#journey-map", { waitUntil: "networkidle" });

    // Journey scroll tracker chip navigation
    const tracker = page.getByRole("navigation", { name: "Journey stage quick index" });
    await expect(tracker).toBeVisible();
    const stepThree = tracker.getByRole("button").nth(2);
    await stepThree.click();
    await expect(stepThree).toHaveAttribute("aria-current", "step");

    // Inline SVG theme adaptation under data-theme="dark"
    const adaptiveSvg = page.locator("svg.case-adaptive-svg").first();
    await expect(adaptiveSvg).toBeVisible({ timeout: 10_000 });

    await page.getByRole("button", { name: "Switch theme to dark mode" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    const bgFill = await adaptiveSvg.evaluate((el) => {
      const firstRect = el.querySelector("rect");
      return firstRect ? getComputedStyle(firstRect).fill : "";
    });
    expect(["rgb(20, 20, 19)", "rgb(24, 24, 22)", "rgb(34, 34, 32)"]).toContain(bgFill);
  });

  test("settles immediately at 0ms under prefers-reduced-motion: reduce and avoids mobile overflow", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 375, height: 812 });

    await page.goto("/en/projects/walkie", { waitUntil: "networkidle" });
    const rail = page.locator("#journey-map [data-motion-mode]").first();
    await expect(rail).toHaveAttribute("data-motion-mode", "reduced");

    const firstStageOpacity = await page
      .locator("#journey-map [data-focus-item]")
      .first()
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(firstStageOpacity).toBe("1");

    for (const route of ["/en", "/en/projects/walkie", "/en/patterns"]) {
      await page.goto(route, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(0);
    }
  });
});
