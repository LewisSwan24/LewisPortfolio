import type { CaseStory } from "./types";

/**
 * Sources: src/data/cases/onthebeat.ts (workSummary, media, narrative,
 * designDecisions, interactiveDemo), src/data/cases/modules/onthebeat-modules.ts
 * (journey, stateMatrix, rejectionArchive), src/lib/proof/recent-cases.ts
 * (summary, depth decisions, evidence, limits). On The Beat has no entry of
 * its own in case-depth.ts; that file spreads recent-cases.ts in. The fact
 * sheet rules in recent-cases.ts hold: no claim that Lewis wrote the firmware,
 * no participant or wear test, no haptics, and the concept is a teammate's.
 */
export const onthebeatStory: CaseStory = {
  en: {
    problem:
      "At a live gig, two strangers who want to talk have no low-stakes way to start. A phone app that asks them to stare at a screen works against the point, so the devices have to start the conversation and then get out of the way.",
    roleLine:
      "Individual version of DECO3500 coursework. The original three-card Figma prototype is a teammate's. I set the requirements, reviewed AI output, hunted errors and paired the real wristbands. The code was written by AI tools.",
    result:
      "A phone app, two wristbands and an always-on relay that run without a laptop. Names and the meeting place appear only after both people have agreed.",
    problemBody: [
      "It was meant for gig-goers who want to signal they are open to a chat without staring at a feed. An app that makes them stare at a phone works against the moment.",
      "The concept was not mine: the three cards, SAY HI, FIRST SONG? and LET'S DANCE!, come from a teammate's Figma prototype. Each began as a message to Claude Code naming something the generated version had not done, and each was then checked on the two real wristbands, not only on screen.",
    ],
    decisions: [
      {
        id: "decision-blind-wave",
        title: "Nobody sees a name until both say yes",
        conflict:
          "At a dark, loud gig, saying hello to someone nearby carries real social face-loss anxiety if you misread the room. Pulling up a bright social-feed screen breaks eye contact and kills the music moment.",
        chosen:
          "A first wave carries only anonymous presence ('someone nearby waved'), across the three low-stakes prompt cards from the teammate's concept. Names and a shared meeting landmark unlock only after both nod, so both phones can go right back into pockets.",
        gaveUp:
          "A nearby-people radar showing faces, profiles and bios, which turns a gig into appearance ranking when nobody asked to be browsed. An alert that reveals identity on one wave, which exposes people without symmetric consent.",
        evidence:
          "In two local test windows, Ava and Leo, on the 29 September build, a wave showed only that someone nearby was there; names and the meeting place appeared after both nodded.",
      },
      {
        id: "decision-no-laptop-relay",
        title: "No laptop at the table, and no mocked states in the demo",
        conflict:
          "AI-generated prototypes often look finished on a laptop desk, with mocked matches and laptop-tethered relays that would collapse immediately in a real venue.",
        chosen:
          "An always-on Node relay on Fly.io in Sydney carries state both ways. MEET has to be a real agreement between the StickS3 and StickC Plus bands. Generated canvases went back for rework at least 5 times (at least 12 on the earlier Say Hello canvas) until every state transition held.",
        gaveUp:
          "A laptop relay at the table, which left neither phone nor bands able to run away from the desk. Accepting the first generated canvas, which shipped mocked states into the demo. The cost: dependence on cloud connectivity in crowded venues, and a running cost.",
        evidence:
          "On 25 September, 65 minutes after my message that nothing ran without a computer, both bands showed MEET at the same time through the cloud relay.",
      },
      {
        id: "decision-wrist-side-button",
        title: "Pick a card from the wrist",
        conflict:
          "If the wristband merely mirrors whatever is tapped on the phone, attendees in a packed crowd are forced back onto a bright phone screen just to switch icebreaker cards.",
        chosen:
          "The StickS3 and StickC Plus side buttons emit state changes through the Fly.io relay, so cycling cards on the band updates the React app in real time. The phone is left to show first names and where to meet once both say yes.",
        gaveUp:
          "A phone-master, display-only band, which pulls eyes back down at the exact second an icebreaker should keep people looking around. Hardware-only patterns with no phone, where a tiny 1.14-inch screen cannot show a clear meeting landmark in a dark room.",
        evidence:
          "At noon on 25 September only the phone could still drive the band; that afternoon the side button chose a card and the phone followed.",
      },
    ],
    watchFor:
      "Watch when the names appear: send an anonymous wave card, complete the mutual wrist confirmation, then step the phone out of view once the two people meet.",
    tryLinks: [
      { href: "/lab?demo=onthebeat#lab-sm-title", label: "Inspect On The Beat in /lab →" },
      { href: "/studio/replay?track=onthebeat", label: "Inspect millisecond protocol frames in Replay Studio →" },
    ],
    built: {
      body: [
        "Three parts talk through one relay. The phone app is React. The relay is Node on one always-on machine on Fly.io in Sydney. The two wristbands are a StickS3 and a StickC Plus, two different ESP32-family boards, running C++ firmware. After a match the phone shows first names, where to meet and a shared number, with no chat thread or feed; LET'S FINISH then turns the card off.",
        "Everything was built with AI tools. I did the wiring, turned on the hotspot, pressed the buttons, watched the screens and reported back. The design canvas was generated in Claude Design, and I imported each version into Claude Code for review: on 25 September I caught that the MEET it showed was simulated.",
      ],
      tested: [
        "Real hardware, 25 September 2026: both wristbands showed MEET at the same time through the cloud relay, with no laptop involved.",
        "Staff-page push notifications arrived on my Android phone on 30 September, with a VPN on. An iPhone clip that disappeared on 6 October was fixed but not retested.",
        "None of this is participant testing. There is no record of any participant testing the app.",
      ],
      states: [
        {
          state: "Normal",
          what: "A card chosen on the phone or the wrist side button syncs across both sessions, with no name shown early.",
          recovery: "The whole link runs without any nearby laptop.",
        },
        {
          state: "Empty",
          what: "SAY HI is lit but nobody nearby has waved: the armed card shows, with no fake '12 people nearby' counter.",
          recovery: "No profile data is broadcast while the phone sits idle in a pocket.",
        },
        {
          state: "Offline",
          what: "A crowded venue hotspot drops the Sydney relay: the app shows the relay is disconnected, so nobody assumes a wave was delivered.",
          recovery: "Reconnect and reset stay reachable without losing the chosen card.",
        },
        {
          state: "Error",
          what: "A generated screen shows a state the system never reached, such as a mocked MEET, or playback breaks, as with the 6 October iPhone clip.",
          recovery: "Caught in manual review loops.",
        },
        {
          state: "Refused",
          what: "Only one person waved: the receiver sees only 'someone nearby waved', and neither side sees a name.",
          recovery: "The relay enforces mutual consent, so a one-sided wave cannot leak a name, and an unanswered wave expires quietly.",
        },
      ],
    },
    outcome: {
      body: [
        "A phone app, two wristbands and an always-on relay that run without a laptop, in a public repository.",
        "In this record my part sits at two ends: saying what the system must do, and sending back output that only looked finished. Mock data that showed MEET and a link that only worked with my laptop each looked fine on screen until it was tried. What the case cannot say is whether the cards help two strangers meet. That needs people at a real or staged gig, and it has not happened yet.",
      ],
      limits: [
        {
          title: "There is no record of any participant testing the app.",
          body: "Whether the cards make two strangers start talking is the point of the project, and it is untested.",
        },
        {
          title: "The bands' timing values, such as staying awake for six seconds or a 1.5-second long press, are estimates.",
          body: "Timings that feel wrong on a wrist would undo the flow at a real gig.",
        },
        {
          title: "The firmware and app code were written and flashed by Claude Code.",
          body: "The case cannot be read as hand-written code.",
        },
        {
          title: "Some paths are unverified: a night on battery, the Plus's front button, and a wave-back pressed on the band itself.",
          body: "Each is a place a real evening could fail.",
        },
      ],
      next:
        "Run a staged gig session with pairs of participants, wear the bands to measure the timings that are still estimates, and retest each unverified path with its date.",
    },
  },
  zh: {
    problem:
      "在现场演出里，两个想搭话的陌生人缺一个没有压力的开头。要他们盯着手机的 App 反而违背初衷，所以设备要负责开口，然后退到一边。",
    roleLine:
      "课程作业 DECO3500 的个人版本。最初的三张卡 Figma 原型出自组员。我定需求、审查 AI 输出、排查错误，并在真手环上配对实测。代码由 AI 工具编写。",
    result: "手机 App、两支手环和一台常开的 relay，不需要笔电就能运转。双方都同意之后，才会互相看到名字和碰面地点。",
    problemBody: [
      "服务对象是演出现场的观众：想表达愿意聊两句，又不想一直低头刷手机。一个让人盯着手机的 App，只会把那一刻打断。",
      "概念不是我的，三张卡 SAY HI、FIRST SONG?、LET'S DANCE! 出自组员的 Figma 原型。每一条都始于我发给 Claude Code 的一条消息，指出生成版本没做到的地方。之后每一条都在两支真手环上核对，不只看屏幕。",
    ],
    decisions: [
      {
        id: "decision-blind-wave",
        title: "双方点头之前，谁也看不到名字",
        conflict:
          "在灯光昏暗、人声嘈杂的演出现场，想向邻近的人搭话，又担心误判对方意愿而当场尴尬。可要是低头刷社交软件加好友，又会打断现场的音乐沉浸感。",
        chosen:
          "首次挥手只传递「附近有人挥手」的匿名信号，配合组员原型里的三张低压力卡。双方都点头确认后，才解锁名字与碰面地标，随后两部手机就能收回口袋。",
        gaveUp:
          "附近人雷达直接展示头像与个人资料：会把演出现场变成刷脸选秀，在对方表态前过早暴露身份。单方挥手就推送对方名字与位置：单方面突破社交安全距离，容易造成骚扰与尴尬。",
        evidence:
          "9 月 29 日的构建上，本机两个测试视窗 Ava 与 Leo 走了一遍。收到挥手时只显示附近有人，双方都点头后才显示名字和碰面地点。",
      },
      {
        id: "decision-no-laptop-relay",
        title: "拿掉笔电，demo 里不留假状态",
        conflict:
          "AI 生成的原型在笔记本桌面上常常「看起来什么都能跑」。里面却藏着写死的假匹配，链路也离不开电脑本地服务，带到现场就会穿帮。",
        chosen:
          "Node relay 迁到 Fly.io 悉尼的一台常开机器，状态双向同步。MEET 必须是 StickS3 与 StickC Plus 之间的真实协商。生成的画布逐屏走查，打回至少 5 轮，早期 Say Hello 画布至少 12 轮，直到每个状态转换都成立。",
        gaveUp:
          "保留桌上笔电充当中继：没有电脑，手机和手环都跑不起来，带不进真实演出场地。默认接受首轮生成的画布：写死的模拟状态会直接进入演示。代价是现场依赖云端连接，也多了运行成本。",
        evidence: "9 月 25 日，我说没有电脑就跑不起来。65 分钟后，两支手环经云端 relay 同时显示 MEET。",
      },
      {
        id: "decision-wrist-side-button",
        title: "在手腕上就能换卡",
        conflict:
          "如果手环只能单向映射手机的点按结果，人在拥挤的演出现场还得掏出亮屏手机，才能切换破冰卡片。",
        chosen:
          "StickS3 与 StickC Plus 的侧键接成一等事件源，经 Fly.io 中继双向同步。在手环上换卡，React 端实时跟着变。双方都同意后，手机才显示对方名字和碰面地点。",
        gaveUp:
          "手机绝对主控、手环只负责亮屏：本该抬眼找人的时刻，又被拽回手机屏幕。砍掉手机界面、全靠手环小屏盲按：在昏暗场地里，1.14 英寸的小屏承载不了清晰的碰面地标。",
        evidence: "9 月 25 日中午复测，仍然只有手机能控制手环。下午再测，侧键选卡，手机随之变化。",
      },
    ],
    watchFor: "注意名字什么时候出现：选一张匿名脉冲卡，完成双向手环点头，再让手机退场。",
    tryLinks: [
      { href: "/lab?demo=onthebeat#lab-sm-title", label: "前往 /lab 走查 On The Beat 状态机 →" },
      { href: "/studio/replay?track=onthebeat", label: "进入硬件协议帧步进重放工作台 →" },
    ],
    built: {
      body: [
        "三个部分通过一台 relay 对话。手机 App 用 React。relay 是 Node，跑在 Fly.io 悉尼的一台常开机器上。两支手环是 StickS3 和 StickC Plus，属于 ESP32 系列的两种板子，跑 C++ 固件。配对后手机只给名字、碰面地点和同一个编号，不设聊天框，也没有动态。聊完用 LET'S FINISH 收尾，那张卡随之关闭。",
        "全部用 AI 工具完成。我负责接线、开热点、按键、看屏幕并反馈。设计画布由 Claude Design 生成，每一版我都导入 Claude Code 审查：9 月 25 日我发现画面上的 MEET 是模拟出来的。",
      ],
      tested: [
        "真机，2026 年 9 月 25 日：两支手环经云端 relay 同时显示 MEET，链路里没有笔电。",
        "员工页推播在 9 月 30 日送达过我的 Android 手机，当时开着 VPN。10 月 6 日 iPhone 片段消失的问题修好了，但没有复测。",
        "这些都不是参与者测试。没有任何参与者测试这个 App 的记录。",
      ],
      states: [
        {
          state: "正常",
          what: "手机或手环侧键选卡，两端实时同步，互认前不显示名字。",
          recovery: "整套链路完全脱离笔记本电脑独立运转。",
        },
        {
          state: "空状态",
          what: "已点亮 SAY HI，但周围没人挥手：只显示点亮的卡，没有「附近有 12 人」这类虚假数字。",
          recovery: "手机放在口袋待机时，不广播任何个人信息。",
        },
        {
          state: "离线",
          what: "场馆网络拥塞，与悉尼 relay 断开：明确提示中继离线，用户不会误以为挥手已送达。",
          recovery: "重连与重置入口保持可达，选中的卡不丢。",
        },
        {
          state: "错误",
          what: "生成的界面显示系统没到达过的状态，如写死的 MEET；或播放出错，如 10 月 6 日的 iPhone 片段。",
          recovery: "靠多轮人工走查拦下。",
        },
        {
          state: "拒绝",
          what: "只有一方挥手：接收方只看到「附近有人挥手」，双方都看不到名字。",
          recovery: "中继层锁定双向同意，单方挥手换不到名字；没有回应的挥手静默失效。",
        },
      ],
    },
    outcome: {
      body: [
        "手机 App、两支手环和一台常开的 relay，不需要笔电就能运转，代码在公开仓库里。",
        "从记录看，我的部分在两头：说清系统必须做到什么，把只是看起来做完的输出打回去。显示 MEET 的模拟数据、只在我笔电上能跑的链路，在屏幕上看都没问题，一试才露馅。这个案例说不了的，是这些卡片能不能帮两个陌生人碰面。这需要在真实或模拟的演出现场找人来试，目前还没做。",
      ],
      limits: [
        {
          title: "尚无任何参与者测试这个 App 的记录。",
          body: "卡片能不能让两个陌生人开口，正是这个项目要回答的问题，目前没有测过。",
        },
        {
          title: "手环的时间参数，例如保持唤醒六秒、长按 1.5 秒，都是估计值。",
          body: "戴在手上感觉不对的时间，到了现场会打断整个流程。",
        },
        {
          title: "固件与 App 代码由 Claude Code 编写并烧录。",
          body: "这个案例不能读成手写代码。",
        },
        {
          title: "有几条路径没验证：一晚的电池、Plus 的正面键、在手环上按实体键回挥。",
          body: "每一条都可能让一个真实的晚上出问题。",
        },
      ],
      next: "在模拟演出场景请几组参与者试用，并佩戴手环实测仍是估计值的时间参数。未验证的路径逐条复测，带日期记录结果。",
    },
  },
};
