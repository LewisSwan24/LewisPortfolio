import Link from "next/link";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringRoleFitPanel } from "@/components/hiring/HiringRoleFitPanel";
import { InterviewBoundaryNotes } from "@/components/hiring/InterviewBoundaryNotes";
import { InterviewDecisionBrief } from "@/components/hiring/InterviewDecisionBrief";
import { InterviewEvidenceBrief } from "@/components/hiring/InterviewEvidenceBrief";
import { InterviewQuestionBank } from "@/components/hiring/InterviewQuestionBank";
import { RolePacketNav } from "@/components/hiring/RolePacketComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getProofUiLabels, getRolePackets } from "@/lib/proof";
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
  const rolePackets = getRolePackets(proofLocale);
  const proofLabels = getProofUiLabels(proofLocale);
  const proofReviewLabel =
    proofLocale === "zh" ? "Proof review room" : "Proof review room";
  const compareRolesLabel =
    proofLocale === "zh" ? "Compare role paths" : "Compare role paths";
  const interviewAgendaLabel =
    proofLocale === "zh" ? "Interview agenda" : "Interview agenda";
  const scorecardLabel =
    proofLocale === "zh" ? "Hiring scorecard" : "Hiring scorecard";
  const shortlistLabel =
    proofLocale === "zh" ? "Shortlist memo" : "Shortlist memo";
  const debriefLabel =
    proofLocale === "zh" ? "Manager debrief" : "Manager debrief";
  const decisionLabel =
    proofLocale === "zh" ? "Decision pack" : "Decision pack";
  const offerLabel =
    proofLocale === "zh" ? "Offer readiness" : "Offer readiness";
  const onboardingLabel =
    proofLocale === "zh" ? "Onboarding plan" : "Onboarding plan";
  const kickoffLabel =
    proofLocale === "zh" ? "Kickoff plan" : "Kickoff plan";
  const impactLabel =
    proofLocale === "zh" ? "Impact review" : "Impact review";
  const growthLabel =
    proofLocale === "zh" ? "Growth roadmap" : "Growth roadmap";
  const retentionLabel =
    proofLocale === "zh" ? "Retention readiness" : "Retention readiness";
  const partnershipLabel =
    proofLocale === "zh" ? "Partnership operating" : "Partnership operating";

  return (
    <main className="page interview-room-page" data-screen-label="05 Hire">
      <InterviewDecisionBrief brief={room.brief} />

      <section className="section container">
        <RolePacketNav packets={rolePackets} labels={proofLabels} />
      </section>

      <section className="section container">
        <HiringRoleFitPanel
          roles={roleFits}
          title="Match the opening to the proof."
          intro="Pick the role signal first, then inspect the exact case evidence before the call."
          labels={proofLabels}
        />
      </section>

      <section className="section container">
        <InterviewEvidenceBrief items={room.evidenceBrief} labels={proofLabels} />
      </section>

      <section className="section container">
        <InterviewQuestionBank items={room.questionBank} labels={proofLabels} />
      </section>

      <section className="section container">
        <InterviewBoundaryNotes notes={room.boundaries} labels={proofLabels} />
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
          <Link className="btn btn-ghost" href="/hire/review">
            {proofReviewLabel}
          </Link>
          <Link className="btn btn-ghost" href="/hire/compare">
            {compareRolesLabel}
          </Link>
          <Link className="btn btn-ghost" href="/hire/interview">
            {interviewAgendaLabel}
          </Link>
          <Link className="btn btn-ghost" href="/hire/scorecard">
            {scorecardLabel}
          </Link>
          <Link className="btn btn-ghost" href="/hire/shortlist">
            {shortlistLabel}
          </Link>
          <Link className="btn btn-ghost" href="/hire/debrief">
            {debriefLabel}
          </Link>
          <Link className="btn btn-ghost" href="/hire/decision">
            {decisionLabel}
          </Link>
          <Link className="btn btn-ghost" href="/hire/offer">
            {offerLabel}
          </Link>
          <Link className="btn btn-ghost" href="/hire/onboarding">
            {onboardingLabel}
          </Link>
          <Link className="btn btn-ghost" href="/hire/kickoff">
            {kickoffLabel}
          </Link>
          <Link className="btn btn-ghost" href="/hire/impact">
            {impactLabel}
          </Link>
          <Link className="btn btn-ghost" href="/hire/growth">
            {growthLabel}
          </Link>
          <Link className="btn btn-ghost" href="/hire/retention">
            {retentionLabel}
          </Link>
          <Link className="btn btn-ghost" href="/hire/partnership">
            {partnershipLabel}
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
