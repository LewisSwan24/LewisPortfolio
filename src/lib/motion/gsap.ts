"use client";

import gsap from "gsap";

let configured = false;

/**
 * Core GSAP accessor (lightweight — does NOT bundle ScrollTrigger unless
 * explicitly loaded via `getGsapWithScrollTrigger`).
 */
export function getGsap() {
  if (!configured && typeof window !== "undefined") {
    gsap.defaults({ ease: "power2.out", duration: 0.32 });
    configured = true;
  }
  return { gsap };
}

let scrollTriggerLoaded = false;

/**
 * Lazy-registers ScrollTrigger on demand so pages that only use timeline or
 * pointer-driven motion never pay ScrollTrigger's bundle cost.
 */
export async function getGsapWithScrollTrigger() {
  const { gsap: core } = getGsap();
  if (!scrollTriggerLoaded && typeof window !== "undefined") {
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    core.registerPlugin(ScrollTrigger);
    scrollTriggerLoaded = true;
    return { gsap: core, ScrollTrigger };
  }
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  return { gsap: core, ScrollTrigger };
}

/**
 * Lively Icons paper-motion presets — crisp, restrained, zero glow or float.
 */
export const MOTION_PRESETS = {
  deckSettle: { duration: 0.36, ease: "power3.out" },
  deckThrow: { duration: 0.26, ease: "power2.in" },
  stackRipple: { duration: 0.42, ease: "back.out(1.2)" },
  modalIn: { duration: 0.2, ease: "power2.out" },
} as const;
