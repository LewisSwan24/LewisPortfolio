import { expect, test } from "@playwright/test";

test.describe("v4.9 Lab FSM Explorer & Nielsen x WCAG Heuristic Auditor", () => {
  test("steps through FSM states, updates perceived delay sliders, and exports JSON spec", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/en/lab", { waitUntil: "networkidle" });

    const fsm = page.locator("#fsm-explorer");
    await expect(fsm).toBeVisible();
    await expect(fsm.getByTestId("fsm-deadlock-badge")).toContainText("0 deadlocks");

    // Switch to MazeRunners FSM
    await fsm.getByRole("button", { name: "MazeRunners", exact: true }).click();
    await expect(fsm.getByTestId("fsm-active-state")).toContainText("Co-Play Standby");

    // Fire IR transition -> Debounce -> Cooldown -> HUD Score Synced
    await fsm.getByTestId("fsm-trigger-mz-ir").click();
    await expect(fsm.getByTestId("fsm-active-state")).toContainText("IR Beam Debounce");

    await fsm.getByTestId("fsm-trigger-mz-lock").click();
    await expect(fsm.getByTestId("fsm-active-state")).toContainText("Score Cooldown");

    await fsm.getByTestId("fsm-trigger-mz-score").click();
    await expect(fsm.getByTestId("fsm-active-state")).toContainText("HUD Score Synced");

    // Adjust slider and check reactive telemetry recomputation
    const beforeDelay = await fsm.getByTestId("fsm-perceived-delay").innerText();
    const holdSlider = fsm.getByRole("slider", { name: "Deliberate Hold Dwell" });
    await holdSlider.fill("600");
    const afterDelay = await fsm.getByTestId("fsm-perceived-delay").innerText();
    expect(afterDelay).not.toBe(beforeDelay);

    // Export JSON Spec triggers confirmation output
    await fsm.getByRole("button", { name: "Export JSON Spec" }).click();
    await expect(fsm.getByTestId("fsm-status-output")).toContainText("fsm-maze-spec.json");

    expect(errors).toEqual([]);
  });

  test("filters Nielsen x WCAG heuristic audits cleanly on desktop & mobile without overflow", async ({
    page,
  }) => {
    // Desktop first: since v7.0 block 3 a phone shows its own shorter count.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/lab", { waitUntil: "networkidle" });

    const auditor = page.locator("#heuristic-auditor");
    await expect(auditor).toBeVisible();
    await expect(auditor.getByTestId("heuristic-count-status")).toContainText("Showing 24 of 24");

    await auditor.getByRole("button", { name: "Walkie", exact: true }).click();
    await expect(auditor.getByTestId("heuristic-count-status")).toContainText("Showing 4 of 24");

    await auditor.getByRole("button", { name: "Open Risk / Pending", exact: true }).click();
    await expect(auditor.getByTestId("heuristic-count-status")).toContainText("Showing 1 of 24");
    await expect(auditor.getByTestId("audit-card-wk-h10")).toBeVisible();

    await page.setViewportSize({ width: 375, height: 812 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
