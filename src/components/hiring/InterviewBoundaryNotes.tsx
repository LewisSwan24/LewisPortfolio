import Link from "next/link";
import { getProofUiLabels, type ProofUiLabels } from "@/lib/proof";
import type { InterviewBoundaryNote } from "@/lib/portfolio-proof";

interface InterviewBoundaryNotesProps {
  notes: InterviewBoundaryNote[];
  labels?: ProofUiLabels;
}

export function InterviewBoundaryNotes({
  notes,
  labels = getProofUiLabels("en"),
}: InterviewBoundaryNotesProps) {
  return (
    <section className="interview-boundary-notes" aria-labelledby="interview-boundaries-title">
      <div className="interview-section-head">
        <div>
          <div className="label">{labels.boundaries}</div>
          <h2 id="interview-boundaries-title">{labels.boundariesTitle}</h2>
        </div>
        <p>{labels.boundariesIntro}</p>
      </div>
      <div className="interview-boundary-grid">
        {notes.map((note) => (
          <article className="interview-boundary-card" key={note.id}>
            <h3>{note.claim}</h3>
            <p>{note.boundary}</p>
            <small>{note.validation}</small>
            {note.href && <Link href={note.href}>{labels.seeRelatedProof}</Link>}
          </article>
        ))}
      </div>
    </section>
  );
}
