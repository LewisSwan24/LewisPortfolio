/**
 * Linear.app-inspired animation presets for Framer Motion
 *
 * Provides reusable Variants, easing curves, and stagger timings
 * used across the entire portfolio for a cohesive motion language.
 */
import type { Variants, Transition } from "framer-motion";

// ─── Easing Curves (typed as FM BezierDefinition tuples) ────
/** Linear.app signature smooth ease */
export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.4, 0.25, 1];
/** Exponential deceleration — heroic entrances */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** Gentle overshoot — playful micro-interactions */
export const EASE_OUT_BACK: [number, number, number, number] = [0.34, 1.56, 0.64, 1];
/** Very fast start → slow land */
export const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];

// ─── Stagger Timings ────────────────────────────────────────
export const STAGGER_FAST = 0.06;
export const STAGGER_NORMAL = 0.1;
export const STAGGER_SLOW = 0.15;

// ─── Durations ──────────────────────────────────────────────
export const DURATION_FAST = 0.3;
export const DURATION_NORMAL = 0.5;
export const DURATION_SLOW = 0.7;
export const DURATION_HERO = 0.8;

// ─── Shared Transition Presets ──────────────────────────────
export const smoothTransition: Transition = {
    duration: DURATION_NORMAL,
    ease: EASE_SMOOTH,
};

export const heroTransition: Transition = {
    duration: DURATION_HERO,
    ease: EASE_OUT_EXPO,
};

// ─── Hero Stagger Variants ──────────────────────────────────
/** Orchestrated stagger: badge → h1 → subtitle → desc → CTA → socials */
export const heroContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

export const heroItem: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: DURATION_HERO,
            ease: EASE_OUT_EXPO,
        },
    },
};

export const heroItemNoBlur: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: DURATION_SLOW,
            ease: EASE_OUT_EXPO,
        },
    },
};

// ─── Section Reveal Variants ────────────────────────────────
export const sectionReveal: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: DURATION_SLOW,
            ease: EASE_SMOOTH,
        },
    },
};

export const sectionStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: STAGGER_NORMAL,
            delayChildren: 0.15,
        },
    },
};

// ─── Card Variants ──────────────────────────────────────────
export const cardReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.96,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: DURATION_NORMAL,
            ease: EASE_SMOOTH,
        },
    },
};

export const card3DHover = {
    rest: {
        scale: 1,
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
    },
    hover: {
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
        transition: {
            duration: DURATION_FAST,
            ease: "easeOut" as const,
        },
    },
};

// ─── Text Blur-In Variant ───────────────────────────────────
export const textBlurIn: Variants = {
    hidden: {
        opacity: 0,
        y: 8,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: DURATION_NORMAL,
            ease: EASE_SMOOTH,
        },
    },
};

// ─── Scale Spring (for numbers / counters) ──────────────────
export const counterSpring: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15,
        },
    },
};

// ─── Stagger Grid (for project/blog grids) ──────────────────
export const staggerGrid: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: STAGGER_FAST,
            delayChildren: 0.1,
        },
    },
};

export const gridItem: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: DURATION_NORMAL,
            ease: EASE_SMOOTH,
        },
    },
};

// ─── Navbar Scroll Variants ─────────────────────────────────
export const navbarCompact = {
    expanded: {
        height: 72,
        backdropFilter: "blur(0px)",
        backgroundColor: "rgba(255,255,255,0)",
    },
    compact: {
        height: 56,
        backdropFilter: "blur(16px)",
        backgroundColor: "rgba(255,255,255,0.7)",
        transition: {
            duration: DURATION_FAST,
            ease: "easeOut" as const,
        },
    },
};

// ─── Floating / Ambient Variants ────────────────────────────
export const floatSlow: Variants = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

export const pulseGlow: Variants = {
    animate: {
        opacity: [0.4, 0.7, 0.4],
        scale: [1, 1.05, 1],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};
