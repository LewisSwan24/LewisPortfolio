import { test, expect } from "@playwright/test";

const BLOG_SLUGS = [
  "designing-for-ai",
  "ux-research-methods-guide",
  "accessibility-in-design",
  "v3-architecture-and-performance-moat",
  "walkie-and-fencepost-invariants",
];

const PUBLIC_ROUTES = [
  "/en",
  "/zh",
  "/en/projects",
  "/zh/projects",
  "/en/about",
  "/zh/about",
  "/en/lab",
  "/zh/lab",
  "/en/hire",
  "/zh/hire",
  "/en/resume",
  "/zh/resume",
  "/en/contact",
  "/zh/contact",
  "/en/blog",
  "/zh/blog",
  ...BLOG_SLUGS.flatMap((slug) => [`/en/blog/${slug}`, `/zh/blog/${slug}`]),
  "/en/projects/maze",
  "/en/projects/walkie",
  "/en/projects/lamplight",
  "/en/projects/autofill",
  "/en/projects/fencepost",
  "/en/projects/connect",
  "/en/projects/hoop",
  "/en/projects/pricewise",
  "/en/projects/grassland",
  "/en/projects/onthebeat",
];

const UNLISTED_SLUGS = ["vigil", "spectra", "gapmapper", "rules"];

test.describe("V3.2 Site-Wide Crawler, Interactive Dialog & Endpoints", () => {
  test("crawls all public routes with zero console/page errors, valid anchors, and no unlisted or retired leaks", async ({
    page,
  }) => {
    test.setTimeout(240_000);

    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    const failedSameOriginResponses: string[] = [];
    const anchorsByPath = new Map<string, Set<string>>();
    const crossPageHashLinks: Array<{ source: string; href: string }> = [];

    page.on("pageerror", (err) => pageErrors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });
    page.on("response", (res) => {
      const url = res.url();
      if (url.startsWith("http://127.0.0.1") && res.status() >= 400) {
        failedSameOriginResponses.push(`${res.status()} ${url}`);
      }
    });

    for (const route of PUBLIC_ROUTES) {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `HTTP status on ${route}`).toBe(200);
      await expect(page.locator("#main-content")).toBeVisible();

      const idsOnPage = await page.evaluate(() =>
        Array.from(document.querySelectorAll("[id]")).map((el) => el.id).filter(Boolean)
      );
      anchorsByPath.set(route, new Set(idsOnPage));
      if (route.startsWith("/en")) {
        anchorsByPath.set(route.replace(/^\/en(?=\/|$)/, "") || "/", new Set(idsOnPage));
      }

      const hrefs = await page.locator("main a[href^='/'], header a[href^='/']").evaluateAll((els) =>
        els.map((el) => el.getAttribute("href") || "")
      );

      for (const href of hrefs) {
        for (const hidden of UNLISTED_SLUGS) {
          expect(href, `Unlisted leak (${hidden}) found on ${route}`).not.toContain(
            `/projects/${hidden}`
          );
        }
        expect(href, `Retired /hire/* link found on ${route}`).not.toMatch(/^\/(?:en\/|zh\/)?hire\//);
        if (route.startsWith("/zh/blog/")) {
          const pathOnly = href.split(/[?#]/)[0];
          if (pathOnly.startsWith("/projects/") || pathOnly.startsWith("/blog/")) {
            throw new Error(`Cross-locale unprefixed link "${href}" inside ${route}`);
          }
        }
        const hashIdx = href.indexOf("#");
        if (hashIdx > 0) {
          crossPageHashLinks.push({ source: route, href });
        }
      }

      // Check local fragment jump links on the current route resolve to real element IDs
      const hashTargets = await page.locator("main a[href^='#']").evaluateAll((els) =>
        els.map((el) => decodeURIComponent((el.getAttribute("href") || "").slice(1))).filter(Boolean)
      );
      for (const id of hashTargets) {
        const exists = await page.evaluate((targetId) => Boolean(document.getElementById(targetId)), id);
        expect(exists, `Missing anchor #${id} on ${route}`).toBe(true);
      }
    }

    for (const { source, href } of crossPageHashLinks) {
      const [rawPath, rawHash] = href.split("#");
      const targetPath = rawPath.split("?")[0];
      const targetId = decodeURIComponent(rawHash || "");
      if (!targetId) continue;
      let targetIds = anchorsByPath.get(targetPath);
      if (!targetIds) {
        await page.goto(targetPath, { waitUntil: "domcontentloaded" });
        const ids = await page.evaluate(() =>
          Array.from(document.querySelectorAll("[id]")).map((el) => el.id).filter(Boolean)
        );
        targetIds = new Set(ids);
        anchorsByPath.set(targetPath, targetIds);
      }
      expect(
        targetIds.has(targetId),
        `Broken cross-page anchor "${href}" linked from ${source}`
      ).toBe(true);
    }

    expect(pageErrors, "Uncaught page errors").toEqual([]);
    expect(consoleErrors, "Console errors").toEqual([]);
    expect(failedSameOriginResponses, "Same-origin 4xx/5xx responses").toEqual([]);
  });

  test("/llms.txt and static /search-index/{en,zh} endpoints serve clean data", async ({
    page,
  }) => {
    const llmsRes = await page.request.get("/llms.txt");
    expect(llmsRes.status()).toBe(200);
    const llmsBody = await llmsRes.text();
    expect(llmsBody).toContain("# Lewis Dong");
    expect(llmsBody).toContain("/en/projects/walkie");
    expect(llmsBody).toContain("/en/projects/fencepost");
    for (const hidden of UNLISTED_SLUGS) {
      expect(llmsBody).not.toContain(`/projects/${hidden}`);
    }

    for (const locale of ["en", "zh"] as const) {
      const searchRes = await page.request.get(`/search-index/${locale}`);
      expect(searchRes.status(), locale).toBe(200);
      const items = (await searchRes.json()) as Array<{ type: string; slug: string }>;
      expect(items.filter((i) => i.type === "project").length).toBe(10);
      expect(items.some((i) => i.type === "blog")).toBe(true);
    }
  });

  test("native <dialog> lightbox opens, navigates with keyboard arrows, and closes on Esc", async ({
    page,
  }) => {
    await page.goto("/en/projects/fencepost", { waitUntil: "networkidle" });
    const trigger = page.locator(".case-build-trigger").first();
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.locator("dialog.case-lightbox");
    await expect(dialog).toHaveAttribute("open", "");
    await expect(dialog).toContainText("01 / 03");

    await page.keyboard.press("ArrowRight");
    await expect(dialog).toContainText("02 / 03");

    await page.keyboard.press("Escape");
    await expect(dialog).not.toHaveAttribute("open", "");
  });

  test("case invariant card links cleanly into /lab?demo=walkie and Lamplight loads companion embed", async ({
    page,
  }) => {
    await page.goto("/en/projects/walkie", { waitUntil: "networkidle" });
    const labLink = page.getByRole("link", { name: /Inspect Walkie in \/lab/i });
    await expect(labLink).toBeVisible();
    await labLink.click();

    await expect(page).toHaveURL(/\/lab\?demo=walkie/);
    const walkieTab = page.getByRole("tab", { name: /Walkie/i });
    await expect(walkieTab).toHaveAttribute("aria-selected", "true");

    await page.goto("/en/projects/lamplight", { waitUntil: "networkidle" });
    const embedBtn = page.getByRole("button", { name: /Load Lamplight Nook site/i });
    await expect(embedBtn).toBeVisible();
    await embedBtn.click();
    await expect(page.locator(".case-demo iframe")).toHaveAttribute(
      "src",
      "https://lewisswan24.github.io/lamplight-nook-site/"
    );
  });
});
