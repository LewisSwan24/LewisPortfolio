import {
  REPLAY_TRACK_SLUGS,
  type ReplayTrackSlug,
  type ReplayTrace,
} from "@/lib/replay/schema";

export { REPLAY_TRACK_SLUGS };

export const REPLAY_TRACES: readonly ReplayTrace[] = [
  {
    slug: "walkie",
    title: {
      en: "Walkie · USB Preemption & AES-256-GCM Wrist Gate",
      zh: "Walkie · USB 抢占与 AES-256-GCM 腕上审批帧",
    },
    transportSummary: {
      en: "M5StickS3 (ESP32-S3) <-> Node 24 Workstation Bridge <-> Fly.io wss:// Zero-Knowledge Relay",
      zh: "M5StickS3 (ESP32-S3) <-> Node 24 桌面桥接 <-> Fly.io wss:// 端到端加密中继",
    },
    honestCalibrationNote: {
      en: "Frames mirror the verified firmware protocol states (gate-p5 pairing, 12B Nonce AES-256-GCM framing, Front/Side IRQ gate, and 3-way fault flags).",
      zh: "各帧时序严格对应 M5StickS3 真实固件状态机（gate-p5 配对、12B Nonce 密封帧、前/侧键中断审批与三段式离线标志）。",
    },
    verifiedStatus: "bench-tested",
    faultInjectionLabel: {
      en: "Pull USB Cable Mid-Turn",
      zh: "注入故障：录音中途拔掉 USB-C 线缆",
    },
    faultInjectionSummary: {
      en: "Unplugging USB mid-utterance intentionally aborts the in-flight turn rather than stitching partial PCM and ADPCM buffers.",
      zh: "在说话中途拔线时，系统拒绝硬拼半截有线 PCM 与无线 ADPCM 缓冲，主动中止当轮并弹出三段链路切换提示。",
    },
    caseHref: "/projects/walkie",
    nominalFrames: [
      {
        id: "w-nom-1",
        timestampMs: 0,
        channel: "USB-CDC / DTR",
        stateLabel: { en: "USB Serial DTR Preemption", zh: "USB 串口 DTR 优先抢占" },
        signalLevel: 92,
        faultState: "nominal",
        rawHex: "AA 55 01 00 1C 44 54 52 5F 50 52 45 45 4D 50 54",
        decodedFields: [
          { key: "link", value: "USB_SERIAL_115200" },
          { key: "wifiRelay", value: "SUSPENDED_BY_DTR" },
          { key: "audioCodec", value: "PCM_16KHZ_RAW" },
        ],
        humanSummary: {
          en: "Cable detected at workstation: USB link immediately preempts Fly.io Wi-Fi relay with zero manual menu switching.",
          zh: "检测到桌面插线：USB 有线直连立刻抢占云端中继，无需用户在 1.14 寸屏里翻设置切换。",
        },
        invariantCheck: {
          en: "Single active transport owner guaranteed (no dual-stream echo).",
          zh: "单一激活通道约束：绝不允许有线与无线同时发送同一轮语音。",
        },
      },
      {
        id: "w-nom-2",
        timestampMs: 420,
        channel: "PAIR / NVS",
        stateLabel: { en: "HELLO 30s Physical Key Press", zh: "HELLO 30 秒当面实体配对" },
        signalLevel: 64,
        faultState: "nominal",
        rawHex: "AA 55 02 1E 48 45 4C 4C 4F 5F 46 52 4F 4E 54 01",
        decodedFields: [
          { key: "challengeWindowMs", value: "30000" },
          { key: "physicalKey", value: "FRONT_GPIO_ACK" },
          { key: "keySealed", value: "pair.key (AES-256)" },
        ],
        humanSummary: {
          en: "Developer presses Front Key on M5StickS3 inside the 30s challenge window; pair.key derives locally and seals into NVS.",
          zh: "开发者在 30 秒挑战窗口内物理按下前键，pair.key 在本地派生并封存，绝不以明文出表。",
        },
        invariantCheck: {
          en: "Fail-closed gate-p5: timeout or Side Key writes 0 bytes.",
          zh: "gate-p5 失效闭锁：超时或按侧键取消则磁盘写入零字节。",
        },
      },
      {
        id: "w-nom-3",
        timestampMs: 1180,
        channel: "WSS / AES-256-GCM",
        stateLabel: { en: "Sealed 4-bit ADPCM Frame", zh: "AES-256-GCM 密封音频帧" },
        signalLevel: 78,
        faultState: "nominal",
        rawHex: "9F 2A 7C 0E 41 D3 88 B1 12 04 6B F0 4E 99 A1 C7",
        decodedFields: [
          { key: "cipher", value: "AES-256-GCM" },
          { key: "nonceBytes", value: "12" },
          { key: "tlsPin", value: "ISRG_ROOT_X1_X2" },
          { key: "payload", value: "ADPCM_4BIT_OPAQUE" },
        ],
        humanSummary: {
          en: "Off-cable speech leaves wrist as 4-bit ADPCM sealed under a fresh 12-byte nonce; Fly.io relay sees only ciphertext.",
          zh: "离桌无线音频压缩为 4-bit ADPCM 并附带独立 12 字节 Nonce 密封传输，云中继全程只过密文。",
        },
        invariantCheck: {
          en: "Zero plaintext repo paths or prompts visible to public relay.",
          zh: "公网中继节点对仓库路径与对话明文零可见。",
        },
      },
      {
        id: "w-nom-4",
        timestampMs: 2640,
        channel: "IRQ / GPIO",
        stateLabel: { en: "Front/Side Asymmetric Tool Gate", zh: "前/侧键非对称审批门禁" },
        signalLevel: 85,
        faultState: "nominal",
        rawHex: "AA 55 04 01 50 45 52 4D 5F 46 52 4F 4E 54 5F 4F",
        decodedFields: [
          { key: "requestedTool", value: "write_file(src/...)" },
          { key: "frontKey", value: "APPROVE_ONCE" },
          { key: "sideKey", value: "DENY_WITH_VOICE" },
        ],
        humanSummary: {
          en: "Claude pauses on a write request; developer presses perpendicular Front Key after hearing the 1-line spoken summary.",
          zh: "Claude 在写文件前硬性挂起；开发者听清一句简报后按下垂直面实体前键放行。",
        },
        invariantCheck: {
          en: "Spoken 'yes' never unlocks destructive tools without hardware IRQ.",
          zh: "口头说「确认」不绕过硬件键位中断，彻底防误识别放行。",
        },
      },
      {
        id: "w-nom-5",
        timestampMs: 3920,
        channel: "BRIDGE / TTS",
        stateLabel: { en: "Spoken Brief & Screen Sync", zh: "语音简报回传完成" },
        signalLevel: 54,
        faultState: "nominal",
        rawHex: "AA 55 05 00 52 45 43 41 50 5F 44 4F 4E 45 00 02",
        decodedFields: [
          { key: "recapLines", value: "3 (1.14in OLED)" },
          { key: "ttsStatus", value: "DELIVERED" },
          { key: "nextState", value: "IDLE_READY" },
        ],
        humanSummary: {
          en: "Watch speaks concise two-sentence recap and locks 3-line summary on OLED until next Front Key hold.",
          zh: "手表播报两句话精简结论并在小屏定格三行摘要，静待下一次按住讲话。",
        },
        invariantCheck: {
          en: "Hot-mic remains off until a deliberate PTT hold of at least 300 ms.",
          zh: "麦克风保持静默，直到下次按住至少 300 ms 才开始采音。",
        },
      },
    ],
    faultFrames: [
      {
        id: "w-flt-1",
        timestampMs: 0,
        channel: "USB-CDC / DTR",
        stateLabel: { en: "USB Link Active at Desk", zh: "桌面有线直连采样中" },
        signalLevel: 90,
        faultState: "nominal",
        rawHex: "AA 55 01 00 1C 44 54 52 5F 41 43 54 49 56 45 01",
        decodedFields: [
          { key: "link", value: "USB_SERIAL_115200" },
          { key: "utterance", value: "IN_FLIGHT_PCM" },
        ],
        humanSummary: {
          en: "Operator holds Front Key while plugged into workstation USB-C port.",
          zh: "用户在插着 USB-C 线时按住前键开始口述任务。",
        },
        invariantCheck: {
          en: "Audio stream bound to USB frame sequence #0042.",
          zh: "当前语音轮次绑定在有线序列号 #0042。",
        },
      },
      {
        id: "w-flt-2",
        timestampMs: 680,
        channel: "USB-CDC / IRQ",
        stateLabel: { en: "Cable Pulled Mid-Utterance", zh: "录音途中突然拔除 USB 线缆" },
        signalLevel: 12,
        faultState: "fault",
        rawHex: "FF EE 09 01 44 54 52 5F 44 52 4F 50 5F 41 42 54",
        decodedFields: [
          { key: "dtrState", value: "LOW_DISCONNECTED" },
          { key: "inFlightAction", value: "HARD_ABORT_TURN" },
          { key: "partialBuffer", value: "DISCARDED_0B" },
        ],
        humanSummary: {
          en: "USB DTR drops mid-sentence. Firmware immediately discards the partial PCM buffer instead of splicing onto Wi-Fi.",
          zh: "句中检测到 DTR 电平跌落。固件立刻丢弃半截 PCM 缓冲，严禁将其与无线隧道强行拼接。",
        },
        invariantCheck: {
          en: "Refuses silent channel stitching that could trigger half-parsed commands.",
          zh: "宁可中断重说，绝不把截断半截的指令喂给编码代理。",
        },
      },
      {
        id: "w-flt-3",
        timestampMs: 1240,
        channel: "DIAG / 3-WAY",
        stateLabel: { en: "Link Transition & 3-Way Check", zh: "显性切链与三段式离线自检" },
        signalLevel: 38,
        faultState: "fault",
        rawHex: "AA 55 0E 03 57 49 46 49 5F 4F 4B 5F 52 45 4C 59",
        decodedFields: [
          { key: "wifi", value: "CONNECTED" },
          { key: "relay", value: "RECONNECTING_TLS" },
          { key: "bridgeAi", value: "WAIT_HANDSHAKE" },
        ],
        humanSummary: {
          en: "Watch displays explicit 'Link switched — release and retry' alongside isolated Wi-Fi / Relay / Bridge-AI badges.",
          zh: "屏幕明确提示「链路已切换，请松手重按」，并同步展示 Wi-Fi / Relay / Bridge-AI 三段独立自检结果。",
        },
        invariantCheck: {
          en: "Never masks transport transition behind a generic spinning loader.",
          zh: "绝不用模糊转圈遮掩断链原因，让操作者一眼看懂切链进展。",
        },
      },
      {
        id: "w-flt-4",
        timestampMs: 2150,
        channel: "WSS / AES-256-GCM",
        stateLabel: { en: "Relay Re-Sealed on Wi-Fi", zh: "无线 AES-256-GCM 通道重新封存" },
        signalLevel: 74,
        faultState: "recovered",
        rawHex: "AA 55 03 00 57 53 53 5F 52 45 41 44 59 5F 4F 4B",
        decodedFields: [
          { key: "link", value: "FLY_IO_WSS" },
          { key: "nonceEpoch", value: "ROTATED_NEW" },
          { key: "pendingTools", value: "0_CORRUPTED" },
        ],
        humanSummary: {
          en: "Pinned TLS handshake restores encrypted wss:// channel cleanly with fresh nonce epoch and zero duplicate tool calls.",
          zh: "锁定证书链的 TLS 握手恢复加密无线通道，重置 Nonce 纪元，确保桌面端零重复工具调用。",
        },
        invariantCheck: {
          en: "Zero ghost tool mutations emitted during cable swap.",
          zh: "切链全过程未向 Claude Code 下发任何脏指令。",
        },
      },
      {
        id: "w-flt-5",
        timestampMs: 2980,
        channel: "UI / OLED",
        stateLabel: { en: "Ready for Clean Retry", zh: "归位就绪等待重录" },
        signalLevel: 82,
        faultState: "recovered",
        rawHex: "AA 55 00 00 49 44 4C 45 5F 57 49 46 49 5F 4F 4B",
        decodedFields: [
          { key: "state", value: "IDLE_WIRELESS" },
          { key: "retryPrompt", value: "HOLD_FRONT_TO_SPEAK" },
        ],
        humanSummary: {
          en: "Operator holds Front Key from across the room and completes the clean voice turn over ADPCM.",
          zh: "用户在房间另一头重新按住前键，在完整的密封无线通道内顺利完成本轮口述。",
        },
        invariantCheck: {
          en: "End-to-end deterministic recovery verified.",
          zh: "断线再连状态机完整闭环恢复。",
        },
      },
    ],
  },
  {
    slug: "maze",
    title: {
      en: "MazeRunners · 10-Zone IR Debounce & Board Sync",
      zh: "MazeRunners · 十路红外去抖与多板同步",
    },
    transportSummary: {
      en: "Arduino Mega (10x FC-51 IR) + two Uno boards (wristbands & servos; ball-launcher stepper), shared ground -> Web Serial console",
      zh: "Arduino Mega（十路红外）＋两块 Uno（一块管腕带与舵机，一块管发球机步进电机），全部共地 -> Web Serial 控制台",
    },
    honestCalibrationNote: {
      en: "Simulated replay, not a hardware capture. Timing follows the course paper: an IR trigger needs three consecutive samples, then the zone cools down for 400 ms.",
      zh: "这是模拟重放，不是硬件实录。时序按课程论文：红外要连续三次取样都被遮断才算触发，之后该区冷却 400 ms。",
    },
    verifiedStatus: "bench-tested",
    faultInjectionLabel: {
      en: "Inject a One-Sample IR Flicker",
      zh: "注入故障：钢球擦边造成一次取样的红外闪烁",
    },
    faultInjectionSummary: {
      en: "Simulates a ball grazing the beam for a single sample. The three-sample debounce ignores it, so score and sleeve vibration do not fire twice.",
      zh: "模拟钢球擦过光束，只遮断了一次取样。三次取样去抖会忽略这次闪烁，分数和指套震动都不会多触发一次。",
    },
    caseHref: "/projects/maze",
    nominalFrames: [
      {
        id: "m-nom-1",
        timestampMs: 0,
        channel: "WRISTBAND / ADC",
        stateLabel: { en: "Co-Touch Axis Coupling", zh: "同色双人腕带导电接通" },
        signalLevel: 70,
        faultState: "nominal",
        rawHex: "4D 5A 01 01 41 42 5F 50 41 49 52 5F 4F 4E 00 1A",
        decodedFields: [
          { key: "pair", value: "PLAYER_A + PLAYER_B" },
          { key: "axis", value: "X_TILT_UNLOCKED" },
          { key: "soloLock", value: "DISARMED" },
        ],
        humanSummary: {
          en: "Both players holding the paired color wristband complete circuit; SafeTouchServoController tilts the X axis.",
          zh: "同色配对的两名玩家同时握紧腕带形成通路，独立舵机板即刻执行 X 轴平稳倾斜。",
        },
        invariantCheck: {
          en: "Single-player contact remains physically locked.",
          zh: "单人按压绝不驱动任何倾斜轴向。",
        },
      },
      {
        id: "m-nom-2",
        timestampMs: 310,
        channel: "FC51-IR[04]",
        stateLabel: { en: "Beam Broken for 3 Samples", zh: "04 号陷阱红外连续三次取样遮断" },
        signalLevel: 95,
        faultState: "nominal",
        rawHex: "4D 5A 02 04 49 52 5F 54 52 41 50 5F 33 53 4D 50",
        decodedFields: [
          { key: "zone", value: "TRAP_04" },
          { key: "lowSamples", value: "3" },
          { key: "thresholdSamples", value: "3" },
        ],
        humanSummary: {
          en: "The ball breaks IR beam #04 for three consecutive samples, which counts as a real pass.",
          zh: "钢球连续三次取样都遮断了 04 号红外光束，算作一次真实经过。",
        },
        invariantCheck: {
          en: "Confirmed real ball pass vs optical noise.",
          zh: "严格区分真实过球与瞬态光敏毛刺。",
        },
      },
      {
        id: "m-nom-3",
        timestampMs: 355,
        channel: "FANOUT / 5-CH",
        stateLabel: { en: "One Event & 400 ms Cooldown", zh: "单一事件与 400 ms 冷却" },
        signalLevel: 88,
        faultState: "nominal",
        rawHex: "4D 5A 03 04 4C 4F 43 4B 5F 34 30 30 4D 53 00 00",
        decodedFields: [
          { key: "penalty", value: "1" },
          { key: "fingerHaptic", value: "PULSE" },
          { key: "cooldownMs", value: "400" },
        ],
        humanSummary: {
          en: "One atomic penalty triggers finger sleeve buzz, buzzer tone, LED strip flash, and Web Serial score update simultaneously.",
          zh: "唯一一次原子罚分同步触发手指震动、蜂鸣器、灯带闪红与串口计分更新。",
        },
        invariantCheck: {
          en: "1 ball pass = 1 haptic buzz = 1 score deduction.",
          zh: "一过一事件：体感震动与大屏计分严丝合缝。",
        },
      },
      {
        id: "m-nom-4",
        timestampMs: 755,
        channel: "FC51-IR[04]",
        stateLabel: { en: "Cooldown Expired · Zone Re-Armed", zh: "400 ms 冷却期满重新布防" },
        signalLevel: 42,
        faultState: "nominal",
        rawHex: "4D 5A 04 04 52 45 41 52 4D 5F 5A 4F 4E 45 00 04",
        decodedFields: [
          { key: "zone", value: "TRAP_04" },
          { key: "cooldownState", value: "READY" },
        ],
        humanSummary: {
          en: "Zone #04 clears lockout cleanly once the ball rolls clear of the trap rim.",
          zh: "钢球完全滚离陷阱边缘后，04 号通道顺利解除冷却锁进入下一轮待命。",
        },
        invariantCheck: {
          en: "No stuck sensor flags after trap exit.",
          zh: "滚离后状态自动复位，绝不出现永久锁死通道。",
        },
      },
      {
        id: "m-nom-5",
        timestampMs: 2420,
        channel: "WEB-SERIAL",
        stateLabel: { en: "Goal Gate & Parity Tick", zh: "终点门禁触发与串口状态对齐" },
        signalLevel: 96,
        faultState: "nominal",
        rawHex: "4D 5A 05 0A 47 4F 41 4C 5F 52 45 41 43 48 45 44",
        decodedFields: [
          { key: "zone", value: "GOAL_10" },
          { key: "roundStatus", value: "COMPLETED" },
          { key: "webParity", value: "SYNCED" },
        ],
        humanSummary: {
          en: "Goal IR gate fires round completion across Mega hardware and browser exhibition scoreboard.",
          zh: "终点红外门触发回合通关，硬件主控与展览网页端同步落盘成绩。",
        },
        invariantCheck: {
          en: "Shared reducer matches hardware and offline web demo identically.",
          zh: "展场真机与网页离线演示跑同一份回合状态归约器。",
        },
      },
    ],
    faultFrames: [
      {
        id: "m-flt-1",
        timestampMs: 0,
        channel: "FC51-IR[04]",
        stateLabel: { en: "Ball Grazing Trap Edge", zh: "钢球擦过陷阱边缘光束" },
        signalLevel: 58,
        faultState: "nominal",
        rawHex: "4D 5A 01 04 45 44 47 45 5F 54 4F 55 43 48 00 01",
        decodedFields: [
          { key: "zone", value: "TRAP_04" },
          { key: "rawPin", value: "LOW_TRANSIENT" },
        ],
        humanSummary: {
          en: "Rolling steel ball grazes IR emitter rim, causing optical edge flicker.",
          zh: "滚动钢球擦过红外发射管边缘，引发短暂光电闪烁。",
        },
        invariantCheck: {
          en: "First LOW sample at t=0 ms; two more are needed.",
          zh: "t=0 ms 读到第一次遮断，还需要再连续两次。",
        },
      },
      {
        id: "m-flt-2",
        timestampMs: 15,
        channel: "FC51-IR[04]",
        stateLabel: { en: "One-Sample Flicker Ignored", zh: "单次取样的闪烁被忽略（不足三次）" },
        signalLevel: 18,
        faultState: "fault",
        rawHex: "FF 5A 02 04 42 4F 55 4E 43 45 5F 31 53 4D 50 00",
        decodedFields: [
          { key: "lowSamples", value: "1" },
          { key: "thresholdSamples", value: "3" },
          { key: "penaltyEmitted", value: "FALSE_SUPPRESSED" },
        ],
        humanSummary: {
          en: "The pin reads HIGH again on the next sample. One sample is short of the three the firmware needs, so there is no vibration and no score change.",
          zh: "下一次取样电平就恢复为高。只有一次，不到固件要求的三次，所以指套不震，分数也不变。",
        },
        invariantCheck: {
          en: "Prevents phantom double-penalty that erodes player trust.",
          zh: "成功拦截会毁掉玩家信任的幻影误扣分。",
        },
      },
      {
        id: "m-flt-3",
        timestampMs: 65,
        channel: "SERVO / ISOLATION",
        stateLabel: { en: "Servo on Its Own Uno", zh: "舵机在单独的 Uno 上" },
        signalLevel: 44,
        faultState: "fault",
        rawHex: "FF 5A 03 00 53 45 52 56 4F 5F 55 4E 4F 5F 41 00",
        decodedFields: [
          { key: "servoBoard", value: "UNO_A" },
          { key: "ground", value: "SHARED_GND" },
        ],
        humanSummary: {
          en: "Tilt runs on a separate Uno, so the servo sketch and the Mega's scoring code are separate programs. All boards share one ground.",
          zh: "倾斜舵机跑在单独的一块 Uno 上，舵机程序和 Mega 上的计分代码是两份程序。所有板子共地。",
        },
        invariantCheck: {
          en: "Tilt and scoring live in separate sketches.",
          zh: "倾斜与计分分属不同程序。",
        },
      },
      {
        id: "m-flt-4",
        timestampMs: 140,
        channel: "FC51-IR[04]",
        stateLabel: { en: "Real Pass Confirmed (3 Samples)", zh: "真球入洞：连续三次取样遮断确认" },
        signalLevel: 94,
        faultState: "recovered",
        rawHex: "4D 5A 04 04 56 41 4C 49 44 5F 33 53 4D 50 00 00",
        decodedFields: [
          { key: "lowSamples", value: "3" },
          { key: "atomicEvent", value: "TRAP_04_HIT_ONCE" },
        ],
        humanSummary: {
          en: "The ball drops into the hole and breaks the beam for three samples; one penalty fires and the 400 ms cooldown starts.",
          zh: "钢球真正落进陷阱，连续三次取样遮断光束。系统发出一次罚分，随即开始 400 ms 冷却。",
        },
        invariantCheck: {
          en: "1 genuine trap = 1 clean event after suppressing prior chatter.",
          zh: "前置毛刺已被净化，真实入洞准确计为 1 次。",
        },
      },
      {
        id: "m-flt-5",
        timestampMs: 520,
        channel: "WEB-SERIAL",
        stateLabel: { en: "Console & Band Agreement", zh: "串口大屏与指套反馈完全对齐" },
        signalLevel: 88,
        faultState: "recovered",
        rawHex: "4D 5A 05 04 50 41 52 49 54 59 5F 4F 4B 00 01 10",
        decodedFields: [
          { key: "serialTick", value: "TX_OK" },
          { key: "scoreMismatch", value: "0" },
        ],
        humanSummary: {
          en: "Web Serial console logs identical timestamped trap delta with zero phantom duplicates.",
          zh: "Web Serial 控制台记录唯一一次时间戳扣分事件，与手感完全同步。",
        },
        invariantCheck: {
          en: "Five-channel output parity preserved.",
          zh: "五路并行输出状态绝对一致。",
        },
      },
    ],
  },
  {
    slug: "onthebeat",
    title: {
      en: "On The Beat · ESP-NOW Nearness & Both-Say-Yes Sync",
      zh: "On The Beat · ESP-NOW 近场感知与双方同意同步",
    },
    transportSummary: {
      en: "StickS3 + StickC Plus Wristbands <-> Sydney Fly.io Relay <-> React Venue Clients",
      zh: "StickS3 + StickC Plus 双手环 <-> 悉尼 Fly.io 常驻中继 <-> 手机 React 端",
    },
    honestCalibrationNote: {
      en: "Simulated replay, not a hardware capture. On 25 Sep two real wristbands met through the Fly.io relay. Thresholds come from the repo: an area is named only at -56 dBm or louder, and a knock needs -45 dBm. No crowd testing at a live gig has been run.",
      zh: "这是模拟重放，不是硬件实录。9 月 25 日两支真手环经 Fly.io 中继成功碰面。阈值来自仓库：信号达到 -56 dBm 或更强才说出所在区域，碰手环要 -45 dBm。还没有在真实演出人群里测过。",
    },
    verifiedStatus: "bench-tested",
    faultInjectionLabel: {
      en: "Drop Peer ACK (Unanswered Wave)",
      zh: "注入故障：对端始终不回挥手（模拟拒绝）",
    },
    faultInjectionSummary: {
      en: "Tests social privacy when a blind wave receives no mutual nod: identity never leaks and the pulse expires quietly without nagging prompts.",
      zh: "验证匿名挥手石沉大海时的隐私底线：绝不泄露发起人姓名头像，窗口期满后静默销毁、不弹尴尬催促提示。",
    },
    caseHref: "/projects/onthebeat",
    nominalFrames: [
      {
        id: "o-nom-1",
        timestampMs: 0,
        channel: "BAND / SIDE-BTN",
        stateLabel: { en: "Card 1 Armed on Wrist", zh: "手环侧键点亮破冰卡" },
        signalLevel: 48,
        faultState: "nominal",
        rawHex: "4F 54 01 01 53 41 59 5F 48 49 5F 41 52 4D 45 44",
        decodedFields: [
          { key: "cardIndex", value: "1 / 3 (SAY HI)" },
          { key: "identityBroadcast", value: "NONE_HIDDEN" },
        ],
        humanSummary: {
          en: "Attendee clicks wristband side button in a dark crowd to cycle SAY HI -> FIRST SONG? without pulling out a phone.",
          zh: "观众在暗光人群中不掏手机，单靠手环侧键切出破冰开场卡片。",
        },
        invariantCheck: {
          en: "A card changed on the wrist reaches the phone.",
          zh: "在手环上换卡，手机端随之同步。",
        },
      },
      {
        id: "o-nom-2",
        timestampMs: 550,
        channel: "ESP-NOW / NEAR",
        stateLabel: { en: "Someone Waved", zh: "有人挥手" },
        signalLevel: 66,
        faultState: "nominal",
        rawHex: "4F 54 02 00 57 41 56 45 5F 4E 45 41 52 35 00 00",
        decodedFields: [
          { key: "nearList", value: "TOP_5_HEARD" },
          { key: "nameShared", value: "FALSE" },
          { key: "photoShared", value: "FALSE" },
        ],
        humanSummary: {
          en: "Bands beacon over ESP-NOW and the relay keeps the five each band hears most strongly. The other person sees only that someone waved: no name, no photo.",
          zh: "手环经 ESP-NOW 互相广播，中继为每支手环留下信号最强的五个人。对方只知道有人挥手，看不到名字和照片。",
        },
        invariantCheck: {
          en: "Unilateral exposure blocked prior to bilateral consent.",
          zh: "单向试探绝对匿名，零社死风险。",
        },
      },
      {
        id: "o-nom-3",
        timestampMs: 1420,
        channel: "FLY-IO / WSS",
        stateLabel: { en: "Both Said Yes", zh: "双方都已同意" },
        signalLevel: 88,
        faultState: "nominal",
        rawHex: "4F 54 03 00 42 4F 54 48 5F 53 41 59 5F 59 45 53",
        decodedFields: [
          { key: "peerA_yes", value: "TRUE" },
          { key: "peerB_yes", value: "TRUE" },
          { key: "meetNumber", value: "22" },
        ],
        humanSummary: {
          en: "Both people said yes through the always-on Sydney Fly.io relay; names and where to meet are unlocked.",
          zh: "双方经悉尼常驻 Fly.io 中继都表示同意，名字和碰面地点随之解锁。",
        },
        invariantCheck: {
          en: "MEET state strictly gated by real 2-party ACK.",
          zh: "MEET 状态必须双端真实签署才可解锁。",
        },
      },
      {
        id: "o-nom-4",
        timestampMs: 1980,
        channel: "UI / CARD-3",
        stateLabel: { en: "Single Venue Landmark Reveal", zh: "亮出唯一场地碰面地标" },
        signalLevel: 76,
        faultState: "nominal",
        rawHex: "4F 54 04 03 4C 41 4E 44 4D 41 52 4B 5F 42 41 52",
        decodedFields: [
          { key: "cardIndex", value: "3 / 3 (MEET)" },
          { key: "landmark", value: "LEFT_STAGE_PILLAR" },
          { key: "chatBox", value: "OMITTED_BY_RULE" },
        ],
        humanSummary: {
          en: "Displays first names and one shared venue landmark—deliberately omitting a text chat feed.",
          zh: "揭晓双方名字与唯一场地地标，并刻意不提供站内聊天框。",
        },
        invariantCheck: {
          en: "No distracting in-app chat keeps eyes on the room.",
          zh: "禁止私信框把线下碰面拖回手机打字。",
        },
      },
      {
        id: "o-nom-5",
        timestampMs: 4200,
        channel: "BAND / FINISH",
        stateLabel: { en: "LET'S FINISH · Card Off", zh: "LET'S FINISH · 卡片熄灭" },
        signalLevel: 24,
        faultState: "nominal",
        rawHex: "4F 54 05 00 46 49 4E 49 53 48 5F 4F 46 46 00 00",
        decodedFields: [
          { key: "card", value: "OFF" },
          { key: "status", value: "MEETING_FINISHED" },
        ],
        humanSummary: {
          en: "After talking, LET'S FINISH ends the meeting kindly: the other side gets a thank-you, and the card they met on goes off.",
          zh: "聊完之后按 LET'S FINISH 温和地结束碰面：对方会收到一句谢谢，碰面用的那张卡随之熄灭。",
        },
        invariantCheck: {
          en: "Software celebrates success by getting out of the way.",
          zh: "产品以「体面退场」作为交互闭环终点。",
        },
      },
    ],
    faultFrames: [
      {
        id: "o-flt-1",
        timestampMs: 0,
        channel: "ESP-NOW / NEAR",
        stateLabel: { en: "Wave Sent", zh: "发出挥手" },
        signalLevel: 65,
        faultState: "nominal",
        rawHex: "4F 54 02 00 57 41 56 45 5F 50 45 4E 44 49 4E 47",
        decodedFields: [
          { key: "frame", value: "WAVE_PENDING" },
          { key: "senderIdentity", value: "REDACTED" },
        ],
        humanSummary: {
          en: "An attendee waves. Until the other side answers, no name or photo is shared.",
          zh: "有人发出挥手。对方回应之前，不分享名字和照片。",
        },
        invariantCheck: {
          en: "Zero personal identifiers attached to wave frame.",
          zh: "挥手数据包内不携带任何个人身份字段。",
        },
      },
      {
        id: "o-flt-2",
        timestampMs: 1200,
        channel: "FLY-IO / WSS",
        stateLabel: { en: "Peer ACK Dropped / Ignored", zh: "对端未予回应（ACK 缺失）" },
        signalLevel: 15,
        faultState: "fault",
        rawHex: "FF 54 03 00 4E 4F 5F 50 45 45 52 5F 41 43 4B 00",
        decodedFields: [
          { key: "peerAck", value: "NONE" },
          { key: "meetGate", value: "BLOCKED_HARD" },
        ],
        humanSummary: {
          en: "Second attendee chooses not to wave back. Relay strictly blocks transition to MEET.",
          zh: "另一侧未回应。中继层硬性阻断进入 MEET 态。",
        },
        invariantCheck: {
          en: "Fake static MEET progression impossible.",
          zh: "杜绝单向强制解锁或静态假匹配。",
        },
      },
      {
        id: "o-flt-3",
        timestampMs: 2400,
        channel: "PRIVACY / GATE",
        stateLabel: { en: "Identity Scrubbed on Expiry", zh: "超时即刻销毁临时句柄，零曝光" },
        signalLevel: 20,
        faultState: "fault",
        rawHex: "FF 54 04 00 45 58 50 49 52 45 5F 53 49 4C 45 4E",
        decodedFields: [
          { key: "nameReveal", value: "0_BYTES" },
          { key: "naggingAlert", value: "SUPPRESSED" },
        ],
        humanSummary: {
          en: "Wave expires with zero 'You were rejected' shame copy and zero leaked profile data on peer's band.",
          zh: "窗口期满自动归零，不向发起方弹出「被拒绝」刺眼提醒，也未向对方手环泄露过任何个人资料。",
        },
        invariantCheck: {
          en: "Social dignity preserved on non-match.",
          zh: "未配对时守住双方完全的体面与隐私。",
        },
      },
      {
        id: "o-flt-4",
        timestampMs: 3100,
        channel: "BAND / OLED",
        stateLabel: { en: "Quiet Return to Card 1", zh: "静默退回待机卡片" },
        signalLevel: 44,
        faultState: "recovered",
        rawHex: "4F 54 01 00 52 45 53 45 54 5F 43 41 52 44 5F 31",
        decodedFields: [
          { key: "cardIndex", value: "1 / 3" },
          { key: "venuePresence", value: "UNDISTURBED" },
        ],
        humanSummary: {
          en: "Wristband gently settles back to subtle music-present idle state.",
          zh: "手环平稳退回低亮度待机态，继续专注听现场演奏。",
        },
        invariantCheck: {
          en: "No repeated alerts.",
          zh: "不会反复提醒，打扰观演。",
        },
      },
      {
        id: "o-flt-5",
        timestampMs: 3600,
        channel: "FLY-IO / HEALTH",
        stateLabel: { en: "Relay Ready for Next Wave", zh: "中继心跳正常待命" },
        signalLevel: 60,
        faultState: "recovered",
        rawHex: "4F 54 00 01 52 45 4C 41 59 5F 48 45 41 4C 54 48",
        decodedFields: [
          { key: "relay", value: "SYDNEY_FLY_OK" },
          { key: "staleSessions", value: "0" },
        ],
        humanSummary: {
          en: "Always-on Sydney relay clears ephemeral wave token cleanly with zero memory leak.",
          zh: "悉尼中继清除临时会话令牌，无任何脏数据残留。",
        },
        invariantCheck: {
          en: "Clean ephemeral state hygiene confirmed.",
          zh: "临时状态清理链路正常。",
        },
      },
    ],
  },
];

export function getAllReplayTraces(): readonly ReplayTrace[] {
  return REPLAY_TRACES;
}

export function getReplayTraceBySlug(slug: string): ReplayTrace | null {
  return REPLAY_TRACES.find((t) => t.slug === slug) ?? null;
}
