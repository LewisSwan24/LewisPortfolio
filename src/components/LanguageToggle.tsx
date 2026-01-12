"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Dictionary, Language } from "@/lib/i18n";

interface LanguageToggleProps {
  lang: Language;
  dict: Dictionary;
}

export function LanguageToggle({ lang, dict }: LanguageToggleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const nextLang: Language = lang === "en" ? "zh" : "en";
  const label =
    lang === "en" ? dict.languageToggle.toChinese : dict.languageToggle.toEnglish;
  const ariaLabel =
    lang === "en"
      ? dict.languageToggle.ariaLabelToChinese
      : dict.languageToggle.ariaLabelToEnglish;

  return (
    <button
      type="button"
      onClick={() => {
        document.cookie = `lang=${nextLang}; path=/; max-age=31536000; samesite=lax`;
        startTransition(() => {
          router.refresh();
        });
      }}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/40 backdrop-blur-md text-foreground shadow-sm shadow-black/5 transition-all duration-200 motion-reduce:transition-none hover:bg-muted/40 hover:border-border focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
      aria-label={ariaLabel}
      disabled={isPending}
    >
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
