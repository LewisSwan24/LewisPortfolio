import type { ReplayFrame, ReplayTrackSlug } from "./schema";

export type HardwareZoneId =
  | "chassis"
  | "front-key"
  | "usb-relay"
  | "tray"
  | "wristband-a"
  | "wristband-b"
  | "ir-gate"
  | "band-a"
  | "band-b"
  | "rssi-ring";

export interface HardwareZoneSpec {
  id: HardwareZoneId;
  pinOrBus: string;
  label: { en: string; zh: string };
  role: { en: string; zh: string };
  svgFocus: { x: number; y: number; w: number; h: number };
}

export interface HardwareTwinRenderState {
  activeZoneId: HardwareZoneId;
  faultState: "nominal" | "fault" | "recovered";
  signalLevel: number;
  reducedMotion?: boolean;
}

export interface HardwareTwinFrameMapping {
  slug: ReplayTrackSlug;
  activeZoneId: HardwareZoneId;
  activeZone: HardwareZoneSpec;
  secondaryZoneIds: readonly HardwareZoneId[];
  pinOrBus: string;
  faultState: "nominal" | "fault" | "recovered";
  signalRatio: number;
  telemetryCallout: { en: string; zh: string };
}

export const HARDWARE_TWIN_ZONES: Record<
  ReplayTrackSlug,
  readonly HardwareZoneSpec[]
> = {
  walkie: [
    {
      id: "chassis",
      pinOrBus: "ESP32-S3 / ST7789 OLED",
      label: { en: "Core MCU & OLED", zh: "主机芯与 OLED 状态屏" },
      role: {
        en: "Displays three-way transport diagnostics and frames 16 kHz / 4-bit ADPCM turns.",
        zh: "显示三段式链路体检，并承担 16 kHz 语音压缩与状态调度。",
      },
      svgFocus: { x: 116, y: 36, w: 88, h: 52 },
    },
    {
      id: "front-key",
      pinOrBus: "GPIO37 Front / GPIO39 Side IRQ",
      label: { en: "Dual-Key Approval Gate", zh: "实体双键审批门禁" },
      role: {
        en: "Physical thumb tactile lock separates destructive approval (Front) from abort/hold-to-talk (Side).",
        zh: "前键物理确认高风险动作，侧键专司按住说话与拒批，凭触觉防误触。",
      },
      svgFocus: { x: 132, y: 88, w: 56, h: 42 },
    },
    {
      id: "usb-relay",
      pinOrBus: "USB-CDC DTR / Fly.io WSS",
      label: { en: "Transport & AES-GCM Link", zh: "有线抢占 / 加密中继环" },
      role: {
        en: "USB DTR cable preempts Wi-Fi relay deterministically; off-cable frames seal under 12B nonces.",
        zh: "插线即由 DTR 硬切直连；离桌则封入 12 字节随机 Nonce 经加密中继送达。",
      },
      svgFocus: { x: 66, y: 50, w: 188, h: 80 },
    },
  ],
  maze: [
    {
      id: "tray",
      pinOrBus: "5-Ch Matrix / Web Serial",
      label: { en: "Shared Coordinate Tray", zh: "四象限共用触点底盘" },
      role: {
        en: "Maps paired wristband vectors into physical maze clearance without blocking camera views.",
        zh: "把两名玩家的腕带合力映射为迷宫位移，让实体碰撞反馈直觉清晰。",
      },
      svgFocus: { x: 64, y: 42, w: 192, h: 96 },
    },
    {
      id: "wristband-a",
      pinOrBus: "ADC A0 · Player A Band",
      label: { en: "Conductive Wristband A", zh: "导电腕带 A（水平轴）" },
      role: {
        en: "Holds only one movement axis so two players look up and synchronize physical pace.",
        zh: "仅掌握单向坐标轴，迫使共处一室的两名玩家抬头对话协作。",
      },
      svgFocus: { x: 92, y: 62, w: 60, h: 56 },
    },
    {
      id: "wristband-b",
      pinOrBus: "ADC A1 · Servo Guard",
      label: { en: "Wristband B & Servo Uno", zh: "导电腕带 B 与舵机 Uno" },
      role: {
        en: "Drives the other axis. Tilt servos run on a separate Uno; all boards share one ground.",
        zh: "驱动另一条轴。倾斜舵机跑在单独的 Uno 上，所有板子共地。",
      },
      svgFocus: { x: 168, y: 62, w: 60, h: 56 },
    },
    {
      id: "ir-gate",
      pinOrBus: "FC-51 IR[04] · 3-Sample Debounce",
      label: { en: "Infrared Gate Sensor", zh: "三次取样红外去抖门柱" },
      role: {
        en: "Counts a pass only after three consecutive samples, then cools down for 400 ms, so one ball pass scores once.",
        zh: "连续三次取样都被遮断才算一次经过，之后冷却 400 ms，一次过球只记一次分。",
      },
      svgFocus: { x: 140, y: 38, w: 40, h: 104 },
    },
  ],
  onthebeat: [
    {
      id: "band-a",
      pinOrBus: "Side Key · Anon Hold",
      label: { en: "Local Wearable Beacon", zh: "本地手环与盲操侧键" },
      role: {
        en: "Broadcasts coarse anonymous status with one thumb press while concealing personal identifiers.",
        zh: "单键即可发出低功耗匿名信号，在盲操下严格锁死身份信息。",
      },
      svgFocus: { x: 84, y: 64, w: 52, h: 52 },
    },
    {
      id: "band-b",
      pinOrBus: "Fly.io WSS · Mutual Nod",
      label: { en: "Peer Beacon & Reveal Gate", zh: "对端信标与双向揭示门" },
      role: {
        en: "Reveals first names and where to meet only after reciprocal confirmation, then shows the same two-digit number on both bands.",
        zh: "双方都确认后才显示名字和碰面地点，随后两支手环显示同一个两位数编号。",
      },
      svgFocus: { x: 184, y: 64, w: 52, h: 52 },
    },
    {
      id: "rssi-ring",
      pinOrBus: "ESP-NOW (-56 / -45 dBm)",
      label: { en: "Proximity Threshold Ring", zh: "ESP-NOW 近场阈值环" },
      role: {
        en: "Names an area only when a marker is heard at -56 dBm or louder; a knock between two bands needs -45 dBm.",
        zh: "标记信号达到 -56 dBm 或更强才说出所在区域；两支手环相碰要 -45 dBm 才算数。",
      },
      svgFocus: { x: 68, y: 46, w: 184, h: 88 },
    },
  ],
};

function pickZoneForFrame(slug: ReplayTrackSlug, frame: ReplayFrame): HardwareZoneId {
  const ch = frame.channel.toUpperCase();

  if (slug === "walkie") {
    if (ch.includes("PAIR") || ch.includes("IRQ / GPIO")) {
      return "front-key";
    }
    if (ch.includes("USB-CDC") || ch.includes("WSS")) {
      return "usb-relay";
    }
    return "chassis";
  }

  if (slug === "maze") {
    if (ch.includes("FC51-IR")) {
      return "ir-gate";
    }
    if (ch.includes("WRISTBAND")) {
      return "wristband-a";
    }
    if (ch.includes("SERVO")) {
      return "wristband-b";
    }
    return "tray";
  }

  // onthebeat
  if (ch.includes("ESP-NOW") || ch.includes("RSSI")) {
    return "rssi-ring";
  }
  if (ch.includes("FLY-IO") || ch.includes("CARD")) {
    return "band-b";
  }
  return "band-a";
}

export function mapReplayFrameToHardwareTwin(
  slug: ReplayTrackSlug,
  frame: ReplayFrame
): HardwareTwinFrameMapping {
  const zones = HARDWARE_TWIN_ZONES[slug];
  const activeZoneId = pickZoneForFrame(slug, frame);
  const activeZone =
    zones.find((zone) => zone.id === activeZoneId) ?? zones[0]!;
  const secondaryZoneIds = zones
    .filter((zone) => zone.id !== activeZone.id)
    .map((zone) => zone.id);
  const signalRatio = Math.max(0, Math.min(1, frame.signalLevel / 100));

  const telemetryCallout =
    frame.faultState === "fault"
      ? {
          en: `FAULT GUARD on ${activeZone.label.en} (${activeZone.pinOrBus}): ${frame.invariantCheck.en}`,
          zh: `故障拦截 [${activeZone.label.zh} · ${activeZone.pinOrBus}]：${frame.invariantCheck.zh}`,
        }
      : frame.faultState === "recovered"
        ? {
            en: `RECOVERED on ${activeZone.label.en}: ${frame.humanSummary.en}`,
            zh: `安全恢复 [${activeZone.label.zh}]：${frame.humanSummary.zh}`,
          }
        : {
            en: `${activeZone.label.en} (${activeZone.pinOrBus}) @ ${frame.signalLevel}% signal — ${frame.stateLabel.en}.`,
            zh: `${activeZone.label.zh}（${activeZone.pinOrBus}）信号 ${frame.signalLevel}%：${frame.stateLabel.zh}。`,
          };

  return {
    slug,
    activeZoneId: activeZone.id,
    activeZone,
    secondaryZoneIds,
    pinOrBus: activeZone.pinOrBus,
    faultState: frame.faultState,
    signalRatio,
    telemetryCallout,
  };
}
