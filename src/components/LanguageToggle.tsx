"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("languageToggle");
  const [isPending, startTransition] = useTransition();

  const nextLocale = locale === "en" ? "zh" : "en";
  const label = locale === "en" ? t("toChinese") : t("toEnglish");
  const ariaLabel =
    locale === "en" ? t("ariaLabelToChinese") : t("ariaLabelToEnglish");

  return (
    <button
      type="button"
      onClick={() => {
        // With next-intl, switching locale means navigating to the
        // locale-prefixed (or un-prefixed) version of the current path.
        const segments = pathname.split("/").filter(Boolean);
        // Remove existing locale prefix if present
        const pathWithoutLocale =
          segments[0] === "en" || segments[0] === "zh"
            ? "/" + segments.slice(1).join("/")
            : pathname;
        const newPath =
          nextLocale === "en"
            ? pathWithoutLocale || "/"
            : `/zh${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

        startTransition(() => {
          router.push(newPath);
        });
      }}
      className="flex h-9 items-center justify-center rounded-lg text-foreground transition-all duration-200 motion-reduce:transition-none hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background px-3"
      aria-label={ariaLabel}
      disabled={isPending}
    >
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
