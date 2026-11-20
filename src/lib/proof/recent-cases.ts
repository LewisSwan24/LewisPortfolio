/**
 * Proof data for the two cases added on 2026-11-20, kept in one file so the
 * maps in case-depth.ts and matrix.ts only spread them in.
 *
 * Sources, and nothing beyond them:
 * - Grassland Iron Tide: the portfolio PDF's case six (pp. 32-35), which is
 *   drawn from the chapter-one RC audit, the two-resolution browser captures,
 *   the test run and the asset-gate record.
 * - On The Beat: the portfolio PDF's case nine (pp. 42-43) and the fact sheet
 *   `_verify-on-the-beat-2026-09-29.md`, section 12 of which lists what may not
 *   be written: that Lewis wrote the firmware, any participant or wear test,
 *   haptics or vibration, and that the concept was his.
 */
import type {
  CaseDepth,
  CaseInterviewPack,
  CaseInterviewPrompt,
  CaseInterviewScan,
  CaseSummary,
  ProofLocale,
} from "./types";

type RecentSlug = "grassland" | "onthebeat";

export const recentCaseSummaries: Record<ProofLocale, Record<RecentSlug, CaseSummary>> = {
  en: {
    grassland: {
      challenge:
        "A real-time strategy game hands the player many units, many commands and a clock that keeps running. If each mission invents its own controls, or a failure leaves the screen and the mission state disagreeing, the command system stops being predictable.",
      role: "Solo project: product direction, mission design, interaction rules, implementation acceptance and evidence, with AI tools assisting the code, the copy and the original assets",
      methods: ["interaction grammar", "information hierarchy on a fixed camera", "checkpoint and save design", "data-driven mission pipeline", "two-resolution browser acceptance"],
      evidence: [
        "430 of 430 automated tests passing in the release-candidate audit record",
        "all five missions played through from the main menu in a real browser at 1280×720 and 1920×1080",
        "an asset gate over 6 manifests and 75 registered assets, with 49 alpha files and 154 provenance records checked by script",
      ],
      outcome:
        "Chapter one, five missions, playable end to end in a desktop browser, with one command grammar across every mission and a checkpoint that restores the mission and its units from one save chain.",
      next: "Structured usability sessions with outside players, to find out whether the controls are learnable rather than only consistent.",
    },
    onthebeat: {
      challenge:
        "At a live gig, two strangers who want to talk have no low-stakes way to start. A phone app that asks them to stare at a screen works against the point, so the devices have to start the conversation and then get out of the way.",
      role: "Individual version of DECO3500 coursework. I extended a teammate's three-card Figma prototype into a working system with AI tools: I set the requirements, reviewed the output, chased the errors and paired the real wristbands",
      methods: ["requirement setting", "AI output review", "hardware pairing on real devices", "two-sided consent flow", "cloud relay"],
      evidence: [
        "two real wristbands, a StickS3 and a StickC Plus, showing MEET at the same time through the cloud relay on 25 September 2026",
        "65 minutes from my message that nothing ran without a laptop to the two wristbands matching through Fly.io",
        "the Claude Design canvas sent back for rework at least 5 times that night, after at least 12 rounds on the earlier Say Hello canvas",
      ],
      outcome:
        "A phone app, two wristbands and an always-on relay that run without a laptop. Names and the meeting place appear only after both people have agreed.",
      next: "Participant sessions at a real or staged gig, and wearing the bands to measure the timing values that are still estimates.",
    },
  },
  zh: {
    grassland: {
      challenge:
        "即时战略游戏同时交给玩家很多单位、很多命令，时钟还一直在走。如果每一关各造一套操作，或者失败后画面和任务状态对不上，命令系统就不再可预测。",
      role: "独立项目：负责产品方向、任务设计、交互规则、实现验收与证据整理；代码、文案与原创资产由 AI 工具辅助生产",
      methods: ["交互语法", "固定镜头下的信息层级", "检查点与存档设计", "数据驱动的任务管线", "双分辨率浏览器验收"],
      evidence: [
        "RC 审计记录中 430 / 430 个自动化测试通过",
        "在真实浏览器里以 1280×720 和 1920×1080 两种分辨率，从主菜单连续打完五关",
        "资产闸门覆盖 6 份 manifest、75 项登记资产，脚本核对 49 个 alpha 文件与 154 条来源记录",
      ],
      outcome: "第一章五关可以在桌面浏览器里连续通关。五关共用一套命令语法，检查点从同一条存档链同时恢复任务和单位。",
      next: "找外部玩家做结构化可用性测试，确认这套操作是否好学，而不只是前后一致。",
    },
    onthebeat: {
      challenge:
        "在现场演出里，两个想搭话的陌生人缺一个没有压力的开头。要他们盯着手机的 App 反而违背初衷，所以设备要负责开口，然后退到一边。",
      role: "课程作业 DECO3500 的个人版本。我用 AI 工具把组员的三张卡 Figma 原型扩成可运行的系统：我定需求、审查输出、排查错误，并在真手环上配对实测",
      methods: ["需求设定", "AI 输出审查", "真机硬件配对", "双方同意的流程", "云端 relay"],
      evidence: [
        "2026 年 9 月 25 日，两支真手环（StickS3 与 StickC Plus）经云端 relay 同时显示 MEET",
        "从我说没有电脑就跑不起来，到两支手环经 Fly.io 对上，共 65 分钟",
        "当晚把 Claude Design 画布打回返工至少 5 次；此前的 Say Hello 画布至少 12 轮",
      ],
      outcome: "手机 App、两支手环和一台常开的 relay，不需要笔电就能运转。双方都同意之后，才会互相看到名字和碰面地点。",
      next: "在真实或模拟的演出现场做参与者测试，并佩戴手环实测那些仍是估计值的时间参数。",
    },
  },
};

export const recentCaseDepth: Record<ProofLocale, Record<RecentSlug, CaseDepth>> = {
  en: {
    grassland: {
      decisions: [
        {
          label: "One grammar for selection and commands",
          choice: "Click, box-select, Shift to add or remove, Ctrl to group and a right-click command menu work the same in all five missions; a mission may only restrict which commands are allowed.",
          evidence: "The third mission's box-select, grouping and combat information reuse the same controls rather than a rule made for that mission.",
          tradeoff: "Far fewer commands than a commercial RTS, in exchange for every command having a predictable result.",
          impact: "A player who learns the controls in mission one does not have to relearn them in mission four.",
        },
        {
          label: "The battlefield gets the screen",
          choice: "A fixed camera zoom, with the objective, minimap, selection state and command grid at the screen edges, and mission text kept off the playable area.",
          evidence: "Checked screen by screen at 1280×720 and 1920×1080: no page scroll, clipped content or covered key buttons.",
          tradeoff: "A fixed zoom gives up the overview a zoomable camera would offer.",
          impact: "Resources, unit state and objectives can all be on screen while the battlefield still takes the largest area.",
        },
        {
          label: "Failure that explains itself and can be undone",
          choice: "Pause, the reason for failure, the checkpoint and the restored units share one save chain.",
          evidence: "After a failure in mission four, a clear checkpoint restore spares the player from replaying the whole stretch.",
          tradeoff: "Every new mission state has to be written into the save chain, not only drawn on screen.",
          impact: "It avoids the split where the picture looks restored but the mission state is not.",
        },
      ],
      evidence: [
        {
          method: "Automated tests",
          sample: "430 tests in the RC audit record",
          question: "Do mission logic, commands, movement, vision, checkpoints and the runtime asset contract still hold?",
          finding: "430 of 430 passed in the RC record.",
          implication: "The covered behaviour did not regress; it says nothing about behaviour no test covers.",
        },
        {
          method: "Asset gate (verify:rts-art)",
          sample: "6 manifests, 75 registered assets, 49 alpha files, 154 provenance records",
          question: "Can a script re-check every manifest, file path, atlas size, alpha channel and source record?",
          finding: "The gate passed in the RC record.",
          implication: "The asset contract can be re-checked by anyone; how the art looks is still judged by eye.",
        },
        {
          method: "Real-browser playthrough",
          sample: "Five missions at two desktop resolutions",
          question: "Can the chapter be finished from the main menu without a dead end?",
          finding: "All five missions were completed in sequence, re-checking selection, grouping, commands, pause, minimap and failure recovery.",
          implication: "The chapter works end to end in the local RC build; it is not evidence that players find it easy.",
        },
      ],
      iterations: [
        {
          version: "Mission pipeline",
          change: "Five missions driven by one data and runtime pipeline: chapter manifest, mission definitions, runtime asset loading, a fixed 20 Hz simulation, then checkpoint and save.",
          reason: "So no mission needs its own rules, and input, combat, movement, mission logic and vision share one clock.",
          improvement: "Each mission loads its own atlases and map; the first screen does not preload the heavy assets of all five.",
        },
        {
          version: "Release candidate",
          change: "An RC audit pairing the test run, the asset gate and the web build with a full playthrough at two resolutions.",
          reason: "To keep what a script checks apart from what only a run in a real browser can show.",
          improvement: "430/430 tests, a passing asset gate and web build, and a full chapter at both resolutions, with the large Phaser bundle warning kept on record.",
        },
      ],
      limits: [
        {
          constraint: "No structured usability testing with outside players.",
          whyItMatters: "Consistent controls are not the same as learnable controls, so the case cannot claim the game is easy to pick up.",
          nextValidation: "Run sessions with outside players and record where they get stuck in the first two missions.",
        },
        {
          constraint: "The five-mission acceptance comes from the local RC record, not from the live deployment.",
          whyItMatters: "The live link opens, but it has not been through the same audit.",
          nextValidation: "Repeat the two-resolution playthrough on the deployed build and date it.",
        },
        {
          constraint: "The web build passes with a known warning that the Phaser bundle is large.",
          whyItMatters: "A large bundle can slow the first load of a game opened from a link, and that has not been measured.",
          nextValidation: "Measure the first load and split the bundle before claiming anything about load performance.",
        },
      ],
      takeaway:
        "In a real-time game the design work is mostly rules: one grammar for commands, one place for information and one save chain for failure, each written so that a test or a browser run can check it.",
    },
    onthebeat: {
      decisions: [
        {
          label: "The wristband can change state on its own",
          choice: "On 24 September I asked for the link to work both ways: a band should switch state without the phone, not only follow it.",
          evidence: "The design document was written that day. At noon on 25 September only the phone could still drive the band; that afternoon the side button chose a card and the phone followed.",
          tradeoff: "Two-way control means two places that can change state, so both have to agree through the relay.",
          impact: "The band is a second way in, not a remote display for the phone.",
        },
        {
          label: "MEET cannot be mock data",
          choice: "On 25 September I pointed out that MEET was only simulated and asked for a real wave and wave-back between two devices.",
          evidence: "That night, two devices paired with two bands: one waved, the other waved back, and both bands showed MEET at the same time.",
          tradeoff: "Real coordination needs a relay both devices can reach, which a mock never did.",
          impact: "The match screen now reflects two people agreeing, not a scripted result.",
        },
        {
          label: "It has to run without a laptop",
          choice: "The same evening I said that without a computer neither device could run, and asked for that to be fixed at once.",
          evidence: "The relay moved to Fly.io in Sydney on one always-on machine. The bands matched through the cloud 65 minutes after my message.",
          tradeoff: "An always-on cloud machine is a running cost and a dependency a laptop on the table did not have.",
          impact: "The laptop is out of the loop, which is the precondition for taking it to a venue.",
        },
        {
          label: "Review the AI canvas and catch its errors",
          choice: "I imported each Claude Design canvas into Claude Code for review and sent it back when something was wrong.",
          evidence: "I caught all four cards reading '1 of 4' on 15 September, and on 21 September what looked like a black screen after picking a song.",
          tradeoff: "Review rounds take time a single generated canvas would not.",
          impact: "At least 5 rounds on the On The Beat canvas that night, and at least 12 on the earlier Say Hello canvas.",
        },
      ],
      evidence: [
        {
          method: "Pairing on real hardware",
          sample: "Two bands: StickS3 and StickC Plus",
          question: "Do both bands reach MEET together without a laptop?",
          finding: "On 25 September both showed MEET at the same time through the cloud relay.",
          implication: "The link works end to end on real devices; it was paired and checked by me, not used by participants.",
        },
        {
          method: "Two test windows",
          sample: "Two local test windows, Ava and Leo, on the 29 September build",
          question: "Does either side see a name before both have agreed?",
          finding: "A wave shows only that someone nearby is there; names and the meeting place appear after both nod.",
          implication: "The consent rule holds in the flow I walked; no one else has walked it.",
        },
        {
          method: "Canvas review",
          sample: "At least 5 review rounds on the On The Beat canvas, at least 12 on Say Hello",
          question: "Does the generated canvas behave the way the cards describe?",
          finding: "It did not at first: all four cards read '1 of 4', and picking a song appeared to black out the screen.",
          implication: "Generated design needs a reviewer who tests it, not only one who looks at it.",
        },
      ],
      iterations: [
        {
          version: "Wristband control",
          change: "From the phone driving the band one way to the band's side button choosing a card that the phone follows.",
          reason: "My 24 September requirement that the band work without the phone.",
          improvement: "Retested at noon on 25 September and still one-way; working two ways that afternoon.",
        },
        {
          version: "Relay",
          change: "From a relay on my laptop to an always-on machine on Fly.io in Sydney.",
          reason: "Without the laptop neither device could run.",
          improvement: "Two bands matched through the cloud 65 minutes after I raised it.",
        },
      ],
      limits: [
        {
          constraint: "There is no record of any participant testing the app.",
          whyItMatters: "Whether the cards make two strangers start talking is the point of the project, and it is untested.",
          nextValidation: "Run a staged gig session with pairs of participants and observe whether they meet.",
        },
        {
          constraint: "The bands' timing values, such as staying awake for six seconds or a 1.5-second long press, are estimates.",
          whyItMatters: "Timings that feel wrong on a wrist would undo the flow at a real gig.",
          nextValidation: "Wear the bands and measure the timings in use.",
        },
        {
          constraint: "The firmware and app code were written and flashed by Claude Code. I did the wiring, the hotspot, the button presses and the feedback.",
          whyItMatters: "The case cannot be read as hand-written code. In September I was new to hardware and needed each step explained first.",
          nextValidation: "Keep the authorship line in every telling of this case.",
        },
        {
          constraint: "Some paths are unverified: a night on battery, the Plus's front button, a wave-back pressed on the band itself, and the iPhone clip that disappeared on 6 October and was not retested after the fix.",
          whyItMatters: "Each is a place a real evening could fail.",
          nextValidation: "Retest each path on the devices and record the result with its date.",
        },
      ],
      takeaway:
        "My part was deciding what the system had to do and refusing outputs that only looked done: mock data, a laptop in the loop and a canvas that counted wrong.",
    },
  },
  zh: {
    grassland: {
      decisions: [
        {
          label: "选择与命令共用一套交互语法",
          choice: "点击、框选、Shift 增减选择、Ctrl 编队和右键命令菜单在五关里用法相同；任务只能限制允许哪些命令。",
          evidence: "第三关的框选、编队与战斗信息沿用同一套操作，没有为单关另造规则。",
          tradeoff: "命令数量远少于商业 RTS，换来每条命令的结果都可预测。",
          impact: "在第一关学会的操作，到第四关不用重学。",
        },
        {
          label: "信息层级服从战场视野",
          choice: "固定镜头倍率，主目标、迷你地图、选择状态与命令格放在屏幕边缘，任务文本不遮挡可操作区域。",
          evidence: "在 1280×720 和 1920×1080 下逐屏检查，没有页面滚动、内容裁切或关键按钮遮挡。",
          tradeoff: "固定倍率放弃了可缩放镜头的全局视角。",
          impact: "资源、人物状态和目标同时在屏上时，主战场仍占最大面积。",
        },
        {
          label: "失败要看得懂，也要能恢复",
          choice: "暂停、失败原因、检查点和恢复后的单位共享同一条存档链。",
          evidence: "第四关失败后有明确的检查点恢复，玩家不用重走整段流程。",
          tradeoff: "每个新的任务状态都要写进存档链，只画在屏幕上不够。",
          impact: "避免画面看起来恢复了、任务状态却没恢复的割裂。",
        },
      ],
      evidence: [
        {
          method: "自动化测试",
          sample: "RC 审计记录中的 430 个测试",
          question: "任务逻辑、命令、移动、视野、检查点与运行时资源契约是否仍然成立？",
          finding: "RC 记录中 430 / 430 通过。",
          implication: "已覆盖的行为没有退化；没有测试覆盖的行为，这个结果说明不了。",
        },
        {
          method: "资产闸门（verify:rts-art）",
          sample: "6 份 manifest、75 项登记资产、49 个 alpha 文件、154 条来源记录",
          question: "manifest、文件路径、图集尺寸、alpha 与来源记录能否由脚本重复核对？",
          finding: "RC 记录中闸门通过。",
          implication: "资产契约谁都能重跑核对；美术好不好看仍要靠人眼判断。",
        },
        {
          method: "真实浏览器通关",
          sample: "两种桌面分辨率下的五关",
          question: "从主菜单开始，第一章能否一路打完而不卡死？",
          finding: "五关连续完成，并复验了选择、编队、命令、暂停、迷你地图与失败恢复。",
          implication: "本地 RC 构建能完整通关；这不能证明玩家觉得好上手。",
        },
      ],
      iterations: [
        {
          version: "任务管线",
          change: "五关由同一条数据与运行时管线驱动：章节 manifest、任务定义、运行时资源加载、固定 20 Hz 的模拟，再到检查点与存档。",
          reason: "让每一关都不需要自己的规则，输入、战斗、移动、任务和视野共用同一个时钟。",
          improvement: "每关按需载入自己的图集和地图，首屏不预载五关全部重资产。",
        },
        {
          version: "发布候选（RC）",
          change: "RC 审计把测试、资产闸门、网页构建和两种分辨率的完整通关放在一起。",
          reason: "把脚本能核对的部分，和只有真实浏览器跑一遍才看得到的部分分开。",
          improvement: "430 / 430 测试通过，资产闸门与网页构建通过，两种分辨率都打完整章；Phaser 主包偏大的警告照实记录。",
        },
      ],
      limits: [
        {
          constraint: "没有外部玩家的结构化可用性测试。",
          whyItMatters: "操作一致不等于操作好学，所以这个案例不能说游戏容易上手。",
          nextValidation: "找外部玩家做测试，记录他们在前两关卡在哪里。",
        },
        {
          constraint: "五关验收来自本地 RC 记录，不是线上版本。",
          whyItMatters: "在线链接能打开，但没有经过同样的审计。",
          nextValidation: "在线上版本重做一次两种分辨率的通关，并注明日期。",
        },
        {
          constraint: "网页构建通过，但保留 Phaser 主包偏大的已知警告。",
          whyItMatters: "主包偏大可能拖慢靠链接打开的首次加载，这一点还没量过。",
          nextValidation: "先实测首次加载并拆包，再谈加载性能。",
        },
      ],
      takeaway: "即时战略游戏的设计工作主要是定规则：命令一套语法，信息一个位置，失败一条存档链。每条规则都写成测试或浏览器能核对的样子。",
    },
    onthebeat: {
      decisions: [
        {
          label: "手环也能单独换状态",
          choice: "9 月 24 日我提出链路要双向：手环不靠手机也能切换状态，不能只跟着手机走。",
          evidence: "设计文档当天写好。25 日中午复测，仍然只有手机能控制手环；下午再测，侧键选卡，手机随之变化。",
          tradeoff: "双向控制意味着两处都能改状态，两边要经 relay 保持一致。",
          impact: "手环成了第二个入口，而不只是手机的遥控显示屏。",
        },
        {
          label: "MEET 不能是模拟数据",
          choice: "9 月 25 日我指出 MEET 只是模拟数据，要求两台设备之间真的挥手和回挥。",
          evidence: "当晚两部设备配两支手环，一边挥手、一边回挥，两支手环同时显示 MEET。",
          tradeoff: "真协同需要两边都连得上的 relay，模拟数据从来不需要。",
          impact: "配对画面反映的是两个人都同意，而不是写好的结果。",
        },
        {
          label: "没有电脑也要能跑",
          choice: "同一晚我说没有电脑这两样东西都跑不起来，要求立刻解决。",
          evidence: "relay 迁到 Fly.io 悉尼的一台常开机器。我说完 65 分钟后，两支手环经云端对上。",
          tradeoff: "常开的云端机器有运行成本，也多了一个桌上笔电没有的依赖。",
          impact: "链路里不再有笔电，这是带去现场的前提。",
        },
        {
          label: "审查 AI 画布，抓出画布的错",
          choice: "每版 Claude Design 画布我都导入 Claude Code 审查，发现问题就打回返工。",
          evidence: "9 月 15 日我发现四张卡都显示 1 of 4；21 日发现点选音乐后疑似黑屏。",
          tradeoff: "多轮审查比直接用生成结果更花时间。",
          impact: "On The Beat 画布当晚至少 5 轮，此前的 Say Hello 画布至少 12 轮。",
        },
      ],
      evidence: [
        {
          method: "真机配对",
          sample: "两支手环：StickS3 与 StickC Plus",
          question: "两支手环能否不经笔电同时到达 MEET？",
          finding: "9 月 25 日两支手环经云端 relay 同时显示 MEET。",
          implication: "链路在真设备上能走通；配对和检查都是我做的，没有参与者用过。",
        },
        {
          method: "两个测试视窗",
          sample: "9 月 29 日构建，本机两个测试视窗 Ava 与 Leo",
          question: "双方都同意之前，有没有哪一边先看到名字？",
          finding: "收到挥手时只显示附近有人；双方都点头后，才显示名字和碰面地点。",
          implication: "在我走过的流程里，同意规则成立；还没有别人走过。",
        },
        {
          method: "画布审查",
          sample: "On The Beat 画布至少 5 轮，Say Hello 画布至少 12 轮",
          question: "生成的画布行为是否和卡片的描述一致？",
          finding: "一开始不一致：四张卡都显示 1 of 4，点选音乐后疑似黑屏。",
          implication: "生成的设计需要一个会动手测的审查者，光看不够。",
        },
      ],
      iterations: [
        {
          version: "手环控制",
          change: "从手机单向控制手环，改为手环侧键选卡、手机跟着变。",
          reason: "我 9 月 24 日提出手环要能脱离手机使用。",
          improvement: "25 日中午复测仍是单向，下午改为双向可用。",
        },
        {
          version: "relay",
          change: "relay 从我的笔电迁到 Fly.io 悉尼的一台常开机器。",
          reason: "没有笔电，两样设备都跑不起来。",
          improvement: "我提出后 65 分钟，两支手环经云端对上。",
        },
      ],
      limits: [
        {
          constraint: "尚无任何参与者测试这个 App 的记录。",
          whyItMatters: "卡片能不能让两个陌生人开口，正是这个项目要回答的问题，目前没有测过。",
          nextValidation: "安排模拟演出场景，请几组参与者试用，观察他们是否真的碰面。",
        },
        {
          constraint: "手环的时间参数，例如保持唤醒六秒、长按 1.5 秒，都是估计值。",
          whyItMatters: "戴在手上感觉不对的时间，到了现场会打断整个流程。",
          nextValidation: "佩戴手环，在使用中实测这些时间。",
        },
        {
          constraint: "固件与 App 代码由 Claude Code 编写并烧录；我负责接线、开热点、按键和反馈。",
          whyItMatters: "这个案例不能读成手写代码。9 月时我是硬件新手，每一步都要 Claude 先解释。",
          nextValidation: "每次讲这个案例都把分工讲清楚。",
        },
        {
          constraint: "有几条路径没验证：一晚的电池、Plus 的正面键、在手环上按实体键回挥。另外，10 月 6 日 iPhone 片段消失的问题修好后没有复测。",
          whyItMatters: "每一条都可能让一个真实的晚上出问题。",
          nextValidation: "逐条在设备上复测，带日期记录结果。",
        },
      ],
      takeaway: "我的部分是定下系统必须做到什么。只是看起来做完的输出，我会拒收：模拟数据、离不开笔电的链路、数错的画布。",
    },
  },
};

export const recentCaseInterviewScans: Record<ProofLocale, Record<RecentSlug, CaseInterviewScan>> = {
  en: {
    grassland: {
      proves:
        "This case shows I can design the rules of a real-time interaction system and write them so that tests and browser runs can check them.",
      inspect: [
        "Why every mission shares one command grammar and may only restrict commands.",
        "Why the objective, minimap and command grid sit at the screen edges on a fixed camera.",
        "Why pause, failure, checkpoint and restored units share one save chain.",
      ],
      questions: [
        "How do you keep a command system predictable across five missions?",
        "What does 430 of 430 tests prove, and what does it not?",
      ],
      bestFit: [
        "Teams designing complex, real-time or tool-heavy interfaces.",
        "Games and simulation work where rules have to stay consistent as content grows.",
      ],
    },
    onthebeat: {
      proves:
        "This case shows I can steer AI tools to a working phone-wristband-cloud system by setting the requirements and rejecting output that only looks finished.",
      inspect: [
        "Why MEET had to stop being mock data.",
        "How the laptop came out of the loop in 65 minutes.",
        "What the canvas review caught, and what the case says no one has tested.",
      ],
      questions: [
        "The code was written by Claude Code. What was your part?",
        "No participant has used it. What is it evidence of?",
      ],
      bestFit: [
        "Teams building connected or physical products with AI-assisted development.",
        "Roles that need someone to judge AI output, not only to prompt for it.",
      ],
    },
  },
  zh: {
    grassland: {
      proves: "这个案例说明我能为即时交互系统定规则，并把规则写成测试和浏览器都能核对的样子。",
      inspect: [
        "为什么五关共用一套命令语法，任务只能限制命令。",
        "为什么固定镜头下，目标、迷你地图和命令格放在屏幕边缘。",
        "为什么暂停、失败、检查点和恢复后的单位共享一条存档链。",
      ],
      questions: ["五关下来，怎么让命令系统保持可预测？", "430 / 430 个测试能证明什么，不能证明什么？"],
      bestFit: ["做复杂、即时或工具型界面的团队。", "内容越做越多、规则必须保持一致的游戏与仿真项目。"],
    },
    onthebeat: {
      proves: "这个案例说明我能靠定需求、拒收只是看起来做完的输出，把 AI 工具带到一套能运行的手机、手环加云端系统。",
      inspect: ["为什么 MEET 不能再是模拟数据。", "笔电是怎么在 65 分钟内离开链路的。", "画布审查抓到了什么，以及案例写明哪些还没人测过。"],
      questions: ["代码是 Claude Code 写的，你做了什么？", "没有参与者用过，这个案例能证明什么？"],
      bestFit: ["用 AI 辅助开发联网或实体产品的团队。", "需要有人判断 AI 输出、而不只是会写提示词的岗位。"],
    },
  },
};

export const recentCaseReaderPrompts: Record<RecentSlug, CaseInterviewPrompt[]> = {
  grassland: [
    {
      question: "Why may a mission restrict commands but never change how they work?",
      reason: "Tests whether consistency was a design rule or an accident of scope.",
      anchorId: "decision-timeline",
    },
    {
      question: "What do the 430 tests and the asset gate each check?",
      reason: "Separates what a script verified from what a person judged.",
      anchorId: "evidence-board",
    },
    {
      question: "No outside player has tried it. What does the case claim, then?",
      reason: "Keeps a playable build honest about consistency versus learnability.",
      anchorId: "outcome-limits",
    },
  ],
  onthebeat: [
    {
      question: "What did you ask for that the generated version had not done?",
      reason: "Shows whether the requirements came from the designer or the tool.",
      anchorId: "decision-timeline",
    },
    {
      question: "What did the two real wristbands show that the test windows could not?",
      reason: "Checks the difference between a simulated flow and paired hardware.",
      anchorId: "evidence-board",
    },
    {
      question: "Who wrote the firmware, and what does the case say it does not prove?",
      reason: "Keeps authorship and the missing participant testing in view.",
      anchorId: "outcome-limits",
    },
  ],
};

export const recentCaseInterviewPacks: Record<ProofLocale, Record<RecentSlug, CaseInterviewPack>> = {
  en: {
    grassland: {
      answers: [
        {
          id: "grassland-command-grammar",
          question: "How do you keep a command system predictable across five missions?",
          answer:
            "By making the controls a grammar rather than a feature list. Click, box-select, Shift, Ctrl grouping and the right-click menu behave the same in every mission, and a mission can only restrict which commands are allowed. I chose fewer commands than a commercial RTS so that each one has a result a player can predict.",
          evidenceHref: "/projects/grassland#decision-timeline",
          boundary: "Consistent is not the same as learnable; no outside player has tried the controls in a structured session.",
        },
        {
          id: "grassland-failure-recovery",
          question: "What happens when a player fails a mission?",
          answer:
            "The game says why, and a checkpoint restores the mission and the units from one save chain. Keeping them in one chain avoids the split where the screen looks restored but the mission state is not.",
          evidenceHref: "/projects/grassland#decision-timeline",
          boundary: "Checked by tests and by my own playthrough, not by watching players recover.",
        },
        {
          id: "grassland-tests",
          question: "What does 430 of 430 tests prove?",
          answer:
            "That the covered behaviour did not regress in the release candidate: mission logic, commands, movement, vision, checkpoints and the runtime asset contract. The asset gate checks manifests, paths, atlas sizes, alpha and provenance. The full five-mission playthrough at two resolutions is the part only a real browser could show.",
          evidenceHref: "/projects/grassland#evidence-board",
          boundary: "Tests prove the rules hold; they do not show the game is easy to pick up.",
        },
      ],
      managerFollowUp: {
        id: "grassland-manager-follow-up",
        question: "It is a game with no player research. Why is it in a UX portfolio?",
        answer:
          "Because the hard part was interaction design: one grammar for many commands, information placed so the battlefield stays readable, and failure that explains itself and can be undone. Those decisions can be inspected in the build and checked by tests.",
        evidenceHref: "/projects/grassland#outcome-limits",
        boundary: "Whether players learn it quickly is the open question, and it needs outside playtests I have not run.",
      },
    },
    onthebeat: {
      answers: [
        {
          id: "onthebeat-role",
          question: "The code was written by Claude Code. What was your part?",
          answer:
            "Setting what the system had to do, reviewing what came back and sending it back when it was wrong, and pairing the real wristbands. I asked for the band to work without the phone, for MEET to be real rather than mock data, and for the system to run without my laptop. I did the wiring, the hotspot, the button presses and the feedback.",
          evidenceHref: "/projects/onthebeat#decision-timeline",
          boundary: "I did not write the firmware or the app code, and the three-card concept came from a teammate's Figma prototype.",
        },
        {
          id: "onthebeat-laptop",
          question: "How did the laptop come out of the loop?",
          answer:
            "On 25 September I said that without a computer neither device could run. The relay moved to an always-on machine on Fly.io in Sydney that evening, and 65 minutes after my message both wristbands matched through the cloud.",
          evidenceHref: "/projects/onthebeat#evidence-board",
          boundary: "Running on the bands alone, once the phones leave, is still unverified.",
        },
        {
          id: "onthebeat-canvas-review",
          question: "What did reviewing the AI canvas catch?",
          answer:
            "All four cards read '1 of 4', and picking a song appeared to black out the screen. I found both by testing the canvas myself, and the On The Beat canvas went back for rework at least five times that night.",
          evidenceHref: "/projects/onthebeat#evidence-board",
          boundary: "These are problems I found in self-testing; there is no participant testing on record.",
        },
      ],
      managerFollowUp: {
        id: "onthebeat-manager-follow-up",
        question: "No one but you has used it. What is it evidence of?",
        answer:
          "That I can take a teammate's prototype to a working phone, wristband and cloud system by steering AI tools, and that I refuse output that only looks finished. It is not evidence that the cards help strangers meet.",
        evidenceHref: "/projects/onthebeat#outcome-limits",
        boundary: "Whether it works at a gig needs participant sessions and worn timing tests, neither of which has happened.",
      },
    },
  },
  zh: {
    grassland: {
      answers: [
        {
          id: "grassland-command-grammar",
          question: "五关下来，怎么让命令系统保持可预测？",
          answer:
            "把操作做成一套语法，而不是一张功能清单。点击、框选、Shift、Ctrl 编队和右键菜单在每一关用法相同，任务只能限制允许哪些命令。我选择比商业 RTS 少得多的命令，换来每条命令的结果玩家都能预料。",
          evidenceHref: "/projects/grassland#decision-timeline",
          boundary: "一致不等于好学；还没有外部玩家在结构化测试里试过这套操作。",
        },
        {
          id: "grassland-failure-recovery",
          question: "玩家任务失败后会发生什么？",
          answer: "游戏会说明失败原因，检查点从同一条存档链同时恢复任务和单位。放在一条链上，就不会出现画面恢复了、任务状态没恢复的割裂。",
          evidenceHref: "/projects/grassland#decision-timeline",
          boundary: "这由测试和我自己的通关验证，没有观察过玩家怎么恢复。",
        },
        {
          id: "grassland-tests",
          question: "430 / 430 个测试能证明什么？",
          answer:
            "证明已覆盖的行为在发布候选版里没有退化：任务逻辑、命令、移动、视野、检查点和运行时资源契约。资产闸门核对 manifest、路径、图集尺寸、alpha 与来源。两种分辨率下完整打完五关，是只有真实浏览器才看得到的部分。",
          evidenceHref: "/projects/grassland#evidence-board",
          boundary: "测试证明规则成立，不能证明游戏容易上手。",
        },
      ],
      managerFollowUp: {
        id: "grassland-manager-follow-up",
        question: "这是一个没有做玩家研究的游戏，为什么放进 UX 作品集？",
        answer: "因为难点在交互设计：很多命令用一套语法，信息摆放让战场保持可读，失败能看懂也能恢复。这些决定在构建里看得到，也能用测试核对。",
        evidenceHref: "/projects/grassland#outcome-limits",
        boundary: "玩家能不能很快学会，仍是没回答的问题，需要我还没做的外部试玩。",
      },
    },
    onthebeat: {
      answers: [
        {
          id: "onthebeat-role",
          question: "代码是 Claude Code 写的，你做了什么？",
          answer:
            "定系统必须做到什么，审查生成结果，不对就打回，并在真手环上配对。我要求手环不靠手机也能用、MEET 要真实而不是模拟数据、系统要能脱离我的笔电运行。接线、开热点、按键和反馈是我做的。",
          evidenceHref: "/projects/onthebeat#decision-timeline",
          boundary: "固件和 App 代码不是我写的，三张卡的概念来自组员的 Figma 原型。",
        },
        {
          id: "onthebeat-laptop",
          question: "笔电是怎么离开链路的？",
          answer: "9 月 25 日我说没有电脑两样东西都跑不起来。当晚 relay 迁到 Fly.io 悉尼的一台常开机器，我说完 65 分钟后，两支手环经云端对上。",
          evidenceHref: "/projects/onthebeat#evidence-board",
          boundary: "手机离开后只靠手环支撑现场互动，这一点还没验证。",
        },
        {
          id: "onthebeat-canvas-review",
          question: "审查 AI 画布抓到了什么？",
          answer: "四张卡都显示 1 of 4，点选音乐后疑似黑屏。两个问题都是我自己动手测画布时发现的，当晚 On The Beat 画布至少返工 5 次。",
          evidenceHref: "/projects/onthebeat#evidence-board",
          boundary: "这些都是我自测发现的问题，没有参与者测试记录。",
        },
      ],
      managerFollowUp: {
        id: "onthebeat-manager-follow-up",
        question: "只有你自己用过，这个项目能证明什么？",
        answer: "证明我能借 AI 工具，把组员的原型做成能运行的手机、手环加云端系统，并且会拒收只是看起来做完的输出。这个项目证明不了卡片真能帮陌生人碰面。",
        evidenceHref: "/projects/onthebeat#outcome-limits",
        boundary: "能不能在演出现场用，需要参与者测试和佩戴实测，两样都还没做。",
      },
    },
  },
};
