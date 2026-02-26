import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { BackToTop } from "@/components/navigation/BackToTop";
import { ErrorBoundary } from "@/components/providers/ErrorBoundary";
import { PageTransition } from "@/components/effects/PageTransition";
import { PerformanceMonitor } from "@/components/providers/PerformanceMonitor";
import { AutoThemeSwitch } from "@/components/providers/AutoThemeSwitch";
import { KeyboardShortcutsModal } from "@/components/providers/KeyboardShortcutsModal";
import { Analytics } from "@vercel/analytics/react";
import {
    StructuredData,
    generatePersonSchema,
    generateWebSiteSchema,
} from "@/lib/seo";
import { getAllProjects } from "@/lib/projects";
import { getAllBlogPosts } from "@/lib/blog";

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
        <NextIntlClientProvider messages={messages}>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem={false}
                disableTransitionOnChange
            >
                <StructuredData data={generatePersonSchema()} />
                <StructuredData data={generateWebSiteSchema()} />
                <SkipLink />
                <div className="flex min-h-screen flex-col">
                    <Navbar searchItems={searchItems} />
                    <main id="main-content" className="flex-1">
                        <ErrorBoundary>
                            <PageTransition>{children}</PageTransition>
                        </ErrorBoundary>
                    </main>
                    <Footer />
                </div>
                <BackToTop />
                <AutoThemeSwitch />
                <KeyboardShortcutsModal />
                <PerformanceMonitor />
                <Analytics />
            </ThemeProvider>
        </NextIntlClientProvider>
    );
}
