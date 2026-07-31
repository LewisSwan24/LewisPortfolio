"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { getFilterableBlogTags } from "@/lib/blog-topics";

export type PostItem = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
};

export function BlogIndex({ posts, tags }: { posts: PostItem[]; tags: string[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const isZh = locale === "zh";
  const [active, setActive] = useState<string>("all");
  const filterableTags = getFilterableBlogTags(posts, tags);
  const canFilter = filterableTags.length > 0;

  const shown = !canFilter || active === "all" ? posts : posts.filter((p) => p.tags.includes(active));
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
          {canFilter && (
            <span>
              {isZh ? "话题" : "Topics"} <b>{filterableTags.length}</b>
            </span>
          )}
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            {t("blog.rss")} →
          </a>
        </div>
      </section>

      {!empty && canFilter && (
        <section className="container">
          <div
            className="idx-filters"
            role="group"
            aria-label={isZh ? "筛选文章" : "Filter posts"}
          >
            <button
              className={`idx-filter ${active === "all" ? "active" : ""}`}
              onClick={() => setActive("all")}
              aria-pressed={active === "all"}
              type="button"
            >
              {isZh ? "全部" : "All"}
            </button>
            {filterableTags.map((tag) => (
              <button
                key={tag}
                className={`idx-filter ${active === tag ? "active" : ""}`}
                onClick={() => setActive(tag)}
                aria-pressed={active === tag}
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
                  <div className="eyebrow">{date}</div>
                  <h3 className="idx-flag-title">{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <div className="idx-flag-tags">
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
                    {isZh ? "读它" : "Read it"} →
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
