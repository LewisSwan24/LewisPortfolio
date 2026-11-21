import Link from "next/link";
import type { ProofLocale, ProofUiLabels } from "@/lib/proof";
import { getFollowThroughBrief } from "@/lib/proof";
import { localizeInternalHref } from "@/lib/locale-href";

interface FollowThroughContactContextProps {
  role?: string;
  intent?: string;
  locale: ProofLocale;
  labels: ProofUiLabels;
}

export function FollowThroughContactContext({
  role,
  intent,
  locale,
  labels,
}: FollowThroughContactContextProps) {
  if (intent !== "interview" || !role) return null;

  const brief = getFollowThroughBrief(role, locale);
  if (!brief) return null;

  return (
    <section
      className="follow-through-contact-context"
      aria-labelledby="follow-through-contact-title"
    >
      <div>
        <div className="label">{labels.followThrough}</div>
        <h2 id="follow-through-contact-title">{brief.label}</h2>
        <p>{brief.summary}</p>
      </div>
      <div className="follow-through-actions">
        <Link
          className="btn btn-primary"
          href={localizeInternalHref(`/hire?role=${brief.id}`, locale)}
        >
          {labels.openFollowThrough}
        </Link>
        <Link
          className="btn btn-ghost"
          href={localizeInternalHref(`/hire?role=${brief.id}`, locale)}
        >
          {labels.openApplicationPacket}
        </Link>
      </div>
    </section>
  );
}
