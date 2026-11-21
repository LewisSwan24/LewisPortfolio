import { Suspense } from "react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { AiTrustThread } from "@/components/hiring/AiTrustThread";
import { HiringRoleFitPanel } from "@/components/hiring/HiringRoleFitPanel";
import { InterviewBoundaryNotes } from "@/components/hiring/InterviewBoundaryNotes";
import { InterviewDecisionBrief } from "@/components/hiring/InterviewDecisionBrief";
import { RoleLensSwitch, type RoleLensCaseItem } from "@/components/hiring/RoleLensSwitch";
import { TailoredBriefBuilder } from "@/components/hiring/TailoredBriefBuilder";
import { buildHiringDeck } from "@/lib/presentation/build-deck";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getProofUiLabels } from "@/lib/proof";
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

      <section className="section container">
        <InterviewBoundaryNotes notes={room.boundaries} labels={proofLabels} />
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
