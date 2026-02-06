import type { Language } from "./i18n";

/**
 * Format a date string based on the current language
 */
export function formatDate(dateStr: string, lang: Language = "en"): string {
  const date = new Date(dateStr);
  const locale = lang === "zh" ? "zh-CN" : "en-US";

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a date string in short format
 */
export function formatDateShort(dateStr: string, lang: Language = "en"): string {
  const date = new Date(dateStr);
  const locale = lang === "zh" ? "zh-CN" : "en-US";

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
