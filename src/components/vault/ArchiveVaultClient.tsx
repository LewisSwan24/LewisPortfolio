"use client";

import { useMemo, useState } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import type { VaultArchiveCategory, VaultAutopsyRecord } from "@/data/vault/autopsies";
import { VerifiedStatusBadge } from "@/components/case/deep/VerifiedStatusBadge";
import styles from "./vault.module.css";

type CategoryFilter = "all" | VaultArchiveCategory;

const CATEGORY_OPTIONS: ReadonlyArray<{
  id: CategoryFilter;
  label: { en: string; zh: string };
}> = [
  { id: "all", label: { en: "All archives", zh: "全部档案" } },
  { id: "abandoned", label: { en: "Abandoned", zh: "主动中止" } },
  { id: "superseded", label: { en: "Superseded", zh: "被主案取代" } },
  { id: "scoped-out", label: { en: "Scoped Out", zh: "退出主展位" } },
  { id: "coursework-archive", label: { en: "Coursework", zh: "课程研究归档" } },
];

const FLAGSHIP_NODES: ReadonlyArray<{
  slug: string;
  label: { en: string; zh: string };
}> = [
  { slug: "walkie", label: { en: "Walkie", zh: "Walkie" } },
  { slug: "lamplight", label: { en: "Lamplight Nook", zh: "Lamplight Nook" } },
  { slug: "autofill", label: { en: "Resume Autofill", zh: "Resume Autofill" } },
  { slug: "maze", label: { en: "MazeRunners", zh: "MazeRunners" } },
  { slug: "onthebeat", label: { en: "On The Beat", zh: "On The Beat" } },
  { slug: "grassland", label: { en: "Grassland Iron Tide", zh: "《草原铁潮》" } },
];

export function ArchiveVaultClient({
  autopsies,
  locale,
}: {
  autopsies: readonly VaultAutopsyRecord[];
  locale: "en" | "zh";
}) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [successorSlug, setSuccessorSlug] = useState<string>("all");
  const isZh = locale === "zh";
  // Only offer a status that at least one archived case still has.
  const categoryOptions = CATEGORY_OPTIONS.filter(
    (opt) => opt.id === "all" || autopsies.some((a) => a.archiveCategory === opt.id)
  );

  const filtered = useMemo(() => {
    return autopsies.filter((item) => {
      if (category !== "all" && item.archiveCategory !== category) return false;
      if (
        successorSlug !== "all" &&
        !item.lineageSuccessors.some((s) => s.slug === successorSlug)
      ) {
        return false;
      }
      return true;
    });
  }, [autopsies, category, successorSlug]);

  const lineageMap = useMemo(() => {
    return FLAGSHIP_NODES.map((flagship) => {
      const ancestors = autopsies.filter((a) =>
        a.lineageSuccessors.some((s) => s.slug === flagship.slug)
      );
      return {
        ...flagship,
        ancestors,
      };
    });
  }, [autopsies]);

  return (
    <div className={styles.vaultShell}>
      {/* Interactive Lineage Genealogy Map */}
      <section
        className={styles.lineagePanel}
        aria-label={isZh ? "归档作品与主案的关联" : "Related cases map"}
        data-testid="vault-lineage-map"
      >
        <div className={styles.lineageHeader}>
          <div>
            <span className="eyebrow">
              {isZh
                ? `相关案例 · ${autopsies.length} 项归档作品 · ${FLAGSHIP_NODES.length} 个公开主案`
                : `Related cases · ${autopsies.length} archived · ${FLAGSHIP_NODES.length} listed`}
            </span>
            <h2 className="h-display h3" style={{ marginTop: 6, marginBottom: 0 }}>
              {isZh
                ? "每个公开主案和哪些归档作品相关"
                : "Which archived projects relate to each listed case"}
            </h2>
          </div>
          {successorSlug !== "all" && (
            <button
              type="button"
              className={styles.filterBtn}
              onClick={() => setSuccessorSlug("all")}
            >
              {isZh ? "显示全部" : "Show all"}
            </button>
          )}
        </div>

        <div className={styles.lineageGrid}>
          {lineageMap.map((node) => (
            <article key={node.slug} className={styles.lineageNode}>
              <div className={styles.lineageNodeTitle}>
                <Link href={`/projects/${node.slug}`} className={styles.successorLink}>
                  {node.label[locale]} →
                </Link>
                <button
                  type="button"
                  className={styles.filterBtn}
                  aria-pressed={successorSlug === node.slug}
                  data-testid={`lineage-filter-${node.slug}`}
                  onClick={() =>
                    setSuccessorSlug((prev) => (prev === node.slug ? "all" : node.slug))
                  }
                >
                  {isZh ? `${node.ancestors.length} 项相关` : `${node.ancestors.length} related`}
                </button>
              </div>
              <div className={styles.lineageAncestors}>
                {node.ancestors.map((anc) => (
                  <span key={anc.slug} className={styles.ancestorChip}>
                    ← {anc.title[locale]}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Filter Bar */}
      <div className={styles.filterStrip} role="region" aria-label={isZh ? "档案馆筛选" : "Archive filters"}>
        <div className={styles.filterGroup} role="group" aria-label={isZh ? "按归档类别筛选" : "Filter by archive status"}>
          <span className={styles.filterLabel}>{isZh ? "归档类型" : "Status"}</span>
          {categoryOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={styles.filterBtn}
              aria-pressed={category === opt.id}
              data-testid={`vault-cat-${opt.id}`}
              onClick={() => setCategory(opt.id)}
            >
              {opt.id === "all"
                ? `${opt.label[locale]} (${autopsies.length})`
                : opt.label[locale]}
            </button>
          ))}
        </div>
        <div className="eyebrow" role="status" data-testid="vault-count-status">
          {isZh
            ? `当前展示 ${filtered.length} / ${autopsies.length} 项未公开归档解剖`
            : `Showing ${filtered.length} of ${autopsies.length} archived autopsies`}
        </div>
      </div>

      {/* Autopsy Cards */}
      <div className={styles.autopsyGrid} data-testid="vault-autopsy-grid">
        {filtered.map((item) => (
          <article
            key={item.slug}
            className={styles.autopsyCard}
            data-testid={`vault-card-${item.slug}`}
          >
            <header className={styles.cardHead}>
              <div>
                <span className={styles.cardMeta}>
                  {locale === "zh" && item.yearZh ? item.yearZh : item.year} · {item.statusLabel[locale]}
                </span>
                <h3 className={styles.cardTitle}>{item.title[locale]}</h3>
              </div>
              <VerifiedStatusBadge status={item.verifiedStatus} locale={locale} />
            </header>

            <dl className={styles.dlBlock}>
              <div className={styles.dlItem}>
                <dt>{isZh ? "当年做了什么" : "What was built"}</dt>
                <dd>{item.whatItBuilt[locale]}</dd>
              </div>
              <div className={styles.dlItem}>
                <dt>{isZh ? "为何中止或退出主展" : "Why it was retired / scoped out"}</dt>
                <dd>{item.autopsyReason[locale]}</dd>
              </div>
              <div className={styles.dlItem}>
                <dt>{isZh ? "暴露出的结构性缺陷" : "Structural flaw exposed"}</dt>
                <dd>{item.structuralFlawExposed[locale]}</dd>
              </div>
              <div className={styles.dlItem}>
                <dt>{isZh ? "提炼出的设计不变量" : "Reusable design invariant"}</dt>
                <dd>{item.lineageLesson[locale]}</dd>
              </div>
            </dl>

            <div className={styles.successorBox}>
              <span className="eyebrow">
                {isZh ? "相关的公开主案" : "Related listed case(s)"}
              </span>
              {item.lineageSuccessors.map((succ) => (
                <div key={succ.slug} style={{ fontSize: 13.5, lineHeight: 1.55 }}>
                  <Link href={`/projects/${succ.slug}`} className={styles.successorLink}>
                    {succ.title[locale]} ↗
                  </Link>
                  <p style={{ margin: "2px 0 0", color: "var(--text-2)" }}>
                    {succ.transferMechanism[locale]}
                  </p>
                </div>
              ))}
            </div>

            <footer className={styles.cardFooter}>
              <span className={styles.cardMeta}>
                {isZh ? "Unlisted 归档路由（不入导航与简历）" : "Unlisted archive (excluded from nav & CV)"}
              </span>
              <Link href={item.directArchivePath} className="btn btn-ghost">
                {isZh ? "查看原始归档页 →" : "Inspect raw archive →"}
              </Link>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
