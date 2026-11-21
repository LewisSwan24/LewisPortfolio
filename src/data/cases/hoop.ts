import type { CaseRecord } from "@/lib/cases/schema";

export const hoopCase: CaseRecord = {
  "slug": "hoop",
  "status": "listed",
  "roleTracks": [
    "product",
    "design-eng",
    "ai-ux"
  ],
  "workSummary": {
    "order": 4,
    "tags": ["ai", "hardware"],
    "year": "2026",
    "dur": "Playable",
    "problem": {
      "en": "A registry of 299 asset specs, where what goes wrong shows only as a set",
      "zh": "299 条资产规格的登记表，毛病要整组摆在一起才看得出来"
    },
    "changed": {
      "en": "An art bible and a rejected list written first, with style checked by eye",
      "zh": "先写美术圣经和拒绝清单，风格靠人眼对照"
    }
  },
  "reviewMeta": {
    "reviewedAt": "2026-11-21",
    "nextReviewAt": "2027-02-21",
    "auditNote": "Verified DEMO v0.6 registry claim boundaries for V3.1 baseline."
  },
  "cover": {
    "src": "/projects/hoop/01-main-menu.png",
    "width": 1280,
    "height": 800,
    "alt": {
      "en": "Hoop Dream main menu, with the title set in a large terracotta serif on warm parchment",
      "zh": "Hoop Dream 主菜单，赤陶色衬线大标题落在暖色羊皮纸底上"
    },
    "fit": "cover"
  },
  "links": [],
  "media": {
    "label": "The build, running",
    "labelZh": "跑起来的样子",
    "blurb": "Captured from the public deployment, not mocked up: the menu, the two-step character creation, and the first career node with its status, attributes, relationships and actions all live.",
    "blurbZh": "这些是从线上公开版本抓的，不是效果图：主菜单、两步角色创建，以及第一个生涯节点，状态、六维属性、关系网和可选行动全部是真的。",
    "images": [
      {
        "src": "/projects/hoop/01-main-menu.png",
        "width": 1280,
        "height": 800,
        "alt": "Hoop Dream main menu, with the title set in a large terracotta serif on warm parchment",
        "altZh": "Hoop Dream 主菜单，赤陶色衬线大标题落在暖色羊皮纸底上",
        "caption": "The menu carries its own honesty label: DEMO v0.6, PROTOTYPE.",
        "captionZh": "主菜单上自己挂着诚实标签：DEMO v0.6、PROTOTYPE。"
      },
      {
        "src": "/projects/hoop/02-character-creation.png",
        "width": 1280,
        "height": 800,
        "alt": "Character creation with a name field, four playing styles, and six attributes each at 15 of 40",
        "altZh": "角色创建：姓名输入、四种打法风格，以及六项各 15/40 的属性",
        "caption": "Four archetypes against six attributes. START JOURNEY stays disabled until the name is filled — validation, not a broken button.",
        "captionZh": "四种原型对六维属性。姓名没填之前「开始旅程」一直是灰的。那是校验，不是按钮坏了。"
      },
      {
        "src": "/projects/hoop/04-career-node.png",
        "width": 1280,
        "height": 800,
        "alt": "The first career node: status and attribute rails on the left, a narrative modal in the centre, training and life actions on the right",
        "altZh": "第一个生涯节点：左侧状态与属性条，中间剧情弹窗，右侧训练与生活行动",
        "caption": "One node of 146. Status, six attributes, eight relationships and the action menu are all wired to the same career state.",
        "captionZh": "146 个节点里的第一个。状态、六维属性、八段关系与行动菜单，全部接在同一份生涯状态上。"
      }
    ]
  },
  "demo": {
    "src": "https://hoop-dream.vercel.app",
    "poster": "/projects/hoop/01-main-menu.png",
    "title": "Hoop Dream, playable",
    "titleZh": "Hoop Dream 可玩版本",
    "posterAlt": "The Hoop Dream main menu; click to play the build in the page",
    "posterAltZh": "Hoop Dream 主菜单，点击即可在页面里直接玩",
    "label": "Play a career",
    "labelZh": "自己开一段生涯",
    "blurb": "The public build, in the page. Create a player — the name is required, and the archetype you pick propagates into the six attributes — then walk into the first node and spend an action. Everything past that point is the same systems the tests cover.",
    "blurbZh": "线上版本，直接嵌在页面里。创建一名球员：姓名必填，选的打法风格会传导进六维属性；然后进第一个节点花掉一次行动。从那里往后，跑的都是测试覆盖的同一批系统。",
    "action": "Load the playable build",
    "actionZh": "载入可玩版本"
  },
  "card": {
    "en": {
      "kicker": "Generative production · Narrative systems",
      "title": "Hoop Dream",
      "sub": "A basketball life from twelve to retirement, and style rules written down before the asset batches.",
      "role": "Design + art direction",
      "date": "2026 · playable, DEMO v0.6",
      "m1": "299 asset specs · 6 batches · 3 art bibles",
      "m2": "146 career nodes, not a calendar",
      "m3": "1,975 tests over the systems"
    },
    "zh": {
      "kicker": "生成式生产 · 叙事系统",
      "title": "Hoop Dream",
      "sub": "一段从 12 岁打到退役的篮球人生，以及一套在资产批次之前就写下的风格规则。",
      "role": "设计与美术方向",
      "date": "2026 · 可玩，DEMO v0.6",
      "m1": "299 条资产规格 · 6 个批次 · 3 份美术圣经",
      "m2": "146 个节点，不是日历",
      "m3": "1975 个测试覆盖系统"
    }
  },
  "narrative": {
    "en": {
      "hero": {
        "title": "Hoop Dream",
        "sub": "A career simulation that runs from a neighbourhood court at twelve through to retirement — and the production pipeline that wrote down what the world looks like before the asset batches."
      },
      "roleVal": "Designer, art director and technical director, through an AI production pipeline",
      "timeVal": "2026 · playable, self-labelled DEMO v0.6",
      "teamVal": "Solo",
      "toolsVal": "Phaser · TypeScript · Vite · Tailwind · Vitest · Claude Code · Codex",
      "ch": {
        "label": "The problem",
        "title": "Generating the art is cheap. Making it agree is not.",
        "p": "A career-simulation RPG needs hundreds of assets — portraits, scenes, story CGs, UI icons, court diagrams — before it reads as one world rather than a folder of pictures. Generation removed the cost of producing them and left the harder problem completely intact: every image can pass the rules on its own, and what is wrong with the set only shows once they sit on the same screen, by which point there are 299 specs on the registry to reconcile."
      },
      "re": {
        "label": "Groundwork",
        "title": "Deciding what the world is, and what it is not.",
        "m1": {
          "t": "Art bible",
          "b": "Three reference documents — pixel players, organic scenes, flat logos — split by canvas size and written before the asset batches. Their forbidden lists went into the prompt templates as negative prompts."
        },
        "m2": {
          "t": "Reference teardown",
          "b": "NBA 2K MyCareer for the career arc, Punch Club for attribute decay, New Star Soccer for life outside the game, Stardew Valley for daily-loop satisfaction. Naming what to borrow from each kept the scope from becoming 'a basketball game'."
        },
        "m3": {
          "t": "A rejected list",
          "b": "Photoreal, 3D, anime, neon, random text, real trademarks. Written down as out of bounds, because a generator produces all of them happily on a slightly different prompt."
        },
        "quote": "Avoid photo realism and dramatic cinematic lighting.",
        "quoteWho": "The art bible, scenes-organic.md"
      },
      "sy": {
        "label": "System concept",
        "title": "What a script can check, and what only a person can.",
        "p": "The rules sit in two places: the art bible, and the prompt templates that carry its forbidden lists as negative prompts. A registry then logs each batch — 64 portraits, 40 scenes, 73 CGs, 72 UI icons, 18 court and tactics, 32 static VFX. A script checks that registry: names, unique keys, folders and, where a file exists, the PNG size read from its header. It cannot see style, so style review stayed manual, with the assets laid side by side against the art bible. The production log's own review line is printed by the generator script, so I do not count it as a review. The images behind the 299 registered specs are not yet verified."
      },
      "id": {
        "label": "Design decisions",
        "p": "A career from twelve to retirement runs on 146 discrete nodes in eight kinds — training, match, story, relationship, risk, reward, rest, legacy — rather than a simulated calendar, because calendar-based career sims spend most of their runtime on repetition and bury the interesting decisions in maintenance clicking. Action combinations carry consequences instead of just numbers: repeated training raises readiness while raising body risk and pressure and lowering team trust. The visual language is reverse-engineered from Anthropic's product design — warm parchment, terracotta accent, exclusively warm-toned neutrals — because a game about one person's whole life needed a surface that reads as unhurried rather than as a sports UI of cold blues. That derivation is stated in the design document; it is a transfer exercise, not an invention."
      },
      "pr": {
        "label": "How it got built",
        "p": "Claude Code and Codex wrote the implementation against a spec that was frozen first, which is what made the volume survivable — draft, contracts, seasons, off-season, retirement, New Game+ and tactical matches all landed as systems rather than as scripted scenes. Save data carries a schema version, so an old save is migrated rather than silently broken when a chapter lands. The discipline that mattered was not speed but sequencing: rules before output, every time."
      },
      "te": {
        "label": "Testing and iteration",
        "p": "355 test files and 1,975 tests cover the career, contract, injury, season and save systems. At this size that is a design constraint rather than a boast — without it, adding a chapter quietly breaks a contract rule three chapters earlier, and you find out from a player instead of from CI. The art pipeline went through its own iteration. Every logo passed the per-image rules, yet laid side by side they were variants of one template. That added two set-level rules to the logo bible and to its template's negative prompt: no shared shield-and-big-letters template, and no basketball seams on every logo."
      },
      "ou": {
        "label": "What it produced",
        "m1": {
          "label": "asset specs registered across six batches",
          "v": "299"
        },
        "m2": {
          "label": "Career",
          "v": "146 nodes → 10 chapters"
        },
        "m3": {
          "label": "Tests",
          "v": "355 files → 1,975 passing"
        },
        "p": "A publicly playable ten-chapter career sim, built on a pipeline whose style rules are written down rather than kept in my head. Evidence status — the game labels itself DEMO v0.6, and there has been no player research. Everything here is systems design and production discipline; whether the pacing works for someone who is not me is untested. The first load is also large and mobile QA is thin, which matters because a phone is where this audience would meet it."
      },
      "rf": {
        "label": "Reflection",
        "p": "The useful discovery was that the rejected list did more work than the positive description. 'Warm, simplified, flat symbolic UI' is an opinion two people can hold and still disagree about a specific image. 'Not photoreal, not 3D, not anime, not neon, no random text, no real trademarks' is a test — you can hand it to someone else and get the same answer. When production volume goes up, the rules that survive are the ones that can be checked without you in the room. They are still checked by a person, by eye: the only automated check in the pipeline reads the manifest, and the part a script can automate turned out to be exactly the part that is not style."
      }
    },
    "zh": {
      "hero": {
        "title": "Hoop Dream",
        "sub": "一段从 12 岁的小区球场一路打到退役的生涯模拟，以及那条在资产批次之前，先写下世界长什么样的生产管线。"
      },
      "roleVal": "设计、美术方向与技术方向由我定，通过一套 AI 生产管线实现",
      "timeVal": "2026 · 可玩，游戏自标 DEMO v0.6",
      "teamVal": "独立完成",
      "toolsVal": "Phaser · TypeScript · Vite · Tailwind · Vitest · Claude Code · Codex",
      "ch": {
        "label": "问题",
        "title": "生成美术已经很便宜了。让这么多张对得上，没有。",
        "p": "一个生涯模拟 RPG 需要几百张资产：头像、场景、剧情 CG、UI 图标、战术板，才撑得起「这是一个世界」，而不是「一个装图的文件夹」。生成把「做出来」的成本抹掉了，却把更难的那个问题原封不动地留下。每一张单看都能过规则，整组的毛病却要等同框才看得出来。到那时候，登记表上已经有 299 条规格要对照了。"
      },
      "re": {
        "label": "前期工作",
        "title": "先决定这个世界是什么，以及不是什么。",
        "m1": {
          "t": "美术圣经",
          "b": "三份参考文档：像素球员、有机场景、扁平队徽，按画布尺寸分开，写在资产批次之前。里面的禁止项写进了提示词模板，成了负面提示词。"
        },
        "m2": {
          "t": "参考拆解",
          "b": "生涯弧看 NBA 2K MyCareer，属性衰减看 Punch Club，场外生活看 New Star Soccer，日常循环的满足感看 Stardew Valley。先说清楚各自要借什么，scope 才没有膨胀成「做一个篮球游戏」。"
        },
        "m3": {
          "t": "一份拒绝清单",
          "b": "写实照片、3D、动漫、霓虹、随机文字、真实商标。明确写下来算出界：因为提示词稍微一变，生成器会很乐意把它们全给你。"
        },
        "quote": "避免写实照片感，也避免戏剧化的电影式打光。",
        "quoteWho": "美术圣经 scenes-organic.md"
      },
      "sy": {
        "label": "系统概念",
        "title": "脚本查得了什么，什么只能靠人看。",
        "p": "规则放在两处：美术圣经，以及把圣经里的禁止项写成负面提示词的提示词模板。登记表按批记下数量：头像 64、场景 40、CG 73、UI 图标 72、球场战术 18、静态特效 32。有一支脚本检查这份登记表，查命名、编号是否重复、目录；文件在的时候，再从 PNG 文件头读出宽高。脚本看不到风格，所以风格只能靠人工审查，把资产并排摆开，对照美术圣经看。生产日志里那行审查结论是生成脚本自己写进去的，我不把这行算作审查。登记在册的 299 条规格，背后的原图还没核实。"
      },
      "id": {
        "label": "设计决策",
        "p": "从 12 岁到退役的生涯，跑在 146 个离散节点上，分八种类型：训练、比赛、剧情、关系、风险、奖励、休息、传承，而不是模拟日历。因为以日历为单位的生涯模拟，大部分运行时间都花在重复上，真正有意思的决定被埋在维护性点击里。行动的组合留下的是后果，不只是数字：反复训练会抬高竞技状态，同时抬高身体风险和压力、拉低队友信任。视觉语言则是从 Anthropic 的产品设计反推出来的：羊皮纸底色、赤陶强调色、全部暖调中性色，因为一个讲「一个人的一生」的游戏，需要的表层是从容的，而不是一套塞满冷蓝的体育 UI。这个来源在设计文档里写明了：它是一次迁移练习，不是发明。"
      },
      "pr": {
        "label": "它是怎么被做出来的",
        "p": "Claude Code 与 Codex 按一份事先冻结的规格写实现，这也是这个体量能扛住的原因：选秀、合同、赛季、休赛期、退役、New Game+ 与战术比赛，全部是作为系统落地的，而不是写死的剧本。存档数据带 schema 版本号，所以新章节上线时旧存档会被迁移，而不是悄悄坏掉。真正起作用的纪律不是快，是顺序：规则永远写在产出之前。"
      },
      "te": {
        "label": "测试与迭代",
        "p": "355 个测试文件、1975 个测试，覆盖生涯、合同、伤病、赛季与存档系统。在这个体量下它是一个设计约束，不是拿来炫的：没有它，加一章会安静地弄坏三章之前的一条合同规则，而你会从玩家那里、而不是从 CI 那里知道。美术管线自己也迭代过一轮。每个队徽单看都过了逐张规则，并排一摆，却都是同一个模板的变体。于是队徽规范和对应模板的负面提示词里，多了两条管整组的规则。一条是不许大多数球队共用盾牌加大字母的模板，一条是不许每个队徽都放篮球接缝。"
      },
      "ou": {
        "label": "这个案例产出了什么",
        "m1": {
          "label": "条资产规格，分六批登记",
          "v": "299"
        },
        "m2": {
          "label": "生涯",
          "v": "146 个节点 → 10 章"
        },
        "m3": {
          "label": "测试",
          "v": "355 个文件 → 1975 个通过"
        },
        "p": "一个线上公开可玩、十章生涯的模拟游戏，风格规则都写成了文件，不靠我脑子里记着。证据状态：游戏自己标的是 DEMO v0.6，而且没有做过任何玩家研究。这里的一切都是系统设计与生产纪律；这套节奏对一个不是我的人管不管用，还没测过。另外首包偏大、移动端真机 QA 不足：这一点很要紧，因为这批玩家主要就是在手机上遇到它。"
      },
      "rf": {
        "label": "反思",
        "p": "真正有用的发现是：拒绝清单比正面描述做的功多。「温暖、简化、扁平的符号化 UI」是一个意见：两个人可以都同意这句话，然后对着同一张图吵起来。而「不要写实照片、不要 3D、不要动漫、不要霓虹、不要随机文字、不要真实商标」是一个检验：你可以把它交给别人，得到同一个答案。当生产体量上去之后，活下来的规则，是那些不需要你在场也能拿来检查的规则。但检查的还是人，靠眼睛看。管线里唯一的自动检查读的是资产清单，而脚本能自动化的那部分，恰好不属于风格。"
      }
    }
  }
};
