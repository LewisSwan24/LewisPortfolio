"use client";

import { useId, useRef, useState } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import {
  RED_TEAM_LENS_IDS,
  RED_TEAM_LENS_META,
  type RedTeamDeck,
  type RedTeamLensId,
} from "@/data/critique/red-team";
import { VerifiedStatusBadge } from "@/components/case/deep/VerifiedStatusBadge";
import { resolveCaseEvidenceLink } from "@/lib/cases/case-toc";
import styles from "./red-team.module.css";

const SEVERITY_LABEL: Record<"blocking" | "high" | "watch", { en: string; zh: string }> = {
  blocking: { en: "Blocking Gate", zh: "阻断级门禁" },
  high: { en: "High Scrutiny", zh: "高敏追问" },
  watch: { en: "Watch Item", zh: "持续观测" },
};

export function RedTeamCritiquePanel({
  decks,
  locale,
  sectionId = "red-team-defense",
  allowSseProbe = true,
  currentSlug = "",
  sectionLabels = {},
  probeVariant = "primary",
  sectionAliases = {},
  headingLevel = 2,
  headingText,
}: {
  decks: readonly RedTeamDeck[];
  locale: "en" | "zh";
  sectionId?: string;
  allowSseProbe?: boolean;
  /** The case page this panel renders on; its own evidence links become in-page anchors. */
  currentSlug?: string;
  /** Section id to the label the page TOC uses for it. */
  sectionLabels?: Readonly<Record<string, string>>;
  /** Case pages keep one primary action, so the probe drops to a ghost button there. */
  probeVariant?: "primary" | "ghost";
  /** Old section ids that now live under another id on this page. */
  sectionAliases?: Readonly<Record<string, string>>;
  /** Inside the case appendix the section sits one level down, under a plainer title. */
  headingLevel?: 2 | 3;
  headingText?: string;
}) {
  const HeadingTag = headingLevel === 3 ? "h3" : "h2";

  const [activeSlug, setActiveSlug] = useState<string>(decks[0]?.slug ?? "walkie");
  const [activeLens, setActiveLens] = useState<RedTeamLensId>("design-director");
  const [sseLog, setSseLog] = useState<string>("");
  const [sseBusy, setSseBusy] = useState(false);

  const baseId = useId();
  const isZh = locale === "zh";
  const tabRefs = useRef<Partial<Record<RedTeamLensId, HTMLButtonElement | null>>>({});

  const activeDeck = decks.find((d) => d.slug === activeSlug) ?? decks[0];
  if (!activeDeck) return null;

  const activeEntry =
    activeDeck.lenses.find((l) => l.lens === activeLens) ?? activeDeck.lenses[0]!;
  const lensMeta = RED_TEAM_LENS_META[activeEntry.lens];
  const evidenceLink = resolveCaseEvidenceLink(activeEntry.evidenceHref, {
    currentSlug,
    sectionLabels,
    sectionAliases,
    locale,
  });

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIdx: number) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (currentIdx + 1) % RED_TEAM_LENS_IDS.length;
    else if (e.key === "ArrowLeft")
      nextIdx = (currentIdx - 1 + RED_TEAM_LENS_IDS.length) % RED_TEAM_LENS_IDS.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = RED_TEAM_LENS_IDS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      const targetId = RED_TEAM_LENS_IDS[nextIdx]!;
      setActiveLens(targetId);
      tabRefs.current[targetId]?.focus();
      tabRefs.current[targetId]?.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  };

  const runLiveCritiqueProbe = async () => {
    setSseBusy(true);
    setSseLog("");
    try {
      const res = await fetch("/api/ai/critique", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          query: activeEntry.challengeQuestion[locale],
          locale,
          caseSlug: activeDeck.slug,
        }),
      });
      const text = await res.text();
      const lines = text
        .split("\n")
        .filter((l) => l.startsWith("event:") || l.startsWith("data:"))
        .slice(0, 6);
      setSseLog(
        isZh
          ? `SSE 流式核验完成（${activeDeck.slug} · ${activeEntry.lens}）：\n${lines.join("\n")}`
          : `SSE grounded stream verified (${activeDeck.slug} · ${activeEntry.lens}):\n${lines.join("\n")}`
      );
    } catch {
      setSseLog(isZh ? "SSE 校验请求异常，已保留本地静态证据卡。" : "SSE probe unavailable; static evidence card active.");
    } finally {
      setSseBusy(false);
    }
  };

  return (
    <section
      id={sectionId}
      className={styles.panelSection}
      aria-labelledby={`${baseId}-heading`}
      data-testid="red-team-panel"
    >
      <header className={styles.header}>
        <div className={styles.headRow}>
          <span className={styles.eyebrow}>
            {isZh
              ? "四重对抗式红队答辩"
              : "4-Lens Adversarial Red-Team Defense"}
          </span>
          <VerifiedStatusBadge status={activeEntry.verifiedStatus} locale={locale} />
        </div>
        <HeadingTag id={`${baseId}-heading`} className={styles.heading}>
{headingText ?? (isZh
            ? `直面四个最棘手的质疑视角：${activeDeck.caseTitle.zh}`
            : `Adversarial Design Interrogation: ${activeDeck.caseTitle.en}`)}
</HeadingTag>
        <p className={styles.thesis}>
          <strong>{isZh ? "核心防守命题：" : "Core thesis: "}</strong>
          {activeDeck.executiveThesis[locale]}
        </p>
      </header>

      {decks.length > 1 && (
        <div
          className={styles.caseRow}
          role="group"
          aria-label={isZh ? "切换红队答辩案例" : "Select case study for red-team review"}
        >
          {decks.map((deck) => (
            <button
              key={deck.slug}
              type="button"
              className={styles.casePill}
              aria-pressed={deck.slug === activeDeck.slug}
              data-testid={`redteam-case-${deck.slug}`}
              onClick={() => {
                setActiveSlug(deck.slug);
                setSseLog("");
              }}
            >
              {deck.caseTitle[locale]}
            </button>
          ))}
        </div>
      )}

      <div
        role="tablist"
        aria-label={isZh ? "四位红队审稿人视角" : "Four adversarial reviewer lenses"}
        className={styles.tabList}
      >
        {RED_TEAM_LENS_IDS.map((lensId, idx) => {
          const selected = activeEntry.lens === lensId;
          return (
            <button
              key={lensId}
              ref={(el) => {
                tabRefs.current[lensId] = el;
              }}
              id={`${baseId}-lens-${lensId}`}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className={styles.lensTab}
              data-testid={`redteam-lens-${lensId}`}
              onClick={() => {
                setActiveLens(lensId);
                setSseLog("");
              }}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
            >
              {RED_TEAM_LENS_META[lensId].title[locale]}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        aria-labelledby={`${baseId}-lens-${activeEntry.lens}`}
        className={styles.cardWrap}
        data-testid="red-team-active-panel"
      >
        <p className={styles.personaNote}>{lensMeta.persona[locale]}</p>

        <article className={styles.challengeBox}>
          <div className={styles.challengeTop}>
            <span className={styles.eyebrow}>
              {isZh ? "红队尖锐发问" : "Adversarial Challenge"}
            </span>
            <span className={styles.severityPill}>{SEVERITY_LABEL[activeEntry.severity][locale]}</span>
          </div>
          <h3 className={styles.challengeQ}>{activeEntry.challengeQuestion[locale]}</h3>
        </article>

        <div className={styles.defenseGrid}>
          <article className={styles.defenseCell}>
            <h4>{isZh ? "实证防守回应" : "Empirical Defense"}</h4>
            <p>{activeEntry.empiricalDefense[locale]}</p>
          </article>
          <article className={styles.defenseCell}>
            <h4>{isZh ? "代码 / 硬件测试凭证" : "Code & Hardware Receipt"}</h4>
            <p>{activeEntry.codeOrTestReceipt[locale]}</p>
          </article>
        </div>

        <article className={styles.defenseCell}>
          <h4>{isZh ? "诚实保留的未验证假设" : "Unresolved Hypothesis (Honest Gap)"}</h4>
          <p>{activeEntry.unresolvedHypothesis[locale]}</p>
        </article>

        <div className={styles.footerBar}>
          {evidenceLink.inPage ? (
            <a href={evidenceLink.href} className="btn btn-ghost">
              {evidenceLink.label}
            </a>
          ) : (
            <Link href={activeEntry.evidenceHref} className="btn btn-ghost">
              {isZh ? "直达案例证据章节 ↗" : "Inspect source evidence in case ↗"}
            </Link>
          )}
          {allowSseProbe && (
            <button
              type="button"
              className={`btn ${probeVariant === "ghost" ? "btn-ghost" : "btn-primary"}`}
              disabled={sseBusy}
              data-testid="redteam-sse-trigger"
              onClick={() => void runLiveCritiqueProbe()}
            >
              {sseBusy
                ? isZh
                  ? "SSE 检索校验中..."
                  : "Streaming grounded check..."
                : isZh
                  ? "触发混合检索 SSE 核验 →"
                  : "Verify via Hybrid SSE Critique →"}
            </button>
          )}
        </div>

        {sseLog && (
          <pre className={styles.ssePreview} data-testid="redteam-sse-output">
            {sseLog}
          </pre>
        )}
      </div>
    </section>
  );
}
