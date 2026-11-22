import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { PrintDeckSelector, type RoleDeckId } from "@/components/brief/PrintDeckSelector";
import { getListedCases } from "@/lib/cases/registry";
import { encodeQrMatrix, qrMatrixToPath } from "@/lib/pdf/qr-svg";
import { getCaseDepth } from "@/lib/proof/case-depth";
import type { ProofLocale } from "@/lib/portfolio-proof";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as ProofLocale;
  return {
    title: locale === "zh" ? "设计论证评注打印稿 · Lewis Dong" : "Editorial Critique Print Dossier · Lewis Dong",
    robots: { index: false, follow: false },
  };
}

const ROLE_PRESETS: Record<
  RoleDeckId,
  {
    enTitle: string;
    zhTitle: string;
    cases: string[];
  }
> = {
  "ai-product-engineer": {
    enTitle: "AI Product & Design Engineer — Refusal Boundaries & Verification Dossier",
    zhTitle: "AI 产品与设计工程师 — 拒绝边界与真原型论证手册",
    cases: ["walkie", "lamplight", "autofill"],
  },
  "design-engineer": {
    enTitle: "Design Engineer — Systems Grammar & Interactive Prototyping Dossier",
    zhTitle: "设计工程师 — 一致性规则与交互工程论证手册",
    cases: ["grassland", "walkie", "autofill"],
  },
  "hardware-interaction": {
    enTitle: "Hardware × Physical Interaction — Embodied & Social Withdrawal Dossier",
    zhTitle: "软硬协同交互设计师 — 实体触发与社交退场论证手册",
    cases: ["walkie", "maze", "onthebeat"],
  },
};

export default async function BriefPrintPage({
  searchParams,
}: {
  searchParams?: Promise<{ role?: string; cases?: string }>;
}) {
  const rawLocale = await getLocale();
  const locale: ProofLocale = rawLocale === "zh" ? "zh" : "en";
  const isZh = locale === "zh";
  const query = await searchParams;

  const roleParam = query?.role;
  const activeRole: RoleDeckId =
    roleParam === "design-engineer" || roleParam === "hardware-interaction"
      ? roleParam
      : "ai-product-engineer";

  const listed = getListedCases();
  const preset = ROLE_PRESETS[activeRole];

  const requestedSlugs = query?.cases
    ? query.cases
        .split(",")
        .map((s) => s.trim())
        .filter((s) => listed.some((c) => c.slug === s))
    : [];

  const finalSlugs = requestedSlugs.length > 0 ? requestedSlugs : preset.cases;
  const selectedRecords = finalSlugs
    .map((slug) => listed.find((r) => r.slug === slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <main className="page brief-print-main" data-screen-label="10 Print Dossier">
      <PrintDeckSelector
        locale={locale}
        activeRole={activeRole}
        allSlugs={listed.map((r) => ({ slug: r.slug, title: r.card[locale].title }))}
        selectedSlugs={finalSlugs}
      />

      <div className="container brief-print-stack">
        {selectedRecords.map((record, index) => {
          const decision = record.designDecisions?.[0];
          const secondDecision = record.designDecisions?.[1];
          const depth = getCaseDepth(record.slug, locale);
          const card = record.card[locale];
          const liveUrl = `${siteConfig.url}/${locale}/projects/${record.slug}${
            record.interactiveDemo ? "#interactive-demo" : "#design-decisions"
          }`;
          const qr = qrMatrixToPath(encodeQrMatrix(liveUrl), 2);

          return (
            <article className="brief-print-sheet" key={record.slug}>
              <header className="brief-print-header">
                <div>
                  <span className="eyebrow">
                    {isZh ? preset.zhTitle : preset.enTitle} · {String(index + 1).padStart(2, "0")}
                  </span>
                  <h1>{card.title}</h1>
                  <p className="brief-print-sub">{card.sub}</p>
                </div>
                <div className="brief-print-meta">
                  <span>{card.kicker}</span>
                  <span>{card.date}</span>
                  <span>Lewis Dong · {siteConfig.author.email}</span>
                </div>
              </header>

              {/* >= 60% width allocated to Design Critique & Rationale; ~35% to Limits + QR */}
              <div className="brief-print-grid">
                <section className="brief-print-critique">
                  {decision && (
                    <div className="brief-print-block">
                      <span className="eyebrow">
                        {isZh ? "01 · 核心设计命题" : "01 · Core Design Tradeoff"}
                      </span>
                      <h2>{decision.decisionTitle[locale]}</h2>
                      <p>
                        <strong>{isZh ? "人的摩擦：" : "Human tension: "}</strong>
                        {decision.humanTension[locale]}
                      </p>
                      <div className="brief-print-rejected">
                        <strong>{isZh ? "被否决的常规方案：" : "Alternatives rejected:"}</strong>
                        <ul>
                          {decision.rejectedAlternatives.map((alt) => (
                            <li key={alt.option[locale]}>
                              <strong>{alt.option[locale]}</strong> — {alt.flaw[locale]}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p>
                        <strong>{isZh ? "最终设计取舍：" : "Chosen tradeoff: "}</strong>
                        {decision.chosenTradeoff[locale]}
                      </p>
                    </div>
                  )}

                  {secondDecision && (
                    <div className="brief-print-block" style={{ marginTop: 12 }}>
                      <span className="eyebrow">
                        {isZh ? "02 · 延伸交互规则" : "02 · Secondary Interaction Rule"}
                      </span>
                      <h3 style={{ fontSize: 15, margin: "4px 0" }}>
                        {secondDecision.decisionTitle[locale]}
                      </h3>
                      <p style={{ margin: 0 }}>{secondDecision.chosenTradeoff[locale]}</p>
                    </div>
                  )}
                </section>

                <aside className="brief-print-sidebar">
                  <div className="brief-print-side-box">
                    <span className="eyebrow">{isZh ? "角色与关键度量" : "Role & Scope"}</span>
                    <p style={{ fontSize: 12, margin: "4px 0 8px" }}>{card.role}</p>
                    <ul className="brief-print-metrics">
                      <li>{card.m1}</li>
                      <li>{card.m2}</li>
                      <li>{card.m3}</li>
                    </ul>
                  </div>

                  {depth.limits[0] && (
                    <div className="brief-print-side-box">
                      <span className="eyebrow">{isZh ? "坦诚未测边界" : "Honest Scope & Limits"}</span>
                      <p style={{ fontSize: 12, margin: "4px 0" }}>{depth.limits[0].constraint}</p>
                      <p style={{ fontSize: 11, color: "var(--text-2)", margin: 0 }}>
                        {depth.limits[0].nextValidation}
                      </p>
                    </div>
                  )}

                  <div className="brief-print-qr-box">
                    <svg
                      width="84"
                      height="84"
                      viewBox={`0 0 ${qr.viewBoxSize} ${qr.viewBoxSize}`}
                      shapeRendering="crispEdges"
                      role="img"
                      aria-label={isZh ? `扫码打开 ${card.title} 在线原型` : `QR code for live ${card.title} prototype`}
                    >
                      <rect width={qr.viewBoxSize} height={qr.viewBoxSize} fill="#FCFBF8" />
                      <path d={qr.path} fill="#151412" />
                    </svg>
                    <div>
                      <span className="eyebrow">{isZh ? "扫码直达活原型" : "Scan for Live Prototype"}</span>
                      <p style={{ fontSize: 10, wordBreak: "break-all", margin: "4px 0 0", color: "var(--text-2)" }}>
                        {liveUrl}
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
