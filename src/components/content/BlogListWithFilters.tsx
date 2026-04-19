"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    readingTime: string;
}

interface BlogListWithFiltersProps {
    posts: BlogPost[];
    allTags: string[];
}

export function BlogListWithFilters({ posts, allTags }: BlogListWithFiltersProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    const filteredAndSortedPosts = useMemo(() => {
        let result = posts;

        if (selectedTag) {
            result = result.filter((post) => post.tags.includes(selectedTag));
        }

        result = [...result].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

        return result;
    }, [posts, selectedTag, sortOrder]);

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={cn(
                            "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                            "border focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                            !selectedTag
                                ? "bg-accent text-accent-foreground border-accent"
                                : "bg-background text-muted-foreground border-border hover:border-accent/50"
                        )}
                    >
                        All
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            className={cn(
                                "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                                "border focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                                selectedTag === tag
                                    ? "bg-accent text-accent-foreground border-accent"
                                    : "bg-background text-muted-foreground border-border hover:border-accent/50"
                            )}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="sort-order" className="text-sm text-muted-foreground">
                        Sort:
                    </label>
                    <select
                        id="sort-order"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                        className={cn(
                            "px-3 py-1.5 rounded-lg text-sm",
                            "bg-background border border-border",
                            "text-foreground",
                            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                            "cursor-pointer"
                        )}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredAndSortedPosts.length} of {posts.length} posts
                {selectedTag && (
                    <span className="ml-1">
                        tagged with <span className="text-accent font-medium">{selectedTag}</span>
                    </span>
                )}
            </p>

            {filteredAndSortedPosts.length === 0 ? (
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
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                        No posts found
                    </h2>
                    <p className="text-muted-foreground">
                        Try selecting a different tag or clearing the filter.
                    </p>
                    <button
                        onClick={() => setSelectedTag(null)}
                        className="mt-4 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
                    >
                        Clear Filter
                    </button>
                </div>
            ) : (
                <div className="space-y-8">
                    {filteredAndSortedPosts.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="block group"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <article className="animate-fade-in rounded-2xl border border-border/50 bg-card/50 p-6 sm:p-8 transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 motion-safe:hover:-translate-y-1">
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

                                <p className="text-muted-foreground mb-4">{post.excerpt}</p>

                                {post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={cn(
                                                    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                                                    selectedTag === tag
                                                        ? "bg-accent text-accent-foreground"
                                                        : "bg-accent/10 text-accent border border-accent/20"
                                                )}
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
        </div>
    );
}
