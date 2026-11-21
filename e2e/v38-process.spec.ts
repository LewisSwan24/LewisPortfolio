import { expect, test } from "@playwright/test";

test.describe("V3.8 Design Process Artifacts", () => {
  test("BeforeAfterScrubber & ResearchQuoteDeck work on /projects/connect with 0px mobile overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/projects/connect");

    const jumpLink = page.locator('.cs-jump a[href="#process-artifacts"]');
    await expect(jumpLink).toBeVisible();

    const slider = page.locator("#process-artifacts [role='slider']");
    await slider.scrollIntoViewIfNeeded();
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    await expect(slider).toHaveAttribute("aria-valuenow", "55");

    await page.setViewportSize({ width: 375, height: 812 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("CaseMicroLoop renders pause control on /projects/onthebeat", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/projects/onthebeat");

    const pauseBtn = page
      .locator("#process-artifacts")
      .getByRole("button", { name: /Pause loop|Play loop|暂停循环|播放循环/i });
    await pauseBtn.scrollIntoViewIfNeeded();
    await expect(pauseBtn).toBeVisible();
    await pauseBtn.click();
    await expect(pauseBtn).toHaveAttribute("aria-pressed", "true");
  });
});
