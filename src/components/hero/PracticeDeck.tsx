"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";

type Lang = "en" | "zh";

type DeckCard = {
  id: string;
  kind: Record<Lang, string>;
  stamp: Record<Lang, string>;
  date: string;
  project: Record<Lang, string>;
  body?: Record<Lang, string[]>;
  sketch?: boolean;
};

const DECK: DeckCard[] = [
  {
    id: "spec",
    kind: { en: "Pre-test predictions", zh: "测试前预测" },
    stamp: { en: "Vigil · spec freeze", zh: "Vigil · 规格冻结" },
    date: "2026.08.04",
    project: { en: "Vigil", zh: "Vigil" },
    body: {
      en: [
        "Three design questions · six switchable variants.",
        "Predictions written down before anyone touches the build.",
        "140 synthetic emails, gated so confidence cannot predict the errors.",
        "→ rule: if confidence starts predicting error, the build fails.",
      ],
      zh: [
        "三个设计问题 · 六个可切换变体。",
        "预测在任何人碰到实现之前就先写下来。",
        "140 封合成邮件，设了闸门：置信度不能预测错在哪。",
        "→ 规则：一旦置信度能预测错误，build 就挂掉。",
      ],
    },
  },
  {
    id: "thinkaloud",
    kind: { en: "Think-aloud session note", zh: "出声思考记录" },
    stamp: { en: "UQ Connect · Iteration 2", zh: "UQ Connect · 第二轮" },
    date: "2025.09.17",
    project: { en: "UQ Connect", zh: "UQ Connect" },
    body: {
      en: [
        "Moderated · working prototype · thinking out loud",
        "“it shows I’m attending this. Oh wait, but it’s still clickable”",
        "“Can I go to the previous page? How can I do that?”",
        "→ 3 Oct: stop patching, redraw the structure on paper",
      ],
      zh: [
        "主持式 · 可运行原型 · 出声思考",
        "「它显示我已经报名了。等等，可是还能点」",
        "「我能回上一页吗？要怎么回？」",
        "→ 10/03：不再打补丁，回到纸上重画结构",
      ],
    },
  },
  {
    id: "sketch",
    kind: { en: "Wireframe sketch", zh: "线框草图" },
    stamp: { en: "Spectra Lens · v3", zh: "Spectra Lens · v3" },
    date: "2024.09.09",
    project: { en: "Spectra Lens", zh: "Spectra Lens" },
    sketch: true,
  },
  {
    id: "gate",
    kind: { en: "Style gate review", zh: "风格闸门审查" },
    stamp: { en: "Hoop Dream · batch 6", zh: "Hoop Dream · 第六批" },
    date: "2026.05.13",
    project: { en: "Hoop Dream", zh: "Hoop Dream" },
    body: {
      en: [
        "299 assets · six batches · one written art bible",
        "The gate carries an explicit rejected-style list, not a vibe",
        "A reject goes back as a prompt edit, never a hand fix",
        "→ consistency has to come from the pipeline, not from any one asset.",
      ],
      zh: [
        "299 张资产 · 六个批次 · 一份写下来的美术圣经",
        "闸门带着明确的「拒绝风格」清单，不是靠感觉",
        "被拒的批次改提示词重跑，不手工修图",
        "→ 一致性得来自这条管线，而不是某一张图。",
      ],
    },
  },
  {
    id: "ship",
    kind: { en: "Build note", zh: "实现记录" },
    stamp: { en: "Spectra Lens · injection", zh: "Spectra Lens · 样式注入" },
    date: "2026.01.08",
    project: { en: "Spectra Lens", zh: "Spectra Lens" },
    body: {
      en: [
        "Injected the stylesheet. Worked on the docs site, failed on the news site.",
        "Inline styles and high-specificity selectors win by default.",
        "Single-page apps re-render the whole thing away on navigation.",
        "→ re-apply on route change, not only on load.",
      ],
      zh: [
        "把样式表注进去。文档站可以，新闻站直接失效。",
        "内联样式和高优先级选择器默认就赢过你。",
        "单页应用一切换路由，注入的东西整个被重新渲染掉。",
        "→ 路由变化时要重新应用，不能只在加载时跑一次。",
      ],
    },
  },
];

type DragState = { sx: number; sy: number; x: number; y: number } | null;
type ReleasedState = { dir: number; t: number } | null;

export function PracticeDeck() {
  const localeRaw = useLocale();
  const lang: Lang = localeRaw === "zh" ? "zh" : "en";
  const t = useTranslations("hero.deck");

  const [top, setTop] = useState(0);
  const [drag, setDrag] = useState<DragState>(null);
  const [released, setReleased] = useState<ReleasedState>(null);
  const cardRef = useRef<HTMLElement | null>(null);

  const advance = useCallback(() => {
    const dir = drag && drag.x < 0 ? -1 : 1;
    setReleased({ dir, t: Date.now() });
    window.setTimeout(() => {
      setTop((i) => (i + 1) % DECK.length);
      setReleased(null);
    }, 300);
    setDrag(null);
  }, [drag]);

  const onDown = (e: React.PointerEvent) => {
    setDrag({ sx: e.clientX, sy: e.clientY, x: 0, y: 0 });
  };

  useEffect(() => {
    if (!drag) return;
    const onMove = (e: PointerEvent) => {
      setDrag((cur) =>
        cur ? { ...cur, x: e.clientX - cur.sx, y: e.clientY - cur.sy } : cur,
      );
    };
    const onUp = () => {
      setDrag((cur) => {
        if (!cur) return cur;
        if (Math.abs(cur.x) > 80) {
          const dir = cur.x < 0 ? -1 : 1;
          setReleased({ dir, t: Date.now() });
          window.setTimeout(() => {
            setTop((i) => (i + 1) % DECK.length);
            setReleased(null);
          }, 300);
        }
        return null;
      });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [drag]);

  return (
    <div className="hero-deck-wrap">
      <div className="hero-deck-ruler" aria-hidden="true">
        <div className="ruler-nums">
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i}>{i * 10}</span>
          ))}
        </div>
        <div className="ruler-ticks">
          {Array.from({ length: 51 }).map((_, i) => (
            <span key={i} className={i % 10 === 0 ? "big" : i % 5 === 0 ? "mid" : ""} />
          ))}
        </div>
      </div>

      <div className="hero-deck" role="group" aria-label={t("label")}>
        {DECK.map((c, i) => {
          const offset = (i - top + DECK.length) % DECK.length;
          if (offset > 4) return null;
          const isTop = offset === 0;
          const isReleased = isTop && !!released;
          const dragX = isTop && drag ? drag.x : 0;
          const dragY = isTop && drag ? drag.y * 0.3 : 0;
          const fallbackRot = [-2.5, 1.5, -1, 2, -0.5][offset] ?? 0;
          const rot = isReleased
            ? (released as ReleasedState)!.dir * 28
            : isTop && drag
              ? drag.x * 0.05
              : fallbackRot;
          const dy = offset * 6;
          const scale = 1 - offset * 0.03;
          const translateX = isReleased
            ? (released as ReleasedState)!.dir * 420
            : dragX + offset * 4;

          return (
            <article
              key={c.id}
              className={`deck-card ${isTop ? "top" : ""} ${isReleased ? "released" : ""}`}
              style={{
                zIndex: 10 - offset,
                transform: `translate(${translateX}px, ${dy + dragY}px) rotate(${rot}deg) scale(${scale})`,
                opacity: offset > 3 ? 0 : 1,
                transition:
                  drag && isTop
                    ? "none"
                    : "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s",
              }}
              onPointerDown={isTop ? onDown : undefined}
              onClick={isTop && !drag ? advance : undefined}
              ref={
                isTop
                  ? (el) => {
                      cardRef.current = el;
                    }
                  : undefined
              }
              aria-hidden={!isTop}
            >
              <DeckCardContent card={c} lang={lang} />
              {isTop && (
                <div className="deck-hint" aria-hidden="true">
                  <span>{t("hint")}</span>
                  <svg width="34" height="12" viewBox="0 0 34 12" fill="none">
                    <path
                      d="M2 6 L32 6 M26 2 L32 6 L26 10"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </article>
          );
        })}

        <div className="deck-counter" aria-live="polite">
          <span>{String(top + 1).padStart(2, "0")}</span>
          <span className="sep">/</span>
          <span>{String(DECK.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}

function DeckCardContent({ card, lang }: { card: DeckCard; lang: Lang }) {
  return (
    <>
      <header className="dc-head">
        <span className="dc-kind">{card.kind[lang]}</span>
        <span className="dc-date">{card.date}</span>
      </header>
      <div className="dc-stamp">{card.stamp[lang]}</div>

      {card.sketch ? (
        <DeckSketch lang={lang} />
      ) : (
        <ul className="dc-body">
          {card.body?.[lang].map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      )}

      <footer className="dc-foot">
        <span className="dc-dot" />
        <span>{card.project[lang]}</span>
      </footer>
    </>
  );
}

// The three callouts and the aria-label were hard-coded English, so they never
// went through messages and stayed English on the zh homepage.
function DeckSketch({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  return (
    <div className="dc-sketch" aria-label={zh ? "线框草图" : "Wireframe sketch"}>
      <svg viewBox="0 0 300 200" fill="none">
        <rect x="90" y="14" width="120" height="172" rx="14" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <rect x="125" y="20" width="50" height="4" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
        <rect x="100" y="34" width="100" height="68" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="105" y1="45" x2="175" y2="45" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
        <line x1="105" y1="55" x2="165" y2="55" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
        <line x1="105" y1="65" x2="185" y2="65" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
        <circle cx="150" cy="68" r="16" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <line x1="134" y1="68" x2="166" y2="68" stroke="currentColor" strokeWidth="1" />
        <line x1="150" y1="52" x2="150" y2="84" stroke="currentColor" strokeWidth="1" />
        <rect x="100" y="112" width="100" height="26" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <line x1="106" y1="120" x2="150" y2="120" stroke="currentColor" strokeWidth="1" />
        <line x1="106" y1="128" x2="170" y2="128" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="150" cy="162" r="14" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <circle cx="150" cy="162" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
        <text x="18" y="72" fontFamily="var(--font-hand)" fontSize="13" fill="currentColor">
          {zh ? "实时画面" : "live feed"}
        </text>
        <path d="M52 70 L88 66" stroke="currentColor" strokeWidth="0.8" />
        <text x="218" y="126" fontFamily="var(--font-hand)" fontSize="13" fill="currentColor">
          {zh ? "色名" : "color name"}
        </text>
        <path d="M210 122 L204 124" stroke="currentColor" strokeWidth="0.8" />
        <text x="218" y="166" fontFamily="var(--font-hand)" fontSize="13" fill="currentColor">
          {zh ? "振动" : "haptic"}
        </text>
        <path d="M210 162 L170 162" stroke="currentColor" strokeWidth="0.8" />
        <text x="14" y="190" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor" opacity="0.7">
          spectra · viewer · v3 · 0909
        </text>
      </svg>
    </div>
  );
}
