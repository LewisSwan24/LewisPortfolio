import Link from "next/link";
import type { InterviewBoundaryNote } from "@/lib/portfolio-proof";

interface InterviewBoundaryNotesProps {
  notes: InterviewBoundaryNote[];
}

export function InterviewBoundaryNotes({ notes }: InterviewBoundaryNotesProps) {
  return (
    <section className="interview-boundary-notes" aria-labelledby="interview-boundaries-title">
      <div className="interview-section-head">
        <div>
          <div className="label">Boundaries</div>
          <h2 id="interview-boundaries-title">What I would not overclaim.</h2>
        </div>
        <p>These limits make the evidence more useful, not weaker.</p>
      </div>
      <div className="interview-boundary-grid">
        {notes.map((note) => (
          <article className="interview-boundary-card" key={note.id}>
            <h3>{note.claim}</h3>
            <p>{note.boundary}</p>
            <small>{note.validation}</small>
            {note.href && <Link href={note.href}>See related proof</Link>}
          </article>
        ))}
      </div>
    </section>
  );
}
