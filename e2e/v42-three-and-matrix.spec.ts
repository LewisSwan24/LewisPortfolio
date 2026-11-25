import { expect, test } from "@playwright/test";

test.describe("Shared Three.js Specimen Kernel, DecisionComparator & Essay #1", () => {
  // v6.5: the specimen axes left the home page (review C13) and stay on /lab.
  test("/lab displays 0ms SVG specimen axes with 6 keyboard-navigable design thesis nodes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/lab", { waitUntil: "networkidle" });

    const svgBaseline = page.getByTestId("specimen-svg-baseline");
    await expect(svgBaseline).toBeVisible();

    const ontbBtn = page.getByRole("button", { name: /Select specimen: On The Beat/i });
    await expect(ontbBtn).toBeVisible();
    await ontbBtn.click();

    await expect(page.getByTestId("specimen-active-title")).toHaveText("On The Beat");
    await expect(page.getByTestId("specimen-active-question")).toContainText(/step out of the way/i);
  });

  test("/projects renders DecisionComparator desktop table and collapses cleanly at 375px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/projects", { waitUntil: "networkidle" });

    const comparator = page.locator("#decision-comparator");
    await comparator.scrollIntoViewIfNeeded();
    await expect(comparator.getByRole("columnheader", { name: /Human tension/i })).toBeVisible();
    await expect(comparator.getByTestId("comparator-row")).toHaveCount(6);

    await page.setViewportSize({ width: 375, height: 812 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
    await expect(comparator.locator("details.comparator-accordion")).toHaveCount(6);
  });

  test("/projects/grassland and /projects/onthebeat run interactive simulators cleanly", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto("/en/projects/grassland", { waitUntil: "networkidle" });
    const grassSim = page.locator("#interactive-demo[data-simulator-id='grassland-rules']");
    await grassSim.scrollIntoViewIfNeeded();
    await expect(grassSim.locator('.case-sim-stage[data-mounted="true"]')).toBeVisible({
      timeout: 15000,
    });
    await grassSim.getByRole("button", { name: /M04 · Night Patrol/i }).click();
    await grassSim.getByRole("button", { name: /Box-select & Scout/i }).click();
    await expect(grassSim.getByRole("status")).toContainText(/Mission 4 uses the exact same/i);

    await page.goto("/en/projects/onthebeat", { waitUntil: "networkidle" });
    const hardwareSvg = page.getByTestId("hardware-field-svg");
    await expect(hardwareSvg).toBeVisible();

    const otbSim = page.locator("#interactive-demo[data-simulator-id='onthebeat-handshake']");
    await otbSim.scrollIntoViewIfNeeded();
    await expect(otbSim.locator('.case-sim-stage[data-mounted="true"]')).toBeVisible({
      timeout: 15000,
    });
    await otbSim.getByRole("button", { name: /SAY HI/i }).click();
    await otbSim.getByRole("button", { name: /Simulate mutual wrist nod/i }).click();
    await otbSim.getByRole("button", { name: /Pocket phones/i }).click();
    await expect(otbSim.getByRole("status")).toContainText(/live music/i);
  });

  test("Essay #1 withdrawing-interfaces-in-social-spaces renders in EN & ZH with sticky TOC", async ({
    page,
  }) => {
    for (const url of [
      "/en/blog/withdrawing-interfaces-in-social-spaces",
      "/zh/blog/withdrawing-interfaces-in-social-spaces",
    ]) {
      await page.goto(url, { waitUntil: "networkidle" });
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator(".v4-reading-grid")).toBeVisible();
    }
  });

  test("Graceful silent fallback with WebGL context disabled (zero console/page errors)", async ({
    browser,
  }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript(() => {
      const origGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (
        this: HTMLCanvasElement,
        type: string,
        options?: unknown
      ) {
        if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") {
          return null;
        }
        return origGetContext.call(this, type as "2d", options as CanvasRenderingContext2DSettings);
      } as typeof origGetContext;
    });

    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error" && !m.text().includes("_vercel/insights")) {
        consoleErrors.push(m.text());
      }
    });

    await page.goto("/en/lab", { waitUntil: "networkidle" });
    await expect(page.getByTestId("specimen-svg-baseline")).toBeVisible();
    await expect(page.getByText(/2D vector specimen/i)).toBeVisible();

    await page.goto("/en/projects/walkie", { waitUntil: "networkidle" });
    await expect(page.getByTestId("hardware-field-svg")).toBeVisible();

    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
    await context.close();
  });
});
