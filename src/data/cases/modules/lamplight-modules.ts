import type { CaseModulesRecord } from "@/lib/cases/modules-schema";

export const lamplightModules: CaseModulesRecord = {
  slug: "lamplight",
  lensCallouts: {
    all: {
      en: "Full Lamplight Nook dossier: commission-to-corner workflow, 5-state desktop safety matrix, and pre-1.0 safety audit rejections.",
      zh: "Lamplight Nook 完整档案：从开委托单到桌角守望的旅程、五态桌面风控矩阵，以及 1.0 前安全打回记录。",
    },
    "ux-research": {
      en: "UX Research & IA focus: replacing opaque terminal stdout walls with Wick's blackboard plan and low-distraction corner monitor.",
      zh: "UX 研究与架构视角：如何用 Wick 黑板进度与桌角静默监控窗替代令人焦虑的滚动终端日志。",
    },
    "systems-hardware": {
      en: "Systems & Engineering focus: Electron main SDK event normalizer, YAML-driven Phaser director pacing, and deterministic replay debugger.",
      zh: "系统与工程视角：Electron 主进程 Claude SDK 事件标准化、YAML 驱动的 Phaser 导演状态机与免 API 回放调试面板。",
    },
    "ai-trust": {
      en: "AI Trust & Rules focus: Enter-key fatigue defense ('Not now' default focus), copy-only file isolation, and per-job spending caps.",
      zh: "AI 信任与规则视角：防御回车惯性误触（默认聚焦「先不要」）、副本文件隔离与任务前预算封顶。",
    },
  },
  journey: [
    {
      id: "lamplight-commission",
      step: 1,
      title: {
        en: "Commission slip with explicit spending cap & copy isolation",
        zh: "带预算上限与副本隔离的咖啡馆委托单",
      },
      trigger: {
        en: "User opens Lamplight Nook to delegate a multi-minute Claude Code task",
        zh: "用户打开应用准备委派一项耗时十余分钟的 Claude 长任务",
      },
      userMentalModel: {
        en: "I want to hand over reference files and a goal without worrying that a runaway loop will burn API budget or overwrite my originals.",
        zh: "希望安心交出参考文件与需求，不用提心吊胆怕后台死循环烧穿账单或直接改坏原件。",
      },
      systemAction: {
        en: "Commission slip captures task type, prompt, lent files (duplicated into working copies), and a hard per-run spending ceiling before starting.",
        zh: "委托单先行锁定任务类型、要求、交接文件（自动复制为副本）与单次花销上限，然后才启动执行。",
      },
      cognitiveFriction: {
        en: "Unlimited background retries and in-place folder edits make users hesitant to delegate real working files.",
        zh: "缺少预置预算上限和副本隔离时，用户根本不敢把真实项目文件夹交给后台 Agent。",
      },
      edgeRecovery: {
        en: "1.1–1.4 scope further restricts execution inside a user-lent folder; original source files remain untouched until explicitly accepted.",
        zh: "1.1–1.4 迭代进一步将读写约束在用户主动借出的文件夹内，原件在人工确认前保持完好。",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "observed",
    },
    {
      id: "lamplight-blackboard",
      step: 2,
      title: {
        en: "Real-time SDK event translation onto Wick's blackboard",
        zh: "真实 SDK 事件映射至 Wick 黑板计划",
      },
      trigger: {
        en: "Electron main process receives live Claude Agent SDK plan and tool events",
        zh: "Electron 主进程接收到 Claude Agent SDK 的实时规划与工具事件",
      },
      userMentalModel: {
        en: "A single glance should tell me how many steps exist, which step is active now, and who is stalled—without parsing 300 lines of stdout.",
        zh: "抬眼一瞥就该知道一共几步、正在推进第几步、有没有卡住，不必自己翻几百行终端输出。",
      },
      systemAction: {
        en: "YAML rules normalize SDK events into character commands; Wick writes and crosses off real subtasks on the café blackboard.",
        zh: "YAML 规则引擎将真实事件转为角色指令；Wick 将真实子任务写上黑板并逐项划掉。",
      },
      cognitiveFriction: {
        en: "Scroll-heavy terminal logs flatten planning, active reading, and blocked prompts into identical monospace lines.",
        zh: "滚动终端把思考规划、读文件与等待人工审批压成一模一样的等宽字符流。",
      },
      edgeRecovery: {
        en: "Unmappable technical details drop gracefully into inspectable text cards rather than being hidden behind cute sprite animations.",
        zh: "装不进咖啡馆隐喻的精密技术细节仍保留直白文字卡片，不靠萌化动画掩盖信息。",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "observed",
    },
    {
      id: "lamplight-corner-monitor",
      step: 3,
      title: {
        en: "Minimizing into a calm corner status monitor",
        zh: "收起为桌面角落安静守望小窗",
      },
      trigger: {
        en: "User minimizes the main café window to focus on primary desk work",
        zh: "用户最小化主咖啡馆窗口以专心处理手头其他工作",
      },
      userMentalModel: {
        en: "Keep peripheral awareness ('4 of 5 · Busy: write summary.md') quietly at the edge of my screen and only chime when you genuinely need me.",
        zh: "在屏幕角落轻声告诉我「第 4/5 步 · 谁在忙」，除非真需要我拍板，否则别打断我。",
      },
      systemAction: {
        en: "Window collapses to the corner monitor showing active character, step fraction, and task label while pausing full-scene motion.",
        zh: "窗口收缩为桌角小窗，仅保留当前角色、步骤进度与动作标签，撤除全屏高频动画。",
      },
      cognitiveFriction: {
        en: "Full-window animated sprites sitting open next to an editor turn ambient awareness into continuous peripheral distraction.",
        zh: "完整尺寸的像素角色持续走动放在编辑器旁边，会从轻提示退化成持续视觉干扰。",
      },
      edgeRecovery: {
        en: "When an agent question or risk gate arrives, the corner card elevates cleanly back to a decision card without discarding prior steps.",
        zh: "一旦出现待确认问题或风险步骤，桌角小窗平顺唤回决策卡，之前已完成步骤丝毫不丢。",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "observed",
    },
    {
      id: "lamplight-question-card",
      step: 4,
      title: {
        en: "Explicit question card with 'leave it to the staff' option",
        zh: "明确分工的提问卡（含「交给店员决定」选项）",
      },
      trigger: {
        en: "Agent encounters a non-destructive preference choice (e.g., page accent palette)",
        zh: "Agent 遇到非破坏性的风格或结构偏好选择题（如页面主色调）",
      },
      userMentalModel: {
        en: "Let me pick when I care, or explicitly hand the aesthetic call back to the crew without guessing how to phrase a prompt.",
        zh: "在乎的时候让我直接点选，懒得纠结时也能一键明确授权给店员拿主意。",
      },
      systemAction: {
        en: "Wick raises a structured choice card spelling out concrete options alongside an explicit delegation button.",
        zh: "弹出结构化提问卡片，清晰并列各具体选项与「交给店员决定」显式委托按钮。",
      },
      cognitiveFriction: {
        en: "Chatty anthropomorphism blurs whether a prompt is a casual suggestion or an authoritative system branch.",
        zh: "拟人闲聊式追问容易让用户分不清当前究竟是在聊天还是在拍板系统分支。",
      },
      edgeRecovery: {
        en: "All card copy ships in symmetric EN/ZH following system locale so bilingual clarity never drifts.",
        zh: "所有卡片说明随系统语言完整提供中英双语对照，降低误读决策项的概率。",
      },
      focusTags: ["ux-research", "ai-trust"],
      verifiedStatus: "observed",
    },
    {
      id: "lamplight-risk-not-now",
      step: 5,
      title: {
        en: "Default-safe 'Not now' focus lock on risky steps",
        zh: "高风险步骤默认焦点锁死「先不要」",
      },
      trigger: {
        en: "Classifier flags a destructive file write, overwrite, or high-impact tool action",
        zh: "风险分类器拦截到潜在覆写、删除或高影响工具执行请求",
      },
      userMentalModel: {
        en: "If I hit Enter out of habit while switching windows, the app must pause safely—never silently execute the risky step.",
        zh: "切窗口时万一顺手敲了一下 Enter 或 Space，系统必须安全挂起，绝不能直接把危险动作跑掉。",
      },
      systemAction: {
        en: "Renders a plain risk confirmation card with initial keyboard focus and primary visual weight locked onto 'Not now'.",
        zh: "弹出朴素无修饰的风险确认卡，初始键盘焦点与主视觉重心硬性落在「先不要」。",
      },
      cognitiveFriction: {
        en: "Whether outside users read the café state faster than raw logs remains an unverified hypothesis (only Lewis is on record).",
        zh: "除作者日常自用外，咖啡馆隐喻是否真的比纯日志让他人读得更快仍属待验证假设。",
      },
      edgeRecovery: {
        en: "Choosing 'Not now' treats interruption as a reversible pause—all completed blackboard steps stay intact until resumed or adjusted.",
        zh: "点击「先不要」将打断视为无损挂起，黑板上已完成的所有成果与记录完整保留，随时可调整后继续。",
      },
      focusTags: ["ai-trust", "systems-hardware"],
      verifiedStatus: "unverified-hypothesis",
    },
  ],
  stateMatrix: [
    {
      state: "normal",
      label: { en: "Normal · Café Crew Active", zh: "正常态 · 店员协同推进" },
      entryCondition: {
        en: "Valid local Anthropic API key configured, commission submitted within budget cap, SDK streaming events.",
        zh: "已配置用户自有 Anthropic API key，委托单在预算内正常启动并接收 SDK 事件流。",
      },
      uiFeedback: {
        en: "Blackboard ticks completed steps, Phaser crew act out active roles, and corner window summarizes 'X of Y · Busy'.",
        zh: "黑板划掉完成项，Phaser 角色按真实分工行动，最小化小窗实时提示「第 X / Y 步」。",
      },
      keyboardFocus: {
        en: "Standard non-intrusive card navigation; corner peek never steals OS window focus during background steps.",
        zh: "常规非抢占式卡片焦点导航；后台推进期间桌角小窗绝不抢夺当前前台应用焦点。",
      },
      fallbackGuarantee: {
        en: "Staff operate strictly on duplicated file copies inside the lent folder scope.",
        zh: "店员始终在借出目录的文件副本上工作，原文件全程受保护。",
      },
      focusTags: ["systems-hardware", "ux-research"],
      verifiedStatus: "observed",
    },
    {
      state: "empty",
      label: { en: "Empty · Commission Ready / No Run", zh: "空状态 · 待开委托单" },
      entryCondition: {
        en: "App freshly launched before a commission is submitted, or previous job completed and archived.",
        zh: "应用刚启动尚未提交委托，或上一轮任务已完成归档。",
      },
      uiFeedback: {
        en: "Shows clean commission slip over the idle café with job presets, file picker, and spending cap selector.",
        zh: "静谧咖啡馆上方展开清晰委托单，提供任务类型、文件交接与预算上限设定。",
      },
      keyboardFocus: {
        en: "Initial focus lands cleanly on the task prompt field without modal clutter.",
        zh: "焦点自然落入需求输入框，无多余遮罩弹窗干扰。",
      },
      fallbackGuarantee: {
        en: "Zero account login or telemetry required; built-in debug panel can replay bundled recording offline without API calls.",
        zh: "无需账号且零遥测；内置调试面板可离线回放随附真实录制，不消耗 API 额度。",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "bench-tested",
    },
    {
      state: "offline",
      label: { en: "Offline · API Disconnected / Replay", zh: "离线态 · 接口断连与本地回放" },
      entryCondition: {
        en: "Network drops mid-run or user enters offline inspection without an active Anthropic API connection.",
        zh: "长任务中途断网，或用户处于无外部 API 连接环境。",
      },
      uiFeedback: {
        en: "Crew halts cleanly at the last completed blackboard item and surfaces explicit retry/save state rather than spinning.",
        zh: "店员在最近完成的黑板步骤处停下并给出明确断连与续跑状态，避免无限转圈假动作。",
      },
      keyboardFocus: {
        en: "Focus stays on safe Retry / Save-progress controls without resetting user-edited commission inputs.",
        zh: "焦点落在安全重试/保留进度按钮上，绝不清空已填委托内容。",
      },
      fallbackGuarantee: {
        en: "All completed outputs in the working copy remain readable on disk; deterministic replay debug panel works 100% offline.",
        zh: "工作副本中已生成的阶段产物全部稳妥保留在本地磁盘，回放面板完全离线可用。",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "bench-tested",
    },
    {
      state: "error",
      label: { en: "Error · Budget Cap Reached / Tool Fault", zh: "错误态 · 触及预算上限或工具失败" },
      entryCondition: {
        en: "Looping subagent approaches commission spending cap, or a tool/Office export step fails.",
        zh: "子代理循环逼近预设开销上限，或工具调用/文档导出步骤报错。",
      },
      uiFeedback: {
        en: "Flint / Wick surfaces plain-language halt reason card detailing exact spent total and failed tool step.",
        zh: "以直白卡片给出停机原因，写明当前已消耗金额与具体出错步骤。",
      },
      keyboardFocus: {
        en: "Focus moves to the halt summary card with explicit 'Review outputs' and 'Adjust cap' choices.",
        zh: "焦点移至异常摘要卡，提供「检查已有产物」与「调整上限」明确分支。",
      },
      fallbackGuarantee: {
        en: "Spending cap hard-stops execution before runaway billing; ~100 Vitest suites guard event normalization & state rules.",
        zh: "预算硬封顶即时切断失控循环；仓库内约百个 Vitest 测试文件守卫事件归一化与状态机。",
      },
      focusTags: ["ai-trust", "systems-hardware"],
      verifiedStatus: "synthetic-gate",
    },
    {
      state: "refused",
      label: { en: "Refused · Risky Step 'Not Now' Gate", zh: "拒绝态 · 高风险步骤默认拦截" },
      entryCondition: {
        en: "Claude Agent SDK proposes a risky write/command, or user dismisses the card via Enter/Esc/'Not now'.",
        zh: "SDK 发起高风险写入/命令请求，或用户直接按 Enter / Esc / 点击「先不要」。",
      },
      uiFeedback: {
        en: "Plain confirmation card highlights 'Not now' as primary safe action; diff/impact scope remains expandable.",
        zh: "朴素确认卡将「先不要」置为默认高对比安全按钮，并保留可展开的影响范围核对区。",
      },
      keyboardFocus: {
        en: "Initial focus and Enter key activation bind strictly to 'Not now'; proceeding requires deliberate Tab + confirm.",
        zh: "初始焦点与直接敲回车均锁定「先不要」；若要放行必须刻意切换焦点二次确认。",
      },
      fallbackGuarantee: {
        en: "Refusing never discards prior blackboard progress—task enters reversible pause waiting on revised direction.",
        zh: "拒绝绝不丢弃已完成步骤，任务进入可逆挂起态等待后续微调。",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "observed",
    },
  ],
  rejectionArchive: [
    {
      id: "lamplight-reject-proceed-default",
      round: { en: "Safety Before 1.0 Pass", zh: "1.0 发布前安全排查" },
      date: "2026-11-04",
      artifactBefore: {
        en: "Standard OS confirmation dialog highlighting 'Proceed' as the primary focused action",
        zh: "按常规桌面弹窗把「继续执行」设为默认高亮与初始焦点按钮",
      },
      failureExposed: {
        en: "Reflexive Enter-key fatigue during multi-step runs could accidentally authorize destructive file overwrites when focus switched unexpectedly.",
        zh: "高频任务流中的「习惯性回车肌肉记忆」极易在弹窗突然弹出时顺手放行文件覆写操作。",
      },
      fixApplied: {
        en: "Inverted modal hierarchy: locked initial keyboard focus and visual emphasis onto 'Not now' and forced staff onto file copies.",
        zh: "彻底反转弹窗权重：初始焦点与主按钮样式锁死「先不要」，并强制店员只操作文件副本。",
      },
      sourceReceipt: {
        en: "Pre-1.0 'Safety before 1.0' squashed commit audit + risk card tests",
        zh: "v1.0.0 前「Safety before 1.0」提交审查记录与决策卡单测",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "observed",
    },
    {
      id: "lamplight-reject-live-capture-claims",
      round: { en: "Store & Showcase Media Audit", zh: "上架截图与真实性审查" },
      date: "2026-11-05",
      artifactBefore: {
        en: "Considering live task screenshots and claiming external usability wins without recorded tests",
        zh: "若直接把模拟脚本截图写成「真实用户实验截图」并暗示外部可用性已验证",
      },
      failureExposed: {
        en: "Showcase images were actually generated by the app's deterministic simulation script for store previews, and only Lewis used the app daily.",
        zh: "展示图实为应用自带模拟脚本生成的稳定场景预览，且有记录的使用者仅作者一人。",
      },
      fixApplied: {
        en: "Added explicit simulation-script provenance disclosure, unsigned installer caveat, and built-in deterministic replay debug panel.",
        zh: "在案例说明中显式标注模拟脚本生成来源、未签名安装包现状，并保留可复现的离线调试回放面板。",
      },
      sourceReceipt: {
        en: "lamplight-nook v1.0 release notes + debug replay panel",
        zh: "lamplight-nook v1.0 发布注记与仓库内置回放调试面板",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "observed",
    },
  ],
};
