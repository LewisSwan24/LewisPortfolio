export type DefenseRoleId = "product" | "interaction" | "design-eng" | "ai-ux";
export type DefenseMarketId = "apac" | "anz";

export interface DefenseDrill {
  id: string;
  roleId: DefenseRoleId;
  marketId: DefenseMarketId;
  roleLabel: { en: string; zh: string };
  marketLabel: { en: string; zh: string };
  projectSlug: "walkie" | "lamplight" | "autofill" | "maze" | "onthebeat" | "grassland";
  challengeQuestion: { en: string; zh: string };
  overclaimedWeakAnswer: { en: string; zh: string };
  groundedDefense: { en: string; zh: string };
  verificationReceipt: { en: string; zh: string };
  evidenceHref: string;
  residualGap: { en: string; zh: string };
}

export const DEFENSE_ROLES: Array<{ id: DefenseRoleId; en: string; zh: string }> = [
  { id: "product", en: "Product & Systems", zh: "产品与交互系统" },
  { id: "interaction", en: "Interaction & Physical", zh: "实体与交互原型" },
  { id: "design-eng", en: "Design Engineer", zh: "前端 / 设计工程师" },
  { id: "ai-ux", en: "AI UX & Safety", zh: "AI 交互与安全边界" },
];

export const DEFENSE_MARKETS: Array<{ id: DefenseMarketId; en: string; zh: string }> = [
  { id: "apac", en: "APAC · SG / CN / HK", zh: "亚太快迭代团队视角" },
  { id: "anz", en: "ANZ · AU / NZ Clarity", zh: "澳新稳健合规视角" },
];

export const DEFENSE_DRILLS: readonly DefenseDrill[] = [
  {
    id: "product-apac",
    roleId: "product",
    marketId: "apac",
    roleLabel: { en: "Product & Systems", zh: "产品与交互系统" },
    marketLabel: { en: "APAC Fast-Shipping Lens", zh: "亚太敏捷团队追问" },
    projectSlug: "lamplight",
    challengeQuestion: {
      en: "Why enforce a two-phase confirmation card inside Lamplight instead of launching a sleek 1-click AI triage button to lift weekly task completion?",
      zh: "为什么要在 Lamplight 里加两步确认卡片，而不是直接做一个“AI 一键自动分流”提升周活跃效率？",
    },
    overclaimedWeakAnswer: {
      en: "Users loved our AI triage flow and it boosted productivity by 45% with high accuracy across daily work sessions.",
      zh: "我们实测发现用户非常喜欢一键 AI 建议，整体分流准确率和任务完成度提升了 45% 左右。",
    },
    groundedDefense: {
      en: "Caregiver triage mistakes carry asymmetric emotional fallout: silently reassigning or dropping a family chore creates distrust that destroys retention faster than a 2-second tap saves. Keeping AI proposals reversible before commit guarantees human sign-off without adding clutter.",
      zh: "家庭照护协作一旦静默改写责任人，引发的信任裂痕远比多点一次确认致命。因此我们把 AI 建议锁定为可预览、可撤回的提案卡片，未确认前绝不落库改动日程。",
    },
    verificationReceipt: {
      en: "Inspect Lamplight Rejection Archive & Five-State Audit matrix",
      zh: "核查 Lamplight 否决档案与五态审计矩阵",
    },
    evidenceHref: "/projects/lamplight",
    residualGap: {
      en: "Longitudinal compliance across 6-month multi-household routines remains untested beyond bench walkthroughs.",
      zh: "多家庭连续六个月跨季使用的真实留存与疲劳度尚未开展实地追踪。",
    },
  },
  {
    id: "product-anz",
    roleId: "product",
    marketId: "anz",
    roleLabel: { en: "Product & Systems", zh: "产品与交互系统" },
    marketLabel: { en: "ANZ Accessible & Calm Lens", zh: "澳新稳健与无障碍追问" },
    projectSlug: "onthebeat",
    challengeQuestion: {
      en: "How does On The Beat avoid becoming another coercive social radar that pressures quiet participants in an ANZ co-located venue?",
      zh: "在澳新注重边界感与低打扰的线下场域中，On The Beat 如何避免演变成令人尴尬的社交追踪雷达？",
    },
    overclaimedWeakAnswer: {
      en: "Our proprietary Bluetooth algorithm matches compatible attendees instantly and creates seamless social bonding at conferences.",
      zh: "我们的蓝牙算法能精准匹配参会者兴趣，让线下活动里的破冰交互转化率大幅提升。",
    },
    groundedDefense: {
      en: "On The Beat strips persistent identity and distance graphs by design: RSSI tiers (-68 / -58 dBm) only unlock 3 stepped anonymous wave cards, require reciprocal physical nods, and auto-dim the OLED screen right after eye contact starts.",
      zh: "系统从底层放弃持久化身份档案和雷达地图：BLE 分层仅触发三阶无名波形卡，必须双向物理点头才临时解锁名片，见面后手环屏幕主动熄灭退场，绝不滞留线上关系链。",
    },
    verificationReceipt: {
      en: "Step through BLE RSSI gating & mutual dim-out replay",
      zh: "步进回放 BLE 阈值与熄屏退场状态帧",
    },
    evidenceHref: "/studio/replay?track=onthebeat",
    residualGap: {
      en: "Co-located multi-body RF attenuation logs cover small test sessions rather than 200-person crowded halls.",
      zh: "两百人以上高密度展厅场景的人体遮挡衰减实测数据目前仍属空白。",
    },
  },
  {
    id: "interaction-apac",
    roleId: "interaction",
    marketId: "apac",
    roleLabel: { en: "Interaction & Physical", zh: "实体与交互原型" },
    marketLabel: { en: "APAC Hardware Constraints Lens", zh: "亚太硬件量产落地追问" },
    projectSlug: "maze",
    challengeQuestion: {
      en: "In a noisy mall or classroom showcase, shiny floor reflections spike IR sensors — did you just hide the jitter in UI animations?",
      zh: "在强反光展台或教室地面测试时，红外传感器极易频繁抖动误触发，你们是用动画掩盖了吗？",
    },
    overclaimedWeakAnswer: {
      en: "Our smooth React animations made players feel like controls were ultra-responsive and bug-free in every showcase.",
      zh: "我们在界面上增加了平滑过渡动画，玩家在现场几乎感觉不到传感器延迟或报错。",
    },
    groundedDefense: {
      en: "Cosmetic smoothing lies to players about physical contact. Instead, MazeRunners enforces a strict 45 ms hardware debounce window on FC-51 channels and electrically decouples servo current returns so bounce chatter at 15 ms never charges a wall penalty.",
      zh: "纯靠视觉缓冲只会制造错觉。MazeRunners 在 FC-51 通道底层焊死了 45 ms 硬件防抖门限，并将舵机供电回路隔离，让 15 ms 的地面高反光毛刺直接被固件丢弃，绝不冤枉扣分。",
    },
    verificationReceipt: {
      en: "Inspect MazeRunners 15ms glitch rejection trace in Protocol Replay",
      zh: "打开 MazeRunners 15ms 毛刺拦截波形与防抖实证",
    },
    evidenceHref: "/studio/replay?track=maze",
    residualGap: {
      en: "Outdoor direct sunlight infrared saturation limits require physicalhood shading not built in acrylic v1.",
      zh: "正午户外直射强光下的红外饱和抑制罩仍待下一代结构件补齐。",
    },
  },
  {
    id: "interaction-anz",
    roleId: "interaction",
    marketId: "anz",
    roleLabel: { en: "Interaction & Physical", zh: "实体与交互原型" },
    marketLabel: { en: "ANZ Tactile Trust Lens", zh: "澳新实体安全性追问" },
    projectSlug: "walkie",
    challengeQuestion: {
      en: "Why put destructive approval on two tiny hardware keys when screen touch dialogs are faster to iterate and localize?",
      zh: "触摸屏弹窗改文案和本地化比实体按键快得多，为什么 Walkie 非要把审批押在两枚硬件按键上？",
    },
    overclaimedWeakAnswer: {
      en: "Hardware buttons look more futuristic for AI gadgets and increase developer engagement during coding workflows.",
      zh: "物理按键让 AI 开发硬件看起来更有极客质感，能提高平时写代码的沉浸体验。",
    },
    groundedDefense: {
      en: "Away from the workstation, developers cannot safely read small 1.14-inch screens while walking. Separating Front Key (commit) and Side Key (abort) onto distinct thumb geometry creates eyes-free proprioceptive certainty — zero chance of accidental destructive approval.",
      zh: "开发者离开桌面走动时，根本没条件在 1.14 寸小屏上盲点弹窗。把确定批准锁定在前键、拒绝/中断锁定在侧键，依靠实体键帽位置差异提供盲操确定性，从物理触觉层切断误批准。",
    },
    verificationReceipt: {
      en: "Verify Walkie GPIO37/39 dual-key twin and USB-DTR preemption",
      zh: "核查 Walkie 双键数字孪生与 USB 抢占链路",
    },
    evidenceHref: "/studio/replay?track=walkie",
    residualGap: {
      en: "Multi-week daily transit endurance across varied Wi-Fi captive portals lacks public user field logs.",
      zh: "不同公共 Wi-Fi 认证网络下跨周长程切网掉线的外部受试日志仍有待积累。",
    },
  },
  {
    id: "design-eng-apac",
    roleId: "design-eng",
    marketId: "apac",
    roleLabel: { en: "Design Engineer", zh: "前端 / 设计工程师" },
    marketLabel: { en: "APAC Performance Budget Lens", zh: "亚太高性能包体追问" },
    projectSlug: "grassland",
    challengeQuestion: {
      en: "Shipping interactive 3D canvases and AI search usually bloats mobile routes past 300 kB JS. What prevents slow loads here?",
      zh: "不少作品集塞进 3D 和 AI 搜索后首屏 JS 动辄突破 300 kB，你靠什么保证这里不卡成幻灯片？",
    },
    overclaimedWeakAnswer: {
      en: "Next.js handles code splitting automatically, so pages load nearly instantaneously across all mobile networks.",
      zh: "框架默认支持分包和树摇优化，所以所有移动端网络打开都像静态页一样瞬开。",
    },
    groundedDefense: {
      en: "Three.js lives strictly behind dynamic(ssr: false) wrappers sharing one lazy chunk (82.4 kB gz), interactive client widgets import zero server registries/zod graphs, and scripts/check-bundle-budget.mjs fails CI if any App route chunk tops 22 kB gz or CSS tops 68 kB gz.",
      zh: "Three.js 严格隔离在单份共享异步懒加载包（82.4 kB gz）内且绝不渗入首屏；客户端组件严禁引入服务端的 registry 或 zod 图谱；CI 内置体积守门脚本硬性卡死单路由 <= 22 kB gz 与 App CSS <= 68 kB gz。",
    },
    verificationReceipt: {
      en: "Inspect live build chunk telemetry on Lab Section 08",
      zh: "在实验室 08 号遥测区核查实时构建包体数据",
    },
    evidenceHref: "/lab#bundle-observatory",
    residualGap: {
      en: "Core Web Vitals RUM numbers remain sparse until steady post-GA public recruiter traffic accumulates.",
      zh: "真实访客 P75 体验指标仍依赖上线后持续汇入的匿名采样，不靠本地合成数据充数。",
    },
  },
  {
    id: "design-eng-anz",
    roleId: "design-eng",
    marketId: "anz",
    roleLabel: { en: "Design Engineer", zh: "前端 / 设计工程师" },
    marketLabel: { en: "ANZ WCAG & Reduced-Motion Lens", zh: "澳新无障碍与弱动态合规追问" },
    projectSlug: "walkie",
    challengeQuestion: {
      en: "How do users on locked-down enterprise browsers without WebGL or with prefers-reduced-motion keep full interactive parity?",
      zh: "遇到公司内网禁用 WebGL 或开启「减弱动态效果」的用户，你的 3D 和交互工作台会直接白屏还是失效？",
    },
    overclaimedWeakAnswer: {
      en: "Modern browsers all enable WebGL out of the box, and we show a nice loading text if graphics fail.",
      zh: "现在主流浏览器都自带硬件加速支持，万一加载失败页面上也会有个提示文字。",
    },
    groundedDefense: {
      en: "Every 3D twin renders an identical interactive 2D SVG schematic underneath with mapped zone focus frames, listens to webglcontextlost without crashes, disables continuous rAF spin under reduced-motion, and exposes an HTML adjacency table beside every DAG canvas.",
      zh: "每个 3D 标本底层均配备等位高亮的 2D SVG 原理图与可点击状态芯片，捕获 webglcontextlost 零报错即时切换；「减弱动态」开启后立刻冻结持续旋转，DAG 图谱旁亦同步附带完整语义邻接表。",
    },
    verificationReceipt: {
      en: "Test 2D schematic fallback and WCAG keyboard DAG nav",
      zh: "点击 2D 图纸降级与键盘 DAG 无障碍核验",
    },
    evidenceHref: "/studio/graph",
    residualGap: {
      en: "Touch dragging on 4x browser zoom viewports stays clean via buttons, not multi-finger pinch zoom inside SVG.",
      zh: "放大 400% 浏览器视口时，图谱依赖分组按钮与表格切换，不额外依赖双指捏合手势。",
    },
  },
  {
    id: "ai-ux-apac",
    roleId: "ai-ux",
    marketId: "apac",
    roleLabel: { en: "AI UX & Safety", zh: "AI 交互与安全边界" },
    marketLabel: { en: "APAC RAG Hallucination Lens", zh: "亚太模型幻觉与脱敏追问" },
    projectSlug: "autofill",
    challengeQuestion: {
      en: "Your /ai workbench and MCP tools answer recruiter queries — what stops a pasted JD or prompt injection from fabricating metrics?",
      zh: "/ai 工作台和 MCP 接口对外响应招聘查询，什么机制能阻止粘贴进来的长文本诱导它编造不存在的项目指标？",
    },
    overclaimedWeakAnswer: {
      en: "Our carefully engineered system prompt tells the LLM never to hallucinate and stay strictly grounded.",
      zh: "我们在 Prompt 提示词里明确要求大模型严谨对齐简历原文、禁止虚构数字。",
    },
    groundedDefense: {
      en: "Zero generative LLM runs on the read-only citation path: client-side PII scrubbers strip emails, phones, Bearer/API secrets before scoring, deterministic bilingual BM25 ranks static verified chunks, and out-of-scope queries return an explicit boundary refusal.",
      zh: "公开证据问答链不走自由生成：浏览器端先将邮箱、电话与秘钥前缀脱敏后再检索；底层仅按确定性双语 BM25 对已校验静态库打分，超出索引或涉及未公开草稿一律触发边界拒答。",
    },
    verificationReceipt: {
      en: "Inspect live PII redaction + 5-tool MCP sandbox on /ai",
      zh: "在 /ai 核查本地脱敏与 5 项只读 MCP 沙盒",
    },
    evidenceHref: "/ai",
    residualGap: {
      en: "BM25 keyword retrieval misses nuanced paraphrasing unless synonyms live in the domain expansion map.",
      zh: "纯静态权重检索面对高度口语化的跨界隐喻提问时，仍需同义词表持续补全。",
    },
  },
  {
    id: "ai-ux-anz",
    roleId: "ai-ux",
    marketId: "anz",
    roleLabel: { en: "AI UX & Safety", zh: "AI 交互与安全边界" },
    marketLabel: { en: "ANZ Human-In-Command Lens", zh: "澳新表单撤销与人机控制权追问" },
    projectSlug: "autofill",
    challengeQuestion: {
      en: "In Autofill, what prevents an eager browser agent from silently overwriting compliant or legal form inputs a human already typed?",
      zh: "在严肃合规或求职投递场景中，Autofill 如何防止 AI 在用户不察觉时悄悄覆盖掉人类原本手填的合规字段？",
    },
    overclaimedWeakAnswer: {
      en: "Users appreciate auto-filling every blank on a page so they can submit job applications in a single click.",
      zh: "自动把整页所有表单一次性填满最能节省时间，用户审核一遍提交即可。",
    },
    groundedDefense: {
      en: "Autofill refuses silent dirty-field overwrites: pre-existing human input gets flagged as locked unless explicitly replaced per field, every filled slot records a pre-mutation snapshot for one-tap restore, and sensitive declaration checkboxes stay blocked from automation.",
      zh: "系统严禁覆盖已手动修改字段：原有人工输入默认加锁展示对比，每次写入均同步压入原位可回滚快照；涉及法律声明或合规勾选框则直接锁死拒绝自动代勾。",
    },
    verificationReceipt: {
      en: "Open Autofill Snapshot Rollback & State Diff",
      zh: "查看 Autofill 快照回滚与防覆盖设计论证",
    },
    evidenceHref: "/projects/autofill",
    residualGap: {
      en: "Shadow-DOM third-party ATS widgets occasionally isolate focus traps outside content-script MutationObservers.",
      zh: "极少数强隔离 Shadow DOM 第三方招聘平台表单仍存在事件拦截兼容边界。",
    },
  },
];
