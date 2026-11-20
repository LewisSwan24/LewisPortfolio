"use client";

import { useState, useRef, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useGsapContext } from "@/hooks/useGsapContext";
import { getGsap, MOTION_PRESETS } from "@/lib/motion/gsap";

type Lang = "en" | "zh";

type DeckCard = {
  id: string;
  kind: Record<Lang, string>;
  stamp: Record<Lang, string>;
  date: string;
  project: Record<Lang, string>;
  body: Record<Lang, string[]>;
};

const DECK: DeckCard[] = [
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
        "「上面显示我已经报名了。等等，可是还能点」",
        "「我能回上一页吗？要怎么回？」",
        "→ 10/03：不再打补丁，回到纸上重画结构",
      ],
    },
  },
  {
    id: "bible",
    kind: { en: "Art bible", zh: "美术圣经" },
    stamp: { en: "Hoop Dream · three bibles", zh: "Hoop Dream · 三份规范" },
    date: "2026.05.01",
    project: { en: "Hoop Dream", zh: "Hoop Dream" },
    body: {
      en: [
        "Three bibles, split by canvas: logos · sprites · scenes",
        "A written rejected-style list, so the eye has a test",
        "Laid side by side, the logos had converged: two set rules",
        "→ a script can read the manifest; style still needs a person.",
      ],
      zh: [
        "三份规范，按画布尺寸分开：队徽 · 人物 · 场景",
        "写下来的「拒绝风格」清单，让肉眼有据可查",
        "队徽并排一摆就看出趋同，补上两条整组规则",
        "→ 脚本读得了清单，风格还得靠人看。",
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
        "单页应用一切换路由，重新渲染就把注入的东西冲掉了。",
        "→ 路由变化时要重新应用，不能只在加载时跑一次。",
      ],
    },
  },
  {
    id: "scope",
    kind: { en: "Commit log", zh: "提交记录" },
    stamp: { en: "PriceWise · 5,884 lines, one commit", zh: "PriceWise · 单次提交 5884 行" },
    date: "2026.03.01",
    project: { en: "PriceWise", zh: "PriceWise" },
    body: {
      en: [
        "A v1 API, AI function calling, i18n, price prediction, a social layer.",
        "The feature list was AI-generated planning, not anything a user asked for.",
        "Stopped the next day for five months. The scope never came back down.",
        "→ looking back, an app with no users should not have kept growing.",
      ],
      zh: [
        "v1 接口、AI 函数调用、双语、价格预测，还有一层社交功能。",
        "功能清单是 AI 生成的规划，不是从「用户要什么」推出来的。",
        "第二天停下，五个月没有再碰，范围也没有缩回去。",
        "→ 回头看，没有用户的应用不该继续长下去。",
      ],
    },
  },
  {
    id: "critique",
    kind: { en: "Critique note", zh: "评图记录" },
    stamp: { en: "Gap Mapper · the turn", zh: "走夜路 · 方向转变" },
    date: "2026 · S1",
    project: { en: "Perception Gap Mapper", zh: "走夜路" },
    body: {
      en: [
        "What came back was two design problems, not a list of features to fix.",
        "“Safety painted as binary” — the interface says out loud where is safe.",
        "“Responsibility misplaced” — asking women to change their behaviour again.",
        "→ the first thing I changed was not a screen, it was the reader.",
      ],
      zh: [
        "评图给的是两个设计问题，不是一份待修的功能清单。",
        "「把安全画成二元」：界面亲口说出哪里安全、哪里不安全。",
        "「责任错位」：又一次在要求女性调整自己的行为。",
        "→ 我改的第一件事不是界面，是读者。",
      ],
    },
  },
  {
    id: "threshold",
    kind: { en: "Proposal draft, mostly AI-written", zh: "提案草稿，多半由 AI 起草" },
    stamp: { en: "Fietspad · warning thresholds", zh: "Fietspad · 提示阈值" },
    date: "2025 · S2",
    project: { en: "Requirements into Rules", zh: "把要求变成规则" },
    body: {
      en: [
        "“warn in time” → 150–250 m, by audio and haptics, never taking the eyes",
        "“usable while riding” → tap targets at least 48 px",
        "“take a safer route” → separated segments up, paint-only lanes down",
        "→ the button reads See safer routes. No data supports “safest”.",
      ],
      zh: [
        "「提前警告」→ 150–250 m，走音频与触觉，不占视线",
        "「骑车时也点得到」→ 点击区不小于 48px",
        "「走更安全的路」→ 分隔路段加权，只有油漆的车道降权",
        "→ 按钮写 See safer routes。没有数据能支撑「最安全」。",
      ],
    },
  },
];

const REST_ROTATIONS = [-2.5, 1.5, -1, 2, -0.5] as const;
const OFF = 420;
const COMMIT = 90;

type Leaving = { dir: 1 | -1 } | null;

export function PracticeDeck() {
  const localeRaw = useLocale();
  const lang: Lang = localeRaw === "zh" ? "zh" : "en";
  const t = useTranslations("hero.deck");
  const reduce = useReducedMotion();

  const [top, setTop] = useState(0);
  const [leaving, setLeaving] = useState<Leaving>(null);
  const [entering, setEntering] = useState<1 | -1 | null>(null);
  const busy = useRef(false);
  const hasInteracted = useRef(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    active: boolean;
    moved: boolean;
    startX: number;
    startTime: number;
    lastX: number;
    el: HTMLElement | null;
  }>({ active: false, moved: false, startX: 0, startTime: 0, lastX: 0, el: null });

  const step = useCallback(
    (delta: 1 | -1) => {
      if (busy.current) return;
      hasInteracted.current = true;
      busy.current = true;
      window.setTimeout(
        () => {
          busy.current = false;
        },
        reduce ? 0 : 260
      );

      if (reduce) {
        setTop((i) => (i + delta + DECK.length) % DECK.length);
        return;
      }

      if (delta === 1) {
        setLeaving({ dir: 1 });
        window.setTimeout(() => {
          setTop((i) => (i + 1) % DECK.length);
          setLeaving(null);
        }, 240);
      } else {
        setTop((i) => (i - 1 + DECK.length) % DECK.length);
        setEntering(-1);
        window.setTimeout(() => setEntering(null), 20);
      }
    },
    [reduce]
  );

  useGsapContext(
    deckRef,
    ({ gsap }) => {
      const cards = deckRef.current?.querySelectorAll<HTMLElement>("[data-deck-offset]");
      if (!cards) return;

      cards.forEach((card) => {
        const offset = Number(card.dataset.deckOffset ?? "0");
        const isTop = offset === 0;
        const isLeaving = isTop && Boolean(leaving);
        const isEntering = isTop && entering !== null;
        const restRot = REST_ROTATIONS[offset] ?? 0;

        const target = isLeaving
          ? {
              x: leaving!.dir * OFF,
              y: 84,
              rotation: leaving!.dir * 24,
              scale: 0.96,
              opacity: 0,
            }
          : isEntering
            ? {
                x: entering! * OFF,
                y: 84,
                rotation: entering! * 24,
                scale: 0.96,
                opacity: 0,
              }
            : {
                x: offset * 4,
                y: offset * 6,
                rotation: restRot,
                scale: 1 - offset * 0.03,
                opacity: offset > 3 ? 0 : 1,
              };

        if (reduce || !hasInteracted.current || isEntering) {
          gsap.set(card, target);
        } else if (isLeaving) {
          gsap.to(card, {
            ...target,
            duration: MOTION_PRESETS.deckThrow.duration,
            ease: MOTION_PRESETS.deckThrow.ease,
            overwrite: "auto",
          });
        } else {
          gsap.to(card, {
            ...target,
            duration: MOTION_PRESETS.stackRipple.duration,
            ease: MOTION_PRESETS.stackRipple.ease,
            delay: offset * 0.035,
            overwrite: "auto",
          });
        }
      });
    },
    [top, leaving, entering, reduce]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      hasInteracted.current = true;
      setTop(0);
    }
  };

  const onTopPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startTime: performance.now(),
      lastX: e.clientX,
      el: e.currentTarget,
    };
  };

  const onTopPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const d = dragRef.current;
    if (!d.active || !d.el) return;
    d.lastX = e.clientX;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 8) {
      d.moved = true;
      const { gsap } = getGsap();
      gsap.set(d.el, { x: dx * 0.45, rotation: -2.5 + dx * 0.04, scale: 1.02 });
    }
  };

  const onTopPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    const d = dragRef.current;
    if (!d.active) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const dx = d.lastX - d.startX;
    const elapsed = Math.max(1, performance.now() - d.startTime);
    const velocity = Math.abs(dx / elapsed) * 1000;
    const wasMoved = d.moved;
    const el = d.el;
    d.active = false;
    d.moved = false;
    d.el = null;

    if (!wasMoved) {
      step(1);
      return;
    }

    if (Math.abs(dx) > COMMIT || velocity > 520) {
      step(dx < 0 ? -1 : 1);
    } else if (el) {
      const { gsap } = getGsap();
      gsap.to(el, {
        x: 0,
        y: 0,
        rotation: REST_ROTATIONS[0],
        scale: 1,
        duration: MOTION_PRESETS.stackRipple.duration,
        ease: MOTION_PRESETS.stackRipple.ease,
        overwrite: "auto",
      });
    }
  };

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

      <div
        ref={deckRef}
        className="hero-deck"
        role="group"
        aria-roledescription={t("roledesc")}
        aria-label={t("label")}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {DECK.map((c, i) => {
          const offset = (i - top + DECK.length) % DECK.length;
          if (offset > 4) return null;
          const isTop = offset === 0;
          const isLeaving = isTop && Boolean(leaving);
          const restRot = REST_ROTATIONS[offset] ?? 0;

          return (
            <article
              key={c.id}
              data-deck-offset={offset}
              className={`deck-card ${isTop ? "top" : ""} ${isLeaving ? "released" : ""}`}
              style={{
                zIndex: 10 - offset,
                transform: `translate3d(${offset * 4}px, ${offset * 6}px, 0) rotate(${restRot}deg) scale(${1 - offset * 0.03})`,
                opacity: offset > 3 ? 0 : 1,
              }}
              onPointerDown={isTop ? onTopPointerDown : undefined}
              onPointerMove={isTop ? onTopPointerMove : undefined}
              onPointerUp={isTop ? onTopPointerUp : undefined}
              onPointerCancel={isTop ? onTopPointerUp : undefined}
              onClick={isTop && reduce ? () => step(1) : undefined}
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
          <span className="sr-only">
            {" · "}
            {DECK[top].stamp[lang]}
          </span>
        </div>
      </div>

      <p className="deck-kbd" aria-hidden="true">
        {t("kbd")}
      </p>
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

      <ul className="dc-body">
        {card.body[lang].map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>

      <footer className="dc-foot">
        <span className="dc-dot" />
        <span>{card.project[lang]}</span>
      </footer>
    </>
  );
}
