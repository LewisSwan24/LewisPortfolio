import { expect, test, type Locator } from "@playwright/test";

const anchoredCaseProofHref =
    /\/projects\/(connect|spectra|ai|circles)#(decision-timeline|evidence-board|iteration-gallery|outcome-limits|interview-takeaway|interviewer-scan)$/;

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
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Research-led");
    });

    // The old "Evidence at a glance" / "Capability map" sections were removed
    // when the homepage was condensed; the hiring signal grid replaced them.
    test("should surface career evidence", async ({ page }) => {
        const signals = page.locator(".hiring-signal-grid .hiring-signal");

        await expect(signals.first()).toBeVisible();
        expect(await signals.count()).toBeGreaterThanOrEqual(3);
        await expect(page.locator(".hiring-proof-status")).toContainText(/2026/);
    });

    // Replaces the removed timed reading paths ("15-second scan" and friends).
    // The surviving way in for a recruiter is the proof route board.
    test("should guide hiring readers", async ({ page }) => {
        const board = page.locator(".proof-route-board");

        await expect(board.getByText(/Best cases to inspect/i)).toBeVisible();

        const routes = board.locator(".proof-route-card");
        expect(await routes.count()).toBeGreaterThanOrEqual(3);
        await expect(routes.first()).toBeVisible();
    });

    test("should present a clear hiring conversion path", async ({ page }) => {
        const proofDesk = page.locator(".hiring-proof-desk");

        await expect(proofDesk.getByText(/Open to 2026 internships/i)).toBeVisible();
        await expect(proofDesk.getByText(/Best cases to inspect/i)).toBeVisible();
        await expect(proofDesk.getByText(/Information architecture/i).first()).toBeVisible();
        await expect(proofDesk.getByText(/Accessibility/i).first()).toBeVisible();
        await expect(proofDesk.getByText(/AI UX/i).first()).toBeVisible();
        await expect(proofDesk.getByRole("link", { name: /Contact/i }).first()).toBeVisible();
    });

    test("hiring proof links should point to case anchors", async ({ page }) => {
        await expectAnchoredCaseProofLink(page.locator(".hiring-proof-desk a[href*='#']").first());
    });

    // The role-fit panel moved off the homepage to /hire, /resume and /contact,
    // which have their own coverage. What the homepage must still do is offer
    // the three conversion routes.
    test("should offer the hiring conversion actions", async ({ page }) => {
        const actions = page.locator(".hiring-proof-actions");

        for (const href of ["/contact", "/resume", "/hire"]) {
            await expect(actions.locator(`a[href='${href}']`)).toBeVisible();
        }
        await expect(page.locator(".hiring-role-fit")).toHaveCount(0);
    });

    test("homepage should link to the interview decision room", async ({ page }) => {
        await expect(page.getByRole("link", { name: /Interview decision/i }).first()).toHaveAttribute(
            "href",
            "/hire",
        );
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

    test("should display the evidence map", async ({ page }) => {
        await expect(page.getByText("Evidence map")).toBeVisible();
        await expect(page.getByText("What this proves").first()).toBeVisible();
    });

    test("should help recruiters choose the right case", async ({ page }) => {
        await expect(page.getByText("Recruiter shortlist")).toBeVisible();
        await expect(page.getByText(/IA \/ service complexity/i)).toBeVisible();
        await expect(page.getByText(/Accessibility \/ inclusive design/i)).toBeVisible();
        await expect(page.getByText(/AI UX \/ trust/i)).toBeVisible();
    });

    test("work shortlist proof links should point to case anchors", async ({ page }) => {
        await expectAnchoredCaseProofLink(page.locator(".work-shortlist-section a[href*='#']").first());
    });

    test("work page should expose an evidence matrix", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        const matrix = page.locator(".evidence-matrix-section");

        await expect(matrix.getByText("Evidence matrix")).toBeVisible();
        await expect(matrix.getByText("Information architecture")).toBeVisible();
        await expect(matrix.getByRole("columnheader", { name: "UQ Connect" })).toBeVisible();
        await expect(matrix.locator("a[href*='#']").first()).toBeVisible();

        await page.setViewportSize({ width: 390, height: 844 });
        await expect(
            matrix.locator(".evidence-matrix-mobile-label").filter({ hasText: "AI Coach" }).first(),
        ).toBeVisible();
    });

    test("work page should link to the interview decision room", async ({ page }) => {
        await expect(page.getByRole("link", { name: /Interview decision/i }).first()).toHaveAttribute(
            "href",
            "/hire",
        );
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

    test("case detail should show interviewer scan", async ({ page }) => {
        await page.goto("/projects/connect");
        const scan = page.locator(".case-interview-scan");

        await expect(scan.getByText("2-minute interviewer scan")).toBeVisible();
        await expect(scan.getByText(/What this case proves/i)).toBeVisible();
        await expect(scan.getByText(/What to inspect/i)).toBeVisible();
        await expect(scan.getByText(/Interview questions/i)).toBeVisible();
    });

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

    test("case detail should provide reader navigation", async ({ page }) => {
        await page.goto("/projects/connect");

        const reader = page.getByRole("navigation", { name: "Case reader" });

        await expect(reader).toBeVisible();
        await expect(reader.getByRole("link", { name: /^Snapshot/i })).toBeVisible();
        await expect(reader.getByRole("link", { name: /^Decisions/i })).toBeVisible();
        await expect(reader.getByRole("link", { name: /^Evidence/i })).toBeVisible();

        await reader.getByRole("link", { name: /^Decisions/i }).click();
        await expect(page).toHaveURL(/#decision-timeline$/);
        await expect(page.locator("#decision-timeline")).toBeInViewport();
    });

    test("case detail should expose review modes and interview prompts", async ({ page }) => {
        await page.goto("/projects/spectra");

        await expect(page.getByText("2-minute scan").first()).toBeVisible();
        await expect(page.getByText("Design manager review")).toBeVisible();
        await expect(page.getByText("Research evidence review")).toBeVisible();
        await expect(page.getByText("Interview prep")).toBeVisible();

        const prompts = page.locator(".case-reader-prompts");

        await expect(prompts.getByText(/Ask me about/i)).toBeVisible();
        await expect(prompts.getByRole("link").first()).toBeVisible();
    });

    test("case detail should expose interview answer routes", async ({ page }) => {
        await page.goto("/projects/connect");

        const pack = page.locator(".case-interview-pack");

        await expect(pack.getByText("Interview pack")).toBeVisible();
        await expect(pack.getByText(/Questions I can answer/i)).toBeVisible();
        await expect(pack.getByRole("link", { name: /Inspect the evidence/i }).first()).toHaveAttribute(
            "href",
            /#(decision-timeline|evidence-board|iteration-gallery|outcome-limits|interview-takeaway)/,
        );
    });

    test("case reader should not overflow on mobile", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto("/projects/connect");

        const reader = page.getByRole("navigation", { name: "Case reader" });

        await expect(reader).toBeVisible();
        await expect(reader.locator("a").first()).toBeVisible();
        await reader.scrollIntoViewIfNeeded();

        const hasHorizontalOverflow = await page.evaluate(
            () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        );
        const readerBox = await reader.boundingBox();

        expect(hasHorizontalOverflow).toBe(false);
        expect(readerBox?.width).toBeLessThanOrEqual(390);
        expect(readerBox?.height).toBeGreaterThan(0);
    });

    test("connect detail should expose interview-ready depth", async ({ page }) => {
        await page.goto("/projects/connect");
        const caseDepth = page.locator(".case-depth");

        await expect(caseDepth.getByText("Decision timeline")).toBeVisible();
        await expect(caseDepth.getByText("Research evidence board")).toBeVisible();
        await expect(caseDepth.getByText("Iteration gallery")).toBeVisible();
        await expect(caseDepth.getByText("Interview takeaway")).toBeVisible();
        await expect(caseDepth.getByText(/task-oriented IA/i).first()).toBeVisible();
        await expect(caseDepth.getByText(/tree testing/i).first()).toBeVisible();
        await expect(caseDepth.getByText(/findability/i).first()).toBeVisible();
    });

    test("spectra detail should expose inclusive design depth", async ({ page }) => {
        await page.goto("/projects/spectra");
        const caseDepth = page.locator(".case-depth");

        await expect(caseDepth.getByText("Decision timeline")).toBeVisible();
        await expect(caseDepth.getByText("Research evidence board")).toBeVisible();
        await expect(caseDepth.getByText("Interview takeaway")).toBeVisible();
        await expect(caseDepth.getByText(/multi-modal feedback/i).first()).toBeVisible();
        await expect(caseDepth.getByText(/privacy/i).first()).toBeVisible();
        await expect(caseDepth.getByText(/field testing/i).first()).toBeVisible();
    });

    test("project detail should keep related visuals inside their cards", async ({ page }) => {
        await page.goto("/projects/spectra");
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

    test("should render the interview decision room", async ({ page }) => {
        await expect(page.locator("main[data-screen-label='05 Hire']")).toBeVisible();
        // The h1 is the decision-brief headline ("Why I'll help your team."),
        // not the word "Interview"; assert the section content instead of copy.
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(page.getByText("Evidence brief", { exact: true })).toBeVisible();
        await expect(page.getByText("Questions worth asking.", { exact: true })).toBeVisible();
        await expect(page.getByText("What I would not overclaim")).toBeVisible();
        await expect(page.getByRole("link", { name: /Contact/i }).first()).toBeVisible();
    });

    // The page used to fan out to 19 hiring sub-pages plus a /hire/[role] tree.
    // Those routes are deleted and 301 back here, so the page must offer exactly
    // three destinations and leave no surviving /hire/* link.
    test("should offer three destinations and no retired hiring sub-links", async ({ page }) => {
        // Scoped to the closing block: InterviewDecisionBrief renders its own
        // .interview-room-actions at the top of the page.
        const closingActions = page.locator(".interview-room-primary-actions");

        for (const href of ["/contact", "/projects", "/resume"]) {
            await expect(closingActions.locator(`a[href='${href}']`).first()).toBeVisible();
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
        await expectAnchoredCaseProofLink(page.locator(".interview-evidence-brief a[href*='#']").first());
        await expectAnchoredCaseProofLink(page.locator(".interview-question-bank a[href*='#']").first());
    });
});

test.describe("Proof Maintenance", () => {
    test("maintenance route should stay out of public navigation by default", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("a[href*='maintenance/proof']")).toHaveCount(0);

        await page.goto("/maintenance/proof");
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

    test("should explain how to use the portfolio", async ({ page }) => {
        await page.goto("/contact");

        await expect(page.getByText("Use this portfolio for")).toBeVisible();
    });

    test("should provide a hiring next step", async ({ page }) => {
        await page.goto("/contact");
        const nextStep = page.locator(".contact-next-step");

        await expect(nextStep.getByText("Hiring next step")).toBeVisible();
        await expect(nextStep.getByText(/Open to 2026 internships/i)).toBeVisible();
    });

    test("contact proof links should point to case anchors", async ({ page }) => {
        await page.goto("/contact");

        await expectAnchoredCaseProofLink(page.locator(".contact-next-step a[href*='#']").first());
    });

    test("contact should explain role-aware reasons to reach out", async ({ page }) => {
        await page.goto("/contact");

        const roleFit = page.locator(".hiring-role-fit").first();

        await expect(roleFit.getByText("Role fit", { exact: true })).toBeVisible();
        await expect(roleFit.getByText(/Best interview angle/i).first()).toBeVisible();
    });

    test("contact should link to the interview decision room", async ({ page }) => {
        await page.goto("/contact");

        await expect(page.getByRole("link", { name: /Interview decision/i }).first()).toHaveAttribute(
            "href",
            "/hire",
        );
    });

    test("contact should show role context from hire route", async ({ page }) => {
        await page.goto("/contact?role=ai-ux");

        await expect(page.getByText(/AI UX/i).first()).toBeVisible();
        await expect(page.getByText(/Best proof/i).first()).toBeVisible();
        await expect(page.locator("a[href*='/projects/'][href*='#']").first()).toBeVisible();
    });

    test("contact should show interview follow-through context", async ({ page }) => {
        await page.goto("/contact?role=ai-ux&intent=interview");

        await expect(page.getByText(/Follow-through/i).first()).toBeVisible();
        await expect(page.getByRole("link", { name: /next-step plan/i })).toHaveAttribute(
            "href",
            "/hire/ai-ux/next",
        );
        await expect(page.getByRole("link", { name: /application packet/i }).first()).toHaveAttribute(
            "href",
            "/hire/ai-ux/packet",
        );
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

    test("should show best-fit roles", async ({ page }) => {
        await page.goto("/resume");
        await expect(page.getByText("Best-fit roles")).toBeVisible();
    });

    test("should show a Proof-linked resume path", async ({ page }) => {
        await page.goto("/resume");

        await expect(page.getByText("Proof-linked resume")).toBeVisible();
        await expect(page.getByText(/Best cases to inspect/i)).toBeVisible();
    });

    test("resume proof links should point to case anchors", async ({ page }) => {
        await page.goto("/resume");

        await expectAnchoredCaseProofLink(page.locator(".resume-proof-card a[href*='#']").first());
    });

    test("resume should expose role fit proof routes", async ({ page }) => {
        await page.goto("/resume");

        const roleFit = page.locator(".hiring-role-fit").first();

        await expect(roleFit.getByText("Role fit", { exact: true })).toBeVisible();
        await expect(roleFit.getByRole("link").first()).toHaveAttribute("href", /\/projects\/.+#/);
    });

    test("resume should link to the interview decision room", async ({ page }) => {
        await page.goto("/resume");

        await expect(page.getByRole("link", { name: /Interview decision/i }).first()).toHaveAttribute(
            "href",
            "/hire",
        );
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
            "/projects/spectra",
            "/projects/ai",
            "/projects/circles",
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
