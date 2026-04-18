import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { getMdxComponents } from "@/components/mdx-components";
import { getLocale, getTranslations } from "next-intl/server";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  StructuredData,
} from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.metadata.title,
    description: post.metadata.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const t = await getTranslations();
  const locale = await getLocale();
  const isZh = locale === "zh";

  const all = await getAllBlogPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const dateFmt = new Date(post.metadata.date).toLocaleDateString(
    isZh ? "zh-CN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      <StructuredData
        data={generateArticleSchema({
          title: post.metadata.title,
          excerpt: post.metadata.excerpt,
          slug,
          date: post.metadata.date,
          author: post.metadata.author,
          tags: post.metadata.tags,
        })}
      />
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: t("blog.breadcrumbHome"), url: siteUrl },
          { name: t("blog.breadcrumbBlog"), url: `${siteUrl}/blog` },
          { name: post.metadata.title, url: `${siteUrl}/blog/${slug}` },
        ])}
      />
      <main className="page" data-screen-label={`06 Post · ${slug}`}>
        <section className="container cs-hero">
          <Link className="cs-back" href="/blog">
            ← {t("nav.blog")}
          </Link>
          {post.metadata.tags[0] && (
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              {post.metadata.tags[0]}
            </div>
          )}
          <h1>{post.metadata.title}</h1>
          <p className="sub">{post.metadata.excerpt}</p>
          <dl className="cs-meta">
            <div>
              <dt>{isZh ? "日期" : "Date"}</dt>
              <dd>{dateFmt}</dd>
            </div>
            <div>
              <dt>{isZh ? "阅读时长" : "Reading time"}</dt>
              <dd>{post.metadata.readingTime}</dd>
            </div>
            <div>
              <dt>{isZh ? "作者" : "Author"}</dt>
              <dd>{post.metadata.author}</dd>
            </div>
            <div>
              <dt>{isZh ? "话题" : "Topics"}</dt>
              <dd>
                {post.metadata.tags.length > 0
                  ? post.metadata.tags.slice(0, 2).join(" · ")
                  : "—"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="container">
          <article className="blog-article">
            <MDXRemote source={post.content} components={getMdxComponents()} />
          </article>

          {(prev || next) && (
            <nav
              className="blog-pager"
              aria-label={isZh ? "文章导航" : "Post navigation"}
            >
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="blog-pager-item">
                  <span className="eyebrow">← {t("blog.prev")}</span>
                  <span className="blog-pager-title">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="blog-pager-item blog-pager-next"
                >
                  <span className="eyebrow">
                    {t("blog.next")} →
                  </span>
                  <span className="blog-pager-title">{next.title}</span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}

          <div
            className="cs-section"
            style={{ borderTop: "1px solid var(--border)", paddingTop: 48 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <Link href="/blog" className="btn btn-ghost">
                ← {t("nav.blog")}
              </Link>
              <Link href="/contact" className="btn btn-primary">
                {isZh ? "给我写信" : "Say hi"} →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
