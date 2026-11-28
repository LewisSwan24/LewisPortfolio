import type { ReactNode } from "react";
import styles from "./manuscript.module.css";

interface CssManuscriptRevealProps {
  children: ReactNode;
  className?: string;
  withHairline?: boolean;
}

/**
 * The ManuscriptReveal look without GSAP (v7.0 P1-a). Items marked
 * `data-focus-item` settle from 0.92 opacity and 12px (6px on phones) as they
 * scroll in, and the hairline draws down on desktop, all through CSS
 * scroll-driven animation. No JavaScript: a server component, nothing to
 * hydrate. Browsers without `animation-timeline: view()` and anyone with
 * reduced motion get the finished state, still.
 *
 * Case pages use this: the GSAP version cost about 250 ms of style reads on a
 * 4x-slowed phone (v7.0 review, P1 profile).
 */
export function CssManuscriptReveal({ children, className = "", withHairline = false }: CssManuscriptRevealProps) {
  return (
    <div
      className={`${styles.manuscriptWrap} ${styles.cssReveal} ${className}`.trim()}
      data-with-hairline={withHairline ? "true" : "false"}
      data-css-reveal=""
    >
      {withHairline && (
        <span className={styles.draftHairline} aria-hidden="true">
          <span className={`${styles.draftHairlineFill} ${styles.cssHairlineFill}`} />
        </span>
      )}
      {children}
    </div>
  );
}
