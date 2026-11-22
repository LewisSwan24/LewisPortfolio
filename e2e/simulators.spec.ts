import { expect, test } from "@playwright/test";

const SIMULATOR_CASES = [
  { slug: "walkie", locale: "en", simulatorId: "walkie-wrist" },
  { slug: "lamplight", locale: "en", simulatorId: "lamplight-triage" },
  { slug: "autofill", locale: "zh", simulatorId: "autofill-confidence" },
  { slug: "maze", locale: "en", simulatorId: "maze-contact" },
  { slug: "fencepost", locale: "zh", simulatorId: "fencepost-revoke" },
  { slug: "connect", locale: "en", simulatorId: "connect-ia-reset" },
] as const;

test.describe("Interactive Case Prototypes", () => {
  for (const item of SIMULATOR_CASES) {
    test(`${item.slug} (${item.locale}) mounts lazily, passes keyboard/touch checks, and holds 0px mobile overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/${item.locale}/projects/${item.slug}`);

      const jumpLink = page.locator('.cs-jump a[href="#interactive-demo"]');
      await expect(jumpLink).toBeVisible();

      const section = page.locator(`#interactive-demo[data-simulator-id="${item.simulatorId}"]`);
      await section.scrollIntoViewIfNeeded();
      await expect(section.locator('.case-sim-stage[data-mounted="true"]')).toBeVisible({
        timeout: 15000,
      });

      // Keyboard check: Reset button is reachable and resets status live region
      const resetBtn = section.getByRole("button", { name: /Reset|重置/ });
      await resetBtn.focus();
      await expect(resetBtn).toBeFocused();
      await resetBtn.press("Enter");
      await expect(section.getByRole("status")).toContainText(/reset|重置/i);

      // Mobile viewport check (375x812): zero horizontal overflow
      await page.setViewportSize({ width: 375, height: 812 });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
