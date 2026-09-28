import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { AI_TRUST_THREAD_ANCHOR, type AiTrustThread as AiTrustThreadData } from "@/lib/proof";

interface AiTrustThreadProps {
  thread: AiTrustThreadData;
}

/**
 * AI UX as a thread through several cases rather than one AI case. The intro
 * admits there is no finished AI-native product before any entry is shown,
 * every entry says who did the work, and the limit sentence closes the section.
 */
export function AiTrustThread({ thread }: AiTrustThreadProps) {
  return (
    <section
      id={AI_TRUST_THREAD_ANCHOR}
      className="ai-trust-thread"
      aria-labelledby="ai-trust-thread-title"
    >
      <div className="interview-section-head">
        <div>
          <div className="label">{thread.eyebrow}</div>
          <h2 id="ai-trust-thread-title">{thread.title}</h2>
        </div>
        <p>{thread.intro}</p>
      </div>
      <ol className="interview-evidence-list ai-trust-thread-list">
        {thread.entries.map((entry) => (
          <li className="interview-boundary-card ai-trust-thread-entry" key={entry.slug}>
            <small>{entry.who}</small>
            <h3>{entry.caseName}</h3>
            <p>{entry.body}</p>
            <Link href={entry.href}>{thread.linkLabel}</Link>
          </li>
        ))}
      </ol>
      <p className="ai-trust-thread-limit">{thread.limit}</p>
    </section>
  );
}
