import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Pure CSS compositor route wrapper — keeps static pages free of client
 * animation runtime overhead while running subtle settle motion only when
 * `prefers-reduced-motion: no-preference`.
 */
export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return <div className={`v3-page-enter ${className}`.trim()}>{children}</div>;
}
