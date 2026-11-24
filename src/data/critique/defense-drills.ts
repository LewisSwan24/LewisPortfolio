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
      en: "Why does Lamplight stop a long Claude task at a risk card whose default is 'Not now', instead of letting the agent run straight through?",
      zh: "Lamplight 为什么要在长任务里停下来弹风险卡，而且默认选「先不要」，不让代理一口气跑完？",
    },
    overclaimedWeakAnswer: {
      en: "Users loved the café and it made their agent sessions 45% more productive.",
      zh: "用户都很喜欢这个咖啡馆，代理任务的效率提升了 45% 左右。",
    },
    groundedDefense: {
      en: "A risky file write or shell step turns into a card, and keyboard focus starts on 'Not now', so a reflexive Enter pauses instead of approving. Files handed to the crew are worked on as copies, and each job states its spending cap. Only I have used it, so this is a design rule, not a measured result.",
      zh: "有风险的写文件或命令行步骤会变成一张卡，键盘焦点默认停在「先不要」，顺手按回车只会暂停，不会放行。交给店员的文件一律在副本上处理，每个任务都写明花费上限。目前只有我自己用过，所以这是设计规则，不是测出来的结果。",
    },
    verificationReceipt: {
      en: "Inspect the Lamplight case: risk cards and working copies",
      zh: "查看 Lamplight 案例：风险卡与副本处理",
    },
    evidenceHref: "/projects/lamplight",
    residualGap: {
      en: "No user testing: whether other developers would accept the pause, or find it tiring, is unknown.",
      zh: "没有做过用户测试。其他开发者能否接受这种暂停、会不会觉得烦，目前都不知道。",
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
      en: "Our proprietary matching algorithm pairs compatible attendees instantly and creates seamless social bonding at gigs.",
      zh: "我们的匹配算法能精准配对兴趣相投的观众，让线下活动里的破冰转化率大幅提升。",
    },
    groundedDefense: {
      en: "No name and no photo appear until both people say yes, and one tap makes you invisible. Bands hear each other over ESP-NOW, but no signal strength, score or order ever reaches a phone or a band; an area is named only at -56 dBm or louder, otherwise the person stays 'in this room'.",
      zh: "双方都同意之前，看不到名字和照片；点一下就能隐身。手环之间用 ESP-NOW 互相感知，但信号强度、评分和排序都不会传到手机或手环上。信号达到 -56 dBm 或更强才说出所在区域，否则只显示「在这个房间」。",
    },
    verificationReceipt: {
      en: "Step through the ESP-NOW nearness & both-say-yes replay",
      zh: "步进回放 ESP-NOW 近场与双方同意状态帧",
    },
    evidenceHref: "/studio/replay?track=onthebeat",
    residualGap: {
      en: "Crowd figures come from a model in the repo's tests; no wearer or crowd testing at a gig has been run.",
      zh: "人群数据来自仓库测试里的模型，还没有做过佩戴者测试，也没有在演出人群里测过。",
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
      en: "Cosmetic smoothing lies to players about physical contact. Instead, each FC-51 sensor in MazeRunners needs three consecutive samples before it triggers, then cools down for 400 ms, so a one-sample flicker never charges a penalty. Servos run on a separate Uno, and all boards share one ground.",
      zh: "纯靠视觉缓冲只会制造错觉。MazeRunners 的每个 FC-51 传感器要连续三次取样才算触发，之后冷却 400 ms，只闪一次的毛刺不会被误扣分。舵机跑在单独的 Uno 上，所有板子共地。",
    },
    verificationReceipt: {
      en: "Inspect the MazeRunners one-sample flicker replay (simulated)",
      zh: "打开 MazeRunners 单次闪烁拦截的模拟重放",
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
