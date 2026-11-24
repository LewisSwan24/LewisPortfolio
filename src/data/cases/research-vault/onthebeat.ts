import type { RawResearchVaultRecord } from "@/lib/cases/research-vault-schema";

export const onthebeatResearchVault: RawResearchVaultRecord = {
  slug: "onthebeat",
  studyStatus: "bench-tested",
  honestScopeNote: {
    en: "Dual-wristband hardware handshake (StickS3 + StickC Plus over always-on Sydney Fly.io relay, no laptop) passed on Sep 25, and dual-browser flow (Ava & Leo) passed on Sep 29. Real crowd testing at a live music gig remains unexecuted.",
    zh: "9 月 25 日脱离电脑完成 StickS3 + StickC Plus 双环经悉尼 Fly.io 中继真机握手，9 月 29 日走通 Ava 与 Leo 双浏览器完整流程；真实拥挤演出现场的陌生人试玩尚未执行。",
  },
  moderatorGuide: {
    protocolTitle: {
      en: "3-Card Gig Icebreaker & Voluntary Device-Exit Protocol",
      zh: "演出现场三卡破冰与设备主动退场验证规程",
    },
    cohortAndSetting: {
      en: "Scoped for pairs of solo concertgoers standing within 3–8 m in a dim live-music venue before set change.",
      zh: "面向演出现场换场间隙、彼此相距 3–8 米的陌生乐迷场景设定。",
    },
    openingBrief: {
      en: "Pick one opener card using the wristband side button, send an anonymous wave, and stop looking at the phone as soon as the landmark screen dims out.",
      zh: "「请直接按手环侧键选一张开场卡片发出匿名脉冲；一旦双方确认碰面并显示唯一地标，就把手机放回口袋别再低头刷屏幕。」",
    },
    taskProbes: [
      {
        id: "otb-probe-blind-wave",
        prompt: {
          en: "Send a wave while the second attendee ignores it for 45 seconds.",
          zh: "发起一次匿名挥手试探，观察对端 45 秒内故意不回应时的心理安全感。",
        },
        whatWeWatchFor: {
          en: "Zero name/photo exposure on unreturned waves so rejection feels silent and socially risk-free.",
          zh: "确认未获回应时对端收不到任何姓名、头像或主页链接，彻底消除当众搭讪被拒的尴尬。",
        },
        failureSignal: {
          en: "Any persistent badge, countdown, or unilateral profile preview leaking who waved.",
          zh: "只要有任何单向头像预览或反复催促弹窗，即破坏匿名安全门槛。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
      {
        id: "otb-probe-band-sync",
        prompt: {
          en: "Cycle between SAY HI, FIRST SONG?, and LET'S DANCE! using only the wristband side button in a dark room.",
          zh: "在模拟暗光现场不看手机，单靠手环侧键循环切换三张破冰卡片。",
        },
        whatWeWatchFor: {
          en: "Bidirectional relay sync back to the pocketed React app without requiring screen unlocks.",
          zh: "检验手环端状态变更能否经 Fly.io 实时反推回手机页面保持同步。",
        },
        failureSignal: {
          en: "One-way stale phone UI diverging from what the wearer clicked on their wrist.",
          zh: "若手机页与手环各说各话、出现单向状态撕裂，即判同步失败。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        id: "otb-probe-dimout",
        prompt: {
          en: "Confirm MEET on both devices and observe Card 3 landmark reveal + intentional dim-out.",
          zh: "双端同时点头触发 MEET 后，观察第三张唯一地标卡与主动熄屏退场提示。",
        },
        whatWeWatchFor: {
          en: "Whether a single venue landmark + dim-out cue nudges users to look up and meet in person instead of starting a text chat.",
          zh: "评估「唯一碰面地标 + 主动变暗退场」能否顺势把注意力交还现实见面，而非开启站内文字聊天。",
        },
        failureSignal: {
          en: "Users looking for a chat box or map pin because the landmark felt too ambiguous.",
          zh: "若因地标描述太含糊导致用户焦急寻找私聊框，则说明地标颗粒度仍需现场实测校准。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
    ],
    debriefQuestion: {
      en: "When the screen deliberately dimmed out after matching, did it feel like relief or did you want a text chat fallback?",
      zh: "「配对成功显示地标后界面主动变暗退场，让你觉得松了口气，还是反而想抓紧补个发消息按钮？」",
    },
  },
  observationLogs: [
    {
      id: "otb-obs-1",
      sessionRef: { en: "Hardware Test · Sep 25 Dual Band", zh: "真机实测 · 9 月 25 日双环握手" },
      context: {
        en: "M5StickS3 and M5StickC Plus connected exclusively to Sydney Fly.io relay with no laptop present.",
        zh: "脱离笔记本电脑，两块硬件手环（StickS3 与 StickC Plus）直连悉尼 Fly.io 常驻中继。",
      },
      observation: {
        en: "Both wristbands negotiated card state and synchronized MEET illumination independently over venue-simulated Wi-Fi.",
        zh: "两块手环无需任何电脑桥接即可完成选卡同步与双端同时点亮 MEET 状态。",
      },
      designResponse: {
        en: "Retired earlier localhost-only demo scripts and verified standalone field portability.",
        zh: "彻底淘汰依赖本地电脑端口的脆弱演示脚本，确立真正可带进演出现场的独立运行架构。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "otb-obs-2",
      sessionRef: { en: "Session Test · Sep 29 Ava & Leo", zh: "联调实测 · 9 月 29 日双端视窗" },
      context: {
        en: "Two independent React browser sessions (Ava & Leo) stepping through all 3 cards + MEET state.",
        zh: "使用 Ava 与 Leo 两个独立浏览器会话走通三张卡片到 MEET 的全状态流转。",
      },
      observation: {
        en: "Earlier AI-generated prototypes had hardcoded static MEET JSON and mislabeled every card '1 of 4' on a 3-card deck.",
        zh: "此前 AI 生成画布曾用写死的假 MEET JSON 蒙混过关，甚至把三张卡片全标成「1 of 4」。",
      },
      designResponse: {
        en: "Rejected 12+ defective AI passes until live two-party state agreement, accurate pagination, and zero black-screen deadlocks held.",
        zh: "连续打回 12 余轮虚假顺滑稿，直至真实双端状态协商、准确页码与零黑屏死锁全部过关。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "otb-obs-3",
      sessionRef: { en: "BLE Model · Proximity Thresholds", zh: "近场建模 · RSSI 握手台阶" },
      context: {
        en: "Calibrating blind pulse vs bilateral hold RSSI tiers for indoor gig pacing.",
        zh: "围绕室内演出人群密度校准匿名挥手脉冲与双向握手的信号台阶。",
      },
      observation: {
        en: "Continuous proximity radar displays turn a music gig into a stressful surveillance grid.",
        zh: "持续刷新的米级距离雷达会把听歌现场变成令人焦虑的「附近人扫描仪」。",
      },
      designResponse: {
        en: "Stepped down to coarse proximity tiers (-68 dBm blind pulse -> -58 dBm mutual hold) with zero live distance numbers shown to users.",
        zh: "在界面上完全隐藏冷冰冰的米数与信号值，只用 -68 dBm 匿名感知与 -58 dBm 双向握稳两个粗台阶驱动卡片节奏。",
      },
      verifiedStatus: "bench-tested",
    },
  ],
  ergonomicsOrStageSpec: {
    title: {
      en: "3-Card Pacing & BLE/Relay Handshake Spec",
      zh: "三卡社交节奏与低功耗信号阶梯规格",
    },
    subtitle: {
      en: "Social privacy thresholds and dual-board hardware parity rules.",
      zh: "兼顾零社死隐私阈值与双型号手环一致性的交互参数。",
    },
    rows: [
      {
        dimension: { en: "Card 1 · Blind Pulse", zh: "一卡 · 匿名挥手脉冲" },
        constraint: { en: "-68 dBm range · Zero name/photo broadcast", zh: "-68 dBm 感知窗 · 零姓名/头像广播" },
        rationale: {
          en: "Allows low-stakes openness signaling without creating a public rejection trail.",
          zh: "让单方挥手零社交成本，没回应也不会留下任何个人曝光痕迹。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        dimension: { en: "Card 2 · Mutual Nod Gate", zh: "二卡 · 对称点头门禁" },
        constraint: { en: "-58 dBm bilateral hold · Both sides must confirm", zh: "-58 dBm 双向握稳 · 必须双端均点确认" },
        rationale: {
          en: "Prevents one-sided pushiness from forcing a name/location reveal on an unwilling attendee.",
          zh: "严防单方面强行解锁，只有双方同一窗口点头才进入下一步。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        dimension: { en: "Card 3 · Intentional Dim-Out", zh: "三卡 · 唯一地标与主动退场" },
        constraint: { en: "Single landmark + automatic dim-out · No chat feed", zh: "仅给一处现场地标 + 界面变暗 · 禁止站内聊天框" },
        rationale: {
          en: "Forces the software to step back so real conversation happens eye-to-eye rather than inside a glowing phone.",
          zh: "强迫软件在完成撮合后体面退场，把时间还给线下听歌与面对面寒暄。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
      {
        dimension: { en: "Hardware Deck Parity", zh: "双硬件侧键同步" },
        constraint: { en: "StickS3 & StickC Plus share Fly.io state stream", zh: "StickS3 与 StickC Plus 共享悉尼中继状态流" },
        rationale: {
          en: "Keeps wrist interactions usable in a dark crowd even when the phone stays in a pocket.",
          zh: "确保在拥挤暗光场内无需频繁掏出手机，抬腕侧键即可切卡与确认。",
        },
        verifiedStatus: "bench-tested",
      },
    ],
  },
  triRoleTension: [
    {
      role: "pm-product",
      roleLabel: { en: "Social Product Designer", zh: "社交产品与节奏设计师" },
      priority: {
        en: "Help solo concertgoers break the ice without turning the app into an attention-draining dating feed.",
        zh: "帮独自看演出的观众轻松破冰，同时避免产品滑向耗人精力的刷脸交友软件。",
      },
      tension: {
        en: "Standard social apps optimize for endless DMs and dwell time, directly contradicting live music presence.",
        zh: "传统社交产品追求站内留存与私信条数，恰恰与看现场演出的沉浸感背道而驰。",
      },
      resolution: {
        en: "Cap the entire experience at 3 cards and celebrate success by dimming the screen out.",
        zh: "把全流程死锁在三张卡片，把「界面主动变暗退场」定义成最终成功态。",
      },
    },
    {
      role: "engineering-hardware",
      roleLabel: { en: "Embedded & Relay Engineer", zh: "嵌入式与云中继工程师" },
      priority: {
        en: "Make two mismatched ESP32 wristbands + React phones agree reliably without a laptop tether.",
        zh: "让两块不同型号 ESP32 手环与手机端在无笔记本现场稳定对齐状态。",
      },
      tension: {
        en: "AI coding tools produced deceptive mock screens (fake MEET states, broken pagination, localhost-only scripts).",
        zh: "早期 AI 编码反复吐出静态假状态、错乱页码与强依赖本地端口的伪联调。",
      },
      resolution: {
        en: "Deploy always-on Sydney Fly.io relay and enforce real dual-session + dual-band sign-off.",
        zh: "部署悉尼常驻中继，并以双会话及脱离电脑真机双环实测作为唯一放行标准。",
      },
    },
    {
      role: "end-user",
      roleLabel: { en: "Solo Gig Attendee", zh: "独自观演的乐迷" },
      priority: {
        en: "Avoid awkward rejection, protect personal identity, and enjoy the live band undisturbed.",
        zh: "不想搭讪失败后全程尴尬，不想暴露隐私给陌生人，更不想整晚低头回消息。",
      },
      tension: {
        en: "Wanting a gentle signal to meet someone nearby while fearing unwanted visibility.",
        zh: "既渴望释放「我愿意聊聊」的信号，又怕被全场雷达盯上。",
      },
      resolution: {
        en: "Anonymous wave hides identity completely until mutual nod; landmark card retires screens immediately.",
        zh: "单向挥手全匿名，双方互点头才亮名字与唯一碰面点，随后即刻息屏。",
      },
    },
  ],
  rebuildToday: [
    {
      id: "otb-q1",
      question: {
        en: "What social hypothesis still needs real-world proof?",
        zh: "目前最核心的未验证社交假设是什么？",
      },
      answer: {
        en: "Whether strangers at an actual crowded gig trust a dim-out landmark card enough to walk over and say hello without a quick confirmation chat message.",
        zh: "在嘈杂拥挤的真实演出现场，没有文字确认私信、只凭唯一地标熄屏退场，陌生人到底能不能顺利找对人并开口寒暄。",
      },
      verifiedStatus: "unverified-hypothesis",
    },
    {
      id: "otb-q2",
      question: {
        en: "What hardware edge case remains open on StickC Plus?",
        zh: "StickC Plus 上还留着哪个诚实的硬件边界？",
      },
      answer: {
        en: "Front-button single-press wave-back ergonomics on the smaller StickC Plus casing still need dedicated pocket-gesture tuning compared to StickS3.",
        zh: "StickC Plus 体积更小，其正面短按直接回挥的手感与误触窗口仍待专门的真机补充测试。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "otb-q3",
      question: {
        en: "What AI-prototyping lesson transferred directly to other cases?",
        zh: "这个项目踩出的 AI 原型协作经验如何反哺其他作品？",
      },
      answer: {
        en: "Never trust visually polished mock JSON—always test two separate live clients side by side and verify pagination and error boundaries directly.",
        zh: "绝不轻信表面顺滑的静态假联调，必须开两个独立真实客户端并排验证双向状态与边界文案。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "otb-q4",
      question: {
        en: "What would I add without breaking the calm withdrawal rule?",
        zh: "在不破坏「安静退场」原则下，下一步可以补什么细节？",
      },
      answer: {
        en: "A one-tap 60-second 'Did you find each other?' haptic nudge at the wrist—only if neither band moves—so missed landmarks recover gracefully without typing.",
        zh: "仅在配对 60 秒后补充一次轻柔的手腕震动小确认（找没找到彼此），无需掏手机打字即可体面收尾或微调。",
      },
      verifiedStatus: "unverified-hypothesis",
    },
  ],
};
