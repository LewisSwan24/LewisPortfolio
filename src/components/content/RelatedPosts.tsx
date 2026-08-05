import Link from "next/link";
import { cn } from "@/lib/cn";
import type { BlogPost } from "@/lib/blog";
import { localizeInternalHref } from "@/lib/locale-href";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentSlug: string;
  className?: string;
  dict?: Record<string, any>;
  locale?: string;
}

export function RelatedPosts({
  posts,
  currentSlug,
  className,
  dict,
  locale = "en",
}: RelatedPostsProps) {
  const relatedPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className={cn("border-t border-border pt-12", className)}>
      <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={localizeInternalHref(`/blog/${post.slug}`, locale)}
            className="group block rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/50 hover:shadow-layered"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>

              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
