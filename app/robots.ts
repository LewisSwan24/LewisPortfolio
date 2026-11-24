import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const hiddenPaths = [
  "/booking",
  "/guestbook",
  // Tailored recruiter briefs must never enter search indexes
  "/brief",
  "/en/brief",
  "/zh/brief",
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
