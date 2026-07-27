import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringOfferView } from "@/components/hiring/HiringOfferComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringOfferReadiness, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Offer Readiness Pack"
      : "Offer Readiness Pack";
  const description =
    "An offer-readiness pack for reviewing Lewis Dong's proof anchor, validation note, onboarding focus, readiness question, and next action before the final conversation.";
  const path = "/hire/offer";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringOfferPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringOfferReadiness(proofLocale);

  return (
    <main className="page hiring-offer-page" data-screen-label="29 Hiring Offer">
      <HiringOfferView pack={pack} />
    </main>
  );
}
