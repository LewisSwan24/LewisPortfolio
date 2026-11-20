"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import { getGsap } from "@/lib/motion/gsap";

/**
 * Scoped GSAP lifecycle hook for React 19: creates animations inside
 * `gsap.context()` after mount and guarantees full `ctx.revert()` cleanup.
 */
export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: { gsap: ReturnType<typeof getGsap>["gsap"] }) => void,
  deps: DependencyList = []
) {
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      setup({ gsap });
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
