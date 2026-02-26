import { describe, it, expect } from "vitest";
import { siteConfig } from "../site";

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
