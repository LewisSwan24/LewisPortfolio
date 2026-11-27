"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";

interface BackToTopProps {
  threshold?: number;
  className?: string;
}

/** Below this width the button has no gutter to sit in and covers the text column. */
const NARROW_QUERY = "(max-width: 767px)";

export function BackToTop({ threshold = 400, className }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // v6.9 (review R18): on phones the fixed 48px button sat over the last words of
    // each line while reading. There it only shows when the reader scrolls back up,
    // which is when they are looking for a way back.
    const narrow = window.matchMedia(NARROW_QUERY);
    let lastY = window.scrollY;

    const toggleVisibility = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (y <= threshold) {
        setIsVisible(false);
      } else if (!narrow.matches) {
        setIsVisible(true);
      } else if (delta < -4) {
        setIsVisible(true);
      } else if (delta > 4) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      data-testid="back-to-top"
      // A hidden button must not take keyboard focus.
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={isVisible ? undefined : true}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "flex h-12 w-12 items-center justify-center",
        "rounded-full border border-border/60 bg-background/80",
        "text-foreground",
        "transition-all duration-300 ease-out",
        "hover:bg-accent hover:text-[var(--on-accent)] hover:border-transparent",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
        "motion-safe:hover:scale-110 motion-safe:active:scale-95",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-16 opacity-0 pointer-events-none",
        className
      )}
      aria-label="Back to top"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
