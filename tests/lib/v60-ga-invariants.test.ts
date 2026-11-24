import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import enMessages from "@/messages/en.json";
import zhMessages from "@/messages/zh.json";
import { BLOG_CLUSTERS } from "@/lib/blog-clusters";
import { getAllBlogPosts } from "@/lib/blog";
import { auditTranslationese } from "@/lib/i18n/editorial-voice";
import { buildLlmsFullTxt, buildLlmsTxt } from "@/lib/llms";
import { buildMcpManifest } from "@/lib/mcp/server";
import { UNLISTED_PROJECT_SLUGS } from "@/lib/project-routes";

const ROOT = process.cwd();

function collectShapeKeys(obj: unknown, prefix = ""): string[] {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    return [prefix];
  }
  return Object.keys(obj as Record<string, unknown>)
    .sort()
    .flatMap((key) =>
      collectShapeKeys(
        (obj as Record<string, unknown>)[key],
        prefix ? `${prefix}.${key}` : key
      )
    );
}

describe("v6.0 Platform GA Release Invariants", () => {
  it("expands bilingual engineering monographs from 24 to 30 across 4 clusters with zero translationese", async () => {
    const [enPosts, zhPosts] = await Promise.all([
      getAllBlogPosts("en"),
      getAllBlogPosts("zh"),
    ]);

    expect(enPosts).toHaveLength(30);
    expect(zhPosts).toHaveLength(30);
    expect(enPosts.map((p) => p.slug).sort()).toEqual(
      zhPosts.map((p) => p.slug).sort()
    );

    const clusterCounts = new Map<string, number>();
    for (const c of BLOG_CLUSTERS) clusterCounts.set(c, 0);

    for (const post of enPosts) {
      expect(clusterCounts.has(post.cluster)).toBe(true);
      clusterCounts.set(post.cluster, (clusterCounts.get(post.cluster) ?? 0) + 1);
      expect(auditTranslationese(`${post.title} ${post.excerpt}`, "en")).toEqual([]);
    }
    for (const post of zhPosts) {
      expect(auditTranslationese(`${post.title} ${post.excerpt}`, "zh")).toEqual([]);
    }
    for (const c of BLOG_CLUSTERS) {
      expect(clusterCounts.get(c)).toBeGreaterThanOrEqual(4);
    }
  });

  it("maintains strict recursive key symmetry between EN and ZH i18n message trees", () => {
    const enKeys = collectShapeKeys(enMessages);
    const zhKeys = collectShapeKeys(zhMessages);
    expect(enKeys).toEqual(zhKeys);
    expect(enMessages.blog.description).toContain("30");
    expect(zhMessages.blog.description).toContain("30");
  });

  it("ships fail-closed offline reading service worker with worker-src CSP and /api/* + /brief/* bypass", () => {
    const swPath = path.join(ROOT, "public", "sw.js");
    expect(fs.existsSync(swPath)).toBe(true);
    const sw = fs.readFileSync(swPath, "utf8");
    expect(sw).toContain("v6.0.0");
    expect(sw).toContain("/api/");
    expect(sw).toContain("/brief/");

    const nextConfig = fs.readFileSync(path.join(ROOT, "next.config.js"), "utf8");
    expect(nextConfig).toContain("worker-src 'self'");
    expect(nextConfig).toContain("/sw.js");
    expect(nextConfig).toContain("no-cache, no-store, must-revalidate");
  });

  it("refactors ReadingProgressChapters to GPU scaleX, scroll-timeline support & >=24px hit targets", () => {
    const src = fs.readFileSync(
      path.join(ROOT, "src", "components", "content", "ReadingProgressChapters.tsx"),
      "utf8"
    );
    expect(src).toContain("scaleX(");
    expect(src).toContain("prefers-reduced-motion");
    expect(src).toMatch(/min-w-6|min-h-6|minHeight:\s*24|minWidth:\s*24/);
  });

  it("aligns README, /llms.txt, /llms-full.txt & MCP manifest at v6.0.0 with zero unlisted leaks", async () => {
    const readme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8");
    expect(readme).toContain("v6.0.0");
    expect(readme).toContain("30");

    const [llms, llmsFull] = await Promise.all([buildLlmsTxt(), buildLlmsFullTxt()]);
    expect(llms).toContain("v6.0.0");
    expect(llms).toContain("30 bilingual");
    expect(llmsFull.length).toBeGreaterThan(llms.length);

    const manifest = JSON.stringify(buildMcpManifest());
    for (const unlisted of UNLISTED_PROJECT_SLUGS) {
      expect(llms).not.toContain(`/projects/${unlisted}`);
      expect(llmsFull).not.toContain(`/projects/${unlisted}`);
      expect(manifest).not.toContain(`/projects/${unlisted}`);
    }
  });
});
