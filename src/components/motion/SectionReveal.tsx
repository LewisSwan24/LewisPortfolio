"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Progressive section settle backed by CSS Scroll-Driven Animations (`view()`)
 * with an IntersectionObserver fallback for partial-support browsers. Elements
 * stay readable (`opacity >= 0.94`) even before entering the viewport.
 */
export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsCssScrollDriven =
      window.CSS?.supports?.("(animation-timeline: view()) and (animation-range: entry)") ?? false;

    if (prefersReduced || supportsCssScrollDriven) {
      el.setAttribute("data-reveal-state", "ready");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.setAttribute("data-reveal-state", "visible");
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`v3-section-reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
