import Link from "next/link";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringRoleFitPanel } from "@/components/hiring/HiringRoleFitPanel";
import { InterviewBoundaryNotes } from "@/components/hiring/InterviewBoundaryNotes";
import { InterviewDecisionBrief } from "@/components/hiring/InterviewDecisionBrief";
import { InterviewEvidenceBrief } from "@/components/hiring/InterviewEvidenceBrief";
import { InterviewQuestionBank } from "@/components/hiring/InterviewQuestionBank";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import {
  getHiringRoleFits,
  getInterviewDecisionRoom,
  type ProofLocale,
} from "@/lib/portfolio-proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh" ? "Interview Lewis" : "Interview Lewis | Hiring Decision Room";
  const description =
    "A fast hiring dossier for Lewis Dong: role fit, strongest evidence, interview questions, and boundaries.";

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

  return (
    <main className="page interview-room-page" data-screen-label="05 Hire">
      <InterviewDecisionBrief brief={room.brief} />

      <section className="section container">
        <HiringRoleFitPanel
          roles={roleFits}
          title="Match the opening to the proof."
          intro="Pick the role signal first, then inspect the exact case evidence before the call."
        />
      </section>

      <section className="section container">
        <InterviewEvidenceBrief items={room.evidenceBrief} />
      </section>

      <section className="section container">
        <InterviewQuestionBank items={room.questionBank} />
      </section>

      <section className="section container">
        <InterviewBoundaryNotes notes={room.boundaries} />
      </section>

      <section className="section container interview-room-close">
        <div>
          <div className="label">Next step</div>
          <h2>Bring one case and one question to the interview.</h2>
          <p>
            The fastest route is: scan role fit, inspect one proof anchor, then ask
            the question that matches your team.
          </p>
        </div>
        <div className="interview-room-actions">
          <Link className="btn btn-primary" href="/contact">
            Contact Lewis
          </Link>
          <Link className="btn btn-ghost" href="/projects">
            Browse work
          </Link>
          <Link className="btn btn-ghost" href="/resume">
            Resume
          </Link>
        </div>
      </section>
    </main>
  );
}
