import Link from "next/link";
import type {
  ProofFreshnessStatus,
  ProofMaintenanceEntry,
  ProofMaintenanceReport,
  ProofUiLabels,
} from "@/lib/proof";

interface ProofMaintenanceViewProps {
  labels: ProofUiLabels;
  report: ProofMaintenanceReport;
}

function statusLabel(status: ProofFreshnessStatus, labels: ProofUiLabels) {
  if (status === "stale") return labels.maintenanceStale;
  if (status === "watch") return labels.maintenanceWatch;
  return labels.maintenanceFresh;
}

function statusBuckets(report: ProofMaintenanceReport, labels: ProofUiLabels) {
  return [
    { key: "fresh", label: labels.maintenanceFresh, entries: report.fresh },
    { key: "watch", label: labels.maintenanceWatch, entries: report.watch },
    { key: "stale", label: labels.maintenanceStale, entries: report.stale },
    {
      key: "missing",
      label: labels.maintenanceMissing,
      entries: report.missingReview,
    },
  ] as const;
}

function MaintenanceRow({
  entry,
  labels,
}: {
  entry: ProofMaintenanceEntry;
  labels: ProofUiLabels;
}) {
  return (
    <div className="proof-maintenance-row" data-status={entry.status} role="row">
      <div role="cell">
        <Link className="proof-maintenance-entry-link" href={entry.href}>
          {entry.claimId}
        </Link>
        <p>{entry.ownerNote}</p>
      </div>
      <span role="cell">{entry.roleId}</span>
      <span role="cell">{entry.surface}</span>
      <span role="cell">{entry.reviewedAt}</span>
      <span role="cell">{entry.nextReviewAt}</span>
      <strong role="cell">{statusLabel(entry.status, labels)}</strong>
    </div>
  );
}

export function ProofMaintenanceView({ labels, report }: ProofMaintenanceViewProps) {
  return (
    <article className="proof-maintenance container" aria-labelledby="proof-maintenance-title">
      <header className="proof-maintenance-hero">
        <div>
          <div className="label">{labels.proofMaintenance}</div>
          <h1 id="proof-maintenance-title">{labels.proofMaintenance}</h1>
          <p>
            {labels.maintenanceCoverage}: {report.entries.length}.{" "}
            {labels.maintenanceGenerated}: {report.generatedAt}.
          </p>
        </div>
      </header>

      <ul className="proof-maintenance-buckets" aria-label={labels.maintenanceCoverage}>
        {statusBuckets(report, labels).map((bucket) => (
          <li className="proof-maintenance-bucket" data-bucket={bucket.key} key={bucket.key}>
            <span>{bucket.label}</span>
            <strong>{bucket.entries.length}</strong>
          </li>
        ))}
      </ul>

      <section className="proof-maintenance-section" aria-labelledby="maintenance-queue-title">
        <h2 id="maintenance-queue-title">{labels.maintenanceReviewQueue}</h2>
        <div
          className="proof-maintenance-table"
          role="table"
          aria-label={labels.maintenanceReviewQueue}
        >
          <div className="proof-maintenance-row proof-maintenance-row-head" role="row">
            <strong role="columnheader">{labels.maintenanceClaim}</strong>
            <strong role="columnheader">{labels.maintenanceRole}</strong>
            <strong role="columnheader">{labels.maintenanceSurface}</strong>
            <strong role="columnheader">{labels.maintenanceReviewed}</strong>
            <strong role="columnheader">{labels.maintenanceNextReview}</strong>
            <strong role="columnheader">{labels.maintenanceStatus}</strong>
          </div>
          {report.entries.map((entry) => (
            <MaintenanceRow entry={entry} key={entry.id} labels={labels} />
          ))}
        </div>
      </section>
    </article>
  );
}
