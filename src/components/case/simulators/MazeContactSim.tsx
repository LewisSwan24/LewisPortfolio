"use client";

import { useCallback, useState } from "react";
import type { SimulatorProps } from "./types";

type TouchMode = "solo" | "coop";
type BandId = "red" | "blue" | "yellow" | "green";

interface Pos {
  x: number;
  y: number;
}

const GRID_SIZE = 5;
const START_POS: Pos = { x: 0, y: 0 };
const GOAL_POS: Pos = { x: 4, y: 4 };
const WALLS = new Set(["1,1", "1,3", "3,1", "3,2", "2,4"]);

const BANDS: ReadonlyArray<{
  id: BandId;
  players: string;
  dirLabel: { en: string; zh: string };
  dx: number;
  dy: number;
  arrow: string;
}> = [
  {
    id: "red",
    players: "A + B",
    dirLabel: { en: "Up", zh: "向上" },
    dx: 0,
    dy: -1,
    arrow: "↑",
  },
  {
    id: "blue",
    players: "B + C",
    dirLabel: { en: "Right", zh: "向右" },
    dx: 1,
    dy: 0,
    arrow: "→",
  },
  {
    id: "yellow",
    players: "C + D",
    dirLabel: { en: "Down", zh: "向下" },
    dx: 0,
    dy: 1,
    arrow: "↓",
  },
  {
    id: "green",
    players: "D + A",
    dirLabel: { en: "Left", zh: "向左" },
    dx: -1,
    dy: 0,
    arrow: "←",
  },
];

export function MazeContactSim({ locale, onStatusChange }: SimulatorProps) {
  const isZh = locale === "zh";
  const [touchMode, setTouchMode] = useState<TouchMode>("solo");
  const [pos, setPos] = useState<Pos>(START_POS);
  const [steps, setSteps] = useState(0);
  const [shakingBand, setShakingBand] = useState<BandId | null>(null);
  const [activeBand, setActiveBand] = useState<BandId | null>(null);
  const [pulseCount, setPulseCount] = useState(0);
  const [won, setWon] = useState(false);

  const attemptMove = useCallback(
    (band: (typeof BANDS)[number], forceCoop = false) => {
      if (won) {
        onStatusChange?.(
          isZh ? "已到达终点，点击右上角「重置」可再来一局。" : "Goal reached. Press Reset to play another round."
        );
        return;
      }

      if (!forceCoop && touchMode === "solo") {
        setShakingBand(band.id);
        setActiveBand(band.id);
        const soloLead = band.players.split("+")[0]?.trim() ?? "A";
        const msg = isZh
          ? `仅 ${soloLead} 单人触碰（${band.dirLabel.zh}）：方向锁定，需要搭档同时触碰腕带才会移动。`
          : `Only Player ${soloLead} touching (${band.dirLabel.en}): direction locked until partner touches simultaneously.`;
        onStatusChange?.(msg);
        return;
      }

      setShakingBand(null);
      setActiveBand(band.id);
      const nextX = pos.x + band.dx;
      const nextY = pos.y + band.dy;

      if (
        nextX < 0 ||
        nextX >= GRID_SIZE ||
        nextY < 0 ||
        nextY >= GRID_SIZE ||
        WALLS.has(`${nextX},${nextY}`)
      ) {
        setPulseCount((c) => c + 1);
        const wallMsg = isZh
          ? `${band.players} 协同${band.dirLabel.zh}触碰到边界挡板 · 手指套触发防抖震动提示。`
          : `${band.players} co-touched ${band.dirLabel.en} into a maze wall · finger sleeve buzzed.`;
        onStatusChange?.(wallMsg);
        return;
      }

      const nextPos = { x: nextX, y: nextY };
      setPos(nextPos);
      setSteps((s) => s + 1);
      setPulseCount((c) => c + 1);

      if (nextX === GOAL_POS.x && nextY === GOAL_POS.y) {
        setWon(true);
        const winMsg = isZh
          ? `双人协同抵达终点！共走 ${steps + 1} 步，5 通道反馈同步熄灭结算。`
          : `Goal reached via partner co-touch in ${steps + 1} steps! All 5 exhibition feedback channels settled.`;
        onStatusChange?.(winMsg);
        return;
      }

      const moveMsg = isZh
        ? `${band.players} 双人同时触碰 → 球体${band.dirLabel.zh}移至 (${nextX + 1}, ${nextY + 1})，指套震动 + LED 同步亮起。`
        : `${band.players} co-touched -> orb moved ${band.dirLabel.en} to (${nextX + 1}, ${nextY + 1}); sleeve haptic + LED fired.`;
      onStatusChange?.(moveMsg);
    },
    [isZh, onStatusChange, pos.x, pos.y, steps, touchMode, won]
  );

  const handleGridKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, BandId> = {
      ArrowUp: "red",
      ArrowRight: "blue",
      ArrowDown: "yellow",
      ArrowLeft: "green",
    };
    const bandId = map[event.key];
    if (!bandId) return;
    event.preventDefault();
    const band = BANDS.find((b) => b.id === bandId);
    if (band) {
      setTouchMode("coop");
      attemptMove(band, true);
    }
  };

  const copy = isZh
    ? {
        modeLabel: "触控协同模式",
        soloBtn: "单人试按（方向锁定）",
        coopBtn: "双人同时触碰（协同移动）",
        gridAria: "5×5 协作迷宫棋盘，可使用方向键模拟双人协同移动",
        startTag: "起",
        goalTag: "终",
        wallTag: "墙",
        ballTag: "球",
        bandsTitle: "4 组导电腕带（红 / 蓝 / 黄 / 绿）",
        bandsHint: "也可以在左侧棋盘按键盘 ↑ → ↓ ← 快捷测试双人协同。",
        stepsLabel: "已走步数",
        pulsesLabel: "同步反馈脉冲",
        channelsLabel: "联动通道",
        channelsVal: won ? "通关结算 ✓" : activeBand ? "计分 · 震动 · LED · 串口" : "待机等待接触",
        wonBadge: "已到达终点 · 协同通关",
      }
    : {
        modeLabel: "Contact mode",
        soloBtn: "Single player tap (Locked)",
        coopBtn: "Two-player co-touch (Move)",
        gridAria: "5 by 5 collaborative maze grid. Use Arrow keys for dual-player co-touch movement.",
        startTag: "S",
        goalTag: "GOAL",
        wallTag: "WALL",
        ballTag: "ORB",
        bandsTitle: "4 wearable wristbands (Red / Blue / Yellow / Green)",
        bandsHint: "Tip: focus the maze grid and press ↑ → ↓ ← to trigger co-touch movement.",
        stepsLabel: "Steps",
        pulsesLabel: "Feedback pulses",
        channelsLabel: "Synced channels",
        channelsVal: won
          ? "Round complete ✓"
          : activeBand
            ? "Score · Sleeve buzz · LED · Serial"
            : "Waiting for contact",
        wonBadge: "Goal reached · Round cleared",
      };

  return (
    <div className="sim-maze">
      <div className="sim-walkie-top">
        <span className="sim-field-label">{copy.modeLabel}</span>
        <div className="sim-segmented" role="group" aria-label={copy.modeLabel}>
          <button
            type="button"
            className="sim-seg-btn"
            aria-pressed={touchMode === "solo"}
            onClick={() => {
              setTouchMode("solo");
              onStatusChange?.(
                isZh
                  ? "已切换为「单人试按」：点击任一腕带将提示缺少搭档。"
                  : "Switched to single-player tap: tapping a wristband stays locked until a partner joins."
              );
            }}
          >
            {copy.soloBtn}
          </button>
          <button
            type="button"
            className="sim-seg-btn"
            aria-pressed={touchMode === "coop"}
            onClick={() => {
              setTouchMode("coop");
              setShakingBand(null);
              onStatusChange?.(
                isZh
                  ? "已激活「双人协同」：两位玩家同时触碰腕带，可以推动球体。"
                  : "Two-player co-touch active: wristband pairs now move the orb."
              );
            }}
          >
            {copy.coopBtn}
          </button>
        </div>
        {won && <span className="sim-state-badge" data-state="waiting">{copy.wonBadge}</span>}
      </div>

      <div className="sim-maze-grid-layout">
        <div
          className="sim-maze-board"
          tabIndex={0}
          role="group"
          aria-label={copy.gridAria}
          onKeyDown={handleGridKeyDown}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, idx) => {
            const x = idx % GRID_SIZE;
            const y = Math.floor(idx / GRID_SIZE);
            const isOrb = pos.x === x && pos.y === y;
            const isGoal = GOAL_POS.x === x && GOAL_POS.y === y;
            const isWall = WALLS.has(`${x},${y}`);
            const isStart = START_POS.x === x && START_POS.y === y;

            return (
              <div
                key={`${x}-${y}`}
                className="sim-maze-cell"
                data-orb={isOrb ? "true" : "false"}
                data-goal={isGoal ? "true" : "false"}
                data-wall={isWall ? "true" : "false"}
              >
                {isOrb ? (
                  <span className="sim-maze-orb">{copy.ballTag}</span>
                ) : isGoal ? (
                  <span className="sim-maze-tag">{copy.goalTag}</span>
                ) : isWall ? (
                  <span className="sim-maze-wall-mark" aria-label={copy.wallTag}>
                    ×
                  </span>
                ) : isStart ? (
                  <span className="sim-maze-tag">{copy.startTag}</span>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="sim-maze-controls">
          <h3 className="sim-panel-title">{copy.bandsTitle}</h3>
          <div className="sim-band-grid">
            {BANDS.map((band) => (
              <button
                key={band.id}
                type="button"
                className="sim-band-btn"
                data-band={band.id}
                data-shake={shakingBand === band.id ? "true" : "false"}
                aria-pressed={activeBand === band.id && touchMode === "coop"}
                onClick={() => attemptMove(band)}
              >
                <span className="sim-band-top">
                  <span className="sim-band-swatch" data-band={band.id} aria-hidden="true" />
                  <strong>{band.players}</strong>
                </span>
                <span className="sim-band-dir">
                  {band.arrow} {band.dirLabel[locale]}
                </span>
              </button>
            ))}
          </div>
          <p className="sim-hint-text">{copy.bandsHint}</p>

          <dl className="sim-maze-telemetry">
            <div>
              <dt>{copy.stepsLabel}</dt>
              <dd>{steps}</dd>
            </div>
            <div>
              <dt>{copy.pulsesLabel}</dt>
              <dd>{pulseCount}</dd>
            </div>
            <div>
              <dt>{copy.channelsLabel}</dt>
              <dd className="sim-maze-channel-val">{copy.channelsVal}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
