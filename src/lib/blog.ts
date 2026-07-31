import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blog");

export type BlogSourceLanguage = "en" | "zh";

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    author: string;
    readingTime: string;
    sourceLanguage: BlogSourceLanguage;
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
export async function getBlogPost(slug: string): Promise<{
    metadata: BlogPost;
    content: string;
} | null> {
    try {
        const realSlug = slug.replace(/\.mdx$/, "");
        const fullPath = path.join(blogDirectory, `${realSlug}.mdx`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        // Calculate reading time (rough estimate: 200 words per minute)
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);

        return {
            metadata: {
                slug: realSlug,
                title: data.title || "",
                date: data.date || "",
                excerpt: data.excerpt || "",
                tags: data.tags || [],
                author: data.author || "Lewis Dong",
                readingTime: `${readingTime} min read`,
                sourceLanguage: data.sourceLanguage === "zh" ? "zh" : "en",
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
export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const slugs = getBlogSlugs();
    const posts = await Promise.all(
        slugs.map(async (slug) => {
            const post = await getBlogPost(slug);
            return post?.metadata;
        })
    );

    return posts
        .filter((post): post is BlogPost => post !== null && post !== undefined && post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get all unique tags from blog posts
 */
export async function getAllBlogTags(): Promise<string[]> {
    const posts = await getAllBlogPosts();
    const tagsSet = new Set<string>();

    posts.forEach((post) => {
        post.tags.forEach((tag) => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
}
