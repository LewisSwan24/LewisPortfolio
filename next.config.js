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
  ["connect-circles", "circles"],
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
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://avatars.githubusercontent.com https://images.unsplash.com; font-src 'self'; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'none';",
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
    return [...legacyProjectRedirects, ...disabledSurfaceRedirects()];
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
