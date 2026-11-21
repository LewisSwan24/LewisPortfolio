import type { CaseRecord } from "@/lib/cases/schema";

export const walkieCase: CaseRecord = {
  slug: "walkie",
  status: "listed",
  featuredOrder: 2,
  roleTracks: ["interaction", "design-eng", "ai-ux"],
  cover: {
    src: "/projects/walkie/01-architecture.svg",
    width: 1280,
    height: 720,
    fit: "contain",
    alt: {
      en: "Walkie architecture schematic: M5StickS3 app1 wrist remote over AES-256-GCM USB or Fly.io relay to Node 24 bridge and Claude Code",
      zh: "Walkie 架构示意图：M5StickS3 app1 手腕终端经 AES-256-GCM USB 或 Fly.io 中继连接 Node 24 桥接与 Claude Code",
    },
  },
  links: [
    {
      label: "Source on GitHub",
      href: "https://github.com/LewisSwan24/walkie",
      external: true,
    },
  ],
  media: {
    label: "Hardware & protocol schematic",
    labelZh: "硬件与协议架构图",
    blurb:
      "Drawn directly from the public repository (README, protocol/frames.md, firmware/ and bridge/). No wrist photographs are committed yet, so this case shows the architecture honestly rather than staged renders.",
    blurbZh:
      "直接依据公开仓库（README、protocol/frames.md、firmware/ 与 bridge/）绘制。目前尚未留存手腕实拍照片，因此本案例诚实展示系统架构图而非摆拍渲染图。",
    images: [
      {
        src: "/projects/walkie/01-architecture.svg",
        width: 1280,
        height: 720,
        alt: "System diagram connecting M5StickS3 dual-boot firmware, AES-256-GCM sealed frames over USB or Fly.io relay, Node 24 bridge, and Claude Code permission approvals",
        altZh: "系统架构图：连接 M5StickS3 双启动固件、基于 USB 或 Fly.io 中继的 AES-256-GCM 加密帧、Node 24 桥接与 Claude Code 权限审批队列",
        caption:
          "USB always wins when plugged in; away from the cable, sealed frames cross a zero-knowledge Fly.io relay and tool permissions wait for a physical button press on the wrist.",
        captionZh:
          "插线时 USB 永远优先；离缆后，加密帧经零知识 Fly.io 中继传输，所有工具权限都在手腕上等待实体按键确认。",
      },
    ],
  },
  card: {
    en: {
      kicker: "Physical AI Agent · Hardware + Sealed Protocol",
      title: "Walkie",
      sub: "A wrist voice remote for Claude Code on M5StickS3 — dual-boot firmware, AES-256-GCM sealed transport, and physical tool-approval buttons.",
      role: "Solo · Product, hardware UX & verification",
      date: "2026 · Oct",
      m1: "Dual-boot S3 (app1)",
      m2: "AES-256-GCM + USB/Relay",
      m3: "3 hardware/protocol gates",
    },
    zh: {
      kicker: "物理 AI 交互 · 硬件 + 加密协议",
      title: "Walkie",
      sub: "跑在 M5StickS3 手腕上的 Claude Code 语音遥控器：双启动固件、AES-256-GCM 加密链路，以及手腕实体按键审批工具权限。",
      role: "独立负责 · 交互规则、硬件联调与验收",
      date: "2026 · 10",
      m1: "M5StickS3 双启动 (app1)",
      m2: "AES-256-GCM 加密链路",
      m3: "3 组硬件与协议验收门禁",
    },
  },
  narrative: {
    en: {
      hero: {
        title: "Talking to an autonomous coding agent from the wrist — without giving up physical approval.",
        sub: "A PlatformIO C++ firmware, a Node 24 desktop bridge, and a zero-knowledge Fly.io relay sharing one M5StickS3 watch with On The Beat.",
      },
      roleVal: "Solo — interaction model, protocol constraints, hardware flashing and gate checks (AI coding tools assisted implementation)",
      timeVal: "2026 · September–October",
      teamVal: "Solo project",
      toolsVal: "M5StickS3 · PlatformIO C++ · Node 24 · WebSocket · AES-256-GCM · OpenAI / Gemini Speech · Fly.io",
      ch: {
        label: "Challenge",
        title: "Long-running coding agents keep blocking on short permission checks when you step away from the desk.",
        p: "When directing Claude Code across multiple projects, you rarely need a full monitor just to answer a permission prompt or give a one-sentence follow-up. The problem is trust and safety: a voice remote cannot silently approve destructive commands, cannot leak credentials through a cloud relay, and cannot brick the other firmware (On The Beat) living on the same M5StickS3.",
      },
      re: {
        label: "System & Gates",
        title: "Verified through three reproducible hardware and protocol gates rather than hand-waving.",
        m1: {
          t: "Portable C++ + host tests",
          b: "Wire framing (lib/proto) and key-gesture / paging / state-machine logic (lib/ui) compile and run on the PC via g++ inside npm test before touching hardware.",
        },
        m2: {
          t: "No-hands S3 test hooks",
          b: "gate-h drives 11 real screen and button scenes on the S3 via TEST frames; gate-p5 verifies on-chip HKDF/AES-GCM self-test vectors, pairing refusal, and 4-bit ADPCM audio takes.",
        },
        m3: {
          t: "Away-from-cable relay gate",
          b: "check-relay-roots pins ISRG Root X1/X2 certificates; gate-l tests a 75-second idle keep-alive, reconnect, and second-bridge takeover across the Fly.io wss:// relay.",
        },
      },
      sy: {
        label: "Core Design Moves",
        title: "Physicality as an explicit security and attention boundary.",
        p: "Every risky transition requires a deliberate physical press on the watch: holding the front key captures 16 kHz press-to-talk audio; pairing a new PC requires pressing the front key on the S3 within 30 seconds before pair.key is saved; Claude Code tool permissions enter an explicit approval queue where front key approves and side key denies (with an optional spoken reason). Holding both keys for 3 seconds switches cleanly to app0 (On The Beat), while firmware/guard.py refuses -t erase and -t uploadfs so a flash mistake never wipes the sibling app.",
      },
      id: {
        label: "Transport & Privacy",
        p: "Every frame after HELLO and PAIR is sealed with AES-256-GCM under a session key derived from pair.key. Over USB, the link sends uncompressed PCM; over Wi-Fi and the Fly.io relay, --codec adpcm cuts audio to 4 bits per sample while the relay forwards ciphertext without holding any key. USB always wins whenever plugged in, and if the link fails away from the cable, the watch explicitly distinguishes no Wi-Fi, relay unreachable, and PC bridge offline.",
      },
      pr: {
        label: "Bridge & Speech Pipeline",
        p: "The Node 24 bridge prewarms one Claude Code process per configured project, routes recordings through OpenAI speech (falling back to Gemini on failure), classifies walkie commands (yes, no [reason], stop, continue, compact, switch project) versus prompts, and speaks the reply back to the wrist. API keys live outside the repository in %APPDATA%\\walkie\\keys.env and are never printed.",
      },
      te: {
        label: "Testing & Limits",
        p: "Automated tests never invoke live paid APIs or real Claude sessions — they run against bridge/test/claude/fake-claude.js. Hardware gates validate screens, buttons, encryption vectors, and relay keep-alive on the physical S3. What is not verified yet is multi-user ergonomics or long-term daily wear outside Lewis's own desk.",
      },
      ou: {
        label: "Outcome",
        p: "A working dual-boot wrist voice remote with sealed USB and Wi-Fi relay transports, per-project Claude session management, and reproducible automated gates across firmware, bridge, and relay. Publicly documented in LewisSwan24/walkie; used only by Lewis so far, with no external participant study or wrist photography archived yet.",
        m1: { v: "2", label: "transports (USB wins; sealed Fly.io relay fallback)" },
        m2: { v: "11", label: "automated on-device screen & key scenes (gate-h)" },
        m3: { v: "1/4", label: "audio bandwidth via 4-bit ADPCM over relay" },
      },
      rf: {
        label: "Reflection",
        p: "Building hardware for an AI coding agent forced every vague UX idea into a concrete wire frame or button rule. When the screen is tiny and there is no keyboard, you discover quickly which agent states truly matter: listening, waiting on approval, which project is active, and why the link dropped.",
      },
    },
    zh: {
      hero: {
        title: "在手腕上跟编码 Agent 对话——同时把高风险审批留在实体按键上。",
        sub: "一套 PlatformIO C++ 固件、Node 24 桌面桥接与零知识 Fly.io 中继，与 On The Beat 共享同一块 M5StickS3 双启动手表。",
      },
      roleVal: "独立负责：交互模型、协议约束、固件刷写与硬件门禁验收（AI 编码工具辅助实现）",
      timeVal: "2026 年 9–10 月",
      teamVal: "独立项目",
      toolsVal: "M5StickS3 · PlatformIO C++ · Node 24 · WebSocket · AES-256-GCM · OpenAI / Gemini 语音 · Fly.io",
      ch: {
        label: "问题",
        title: "离开桌面时，长耗时编码 Agent 经常卡在只需一句话或一次点头的权限确认上。",
        p: "同时指挥多个项目的 Claude Code 时，回答一次工具审批或补一句指令并不需要回到显示器前。真正的难点在于信任与安全：语音遥控绝不能静默放行高风险操作，不能把会话明文暴露给云端中继，也不能在刷机时误擦掉同一块 M5StickS3 上跑着的另一个项目（On The Beat）。",
      },
      re: {
        label: "系统与门禁",
        title: "不靠口头演示，而是通过三组可复现的硬件与协议门禁验收。",
        m1: {
          t: "可移植 C++ 与宿主机单测",
          b: "线协议封包（lib/proto）与按键手势、分页、状态机逻辑（lib/ui）在刷入硬件前先由 npm test 调 g++ 在 PC 端编译运行测试。",
        },
        m2: {
          t: "免手触 S3 硬件测试钩子",
          b: "gate-h 通过 TEST 帧在真机上跑完 11 个屏幕与按键场景；gate-p5 验证芯片内 HKDF/AES-GCM 测试向量、配对拒绝与 4-bit ADPCM 录音。",
        },
        m3: {
          t: "离缆中继与证书门禁",
          b: "check-relay-roots 校验 ISRG Root X1/X2 证书链；gate-l 在 Fly.io wss:// 中继上验证 75 秒空闲保活、断线重连与双桥接抢占。",
        },
      },
      sy: {
        label: "核心设计决策",
        title: "用实体物理动作划定安全与注意力边界。",
        p: "每一个有风险的状态切换都绑定明确的实体按键：按住前键采集 16 kHz 对讲录音、松开发送；新电脑配对必须在 30 秒内按 S3 前键确认才会写入 pair.key；Claude Code 工具权限进入独立审批队列，前键同意、侧键拒绝（并可口述拒绝原因）。同时按住双键 3 秒即可切换回 app0（On The Beat），firmware/guard.py 则直接拦截 -t erase 与 -t uploadfs 防止误擦除。",
      },
      id: {
        label: "加密与传输",
        p: "除 HELLO 与 PAIR 外的所有帧均由 pair.key 派生的会话密钥以 AES-256-GCM 加密。插线时走 USB 原始 PCM，离缆后走 Wi-Fi + Fly.io 零知识中继并可选 4-bit ADPCM（带宽降至 1/4）。USB 只要插入即自动抢占；离线界面清晰区分「连不上 Wi-Fi」「连不上中继」与「电脑没在线」。",
      },
      pr: {
        label: "桥接与语音管线",
        p: "Node 24 桥接为配置好的每个项目预热独立 Claude Code 进程，录音经 OpenAI 语音接口处理（失败自动回退 Gemini），区分控制指令（同意/拒绝/停止/继续/切换项目）与对话内容，再把摘要语音回传手表。API 密钥放在仓库外的 %APPDATA%\\walkie\\keys.env，永不打印到日志。",
      },
      te: {
        label: "测试与诚实边界",
        p: "自动化单测不消耗真实付费 API，而是使用 bridge/test/claude/fake-claude.js 替身进程。硬件门禁已在 S3 真机跑通协议、按键与加密向量；但目前仅由 Lewis 本人使用，没有外部用户测试，仓库中也尚未归档手表屏幕实拍照片。",
      },
      ou: {
        label: "结果",
        p: "交付了一套可运行的双启动手腕语音遥控器，打通 USB 与加密云中继双通道、多项目 Claude 会话管理与三组自动化验收门禁。代码公开于 LewisSwan24/walkie，目前尚无外部受试数据。",
        m1: { v: "2", label: "传输通道（USB 优先，加密 Fly.io 中继兜底）" },
        m2: { v: "11", label: "真机自动化屏幕与按键验收场景（gate-h）" },
        m3: { v: "1/4", label: "离缆 4-bit ADPCM 音频带宽占比" },
      },
      rf: {
        label: "反思",
        p: "为编码 Agent 做硬件交互，会逼着你把所有模糊的 UX 想法压缩成清晰的帧协议和按键规则。当屏幕只有拇指大小、没有键盘时，哪些 Agent 状态真正不可或缺会立刻浮出水面：正在听、等待审批、当前在哪个项目，以及为什么断连。",
      },
    },
  },
};
