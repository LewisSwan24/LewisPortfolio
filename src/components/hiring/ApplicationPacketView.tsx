import Link from "next/link";
import type { ApplicationPacket, ProofUiLabels } from "@/lib/proof";
import { PrintPacketButton } from "./PrintPacketButton";

interface ApplicationPacketViewProps {
  packet: ApplicationPacket;
  labels: ProofUiLabels;
}

export function ApplicationPacketView({ packet, labels }: ApplicationPacketViewProps) {
  return (
    <article className="application-packet container" aria-labelledby="application-packet-title">
      <header className="application-packet-hero">
        <div>
          <div className="label">{labels.applicationPacket}</div>
          <h1 id="application-packet-title">{packet.headline}</h1>
          <p>{packet.summary}</p>
        </div>
        <div className="application-packet-actions no-print" aria-label={labels.packetActions}>
          {packet.actions.map((action) => (
            <Link
              className={action.kind === "contact" ? "btn btn-primary" : "btn btn-ghost"}
              href={action.href}
              key={action.kind}
            >
              {action.label}
            </Link>
          ))}
          <PrintPacketButton label={labels.printPacket} />
        </div>
      </header>

      <section className="application-packet-section" aria-labelledby="packet-proof-title">
        <h2 id="packet-proof-title">{labels.packetProofSnapshot}</h2>
        <div className="application-packet-proof">
          {packet.proof.map((item) => (
            <a className="application-packet-proof-item" href={item.href} key={item.id}>
              <small>{item.id}</small>
              <h3>{item.claim}</h3>
              <p>{item.evidence}</p>
              <span>{item.boundary}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="application-packet-section" aria-labelledby="packet-focus-title">
        <h2 id="packet-focus-title">{labels.packetInterviewFocus}</h2>
        <ol className="application-packet-list">
          {packet.interviewFocus.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </section>

      <section className="application-packet-section" aria-labelledby="packet-boundaries-title">
        <h2 id="packet-boundaries-title">{labels.packetBoundaries}</h2>
        <ul className="application-packet-list">
          {packet.boundaries.map((boundary) => (
            <li key={boundary}>{boundary}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
