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
    id: "walkie",
    kind: { en: "Hardware & protocol gate", zh: "硬件与协议边界" },
    stamp: { en: "Walkie · wrist approval", zh: "Walkie · 手腕实体审批" },
    date: "2026.10",
    project: { en: "Walkie", zh: "Walkie" },
    body: {
      en: [
        "Dual-boot M5StickS3 firmware sharing one watch with On The Beat.",
        "Voice captures context; destructive bash and file writes never auto-approve.",
        "The code has three offline screens that tell lost Wi-Fi, relay and laptop apart; not yet checked on the watch away from the cable.",
        "→ every high-risk approval needs a physical wrist button (only Lewis has used it).",
      ],
      zh: [
        "与 On The Beat 共用 M5StickS3 的双启动固件。",
        "语音只采集上下文；高风险命令行与改写操作绝不口头放行。",
        "代码里有三个离线画面，分别对应 Wi-Fi、云中继和电脑断连。离开数据线的真机检查还没做。",
        "→ 每道高风险闸门都落回实体按键（目前只有作者本人用过）。",
      ],
    },
  },
  {
    id: "lamplight",
    kind: { en: "Risk-gated desktop UI", zh: "桌面端风险确认" },
    stamp: { en: "Lamplight Nook · not now default", zh: "Lamplight Nook · 默认暂缓" },
    date: "2026.10",
    project: { en: "Lamplight Nook", zh: "Lamplight Nook" },
    body: {
      en: [
        "Long-running agent sessions shown as a pixel café, with the plan on a blackboard.",
        "Risky commands wait behind one visible card instead of auto-running.",
        "Closing or dismissing defaults to 'not now' so silence is never consent.",
        "→ calm visibility over fake hands-free polish (no user testing; only Lewis has used it).",
      ],
      zh: [
        "把长耗时 Agent 任务放进像素咖啡馆，计划直接写在黑板上。",
        "涉及删除或外发的操作一律卡在确认卡上等待。",
        "关闭或忽略弹窗默认退回「先不要」，沉默永不等于同意。",
        "→ 用稳重的边界替代假装无感的全自动（没有用户测试，只有作者本人用过）。",
      ],
    },
  },
  {
    id: "autofill",
    kind: { en: "Refusal threshold · Local AI UX", zh: "拒填阈值 · 本地填表" },
    stamp: { en: "Resume Autofill · zero guessing", zh: "Resume Autofill · 宁缺毋猜" },
    date: "2026.11",
    project: { en: "Resume Autofill", zh: "Resume Autofill" },
    body: {
      en: [
        "Resumes stay in the local browser or phone instead of going to a remote scraping service.",
        "Work-rights or custom questions it is unsure about stop below the threshold instead of being guessed.",
        "Every run logs why each field was filled or skipped, and it never submits a form on its own.",
        "→ 100% on three synthetic test sites: native HTML, Ant Design, Element Plus (real ATS portals unmeasured).",
      ],
      zh: [
        "简历只存在本地浏览器或手机里，不经过远程云端中转。",
        "遇到签证合规等歧义项，低于阈值就停填，绝不硬凑答案。",
        "保留逐字段的命中与跳过日志，绝不替人点击提交按钮。",
        "→ 原生 HTML、Ant Design、Element Plus 三个合成测试站全部填对，真实求职网站还没统计。",
      ],
    },
  },
  {
    id: "maze",
    kind: { en: "Public exhibition · Co-play", zh: "公开展出 · 多人协作" },
    stamp: { en: "MazeRunners · shared bands", zh: "MazeRunners · 共用腕带" },
    date: "2026.06",
    project: { en: "MazeRunners", zh: "MazeRunners" },
    body: {
      en: [
        "Vibrating finger sleeves replaced the electric-shock idea, which could not be both complex enough and safe.",
        "Each colour wristband is shared by two players so nobody steers solo.",
        "Tilting needs both players on a wristband at once; a team member explained the rules before each round.",
        "→ 9 groups (36 players) tested publicly; about 3 groups finished.",
      ],
      zh: [
        "用指套震动取代电击设想，电击方案的复杂度和安全性都过不了关。",
        "每种颜色的导电腕带由两名玩家共用，任何方向都无法单人完成。",
        "两名玩家同时接触腕带才能倾斜迷宫。每轮开始前由组员讲解规则。",
        "→ 公开展出 9 组共 36 人实测，约 3 组通关（纸质榜未存档）。",
      ],
    },
  },
  {
    id: "onthebeat",
    kind: { en: "Social proximity · ESP-NOW", zh: "临近社交 · 低压破冰" },
    stamp: { en: "On The Beat · 3 card levels", zh: "On The Beat · 三档提示卡" },
    date: "2026.09",
    project: { en: "On The Beat", zh: "On The Beat" },
    body: {
      en: [
        "Three cards ('SAY HI', 'FIRST SONG?', 'LET'S DANCE!') from a teammate's original prototype.",
        "Wristbands hear each other over ESP-NOW; an area is named only when the signal is -56 dBm or stronger.",
        "Names and a meeting spot appear only after both people say yes.",
        "→ two real wristbands met through the cloud relay; no wearer testing yet.",
      ],
      zh: [
        "三张卡（SAY HI、FIRST SONG?、LET'S DANCE!）出自组员的最初原型。",
        "手环之间用 ESP-NOW 互相感知。信号达到 -56 dBm 或更强，才会说出对方在哪个区域。",
        "双方都同意之后，才显示名字和碰面地点。",
        "→ 两支真手环经云端中继成功碰面；还没有佩戴者测试。",
      ],
    },
  },
  {
    id: "grassland",
    kind: { en: "Tactical clarity · One rule set", zh: "策略清晰 · 一套规则" },
    stamp: { en: "Grassland Iron Tide · one command grammar", zh: "草原铁潮 · 一套命令语法" },
    date: "2026.07",
    project: { en: "Grassland Iron Tide", zh: "草原铁潮" },
    body: {
      en: [
        "Five missions share one command grammar: click, box-select, Shift, Ctrl groups, right-click.",
        "Pause, failure reasons, checkpoints and restored units share one save chain.",
        "TypeScript, Phaser 4 and EasyStar.js; AI tools helped with code, copy and assets.",
        "→ 430/430 local checks in the release-candidate audit; no outside player testing.",
      ],
      zh: [
        "五关共用一套命令语法：点击、框选、Shift 增减、Ctrl 编队、右键命令。",
        "暂停、失败原因、检查点与恢复后的单位状态共用一条存档链。",
        "TypeScript、Phaser 4 与 EasyStar.js；代码、文案和素材有 AI 工具辅助。",
        "→ 发布候选审计里本地 430 项检查全部通过；没有外部玩家测试。",
      ],
    },
  },
];

const REST_ROTATIONS = [-2.5, 1.5, -1, 2, -0.5, 1] as const;
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
          <li key={i} className={line.startsWith("→") ? "dc-outcome" : undefined}>{line}</li>
        ))}
      </ul>

      <footer className="dc-foot">
        <span className="dc-dot" />
        <span>{card.project[lang]}</span>
      </footer>
    </>
  );
}
