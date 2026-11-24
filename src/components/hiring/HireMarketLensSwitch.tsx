"use client";

import { useState } from "react";
import Link from "next/link";
import { localizeInternalHref } from "@/lib/locale-href";
import type { ProofLocale } from "@/lib/proof";
import type { MarketLensId, MarketLensProfile } from "@/lib/proof/market-lens";

export function HireMarketLensSwitch({
  profiles,
  locale,
}: {
  profiles: readonly MarketLensProfile[];
  locale: ProofLocale;
}) {
  const [activeId, setActiveId] = useState<MarketLensId>(
    locale === "zh" ? "apac-closed-loop" : "anz-critique"
  );
  const current = profiles.find((p) => p.id === activeId) ?? profiles[0];
  const isZh = locale === "zh";

  return (
    <section className="section container" aria-labelledby="hire-market-lens-heading">
      <div
        className="v4-studio-plate"
        style={{
          display: "grid",
          gap: "var(--s-3)",
          padding: "var(--s-4)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "var(--s-3)",
          }}
        >
          <div>
            <span className="eyebrow">{current.badge[locale]}</span>
            <h2
              id="hire-market-lens-heading"
              className="h-display"
              style={{ fontSize: "clamp(20px, 2.2vw, 26px)", marginTop: 6 }}
            >
              {isZh
                ? "按目标市场切换评估叙事口径"
                : "Switch Hiring Narrative by Target Market"}
            </h2>
          </div>

          <div
            role="group"
            aria-label={isZh ? "市场叙事视角切换" : "Market narrative mode switch"}
            style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
          >
            {profiles.map((profile) => {
              const selected = profile.id === current.id;
              return (
                <button
                  key={profile.id}
                  type="button"
                  data-testid={`hire-market-${profile.id}`}
                  aria-pressed={selected}
                  className={selected ? "btn btn-primary" : "btn btn-ghost"}
                  style={{ minHeight: 36 }}
                  onClick={() => setActiveId(profile.id)}
                >
                  {profile.shortLabel[locale]}
                </button>
              );
            })}
          </div>
        </div>

        <p className="prose" style={{ margin: 0, maxWidth: "70ch" }}>
          {current.thesis[locale]}
        </p>

        <ul
          style={{
            margin: 0,
            paddingLeft: "1.2rem",
            display: "grid",
            gap: 6,
            color: "var(--text-2)",
            fontSize: 14,
          }}
        >
          {current.cadencePoints.map((pt, i) => (
            <li key={i}>{pt[locale]}</li>
          ))}
        </ul>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 10,
            paddingTop: 6,
            borderTop: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--text-3)",
            }}
          >
            {isZh ? "推荐案例阅读顺序：" : "Recommended sequence:"}{" "}
            {current.recommendedOrder.join(" → ")}
          </span>
          <Link
            className="btn btn-primary"
            style={{ minHeight: 36 }}
            href={localizeInternalHref(current.composerHref, locale)}
          >
            {isZh
              ? "带着当前市场模板打开简历组装台 →"
              : "Open Resume Composer with this lens →"}
          </Link>
          {current.deepLinks.map((linkItem) => (
            <Link
              key={linkItem.href}
              className="btn btn-ghost"
              style={{ minHeight: 36 }}
              href={localizeInternalHref(linkItem.href, locale)}
            >
              {linkItem.label[locale]}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
