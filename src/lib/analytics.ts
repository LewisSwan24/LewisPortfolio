/**
 * Unified analytics wrapper for the portfolio.
 *
 * Centralizes custom event tracking so every page/component
 * calls one API instead of importing vendored SDKs directly.
 *
 * Currently backed by Vercel Analytics (no extra dependency).
 * Swap the implementation in `track()` to add Plausible, Umami, etc.
 */

type EventName =
    | "page_view"
    | "project_view"
    | "blog_view"
    | "resume_download"
    | "contact_submit"
    | "newsletter_subscribe"
    | "theme_switch"
    | "language_switch"
    | "search_open"
    | "search_query"
    | "cta_click"
    | "social_click"
    | "share_click"
    | "external_link";

interface EventProperties {
    /** Page path or component context */
    path?: string;
    /** Resource slug (project / blog) */
    slug?: string;
    /** Arbitrary label */
    label?: string;
    /** Numerical value (e.g. reading time, scroll depth) */
    value?: number;
    /** Extra key-value pairs */
    [key: string]: string | number | boolean | undefined;
}

/**
 * Track a custom event.
 *
 * In development, events are logged to the console.
 * In production, they're forwarded to Vercel Analytics `track()`.
 */
export function trackEvent(name: EventName, properties?: EventProperties) {
    if (typeof window === "undefined") return;

    // Development: log to console
    if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] ${name}`, properties ?? "");
        return;
    }

    // Production: Vercel Analytics custom events
    try {
        // @vercel/analytics exposes a global `va` helper after the
        // <Analytics /> component has mounted.
        const va = (window as unknown as Record<string, unknown>).va;
        if (typeof va === "function") {
            va("event", { name, ...properties });
        }
    } catch {
        // Silently fail — analytics should never break the app
    }
}

/**
 * Convenience helpers for the most common events.
 */
export const analytics = {
    projectView: (slug: string) =>
        trackEvent("project_view", { slug, path: `/projects/${slug}` }),

    blogView: (slug: string) =>
        trackEvent("blog_view", { slug, path: `/blog/${slug}` }),

    resumeDownload: () =>
        trackEvent("resume_download", { path: "/resume" }),

    contactSubmit: () =>
        trackEvent("contact_submit", { path: "/contact" }),

    newsletterSubscribe: (source: string) =>
        trackEvent("newsletter_subscribe", { label: source }),

    themeSwitch: (theme: string) =>
        trackEvent("theme_switch", { label: theme }),

    languageSwitch: (lang: string) =>
        trackEvent("language_switch", { label: lang }),

    searchOpen: () =>
        trackEvent("search_open"),

    searchQuery: (query: string) =>
        trackEvent("search_query", { label: query }),

    ctaClick: (label: string, path?: string) =>
        trackEvent("cta_click", { label, path }),

    socialClick: (platform: string) =>
        trackEvent("social_click", { label: platform }),

    shareClick: (platform: string, slug?: string) =>
        trackEvent("share_click", { label: platform, slug }),

    externalLink: (url: string) =>
        trackEvent("external_link", { label: url }),
};
