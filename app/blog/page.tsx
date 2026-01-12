import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Thoughts on UX design, interaction design, and design thinking.",
};

export default async function BlogPage() {
    const posts = await getAllBlogPosts();

    return (
        <section className="py-16 sm:py-20">
            <Container>
                <SectionHeading
                    as="h1"
                    title="Blog"
                    description="Thoughts on UX design, interaction design, and design thinking."
                />

                {posts.length === 0 ? (
                    <div className="mt-12 rounded-2xl border border-border bg-card/50 p-12 text-center">
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
                            No blog posts yet
                        </h2>
                        <p className="text-muted-foreground">
                            Check back soon for articles on design thinking and UX best practices.
                        </p>
                    </div>
                ) : (
                    <div className="mt-12 space-y-8">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="block group"
                            >
                                <article className="rounded-2xl border border-border/50 bg-card/50 p-6 sm:p-8 transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 motion-safe:hover:-translate-y-1">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                                        <time dateTime={post.date}>
                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </time>
                                        <span>·</span>
                                        <span>{post.readingTime}</span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-muted-foreground mb-4">
                                        {post.excerpt}
                                    </p>

                                    {post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}
