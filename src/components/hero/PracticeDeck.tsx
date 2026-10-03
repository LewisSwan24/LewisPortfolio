"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

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
  // The three cases added on 2026-08-13. Gap Mapper's and Fietspad's lines are
  // transcribed from the portfolio PDF rather than written for the card: the
  // critique on p12, and p31-32.
  //
  // PriceWise's lines came from the PDF's commit table on p23 and were
  // corrected on 2026-09-28 against the repository's own history. The
  // 5,884-line commit (78b36d1) was about a quarter social code, and nothing
  // was cut afterwards: the v1 routes moved to unversioned paths in August and
  // the social routes are still there. "Looking back" is Lewis's later
  // judgement, not his reason for stopping in March.
  //
  // Only PriceWise has a documented day. The other two are coursework and the
  // source records a semester, so they carry a semester — a precise-looking
  // date I cannot support is the same defect as any other invented figure.
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

/**
 * Motion, and why it is a spring rather than a curve.
 *
 * A cubic-bezier can only ease; it cannot overshoot and settle, and overshoot
 * is most of what reads as paper having weight. framer-motion is already a
 * dependency on this route, so the spring costs nothing extra in the bundle —
 * adding a second animation library for one hero component would.
 */
const SETTLE = { type: "spring", stiffness: 240, damping: 26, mass: 0.9 } as const;
const THROW = { type: "spring", stiffness: 190, damping: 22, mass: 0.7 } as const;
const INSTANT = { duration: 0 } as const;

// How far off-stage a card goes, and how far past the edge it has to be
// dragged before the throw commits rather than snapping back.
const OFF = 460;
const COMMIT = 90;

type Leaving = { dir: 1 | -1 } | null;

export function PracticeDeck() {
  const localeRaw = useLocale();
  const lang: Lang = localeRaw === "zh" ? "zh" : "en";
  const t = useTranslations("hero.deck");
  const reduce = useReducedMotion();

  const [top, setTop] = useState(0);
  // `leaving` is the card being thrown out; `entering` is a card arriving back
  // from off-stage when you step backwards. Going back has to bring a card in
  // from the side it left by — throwing the top card away in both directions
  // would make "back" look identical to "forward".
  const [leaving, setLeaving] = useState<Leaving>(null);
  const [entering, setEntering] = useState<1 | -1 | null>(null);
  const busy = useRef(false);

  const step = useCallback(
    (delta: 1 | -1) => {
      if (busy.current) return;
      busy.current = true;
      // The lock is released on its own timer, never from an animation
      // callback. requestAnimationFrame does not fire while the tab is hidden
      // or otherwise not compositing, so releasing there means a user who
      // switches tabs mid-turn comes back to a deck that is locked for good.
      // setTimeout still runs in a background tab — throttled, but it runs.
      window.setTimeout(() => {
        busy.current = false;
      }, reduce ? 0 : 260);

      if (reduce) {
        // No travel at all under reduced motion — the card is simply replaced.
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
        // Put the previous card on top already parked off-stage, then let the
        // next tick spring it home.
        setTop((i) => (i - 1 + DECK.length) % DECK.length);
        setEntering(-1);
        window.setTimeout(() => setEntering(null), 20);
      }
    },
    [reduce],
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
      setTop(0);
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

      {/* The deck itself takes focus, not the individual cards: a card that
          scrolls away under you is a poor focus target, and the whole point of
          the control is "step through the stack". Arrow keys and space step,
          Home returns to the first card. */}
      <div
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
          const isLeaving = isTop && !!leaving;
          const isEntering = isTop && entering !== null;
          // The resting stack: each card sits a little lower, a little smaller
          // and at its own angle, so the pile reads as loose paper.
          const restRot = [-2.5, 1.5, -1, 2, -0.5][offset] ?? 0;

          const target = isLeaving
            ? {
                x: leaving!.dir * OFF,
                y: 90, // it falls as it goes, rather than sliding flat
                rotate: leaving!.dir * 26,
                scale: 0.96,
                opacity: 0,
              }
            : isEntering
              ? { x: entering! * OFF, y: 90, rotate: entering! * 26, scale: 0.96, opacity: 0 }
              : {
                  x: offset * 4,
                  y: offset * 6,
                  rotate: restRot,
                  scale: 1 - offset * 0.03,
                  opacity: offset > 3 ? 0 : 1,
                };

          return (
            <motion.article
              key={c.id}
              className={`deck-card ${isTop ? "top" : ""} ${isLeaving ? "released" : ""}`}
              style={{ zIndex: 10 - offset }}
              // Without this the server renders no transform and the client
              // renders one, React calls the mismatch a hydration failure, and
              // throws the whole server tree away. `initial={false}` means
              // "start already at the animate values" — both sides then emit
              // the same markup, and the stack does not fly in on first paint.
              initial={false}
              animate={target}
              transition={
                reduce
                  ? INSTANT
                  : isEntering
                    ? INSTANT
                    : isLeaving
                      ? THROW
                      : // Cards behind settle slightly after the one in front,
                        // so the stack ripples instead of snapping as one block.
                        { ...SETTLE, delay: offset * 0.035 }
              }
              drag={isTop && !reduce ? "x" : false}
              dragElastic={0.14}
              dragMomentum={false}
              dragConstraints={{ left: 0, right: 0 }}
              whileDrag={{ scale: 1.02, cursor: "grabbing" }}
              onDragEnd={(_, info) => {
                // Commit on distance or on a fast flick, so a short sharp
                // gesture works as well as a long slow drag.
                if (Math.abs(info.offset.x) > COMMIT || Math.abs(info.velocity.x) > 520) {
                  step(info.offset.x < 0 ? -1 : 1);
                }
              }}
              onClick={isTop ? () => step(1) : undefined}
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
            </motion.article>
          );
        })}

        {/* The live region used to announce only "03 / 08", which tells a
            screen-reader user that something moved but not what they landed
            on. It now reads the card out. */}
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
