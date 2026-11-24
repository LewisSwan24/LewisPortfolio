import { expect, test } from "@playwright/test";

test.describe("v5.8 Bidirectional 3D Hardware Digital Twin", () => {
  test("links Replay Studio frame stepping and fault toggles bidirectionally with the 3D/SVG hardware twin", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/en/studio/replay", { waitUntil: "networkidle" });

    const twinPanel = page.getByTestId("hardware-twin-panel");
    await expect(twinPanel).toBeVisible();
    await expect(twinPanel).toHaveAttribute("data-active-zone", "usb-relay");

    // Step frame forward (#1 USB-CDC -> #2 PAIR / NVS): updates active hardware zone
    await page.getByTestId("replay-next").click();
    await expect(twinPanel).toHaveAttribute("data-active-zone", "front-key");

    // Toggle fault injection mode and step to fault frame
    await page.getByTestId("replay-fault-toggle").click();
    await page.getByTestId("replay-next").click();
    await expect(twinPanel).toHaveAttribute("data-fault-state", "fault");
    await expect(page.getByTestId("twin-callout")).toContainText(/FAULT GUARD/i);

    // Bidirectional zone -> frame inspection on Maze track
    await page.getByTestId("replay-track-maze").click();
    await page.getByTestId("twin-zone-btn-ir-gate").click();
    await expect(twinPanel).toHaveAttribute("data-active-zone", "ir-gate");

    // Verify 2D schematic fallback toggle works smoothly with zero console errors
    await page.getByTestId("twin-toggle-fallback").click();
    await expect(twinPanel).toHaveAttribute("data-render-mode", "svg-fallback");
    await expect(page.getByTestId("twin-svg-focus-box")).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("preserves 0px mobile horizontal overflow and clean dark-mode surface in zh locale", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.setViewportSize({ width: 375, height: 812 });
    await page.addInitScript(() => {
      localStorage.setItem("portfolio-theme", "dark");
    });

    await page.goto("/zh/studio/replay", { waitUntil: "networkidle" });
    await expect(page.getByTestId("hardware-twin-panel")).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
});
