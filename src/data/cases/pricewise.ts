import type { CaseRecord } from "@/lib/cases/schema";

export const pricewiseCase: CaseRecord = {
  "slug": "pricewise",
  "status": "unlisted",
  "roleTracks": [
    "product",
    "ai-ux",
    "design-eng"
  ],
  "workSummary": {
    "order": 3,
    "tags": ["flag", "ai"],
    "year": "2026",
    "dur": "Prototype, demo data",
    "problem": {
      "en": "An AI wrote the code, and a green build proved nothing about whether it ran",
      "zh": "代码是 AI 写的，构建通过却证明不了到底跑没跑"
    },
    "changed": {
      "en": "Identified four silent failures that passed build, type-check, and automated tests",
      "zh": "找出四类通过了构建、类型检查与测试但实际失效的问题"
    }
  },
  "reviewMeta": {
    "reviewedAt": "2026-11-21",
    "nextReviewAt": "2027-02-21",
    "auditNote": "Verified defect taxonomy and live prototype boundary for V3.1 baseline."
  },
  "cover": {
    "src": "/projects/pricewise/01-home.png",
    "width": 2880,
    "height": 1800,
    "alt": {
      "en": "The PriceWise home screen",
      "zh": "PriceWise 首页"
    },
    "fit": "cover"
  },
  "links": [
    {
      "label": "Open the demo",
      "href": "https://pricewise-lewisdong.vercel.app",
      "external": true
    }
  ],
  "media": {
    "label": "The running app",
    "labelZh": "跑起来的样子",
    "blurb": "Captured from the live deployment, not mocked up. Amounts shown come from demo data, not from anyone's real bill — the database has zero registered users.",
    "blurbZh": "从线上版本直接抓的，不是效果图。图中金额来自演示数据，不是任何人的真实账单：数据库里注册用户是 0。",
    "images": [
      {
        "src": "/projects/pricewise/02-scan.png",
        "width": 2880,
        "height": 1800,
        "alt": "The receipt scanning screen, with an upload area and the list of recognized items",
        "altZh": "小票扫描页：上传区域与识别商品清单",
        "caption": "The core interaction bottleneck: receipts print cryptic abbreviations like MLK FC 2L while catalogs store Full Cream Milk 2L.",
        "captionZh": "体验核心所在：小票印的是简写 MLK FC 2L，商品库写的是 Full Cream Milk 2L，两者连不上就无法比价。"
      },
      {
        "src": "/projects/pricewise/03-compare.png",
        "width": 2880,
        "height": 1800,
        "alt": "The comparison view, with the cheapest chain marked in green for each item",
        "altZh": "比价页，每件商品最便宜的那一家标成绿色",
        "caption": "Three chains, item by item. The green marker is the only claim this screen makes, and it is only as good as the match behind it.",
        "captionZh": "三家超市逐件对比。绿色标记是这一屏唯一给出的判断，而这个判断有多可信，完全取决于背后那次匹配。"
      },
      {
        "src": "/projects/pricewise/04-products.png",
        "width": 2880,
        "height": 1800,
        "alt": "The product browser, each card listing the price at all three supermarkets",
        "altZh": "商品浏览页，每张卡片列出三家超市的价格",
        "caption": "65 products across Coles, Woolworths and Aldi. This is the page whose semantic search silently fell back to keyword matching on every query.",
        "captionZh": "澳洲三大连锁超市 Coles、Woolworths、Aldi 共 65 件商品。这一页的语意搜索，每次查询都静默退回了关键字匹配。"
      }
    ]
  },
  "demo": {
    "src": "https://pricewise-lewisdong.vercel.app",
    "poster": "/projects/pricewise/01-home.png",
    "title": "PriceWise, demo build",
    "titleZh": "PriceWise 演示版本",
    "posterAlt": "The PriceWise home screen; click to open the demo build in the page",
    "posterAltZh": "PriceWise 首页，点击即可在页面里打开演示版本",
    "label": "Open the demo build",
    "labelZh": "打开演示版本",
    "blurb": "The deployed prototype, in the page. Browse the 65-product catalogue and compare across the three chains without signing in. Prices come from simulated data, and the database has no registered users.",
    "blurbZh": "已部署的功能原型，直接嵌在页面里。不登录也能浏览 65 件商品并做三家比价。价格是拟真数据，数据库里没有注册用户。",
    "action": "Load the demo build",
    "actionZh": "载入演示版本"
  },
  "processArtifacts": {
    "scrubber": {
      "eyebrow": {
        "en": "Process scrubber · Silent fallback vs explicit state",
        "zh": "前后对比拉杆 · 静默猜填 ↔ 显性状态"
      },
      "title": {
        "en": "Expose silent matching failures instead of faking certainty",
        "zh": "对比未校验旧结果与显式标出存疑/未匹配的最终界面"
      },
      "summary": {
        "en": "Inspect why raw receipt abbreviations forced an explicit 'unmatched' UI tier rather than letting keyword fallback masquerade as semantic search.",
        "zh": "拖动对比小票简写识别如何从「静默误判最便宜」改为把不确定项显式标出。"
      },
      "beforeLabel": {
        "en": "Before · Silent Fallback Mock",
        "zh": "改造前 · 无校验直接展示"
      },
      "afterLabel": {
        "en": "After · Verified Live UI",
        "zh": "改造后 · 实装校验态主页"
      },
      "wireframeId": "pricewise-match",
      "afterImage": {
        "src": "/projects/pricewise/01-home.png",
        "alt": {
          "en": "The live PriceWise home screen showing explicit matching and comparison entry points",
          "zh": "PriceWise 线上首页截图，展示清晰校验与比价入口"
        },
        "width": 2880,
        "height": 1800
      }
    }
  },
  "card": {
    "en": {
      "kicker": "Product design · Behavior verification",
      "title": "PriceWise",
      "sub": "A grocery comparison prototype on simulated data—focused on exposing silent AI/search failures and clarifying uncertain receipt matches for users.",
      "role": "Product + interaction + verification",
      "date": "2026 · prototype on demo data",
      "m1": "Explicit unmatched fallback UI",
      "m2": "Four silent runtime failure modes",
      "m3": "Coles · Woolworths · Aldi catalog"
    },
    "zh": {
      "kicker": "产品设计 · 交互与行为验证",
      "title": "PriceWise",
      "sub": "基于模拟数据的超市比价原型：重点解决「AI 静默回退与小票缩写歧义如何诚实呈现在界面上」。",
      "role": "产品、交互设计与验证",
      "date": "2026 · 演示数据原型",
      "m1": "拿不准时显示为未匹配",
      "m2": "揪出四类静默失灵场景",
      "m3": "覆盖三大澳洲连锁超市商品"
    }
  },
  "narrative": {
    "en": {
      "hero": {
        "title": "PriceWise",
        "sub": "A grocery comparison prototype across three Australian chains, running on demo data — and the four classes of defect that a passing build, a clean type-check and a green test suite could not see."
      },
      "roleVal": "Product direction, interaction design and technical direction; Codex and Claude Code wrote the implementation",
      "timeVal": "2026 · deployed prototype, demo data",
      "teamVal": "Solo",
      "toolsVal": "Next.js · Prisma · Clerk · Postgres · Vitest · Playwright · Codex · Claude Code",
      "ch": {
        "label": "The problem",
        "title": "When an AI writes the code, a green build stops being evidence.",
        "p": "The interface rendered. The type-check was clean. 307 unit tests passed. None of those three facts tells you whether a feature actually executes — and in this codebase, four classes of defect satisfied all three. That is the real problem this case is about: not what to build, but how to confirm what was built is real."
      },
      "re": {
        "label": "How they were found",
        "title": "Stop reading the code. Call the endpoint and read what comes back.",
        "m1": {
          "t": "Probe the live endpoint",
          "b": "Semantic search never used a vector — the product object dropped its vector field at the data-mapping layer and every query silently fell back to keyword matching. Keyword matching returns results too, so nothing looked wrong."
        },
        "m2": {
          "t": "Open the thing it created",
          "b": "Lists built from a template were always empty: the items the front end sent were silently stripped by back-end validation. The catch branch also showed a success message, so a dropped network still reported good news."
        },
        "m3": {
          "t": "Query the database directly",
          "b": "Six declared tables had never been created. Nothing read or wrote them, so 'relation does not exist' had never been triggered. Reading code during a migration also turned up cron auth that did not fail closed when its key was unset."
        },
        "quote": "They all pass build, type-check and tests. What is broken is whether the feature runs at all, and no automatic gate is watching for that.",
        "quoteWho": "The property all four classes share"
      },
      "sy": {
        "label": "The system idea",
        "title": "'Renders correctly' and 'executes correctly' are different claims.",
        "p": "Only one of them has automatic gates behind it. A build proves the code compiles; a test proves the path the test walks; a screenshot proves pixels. None of them proves that a query used the index it was supposed to, that a write landed, or that a declared table exists. The verification pass in this project is simply the habit of asking the second question out loud, on every feature, with the deployed system rather than the source."
      },
      "id": {
        "label": "The decision I am least comfortable with",
        "p": "One more defect was mine: a regression from my own fix to search. Passing a missing field through serialized a 1,536-dimension vector into the API response and pushed three search results to 89 KB. I found it by calling the real endpoint and reading the response, not by reviewing my own diff. It stays in the case because a check that only catches the AI is not really a check. It also shows the method's limit: nothing prevented the defect, something caught it afterwards."
      },
      "pr": {
        "label": "How the scope grew",
        "p": "The feature list was AI-generated planning, derived from what a complete product ought to have rather than from anyone's need. Phases 2 through 6 all landed across two days, 9–10 January 2026. On 1 March a single commit added 5,884 lines: a v1 API, AI function calling, bilingual text, price prediction, and a social layer of friends, DMs, feeds, household groups and challenges that made up about a quarter of it. On 2 March I stopped, and did not touch it for five months. The scope never came back down: in August the v1 routes moved to unversioned paths rather than being removed, and the social routes are still in the app. Looking back, a comparison app on simulated data with no registered users should not have kept growing."
      },
      "te": {
        "label": "The module everything depends on",
        "p": "Receipt matching is the product: a receipt prints MLK FC 2L, the catalog says Full Cream Milk 2L, and if those do not meet, nothing else can happen. That module was written in one pass of 175 lines in the second commit and never modified, with 13 tests using 'milk', 'eggs', 'sourdough bread' — not one input resembling printed receipt text. Against 20 constructed receipt-format inputs it matched 15; after a fix that only adds points and never subtracts, 19. All 15 originally-correct inputs held. 311 tests green."
      },
      "ou": {
        "label": "What this case produced",
        "m1": {
          "label": "classes of defect passing build, types and tests",
          "v": "4"
        },
        "m2": {
          "label": "receipt-format inputs matched",
          "v": "15 → 19 of 20"
        },
        "m3": {
          "label": "registered users",
          "v": "0"
        },
        "p": "A deployed comparison prototype on demo data, covering Coles, Woolworths and Aldi across 65 products — and, more usefully, a verification habit with scripts anyone can re-run. Evidence status: zero registered users. Every verification ran on data I created, and what a real crumpled receipt does to recognition accuracy is unknown to me. The verification is also manual: it should be a build gate, and it is not one yet."
      },
      "rf": {
        "label": "Reflection",
        "p": "One mismatch was left unfixed on purpose. 'MLK FC 2L' moved from no-match to matching Oat Milk — a change in kind, and for the worse. A no-match lands in the unmatched list where the user can see it; a wrong match sends a wrong price silently into the comparison and the user never finds out. Fixing it means either an abbreviation dictionary, which becomes an endless maintenance list, or admitting two-letter tokens, which reinstates the mis-matches just suppressed. The correct handling is to send it back to no-match, which is a confidence-threshold problem rather than an abbreviation problem. It is pinned by a test so that if it changes, someone knows."
      }
    },
    "zh": {
      "hero": {
        "title": "PriceWise",
        "sub": "一个覆盖澳洲三家连锁超市的比价原型（演示数据），以及四类同时通过构建、类型检查和整套测试的缺陷。"
      },
      "roleVal": "产品方向、交互设计与技术方向；实现由 Codex 和 Claude Code 完成",
      "timeVal": "2026 · 已部署的原型，演示数据",
      "teamVal": "独立完成",
      "toolsVal": "Next.js · Prisma · Clerk · Postgres · Vitest · Playwright · Codex · Claude Code",
      "ch": {
        "label": "问题",
        "title": "代码交给 AI 写之后，构建通过就不再是证据了。",
        "p": "界面渲染出来了，类型检查零错误，307 个单元测试全绿。这三件事没有一件能证明一个功能真的在执行，而这份代码里有四类缺陷，照样满足上面三条。这个案例真正讲的就是这件事：不是「写什么」，是「怎么确认写出来的东西是真的」。"
      },
      "re": {
        "label": "这几类是怎么查出来的",
        "title": "别读代码。打接口，读它到底返回了什么。",
        "m1": {
          "t": "打线上接口",
          "b": "语意搜索从来没用过向量：商品对象在数据映射那层就把向量字段丢了，每一次查询都静默退回关键字匹配。关键字匹配也能搜到东西，所以看不出任何异常。"
        },
        "m2": {
          "t": "打开它建出来的东西",
          "b": "用模板建的清单永远是空的：前端送的商品项被后端校验规则默默剥掉了。而且捕获错误的分支里写的也是成功提示，网络断了照样报喜。"
        },
        "m3": {
          "t": "直接查数据库",
          "b": "声明过的六张表从来没建过。因为没有功能真的读写它们，「关系不存在」这个错从未被触发。迁移途中读代码时还撞见：密钥没配置时，定时任务鉴权没有默认拒绝。"
        },
        "quote": "它们全都通过构建、类型检查和测试。坏掉的是「功能有没有真的执行」，而这件事没有任何一道自动关卡在看。",
        "quoteWho": "四类缺陷的共同点"
      },
      "sy": {
        "label": "系统概念",
        "title": "「渲染正确」和「执行正确」是两句不同的话。",
        "p": "而只有其中一句背后有自动关卡。构建证明代码能编译；测试证明测试走过的那条路；截图证明像素。它们都证明不了一次查询有没有用上该用的索引、一次写入有没有落库、一张声明过的表在不在。这个项目里的验证轮说白了就是一个习惯：对每个功能，把第二个问题问出声，并且对着线上系统问，不对着源码问。"
      },
      "id": {
        "label": "我最不舒服的那个决定",
        "p": "还有一处是我自己的：修语义搜索时带进去的回归。补一个漏传的字段时，一个 1536 维的向量跟着序列化进了接口返回，三条搜索结果把响应撑到 89 KB。它是打真实接口、读返回查出来的，不是靠审我自己的 diff。它留在案例里，因为一道只抓 AI 的检查算不上检查。它也暴露了这套方法的界限：没有任何东西阻止了这个缺陷，只是有东西在事后抓到了它。"
      },
      "pr": {
        "label": "范围是怎么变大的",
        "p": "功能清单是 AI 生成的规划，从「一个完整的产品该有什么」推出来的，不是从任何人的需求推出来的。Phase 2 到 Phase 6 全部落在 2026 年 1 月 9 到 10 日这两天。3 月 1 日，单次提交 5884 行：v1 接口、AI 函数调用、中英双语文案、价格预测，还有一层社交功能。好友、私信、动态、家庭群组、挑战赛这些社交代码，约占这 5884 行的四分之一。3 月 2 日停下，五个月没有碰。范围一直没有缩回去：8 月 v1 路由只是搬到了不带版本号的路径，没有删，社交路由至今都在。回头看，一个建在拟真数据上、注册用户为 0 的比价应用，不该继续长下去。"
      },
      "te": {
        "label": "一切都压在这个模块上",
        "p": "小票商品名匹配就是这个产品：小票印 MLK FC 2L，商品库里是 Full Cream Milk 2L，对不上就什么都比不了。这个模块在第二个提交里一次写成 175 行、此后从未修改，配的 13 个测试输入是 milk、eggs、sourdough bread：没有一条是真实小票印出来的样子。拿 20 条构造的小票格式输入去测，修前对 15 条；改法只加分不改分之后，对 19 条。原本对的 15 条零退化。测试共 311 个，全绿。"
      },
      "ou": {
        "label": "产出与边界",
        "m1": {
          "label": "类缺陷同时通过构建、类型与测试",
          "v": "4"
        },
        "m2": {
          "label": "条小票格式输入配上",
          "v": "20 条里 15 → 19"
        },
        "m3": {
          "label": "个注册用户",
          "v": "0"
        },
        "p": "一个已部署的比价原型，跑在演示数据上，覆盖澳洲三大连锁超市 Coles、Woolworths、Aldi 共 65 件商品。更有用的是一套留下了可复现脚本的验证习惯。证据状态：注册用户是 0。所有验证跑的都是我自己造的数据，普通人拍一张皱掉的小票识别成功率是多少，我不知道。而且这些验证是手动的：它本该是一道构建关卡，现在还不是。"
      },
      "rf": {
        "label": "反思",
        "p": "有一处错配是刻意不修的。「MLK FC 2L」从「匹配不到」变成了「配到 Oat Milk」：性质变了，而且变糟了。匹配不到会进 unmatched 清单，用户看得见；配到错的商品，错价格会直接进比价结果，用户不会知道。要修就得加缩写词典，那会变成没完没了的维护清单；或者放开两字母 token，那会把刚压下去的误配放回来。正确的处理是让它回到「匹配不到」，那是信心阈值的问题，不是缩写的问题。现在它被锁进测试：它变了，得有人知道。"
      }
    }
  }
};
