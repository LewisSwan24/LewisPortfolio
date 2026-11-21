import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { EvidenceMatrix } from "@/components/hiring/EvidenceMatrix";
import {
  VizConnect,
  VizMaze,
  VizHoop,
  VizPricewise,
} from "@/components/viz/ProjectViz";
import { ProjectCoverImage } from "@/components/viz/ProjectCoverImage";
import { getProjectCover } from "@/lib/project-covers";
import { getWorkIndexItems } from "@/lib/cases/registry";
import {
  getEvidenceMatrix,
  type ProofLocale,
} from "@/lib/portfolio-proof";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { WorkIndex, type WorkIndexClientRow } from "./WorkIndex";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "zh";
  const title = t("nav.work");
  const description =
    locale === "zh"
      ? "十个案例，涵盖 UX、交互设计、物理计算、AI Agent 与可运行全栈原型。"
      : "Ten cases across UX, interaction design, physical computing, AI agents, and working full-stack prototypes.";
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
      {slug === "maze" ? (
        <VizMaze locale={locale} />
      ) : slug === "hoop" ? (
        <VizHoop locale={locale} />
      ) : slug === "pricewise" ? (
        <VizPricewise locale={locale} />
      ) : slug === "connect" ? (
        <VizConnect locale={locale} />
      ) : null}
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

  return (
    <main className="page" data-screen-label="02 Work">
      <section className="container idx-hero">
        <div className="label">{t("nav.work")}</div>
        <h1 className="h-display h1" style={{ marginTop: 16 }}>
          {isZh ? "精选作品" : "Selected work"}
        </h1>
      </section>

      <WorkIndex
        items={clientRows}
        thumbs={thumbs}
        matrixSlot={<EvidenceMatrix capabilities={evidenceMatrix} locale={locale} />}
        locale={locale}
      />
    </main>
  );
}
