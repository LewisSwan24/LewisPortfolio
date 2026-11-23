"use client";

import { useRef, type ReactNode } from "react";
import { useGsapChoreography } from "@/lib/motion/useGsapChoreography";
import styles from "./manuscript.module.css";

interface ManuscriptRevealProps {
  children: ReactNode;
  className?: string;
  withHairline?: boolean;
  itemSelector?: string;
  stagger?: number;
}

/**
 * Editorial scroll reveal container with an optional GSAP ScrollTrigger drafting
 * hairline spine. Keeps all items legible (`opacity >= 0.92`) prior to trigger and
 * settles instantly when `prefers-reduced-motion: reduce` is active.
 */
export function ManuscriptReveal({
  children,
  className = "",
  withHairline = false,
  itemSelector = "[data-manuscript-item]",
  stagger = 0.04,
}: ManuscriptRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { motionMode } = useGsapChoreography(containerRef, {
    itemSelector,
    stagger,
  });

  return (
    <div
      ref={containerRef}
      className={`${styles.manuscriptWrap} ${className}`.trim()}
      data-with-hairline={withHairline ? "true" : "false"}
      data-motion-mode={motionMode}
    >
      {withHairline && (
        <span className={styles.draftHairline} aria-hidden="true">
          <span className={styles.draftHairlineFill} data-manuscript-hairline="" />
        </span>
      )}
      {children}
    </div>
  );
}
