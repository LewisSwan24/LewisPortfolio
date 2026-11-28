import type { RawResearchVaultRecord } from "@/lib/cases/research-vault-schema";

export const onthebeatResearchVault: RawResearchVaultRecord = {
  slug: "onthebeat",
  studyStatus: "bench-tested",
  honestScopeNote: {
    en: "On 25 Sep two real wristbands (StickS3 and StickC Plus), each paired to its own device, showed MEET together through the always-on Sydney Fly.io relay with no laptop in the loop. The code was written by Claude Code. No wearer or crowd testing at a live gig has been run.",
    zh: "9 月 25 日，两支真手环（StickS3 与 StickC Plus）各配一部设备，不经电脑，经悉尼常驻 Fly.io 中继同时显示 MEET。代码由 Claude Code 编写。还没有佩戴者测试，也没有在真实演出人群里测过。",
  },
  moderatorGuide: {
    protocolTitle: {
      en: "3-Card Gig Icebreaker & Voluntary Device-Exit Protocol",
      zh: "演出现场三卡破冰与设备主动退场验证规程",
    },
    cohortAndSetting: {
      en: "Planned for pairs of solo gig-goers in a live-music venue between sets. Not run.",
      zh: "计划面向演出换场间隙的陌生乐迷，两人一组。尚未执行。",
    },
    openingBrief: {
      en: "Pick one opener card using the wristband side button, send an anonymous wave, and put the phone away once the meeting place shows.",
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
        verifiedStatus: "unverified-hypothesis",
      },
      {
        id: "otb-probe-meeting-end",
        prompt: {
          en: "Confirm MEET on both devices, observe the name and meeting-place reveal, then end it with LET'S FINISH.",
          zh: "双端都同意触发 MEET 后，观察名字和碰面地点如何出现，再用 LET'S FINISH 结束这次碰面。",
        },
        whatWeWatchFor: {
          en: "Whether a first name, a meeting place and a shared number get people to look up and meet in person instead of starting a text chat.",
          zh: "评估名字、碰面地点加上同一个编号，能否让人抬头去现场见面，而不是开始站内文字聊天。",
        },
        failureSignal: {
          en: "Users looking for a chat box or map pin because the landmark felt too ambiguous.",
          zh: "若因地标描述太含糊导致用户焦急寻找私聊框，则说明地标颗粒度仍需现场实测校准。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
    ],
    debriefQuestion: {
      en: "When the card went off after LET'S FINISH, did it feel like relief or did you want a text chat fallback?",
      zh: "「按下 LET'S FINISH 后卡片熄灭，你觉得松了口气，还是想要一个发消息的按钮？」",
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
        en: "Both wristbands showed MEET together through the cloud relay, 65 minutes after Lewis said that without a computer neither device could run.",
        zh: "两支手环经云端中继同时显示 MEET。距离 Lewis 说「没有电脑两样东西都无法运转」只过了 65 分钟。",
      },
      designResponse: {
        en: "Retired earlier localhost-only demo scripts and verified standalone field portability.",
        zh: "彻底淘汰依赖本地电脑端口的脆弱演示脚本，确立真正可带进演出现场的独立运行架构。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "otb-obs-2",
      sessionRef: { en: "Canvas Review · Sep 21", zh: "画布审查 · 9 月 21 日" },
      context: {
        en: "Reviewing the AI-generated Claude Design canvases screen by screen.",
        zh: "逐屏审查 AI 生成的 Claude Design 画布。",
      },
      observation: {
        en: "Generated canvases kept coming back with problems that had to be caught by eye.",
        zh: "生成的画布反复出现问题，要靠人眼一屏屏抓出来。",
      },
      designResponse: {
        en: "Sent the On The Beat canvas back at least 5 times on the night of 21 Sep, and the earlier Say Hello canvas at least 12 times (lower bounds from the session index).",
        zh: "9 月 21 日当晚，On The Beat 画布至少打回 5 次；更早的 Say Hello 画布至少打回 12 次（会话索引的下限）。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "otb-obs-3",
      sessionRef: { en: "ESP-NOW Thresholds · Sep 27 & Oct 9", zh: "ESP-NOW 阈值 · 9 月 27 日与 10 月 9 日" },
      context: {
        en: "Deciding when a band may say where someone is, and when two bands touching counts as a knock.",
        zh: "决定手环什么时候可以说出对方在哪里，以及两支手环相碰什么时候算一次碰手。",
      },
      observation: {
        en: "Far from every marker, the loudest marker is still some marker, heard faintly across the room. Two bands knocked while worn on two wrists were not recognised.",
        zh: "离所有标记都很远时，最响的那个标记也只是隔着房间隐约听到。两支戴在手上的手环相碰时，没有被识别出来。",
      },
      designResponse: {
        en: "A marker names an area only at -56 dBm or louder; otherwise the person stays 'in this room'. A knock needs -45 dBm or louder. No signal strength is shown to anyone.",
        zh: "标记信号达到 -56 dBm 或更强才说出所在区域，否则只显示「在这个房间」。碰手环要 -45 dBm 或更强才算数。信号强度不显示给任何人。",
      },
      verifiedStatus: "bench-tested",
    },
  ],
  ergonomicsOrStageSpec: {
    title: {
      en: "3-Card Pacing & ESP-NOW/Relay Handshake Spec",
      zh: "三卡社交节奏与低功耗信号阶梯规格",
    },
    subtitle: {
      en: "Social privacy thresholds and dual-board hardware parity rules.",
      zh: "兼顾零社死隐私阈值与双型号手环一致性的交互参数。",
    },
    rows: [
      {
        dimension: { en: "Wave · No Identity", zh: "挥手 · 不带身份" },
        constraint: { en: "No name or photo until both say yes", zh: "双方都同意之前，不显示名字和照片" },
        rationale: {
          en: "Allows low-stakes openness signaling without creating a public rejection trail.",
          zh: "让单方挥手零社交成本，没回应也不会留下任何个人曝光痕迹。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        dimension: { en: "Area Names · ESP-NOW", zh: "区域名称 · ESP-NOW" },
        constraint: { en: "Named only at -56 dBm or louder · Otherwise 'in this room'", zh: "信号达到 -56 dBm 或更强才说出区域 · 否则只显示「在这个房间」" },
        rationale: {
          en: "Chosen on 27 Sep 2026: better not to say than to say it wrong.",
          zh: "9 月 27 日定下的原则：说错不如不说。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        dimension: { en: "After Yes · Meeting Place & LET'S FINISH", zh: "同意之后 · 碰面地点与 LET'S FINISH" },
        constraint: { en: "Names + where to meet only after both agree · No chat feed", zh: "双方同意后才给名字和碰面地点 · 不设站内聊天框" },
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
        en: "Keep the night to four armable cards and end each meeting with a kind LET'S FINISH that turns the card off.",
        zh: "整晚只有四张可选卡片，每次碰面用 LET'S FINISH 好好收尾，结束后那张卡随之关闭。",
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
        en: "AI coding tools produced mock screens that only looked finished (a static MEET, localhost-only scripts).",
        zh: "早期 AI 编码反复吐出只是看起来做完的界面：写死的 MEET，以及强依赖本地端口的伪联调。",
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
        en: "Anonymous wave hides identity completely until both say yes; only then do names and a meeting place appear.",
        zh: "单向挥手全匿名，双方都同意后才亮出名字和碰面地点。",
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
        en: "Whether strangers at an actual crowded gig trust a first name, a meeting place and a shared number enough to walk over and say hello without a chat thread.",
        zh: "在嘈杂拥挤的真实演出现场，没有聊天私信。只凭名字、碰面地点和同一个编号，陌生人能不能找对人并开口打招呼。",
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
        en: "Never trust visually polished mock JSON—always test two separate live clients side by side and verify state transitions and error boundaries directly.",
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
        en: "A 'Did you find each other?' prompt on the band's screen after a minute, so a missed meeting can recover without typing. The boards have no vibration motor, so it would have to be visual or a sound.",
        zh: "配对一分钟后，在手环屏幕上问一句「找到对方了吗」，没碰上也不用掏手机打字。板子上没有震动马达，所以只能用画面或声音提示。",
      },
      verifiedStatus: "unverified-hypothesis",
    },
  ],
};
