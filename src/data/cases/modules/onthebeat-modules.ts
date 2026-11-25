import type { CaseModulesRecord } from "@/lib/cases/modules-schema";

export const onthebeatModules: CaseModulesRecord = {
  slug: "onthebeat",
  journey: [
    {
      id: "onthebeat-arm-card",
      step: 1,
      title: {
        en: "Pick a low-stakes prompt card via phone or wristband side button",
        zh: "通过手机或手环侧键点亮低压力破冰卡片",
      },
      shortTitle: {
        en: "Prompt card",
        zh: "破冰卡片",
      },
      trigger: {
        en: "Attendee at a live gig wants to signal openness to chat without staring at a feed",
        zh: "演出现场观众想表达愿意聊两句，但不想一直低头刷手机社交动态",
      },
      userMentalModel: {
        en: "If I can toggle between SAY HI, FIRST SONG?, and LET'S DANCE! straight on my wrist, I stay present with the music.",
        zh: "能直接在手腕按侧键切换 SAY HI / FIRST SONG? / LET'S DANCE!（源自队友原型），才不会打断听歌气氛。",
      },
      systemAction: {
        en: "StickS3 / StickC Plus side button emits state transitions to the always-on Sydney Fly.io relay, syncing back to the React app.",
        zh: "StickS3 / StickC Plus 侧键将选卡事件发往悉尼常驻 Fly.io 中继，反向实时同步手机 React 端画面。",
      },
      cognitiveFriction: {
        en: "First generated build only mirrored phone -> band one-way, trapping users back onto bright handheld screens in a dark crowd.",
        zh: "AI 初版只做到了手机单向推给手环，迫使人在昏暗拥挤人群里不得不掏出手机亮屏操作。",
      },
      edgeRecovery: {
        en: "Rebuilt bidirectional relay agreement; StickC Plus front button gesture & wrist-only wave-back remain documented open edge cases.",
        zh: "打通手环侧键反向驱动状态；Plus 正面短按与纯手环直接回挥目前仍如实标记为待复测边界。",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "bench-tested",
    },
    {
      id: "onthebeat-blind-wave",
      step: 2,
      title: {
        en: "Send an anonymous wave without exposing identity",
        zh: "发送匿名挥手脉冲，对方零身份泄露",
      },
      shortTitle: {
        en: "Anonymous wave",
        zh: "匿名挥手",
      },
      trigger: {
        en: "User sends a wave across the venue relay",
        zh: "用户向场地附近中继发出一次挥手试探",
      },
      userMentalModel: {
        en: "If nobody waves back, my name and face were never broadcast to strangers—zero social embarrassment.",
        zh: "万一对方没兴趣回挥，我的名字与头像从未暴露给陌生人，完全没有搭讪失败的尴尬。",
      },
      systemAction: {
        en: "Fly.io Node relay pushes a blind wave alert ('Someone nearby waved', zero name/photo) to paired React/band endpoints.",
        zh: "Fly.io 中继仅向对端推送「附近有人挥手」（无名字、无照片、无个人主页）。",
      },
      cognitiveFriction: {
        en: "Whether blind waves genuinely help two strangers start talking at a live gig remains unverified without live participant testing.",
        zh: "三张卡在实际或模拟演出中是否真能帮陌生人开启对话，因尚未做过参与者实验，仍属诚实未验证假设。",
      },
      edgeRecovery: {
        en: "Unanswered waves expire quietly with no nagging follow-ups or unilateral identity leaks.",
        zh: "未获回应的挥手静默失效，既不反复打扰对方，也绝不单向暴露发起者信息。",
      },
      focusTags: ["ux-research", "ai-trust"],
      verifiedStatus: "unverified-hypothesis",
    },
    {
      id: "onthebeat-mutual-meet",
      step: 3,
      title: {
        en: "Symmetric mutual-nod unlocks MEET, names & landmark",
        zh: "双方点头确认后才同步解锁 MEET、名字与地标",
      },
      shortTitle: {
        en: "Mutual MEET",
        zh: "双方确认",
      },
      trigger: {
        en: "Second attendee acknowledges the anonymous wave on phone/wristband",
        zh: "另一侧观众在手机或手环端确认回应这次挥手",
      },
      userMentalModel: {
        en: "Only once both of us clearly say yes should we learn each other's names and a simple spot to meet.",
        zh: "唯有双方都明确点头之后，屏幕才应该揭晓彼此名字和场地内的碰面地点。",
      },
      systemAction: {
        en: "Relay resolves mutual agreement state across React, StickS3, and StickC Plus simultaneously (verified Sep 25 with zero laptop attached).",
        zh: "中继确认双端均已同意后，同步向手机与 StickS3/StickC Plus 下发 MEET 态（9 月 25 日已脱离电脑真机双环验证）。",
      },
      cognitiveFriction: {
        en: "Early AI output mocked MEET with static JSON so screens looked matched even when the second device never consented.",
        zh: "早期 AI 生成版本用静态假数据伪造了 MEET 画面，看似跑通实则根本没做双端真实协商。",
      },
      edgeRecovery: {
        en: "Verified via two local browser sessions (Ava & Leo on Sep 29 build) plus live 2-wristband Sydney relay handshake.",
        zh: "除 9 月 25 日双环真机实测外，亦在 9 月 29 日用 Ava 与 Leo 双视窗完整走通状态流转。",
      },
      focusTags: ["ai-trust", "systems-hardware"],
      verifiedStatus: "bench-tested",
    },
    {
      id: "onthebeat-pocket-exit",
      step: 4,
      title: {
        en: "Meeting place handover & a kind LET'S FINISH",
        zh: "交出碰面地点，再用 LET'S FINISH 收尾",
      },
      shortTitle: {
        en: "Meeting & finish",
        zh: "碰面与收尾",
      },
      trigger: {
        en: "Names and shared venue meeting spot appear after mutual consent",
        zh: "双向互认成功后屏幕给出双方姓名与单一碰面地标",
      },
      userMentalModel: {
        en: "Once we spot each other near the landmark, phones go straight back into pockets—the app succeeded by disappearing.",
        zh: "找到彼此碰上面之后，手机就该收回口袋——工具在把人送到彼此面前后立刻退场。",
      },
      systemAction: {
        en: "Shows first names, where to meet and a shared number without chat threads, social feeds, or retention hooks; LET'S FINISH then turns the card off.",
        zh: "只给名字、碰面地点和同一个编号，刻意不设长聊天框或留存诱导。聊完用 LET'S FINISH 收尾，那张卡随之关闭。",
      },
      cognitiveFriction: {
        en: "Staff-page push arrived on Android on Sep 30 (with VPN), while an Oct 6 disappearing iPhone clip fix remains un-retested.",
        zh: "9 月 30 日员工端推送曾在开 VPN 的 Android 测通；10 月 6 日修复的 iPhone 片段消失问题尚未复测。",
      },
      edgeRecovery: {
        en: "All timing constants (6s awake window, 1.5s hold) are surfaced honestly as unmeasured wrist estimates rather than hard claims.",
        zh: "6 秒唤醒与 1.5 秒长按等参数均坦诚标注为待现场佩戴实测的估计值，绝不包装成结论。",
      },
      focusTags: ["ux-research", "ai-trust"],
      verifiedStatus: "observed",
    },
    {
      id: "onthebeat-ai-review-loop",
      step: 5,
      title: {
        en: "Rigorous AI canvas & firmware verification loop",
        zh: "针对 AI 产出的多轮挑错与真机打回闭环",
      },
      shortTitle: {
        en: "AI review loop",
        zh: "AI 挑错闭环",
      },
      trigger: {
        en: "Claude Design canvas or Claude Code firmware/app build is imported for inspection",
        zh: "每轮 Claude Design 画布或 Claude Code 固件/前端构建产出交付审查",
      },
      userMentalModel: {
        en: "Polished visual output from AI hides mocked states and localhost assumptions—every claim must be touched on real bands.",
        zh: "AI 生成的漂亮界面最容易掩盖假状态和本地写死端口，必须拿到两支真手环上逐条拆穿验证。",
      },
      systemAction: {
        en: "Author inspected screens and hardware step-by-step, rejecting canvases 5+ times (12+ earlier) and exposing localhost relay blocker.",
        zh: "作者逐屏逐键查验并先后打回设计画布 5 轮以上（早期 12 轮以上），在真机连测揪出离开电脑即瘫痪的断点。",
      },
      cognitiveFriction: {
        en: "Full-night battery endurance and crowded venue Wi-Fi/hotspot reliability remain untested outside desk/hotspot checks.",
        zh: "完整演出现场整晚续航与高密度人群网络稳定性目前尚未经历实地压力考验。",
      },
      edgeRecovery: {
        en: "65 minutes after flagging the no-laptop constraint on Sep 25, both physical bands paired cleanly through Fly.io Sydney.",
        zh: "9 月 25 日提出「无电脑必须运转」硬约束后 65 分钟，两支手环通过悉尼云端中继完成真机配对。",
      },
      focusTags: ["ai-trust", "systems-hardware"],
      verifiedStatus: "bench-tested",
    },
  ],
  stateMatrix: [
    {
      state: "normal",
      label: { en: "Normal · Dual-Band Relay Sync", zh: "正常态 · 双手环云端同步" },
      entryCondition: {
        en: "Phone React app + StickS3 + StickC Plus connected to Sydney Fly.io wss:// relay over hotspot/mobile data.",
        zh: "手机 React 端与 StickS3/StickC Plus 通过热点/移动网络接入悉尼 Fly.io 常驻中继。",
      },
      uiFeedback: {
        en: "Card selection on phone or wrist side button mirrors cleanly across paired sessions without exposing names prematurely.",
        zh: "手机端或手环侧键选卡实时同步，互认前保持严格匿名波纹反馈。",
      },
      keyboardFocus: {
        en: "Web UI uses standard focusable prompt cards and clear action buttons; wrist relies on crisp side-button cycling.",
        zh: "网页端卡片与确认键具备清晰焦点路径；手环端由物理侧键顺畅循环切换三张词条卡。",
      },
      fallbackGuarantee: {
        en: "Operates completely independent of any nearby laptop.",
        zh: "整套链路完全脱离笔记本电脑独立运转，满足离桌携带前提。",
      },
      focusTags: ["systems-hardware", "ux-research"],
      verifiedStatus: "bench-tested",
    },
    {
      state: "empty",
      label: { en: "Empty · Idle Gig Presence", zh: "空状态 · 场地待机未挥手" },
      entryCondition: {
        en: "Attendee opened app / armed SAY HI card with zero incoming waves nearby.",
        zh: "观众已点亮 SAY HI 等破冰卡，但周围暂无人发起或回应挥手。",
      },
      uiFeedback: {
        en: "Shows armed prompt card cleanly without fake '12 people nearby' social-pressure counters.",
        zh: "仅平稳显示当前点亮的破冰卡，不制造「附近有 12 人」等虚假社交焦虑数字。",
      },
      keyboardFocus: {
        en: "Focus stays calmly on card cycle / wave trigger without intrusive modal banners.",
        zh: "焦点安静停在换卡与挥手触发器上，绝不弹出诱导性骚扰通知。",
      },
      fallbackGuarantee: {
        en: "Zero profile metadata broadcasts while sitting idle in pocket.",
        zh: "待机放入口袋期间零个人身份信息广播。",
      },
      focusTags: ["ux-research", "ai-trust"],
      verifiedStatus: "observed",
    },
    {
      state: "offline",
      label: { en: "Offline · Venue Signal Drop", zh: "离线态 · 演出现场弱网断连" },
      entryCondition: {
        en: "Crowded gig cellular hotspot drops connection to the Sydney Fly.io relay.",
        zh: "高密度演出场馆信号拥塞导致手机或手环与悉尼 Fly.io 中继断开。",
      },
      uiFeedback: {
        en: "Stops simulating fake matches; cleanly indicates relay disconnection so user never assumes a wave was delivered.",
        zh: "立即停止状态推进并明确提示中继离线，绝不让用户误以为挥手已送达对端。",
      },
      keyboardFocus: {
        en: "Reconnect / reset actions remain reachable without losing chosen card state.",
        zh: "重连与重置入口保持可达，不丢失当前选中的卡片状态。",
      },
      fallbackGuarantee: {
        en: "No stale cached match screen poses as a live mutual consent.",
        zh: "绝不用过期缓存伪造仍在生效的碰面许可。",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "observed",
    },
    {
      state: "error",
      label: { en: "Error · Canvas / Playback Breakpoint", zh: "错误态 · 画布与播放断点" },
      entryCondition: {
        en: "A generated screen shows a state the system never reached (e.g., a mocked MEET) or playback breaks (e.g., the Oct 6 iPhone clip glitch).",
        zh: "生成的界面显示了系统并未到达的状态（如写死的模拟 MEET），或播放出错（如 10 月 6 日的 iPhone 片段异常）。",
      },
      uiFeedback: {
        en: "Caught during manual review loops; fixed state machine ensures valid card or return control stays rendered.",
        zh: "经多轮人工走查拦截修复，确保任意卡片选择后均有合法渲染态与退回路径。",
      },
      keyboardFocus: {
        en: "Prevents focus landing inside empty/blank viewport traps.",
        zh: "避免用户焦点落入空白区域而失去返回能力。",
      },
      fallbackGuarantee: {
        en: "Honest evidence boundary explicitly notes that Oct 6 iPhone clip fix awaits retesting.",
        zh: "案例页诚实披露 10 月 6 日 iPhone 片段修复尚未复测，不掩盖待验项。",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "observed",
    },
    {
      state: "refused",
      label: { en: "Refused · Unanswered Wave & Identity Gate", zh: "拒绝态 · 未互认严禁显名" },
      entryCondition: {
        en: "Only one person waved while the second attendee ignores, declines, or never nods.",
        zh: "仅单方发出挥手脉冲，对端未回应或明确忽略。",
      },
      uiFeedback: {
        en: "Receiver sees only 'someone nearby waved'; initiator sees no rejection sting and zero identity reveal on either side.",
        zh: "接收方仅看到匿名「附近有人挥手」；未达成双向点头前双方互相完全不可见名字与位置。",
      },
      keyboardFocus: {
        en: "Dismissing an incoming wave cleanly closes the prompt card without penalty dialogs.",
        zh: "忽略或关闭来波提示后焦点自然回到待机状态，不产生惩罚性弹窗。",
      },
      fallbackGuarantee: {
        en: "Mutual consent invariant strictly enforced at relay state layer—one-sided waves can never leak names.",
        zh: "中继状态层硬性锁定双向同意门槛，单向操作绝对无法换取对方身份。",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "bench-tested",
    },
  ],
  rejectionArchive: [
    {
      id: "onthebeat-reject-canvas-12",
      round: { en: "Canvas Review (12+ / 5+ rounds)", zh: "AI 画布连续打回（12+ / 5+ 轮）" },
      date: "2026-09-21",
      artifactBefore: {
        en: "Claude Design canvas whose MEET was static mocked JSON",
        zh: "Claude Design 生成的画布，MEET 是写死的模拟 JSON",
      },
      failureExposed: {
        en: "Polished visual frames created the illusion of working interaction while hiding dead state transitions and fake mutual consent.",
        zh: "精致排版制造了「已经做完」的假象，实则隐藏了走不通的状态转换与假的双方同意。",
      },
      fixApplied: {
        en: "Sent Say Hello canvas back 12+ rounds and the later canvas 5+ rounds in one night until live wave-to-nod transitions and card selection held.",
        zh: "对早期 Say Hello 画布连续打回至少 12 轮、后续版当晚再打回至少 5 轮，直到真实的状态转换和选卡全部跑通。",
      },
      sourceReceipt: {
        en: "Sep 15–29 Claude Design -> Claude Code audit trail & Ava/Leo local walkthrough",
        zh: "9 月 15–29 日设计审查记录与 Ava / Leo 双视窗全链路截图",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "observed",
    },
    {
      id: "onthebeat-reject-localhost-relay",
      round: { en: "Hardware Portability Gate", zh: "离桌真机联调门禁" },
      date: "2026-09-25",
      artifactBefore: {
        en: "Phone-master mirroring tied to a local laptop relay server + one-way band display",
        zh: "依赖笔记本电脑本地运行的中继服务 + 手机单向驱动手环显示",
      },
      failureExposed: {
        en: "Without a computer sitting next to the bands, neither phone nor wristbands could pair or run, making real gig use impossible.",
        zh: "一旦离开桌边那台电脑，手机和两支手环全都连不上、完全无法带进任何演出场地。",
      },
      fixApplied: {
        en: "Issued explicit constraint ('without a computer, neither can run'), moved Node relay to always-on Fly.io Sydney, and enabled side-button state control; bands hit MEET 65 minutes later.",
        zh: "发出硬性约束后 65 分钟内将 Node 中继迁往悉尼常驻 Fly.io，并接通侧键反向选卡，两支真环脱离电脑同步点亮 MEET。",
      },
      sourceReceipt: {
        en: "25 Sep hardware debugging log (65 min to live dual-band MEET on StickS3 + StickC Plus)",
        zh: "9 月 25 日真机调试实录（65 分钟达成双环脱机配对 MEET）",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "bench-tested",
    },
  ],
};
