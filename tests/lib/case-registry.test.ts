import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  getAllCases,
  getCaseBySlug,
  getFeaturedDeckCases,
  getListedCases,
  getCasesByRoleTrack,
  getRegistryReviewWindow,
  getWorkIndexItems,
  validateCaseRegistry,
} from "@/lib/cases/registry";
import {
  CURRENT_PROJECT_SLUGS,
  LISTED_PROJECT_SLUGS,
  UNLISTED_PROJECT_SLUGS,
} from "@/lib/project-routes";

const PUBLIC_DIR = path.join(process.cwd(), "public");

describe("Unified Case Registry (Zod schema & integrity)", () => {
  it("validates every case record against CaseRecordSchema with zero issues", () => {
    const report = validateCaseRegistry();
    expect(report.issues).toEqual([]);
    expect(report.ok).toBe(true);
    expect(report.total).toBe(CURRENT_PROJECT_SLUGS.length);
    expect(report.listed).toBe(LISTED_PROJECT_SLUGS.length);
  });

  it("keeps listed and unlisted status aligned with project-routes.ts", () => {
    const listedSlugs = getListedCases().map((c) => c.slug);
    expect(listedSlugs).toEqual(LISTED_PROJECT_SLUGS);

    for (const slug of UNLISTED_PROJECT_SLUGS) {
      const record = getCaseBySlug(slug);
      expect(record?.status).toBe("unlisted");
      expect(record?.featuredOrder).toBeUndefined();
    }
  });

  it("orders featured deck cases monotonically and excludes unlisted cases", () => {
    const deck = getFeaturedDeckCases();
    expect(deck.length).toBeGreaterThan(0);
    expect(deck.every((c) => c.status === "listed")).toBe(true);
    const orders = deck.map((c) => c.featuredOrder ?? 0);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it("maps every role track to at least one listed case", () => {
    for (const track of ["product", "interaction", "design-eng", "ai-ux"] as const) {
      expect(getCasesByRoleTrack(track).length).toBeGreaterThan(0);
    }
  });

  it("verifies every cover, media image, video, and demo poster exists in public/", () => {
    for (const record of getAllCases()) {
      if (record.cover) {
        expect(fs.existsSync(path.join(PUBLIC_DIR, record.cover.src))).toBe(true);
      }
      if (record.media) {
        for (const img of record.media.images) {
          expect(fs.existsSync(path.join(PUBLIC_DIR, img.src))).toBe(true);
        }
        if (record.media.video) {
          expect(fs.existsSync(path.join(PUBLIC_DIR, record.media.video.src))).toBe(true);
          expect(fs.existsSync(path.join(PUBLIC_DIR, record.media.video.poster))).toBe(true);
        }
      }
      if (record.demo) {
        expect(fs.existsSync(path.join(PUBLIC_DIR, record.demo.poster))).toBe(true);
        if (record.demo.src.startsWith("/")) {
          expect(fs.existsSync(path.join(PUBLIC_DIR, record.demo.src))).toBe(true);
        }
      }
    }
  });

  it("derives ordered WorkIndex DTOs for listed cases in EN and ZH", () => {
    const enItems = getWorkIndexItems("en");
    const zhItems = getWorkIndexItems("zh");

    expect(enItems.length).toBe(LISTED_PROJECT_SLUGS.length);
    expect(zhItems.length).toBe(LISTED_PROJECT_SLUGS.length);
    expect(enItems.map((i) => i.slug)).toEqual(zhItems.map((i) => i.slug));

    for (const item of enItems) {
      expect(item.tags.length).toBeGreaterThan(0);
      expect(item.problem.length).toBeGreaterThan(8);
      expect(item.changed.length).toBeGreaterThan(8);
    }

    const window = getRegistryReviewWindow();
    expect(window.reviewedAt).toBe("2026-11-21");
    expect(window.nextReviewAt).toBe("2027-02-21");
  });
});
