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
    durZh: "S3 双启动版本",
    problem: {
      en: "A wrist voice remote for Claude Code must not let speech alone approve a tool call",
      zh: "手腕上的 Claude Code 语音遥控，不能只凭一句语音就放行工具调用",
    },
    changed: {
      en: "A sealed AES-256-GCM wrist voice remote where physical watch buttons own every approval",
      zh: "一套 AES-256-GCM 加密手腕语音遥控器，高风险审批全部落在实体按键上",
    },
  },
  reviewMeta: {
    reviewedAt: "2026-11-21",
    nextReviewAt: "2027-02-21",
    auditNote: "Verified LewisSwan24/walkie gates (gate-h, gate-p5, gate-l) and fake-claude test isolation.",
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
      labelZh: "GitHub 源码",
      href: "https://github.com/LewisSwan24/walkie",
      external: true,
    },
  ],
  media: {
    label: "Hardware & protocol schematic",
    labelZh: "硬件与协议架构图",
    blurb:
      "Drawn directly from the public repository (README, protocol/frames.md, firmware/ and bridge/). Real wearer photography has not been added yet, so this case uses interactive hardware schematics and protocol simulations.",
    blurbZh:
      "全部图解依据公开仓库（README、protocol/frames.md、firmware/ 与 bridge/）真实结构绘制。目前尚未录入外部开发者实拍照片，现以高精度系统图解与交互模拟展示。",
    images: [
      {
        src: "/projects/walkie/01-architecture.svg",
        width: 1280,
        height: 720,
        alt: "System diagram connecting M5StickS3 dual-boot firmware, AES-256-GCM sealed frames over USB or Fly.io relay, Node 24 bridge, and Claude Code permission approvals",
        altZh: "系统架构图：连接 M5StickS3 双启动固件、基于 USB 或 Fly.io 中继的 AES-256-GCM 加密帧、Node 24 桥接与 Claude Code 权限审批队列",
        caption:
          "USB always wins when plugged in; away from the cable, sealed frames cross a end-to-end encrypted Fly.io relay and tool permissions wait for a physical button press on the wrist.",
        captionZh:
          "插线时 USB 永远优先；离缆后，加密帧经 Fly.io 中继传输，所有工具权限都在手腕上等待实体按键确认。",
      },
      {
        src: "/projects/walkie/02-key-state-machine.svg",
        width: 800,
        height: 500,
        alt: "Walkie M5StickS3 hardware key grammar (Front PTT/Approve, Side Deny+Reason, Dual-3s dual-boot slot switch) and three explicit offline diagnostic screens",
        altZh: "Walkie 手表物理按键状态机：前键录音与批准、侧键拒绝与翻页、双键 3 秒切换双系统分区及三段式离线排查界面",
        caption:
          "Asymmetric Front/Side hardware key binding and three-way offline diagnostics (No Wi-Fi / Relay Unreachable / PC Bridge Offline).",
        captionZh:
          "非对称实体前/侧键权限语法与三段式离线状态诊断（区分无 Wi-Fi、云中继不可达与电脑桥离线）。",
      },
      {
        src: "/projects/walkie/03-sealed-relay-frame.svg",
        width: 800,
        height: 500,
        alt: "Walkie AES-256-GCM sealed packet framing and three reproducible host/device/relay verification gates",
        altZh: "Walkie AES-256-GCM 密文封包结构及三道可复现自动化验收门禁示意图",
        caption:
          "End-to-end AES-256-GCM envelope keyed to physical 30-second pair.key and verified through host g++, S3 gate-h/p5, and Fly.io gate-l checks.",
        captionZh:
          "由 30 秒实体按键配对派生的 AES-256-GCM 端到端加密封包结构，经宿主机 g++ 单测、S3 gate-h/p5 与中继 gate-l 三重验证。",
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
      zh: "亲手试一下手腕语音与工具审批链路",
    },
    prompt: {
      en: "Switch between USB cable and end-to-end encrypted relay, trigger a Claude Code tool request on the right, then press the watch Front Key (Enter) to approve or Side Key (Backspace) to deny.",
      zh: "先切换 USB 有线或无线端到端加密中继，在右侧触发一条 Claude Code 请求，再按下手表前键（Enter）批准或侧键（Backspace）拒绝。",
    },
    takeaway: {
      en: "High-impact agent calls block until a deliberate physical key press on the wrist; USB preempts wireless whenever plugged in.",
      zh: "高风险 Agent 工具调用必须等待手腕实体按键才放行；只要插上 USB 线，有线链路立即抢占无线中继。",
    },
  },
  processArtifacts: {
    scrubber: {
      eyebrow: {
        en: "Process scrubber · Hands-free voice vs physical key gate",
        zh: "前后对比拉杆 · 纯语音盲审 ↔ 手腕实体双键门控",
      },
      title: {
        en: "Replace ambient voice approvals with deliberate S3 key gating & explicit offline splits",
        zh: "把容易误触的纯语音确认改造成「前键放行 / 侧键拦截 + 三段式离线诊断」",
      },
      summary: {
        en: "Scrub between hands-free speech failure modes and Walkie's hardware-gated transport & dual-boot architecture.",
        zh: "拉动滑杆对照纯语音审批隐患与当前 Walkie 硬件门控、加密中继与离线排障架构。",
      },
      beforeLabel: {
        en: "Before · Hands-Free Speech Risk",
        zh: "改造前 · 纯语音误触风险",
      },
      afterLabel: {
        en: "After · Key-Gated Sealed Architecture",
        zh: "改造后 · 实体门控加密架构",
      },
      wireframeId: "walkie-voice",
      afterImage: {
        src: "/projects/walkie/after-architecture.svg",
        alt: {
          en: "Walkie post-iteration architecture showing physical key gate, USB preemption, AES-256-GCM Fly.io relay, and explicit three-state offline diagnostics",
          zh: "Walkie 迭代后系统架构图：M5StickS3 实体键审批、USB 优先抢占、AES-256-GCM 端到端加密中继与三段离线诊断",
        },
        width: 800,
        height: 500,
      },
    },
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
        zh: "矢量交互微循环 · 手腕加密审批流程",
      },
      title: {
        en: "Press-to-talk → USB/Relay switch → Wrist gate → Spoken summary",
        zh: "按住录音 → 链路切换 → 手腕物理审批 → 语音简报回传",
      },
      summary: {
        en: "Inspect the 4-stage wire and attention loop without loading heavy video captures.",
        zh: "无需加载大体积录屏视频，按帧步进或暂停查看端到端加密与实体确认流程。",
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
            zh: "插线时 USB PCM 优先抢占；拔线后自动切换为 AES-256-GCM 4-bit ADPCM 端到端加密中继。",
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
            zh: "Node 24 桥接合成简短摘要语音回传至手腕扬声器，免看电脑屏完成审批往返。",
          },
        },
      ],
    },
  },
  designDecisions: [
    {
      id: "physical-key-over-voice-approval",
      decisionTitle: {
        en: "Bind tool approvals to physical watch buttons rather than spoken 'yes'",
        zh: "用手表实体双键握住最终审批权，而非语音口令自动放行",
      },
      humanTension: {
        en: "Speech is the quickest input on a wrist, but a misheard 'yes' could approve a destructive shell command.",
        zh: "在手腕上，说话是最快的输入方式。可是一句听错的「同意」，就可能放行一条危险的命令行。",
      },
      rejectedAlternatives: [
        {
          option: {
            en: "Hands-free voice confirmation ('Yes, run it')",
            zh: "纯语音口令确认（识别到「同意」即执行）",
          },
          flaw: {
            en: "Speech-to-text cannot distinguish deliberate user intent from background conversation or media audio, offering zero tactile boundary before a destructive shell command executes.",
            zh: "语音转文字无法区分环境旁白与刻意授权，高危命令行执行前缺乏不可混淆的物理确认手感。",
          },
        },
        {
          option: {
            en: "Mirror the full terminal session on a phone screen",
            zh: "在手机大屏上重开完整桌面终端窗口",
          },
          flaw: {
            en: "Pulling out a phone re-exposes notifications and drags a two-second decision back into full-screen desktop context switching.",
            zh: "掏出手机会立刻被各类通知打断，把原本 2 秒钟的点头决策重新拖回桌面级的注意力碎片里。",
          },
        },
      ],
      chosenTradeoff: {
        en: "Asymmetric physical key grammar on M5StickS3: hold the Front Key to record press-to-talk audio, press Front Key to approve, press Side Key to deny (with an optional spoken reason), and require a 30-second physical Front Key press to pair any new PC.",
        zh: "在 M5StickS3 上建立非对称实体按键语法：按住前键录音、前键批准、侧键拒绝（可选口述原因），新电脑配对亦须 30 秒内按实体前键才落盘 pair.key，依靠拇指本体感觉建立明确的人机责任边界。",
      },
      residualCostOrRisk: {
        en: "Slightly slower than hands-free speech, requires keeping the watch charged, and multi-user ergonomics outside Lewis's own desk remain unverified (wrist photos not yet committed).",
        zh: "响应比纯语音慢半拍，且目前仅在 Lewis 本人桌边日常验证过；他人佩戴手感与长续航尚未实地测过，仓库也暂未归档实拍照片。",
      },
    },
    {
      id: "summary-and-honest-offline-states",
      decisionTitle: {
        en: "Compress context into spoken summaries and explicit offline diagnostics",
        zh: "只回传一句话风险摘要，并把三种断连原因拆开说清",
      },
      humanTension: {
        en: "A thumb-sized wrist screen cannot carry diffs or stack traces; showing raw logs overwhelms glanceability, whereas generic 'Disconnected' errors leave the user guessing whether Wi-Fi, cloud relay, or the laptop failed.",
        zh: "拇指大小的腕表屏幕装不下代码 diff 与堆栈；塞满滚动文本会彻底丧失可瞥视性，而笼统的一句「已断线」只会让人在桌边盲猜到底是 Wi-Fi、云中继还是电脑挂了。",
      },
      rejectedAlternatives: [
        {
          option: {
            en: "Stream full Claude terminal output onto paginated watch cards",
            zh: "把完整的终端标准输出直接分页推到手表屏幕",
          },
          flaw: {
            en: "Scrolling dozens of tiny pages turns a quick check into miniature terminal reading.",
            zh: "在小屏上翻几十页字符，一次快速查看就变成了缩小版的终端阅读。",
          },
        },
        {
          option: {
            en: "Attempt silent mid-turn handover between USB and cloud relay",
            zh: "尝试在单轮对话进行中做 USB 与无线中继的静默自动切换",
          },
          flaw: {
            en: "Masking link transitions hides transport failures and risks partial or duplicated audio frames across two channels.",
            zh: "隐藏链路切换状态容易掩盖传输异常，且双通道并发可能引发残帧或重复指令。",
          },
        },
      ],
      chosenTradeoff: {
        en: "The Node 24 bridge distills replies into short spoken summaries, USB always preempts the AES-256-GCM Fly.io relay when plugged in, and OFFLINE screens distinguish no-Wi-Fi, relay-unreachable, and PC-bridge-offline explicitly.",
        zh: "Node 24 桥接将执行结果收敛为简短语音简报回传手腕；插线时 USB 永远抢占 AES-256-GCM 加密 Fly.io 中继，离线界面明确区分「无 Wi-Fi / 中继不可达 / 电脑离线」三种状态。",
      },
      residualCostOrRisk: {
        en: "Plugging or unplugging the USB cable mid-turn intentionally drops the in-flight turn rather than stitching streams; complex code diffs still require returning to the monitor.",
        zh: "单轮对话中途插拔 USB 会主动放弃当前这轮交互而非强行拼接流；复杂代码审查依然必须回到电脑屏幕前完成。",
      },
    },
    {
      id: "dual-boot-partition-and-pair-seal",
      decisionTitle: {
        en: "Enforce sibling-partition flash guards and button-confirmed key pairing across shared hardware",
        zh: "共机双启动防误擦保护与 实体按键确认的配对握手",
      },
      humanTension: {
        en: "Walkie shares one ESP32-S3 watch with On The Beat; one reckless uploadfs command or leaky cloud relay could simultaneously brick another coursework device or expose live repository prompts over public WebSockets.",
        zh: "Walkie 与 On The Beat 共享同一块 M5StickS3 开发板，一次失误的全片擦除命令或明文云端中继，会同时毁掉另一套课程原型并把私密仓库上下文暴露在公网。",
      },
      rejectedAlternatives: [
        {
          option: {
            en: "Use default esptool full-chip flash commands and unencrypted JSON relay frames",
            zh: "沿用默认全片擦除烧录命令，并通过明文 WebSocket 转发 JSON",
          },
          flaw: {
            en: "Erases sibling firmware partitions silently and exposes repository instructions and speech transcripts on the Fly.io relay host.",
            zh: "每次刷写都会无声抹掉同机双系统，并让 Fly.io 中继服务可以直接窥视明文语音与命令内容。",
          },
        },
        {
          option: {
            en: "Require manual hexadecimal token typing on a 1.14-inch screen for every session",
            zh: "每次连接都在 1.14 寸小屏上手动输入十六进制配对码",
          },
          flaw: {
            en: "Makes daily desk-to-sofa handoffs painful and tempts developers into hardcoding static development secrets.",
            zh: "每次切回桌面都重输密钥太反人类，反而诱导开发者偷懒写死明文密钥。",
          },
        },
      ],
      chosenTradeoff: {
        en: "firmware/guard.py blocks -t erase and -t uploadfs pre-flash, pairing locks an AES-256-GCM shared key to pair.key only after a 30-second physical Front Key confirmation, and Fly.io routes opaque binary envelopes without decrypting them.",
        zh: "用 firmware/guard.py 在烧录前拦截 `-t erase` 与 `-t uploadfs`；配对须在 30 秒内物理按下手表前键方将 AES-256-GCM 共享密钥写入 pair.key，Fly.io 仅转发不可解密的二进制信封。",
      },
      residualCostOrRisk: {
        en: "Adding a third co-resident firmware would still require manual partition table rebalancing, and if pair.key on the workstation is lost the watch must be physically re-paired.",
        zh: "若日后继续往手表塞入第三套固件仍需重新平衡分区表；且电脑端一旦删除 pair.key，必须当面重走实体按键配对流程。",
      },
    },
  ],
  card: {
    en: {
      kicker: "Physical AI · Tactile Control",
      title: "Walkie",
      sub: "An M5StickS3 wrist voice remote for Claude Code—keeping every high-risk tool approval locked to deliberate physical key presses.",
      role: "Solo · Product direction, interaction rules & on-device checks",
      date: "2026 · Oct",
      m1: "Dual-boot S3 key-locked approvals",
      m2: "ESP32 C++ · AES-256-GCM · Node 24",
      m3: "3 manual hardware/relay gates",
    },
    zh: {
      kicker: "穿戴式 AI · 实体防误触",
      title: "Walkie",
      sub: "跑在 M5StickS3 手表上的 Claude Code 语音遥控器：语音只负责提需求，高风险审批全部锁在手腕实体按键上。",
      role: "独立设计、硬件双系统防误擦与实机门禁验收",
      date: "2026 · 10",
      m1: "前键放行 / 侧键拦截防误触",
      m2: "ESP32 C++ · AES-256-GCM · Node 24",
      m3: "三道手动门禁（真机与中继）",
    },
  },
  narrative: {
    en: {
      hero: {
        title: "Talking to an autonomous coding agent from the wrist — without giving up physical approval.",
        sub: "A PlatformIO C++ firmware, a Node 24 desktop bridge, and a end-to-end encrypted Fly.io relay sharing one M5StickS3 watch with On The Beat.",
      },
      roleVal: "Solo — interaction model, protocol constraints, hardware flashing and gate checks (AI coding tools assisted implementation)",
      timeVal: "2026 · September–October",
      teamVal: "Solo project",
      toolsVal: "M5StickS3 · PlatformIO C++ · Node 24 · WebSocket · AES-256-GCM · OpenAI / Gemini Speech · Fly.io",
      ch: {
        label: "Challenge",
        title: "A voice remote for Claude Code that cannot approve a risky step by voice alone.",
        p: "The remote answers Claude Code's permission prompts and short follow-ups from the wrist. Three constraints shaped it: a voice remote cannot silently approve destructive commands, cannot leak credentials through a cloud relay, and cannot brick the other firmware (On The Beat) living on the same M5StickS3.",
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
        quote: "Physical pair.key + Front/Side confirmation ensures noisy rooms never execute destructive tool calls.",
        quoteWho: "Core hardware safety invariant documented in protocol/frames.md",
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
        p: "Automated tests never invoke live paid APIs or real Claude sessions — they run against bridge/test/claude/fake-claude.js. Manual gates check the screens and keys on the physical S3 (gate H) and pairing (gate P5); gate L runs a stand-in S3 and a PC through the relay and needs no COM port. The three OFFLINE screens exist in code, but the on-device checks away from the cable (gates M and N) have not been run. Nobody but Lewis has used it.",
      },
      ou: {
        label: "Outcome",
        p: "A working dual-boot wrist voice remote with sealed USB and Wi-Fi relay transports, multi-project Claude session switching, and verified physical button confirmations. Publicly documented in LewisSwan24/walkie. Only Lewis has used it so far; external developer testing and wrist photos are not done.",
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
        sub: "一套 PlatformIO C++ 固件、Node 24 桌面桥接与端到端加密 Fly.io 中继，与 On The Beat 共享同一块 M5StickS3 双启动手表。",
      },
      roleVal: "独立负责：交互模型、协议约束、固件刷写与硬件门禁验收（AI 编码工具辅助实现）",
      timeVal: "2026 年 9–10 月",
      teamVal: "独立项目",
      toolsVal: "M5StickS3 · PlatformIO C++ · Node 24 · WebSocket · AES-256-GCM · OpenAI / Gemini 语音 · Fly.io",
      ch: {
        label: "问题",
        title: "一个 Claude Code 语音遥控，高风险步骤不能只靠语音批准。",
        p: "这个遥控在手腕上回应 Claude Code 的权限确认和简短追问。设计受三条约束。语音遥控不能静默放行高风险操作，也不能把会话明文暴露给云端中继。刷机时，不能误擦同一块 M5StickS3 上的另一个项目（On The Beat）。",
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
        quote: "只有手腕实体键能写入配对密钥并放行高危工具调用，环境杂音与误识别绝无越权通道。",
        quoteWho: "写进 protocol/frames.md 与 firmware/guard.py 的核心安全不变量",
      },
      sy: {
        label: "核心设计决策",
        title: "用实体物理动作划定安全与注意力边界。",
        p: "每一个有风险的状态切换都绑定明确的实体按键：按住前键采集 16 kHz 对讲录音、松开发送；新电脑配对必须在 30 秒内按 S3 前键确认才会写入 pair.key；Claude Code 工具权限进入独立审批队列，前键同意、侧键拒绝（并可口述拒绝原因）。同时按住双键 3 秒即可切换回 app0（On The Beat），firmware/guard.py 则直接拦截 -t erase 与 -t uploadfs 防止误擦除。",
      },
      id: {
        label: "加密与传输",
        p: "除 HELLO 与 PAIR 外的所有帧均由 pair.key 派生的会话密钥以 AES-256-GCM 加密。插线时走 USB 原始 PCM，离缆后走 Wi-Fi + Fly.io 端到端加密中继并可选 4-bit ADPCM（带宽降至 1/4）。USB 只要插入即自动抢占；离线界面清晰区分「连不上 Wi-Fi」「连不上中继」与「电脑没在线」。",
      },
      pr: {
        label: "桥接与语音管线",
        p: "Node 24 桥接为配置好的每个项目预热独立 Claude Code 进程，录音经 OpenAI 语音接口处理（失败自动回退 Gemini），区分控制指令（同意/拒绝/停止/继续/切换项目）与对话内容，再把摘要语音回传手表。API 密钥放在仓库外的 %APPDATA%\\walkie\\keys.env，永不打印到日志。",
      },
      te: {
        label: "测试与诚实边界",
        p: "自动化单测不消耗真实付费 API，而是使用 bridge/test/claude/fake-claude.js 替身进程。手动门禁在 S3 真机上检查画面与按键（gate H）和配对（gate P5）；gate L 用一台替身 S3 和电脑走一遍中继，不需要 COM 口。代码里有三个离线画面，但离开数据线的真机检查（gate M、N）还没做。目前只有 Lewis 本人用过，没有外部用户测试，仓库中也尚未归档手表屏幕实拍照片。",
      },
      ou: {
        label: "产出与边界",
        p: "完成了一台能用的双启动手腕语音遥控器，跑通有线 USB 优先与端到端加密云中继切换、多项目对话管理及真机屏幕与按键验证。目前只有作者本人用过，外部开发者试戴与真机佩戴照片都还没做。",
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
