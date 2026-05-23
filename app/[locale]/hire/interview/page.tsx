import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { InterviewAgendaView } from "@/components/hiring/InterviewAgendaComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getInterviewAgendaBoard, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Interview Agenda Board | Lewis Dong"
      : "Interview Agenda Board | Interview Lewis";
  const description =
    "A recruiter-facing interview agenda for turning Lewis Dong's role-fit proof, case anchors, and boundaries into a focused first call.";
  const path = "/hire/interview";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function InterviewAgendaPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const board = getInterviewAgendaBoard(proofLocale);

  return (
    <main className="page interview-agenda-page" data-screen-label="24 Interview Agenda">
      <InterviewAgendaView board={board} />
    </main>
  );
}
