import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { localizeInternalHref } from "@/lib/locale-href";
import { AiTrustThread } from "@/components/hiring/AiTrustThread";
import { HiringRoleFitPanel } from "@/components/hiring/HiringRoleFitPanel";
import { InterviewBoundaryNotes } from "@/components/hiring/InterviewBoundaryNotes";
import { InterviewDecisionBrief } from "@/components/hiring/InterviewDecisionBrief";
import { RoleLensSwitch, type RoleLensCaseItem } from "@/components/hiring/RoleLensSwitch";
import { HireMarketLensSwitch } from "@/components/hiring/HireMarketLensSwitch";
import { InterviewDefenseArena } from "@/components/hiring/InterviewDefenseArena";
import { JdMatcherPanel } from "@/components/hiring/JdMatcherPanel";
import { TailoredBriefBuilder } from "@/components/hiring/TailoredBriefBuilder";
import { buildHiringDeck } from "@/lib/presentation/build-deck";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getProofUiLabels } from "@/lib/proof";
import { getMarketLensProfiles } from "@/lib/proof/market-lens";
import { getListedCases } from "@/lib/cases/registry";
import {
  getAiTrustThread,
  getHiringRoleFits,
  getInterviewDecisionRoom,
  type ProofLocale,
} from "@/lib/portfolio-proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh" ? "面试 Lewis | 招聘决策页" : "Interview Lewis | Hiring Decision Room";
  const description =
    locale === "zh"
      ? "Lewis Dong 的快速招聘档案：岗位视角筛选、最强证据、面试问题与边界。"
      : "A fast hiring dossier for Lewis Dong: role-tailored proof lens, strongest evidence, interview questions, and boundaries.";

  return {
    title,
    description,
    alternates: buildAlternates("/hire", locale),
    openGraph: buildOpenGraph({ title, description, path: "/hire", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HirePage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const room = getInterviewDecisionRoom(proofLocale);
  const roleFits = getHiringRoleFits(proofLocale);
  const aiTrustThread = getAiTrustThread(proofLocale);
  const proofLabels = getProofUiLabels(proofLocale);

  const listedCases = getListedCases();
  const hiringDeck = buildHiringDeck({
    room,
    cases: listedCases,
    locale: proofLocale,
  });
  const lensCases: RoleLensCaseItem[] = listedCases.map((record) => {
    const card = record.card[proofLocale];
    return {
      slug: record.slug,
      title: card.title,
      kicker: card.kicker,
      sub: card.sub,
      metrics: [card.m1, card.m2, card.m3],
      roleTracks: record.roleTracks,
    };
  });

  const pageCopy =
    proofLocale === "zh"
      ? {
          roleTitle: "把岗位需求匹配到证据。",
          roleIntro: "先看岗位信号，再进入通话前最相关的案例证据。",
        }
      : {
          roleTitle: "Match the opening to the proof.",
          roleIntro:
            "Pick the role signal first, then inspect the exact case evidence before the call.",
        };

  return (
    <main className="page interview-room-page" data-screen-label="05 Hire">
      <InterviewDecisionBrief
        brief={room.brief}
        locale={proofLocale}
        presentationDeck={hiringDeck}
      />

      <HireMarketLensSwitch profiles={getMarketLensProfiles()} locale={proofLocale} />

      <Suspense fallback={null}>
        <RoleLensSwitch cases={lensCases} locale={proofLocale} />
      </Suspense>

      <section className="section container">
        <HiringRoleFitPanel
          roles={roleFits}
          locale={proofLocale}
          compact
          title={pageCopy.roleTitle}
          intro={pageCopy.roleIntro}
          labels={proofLabels}
        />
      </section>

      <section className="section container">
        <AiTrustThread thread={aiTrustThread} />
      </section>

      <InterviewDefenseArena locale={proofLocale} />

      <section className="section container">
        <InterviewBoundaryNotes notes={room.boundaries} labels={proofLabels} />
      </section>

      <JdMatcherPanel locale={proofLocale} />

      <section className="section container" aria-labelledby="hire-decks-heading">
        <div className="v4-studio-plate" style={{ display: "grid", gap: "var(--s-3)" }}>
          <div>
            <span className="eyebrow">
              {proofLocale === "zh" ? "A4 设计论证评注本与角色 PDF Deck" : "Editorial Critique Print & Role Decks"}
            </span>
            <h2 id="hire-decks-heading" className="h-display" style={{ fontSize: "clamp(20px, 2.2vw, 28px)", marginTop: 6 }}>
              {proofLocale === "zh"
                ? "带进面试会议室的论证手稿（附直达活原型的 QR 二维码）"
                : "Bringable A4 critique manuscripts with live QR jump codes"}
            </h2>
            <p className="prose" style={{ marginTop: 6, maxWidth: "66ch" }}>
              {proofLocale === "zh"
                ? "每页 >= 60% 版面聚焦人类冲突、被否决方案与坦诚边界，避免堆砌大号装饰标题；支持在线自定义角色组合打印，或直接下载预设岗位 PDF。"
                : "Over 60% of each A4 sheet covers human tension, rejected paths, and explicit limits — printable per custom case selection or downloadable directly per role."}
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link className="btn btn-primary" href={localizeInternalHref("/brief/print", proofLocale)}>
              {proofLocale === "zh" ? "打开在线 A4 评注打印工作台" : "Open Interactive A4 Critique Studio"}
            </Link>
            <Link className="btn btn-ghost" href={localizeInternalHref("/resume/compose", proofLocale)}>
              {proofLocale === "zh" ? "打开定制双语简历组装台" : "Open Custom Resume Composer"}
            </Link>
            <a className="btn btn-ghost" href="/decks/ai-product-engineer.pdf" download>
              {proofLocale === "zh" ? "AI 产品工程师 Deck (PDF)" : "AI Product Engineer (PDF)"}
            </a>
            <a className="btn btn-ghost" href="/decks/design-engineer.pdf" download>
              {proofLocale === "zh" ? "设计工程师 Deck (PDF)" : "Design Engineer (PDF)"}
            </a>
            <a className="btn btn-ghost" href="/decks/hardware-interaction.pdf" download>
              {proofLocale === "zh" ? "软硬交互设计师 Deck (PDF)" : "Hardware & Interaction (PDF)"}
            </a>
            <a className="btn btn-ghost" href={`/resume/lewis-dong-resume-${proofLocale}.pdf`} download>
              {proofLocale === "zh" ? "ATS 简历 (PDF)" : "ATS Resume (PDF)"}
            </a>
          </div>
          <div className="res-inline-links" aria-label={proofLocale === "zh" ? "直达公开源码仓库与在线原型" : "Verify public GitHub repositories and live builds"}>
            <a href="https://github.com/LewisSwan24/walkie" target="_blank" rel="noopener noreferrer">Walkie GitHub ↗</a>
            <a href="https://lewisswan24.github.io/lamplight-nook-site/" target="_blank" rel="noopener noreferrer">Lamplight Site ↗</a>
            <a href="https://github.com/LewisSwan24/lamplight-nook" target="_blank" rel="noopener noreferrer">Lamplight GitHub ↗</a>
            <a href="https://github.com/LewisSwan24/resume-autofill" target="_blank" rel="noopener noreferrer">Resume Autofill GitHub ↗</a>
            <a href="https://on-the-beat.fly.dev" target="_blank" rel="noopener noreferrer">On The Beat Live ↗</a>
            <a href="https://github.com/LewisSwan24/on-the-beat" target="_blank" rel="noopener noreferrer">On The Beat GitHub ↗</a>
            <a href="https://maze-runners.vercel.app" target="_blank" rel="noopener noreferrer">MazeRunners Console ↗</a>
          </div>
        </div>
      </section>

      <TailoredBriefBuilder
        cases={listedCases.map((record) => ({
          slug: record.slug,
          title: record.card[proofLocale].title,
        }))}
        locale={proofLocale}
      />
    </main>
  );
}
