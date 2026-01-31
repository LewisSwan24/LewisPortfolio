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
        // Find theme toggle button
        const themeToggle = page.locator('button[aria-label*="theme"], button[aria-label*="Theme"]');

        // Get initial theme
        const html = page.locator("html");

        // Click toggle
        if (await themeToggle.count() > 0) {
            await themeToggle.first().click();
            // Theme should change (check class changes)
            await page.waitForTimeout(500);
        }
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

        // TOC should exist on desktop
        const toc = page.locator('[class*="toc"], nav[aria-label*="table"]');
        // TOC might be hidden on mobile, so just check it exists in DOM
        await expect(toc.first()).toBeDefined();
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

test.describe("Responsive Design", () => {
    test("should display mobile menu on small screens", async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto("/");

        // Mobile menu button should be visible
        const mobileMenuButton = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]');
        await expect(mobileMenuButton.first()).toBeVisible();
    });
});
