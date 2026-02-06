import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPost, getAllBlogPosts, type BlogPost } from "@/lib/blog";
import { getMdxComponents } from "@/components/content/mdx-components";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Comments } from "@/components/content/Comments";
import { ReadingProgressChapters } from "@/components/content/ReadingProgressChapters";
import { NewsletterSignup } from "@/components/content/NewsletterSignup";
import { RelatedPosts } from "@/components/content/RelatedPosts";
import { extractTOC } from "@/lib/toc";
import { getCurrentDictionary } from "@/lib/i18n-server";
import { generateArticleSchema, generateBreadcrumbSchema, StructuredData } from "@/lib/seo";
import type { Metadata } from "next";

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const post = await getBlogPost(params.slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.metadata.title,
        description: post.metadata.excerpt,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { lang, dict } = getCurrentDictionary();
    const post = await getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    const toc = extractTOC(post.content);
    const allPosts = await getAllBlogPosts();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

    return (
        <>
            <StructuredData data={generateArticleSchema({
                title: post.metadata.title,
                excerpt: post.metadata.excerpt,
                slug: params.slug,
                date: post.metadata.date,
                author: post.metadata.author,
                tags: post.metadata.tags,
            })} />
            <StructuredData data={generateBreadcrumbSchema([
                { name: dict.blog.breadcrumbHome, url: siteUrl },
                { name: dict.blog.breadcrumbBlog, url: `${siteUrl}/blog` },
                { name: post.metadata.title, url: `${siteUrl}/blog/${params.slug}` },
            ])} />
            <ReadingProgressChapters 
                chapters={toc.map(item => ({ id: item.id, title: item.text, level: item.level }))} 
            />
            <article className="py-16 sm:py-20">
            <Container>
                <div className="max-w-3xl mx-auto">
                    {/* Breadcrumb */}
                    <Breadcrumb
                        items={[
                            { label: dict.blog.breadcrumbHome, href: "/" },
                            { label: dict.blog.breadcrumbBlog, href: "/blog" },
                            { label: post.metadata.title },
                        ]}
                        className="mb-8"
                    />

                    {/* Header */}
                    <header className="mb-12">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
                            {post.metadata.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                            <time dateTime={post.metadata.date}>
                                {new Date(post.metadata.date).toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                            <span>·</span>
                            <span>{post.metadata.readingTime}</span>
                            <span>·</span>
                            <span>{dict.blog.by} {post.metadata.author}</span>
                        </div>

                        {post.metadata.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {post.metadata.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>

                    {/* Content */}
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <MDXRemote source={post.content} components={getMdxComponents()} />
                    </div>

                    {/* Related Posts */}
                    <RelatedPosts
                        posts={allPosts}
                        currentSlug={params.slug}
                        className="mt-16"
                        dict={dict}
                    />

                    {/* Newsletter Signup */}
                    <div className="mt-16 pt-8 border-t border-border">
                        <NewsletterSignup dict={dict} />
                    </div>

                    {/* Comments */}
                    {/* 
                        To enable Giscus comments:
                        1. Install Giscus app on your GitHub repo: https://github.com/apps/giscus
                        2. Update the configuration below with your repo details
                        3. Uncomment the Comments component
                    */}
                    {/* <Comments 
                        repo="LewisSwan24/portfolio"
                        repoId="YOUR_REPO_ID"
                        category="Blog Comments"
                        categoryId="YOUR_CATEGORY_ID"
                    /> */}
                </div>
            </Container>
        </article>
        </>
    );
}
