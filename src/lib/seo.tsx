import { siteConfig } from "./site";

/**
 * Generate JSON-LD structured data for SEO
 */

/**
 * Every URL below must be absolute. Reading process.env.NEXT_PUBLIC_SITE_URL
 * directly emitted literal "undefined/..." URLs in production whenever the
 * variable was unset, so all of these resolve through siteConfig instead.
 */
const base = siteConfig.url.replace(/\/$/, "");

/** 1200x630 OG card rendered by app/opengraph-image.tsx. */
const socialImage = `${base}/opengraph-image`;

// Person schema for the site owner
export function generatePersonSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.author.name,
        // Both names in the graph, so a search for either one resolves here.
        alternateName: siteConfig.author.nameZh,
        jobTitle: "Interaction Designer",
        description: siteConfig.description,
        url: base,
        image: socialImage,
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

// Extended Person schema for the /resume page — adds occupation, address, email, work samples
export function generateResumePersonSchema() {
    const url = base;
    return {
        ...generatePersonSchema(),
        email: `mailto:${siteConfig.author.email}`,
        address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.author.location,
        },
        hasOccupation: {
            "@type": "Occupation",
            name: "Interaction Designer",
            occupationLocation: {
                "@type": "City",
                name: siteConfig.author.location,
            },
            skills:
                "User research, Information architecture, Interaction design, Prototyping, Usability testing, Accessibility",
        },
        workExample: [
            { "@type": "CreativeWork", name: "UQ Connect", url: `${url}/projects/connect` },
            { "@type": "CreativeWork", name: "Spectra Lens", url: `${url}/projects/spectra` },
            { "@type": "CreativeWork", name: "MazeRunners", url: `${url}/projects/maze` },
            { "@type": "CreativeWork", name: "Hoop Dream", url: `${url}/projects/hoop` },
            { "@type": "CreativeWork", name: "PriceWise", url: `${url}/projects/pricewise` },
            { "@type": "CreativeWork", name: "Perception Gap Mapper", url: `${url}/projects/gapmapper` },
            { "@type": "CreativeWork", name: "Requirements into Rules", url: `${url}/projects/rules` },
        ],
    };
}

export function generateOrganizationSchema() {
    const url = base;
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        url,
        logo: `${url}/favicon.svg`,
        sameAs: [
            siteConfig.social.linkedin,
            siteConfig.social.github,
            siteConfig.social.dribbble,
        ].filter(Boolean),
        founder: {
            "@type": "Person",
            name: siteConfig.author.name,
        },
    };
}

export function generateWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        description: siteConfig.description,
        url: base,
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
        url: `${base}/projects/${project.slug}`,
        image: `${base}${project.cover}`,
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

// Article schema for blog posts
export function generateArticleSchema(article: {
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    author: string;
    tags: string[];
    image?: string;
    articleBody?: string;
}) {
    const url = `${base}/blog/${article.slug}`;
    const image = article.image || `${base}/blog/${article.slug}/opengraph-image`;
    const body = article.articleBody
        ? article.articleBody.replace(/\s+/g, " ").trim().slice(0, 5000)
        : undefined;
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        url,
        image,
        ...(body ? { articleBody: body } : {}),
        datePublished: article.date,
        dateModified: article.date,
        author: {
            "@type": "Person",
            name: article.author,
        },
        publisher: {
            "@type": "Person",
            name: siteConfig.author.name,
        },
        keywords: article.tags.join(", "),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
    };
}

/**
 * JSON-LD structured data types
 */
type JsonLdSchema =
    | ReturnType<typeof generatePersonSchema>
    | ReturnType<typeof generateResumePersonSchema>
    | ReturnType<typeof generateOrganizationSchema>
    | ReturnType<typeof generateWebSiteSchema>
    | ReturnType<typeof generateProjectSchema>
    | ReturnType<typeof generateBreadcrumbSchema>
    | ReturnType<typeof generateArticleSchema>;

/**
 * Helper to inject structured data into page
 */
export function StructuredData({ data }: { data: JsonLdSchema }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
            suppressHydrationWarning
        />
    );
}
