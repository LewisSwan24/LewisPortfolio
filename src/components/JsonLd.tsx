import { siteConfig } from "@/lib/site";

interface PersonJsonLdProps {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image?: string;
  sameAs?: string[];
}

export function PersonJsonLd({
  name,
  jobTitle,
  description,
  url,
  image,
  sameAs = [],
}: PersonJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    url,
    image,
    sameAs: sameAs.filter(Boolean),
    knowsAbout: siteConfig.skills,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "The University of Queensland",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brisbane",
      addressCountry: "Australia",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface WebsiteJsonLdProps {
  name: string;
  description: string;
  url: string;
}

export function WebsiteJsonLd({ name, description, url }: WebsiteJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/projects?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  tags?: string[];
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
  tags = [],
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    image,
    keywords: tags.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ProjectJsonLdProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  dateCreated: string;
  creator: string;
  tools?: string[];
}

export function ProjectJsonLd({
  name,
  description,
  url,
  image,
  dateCreated,
  creator,
  tools = [],
}: ProjectJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url,
    image,
    dateCreated,
    creator: {
      "@type": "Person",
      name: creator,
    },
    keywords: tools.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
