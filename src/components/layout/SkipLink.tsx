"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations();
  return (
    // Styled by .skip-link in base.css. The Tailwind focus utilities it used to
    // carry sit in @layer utilities, so the unlayered .sr-only always won: the
    // focused link stayed a clipped 1px box, behind the sticky nav.
    <a href="#main-content" className="skip-link">
      {t("skipLink")}
    </a>
  );
}

interface VisuallyHiddenProps {
  children: React.ReactNode;
}

export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

interface LiveRegionProps {
  children: React.ReactNode;
  politeness?: "polite" | "assertive";
}

export function LiveRegion({ children, politeness = "polite" }: LiveRegionProps) {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  );
}
