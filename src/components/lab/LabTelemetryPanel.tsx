"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { TelemetrySummary } from "./LabFieldDashboard";

// v7.1 block 3: the dashboard's code loads only after /api/vitals returns
// samples, so a visit with no field data downloads none of it (and the /lab
// route chunk stays inside its budget).
const LabFieldDashboard = dynamic(() => import("./LabFieldDashboard").then((m) => m.LabFieldDashboard), {
  ssr: false,
});

/** The panel only earns its place once the endpoint has real samples to show. */
export function hasTelemetrySamples(summary: Pick<TelemetrySummary, "sampleCount"> | null): boolean {
  return (summary?.sampleCount ?? 0) > 0;
}

export function LabTelemetryPanel({ locale }: { locale: "en" | "zh" }) {
  const [summary, setSummary] = useState<TelemetrySummary | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/vitals")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { ok?: boolean; summary?: TelemetrySummary } | null) => {
        if (alive && data?.ok && data.summary) {
          setSummary(data.summary);
        }
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  if (!summary || !hasTelemetrySamples(summary)) return null;
  return <LabFieldDashboard locale={locale} summary={summary} />;
}
