import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { EvidenceMatrix } from "@/components/hiring/EvidenceMatrix";
import { DecisionComparator } from "@/components/case/DecisionComparator";
import { VizMaze } from "@/components/viz/ProjectViz";
import { ProjectCoverImage } from "@/components/viz/ProjectCoverImage";
import { getProjectCover } from "@/lib/project-covers";
import { getWorkIndexItems } from "@/lib/cases/registry";
import { getDecisionComparatorRows } from "@/lib/cases/comparator";
import {
  getEvidenceMatrix,
  type ProofLocale,
} from "@/lib/portfolio-proof";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import patternStyles from "@/components/patterns/patterns.module.css";
import { WorkIndex, type WorkIndexClientRow } from "./WorkIndex";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "zh";
  const title = t("nav.work");
  const description =
    locale === "zh"
      ? "六个精挑细选的公开案例，呈现以人为本的设计论证、实体交互原型与诚实边界。"
      : "Six curated case studies grounding human-centered tradeoffs in working software and hardware prototypes.";
  return {
    title,
    description,
    alternates: buildAlternates("/projects", locale),
    openGraph: buildOpenGraph({ title, description, path: "/projects", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

function renderThumbVisual(
  slug: string,
  locale: ProofLocale,
  conceptLabel: string,
  priority = false
) {
  const cover = getProjectCover(slug as Parameters<typeof getProjectCover>[0]);
  if (cover) {
    return (
      <ProjectCoverImage
        cover={cover}
        locale={locale}
        sizes="240px"
        priority={priority}
      />
    );
  }
  return (
    <div style={{ display: "contents" }}>
      {/* hoop, pricewise and connect are unlisted, so only maze can reach here. */}
      {slug === "maze" ? <VizMaze locale={locale} /> : null}
      <span className="work-index-thumb-label">{conceptLabel}</span>
    </div>
  );
}

export default async function ProjectsPage() {
  const t = await getTranslations();
  const rawLocale = await getLocale();
  const locale = (rawLocale === "zh" ? "zh" : "en") as "en" | "zh";
  const isZh = locale === "zh";

  const conceptVisual = isZh ? "概念视觉" : "Concept visual";

  const workItems = getWorkIndexItems(locale);
  const clientRows: WorkIndexClientRow[] = workItems.map((item) => ({
    slug: item.slug,
    tags: item.tags,
    title: item.title,
    kicker: item.kicker,
    role: item.role,
    year: item.year,
    dur: item.dur,
    problem: item.problem,
    changed: item.changed,
  }));
  const thumbs = Object.fromEntries(
    workItems.map((item, idx) => [
      item.slug,
      renderThumbVisual(item.slug, locale, conceptVisual, idx < 3),
    ])
  );

  const evidenceMatrix = getEvidenceMatrix(locale);
  const comparatorRows = getDecisionComparatorRows(locale);

  // v6.9 (review R07): on a phone this card pushed the first case below the
  // fold, so there it renders after the list instead (CSS picks one).
  const atlasCard = (
        <div className={patternStyles.bannerCard} style={{ marginTop: "var(--s-5)" }}>
          <div style={{ display: "grid", gap: 4 }}>
            <span className={patternStyles.kicker}>
              {isZh ? "跨案例抽象 · 交互模式图谱" : "Cross-Case Primitives · Pattern Atlas"}
            </span>
            <p style={{ margin: 0, fontSize: 14, color: "var(--text-2)" }}>
              {isZh
                ? "把 6 个案例里的实体确权、三态分流与默契退场抽象为可复现活原型与代码标本。"
                : "Inspect the 6 reusable interaction rules, live micro-sandboxes, and copyable code extracted from these cases."}
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <Link href="/patterns" className="btn btn-ghost">
              {isZh ? "打开交互模式图谱 →" : "Explore Pattern Atlas →"}
            </Link>
            <Link href="/vault" className="btn btn-ghost">
              {isZh ? "演进档案馆 →" : "Archive Vault →"}
            </Link>
          </div>
        </div>
  );

  return (
    <main className="page" data-screen-label="02 Work">
      <section className="container idx-hero">
        <div className="label">{t("nav.work")}</div>
        <h1 className="h-display h1" style={{ marginTop: 16 }}>
          {isZh ? "精选作品" : "Selected work"}
        </h1>
        <div className="idx-atlas-wide">{atlasCard}</div>
      </section>

      <WorkIndex
        items={clientRows}
        thumbs={thumbs}
        matrixSlot={<EvidenceMatrix capabilities={evidenceMatrix} locale={locale} />}
        locale={locale}
      />

      <section className="container idx-atlas-narrow">{atlasCard}</section>

      <DecisionComparator rows={comparatorRows} locale={locale} />
    </main>
  );
}
