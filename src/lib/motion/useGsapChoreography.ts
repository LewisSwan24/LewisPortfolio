"use client";

import { useEffect, useState, type RefObject } from "react";
import { getGsap, getGsapWithScrollTrigger } from "@/lib/motion/gsap";

export type MotionChoreographyMode = "idle" | "active" | "reduced";

export interface UseGsapChoreographyOptions {
  itemSelector?: string;
  hairlineSelector?: string;
  stagger?: number;
  disabled?: boolean;
}

/**
 * Centralized GSAP + ScrollTrigger + matchMedia choreography hook.
 * Guarantees transform/opacity-only animations (`y`, `autoAlpha`, `scaleY`),
 * immediate `0ms` settlement under `prefers-reduced-motion: reduce`, and
 * deterministic `mm.revert()` teardown on unmount.
 */
export function useGsapChoreography(
  containerRef: RefObject<HTMLElement | null>,
  options: UseGsapChoreographyOptions = {}
): { motionMode: MotionChoreographyMode } {
  const {
    itemSelector = "[data-manuscript-item]",
    hairlineSelector = "[data-manuscript-hairline]",
    stagger = 0.05,
    disabled = false,
  } = options;

  const [motionMode, setMotionMode] = useState<MotionChoreographyMode>("idle");

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const getItems = () =>
      Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
    const getHairlines = () =>
      Array.from(container.querySelectorAll<HTMLElement | SVGElement>(hairlineSelector));

    const reducedMq =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    if (disabled || reducedMq?.matches) {
      const { gsap } = getGsap();
      const items = getItems();
      const hairlines = getHairlines();
      if (items.length > 0) {
        gsap.set(items, { autoAlpha: 1, y: 0, clearProps: "transform" });
      }
      if (hairlines.length > 0) {
        gsap.set(hairlines, { scaleY: 1, opacity: 1 });
      }
      setMotionMode("reduced");
      return;
    }

    let cancelled = false;
    let mmInstance: { revert: () => void } | null = null;

    void getGsapWithScrollTrigger()
      .then(({ gsap }) => {
        if (cancelled || !containerRef.current) return;

        const mm = gsap.matchMedia();
        mmInstance = mm;

        mm.add(
          {
            desktop: "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
            mobile: "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
            reduce: "(prefers-reduced-motion: reduce)",
          },
          (ctx) => {
            const conditions = ctx.conditions ?? {};
            const items = getItems();
            const hairlines = getHairlines();

            if (conditions.reduce) {
              if (items.length > 0) {
                gsap.set(items, { autoAlpha: 1, y: 0, clearProps: "transform" });
              }
              if (hairlines.length > 0) {
                gsap.set(hairlines, { scaleY: 1, opacity: 1 });
              }
              setMotionMode("reduced");
              return;
            }

            const isDesktop = Boolean(conditions.desktop);
            setMotionMode("active");

            items.forEach((item, index) => {
              gsap.fromTo(
                item,
                {
                  autoAlpha: isDesktop ? 0.92 : 0.96,
                  y: isDesktop ? 12 : 6,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: isDesktop ? 0.36 : 0.22,
                  delay: Math.min(index, 4) * stagger,
                  ease: "power2.out",
                  clearProps: "transform",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 92%",
                    once: true,
                  },
                }
              );
            });

            hairlines.forEach((hairline) => {
              gsap.fromTo(
                hairline,
                { scaleY: isDesktop ? 0.15 : 1 },
                {
                  scaleY: 1,
                  ease: "none",
                  transformOrigin: "top center",
                  scrollTrigger: {
                    trigger: container,
                    start: "top 80%",
                    end: "bottom 72%",
                    scrub: isDesktop ? 0.3 : false,
                  },
                }
              );
            });
          }
        );

        if (cancelled) {
          mm.revert();
          mmInstance = null;
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMotionMode("reduced");
        }
      });

    return () => {
      cancelled = true;
      mmInstance?.revert();
      mmInstance = null;
    };
  }, [containerRef, itemSelector, hairlineSelector, stagger, disabled]);

  return { motionMode };
}
