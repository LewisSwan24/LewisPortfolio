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
      zh: "M5StickS3 (ESP32-S3) <-> Node 24 桌面桥接 <-> Fly.io wss:// 零知识中继",
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
        stateLabel: { en: "HELLO 30s Physical Key Hold", zh: "HELLO 30 秒当面实体配对" },
        signalLevel: 64,
        faultState: "nominal",
        rawHex: "AA 55 02 1E 48 45 4C 4C 4F 5F 46 52 4F 4E 54 01",
        decodedFields: [
          { key: "challengeWindowMs", value: "30000" },
          { key: "physicalKey", value: "FRONT_GPIO_ACK" },
          { key: "keySealed", value: "pair.key (AES-256)" },
        ],
        humanSummary: {
          en: "Developer holds Front Key on M5StickS3 inside the 30s challenge window; pair.key derives locally and seals into NVS.",
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
          en: "Hot-mic remains off until deliberate > 250 ms PTT press.",
          zh: "麦克风保持物理静默，直至下次长按超过 250 ms 才采音。",
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
      en: "MazeRunners · 10-Zone IR Debounce & Dual-Board Sync",
      zh: "MazeRunners · 十路红外消抖与双板串口对齐",
    },
    transportSummary: {
      en: "PlanB Arduino Mega (10x FC-51 IR) + SafeTouchServoController -> 115200 Web Serial Console",
      zh: "PlanB Arduino Mega (十路红外) + SafeTouchServo 独立舵机板 -> Web Serial 控制台",
    },
    honestCalibrationNote: {
      en: "Replays bench-calibrated 45 ms IR stability window, 1200 ms cooldown lockout, and isolated servo actuation parity.",
      zh: "精准重放台架标定的 45 ms 红外稳态消抖窗口、1200 ms 单通道冷却锁及双控隔离事件流。",
    },
    verifiedStatus: "bench-tested",
    faultInjectionLabel: {
      en: "Inject 15 ms IR Sensor Bounce",
      zh: "注入故障：钢球擦边引发 15 ms 红外电平抖动",
    },
    faultInjectionSummary: {
      en: "Simulates raw FC-51 optical chatter under rolling steel ball wobble; firmware suppresses the 15 ms spike so score & haptic buzz never double-fire.",
      zh: "模拟钢球压线震荡产生的 15 ms 红外毛刺；固件消抖门控将其就地吞掉，保证计分牌与指套震动绝不误扣两次分。",
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
        stateLabel: { en: "Beam Break >= 45 ms Stable", zh: "04 号陷阱红外稳定遮断 (>=45 ms)" },
        signalLevel: 95,
        faultState: "nominal",
        rawHex: "4D 5A 02 04 49 52 5F 54 52 41 50 5F 34 35 4D 53",
        decodedFields: [
          { key: "zone", value: "TRAP_04" },
          { key: "lowDwellMs", value: "48" },
          { key: "thresholdMs", value: "45" },
        ],
        humanSummary: {
          en: "Steel ball cleanly breaks IR beam #04 for 48 ms, clearing the 45 ms firmware stability gate.",
          zh: "钢球连续遮断 04 号红外光束 48 ms，越过 45 ms 稳态门限。",
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
        stateLabel: { en: "Atomic Event & 1200 ms Lockout", zh: "单一原子事件与 1200 ms 冷却锁定" },
        signalLevel: 88,
        faultState: "nominal",
        rawHex: "4D 5A 03 04 4C 4F 43 4B 5F 31 32 30 30 4D 53 01",
        decodedFields: [
          { key: "scoreDelta", value: "-10" },
          { key: "fingerHaptic", value: "PULSE_180MS" },
          { key: "cooldownMs", value: "1200" },
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
        timestampMs: 1560,
        channel: "FC51-IR[04]",
        stateLabel: { en: "Cooldown Expired · Zone Re-Armed", zh: "1200 ms 冷却期满重新布防" },
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
          en: "Debounce timer armed at t=0 ms.",
          zh: "t=0 ms 启动消抖采样定时器。",
        },
      },
      {
        id: "m-flt-2",
        timestampMs: 15,
        channel: "FC51-IR[04]",
        stateLabel: { en: "15 ms Bounce Rejected", zh: "拦截 15 ms 高频毛刺（未达 45 ms）" },
        signalLevel: 18,
        faultState: "fault",
        rawHex: "FF 5A 02 04 42 4F 55 4E 43 45 5F 31 35 4D 53 00",
        decodedFields: [
          { key: "spikeDurationMs", value: "15" },
          { key: "gateThresholdMs", value: "45" },
          { key: "penaltyEmitted", value: "FALSE_SUPPRESSED" },
        ],
        humanSummary: {
          en: "Pin returns HIGH at 15 ms (< 45 ms floor). Firmware drops the spike cleanly with zero haptic or score misfire.",
          zh: "电平在 15 ms 处弹回高电平（低于 45 ms 硬门限）。固件直接丢弃本次抖动，指套不震、计分不扣。",
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
        stateLabel: { en: "Servo Stall Isolated", zh: "舵机堵转电流与主控板隔离" },
        signalLevel: 44,
        faultState: "fault",
        rawHex: "FF 5A 03 00 53 45 52 56 4F 5F 4C 49 4D 49 54 01",
        decodedFields: [
          { key: "servoBoard", value: "CURRENT_CLAMPED" },
          { key: "megaScoreLoop", value: "UNAFFECTED_5V" },
        ],
        humanSummary: {
          en: "Even when players jam the tilt board against mechanical stops, isolated SafeTouchServoController protects the Mega clock.",
          zh: "即使玩家用力顶死木板触及机械限位，独立舵机板也会吸收电流波动，主控板计分与计时纹丝不动。",
        },
        invariantCheck: {
          en: "Actuator fault never drops active round score.",
          zh: "执行器限位故障绝不导致整局复位丢分。",
        },
      },
      {
        id: "m-flt-4",
        timestampMs: 140,
        channel: "FC51-IR[04]",
        stateLabel: { en: "Confirmed 50 ms Real Pass", zh: "真球入洞：连续 50 ms 遮断确认" },
        signalLevel: 94,
        faultState: "recovered",
        rawHex: "4D 5A 04 04 56 41 4C 49 44 5F 50 41 53 53 35 30",
        decodedFields: [
          { key: "dwellMs", value: "50" },
          { key: "atomicEvent", value: "TRAP_04_HIT_ONCE" },
        ],
        humanSummary: {
          en: "Ball drops into hole cleanly for 50 ms; system fires exactly 1 penalty and engages 1200 ms lockout.",
          zh: "钢球真正落入陷阱并持续遮断 50 ms，系统精准发出 1 次罚分并随即开启 1200 ms 冷却。",
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
      en: "On The Beat · BLE RSSI Pacing & Bilateral Nod Sync",
      zh: "On The Beat · 近场信号台阶与双向点头退场",
    },
    transportSummary: {
      en: "StickS3 + StickC Plus Wristbands <-> Sydney Fly.io Relay <-> React Venue Clients",
      zh: "StickS3 + StickC Plus 双手环 <-> 悉尼 Fly.io 常驻中继 <-> 手机 React 端",
    },
    honestCalibrationNote: {
      en: "Combines verified Sep 25/29 dual-device relay handshakes with modeled -68/-58 dBm proximity tiers (live concert crowd RF trials remain unexecuted).",
      zh: "结合 9 月 25/29 日双端真机握手实测与 -68/-58 dBm 信号台阶模型（真实拥挤演出现场射频实验尚未开展）。",
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
          en: "Accurate '1 of 3' pagination (rejected AI's broken '1 of 4').",
          zh: "精确页码 1/3 校验通过（已清除 AI 早期错乱的 1/4 标号）。",
        },
      },
      {
        id: "o-nom-2",
        timestampMs: 550,
        channel: "BLE / RSSI",
        stateLabel: { en: "-68 dBm Blind Wave Pulse", zh: "-68 dBm 匿名挥手脉冲" },
        signalLevel: 66,
        faultState: "nominal",
        rawHex: "4F 54 02 BC 42 4C 49 4E 44 5F 57 41 56 45 5F 44",
        decodedFields: [
          { key: "rssiDbm", value: "-68 dBm" },
          { key: "nameShared", value: "FALSE" },
          { key: "photoShared", value: "FALSE" },
        ],
        humanSummary: {
          en: "Proximity tier hits -68 dBm; peer sees only 'Someone nearby waved' with zero name, photo, or profile link.",
          zh: "近场信号进入 -68 dBm 窗口；对端仅收到「附近有人挥手」，零姓名、零头像、零个人主页曝光。",
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
        stateLabel: { en: "-58 dBm Bilateral Hold Sync", zh: "-58 dBm 双向点头协同握手" },
        signalLevel: 88,
        faultState: "nominal",
        rawHex: "4F 54 03 C6 4D 55 54 55 41 4C 5F 4E 4F 44 5F 4F",
        decodedFields: [
          { key: "rssiDbm", value: "-58 dBm" },
          { key: "peerA_ack", value: "TRUE" },
          { key: "peerB_ack", value: "TRUE" },
        ],
        humanSummary: {
          en: "Both wristbands / browser clients confirm within the mutual window over the always-on Sydney Fly.io relay.",
          zh: "双端均在悉尼常驻 Fly.io 中继上确认点头，拒绝静态假 MEET 欺骗。",
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
        channel: "OLED / DIM-OUT",
        stateLabel: { en: "Card 3 Intentional Dim-Out", zh: "三号卡主动变暗息屏退场" },
        signalLevel: 24,
        faultState: "nominal",
        rawHex: "4F 54 05 00 44 49 4D 5F 4F 55 54 5F 45 58 49 54",
        decodedFields: [
          { key: "screenLuminance", value: "DIMMED_20PCT" },
          { key: "status", value: "DEVICE_WITHDRAWN" },
        ],
        humanSummary: {
          en: "After landmark handshake, screen gently dims out so both attendees pocket devices and talk face-to-face.",
          zh: "地标交接后界面主动调暗退居二线，让双方收起设备自然聊天。",
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
        channel: "BLE / RSSI",
        stateLabel: { en: "Blind Wave Sent (-68 dBm)", zh: "发出匿名挥手脉冲 (-68 dBm)" },
        signalLevel: 65,
        faultState: "nominal",
        rawHex: "4F 54 02 BC 57 41 56 45 5F 50 45 4E 44 49 4E 47",
        decodedFields: [
          { key: "ttlMs", value: "30000" },
          { key: "senderIdentity", value: "REDACTED" },
        ],
        humanSummary: {
          en: "Attendee triggers a blind wave; 30-second anonymous TTL window starts.",
          zh: "发出匿名试探脉冲，开启 30 秒静默等待窗口。",
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
          en: "No repeated notification spam.",
          zh: "绝不重复震动打扰观演。",
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
