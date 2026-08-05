import { siteConfig } from "@/lib/site";

const base = siteConfig.url.replace(/\/$/, "");

/**
 * Setting `openGraph` explicitly in a route opts that route out of Next's
 * file-convention opengraph-image merge, so every route calling buildOpenGraph
 * must carry the image itself. Without this the site shipped
 * `twitter:card=summary_large_image` with no image at all, which renders as a
 * blank card on LinkedIn and Slack.
 */
const DEFAULT_SOCIAL_IMAGE = {
  url: `${base}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.title}`,
};

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
  /** Absolute or root-relative override, e.g. a per-case opengraph-image route. */
  image?: string;
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
    images: [resolveSocialImage(opts.image, opts.title)],
  };
  if (opts.publishedTime) og.publishedTime = opts.publishedTime;
  if (opts.tags) og.tags = opts.tags;
  return og;
}

export function buildTwitter(opts: {
  title: string;
  description?: string;
  image?: string;
}) {
  return {
    card: "summary_large_image" as const,
    title: opts.title,
    description: opts.description,
    images: [resolveSocialImage(opts.image, opts.title).url],
  };
}

function resolveSocialImage(image: string | undefined, title: string) {
  if (!image) return DEFAULT_SOCIAL_IMAGE;
  return {
    url: image.startsWith("http") ? image : `${base}${image}`,
    width: 1200,
    height: 630,
    alt: `${title} — ${siteConfig.name}`,
  };
}
