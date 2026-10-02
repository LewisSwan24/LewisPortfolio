const PRODUCTION_SITE_URL = "https://lewisdong.vercel.app";

/**
 * The absolute origin every canonical, sitemap, robots, OG and JSON-LD URL is
 * built from.
 *
 * Deliberately defensive: an unset or loopback NEXT_PUBLIC_SITE_URL in a
 * deployed build poisons all of those surfaces at once — a canonical pointing at
 * localhost makes the site effectively unindexable — so a loopback value is only
 * honoured outside production builds.
 */
export function resolveSiteUrl(
  raw: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
  nodeEnv: string | undefined = process.env.NODE_ENV
): string {
  const trimmed = raw?.trim();
  if (!trimmed) return PRODUCTION_SITE_URL;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return PRODUCTION_SITE_URL;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return PRODUCTION_SITE_URL;
  }

  const isLoopback =
    parsed.hostname === "localhost" ||
    parsed.hostname === "127.0.0.1" ||
    parsed.hostname === "[::1]";
  if (isLoopback && nodeEnv === "production") return PRODUCTION_SITE_URL;

  return parsed.origin;
}

export const siteConfig = {
  name: "Lewis Dong",
  title: "Graduate Interaction Designer (Full-time) · UX Designer · UX Researcher",
  description:
    "UQ Master of Interaction Design student in Brisbane crafting research-driven experiences through usability testing, AI, prototyping, and accessibility.",
  // Single source for the zh surfaces. These used to be inline literals in
  // app/[locale]/page.tsx, which left the RSS feed with no Chinese copy to fall
  // back to — /zh/feed.xml was serving the English description.
  titleZh: "交互设计师 / 产品设计师",
  descriptionZh:
    "昆士兰大学交互设计硕士在读，常驻布里斯班。通过可用性测试、AI 工具、原型设计与可访问性，打造由研究驱动的体验。",
  url: resolveSiteUrl(),
  author: {
    name: "Lewis Dong",
    // Legal/Chinese name. Carried into structured data as alternateName so a
    // Chinese-language search for 董子铭 resolves to this site, and used for the
    // signature on /zh surfaces.
    nameZh: "董子铭",
    email: "24kplo@gmail.com",
    location: "Brisbane, Australia",
  },
  social: {
    // Leave a link empty to hide it. LinkedIn is empty on purpose: the
    // canonical facts file records it as not public, and it only goes back with
    // Lewis's say-so. Dribbble is empty because dribbble.com/lewisdong is a 404.
    linkedin: "",
    github: "https://github.com/LewisSwan24",
    dribbble: "",
  },
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/resume", label: "Resume" },
  ],
  footerLinks: [
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/resume", label: "Resume" },
  ],
  skills: [
    "Interaction Design",
    "UX Research",
    "Prototyping",
    "Usability Testing",
    "Accessibility",
    "AI in UX",
    "Information Architecture",
    "Design Systems",
    "Figma",
    "Wireframing",
    "Journey Mapping",
  ],
};

export type SiteConfig = typeof siteConfig;
