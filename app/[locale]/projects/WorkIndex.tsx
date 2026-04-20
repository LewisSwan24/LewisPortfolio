"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type ProjKey = "connect" | "spectra" | "ai" | "circles";
type FilterId = "all" | "flag" | "research" | "acc" | "ai" | "social";

interface Item {
  n: string;
  k: ProjKey;
  tags: string[];
  role: string;
  year: string;
  dur: string;
}

const FILTERS: Array<{ id: FilterId; en: string; zh: string }> = [
  { id: "all", en: "All", zh: "全部" },
  { id: "flag", en: "Flagship", zh: "旗舰" },
  { id: "research", en: "Research-led", zh: "研究驱动" },
  { id: "acc", en: "Accessibility", zh: "无障碍" },
  { id: "ai", en: "AI / ML", zh: "AI" },
  { id: "social", en: "Social", zh: "社交" },
];

const ITEMS: Item[] = [
  { n: "01", k: "connect", tags: ["flag", "research"], role: "Solo", year: "2024", dur: "4 mo" },
  { n: "02", k: "spectra", tags: ["flag", "acc", "research"], role: "Lead", year: "2024", dur: "4 mo" },
  { n: "03", k: "ai", tags: ["ai", "research"], role: "Designer", year: "2024", dur: "5 mo" },
  { n: "04", k: "circles", tags: ["social", "research"], role: "Solo", year: "2024–", dur: "ongoing" },
];

export function WorkIndex() {
  const t = useTranslations();
  const locale = useLocale();
  const isZh = locale === "zh";
  const [filter, setFilter] = useState<FilterId>("all");

  const shown = filter === "all" ? ITEMS : ITEMS.filter((i) => i.tags.includes(filter));

  return (
    <main className="page" data-screen-label="02 Work">
      <section className="container idx-hero">
        <div className="label">{t("nav.work")}</div>
        <h1 className="h-display h1" style={{ marginTop: 16 }}>
          {isZh ? (
            <>
              四个项目。<em>全部已上线或在上线路上。</em>
            </>
          ) : (
            <>
              Four projects. <em>Every one shipped or shipping.</em>
            </>
          )}
        </h1>
        <div className="idx-meta">
          <span>
            {isZh ? "最近上线" : "Last shipped"} <b>Jun 2024</b>
          </span>
          <span>
            {isZh ? "进行中" : "In progress"} <b>1</b>
          </span>
          <span>
            {isZh ? "量化成果" : "Measured outcomes"} <b>3 / 4</b>
          </span>
        </div>
      </section>

      <section className="container">
        <div
          className="idx-filters"
          role="tablist"
          aria-label={isZh ? "筛选项目" : "Filter projects"}
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`idx-filter ${filter === f.id ? "active" : ""}`}
              onClick={() => setFilter(f.id)}
              role="tab"
              aria-selected={filter === f.id}
              type="button"
            >
              {isZh ? f.zh : f.en}
            </button>
          ))}
        </div>
      </section>

      <section className="container">
        {shown.map((i) => (
          <Link className="idx-flag" href={`/projects/${i.k}`} key={i.k}>
            <div className="idx-flag-n">
              {i.n}
              {i.tags.includes("flag") && (
                <div style={{ marginTop: 10, color: "var(--accent)" }}>
                  ★ {isZh ? "旗舰" : "Flagship"}
                </div>
              )}
            </div>
            <div className="idx-flag-body">
              <div className="eyebrow">{t(`proj.${i.k}.kicker`)}</div>
              <h3 className="idx-flag-title">{t(`proj.${i.k}.title`)}</h3>
              <p>{t(`proj.${i.k}.sub`)}</p>
              <div className="idx-flag-tags">
                <span className="tag tag-accent">{t(`proj.${i.k}.m1`)}</span>
                <span className="tag">{t(`proj.${i.k}.m2`)}</span>
                <span className="tag">{t(`proj.${i.k}.m3`)}</span>
              </div>
            </div>
            <div className="idx-flag-side">
              <div>
                {t("cs.role")} · <b>{t(`proj.${i.k}.role`)}</b>
              </div>
              <div>
                {t("cs.time")} · <b>{t(`proj.${i.k}.date`)}</b>
              </div>
              <div style={{ marginTop: 8, color: "var(--accent)" }}>
                {t("feat.footer")} →
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
