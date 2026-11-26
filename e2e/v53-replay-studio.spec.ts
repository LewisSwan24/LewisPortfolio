import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("v5.3 Hardware & Protocol Frame Replay Studio", () => {
  test("steps frames via keyboard, toggles fault injection, and switches tracks on /en/studio/replay", async ({
    page,
  }) => {
    await page.goto("/en/studio/replay", { waitUntil: "networkidle" });
    await expect(page.getByTestId("replay-stage")).toBeVisible();
    await expect(page.getByTestId("replay-active-state")).toContainText("USB Serial DTR Preemption");

    // Step via keyboard ArrowRight on stage
    await page.getByTestId("replay-stage").focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByTestId("replay-active-state")).toContainText("HELLO 30s Physical Key Press");

    // Inject fault and inspect deterministic fault frame
    await page.getByTestId("replay-fault-toggle").click();
    await page.getByTestId("replay-frame-btn-1").click();
    await expect(page.getByTestId("replay-fault-badge")).toContainText("FAULT");
    await expect(page.getByTestId("replay-raw-hex")).toContainText("FF EE 09 01");

    // Switch to MazeRunners & On The Beat tracks
    await page.getByTestId("replay-track-maze").click();
    await expect(page.getByTestId("replay-active-state")).toContainText("Co-Touch Axis Coupling");
    await page.getByTestId("replay-track-onthebeat").click();
    await expect(page.getByTestId("replay-active-state")).toContainText("Card 1 Armed on Wrist");

    // Progressive Web Serial panel visible & safely guarded
    await expect(page.getByTestId("web-serial-probe")).toBeVisible();

    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(axe.violations.filter((v) => v.impact === "critical" || v.impact === "serious")).toEqual(
      []
    );
  });

  test("verifies /zh/studio/replay Dark #141413 and Mobile 375px zero overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/zh/studio/replay?track=maze", { waitUntil: "networkidle" });
    await expect(page.getByTestId("replay-active-state")).toContainText("同色双人腕带");

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
