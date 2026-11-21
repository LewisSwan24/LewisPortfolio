import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const hiddenPaths = [
  "/booking",
  "/guestbook",
  // Internal proof-maintenance dashboard: reachable, never linked, and absent
  // from the sitemap. Keep it out of the index rather than let it rank.
  "/maintenance",
  "/en/maintenance",
  "/zh/maintenance",
  "/test-route",
  "/en/test-route",
  "/zh/test-route",
  "/dashboard",
  "/posts",
  "/admin",
  // Embedded case demo. It is meant to be read inside its case page, not ranked
  // as a standalone result — a bare prototype in search looks like a stray file
  // rather than like work.
  "/projects/vigil/prototype.html",
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/", ...hiddenPaths],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/zh/"],
        disallow: ["/api/", ...hiddenPaths],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
