import { cn } from "@/lib/cn";
import GithubSlugger from "github-slugger";
import { isValidElement } from "react";
import Image from "next/image";
import { DynamicImageGallery } from "./DynamicImports";
import { CodeBlock } from "./CodeBlock";
import { AnchorNote } from "./ui/AnchorNote";
import { getBlurDataURL } from "@/lib/image-utils";
import { localizeInternalHref } from "@/lib/locale-href";

type MDXComponents = Record<string, React.ComponentType<any>>;

function getTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join("");
  }

  if (isValidElement<{ children?: React.ReactNode }>(children)) {
    return getTextFromChildren(children.props.children);
  }

  return "";
}

function createHeading(level: 2 | 3, slugger: GithubSlugger, locale: string) {
  const HeadingComponent = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = getTextFromChildren(children);
    const id = slugger.slug(text || "section");
    const Tag = `h${level}` as const;

    return (
      <Tag id={id} className="group scroll-mt-20" {...props}>
        {children}
        <a
          href={`#${id}`}
          className={cn(
            "ml-2 inline-block min-w-6 rounded px-1 text-center text-muted-foreground opacity-0 transition-opacity motion-reduce:transition-none",
            "group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100",
            "focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-background"
          )}
          aria-label={
            locale === "zh" ? `本节链接：${text || "本节"}` : `Link to ${text || "section"}`
          }
        >
          #
        </a>
      </Tag>
    );
  };

  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

export function getMdxComponents(locale = "en"): MDXComponents {
  const slugger = new GithubSlugger();

  return {
    h2: createHeading(2, slugger, locale),
    h3: createHeading(3, slugger, locale),
    a: ({ href, children, ...props }) => {
      const resolvedHref = href ? localizeInternalHref(href, locale) : href;
      const isExternal = resolvedHref?.startsWith("http");
      return (
        <a
          href={resolvedHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={cn(
            "text-accent underline underline-offset-4 transition-colors motion-reduce:transition-none",
            "hover:text-accent/80",
            "focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-background rounded"
          )}
          {...props}
        >
          {children}
        </a>
      );
    },
    // Use CodeBlock component for code blocks with copy functionality
    pre: ({ children, ...props }) => (
      <CodeBlock {...props}>{children}</CodeBlock>
    ),
    code: ({ children, ...props }) => (
      <code
        className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    ),
    Callout: ({
      type = "info",
      children,
    }: {
      type?: "info" | "warning" | "tip";
      children: React.ReactNode;
    }) => {
      const styles = {
        info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
        warning:
          "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
        tip: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
      };

      return (
        <div className={cn("my-6 rounded-lg border p-4", styles[type])}>
          {children}
        </div>
      );
    },
    // Optimized image component for MDX content
    img: ({ src, alt, ...props }) => {
      if (!src) return null;
      
      // Check if it's an external image
      const isExternal = src.startsWith("http");
      
      return (
        <span className="block my-8 overflow-hidden rounded-xl">
          <Image
            src={src}
            alt={alt || ""}
            width={1200}
            height={630}
            className="w-full h-auto"
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
            loading="lazy"
            unoptimized={isExternal}
            {...props}
          />
        </span>
      );
    },
    ImageGallery: DynamicImageGallery,
    AnchorNote,
  };
}
