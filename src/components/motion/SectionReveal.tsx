"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getGsapWithScrollTrigger } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Editorial section reveal backed by lazy ScrollTrigger. Content stays readable
 * at high opacity before trigger firing so Axe contrast checks and first-paint
 * scans never encounter hidden sections.
 */
export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;

    let cancelled = false;
    let revertFn: (() => void) | undefined;

    getGsapWithScrollTrigger().then(({ gsap }) => {
      if (cancelled || !sectionRef.current) return;
      const targets = sectionRef.current.querySelectorAll<HTMLElement>("[data-reveal-item]");
      const animatedTargets = targets.length > 0 ? targets : sectionRef.current;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(animatedTargets, {
          y: 12,
          opacity: 0.94,
          duration: 0.36,
          stagger: 0.05,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        });
      });

      revertFn = () => mm.revert();
    });

    return () => {
      cancelled = true;
      revertFn?.();
    };
  }, [reducedMotion]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
