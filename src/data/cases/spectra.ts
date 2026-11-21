import type { CaseRecord } from "@/lib/cases/schema";

export const spectraCase: CaseRecord = {
  "slug": "spectra",
  "status": "unlisted",
  "roleTracks": [
    "interaction",
    "design-eng"
  ],
  "workSummary": {
    "tags": ["research"],
    "year": "2026",
    "dur": "DEMO (unlisted)",
    "problem": {
      "en": "Locked-down web typography leaves readers unable to adjust line height or font safely",
      "zh": "网页作者写死的排版限制了需要更大字距与行高的阅读者"
    },
    "changed": {
      "en": "Per-origin Chrome extension injection with offline bundled OpenDyslexic",
      "zh": "按域名保存设置的浏览器扩展注入与离线本地打包 OpenDyslexic 字体"
    }
  },
  "reviewMeta": {
    "reviewedAt": "2026-11-21",
    "nextReviewAt": "2027-02-21",
    "auditNote": "Confirmed unlisted archive status (2026-11-20) and local font bundling rationale for V3.1 baseline."
  },
  "links": [],
  "card": {
    "en": {
      "kicker": "Accessibility · Browser extension",
      "title": "Spectra Lens",
      "sub": "A browser extension that lets a reader change type and spacing on a page the author locked down.",
      "role": "Solo design and build",
      "date": "2026 · DEMO",
      "m1": "Content-script style injection",
      "m2": "OpenDyslexic bundled locally",
      "m3": "English and Simplified Chinese"
    },
    "zh": {
      "kicker": "无障碍 · 浏览器扩展",
      "title": "Spectra Lens",
      "sub": "一个浏览器扩展，让读者自己改掉网页作者写死的字体和行距。",
      "role": "独立设计与开发",
      "date": "2026 · DEMO",
      "m1": "内容脚本注入样式",
      "m2": "OpenDyslexic 本地打包",
      "m3": "中英双语界面"
    }
  },
  "narrative": {
    "en": {
      "hero": {
        "title": "Spectra Lens",
        "sub": "Giving the reader control over type the page author fixed."
      },
      "roleVal": "Solo design and build",
      "timeVal": "2026 · DEMO stage",
      "teamVal": "Solo",
      "toolsVal": "Chrome Extension APIs · JavaScript · Jest",
      "ch": {
        "label": "The problem",
        "title": "The page decides how hard it is to read, and the reader has no say.",
        "p": "Font, line height, letter spacing and contrast are all set by whoever built the site. A reader who needs looser spacing or a different typeface has no way in. Browser zoom scales everything at once, which breaks layouts and does not touch the typeface at all. Reader modes strip the page down but only work where the site cooperates."
      },
      "re": {
        "label": "What I looked at",
        "title": "Guidelines first, then what already exists.",
        "m1": {
          "t": "Accessibility guidance",
          "b": "WCAG text-spacing criteria as the starting point for what the controls should cover."
        },
        "m2": {
          "t": "Existing extensions",
          "b": "How other reading tools handle injection, persistence, and sites that fight back."
        },
        "m3": {
          "t": "Typeface research",
          "b": "Why OpenDyslexic exists, what it claims, and what the evidence for it actually is."
        },
        "quote": "No user research yet. This case is about what I built and why, not about what it did for anyone.",
        "quoteWho": "Stated limit"
      },
      "sy": {
        "label": "The shape of the problem",
        "title": "It has to work on pages that were never built to allow it.",
        "p": "Injecting styles into someone else’s page is the whole difficulty. Sites use their own specificity, their own class names, and sometimes inline styles that override anything added later. Anything I inject has to win without breaking layout, and it has to come back the next time that site is opened."
      },
      "id": {
        "label": "Design decisions",
        "p": "The font is bundled in the extension rather than pulled from a CDN: it works offline, it does not tell a third party which pages are being read, and it cannot break when a remote host changes. Settings save per site, because someone who needs looser spacing on a dense documentation page usually does not want it on a news site. The controls sit in a popup rather than a context menu, so the whole set is visible at once instead of hidden behind a right-click."
      },
      "pr": {
        "label": "Build",
        "p": "A Chrome extension: a content script that injects the style layer, a popup panel holding the controls, a background script keeping settings in sync, and locale files for English and Simplified Chinese. Jest covers the utility layer where the settings logic lives."
      },
      "te": {
        "label": "Testing",
        "p": "Cross-site checks by hand — documentation, news, and single-page apps — to find where injected styles lose to the site’s own CSS. Unit tests cover the settings and utility functions. No participants have used it."
      },
      "ou": {
        "label": "What it produced",
        "m1": {
          "label": "Form",
          "v": "Chrome extension"
        },
        "m2": {
          "label": "Font",
          "v": "Bundled, not remote"
        },
        "m3": {
          "label": "Scope",
          "v": "Settings per site"
        },
        "p": "A working extension that rewrites type and spacing on any page from one popup, in two languages, with settings that persist per site. Evidence status — this is a DEMO. It runs, it is tested at the utility level, and it has never been put in front of a reader who needs it."
      },
      "rf": {
        "label": "Reflection",
        "p": "Building this changed what I think accessibility work is. The guidelines are the easy part; the hard part is that you are a guest on someone else’s page and every site fights you differently. The obvious next step is also the one I have not taken: give it to someone who actually reads this way and watch which controls they never touch."
      }
    },
    "zh": {
      "hero": {
        "title": "Spectra Lens",
        "sub": "把网页作者写死的排版，交回给读者自己调。"
      },
      "roleVal": "独立设计与开发",
      "timeVal": "2026 · DEMO 阶段",
      "teamVal": "独立完成",
      "toolsVal": "Chrome 扩展 API · JavaScript · Jest",
      "ch": {
        "label": "问题",
        "title": "一页内容读起来有多吃力，是网页决定的，读的人说了不算。",
        "p": "字体、行高、字距、对比度，全部由建站的人设定。需要更宽行距或换一种字体的人，根本没有入口。浏览器缩放是整页一起放大，会撑坏排版，而且完全动不了字体。阅读模式能把页面剥干净，但只在网站配合的时候才有效。"
      },
      "re": {
        "label": "我看了什么",
        "title": "先看准则，再看已有的东西。",
        "m1": {
          "t": "无障碍准则",
          "b": "以 WCAG 的文本间距条款作为起点，确定这些控件至少要覆盖哪些维度。"
        },
        "m2": {
          "t": "现有扩展",
          "b": "其他阅读类工具怎么处理注入、怎么保存设置、遇到不配合的网站怎么办。"
        },
        "m3": {
          "t": "字体考据",
          "b": "OpenDyslexic 为什么存在、它声称什么、支持它的证据实际有多强。"
        },
        "quote": "还没有做过用户研究。这个案例讲的是我做了什么、为什么这么做，不是它对谁起了作用。",
        "quoteWho": "明确的边界"
      },
      "sy": {
        "label": "问题的真正形状",
        "title": "它必须跑在根本没打算让你改的页面上。",
        "p": "往别人的页面里注入样式，难点全在这里。每个网站有自己的选择器优先级、自己的类名，有时还有内联样式，会盖掉任何后加的东西。我注入的样式既要赢过它们，又不能把布局撑坏，而且下次打开这个站还得自己回来。"
      },
      "id": {
        "label": "设计决策",
        "p": "字体打包进扩展，不走 CDN：离线能用，不会把「谁在读哪一页」告诉第三方，也不会因为远端主机改动就失效。设置按站点分别保存：需要在密集的文档页放宽行距的人，通常并不想在新闻站也这样。控件放在扩展弹窗里，而不是右键菜单，这样一整组一眼能看全，不用靠右键去猜。"
      },
      "pr": {
        "label": "实现",
        "p": "一个 Chrome 扩展：内容脚本负责注入样式层，弹窗面板承载控件，后台脚本负责同步设置，另有中英两套语系文件。Jest 覆盖了存放设置逻辑的工具层。"
      },
      "te": {
        "label": "测试",
        "p": "手动跨站点验证（文档站、新闻站、单页应用），找出注入样式在哪里会输给网站自己的 CSS。单元测试覆盖设置与工具函数。没有受试者用过它。"
      },
      "ou": {
        "label": "产出了什么",
        "m1": {
          "label": "形态",
          "v": "Chrome 扩展"
        },
        "m2": {
          "label": "字体",
          "v": "本地打包，不走远端"
        },
        "m3": {
          "label": "作用域",
          "v": "按站点保存设置"
        },
        "p": "一个能用的扩展：从一个扩展弹窗就能改写任意页面的字体与间距，中英双语，设置按站点保存。证据状态：这是 DEMO。它能跑，工具层有测试，但从来没有交到真正需要它的读者手里过。"
      },
      "rf": {
        "label": "反思",
        "p": "做完这个之后，我对无障碍工作的理解变了。准则是简单的那部分；难的是你始终是别人页面上的客人，而每个网站抵抗你的方式都不一样。下一步很明显，也正是我还没做的：把它给一个真的这样读东西的人，看他们从来不碰哪几个控件。"
      }
    }
  }
};
