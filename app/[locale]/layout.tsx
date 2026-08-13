import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { BackToTop } from "@/components/navigation/BackToTop";
import { ErrorBoundary } from "@/components/providers/ErrorBoundary";
import { PageTransition } from "@/components/effects/PageTransition";
import { PerformanceMonitor } from "@/components/providers/PerformanceMonitor";
import { KeyboardShortcutsModal } from "@/components/providers/KeyboardShortcutsModal";
import { SearchProvider } from "@/components/SearchProvider";
import { getAllBlogPosts } from "@/lib/blog";
import { Analytics } from "@vercel/analytics/react";
import {
    StructuredData,
    generatePersonSchema,
    generateWebSiteSchema,
    generateOrganizationSchema,
} from "@/lib/seo";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = params;

    // Validate incoming locale
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Load messages for NextIntlClientProvider
    const messages = await getMessages();
    const t = await getTranslations();
    const blogPosts = await getAllBlogPosts();
    const searchItems = [
        ...(["connect", "spectra", "maze", "vigil", "hoop", "pricewise", "gapmapper", "rules"] as const).map((slug) => ({
            type: "project" as const,
            slug,
            title: t(`proj.${slug}.title`),
            description: t(`proj.${slug}.sub`),
            tags: [t(`proj.${slug}.kicker`), t(`proj.${slug}.m1`), t(`proj.${slug}.m2`), t(`proj.${slug}.m3`)],
        })),
        ...blogPosts.map((post) => ({
            type: "blog" as const,
            slug: post.slug,
            title: post.title,
            description: post.excerpt,
            tags: post.tags,
        })),
    ];

    return (
        <NextIntlClientProvider messages={messages}>
            <ThemeProvider
                attribute={["class", "data-theme"]}
                defaultTheme="light"
                enableSystem={false}
                disableTransitionOnChange
            >
                <SearchProvider items={searchItems}>
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
                    <KeyboardShortcutsModal />
                    <PerformanceMonitor />
                    <Analytics />
                </SearchProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
    );
}
