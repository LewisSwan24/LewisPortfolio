"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import {
  BLOG_CLUSTERS,
  BLOG_CLUSTER_LABELS,
  type BlogCluster,
} from "@/lib/blog-clusters";

export type PostItem = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cluster: BlogCluster;
  readingTime: string;
};

export function BlogIndex({ posts, tags }: { posts: PostItem[]; tags: string[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const isZh = locale === "zh";
  const proofLocale: "en" | "zh" = isZh ? "zh" : "en";
  const [activeCluster, setActiveCluster] = useState<"all" | BlogCluster>("all");
  const [active, setActive] = useState<string>("all");
  // v6.9 (review R06/R03): the 60 topic chips pushed the first post below the
  // fold and reflowed when the web font loaded (CLS 0.17). They fold behind one
  // button; the five cluster chips stay.
  const [topicsOpen, setTopicsOpen] = useState(false);

  const shown = posts.filter((p) => {
    if (activeCluster !== "all" && p.cluster !== activeCluster) return false;
    if (active !== "all" && !p.tags.includes(active)) return false;
    return true;
  });
  const empty = posts.length === 0;

  return (
    <main className="page" data-screen-label="05 Writing">
      <section className="container idx-hero">
        <div className="label">{t("nav.blog")}</div>
        <h1 className="h-display h1" style={{ marginTop: 16 }}>
          {isZh ? (
            <>
              笔记与小实验。<em>用文字给做过的东西复盘。</em>
            </>
          ) : (
            <>
              Notes & small experiments. <em>Writing as after-action review.</em>
            </>
          )}
        </h1>
        <div className="idx-meta">
          <span>
            {isZh ? "文章" : "Posts"} <b>{posts.length}</b>
          </span>
          <span>
            {isZh ? "话题" : "Topics"} <b>{tags.length}</b>
          </span>
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            {t("blog.rss")} →
          </a>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
          <Link href="/patterns" className="btn btn-ghost">
            {isZh ? "交互模式图谱 →" : "Pattern Atlas →"}
          </Link>
          <Link href="/studio/replay" className="btn btn-ghost">
            {isZh ? "协议帧重放台 →" : "Replay Studio →"}
          </Link>
          <Link href="/vault" className="btn btn-ghost">
            {isZh ? "演进档案馆 →" : "Archive Vault →"}
          </Link>
        </div>
      </section>

      {!empty && (
        <section className="container" style={{ display: "grid", gap: 12 }}>
          <div
            className="idx-filters v3-pill-row"
            role="group"
            aria-label={isZh ? "专论主题集群" : "Monograph clusters"}
          >
            <button
              className={`idx-filter ${activeCluster === "all" ? "active" : ""}`}
              onClick={() => {
                setActiveCluster("all");
                setActive("all");
              }}
              aria-pressed={activeCluster === "all"}
              data-testid="blog-cluster-all"
              type="button"
            >
              {isZh ? `全部 ${posts.length} 篇` : `All ${posts.length}`}
            </button>
            {BLOG_CLUSTERS.map((cluster) => {
              const count = posts.filter((p) => p.cluster === cluster).length;
              return (
                <button
                  key={cluster}
                  className={`idx-filter ${activeCluster === cluster ? "active" : ""}`}
                  onClick={() => {
                    setActiveCluster(cluster);
                    setActive("all");
                  }}
                  aria-pressed={activeCluster === cluster}
                  data-testid={`blog-cluster-${cluster}`}
                  type="button"
                >
                  {BLOG_CLUSTER_LABELS[cluster][proofLocale]} ({count})
                </button>
              );
            })}
          </div>

          <div>
            <button
              type="button"
              className={`idx-filter ${topicsOpen ? "active" : ""}`}
              aria-expanded={topicsOpen}
              aria-controls="blog-topic-filters"
              onClick={() => setTopicsOpen((v) => !v)}
            >
              {isZh ? `全部主题 (${tags.length})` : `All topics (${tags.length})`}
            </button>
          </div>

          <div
            id="blog-topic-filters"
            className="idx-filters v3-pill-row"
            role="tablist"
            aria-label={isZh ? "筛选文章" : "Filter posts"}
            hidden={!topicsOpen}
          >
            <button
              className={`idx-filter ${active === "all" ? "active" : ""}`}
              onClick={() => setActive("all")}
              role="tab"
              aria-selected={active === "all"}
              type="button"
            >
              {isZh ? "全部" : "All"}
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                className={`idx-filter ${active === tag ? "active" : ""}`}
                onClick={() => setActive(tag)}
                role="tab"
                aria-selected={active === tag}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="container">
        {empty ? (
          <div style={{ padding: "64px 0", textAlign: "center" }}>
            <h2 className="h-display" style={{ fontSize: 28 }}>
              {t("blog.emptyTitle")}
            </h2>
            <p className="prose" style={{ margin: "16px auto 0", maxWidth: "36em" }}>
              {t("blog.emptyDescription")}
            </p>
          </div>
        ) : shown.length === 0 ? (
          <div style={{ padding: "48px 0", textAlign: "center", color: "var(--text-3)" }}>
            {isZh ? "没有匹配的文章。" : "No posts match this topic."}
          </div>
        ) : (
          shown.map((p, idx) => {
            const n = String(idx + 1).padStart(2, "0");
            const date = new Date(p.date).toLocaleDateString(
              isZh ? "zh-CN" : "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            );
            return (
              <Link className="idx-flag" href={`/blog/${p.slug}`} key={p.slug}>
                <div className="idx-flag-n">{n}</div>
                <div className="idx-flag-body">
                  <div className="eyebrow">
                    {BLOG_CLUSTER_LABELS[p.cluster][proofLocale]} · {date}
                  </div>
                  <h3 className="idx-flag-title">{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <div className="idx-flag-tags v3-pill-row">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="idx-flag-side">
                  <div>{p.readingTime}</div>
                  <div style={{ marginTop: 8, color: "var(--accent)" }}>
                    {isZh ? "读一读" : "Read it"} →
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </section>
    </main>
  );
}
