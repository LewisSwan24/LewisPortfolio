import type { RawResearchVaultRecord } from "@/lib/cases/research-vault-schema";

export const autofillResearchVault: RawResearchVaultRecord = {
  slug: "autofill",
  studyStatus: "synthetic-gate",
  honestScopeNote: {
    en: "Zero-network unit checks, 3-tier border/dark-mode visual audits, and widget adapter mocks (AntD, Element Plus, react-select, ARIA) pass in CI. Live external applicant testing across ATS portals has not been conducted.",
    zh: "零网络单测、三档线型明暗双色截图校验及组件库适配器回归均在自动化门禁通过。尚未组织真实求职者跑通外部各家校招网站。",
  },
  moderatorGuide: {
    protocolTitle: {
      en: "Zero-Guess Confidence Split & Human Submit Lock Protocol",
      zh: "零猜测三档分流与人手提交锁可用性验证规程",
    },
    cohortAndSetting: {
      en: "Planned, not run: graduating applicants filling repetitive ATS applications (Workday, Greenhouse, Beisen, Moka, Feishu).",
      zh: "计划中，未执行：面向反复填写中英文网申（Workday / Greenhouse / 北森 / Moka / 飞书）的应届生。",
    },
    openingBrief: {
      en: "Run autofill on this multi-step application form, resolve the flagged yellow dashed fields, complete the open prompt yourself, and stop right before the final Submit.",
      zh: "「请用侧栏插件预填这份多步网申表，逐项核对标出虚线提示的栏位，补全故意留空的开放题，并在最终提交前停下来检查。」",
    },
    taskProbes: [
      {
        id: "autofill-probe-tri-tier",
        prompt: {
          en: "Inspect the summary tally (e.g., 45 Filled / 1 Review / 1 Blank) and locate why the 1 blank field was skipped.",
          zh: "查看顶部统计汇总（如 45 已填 / 1 待确认 / 1 刻意留空），并找出那 1 个空白字段为何没被填上。",
        },
        whatWeWatchFor: {
          en: "Whether tri-coding (2px solid / 2px dashed / 3px solid border + label + icon) communicates intentional refusal vs parser failure without relying on color alone.",
          zh: "检验「线型 + 文字 + 图标」三重编码能否让用户秒懂「AI 故意不猜」与「识别失败」的差别。",
        },
        failureSignal: {
          en: "User assumes the blank field is a broken parser bug rather than an explicit no-guess boundary.",
          zh: "若用户把刻意留空误认为插件崩溃漏填，说明侧栏逐栏原因解释不够显眼。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
      {
        id: "autofill-probe-submit-lock",
        prompt: {
          en: "Advance across multi-step 'Next' buttons up to the final submission screen.",
          zh: "借助多步向导「下一步」按钮连续翻页，直至抵达最终提交确认页。",
        },
        whatWeWatchFor: {
          en: "Comfort with machine-assisted page advancement paired with hard stopping before the irreversible Submit click.",
          zh: "确认用户能清楚感知「翻页可代劳，最终提交按钮永远锁死给人手」。",
        },
        failureSignal: {
          en: "Confusion when 'Next' stops working on the last page without an explanatory Submit Lock note.",
          zh: "抵达末页时若未给出明确的「人手提交锁」提示，容易让人误以为向导按钮卡死。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
      {
        id: "autofill-probe-android-ime",
        prompt: {
          en: "Switch to the Android Keystore resume IME inside a mobile mini-program form where browser extensions cannot run.",
          zh: "在不支持扩展程序的手机招聘小程序表单中，切换本地加密简历输入法填入个人信息。",
        },
        whatWeWatchFor: {
          en: "Verify the applicant understands resume data stays offline on-device without cloud sync.",
          zh: "核对用户是否明白本地简历库不上云、无网络权限，因此跨端需手动同步一次 JSON。",
        },
        failureSignal: {
          en: "Expecting cloud sync edits from desktop Chrome to appear automatically on Android.",
          zh: "若用户理所当然以为桌面改完手机端会自动同步，则说明本地隔离提示需前置强调。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
    ],
    debriefQuestion: {
      en: "Would you trust an autofill tool more if it filled 98% by guessing borderline dropdowns, or 85% with hard stops?",
      zh: "「你更信任猜着帮你填满 98% 的工具，还是只填确定项、把 15% 歧义框显式标出来让你亲自点的工具？」",
    },
  },
  observationLogs: [
    {
      id: "autofill-obs-1",
      sessionRef: { en: "Synthetic Fixture · UI Library Adapters", zh: "合成夹具实测 · 组件库适配器" },
      context: {
        en: "Tested Ant Design, Element Plus, react-select, and ARIA custom select widgets under React/Vue state validation.",
        zh: "在 React 与 Vue 状态校验环境下实测 Ant Design、Element Plus、react-select 与 ARIA 自定义下拉框。",
      },
      observation: {
        en: "Direct DOM `.value = ...` assignment visually filled fields yet silently failed React/Vue form validation on submit.",
        zh: "直接改写 DOM `.value` 表面看字进去了，点提交时框架状态层却判定为空。",
      },
      designResponse: {
        en: "Built adapter-specific event dispatch + verification readback; unknown custom widgets report 'Not filled' honestly instead of faking completion.",
        zh: "改用按组件库定制的事件派发与回读核验；遇到不认识的魔改控件宁可明说「未填」绝不假装填好。",
      },
      verifiedStatus: "synthetic-gate",
    },
    {
      id: "autofill-obs-2",
      sessionRef: { en: "Visual Audit · Dark & Color-Blind Contrast", zh: "视觉走查 · 暗色与色觉对比度" },
      context: {
        en: "Checked 2px solid / 2px dashed / 3px solid field outlines on light and dark ATS mock pages.",
        zh: "在明暗两套模拟网申表单背景下逐一核验三档边框样式。",
      },
      observation: {
        en: "Thin yellow/amber outlines dropped below usable legibility on light gray form cards and failed color-only perception tests.",
        zh: "浅灰背景下的纯黄色细框不仅对比度吃紧，对红绿色觉障碍者也几乎无法与已填项区分。",
      },
      designResponse: {
        en: "Paired border stroke patterns (2px solid / 2px dashed / 3px solid) with explicit word badges and side-panel per-field rationale.",
        zh: "定死「实线 / 虚线 / 粗实线」加文字标签与侧栏原因的三重编码，彻底摆脱对颜色的单一依赖。",
      },
      verifiedStatus: "synthetic-gate",
    },
    {
      id: "autofill-obs-3",
      sessionRef: { en: "Build Gate · Android Zero-Network Guard", zh: "构建门禁 · Android 零网络守卫" },
      context: {
        en: "Enforcing the 'resume never leaves the device' promise inside the Android IME module.",
        zh: "在 Android 简历键盘模块强制落地「简历永不出设备」约束。",
      },
      observation: {
        en: "Policy prose alone cannot prevent accidental telemetry or third-party SDK network imports in future dependencies.",
        zh: "口头隐私声明挡不住后续引入第三方库时悄悄夹带联网请求。",
      },
      designResponse: {
        en: "Added an automated unit gate that fails CI immediately if the Android keyboard target imports any networking class.",
        zh: "编写静态/单测守卫：Android 键盘模块一旦出现任何网络通信类引用，构建直接拦截失败。",
      },
      verifiedStatus: "synthetic-gate",
    },
  ],
  ergonomicsOrStageSpec: {
    title: {
      en: "Three-Tier Certainty & Isolation Boundary Spec",
      zh: "三档确定性分流与隐私隔离规格",
    },
    subtitle: {
      en: "Visual encoding, wizard progression, and zero-network invariants verified across Chrome MV3 & Android IME.",
      zh: "覆盖 Chrome MV3 扩展与 Android 本地输入法的确定性视觉与隐私硬指标。",
    },
    rows: [
      {
        dimension: { en: "Tier 1 · Exact 1:1 Match", zh: "一档 · 确定直填" },
        constraint: { en: "Solid border + 'Filled' badge + field log", zh: "实线边框 + 「已填」标签 + 侧栏命中依据" },
        rationale: {
          en: "High-confidence schema matches (name, email, phone, degree dates) fill without friction while staying auditable.",
          zh: "姓名、邮箱、起止年月等无歧义字段一次填妥，同时保留映射依据可查。",
        },
        verifiedStatus: "synthetic-gate",
      },
      {
        dimension: { en: "Tier 2 · Ambiguous Select", zh: "二档 · 歧义待核" },
        constraint: { en: "Dashed border + pause + side-panel prompt", zh: "虚线边框 + 暂停等待 + 侧栏标出候选分歧" },
        rationale: {
          en: "Prevents silent wrong picks on visa sponsorship, notice period, or overlapping degree titles.",
          zh: "遇到工作签证、到岗时间或相近专业名称等微妙选项，宁可停下交给人核对。",
        },
        verifiedStatus: "synthetic-gate",
      },
      {
        dimension: { en: "Tier 3 · Open / Unknown", zh: "三档 · 刻意留空" },
        constraint: { en: "3px solid border + blank value + explicit skip reason", zh: "粗实线边框 + 保持空白 + 写明跳过理由" },
        rationale: {
          en: "Never fabricates motivation essays or 'Why this company?' answers; skips unrecognized widgets honestly.",
          zh: "绝不替人编造求职动机小作文，也不强行往未适配控件硬塞字符。",
        },
        verifiedStatus: "synthetic-gate",
      },
      {
        dimension: { en: "Final Action Lock", zh: "终审提交锁" },
        constraint: { en: "Next-step allowed · Submit button permanently off-limits", zh: "允许代翻「下一步」 · 提交按钮永久禁触" },
        rationale: {
          en: "Irreversible external submission to an employer ATS always belongs to the applicant.",
          zh: "向招聘方正式投递属于不可逆外部动作，必须由求职者本人审阅后点击。",
        },
        verifiedStatus: "synthetic-gate",
      },
    ],
  },
  triRoleTension: [
    {
      role: "pm-product",
      roleLabel: { en: "Product / Growth Mindset", zh: "产品 / 效率导向" },
      priority: {
        en: "Maximize single-click form completion across messy Chinese and Western ATS portals.",
        zh: "在结构五花八门的中英文校招网申系统里尽可能提高一键填充率。",
      },
      tension: {
        en: "Temptation to wire an LLM fallback that guesses missing essays and auto-submits batches.",
        zh: "很容易想接个大模型兜底把开放问答也自动编完，甚至加个「一键海投」卖点。",
      },
      resolution: {
        en: "Draw a hard product red line: local-first deterministic matching + 'Never guess, never submit, never send'.",
        zh: "立下不可逾越的产品底线：纯本地确定性匹配，坚持「不猜、不代投、不出设备」。",
      },
    },
    {
      role: "engineering-hardware",
      roleLabel: { en: "Extension & Mobile Engineer", zh: "扩展与移动端工程师" },
      priority: {
        en: "Survive hashed CSS selectors, React synthetic inputs, and sandboxed mobile mini-programs.",
        zh: "抗住混淆类名、React 受控表单状态同步，以及扩展进不去的手机小程序沙盒。",
      },
      tension: {
        en: "Fragile per-company DOM scrapers break monthly; browser extensions cannot inject into WeChat/Alipay mini-programs.",
        zh: "按公司硬写选择器每月都在坏；而浏览器扩展在微信/钉钉招聘小程序里根本无法运行。",
      },
      resolution: {
        en: "Build adapters around shared UI component libraries (AntD/Element/ARIA) and pair with a zero-network Android Keystore IME.",
        zh: "按主流前端组件库写通用适配器，再用零网络权限的 Android 加密输入法兜底移动端。",
      },
    },
    {
      role: "end-user",
      roleLabel: { en: "Graduate Job Seeker", zh: "高频网申应届生" },
      priority: {
        en: "Save 20 minutes per application without risking false credentials or leaking personal identity.",
        zh: "每份网申省下十几二十分钟机械复制粘贴，但绝不能因为填错履历或隐私泄露毁掉机会。",
      },
      tension: {
        en: "Anxiety over whether a fast autofill silently mis-selected a critical eligibility dropdown.",
        zh: "填得越快心里越慌，生怕某个关键资格下拉框被插件悄悄选错却没发现。",
      },
      resolution: {
        en: "Tri-coded visual tiers + side-panel per-field audit log make every skipped or uncertain box unmissable before human Submit.",
        zh: "三档线型编码加侧栏逐栏账本，确保提交前每一处存疑与留空都一眼可见。",
      },
    },
  ],
  rebuildToday: [
    {
      id: "autofill-q1",
      question: {
        en: "What invariant stays non-negotiable in a rebuild?",
        zh: "如果重做一版，哪条原则寸步不让？",
      },
      answer: {
        en: "Zero-network execution verified by automated build tests, plus keeping Submit physically outside automation scope.",
        zh: "自动化测试强担保的零联网执行，以及把最终「提交」永远留在自动化触角之外。",
      },
      verifiedStatus: "synthetic-gate",
    },
    {
      id: "autofill-q2",
      question: {
        en: "Where is real-world evidence still missing?",
        zh: "当前最缺哪块真实世界验证？",
      },
      answer: {
        en: "Live field sessions with job seekers on actual Workday, Beisen, and Feishu portals—since employer DOM changes happen silently in production.",
        zh: "还没带真实求职者跑过线上真实 Workday、北森与飞书校招页，官网随时静默改版带来的长尾兼容性缺口亟待实测。",
      },
      verifiedStatus: "unverified-hypothesis",
    },
    {
      id: "autofill-q3",
      question: {
        en: "What UX improvement would I ship first for multi-variant resumes?",
        zh: "多版本简历切换体验下一步最想补什么？",
      },
      answer: {
        en: "A dry-run diff preview comparing which fields will change when switching between Design Engineer and UX Researcher resume variants.",
        zh: "在切换「设计工程师 / UX 研究」不同版本简历前增加一层预演对比，直观标明哪些字段会跟着改写。",
      },
      verifiedStatus: "unverified-hypothesis",
    },
    {
      id: "autofill-q4",
      question: {
        en: "Why keep an Android IME instead of a floating clipboard overlay?",
        zh: "为什么做完整 Android 输入法而不用悬浮剪贴板？",
      },
      answer: {
        en: "Floating overlays clash with OEM Android permissions and obscure small fields, whereas a custom keyboard lives cleanly inside the OS input method boundary.",
        zh: "悬浮窗容易被各家国产安卓系统后台杀掉，还会遮挡输入框。做成系统级加密输入法，才能在招聘小程序里稳定唤起。",
      },
      verifiedStatus: "synthetic-gate",
    },
  ],
};
