import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { BackToTop } from "@/components/navigation/BackToTop";
import { ErrorBoundary } from "@/components/providers/ErrorBoundary";
import { PageTransition } from "@/components/effects/PageTransition";
import { PerformanceMonitor } from "@/components/providers/PerformanceMonitor";
import { LazyKeyboardShortcuts } from "@/components/providers/LazyKeyboardShortcuts";
import { SearchProvider } from "@/components/SearchProvider";
import type { CaseLocale } from "@/lib/cases/registry";
import { Analytics } from "@vercel/analytics/react";
import {
  StructuredData,
  generatePersonSchema,
  generateWebSiteSchema,
  generateOrganizationSchema,
} from "@/lib/seo";

const CLIENT_MESSAGE_NAMESPACES = [
  "brand",
  "nav",
  "hero",
  "foot",
  "footer",
  "contact",
  "blog",
  "resume",
  "skipLink",
  "mobileMenu",
  "search",
  "languageToggle",
  "common",
] as const;

function pickClientMessages(messages: Record<string, unknown>) {
  const picked: Record<string, unknown> = {};
  for (const key of CLIENT_MESSAGE_NAMESPACES) {
    if (key in messages) {
      picked[key] = messages[key];
    }
  }
  return picked;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const caseLocale: CaseLocale = locale === "zh" ? "zh" : "en";
  const messages = await getMessages();
  const clientMessages = pickClientMessages(messages as Record<string, unknown>);

  return (
    <NextIntlClientProvider messages={clientMessages}>
      <ThemeProvider
        attribute={["class", "data-theme"]}
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <SearchProvider locale={caseLocale}>
          <StructuredData data={generatePersonSchema()} />
          <StructuredData data={generateOrganizationSchema()} />
          <StructuredData data={generateWebSiteSchema()} />
          <SkipLink />
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main id="main-content" className="flex-1">
              <ErrorBoundary>
                <PageTransition>{children}</PageTransition>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
          <BackToTop />
          <LazyKeyboardShortcuts />
          <PerformanceMonitor />
          <Analytics />
        </SearchProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
