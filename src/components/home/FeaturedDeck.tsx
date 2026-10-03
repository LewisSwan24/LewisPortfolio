"use client";

/**
 * The featured-work section, as a deck you step through rather than a stack you
 * scroll past.
 *
 * The stack it replaces was eight identical 486px blocks — 4,560px of equal
 * weight, which is another way of saying nothing was featured. One case at a
 * time gives each of them the whole stage.
 *
 * All eight stay in the DOM, so the served HTML still carries every case —
 * hiding seven of them from a crawler to win a layout argument would be a bad
 * trade. The inactive ones are `visibility: hidden`, which takes them out of
 * the tab order and out of the accessibility tree on its own; `aria-hidden`
 * states the same thing explicitly. The honest limit: `visibility: hidden`
 * text is not reachable by the browser's own find-in-page, so Ctrl+F only
 * searches the case on stage.
 *
 * Motion uses framer-motion because it is already a dependency on this route.
 * The lock that stops a second turn mid-animation is released on a timer, never
 * from requestAnimationFrame: rAF does not fire in a background tab, and
 * releasing there would leave the deck stuck for anyone who switched away.
 */

import { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SETTLE = { type: "spring", stiffness: 260, damping: 30, mass: 0.8 } as const;
const INSTANT = { duration: 0 } as const;
const TRAVEL = 64;
const COMMIT = 80;

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

  const step = useCallback(
    (delta: 1 | -1) => {
      if (busy.current) return;
      busy.current = true;
      window.setTimeout(
        () => {
          busy.current = false;
        },
        reduce ? 0 : 320,
      );
      setDir(delta);
      setAt((i) => (i + delta + items.length) % items.length);
    },
    [items.length, reduce],
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
      setAt(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setAt(items.length - 1);
    }
  };

  return (
    <div className="feat-deck">
      <div
        className="feat-deck-stage"
        role="group"
        aria-label={labels.kbd}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {items.map((item, i) => {
          const active = i === at;
          return (
            <motion.div
              key={item.key}
              className={`feat-deck-slide${active ? " is-active" : ""}`}
              // Without initial={false} the server renders no transform and the
              // client renders one, which React treats as a hydration failure
              // and answers by throwing the whole server tree away.
              initial={false}
              animate={
                active ? { x: 0, opacity: 1 } : { x: dir === 1 ? -TRAVEL : TRAVEL, opacity: 0 }
              }
              transition={reduce ? INSTANT : SETTLE}
              drag={active && !reduce ? "x" : false}
              dragElastic={0.12}
              dragMomentum={false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > COMMIT || Math.abs(info.velocity.x) > 500) {
                  step(info.offset.x < 0 ? 1 : -1);
                }
              }}
              aria-hidden={!active}
            >
              {item.node}
            </motion.div>
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
