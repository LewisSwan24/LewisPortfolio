import type { InteractionPattern } from "@/lib/patterns/schema";
import { localizeInternalHref } from "@/lib/locale-href";

/**
 * Server-rendered first screen for /patterns. The interactive workbench reads the
 * URL's search params, so it renders on the client; until it mounts (or when
 * JavaScript never runs, as for most crawlers) visitors get this readable list.
 */
export function PatternAtlasFallback({
  patterns,
  locale,
}: {
  patterns: readonly InteractionPattern[];
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  return (
    <ol className="pattern-ssr-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--s-4)" }}>
      {patterns.map((p, i) => (
        <li key={p.slug} style={{ border: "1px solid var(--border)", padding: "var(--s-4)", background: "var(--bg)" }}>
          <div className="eyebrow">{String(i + 1).padStart(2, "0")}</div>
          <h2 style={{ fontSize: "clamp(18px, 2vw, 22px)", margin: "6px 0 4px" }}>{p.title[locale]}</h2>
          <p className="prose" style={{ margin: 0 }}>{p.tagline[locale]}</p>
          <a href={localizeInternalHref(`/projects/${p.sourceCaseSlug}`, locale)} style={{ display: "inline-block", marginTop: 8 }}>
            {isZh ? "看来源案例 →" : "Source case →"}
          </a>
        </li>
      ))}
    </ol>
  );
}
