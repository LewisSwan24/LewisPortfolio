import type { CaseRecord } from "@/lib/cases/schema";

export const grasslandCase: CaseRecord = {
  "slug": "grassland",
  "status": "listed",
  "featuredOrder": 6,
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
    "auditNote": "Verified 430/430 test baseline and Chapter 1 scope."
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
  "interactiveDemo": {
    "id": "grassland-rules",
    "placement": "after-summary",
    "eyebrow": {
      "en": "Interactive prototype · Unified tactical grammar",
      "zh": "可操作活原型 · 五关统一命令语法与回滚链"
    },
    "title": {
      "en": "Verify five-mission control consistency & checkpoint restore",
      "zh": "验证五关共用语法与检查点因果恢复链"
    },
    "prompt": {
      "en": "Switch between Mission 1 and Mission 5, issue a shared directive, then trigger a checkpoint failure to see how players avoid replaying the whole chapter.",
      "zh": "切换第 1 到第 5 关并执行同套指令，随后触发一次检查点失败恢复，观察玩家如何避免因规则变更被迫重打整章。"
    },
    "takeaway": {
      "en": "Consistent command grammar keeps escalating tactical challenge fair without inventing per-level special buttons.",
      "zh": "五关锁死同一套指令语法，让难度真正落在战术判断而不是记特殊按钮上。"
    }
  },
  "processArtifacts": {
    "scrubber": {
      "eyebrow": {
        "en": "Process scrubber · Per-level patches vs unified data pipeline",
        "zh": "前后对比拉杆 · 关卡特例按钮 ↔ 数据驱动 20 Hz 全局引擎"
      },
      "title": {
        "en": "Unify ad-hoc mission controls into one immutable RTS grammar & single save chain",
        "zh": "把每关打补丁式的自动宏与特设按钮统一成不可变命令语法与单一存档链"
      },
      "summary": {
        "en": "Compare bespoke level-specific overrides against the five-mission data pipeline and deterministic checkpoint architecture.",
        "zh": "拉动对比早期破坏心智模型的特设按键方案与终版数据驱动 5 关 20 Hz 统一引擎。"
      },
      "beforeLabel": {
        "en": "Before · Ad-Hoc Per-Level Macros",
        "zh": "改造前 · 关卡特设快捷外挂"
      },
      "afterLabel": {
        "en": "After · Unified 20 Hz RTS Pipeline",
        "zh": "改造后 · 统一语法与快照链"
      },
      "wireframeId": "grassland-auto",
      "afterImage": {
        "src": "/projects/grassland/after-architecture.svg",
        "alt": {
          "en": "Grassland Iron Tide unified five-mission architecture showing chapter manifest, 20 Hz simulation clock, edge-docked HUD, and shared checkpoint restoration",
          "zh": "《草原铁潮》五关统一引擎架构图：章节清单数据驱动、20 Hz 固定逻辑钟与单一失败检查点恢复链"
        },
        "width": 800,
        "height": 500
      }
    },
    "quotes": {
      "eyebrow": {
        "en": "Playtest & architecture audit",
        "zh": "双分辨率通关与架构自查记录"
      },
      "title": {
        "en": "Structural invariants locked during five-mission RC acceptance",
        "zh": "五关本地 RC 连续通关中锁定的交互与状态守恒纪律"
      },
      "items": [
        {
          "id": "grassland-grammar-invariant",
          "category": "structure",
          "quote": {
            "en": "\"A mission may restrict which commands are available, never silently change what a click or key means.\"",
            "zh": "「关卡可以限制目前开放哪些命令，但绝不能暗中改写同一次点击或按键的含义。」"
          },
          "context": {
            "en": "Five-mission interaction ruleset & 430/430 unit test suite",
            "zh": "五关统一指令集与 430/430 自动化规则校验"
          },
          "friction": {
            "en": "Special per-level mechanics tempt designers to overload standard selection or command gestures.",
            "zh": "新关卡一旦增加机制，设计上最容易偷懒把旧键位改作特例功能。"
          },
          "decision": {
            "en": "Enforced one unified grammar (click, drag-box, Shift, Ctrl, right-click grid) across the chapter manifest.",
            "zh": "从章节 Manifest 到场景加载层锁死唯一操作语法，不留关卡特设后门。"
          }
        },
        {
          "id": "grassland-checkpoint-truth",
          "category": "trust",
          "quote": {
            "en": "\"If defeated units respawn on canvas while mission objective flags stay desynced, players lose trust immediately.\"",
            "zh": "「战败读档时只要画面人物回去了、背后任务状态却串了位，玩家立刻会对整场推演失去信任。」"
          },
          "context": {
            "en": "Mission 4 checkpoint restore & desktop two-resolution playthrough",
            "zh": "第四关检查点恢复与双分辨率完整实机推演"
          },
          "friction": {
            "en": "Decoupled UI counters and simulation timers split during pause and retry flows.",
            "zh": "独立维护界面状态与游戏计时器在暂停重开时极易分叉。"
          },
          "decision": {
            "en": "Bound pause, defeat causality, checkpoint snapshot, and unit arrays inside one 20 Hz simulation tick.",
            "zh": "将暂停、战败原因、检查点快照与单位状态收拢进同一条 20 Hz 模拟主循环与存档链。"
          }
        }
      ]
    },
    "microLoop": {
      "eyebrow": {
        "en": "Vector micro-loop · Unified RTS command grammar",
        "zh": "矢量交互微循环 · 统一指令语法与快照回滚"
      },
      "title": {
        "en": "Queue commands → Unified dispatch → Deterministic checkpoint rollback",
        "zh": "多单位指令排队 → 统一命令语法调度 → 失败快照无损回滚"
      },
      "summary": {
        "en": "Consistent selection and save-chain restoration keep five escalating missions predictable under a live clock.",
        "zh": "展示五关共用的编队指令语法如何在实时倒计时压力下保持状态可预期。"
      },
      "loopId": "grassland-rts",
      "steps": [
        {
          "label": { "en": "Box Queue", "zh": "框选排队" },
          "detail": {
            "en": "Box-selecting any mix of squads feeds one unified command queue across all five missions.",
            "zh": "任意框选不同兵种队伍均进入同一套命令队列，五关无特殊操作例外。"
          }
        },
        {
          "label": { "en": "Shared Grammar", "zh": "统一语法" },
          "detail": {
            "en": "Move, scout, and guard directives validate against one predictable rule table.",
            "zh": "移动、侦察与驻守指令遵循同一套规则校验，减少实时高压下的操作失误。"
          }
        },
        {
          "label": { "en": "Checkpoint Snap", "zh": "快照回滚" },
          "detail": {
            "en": "On mission failure, players restore cleanly from the saved checkpoint chain instead of restarting the chapter.",
            "zh": "任务失败后直接从单一存档链检查点恢复，无需被迫重头重打整章。"
          }
        }
      ]
    }
  },
  "designDecisions": [
    {
      "id": "single-command-grammar",
      "decisionTitle": {
        "en": "Enforce one command grammar across five missions instead of per-level special controls",
        "zh": "五关共用一套命令语法，宁少勿乱，拒绝关卡特例按键"
      },
      "humanTension": {
        "en": "Real-time strategy players manage multiple squads under a ticking clock; when designers patch in custom buttons or override selection rules for later levels, escalating challenge turns into interface betrayal.",
        "zh": "即时战略玩家在持续推进的倒计时下同时调度多支队伍；如果关卡一复杂就临时打补丁改按键或特例规则，所谓的「策略难度」就会偷换成「界面背叛」。"
      },
      "rejectedAlternatives": [
        {
          "option": {
            "en": "Per-mission custom shortcuts and bespoke UI buttons",
            "zh": "为每一关单独设计专属快捷按钮与特殊交互方式"
          },
          "flaw": {
            "en": "Forces players to unlearn muscle memory mid-chapter and obscures whether a mistake came from strategy or misread controls.",
            "zh": "迫使玩家在章节中途重学肌肉记忆，分不清失误究竟源于战术误判还是按错了新控件。"
          }
        },
        {
          "option": {
            "en": "Commercial-RTS command density (dozens of micro-abilities and stances)",
            "zh": "照搬商业 RTS 的高密度指令表与复杂姿态切换"
          },
          "flaw": {
            "en": "Overloads new browser players before core tactical timing and terrain reading ever register.",
            "zh": "在网页有限认知带宽内过载操作记忆，掩盖了真正的核心战术判断。"
          }
        }
      ],
      "chosenTradeoff": {
        "en": "Lock click, box-select, Shift add/remove, Ctrl grouping, and right-click commands into one immutable grammar—missions may restrict which commands are available, never change what an action means.",
        "zh": "将点击、框选、Shift 增减、Ctrl 编队与右键菜单锁定为不可变语法：关卡可以限制「开放哪些命令」，绝不允许篡改「同一操作意味着什么」。"
      },
      "residualCostOrRisk": {
        "en": "Offers fewer tactical verbs than full commercial RTS titles; rule consistency is verified by 430/430 tests and full playthroughs at two resolutions, while new-player learnability remains untested with outside players.",
        "zh": "战术指令广度低于大型商业 RTS；规则一致性已由 430/430 测试与双分辨率通关验证，但新玩家初见上手速度尚未做过外部试玩测试。"
      }
    },
    {
      "id": "fixed-camera-and-save-chain",
      "decisionTitle": {
        "en": "Pair a fixed battlefield camera with one unified failure-and-checkpoint save chain",
        "zh": "固定镜头保住主战场视野，并把失败原因与恢复收进同一条存档链"
      },
      "humanTension": {
        "en": "Crowded HUD chrome eats the playable map, while restarts that visually reset units without restoring exact mission flags shatter player trust after a hard defeat.",
        "zh": "堆满屏幕边缘的信息栏会挤压操作视野；而战败重来时若画面回去了、底层任务状态却串台，玩家会瞬间对整套系统丧失信任。"
      },
      "rejectedAlternatives": [
        {
          "option": {
            "en": "Restarting the whole stretch or chapter from scratch on defeat",
            "zh": "任务失败后直接退回关卡起点或章节开头重打"
          },
          "flaw": {
            "en": "Punishes tactical experimentation in longer missions like Mission 4 with repetitive early-game tedium.",
            "zh": "在第四关这类长线任务里会用重复劳动惩罚战术试错。"
          }
        },
        {
          "option": {
            "en": "Free camera zoom with floating mission-text overlays over the map",
            "zh": "开放自由缩放镜头并在战场中央浮动大段任务说明"
          },
          "flaw": {
            "en": "Text overlays block unit clicks under live pressure and zoom variability complicates HUD predictability.",
            "zh": "浮动文本会遮挡实时点击区，自由缩放也容易打散信息层级的一致预期。"
          }
        }
      ],
      "chosenTradeoff": {
        "en": "Fix camera zoom so the battlefield claims the largest screen area while objectives, minimap, and command grid sit cleanly on edges; pause, defeat reason, checkpoint, and unit restoration share one 20 Hz simulation save chain.",
        "zh": "锁定镜头倍率使主战场始终占最大面积，目标、小地图与命令格停在边缘；暂停、失败归因、检查点与单位状态全部写入同一条 20 Hz 模拟存档链。"
      },
      "residualCostOrRisk": {
        "en": "Gives up macro zoom-out inspection across large maps, local RC acceptance has not yet been mirrored identically on the live URL, and the Phaser web bundle carries a known size warning.",
        "zh": "放弃了大地图宏观缩放视角；五关完整验收来自本地 RC 记录（线上链接未跑同规格逐屏复验），且网页构建仍保留 Phaser 包体偏大的已知警告。"
      }
    },
    {
      "id": "manifest-lazy-load-over-mega-bundle",
      "decisionTitle": {
        "en": "Load Phaser atlases per mission via a data-driven manifest instead of preloading all five chapters",
        "zh": "以数据驱动章节 Manifest 按关按需加载图集与地图，拒绝首屏硬塞五关全量资源"
      },
      "humanTension": {
        "en": "Desktop web RTS players abandon a game if the first loading bar freezes for five chapters of spritesheets, yet late-game missions still need instant retry loops without re-fetching assets.",
        "zh": "桌面网页即时战略游戏最忌首屏加载卡死五关所有高分图集；但一旦进到长线关卡如第四、五关，战败后重开检查点又必须秒回战场。"
      },
      "rejectedAlternatives": [
        {
          "option": {
            "en": "Upfront boot preload of all five mission spritesheets and maps",
            "zh": "应用启动阶段一次性全量预下载五关地图与美术图集"
          },
          "flaw": {
            "en": "Front-loads initial bandwidth latency onto first-time Mission 1 visitors before any tactical verb is tested.",
            "zh": "把第 5 关的重资源塞给第 1 关初访玩家，大幅拉高首屏跳出率。"
          }
        },
        {
          "option": {
            "en": "Duplicate separate Phaser scene classes per mission file",
            "zh": "为第 1 至第 5 关复制五个高度相似却各自改写的 Phaser 场景类"
          },
          "flaw": {
            "en": "Bugfixes to unit box-selection or checkpoint restoration would need manual propagation across five codebases.",
            "zh": "任何框选、寻路与存档修复都得在五个孤立文件间重复同步，极易留下回归漏洞。"
          }
        }
      ],
      "chosenTradeoff": {
        "en": "Express missions 1–5 as typed manifest definitions consumed by a shared runtime scene loader: only the active mission's assets mount into memory while retries reset state purely via in-memory checkpoints.",
        "zh": "将第 1–5 关抽离为统一 Manifest 配置表，由单一运行时场景加载器按当前关卡懒加载地图与图集，战败读档直接在同关内存态瞬时复原。"
      },
      "residualCostOrRisk": {
        "en": "First-time chapter transitions still show a brief between-mission asset fetch, and the Phaser 4 runtime chunk itself continues to trigger standard Vite bundle-size warnings.",
        "zh": "切入下一新关卡时仍会有短促的资源切换缓冲，且 Phaser 4 运行时本体仍然会触及构建产物体积提示阈值。"
      }
    }
  ],
  "card": {
    "en": {
      "kicker": "Complex Systems · Real-Time Strategy",
      "title": "Grassland Iron Tide",
      "sub": "A five-mission browser RTS chapter keeping selection grammar, battlefield sightlines, and defeat recovery strictly unified.",
      "role": "Solo · Systems design, specs & QA sign-off",
      "date": "2026 · Chapter One playable",
      "m1": "Immutable 5-mission command model",
      "m2": "TypeScript · Phaser 4 · 20 Hz Sim",
      "m3": "430/430 tests · Dual-res playthrough"
    },
    "zh": {
      "kicker": "复杂系统 · 即时战略交互",
      "title": "草原铁潮",
      "sub": "五关连玩的桌面浏览器即时战略章节：严守跨关不漂移的控制语法与单一检查点恢复链，让高节奏战局始终可控。",
      "role": "独立产品策划、规则架构与全流程验收",
      "date": "2026 · 第一章可连续通关",
      "m1": "跨五关统一框选与指令手感",
      "m2": "TypeScript · Phaser 4 · 20 Hz 时钟",
      "m3": "430/430 单测 + 双分辨率连续通关"
    }
  },
  "narrative": {
    "en": {
      "hero": {
        "title": "Grassland Iron Tide",
        "sub": "Five historical missions built into one real-time strategy chapter you can play through in a desktop browser, where selection, commands, feedback, failure recovery and story all run on one set of rules."
      },
      "roleVal": "Solo: product direction, mission design, interaction rules, implementation acceptance and evidence",
      "timeVal": "2026 · Chapter One: Embers of the Pale Wolf (playable)",
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
