"use client";

/**
 * The featured-work section, as a deck you step through rather than a stack you
 * scroll past.
 *
 * All items stay in the DOM so SSR HTML carries every case for crawlers.
 * Motion uses GSAP (registered once in src/lib/motion/gsap.ts) with transform-
 * only animations, pointer swipe support, keyboard navigation, and instant
 * swaps under `prefers-reduced-motion`.
 */

import { useState, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useGsapContext } from "@/hooks/useGsapContext";
import { getGsap, MOTION_PRESETS } from "@/lib/motion/gsap";

const TRAVEL = 56;
const COMMIT = 76;

export interface FeaturedDeckItem {
  key: string;
  n: string;
  node: React.ReactNode;
}

interface FeaturedDeckProps {
  items: FeaturedDeckItem[];
  labels: { prev: string; next: string; kbd: string };
}

export function FeaturedDeck({ items, labels }: FeaturedDeckProps) {
  const reduce = useReducedMotion();
  const [at, setAt] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const busy = useRef(false);
  const hasInteracted = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    active: boolean;
    startX: number;
    startTime: number;
    lastX: number;
    targetEl: HTMLElement | null;
  }>({ active: false, startX: 0, startTime: 0, lastX: 0, targetEl: null });

  const step = useCallback(
    (delta: 1 | -1) => {
      if (busy.current || items.length <= 1) return;
      hasInteracted.current = true;
      busy.current = true;
      window.setTimeout(
        () => {
          busy.current = false;
        },
        reduce ? 0 : 280
      );
      setDir(delta);
      setAt((i) => (i + delta + items.length) % items.length);
    },
    [items.length, reduce]
  );

  useGsapContext(
    stageRef,
    ({ gsap }) => {
      const slides = stageRef.current?.querySelectorAll<HTMLElement>(".feat-deck-slide");
      if (!slides || slides.length === 0) return;

      slides.forEach((slide, i) => {
        const active = i === at;
        if (reduce || !hasInteracted.current) {
          gsap.set(slide, { x: 0, opacity: active ? 1 : 0 });
          return;
        }
        if (active) {
          gsap.fromTo(
            slide,
            { x: dir * TRAVEL, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: MOTION_PRESETS.deckSettle.duration,
              ease: MOTION_PRESETS.deckSettle.ease,
              overwrite: "auto",
            }
          );
        } else {
          gsap.to(slide, {
            x: -dir * (TRAVEL * 0.5),
            opacity: 0,
            duration: 0.22,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    },
    [at, dir, reduce]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      hasInteracted.current = true;
      setDir(-1);
      setAt(0);
    } else if (e.key === "End") {
      e.preventDefault();
      hasInteracted.current = true;
      setDir(1);
      setAt(items.length - 1);
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.button !== 0) return;
    const activeSlide = stageRef.current?.querySelector<HTMLElement>(".feat-deck-slide.is-active");
    if (!activeSlide) return;
    dragState.current = {
      active: true,
      startX: e.clientX,
      startTime: performance.now(),
      lastX: e.clientX,
      targetEl: activeSlide,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragState.current;
    if (!d.active || !d.targetEl) return;
    d.lastX = e.clientX;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 6) {
      const { gsap } = getGsap();
      gsap.set(d.targetEl, { x: dx * 0.28 });
    }
  };

  const finishDrag = () => {
    const d = dragState.current;
    if (!d.active) return;
    const dx = d.lastX - d.startX;
    const elapsed = Math.max(1, performance.now() - d.startTime);
    const velocity = Math.abs(dx / elapsed) * 1000;
    const targetEl = d.targetEl;
    d.active = false;
    d.targetEl = null;

    if (Math.abs(dx) > COMMIT || (Math.abs(dx) > 24 && velocity > 500)) {
      step(dx < 0 ? 1 : -1);
    } else if (targetEl && Math.abs(dx) > 6) {
      const { gsap } = getGsap();
      gsap.to(targetEl, { x: 0, duration: 0.24, ease: "power2.out", overwrite: "auto" });
    }
  };

  return (
    <div className="feat-deck">
      <div
        ref={stageRef}
        className="feat-deck-stage"
        role="group"
        aria-label={labels.kbd}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        {items.map((item, i) => {
          const active = i === at;
          return (
            <div
              key={item.key}
              className={`feat-deck-slide${active ? " is-active" : ""}`}
              aria-hidden={!active}
            >
              {item.node}
            </div>
          );
        })}
      </div>

      <div className="feat-deck-bar">
        <button
          type="button"
          className="feat-deck-arrow"
          onClick={() => step(-1)}
          aria-label={labels.prev}
        >
          ←
        </button>

        <ol className="feat-deck-ticks" aria-hidden="true">
          {items.map((item, i) => (
            <li key={item.key} className={i === at ? "on" : undefined}>
              {item.n}
            </li>
          ))}
        </ol>

        <button
          type="button"
          className="feat-deck-arrow"
          onClick={() => step(1)}
          aria-label={labels.next}
        >
          →
        </button>
      </div>

      <p className="feat-deck-kbd" aria-hidden="true">
        {labels.kbd}
      </p>
    </div>
  );
}
