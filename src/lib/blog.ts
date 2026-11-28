import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  BLOG_CLUSTERS,
  type BlogCluster,
} from "@/lib/blog-clusters";

export { BLOG_CLUSTERS, type BlogCluster };

const blogDirectory = path.join(process.cwd(), "content/blog");

export type BlogLocale = "en" | "zh";

const POST_CLUSTER_MAP: Record<string, BlogCluster> = {
  "ux-research-methods-guide": "cs-ixd",
  "accessibility-in-design": "bilingual-systems",
  "v3-architecture-and-performance-moat": "cs-ixd",
  "walkie-and-fencepost-invariants": "ai-safety",
  "withdrawing-interfaces-in-social-spaces": "physical-computing",
  "cognitive-sovereignty-and-default-refusal": "ai-safety",
  "honest-limits-as-design-rigor": "cs-ixd",
  "five-state-interface-audits": "cs-ixd",
  "timing-as-interaction-design": "physical-computing",
  "flat-state-machines-over-nested-tabs": "cs-ixd",
  "asymmetric-friction-against-enter-fatigue": "ai-safety",
  "calibrated-motion-cognitive-bandwidth": "bilingual-systems",
  "bilingual-design-systems-without-drift": "bilingual-systems",
  "swansea-cs-to-uq-physical-computing": "cs-ixd",
  "debugging-tools-as-ux-critique": "cs-ixd",
  "writing-state-invariants-before-figma": "cs-ixd",
  "fencepost-data-layer-ai-revocation": "ai-safety",
  "psychology-of-default-not-now-modals": "ai-safety",
  "confidence-tiers-over-silent-hallucination": "ai-safety",
  "fail-closed-approval-queues": "ai-safety",
  "dual-boot-ota-slot-safety-ergonomics": "physical-computing",
  "usb-preemption-over-wireless-assumptions": "physical-computing",
  "shared-wristband-collaborative-friction": "physical-computing",
  "bilingual-editorial-voice-without-translationese": "bilingual-systems",
  "mcp-endpoints-for-design-portfolios": "ai-safety",
  "causal-lineage-graphs-over-flat-tags": "cs-ixd",
  "protocol-locked-3d-hardware-twins": "physical-computing",
  "zero-hallucination-red-team-defense": "ai-safety",
  "bundle-ceilings-and-css-zero-warning-gates": "cs-ixd",
  "service-worker-boundaries-around-private-briefs": "bilingual-systems",
};

/**
 * Chinese posts live in content/blog/zh/ under the same filename, so a slug is
 * the same URL in both locales and hreflang stays honest. The English listing
 * is unaffected: getBlogSlugs filters on ".mdx", and a directory named "zh"
 * does not match that.
 *
 * A missing translation falls back to English rather than 404ing — someone who
 * followed a link should get the post, not a dead end.
 */
function resolvePostPath(slug: string, locale: BlogLocale): string | null {
    const candidates =
        locale === "zh"
            ? [
                  path.join(blogDirectory, "zh", `${slug}.mdx`),
                  path.join(blogDirectory, `${slug}.mdx`),
              ]
            : [path.join(blogDirectory, `${slug}.mdx`)];

    return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    cluster: BlogCluster;
    author: string;
    readingTime: string;
    published: boolean;
}

/**
 * Get all blog post slugs
 */
export function getBlogSlugs(): string[] {
    try {
        if (!fs.existsSync(blogDirectory)) {
            return [];
        }
        return fs.readdirSync(blogDirectory).filter((file) => file.endsWith(".mdx"));
    } catch (error) {
        console.error("Error reading blog directory:", error);
        return [];
    }
}

/**
 * Get blog post by slug
 */
export async function getBlogPost(
    slug: string,
    locale: BlogLocale = "en"
): Promise<{
    metadata: BlogPost;
    content: string;
} | null> {
    try {
        const realSlug = slug.replace(/\.mdx$/, "");
        const fullPath = resolvePostPath(realSlug, locale);

        if (!fullPath) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        // Calculate reading time accounting for both English words (~200 wpm) and CJK characters (~350 cpm)
        const cjkCount = (content.match(/[\u4e00-\u9fff]/g) ?? []).length;
        const latinWordCount = content
            .replace(/[\u4e00-\u9fff]/g, " ")
            .trim()
            .split(/\s+/)
            .filter(Boolean).length;
        const readingMinutes = Math.max(1, Math.ceil(cjkCount / 350 + latinWordCount / 200));

        const rawCluster = typeof data.cluster === "string" ? data.cluster : "";
        const cluster: BlogCluster = BLOG_CLUSTERS.includes(rawCluster as BlogCluster)
            ? (rawCluster as BlogCluster)
            : POST_CLUSTER_MAP[realSlug] ?? "cs-ixd";

        return {
            metadata: {
                slug: realSlug,
                title: data.title || "",
                date: data.date || "",
                excerpt: data.excerpt || "",
                tags: data.tags || [],
                cluster,
                author: data.author || "Lewis Dong",
                readingTime: locale === "zh" ? `${readingMinutes} 分钟阅读` : `${readingMinutes} min read`,
                published: data.published !== false,
            },
            content,
        };
    } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
    }
}

/**
 * Get all blog posts
 */
export async function getAllBlogPosts(locale: BlogLocale = "en"): Promise<BlogPost[]> {
    const slugs = getBlogSlugs();
    const posts = await Promise.all(
        slugs.map(async (slug) => {
            const post = await getBlogPost(slug, locale);
            return post?.metadata;
        })
    );

    return posts
        .filter((post): post is BlogPost => post !== null && post !== undefined && post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get all unique tags from blog posts.
 *
 * Takes a locale because tags are not shared filter keys: the zh MDX files
 * carry Chinese tags. Reading them from the English posts meant /zh/blog
 * rendered English filter buttons that could never match a zh post's tags, so
 * every filter click there returned nothing.
 */
export async function getAllBlogTags(locale: BlogLocale = "en"): Promise<string[]> {
    const posts = await getAllBlogPosts(locale);
    const tagsSet = new Set<string>();

    posts.forEach((post) => {
        post.tags.forEach((tag) => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
}
