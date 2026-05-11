import Link from "next/link";
import { getProofUiLabels, type ProofUiLabels, type RolePacket } from "@/lib/proof";

interface RolePacketInterviewRouteProps {
  packet: RolePacket;
  labels?: ProofUiLabels;
}

export function RolePacketInterviewRoute({
  packet,
  labels = getProofUiLabels("en"),
}: RolePacketInterviewRouteProps) {
  return (
    <section className="role-packet-interview-route" aria-labelledby="role-packet-interview-title">
      <div className="label">{labels.interviewRoute}</div>
      <h2 id="role-packet-interview-title">{labels.interviewQuestions}</h2>
      <div className="role-packet-interview-items">
        {packet.interviewQuestions.map((answer) => (
          <article key={answer.id}>
            <h3>{answer.question}</h3>
            <p>{answer.answer}</p>
            <small>{answer.boundary}</small>
            <Link href={answer.evidenceHref}>{labels.inspectEvidence}</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
