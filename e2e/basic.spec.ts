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
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Lewis");
    });

    test("should surface career evidence", async ({ page }) => {
        await expect(page.getByText("Evidence at a glance")).toBeVisible();
        await expect(page.getByText("Capability map")).toBeVisible();
    });

    test("should guide hiring readers", async ({ page }) => {
        await expect(page.getByText("Start here if you are hiring")).toBeVisible();
        await expect(page.getByText("15-second scan")).toBeVisible();
        await expect(page.getByText("2-minute case check")).toBeVisible();
        await expect(page.getByText("10-minute deep read")).toBeVisible();
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

    test("should expose role fit decision panel", async ({ page }) => {
        const roleFit = page.locator(".hiring-role-fit").first();

        await expect(roleFit.getByText("Role fit", { exact: true })).toBeVisible();
        await expect(roleFit.getByText("UX/Product Design")).toBeVisible();
        await expect(roleFit.getByText("UX Research")).toBeVisible();
        await expect(roleFit.locator("a[href*='#']").first()).toBeVisible();
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
        await expect(page.locator("a.idx-flag[href^='/projects/']").first()).toBeVisible();
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

    test("should navigate to project detail", async ({ page }) => {
        await page.locator("a.idx-flag[href^='/projects/']").first().click();

        await expect(page).toHaveURL(/\/projects\/.+/);
        await expect(page.locator("main[data-screen-label^='03 Case']")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(page.getByText("Case summary")).toBeVisible();
        await expect(page.getByText("What I would do next")).toBeVisible();
    });

    test("project detail should have breadcrumb navigation", async ({ page }) => {
        await page.locator("a.idx-flag[href^='/projects/']").first().click();

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
    test("should navigate to blog post and display content", async ({ page }) => {
        await page.goto("/blog");
        const firstPost = page.locator("a.idx-flag[href^='/blog/']").first();
        if ((await firstPost.count()) > 0) {
            await firstPost.click();
            await expect(page).toHaveURL(/\/blog\/.+/);
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
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Interview");
        for (const role of ["ux-product", "ux-research", "ai-ux", "accessibility"]) {
            await expect(page.locator(`a[href='/hire/${role}']`).first()).toBeVisible();
        }
        await expect(page.getByText("Evidence brief", { exact: true })).toBeVisible();
        await expect(page.getByText("Questions worth asking.", { exact: true })).toBeVisible();
        await expect(page.getByText("What I would not overclaim")).toBeVisible();
        await expect(page.getByRole("link", { name: /Contact/i }).first()).toBeVisible();
        await expect(page.getByRole("link", { name: /Proof review room/i })).toHaveAttribute(
            "href",
            "/hire/review",
        );
        await expect(page.getByRole("link", { name: /Compare role paths/i })).toHaveAttribute(
            "href",
            "/hire/compare",
        );
        await expect(page.getByRole("link", { name: /Interview agenda/i })).toHaveAttribute(
            "href",
            "/hire/interview",
        );
        await expect(page.getByRole("link", { name: /Hiring scorecard/i })).toHaveAttribute(
            "href",
            "/hire/scorecard",
        );
        await expect(page.getByRole("link", { name: /Shortlist memo/i })).toHaveAttribute(
            "href",
            "/hire/shortlist",
        );
        await expect(page.getByRole("link", { name: /Manager debrief/i })).toHaveAttribute(
            "href",
            "/hire/debrief",
        );
        await expect(page.getByRole("link", { name: /Decision pack/i })).toHaveAttribute(
            "href",
            "/hire/decision",
        );
        await expect(page.getByRole("link", { name: /Offer readiness/i })).toHaveAttribute(
            "href",
            "/hire/offer",
        );
    });

    test("hire proof links should point to case anchors", async ({ page }) => {
        await expectAnchoredCaseProofLink(page.locator(".interview-evidence-brief a[href*='#']").first());
        await expectAnchoredCaseProofLink(page.locator(".interview-question-bank a[href*='#']").first());
    });
});

test.describe("Hire Role Pages", () => {
    for (const role of ["ux-product", "ux-research", "ai-ux", "accessibility"]) {
        test(`should render ${role} role packet`, async ({ page }) => {
            await page.goto(`/hire/${role}`);
            await expect(page.locator("main[data-screen-label='05 Hire Role']")).toBeVisible();
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(page.getByRole("heading", { level: 2, name: /Best proof for this role/i })).toBeVisible();
            await expect(page.getByRole("heading", { level: 2, name: /Interview questions/i })).toBeVisible();
            await expect(page.getByRole("heading", { level: 2, name: /should not overclaim/i })).toBeVisible();
            await expect(page.getByRole("link", { name: /Contact/i }).first()).toBeVisible();
            await expect(page.getByRole("link", { name: /application packet/i })).toHaveAttribute(
                "href",
                `/hire/${role}/packet`,
            );
            await expect(page.getByRole("link", { name: /next-step plan/i })).toHaveAttribute(
                "href",
                `/hire/${role}/next`,
            );
            await expect(page.getByRole("link", { name: /Proof review room/i })).toHaveAttribute(
                "href",
                "/hire/review",
            );
        });
    }
});

test.describe("Application Packet Pages", () => {
    for (const role of ["ux-product", "ux-research", "ai-ux", "accessibility"]) {
        test(`should render ${role} application packet`, async ({ page }) => {
            await page.goto(`/hire/${role}/packet`);
            await expect(page.locator("main[data-screen-label='05 Hire Packet']")).toBeVisible();
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(page.getByRole("heading", { level: 2, name: /Proof snapshot/i })).toBeVisible();
            await expect(page.getByRole("heading", { level: 2, name: /Interview focus/i })).toBeVisible();
            await expect(page.getByRole("button", { name: /Print packet/i })).toBeVisible();
            await expect(page.getByRole("link", { name: /next-step plan/i })).toHaveAttribute(
                "href",
                `/hire/${role}/next`,
            );
            await expectAnchoredCaseProofLink(page.locator(".application-packet-proof a[href*='#']").first());
        });
    }
});

test.describe("Follow-through Pages", () => {
    for (const role of ["ux-product", "ux-research", "ai-ux", "accessibility"]) {
        test(`should render ${role} follow-through plan`, async ({ page }) => {
            await page.goto(`/hire/${role}/next`);
            await expect(page.locator("main[data-screen-label='05 Hire Follow-Through']")).toBeVisible();
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(page.getByRole("heading", { level: 2, name: /Sendable email/i })).toBeVisible();
            await expect(page.getByRole("button", { name: /Copy email/i })).toBeVisible();
            await expect(page.getByRole("link", { name: /Open mail client/i })).toHaveAttribute(
                "href",
                /^mailto:/,
            );
            await expect(page.getByRole("heading", { level: 2, name: /Pre-call evidence/i })).toBeVisible();
            await expectAnchoredCaseProofLink(page.locator(".follow-through-evidence a[href*='#']").first());
        });
    }
});

test.describe("Proof Review Room", () => {
    test("should render the recruiter proof review room", async ({ page }) => {
        await page.goto("/hire/review");
        await expect(page.locator("main[data-screen-label='22 Proof Review']")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: /Proof review room/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Command checklist/i })).toBeVisible();
        await expect(page.getByText("pnpm proof:bundle")).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Role coverage/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Compare role paths/i }).first()).toHaveAttribute(
            "href",
            "/hire/compare",
        );
        await expect(page.getByRole("link", { name: /Interview agenda/i }).first()).toHaveAttribute(
            "href",
            "/hire/interview",
        );
        await expect(page.getByRole("link", { name: /Hiring scorecard/i }).first()).toHaveAttribute(
            "href",
            "/hire/scorecard",
        );
        await expect(page.getByRole("link", { name: /Shortlist memo/i }).first()).toHaveAttribute(
            "href",
            "/hire/shortlist",
        );
        await expect(page.getByRole("link", { name: /Manager debrief/i }).first()).toHaveAttribute(
            "href",
            "/hire/debrief",
        );
        await expect(page.getByRole("link", { name: /Decision pack/i }).first()).toHaveAttribute(
            "href",
            "/hire/decision",
        );
        await expect(page.getByRole("link", { name: /Offer readiness/i }).first()).toHaveAttribute(
            "href",
            "/hire/offer",
        );
        for (const role of ["ux-product", "ux-research", "ai-ux", "accessibility"]) {
            await expect(page.locator(`a[href='/hire/${role}']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/packet']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/next']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/contact?role=${role}']`).first()).toBeVisible();
        }
        await expect(page.getByRole("heading", { level: 2, name: /Proof anchor ledger/i })).toBeVisible();
        await expectAnchoredCaseProofLink(page.locator(".proof-review-anchor-ledger a[href*='#']").first());
    });
});

test.describe("Role Comparison Board", () => {
    test("should render role comparison lanes", async ({ page }) => {
        await page.goto("/hire/compare");
        await expect(page.locator("main[data-screen-label='23 Role Compare']")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: /Compare role paths/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Comparison criteria/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Role lanes/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Open proof review/i })).toHaveAttribute(
            "href",
            "/hire/review",
        );
        await expect(page.getByRole("link", { name: /Interview agenda/i }).first()).toHaveAttribute(
            "href",
            "/hire/interview",
        );
        await expect(page.getByRole("link", { name: /Hiring scorecard/i }).first()).toHaveAttribute(
            "href",
            "/hire/scorecard",
        );
        await expect(page.getByRole("link", { name: /Shortlist memo/i }).first()).toHaveAttribute(
            "href",
            "/hire/shortlist",
        );
        await expect(page.getByRole("link", { name: /Manager debrief/i }).first()).toHaveAttribute(
            "href",
            "/hire/debrief",
        );
        await expect(page.getByRole("link", { name: /Decision pack/i }).first()).toHaveAttribute(
            "href",
            "/hire/decision",
        );
        await expect(page.getByRole("link", { name: /Offer readiness/i }).first()).toHaveAttribute(
            "href",
            "/hire/offer",
        );

        for (const role of ["ux-product", "ux-research", "ai-ux", "accessibility"]) {
            await expect(page.getByText(role).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/packet']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/next']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/contact?role=${role}']`).first()).toBeVisible();
        }

        await expectAnchoredCaseProofLink(page.locator(".role-comparison-proof a[href*='#']").first());
    });
});

test.describe("Interview Agenda Board", () => {
    test("should render role-aware interview prep", async ({ page }) => {
        await page.goto("/hire/interview");
        await expect(page.locator("main[data-screen-label='24 Interview Agenda']")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: /Interview agenda/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Agenda phases/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Role prep/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Compare role paths/i })).toHaveAttribute(
            "href",
            "/hire/compare",
        );
        await expect(page.getByRole("link", { name: /Open proof review/i })).toHaveAttribute(
            "href",
            "/hire/review",
        );
        await expect(page.getByRole("link", { name: /Hiring scorecard/i }).first()).toHaveAttribute(
            "href",
            "/hire/scorecard",
        );
        await expect(page.getByRole("link", { name: /Shortlist memo/i }).first()).toHaveAttribute(
            "href",
            "/hire/shortlist",
        );
        await expect(page.getByRole("link", { name: /Manager debrief/i }).first()).toHaveAttribute(
            "href",
            "/hire/debrief",
        );
        await expect(page.getByRole("link", { name: /Decision pack/i }).first()).toHaveAttribute(
            "href",
            "/hire/decision",
        );
        await expect(page.getByRole("link", { name: /Offer readiness/i }).first()).toHaveAttribute(
            "href",
            "/hire/offer",
        );

        for (const role of ["ux-product", "ux-research", "ai-ux", "accessibility"]) {
            await expect(page.getByText(role).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/packet']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/next']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/contact?role=${role}&intent=interview']`).first()).toBeVisible();
        }

        await expectAnchoredCaseProofLink(page.locator(".interview-agenda-proof a[href*='#']").first());
    });
});

test.describe("Hiring Scorecard Board", () => {
    test("should render proof-backed scorecard lanes", async ({ page }) => {
        await page.goto("/hire/scorecard");
        await expect(page.locator("main[data-screen-label='25 Hiring Scorecard']")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: /Hiring scorecard/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Score criteria/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Role scorecards/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Interview agenda/i }).first()).toHaveAttribute(
            "href",
            "/hire/interview",
        );
        await expect(page.getByRole("link", { name: /Compare role paths/i })).toHaveAttribute(
            "href",
            "/hire/compare",
        );
        await expect(page.getByRole("link", { name: /Open proof review/i }).first()).toHaveAttribute(
            "href",
            "/hire/review",
        );
        await expect(page.getByRole("link", { name: /Shortlist memo/i }).first()).toHaveAttribute(
            "href",
            "/hire/shortlist",
        );
        await expect(page.getByRole("link", { name: /Manager debrief/i }).first()).toHaveAttribute(
            "href",
            "/hire/debrief",
        );
        await expect(page.getByRole("link", { name: /Decision pack/i }).first()).toHaveAttribute(
            "href",
            "/hire/decision",
        );
        await expect(page.getByRole("link", { name: /Offer readiness/i }).first()).toHaveAttribute(
            "href",
            "/hire/offer",
        );

        for (const role of ["ux-product", "ux-research", "ai-ux", "accessibility"]) {
            await expect(page.getByText(role).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/packet']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/next']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/contact?role=${role}&intent=scorecard']`).first()).toBeVisible();
        }

        await expectAnchoredCaseProofLink(page.locator(".hiring-scorecard-proof a[href*='#']").first());
    });
});

test.describe("Hiring Shortlist Memo", () => {
    test("should render proof-backed shortlist lanes", async ({ page }) => {
        await page.goto("/hire/shortlist");
        await expect(page.locator("main[data-screen-label='26 Hiring Shortlist']")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: /Shortlist memo/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Memo summary/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Role shortlist lanes/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Hiring scorecard/i }).first()).toHaveAttribute(
            "href",
            "/hire/scorecard",
        );
        await expect(page.getByRole("link", { name: /Interview agenda/i }).first()).toHaveAttribute(
            "href",
            "/hire/interview",
        );
        await expect(page.getByRole("link", { name: /Compare role paths/i })).toHaveAttribute(
            "href",
            "/hire/compare",
        );
        await expect(page.getByRole("link", { name: /Open proof review/i }).first()).toHaveAttribute(
            "href",
            "/hire/review",
        );
        await expect(page.getByRole("link", { name: /Manager debrief/i }).first()).toHaveAttribute(
            "href",
            "/hire/debrief",
        );
        await expect(page.getByRole("link", { name: /Decision pack/i }).first()).toHaveAttribute(
            "href",
            "/hire/decision",
        );
        await expect(page.getByRole("link", { name: /Offer readiness/i }).first()).toHaveAttribute(
            "href",
            "/hire/offer",
        );

        for (const role of ["ux-product", "ux-research", "ai-ux", "accessibility"]) {
            await expect(page.getByText(role).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/packet']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/next']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/contact?role=${role}&intent=scorecard']`).first()).toBeVisible();
        }

        await expectAnchoredCaseProofLink(page.locator(".hiring-shortlist-proof a[href*='#']").first());
    });
});

test.describe("Hiring Manager Debrief", () => {
    test("should render manager-ready second-round debrief lanes", async ({ page }) => {
        await page.goto("/hire/debrief");
        await expect(page.locator("main[data-screen-label='27 Hiring Debrief']")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: /Hiring manager debrief/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Debrief summary/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Role debrief lanes/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Shortlist memo/i }).first()).toHaveAttribute(
            "href",
            "/hire/shortlist",
        );
        await expect(page.getByRole("link", { name: /Hiring scorecard/i }).first()).toHaveAttribute(
            "href",
            "/hire/scorecard",
        );
        await expect(page.getByRole("link", { name: /Interview agenda/i }).first()).toHaveAttribute(
            "href",
            "/hire/interview",
        );
        await expect(page.getByRole("link", { name: /Compare role paths/i }).first()).toHaveAttribute(
            "href",
            "/hire/compare",
        );
        await expect(page.getByRole("link", { name: /Open proof review/i }).first()).toHaveAttribute(
            "href",
            "/hire/review",
        );
        await expect(page.getByRole("link", { name: /Decision pack/i }).first()).toHaveAttribute(
            "href",
            "/hire/decision",
        );
        await expect(page.getByRole("link", { name: /Offer readiness/i }).first()).toHaveAttribute(
            "href",
            "/hire/offer",
        );

        for (const role of ["ux-product", "ux-research", "ai-ux", "accessibility"]) {
            await expect(page.getByText(role).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/packet']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/next']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/contact?role=${role}&intent=debrief']`).first()).toBeVisible();
        }

        await expectAnchoredCaseProofLink(page.locator(".hiring-debrief-proof a[href*='#']").first());
    });
});

test.describe("Hiring Decision Pack", () => {
    test("should render final manager decision lanes", async ({ page }) => {
        await page.goto("/hire/decision");
        await expect(page.locator("main[data-screen-label='28 Hiring Decision']")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: /Hiring decision pack/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Decision summary/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Role decision lanes/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Manager debrief/i }).first()).toHaveAttribute(
            "href",
            "/hire/debrief",
        );
        await expect(page.getByRole("link", { name: /Shortlist memo/i }).first()).toHaveAttribute(
            "href",
            "/hire/shortlist",
        );
        await expect(page.getByRole("link", { name: /Hiring scorecard/i }).first()).toHaveAttribute(
            "href",
            "/hire/scorecard",
        );
        await expect(page.getByRole("link", { name: /Interview agenda/i }).first()).toHaveAttribute(
            "href",
            "/hire/interview",
        );
        await expect(page.getByRole("link", { name: /Compare role paths/i }).first()).toHaveAttribute(
            "href",
            "/hire/compare",
        );
        await expect(page.getByRole("link", { name: /Open proof review/i }).first()).toHaveAttribute(
            "href",
            "/hire/review",
        );
        await expect(page.getByRole("link", { name: /Offer readiness/i }).first()).toHaveAttribute(
            "href",
            "/hire/offer",
        );

        for (const role of ["ux-product", "ux-research", "ai-ux", "accessibility"]) {
            await expect(page.getByText(role).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/packet']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/next']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/contact?role=${role}&intent=decision']`).first()).toBeVisible();
        }

        await expectAnchoredCaseProofLink(page.locator(".hiring-decision-proof a[href*='#']").first());
    });
});

test.describe("Hiring Offer Readiness", () => {
    test("should render final offer-readiness lanes", async ({ page }) => {
        await page.goto("/hire/offer");
        await expect(page.locator("main[data-screen-label='29 Hiring Offer']")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1, name: /Offer readiness pack/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Offer summary/i })).toBeVisible();
        await expect(page.getByRole("heading", { level: 2, name: /Role offer lanes/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Decision pack/i }).first()).toHaveAttribute(
            "href",
            "/hire/decision",
        );
        await expect(page.getByRole("link", { name: /Manager debrief/i }).first()).toHaveAttribute(
            "href",
            "/hire/debrief",
        );
        await expect(page.getByRole("link", { name: /Shortlist memo/i }).first()).toHaveAttribute(
            "href",
            "/hire/shortlist",
        );
        await expect(page.getByRole("link", { name: /Hiring scorecard/i }).first()).toHaveAttribute(
            "href",
            "/hire/scorecard",
        );
        await expect(page.getByRole("link", { name: /Interview agenda/i }).first()).toHaveAttribute(
            "href",
            "/hire/interview",
        );
        await expect(page.getByRole("link", { name: /Compare role paths/i }).first()).toHaveAttribute(
            "href",
            "/hire/compare",
        );
        await expect(page.getByRole("link", { name: /Open proof review/i }).first()).toHaveAttribute(
            "href",
            "/hire/review",
        );

        for (const role of ["ux-product", "ux-research", "ai-ux", "accessibility"]) {
            await expect(page.getByText(role).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/packet']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/hire/${role}/next']`).first()).toBeVisible();
            await expect(page.locator(`a[href='/contact?role=${role}&intent=offer']`).first()).toBeVisible();
        }

        await expectAnchoredCaseProofLink(page.locator(".hiring-offer-proof a[href*='#']").first());
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
    test("should display direct contact options", async ({ page }) => {
        await page.goto("/contact");

        await expect(page.locator("a[href^='mailto:']").first()).toBeVisible();
        await expect(page.locator("a[href*='calendly.com']").first()).toBeVisible();
    });

    test("should expose the contact email", async ({ page }) => {
        await page.goto("/contact");

        await expect(page.locator(".contact-big-link")).toContainText("@");
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

    test("should have download PDF link", async ({ page }) => {
        await page.goto("/resume");
        await expect(page.locator("a[href='/resume.pdf'][download]")).toBeVisible();
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
        await page.setViewportSize({ width: 390, height: 844 });

        for (const route of [
            "/",
            "/projects",
            "/hire",
            "/hire/review",
            "/hire/compare",
            "/hire/interview",
            "/hire/scorecard",
            "/hire/shortlist",
            "/hire/debrief",
            "/hire/decision",
            "/hire/offer",
            "/hire/ux-product",
            "/hire/ux-research",
            "/hire/ai-ux",
            "/hire/accessibility",
            "/hire/ux-product/packet",
            "/hire/ux-research/packet",
            "/hire/ai-ux/packet",
            "/hire/accessibility/packet",
            "/hire/ux-product/next",
            "/hire/ux-research/next",
            "/hire/ai-ux/next",
            "/hire/accessibility/next",
            "/resume",
            "/contact",
            "/projects/connect",
            "/projects/spectra",
        ]) {
            await page.goto(route);

            const hasHorizontalOverflow = await page.evaluate(
                () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
            );

            expect(hasHorizontalOverflow, `${route} should not overflow horizontally`).toBe(false);

            if (route === "/projects") {
                const titleFitsContainer = await page
                    .locator("main[data-screen-label='02 Work'] h1")
                    .evaluate((element) => element.scrollWidth <= element.clientWidth + 1);
                const emphasisRightEdge = await page
                    .locator("main[data-screen-label='02 Work'] h1 em")
                    .evaluate((element) => element.getBoundingClientRect().right);
                const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);

                expect(titleFitsContainer, "Work mobile title should fit its container").toBe(true);
                expect(emphasisRightEdge, "Work mobile emphasized title should stay inside viewport").toBeLessThanOrEqual(
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
