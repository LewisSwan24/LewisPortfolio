export function buildArticleShareUrl(
  siteUrl: string,
  locale: string,
  slug: string
) {
  const origin = siteUrl.replace(/\/+$/, "");
  const localePrefix = locale === "zh" ? "/zh" : "";
  return `${origin}${localePrefix}/blog/${slug}`;
}
