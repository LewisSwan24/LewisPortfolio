import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import { getMdxComponents } from "@/components/mdx-components";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
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
    const post = await getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="py-16 sm:py-20">
            <Container>
                <div className="max-w-3xl mx-auto">
                    {/* Breadcrumb */}
                    <Breadcrumb
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Blog", href: "/blog" },
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
                                {new Date(post.metadata.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                            <span>·</span>
                            <span>{post.metadata.readingTime}</span>
                            <span>·</span>
                            <span>By {post.metadata.author}</span>
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
                </div>
            </Container>
        </article>
    );
}
