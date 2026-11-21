import type { CaseRecord } from "@/lib/cases/schema";

export const walkieCase: CaseRecord = {
  slug: "walkie",
  status: "listed",
  featuredOrder: 2,
  roleTracks: ["interaction", "design-eng", "ai-ux"],
  workSummary: {
    order: 9,
    tags: ["flag", "hardware", "ai"],
    year: "2026",
    dur: "Dual-boot S3 build",
    problem: {
      en: "Stepping away from the desk leaves coding agents blocked on short permission checks",
      zh: "离开电脑前，编码 Agent 常常卡在简短的权限审批与一句追问上",
    },
    changed: {
      en: "A sealed AES-256-GCM wrist voice remote where physical watch buttons own every approval",
      zh: "一套 AES-256-GCM 加密手腕语音遥控器，高风险审批全部落在实体按键上",
    },
  },
  reviewMeta: {
    reviewedAt: "2026-11-21",
    nextReviewAt: "2027-02-21",
    auditNote: "Verified LewisSwan24/walkie gates (gate-h, gate-p5, gate-l) and fake-claude test isolation for V3.1 baseline.",
  },
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
  interactiveDemo: {
    id: "walkie-wrist",
    placement: "after-summary",
    eyebrow: {
      en: "Interactive prototype · Hardware approval gate",
      zh: "可操作活原型 · 手腕实体审批门控",
    },
    title: {
      en: "Test the wrist permission loop yourself",
      zh: "亲手试一下手腕语音与工具审批闭环",
    },
    prompt: {
      en: "Switch between USB cable and zero-knowledge relay, trigger a Claude Code tool request on the right, then press the watch Front Key (Enter) to approve or Side Key (Backspace) to deny.",
      zh: "先切换 USB 有线或无线零知识中继，在右侧触发一条 Claude Code 请求，再按下手表前键（Enter）批准或侧键（Backspace）拒绝。",
    },
    takeaway: {
      en: "High-impact agent calls block until a deliberate physical key press on the wrist; USB preempts wireless whenever plugged in.",
      zh: "高风险 Agent 工具调用必须等待手腕实体按键才放行；只要插上 USB 线，有线链路立即抢占无线中继。",
    },
  },
  processArtifacts: {
    quotes: {
      eyebrow: {
        en: "Hardware & protocol insights",
        zh: "真机实测与协议归因卡",
      },
      title: {
        en: "Field constraints that shaped physical keys and sealed framing",
        zh: "硬件与安全场景暴露的卡点如何决定按键与链路规则",
      },
      items: [
        {
          id: "walkie-voice-ambiguity",
          category: "physical",
          quote: {
            en: "\"Approving a shell command purely by voice fails as soon as background noise triggers a false 'yes'.\"",
            zh: "「如果只靠语音识别说『好』就放行高危命令，房间里一有杂音就会误批准。」",
          },
          context: {
            en: "Away-from-desk Claude Code workflow probe",
            zh: "离桌远程指挥 Claude Code 场景实测",
          },
          friction: {
            en: "Speech-to-text lacks a deliberate, noise-immune commitment signal.",
            zh: "语音转文字在嘈杂环境下无法充当可靠的不可逆操作门控。",
          },
          decision: {
            en: "Bound tool approvals exclusively to deliberate physical Front/Side key presses on M5StickS3.",
            zh: "将工具审批硬性绑定到 M5StickS3 手腕实体前键（批准）与侧键（拒绝）。",
          },
        },
        {
          id: "walkie-dualboot-guard",
          category: "trust",
          quote: {
            en: "\"Sharing one M5StickS3 across Walkie and On The Beat means one careless flash flag wipes the sibling app.\"",
            zh: "「同一块手表同时跑 Walkie 和 On The Beat，一条误触擦除命令就会把另一个应用抹掉。」",
          },
          context: {
            en: "Dual-boot firmware maintenance on S3",
            zh: "M5StickS3 双启动固件日常烧录维护",
          },
          friction: {
            en: "Standard esptool workflows expose -t erase without sibling-slot awareness.",
            zh: "默认刷写脚本不感知同机双启动分区边界。",
          },
          decision: {
            en: "Added firmware/guard.py blocking -t erase and -t uploadfs before flashing.",
            zh: "在固件层加入 firmware/guard.py 拦截 -t erase 与 -t uploadfs 危险参数。",
          },
        },
      ],
    },
    microLoop: {
      eyebrow: {
        en: "Vector micro-loop · Sealed wrist cycle",
        zh: "矢量交互微循环 · 手腕加密审批闭环",
      },
      title: {
        en: "Press-to-talk → USB/Relay switch → Wrist gate → Spoken summary",
        zh: "按住录音 → 链路无缝切换 → 手腕物理审批 → 语音简报回传",
      },
      summary: {
        en: "Inspect the 4-stage wire and attention loop without loading heavy video captures.",
        zh: "无需加载大体积录屏视频，按帧步进或暂停查看端到端加密与实体确认闭环。",
      },
      loopId: "walkie-relay",
      steps: [
        {
          label: { en: "Hold Front Key", zh: "按住前键录音" },
          detail: {
            en: "S3 samples 16 kHz press-to-talk audio locally while holding the physical front button.",
            zh: "按住实体前键采集 16 kHz 本地语音，松开才封包发送。",
          },
        },
        {
          label: { en: "USB / Sealed Relay", zh: "USB / 加密中继" },
          detail: {
            en: "USB PCM wins whenever plugged in; unplugging switches cleanly to AES-256-GCM 4-bit ADPCM over Fly.io.",
            zh: "插线时 USB PCM 优先抢占；拔线后自动切换为 AES-256-GCM 4-bit ADPCM 零知识中继。",
          },
        },
        {
          label: { en: "Wrist Key Gate", zh: "手腕审批门控" },
          detail: {
            en: "Claude tool permissions wait on the S3 screen until Front Key approves or Side Key denies.",
            zh: "Claude 工具调用阻塞等待 S3 手腕确认：前键放行，侧键拦截并可口述原因。",
          },
        },
        {
          label: { en: "Voice Brief Back", zh: "语音简报回传" },
          detail: {
            en: "Node 24 bridge synthesizes a brief summary and streams audio to the wrist speaker.",
            zh: "Node 24 桥接合成简短摘要语音回传至手腕扬声器，免看电脑屏完成闭环。",
          },
        },
      ],
    },
  },
  card: {
    en: {
      kicker: "Physical AI Agent · Tactile Approvals",
      title: "Walkie",
      sub: "A wrist voice remote for Claude Code on M5StickS3 — keeping risky agent approvals anchored to deliberate physical button presses.",
      role: "Solo · Product, hardware UX & verification",
      date: "2026 · Oct",
      m1: "Dual-boot S3 watch",
      m2: "Physical key approvals",
      m3: "Encrypted USB & Fly.io relay",
    },
    zh: {
      kicker: "穿戴式 AI 交互 · 实体按键确认",
      title: "Walkie",
      sub: "跑在 M5StickS3 手表上的 Claude Code 语音遥控器：把高风险操作确认留在手腕实体按键上，离开桌面也能放心接力。",
      role: "独立完成 · 交互边界与硬件实测",
      date: "2026 · 10",
      m1: "双系统共存不误擦",
      m2: "实体按键握住最终审批",
      m3: "端到端加密无线中继",
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
        p: "A working dual-boot wrist voice remote with sealed USB and Wi-Fi relay transports, multi-project Claude session switching, and verified physical button confirmations. Publicly documented in LewisSwan24/walkie; used day-to-day by Lewis so far, with external developer testing and wrist photos scoped next.",
        m1: { v: "USB + Wi-Fi", label: "USB preempts; encrypted relay away from desk" },
        m2: { v: "On-device", label: "automated screen, key & pairing checks" },
        m3: { v: "Dual-boot", label: "protected slot beside On The Beat" },
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
        label: "产出与边界",
        p: "完成了一台日常可用的双启动手腕语音遥控器，跑通有线 USB 优先与端到端加密云中继切换、多项目对话管理及真机屏幕与按键验证。目前仅在作者本人桌边日常验证，外部开发者试戴体验与真机佩戴摄影列在下一步。",
        m1: { v: "双通道", label: "USB 有线优先 · 离桌切端到端加密中继" },
        m2: { v: "真机实测", label: "小屏分页、实体审批键与加密链路验证" },
        m3: { v: "双分区", label: "与 On The Beat 同机防误擦隔离" },
      },
      rf: {
        label: "反思",
        p: "为编码 Agent 做硬件交互，会逼着你把所有模糊的 UX 想法压缩成清晰的帧协议和按键规则。当屏幕只有拇指大小、没有键盘时，哪些 Agent 状态真正不可或缺会立刻浮出水面：正在听、等待审批、当前在哪个项目，以及为什么断连。",
      },
    },
  },
};
