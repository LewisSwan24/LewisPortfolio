import { getAllBlogPosts, getAllBlogTags } from "@/lib/blog";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogListWithFilters } from "@/components/content/BlogListWithFilters";
import { NewsletterSignup } from "@/components/content/NewsletterSignup";
import { getCurrentDictionary } from "@/lib/i18n-server";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Thoughts on UX design, interaction design, and design thinking.",
};

export default async function BlogPage() {
    const { dict } = getCurrentDictionary();
    const posts = await getAllBlogPosts();
    const allTags = await getAllBlogTags();

    // Convert to plain objects for client component
    const postsData = posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        tags: post.tags,
        readingTime: post.readingTime,
    }));

    return (
        <section className="py-16 sm:py-20">
            <Container>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <SectionHeading
                        as="h1"
                        title={dict.blog.title}
                        description={dict.blog.description}
                    />
                    <a
                        href="/feed.xml"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 shrink-0 rounded-lg border border-border/60 bg-background/40 backdrop-blur-md px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm shadow-black/5 hover:text-accent hover:border-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                        aria-label={dict.blog.rss}
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                        {dict.blog.rss}
                    </a>
                </div>

                <div className="mt-12">
                    {posts.length === 0 ? (
                        <div className="rounded-2xl border border-border bg-card/50 p-12 text-center">
                            <svg
                                className="mx-auto h-16 w-16 text-muted-foreground mb-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                            <h2 className="text-xl font-semibold text-foreground mb-2">
                                {dict.blog.emptyTitle}
                            </h2>
                            <p className="text-muted-foreground">
                                {dict.blog.emptyDescription}
                            </p>
                        </div>
                    ) : (
                        <BlogListWithFilters posts={postsData} allTags={allTags} />
                    )}
                </div>

                {/* Newsletter Signup */}
                <div className="mt-16">
                    <NewsletterSignup />
                </div>
            </Container>
        </section>
    );
}
