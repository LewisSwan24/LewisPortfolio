import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { ApplicationPacketView } from "@/components/hiring/ApplicationPacketComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import {
  getApplicationPacket,
  getProofUiLabels,
  roleRouteParams,
  type ProofLocale,
} from "@/lib/proof";

interface Props {
  params: Promise<{ role: string; locale: string }>;
}

export function generateStaticParams() {
  return roleRouteParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const locale = (await getLocale()) as "en" | "zh";
  const packet = getApplicationPacket(role, locale);

  if (!packet) return { title: "Application Packet Not Found" };

  const title = `${packet.label} Application Packet | Lewis Dong`;
  const description = packet.summary;
  const path = `/hire/${role}/packet`;

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HireRolePacketPage({ params }: Props) {
  const { role } = await params;
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const packet = getApplicationPacket(role, proofLocale);
  const labels = getProofUiLabels(proofLocale);

  if (!packet) notFound();

  return (
    <main className="page application-packet-page" data-screen-label="05 Hire Packet">
      <ApplicationPacketView packet={packet} labels={labels} />
    </main>
  );
}
