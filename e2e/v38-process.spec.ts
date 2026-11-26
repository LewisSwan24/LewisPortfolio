import { expect, test } from "@playwright/test";

test.describe("Design Process Artifacts", () => {
  test("BeforeAfterScrubber & ResearchQuoteDeck work on /projects/connect with 0px mobile overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    // v6.7: connect takes the v6.6 layout; process artifacts sit in the
    // collapsed appendix, reached from the rail's "For interviewers" entry.
    await page.goto("/projects/connect#process-artifacts");
    await expect(page.locator('.cs-jump a[href="#for-interviewers"]')).toBeVisible();

    // v6.5: a text before/after shows two whole cards, no slider (review row 07).
    const cards = page.locator("#process-artifacts .proc-compare > figure");
    await cards.first().scrollIntoViewIfNeeded();
    await expect(cards).toHaveCount(2);
    await expect(page.locator("#process-artifacts [role='slider']")).toHaveCount(0);

    await page.setViewportSize({ width: 375, height: 812 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("CaseMicroLoop renders pause control on /projects/onthebeat", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    // v6.6: process artifacts live in the collapsed appendix; the hash opens it.
    await page.goto("/projects/onthebeat#process-artifacts");

    const pauseBtn = page
      .locator("#process-artifacts")
      .getByRole("button", { name: /Pause loop|Play loop|暂停循环|播放循环/i });
    await pauseBtn.scrollIntoViewIfNeeded();
    await expect(pauseBtn).toBeVisible();
    await pauseBtn.click();
    await expect(pauseBtn).toHaveAttribute("aria-pressed", "true");
  });
});
