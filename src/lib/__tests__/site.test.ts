import { describe, it, expect } from "vitest";
import { siteConfig, resolveSiteUrl } from "../site";

const PROD = "https://portfolio-lewisdong.vercel.app";

describe("resolveSiteUrl", () => {
    it("falls back to the production origin when the env var is unset or blank", () => {
        expect(resolveSiteUrl(undefined, "production")).toBe(PROD);
        expect(resolveSiteUrl("", "production")).toBe(PROD);
        expect(resolveSiteUrl("   ", "production")).toBe(PROD);
    });

    // The original defect: a loopback value shipped to production poisoned
    // canonical, sitemap, robots, OG and JSON-LD URLs all at once.
    it("refuses loopback origins in production builds", () => {
        expect(resolveSiteUrl("http://localhost:3000", "production")).toBe(PROD);
        expect(resolveSiteUrl("http://127.0.0.1:3000", "production")).toBe(PROD);
    });

    it("still honours loopback origins outside production", () => {
        expect(resolveSiteUrl("http://localhost:3000", "development")).toBe(
            "http://localhost:3000"
        );
    });

    it("ignores malformed or non-http values", () => {
        expect(resolveSiteUrl("not a url", "production")).toBe(PROD);
        expect(resolveSiteUrl("ftp://example.com", "production")).toBe(PROD);
    });

    it("normalises a valid origin and strips any trailing path", () => {
        expect(resolveSiteUrl("https://example.com/", "production")).toBe(
            "https://example.com"
        );
        expect(resolveSiteUrl("https://example.com/base", "production")).toBe(
            "https://example.com"
        );
    });
});

describe("siteConfig", () => {
    it("should have required personal info", () => {
        expect(siteConfig.name).toBeTruthy();
        expect(siteConfig.title).toBeTruthy();
        expect(siteConfig.description).toBeTruthy();
        expect(siteConfig.url).toBeTruthy();
    });

    it("should have valid author info", () => {
        expect(siteConfig.author.name).toBeTruthy();
        expect(siteConfig.author.email).toContain("@");
        expect(siteConfig.author.location).toBeTruthy();
    });

    it("should have valid social links format", () => {
        if (siteConfig.social.linkedin) {
            expect(siteConfig.social.linkedin).toMatch(/^https?:\/\//);
        }
        if (siteConfig.social.github) {
            expect(siteConfig.social.github).toMatch(/^https?:\/\//);
        }
        if (siteConfig.social.dribbble) {
            expect(siteConfig.social.dribbble).toMatch(/^https?:\/\//);
        }
    });

    it("should have navigation links with valid hrefs", () => {
        expect(siteConfig.navLinks.length).toBeGreaterThan(0);
        siteConfig.navLinks.forEach((link) => {
            expect(link.href).toMatch(/^\//);
            expect(link.label).toBeTruthy();
        });
    });

    it("should have footer links", () => {
        expect(siteConfig.footerLinks.length).toBeGreaterThan(0);
        siteConfig.footerLinks.forEach((link) => {
            expect(link.href).toMatch(/^\//);
            expect(link.label).toBeTruthy();
        });
    });

    it("should have skills list", () => {
        expect(siteConfig.skills.length).toBeGreaterThan(0);
        siteConfig.skills.forEach((skill) => {
            expect(typeof skill).toBe("string");
            expect(skill.length).toBeGreaterThan(0);
        });
    });

    it("should have Home as first nav link", () => {
        expect(siteConfig.navLinks[0].href).toBe("/");
        expect(siteConfig.navLinks[0].label).toBe("Home");
    });
});
