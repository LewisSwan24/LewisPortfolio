import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/**
 * v7.0 block 4: fixes from the third full-site review (Lewis 28 Nov 2026, picked
 * F1–F8, F10, F11, P2, P3, T1). Findings: side-session-notes v7-0-review-findings.md.
 */

const PHONE = { width: 390, height: 844 };
const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

test("F1 /ai inputs are at least 16px on a phone, so iOS Safari does not zoom", async ({ page }) => {
  await page.setViewportSize(PHONE);
  for (const path of ["/ai", "/zh/ai"]) {
    await page.goto(path, { waitUntil: "load" });
    for (const sel of ["#ai-workbench-query", "#mcp-args-textarea"]) {
      const size = await page.locator(sel).evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
      expect(size, `${path} ${sel}`).toBeGreaterThanOrEqual(16);
    }
  }
});

async function labelInName(page: Page, include: string) {
  const r = await new AxeBuilder({ page }).withRules(["label-content-name-mismatch"]).include(include).analyze();
  return r.violations.flatMap((v) => v.nodes.map((n) => n.html.slice(0, 160)));
}

test("F2 the phone chapter pill's name contains its visible text", async ({ page }) => {
  await page.setViewportSize(PHONE);
  for (const path of ["/projects/walkie", "/zh/projects/walkie"]) {
    await page.goto(path, { waitUntil: "load" });
    await page.locator("#interactive-demo").evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
    const pill = page.locator("[data-chapter-pill]");
    await expect(pill).toBeVisible();
    // textContent, not innerText: axe (and WebKit's run of it) reads the DOM
    // text, where two adjacent spans with no space between them run together.
    const { text, name } = await pill.evaluate((el) => {
      const copy = el.cloneNode(true) as HTMLElement;
      copy.querySelectorAll("[aria-hidden='true']").forEach((n) => n.remove());
      return { text: (copy.textContent ?? "").replace(/\s+/g, " ").trim(), name: el.getAttribute("aria-label") ?? "" };
    });
    expect(name, path).toContain(text);
    expect(await labelInName(page, "[data-chapter-pill]"), path).toEqual([]);
  }
});

test("F3 the zh diagram zoom button's name contains its visible text", async ({ page }) => {
  await page.goto("/zh/projects/walkie", { waitUntil: "load" });
  expect(await labelInName(page, "[data-diagram-zoom-trigger]")).toEqual([]);
});

async function headingSkips(page: Page) {
  return page.evaluate(() => {
    const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(
      (h) => h.getClientRects().length && !h.closest("[aria-hidden='true'], [hidden]"),
    );
    const out: string[] = [];
    for (let i = 1; i < hs.length; i++) {
      const a = Number(hs[i - 1].tagName[1]);
      const b = Number(hs[i].tagName[1]);
      if (b > a + 1) out.push(`h${a}→h${b}: ${hs[i].textContent?.trim().slice(0, 40)}`);
    }
    return out;
  });
}

test("F4/F5 no heading level is skipped on the main pages, en and zh", async ({ page }) => {
  test.setTimeout(120_000);
  const pages = ["/", "/projects", "/vault", "/lab", "/ai", "/blog", "/about", "/hire", "/interview", "/resume", "/no-such-page-v70"];
  const bad: string[] = [];
  for (const p of pages) {
    for (const prefix of ["", "/zh"]) {
      const path = prefix + (p === "/" && prefix ? "" : p);
      await page.goto(path, { waitUntil: "load" });
      for (const s of await headingSkips(page)) bad.push(`${path}: ${s}`);
    }
  }
  expect(bad).toEqual([]);
});

test("F6 every nav on a blog post has a name", async ({ page }) => {
  for (const path of ["/blog/ux-research-methods-guide", "/zh/blog/ux-research-methods-guide"]) {
    for (const size of [PHONE, { width: 1440, height: 900 }]) {
      await page.setViewportSize(size);
      await page.goto(path, { waitUntil: "load" });
      const unnamed = await page.evaluate(() =>
        [...document.querySelectorAll("nav, [role=navigation]")]
          .filter((n) => !n.getAttribute("aria-label") && !n.getAttribute("aria-labelledby"))
          .map((n) => (n.textContent ?? "").trim().slice(0, 40)),
      );
      expect(unnamed, `${path} @${size.width}`).toEqual([]);
    }
  }
});

test("F7 heading anchors are named in the page's language and at least 24px wide", async ({ page }) => {
  await page.goto("/zh/blog/ux-research-methods-guide", { waitUntil: "load" });
  const anchors = page.locator("article h2 a[href^='#'], article h3 a[href^='#'], main h2 > a[href^='#'], main h3 > a[href^='#']");
  expect(await anchors.count()).toBeGreaterThan(0);
  const info = await anchors.evaluateAll((els) =>
    els.map((el) => ({ name: el.getAttribute("aria-label") ?? "", w: el.getBoundingClientRect().width })),
  );
  for (const a of info) {
    expect(a.name).not.toMatch(/^Link to/);
    expect(a.w, a.name).toBeGreaterThanOrEqual(24);
  }
});

test("F8 the blog post's back link is at least 24px tall", async ({ page }) => {
  await page.setViewportSize(PHONE);
  for (const path of ["/blog/ux-research-methods-guide", "/zh/blog/ux-research-methods-guide"]) {
    await page.goto(path, { waitUntil: "load" });
    const h = await page.locator("a.cs-back").first().evaluate((el) => el.getBoundingClientRect().height);
    expect(h, path).toBeGreaterThanOrEqual(24);
  }
});

test("F10 the home title names Lewis once", async ({ page }) => {
  for (const path of ["/", "/zh"]) {
    await page.goto(path, { waitUntil: "load" });
    const title = await page.title();
    expect(title.match(/Lewis Dong/g)?.length, title).toBe(1);
  }
});

test("F11 title and description are in <head> for an ordinary browser", async ({ request }) => {
  for (const path of ["/", "/zh", "/projects/walkie", "/blog"]) {
    const html = await (await request.get(path, { headers: { "user-agent": IPHONE_UA } })).text();
    const headEnd = html.indexOf("</head>");
    expect(html.indexOf("<title>"), `${path} title`).toBeGreaterThan(-1);
    expect(html.indexOf("<title>"), `${path} title`).toBeLessThan(headEnd);
    expect(html.indexOf('name="description"'), `${path} description`).toBeGreaterThan(-1);
    expect(html.indexOf('name="description"'), `${path} description`).toBeLessThan(headEnd);
  }
});

test("P2 a case page preloads only its own cover, not the related-case images below", async ({ request }) => {
  for (const [path, own] of [
    ["/projects/walkie", "walkie"],
    ["/projects/autofill", "autofill"],
  ] as const) {
    const html = await (await request.get(path)).text();
    const preloads = [...html.matchAll(/<link[^>]*rel="preload"[^>]*as="image"[^>]*>/g)].map((m) => m[0]);
    expect(preloads.length, `${path}: ${preloads.map((p) => p.slice(0, 120)).join("\n")}`).toBeLessThanOrEqual(1);
    for (const p of preloads) expect(p, path).toContain(`%2Fprojects%2F${own}%2F`);
  }
});

test("P3 an interaction sends an INP beacon when the page is hidden", async ({ page, browserName }) => {
  // Playwright's WebKit sees the beacon request but gets an empty body, so the
  // metric cannot be read there; Firefox was not checked.
  test.skip(browserName !== "chromium", "beacon bodies are readable in Chromium only");
  const sent: string[] = [];
  await page.route("**/api/vitals", async (route) => {
    if (route.request().method() === "POST") sent.push(route.request().postData() ?? "");
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  // v7.1: automated browsers send no beacons (navigator.webdriver), so this
  // page has to look like a real visitor for the INP beacon to be sent.
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "webdriver", { get: () => false, configurable: true });
  });
  await page.goto("/patterns", { waitUntil: "networkidle" });
  // A real click, so the browser records an event-timing entry.
  await page.locator("main button").first().click();
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", { value: "hidden", configurable: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(() => sent.some((b) => b.includes('"metric":"INP"')), { timeout: 5000 }).toBe(true);
});
