"use client";

import { useState, type ReactNode } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import type { WorkTag } from "@/lib/cases/schema";

export type WorkFilterId = "all" | WorkTag;

export interface WorkIndexClientRow {
  slug: string;
  tags: WorkTag[];
  title: string;
  kicker: string;
  role: string;
  year: string;
  dur: string;
  problem: string;
  changed: string;
}

const FILTERS: Array<{ id: WorkFilterId; en: string; zh: string }> = [
  { id: "all", en: "All", zh: "全部" },
  { id: "flag", en: "Flagship", zh: "旗舰" },
  { id: "research", en: "Research-led", zh: "研究驱动" },
  { id: "ai", en: "AI / ML", zh: "AI" },
  { id: "hardware", en: "Hardware", zh: "硬件" },
];

export function WorkIndex({
  items,
  thumbs,
  locale,
}: {
  items: WorkIndexClientRow[];
  thumbs: Record<string, ReactNode>;
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  const [filter, setFilter] = useState<WorkFilterId>("all");

  const shown = filter === "all" ? items : items.filter((item) => item.tags.includes(filter));

  return (
    <>
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

      <section className="container work-index-board" aria-labelledby="work-index-title">
        <h2 id="work-index-title" className="sr-only">
          {isZh ? "项目清单" : "Project list"}
        </h2>
        <div className="work-index-head" aria-hidden="true">
          <span>{isZh ? "项目" : "Project"}</span>
          <span>{isZh ? "角色" : "Role"}</span>
          <span>{isZh ? "问题" : "Problem"}</span>
          <span>{isZh ? "改变了什么" : "What changed"}</span>
          <span />
        </div>
        <div className="work-index-list">
          {shown.map((item) => (
            <Link className="work-index-row" href={`/projects/${item.slug}`} key={item.slug}>
              <div className="work-index-project">
                <div className="work-index-thumb" aria-hidden="true">
                  {thumbs[item.slug]}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.kicker}</p>
                </div>
              </div>
              <div className="work-index-role">
                <strong>{item.role}</strong>
                <span>{item.year} · {item.dur}</span>
              </div>
              <p className="work-index-copy">{item.problem}</p>
              <p className="work-index-copy">{item.changed}</p>
              <span className="work-index-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
