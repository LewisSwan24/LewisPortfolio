import type { CaseModulesRecord } from "@/lib/cases/modules-schema";

export const autofillModules: CaseModulesRecord = {
  slug: "autofill",
  lensCallouts: {
    all: {
      en: "Full Resume Autofill dossier: ATS fill journey, 5-state zero-guess matrix, and Feishu/Moka/Android isolation rejection receipts.",
      zh: "Resume Autofill 完整档案：校招网申填表旅程、五态零猜测矩阵，以及飞书/Moka/Android 本地隔离打回记录。",
    },
    "ux-research": {
      en: "UX Research & IA focus: color-plus-shape-plus-word tri-coding (2px solid / 2px dashed / 3px solid) and side-panel per-field reason transparency.",
      zh: "UX 研究与架构视角：实线/虚线/粗实线配合文字与图标的三重编码，及侧栏逐栏原因透明度设计。",
    },
    "systems-hardware": {
      en: "Systems & Engineering focus: widget-library adapters (Ant Design, Element Plus, react-select, ARIA) + Android Keystore resume IME.",
      zh: "系统与工程视角：按前端组件库抽象的本地适配器，搭配 Android Keystore 加密简历输入法兜底小程序。",
    },
    "ai-trust": {
      en: "AI Trust & Rules focus: three hard refusals (never guess, never submit, never send), Human Submit Lock, and zero-network unit guard.",
      zh: "AI 信任与规则视角：三条硬拒绝边界（不猜、不提交、不外传）、人手提交锁与零网络依赖测试门禁。",
    },
  },
  journey: [
    {
      id: "autofill-local-vault",
      step: 1,
      title: {
        en: "Local resume vault & variant selection on-device",
        zh: "本地简历库与多版本变体选择",
      },
      trigger: {
        en: "Applicant opens Chrome MV3 side panel or Capacitor Android resume vault",
        zh: "求职者打开 Chrome MV3 侧栏或 Android 端本地简历库",
      },
      userMentalModel: {
        en: "My personal identity, phone, education, and work history should never leave my browser or phone for a third-party server.",
        zh: "个人身份、电话与履历属于高敏隐私，绝不应被上传到外部服务器或统计后端。",
      },
      systemAction: {
        en: "Loads local resume variant purely from browser local storage (under strict CSP) or Android Keystore-encrypted storage.",
        zh: "仅从浏览器本地存储（受严格 CSP 隔离）或 Android Keystore 加密存储中读取选定简历变体。",
      },
      cognitiveFriction: {
        en: "No cloud account sync means updates made on desktop must be manually mirrored to mobile.",
        zh: "坚持不上云账号意味着桌面与手机端简历变体需各自维护，无法自动跨端同步。",
      },
      edgeRecovery: {
        en: "Zero-network invariant is enforced at build/test time: a unit test fails if the Android keyboard imports any network class.",
        zh: "无网络承诺由自动化测试兜底：Android 键盘代码一旦引用任何网络类即刻单测失败。",
      },
      focusTags: ["ai-trust", "systems-hardware"],
      verifiedStatus: "synthetic-gate",
    },
    {
      id: "autofill-widget-scan",
      step: 2,
      title: {
        en: "DOM & UI-library widget scan (Ant Design / Element Plus / ARIA)",
        zh: "本地 DOM 与 UI 组件库控件扫描",
      },
      trigger: {
        en: "Applicant clicks scan on Workday, Greenhouse, Beisen, Moka, or Feishu portal",
        zh: "求职者在 Workday、Greenhouse、北森、Moka 或飞书页面触发本地扫描",
      },
      userMentalModel: {
        en: "I don't care which CSS framework the employer used; the tool should read the label reliably without breaking React/Vue form state.",
        zh: "不关心公司前端用了什么框架，只希望填进去的值能被表单校验真正认出来。",
      },
      systemAction: {
        en: "Engine detects native HTML, Ant Design, Element Plus, react-select, or ARIA widgets plus ATS adapters, previews target mappings, and fills deterministically.",
        zh: "按组件库指纹识别原生/AntD/Element/react-select/ARIA 控件并叠加主流 ATS 适配器，预览后再确定性注入值。",
      },
      cognitiveFriction: {
        en: "Hardcoding per-company DOM selectors breaks whenever portals tweak hashed class names.",
        zh: "按企业站点硬写选择器极易在官网微调样式类名后大面积失效。",
      },
      edgeRecovery: {
        en: "Unrecognized custom widgets fall back gracefully to 'Not filled' with an explicit reason in the side panel rather than injecting bad events.",
        zh: "遇到深度魔改的未知控件时绝不强行模拟点击，直接归入「未填」并在侧栏注明未识别原因。",
      },
      focusTags: ["systems-hardware", "ux-research"],
      verifiedStatus: "synthetic-gate",
    },
    {
      id: "autofill-three-tier-split",
      step: 3,
      title: {
        en: "Three-tier confidence split (Filled / Review / Blank)",
        zh: "三档确定性分流（已填 / 待确认 / 刻意留空）",
      },
      trigger: {
        en: "Matching engine scores schema certainty per detected field",
        zh: "匹配引擎对扫描到的每个表单栏位计算确定性分档",
      },
      userMentalModel: {
        en: "If my resume does not settle a field such as visa status or expected salary, leave it blank and point it out rather than guess.",
        zh: "签证身份、期望薪资这类栏位，简历里定不下来就留空标给我，别替我猜。",
      },
      systemAction: {
        en: "1:1 exact matches fill with solid border; ambiguous dropdowns pause with dashed outline; unrecognised or failed fields get a 3px solid outline; a summary card counts each group.",
        zh: "确定 1:1 栏位直填（实线）；歧义下拉暂停标虚线待核；认不出或填失败的栏位标 3px 实线；摘要卡统计各类数量。",
      },
      cognitiveFriction: {
        en: "Color-only field outlines fail color-vision deficiency and hide whether a field was intentionally skipped or silently crashed.",
        zh: "只靠红黄绿边框会伤害色觉障碍用户，也无法解释某个空格究竟是「故意不填」还是「漏填崩溃」。",
      },
      edgeRecovery: {
        en: "Every tier pairs line style (2px solid / 2px dashed / 3px solid), word label, icon, and side-panel reason line in both light and dark modes.",
        zh: "每档同时配备线型（实/虚/双）、文字标签、图标与侧栏逐栏原因，且在明暗双色模式均经截图校验。",
      },
      focusTags: ["ux-research", "ai-trust"],
      verifiedStatus: "synthetic-gate",
    },
    {
      id: "autofill-wizard-next-only",
      step: 4,
      title: {
        en: "Multi-step 'Next' advancement & Human Submit Lock",
        zh: "多步向导仅代翻「下一步」与人手提交锁",
      },
      trigger: {
        en: "Beisen or Moka multi-page application renders intermediate Next vs final Submit",
        zh: "北森或 Moka 多步网申表单进入分页流转环节",
      },
      userMentalModel: {
        en: "On Chinese campus portals, Submit often sits at the exact coordinates where Next was—never click Submit without my hand.",
        zh: "很多国内校招系统的「提交」长在上一页「下一步」同一个位置，工具必须到最后一关就停手。",
      },
      systemAction: {
        en: "Wizard advances validated 'Next' buttons to fill subsequent steps and stops dead before any Submit selector, displaying 'Final submit stays with you'.",
        zh: "多步引擎仅协助推进「下一步」以填充后续页面，一旦检测到提交语义按钮立刻停手并在侧栏明示「最终提交留给你」。",
      },
      cognitiveFriction: {
        en: "Real-world fill accuracy outside synthetic test forms and whether external users trust review outlines enough to inspect them remain unmeasured.",
        zh: "真实外部求职网站上的跨人群准确率，以及他人是否会认真核对虚线标出的待确认项，目前尚未实测。",
      },
      edgeRecovery: {
        en: "Applicant inspects the side-panel report field-by-field and manually completes open prompts before pressing Submit personally.",
        zh: "申请人对照侧栏逐栏报告人工补全开放题与歧义项后，由本人亲自点击最终提交。",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "unverified-hypothesis",
    },
    {
      id: "autofill-android-ime-fallback",
      step: 5,
      title: {
        en: "Android Resume Keyboard fallback for closed mobile apps",
        zh: "Android 专用简历键盘兜底封闭小程序",
      },
      trigger: {
        en: "Employer campus portal only opens inside WeChat mini-programs or mobile-only shells",
        zh: "企业校招仅开放微信小程序或封闭移动端表单，桌面扩展无法触及",
      },
      userMentalModel: {
        en: "I still shouldn't install shady accessibility auto-clickers; let me tap-insert my own fields fast via a trusted local keyboard.",
        zh: "不想开启全局屏幕读取的无障碍自动点击权限，宁愿切到干净的简历专用输入法逐项点选上屏。",
      },
      systemAction: {
        en: "Custom Android IME reads Keystore-encrypted resume entries and inserts tapped values directly into the active input field offline.",
        zh: "定制 Android 简历键盘读取 Keystore 本地加密条目，完全离线地将点选字段键入当前输入框。",
      },
      cognitiveFriction: {
        en: "The Android Resume Keyboard currently lacks a Chinese Pinyin IME and cannot bypass WeChat-login-only web gates.",
        zh: "该简历键盘目前不含中文拼音输入法，遇开放中文长句需切换回系统输入法，且无法绕过纯微信登录墙。",
      },
      edgeRecovery: {
        en: "Switching back to system IME takes one standard Android keyboard-globe tap while application tracker logs submission status locally.",
        zh: "一键切回系统输入法即可补写中文开放题，同时可在 Android 端本地投递追踪器里记录进度。",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "observed",
    },
  ],
  stateMatrix: [
    {
      state: "normal",
      label: { en: "Normal · 3-Tier Split & Side Panel", zh: "正常态 · 三态分流与侧栏报告" },
      entryCondition: {
        en: "Supported ATS page scanned locally with a valid local resume profile loaded.",
        zh: "本地已加载简历配置，并在可识别的 ATS 表单页完成扫描。",
      },
      uiFeedback: {
        en: "Summary card + side panel report exact counts (Filled / Review / Not filled) with stroke style, icon, word, and per-field reason.",
        zh: "摘要卡与侧栏精确列出已填/待确认/未填数量，并以线型、图标、文字和逐栏依据标注每个字段。",
      },
      keyboardFocus: {
        en: "Side-panel field entries jump directly to their corresponding DOM input on activation; Submit button stays untouched.",
        zh: "侧栏每一条待确认字段支持键盘跳转定位至对应页面输入框；原页提交按钮不被接管。",
      },
      fallbackGuarantee: {
        en: "Zero network requests leave the extension; Chrome MV3 CSP enforces strict local execution.",
        zh: "全程无任何网络外传请求，由 Chrome MV3 严格内容安全策略保障。",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "synthetic-gate",
    },
    {
      state: "empty",
      label: { en: "Empty · No Resume / Unsupported Page", zh: "空状态 · 尚未录入简历或非表单页" },
      entryCondition: {
        en: "Extension opened before importing a resume, or active tab contains zero matching form controls.",
        zh: "首次安装尚未导入简历数据，或当前标签页未检测到任何申请表单控件。",
      },
      uiFeedback: {
        en: "Side panel shows clear onboarding prompt or '0 form controls detected' rather than silent no-op.",
        zh: "侧栏明确提示先在本地导入简历或告知「当前页面未发现可填控件」，绝不静默无响应。",
      },
      keyboardFocus: {
        en: "Focus lands cleanly on local import / sample-resume action without blocking page browsing.",
        zh: "焦点合理落于本地导入或示例简历按钮，不干扰原网页浏览。",
      },
      fallbackGuarantee: {
        en: "Built-in sample resume enables immediate dry-run testing on synthetic forms without personal data.",
        zh: "内置示例简历支持在合成测试表单中零隐私风险试跑功能。",
      },
      focusTags: ["ux-research", "ai-trust"],
      verifiedStatus: "synthetic-gate",
    },
    {
      state: "offline",
      label: { en: "Offline · Strictly Local-First", zh: "离线态 · 天生全本地运行" },
      entryCondition: {
        en: "Device is offline, or ATS page operates on a cached/local intranet HTML form.",
        zh: "设备断网，或正在本地测试 HTML / 内网缓存表单上运行。",
      },
      uiFeedback: {
        en: "All scanning, adapter matching, and Android Keystore IME typing continue identically with zero cloud dependency.",
        zh: "全部控件扫描、三态分流与 Android 键盘输入保持完全可用，不依赖任何云端服务。",
      },
      keyboardFocus: {
        en: "All side-panel filters and review jumps remain locally responsive.",
        zh: "侧栏所有状态切换与字段定位在离线条件下保持瞬时响应。",
      },
      fallbackGuarantee: {
        en: "Because no server exists, offline mode is structurally identical to online mode.",
        zh: "由于系统架构本身无后端服务器，离线与在线行为在数据层完全等价。",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "synthetic-gate",
    },
    {
      state: "error",
      label: { en: "Error · Unknown Widget / Blocked Page", zh: "错误态 · 未知魔改控件或受限页" },
      entryCondition: {
        en: "Page uses heavily obfuscated non-ARIA widgets, Shadow DOM barriers, or WeChat-login-only gate.",
        zh: "页面采用非标魔改组件、强隔离节点或仅限微信客户端登录访问。",
      },
      uiFeedback: {
        en: "Marks unmapped inputs explicitly in the 'Not filled' bucket with reason text and points Android users to the Resume Keyboard.",
        zh: "将无法安全注入的栏位归入「未填」并给出明确原因，移动端同步提示可用简历键盘点选输入。",
      },
      keyboardFocus: {
        en: "Never leaves half-corrupted synthetic DOM values or traps page focus inside failed dropdown popups.",
        zh: "失败时回滚未闭合下拉弹层，不残留脏字符或截断用户焦点。",
      },
      fallbackGuarantee: {
        en: "Unknown fields stay untouched so applicant manual input is never overwritten.",
        zh: "未能识别的字段保持原样空置，绝不破坏用户已手动写好的内容。",
      },
      focusTags: ["systems-hardware", "ux-research"],
      verifiedStatus: "observed",
    },
    {
      state: "refused",
      label: { en: "Refused · Never Guess / Never Submit", zh: "拒绝态 · 拒猜开放题与禁点提交" },
      entryCondition: {
        en: "Field is an open-ended essay, low-confidence ambiguity, or matches a final Submit button selector.",
        zh: "遇到开放问答题、低把握歧义下拉框，或匹配到最终「提交」语义按钮。",
      },
      uiFeedback: {
        en: "Open prompts stay blank inside a 3px solid border; side panel states explicitly on screen: 'Final submit stays with you'.",
        zh: "开放题保留粗实线留白警示；侧栏以固定常驻提示明示「最终提交留给你」。",
      },
      keyboardFocus: {
        en: "Auto-advancer explicitly skips Submit controls so keyboard/script focus never activates final submission.",
        zh: "自动翻页逻辑显式跳过提交按钮，从源头杜绝脚本焦点误触发提交。",
      },
      fallbackGuarantee: {
        en: "Hard policy invariant: even if a user enables multi-page fill, final application submission remains 100% human.",
        zh: "不可逾越的规则红线：即便开启多步自动翻页填充，最终投递动作永远 100% 归属申请人。",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "synthetic-gate",
    },
  ],
  rejectionArchive: [
    {
      id: "autofill-reject-100pct-guess",
      round: { en: "Core Rule Definition", zh: "核心规则奠基期" },
      date: "2026-11-04",
      artifactBefore: {
        en: "Standard LLM-style autofill attempting to infer or draft answers for every blank form slot",
        zh: "常见 AI 填表思路：追求 100% 填满率，尝试推算并补全所有空格与开放题",
      },
      failureExposed: {
        en: "Design premise: a plausible-looking wrong visa class, salary expectation, or invented motivation paragraph does more harm than an empty field.",
        zh: "设计前提：填错签证状态、薪资期望，或编出一段申请动机，都比留空让人自己填害处更大。",
      },
      fixApplied: {
        en: "Replaced full-fill ambition with strict three-tier splitting (2px solid / 2px dashed / 3px solid) and zero open-ended generation.",
        zh: "砍掉猜填与生成逻辑，确立实线/虚线/粗实线三态分流规则与开放题零编造底线。",
      },
      sourceReceipt: {
        en: "2026-11-20 6/6 light & dark screenshot test pass + side-panel fill report",
        zh: "2026-11-20 明暗 6/6 合成表单截图测试通过记录与侧栏填写报告",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "synthetic-gate",
    },
    {
      id: "autofill-reject-portal-selectors",
      round: { en: "Chinese ATS Adapter Fixes", zh: "国内校招系统实测返工" },
      date: "2026-11-16",
      artifactBefore: {
        en: "Domain-specific DOM selector overrides for individual employer portals",
        zh: "按单个企业招聘页 URL 硬写的专属 DOM 选择器规则",
      },
      failureExposed: {
        en: "Real Feishu, Moka, and Beisen forms share underlying component libraries (Ant Design, Element Plus, react-select) yet mutate page IDs constantly; also multi-step Submit overlapped Next coordinates.",
        zh: "真实飞书、Moka 与北森表单底层均由成熟组件库搭成但 DOM ID 多变，且多步流程末页提交按钮常与前一页「下一步」同位。",
      },
      fixApplied: {
        en: "Rebuilt matching around UI component libraries + ATS adapters, added preview-before-fill (Nov 17–19), and enforced Human Submit Lock.",
        zh: "改为按组件库抽象适配层叠加 ATS 覆写，补齐填写前预览与多步提交锁定逻辑。",
      },
      sourceReceipt: {
        en: "resume-autofill Nov 4–19 commit history + Android Keystore IME network-import unit guard",
        zh: "resume-autofill 11 月 4–19 日迭代记录及 Android 键盘零网络依赖单测",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "bench-tested",
    },
  ],
};
