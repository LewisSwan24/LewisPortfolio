import Link from "next/link";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { AiTrustThread } from "@/components/hiring/AiTrustThread";
import { HiringRoleFitPanel } from "@/components/hiring/HiringRoleFitPanel";
import { InterviewBoundaryNotes } from "@/components/hiring/InterviewBoundaryNotes";
import { InterviewDecisionBrief } from "@/components/hiring/InterviewDecisionBrief";
import { InterviewEvidenceBrief } from "@/components/hiring/InterviewEvidenceBrief";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getProofUiLabels } from "@/lib/proof";
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
      ? "Lewis Dong 的快速招聘档案：岗位匹配、最强证据、面试问题和边界。"
      : "A fast hiring dossier for Lewis Dong: role fit, strongest evidence, interview questions, and boundaries.";

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
  const pageCopy =
    proofLocale === "zh"
      ? {
          roleTitle: "把岗位需求匹配到证据。",
          roleIntro: "先看岗位信号，再进入通话前最相关的案例证据。",
          nextStep: "下一步",
          closeTitle: "带一个案例和一个问题进入面试。",
          closeBody:
            "最快路径是：扫一遍岗位匹配，检查一个证据锚点，然后提出与你团队最相关的问题。",
          contact: "联系 Lewis",
          browseWork: "查看作品",
          resume: "查看简历",
        }
      : {
          roleTitle: "Match the opening to the proof.",
          roleIntro:
            "Pick the role signal first, then inspect the exact case evidence before the call.",
          nextStep: "Next step",
          closeTitle: "Bring one case and one question to the interview.",
          closeBody:
            "The fastest route is: scan role fit, inspect one proof anchor, then ask the question that matches your team.",
          contact: "Contact Lewis",
          browseWork: "Browse work",
          resume: "Resume",
        };

  // Three destinations only. This page previously fanned out to 19 hiring
  // sub-pages that nothing linked to and the sitemap never listed; a recruiter
  // reads one page, so those routes were deleted and the links went with them.
  const actions = [
    { href: "/contact", label: pageCopy.contact, variant: "btn-primary" },
    { href: "/projects", label: pageCopy.browseWork, variant: "btn-ghost" },
    { href: "/resume", label: pageCopy.resume, variant: "btn-ghost" },
  ];

  return (
    <main className="page interview-room-page" data-screen-label="05 Hire">
      <InterviewDecisionBrief brief={room.brief} />

      <section className="section container">
        <HiringRoleFitPanel
          roles={roleFits}
          locale={proofLocale}
          title={pageCopy.roleTitle}
          intro={pageCopy.roleIntro}
          labels={proofLabels}
        />
      </section>

      {/* AI UX as a thread through several cases. The AI UX role card above
          links into the same cases; /resume and /contact?role=ai-ux link here. */}
      <section className="section container">
        <AiTrustThread thread={aiTrustThread} />
      </section>

      <section className="section container">
        <InterviewEvidenceBrief items={room.evidenceBrief} labels={proofLabels} />
      </section>

      {/* The flat question list is gone: every role fit above already carries an
          "ask me about" angle, and each case page answers its own questions with
          evidence links. Repeating them here added six headings and no answers. */}
      <section className="section container">
        <InterviewBoundaryNotes notes={room.boundaries} labels={proofLabels} />
      </section>

      <section className="section container interview-room-close">
        <div>
          <div className="label">{pageCopy.nextStep}</div>
          <h2>{pageCopy.closeTitle}</h2>
          <p>{pageCopy.closeBody}</p>
        </div>
        <div>
          <div className="interview-room-actions interview-room-primary-actions">
            {actions.map((action) => (
              <Link className={`btn ${action.variant}`} href={action.href} key={action.href}>
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
