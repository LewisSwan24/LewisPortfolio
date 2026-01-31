import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/lib/site";
import { getCurrentDictionary } from "@/lib/i18n-server";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { BackToTop } from "@/components/BackToTop";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { CustomCursor } from "@/components/CustomCursor";
import { KeyboardShortcutsModal } from "@/components/KeyboardShortcutsModal";
import { Analytics } from "@vercel/analytics/react";
import { StructuredData, generatePersonSchema, generateWebSiteSchema } from "@/lib/seo";
import { getAllProjects } from "@/lib/projects";
import { getAllBlogPosts } from "@/lib/blog";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "UX Designer",
    "Interaction Designer",
    "UX Researcher",
    "Portfolio",
    "Brisbane",
    "Australia",
    "Figma",
    "User Experience",
    "Accessibility",
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  category: "Portfolio",
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en": `${siteConfig.url}?lang=en`,
      "zh": `${siteConfig.url}?lang=zh`,
      "x-default": siteConfig.url,
    },
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    alternateLocale: ["zh_CN"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    creator: "@lewisdong",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang, dict } = getCurrentDictionary();

  const projects = getAllProjects();
  const blogPosts = await getAllBlogPosts();

  const searchItems = [
    ...projects.map((p) => ({
      type: "project" as const,
      slug: p.slug,
      title: p.title,
      description: p.oneLiner,
      tags: p.tags,
    })),
    ...blogPosts.map((b) => ({
      type: "blog" as const,
      slug: b.slug,
      title: b.title,
      description: b.excerpt,
      tags: b.tags,
    })),
  ];

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <StructuredData data={generatePersonSchema()} />
        <StructuredData data={generateWebSiteSchema()} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SkipLink label={dict.skipLink} />
          <div className="flex min-h-screen flex-col">
            <Navbar lang={lang} dict={dict} searchItems={searchItems} />
            <main id="main-content" className="flex-1">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </main>
            <Footer lang={lang} dict={dict} />
          </div>
          <BackToTop />
          <CustomCursor />
          <KeyboardShortcutsModal />
          <PerformanceMonitor />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
