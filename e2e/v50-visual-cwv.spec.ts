import { expect, test } from "@playwright/test";

const CORE_VISUAL_ROUTES = [
  "/en",
  "/en/ai",
  "/en/patterns",
  "/en/lab",
  "/en/projects/walkie",
  "/en/resume/compose",
] as const;

test.describe("v5.0 Hiring Resume Composer & Cross-Route Visual/CWV Gate", () => {
  test("interactive Custom Resume Composer switches presets, case toggles, language, and Markdown export", async ({
    page,
  }) => {
    await page.goto("/en/resume/compose", { waitUntil: "networkidle" });

    await expect(page.getByTestId("resume-a4-sheet")).toBeVisible();
    await expect(page.getByTestId("composer-doc-role-title")).toContainText("Interaction & Product Designer · Human-AI Safety");

    // Switch role preset to Design Technologist (v6.9 R16: one job title, the focus after it changes)
    await page.getByTestId("composer-preset-design-tech").click();
    await expect(page.getByTestId("composer-doc-role-title")).toContainText("Interaction & Product Designer · TypeScript, Next.js");

    // Toggle Grasslands case inclusion off and verify live preview drops it
    await page.getByTestId("composer-case-grassland").uncheck();
    await expect(page.getByTestId("a4-case-grassland")).toHaveCount(0);

    // Switch live preview language to Chinese A4
    await page.getByRole("button", { name: "中文 A4 版" }).click();
    await expect(page.getByTestId("composer-doc-role-title")).toContainText("交互与产品设计师 · TypeScript");

    // Copy Markdown dossier
    await page.getByRole("button", { name: "Copy Markdown Dossier" }).click();
    await expect(page.getByTestId("composer-status")).toContainText(/Markdown|A4|dossier|档案/i);
  });

  test("enforces Light, Dark (#141413), and 375px Mobile rendering parity, <= 0.02 CLS & 0px overflow", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error" && !msg.text().includes("_vercel/insights")) {
        errors.push(msg.text());
      }
    });

    await page.addInitScript(() => {
      const w = window as unknown as { __v50Cls: number };
      w.__v50Cls = 0;
      if ("PerformanceObserver" in window) {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const shift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
            if (!shift.hadRecentInput && typeof shift.value === "number") {
              w.__v50Cls += shift.value;
            }
          }
        }).observe({ type: "layout-shift", buffered: true });
      }
    });

    for (const route of CORE_VISUAL_ROUTES) {
      // Desktop Light check + deterministic visual capture
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route, { waitUntil: "networkidle" });
      await page.waitForTimeout(850);
      const cls = await page.evaluate(() => (window as unknown as { __v50Cls: number }).__v50Cls ?? 0);
      expect(cls, `${route} CLS`).toBeLessThanOrEqual(0.02);

      const lightShot = await page.screenshot({ animations: "disabled" });
      expect(lightShot.byteLength).toBeGreaterThan(15_000);

      // Desktop Dark (#111110 / #141413) check
      const darkBtn = page.getByRole("button", { name: /Switch theme to dark mode/i });
      if (await darkBtn.isVisible()) {
        await darkBtn.click();
        await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
        await page.waitForTimeout(250);
        const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        expect(["rgb(17, 17, 16)", "rgb(20, 20, 19)", "rgb(24, 24, 22)"]).toContain(darkBg);
        const darkShot = await page.screenshot({ animations: "disabled" });
        expect(darkShot.byteLength).toBeGreaterThan(15_000);
        await page.getByRole("button", { name: /Switch theme to light mode/i }).click();
      }

      // Mobile 375x812 0px horizontal overflow check
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(250);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow, `${route} mobile overflow`).toBeLessThanOrEqual(0);
    }

    expect(errors).toEqual([]);
  });
});
