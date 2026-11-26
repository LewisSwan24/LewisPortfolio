import type { CaseStory } from "./types";

/**
 * Sources: src/data/cases/autofill.ts (workSummary, cover, media, narrative,
 * designDecisions, interactiveDemo), src/data/cases/modules/autofill-modules.ts
 * (journey, stateMatrix, rejectionArchive), src/lib/proof/case-autofill.ts
 * (summary, depth evidence, iterations, limits), and the Autofill lab CTA in
 * src/components/case/CaseInvariantLink.tsx.
 */
export const autofillStory: CaseStory = {
  en: {
    problem:
      "Applying for graduate jobs means typing the same resume into Workday, Greenhouse, Beisen, Moka and the rest, one field at a time. A tool that fills them for you is only worth using if it never fills a field wrongly, never submits for you, and never sends your resume anywhere.",
    roleLine:
      "Solo: the problem, the rules the tool follows, review, and testing on my own applications. The code was written by Claude Code.",
    result:
      "A local-first autofill tool covering international ATS platforms and Chinese campus-recruitment sites, which I have used on my own applications.",
    problemBody: [
      "Applying for graduate jobs meant typing the same resume into Workday, Greenhouse, Beisen, Moka and the rest, field by field. That was where it started.",
      "While building it, privacy became the main design constraint. A tool that fills forms in your name has to be trusted not to fill them wrongly, not to submit for you, and not to send your resume anywhere. Aggressive autofillers silently write low-confidence guesses into high-stakes fields.",
      "The person it was built for, and the only user on record, is me.",
    ],
    decisions: [
      {
        id: "decision-three-tiers",
        title: "Leave it blank rather than guess",
        conflict:
          "Re-typing one resume across Workday, Beisen and Moka is exhausting, yet autofillers that guess visa status, salary expectations or motivation essays to look '100% automatic' shift the risk of a bad error onto the applicant.",
        chosen:
          "Exact 1:1 local matches fill at once with a solid outline, ambiguous dropdowns pause for review with a dashed one, and what the tool leaves unfilled gets a 3px solid outline. Open prompts always stay blank. Every tier pairs a line style with a word, an icon and a reason in the side panel.",
        gaveUp:
          "A cloud LLM that drafts every blank and open prompt: it invents plausible answers on fields that cannot be wrong and sends the resume off the device. Color-only highlights, which fail color-blind users and do not say why a field was left empty. Applicants still write open answers by hand.",
        evidence:
          "In the screenshot test the summary card read 45 filled, 1 needing review and 1 not filled, each with a word as well as a color.",
      },
      {
        id: "decision-human-submit-local",
        title: "Next is automatic, the last click is mine",
        conflict:
          "Multi-step campus portals often put Submit in the exact spot where Next sat on earlier pages, so there is a real fear that automation will send a half-finished application.",
        chosen:
          "On a multi-page form the tool presses Next and fills each page, then stops dead before Submit, and the side panel says so. The Chrome extension's strict content security policy blocks network calls, and Android encrypts the resume with a key held in the device Keystore.",
        gaveUp:
          "One-click end-to-end auto-apply, which removes the applicant's final check and makes any adapter misread irreversible. Cloud account sync between Chrome and Android, which adds server storage and breach risk. The cost: one more click on every application, and each device needs its own setup.",
        evidence:
          "The side panel says it on screen: the tool only presses Next, and the final submit stays with you.",
      },
      {
        id: "decision-adapters-keyboard",
        title: "Read the widget, not the website",
        conflict:
          "CSS selectors written per company site break every few weeks, and closed mobile surfaces such as WeChat campus mini programs shut browser extensions out completely.",
        chosen:
          "The engine fills by kind of control: native HTML, Ant Design, Element Plus, react-select and ARIA widgets, with adapters for Greenhouse, Lever, Workable and Workday, and for Beisen, Moka and Feishu. Where a browser cannot reach, an Android resume keyboard with no network access types the fields in.",
        gaveUp:
          "One DOM script per employer careers page, which breaks whenever markup IDs change. An accessibility auto-clicking service over closed apps, which would read the whole screen of personal apps. The keyboard has no Chinese Pinyin input, and heavily customised widgets still fall back to the person.",
        evidence:
          "Real Feishu, Moka and Beisen forms turned out to share component libraries while their page IDs kept changing, so matching was rebuilt around the libraries.",
      },
    ],
    watchFor:
      "Click \"Scan this form locally\" and watch exact fields fill (solid), ambiguous dropdowns pause for you (dashed), open prompts stay blank (3px solid), and Submit stay locked for a human.",
    tryLinks: [{ href: "/lab?demo=autofill#lab-sm-title", label: "Inspect Autofill in /lab →" }],
    built: {
      body: [
        "Two surfaces work from one resume, kept on the device. The Chrome extension scans a form, previews what it will fill, fills it, and reports the result on a summary card and in a side panel. The Android app adds a fill browser, an application tracker and the resume keyboard.",
        "Claude Code wrote the code; the problem, the rules and the acceptance were mine. The extension core came first, from 4 November 2026, then fixes from what real Feishu, Moka and Beisen forms showed. The Android app followed from 16 November, and from 17 to 19 November came preview before fill, multi-step forms and resume variants.",
      ],
      tested: [
        "Screenshot tests: 6 of 6 passed on 20 November 2026 in light and dark, on synthetic test forms with the extension's built-in sample resume.",
        "Synthetic test forms built on native HTML, Ant Design, Element Plus, react-select and ARIA widgets: the README records every field filled correctly. These are the repository's own forms, not real sites.",
        "A unit test fails if the keyboard's code refers to a network class.",
        "Own use: I have used it on my own applications. There is no measured accuracy on real forms.",
      ],
      states: [
        {
          state: "Normal",
          what: "A supported page is scanned with a resume loaded; the summary card and side panel count Filled, Review and Not filled, with a reason per field.",
          recovery: "No network request leaves the extension; the content security policy keeps it local.",
        },
        {
          state: "Empty",
          what: "No resume imported yet, or no form controls on the page: the side panel says so instead of doing nothing.",
          recovery: "The built-in sample resume allows a dry run on synthetic forms with no personal data.",
        },
        {
          state: "Offline",
          what: "The device is offline: scanning, matching and keyboard typing carry on the same.",
          recovery: "There is no server, so offline behaves exactly like online.",
        },
        {
          state: "Error",
          what: "Obfuscated widgets, Shadow DOM or a WeChat-login-only page: unmapped inputs go to Not filled with a reason.",
          recovery: "Unknown fields stay untouched, so nothing the applicant typed is overwritten.",
        },
        {
          state: "Refused",
          what: "An open-ended essay, a low-confidence dropdown, or a final Submit button.",
          recovery: "Even with multi-page fill on, the final submission stays with the applicant.",
        },
      ],
    },
    outcome: {
      body: [
        "A local-first autofill as a Chrome extension and an Android app with a resume keyboard, covering international ATS platforms and Chinese campus-recruitment sites, used on my own applications. Evidence status: there is no measured fill accuracy on real sites, and no one but me is on record as using it.",
        "For a tool that acts in someone's name, this case is mostly about what it refuses to do, and about making each refusal visible.",
      ],
      limits: [
        {
          title: "No one but me is on record as using it, and there has been no user testing.",
          body: "Whether other applicants trust the review outlines enough to check them is untested.",
        },
        {
          title: "There is no measured fill accuracy on real sites; the 100% figure is on synthetic test forms.",
          body: "Real forms are where a wrong fill costs something.",
        },
        {
          title: "It is not on the Chrome Web Store or Google Play, there is no iOS app, and sites that only allow WeChat login are out of reach.",
          body: "Each limits who could use it today.",
        },
        {
          title: "The code was written by Claude Code.",
          body: "The case is about the rules the tool follows and how they were checked, not hand-written code.",
        },
      ],
      next:
        "Log fill results on a fixed set of real application pages and publish the table, then watch three or four graduates use it on one real application each.",
    },
  },
  zh: {
    problem:
      "投应届岗位，意味着同一份简历要在 Workday、Greenhouse、北森、Moka 这些系统里一格一格重填。自动填表工具要值得用，前提是不填错、不替人提交、也不把简历发到任何地方。",
    roleLine:
      "独立完成：问题定义、工具要守的规则、审查，以及在自己的申请上测试由我负责。代码由 Claude Code 编写。",
    result: "一个本地优先的自动填表工具，覆盖海外 ATS 平台和国内校招网站，我自己投递时用过。",
    problemBody: [
      "投应届岗位时，同一份简历要在 Workday、Greenhouse、北森、Moka 这些系统里一格一格重填。这是起点。",
      "做的过程中，隐私成了最主要的设计约束。一个以你的名义填表的工具，要让人放心：不会填错，不会替你提交，也不会把简历发到任何地方。激进型填表工具会把低把握猜测静默写入关键字段，代价由求职者承担。",
      "工具为我自己而做，我也是唯一有记录的使用者。",
    ],
    decisions: [
      {
        id: "decision-three-tiers",
        title: "拿不准就留空，绝不替人猜",
        conflict:
          "在 Workday、北森、Moka 之间重复抄写同一份简历极其消耗心力。可是有的工具为了显得「全自动」，会硬猜签证身份、期望薪资或开放问答题。一旦猜错，后果全由求职者承担。",
        chosen:
          "确定的 1:1 字段直接填入，标实线；歧义下拉暂停待核，标虚线；工具没填的栏位标 3px 粗实线。开放题一律留空。每一档同时配线型、文字标签、图标和侧栏里的原因说明。",
        gaveUp:
          "接入云端大模型补全所有空格和开放题。这样会在签证这类不可容错的字段上编出「看起来很像」的答案，还让简历离开本地设备。只用颜色高亮：色觉障碍用户难以分辨，也说不清为什么没填这一格。开放问答仍需求职者亲自填写。",
        evidence: "截图测试里，摘要卡显示已填 45、待确认 1、未填 1，每种状态都有文字，不只靠颜色。",
      },
      {
        id: "decision-human-submit-local",
        title: "下一步可以代点，最后一下归我",
        conflict:
          "多步网申经常把最终「提交」放在上一页「下一步」的同一位置。使用者担心工具翻页时顺手把半成品投了出去。",
        chosen:
          "多页表单里，工具点「下一步」逐页填写，到最终提交前停下，侧栏上明文告知。Chrome 扩展用严格的内容安全策略断绝外网请求；Android 用设备 Keystore 里的密钥加密简历。",
        gaveUp:
          "一键全链路自动投递：剥夺申请人的终审权，任何控件适配偏差都会变成无法撤回的错误投递。Chrome 与 Android 之间的云端账号同步：引入服务端存储与泄露风险。代价是每份申请本人都要多点一下，第二台设备要重新设置。",
        evidence: "侧栏上直接写着：工具只点「下一步」，最终提交留给你。",
      },
      {
        id: "decision-adapters-keyboard",
        title: "认控件，不认网站",
        conflict:
          "按每家公司站点硬写 CSS 选择器，官网一改版就失效。国内大批校招只开放微信小程序，桌面浏览器扩展根本进不去。",
        chosen:
          "引擎按控件类型来填：原生 HTML、Ant Design、Element Plus、react-select 和 ARIA 组件。在此之上有 Greenhouse、Lever、Workable、Workday 的适配，也有北森、Moka、飞书的适配。浏览器到不了的地方，由没有网络权限的 Android 简历键盘把内容打进去。",
        gaveUp:
          "为每家企业招聘页单独维护一套 DOM 脚本：页面 ID 一变就失效。申请 Android 无障碍权限去自动点击封闭应用：全屏读取的暴露面太大。简历键盘暂不附带中文拼音输入法，深度魔改的非标控件仍要退回给本人处理。",
        evidence: "真实的飞书、Moka 与北森表单底层用的是同一批组件库，DOM ID 却一直在变。匹配逻辑因此改为按组件库来做。",
      },
    ],
    watchFor:
      "点击「一键本地扫描」，看确定字段直填（实线），歧义下拉标出待确认（虚线）。开放题刻意留空（粗实线），提交按钮始终由人手掌控。",
    tryLinks: [{ href: "/lab?demo=autofill#lab-sm-title", label: "前往 /lab 走查 Autofill 状态机 →" }],
    built: {
      body: [
        "两个端用的是同一份简历，都留在设备上。Chrome 扩展扫描表单，先预览要填的内容，再填写，结果报告在摘要卡和侧栏上。Android App 带填表浏览器、申请追踪和简历键盘。",
        "代码由 Claude Code 编写；问题、规则和验收是我定的。2026 年 11 月 4 日先做扩展核心，随后按真实飞书、Moka、北森表单暴露的问题修正。11 月 16 日起做 Android App；17 到 19 日又加入填写前预览、多步表单和简历变体。",
      ],
      tested: [
        "截图测试：2026 年 11 月 20 日，亮色与暗色 6 / 6 通过。用的是合成测试表单和扩展内置的示例简历。",
        "用原生 HTML、Ant Design、Element Plus、react-select 和 ARIA 组件搭的测试表单：README 记录栏位全部填对。那是仓库自己的测试表单，不是真实网站。",
        "键盘代码一旦引用网络类，就有单元测试失败。",
        "自己使用：我在自己的申请上用过。在真实表单上的准确率没有量过。",
      ],
      states: [
        {
          state: "正常",
          what: "已加载简历，在可识别的表单页完成扫描；摘要卡与侧栏列出已填、待确认、未填数量和逐栏依据。",
          recovery: "全程没有网络外传请求，由严格的内容安全策略保障。",
        },
        {
          state: "空状态",
          what: "还没导入简历，或页面上没有可填控件：侧栏明确提示，绝不静默无响应。",
          recovery: "内置示例简历可以在合成表单上试跑，不涉及个人数据。",
        },
        {
          state: "离线",
          what: "设备断网：控件扫描、三档分流与键盘输入照常可用。",
          recovery: "系统本身没有服务器，离线与在线行为完全一样。",
        },
        {
          state: "错误",
          what: "非标魔改组件、强隔离节点或仅限微信登录的页面：无法安全填入的栏位归入「未填」并写明原因。",
          recovery: "认不出的字段保持原样，不会覆盖本人已写好的内容。",
        },
        {
          state: "拒绝",
          what: "开放问答题、低把握的歧义下拉框，或最终「提交」按钮。",
          recovery: "即便开启多步翻页填充，最终投递永远归申请人。",
        },
      ],
    },
    outcome: {
      body: [
        "一个本地优先的自动填表工具，做成 Chrome 扩展和带简历键盘的 Android App。工具覆盖海外 ATS 平台和国内校招网站，我在真实申请上用过。证据状态：没有在真实网站上量过填写准确率，有记录的使用者只有我。",
        "对一个以别人名义行事的工具，这个案例讲的主要是工具拒绝做什么，以及怎样让每一条拒绝都看得见。",
      ],
      limits: [
        {
          title: "有记录的使用者只有我，也没有做过用户测试。",
          body: "其他申请人是否信任待确认标记、会不会真的去核对，没有测过。",
        },
        {
          title: "没有在真实网站上量过填写准确率；100% 那个数字来自合成测试表单。",
          body: "填错真正要付出代价的地方，正是真实表单。",
        },
        {
          title: "没有上架 Chrome 网上应用店或 Google Play，也没有 iOS App，只允许微信登录的网站也用不了。",
          body: "每一条都限制了现在谁能用这个工具。",
        },
        {
          title: "代码由 Claude Code 编写。",
          body: "这个案例讲的是工具要守的规则和怎么核对，不是手写代码。",
        },
      ],
      next: "先定好发布方式，再固定一组真实申请页面，记录填写结果并公开表格。然后请三四位应届生各完成一份真实申请，在旁观察。",
    },
  },
};
