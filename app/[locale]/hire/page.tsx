import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { localizeInternalHref } from "@/lib/locale-href";
import { HiringRoleFitPanel } from "@/components/hiring/HiringRoleFitPanel";
import { InterviewDecisionBrief } from "@/components/hiring/InterviewDecisionBrief";
import { RoleLensSwitch, type RoleLensCaseItem } from "@/components/hiring/RoleLensSwitch";
import { buildHiringDeck } from "@/lib/presentation/build-deck";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getProofUiLabels } from "@/lib/proof";
import { getListedCases } from "@/lib/cases/registry";
import {
  getHiringRoleFits,
  getInterviewDecisionRoom,
  type ProofLocale,
} from "@/lib/portfolio-proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh" ? "招聘与简历" : "Hire & CV";
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

      <Suspense fallback={null}>
        <RoleLensSwitch cases={lensCases} locale={proofLocale} />
      </Suspense>

      <section className="section container">
        <HiringRoleFitPanel
          roles={roleFits}
          locale={proofLocale}
          compact
          eyebrow={proofLocale === "zh" ? "岗位匹配" : "Role fit"}
          title={pageCopy.roleTitle}
          intro={pageCopy.roleIntro}
          labels={proofLabels}
        />
      </section>

      {/* v6.5 (review C10): the interview material moved to /interview so this page stays a
          one-minute read: role fit, cases, resume and contact. */}
      <section className="section container" aria-labelledby="hire-more-heading">
        <div className="v4-studio-plate" style={{ display: "grid", gap: "var(--s-3)" }}>
          <h2 id="hire-more-heading" className="h-display" style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}>
            {proofLocale === "zh" ? "简历与面试资料" : "Resume and interview material"}
          </h2>
          <div className="interview-room-actions" style={{ marginTop: 0 }}>
            <a className="btn btn-primary" href={`/resume/lewis-dong-resume-${proofLocale}.pdf`} download>
              {proofLocale === "zh" ? "下载 PDF 简历" : "Download PDF CV"}
            </a>
            <Link className="btn btn-ghost" href={localizeInternalHref("/interview", proofLocale)}>
              {proofLocale === "zh" ? "面试准备资料 →" : "Interview pack →"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
