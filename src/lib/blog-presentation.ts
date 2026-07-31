type BlogLocale = "en" | "zh";

export function formatBlogReadingTime(readingTime: string, locale: BlogLocale) {
  if (locale !== "zh") return readingTime;

  const minutes = /^(\d+) min read$/.exec(readingTime)?.[1];
  return minutes ? `${minutes} 分钟阅读` : readingTime;
}

export function formatBlogOriginalLanguage(
  sourceLanguage: BlogLocale,
  locale: BlogLocale
) {
  if (sourceLanguage === locale) return null;
  return locale === "zh" ? "英文原文" : "Chinese original";
}
