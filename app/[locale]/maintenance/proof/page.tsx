import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { ProofMaintenanceView } from "@/components/hiring/ProofMaintenanceComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import {
  getProofMaintenanceReport,
  getProofUiLabels,
  type ProofLocale,
} from "@/lib/proof";

const path = "/maintenance/proof";

function isProofMaintenanceEnabled() {
  return process.env.NEXT_PUBLIC_ENABLE_PROOF_MAINTENANCE === "true";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";

  if (!isProofMaintenanceEnabled()) return { title: "Not Found" };

  const title = "Proof Maintenance | Lewis Dong";
  const description = "Internal proof maintenance queue for portfolio evidence.";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function ProofMaintenancePage() {
  if (!isProofMaintenanceEnabled()) notFound();

  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const labels = getProofUiLabels(proofLocale);
  const report = getProofMaintenanceReport();

  return (
    <main className="page proof-maintenance-page" data-screen-label="17 Proof Maintenance">
      <ProofMaintenanceView labels={labels} report={report} />
    </main>
  );
}
