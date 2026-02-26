"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

interface SeriesPost {
  slug: string;
  title: string;
  order: number;
}

interface SeriesNavigationProps {
  seriesName: string;
  posts: SeriesPost[];
  currentSlug: string;
  className?: string;
}

export function SeriesNavigation({
  seriesName,
  posts,
  currentSlug,
  className,
}: SeriesNavigationProps) {
  const sortedPosts = [...posts].sort((a, b) => a.order - b.order);
  const currentIndex = sortedPosts.findIndex((p) => p.slug === currentSlug);
  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  return (
    <div className={cn("rounded-xl border border-border bg-card p-6", className)}>
      {/* Series header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Series</p>
          <p className="font-semibold text-foreground">{seriesName}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Progress</span>
          <span>
            {currentIndex + 1} of {sortedPosts.length}
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / sortedPosts.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Post list */}
      <ul className="space-y-2 mb-4">
        {sortedPosts.map((post, index) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                post.slug === currentSlug
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <span
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0",
                  post.slug === currentSlug
                    ? "bg-accent text-accent-foreground"
                    : index < currentIndex
                      ? "bg-green-500/20 text-green-600"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {index < currentIndex ? "✓" : index + 1}
              </span>
              <span className="line-clamp-1">{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Navigation buttons */}
      <div className="flex gap-2 pt-4 border-t border-border">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="flex-1 px-3 py-2 rounded-lg border border-border text-sm text-center hover:bg-muted transition-colors"
          >
            ← Previous
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="flex-1 px-3 py-2 rounded-lg bg-accent text-accent-foreground text-sm text-center hover:bg-accent/90 transition-colors"
          >
            Next →
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
}
