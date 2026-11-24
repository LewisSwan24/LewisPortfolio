import type { RawResearchVaultRecord } from "@/lib/cases/research-vault-schema";

export const walkieResearchVault: RawResearchVaultRecord = {
  slug: "walkie",
  studyStatus: "bench-tested",
  honestScopeNote: {
    en: "Hardware transport, 30s pairing, and 15/15 fake-claude regression suites ran on physical M5StickS3 silicon and host g++ harnesses. Multi-week external developer field trials remain unexecuted.",
    zh: "物理配对倒计时、USB 抢占与 15/15 fake-claude 回归均在真实 M5StickS3 硬件与宿主机 g++ 台架跑通；跨多名外部工程师的数周自然场景实测尚未开展。",
  },
  moderatorGuide: {
    protocolTitle: {
      en: "Desk-to-Sofa Physical Approval & Acoustic Recall Protocol",
      zh: "离桌场景实体审批与语音召回台架测试规程",
    },
    cohortAndSetting: {
      en: "Bench protocol scoped for solo developers stepping 3–6 m away from their primary coding monitor while Claude Code executes multi-step refactors.",
      zh: "面向离开主力显示器 3–6 米的开发者场景设定，覆盖在客厅/茶水间远程监管 Claude Code 多步重构任务的真实链路。",
    },
    openingBrief: {
      en: "Your agent is running in the studio while you grab coffee. Listen only to what comes through the wrist speaker, and decide whether to let each tool call proceed without walking back to the desk.",
      zh: "「你起身离开工位去倒水，桌上的编码代理仍在跑。请只凭手腕上的提示判断每次工具调用该放行还是拦下，尽量别走回电脑前。」",
    },
    taskProbes: [
      {
        id: "walkie-probe-pair",
        prompt: {
          en: "Initiate bridge startup without an existing pair.key and complete hardware pairing within the 30-second window.",
          zh: "在本地尚无 pair.key 时启动桥接进程，于 30 秒硬件倒计时窗口内完成当面配对封存。",
        },
        whatWeWatchFor: {
          en: "Whether the developer recognizes that Front Key seals trust locally rather than typing hex tokens on a 1.14-inch LCD.",
          zh: "观察开发者是否一眼理解「前键物理确认即完成本地密钥封存」，避免在 1.14 寸小屏上折腾字符配对。",
        },
        failureSignal: {
          en: "Any ambiguity over whether Side Key cancels pairing or silently retries in the background.",
          zh: "若侧键取消后界面的中止状态不够果断，或让人误以为仍在后台静默重试，即判定为交互失明。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        id: "walkie-probe-asymmetric-gate",
        prompt: {
          en: "Receive a destructive shell command request (rm / migration) mid-sentence and deny it with a spoken correction.",
          zh: "在代理请求执行高危终端命令时，用手腕拦截并紧接口述修正要求。",
        },
        whatWeWatchFor: {
          en: "Muscle-memory separation between Front Key (approve) and Side Key (deny + speak reason) under low visual attention.",
          zh: "检验盲操作状态下前键（放行）与侧键（拒绝并追加语音理由）的触觉防呆隔离度。",
        },
        failureSignal: {
          en: "Accidental thumb slip onto Front Key when intending to pause or reject an unexpected file edit.",
          zh: "本想暂停或拒绝对文件动刀，拇指却因键位距离或提示模棱两可误触前键放行。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        id: "walkie-probe-cable-preempt",
        prompt: {
          en: "Plug in USB-C mid-session after walking back to the desk, then unplug during an active audio capture.",
          zh: "走回工位后直接插上 USB-C 线缆，随后在录音途中故意拔线触发链路切换。",
        },
        whatWeWatchFor: {
          en: "Clear recognition of USB preemption and honest aborted-turn feedback rather than silent audio truncation.",
          zh: "观察用户是否立刻察觉有线抢占，且拔线打断当轮语音时能看懂「主动中止重来」而非误以为发成功。",
        },
        failureSignal: {
          en: "Silent fallback stitching half an ADPCM packet with a half-recorded USB PCM buffer.",
          zh: "任何试图静默拼接半截无线 ADPCM 与半截有线 PCM 缓冲的行为都会造成指令错乱，直接判死。",
        },
        verifiedStatus: "bench-tested",
      },
    ],
    debriefQuestion: {
      en: "Which tool approval summaries felt too compressed to trust from the wrist alone, forcing you back to the full monitor?",
      zh: "「哪类工具审批摘要信息量太薄，让你还是不敢在腕上放行、必须走回大屏亲自看 diff？」",
    },
  },
  observationLogs: [
    {
      id: "walkie-obs-1",
      sessionRef: { en: "Bench Log · Firmware gate-p5", zh: "台架记录 · 固件门禁 gate-p5" },
      context: {
        en: "Tested 30-second pairing timeout and deliberate Side Key abort against bridge startup.",
        zh: "实测无 pair.key 启动桥接时的 30 秒倒计时超时与侧键主动拒签。",
      },
      observation: {
        en: "Aborted pairing left zero stale key bytes on disk and reset S3 state cleanly without requiring a power cycle.",
        zh: "超时或侧键取消后磁盘零密钥残留，S3 无需拔电重启即可自动归位等待下一次配对。",
      },
      designResponse: {
        en: "Locked fail-closed pairing invariant into gate-p5 rather than caching unconfirmed session tokens.",
        zh: "将「未物理确认绝不落盘」写死进 gate-p5 门禁，杜绝临时会话密钥偷跑。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "walkie-obs-2",
      sessionRef: { en: "Bench Log · Flash Guardrail", zh: "台架记录 · 双启动防误擦守卫" },
      context: {
        en: "Co-hosting Walkie (app1) and companion firmware (app0) on a single 16 MB ESP32-S3 partition table.",
        zh: "在同一块 16 MB ESP32-S3 闪存上并存主副两套固件分区（app0 / app1）。",
      },
      observation: {
        en: "Standard esptool flash commands risk wiping NVS/otadata or overwriting app0 unless explicitly blocked.",
        zh: "常规烧录命令稍不留神就会擦掉 otadata 或把 app0 原固件覆盖。",
      },
      designResponse: {
        en: "Added guard.py pre-flash check refusing unsafe offsets and surfacing explicit partition target feedback.",
        zh: "在烧录前加装 guard.py 分区守卫，一旦目标偏移越界立即中断，并给出清晰文字提示。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "walkie-obs-3",
      sessionRef: { en: "Bench Log · 3-Way Offline Fault", zh: "台架记录 · 三段式断联归因" },
      context: {
        en: "Disconnected Fly.io relay, unplugged workstation bridge, and revoked OpenAI key independently.",
        zh: "分别切断 Fly.io 中继、关闭桌面桥接进程、制造上游语音接口失败三类离线故障。",
      },
      observation: {
        en: "A generic 'Connection Failed' badge left the operator unsure whether to walk to the router, restart Node, or check API quota.",
        zh: "若腕表只笼统报错「连接失败」，用户根本分不清该查路由器、重启桌面桥接还是换 API 密钥。",
      },
      designResponse: {
        en: "Split watch diagnostics into three distinct badges: Wi-Fi / Relay / Bridge-AI, paired with spoken retry guidance.",
        zh: "将故障状态拆成 Wi-Fi / Relay / Bridge-AI 三段独立指示灯，配合短语音告知具体卡点。",
      },
      verifiedStatus: "bench-tested",
    },
  ],
  ergonomicsOrStageSpec: {
    title: {
      en: "M5StickS3 Tactile & Transport Ergonomics Spec",
      zh: "M5StickS3 腕上人因与传输时序规格",
    },
    subtitle: {
      en: "Physical button geometry and transport arbitration thresholds locked on 1.14-inch hardware.",
      zh: "围绕 1.14 寸微屏盲操作与双通道切换定死的硬件交互参数。",
    },
    rows: [
      {
        dimension: { en: "Button Asymmetry", zh: "按键非对称分工" },
        constraint: { en: "Front Key = PTT + Approve · Side Key = Deny + Reason", zh: "前键 = 按住讲话/放行 · 侧键 = 拒绝/附言" },
        rationale: {
          en: "Perpendicular faces prevent thumb-roll accidents when approving file writes without looking at the screen.",
          zh: "两颗实体键呈垂直面分布，盲操时拇指几乎不可能误把「拒绝」按成「批准」。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        dimension: { en: "Minimum PTT Hold", zh: "最短按住防抖门限" },
        constraint: { en: "Discard clicks < 250 ms locally", zh: "短于 250 ms 的轻触直接在本地丢弃" },
        rationale: {
          en: "Stops accidental pocket or wrist-flex bumps from burning STT calls or injecting stray commands.",
          zh: "过滤掉袖口摩擦或误碰产生的短按脉冲，不向后端发空音频。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        dimension: { en: "Channel Arbitration", zh: "双通道仲裁规则" },
        constraint: { en: "USB Serial preempts wss:// relay immediately", zh: "检测到 USB 接入即刻抢占 wss:// 中继" },
        rationale: {
          en: "Cuts desk latency and wireless packet loss to zero without requiring the user to toggle a settings menu.",
          zh: "插线即自动切为低延迟直连，免去在 1.14 寸屏幕里翻网络设置菜单的负担。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        dimension: { en: "Multi-File Diff Scope", zh: "多文件 Diff 边界" },
        constraint: { en: "Pause & queue complex edits for desk review", zh: "复杂多文件改动只挂起摘要，留待大屏审阅" },
        rationale: {
          en: "A 135×240 screen cannot carry code review legibility; forcing confirmation there encourages blind rubber-stamping.",
          zh: "135×240 小屏硬塞代码 diff 只会逼出盲目放行，主动挂起才是对开发者负责。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
    ],
  },
  triRoleTension: [
    {
      role: "pm-product",
      roleLabel: { en: "Product / Workflow Lead", zh: "产品 / 工作流负责人" },
      priority: {
        en: "Keep long agent runs moving away from the desk without breaking developer flow.",
        zh: "让耗时较长的编码代理任务在人离桌后不断流，减少来回折返工位的打断。",
      },
      tension: {
        en: "Temptation to auto-approve safe-looking shell calls so the user rarely gets interrupted.",
        zh: "容易倾向默认放行「看起来安全」的命令，以换取表面更顺滑的无人值守体验。",
      },
      resolution: {
        en: "Allow read-only navigation silently while requiring explicit physical Front/Side confirmation for any mutation.",
        zh: "只读检索静默放行，凡涉及写文件或执行命令一律进手腕队列，守住可控门槛。",
      },
    },
    {
      role: "engineering-hardware",
      roleLabel: { en: "Systems & Firmware Engineer", zh: "系统与嵌入式工程师" },
      priority: {
        en: "Zero key leakage across public Fly.io relays and zero dual-boot bricking on shared M5StickS3 flash.",
        zh: "确保公网 Fly.io 中继零明文泄露，且与另一套副固件共享闪存时绝不互相擦毁。",
      },
      tension: {
        en: "Streaming raw PCM over BLE/Wi-Fi drains battery and drops frames; seamless mid-turn switching risks duplicate tool calls.",
        zh: "无线传原始音频耗电大且易丢包；若在单轮讲话途中硬切通道，极易引发工具重复执行。",
      },
      resolution: {
        en: "Enforce 4-bit ADPCM + AES-256-GCM 12B nonce over Wi-Fi, raw PCM over USB, and hard mid-turn abort on cable plug/unplug.",
        zh: "无线走 4-bit ADPCM + AES-256-GCM 12B Nonce 密封帧，有线走原始 PCM，插拔瞬间主动中止当轮重来。",
      },
    },
    {
      role: "end-user",
      roleLabel: { en: "Solo Developer (Operator)", zh: "一线开发者（真实使用者）" },
      priority: {
        en: "Zero hot-mic paranoia, legible voice summaries, and total certainty that a deny actually stopped the tool.",
        zh: "拒绝后台常开麦克风偷听，要求语音简报听得懂，且按下侧键后工具必须真停下来。",
      },
      tension: {
        en: "Small wrist speakers struggle in noisy kitchens; terse status codes fail to explain why a command stalled.",
        zh: "嘈杂厨房环境下小扬声器不易听清，而简短错误码让人不知道究竟卡在网络还是模型。",
      },
      resolution: {
        en: "Hardware PTT button physically gates audio capture; 3-way offline indicator separates Wi-Fi, Relay, and AI faults.",
        zh: "物理按住才采音从根本消除偷听顾虑，三段故障指示把网络、中继与模型问题拆解清楚。",
      },
    },
  ],
  rebuildToday: [
    {
      id: "walkie-q1",
      question: {
        en: "What invariant stays non-negotiable in a v2 rebuild?",
        zh: "如果今天重做第二版，哪条架构底线绝对不动？",
      },
      answer: {
        en: "Zero-knowledge AES-256-GCM relay sealing plus physical 30s Front-Key pairing. A cloud relay that can read repository paths or forge tool approvals breaks the trust boundary.",
        zh: "AES-256-GCM 端到端密封中继与 30 秒前键当面配对必须保留。任何能让中继服务器读懂仓库路径或伪造审批的捷径都会彻底毁掉安全边界。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "walkie-q2",
      question: {
        en: "Which early assumption proved brittle in practice?",
        zh: "哪个早期设想在台架实测中暴露出明显脆弱性？",
      },
      answer: {
        en: "Assuming spoken TTS alone suffices in domestic spaces. Ambient kitchen noise masks brief voice recaps, so pairing a 3-line high-contrast card on the 1.14-inch screen proved essential.",
        zh: "最初以为纯靠语音播报简报就够用，但茶水间/厨房环境音极易盖过小喇叭，最终必须配合 1.14 寸高对比三行文字卡才能稳定兜底。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "walkie-q3",
      question: {
        en: "What hardware ergonomics detail would I change first?",
        zh: "第一项想优化的硬件人因细节是什么？",
      },
      answer: {
        en: "Add subtle haptic pulse differentiation (single crisp click for approve queued, double buzz for deny confirmed) so eyes-free operation works even when audio is muted.",
        zh: "补齐触觉震动编码（放行短促单震、拒绝确认双震），让静音状态下也能实现完全不低头看表的闭眼操作。",
      },
      verifiedStatus: "unverified-hypothesis",
    },
    {
      id: "walkie-q4",
      question: {
        en: "What outside validation study is still missing?",
        zh: "目前最缺哪一步外部实证研究？",
      },
      answer: {
        en: "A 5-developer diary study measuring how often operators genuinely approve from the wrist versus abandoning the remote and walking back to the terminal.",
        zh: "开展 5 名真实开发者的两周日志跟踪研究，统计有多少工具审批真能在腕上放心拍板，又有多少还是不得不走回显示器前。",
      },
      verifiedStatus: "unverified-hypothesis",
    },
  ],
};
