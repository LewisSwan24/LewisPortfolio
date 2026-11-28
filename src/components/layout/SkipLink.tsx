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
