import Link from "next/link";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { localizeInternalHref } from "@/lib/locale-href";
import { AiTrustThread } from "@/components/hiring/AiTrustThread";
import { InterviewBoundaryNotes } from "@/components/hiring/InterviewBoundaryNotes";
import { InterviewDefenseArena } from "@/components/hiring/InterviewDefenseArena";
import { JdMatcherPanel } from "@/components/hiring/JdMatcherPanel";
import { TailoredBriefBuilder } from "@/components/hiring/TailoredBriefBuilder";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getProofUiLabels } from "@/lib/proof";
import { getListedCases } from "@/lib/cases/registry";
import {
  getAiTrustThread,
  getInterviewDecisionRoom,
  type ProofLocale,
} from "@/lib/portfolio-proof";

// v6.5 (review C10): /hire was the longest page on the site (18 phone screens) while it is
// meant to be read in a minute. It now keeps role fit, cases, resume and contact; the
// material an interviewer prepares with lives here. Not under /hire/*, which still
// redirects to /hire for the retired leaf routes.

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title = locale === "zh" ? "面试准备资料 | Lewis Dong" : "Interview pack | Lewis Dong";
  const description =
    locale === "zh"
      ? "给面试官的准备资料：AI 与信任主线、面试追问练习、能力边界、岗位描述匹配和可打印的 A4 简报。"
      : "Preparation material for interviewers: the AI and trust thread, practice questions, scope limits, a job-description matcher and printable A4 briefs.";
  return {
    title,
    description,
    alternates: buildAlternates("/interview", locale),
    openGraph: buildOpenGraph({ title, description, path: "/interview", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function InterviewPackPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const isZh = proofLocale === "zh";
  const room = getInterviewDecisionRoom(proofLocale);
  const aiTrustThread = getAiTrustThread(proofLocale);
  const proofLabels = getProofUiLabels(proofLocale);
  const listedCases = getListedCases();

  return (
    <main className="page interview-room-page" data-screen-label="05b Interview pack">
      <section className="interview-room-hero container" aria-labelledby="interview-pack-title">
        <div className="label">{isZh ? "给面试官" : "For interviewers"}</div>
        <h1 id="interview-pack-title" className="h-display h2" style={{ marginTop: 16 }}>
          {isZh ? "面试准备资料" : "Interview pack"}
        </h1>
        <p className="prose" style={{ maxWidth: "62ch" }}>
          {isZh
            ? "一分钟版本在「招聘与简历」页。这里放面试前用得上的资料：追问练习、能力边界、岗位匹配和可打印的简报。"
            : "The one-minute version is on Hire & CV. This page holds what helps before an interview: practice questions, scope limits, job matching and printable briefs."}
        </p>
        <div className="interview-room-actions">
          <Link className="btn btn-ghost" href={localizeInternalHref("/hire", proofLocale)}>
            {isZh ? "← 回到招聘与简历" : "← Back to Hire & CV"}
          </Link>
        </div>
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
              {isZh ? "A4 设计论证评注本与角色 PDF Deck" : "Editorial Critique Print & Role Decks"}
            </span>
            <h2 id="hire-decks-heading" className="h-display" style={{ fontSize: "clamp(20px, 2.2vw, 28px)", marginTop: 6 }}>
              {isZh
                ? "带进面试会议室的论证手稿（附直达活原型的 QR 二维码）"
                : "Bringable A4 critique manuscripts with live QR jump codes"}
            </h2>
            <p className="prose" style={{ marginTop: 6, maxWidth: "66ch" }}>
              {isZh
                ? "每页 >= 60% 版面聚焦人类冲突、被否决方案与坦诚边界，避免堆砌大号装饰标题；支持在线自定义角色组合打印，或直接下载预设岗位 PDF。"
                : "Over 60% of each A4 sheet covers human tension, rejected paths, and explicit limits — printable per custom case selection or downloadable directly per role."}
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link className="btn btn-primary" href={localizeInternalHref("/brief/print", proofLocale)}>
              {isZh ? "打开在线 A4 评注打印工作台" : "Open Interactive A4 Critique Studio"}
            </Link>
            <Link className="btn btn-ghost" href={localizeInternalHref("/resume/compose", proofLocale)}>
              {isZh ? "打开定制双语简历组装台" : "Open Custom Resume Composer"}
            </Link>
            <a className="btn btn-ghost" href="/decks/ai-product-engineer.pdf" download>
              {isZh ? "AI 产品工程师 Deck (PDF)" : "AI Product Engineer (PDF)"}
            </a>
            <a className="btn btn-ghost" href="/decks/design-engineer.pdf" download>
              {isZh ? "设计工程师 Deck (PDF)" : "Design Engineer (PDF)"}
            </a>
            <a className="btn btn-ghost" href="/decks/hardware-interaction.pdf" download>
              {isZh ? "软硬交互设计师 Deck (PDF)" : "Hardware & Interaction (PDF)"}
            </a>
            <a className="btn btn-ghost" href={`/resume/lewis-dong-resume-${proofLocale}.pdf`} download>
              {isZh ? "ATS 简历 (PDF)" : "ATS Resume (PDF)"}
            </a>
          </div>
          <div className="res-inline-links" aria-label={isZh ? "直达公开源码仓库与在线原型" : "Verify public GitHub repositories and live builds"}>
            <a href="https://github.com/LewisSwan24/walkie" target="_blank" rel="noopener noreferrer">Walkie GitHub ↗</a>
            <a href="https://lamplight.lewisdong.com/" target="_blank" rel="noopener noreferrer">{isZh ? "Lamplight 产品展示页 ↗" : "Lamplight Site ↗"}</a>
            <a href="https://github.com/LewisSwan24/lamplight-nook" target="_blank" rel="noopener noreferrer">Lamplight GitHub ↗</a>
            <a href="https://github.com/LewisSwan24/resume-autofill" target="_blank" rel="noopener noreferrer">Resume Autofill GitHub ↗</a>
            <a href="https://onthebeat.lewisdong.com" target="_blank" rel="noopener noreferrer">{isZh ? "On The Beat 在线原型 ↗" : "On The Beat Live ↗"}</a>
            <a href="https://github.com/LewisSwan24/on-the-beat" target="_blank" rel="noopener noreferrer">On The Beat GitHub ↗</a>
            <a href="https://maze.lewisdong.com" target="_blank" rel="noopener noreferrer">{isZh ? "MazeRunners 网页控制台 ↗" : "MazeRunners Console ↗"}</a>
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
