import { siteConfig } from "@/lib/site";

const base = siteConfig.url.replace(/\/$/, "");

export function buildAlternates(path: string, locale: "en" | "zh") {
  const clean = path === "/" ? "" : path;
  const enUrl = `${base}${clean || "/"}`;
  const zhUrl = `${base}/zh${clean}`;
  return {
    canonical: locale === "zh" ? zhUrl : enUrl,
    languages: {
      en: enUrl,
      zh: zhUrl,
      "x-default": enUrl,
    },
  };
}

export function buildOpenGraph(opts: {
  title: string;
  description?: string;
  path: string;
  locale: "en" | "zh";
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}) {
  const clean = opts.path === "/" ? "" : opts.path;
  const url = opts.locale === "zh" ? `${base}/zh${clean}` : `${base}${clean || "/"}`;
  const og: Record<string, unknown> = {
    title: opts.title,
    description: opts.description,
    url,
    siteName: siteConfig.name,
    locale: opts.locale === "zh" ? "zh_CN" : "en_US",
    type: opts.type || "website",
  };
  if (opts.publishedTime) og.publishedTime = opts.publishedTime;
  if (opts.tags) og.tags = opts.tags;
  return og;
}

export function buildTwitter(opts: { title: string; description?: string }) {
  return {
    card: "summary_large_image" as const,
    title: opts.title,
    description: opts.description,
  };
}
