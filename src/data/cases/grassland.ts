import type { CaseRecord } from "@/lib/cases/schema";

export const grasslandCase: CaseRecord = {
  "slug": "grassland",
  "status": "listed",
  "roleTracks": [
    "interaction",
    "design-eng"
  ],
  "workSummary": {
    "order": 5,
    "tags": ["flag", "ai"],
    "year": "2026",
    "dur": "Chapter one playable",
    "problem": {
      "en": "Many units, many commands and a running clock, where one inconsistent rule makes the whole game unpredictable",
      "zh": "单位多、命令多、时钟一直在走，一条规则不一致，整个游戏就不可预测"
    },
    "changed": {
      "en": "One command grammar across five missions, and failure restored from one save chain",
      "zh": "五关共用一套命令语法，失败后从同一条存档链恢复"
    }
  },
  "reviewMeta": {
    "reviewedAt": "2026-11-21",
    "nextReviewAt": "2027-02-21",
    "auditNote": "Verified 430/430 test baseline and Chapter 1 scope for V3.1 baseline."
  },
  "cover": {
    "src": "/projects/grassland/03-mission-02.jpg",
    "width": 1280,
    "height": 720,
    "alt": {
      "en": "Mission two: resources, unit status and objectives around a battlefield that fills most of the screen",
      "zh": "第二关：资源、人物状态与目标围在四周，主战场占据大部分画面"
    },
    "fit": "cover"
  },
  "links": [
    {
      "label": "Play chapter one",
      "href": "https://onon-wolf-iron-tide.vercel.app",
      "external": true
    }
  ],
  "media": {
    "label": "The chapter, played through",
    "labelZh": "整章打下来的样子",
    "blurb": "Screenshots of the chapter-one build, from the strategic map through the missions to the chapter-complete screen.",
    "blurbZh": "第一章构建的截图，从战略地图、各关战斗，到整章完成的画面。",
    "images": [
      {
        "src": "/projects/grassland/02-strategic-map.jpg",
        "width": 1280,
        "height": 720,
        "alt": "The five-mission strategic map of chapter one",
        "altZh": "第一章的五关战略地图",
        "caption": "The strategic map shows progress, sets out the chapter and is the way back into a mission to replay it.",
        "captionZh": "五关战略地图同时承担进度展示、章节结构与重玩入口。"
      },
      {
        "src": "/projects/grassland/03-mission-02.jpg",
        "width": 1280,
        "height": 720,
        "alt": "Mission two: resources, unit status and objectives around a battlefield that fills most of the screen",
        "altZh": "第二关：资源、人物状态与目标围在四周，主战场占据大部分画面",
        "caption": "Mission two. Resources, unit status and objectives are all on screen, and the battlefield still takes the largest area.",
        "captionZh": "第二关：资源、人物状态与目标同时存在，主战场仍占最大视觉面积。"
      },
      {
        "src": "/projects/grassland/04-mission-03.jpg",
        "width": 1280,
        "height": 720,
        "alt": "Mission three: a box-selected group of units with combat information",
        "altZh": "第三关：框选的一队单位与战斗信息",
        "caption": "Mission three. Box-select, grouping and combat information use the same controls as every other mission.",
        "captionZh": "第三关：框选、编队与战斗信息沿用同一套操作，没有为单关另造规则。"
      },
      {
        "src": "/projects/grassland/05-checkpoint.jpg",
        "width": 1280,
        "height": 720,
        "alt": "Mission four's failure screen offering to restore from a checkpoint",
        "altZh": "第四关失败画面，提供从检查点恢复",
        "caption": "After a failure in mission four, a checkpoint restore spares the player the whole stretch again.",
        "captionZh": "第四关失败后有明确的检查点恢复，玩家不用重走整段流程。"
      },
      {
        "src": "/projects/grassland/06-night-ford.jpg",
        "width": 1280,
        "height": 720,
        "alt": "Mission five, the night ford",
        "altZh": "第五关夜渡",
        "caption": "Mission five, the night ford: hiding, searching the camp, the packs and the way home run on one mission state.",
        "captionZh": "第五关夜渡：隐蔽、搜营、行囊与返家目标串在同一条任务状态链上。"
      },
      {
        "src": "/projects/grassland/07-chapter-complete.jpg",
        "width": 1280,
        "height": 720,
        "alt": "The strategic map with all five missions complete",
        "altZh": "五关全部完成后的战略地图",
        "caption": "The map after all five missions. Its completed state comes from the real results and save data, not a static mock-up.",
        "captionZh": "五关完成后的战略地图。完成状态来自实际结算与存档数据，不是静态演示图。"
      }
    ]
  },
  "card": {
    "en": {
      "kicker": "Complex interaction · Real-time systems",
      "title": "Grassland Iron Tide",
      "sub": "A five-mission browser RTS chapter where selection, command grammar, and checkpoint recovery follow one consistent mental model.",
      "role": "Solo, with AI tools",
      "date": "2026 · chapter one playable",
      "m1": "Unified RTS command grammar",
      "m2": "Single checkpoint recovery chain",
      "m3": "Two-resolution desktop playthrough"
    },
    "zh": {
      "kicker": "复杂交互 · 即时操作心智模型",
      "title": "草原铁潮",
      "sub": "一章五关、在桌面浏览器运行的即时战略游戏：用统一的操作语法与单一检查点状态链，让玩家越往后越笃定。",
      "role": "独立设计，借助 AI 工具开发",
      "date": "2026 · 第一章可玩",
      "m1": "跨五关一致的命令语法",
      "m2": "统一检查点状态还原链",
      "m3": "双分辨率实机连续通关"
    }
  },
  "narrative": {
    "en": {
      "hero": {
        "title": "Grassland Iron Tide",
        "sub": "Five historical missions built into one real-time strategy chapter you can play through in a desktop browser, where selection, commands, feedback, failure recovery and story all run on one set of rules."
      },
      "roleVal": "Solo: product direction, mission design, interaction rules, implementation acceptance and evidence",
      "timeVal": "2026 · chapter one, 《苍狼余火》, playable",
      "teamVal": "Solo, with AI tools assisting the code, the copy and the original assets",
      "toolsVal": "TypeScript · Phaser 4 · EasyStar.js · Vitest · AI coding tools",
      "ch": {
        "label": "The problem",
        "title": "Keeping a command system from getting out of hand.",
        "p": "A real-time strategy game gives the player many units, many commands and a clock that does not stop. Each mission wants something a little different, and the easy answer is a special rule for each one. Five missions later the player can no longer predict what a click will do. Failure is the other trap: if the screen comes back after a defeat but the mission state does not, the player stops trusting anything the game shows."
      },
      "re": {
        "label": "Groundwork",
        "title": "Three rules every mission follows.",
        "m1": {
          "t": "One grammar",
          "b": "Click, box-select, Shift to add or remove, Ctrl to group and a right-click command menu cover all five missions. A mission may restrict which commands are allowed; it may not change how they work."
        },
        "m2": {
          "t": "The battlefield first",
          "b": "A fixed camera zoom. The objective, minimap, selection state and command grid sit at the screen edges, and mission text stays off the area the player acts on."
        },
        "m3": {
          "t": "One save chain",
          "b": "Pause, the reason for failure, the checkpoint and the restored units share one save chain, so what the screen shows and what the mission knows cannot drift apart."
        }
      },
      "sy": {
        "label": "System concept",
        "title": "Five missions, one pipeline.",
        "p": "The missions are data, not separate programs. A chapter manifest sets the order and the unlocks; each mission definition holds its objectives, triggers and map; a runtime loader brings in only that mission's atlases and map, so the first screen does not preload the heavy assets of all five. Underneath, one simulation runs at a fixed 20 Hz, and input, combat, movement, mission logic and vision all share its clock. Checkpoints and saves restore the mission and its units together."
      },
      "id": {
        "label": "Design decisions",
        "p": "I chose far fewer commands than a commercial RTS, so that every command has a result the player can predict. The fixed camera keeps the battlefield the largest part of the screen, even when resources, unit status and objectives are all showing. Failure had to explain itself and be undone: after a defeat in mission four, a checkpoint restore spares the player the whole stretch again. The main menu shows only the chapter, the save state and the way in, with nothing from development left on screen."
      },
      "pr": {
        "label": "How it got built",
        "p": "This is a solo project. AI tools assisted the code, the copy and the original assets; my part was the product direction, the mission design, the interaction rules, accepting or rejecting the implementation, and keeping the evidence. The asset pipeline is held to the same standard as the code: 6 manifests and 75 registered assets, with 49 alpha files and 154 provenance records that a script can re-check."
      },
      "te": {
        "label": "Testing and iteration",
        "p": "The release-candidate audit puts four checks side by side. 430 of 430 automated tests pass over mission logic, commands, movement, vision, checkpoints and the runtime asset contract. The asset gate passes. The web build passes, with a known warning that the Phaser bundle is large. And in a real browser, at 1280×720 and 1920×1080, all five missions were played through in sequence from the main menu, re-checking selection, grouping, commands, pause, the minimap and failure recovery, screen by screen for page scroll, clipping and covered buttons."
      },
      "ou": {
        "label": "What it produced",
        "m1": {
          "label": "Missions in chapter one",
          "v": "5"
        },
        "m2": {
          "label": "Tests in the RC record",
          "v": "430 / 430"
        },
        "m3": {
          "label": "Resolutions played through",
          "v": "1280×720 · 1920×1080"
        },
        "p": "A chapter that plays end to end in a desktop browser, with one command grammar across every mission. Evidence status: the five-mission acceptance comes from the local RC record, and the live link has not been through the same audit. These are system and browser checks. There has been no structured usability testing with outside players, so the case does not claim the game is easy to pick up."
      },
      "rf": {
        "label": "Reflection",
        "p": "What the record can show is that chapter one plays through in the local RC build, and that the interaction logic and asset contracts it covers did not regress. A rule like 'a mission may restrict commands but never change them' can be held by a test, so the fifth mission is checked against the same grammar as the first. What the record cannot show is whether a new player learns that grammar. Without structured sessions with outside players, I do not present the chapter as proven easy to pick up."
      }
    },
    "zh": {
      "hero": {
        "title": "草原铁潮",
        "sub": "把五段历史任务做成一章能在桌面浏览器里连续通关的即时战略游戏。选择、命令、反馈、失败恢复和剧情推进，都走同一套规则。"
      },
      "roleVal": "独立项目：负责产品方向、任务设计、交互规则、实现验收与证据整理",
      "timeVal": "2026 · 第一章《苍狼余火》可玩",
      "teamVal": "独立完成；代码、文案与原创资产由 AI 工具辅助生产",
      "toolsVal": "TypeScript · Phaser 4 · EasyStar.js · Vitest · AI 编码工具",
      "ch": {
        "label": "问题",
        "title": "防止命令系统失控。",
        "p": "即时战略游戏同时交给玩家很多单位、很多命令，时钟还一直在走。每一关想要的东西都有点不同，最省事的做法是给每关加一条特殊规则。可五关下来，玩家就再也猜不到点一下会发生什么。失败是另一个坑：战败后画面恢复了，任务状态却没恢复，玩家就不再相信游戏显示的任何东西。"
      },
      "re": {
        "label": "前期工作",
        "title": "五关都要守的三条规则。",
        "m1": {
          "t": "一套语法",
          "b": "点击、框选、Shift 增减选择、Ctrl 编队和右键命令菜单覆盖五关。任务可以限制允许哪些命令，不能改变命令的用法。"
        },
        "m2": {
          "t": "战场优先",
          "b": "固定镜头倍率。主目标、迷你地图、选择状态与命令格放在屏幕边缘，任务文本不遮挡玩家操作的区域。"
        },
        "m3": {
          "t": "一条存档链",
          "b": "暂停、失败原因、检查点与恢复后的单位共享同一条存档链，屏幕显示的和任务记得的不会各走各的。"
        }
      },
      "sy": {
        "label": "系统概念",
        "title": "五关，一条管线。",
        "p": "五关是数据，不是五个各自独立的程序。章节 manifest 定顺序与解锁，每关的任务定义写目标、触发和地图。运行时加载器只载入这一关的图集和地图，首屏不预载五关全部重资产。底层是一个固定 20 Hz 的模拟，输入、战斗、移动、任务逻辑和视野共用这个时钟。检查点和存档把任务与单位一起恢复。"
      },
      "id": {
        "label": "设计决策",
        "p": "我选了比商业 RTS 少得多的命令，换来每条命令的结果玩家都能预料。固定镜头让主战场始终占屏幕最大的面积，资源、人物状态和目标同时在屏上时也一样。失败要看得懂，也要能撤回：第四关战败后，检查点恢复让玩家不用重走整段流程。主菜单只留章节、存档状态和开始入口，不把开发期的信息留在画面上。"
      },
      "pr": {
        "label": "怎么做出来的",
        "p": "这是独立项目。代码、文案和原创资产由 AI 工具辅助生产；我负责产品方向、任务设计、交互规则、实现验收和证据整理。资产管线和代码用同一个标准：6 份 manifest、75 项登记资产，49 个 alpha 文件与 154 条来源记录都能由脚本重复核对。"
      },
      "te": {
        "label": "测试与迭代",
        "p": "发布候选版的审计把四项检查放在一起。430 / 430 个自动化测试通过，覆盖任务逻辑、命令、移动、视野、检查点和运行时资源契约。资产闸门通过。网页构建通过，保留 Phaser 主包偏大的已知警告。在真实浏览器里，以 1280×720 和 1920×1080 两种分辨率从主菜单连续打完五关，复验选择、编队、命令、暂停、迷你地图与失败恢复，并逐屏检查页面滚动、内容裁切和按钮遮挡。"
      },
      "ou": {
        "label": "产出与边界",
        "m1": {
          "label": "第一章关卡数",
          "v": "5"
        },
        "m2": {
          "label": "RC 记录中的测试",
          "v": "430 / 430"
        },
        "m3": {
          "label": "通关验证的分辨率",
          "v": "1280×720 · 1920×1080"
        },
        "p": "一章能在桌面浏览器里连续通关的游戏，五关共用一套命令语法。证据状态：五关验收来自本地 RC 记录，在线链接没有经过同样的审计。这些都是系统层面和浏览器层面的检查。没有外部玩家的结构化可用性测试，所以这个案例不说游戏容易上手。"
      },
      "rf": {
        "label": "反思",
        "p": "现有记录能证明的，是第一章在本地 RC 环境里能连续通关，已覆盖的交互逻辑和资产契约没有退化。「任务可以限制命令，但不能改变命令」这样的规则，测试守得住，第五关和第一关就按同一套语法核对。记录证明不了的，是新玩家能不能学会这套语法。没有外部玩家的结构化可用性测试，我不把这一章说成已证明容易上手。"
      }
    }
  }
};
