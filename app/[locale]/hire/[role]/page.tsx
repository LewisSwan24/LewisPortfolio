import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import {
  RolePacketHero,
  RolePacketInterviewRoute,
  RolePacketLimits,
  RolePacketProofList,
} from "@/components/hiring/RolePacketComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import {
  getProofUiLabels,
  getRolePacket,
  roleRouteParams,
  type HiringRoleId,
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
  const packet = getRolePacket(role as HiringRoleId, locale);

  if (!packet) {
    return { title: "Role Packet Not Found" };
  }

  const title = `${packet.label} | Interview Lewis`;
  const description = packet.fitThesis;
  const path = `/hire/${role}`;

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HireRolePage({ params }: Props) {
  const { role } = await params;
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const packet = getRolePacket(role as HiringRoleId, proofLocale);
  const labels = getProofUiLabels(proofLocale);

  if (!packet) notFound();

  return (
    <main className="page role-packet-page" data-screen-label="05 Hire Role">
      <RolePacketHero packet={packet} />

      <section className="section container">
        <RolePacketProofList packet={packet} labels={labels} />
      </section>

      <section className="section container">
        <RolePacketInterviewRoute packet={packet} labels={labels} />
      </section>

      <section className="section container">
        <RolePacketLimits packet={packet} labels={labels} />
      </section>

      <section className="section container interview-room-close">
        <div>
          <div className="label">{labels.nextStep}</div>
          <h2>{labels.rolePacketCloseTitle}</h2>
          <p>{labels.rolePacketCloseBody}</p>
        </div>
        <div className="interview-room-actions">
          <Link className="btn btn-primary" href={`/contact?role=${packet.id}`}>
            {packet.primaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={`/hire/${packet.id}/packet`}>
            {labels.openApplicationPacket}
          </Link>
          <Link className="btn btn-ghost" href="/hire">
            {labels.generalHireRoom}
          </Link>
          <Link className="btn btn-ghost" href={`/projects/${packet.strongestCases[0]}`}>
            {labels.strongestCase}
          </Link>
        </div>
      </section>
    </main>
  );
}
