import { expect, test, type Page } from "@playwright/test";

/**
 * v7.0 block 2: site structure (Lewis 28 Nov 2026, 「七項照建議全做」).
 * S1 footer in three groups, S2 /studio/graph folded into /vault, S3 no
 * duplicate arena on /interview, L1–L4 long pages fold without losing content.
 */

const PHONE = { width: 393, height: 727 };

async function screens(page: Page) {
  return page.evaluate(() => document.documentElement.scrollHeight / innerHeight);
}

test.describe("S1 footer groups", () => {
  for (const [path, heads] of [
    ["/", ["Work", "Labs", "About"]],
    ["/zh", ["作品", "实验室", "关于我"]],
  ] as const) {
    test(`${path} footer has three site groups and no list over five links`, async ({ page }) => {
      await page.setViewportSize(PHONE);
      await page.goto(path);
      const footer = page.locator("footer.pd-footer");
      for (const h of heads) await expect(footer.locator("h2", { hasText: new RegExp(`^${h}$`) })).toHaveCount(1);
      const sizes = await footer.locator("ul").evaluateAll((uls) => uls.map((u) => u.querySelectorAll("a").length));
      expect(Math.max(...sizes)).toBeLessThanOrEqual(5);
      await expect(footer.locator('a[href$="/studio/graph"]')).toHaveCount(0);
      for (const href of ["/projects", "/patterns", "/vault", "/lab", "/ai", "/studio/replay", "/about", "/blog", "/resume", "/hire", "/contact"]) {
        await expect(footer.locator(`a[href$="${href}"]`).first()).toBeAttached();
      }
    });
  }
});

test.describe("S2 lineage graph lives on /vault", () => {
  for (const [from, to] of [
    ["/studio/graph", "/vault#lineage-graph"],
    ["/en/studio/graph", "/vault#lineage-graph"],
    ["/zh/studio/graph", "/zh/vault#lineage-graph"],
  ] as const) {
    test(`${from} redirects permanently to ${to}`, async ({ request }) => {
      const res = await request.get(from, { maxRedirects: 0 });
      expect([301, 308]).toContain(res.status());
      expect(new URL(res.headers()["location"], "http://x").pathname + "#" + (res.headers()["location"].split("#")[1] ?? "")).toBe(to);
    });
  }

  test("the graph opens on /vault when the URL names it", async ({ page }) => {
    await page.goto("/studio/graph");
    await expect(page).toHaveURL(/\/vault#lineage-graph$/);
    const fold = page.locator("details#lineage-graph");
    await expect(fold).toHaveAttribute("open", "");
    await expect(fold.getByTestId("graph-view-split")).toBeVisible();
  });

  test("/vault keeps the graph folded by default", async ({ page }) => {
    await page.goto("/vault");
    const fold = page.locator("details#lineage-graph");
    await expect(fold).toBeAttached();
    await expect(fold).not.toHaveAttribute("open", "");
    await fold.locator("summary").click();
    await expect(fold.getByTestId("graph-view-split")).toBeVisible();
  });

  test("sitemap and palette entry points drop /studio/graph", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).not.toContain("/studio/graph");
  });
});

test.describe("S3 /interview links to the arena on /ai", () => {
  test("/interview has no copy of the arena and links to /ai", async ({ page }) => {
    await page.goto("/interview");
    await expect(page.getByTestId("interview-defense-arena")).toHaveCount(0);
    await expect(page.locator('main a[href$="/ai#defense-arena"]')).toHaveCount(1);
  });

  test("/zh/interview links to the zh arena", async ({ page }) => {
    await page.goto("/zh/interview");
    await expect(page.getByTestId("interview-defense-arena")).toHaveCount(0);
    await expect(page.locator('main a[href="/zh/ai#defense-arena"]')).toHaveCount(1);
  });

  test("/ai still has the arena", async ({ page }) => {
    await page.goto("/ai");
    await expect(page.getByTestId("interview-defense-arena")).toBeVisible();
  });
});

test.describe("L1 /blog shows the newest ten", () => {
  for (const [path, more] of [
    ["/blog", /^Show all (\d+) posts$/],
    ["/zh/blog", /^显示全部 (\d+) 篇$/],
  ] as const) {
    test(`${path} lists 10, then all on request; filters search every post`, async ({ page }) => {
      await page.goto(path);
      const posts = page.locator("main a.idx-flag");
      await expect(posts).toHaveCount(10);
      const button = page.getByRole("button", { name: more });
      const total = Number((await button.textContent())!.match(more)![1]);
      expect(total).toBeGreaterThan(10);
      await button.click();
      await expect(posts).toHaveCount(total);
      await expect(posts.nth(10)).toBeFocused();
      await expect(button).toHaveCount(0);
    });
  }

  test("a cluster filter shows every matching post, not the first ten", async ({ page }) => {
    await page.goto("/blog");
    const chips = page.locator('[data-testid^="blog-cluster-"]:not([data-testid="blog-cluster-all"])');
    const labels = await chips.allTextContents();
    const biggest = labels
      .map((l, i) => ({ i, n: Number(l.match(/\((\d+)\)/)?.[1] ?? 0) }))
      .sort((a, b) => b.n - a.n)[0];
    await chips.nth(biggest.i).click();
    await expect(page.locator("main a.idx-flag")).toHaveCount(biggest.n);
  });
});

test.describe("L2 /lab folds the token and state-graph modules", () => {
  for (const id of ["lab-fold-tokens", "lab-fold-fsm"]) {
    test(`${id} shows one screen, then everything`, async ({ page }) => {
      await page.setViewportSize(PHONE);
      await page.goto("/lab");
      const fold = page.getByTestId(id);
      const toggle = fold.getByRole("button", { name: /^(Show all|显示全部)/ });
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      const closed = (await fold.boundingBox())!.height;
      expect(closed).toBeLessThanOrEqual(PHONE.height * 1.15);
      await toggle.click();
      await expect(fold.getByRole("button", { name: /^(Show less|收起)/ })).toHaveAttribute("aria-expanded", "true");
      const open = (await fold.boundingBox())!.height;
      expect(open).toBeGreaterThan(closed + 200);
    });
  }

  test("tabbing into folded content opens the fold", async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("/lab");
    const fold = page.getByTestId("lab-fold-fsm");
    const hiddenControl = fold.locator(".foldable-body").locator("button, a, input, select").last();
    await hiddenControl.focus();
    await expect(fold.getByRole("button", { name: /^(Show less|收起)/ })).toBeVisible();
  });

  test("/lab on a phone is at least 5 screens shorter", async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("/lab");
    // 19.7 screens before the folds and 13.8 after (28 Nov 2026). The proposal
    // estimated about 9 saved; the two folded modules were ~3.5 screens each.
    expect(await screens(page)).toBeLessThan(14.7);
  });
});

test.describe("L3 case photos show two, then all", () => {
  test("/projects/grassland shows 2 of its photos until asked", async ({ page }) => {
    await page.goto("/projects/grassland");
    const grid = page.locator("#built .case-build-grid");
    await expect(grid.locator("figure:visible")).toHaveCount(2);
    const more = page.locator("#built").getByRole("button", { name: /^Show all (\d+) photos$/ });
    const total = Number((await more.textContent())!.match(/(\d+)/)![1]);
    expect(total).toBe(await grid.locator("figure").count());
    await more.click();
    await expect(grid.locator("figure:visible")).toHaveCount(total);
    await expect(grid.locator("figure").nth(2).locator("button")).toBeFocused();
  });

  test("the lightbox still steps through every photo while folded", async ({ page }) => {
    await page.goto("/projects/grassland");
    const grid = page.locator("#built .case-build-grid");
    const total = await grid.locator("figure").count();
    const lastAlt = await grid.locator("figure").last().locator("img").getAttribute("alt");
    await grid.locator("figure").first().locator("button").click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    for (let i = 1; i < total; i += 1) await page.keyboard.press("ArrowRight");
    await expect(dialog.locator(`img[alt="${lastAlt}"]`)).toBeVisible();
  });

  test("zh case says 显示全部 N 张", async ({ page }) => {
    await page.goto("/zh/projects/grassland");
    await expect(page.locator("#built").getByRole("button", { name: /^显示全部 \d+ 张$/ })).toBeVisible();
  });

  test("a case with two photos has no button", async ({ page }) => {
    await page.goto("/projects/autofill");
    await expect(page.locator("#built").getByRole("button", { name: /^Show all/ })).toHaveCount(0);
  });
});

test.describe("L4 vault cards fold", () => {
  test("each card shows title and reason; the rest opens on request", async ({ page }) => {
    await page.goto("/vault");
    const cards = page.locator('[data-testid^="vault-card-"]');
    const n = await cards.count();
    expect(n).toBe(7);
    for (let i = 0; i < n; i += 1) {
      const card = cards.nth(i);
      await expect(card.locator("h3")).toBeVisible();
      await expect(card.getByTestId("vault-reason")).toBeVisible();
      await expect(card.getByText("What was built")).toBeHidden();
    }
    const first = cards.first();
    await first.locator("details > summary").click();
    await expect(first.getByText("What was built")).toBeVisible();
    await expect(first.getByRole("link", { name: /Inspect raw archive/ })).toBeVisible();
  });

  test("/vault on a phone is at least 5 screens shorter", async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("/vault");
    // 13.3 screens measured on 28 Nov 2026 before the fold.
    expect(await screens(page)).toBeLessThan(8.3);
  });
});
