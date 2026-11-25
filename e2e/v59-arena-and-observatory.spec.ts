import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("v5.9 Defense Arena, Code Diff Inspector & Lab 08 Telemetry Observatory", () => {
  test("exercises Interview Defense Arena across roles & markets on /en/hire with zero serious/critical a11y violations", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/en/hire", { waitUntil: "networkidle" });
    const arena = page.getByTestId("interview-defense-arena");
    await expect(arena).toBeVisible();

    await page.getByTestId("defense-role-design-eng").click();
    await page.getByTestId("defense-market-anz").click();
    await expect(page.getByTestId("defense-active-question")).toContainText(/WebGL|reduced-motion/i);

    await expect(page.getByTestId("defense-trap-card")).toBeVisible();
    await page.getByTestId("defense-compare-toggle").click();
    await expect(page.getByTestId("defense-trap-card")).toHaveCount(0);

    const axe = await new AxeBuilder({ page })
      .include('[data-testid="interview-defense-arena"]')
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(axe.violations.filter((v) => v.impact === "critical" || v.impact === "serious")).toEqual([]);
    expect(errors).toEqual([]);
  });

  test("renders Lab Section 08 Bundle Observatory tabs and the Walkie case safely across dark mode & mobile 375px", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/zh/lab", { waitUntil: "networkidle" });
    const observatory = page.getByTestId("bundle-observatory");
    await expect(observatory).toBeVisible();

    await page.getByTestId("observatory-tab-bundles").click();
    await expect(page.getByTestId("observatory-bundle-grid")).toBeVisible();
    await expect(page.getByTestId("observatory-integrity-grid")).toHaveCount(0);

    await page.getByTestId("observatory-tab-integrity").click();
    await expect(page.getByTestId("observatory-integrity-grid")).toBeVisible();

    await page.setViewportSize({ width: 375, height: 812 });
    await page.addInitScript(() => localStorage.setItem("portfolio-theme", "dark"));
    await page.goto("/zh/projects/walkie", { waitUntil: "networkidle" });

    // The code-diff viewer was removed on 2026-11-25 (its files did not exist in any repo).
    await expect(page.getByTestId("case-code-diff-viewer")).toHaveCount(0);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
});
