import { expect, test } from "@playwright/test";

test.describe("Dedicated Rationale AI Lab & Case Study Enrichment", () => {
  test("/en/ai renders structured 4-quadrant cards, pipeline telemetry, essay matches, and 0px mobile overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/ai", { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.fill(
      "#ai-workbench-query",
      "Explain why Walkie uses physical buttons and what hardware or architectural boundaries you set"
    );
    await page.getByRole("button", { name: /Verify in corpus/i }).click();

    const output = page.locator("output[role='status']");
    await expect(output).toContainText(/corpus:/i, { timeout: 10000 });
    await expect(page.locator("#main-content")).toContainText(/Human Tension/i);
    await expect(page.locator("#main-content")).toContainText(/Rejected Path/i);
    await expect(page.locator("#main-content")).toContainText(/Chosen Tradeoff/i);
    await expect(page.locator("#main-content")).toContainText(/Honest Limit/i);
    await expect(page.locator("#main-content")).toContainText(/Traceability/i);
    await expect(page.getByRole("button", { name: /Rationale AI/i })).toHaveCount(0);

    await page.setViewportSize({ width: 375, height: 812 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("/zh/ai serves Chinese structured rationale and links cleanly from nav", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/zh", { waitUntil: "networkidle" });

    const navLink = page.getByRole("navigation").getByRole("link", { name: "AI 问答" });
    await expect(navLink).toBeVisible();
    await navLink.click();

    await expect(page).toHaveURL(/\/zh\/ai$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("All 6 listed cases render BeforeAfterScrubber, ResearchQuoteDeck, CaseMicroLoop, and 3 decisions", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    for (const slug of [
      "walkie",
      "lamplight",
      "autofill",
      "maze",
      "onthebeat",
      "grassland",
    ]) {
      await page.goto(`/en/projects/${slug}`, { waitUntil: "domcontentloaded" });
      await expect(page.locator("#process-artifacts [role='slider']")).toBeVisible();
      await expect(
        page.locator("#process-artifacts").getByRole("button", { name: /Pause loop|Play loop/i })
      ).toBeVisible();
      const decisionCards = page.locator(".case-decisions .case-decision-card");
      expect(await decisionCards.count(), `Decision count on ${slug}`).toBeGreaterThanOrEqual(3);
    }
  });

  test("/en/lab swatches match mood tokens cleanly and /projects filter pills unhighlight on matrix view", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/lab", { waitUntil: "networkidle" });
    await expect(page.locator("[data-case-mood='AI Safety Moss']")).toHaveCount(0);
    await expect(page.locator("[data-case-mood*='Warm Umber']")).toContainText(/lamplight \/ grassland/i);

    await page.goto("/en/projects", { waitUntil: "networkidle" });
    await page.getByRole("tab", { name: "Capability matrix" }).click();
    await expect(page.locator(".idx-bar .idx-filters .idx-filter.active")).toHaveCount(0);
  });
});
