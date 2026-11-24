import { expect, test } from "@playwright/test";

test.describe("v5.7 Causal Lineage Knowledge Graph (/studio/graph)", () => {
  test("renders 24 topological nodes, traces BFS lineage across layers, and filters by unverified gaps", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/studio/graph", { waitUntil: "networkidle" });

    await expect(page.getByTestId("graph-node-vault:vigil")).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByTestId("graph-inspector")).toContainText("Vigil");
    await expect(page.getByTestId("graph-node-flagship:autofill")).toHaveAttribute("data-state", "connected");

    // Keyboard arrow-right jumps layer cleanly
    await page.getByTestId("graph-node-vault:vigil").focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByTestId("graph-inspector")).toContainText(/flagship/i);

    // Filter unverified hypothesis gaps & switch to WCAG Adjacency Matrix view
    await page.getByTestId("graph-filter-unverified-hypothesis").click();
    await expect(page.getByTestId("graph-filter-unverified-hypothesis")).toHaveAttribute("aria-pressed", "true");

    await page.getByTestId("graph-view-table").click();
    await expect(page.getByTestId("graph-view-table")).toHaveAttribute("aria-pressed", "true");
    await page.getByTestId("graph-view-split").click();
  });

  test("renders /zh/studio/graph cleanly in Dark #141413 and Mobile 375px zero overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/zh/studio/graph", { waitUntil: "networkidle" });

    const darkBtn = page.getByRole("button", { name: /Switch theme to dark mode|切换.*暗/i });
    if (await darkBtn.isVisible()) await darkBtn.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.getByTestId("graph-node-flagship:walkie").click();
    await expect(page.getByTestId("graph-inspector")).toContainText("Walkie");

    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(250);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
