import type { ReplayFrame } from "@/lib/replay/schema";
import styles from "./replay.module.css";

export function ReplayWaveformSvg({
  frames,
  activeIndex,
  locale,
}: {
  frames: readonly ReplayFrame[];
  activeIndex: number;
  locale: "en" | "zh";
}) {
  const width = 640;
  const height = 160;
  const padX = 32;
  const padY = 24;
  const usableW = width - padX * 2;
  const usableH = height - padY * 2;
  const count = Math.max(1, frames.length);

  const coords = frames.map((frame, i) => {
    const x = count === 1 ? padX + usableW / 2 : padX + (i / (count - 1)) * usableW;
    const y = padY + (1 - frame.signalLevel / 100) * usableH;
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)), frame, i };
  });

  const pathD = coords
    .map((pt, idx) => `${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y}`)
    .join(" ");

  const active = coords[activeIndex] ?? coords[0];
  const isZh = locale === "zh";

  return (
    <div className={styles.waveformBox}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={
          isZh
            ? `协议信号时序波形，共 ${frames.length} 帧，当前位于第 ${activeIndex + 1} 帧`
            : `Protocol signal timeline across ${frames.length} frames, currently at frame ${activeIndex + 1}`
        }
        className={styles.waveformSvg}
      >
        <title>
          {isZh ? "协议信号时序与故障跳变波形" : "Protocol signal & fault transition waveform"}
        </title>

        {/* Reference grid */}
        <line
          x1={padX}
          y1={padY}
          x2={width - padX}
          y2={padY}
          stroke="var(--border)"
          strokeDasharray="3 4"
        />
        <line
          x1={padX}
          y1={height / 2}
          x2={width - padX}
          y2={height / 2}
          stroke="var(--border)"
          strokeDasharray="3 4"
        />
        <line
          x1={padX}
          y1={height - padY}
          x2={width - padX}
          y2={height - padY}
          stroke="var(--border)"
          strokeDasharray="3 4"
        />

        {/* Active vertical cursor */}
        {active && (
          <line
            x1={active.x}
            y1={10}
            x2={active.x}
            y2={height - 10}
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        )}

        {/* Waveform polyline */}
        <path
          d={pathD}
          fill="none"
          stroke="var(--text-2)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Nodes */}
        {coords.map(({ x, y, frame, i }) => {
          const isActive = i === activeIndex;
          const isFault = frame.faultState === "fault";
          return (
            <g key={frame.id}>
              <circle
                cx={x}
                cy={y}
                r={isActive ? 7 : 5}
                fill={
                  isActive
                    ? "var(--accent)"
                    : isFault
                      ? "var(--surface)"
                      : "var(--text)"
                }
                stroke={isFault ? "var(--accent)" : "var(--surface)"}
                strokeWidth={isFault ? 2.5 : 1.5}
              />
              <text
                x={x}
                y={height - 6}
                textAnchor="middle"
                fontSize="10"
                fontFamily="var(--font-mono)"
                fill="var(--text-3)"
              >
                {frame.timestampMs}ms
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
