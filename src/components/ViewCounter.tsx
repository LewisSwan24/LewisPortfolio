"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface ViewCounterProps {
  slug: string;
  className?: string;
}

/**
 * ViewCounter - A simple view counter for projects
 * 
 * This is a client-side implementation using localStorage for demo purposes.
 * For production, you should use a database or analytics service like:
 * - Vercel Analytics
 * - Google Analytics
 * - Redis
 */
export function ViewCounter({ slug, className }: ViewCounterProps) {
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    // Get existing views from localStorage
    const viewsKey = `project-views-${slug}`;
    const viewedKey = `project-viewed-${slug}`;
    
    const storedViews = localStorage.getItem(viewsKey);
    const hasAlreadyViewed = sessionStorage.getItem(viewedKey);
    
    let currentViews = storedViews ? parseInt(storedViews, 10) : 0;
    
    // Increment view count if this is a new session
    if (!hasAlreadyViewed) {
      currentViews += 1;
      localStorage.setItem(viewsKey, currentViews.toString());
      sessionStorage.setItem(viewedKey, "true");
      setHasViewed(true);
    }
    
    setViewCount(currentViews);
  }, [slug]);

  if (viewCount === null) {
    return (
      <span className={cn("text-sm text-muted-foreground", className)}>
        <span className="inline-block w-8 h-4 bg-muted rounded animate-pulse" />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm text-muted-foreground", className)}>
      <svg 
        className="w-4 h-4" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
        />
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
        />
      </svg>
      <span>{viewCount.toLocaleString()} views</span>
      {hasViewed && (
        <span className="text-xs text-accent">(new)</span>
      )}
    </span>
  );
}

/**
 * ViewCounterDisplay - Server-safe display of view count
 * Use this for static display without counting
 */
interface ViewCounterDisplayProps {
  count: number;
  className?: string;
}

export function ViewCounterDisplay({ count, className }: ViewCounterDisplayProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm text-muted-foreground", className)}>
      <svg 
        className="w-4 h-4" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
        />
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
        />
      </svg>
      <span>{count.toLocaleString()} views</span>
    </span>
  );
}
