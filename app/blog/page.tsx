import { getAllBlogPosts, getAllBlogTags } from "@/lib/blog";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { BlogListWithFilters } from "@/components/BlogListWithFilters";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Thoughts on UX design, interaction design, and design thinking.",
};

export default async function BlogPage() {
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
                <SectionHeading
                    as="h1"
                    title="Blog"
                    description="Thoughts on UX design, interaction design, and design thinking."
                />

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
                                No blog posts yet
                            </h2>
                            <p className="text-muted-foreground">
                                Check back soon for articles on design thinking and UX best practices.
                            </p>
                        </div>
                    ) : (
                        <BlogListWithFilters posts={postsData} allTags={allTags} />
                    )}
                </div>
            </Container>
        </section>
    );
}
