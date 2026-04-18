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
    id: "interview",
    kind: { en: "Interview transcript", zh: "访谈转写" },
    stamp: { en: "Connect Circles · P04", zh: "Connect Circles · P04" },
    date: "2024.11.02",
    project: { en: "Connect Circles", zh: "Connect Circles" },
    body: {
      en: [
        "\"I have 800 WeChat contacts. I have nobody to have dinner with on Sunday.\"",
        "— What changed the definition of 'friend' between 18 and 24?",
        "Quantity metrics failed her. She wanted small, recurring.",
        "→ design signal: optimize for returning, not matching.",
      ],
      zh: [
        "「我微信有 800 个联系人。周日没一个能一起吃饭的。」",
        "— 18 到 24 岁之间，朋友的定义被什么改掉了？",
        "「数量」对她已经失效。她要的是「小而常」。",
        "→ 设计信号：为「重返」而非「匹配」做优化。",
      ],
    },
  },
  {
    id: "tree",
    kind: { en: "Tree test result", zh: "树测试结果" },
    stamp: { en: "UQ Connect · Round 2", zh: "UQ Connect · 第二轮" },
    date: "2024.05.17",
    project: { en: "UQ Connect", zh: "UQ Connect" },
    body: {
      en: [
        "n = 50 · 12 tasks · unmoderated",
        "Directness    82% (+ 24 pts vs. baseline)",
        "Findability   84% (+ 26 pts)",
        "Confusion: 'Money' ↔ 'My account' — rename + retest",
        "→ ship: rename to 'Fees & finance'",
      ],
      zh: [
        "n = 50 · 12 项任务 · 非主持",
        "直达率       82%（+ 24 pt，对比原版）",
        "可发现率     84%（+ 26 pt）",
        "混淆点：「Money」↔「My account」—— 改名重跑",
        "→ 落地：改为「Fees & finance」",
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
    id: "workshop",
    kind: { en: "Co-design note", zh: "共创笔记" },
    stamp: { en: "Connect Circles · WS2", zh: "Connect Circles · WS2" },
    date: "2024.12.08",
    project: { en: "Connect Circles", zh: "Connect Circles" },
    body: {
      en: [
        "8 participants · 2 hrs · mixed-culture",
        "Sticky exercise — 'What would make you say yes to a first meetup?'",
        "Top cluster: shared activity > shared identity",
        "Bottom cluster: 'forced small talk' dominates the fear list",
        "→ prompt: design meetups around doing, not introducing.",
      ],
      zh: [
        "8 位参与者 · 2 小时 · 跨文化混编",
        "便签练习 —— 「什么会让你愿意去参加一次初次见面？」",
        "主聚类：共同活动 > 共同身份",
        "次聚类：「被迫 small talk」是最被提到的恐惧",
        "→ 提示：把 meetup 设计成「一起做」而非「互相介绍」。",
      ],
    },
  },
  {
    id: "ship",
    kind: { en: "Ship note", zh: "上线记" },
    stamp: { en: "AI Interview Assistant", zh: "AI 面试助手" },
    date: "2024.06.20",
    project: { en: "AI Interview Assistant", zh: "AI 面试助手" },
    body: {
      en: [
        "v1.0 shipped to n=50 beta. First session retention: 94%.",
        "Opt-in for real-time filler-word feedback: 71%.",
        "One user emailed: 'I got the offer.'",
        "That's the metric.",
      ],
      zh: [
        "v1.0 推送给 n=50 的内测。首次会话留存：94%。",
        "选择开启「口癖实时提示」的比例：71%。",
        "一位用户发来邮件：「我拿到 offer 了。」",
        "那就是真正的指标。",
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
        <DeckSketch />
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

function DeckSketch() {
  return (
    <div className="dc-sketch" aria-label="Wireframe sketch">
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
        <text x="18" y="72" fontFamily="var(--font-hand)" fontSize="13" fill="currentColor">live feed</text>
        <path d="M52 70 L88 66" stroke="currentColor" strokeWidth="0.8" />
        <text x="218" y="126" fontFamily="var(--font-hand)" fontSize="13" fill="currentColor">color name</text>
        <path d="M210 122 L204 124" stroke="currentColor" strokeWidth="0.8" />
        <text x="218" y="166" fontFamily="var(--font-hand)" fontSize="13" fill="currentColor">haptic</text>
        <path d="M210 162 L170 162" stroke="currentColor" strokeWidth="0.8" />
        <text x="14" y="190" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor" opacity="0.7">
          spectra-lens · viewer · v3 · 0909
        </text>
      </svg>
    </div>
  );
}
