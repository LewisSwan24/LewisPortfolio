const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const legacyProjectRedirects = [
  ["uq-connect", "connect"],
  ["spectra-lens", "spectra"],
  ["ai-interview-assistant", "ai"],
].flatMap(([from, to]) => [
  {
    source: `/projects/${from}`,
    destination: `/projects/${to}`,
    permanent: true,
  },
  {
    source: `/zh/projects/${from}`,
    destination: `/zh/projects/${to}`,
    permanent: true,
  },
]);

// Connect Circles and the AI Interview Assistant both described projects that
// never existed, so the cases were removed rather than corrected. There is no
// honest destination for their URLs, and a 404 on a formerly indexed page is
// worse than landing on the work index.
const retiredCaseRedirects = ["", "/en", "/zh"].flatMap((prefix) =>
  ["circles", "connect-circles", "ai", "ai-interview-assistant"].map((slug) => ({
    source: `${prefix}/projects/${slug}`,
    destination: `${prefix || "/en"}/projects`,
    permanent: true,
  }))
);

// The hiring section used to fan out into 19 leaf routes plus a /hire/[role]
// tree. Nothing linked to them, the sitemap never listed them, and they were
// crawlable. They are deleted; anything still pointing at one lands on /hire.
// `:path+` (one or more) rather than `:path*` so /hire itself is not caught.
const retiredHiringRedirects = ["", "/en", "/zh"].map((prefix) => ({
  source: `${prefix}/hire/:path+`,
  destination: `${prefix || "/en"}/hire`,
  permanent: true,
}));

function disabledSurfaceRedirects() {
  return [
    {
      source: "/test-route",
      destination: "/en",
      permanent: false,
    },
    {
      source: "/en/test-route",
      destination: "/",
      permanent: false,
    },
    {
      source: "/zh/test-route",
      destination: "/zh",
      permanent: false,
    },
    { source: "/booking", destination: "/en/contact", permanent: false },
    { source: "/en/booking", destination: "/en/contact", permanent: false },
    { source: "/zh/booking", destination: "/zh/contact", permanent: false },
    { source: "/guestbook", destination: "/en/contact", permanent: false },
    { source: "/en/guestbook", destination: "/en/contact", permanent: false },
    { source: "/zh/guestbook", destination: "/zh/contact", permanent: false },
    { source: "/dashboard", destination: "/en", permanent: false },
    { source: "/posts", destination: "/en/blog", permanent: false },
    { source: "/login", destination: "/en", permanent: false },
  ];
}

const nextConfig = {
  outputFileTracingRoot: __dirname,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours cache for optimized images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Add cache headers for static assets
  async headers() {
    return [
      {
        // Cache static assets for 1 year
        source: "/:all*(svg|jpg|png|webp|avif|woff2|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache JavaScript and CSS with immutable
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Security headers for all pages
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            // frame-src is explicit. Without it, it falls back to default-src
            // 'self', and the browser refuses to even request the MazeRunners
            // showcase for the case-page embed — no request at all, just an
            // error frame. frame-ancestors stays 'none': nobody frames us.
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://avatars.githubusercontent.com https://images.unsplash.com; font-src 'self'; connect-src 'self' https://vitals.vercel-insights.com; frame-src 'self' https://maze-runners.vercel.app https://hoop-dream.vercel.app; frame-ancestors 'none';",
          },
        ],
      },
      {
        // The Vigil prototype is served from our own origin and embedded in its
        // own case page, so it has to permit being framed by us. The blanket
        // X-Frame-Options: DENY and frame-ancestors 'none' above block that;
        // both are relaxed to same-origin here and nowhere else. Its own policy
        // is tighter than the site default: the file is self-contained and
        // makes no network calls, so connect-src is 'none'.
        source: "/projects/vigil/prototype.html",
        headers: [
          // The case is unlisted and abandoned; keep the prototype out of search too.
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; frame-ancestors 'self';",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/en",
        },
        {
          source:
            "/:path((?!api(?:/|$)|booking(?:/|$)|guestbook(?:/|$)|dashboard(?:/|$)|posts(?:/|$)|en(?:/|$)|zh(?:/|$)|_next(?:/|$)|_vercel(?:/|$)|opengraph-image(?:/|$)|.*\\..*).*)",
          destination: "/en/:path",
        },
      ],
    };
  },
  async redirects() {
    return [
      ...legacyProjectRedirects,
      ...retiredCaseRedirects,
      ...retiredHiringRedirects,
      ...disabledSurfaceRedirects(),
    ];
  },
  // Compression
  compress: true,
  // Production source maps disabled for smaller bundles
  productionBrowserSourceMaps: false,
  // Trailing slash for consistency
  trailingSlash: false,
  // Strict React mode for better development
  reactStrictMode: true,
  // Power optimization: reduce unused polyfills
  experimental: {
    optimizePackageImports: ["yet-another-react-lightbox"],
  },
};

module.exports = withNextIntl(withBundleAnalyzer(nextConfig));
