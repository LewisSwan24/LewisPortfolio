import { z } from "zod";
import { LocalizedStringSchema } from "@/lib/cases/schema";
import { CaseVerifiedStatusSchema } from "@/lib/cases/modules-schema";
import { CURRENT_PROJECT_SLUGS, isUnlistedProject } from "@/lib/project-routes";

export const RED_TEAM_LENS_IDS = [
  "design-director",
  "systems-architect",
  "wcag-auditor",
  "ai-safety",
] as const;

export type RedTeamLensId = (typeof RED_TEAM_LENS_IDS)[number];

export const RedTeamLensIdSchema = z.enum(RED_TEAM_LENS_IDS);

export const RED_TEAM_LENS_META: Record<
  RedTeamLensId,
  {
    title: { en: string; zh: string };
    persona: { en: string; zh: string };
  }
> = {
  "design-director": {
    title: { en: "Strict Design Director", zh: "严苛设计总监" },
    persona: {
      en: "Interrogates business framing, visual hierarchy, and whether deliberate friction actually earns its keep.",
      zh: "拷问业务定位、信息层级与「刻意增加的摩擦」是否真为用户服务而非自嗨。",
    },
  },
  "systems-architect": {
    title: { en: "Systems & Hardware Architect", zh: "系统与硬件架构师" },
    persona: {
      en: "Probes latency, packet loss, flash-partition overwrite risk, clock drift, and runtime failure isolation.",
      zh: "深挖延迟抖动、丢包、OTA 误擦闪存、主循环时钟漂移与边界故障隔离。",
    },
  },
  "wcag-auditor": {
    title: { en: "WCAG 2.2 & Keyboard Auditor", zh: "WCAG 2.2 与键盘无障碍审计员" },
    persona: {
      en: "Audits keyboard focus traps, color-only cues, target sizes (>= 24 px), and low-vision state legibility.",
      zh: "审计焦点陷阱、单一色觉编码、最小点击热区（>= 24 px）与暗光/低视力可读性。",
    },
  },
  "ai-safety": {
    title: { en: "AI Safety Red-Teamer", zh: "AI 安全与防越权红队" },
    persona: {
      en: "Stress-tests habitual approval fatigue, prompt/key leakage, silent hallucination, and spoofed authority.",
      zh: "极限压测惯性回车放行、密钥或提示词泄露、静默幻觉猜填与虚假权威误导。",
    },
  },
};

export const RedTeamLensEntrySchema = z.object({
  lens: RedTeamLensIdSchema,
  severity: z.enum(["blocking", "high", "watch"]),
  challengeQuestion: LocalizedStringSchema,
  empiricalDefense: LocalizedStringSchema,
  codeOrTestReceipt: LocalizedStringSchema,
  unresolvedHypothesis: LocalizedStringSchema,
  verifiedStatus: CaseVerifiedStatusSchema,
  evidenceHref: z.string().startsWith("/projects/"),
});

export type RedTeamLensEntry = z.infer<typeof RedTeamLensEntrySchema>;

export const RedTeamDeckSchema = z.object({
  slug: z.enum(CURRENT_PROJECT_SLUGS).refine((slug) => !isUnlistedProject(slug), {
    message: "Red-Team defense decks apply strictly to the 6 listed flagship cases.",
  }),
  caseTitle: LocalizedStringSchema,
  executiveThesis: LocalizedStringSchema,
  lenses: z.array(RedTeamLensEntrySchema).length(4),
});

export type RedTeamDeck = z.infer<typeof RedTeamDeckSchema>;

export const RED_TEAM_DEFENSE_DECKS: readonly RedTeamDeck[] = [
  {
    slug: "walkie",
    caseTitle: { en: "Walkie", zh: "Walkie 腕上语音遥控" },
    executiveThesis: {
      en: "Physical asymmetry and cryptographic sealing beat convenient ambient voice whenever a remote tool call can mutate local code.",
      zh: "只要远程代理能改写本地代码库，物理非对称按键与端到端加密封包就比「免动手声控」更保命。",
    },
    lenses: [
      {
        lens: "design-director",
        severity: "high",
        challengeQuestion: {
          en: "Why force a developer to strap on a 1.14-inch ESP32 watch instead of shipping a mobile companion PWA on the phone already in their pocket?",
          zh: "开发者兜里本来就有手机，为什么要专门佩戴一块 1.14 寸小屏手表，而不直接做个手机网页遥控端？",
        },
        empiricalDefense: {
          en: "Pulling out a phone unlocks notifications, chat feeds, and thumb typing loops that derail off-desk breaks. A wrist PTT key requires zero face-ID unlock, zero visual dwell for capture, and keeps approvals scoped to a physical gesture.",
          zh: "掏手机会顺带解锁消息红点与社交信息流，打断离桌休息；腕表物理按住即说无需亮屏解锁，把操作压回纯粹的「单手按压—听取简报—物理拍板」闭环。",
        },
        codeOrTestReceipt: {
          en: "Verified 250 ms PTT anti-bounce gate and 3-line approval queue UI in M5StickS3 firmware + /projects/walkie#research-vault.",
          zh: "M5StickS3 固件已实装 250 ms 最短按住防抖与 3 行精简审批卡片，详见 /projects/walkie#research-vault。",
        },
        unresolvedHypothesis: {
          en: "Multi-week developer diary testing comparing wrist abandonment rate against a phone lock-screen notification widget remains unexecuted.",
          zh: "尚未对比「腕表 vs 手机锁屏通知快捷审批」在真实开发者连续两周日常里的弃用率。",
        },
        verifiedStatus: "unverified-hypothesis",
        evidenceHref: "/projects/walkie#design-decisions",
      },
      {
        lens: "systems-architect",
        severity: "blocking",
        challengeQuestion: {
          en: "Co-hosting Walkie on the same 16 MB flash as companion firmware risks bricking otadata, and plugging in USB mid-speech risks splitting ADPCM/PCM buffers.",
          zh: "和另一套工程固件共用 16 MB 闪存极易误擦分区，而且在单轮语音中途插拔 USB-C 线缆会直接把音频流撕成两半。",
        },
        empiricalDefense: {
          en: "guard.py blocks unsafe partition offsets pre-flash so app0 stays untouched. At runtime, USB Serial immediately preempts the Fly.io wss:// relay; mid-turn cable swaps intentionally abort and surface a link-transition notice instead of stitching broken packets.",
          zh: "烧录前由 guard.py 锁死 app1 偏移防止擦毁 app0；运行时 USB 接入立即抢占 wss:// 中继，若在说话中途插拔则主动中止当轮并明示链路切换，绝不硬拼残帧。",
        },
        codeOrTestReceipt: {
          en: "gate-p5 pairing abort, guard.py pre-flash guard, host g++ frame tests, and 15/15 fake-claude regression suites pass.",
          zh: "已通过 gate-p5 配对中止门禁、guard.py 烧录守卫、宿主机 g++ 协议测试与 15/15 fake-claude 回归。",
        },
        unresolvedHypothesis: {
          en: "Thermal battery drain across > 90 continuous minutes of Wi-Fi ADPCM streaming off USB power has not been profiled in a formal endurance bench.",
          zh: "离缆状态下连续 Wi-Fi ADPCM 推流超过 90 分钟的温升与掉电曲线尚未做长时间老化测试。",
        },
        verifiedStatus: "bench-tested",
        evidenceHref: "/projects/walkie#state-matrix",
      },
      {
        lens: "wcag-auditor",
        severity: "high",
        challengeQuestion: {
          en: "A 135×240 watch screen with TTS audio breaks down if the operator has low vision or works in a noisy room where speakers are inaudible.",
          zh: "135×240 微屏配合语音播报，在厨房嘈杂环境听不清声音、或低视力开发者场景下如何避免看错放行项？",
        },
        empiricalDefense: {
          en: "Never relies on audio alone: every approval pauses on a high-contrast summary card capped at concise action verbs, while complex multi-file diffs queue safely for full desktop monitor review instead of shrinking tiny scrollbars.",
          zh: "拒绝纯语音盲审：每次审批同步锁定高对比度精简文字卡，遇到多文件复杂改动直接挂起留待大屏完整审阅，绝不在小屏里塞微型滚动条。",
        },
        codeOrTestReceipt: {
          en: "Documented in Walkie 5-State Matrix & Hardware Ergonomics Spec (/projects/walkie#research-vault).",
          zh: "已在 Walkie 五态边界矩阵与人因规格表中明确界定多文件 Diff 挂起规则。",
        },
        unresolvedHypothesis: {
          en: "Distinct dual-pattern tactile vibration (single click approve vs double buzz deny) for deaf/noisy eyes-free parity is scoped as a v2 upgrade.",
          zh: "面向静音/强噪环境的「单震放行 vs 双震拒绝」独立触觉脉冲编码列为下一版硬件升级验证项。",
        },
        verifiedStatus: "unverified-hypothesis",
        evidenceHref: "/projects/walkie#research-vault",
      },
      {
        lens: "ai-safety",
        severity: "blocking",
        challengeQuestion: {
          en: "What stops a compromised cloud relay from reading repository context or injecting a spoofed 'Front Key Approved' frame?",
          zh: "既然走公网 Fly.io 中继，如何防止中继节点偷窥仓库路径或伪造一帧「前键已批准」指令？",
        },
        empiricalDefense: {
          en: "All relay frames carry AES-256-GCM authentication tags with a 12-byte nonce derived from a pair.key sealed strictly during a physical 30-second Front-Key press—never hardcoded. TLS pins ISRG Root X1/X2, and relay logs see only opaque ciphertext.",
          zh: "所有中继数据包均以 AES-256-GCM + 12 字节 Nonce 密封，密钥仅在 30 秒硬件前键当面配对时派生落盘；TLS 锁定 ISRG Root X1/X2 证书链，云中继全程零明文可见。",
        },
        codeOrTestReceipt: {
          en: "Verified AES-256-GCM round-trip framing and zero-key abort on pairing timeout in gate-p5.",
          zh: "AES-256-GCM 密封帧收发与配对超时零密钥落盘已由 gate-p5 实测验证。",
        },
        unresolvedHypothesis: {
          en: "Key rotation UX when sharing one workstation across two paired M5StickS3 devices has not been implemented yet.",
          zh: "同一桌面宿主绑定多块腕表时的密钥轮换与吊销管理界面尚未实装。",
        },
        verifiedStatus: "bench-tested",
        evidenceHref: "/projects/walkie#rejection-archive",
      },
    ],
  },
  {
    slug: "lamplight",
    caseTitle: { en: "Lamplight Nook", zh: "Lamplight Nook 安静桌面代理" },
    executiveThesis: {
      en: "Warm pixel metaphors lower task-initiation dread, yet must immediately drop character banter the moment spend caps or destructive writes enter.",
      zh: "像素咖啡馆隐喻用来缓解长任务等待焦虑，但一旦触及预算上限或高危写入，必须立刻收起故事感、切回冷峻清晰的拒绝护栏。",
    },
    lenses: [
      {
        lens: "design-director",
        severity: "high",
        challengeQuestion: {
          en: "Isn't an animated café sprite scene pure aesthetic fluff that pulls developer attention away from real work?",
          zh: "在严肃的编码辅助桌面工具里画一群像素咖啡店员走来走去，是不是只图好看的花哨装饰、反而分散注意力？",
        },
        empiricalDefense: {
          en: "The full café opens only during task commissioning and post-run review. During active execution, the window collapses into a single-line corner monitor ('4 of 5 · Busy: write summary.md') with full-scene motion paused.",
          zh: "完整咖啡馆仅在开委派单与复盘时呈现；任务一跑起来主窗可一键缩成屏幕角落的单行进度微窗，停掉所有走动动画，只留低噪外周感知。",
        },
        codeOrTestReceipt: {
          en: "Implemented in Electron corner-monitor window state + YAML Phaser director rules (/projects/lamplight#journey-map).",
          zh: "已在 Electron 桌角微窗模式与 YAML 导演状态规则中落地，详见 /projects/lamplight#journey-map。",
        },
        unresolvedHypothesis: {
          en: "The September 2026 6-participant quiet-distraction study never ran, so genuine reduction in peripheral cognitive load remains unmeasured externally.",
          zh: "原定 2026 年 9 月的 6 人注意力干扰对照实验尚未执行，余光降噪收益仍属诚实待测假设。",
        },
        verifiedStatus: "unverified-hypothesis",
        evidenceHref: "/projects/lamplight#research-vault",
      },
      {
        lens: "systems-architect",
        severity: "high",
        challengeQuestion: {
          en: "Raw Claude Agent SDK streams emit bursty asynchronous events. How do you stop the UI from desyncing or burning real API tokens just to test edge states?",
          zh: "真实 Claude Agent SDK 异步事件经常瞬间井喷，怎么保证界面不错乱，又怎么在不烧真 API 费用的前提下调试罕见错误？",
        },
        empiricalDefense: {
          en: "Electron main process normalizes SDK callbacks through declarative YAML pacing rules before Phaser reads them. A built-in deterministic replay debugger scrubs recorded JSONL traces across stall, budget-cap, and refusal paths offline.",
          zh: "Electron 主进程先用声明式 YAML 节拍规则清洗 SDK 回调再推给 Phaser；内建的确定性回放调试器支持离线单步排查卡顿、超预算与拒答态，不花一分 API 钱。",
        },
        codeOrTestReceipt: {
          en: "Live Electron SDK normalizer + deterministic replay debugger verified in self-use runs.",
          zh: "Electron 主进程 SDK 清洗层与零 API 回放器已在自用实测中跑通。",
        },
        unresolvedHypothesis: {
          en: "Concurrent multi-session execution (2+ parallel café rooms) was intentionally deferred to avoid splitting file-copy lock ownership.",
          zh: "多任务并行开启多个咖啡馆沙盒目前刻意暂缓，避免多副本目录锁权冲突。",
        },
        verifiedStatus: "bench-tested",
        evidenceHref: "/projects/lamplight#state-matrix",
      },
      {
        lens: "wcag-auditor",
        severity: "blocking",
        challengeQuestion: {
          en: "Canvas-rendered Phaser scenes are invisible to screen readers and keyboard Tab navigation—how does a keyboard-only user inspect Wick's blackboard?",
          zh: "Phaser Canvas 画面对屏幕阅读器和键盘 Tab 完全是黑盒，键盘或低视力用户怎么读懂黑板进度和店员提问？",
        },
        empiricalDefense: {
          en: "Every actionable step list, question card, risk gate, and unmappable technical trace renders in native DOM HTML overlays alongside or outside the canvas—never trapped inside bitmap pixels.",
          zh: "所有真正需要理解与拍板的黑板任务列表、提问卡、预算警示与报错全文，全部以原生语义化 DOM 叠加层呈现，绝不把关键交互信息埋进 Canvas 像素里。",
        },
        codeOrTestReceipt: {
          en: "DOM-backed commission slip, question card, and risk confirmation modal audited in Lamplight Nook.",
          zh: "委托单、提问卡与风险确认层均以原生 DOM 表单与按钮实装。",
        },
        unresolvedHypothesis: {
          en: "Full NVDA/VoiceOver walkthrough across the Electron desktop wrapper has not yet been formally logged.",
          zh: "Electron 桌面壳内的完整读屏软件端到端走查尚待补充正式记录。",
        },
        verifiedStatus: "observed",
        evidenceHref: "/projects/lamplight#design-decisions",
      },
      {
        lens: "ai-safety",
        severity: "blocking",
        challengeQuestion: {
          en: "If a user is typing rapidly in another window and a risk card pops up, habitual Enter presses will authorize destructive edits.",
          zh: "用户正在别的窗口飞快敲代码时，如果高风险改写弹窗突然抢占焦点，下意识按一下回车不就直接授权破坏性改写了吗？",
        },
        empiricalDefense: {
          en: "Every risk gate pins initial focus strictly to 'Not now' (never 'Approve'), duplicates lent files into isolated working copies before execution, and enforces a pre-run dollar spending ceiling.",
          zh: "所有高风险确认卡初始焦点死锁在「先不要（Not now）」，惯性回车只会安全暂缓；且执行前强制拷贝副本与锁死单次预算上限，保住原文件零损伤。",
        },
        codeOrTestReceipt: {
          en: "Default 'Not now' focus lock, copy-only file handoff, and per-run spend cap verified in live Electron build.",
          zh: "默认「先不要」焦点锁、副本目录隔离与单次消费上限均已在真实桌面端跑通。",
        },
        unresolvedHypothesis: {
          en: "Whether the 'Leave it to staff' option on low-stakes style questions feels genuinely clear or subtly shifts responsibility needs external observation.",
          zh: "低风险样式分歧中的「交给店员决定」选项是否足够清楚，还需外部真实用户观察验证。",
        },
        verifiedStatus: "observed",
        evidenceHref: "/projects/lamplight#rejection-archive",
      },
    ],
  },
  {
    slug: "autofill",
    caseTitle: { en: "Resume Autofill", zh: "Resume Autofill 零猜测填表" },
    executiveThesis: {
      en: "Honest job-application automation stops short of ambiguous eligibility dropdowns and the final Submit button—proving privacy in CI, not marketing copy.",
      zh: "值得信赖的网申辅助必须敢在歧义下拉框和最终「提交」按钮前停手，并用构建期单测而非隐私政策空话担保简历不出设备。",
    },
    lenses: [
      {
        lens: "design-director",
        severity: "high",
        challengeQuestion: {
          en: "Competing AI autofill extensions promise 1-click 100% completion. Doesn't intentionally leaving 15% blank feel half-baked to stressed applicants?",
          zh: "市面上 AI 填表插件都宣传「一键全自动 100% 填完海投」，你故意留空 15% 让用户自己补，难道不会显得工具不够聪明吗？",
        },
        empiricalDefense: {
          en: "In hiring forms, a silent hallucinated visa status or wrong salary expectation disqualifies an applicant silently. Tri-tier triage (e.g. 45 Filled / 1 Review / 1 Blank) handles repetitive drudgery while reserving human judgment strictly for career-critical fields.",
          zh: "网申填错工作签证或编造求职动机，代价是直接被系统筛掉且浑然不知。三档分流（如 45 直填 / 1 待核 / 1 留空）消灭 90% 机械重复，把真正影响录用的判断留给人手把关。",
        },
        codeOrTestReceipt: {
          en: "Three-tier summary tally & side-panel per-field reason log verified in Chrome MV3 extension + /projects/autofill#design-decisions.",
          zh: "三档汇总计数器与侧栏逐栏原因账本已实装于 Chrome MV3 扩展。",
        },
        unresolvedHypothesis: {
          en: "External applicant preference between 98% risky auto-fill vs 85% explicit-blank precision has not been measured in live ATS cohorts.",
          zh: "真实求职群体在实战高峰期对「高填满但有错漏风险 vs 显式留空」的真实接受度尚缺外部测试。",
        },
        verifiedStatus: "unverified-hypothesis",
        evidenceHref: "/projects/autofill#research-vault",
      },
      {
        lens: "systems-architect",
        severity: "high",
        challengeQuestion: {
          en: "Employer portals hash CSS classes and wrap React/Vue synthetic inputs; writing `.value` directly breaks form state, and browser extensions fail inside mobile mini-programs.",
          zh: "各家招聘网站不仅混淆类名，还用 React/Vue 受控组件接管输入；而且微信/钉钉招聘小程序里浏览器扩展根本跑不起来。",
        },
        empiricalDefense: {
          en: "Instead of brittle company-specific scrapers, adapters detect shared widget libraries (Ant Design, Element Plus, react-select, ARIA) with readback verification—falling back honestly to 'Not filled' on unknown controls. On mobile, an encrypted Android Keystore IME handles mini-program forms locally.",
          zh: "不写按公司硬编码的脆弱脚本，而是围绕 AntD / Element Plus / react-select / ARIA 通用组件库派发事件并回读校验；移动端则以 Android Keystore 加密输入法兜底封闭小程序。",
        },
        codeOrTestReceipt: {
          en: "UI-library widget adapter suite + Android Keystore IME isolation verified in automated CI gates.",
          zh: "组件库适配器回归测试与 Android Keystore 加密输入法均已通过自动化测试。",
        },
        unresolvedHypothesis: {
          en: "Production DOM drift on live Workday, Beisen, Moka, and Feishu portals remains an ongoing maintenance surface outside static test fixtures.",
          zh: "外部真实 Workday / 北森 / Moka / 飞书官网随时静默改版带来的长尾兼容问题仍需持续实测。",
        },
        verifiedStatus: "synthetic-gate",
        evidenceHref: "/projects/autofill#state-matrix",
      },
      {
        lens: "wcag-auditor",
        severity: "blocking",
        challengeQuestion: {
          en: "Highlighting filled/review/blank inputs with green/yellow/red borders fails color-vision deficiency and blends into dark-mode portals.",
          zh: "用绿/黄/红边框区分已填、待核与留空，色弱用户根本分不清，切换到暗黑主题网页时对比度也会崩掉。",
        },
        empiricalDefense: {
          en: "Tri-coded every tier with distinct border strokes (solid / dashed / double), explicit text badges, icons, and a side-panel log—checked across both light and dark ATS mock themes.",
          zh: "强制落地「线型（实线 / 虚线 / 双线）+ 文字标签 + 图标 + 侧栏原因」三重冗余编码，并在明暗两套主题下逐项截图核验对比度。",
        },
        codeOrTestReceipt: {
          en: "Light/dark tri-coded outline screenshots & contrast checks archived in Autofill module verification.",
          zh: "明暗双色三档线型与对比度校验记录已归档于 Autofill 验证档案。",
        },
        unresolvedHypothesis: {
          en: "Screen reader live-region verbosity when scanning 50+ inputs in one click needs live NVDA timing checks.",
          zh: "单次扫描 50+ 栏位时屏幕阅读器提示语的播报节奏尚待真实读屏压测。",
        },
        verifiedStatus: "synthetic-gate",
        evidenceHref: "/projects/autofill#rejection-archive",
      },
      {
        lens: "ai-safety",
        severity: "blocking",
        challengeQuestion: {
          en: "How does a user know the extension or Android keyboard isn't silently exfiltrating phone numbers, IDs, and resumes to an analytics endpoint?",
          zh: "用户凭什么相信你的浏览器插件或安卓简历输入法没有偷偷把手机号、身份证和履历传到后台服务器？",
        },
        empiricalDefense: {
          en: "Zero-network invariant is enforced structurally: strict MV3 Content Security Policy with zero external endpoints, plus a CI unit test that fails the build if the Android keyboard target imports any networking class.",
          zh: "用工程红线替代免责声明：Chrome 扩展受严格 CSP 零外联限制，Android 输入法模块更由单测强制看守——源码一旦出现任何网络通信类引用直接构建失败。",
        },
        codeOrTestReceipt: {
          en: "Android zero-network import unit gate + MV3 CSP isolation + permanent Human Submit Lock.",
          zh: "Android 零网络类引用单测门禁 + MV3 严格 CSP + 永久人手提交锁。",
        },
        unresolvedHypothesis: {
          en: "Lack of cloud sync requires manual JSON export/import when updating variants between desktop Chrome and Android.",
          zh: "不上云的硬代价是桌面与手机端的简历变体需手动导出导入同步一次。",
        },
        verifiedStatus: "synthetic-gate",
        evidenceHref: "/projects/autofill#design-decisions",
      },
    ],
  },
  {
    slug: "maze",
    caseTitle: { en: "MazeRunners", zh: "MazeRunners 多人触控迷宫" },
    executiveThesis: {
      en: "Shared physical conductivity turns silent solo play into loud table negotiation—backed by electrical isolation and IR debounce so hardware glitches never break player trust.",
      zh: "跨玩家串联导电把单机哑巴操作逼成围桌喊话配合；双板电气隔离与红外防抖则保证硬件绝不扣冤枉分。",
    },
    lenses: [
      {
        lens: "design-director",
        severity: "high",
        challengeQuestion: {
          en: "During the exhibition, 9 groups played yet players ignored the score display and struggled to put on finger sleeves—did the onboarding design actually work?",
          zh: "展场 9 组 36 人试玩时，观众戴不好指套而且根本不看计分大屏，这算不算开局引导和视觉反馈双双失灵？",
        },
        empiricalDefense: {
          en: "Observation revealed sleeve fitting worked best as a brief host-assisted ritual that sparked table banter, while ignoring the screen proved tactile finger vibration + buzzer carried penalty urgency directly to the hands where attention already lived.",
          zh: "现场观察恰恰校准了两点：主持人帮忙戴指套成了自然的开局破冰仪式；而玩家眼睛死盯钢球不看大屏，正好证明高优先级惩罚必须由指套震动与蜂鸣瞬间直达手指。",
        },
        codeOrTestReceipt: {
          en: "Exhibition observation logs across 9 groups (36 players, ~3 completions) archived in /projects/maze#research-vault.",
          zh: "9 组 36 人公开展场观察记录已完整留档于 /projects/maze#research-vault。",
        },
        unresolvedHypothesis: {
          en: "Handwritten leaderboard metrics were never digitized, and embedding vibration directly into the wristband cuff itself remains an untested v2 improvement.",
          zh: "展场手写排行榜未留档，且将震动马达直接缝入腕带省去指套的改良方案尚未打样。",
        },
        verifiedStatus: "observed",
        evidenceHref: "/projects/maze#research-vault",
      },
      {
        lens: "systems-architect",
        severity: "blocking",
        challengeQuestion: {
          en: "Running high-current tilt servos alongside 10 FC-51 IR sensors on one Arduino causes brownouts and triple-fires penalties on a single ball pass.",
          zh: "同一块单片机既推大电流舵机又轮询 10 路红外传感器，极易拉低供电复位，还会把滚球一次经过误判成连扣三次分。",
        },
        empiricalDefense: {
          en: "Physically isolated tilt actuation onto SafeTouchServoController away from the PlanB Mega sensing board, and locked per-channel 45 ms stability debounce + 1200 ms cooldown lockout so 1 ball pass = 1 atomic serial event.",
          zh: "硬件层面将舵机拆到独立 SafeTouchServoController 与主感测板隔离；固件层面为十路红外各自设定 45 ms 稳态消抖 + 1200 ms 冷却锁定，死守一过一事件。",
        },
        codeOrTestReceipt: {
          en: "Bench-tuned 45 ms / 1200 ms IR thresholds + shared Web Serial / Demo reducer parity tests.",
          zh: "45 ms / 1200 ms 红外门限与网页/真机同源状态机一致性均经台架调校验证。",
        },
        unresolvedHypothesis: {
          en: "1200 ms lockout prevents rapid intentional double-trap hits within 1.2 s—an explicit latency trade-off made to guarantee zero bounce errors.",
          zh: "1200 ms 冷却窗口意味着 1.2 秒内连续跨两个近距陷阱会忽略第二次，是用微盲窗换绝对不误扣的刻意取舍。",
        },
        verifiedStatus: "bench-tested",
        evidenceHref: "/projects/maze#state-matrix",
      },
      {
        lens: "wcag-auditor",
        severity: "high",
        challengeQuestion: {
          en: "How can portfolio visitors who cannot physically stand at the gallery table inspect and operate the MazeRunners logic via keyboard alone?",
          zh: "无法亲临布里斯班展场摸到木桌的评审或键盘辅助用户，如何在网页上完整体验并核验这套协同状态机？",
        },
        empiricalDefense: {
          en: "Web Serial console shares the exact round reducer with an offline browser Demo mode supporting keyboard-operable contact simulation, high-contrast LED/score mirrors, and ARIA status updates.",
          zh: "Web Serial 控制台与浏览器离线 Demo 共享同一份状态归约器，支持纯键盘触发双人协同触点，并提供高对比度灯态与 ARIA 状态播报。",
        },
        codeOrTestReceipt: {
          en: "Verified interactive MazeContactSim + keyboard accessibility under Playwright Axe checks.",
          zh: "已通过 MazeContactSim 网页交互原型与 Playwright Axe 无障碍检查。",
        },
        unresolvedHypothesis: {
          en: "Physical wooden table height/wheelchair knee-clearance ergonomics for future public gallery installations were not formally measured.",
          zh: "实体木质展桌的轮椅净空高度与坐姿触及舒适度尚未在无障碍展陈标准下实测。",
        },
        verifiedStatus: "unverified-hypothesis",
        evidenceHref: "/projects/maze#interactive-demo",
      },
      {
        lens: "ai-safety",
        severity: "blocking",
        challengeQuestion: {
          en: "Early project concepts pitched mild electric shock bracelets, and AI tools drafted the Arduino firmware—where were the physical safety boundaries enforced?",
          zh: "早期概念曾设想微弱电击手环，且 Arduino 固件有 AI 工具参与生成，公共展场的人身安全与代码兜底是谁签字的？",
        },
        empiricalDefense: {
          en: "Eliminated shock hardware entirely before public exhibition in favor of isolated low-voltage haptic sleeves and hold-to-move servo limits. Every line of AI-assisted Arduino/serial firmware was wired, bench-debugged, and signed off directly on physical boards.",
          zh: "进场前彻底废除任何电击方案，改以低压隔离舵机（松手即停）与指套震动；全部 AI 辅助编写的固件代码均在真机电路上逐路示波调试并由本人签署验收。",
        },
        codeOrTestReceipt: {
          en: "Shock removal & SafeTouchServo hold-to-move isolation documented in /projects/maze#rejection-archive.",
          zh: "废除电击与安全隔离重构记录已存档于 /projects/maze#rejection-archive。",
        },
        unresolvedHypothesis: {
          en: "Automatic CSV round telemetry logging in Web Serial was omitted during the live show and queued for any future exhibition run.",
          zh: "展场实时自动导出 CSV 对局日志的功能当时未开启，留待后续再展时补齐。",
        },
        verifiedStatus: "observed",
        evidenceHref: "/projects/maze#rejection-archive",
      },
    ],
  },
  {
    slug: "onthebeat",
    caseTitle: { en: "On The Beat", zh: "On The Beat 演出社交手环" },
    executiveThesis: {
      en: "Anonymous blind waves protect social dignity until mutual agreement, then Card 3 intentionally dims out so software yields to eye-to-eye conversation.",
      zh: "双向点头之前匿名挥手保护尊严，一旦确认碰面则由三号地标卡主动息屏退场，把现场还给人与人面对面交流。",
    },
    lenses: [
      {
        lens: "design-director",
        severity: "blocking",
        challengeQuestion: {
          en: "Why cap the app at 3 cards and ban text chat when two strangers at a noisy gig might lose each other without a quick DM?",
          zh: "演出现场又黑又吵，只有一张唯一地标卡而不给站内发文字私信，万一两个人站在场边找不到彼此怎么办？",
        },
        empiricalDefense: {
          en: "Adding a chat feed turns a live music night back into staring at glowing phones. Limiting Card 3 to a fixed venue landmark + intentional dim-out forces immediate real-world look-up—though whether landmark-only recovery holds in real crowds is flagged honestly as unverified.",
          zh: "一旦开放聊天框，工具就退化成让人继续低头回消息的社交软件；三号卡锁死单一地标并主动变暗，就是要逼出抬头张望的现实互动——但这一假设仍诚实标为未在真人群体实测。",
        },
        codeOrTestReceipt: {
          en: "3-card state flow (SAY HI / FIRST SONG? / LET'S DANCE!) + Sep 29 Ava/Leo dual-session walkthrough.",
          zh: "三卡状态流与 9 月 29 日 Ava/Leo 双浏览器全流程联调均已实证。",
        },
        unresolvedHypothesis: {
          en: "Live crowd usability at an actual gig—including whether a 60-second wrist haptic check-in is needed if people miss each other—remains unexecuted.",
          zh: "真实演出拥挤现场的陌生人破冰实测尚未开展，后续可评估是否追加 60 秒轻震确认。",
        },
        verifiedStatus: "unverified-hypothesis",
        evidenceHref: "/projects/onthebeat#research-vault",
      },
      {
        lens: "systems-architect",
        severity: "high",
        challengeQuestion: {
          en: "How do two different ESP32 wristbands (StickS3 & StickC Plus) stay synced with React phones inside a venue without tethering to a developer laptop?",
          zh: "两块型号不同的 ESP32 手环（StickS3 与 StickC Plus）加手机端，脱离你的开发笔记本电脑进演出现场怎么保证不断联？",
        },
        empiricalDefense: {
          en: "Moved the Node relay off localhost onto an always-on Sydney Fly.io instance and wired bidirectional wristband side-button state events. Verified standalone dual-band handshake with zero laptop attached on Sep 25.",
          zh: "淘汰早期强依赖电脑本地端口的脚本，将中继常驻部署于悉尼 Fly.io，并打通手环侧键双向状态回传；9 月 25 日已脱离电脑完成双环真机握手。",
        },
        codeOrTestReceipt: {
          en: "Sep 25 no-laptop StickS3 + StickC Plus handshake over Sydney Fly.io relay + Sep 29 dual-browser parity.",
          zh: "9 月 25 日脱离电脑双环握手与 9 月 29 日双客户端状态对齐已通过台架验证。",
        },
        unresolvedHypothesis: {
          en: "StickC Plus front-button short-press ergonomics and true BLE RSSI attenuation inside dense human crowds (> 200 bodies) need venue RF testing.",
          zh: "StickC Plus 正面短按防误触及 200+ 人密集人体遮挡下的真实蓝牙信号衰减仍需现场射频实测。",
        },
        verifiedStatus: "bench-tested",
        evidenceHref: "/projects/onthebeat#state-matrix",
      },
      {
        lens: "wcag-auditor",
        severity: "high",
        challengeQuestion: {
          en: "Dark venue screens that deliberately dim out on Card 3 risk falling below contrast thresholds for low-vision attendees.",
          zh: "配合演出现场暗光又要在三号卡主动变暗退场，低视力观众会不会根本看不清碰面地标文字？",
        },
        empiricalDefense: {
          en: "Dim-out transitions reduce ambient screen glare after a deliberate hold/read cue while preserving high-contrast foreground text ratios on the landmark title and providing wrist side-button tactile feedback.",
          zh: "主动退场并非把字变灰到看不见，而是撤除高亮度背景光污染，同时维持地标核心标题的高对比度，并辅以手环侧键实体回馈。",
        },
        codeOrTestReceipt: {
          en: "Verified dual-theme UI contrast and wrist/phone state parity across 12+ design review iterations.",
          zh: "已在 12 余轮画布走查中核验明暗前景可读性与双端状态一致。",
        },
        unresolvedHypothesis: {
          en: "Auditing landmark legibility at 30% phone brightness under flashing stage lights remains untested in the field.",
          zh: "舞台频闪灯光下手机低亮度状态的地标文字可读性尚未在真场灯光下校验。",
        },
        verifiedStatus: "unverified-hypothesis",
        evidenceHref: "/projects/onthebeat#design-decisions",
      },
      {
        lens: "ai-safety",
        severity: "blocking",
        challengeQuestion: {
          en: "Earlier AI-generated builds faked MEET states with static JSON and mislabeled every card '1 of 4'. How do you guarantee bilateral consent isn't spoofed?",
          zh: "之前 AI 生成初版曾用静态假 MEET 数据蒙混过关、页码也全写着「1 of 4」，怎么确保现在的双向同意门禁不是表面作秀？",
        },
        empiricalDefense: {
          en: "Rejected 12+ deceptive AI canvas iterations until two independent live clients (Ava & Leo) and two real wristbands negotiated blind wave (-68 dBm) -> mutual nod (-58 dBm) before unlocking names and landmarks.",
          zh: "连续打回 12 余轮伪联调 AI 画布，严格要求两个独立真实客户端及两块真机手环分别完成匿名感知与双向确认协商后，才允许解锁名字与地标。",
        },
        codeOrTestReceipt: {
          en: "12+ rejection receipts & Sep 25/29 dual-endpoint verification logs in /projects/onthebeat#rejection-archive.",
          zh: "12 余轮打回实录与双端真机/双视窗签收日志已存证于 #rejection-archive。",
        },
        unresolvedHypothesis: {
          en: "Rate-limiting spam blind waves from a single bad-faith attendee in a crowded room requires venue abuse testing.",
          zh: "单人恶意高频群发匿名挥手骚扰的频控策略仍待实场压力验证。",
        },
        verifiedStatus: "bench-tested",
        evidenceHref: "/projects/onthebeat#rejection-archive",
      },
    ],
  },
  {
    slug: "grassland",
    caseTitle: { en: "Grassland Iron Tide", zh: "《草原铁潮》浏览器即时战略" },
    executiveThesis: {
      en: "Withholding free camera zoom and auto-battle AI keeps tactical cause-and-effect legible across five missions under one immutable command grammar.",
      zh: "刻意不做自动代打托管、锁定镜头比例并死守跨五关统一键鼠语法，才能让即时高压下的胜负因果清晰可学。",
    },
    lenses: [
      {
        lens: "design-director",
        severity: "high",
        challengeQuestion: {
          en: "Modern strategy titles let players zoom out freely and delegate squads to AI stances. Doesn't locking zoom make battles feel cramped?",
          zh: "现代策略游戏都允许自由滚轮缩放和 AI 自动托管小队，你把镜头锁死还不给自动托管，玩家不会觉得又累又局促吗？",
        },
        empiricalDefense: {
          en: "Fixed zoom trades macro map panoramas for stable unit hitboxes and edge-pinned HUD geometry verified at 720p/1080p. Refusing auto-battle ensures players actually feel the tactical tradeoff behind every defeat.",
          zh: "固定镜头牺牲全景缩览，换来高压交战时稳定不漂移的点选命中区与 720p/1080p 零遮挡 HUD；拒绝自动代打则让每一场胜负都归因于玩家自己的战术判断。",
        },
        codeOrTestReceipt: {
          en: "720p/1080p HUD geometry checks + causal defeat modal + 75-asset provenance manifest.",
          zh: "720p/1080p 双分辨率 HUD 无遮挡实测、因果战败弹层与 75 项资产溯源已验收。",
        },
        unresolvedHypothesis: {
          en: "Unassisted playtesting with 6–8 outside RTS novices across Missions 1–3 has not yet run to validate learning-curve friction.",
          zh: "尚未找 6–8 名零基础外部策略玩家独立试玩前 3 关来检验上手学习曲线。",
        },
        verifiedStatus: "unverified-hypothesis",
        evidenceHref: "/projects/grassland#research-vault",
      },
      {
        lens: "systems-architect",
        severity: "blocking",
        challengeQuestion: {
          en: "Across 5 distinct mission scripts, how do you prevent frame-rate variance from breaking combat timings or checkpoint reloads from leaking stale state?",
          zh: "五关机制各异，怎么防止高刷屏与 60 Hz 笔记本战斗节奏不一致，又怎么防住战败读档后上一局残余状态串台？",
        },
        empiricalDefense: {
          en: "Simulation logic ticks on a fixed 20 Hz deterministic clock decoupled from render FPS, while missions are pure data manifests loading atlases lazily per chapter step. Defeat resets strictly through a single verified checkpoint snapshot chain.",
          zh: "核心模拟运行在独立于显示刷新率的 20 Hz 确定性逻辑钟上；关卡彻底数据化并按关懒加载图集；战败重试只走单一纯函数快照恢复链，根绝残余状态污染。",
        },
        codeOrTestReceipt: {
          en: "430/430 RC automated unit/integration tests covering 20 Hz ticks, EasyStar pathfinding, and Mission 1–5 checkpoints.",
          zh: "430/430 发布候选自动化测试全绿覆盖 20 Hz 时钟、EasyStar 寻路与 1–5 关读档链。",
        },
        unresolvedHypothesis: {
          en: "Low-end mobile browser WebGL/Canvas memory ceilings are out of scope since Chapter One targets desktop keyboard/mouse.",
          zh: "第一章聚焦桌面键鼠微操，低配移动端浏览器的 Canvas 显存极限尚未纳入实测范围。",
        },
        verifiedStatus: "bench-tested",
        evidenceHref: "/projects/grassland#state-matrix",
      },
      {
        lens: "wcag-auditor",
        severity: "high",
        challengeQuestion: {
          en: "Real-time 20 Hz box-selection and right-click RTS pacing locks out keyboard-heavy operators and risks clipped HUD labels at 1280×720.",
          zh: "20 Hz 实时拖拽框选对纯键盘玩家极不友好，且窄屏笔记本下边缘战术 HUD 很容易出现文字截断或按钮叠压。",
        },
        empiricalDefense: {
          en: "Ctrl+1..4 squad hotkeys, Shift selection modifiers, and pause/checkpoint shortcuts offload continuous mouse precision, while fixed edge-docked strips passed pixel-sweep audits at both 1280×720 and 1920×1080.",
          zh: "提供 Ctrl+1..4 编队、Shift 增减与快捷键暂停/读档降低连续拖拽负担；所有边缘 HUD 均在 1280×720 与 1920×1080 分辨率完成零裁切走查。",
        },
        codeOrTestReceipt: {
          en: "Verified 1280×720 & 1920×1080 HUD layout sweep + shared command grammar validator across Missions 1–5.",
          zh: "已完成双分辨率 HUD 零遮挡验收与跨五关指令契约校验。",
        },
        unresolvedHypothesis: {
          en: "Full slow-motion accessibility pacing toggle (0.5x simulation clock option) is scoped for a future accessibility pass.",
          zh: "0.5 倍速慢放辅助战斗节奏开关列为下一阶段无障碍增强候选。",
        },
        verifiedStatus: "unverified-hypothesis",
        evidenceHref: "/projects/grassland#design-decisions",
      },
      {
        lens: "ai-safety",
        severity: "high",
        challengeQuestion: {
          en: "With AI-assisted art generation and mission scripting, how did you stop style drift and silent level-specific rule hacks?",
          zh: "在有 AI 辅助生成部分美术资源与关卡脚本的情况下，如何防住各关画风分裂与后期关卡悄悄篡改基础操作手感？",
        },
        empiricalDefense: {
          en: "All 75 assets are locked to a provenance manifest and audited side by side before integration. Shared command tests forbid any mission manifest from altering click, box-select, or right-click semantics.",
          zh: "75 项资产全部纳入溯源清单并人工并排审校色温；共享契约测试严格禁止任何关卡特例修改点选、框选或右键指令语义。",
        },
        codeOrTestReceipt: {
          en: "75-asset provenance manifest + immutable command-grammar regression suite across all 5 missions.",
          zh: "75 项资产溯源表与跨五关不可变操作契约测试均已锁定。",
        },
        unresolvedHypothesis: {
          en: "Automated perceptual color-delta lint across future Chapter Two sprite sheets is not yet scripted.",
          zh: "面向未来第二章精灵表的自动化色差 CI 校验脚本尚未编写。",
        },
        verifiedStatus: "synthetic-gate",
        evidenceHref: "/projects/grassland#rejection-archive",
      },
    ],
  },
];

const RED_TEAM_MAP = new Map<string, RedTeamDeck>(
  RED_TEAM_DEFENSE_DECKS.map((deck) => [deck.slug, deck])
);

export function getAllRedTeamDecks(): readonly RedTeamDeck[] {
  return RED_TEAM_DEFENSE_DECKS;
}

export function getCaseRedTeamDeck(slug: string): RedTeamDeck | null {
  return RED_TEAM_MAP.get(slug) ?? null;
}
