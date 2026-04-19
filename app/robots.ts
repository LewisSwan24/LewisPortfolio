import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const hiddenPaths = [
  "/booking",
  "/guestbook",
  "/lab",
  "/en/lab",
  "/zh/lab",
  "/test-route",
  "/en/test-route",
  "/zh/test-route",
  "/dashboard",
  "/posts",
  "/admin",
];

export default function robots(): MetadataRoute.Robots {
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
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
