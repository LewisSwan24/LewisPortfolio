"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const svgMarkupCache = new Map<string, string>();

function sanitizeStaticSvg(raw: string, alt: string, decorative: boolean): string | null {
  const start = raw.indexOf("<svg");
  if (start === -1) return null;
  let cleaned = raw
    .slice(start)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // Ensure scalable responsive layout while keeping viewBox aspect ratio intact.
  cleaned = cleaned.replace(/<svg\b([^>]*)>/i, (_full, attrs: string) => {
    const cleanAttrs = attrs
      .replace(/\sclass\s*=\s*(?:"[^"]*"|'[^']*')/gi, "")
      .replace(/\srole\s*=\s*(?:"[^"]*"|'[^']*')/gi, "")
      .replace(/\saria-label\s*=\s*(?:"[^"]*"|'[^']*')/gi, "")
      .replace(/\saria-hidden\s*=\s*(?:"[^"]*"|'[^']*')/gi, "")
      .replace(/\swidth\s*=\s*(?:"[^"]*"|'[^']*')/gi, "")
      .replace(/\sheight\s*=\s*(?:"[^"]*"|'[^']*')/gi, "");
    const safeAlt = alt.replace(/"/g, "&quot;");
    const a11yAttrs = decorative
      ? `aria-hidden="true"`
      : `role="img" aria-label="${safeAlt}"`;
    return `<svg${cleanAttrs} class="case-adaptive-svg" width="100%" height="100%" ${a11yAttrs}>`;
  });

  return cleaned;
}

export function AdaptiveCaseMedia({
  src,
  width,
  height,
  alt,
  sizes,
  className = "",
  decorative = false,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
  className?: string;
  decorative?: boolean;
}) {
  const isLocalSvg = src.startsWith("/") && src.endsWith(".svg");
  const [svgMarkup, setSvgMarkup] = useState<string | null>(() => {
    if (!isLocalSvg) return null;
    const cached = svgMarkupCache.get(src);
    return cached ? sanitizeStaticSvg(cached, alt, decorative) : null;
  });

  useEffect(() => {
    if (!isLocalSvg) return;
    const cached = svgMarkupCache.get(src);
    if (cached) {
      setSvgMarkup(sanitizeStaticSvg(cached, alt, decorative));
      return;
    }

    let cancelled = false;
    void fetch(src)
      .then((res) => (res.ok ? res.text() : ""))
      .then((raw) => {
        if (cancelled || !raw) return;
        svgMarkupCache.set(src, raw);
        const sanitized = sanitizeStaticSvg(raw, alt, decorative);
        if (sanitized) setSvgMarkup(sanitized);
      })
      .catch(() => {
        // Fallback smoothly keeps Next <Image>
      });

    return () => {
      cancelled = true;
    };
  }, [src, alt, isLocalSvg, decorative]);

  if (!isLocalSvg) {
    return (
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        sizes={sizes}
        className={className}
      />
    );
  }

  return (
    <span
      className={`case-adaptive-svg-host ${className}`.trim()}
      data-svg-theme-adaptive="true"
      style={{
        display: "block",
        width: "100%",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      {svgMarkup ? (
        <span
          style={{ display: "block", width: "100%", height: "100%" }}
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      ) : (
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          sizes={sizes}
          className={className}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      )}
    </span>
  );
}
