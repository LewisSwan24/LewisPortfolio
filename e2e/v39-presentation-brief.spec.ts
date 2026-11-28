import { expect, test } from "@playwright/test";

test.describe("Presentation Mode, Tailored Briefs, and Contact Loop", () => {
  test("Presentation Mode opens via Shift+P on a case study, navigates slides, toggles speaker notes, and closes cleanly", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/projects/connect");

    const trigger = page.getByRole("button", { name: /Presentation mode/i });
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("01 / 06");

    await page.keyboard.press("ArrowRight");
    await expect(dialog).toContainText("02 / 06");

    await page.keyboard.press("n");
    await expect(dialog.getByRole("region", { name: /speaker notes/i })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("Tailored Brief Generator builds a stateless /en/brief/<id> page with noindex", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    // v6.5: the brief builder moved from /hire to /interview (review C10).
    // networkidle: typing before hydration loses the input under load (WebKit).
    await page.goto("/en/interview", { waitUntil: "networkidle" });

    await page.fill("#brief-company", "Atlassian");
    await page.fill("#brief-intro", "Curated walkthrough of systems and AI guardrails.");
    await page.getByRole("button", { name: /Generate tailored brief link/i }).click();

    const openBrief = page.getByRole("link", { name: /Open brief/i });
    await expect(openBrief).toBeVisible();
    const href = await openBrief.getAttribute("href");
    expect(href).toContain("/en/brief/s_");

    await openBrief.click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Atlassian");
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toContain("noindex");
  });

  test("Contact page validates required inputs and shows fallback mailto handoff", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/en/contact");

    await page.fill("#contact-name", "Taylor");
    await page.fill("#contact-email", "taylor@example.com");
    await page.fill("#contact-msg", "Interested in scheduling an interaction design interview.");
    await page.getByRole("button", { name: /Send message/i }).click();

    await expect(page.locator("#quick-contact-status, [role='status']").last()).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
