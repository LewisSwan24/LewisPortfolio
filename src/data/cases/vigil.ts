import type { CaseRecord } from "@/lib/cases/schema";

export const vigilCase: CaseRecord = {
  "slug": "vigil",
  "status": "unlisted",
  "roleTracks": [
    "ai-ux",
    "interaction"
  ],
  "workSummary": {
    "tags": ["ai"],
    "year": "2026",
    "dur": "Abandoned (unlisted)",
    "problem": {
      "en": "Over-trusting classifier confidence scores on ambiguous phishing emails",
      "zh": "面对真假难辨的钓鱼邮件时，使用者容易过度信赖分类器的单值置信度"
    },
    "changed": {
      "en": "Six-variant experimental review desk (archived abandoned, excluded from public resume and nav)",
      "zh": "六变体对照复核原型（已停止投入并转入未公开归档，全站导航与简历不列出）"
    }
  },
  "reviewMeta": {
    "reviewedAt": "2026-11-21",
    "nextReviewAt": "2027-02-21",
    "auditNote": "Confirmed unlisted/abandoned status (2026-09-27) and noindex/no-resume invariant for V3.1 baseline."
  },
  "links": [],
  "media": {
    "label": "The variants under test",
    "labelZh": "正在测试的变体",
    "blurb": "Screens generated from the running prototype by a script, so each image is a pure function of its URL and can be regenerated after any change.",
    "blurbZh": "这些截图由脚本从跑起来的原型直接生成：每张图都是 URL 的纯函数，任何改动之后都可以重新生成一遍。",
    "images": [
      {
        "src": "/projects/vigil/02-review-q1percent-q3inline.png",
        "width": 1440,
        "height": 900,
        "alt": "The review screen showing a precise confidence figure and cue spans highlighted inline in the message",
        "altZh": "复核界面：显示精确置信度数值，线索直接在邮件正文里高亮",
        "caption": "Q1 percent + Q3 inline. The evidence is marked where it sits.",
        "captionZh": "Q1 精确百分比 + Q3 内文高亮。证据出现在哪，就标在哪。"
      },
      {
        "src": "/projects/vigil/03-review-q1band-q3list.png",
        "width": 1440,
        "height": 900,
        "alt": "The same message with a coarse confidence band and the cues collected in a side list instead of highlighted",
        "altZh": "同一封邮件：置信度改为粗略分档，线索集中在侧栏列表而非正文高亮",
        "caption": "Q1 band + Q3 list. Same message, same cues, nothing marked until asked.",
        "captionZh": "Q1 分档 + Q3 侧栏列表。同一封信、同样的线索，不问就不标。"
      },
      {
        "src": "/projects/vigil/05-gate-disagree.png",
        "width": 1440,
        "height": 900,
        "alt": "The gate variant after the reviewer has committed, with the classifier disagreeing and the panel reading 'One of you is wrong'",
        "altZh": "Q2 先判后揭的变体：使用者判断之后，分类器给出相反结论，面板写着「One of you is wrong」",
        "caption": "The hardest message in the set: every authentication check passes, the classifier reports no indicators, and it is impersonation.",
        "captionZh": "整组里最难的一封：每一项认证检查都通过，分类器报告零线索，这封信其实是冒用身分。"
      },
      {
        "src": "/projects/vigil/06-summary.png",
        "width": 1440,
        "height": 900,
        "alt": "The summary screen with a two-by-two table of whether the reviewer took the classifier's word against whether it was right",
        "altZh": "总结页：一张 2×2 表格，交叉呈现「是否采信分类器」与「分类器是否正确」",
        "caption": "The payoff screen. Bottom right — caught the classifier's mistake — is the cell the interface exists to grow.",
        "captionZh": "收益页。右下角「抓到了分类器的错误」，正是这个界面存在的意义。"
      }
    ]
  },
  "demo": {
    "src": "/projects/vigil/prototype.html",
    "poster": "/projects/vigil/02-review-q1percent-q3inline.png",
    "title": "Vigil interactive prototype",
    "titleZh": "Vigil 互动原型",
    "posterAlt": "The Vigil review screen; click to open the interactive prototype",
    "posterAltZh": "Vigil 的复核界面，点击打开互动原型",
    "label": "Flip the variants yourself",
    "labelZh": "自己切切看六个变体",
    "blurb": "The six variants under evaluation, in one self-contained file. Press the gear at the bottom left, or the backtick key, to switch how confidence is shown, when the verdict appears, and where the evidence sits. Worth watching what changes in your own reading when the number becomes a band.",
    "blurbZh": "正在评估的六个变体，全部在这一个独立文件里。按左下角的齿轮或反引号键，就能切换置信度怎么显示、判定什么时候出现、证据摆在哪。可以留意一下：当那个数字变成一个档位，你自己的读法会怎么变。",
    "action": "Load the interactive prototype",
    "actionZh": "载入互动原型"
  },
  "card": {
    "en": {
      "kicker": "Flagship · Human oversight of AI",
      "title": "Vigil",
      "sub": "A review desk for deciding when to trust a classifier that is wrong 12% of the time.",
      "role": "Design + direction",
      "date": "2026 · abandoned",
      "m1": "140 messages · 87.9% accurate",
      "m2": "Confidence built as weak evidence",
      "m3": "Six variants, three open questions"
    },
    "zh": {
      "kicker": "旗舰 · 人对 AI 的监督",
      "title": "Vigil",
      "sub": "一张邮件复核台：决定什么时候该相信一个有 12% 会判错的分类器。",
      "role": "设计与方向",
      "date": "2026 · 已放弃",
      "m1": "140 封邮件 · 准确率 87.9%",
      "m2": "把置信度做成弱证据",
      "m3": "六个变体，三个还没答案的问题"
    }
  },
  "narrative": {
    "en": {
      "hero": {
        "title": "Vigil",
        "sub": "An email review desk built to find out whether an interface can keep someone checking an AI that is wrong 12% of the time."
      },
      "roleVal": "Designer and technical director; Claude Code and Codex wrote the code to my spec",
      "timeVal": "2026 · abandoned 23 Sep 2026; evaluation protocol written, study never run",
      "teamVal": "Solo, working through an AI coding workflow; brief sourced from a UQ research lab",
      "toolsVal": "React · TypeScript · Zustand · Dexie · Python · Claude Code · Codex",
      "ch": {
        "label": "The problem",
        "title": "Oversight is the easiest thing in the world to fake.",
        "p": "The brief was to design interfaces that help a person oversee an AI screening email for phishing. The trap is in that sentence. Give someone a queue, a verdict and a confidence score, and they will clear it — quickly, agreeably, and without reading much. Throughput looks fine. The interface looks like it worked. What actually has to be designed is not a review screen but the conditions under which reviewing happens at all, and those conditions live in details as small as whether a number is rendered as 0.91 or as HIGH."
      },
      "re": {
        "label": "Groundwork",
        "title": "Before designing the interface, I had to build something worth reviewing.",
        "m1": {
          "t": "The material",
          "b": "Public phishing corpora are 2002–2015 mail, carry real personal data, and cannot guarantee the character offsets that cue highlighting needs. I wrote 140 messages inside a fictional company instead."
        },
        "m2": {
          "t": "A fallible AI",
          "b": "No model — a scripted classifier at 87.9%, with its 17 errors placed deliberately: false positives cluster in marketing mail, false negatives in social-engineering messages that carry no links to flag."
        },
        "m3": {
          "t": "The leak I nearly shipped",
          "b": "In the first build every correct call sat at 0.84 or above and every error at 0.82 or below. A reviewer could have caught all seventeen errors by reading a number instead of an email."
        },
        "quote": "One of you is wrong.",
        "quoteWho": "The classifier panel, when your call and its call disagree"
      },
      "sy": {
        "label": "System concept",
        "title": "Useful and unreliable at the same time — and provably so.",
        "p": "Everything hangs on one property: the classifier has to be genuinely helpful and genuinely untrustworthy at once. Confidence is stratified so it ranks the classifier's own errors barely better than chance — an AUC of 0.72 — and the build script refuses to write the corpus if that ever climbs past 0.75. Seven errors carry high confidence; thirty-six correct calls carry low confidence. Someone reading only the number cannot shortcut to the answer, which is the single condition under which comparing two interfaces measures anything at all."
      },
      "id": {
        "label": "Design decisions",
        "p": "Three questions, six variants, all switchable at runtime. How confidence is shown: a precise figure, or a three-step band. When the verdict appears: on open, or only after the reviewer commits to their own call. How evidence is presented: highlighted in the message, or listed beside it. Each variant carries a written argument and a written risk, and my predicted winner for each is on record, dated before I flipped a single one. The interface also refuses things a real security console has — no search, no batch actions, no severity tiers, no reassuring green anywhere. Every one of them would help an operator and blur the measurement."
      },
      "pr": {
        "label": "How it got built",
        "p": "I did not write the code. Claude Code and Codex built the corpus pipeline, the single-file prototype and the React implementation from a frozen spec, and they were fast — six variants exist because building the sixth cost hours instead of weeks. What did not delegate was the judgement. The first visual pass came back competent and generic: white cards on grey, a safe blue accent, six letterspaced labels on one screen. It looked like software rather than like a decision, and rejecting it is where the interface actually started. The same applies to a generated explanation that described cues the email did not contain — the tooling produced it fluently, and only reading the output against its own data caught it."
      },
      "te": {
        "label": "Testing and iteration",
        "p": "Not yet run with people, and this case says so plainly. The protocol is written: fifteen minutes each, five participants on a rotating variant assignment so every variant gets watched at least twice, with the observation list drawn from the three open questions rather than from a generic script. What holds the build together in the meantime is machine checking — 176 assertions across all eight variant combinations, 101 unit tests over the same decision and scoring rules in the React build, and a palette whose text contrast is measured with a script rather than eyeballed — one token failed at 4.41 and was reworked before it shipped."
      },
      "ou": {
        "label": "What it produced",
        "m1": {
          "label": "confidence as a predictor of the AI's errors",
          "v": "0.72 AUC"
        },
        "m2": {
          "label": "Corpus",
          "v": "140 messages → 87.9% accurate"
        },
        "m3": {
          "label": "Variants built",
          "v": "3 questions → 6 interfaces"
        },
        "p": "A running system with the study still ahead of it: a validated corpus, six switchable interfaces, a React build with durable logging and CSV export, and a test protocol ready to run. Evidence status — nobody outside the project has used it. Everything here is design reasoning and machine verification, not user evidence. The three design questions are open, my predictions are recorded, and the gap between those predictions and the result is the next thing this case will contain."
      },
      "rf": {
        "label": "Reflection",
        "p": "What surprised me is where the failure mode of an AI-assisted workflow actually sits. It is not bugs — the code was fine. It is that everything the workflow produces is plausible: a competent visual pass, a fluent explanation for an email, a reasonable-looking spread of confidence values. Plausible is exactly what you cannot catch by reading quickly. The three decisions I am proudest of here are all rejections, and all three came from checking generated output against its own data rather than against my taste. The weakest part is the obvious one: I have designed the conditions for a study worth running, and have not yet run it."
      }
    },
    "zh": {
      "hero": {
        "title": "Vigil",
        "sub": "一张邮件复核台，用来回答一个问题：界面能不能让人持续复核一个有 12% 会判错的 AI。"
      },
      "roleVal": "设计与技术方向由我定；代码由 Claude Code 与 Codex 按规格实现",
      "timeVal": "2026 · 2026-09-23 放弃；评估协议已写完，受试实验从未运行",
      "teamVal": "独立完成，走 AI 辅助开发流程；题目来自 UQ 的一个研究实验室",
      "toolsVal": "React · TypeScript · Zustand · Dexie · Python · Claude Code · Codex",
      "ch": {
        "label": "问题",
        "title": "「监督」是世界上最容易假装的一件事。",
        "p": "题目是为「人如何监督一个筛查钓鱼邮件的 AI」设计界面。陷阱就藏在这句话里：给一个人一条队列、一个判定和一个置信度分数，他会把它清空：又快、又配合，而且没怎么读。吞吐量看起来很正常，界面看起来也像是奏效了。真正要设计的不是一张复核界面，而是「复核真的发生」的条件；而这些条件，落在像「那个数字该写成 0.91 还是 HIGH」这么小的地方。"
      },
      "re": {
        "label": "前期工作",
        "title": "在做界面之前，得先做出一个值得复核的东西。",
        "m1": {
          "t": "材料",
          "b": "公开的钓鱼语料都是 2002–2015 年的邮件，带真实个资，也无法保证线索高亮需要的精确字元偏移。所以 140 封邮件是我在一家虚构公司的设定里自己写的。"
        },
        "m2": {
          "t": "一个会犯错的 AI",
          "b": "不用真模型，一个准确率 87.9% 的脚本化分类器，17 个错误是刻意安排的：误报集中在行销信，漏报集中在那些没有链接可标记的社工邮件。"
        },
        "m3": {
          "t": "差点就发出去的漏题",
          "b": "第一版里，判对的全部在 0.84 以上，判错的全部在 0.82 以下。使用者只要读那个数字、一封邮件都不看，就能抓出全部十七个错误。"
        },
        "quote": "One of you is wrong.",
        "quoteWho": "当你的判断与分类器的判断相反时，面板上的那句话"
      },
      "sy": {
        "label": "系统概念",
        "title": "同时做到「有用」和「不可全信」，而且能被证明。",
        "p": "所有设计都挂在同一个性质上：这个分类器必须既真的帮得上忙，又真的不能全信。置信度经过分层采样，让它对自己错误的排序能力只比瞎猜好一点（AUC 0.72），而且一旦这个数字爬过 0.75，建构脚本就拒绝写出语料。七个错误带着高置信度，三十六个判对的带着低置信度。只读数字的人没有捷径可走，而这正是「比较两个界面」能测到东西的唯一前提。"
      },
      "id": {
        "label": "设计决策",
        "p": "三个问题、六个变体，全部可以在运行时切换。置信度怎么呈现：精确数值，还是三档标签。判定什么时候出现：一打开就显示，还是等使用者先给出自己的判断。证据怎么呈现：在正文里直接高亮，还是集中列在旁边。每个变体都配了写下来的理由和写下来的风险；而我预测哪一个会赢，也都记在案，日期在我翻动第一个变体之前。这个界面还刻意不做真实安全控制台会有的东西：没有搜索、没有批量操作、没有严重度分级、任何地方都没有那种让人安心的绿色。它们每一个都会让操作员更顺手，也都会把要测的东西搅浑。"
      },
      "pr": {
        "label": "它是怎么被做出来的",
        "p": "代码不是我写的。Claude Code 与 Codex 按一份冻结的规格做出了语料管线、单档原型和 React 实现，而且很快，之所以存在六个变体，是因为多做一个的成本是几小时而不是几周。没能交出去的是判断。第一版视觉回来时是「合格但普通」的：灰底白卡片、安全的蓝色、同一屏上六个加了字距的标签。它看起来像一个软件，而不像一个判断：把它否掉，界面才算真正开始。同样的还有那条描述了邮件里根本不存在的线索的自动生成解释：工具生成得非常流畅，只有把输出对回它自己的数据，才抓得出来。"
      },
      "te": {
        "label": "测试与迭代",
        "p": "还没有跟真人跑过，这一点我在案例里直说。脚本已经写好：每人十五分钟、五名参与者按轮替表分配变体，让每个变体至少被观察两次；观察清单是从那三个还没答案的问题倒推出来的，不是通用模板。在那之前撑住这套东西的是机器检查：八种变体组合下的 176 条断言、React 版本里覆盖同一套决策与计分规则的 101 个单元测试，以及一套用脚本量测而非肉眼判断的文字对比度，其中一个色以 4.41 未过，上线前已经改掉。"
      },
      "ou": {
        "label": "这个案例产出了什么",
        "m1": {
          "label": "置信度对 AI 错误的预测能力",
          "v": "AUC 0.72"
        },
        "m2": {
          "label": "语料",
          "v": "140 封邮件 → 准确率 87.9%"
        },
        "m3": {
          "label": "已建的变体",
          "v": "3 个问题 → 6 套界面"
        },
        "p": "一套已经在跑、但研究还在前头的系统：一份通过验证的语料、六套可切换的界面、一版带持久化日志与 CSV 导出的 React 实现，以及一份随时可以执行的测试脚本。证据状态：项目之外还没有人用过它。这里的一切都是设计推理和机器验证，不是用户证据。三个设计问题都开着，我的预测已经记在案，而这两者之间的落差，就是这个案例接下来会补上的内容。"
      },
      "rf": {
        "label": "反思",
        "p": "让我意外的是：AI 辅助流程真正的失败模式在哪里。不是 bug，代码是好的。而是它产出的每样东西都「说得通」：一版合格的视觉、一句流畅的邮件解释、一组看起来很合理的置信度分布。而「说得通」恰恰是快速阅读抓不出来的东西。这个项目里我最满意的三个决定全是否决，而且三次都不是靠品味，而是靠把生成结果对回它自己的数据。最弱的一环很明显：我把一个值得做的研究的条件设计好了，但还没有把它做掉。"
      }
    }
  }
};
