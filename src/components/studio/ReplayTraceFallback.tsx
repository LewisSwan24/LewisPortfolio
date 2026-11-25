import type { ReplayTrace } from "@/lib/replay/schema";
import { localizeInternalHref } from "@/lib/locale-href";

/**
 * Server-rendered first screen for /studio/replay. The frame stepper reads the URL's
 * search params, so it renders on the client; until it mounts (or when JavaScript
 * never runs) visitors get one readable card per track.
 */
export function ReplayTraceFallback({
  traces,
  locale,
}: {
  traces: readonly ReplayTrace[];
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  return (
    <ul className="replay-ssr-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--s-4)" }}>
      {traces.map((t) => (
        <li key={t.slug} style={{ border: "1px solid var(--border)", padding: "var(--s-4)", background: "var(--bg)" }}>
          <h2 style={{ fontSize: "clamp(18px, 2vw, 22px)", margin: "0 0 4px" }}>{t.title[locale]}</h2>
          <p className="prose" style={{ margin: 0 }}>{t.transportSummary[locale]}</p>
          <a href={localizeInternalHref(t.caseHref, locale)} style={{ display: "inline-block", marginTop: 8 }}>
            {isZh ? "看对应案例 →" : "Open the case →"}
          </a>
        </li>
      ))}
    </ul>
  );
}
