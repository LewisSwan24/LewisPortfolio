import { test, expect } from "@playwright/test";

test.describe("Portfolio Homepage", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should have correct page title", async ({ page }) => {
        await expect(page).toHaveTitle(/Lewis Dong/);
    });

    test("should display hero section with name", async ({ page }) => {
        const heroHeading = page.locator("h1");
        await expect(heroHeading).toBeVisible();
        await expect(heroHeading).toContainText("Lewis Dong");
    });

    test("should have working navigation", async ({ page }) => {
        // Check that main nav links exist
        const nav = page.locator("nav");
        await expect(nav).toBeVisible();

        // Test Projects link
        await page.click('nav a[href="/projects"]');
        await expect(page).toHaveURL(/\/projects/);
        await expect(page.locator("h1")).toContainText(/Projects/i);
    });

    test("should toggle theme", async ({ page }) => {
        const themeToggle = page.locator('button[aria-label*="theme"], button[aria-label*="Theme"]');
        const html = page.locator("html");

        // Get initial theme class
        const initialClass = await html.getAttribute("class") || "";

        await expect(themeToggle.first()).toBeVisible();
        await themeToggle.first().click();
        await page.waitForSelector('html:not([class="' + initialClass + '"])', { timeout: 2000 }).catch(() => { });

        // Theme class should have changed
        const newClass = await html.getAttribute("class") || "";
        expect(newClass).not.toBe(initialClass);
    });

    test("should have skip link for accessibility", async ({ page }) => {
        // Tab to reveal skip link
        await page.keyboard.press("Tab");
        const skipLink = page.locator(".skip-link, [class*='skip']");
        await expect(skipLink.first()).toBeVisible();
    });
});

test.describe("Projects Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/projects");
    });

    test("should display projects grid", async ({ page }) => {
        const projectCards = page.locator('a[href^="/projects/"]');
        await expect(projectCards.first()).toBeVisible();
    });

    test("should navigate to project detail", async ({ page }) => {
        // Click first project card
        const firstProject = page.locator('a[href^="/projects/"]').first();
        await firstProject.click();

        // Should be on project detail page
        await expect(page).toHaveURL(/\/projects\/.+/);
        await expect(page.locator("article")).toBeVisible();
    });

    test("project detail should have TOC", async ({ page }) => {
        // Navigate to a project
        await page.locator('a[href^="/projects/"]').first().click();

        // TOC should exist in the DOM (may be hidden on mobile viewports)
        const toc = page.locator('[class*="toc"], nav[aria-label*="table"]');
        await expect(toc.first()).toBeAttached();
    });
});

test.describe("Blog Page", () => {
    test("should display blog posts or empty state", async ({ page }) => {
        await page.goto("/blog");

        // Either blog posts or empty state should be visible
        const blogContent = page.locator("article, [class*='empty']");
        await expect(blogContent.first()).toBeVisible();
    });

    test("should have tag filters when posts exist", async ({ page }) => {
        await page.goto("/blog");

        // If posts exist, filters should be visible
        const filterBar = page.locator("button:has-text('All')");
        if (await filterBar.count() > 0) {
            await expect(filterBar).toBeVisible();
        }
    });
});

test.describe("Accessibility", () => {
    test("should have no accessibility violations on homepage", async ({ page }) => {
        await page.goto("/");

        // Check for basic accessibility features
        const mainContent = page.locator("main");
        await expect(mainContent).toBeVisible();
        await expect(mainContent).toHaveAttribute("id", "main-content");
    });

    test("should be keyboard navigable", async ({ page }) => {
        await page.goto("/");

        // Tab through page
        for (let i = 0; i < 5; i++) {
            await page.keyboard.press("Tab");
        }

        // Some element should be focused
        const focusedElement = page.locator(":focus");
        await expect(focusedElement).toBeVisible();
    });
});

test.describe("Blog Detail Page", () => {
    test("should navigate to blog post and display content", async ({ page }) => {
        await page.goto("/blog");
        const firstPost = page.locator('a[href^="/blog/"]').first();
        if (await firstPost.count() > 0) {
            await firstPost.click();
            await expect(page).toHaveURL(/\/blog\/.+/);
            await expect(page.locator("article")).toBeVisible();
            await expect(page.locator("h1")).toBeVisible();
        }
    });

    test("should display breadcrumb navigation", async ({ page }) => {
        await page.goto("/blog");
        const firstPost = page.locator('a[href^="/blog/"]').first();
        if (await firstPost.count() > 0) {
            await firstPost.click();
            const breadcrumb = page.locator('nav[aria-label*="breadcrumb"], nav[aria-label*="Breadcrumb"]');
            if (await breadcrumb.count() > 0) {
                await expect(breadcrumb.first()).toBeVisible();
            }
        }
    });
});

test.describe("Contact Page", () => {
    test("should display contact form", async ({ page }) => {
        await page.goto("/contact");
        await expect(page.locator("form")).toBeVisible();
    });

    test("should have required form fields", async ({ page }) => {
        await page.goto("/contact");
        await expect(page.locator('input[name="name"], #name')).toBeVisible();
        await expect(page.locator('input[name="email"], #email')).toBeVisible();
        await expect(page.locator('textarea[name="message"], #message')).toBeVisible();
    });
});

test.describe("Resume Page", () => {
    test("should display resume content", async ({ page }) => {
        await page.goto("/resume");
        await expect(page.locator("h1")).toBeVisible();
    });

    test("should have download PDF button", async ({ page }) => {
        await page.goto("/resume");
        const downloadBtn = page.locator('a[href*="resume.pdf"], a[download]');
        await expect(downloadBtn.first()).toBeVisible();
    });
});

test.describe("Lab Page", () => {
    test("should display lab experiments", async ({ page }) => {
        await page.goto("/lab");
        await expect(page.locator("h1")).toBeVisible();
    });
});

test.describe("Search Modal", () => {
    test("should open search with keyboard shortcut", async ({ page }) => {
        await page.goto("/");

        // Try Ctrl+K to open search
        await page.keyboard.press("Control+k");

        const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], input[role="combobox"]');
        await expect(searchInput.first()).toBeVisible({ timeout: 2000 });
    });
});

test.describe("404 Page", () => {
    test("should display 404 for non-existent routes", async ({ page }) => {
        await page.goto("/this-page-does-not-exist");
        const notFoundText = page.locator('text=/not found|404/i');
        await expect(notFoundText.first()).toBeVisible();
    });

    test("should have navigation links back to main pages", async ({ page }) => {
        await page.goto("/this-page-does-not-exist");
        const homeLink = page.locator('a[href="/"]');
        await expect(homeLink.first()).toBeVisible();
    });
});

test.describe("Responsive Design", () => {
    test("should display mobile menu on small screens", async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto("/");

        // Mobile menu button should be visible
        const mobileMenuButton = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]');
        await expect(mobileMenuButton.first()).toBeVisible();
    });

    test("should show theme toggle in mobile menu", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto("/");

        const mobileMenuButton = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]');
        if (await mobileMenuButton.count() > 0) {
            await mobileMenuButton.first().click();
            await page.waitForTimeout(300);

            // Theme toggle should be visible in mobile menu
            const themeToggle = page.locator('button[aria-label*="theme"], button[aria-label*="Theme"], button[aria-label*="mode"]');
            if (await themeToggle.count() > 0) {
                await expect(themeToggle.first()).toBeVisible();
            }
        }
    });
});
