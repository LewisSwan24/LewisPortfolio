import { expect, test, type Browser, type Page } from "@playwright/test";

/**
 * v6.9 phase C (second full-site review): one name per thing, and Chinese
 * pages in Chinese. R08–R17. Names picked by Lewis: "Hire & CV" / 招聘与简历,
 * 演进档案馆, UI Lab / AI Lab (UI 实验室 / AI 实验室), "Interaction & Product
 * Designer", no "(/path)" in on-screen labels.
 */

const PHONE = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } as const;
const DESKTOP = { viewport: { width: 1440, height: 900 } } as const;

async function open(browser: Browser, path: string, opts: object = DESKTOP) {
  const ctx = await browser.newContext({ ...opts, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(path, { waitUntil: "networkidle" });
  return { ctx, page };
}

/** Names and code that stay in English on Chinese pages. */
const KEEP_ENGLISH = [
  // case, product and tool names
  /^(Walkie|MazeRunners|Lamplight( Nook)?|Resume Autofill|Autofill|On The Beat|Grassland( Iron Tide)?|UQ Connect|PriceWise|Fencepost|Lewis Dong|GitHub|Figma|Miro|GSAP|Three\.js|Arduino Mega|ESP32 \/ M5StickS3|Web Serial|Phaser \/ Canvas|TypeScript|React \/ Next\.js|Tailwind CSS|Playwright \/ Vitest|Next\.js|ESP32-S3|Service Worker|Claude Code|Fly\.io)$/,
  // case slugs used as tags
  /^(walkie|maze|autofill|lamplight|onthebeat|grassland|fencepost)( \/ (walkie|maze|autofill|lamplight|onthebeat|grassland))?$/,
  // fonts, easing curves, tokens
  /^(Space Grotesk|Inter|Geist Mono|Noto Sans SC)\b/,
  /^(power\d|back|expo|sine)\.(in|out|inOut)(\(.*\))?$/,
  /^#[0-9A-F]{6}$/i,
  // identifiers and values: snake/camel case, paths, URLs, emails, HTTP, protocols
  /^[a-z]+([A-Z][a-z0-9]*)+$/,
  /^[A-Z0-9]+(_[A-Z0-9]+)+$/,
  /[/@]|\.[a-z]{2,}\b|::|\bGET\b|^\{/,
  /\b(AES|USB|PCM|DTR|WSS|CDC|MCP|WCAG|ATS)\b/,
  // a name followed by an outbound marker: "Walkie GitHub ↗"
  /^[\w .]+ GitHub ↗$/,
  /^GitHub ↗$/,
  /^\(Shift\+P\)$/,
  // web-vitals metric names and a build-mode id
  /^(LCP|INP|CLS) \(p75\)( ·)?$/,
  /^next-build-static$/,
  // course codes
  /^\d{4} · [A-Z]{4}\d{4}$/,
];

/** "Electron · Phaser · TypeScript": a list of tool names. */
const isToolList = (s: string) =>
  s.includes("·") && s.split(/\s*·\s*/).every((p) => /^[A-Z][\w.+-]*(\s[A-Z0-9][\w.+-]*)*(（[^）]*）)?$/.test(p));

async function englishLeft(page: Page) {
  const strings: string[] = await page.evaluate(() => {
    const out = new Set<string>();
    const root = document.querySelector("main") ?? document.body;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n: Node | null;
    while ((n = w.nextNode())) {
      const s = (n.textContent ?? "").trim();
      if (!s || /[一-鿿]/.test(s) || !/[A-Za-z]{3,}/.test(s)) continue;
      const el = n.parentElement;
      if (!el || el.closest("script, style, code, pre, svg, [aria-hidden=true]")) continue;
      if (el.getBoundingClientRect().width === 0) continue;
      out.add(s.replace(/\s+/g, " "));
    }
    return [...out];
  });
  return strings.filter((s) => !isToolList(s) && !KEEP_ENGLISH.some((re) => re.test(s)));
}

test.describe("R08/R10/R12 Chinese pages carry no stray English labels", () => {
  const PAGES = [
    "/zh", "/zh/ai", "/zh/hire", "/zh/interview", "/zh/studio/graph", "/zh/vault",
    "/zh/resume/compose", "/zh/patterns", "/zh/projects", "/zh/lab",
    "/zh/projects/onthebeat", "/zh/projects/grassland", "/zh/projects/lamplight",
    "/zh/projects/autofill", "/zh/projects/connect", "/zh/projects/walkie",
  ];
  for (const path of PAGES) {
    test(path, async ({ browser }) => {
      test.setTimeout(60_000);
      const { ctx, page } = await open(browser, path);
      expect(await englishLeft(page)).toEqual([]);
      await ctx.close();
    });
  }
});

test.describe("R08 keyboard hint", () => {
  test("(Shift+P) shows with a keyboard and pointer, not on a phone", async ({ browser }) => {
    const desk = await open(browser, "/en/projects/walkie");
    await expect(desk.page.locator(".presentation-shortcut").first()).toBeVisible();
    await desk.ctx.close();
    const phone = await open(browser, "/zh/projects/walkie", PHONE);
    await expect(phone.page.locator(".presentation-shortcut").filter({ visible: true })).toHaveCount(0);
    await phone.ctx.close();
  });
});

test.describe("R09 case diagrams in Chinese", () => {
  for (const slug of ["walkie", "maze", "autofill", "onthebeat", "grassland"]) {
    test(`zh ${slug}: every drawing has Chinese text; en has none`, async ({ browser }) => {
      for (const [locale, wantHan] of [["zh", true], ["en", false]] as const) {
        const { ctx, page } = await open(browser, `/${locale}/projects/${slug}`);
        await page.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
        await page.locator("svg.case-adaptive-svg").first().waitFor();
        const han = await page.evaluate(() =>
          [...document.querySelectorAll("main svg.case-adaptive-svg")].map((svg) => /[一-鿿]/.test(svg.textContent ?? ""))
        );
        expect(han.length).toBeGreaterThan(0);
        expect(han, `${locale} ${slug}`).toEqual(han.map(() => wantHan));
        await ctx.close();
      }
    });
  }
});

test.describe("R11 blog post chrome", () => {
  test("zh post: related list, share label and dates are Chinese", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/zh/blog/swansea-cs-to-uq-physical-computing");
    const main = page.locator("main");
    await expect(main.getByText("Related Articles")).toHaveCount(0);
    await expect(main.getByText("Share:")).toHaveCount(0);
    const dates = await page.locator("main time").allTextContents();
    expect(dates.length).toBeGreaterThan(0);
    for (const d of dates) expect(d).not.toMatch(/[A-Z][a-z]{2} \d/);
    await ctx.close();
  });
});

const OLD_NAMES_EN = /Hiring overview|Hiring Decision Room|Hiring dossier|hiring dossier|the hiring page|Lab Workbench|AI Red-Team Defense|Lab · V4/;
const OLD_NAMES_ZH = /招聘速览|招聘决策|招聘简报|岗位与证据简报|招聘页|档案解剖|设计演进档案馆|复盘档案馆|死亡解剖档案馆|Archive Vault|实验室工作台|设计实验室|AI 红队答辩|^实验室 · /m;

test.describe("R13–R15 one name per page", () => {
  const PAGES = ["", "/hire", "/interview", "/contact", "/resume", "/studio/replay", "/studio/graph", "/about", "/projects", "/vault", "/blog", "/lab", "/ai"];
  for (const locale of ["en", "zh"] as const) {
    test(`${locale}: no retired names in pages, titles or footer`, async ({ browser }) => {
      test.setTimeout(120_000);
      const ctx = await browser.newContext(DESKTOP);
      const page = await ctx.newPage();
      const hits: string[] = [];
      for (const p of PAGES) {
        await page.goto(`/${locale}${p}`, { waitUntil: "domcontentloaded" });
        const text = `${await page.title()}\n${await page.locator("body").innerText()}`;
        const m = text.match(locale === "en" ? OLD_NAMES_EN : OLD_NAMES_ZH);
        if (m) hits.push(`${p || "/"}: ${m[0]}`);
      }
      expect(hits).toEqual([]);
      await ctx.close();
    });
  }

  test("hiring page is called Hire & CV / 招聘与简历", async ({ browser }) => {
    for (const [locale, name] of [["en", "Hire & CV"], ["zh", "招聘与简历"]] as const) {
      const { ctx, page } = await open(browser, `/${locale}/hire`);
      expect(await page.title()).toContain(name);
      await expect(page.locator("main .label", { hasText: name }).filter({ visible: true }).first()).toHaveText(name);
      await ctx.close();
    }
  });

  test("Archive Vault is 演进档案馆 on zh", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/zh/vault");
    expect(await page.title()).toContain("演进档案馆");
    await ctx.close();
  });

  test("Lab pages carry the nav names in their titles", async ({ browser }) => {
    for (const [path, name] of [["/en/lab", "UI Lab"], ["/zh/lab", "UI 实验室"], ["/en/ai", "AI Lab"], ["/zh/ai", "AI 实验室"]] as const) {
      const { ctx, page } = await open(browser, path);
      const title = await page.title();
      expect(title.startsWith(`${name} · `), `${path}: ${title}`).toBe(true);
      await ctx.close();
    }
  });
});

test.describe("R16 one job title", () => {
  test("résumé composer headline opens with Interaction & Product Designer", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/en/resume/compose");
    const body = await page.locator("main").innerText();
    expect(body).not.toMatch(/Interaction Designer ·|Trust Guardrail Engineer/);
    expect(body).toContain("Interaction & Product Designer");
    await ctx.close();
  });

  test("zh /hire shows the Design Engineer lens as 设计工程师", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/zh/hire");
    await expect(page.locator("main").getByText("Design Engineer", { exact: true })).toHaveCount(0);
    await expect(page.locator("main").getByText("设计工程师").first()).toBeVisible();
    await ctx.close();
  });
});

test.describe("R17 no paths inside labels", () => {
  for (const path of ["/en/blog", "/zh/blog", "/en/studio/replay", "/zh/studio/replay", "/en/studio/graph", "/zh/studio/graph"]) {
    test(path, async ({ browser }) => {
      const { ctx, page } = await open(browser, path);
      const labels = await page.locator("main a, main button").allInnerTexts();
      expect(labels.filter((t) => /\(\/[a-z]/.test(t))).toEqual([]);
      await ctx.close();
    });
  }

  test("command palette entries", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/en");
    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const labels = await dialog.locator("button, a, [role=option]").allInnerTexts();
    expect(labels.length).toBeGreaterThan(3);
    expect(labels.filter((t) => /\(\/[a-z]/.test(t))).toEqual([]);
    await ctx.close();
  });
});

test.describe("R12 404", () => {
  test("zh 404 tab title is Chinese", async ({ browser }) => {
    const { ctx, page } = await open(browser, "/zh/no-such-page-v69");
    expect(await page.title()).toMatch(/[一-鿿]/);
    await ctx.close();
  });
});
