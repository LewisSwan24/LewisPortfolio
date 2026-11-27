import { expect, test, type Page } from "@playwright/test";

/**
 * v6.9 phase D: the phone review on a real Android Chrome (2026-11-27).
 * Lewis's picks: D01–D04, and for D02 the chapter pill with a bottom sheet.
 */

const PHONE = { width: 390, height: 844 };

async function scrollToY(page: Page, y: number) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await page.waitForTimeout(250);
}

test.describe("D01 fixed bars stay fixed while scrolling", () => {
  for (const viewport of [PHONE, { width: 1440, height: 900 }]) {
    test(`case progress bar at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/projects/walkie", { waitUntil: "load" });
      await page.waitForTimeout(800); // let the page-in animation finish
      await scrollToY(page, 3000);
      const top = await page.locator(".cs-scroll-progress").evaluate((el) => el.getBoundingClientRect().top);
      expect(Math.abs(top)).toBeLessThan(2);
    });

    test(`blog progress bar at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/blog/ux-research-methods-guide", { waitUntil: "load" });
      await page.waitForTimeout(800);
      await scrollToY(page, 3000);
      const top = await page
        .locator(".reading-progress-fill")
        .evaluate((el) => el.parentElement!.getBoundingClientRect().top);
      expect(Math.abs(top)).toBeLessThan(2);
    });
  }
});

test.describe("D02 chapter pill and sheet on case pages", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(PHONE);
  });

  const pill = (page: Page) => page.locator("[data-chapter-pill]");
  const sheet = (page: Page) => page.getByRole("dialog");

  test("hidden at the top, shows the current chapter after the page's own list", async ({ page }) => {
    await page.goto("/zh/projects/walkie", { waitUntil: "load" });
    await expect(pill(page)).toBeHidden();

    await page.locator("#interactive-demo").evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
    await page.waitForTimeout(400);
    await expect(pill(page)).toBeVisible();
    await expect(pill(page)).toContainText("3/6");
    await expect(pill(page)).toContainText("亲手试一试");
    const box = (await pill(page).boundingBox())!;
    expect(box.height).toBeGreaterThanOrEqual(44);
  });

  test("opens a sheet with every chapter, back to top and the next project", async ({ page }) => {
    await page.goto("/projects/walkie", { waitUntil: "load" });
    await page.locator("#design-decisions").evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
    await page.waitForTimeout(400);
    await pill(page).click();

    const dialog = sheet(page);
    await expect(dialog).toBeVisible();
    const chapters = dialog.locator("ol a");
    await expect(chapters).toHaveCount(6);
    await expect(dialog.locator("ol a[aria-current='location']")).toHaveText(/Three decisions/);
    await expect(dialog.getByRole("button", { name: /Back to top/ })).toBeVisible();
    await expect(dialog.getByRole("link", { name: /Next project/ })).toHaveAttribute("href", /\/projects\/[a-z]+$/);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe("hidden");

    // Choosing a chapter closes the sheet and lands on it.
    await chapters.nth(4).click();
    await expect(dialog).toBeHidden();
    // A long smooth scroll, then a correction if sections above grew meanwhile.
    await expect
      .poll(() => page.locator("#outcome-limits").evaluate((el) => Math.round(el.getBoundingClientRect().top)), { timeout: 8_000 })
      .toBeGreaterThanOrEqual(0);
    await expect
      .poll(() => page.locator("#outcome-limits").evaluate((el) => Math.round(el.getBoundingClientRect().top)), { timeout: 8_000 })
      .toBeLessThan(260);
    await expect(pill(page)).toContainText("5/6");
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe("hidden");
  });

  test("Escape and the backdrop close it, and focus returns to the pill", async ({ page }) => {
    await page.goto("/projects/walkie", { waitUntil: "load" });
    await scrollToY(page, 3000);
    await pill(page).click();
    await expect(sheet(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(sheet(page)).toBeHidden();
    await expect(pill(page)).toBeFocused();

    await pill(page).click();
    await expect(sheet(page)).toBeVisible();
    await page.mouse.click(PHONE.width / 2, 40);
    await expect(sheet(page)).toBeHidden();
  });

  test("replaces back-to-top on case pages, and is gone by the footer and on desktop", async ({ page }) => {
    await page.goto("/projects/walkie", { waitUntil: "load" });
    await scrollToY(page, 4000);
    await scrollToY(page, 3000); // scrolling up is when back-to-top would show
    await expect(page.getByTestId("back-to-top")).toBeHidden();

    await page.evaluate(() => document.querySelector("footer")!.scrollIntoView({ behavior: "instant" }));
    await page.waitForTimeout(400);
    await expect(pill(page)).toBeHidden();

    await page.setViewportSize({ width: 1440, height: 900 });
    await scrollToY(page, 3000);
    await expect(pill(page)).toBeHidden();
  });
});

test.describe("D03 phone menu", () => {
  test("open shows a close icon and backdrop, locks the page, and closes on Escape or backdrop", async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("/zh/projects", { waitUntil: "load" });
    const toggle = page.locator(".pd-mobile-toggle");
    await expect(toggle).toHaveAttribute("aria-label", "打开菜单");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-label", "关闭菜单");
    const firstBar = toggle.locator("span").first();
    expect(await firstBar.evaluate((el) => getComputedStyle(el).transform)).not.toBe("none");
    const backdrop = page.locator(".pd-mobile-backdrop");
    await expect(backdrop).toBeVisible();
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe("hidden");

    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-navigation")).toBeHidden();
    await expect(toggle).toBeFocused();
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe("hidden");

    await toggle.click();
    await page.mouse.click(PHONE.width / 2, PHONE.height - 40);
    await expect(page.locator("#mobile-navigation")).toBeHidden();
  });
});

test.describe("D04 tap targets are at least 24px", () => {
  const cases: Array<[string, string]> = [
    ["/zh/projects/walkie", ".cs-links a"],
    ["/zh/lab", "input[type=range]"],
    ["/zh/lab", "a[class*='auditFoot'], [class*='auditFoot'] a"],
    ["/ai", "th a"],
    ["/zh/blog", ".idx-meta a"],
  ];
  for (const [path, selector] of cases) {
    test(`${path} ${selector}`, async ({ page }) => {
      await page.setViewportSize(PHONE);
      await page.goto(path, { waitUntil: "load" });
      const sizes = await page.locator(selector).evaluateAll((els) =>
        els
          .filter((el) => el.getBoundingClientRect().width > 0)
          .map((el) => {
            const r = el.getBoundingClientRect();
            return { text: (el.textContent || "").trim().slice(0, 20), w: r.width, h: r.height };
          }),
      );
      expect(sizes.length).toBeGreaterThan(0);
      for (const s of sizes) {
        // 23.5: layout can land a hair under 24 (e.g. 23.9995) from sub-pixel rounding.
        expect(s.h, JSON.stringify(s)).toBeGreaterThanOrEqual(23.5);
        expect(s.w, JSON.stringify(s)).toBeGreaterThanOrEqual(23.5);
      }
    });
  }

  test("/zh/resume/compose checkboxes sit in a label row at least 24px tall", async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("/zh/resume/compose", { waitUntil: "load" });
    const rows = await page.locator("input[type=checkbox]").evaluateAll((els) =>
      els
        .filter((el) => el.getBoundingClientRect().width > 0)
        .map((el) => {
          const label = el.closest("label")!;
          return { box: el.getBoundingClientRect().height, row: label.getBoundingClientRect().height };
        }),
    );
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) {
      expect(r.box, JSON.stringify(r)).toBeGreaterThanOrEqual(18);
      expect(r.row, JSON.stringify(r)).toBeGreaterThanOrEqual(24);
    }
  });
});
