import { expect, test, type Locator, type Page } from "@playwright/test";

// Listed cases only: vigil, spectra, rules and gapmapper are unlisted, so no
// proof link may point at them.
const anchoredCaseProofHref =
    /\/projects\/(connect|ai|maze|hoop|pricewise|grassland|onthebeat|lamplight|autofill|walkie|fencepost)#(decision-timeline|evidence-board|iteration-gallery|outcome-limits|interview-takeaway|interviewer-scan)$/;

/**
 * Next's dev server sometimes issues a full reload while it compiles a route for
 * the first time, which cancels an in-flight goto with "interrupted by another
 * navigation". WebKit hits it most. The page itself is fine — retry rather than
 * report a product failure that does not exist.
 */
async function gotoStable(page: Page, url: string) {
    for (let attempt = 0; ; attempt += 1) {
        try {
            await page.goto(url);
            return;
        } catch (error) {
            const interrupted = String(error).includes("interrupted by another navigation");
            if (!interrupted || attempt >= 2) throw error;
        }
    }
}

async function expectAnchoredCaseProofLink(link: Locator) {
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");

    expect(href).toMatch(anchoredCaseProofHref);
}

test.describe("Portfolio Homepage", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should have correct page title", async ({ page }) => {
        await expect(page).toHaveTitle(/Lewis Dong/);
    });

    test("should display the current hero", async ({ page }) => {
        // Two-layer positioning: the headline states the capability with no tool
        // names, the lede underneath names the tools.
        await expect(page.getByRole("heading", { level: 1 })).toContainText(/actually use/i);
        await expect(page.locator(".hero-lede")).toContainText(/Claude Code|Codex/);
    });

    // Homepage focuses directly on practice notes, featured cases, and
    // approach without duplicating /hire's dossier blocks.
    test("homepage stays focused without duplicated hiring proof desk and links to /hire", async ({ page }) => {
        await expect(page.locator(".hiring-proof-desk")).toHaveCount(0);
        await expect(page.locator(".hiring-role-fit")).toHaveCount(0);
        await expect(page.locator(".hero-hire-link")).toHaveAttribute("href", "/hire");
        await expect(page.locator(".feat-deck")).toBeVisible();
    });

    test("should have working navigation", async ({ page }) => {
        const primaryNav = page.getByRole("navigation", { name: "Primary" });

        if (await primaryNav.isVisible()) {
            await primaryNav.getByRole("link", { name: "Work" }).click();
        } else {
            await page.getByRole("button", { name: "Open menu" }).click();
            const mobileNav = page.getByRole("navigation", { name: "Mobile primary" });
            await expect(mobileNav).toBeVisible();
            await mobileNav.getByRole("link", { name: "Work" }).click();
        }

        await expect(page).toHaveURL(/\/projects$/);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test("should toggle theme", async ({ page }) => {
        const html = page.locator("html");
        const initialTheme = (await html.getAttribute("data-theme")) || "";
        const nextTheme = initialTheme === "dark" ? "light" : "dark";
        const themeToggle = page.getByRole("button", { name: /switch theme to/i });

        await expect(themeToggle).toBeVisible();
        await themeToggle.click();
        await expect(html).toHaveAttribute("data-theme", nextTheme, { timeout: 10000 });
    });

    test("should have skip link for accessibility", async ({ page }) => {
        await page.keyboard.press("Tab");
        await expect(page.locator(".skip-link").first()).toBeVisible();
    });
});

test.describe("Projects Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/projects");
    });

    test("should display projects list", async ({ page }) => {
        // The work index switched from a.idx-flag to a.work-index-row.
        await expect(page.locator("a.work-index-row[href^='/projects/']").first()).toBeVisible();
    });

    test("work page toggles cleanly between index list and capability evidence matrix", async ({ page }) => {
        await expect(page.locator(".work-shortlist-section")).toHaveCount(0);
        await expect(page.locator(".work-evidence-section")).toHaveCount(0);
        await expect(page.locator(".work-index-row").first()).toBeVisible();

        await page.setViewportSize({ width: 1280, height: 900 });
        await page.getByRole("tab", { name: "Capability matrix" }).click();
        const matrix = page.locator(".evidence-matrix-section");

        await expect(matrix.getByText("Evidence matrix")).toBeVisible();
        await expect(matrix.getByText("Information architecture")).toBeVisible();
        await expect(matrix.getByRole("columnheader", { name: "UQ Connect" })).toBeVisible();
        await expect(matrix.locator("a[href*='#']").first()).toBeVisible();

        await page.setViewportSize({ width: 390, height: 844 });
        await expect(
            matrix.locator(".evidence-matrix-mobile-label").filter({ hasText: "MazeRunners" }).first(),
        ).toBeVisible();
        // Vigil is unlisted, so it has no column at any width.
        await expect(matrix.getByText("Vigil")).toHaveCount(0);
    });

    // waitForURL rather than an immediate toHaveURL: clicking straight after
    // load races the Next Link handler and swallows the navigation.
    test("should navigate to project detail", async ({ page }) => {
        const firstCase = page.locator("a.work-index-row[href^='/projects/']").first();
        await expect(firstCase).toBeVisible();
        await firstCase.click();

        await page.waitForURL(/\/projects\/.+/);
        await expect(page.locator("main[data-screen-label^='03 Case']")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        // exact: a case figcaption also contains these phrases, which trips
        // Playwright strict mode on a substring match.
        await expect(page.getByText("Case summary", { exact: true })).toBeVisible();
        await expect(page.getByText("What I would do next", { exact: true })).toBeVisible();
    });

    test("project detail should have breadcrumb navigation", async ({ page }) => {
        const firstCase = page.locator("a.work-index-row[href^='/projects/']").first();
        await expect(firstCase).toBeVisible();
        await firstCase.click();
        await page.waitForURL(/\/projects\/.+/);

        await expect(page.getByRole("navigation", { name: /breadcrumb/i })).toBeVisible();
    });

    // The 2-minute interviewer scan, the case reader nav and its prompt list
    // were removed: all three restated the interview pack. The pack is now the
    // single interview surface and is covered below.
    test("case detail should expose stable reader anchors", async ({ page }) => {
        await page.goto("/projects/connect");

        for (const id of [
            "snapshot",
            "interviewer-scan",
            "artifact",
            "decision-timeline",
            "evidence-board",
            "iteration-gallery",
            "outcome-limits",
            "interview-takeaway",
            "long-form",
            "related-projects",
        ]) {
            await expect(page.locator(`#${id}`)).toBeAttached();
        }
    });

    test("case detail puts primary cover before summary and opens collapsible interview answers", async ({ page }) => {
        await page.goto("/projects/connect");

        const coverBox = await page.locator(".cs-cover").boundingBox();
        const summaryBox = await page.locator(".case-summary").boundingBox();
        expect(coverBox?.y ?? 99999).toBeLessThan(summaryBox?.y ?? 0);

        const pack = page.locator(".case-interview-pack");

        await expect(pack.getByText("Interview pack")).toBeVisible();
        const firstDetails = pack.locator("details").first();
        await expect(firstDetails).not.toHaveAttribute("open", "");
        await firstDetails.locator("summary").click();
        await expect(firstDetails).toHaveAttribute("open", "");
        await expect(firstDetails.getByRole("link", { name: /Inspect the evidence/i })).toHaveAttribute(
            "href",
            /#(decision-timeline|evidence-board|iteration-gallery|outcome-limits|interview-takeaway)/,
        );
    });

    // The showcase pulls a 31 MB audio track and three videos, so the iframe
    // must stay unmounted until someone actually asks for it.
    test("maze demo should load only on click", async ({ page }) => {
        await page.goto("/projects/maze");

        const demo = page.locator(".case-demo");
        await expect(demo).toBeVisible();
        await expect(demo.locator("iframe")).toHaveCount(0);

        await demo.locator(".case-demo-poster").click();
        await expect(demo.locator("iframe")).toHaveAttribute("src", /maze-runners\.vercel\.app/);
    });

    test("cases without a playable build should not show a demo", async ({ page }) => {
        for (const slug of ["connect", "onthebeat", "ai"]) {
            await page.goto(`/projects/${slug}`);
            await expect(page.locator(".case-demo")).toHaveCount(0);
        }
    });

    // Same click-to-load contract as MazeRunners, but this prototype is served
    // from our own origin, so the test also proves the file actually shipped.
    test("vigil prototype should load only on click, from our own origin", async ({ page }) => {
        await gotoStable(page, "/projects/vigil");

        const demo = page.locator(".case-demo");
        await expect(demo).toBeVisible();
        await expect(demo.locator("iframe")).toHaveCount(0);

        await demo.locator(".case-demo-poster").click();
        await expect(demo.locator("iframe")).toHaveAttribute(
            "src",
            "/projects/vigil/prototype.html",
        );

        // A real prototype, not a 404 rendered inside a frame. The prototype
        // opens on its briefing screen, so assert that rather than the review
        // pane behind it.
        await expect(
            page.frameLocator(".case-demo iframe").getByText(/last check before the inbox/i),
        ).toBeVisible();
    });

    test("the embedded prototype should stay out of the search index", async ({ page }) => {
        const robots = await page.goto("/robots.txt");
        expect(await robots!.text()).toContain("/projects/vigil/prototype.html");
    });

    // Both demos were once shipped broken: the tests asserted the iframe src
    // attribute, which is set regardless, while CSP silently refused to load
    // either frame. These assert the headers that actually decide it, so the
    // check does not depend on an external service being up.
    test("hoop case should render, embed the live build, and stay honest", async ({ page }) => {
        await gotoStable(page, "/projects/hoop");

        await expect(page.getByRole("heading", { level: 1, name: "Hoop Dream" })).toBeVisible();

        // Screens captured from the public deployment are this case's artefact.
        const evidence = page.locator(".case-build-evidence");
        await expect(evidence).toBeVisible();
        await expect(evidence.locator("img")).toHaveCount(3);

        // Click-to-load, same contract as the other two demos.
        const demo = page.locator(".case-demo");
        await expect(demo.locator("iframe")).toHaveCount(0);
        await demo.locator(".case-demo-poster").click();
        await expect(demo.locator("iframe")).toHaveAttribute(
            "src",
            "https://hoop-dream.vercel.app",
        );

        // A big polished build with no players has to say so.
        await expect(page.locator(".case-limits")).toContainText(/no player research/i);

        // The production log's style verdict is printed by its own generator
        // script, and the only automated check reads the manifest. The case
        // must not present an automated style gate.
        await expect(page.locator("main.page")).not.toContainText(/style gate/i);
    });

    test("zh hoop case should be translated, not fall back to English", async ({ page }) => {
        await gotoStable(page, "/zh/projects/hoop");

        await expect(page.locator(".case-summary")).toContainText("美术圣经");
        await expect(page.locator(".case-build-evidence .label")).toHaveText("跑起来的样子");
        await expect(page.locator("main.page")).not.toContainText("风格闸门");
    });

    test("CSP should permit the case-page embeds it relies on", async ({ page }) => {
        const casePage = await page.goto("/projects/maze");
        const csp = casePage!.headers()["content-security-policy"] ?? "";

        // Without an explicit frame-src, this falls back to default-src 'self'
        // and a cross-origin embed is blocked before a request is even made.
        expect(csp).toContain("frame-src");
        expect(csp).toContain("https://maze-runners.vercel.app");
        expect(csp).toContain("https://hoop-dream.vercel.app");
        // We still refuse to be framed by anyone else.
        expect(csp).toContain("frame-ancestors 'none'");

        const prototype = await page.goto("/projects/vigil/prototype.html");
        expect(prototype!.status()).toBe(200);
        expect(prototype!.headers()["x-frame-options"]).toBe("SAMEORIGIN");
        expect(prototype!.headers()["content-security-policy"]).toContain(
            "frame-ancestors 'self'",
        );
    });

    test("vigil case should render and stay honest about not being tested", async ({ page }) => {
        await page.goto("/projects/vigil");

        await expect(page.getByRole("heading", { level: 1, name: "Vigil" })).toBeVisible();

        // The variant screenshots are this case's artefact, the way the build
        // photographs are MazeRunners'.
        const evidence = page.locator(".case-build-evidence");
        await expect(evidence).toBeVisible();
        await expect(evidence.locator("img")).toHaveCount(4);

        // Standing rule for this portfolio: an unvalidated case has to say so.
        // If this ever fails because the copy softened, that is the bug.
        await expect(page.locator(".case-limits")).toContainText(/no participant has run it yet/i);
    });

    test("zh vigil case should be translated, not fall back to English", async ({ page }) => {
        await gotoStable(page, "/zh/projects/vigil");

        await expect(page.locator(".case-summary")).toContainText("分类器");
        // The label lost its passive (被) in a zh copy edit; this follows the copy.
        await expect(page.locator(".case-build-evidence .label")).toHaveText("正在测试的变体");
    });

    test("case page should not overflow on mobile", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto("/projects/connect");

        const pack = page.locator(".case-interview-pack");
        await expect(pack).toBeVisible();
        await pack.scrollIntoViewIfNeeded();

        const hasHorizontalOverflow = await page.evaluate(
            () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        );
        const packBox = await pack.boundingBox();

        expect(hasHorizontalOverflow).toBe(false);
        expect(packBox?.width).toBeLessThanOrEqual(390);
        expect(packBox?.height).toBeGreaterThan(0);
    });

    // The structured decision/evidence/iteration blocks were removed as
    // duplicates of the narrative. Depth is now proven by the narrative itself
    // plus the surviving limits block.
    test("connect detail should expose interview-ready depth", async ({ page }) => {
        await page.goto("/projects/connect");

        await expect(page.locator(".case-limits").getByText(/Outcome limits/i)).toBeVisible();
        await expect(page.locator("#long-form").getByText(/mock data/i).first()).toBeVisible();
        await expect(page.locator("#long-form").getByText(/think-aloud/i).first()).toBeVisible();
        // Canonical facts: the 71 items are research and testing records, not transcripts.
        await expect(page.locator("#long-form")).toContainText("71 research and testing records");
    });

    test("on the beat detail should state who wrote the code and what is untested", async ({ page }) => {
        await page.goto("/projects/onthebeat");

        await expect(page.locator(".case-limits").getByText(/Outcome limits/i)).toBeVisible();
        await expect(page.locator("#long-form").getByText(/written and flashed by Claude Code/i).first()).toBeVisible();
        await expect(page.locator("#long-form").getByText(/no record of any participant testing/i).first()).toBeVisible();
        await expect(page.locator(".case-build-evidence img")).toHaveCount(3);
    });

    test("lamplight and autofill details should state authorship and their only user", async ({ page }) => {
        for (const slug of ["lamplight", "autofill"]) {
            await page.goto(`/projects/${slug}`);
            await expect(page.locator(".cs-cover img")).toHaveCount(1);
            await expect(page.locator("#long-form").getByText(/written by Claude Code/i).first()).toBeVisible();
            await expect(page.locator("#long-form").getByText(/no one but me|the only user on record/i).first()).toBeVisible();
        }
    });

    test("grassland detail should show its screenshots and its evidence limit", async ({ page }) => {
        await page.goto("/projects/grassland");

        await expect(page.locator(".cs-cover img")).toHaveCount(1);
        await expect(page.locator(".case-build-evidence img")).toHaveCount(6);
        await expect(page.locator("#long-form").getByText(/no structured usability testing with outside players/i).first()).toBeVisible();
        await expect(page.locator("a[href='https://onon-wolf-iron-tide.vercel.app']").first()).toBeVisible();
    });

    test("project detail should keep related visuals inside their cards", async ({ page }) => {
        // MazeRunners' neighbours (UQ Connect, Hoop Dream) both draw a diagram.
        await page.goto("/projects/maze");
        const relatedViz = page.locator(".cs-related-viz").first();
        const nestedViz = relatedViz.locator(".viz");

        await expect(relatedViz).toBeVisible();

        const parentBox = await relatedViz.boundingBox();
        const childBox = await nestedViz.boundingBox();

        if (!parentBox || !childBox) {
            throw new Error("Expected related project visual bounds to be measurable.");
        }

        expect(childBox.x).toBeGreaterThanOrEqual(parentBox.x - 1);
        expect(childBox.y).toBeGreaterThanOrEqual(parentBox.y - 1);
        expect(childBox.width).toBeLessThanOrEqual(parentBox.width + 1);
        expect(childBox.height).toBeLessThanOrEqual(parentBox.height + 1);
    });
});

test.describe("Blog Page", () => {
    test("should display blog posts or empty state", async ({ page }) => {
        await page.goto("/blog");

        const posts = page.locator("a.idx-flag[href^='/blog/']");
        if ((await posts.count()) > 0) {
            await expect(posts.first()).toBeVisible();
        } else {
            await expect(page.getByRole("heading", { level: 2 })).toBeVisible();
        }
    });

    test("should have tag filters when posts exist", async ({ page }) => {
        await page.goto("/blog");

        const allFilter = page.getByRole("tab", { name: "All" });
        if ((await allFilter.count()) > 0) {
            await expect(allFilter).toBeVisible();
        }
    });
});

test.describe("Accessibility", () => {
    test("should expose main content landmark", async ({ page }) => {
        await page.goto("/");

        const mainContent = page.locator("#main-content");
        await expect(mainContent).toBeVisible();
    });

    test("should be keyboard navigable", async ({ page }) => {
        await page.goto("/");

        await page.keyboard.press("Tab");

        await expect(page.locator(":focus").first()).toBeVisible();
    });
});

test.describe("Blog Detail Page", () => {
    // Wait for hydration before clicking: a bare goto + immediate click races
    // the Next Link handler and the navigation gets swallowed.
    test("should navigate to blog post and display content", async ({ page }) => {
        await page.goto("/blog", { waitUntil: "networkidle" });
        const firstPost = page.locator("a.idx-flag[href^='/blog/']").first();
        if ((await firstPost.count()) > 0) {
            await expect(firstPost).toBeVisible();
            await firstPost.click();
            await page.waitForURL(/\/blog\/.+/);
            await expect(page.locator("main[data-screen-label^='06 Post']")).toBeVisible();
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        }
    });

    test("should display breadcrumb navigation", async ({ page }) => {
        await page.goto("/blog");
        const firstPost = page.locator("a.idx-flag[href^='/blog/']").first();
        if ((await firstPost.count()) > 0) {
            await firstPost.click();
            await expect(page.getByRole("navigation", { name: /breadcrumb/i })).toBeVisible();
        }
    });
});

test.describe("Hire Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/hire");
    });

    test("should render the focused three-block interview decision room", async ({ page }) => {
        await expect(page.locator("main[data-screen-label='05 Hire']")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(page.locator(".interview-evidence-brief")).toHaveCount(0);
        await expect(page.locator(".interview-room-close")).toHaveCount(0);
        await expect(page.locator(".hiring-role-fit")).toBeVisible();
        await expect(page.locator("#interview-boundaries-title")).toBeVisible();
        await expect(page.getByRole("link", { name: /Contact/i }).first()).toBeVisible();
    });

    // The page used to fan out to 19 hiring sub-pages plus a /hire/[role] tree.
    // Those routes are deleted and 301 back here, so the hero actions offer
    // all three destinations and leave no surviving /hire/* link.
    test("should offer three destinations and no retired hiring sub-links", async ({ page }) => {
        const actions = page.locator(".interview-room-primary-actions");

        for (const href of ["/contact", "/projects", "/resume"]) {
            await expect(actions.locator(`a[href='${href}']`).first()).toBeVisible();
        }
        await expect(page.locator("a[href^='/hire/']")).toHaveCount(0);
    });

    test("retired hiring routes should redirect back to /hire", async ({ page }) => {
        for (const retired of ["/hire/scorecard", "/hire/command", "/hire/ux-product"]) {
            await page.goto(retired);
            await expect(page).toHaveURL(/\/hire$/);
        }
    });

    test("hire proof links should point to case anchors", async ({ page }) => {
        await expectAnchoredCaseProofLink(page.locator(".hiring-role-fit a[href*='#']").first());
    });

    // AI UX is a thread through several cases, framing legible uncertainty
    // under scoped prototype testing rather than defensive self-disclaimers.
    test("hire should show the AI and trust thread with explicit scope", async ({ page }) => {
        const thread = page.locator("#ai-trust-thread");

        await expect(thread.getByRole("heading", { name: "Designing trust across AI-assisted workflows" })).toBeVisible();
        await expect(thread.getByText(/uncertainty legible/i)).toBeVisible();
        await expect(thread.locator(".ai-trust-thread-limit")).toContainText(/mock data|production traffic/i);
        await expect(thread.locator("li")).toHaveCount(3);
        for (const slug of ["pricewise", "connect", "hoop"]) {
            await expect(thread.locator(`a[href='/projects/${slug}#decision-timeline']`)).toBeVisible();
        }
        await expect(thread.locator("a[href*='vigil']")).toHaveCount(0);
        await expect(page.locator(".hiring-role-fit").getByRole("heading", { name: "AI UX" })).toBeVisible();
    });

    test("zh hire should state scoped prototype boundaries in Chinese", async ({ page }) => {
        await gotoStable(page, "/zh/hire");
        const thread = page.locator("#ai-trust-thread");

        await expect(thread.getByText(/交互原则/)).toBeVisible();
        await expect(thread.locator(".ai-trust-thread-limit")).toContainText(/模拟数据|生产流量/);
        await expect(thread.locator("a[href='/zh/projects/pricewise#decision-timeline']")).toBeVisible();
        await expect(thread.locator("a[href*='vigil']")).toHaveCount(0);
    });
});

test.describe("Proof Maintenance", () => {
    test("maintenance route should stay out of public navigation by default", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("a[href*='maintenance/proof']")).toHaveCount(0);

        await gotoStable(page, "/maintenance/proof");
        await expect(page.locator("main[data-screen-label='17 Proof Maintenance']")).toHaveCount(0);
        await expect(page.getByText(/not found|404/i).first()).toBeVisible();
    });
});

test.describe("Contact Page", () => {
    // Calendly booking was dropped from the contact page, so email is now the
    // only direct channel asserted here.
    test("should display direct contact options", async ({ page }) => {
        await page.goto("/contact");

        await expect(page.locator(".contact-method-list a[href^='mailto:']").first()).toBeVisible();
    });

    // .contact-big-link was removed with the contact rewrite; the address now
    // lives in the method list.
    test("should expose the contact email", async ({ page }) => {
        await page.goto("/contact");

        await expect(page.locator("a[href^='mailto:']").first()).toHaveAttribute(
            "href",
            /^mailto:.+@.+\..+/,
        );
    });

    test("contact stays concise without duplicated role-fit/proof sections and links to /hire", async ({ page }) => {
        await page.goto("/contact");

        await expect(page.locator(".contact-use")).toHaveCount(0);
        await expect(page.locator(".contact-next-step")).toHaveCount(0);
        await expect(page.locator(".hiring-role-fit")).toHaveCount(0);
        await expect(page.locator(".contact-note-card")).toBeVisible();
        await expect(page.locator(".contact-hire-hint a")).toHaveAttribute("href", "/hire");
    });

    test("contact should show single contextual panel from hire route", async ({ page }) => {
        await page.goto("/contact?role=ai-ux");

        await expect(page.locator(".contact-note-card")).toHaveCount(0);
        await expect(page.getByText(/AI UX/i).first()).toBeVisible();
        await expect(page.getByText(/Best proof/i).first()).toBeVisible();
        await expect(page.locator("a[href*='/projects/'][href*='#']").first()).toBeVisible();
    });

    test("contact should fall back cleanly for a role with no listed case", async ({ page }) => {
        await page.goto("/contact?role=accessibility");

        await expect(page.locator(".contact-role-context")).toHaveCount(0);
        await expect(page.locator(".contact-note-card")).toBeVisible();
        await expect(page.locator("a[href*='/projects/spectra']")).toHaveCount(0);
    });

    test("contact should show interview follow-through context linking to live /hire route", async ({ page }) => {
        await page.goto("/contact?role=ai-ux&intent=interview");

        await expect(page.getByText(/Follow-through/i).first()).toBeVisible();
        await expect(page.getByRole("link", { name: /next-step plan/i })).toHaveAttribute(
            "href",
            "/hire?role=ai-ux",
        );
        await expect(page.locator("a[href^='/hire/']")).toHaveCount(0);
    });
});

test.describe("Resume Page", () => {
    test("should display resume content", async ({ page }) => {
        await page.goto("/resume");
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    // The static /resume.pdf download was replaced by print-to-PDF plus a
    // contact link, and the PDF was removed from public/.
    test("should offer print and contact actions instead of a stale PDF", async ({ page }) => {
        await page.goto("/resume");
        await expect(page.locator(".res-actions button")).toBeVisible();
        await expect(page.locator(".res-actions a[href='/contact']")).toBeVisible();
        await expect(page.locator("a[href='/resume.pdf']")).toHaveCount(0);
    });

    test("resume stays focused with compact target roles and link to /hire", async ({ page }) => {
        await page.goto("/resume");

        await expect(page.getByText("Target roles")).toBeVisible();
        await expect(page.locator(".resume-proof-card")).toHaveCount(0);
        await expect(page.locator(".hiring-role-fit")).toHaveCount(0);
        await expect(page.locator(".role-fit-links a")).toHaveAttribute("href", "/hire");
    });
});

test.describe("Lab Page", () => {
    test("should display lab experiments", async ({ page }) => {
        await page.goto("/lab");
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
});

test.describe("Search Modal", () => {
    test("should open search with keyboard shortcut", async ({ page }) => {
        await page.goto("/");

        await page.keyboard.press("Control+k");

        await expect(page.getByRole("combobox", { name: "Search" })).toBeVisible();
    });
});

test.describe("404 Page", () => {
    test("should display 404 for non-existent routes", async ({ page }) => {
        await page.goto("/this-page-does-not-exist");
        await expect(page.getByText(/not found|404/i).first()).toBeVisible();
    });

    test("should have navigation links back to main pages", async ({ page }) => {
        await page.goto("/this-page-does-not-exist");
        await expect(page.getByRole("link", { name: /home/i }).first()).toBeVisible();
    });
});

test.describe("Responsive Design", () => {
    test("primary hiring pages should not overflow on mobile", async ({ page }) => {
        test.setTimeout(120000);
        await page.setViewportSize({ width: 390, height: 844 });

        // The 19 /hire/* leaf routes and the /hire/[role] tree were deleted and
        // now 301 to /hire, so checking them here just re-measured /hire.
        for (const route of [
            "/",
            "/projects",
            "/hire",
            "/resume",
            "/contact",
            "/blog",
            "/about",
            "/projects/connect",
            "/projects/grassland",
            "/projects/onthebeat",
            "/projects/lamplight",
            "/projects/autofill",
            "/projects/walkie",
            "/projects/fencepost",
            "/projects/ai",
            "/projects/hoop",
            "/zh",
            "/zh/projects",
            "/zh/hire",
        ]) {
            await page.goto(route);

            const hasHorizontalOverflow = await page.evaluate(
                () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
            );

            expect(hasHorizontalOverflow, `${route} should not overflow horizontally`).toBe(false);

            if (route === "/projects") {
                // The work title is now plain text ("Selected work"); the <em>
                // it used to contain is gone, so measure the h1 itself.
                const title = page.locator("main[data-screen-label='02 Work'] h1");
                const titleFitsContainer = await title.evaluate(
                    (element) => element.scrollWidth <= element.clientWidth + 1,
                );
                const titleRightEdge = await title.evaluate(
                    (element) => element.getBoundingClientRect().right,
                );
                const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);

                expect(titleFitsContainer, "Work mobile title should fit its container").toBe(true);
                expect(titleRightEdge, "Work mobile title should stay inside viewport").toBeLessThanOrEqual(
                    viewportWidth + 1,
                );
            }
        }
    });

    test("should display mobile menu on small screens", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto("/");

        await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    });

    test("should show navigation links in mobile menu", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto("/");

        await page.getByRole("button", { name: "Open menu" }).click();
        await expect(page.getByRole("navigation", { name: "Mobile primary" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Work" }).last()).toBeVisible();
    });
});

// Vigil was unlisted on 2026-09-27. Its page still answers at its URL (the
// vigil case tests above go there directly), but nothing on the site may link
// to it, and the sitemap and feeds leave it out.
test.describe("Unlisted cases", () => {
    test("no page links to an unlisted case", async ({ page }) => {
        // The Vigil blog post used to be on this list. It is a draft now and
        // answers 404 (see "Draft posts" below), so the blog index stands in.
        for (const url of [
            "/",
            "/zh",
            "/projects",
            "/zh/projects",
            "/hire",
            "/resume",
            "/zh/resume",
            "/contact",
            "/projects/maze",
            "/projects/hoop",
            "/blog",
            "/zh/blog",
        ]) {
            await gotoStable(page, url);
            await expect(page.locator("a[href*='/projects/vigil']"), url).toHaveCount(0);
        }
    });

    // Lewis's call on 2026-09-28: the resume names Vigil nowhere, in either
    // locale, not only in its links.
    test("the resume does not name an unlisted case", async ({ page }) => {
        for (const url of ["/resume", "/zh/resume"]) {
            await gotoStable(page, url);
            const resume = page.locator("main[data-screen-label='05 Resume']");
            // Visible first, so a missing page cannot pass the negative check.
            await expect(resume.locator(".res-entry").first(), url).toBeVisible();
            await expect(resume, url).not.toContainText(/vigil/i);
        }
    });

    test("sitemap and feeds leave an unlisted case out", async ({ page }) => {
        for (const url of ["/sitemap.xml", "/feed.xml", "/zh/feed.xml"]) {
            const response = await page.request.get(url);
            expect(response.status(), url).toBe(200);
            expect(await response.text(), url).not.toContain("/projects/vigil");
        }
    });
});

// designing-for-ai was taken down on 2026-09-28 by setting published: false.
// The .mdx files stay; the site behaves as if the post did not exist.
test.describe("Draft posts", () => {
    const draftSlug = "designing-for-ai";

    test("a draft post answers 404 in both locales", async ({ page }) => {
        for (const url of [`/blog/${draftSlug}`, `/zh/blog/${draftSlug}`]) {
            const response = await page.request.get(url);
            expect(response.status(), url).toBe(404);
        }
    });

    test("no page links to a draft post", async ({ page }) => {
        for (const url of ["/", "/zh", "/blog", "/zh/blog", "/resume", "/zh/resume"]) {
            await gotoStable(page, url);
            await expect(page.locator(`a[href*='/blog/${draftSlug}']`), url).toHaveCount(0);
        }
    });

    test("sitemap and feeds leave a draft post out", async ({ page }) => {
        for (const url of ["/sitemap.xml", "/feed.xml", "/zh/feed.xml"]) {
            const response = await page.request.get(url);
            expect(response.status(), url).toBe(200);
            expect(await response.text(), url).not.toContain(draftSlug);
        }
    });
});

test.describe("V3 Flagship Routes & Role Lens", () => {
    test("lab interactive workbench renders state-machine demos and transitions states", async ({ page }) => {
        await gotoStable(page, "/lab");
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

        const walkieTab = page.getByRole("tab", { name: /Walkie/i });
        await expect(walkieTab).toBeVisible();
        await walkieTab.click();
        await expect(walkieTab).toHaveAttribute("aria-selected", "true");

        const approveButton = page.getByRole("button", { name: /Front Key · Approve|前键 · 批准/i });
        await expect(approveButton).toBeVisible();
        await approveButton.click();
        await expect(page.getByText(/Front key approved|前键批准/)).toBeVisible();
    });

    test("hire role lens filters cases from URL query and switches tracks", async ({ page }) => {
        await gotoStable(page, "/hire?role=design-eng");
        const grid = page.locator(".role-lens-grid");
        await expect(grid).toHaveAttribute("data-active-lens", "design-eng");
        await expect(grid.locator("a[href*='/projects/walkie']")).toBeVisible();

        const aiTab = page.getByRole("tab", { name: /AI UX/i });
        await aiTab.click();
        await expect(grid).toHaveAttribute("data-active-lens", "ai-ux");
        await expect(grid.locator("a[href*='/projects/fencepost']")).toBeVisible();
    });

    test("new V3 flagship case studies walkie and fencepost render in EN and ZH", async ({ page }) => {
        for (const url of [
            "/projects/walkie",
            "/zh/projects/walkie",
            "/projects/fencepost",
            "/zh/projects/fencepost",
        ]) {
            await gotoStable(page, url);
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        }
    });
});
