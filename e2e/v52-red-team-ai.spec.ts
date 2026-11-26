import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("v5.2 Hybrid AI Retrieval & 4-Lens Red-Team Critique", () => {
  test("queries Hybrid BM25F + Quantized Vector workbench on /en/ai and /zh/ai", async ({ page }) => {
    await page.goto("/en/ai", { waitUntil: "networkidle" });
    await expect(page.getByTestId("red-team-panel")).toBeVisible();

    await page.getByRole("button", { name: /Verify in corpus/i }).click();
    await expect(page.locator("[role='status']")).toContainText(/hybrid-bm25-vector|mode:/i);

    // Switch Red-Team case & lens tabs via keyboard
    await page.getByTestId("redteam-case-autofill").click();
    const firstLens = page.getByTestId("redteam-lens-design-director");
    await firstLens.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByTestId("redteam-lens-systems-architect")).toHaveAttribute(
      "aria-selected",
      "true"
    );

    // Trigger SSE grounded critique check
    await page.getByTestId("redteam-sse-trigger").click();
    await expect(page.getByTestId("redteam-sse-output")).toContainText("offline-snapshot-sse");

    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(axe.violations.filter((v) => v.impact === "critical" || v.impact === "serious")).toEqual(
      []
    );
  });

  test("renders 4-Lens Red-Team panel in case footer, Dark #141413, and Mobile 375px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/zh/projects/lamplight#red-team-defense", { waitUntil: "networkidle" });
    await expect(page.getByTestId("red-team-panel")).toBeVisible();
    await page.getByTestId("redteam-lens-ai-safety").click();
    await expect(page.getByTestId("red-team-active-panel")).toContainText("先不要");

    await page.goto("/zh/ai", { waitUntil: "networkidle" });
    // Wait for the hydrated toggle; a one-shot isVisible() raced its placeholder.
    const toggle = page.getByRole("button", { name: /Switch theme to (dark|light) mode/i }).first();
    await expect(toggle).toBeVisible();
    if ((await toggle.getAttribute("aria-label"))?.includes("dark")) await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.setViewportSize({ width: 375, height: 812 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
