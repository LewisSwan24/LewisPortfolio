import type { CaseRecord } from "@/lib/cases/schema";

export const autofillCase: CaseRecord = {
  "slug": "autofill",
  "status": "listed",
  "featuredOrder": 4,
  "roleTracks": [
    "product",
    "ai-ux",
    "design-eng"
  ],
  "workSummary": {
    "order": 8,
    "tags": ["ai"],
    "year": "2026",
    "dur": "Used on my applications",
    "problem": {
      "en": "One resume typed into Workday, Beisen and Moka, field by field",
      "zh": "同一份简历在 Workday、北森、Moka 里一格格重填"
    },
    "changed": {
      "en": "An autofill that never guesses, never submits and keeps the resume on the device",
      "zh": "一个不猜、不提交、简历不离开设备的自动填表工具"
    }
  },
  "reviewMeta": {
    "reviewedAt": "2026-11-21",
    "nextReviewAt": "2027-02-21",
    "auditNote": "Verified synthetic-form screenshot test provenance (2026-11-20) and local-only invariant for V3.1 baseline."
  },
  "cover": {
    "src": "/projects/autofill/01-form-filled.png",
    "width": 1280,
    "height": 900,
    "alt": {
      "en": "A Chinese application form filled from the sample resume, with the summary card showing 45 filled, 1 needing review and 1 not filled",
      "zh": "用示例简历填好的中文申请表，摘要卡显示已填 45、待确认 1、未填 1"
    },
    "fit": "cover"
  },
  "links": [
    {
      "label": "Source on GitHub",
      "href": "https://github.com/LewisSwan24/resume-autofill",
      "external": true
    }
  ],
  "interactiveDemo": {
    "id": "autofill-confidence",
    "placement": "mid-narrative",
    "eyebrow": {
      "en": "Interactive prototype · Zero-guess confidence gate",
      "zh": "可操作活原型 · 零猜测三档分流门控"
    },
    "title": {
      "en": "Run a local scan on a simulated ATS form",
      "zh": "在模拟 ATS 申请表上运行一次本地扫描"
    },
    "prompt": {
      "en": "Click \"Scan this form locally\" to see exact 1:1 fields auto-fill (solid), ambiguous dropdowns pause for you (dashed), open prompts stay blank (double), and Submit stay human-locked.",
      "zh": "点击「一键本地扫描」，观察确定字段如何直填（实线）、歧义下拉如何标出待确认（虚线）、开放题如何刻意留空（双线），以及提交按钮如何始终由人手掌控。"
    },
    "takeaway": {
      "en": "Trustworthy form automation splits certainty from guesswork visually and structurally—never fabricating open answers and never clicking final Submit.",
      "zh": "值得信任的自动化工具在结构与视觉上严格区分确定性与猜测：绝不编造开放题，也绝不越权代点最终提交。"
    }
  },
  "media": {
    "label": "After a fill",
    "labelZh": "填完之后",
    "blurb": "Captured from the extension's own screenshot tests on 20 November 2026, on its synthetic test forms. The resume shown is the built-in sample, not a real person's.",
    "blurbZh": "截自扩展自带的截图测试（2026 年 11 月 20 日），用的是合成测试表单。画面里的简历是内置示例，不是真人的。",
    "images": [
      {
        "src": "/projects/autofill/02-side-panel.png",
        "width": 400,
        "height": 900,
        "alt": "The side panel's fill report: 45 filled, 1 to review, 1 not filled, a note that the final submit stays with you, and a list of fields with their reasons",
        "altZh": "侧栏的填写报告：已填 45、待确认 1、未填 1，一行说明最终提交留给你，下面逐栏列出原因",
        "caption": "The side panel lists every field with its reason, and says on screen that the final submit stays with you.",
        "captionZh": "侧栏逐栏列出原因，并在屏幕上写明最终提交留给你。"
      },
      {
        "src": "/projects/autofill/03-summary-dark.png",
        "width": 372,
        "height": 714,
        "alt": "The summary card after a fill, in dark mode",
        "altZh": "填完后的摘要卡，暗色模式",
        "caption": "The summary card in dark mode: filled, needs review and not filled, each with a word as well as a color.",
        "captionZh": "暗色模式下的摘要卡：已填、待确认、未填，每种状态都有文字，不只靠颜色。"
      }
    ]
  },
  "processArtifacts": {
    "quotes": {
      "eyebrow": {
        "en": "Applicant friction · Real ATS application runs",
        "zh": "真实投递场景痛点归因卡"
      },
      "title": {
        "en": "Rules forged from filling Workday, Beisen, Moka, and Feishu forms",
        "zh": "从 Workday、北森、Moka 与飞书真实投递中沉淀的三条底线"
      },
      "items": [
        {
          "id": "autofill-no-guess",
          "category": "trust",
          "quote": {
            "en": "\"A wrong visa status or fabricated motivation paragraph is far worse than leaving the field empty for me.\"",
            "zh": "「填错签证类别或瞎编一段申请动机，比直接留空让我自己填还要致命得多。」"
          },
          "context": {
            "en": "Graduate application runs across Workday & Moka (Nov 2026)",
            "zh": "应届校招 Workday / Moka 真实表单投递（2026 年 11 月）"
          },
          "friction": {
            "en": "Aggressive autofillers silently write low-confidence guesses into high-stakes fields.",
            "zh": "激进型填表工具会把低把握猜测静默写入关键字段。"
          },
          "decision": {
            "en": "Split output into 3 visual tiers (solid, dashed, double) and banned open-ended generation.",
            "zh": "拆出实线/虚线/双线三档可视化分流，并禁止生成任何开放式回答。"
          }
        },
        {
          "id": "autofill-submit-lock",
          "category": "structure",
          "quote": {
            "en": "\"Multi-step Chinese campus portals hide Submit right where Next used to sit.\"",
            "zh": "「多步校招流程里，最终『提交』按钮经常长在上一页『下一步』同样的位置。」"
          },
          "context": {
            "en": "Beisen & Feishu multi-page form adapters",
            "zh": "北森与飞书多步表单适配器调试"
          },
          "friction": {
            "en": "Automated page advancement risks accidentally firing irreversible final submission.",
            "zh": "自动翻页脚本一旦误判终态按钮，就会替人点击不可撤回的最终提交。"
          },
          "decision": {
            "en": "Enforced an explicit Human Submit Lock in both extension logic and side-panel copy.",
            "zh": "在扩展逻辑与侧栏说明中硬性锁定：最终提交按钮永远仅限申请人亲手点击。"
          }
        }
      ]
    }
  },
  "designDecisions": [
    {
      "id": "three-tier-no-guess",
      "decisionTitle": {
        "en": "Split certainty into three visible tiers and leave ambiguous answers blank",
        "zh": "三态置信度分流：有歧义与开放题刻意留白，绝不替求职者乱猜"
      },
      "humanTension": {
        "en": "Re-typing one resume across Workday, Beisen, and Moka is exhausting, yet AI autofillers that guess visa status, salary expectations, or motivation essays to look '100% automatic' shift catastrophic error risk onto the applicant.",
        "zh": "在 Workday、北森、Moka 之间重复抄写同一份简历极其消耗心力；但市面上的工具常为了显得「全自动」而硬猜签证身份、期望薪资或开放问答题，一旦猜错，后果全由求职者承担。"
      },
      "rejectedAlternatives": [
        {
          "option": {
            "en": "Cloud LLM auto-generation for every blank and open-ended prompt",
            "zh": "接入云端大模型自动编造所有未知栏位与开放式问答"
          },
          "flaw": {
            "en": "Produces plausible hallucinations on high-stakes compliance fields and requires sending private resume history to external servers.",
            "zh": "在签证、工龄等不可容错字段上制造「看起来很像」的幻觉，同时迫使个人简历离开本地设备。"
          }
        },
        {
          "option": {
            "en": "Color-only highlight for uncertain fields",
            "zh": "仅用单色边框高亮区分确定与待确认字段"
          },
          "flaw": {
            "en": "Fails color-blind accessibility and leaves users unsure whether a field was skipped intentionally or broken.",
            "zh": "色觉障碍用户难以分辨，也无法向人解释系统「为什么没填这一格」。"
          }
        }
      ],
      "chosenTradeoff": {
        "en": "Deterministic 1:1 local matches fill immediately (solid), ambiguous dropdowns pause for review (dashed), open prompts stay blank (double), and every tier pairs stroke style, word badge, and explicit side-panel reason.",
        "zh": "建立三档可见分流：确定 1:1 字段直填（实线）、歧义下拉标出待核（虚线）、开放题刻意留空（双线），每种状态同时配备边框线型、文字标签与侧栏原因说明。"
      },
      "residualCostOrRisk": {
        "en": "Applicants still write open answers manually, and 100% fill accuracy is measured only on synthetic fixture forms—real ATS accuracy across outside users remains unmeasured.",
        "zh": "求职者仍需亲自填写开放问答；目前的 100% 准确率仅来自合成测试表单，真实求职网站上的跨人群准确率尚未量化统计。"
      }
    },
    {
      "id": "human-submit-and-local",
      "decisionTitle": {
        "en": "Hard-lock final Submit to human action and keep resumes strictly on-device",
        "zh": "硬性禁止代点最终提交，并把简历数据锁死在本地设备"
      },
      "humanTension": {
        "en": "Multi-step campus portals frequently place 'Submit' in the exact pixel slot where 'Next' appeared on earlier steps, creating genuine anxiety that automation will fire an irreversible application prematurely.",
        "zh": "国内校招与海外多步网申经常把最终「提交」放在上一页「下一步」的同一位置，让使用者担心工具翻页时顺手把半成品投了出去。"
      },
      "rejectedAlternatives": [
        {
          "option": {
            "en": "One-click end-to-end auto-apply",
            "zh": "全链路一键自动翻页并代点最终提交"
          },
          "flaw": {
            "en": "Removes the applicant's final inspection gate and makes any adapter misread irreversible.",
            "zh": "剥夺申请人的终审权，任何控件适配偏差都会直接变成无法撤回的错误投递。"
          }
        },
        {
          "option": {
            "en": "Cloud account sync across Chrome and Android",
            "zh": "通过自建云端账号在 Chrome 扩展与 Android 间同步简历"
          },
          "flaw": {
            "en": "Introduces server storage, breach liability, and telemetry concerns for sensitive personal identity data.",
            "zh": "引入服务端存储与泄露风险，削弱「绝不外传」的隐私承诺。"
          }
        }
      ],
      "chosenTradeoff": {
        "en": "Extension logic advances Next across pages and stops dead before Submit (stated explicitly in the side panel), while Chrome CSP blocks network calls and Android encrypts resumes in the device Keystore (verified by a unit test rejecting network imports).",
        "zh": "多页流程只代点「下一步」并在最终提交前停下（侧栏明文告知），Chrome 扩展通过严格 CSP 断绝外网请求，Android 端以 Keystore 加密存储并由单元测试拦截任何网络类引用。"
      },
      "residualCostOrRisk": {
        "en": "Requires one manual final click and separate setup per device; not yet published on Chrome Web Store or Google Play, no iOS version, no Chinese IME in the Android keyboard, and WeChat-login-only portals stay unreachable.",
        "zh": "每份投递仍需人工多点一次最终确认，双端无法云同步；尚未上架应用商店、无 iOS 版、Android 简历键盘暂不支持中文输入法，且无法触及纯微信登录页面。"
      }
    }
  ],
  "card": {
    "en": {
      "kicker": "Automation that acts for you · Privacy",
      "title": "Resume Autofill",
      "sub": "A job-application autofill for Chrome and Android that never guesses, never submits for you and keeps your resume on the device.",
      "role": "Problem + rules",
      "date": "2026 · used on my own applications",
      "m1": "Unsure fields left empty for review",
      "m2": "Stops before the final submit",
      "m3": "Your resume stays on the device"
    },
    "zh": {
      "kicker": "代你行事的自动化 · 隐私",
      "title": "Resume Autofill",
      "sub": "一个 Chrome 和 Android 上的求职自动填表工具：不猜、不替你提交，简历也不离开设备。",
      "role": "问题与规则",
      "date": "2026 · 我投递时用过",
      "m1": "拿不准的栏位留空待确认",
      "m2": "在最终提交前停下",
      "m3": "简历不离开设备"
    }
  },
  "narrative": {
    "en": {
      "hero": {
        "title": "Resume Autofill",
        "sub": "A local-first autofill for job applications, as a Chrome extension and an Android app with a resume keyboard. It fills forms from your own resume, leaves anything uncertain to you, and sends nothing to a server."
      },
      "roleVal": "Solo: the problem, the rules the tool follows, review, and testing on my own applications. The code was written by Claude Code",
      "timeVal": "November 2026 · in use on my own applications",
      "teamVal": "Solo",
      "toolsVal": "TypeScript · WXT (Chrome MV3) · Capacitor (Android) · Vitest · Playwright · Claude Code",
      "ch": {
        "label": "The problem",
        "title": "One resume, typed again in every system.",
        "p": "Applying for graduate jobs meant typing the same resume into Workday, Greenhouse, Beisen, Moka and the rest, field by field. That was where it started. While building it, privacy became the main design constraint: a tool that fills forms in your name has to be trusted not to fill them wrongly, not to submit for you, and not to send your resume anywhere."
      },
      "re": {
        "label": "Groundwork",
        "title": "Three things the tool refuses to do.",
        "m1": {
          "t": "Never guess",
          "b": "A field the tool is unsure about stays empty and is outlined for you to confirm. The fill report counts filled, needs-review and not-filled fields separately."
        },
        "m2": {
          "t": "Never submit",
          "b": "On a multi-page application it presses Next and fills each page, then stops before the final submit. The side panel says so on screen."
        },
        "m3": {
          "t": "Never send",
          "b": "No server and no analytics. The extension keeps your data in local browser storage under a strict content security policy; Android encrypts it with a key held in the Keystore."
        }
      },
      "sy": {
        "label": "System concept",
        "title": "Adapters for the forms people actually meet.",
        "p": "Application forms are built from a handful of libraries, so the engine fills by kind of control rather than by site: native HTML, Ant Design, Element Plus, react-select and ARIA widgets. On top of that sit adapters for Greenhouse, Lever, Workable and Workday, and for Beisen, Moka and Feishu on Chinese campus-recruitment sites. Where a browser cannot reach, such as WeChat mini programs, the Android app's resume keyboard types the fields in."
      },
      "id": {
        "label": "Design decisions",
        "p": "Three rules were mine: leave an unsure field empty and outlined, stop before the final submit, and keep the resume on the device. Each one shows on screen, so a person can see what is left to them: the summary card after a fill, the side panel that lists every field with its reason, and the note that the final submit stays with you. Each state carries a word and an icon as well as a color, so it does not rely on color alone."
      },
      "pr": {
        "label": "How it got built",
        "p": "Claude Code wrote the code; the problem, the rules and the acceptance were mine. The extension core came first, from 4 November 2026, then fixes from what real Feishu, Moka and Beisen forms showed. From 16 November the Android app added a fill browser, an application tracker and the resume keyboard, and from 17 to 19 November came preview before fill, multi-step forms and resume variants."
      },
      "te": {
        "label": "Testing and iteration",
        "p": "The screenshots here come from the repository's own screenshot tests, which passed 6 of 6 on 20 November 2026 in light and dark, on synthetic test forms with the extension's built-in sample resume. The README records every field on those synthetic forms filled correctly; that is the repository's own test forms, not real sites. A unit test fails if the keyboard's code refers to a network class. The real-use check is mine: I have used it on my own applications."
      },
      "ou": {
        "label": "What it produced",
        "m1": {
          "label": "Platforms",
          "v": "Chrome · Android"
        },
        "m2": {
          "label": "Servers your resume is sent to",
          "v": "None"
        },
        "m3": {
          "label": "Users on record",
          "v": "Me"
        },
        "p": "A local-first autofill that covers international ATS platforms and Chinese campus-recruitment sites, and that I have used on real applications. Evidence status: there is no measured fill accuracy on real sites, and no one but me is on record as using it. It is not on the Chrome Web Store or Google Play, there is no iOS app, the keyboard has no Chinese input method, and sites that only allow WeChat login are out of reach. The code was written by Claude Code."
      },
      "rf": {
        "label": "Reflection",
        "p": "For a tool that acts in someone's name, this case is mostly about what it refuses to do, and about making each refusal visible. What the case cannot show yet is accuracy on real sites, or whether other applicants trust the review outlines enough to check them. Both need measuring before the tool is offered to anyone else."
      }
    },
    "zh": {
      "hero": {
        "title": "Resume Autofill",
        "sub": "一个本地优先的求职自动填表工具，做成 Chrome 扩展和带简历键盘的 Android App。这个工具用你自己的简历填表，拿不准的留给你，什么都不发到服务器。"
      },
      "roleVal": "独立完成：问题定义、工具要守的规则、审查，以及在自己的申请上测试由我负责。代码由 Claude Code 编写",
      "timeVal": "2026 年 11 月 · 我投递时在用",
      "teamVal": "独立完成",
      "toolsVal": "TypeScript · WXT（Chrome MV3）· Capacitor（Android）· Vitest · Playwright · Claude Code",
      "ch": {
        "label": "问题",
        "title": "同一份简历，每个系统都要重填一遍。",
        "p": "投应届岗位时，同一份简历要在 Workday、Greenhouse、北森、Moka 这些系统里一格一格重填。这是起点。做的过程中，隐私成了最主要的设计约束。一个以你的名义填表的工具，要让人放心：不会填错，不会替你提交，也不会把简历发到任何地方。"
      },
      "re": {
        "label": "前期工作",
        "title": "工具拒绝做的三件事。",
        "m1": {
          "t": "不猜",
          "b": "工具拿不准的栏位留空，并标出来等你确认。填写报告把已填、待确认、未填分开计数。"
        },
        "m2": {
          "t": "不提交",
          "b": "多页申请里，它会点「下一步」逐页填写，在最终提交前停下。侧栏上直接写着这一点。"
        },
        "m3": {
          "t": "不外传",
          "b": "不用服务器，不做统计。扩展把数据放在本地浏览器存储里，并用严格的内容安全策略；Android 用 Keystore 里的密钥加密。"
        }
      },
      "sy": {
        "label": "系统概念",
        "title": "为人们真正会遇到的表单做适配。",
        "p": "申请表单大多由少数几个组件库搭成，所以引擎按控件类型来填，而不是按网站：原生 HTML、Ant Design、Element Plus、react-select 和 ARIA 组件。在此之上，有 Greenhouse、Lever、Workable、Workday 的适配，也有国内校招网站北森、Moka、飞书的适配。浏览器到不了的地方，例如微信小程序，就用 Android App 的简历键盘把内容打进去。"
      },
      "id": {
        "label": "设计决策",
        "p": "有三条规则是我定的：拿不准的栏位留空并标出来，在最终提交前停下，简历不离开设备。每一条都显示在屏幕上，本人看得到还剩哪些事归自己。具体是三处：填完后的摘要卡，逐栏列出原因的侧栏，以及「最终提交留给你」的说明。每种状态都配文字和图标，不只靠颜色区分。"
      },
      "pr": {
        "label": "怎么做出来的",
        "p": "代码由 Claude Code 编写；问题、规则和验收是我定的。2026 年 11 月 4 日先做扩展核心，再按真实的飞书、Moka、北森表单暴露的问题修正。11 月 16 日起，Android App 加入填表浏览器、申请追踪和简历键盘；17 到 19 日又加入填写前预览、多步表单和简历变体。"
      },
      "te": {
        "label": "测试与迭代",
        "p": "这里的截图来自仓库自带的截图测试。2026 年 11 月 20 日，亮色与暗色 6 / 6 通过，用的是合成测试表单和扩展内置的示例简历。README 记录这些合成表单上的栏位全部填对；那是仓库自己的测试表单，不是真实网站。键盘代码一旦引用网络类，就有单元测试失败。真实使用的检验是我自己：我在自己的申请上用过。"
      },
      "ou": {
        "label": "产出与边界",
        "m1": {
          "label": "平台",
          "v": "Chrome · Android"
        },
        "m2": {
          "label": "简历会发往的服务器",
          "v": "无"
        },
        "m3": {
          "label": "有记录的使用者",
          "v": "我"
        },
        "p": "一个本地优先的自动填表工具，覆盖海外 ATS 平台和国内校招网站，我在真实申请上用过。证据状态：没有在真实网站上量过填写准确率，有记录的使用者只有我。没有上架 Chrome 网上应用店或 Google Play，没有 iOS App，键盘没有中文输入法，只允许微信登录的网站也用不了。代码由 Claude Code 编写。"
      },
      "rf": {
        "label": "反思",
        "p": "对一个以别人名义行事的工具，这个案例讲的主要是它拒绝做什么，以及怎样让每一条拒绝被看见。这个案例还说明不了两件事。一是在真实网站上的准确率；二是其他申请人会不会信任待确认标记，真的去核对。这两样都要先量过，才能把工具交给别人用。"
      }
    }
  }
};
