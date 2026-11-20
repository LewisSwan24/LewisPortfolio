/**
 * Resume Autofill, added 2026-11-20.
 *
 * Sources: the public repository `resume-autofill` (README, commit subjects to
 * 95f0583), screenshots from its own `pnpm visual` run on 2026-11-20 (6/6, the
 * extension's synthetic sample resume, 林知远), and two rounds of Lewis's
 * answers on 2026-11-20. Those were picked options, not his sentences:
 * - why: both, his own pain re-filling one resume in system after system, and
 *   privacy as the main design constraint while building it;
 * - his decisions: leave a field empty and outline it yellow when unsure, stop
 *   before the final submit, keep the data on the device;
 * - code: mainly Claude Code;
 * - use: he has used it on real applications;
 * - where README and commits disagree, the commits are current (preview before
 *   fill, resume variants and the rest landed 17-19 November).
 *
 * Must not claim: other users, store listings, accuracy on real sites (the
 * README's 100% is on synthetic test forms), the 90% phone threshold as a
 * result, or an iOS app.
 */
import type {
  CaseDepth,
  CaseInterviewPack,
  CaseInterviewPrompt,
  CaseInterviewScan,
  CaseSummary,
  ProofLocale,
} from "./types";

export const autofillSummary: Record<ProofLocale, { autofill: CaseSummary }> = {
  en: {
    autofill: {
      challenge:
        "Applying for graduate jobs means typing the same resume into Workday, Greenhouse, Beisen, Moka and the rest, one field at a time. A tool that fills them for you is only worth using if it never fills a field wrongly, never submits for you, and never sends your resume anywhere.",
      role: "Solo: the problem, the rules the tool follows, review and testing on real applications. Claude Code wrote the code",
      methods: ["rules for uncertainty", "human-in-the-loop submission", "local-first privacy design", "form-library adapters", "screenshot-based visual review"],
      evidence: [
        "a Chrome extension and an Android app with a resume keyboard, built since 4 November 2026",
        "uncertain fields are left empty and outlined for review; a multi-page form is advanced with Next but the final submit stays with the person",
        "no network calls from the extension; on Android the resume is encrypted with a device-bound key",
      ],
      outcome:
        "A local-first autofill tool covering international ATS platforms and Chinese campus-recruitment sites, which I have used on my own applications.",
      next: "Measure fill accuracy on real application sites rather than test forms, and have other graduates try it on their own applications.",
    },
  },
  zh: {
    autofill: {
      challenge: "投应届岗位，意味着同一份简历要在 Workday、Greenhouse、北森、Moka 这些系统里一格一格重填。自动填表工具要值得用，前提是不填错、不替人提交、也不把简历发到任何地方。",
      role: "独立完成：问题定义、工具要守的规则、审查，以及在真实申请上测试由我负责；代码由 Claude Code 编写",
      methods: ["处理不确定的规则", "人在回路的提交", "本地优先的隐私设计", "表单组件库适配", "基于截图的视觉审查"],
      evidence: [
        "一个 Chrome 扩展，和一个带简历键盘的 Android App，2026 年 11 月 4 日起开始做",
        "拿不准的栏位留空并标出待确认；多页表单会自动点「下一步」，最后的提交留给本人",
        "扩展不发出任何网络请求；在 Android 上，简历用绑定设备的密钥加密",
      ],
      outcome: "一个本地优先的自动填表工具，覆盖海外 ATS 平台和国内校招网站，我自己投递时用过。",
      next: "在真实的申请网站上量填写准确率，而不只是在测试表单上；再请其他应届生用在自己的申请里。",
    },
  },
};

export const autofillDepth: Record<ProofLocale, { autofill: CaseDepth }> = {
  en: {
    autofill: {
      decisions: [
        {
          label: "Never guess",
          choice: "A field the tool is unsure about stays empty and is outlined for the person to confirm.",
          evidence: "Lewis picked this as his own decision. The README states it; the fill report lists 'needs review' and 'not filled' apart from 'filled'.",
          tradeoff: "More fields are left for the person than a tool that guesses would leave.",
          impact: "A wrong answer is never silently submitted in someone's name.",
        },
        {
          label: "The final submit stays with you",
          choice: "On a multi-page application the tool presses Next and stops before the final submit.",
          evidence: "Lewis picked this as his own decision. The side panel says it on screen: it only presses Next, and the final submit stays with you.",
          tradeoff: "One more click for the person on every application.",
          impact: "Nothing is sent to an employer without the person seeing it first.",
        },
        {
          label: "The resume stays on the device",
          choice: "No server, no analytics. The extension keeps data in local browser storage behind a strict content security policy; Android encrypts it with a key held in the Android Keystore.",
          evidence: "Lewis picked this as his own decision. The README documents the policy; a unit test fails if the keyboard's code refers to a network class.",
          tradeoff: "No sync through a server, so a second device needs its own setup.",
          impact: "Using the tool does not mean handing a resume to another service.",
        },
      ],
      evidence: [
        {
          method: "Visual capture",
          sample: "The repository's own screenshot run, 6 of 6 passing on 20 November 2026, light and dark",
          question: "What does a person see after a fill?",
          finding: "A summary card counts filled, needs-review and not-filled fields, and the side panel lists each one with its reason.",
          implication: "The states a person must act on are visible; whether people read them correctly is not tested.",
        },
        {
          method: "Synthetic test forms",
          sample: "Fixture forms built on native HTML, Ant Design, Element Plus, react-select and ARIA widgets",
          question: "Does the engine fill each kind of control?",
          finding: "The README records every field on the synthetic test forms filled correctly.",
          implication: "That is the repository's own test forms, not real application sites.",
        },
        {
          method: "Own use",
          sample: "Lewis's own job applications",
          question: "Does it work on real applications?",
          finding: "He has used it on real applications. No one else's use is on record.",
          implication: "It runs on real forms; there is no measured accuracy on them.",
        },
      ],
      iterations: [
        {
          version: "Extension core, 4-6 November",
          change: "A resume schema, bilingual dictionaries, a fill engine and drivers, then fixes from what real Feishu, Moka and Beisen forms showed.",
          reason: "From the commit subjects; the forms behaved differently from the test fixtures.",
          improvement: "Drivers for the Chinese campus-recruitment sites.",
        },
        {
          version: "Phone and preview, 16-19 November",
          change: "An Android app with a fill browser, an application tracker and a resume keyboard; then preview before fill, multi-step forms and resume variants.",
          reason: "From the commit subjects; the keyboard covers places a browser cannot reach, such as WeChat mini programs.",
          improvement: "The same resume reaches phone forms, with a look before anything is filled.",
        },
      ],
      limits: [
        {
          constraint: "No one but Lewis is on record as using it, and there has been no user testing.",
          whyItMatters: "Whether other applicants trust the review outlines enough to check them is untested.",
          nextValidation: "Watch three or four graduates use it on one real application each.",
        },
        {
          constraint: "There is no measured fill accuracy on real sites; the 100% figure is on synthetic test forms.",
          whyItMatters: "Real forms are where a wrong fill costs something.",
          nextValidation: "Log fill results on a fixed set of real application pages and publish the table.",
        },
        {
          constraint: "It is not published on the Chrome Web Store or Google Play, and there is no iOS app. The keyboard has no Chinese input method, and sites that only allow WeChat login are out of reach.",
          whyItMatters: "Each limits who could use it today.",
          nextValidation: "Decide on distribution before asking anyone outside to try it.",
        },
        {
          constraint: "The code was written by Claude Code.",
          whyItMatters: "The case is about the rules the tool follows and how they were checked, not hand-written code.",
          nextValidation: "Keep the authorship line wherever the tool is shown.",
        },
      ],
      takeaway:
        "For a tool that acts in someone's name, the design is mostly what it refuses to do: guess, submit, or send data away. Each refusal shows on screen, so the person can see what is left to them.",
    },
  },
  zh: {
    autofill: {
      decisions: [
        {
          label: "绝不猜",
          choice: "工具拿不准的栏位留空，并标出来等本人确认。",
          evidence: "这是 Lewis 自己选定的决定。README 写明了这一条；填写报告把「待确认」「未填」和「已填」分开列。",
          tradeoff: "留给本人处理的栏位，比一个会猜的工具更多。",
          impact: "错误的答案不会悄悄以本人的名义交出去。",
        },
        {
          label: "最后的提交留给你",
          choice: "多页申请里，工具会点「下一步」，在最终提交前停下。",
          evidence: "这是 Lewis 自己选定的决定。侧栏上直接写着：它只点「下一步」，最终提交留给你。",
          tradeoff: "每份申请本人都要多点一下。",
          impact: "没有任何东西会在本人看过之前发给雇主。",
        },
        {
          label: "简历不离开设备",
          choice: "不用服务器，不做统计。扩展把数据放在本地浏览器存储里，并用严格的内容安全策略；Android 用 Android Keystore 里的密钥加密。",
          evidence: "这是 Lewis 自己选定的决定。README 记录了这套策略；键盘代码一旦引用网络类，就有单元测试失败。",
          tradeoff: "没有经服务器的同步，第二台设备要重新设置。",
          impact: "用这个工具，不等于把简历交给另一个服务。",
        },
      ],
      evidence: [
        {
          method: "视觉截图",
          sample: "仓库自带的截图测试，2026 年 11 月 20 日 6 / 6 通过，含亮色与暗色",
          question: "填完之后，本人看到的是什么？",
          finding: "摘要卡统计已填、待确认、未填的栏位数，侧栏逐个列出每一栏和原因。",
          implication: "需要本人处理的状态看得见；人们会不会正确理解，没有测过。",
        },
        {
          method: "合成测试表单",
          sample: "用原生 HTML、Ant Design、Element Plus、react-select 和 ARIA 组件搭的测试表单",
          question: "引擎能不能填好每一种控件？",
          finding: "README 记录合成测试表单上的栏位全部填对。",
          implication: "这是仓库自己的测试表单，不是真实的申请网站。",
        },
        {
          method: "自己使用",
          sample: "Lewis 自己的求职申请",
          question: "在真实申请上能用吗？",
          finding: "他在真实申请上用过。没有其他人使用的记录。",
          implication: "工具能在真实表单上跑；在真实表单上的准确率没有量过。",
        },
      ],
      iterations: [
        {
          version: "扩展核心，11 月 4 至 6 日",
          change: "简历结构、双语词典、填写引擎和驱动；随后按真实飞书、Moka、北森表单暴露的问题修正。",
          reason: "出自提交标题：真实表单的行为和测试夹具不同。",
          improvement: "有了国内校招网站的驱动。",
        },
        {
          version: "手机与预览，11 月 16 至 19 日",
          change: "Android App，带填表浏览器、申请追踪和简历键盘；之后加入填写前预览、多步表单和简历变体。",
          reason: "出自提交标题；键盘用来覆盖浏览器到不了的地方，例如微信小程序。",
          improvement: "同一份简历能用到手机表单上，填写前还能先看一遍。",
        },
      ],
      limits: [
        {
          constraint: "有记录的使用者只有 Lewis 本人，也没有做过用户测试。",
          whyItMatters: "其他申请人是否信任待确认标记、会不会真的去核对，没有测过。",
          nextValidation: "请三四位应届生各用它完成一份真实申请，在旁观察。",
        },
        {
          constraint: "没有在真实网站上量过填写准确率；100% 那个数字来自合成测试表单。",
          whyItMatters: "填错真正要付出代价的地方，正是真实表单。",
          nextValidation: "固定一组真实申请页面，记录填写结果并公开表格。",
        },
        {
          constraint: "没有上架 Chrome 网上应用店或 Google Play，也没有 iOS App。键盘没有中文输入法，只允许微信登录的网站也用不了。",
          whyItMatters: "每一条都限制了现在谁能用它。",
          nextValidation: "请外人试用之前，先定好发布方式。",
        },
        {
          constraint: "代码由 Claude Code 编写。",
          whyItMatters: "这个案例讲的是工具要守的规则和怎么核对，不是手写代码。",
          nextValidation: "在任何展示这个工具的地方都保留分工说明。",
        },
      ],
      takeaway: "一个以别人名义行事的工具，设计主要在于它拒绝做什么：不猜、不提交、不把数据送走。每一条拒绝都显示在屏幕上，本人看得到还剩哪些事归自己。",
    },
  },
};

export const autofillScan: Record<ProofLocale, { autofill: CaseInterviewScan }> = {
  en: {
    autofill: {
      proves: "This case shows I can set the rules for a tool that acts in someone's name, and make every rule visible to the person using it.",
      inspect: ["How an unsure field is shown instead of guessed.", "Where the tool stops on a multi-page form.", "What the case says about accuracy on real sites."],
      questions: ["Why leave a field empty instead of making a best guess?", "How do you know the resume never leaves the device?"],
      bestFit: ["Teams building assistive or automation tools that act on a user's behalf.", "Products where privacy is a design constraint, not a settings page."],
    },
  },
  zh: {
    autofill: {
      proves: "这个案例说明我能为一个以别人名义行事的工具定规则，并让每一条规则都被使用者看得见。",
      inspect: ["拿不准的栏位怎么呈现，而不是被猜着填上。", "多页表单里工具停在哪里。", "案例对真实网站上的准确率怎么说。"],
      questions: ["为什么宁可留空，也不填一个最可能的答案？", "你怎么知道简历从没离开设备？"],
      bestFit: ["做代替用户行事的辅助或自动化工具的团队。", "把隐私当成设计约束、而不只是设置页的产品。"],
    },
  },
};

export const autofillPrompts: { autofill: CaseInterviewPrompt[] } = {
  autofill: [
    {
      question: "Why does the tool leave a field empty when it is unsure?",
      reason: "Tests whether the refusal is a design rule with a visible state.",
      anchorId: "decision-timeline",
    },
    {
      question: "What did the test forms prove, and what did they not?",
      reason: "Separates synthetic accuracy from real-site behaviour.",
      anchorId: "evidence-board",
    },
    {
      question: "Only you have used it. What does the case claim?",
      reason: "Keeps personal use apart from evidence that others trust it.",
      anchorId: "outcome-limits",
    },
  ],
};

export const autofillPack: Record<ProofLocale, { autofill: CaseInterviewPack }> = {
  en: {
    autofill: {
      answers: [
        {
          id: "autofill-never-guess",
          question: "Why leave a field empty instead of making a best guess?",
          answer:
            "The rule I set is simple: when the tool is unsure, the field stays empty and is outlined for review, and the fill report counts filled, needs-review and not-filled fields separately, so the person sees exactly what is left to them.",
          evidenceHref: "/projects/autofill#decision-timeline",
          boundary: "Whether other people actually check the outlined fields is untested.",
        },
        {
          id: "autofill-submit",
          question: "Where does the tool stop?",
          answer:
            "Before the final submit. On a multi-page application it presses Next and fills each page, and the side panel says on screen that the final submit stays with you.",
          evidenceHref: "/projects/autofill#decision-timeline",
          boundary: "It costs one click per application, which I chose to keep.",
        },
        {
          id: "autofill-privacy",
          question: "How do you know the resume never leaves the device?",
          answer:
            "The extension runs under a strict content security policy with no network calls, and keeps data in local storage. On Android the resume is encrypted with a key held in the Keystore, and a unit test fails if the keyboard's code refers to a network class.",
          evidenceHref: "/projects/autofill#evidence-board",
          boundary: "That is what the code and tests enforce; there has been no outside security review.",
        },
      ],
      managerFollowUp: {
        id: "autofill-manager-follow-up",
        question: "You built it for yourself. What does it show about working on a team's product?",
        answer:
          "That I start from a real problem, mine in this case, and turn the risky parts into rules a person can see on screen. I have used it on real applications; I have not measured its accuracy on real sites, and the case says so.",
        evidenceHref: "/projects/autofill#outcome-limits",
        boundary: "One user's experience is not evidence that others would trust it.",
      },
    },
  },
  zh: {
    autofill: {
      answers: [
        {
          id: "autofill-never-guess",
          question: "为什么宁可留空，也不填一个最可能的答案？",
          answer: "我定的规则很简单：工具拿不准时，栏位留空并标出待确认。填写报告把已填、待确认、未填分开计数，本人能清楚看到还剩哪些归自己。",
          evidenceHref: "/projects/autofill#decision-timeline",
          boundary: "其他人会不会真的去核对标出来的栏位，没有测过。",
        },
        {
          id: "autofill-submit",
          question: "工具停在哪里？",
          answer: "停在最终提交之前。多页申请里，它会点「下一步」逐页填写，侧栏上直接写着最终提交留给你。",
          evidenceHref: "/projects/autofill#decision-timeline",
          boundary: "每份申请要多点一下，这是我选择保留的代价。",
        },
        {
          id: "autofill-privacy",
          question: "你怎么知道简历从没离开设备？",
          answer: "扩展在严格的内容安全策略下运行，不发出网络请求，数据存在本地。Android 上简历用 Keystore 里的密钥加密；键盘代码一旦引用网络类，就有单元测试失败。",
          evidenceHref: "/projects/autofill#evidence-board",
          boundary: "这是代码和测试强制的；没有做过外部安全审查。",
        },
      ],
      managerFollowUp: {
        id: "autofill-manager-follow-up",
        question: "这是你给自己做的，对在团队里做产品能说明什么？",
        answer: "说明我从真实问题出发，这次是我自己的问题，并把有风险的部分变成本人在屏幕上看得见的规则。我在真实申请上用过；没有在真实网站上量过准确率，案例里也照实写了。",
        evidenceHref: "/projects/autofill#outcome-limits",
        boundary: "一个人的使用经验，证明不了别人也会信任它。",
      },
    },
  },
};
