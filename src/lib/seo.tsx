import { siteConfig } from "./site";

/**
 * Generate JSON-LD structured data for SEO
 */

// Person schema for the site owner
export function generatePersonSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.author.name,
        jobTitle: "Interaction Designer",
        description: siteConfig.description,
        url: siteConfig.url || process.env.NEXT_PUBLIC_SITE_URL,
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
        sameAs: [
            siteConfig.social.linkedin,
            siteConfig.social.github,
        ].filter(Boolean),
        knowsAbout: [
            "UX Design",
            "Interaction Design",
            "User Research",
            "Prototyping",
            "Accessibility",
            "Design Thinking",
        ],
        alumniOf: {
            "@type": "EducationalOrganization",
            name: "The University of Queensland",
        },
    };
}

// WebSite schema
export function generateWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        description: siteConfig.description,
        url: process.env.NEXT_PUBLIC_SITE_URL,
        author: {
            "@type": "Person",
            name: siteConfig.author.name,
        },
        inLanguage: ["en", "zh-CN"],
    };
}

// CreativeWork schema for projects
export function generateProjectSchema(project: {
    title: string;
    oneLiner: string;
    slug: string;
    cover: string;
    tags: string[];
    timeframe: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.oneLiner,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.slug}`,
        image: `${process.env.NEXT_PUBLIC_SITE_URL}${project.cover}`,
        keywords: project.tags.join(", "),
        datePublished: project.timeframe,
        author: {
            "@type": "Person",
            name: siteConfig.author.name,
        },
    };
}

// BreadcrumbList schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: crumb.url,
        })),
    };
}

/**
 * Helper to inject structured data into page
 */
export function StructuredData({ data }: { data: Record<string, any> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
