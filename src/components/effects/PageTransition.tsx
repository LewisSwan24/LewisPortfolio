"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useGsapContext } from "@/hooks/useGsapContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Lightweight GSAP route-entry settle: keeps SSR content visible on first paint
 * and restores clean transform/opacity properties so sticky layouts keep working.
 */
export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  useGsapContext(
    rootRef,
    ({ gsap }) => {
      if (reducedMotion || !rootRef.current) return;
      gsap.fromTo(
        rootRef.current,
        { y: 6, opacity: 0.96 },
        {
          y: 0,
          opacity: 1,
          duration: 0.24,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    },
    [pathname, reducedMotion]
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
