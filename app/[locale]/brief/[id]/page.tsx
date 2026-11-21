import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseBySlug } from "@/lib/cases/registry";
import type { CaseRecord, RoleTrack } from "@/lib/cases/schema";
import { localizeInternalHref } from "@/lib/locale-href";
import { getInterviewDecisionRoom, type ProofLocale } from "@/lib/portfolio-proof";
import { buildHiringDeck } from "@/lib/presentation/build-deck";
import { PresentationTrigger } from "@/components/presentation/PresentationTrigger";
import {
  BriefPayloadSchema,
  decodeStatelessBrief,
  isShortBriefId,
  type BriefPayload,
} from "@/lib/server/brief-codec";
import { isKvConfigured, kvGetJson, kvRecordBriefView } from "@/lib/server/kv";

export const dynamic = "force-dynamic";

interface BriefPageProps {
  params: Promise<{ locale: string; id: string }>;
}

const ROLE_LABELS: Record<RoleTrack, { en: string; zh: string }> = {
  "ai-ux": { en: "AI UX Designer", zh: "AI UX 设计师" },
  "design-eng": { en: "Design Engineer", zh: "设计工程师" },
  product: { en: "Product Designer", zh: "产品设计师" },
  interaction: { en: "Interaction Designer", zh: "交互设计师" },
};

async function resolveBrief(
  rawId: string
): Promise<{ payload: BriefPayload; mode: "kv" | "stateless"; viewsCount: number | null } | null> {
  const id = decodeURIComponent(rawId);
  if (id.startsWith("s_")) {
    const decoded = decodeStatelessBrief(id, process.env.PORTFOLIO_ADMIN_SECRET);
    return decoded ? { payload: decoded, mode: "stateless", viewsCount: null } : null;
  }

  if (!isShortBriefId(id) || !isKvConfigured()) {
    return null;
  }

  const stored = await kvGetJson<unknown>(`brief:v1:${id}`);
  const parsed = BriefPayloadSchema.safeParse(stored);
  if (!parsed.success) return null;

  const recorded = await kvRecordBriefView(id);
  return {
    payload: parsed.data,
    mode: "kv",
    viewsCount: recorded?.count ?? null,
  };
}

export async function generateMetadata({ params }: BriefPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const resolved = await resolveBrief(id);
  const isZh = locale === "zh";

  if (!resolved) {
    return {
      title: isZh ? "未找到定向简报" : "Brief not found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: isZh
      ? `${resolved.payload.company} · 定制岗位简报`
      : `${resolved.payload.company} · Tailored Portfolio Brief`,
    description: resolved.payload.intro,
    robots: { index: false, follow: false },
  };
}

export default async function TailoredBriefPage({ params }: BriefPageProps) {
  const { locale, id } = await params;
  const resolved = await resolveBrief(id);
  if (!resolved) {
    notFound();
  }

  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const isZh = proofLocale === "zh";
  const { payload, mode, viewsCount } = resolved;
  const roleLabel = ROLE_LABELS[payload.roleTrack][proofLocale];

  const selectedCases: CaseRecord[] = payload.slugs
    .map((slug) => getCaseBySlug(slug))
    .filter((item): item is CaseRecord => item !== undefined);

  const room = getInterviewDecisionRoom(proofLocale);
  const deck = buildHiringDeck({
    room,
    cases: selectedCases,
    locale: proofLocale,
    customIntro: payload.intro,
    deckTitle: `${payload.company} · ${roleLabel}`,
  });

  return (
    <main className="page" data-screen-label="09 Brief">
      <section className="section container case-sim-section">
        <div className="case-sim-shell">
          <header className="case-sim-head">
            <div className="case-sim-head-copy">
              <div className="label">
                {isZh ? `定向投递简报 · ${payload.company}` : `Tailored brief · ${payload.company}`}
              </div>
              <h1 style={{ margin: "var(--s-2) 0" }}>
                {payload.company} — {roleLabel}
              </h1>
              <p className="case-sim-prompt">{payload.intro}</p>
            </div>
            <div className="lab-pill-row">
              <PresentationTrigger deck={deck} locale={proofLocale} className="btn btn-primary" />
              <Link
                href={localizeInternalHref(`/contact?role=${payload.roleTrack}`, proofLocale)}
                className="btn btn-ghost"
              >
                {isZh ? "预约沟通" : "Contact Lewis"}
              </Link>
            </div>
          </header>

          <div className="case-sim-stage proc-stage">
            <div className="v3-card-grid">
              {selectedCases.map((record, index) => {
                const card = record.card[proofLocale];
                return (
                  <article key={record.slug} className="sim-field">
                    <div className="sim-scenario-head">
                      <span className="tag">0{index + 1}</span>
                      <span className="eyebrow">{card.kicker}</span>
                    </div>
                    <h2 style={{ margin: 0, fontSize: "20px" }}>{card.title}</h2>
                    <p className="case-sim-prompt">{card.sub}</p>
                    <div className="sim-segmented">
                      {[card.m1, card.m2].filter(Boolean).map((metric) => (
                        <span key={metric} className="tag">
                          {metric}
                        </span>
                      ))}
                    </div>
                    <div>
                      <Link
                        href={localizeInternalHref(`/projects/${record.slug}`, proofLocale)}
                        className="btn btn-ghost"
                      >
                        {isZh ? "阅读完整案例 →" : "Inspect full case →"}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <footer className="case-sim-takeaway">
            <span className="case-sim-takeaway-label">
              {mode === "kv"
                ? isZh
                  ? "KV 匿名回执"
                  : "Anonymous KV receipt"
                : isZh
                  ? "无后端签名链接"
                  : "Stateless brief"}
            </span>
            <p>
              {mode === "kv" && viewsCount !== null
                ? isZh
                  ? `累计匿名阅读 ${viewsCount} 次（零 IP / UA / PII 记录）。此页面已设置 noindex，不会被搜索引擎收录。`
                  : `Anonymous opens recorded: ${viewsCount} (zero IP, UA, or PII stored). Indexed exclusion (noindex) active.`
                : isZh
                  ? "当前为零配置静态解码链接，不记录访问次数；已设置 noindex，仅限持链人访问。"
                  : "Zero-config stateless brief link (no view counters stored). Search indexing disabled (noindex)."}
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
