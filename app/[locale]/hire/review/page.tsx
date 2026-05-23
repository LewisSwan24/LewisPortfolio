import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { ProofReviewRoomView } from "@/components/hiring/ProofReviewRoomComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getProofReviewRoom, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Proof Review Room | Lewis Dong"
      : "Proof Review Room | Interview Lewis";
  const description =
    "A recruiter-facing review room for Lewis Dong's role fit, proof anchors, validation gates, and release bundle.";
  const path = "/hire/review";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function ProofReviewPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const room = getProofReviewRoom(proofLocale);

  return (
    <main className="page proof-review-page" data-screen-label="22 Proof Review">
      <ProofReviewRoomView room={room} />
    </main>
  );
}
