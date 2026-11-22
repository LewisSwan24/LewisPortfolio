"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { localizeInternalHref } from "@/lib/locale-href";
import { trackInteraction } from "@/lib/web-vitals";

export type RoleDeckId = "ai-product-engineer" | "design-engineer" | "hardware-interaction";

const ROLE_OPTIONS: ReadonlyArray<{ id: RoleDeckId; en: string; zh: string }> = [
  { id: "ai-product-engineer", en: "AI Product Engineer", zh: "AI 产品工程师" },
  { id: "design-engineer", en: "Design Engineer", zh: "设计工程师" },
  { id: "hardware-interaction", en: "Hardware & Interaction", zh: "软硬件交互设计师" },
];

export function PrintDeckSelector({
  locale,
  activeRole,
  allSlugs,
  selectedSlugs,
}: {
  locale: "en" | "zh";
  activeRole: RoleDeckId;
  allSlugs: ReadonlyArray<{ slug: string; title: string }>;
  selectedSlugs: string[];
}) {
  const router = useRouter();
  const isZh = locale === "zh";
  const [picking, setPicking] = useState<string[]>(selectedSlugs);

  const navigateWith = (nextRole: RoleDeckId, nextSlugs: string[]) => {
    const target = localizeInternalHref(
      `/brief/print?role=${nextRole}&cases=${nextSlugs.join(",")}`,
      locale
    );
    router.push(target);
  };

  const toggleCase = (slug: string) => {
    const next = picking.includes(slug)
      ? picking.length > 1
        ? picking.filter((s) => s !== slug)
        : picking
      : [...picking, slug];
    setPicking(next);
    navigateWith(activeRole, next);
  };

  return (
    <aside className="container brief-print-controls no-print" aria-label={isZh ? "打印控制栏" : "Print dossier controls"}>
      <div className="v4-studio-plate" style={{ display: "grid", gap: "var(--s-3)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <span className="eyebrow">{isZh ? "A4 设计论证评注本" : "A4 Editorial Critique Dossier"}</span>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text-2)" }}>
              {isZh
                ? "每页 >= 60% 版面聚焦「人类冲突、否决方案与取舍依据」，附带直达活原型的 SVG 二维码。"
                : ">= 60% of every A4 page focuses on human tension, rejected paths & tradeoffs, paired with live QR jump codes."}
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                trackInteraction("brief-print");
                window.print();
              }}
            >
              {isZh ? "打印 / 保存为 A4 PDF" : "Print / Save as A4 PDF"}
            </button>
            <a className="btn btn-ghost" href={`/decks/${activeRole}.pdf`} download>
              {isZh ? `下载静态角色 Deck (${activeRole}.pdf)` : `Download ${activeRole}.pdf`}
            </a>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span className="eyebrow">{isZh ? "目标岗位预设：" : "Role deck preset:"}</span>
          {ROLE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`idx-filter${activeRole === opt.id ? " active" : ""}`}
              onClick={() => navigateWith(opt.id, picking)}
            >
              {opt[locale]}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          <span className="eyebrow">{isZh ? "包含案例：" : "Included cases:"}</span>
          {allSlugs.map((item) => {
            const on = picking.includes(item.slug);
            return (
              <button
                key={item.slug}
                type="button"
                className={`idx-filter${on ? " active" : ""}`}
                aria-pressed={on}
                onClick={() => toggleCase(item.slug)}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
