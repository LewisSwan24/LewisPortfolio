import { expect, test, type Page } from "@playwright/test";

async function auditTargetSize258(page: Page) {
  const undersized = await page.evaluate(() => {
    const controls = Array.from(
      document.querySelectorAll<HTMLElement>(
        "header a, header button, main button, main [role='tab'], main a.btn, main a.pillBtn, main a.chip"
      )
    );
    const bad: Array<{ tag: string; text: string; width: number; height: number }> = [];
    for (const el of controls) {
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
        continue;
      }
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.width < 23.5 || rect.height < 23.5) {
        bad.push({
          tag: el.tagName.toLowerCase(),
          text: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 40),
          width: Math.round(rect.width * 10) / 10,
          height: Math.round(rect.height * 10) / 10,
        });
      }
    }
    return bad;
  });

  expect(
    undersized,
    `WCAG 2.5.8 target size violations (<24px): ${JSON.stringify(undersized)}`
  ).toEqual([]);
}

async function auditFocusNotObscured2411(page: Page, steps = 14) {
  await page.locator("body").focus();
  const obscured: Array<{ label: string; overlay: string }> = [];

  for (let i = 0; i < steps; i++) {
    await page.keyboard.press("Tab");
    // Measure where focus lands, not where it is on its way: the skip link
    // slides in over 150ms, and reading it mid-transition made this flaky.
    await page.evaluate(() =>
      Promise.all((document.activeElement?.getAnimations() ?? []).map((a) => a.finished))
    );
    const check = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body || el.tagName === "HTML") return null;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;

      // 2.4.11 fails only when the element is entirely hidden by author content,
      // so ask what is painted on top (z-order), not just whether boxes overlap.
      const points: Array<[number, number]> = [
        [rect.left + rect.width / 2, rect.top + rect.height / 2],
        [rect.left + 2, rect.top + 2],
        [rect.right - 2, rect.top + 2],
        [rect.left + 2, rect.bottom - 2],
        [rect.right - 2, rect.bottom - 2],
      ];
      const onScreen = points.filter(
        ([x, y]) => x >= 0 && y >= 0 && x < window.innerWidth && y < window.innerHeight
      );
      if (onScreen.length === 0) return null;

      const overlays = Array.from(
        document.querySelectorAll<HTMLElement>("header.pd-nav, .studio-assistant-wrap")
      ).filter((ov) => !ov.contains(el));
      const coveredBy: string[] = [];
      for (const [x, y] of onScreen) {
        const hit = document.elementFromPoint(x, y);
        const ov = hit && !el.contains(hit) ? overlays.find((o) => o.contains(hit)) : undefined;
        if (!ov) return null;
        coveredBy.push(ov.className);
      }
      return {
        label: (el.innerText || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 40),
        overlay: coveredBy[0],
      };
    });
    if (check) obscured.push(check);
  }

  expect(
    obscured,
    `WCAG 2.4.11 focus obscured violations: ${JSON.stringify(obscured)}`
  ).toEqual([]);
}

test.describe("v5.5 Dual-Market Toggles & WCAG 2.2 AA (2.5.8 / 2.4.11)", () => {
  // v6.5: the /hire market switch is gone (review C07); the composer keeps its own.
  test("switches dual-market lenses on /resume/compose in ZH", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/zh/resume/compose?market=anz-critique", { waitUntil: "networkidle" });
    await expect(page.getByTestId("composer-market-anz-critique")).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByTestId("composer-doc-market-pitch")).toContainText("否决");

    await page.getByTestId("composer-market-apac-closed-loop").click();
    await expect(page.getByTestId("composer-market-apac-closed-loop")).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByTestId("composer-doc-market-pitch")).toContainText("痛点");

    expect(errors).toEqual([]);
  });

  for (const route of ["/en", "/en/hire", "/en/vault", "/en/studio/replay", "/en/blog", "/en/resume/compose"]) {
    test(`WCAG 2.2 AA target size (2.5.8), focus visibility (2.4.11), dark mode & mobile 375px on ${route}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route, { waitUntil: "networkidle" });

      await auditTargetSize258(page);
      await auditFocusNotObscured2411(page, 12);

      // Dark #141413 parity check
      const darkBtn = page.getByRole("button", { name: "Switch theme to dark mode" });
      if (await darkBtn.isVisible()) {
        await darkBtn.click();
        await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      }

      // Mobile 375px horizontal overflow & target size
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(200);
      await auditTargetSize258(page);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }
});
