import { expect, test } from "@playwright/test";

/**
 * v6.9 phase B: what was left of the v6.4 core-pages review (2026-11-25).
 * Lewis's picks, 2026-11-27: plain labels on the /lab chart (C13), Print
 * hidden on phones with Tailor CV kept (C17), the deck ruler readable (C19).
 */

test.describe("/lab chart uses plain labels (C13)", () => {
  for (const [path, now, gone] of [
    ["/en/lab", ["04 · Six cases on two axes", "Switch to"], ["Design Specimen Axes", "SVG baseline", "WebGL live", "Enable 3D axes", "Switch to 2D SVG"]],
    ["/zh/lab", ["04 · 六个案例的两轴分布", "切到"], ["设计标本坐标系", "矢量标本底图", "SVG 基线", "WebGL 已就绪", "切回 2D 矢量图", "开启 3D 标尺视图"]],
  ] as const) {
    test(path, async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      const section = page.locator(".specimen-section");
      const text = (await section.innerText()) + " " + ((await section.textContent()) ?? "");
      for (const s of now) expect(text).toContain(s);
      for (const s of gone) expect(text).not.toContain(s);
    });
  }

  test("on a phone the chart's words are at least 11px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/lab", { waitUntil: "networkidle" });
    const sizes = await page.evaluate(() =>
      Array.from(document.querySelectorAll<SVGTextElement>(".specimen-svg-baseline text"))
        .filter((t) => getComputedStyle(t).display !== "none" && t.getBoundingClientRect().height > 0)
        .map((t) => {
          const svg = t.ownerSVGElement!;
          const scale = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
          return { text: t.textContent, px: parseFloat(getComputedStyle(t).fontSize) * scale };
        }),
    );
    for (const s of sizes) expect(s.px, JSON.stringify(s)).toBeGreaterThanOrEqual(11);
    // The axis names stay readable somewhere on the page.
    await expect(page.locator(".specimen-axis-captions")).toBeVisible();
  });
});

test.describe("/resume actions on a phone (C17)", () => {
  test("Print is hidden on a phone, Tailor CV and the PDF stay", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/resume", { waitUntil: "networkidle" });
    const actions = page.locator(".res-actions");
    await expect(actions.getByRole("button", { name: "Print" })).toBeHidden();
    await expect(actions.getByRole("link", { name: /Tailor CV/ })).toBeVisible();
    await expect(actions.getByRole("link", { name: /Download PDF CV/ })).toBeVisible();
  });

  test("Print stays on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/en/resume", { waitUntil: "networkidle" });
    await expect(page.locator(".res-actions").getByRole("button", { name: "Print" })).toBeVisible();
  });
});

for (const width of [1024, 1280, 1440]) {
  test(`home deck counter sits below every card at ${width}px (C14)`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en", { waitUntil: "networkidle" });
    const gap = await page.evaluate(() => {
      const counter = document.querySelector(".deck-counter")!.getBoundingClientRect();
      const cards = Array.from(document.querySelectorAll(".hero-deck .deck-card"))
        .filter((el) => !el.closest(".deck-counter"))
        .map((el) => el.getBoundingClientRect().bottom);
      return counter.top - Math.max(...cards);
    });
    expect(gap).toBeGreaterThanOrEqual(0);
  });
}

test("home deck ruler numbers are at least 11px (C19)", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en", { waitUntil: "networkidle" });
  const px = await page.evaluate(() =>
    parseFloat(getComputedStyle(document.querySelector(".ruler-nums span")!).fontSize),
  );
  expect(px).toBeGreaterThanOrEqual(11);
});
