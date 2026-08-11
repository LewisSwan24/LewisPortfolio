import type {
  CaseDepth,
  CaseInterviewPrompt,
  CaseInterviewScan,
  CaseReaderGuide,
  CaseReaderMode,
  CaseReaderSection,
  CaseSummary,
  ProjectEvidenceSlug,
  ProofLocale,
} from "./types";


const caseSummaries: Record<ProofLocale, Record<ProjectEvidenceSlug, CaseSummary>> = {
  en: {
    connect: {
      challenge: "UQ runs no shortage of events for international students. They still end up in the same circle — a one-off mixer produces an introduction, not a relationship.",
      role: "One of five on a course team; I owned the front-end component system and ran 14 of the 71 interviews",
      methods: ["exploratory interviews", "falsifiable test cards", "think-aloud usability testing", "paper-to-interactive prototyping", "component system design"],
      evidence: [
        "71 interviews across three iterations, 14 of them mine",
        "hypotheses written with pass/fail thresholds before any data was collected",
        "learning cards recording which of those hypotheses we got wrong",
      ],
      outcome: "A 24-screen mobile MVP reached through three rounds of research and two prototype generations. Course project; runs on mock data, never connected to a live database.",
      next: "I would connect the backend and re-run the task chain with completion times, so the third round produces a number instead of an impression.",
    },
    spectra: {
      challenge: "Font, spacing and contrast are set by whoever built the page, so a reader who needs something different has no way in.",
      role: "Solo design and build",
      methods: ["WCAG text-spacing criteria", "existing-extension teardown", "cross-site injection testing"],
      evidence: ["a working Chrome extension", "Jest coverage of the settings layer", "manual checks across documentation, news and single-page apps"],
      outcome: "An extension that rewrites type and spacing on any page from one popup, in English and Simplified Chinese, with settings saved per site. DEMO stage.",
      next: "I would put it in front of someone who actually reads this way and watch which controls they never touch.",
    },
    maze: {
      challenge:
        "A physical maze just sits there. Making it read as a responsive multiplayer system meant tying sensing, game state, and feedback together in real time.",
      role: "Design technologist and interaction prototyper",
      methods: ["firmware state machines", "sensor tuning", "haptic feedback design", "Web Serial console"],
      evidence: ["working Arduino build", "public exhibition group play", "firmware/web parity tests"],
      outcome:
        "A ball passing a sensor advances round state and drives score, timer, haptics, lights, audio, and the browser console together. Built and exhibited.",
      next: "I would instrument sessions to see which feedback channel players actually rely on, and cut the ones they ignore.",
    },
    vigil: {
      challenge:
        "A phishing classifier that is right 88% of the time still needs a human on the other side of it — and the interface decides whether that human genuinely checks the call or just clicks through it.",
      role: "Designer and technical director; I specified, Claude Code and Codex built to the spec",
      methods: ["spec freeze", "synthetic stimulus design", "A/B variant prototyping", "contrast auditing", "usability test protocol design"],
      evidence: [
        "140-email synthetic corpus with a validated error profile",
        "six switchable interface variants across three questions",
        "predictions recorded in writing before any testing",
      ],
      outcome:
        "Six variants built and running, a working React build behind them, and a five-participant test protocol ready to run. No participants yet — the three design questions are still open.",
      next: "I would run the five hallway sessions, then a counterbalanced study on whichever question survives them.",
    },
    hoop: {
      challenge:
        "A career-simulation RPG needs hundreds of art assets to read as one world. Generating them is now cheap; keeping 299 of them stylistically coherent is the actual problem.",
      role: "Designer, art director and technical director, working through an AI production pipeline",
      methods: [
        "art bible",
        "prompt-per-batch production",
        "style gate review",
        "narrative systems design",
        "regression testing at scale",
      ],
      evidence: [
        "299 assets generated across six batches against a written art bible",
        "a style gate with an explicit rejected-style list",
        "1,975 tests over the career, contract, injury and save systems",
      ],
      outcome:
        "A playable ten-chapter career sim running publicly, on a pipeline where every asset batch is reviewed against the same written rules. Self-labelled DEMO v0.6; no player research yet.",
      next: "I would put it in front of players who do not already follow basketball, and watch where the systems stop explaining themselves.",
    },
  },
  zh: {
    connect: {
      challenge: "UQ 给国际学生办的活动不少。他们还是留在同一个圈子里——一次性的迎新派对制造的是认识，不是关系。",
      role: "五人课程团队中的一员；我负责前端组件系统，并做了 71 场访谈里的 14 场",
      methods: ["探索式访谈", "可证伪的假设卡", "出声思考可用性测试", "从纸面到可交互原型", "组件系统设计"],
      evidence: [
        "三轮共 71 场访谈，其中 14 场是我做的",
        "假设连同判定阈值一起，写在收集数据之前",
        "learning cards 记下了我们哪几条假设是错的",
      ],
      outcome: "一个 24 屏的移动端 MVP，背后是三轮研究与两代原型。课程项目，跑在 mock 数据上，从未接上真实数据库。",
      next: "我会把后端接上，带着完成时间重跑一次任务链，让第三轮产出一个数字，而不是一个印象。",
    },
    spectra: {
      challenge: "字体、行距和对比度都由建站的人决定，需要不一样的读者没有任何入口。",
      role: "独立设计与开发",
      methods: ["WCAG 文本间距条款", "现有扩展拆解", "跨站点注入测试"],
      evidence: ["一个能跑的 Chrome 扩展", "Jest 覆盖设置层", "在文档站、新闻站与单页应用上的手动验证"],
      outcome: "一个扩展：从一个 popup 就能改写任意页面的字体与间距，中英双语，设置按站点保存。DEMO 阶段。",
      next: "我会把它交给一个真的这样读东西的人，看他们从来不碰哪几个控件。",
    },
    maze: {
      challenge:
        "实体迷宫本身是静止的。要让它读起来像一个会回应的多人系统，必须把感测、游戏状态和反馈实时绑在一起。",
      role: "Design Technologist / 交互原型开发",
      methods: ["固件状态机", "传感器调校", "触觉反馈设计", "Web Serial 控制台"],
      evidence: ["可运行的 Arduino 实体作品", "公开展览中的多人游玩", "固件与网页一致性测试"],
      outcome:
        "球经过传感器就推进回合状态，并同时驱动计分、计时、震动、灯光、音效与浏览器控制台。已完成搭建并展出。",
      next: "我会记录实际游玩数据，看玩家真正依赖哪一种反馈通道，然后砍掉被忽略的那些。",
    },
    vigil: {
      challenge:
        "一个准确率 88% 的钓鱼邮件分类器，另一端仍然需要一个人。而界面决定了这个人是真的在复核，还是一路点过去。",
      role: "设计与技术方向由我定；Claude Code 与 Codex 按规格实现",
      methods: ["规格冻结", "合成测试素材设计", "A/B 变体原型", "对比度审计", "可用性测试脚本设计"],
      evidence: [
        "140 封合成邮件，错误分布经过验证",
        "三个设计问题、六个可切换变体",
        "测试之前先把预测写下来",
      ],
      outcome:
        "六个变体已经跑起来，背后有一版可运行的 React 实现，五人测试脚本也已就绪。目前还没有受试者——三个设计问题都还没有答案。",
      next: "我会先跑完五场走廊测试，再针对活下来的那个问题做一次对照实验。",
    },
    hoop: {
      challenge:
        "一个生涯模拟 RPG 需要几百张美术资产，才撑得起「这是同一个世界」。生成它们现在很便宜，难的是让 299 张保持在同一种风格里。",
      role: "设计、美术方向与技术方向都由我定，通过一套 AI 生产管线实现",
      methods: ["美术圣经", "按批次写 prompt 生产", "风格闸门审查", "叙事系统设计", "大规模回归测试"],
      evidence: [
        "六个批次共 299 张资产，全部对照一份写下来的美术圣经",
        "一道风格闸门，附明确的「拒绝风格」清单",
        "覆盖生涯、合同、伤病与存档系统的 1975 个测试",
      ],
      outcome:
        "一个公开可玩、十章生涯的模拟游戏，背后是一条「每批资产都按同一套成文规则审一遍」的管线。游戏自标 DEMO v0.6，还没有做过玩家研究。",
      next: "我会把它交给本来不看篮球的人玩，看这些系统在哪一步开始讲不清自己。",
    },
  },
};

const caseDepth: Record<ProofLocale, Record<ProjectEvidenceSlug, CaseDepth>> = {
  en: {
    connect: {
      decisions: [
        {
          label: "Write the pass mark before collecting the data",
          choice:
            "Every hypothesis got a numeric threshold in writing before a single interview ran — participation tracks weekly energy for at least 70% of students, loneliness correlates with wellbeing at r ≤ −0.4, and so on.",
          evidence:
            "Without a threshold agreed in advance, whatever the interviews return can be read as support. The thresholds were the only thing standing between us and that.",
          tradeoff:
            "Several hypotheses then failed their own test, and we had to write down that we had been wrong.",
          impact:
            "The learning cards record which assumptions broke — that language proficiency was the barrier, that exposure was the gap — instead of quietly reframing them as findings.",
        },
        {
          label: "Make the match explain itself",
          choice:
            "A recommended person shows the reason for the match — shared study habits, compatible schedules — not just a compatibility score.",
          evidence:
            "Students were openly sceptical of black-box matching, but acted on the same suggestion once it named a concrete reason.",
          tradeoff:
            "Each match costs more vertical space, so fewer fit on screen and the list takes longer to scan.",
          impact:
            "The score stops being a number taken on faith and becomes something a student can agree or disagree with.",
        },
        {
          label: "Go back to paper after the September sessions",
          choice:
            "Instead of patching the clickable prototype, we redrew the whole app on one sheet on 3 October: five screens, explicit routes off the home page, one name against each feature area.",
          evidence:
            "The September defects were structural — no visible way back, a card whose state contradicted its own button. Those are not fixed one component at a time.",
          tradeoff:
            "It cost build time in the middle of semester, and the paper structure dropped features that were already coded.",
          impact:
            "The November build started from a fixed skeleton with an owner per area, rather than from an accumulating prototype.",
        },
      ],
      evidence: [
        {
          method: "Exploratory interviews",
          sample: "33 transcripts in the first round, 15–30 August 2025; 7 of them mine",
          question: "UQ already runs events for international students. Why do they not turn into relationships?",
          finding:
            "Size and pace shut people out, not vocabulary. One participant put the ceiling plainly: it is hard to find common ground beyond being international.",
          implication:
            "The problem was not a shortage of events. It was that nothing carried a person from one event to the next.",
        },
        {
          method: "Think-aloud usability testing",
          sample: "28 transcripts in the second round, 17–24 September 2025; 5 of them mine",
          question: "Can a student operate the features without me sitting next to them?",
          finding:
            "An event card said the student was attending while still offering an attend button; a secondary button had no discoverable purpose; there was no way back to the previous page; 'Skill swap' did not explain itself.",
          implication:
            "State feedback and navigation were the blockers, well before anything about matching quality.",
        },
        {
          method: "Task-based usability testing",
          sample: "10 transcripts in the third round, 8–12 November 2025; 2 of them mine",
          question: "Can a student complete a whole chain — create a circle, set who can see it, open the chat, post, come back — unaided?",
          finding:
            "The chain completed. The participant read the colour-coded home screen as a map of the app. But the Circles entry point was found in the sidebar rather than on sight.",
          implication:
            "The flow holds once you are in it; getting into it still depends on hunting for the entry point.",
        },
      ],
      iterations: [
        {
          version: "Clickable prototype, September",
          change: "Tested the feature set as it had actually been built, with participants thinking out loud.",
          reason: "The open risk was whether a student could operate it unaided, not whether the idea appealed to them.",
          improvement:
            "Surfaced navigation and state defects that a demo walkthrough would have talked straight past.",
        },
        {
          version: "Paper, 3 October",
          change:
            "Redrew the app as five screens — home, study buddy, nearby circles on a campus map, wellness, resource hub — with arrows for every route off the home page.",
          reason: "Structural defects need a structural answer, and paper is the cheapest place to give one.",
          improvement: "Produced a skeleton the build could follow, with each feature area assigned to a named person.",
        },
        {
          version: "24-screen MVP, November",
          change:
            "Built the screens as a shared component system with React context for cross-screen state, rather than styling each screen on its own.",
          reason: "Twenty-four screens hand-styled by five people do not stay one product for long.",
          improvement:
            "The November sessions ran on a single visual system, and the participant used its colour coding to predict where things were.",
        },
      ],
      limits: [
        {
          constraint: "The MVP runs on mock data. The backend exists but was never connected to it.",
          whyItMatters:
            "Matching, messaging and scheduling were never exercised against real records, concurrency or empty states. The sessions tested an interface, not a working product.",
          nextValidation:
            "Connect the API layer and re-run the same task chain against live data, watching specifically for what breaks when a list is empty or a message is slow.",
        },
        {
          constraint: "Nothing was measured before and after.",
          whyItMatters:
            "I can say the September navigation defect did not recur in November. I cannot say how much better it got, because no round recorded completion times or a fixed success criterion.",
          nextValidation:
            "Re-run the November chain with timings and a pass mark defined in advance, so the round produces a number rather than an impression.",
        },
        {
          constraint: "This was a five-person team and I did not build all of it.",
          whyItMatters:
            "Anything in the product outside the component system, the shared state layer and my own interview rounds was somebody else's work.",
          nextValidation:
            "Ask me about the parts I owned and the commit history will match what I say.",
        },
      ],
      takeaway:
        "This case proves I can run research that is capable of proving itself wrong, and then carry what survives into a component system that twenty-four screens can share.",
    },
    spectra: {
      decisions: [
        {
          label: "Bundle the font instead of loading it from a CDN",
          choice:
            "OpenDyslexic ships inside the extension package rather than being fetched at runtime.",
          evidence:
            "A remote font request tells a third party which pages are being read, and it fails whenever the host changes or the reader is offline.",
          tradeoff:
            "The package is heavier, and the font can only be updated by shipping a new version.",
          impact:
            "The extension works offline and leaks nothing about the reader's browsing.",
        },
        {
          label: "Save settings per site, not globally",
          choice:
            "Each origin keeps its own spacing and typeface state.",
          evidence:
            "Loose spacing that helps on a dense documentation page is unwanted on a news site, and one global switch forces the reader to keep toggling.",
          tradeoff:
            "More storage bookkeeping, and a first visit to a new site starts unstyled.",
          impact:
            "The reader sets a site once and it stays that way.",
        },
        {
          label: "Put the controls in a popup, not a context menu",
          choice:
            "All controls live in one popup panel opened from the toolbar.",
          evidence:
            "A context menu hides the range of what is adjustable behind a right-click and shows one item at a time.",
          tradeoff:
            "Two clicks to reach a control instead of one, and toolbar space is spent.",
          impact:
            "The whole set of adjustments is visible at once, so nothing has to be discovered.",
        },
      ],
      evidence: [
        {
          method: "Guideline review",
          sample: "WCAG text-spacing criteria",
          question: "Which typographic properties does the tool have to expose to be useful at all?",
          finding: "Line height, letter spacing, word spacing and paragraph spacing are the ones with published thresholds.",
          implication: "Those four became the control set, rather than a general CSS editor.",
        },
        {
          method: "Cross-site injection testing",
          sample: "Documentation, news, and single-page-app sites, by hand",
          question: "Where do injected styles lose to the page's own CSS?",
          finding: "Inline styles and high-specificity selectors override the injected layer, and single-page apps re-render it away on navigation.",
          implication: "The content script has to re-apply on route changes, not only on load.",
        },
        {
          method: "Unit tests",
          sample: "Jest over the settings and utility layer",
          question: "Does per-site state survive save, reload, and reset?",
          finding: "Covered at the utility level, where the persistence logic lives.",
          implication: "Regressions in settings behaviour surface before they reach a page.",
        },
      ],
      iterations: [
        {
          version: "Style injection",
          change: "Started with a content script writing a stylesheet into the page.",
          reason: "It was the smallest thing that could show whether the idea worked at all.",
          improvement: "Worked on simple pages and failed on anything with strong specificity.",
        },
        {
          version: "Popup controls",
          change: "Added a popup panel with the four spacing controls and the typeface switch.",
          reason: "Editing values by hand is not a tool anyone would use twice.",
          improvement: "The adjustable range became visible instead of implied.",
        },
        {
          version: "Per-site state and bilingual UI",
          change: "Added per-origin persistence and English and Simplified Chinese locale files.",
          reason: "Settings that reset every visit are worse than no settings, and I read in both languages.",
          improvement: "It became something usable daily rather than a demonstration of injection.",
        },
      ],
      limits: [
        {
          constraint: "Nobody who needs this has used it.",
          whyItMatters: "Every control here is reasoned from guidelines, not from watching a reader struggle.",
          nextValidation: "Sit with readers who rely on loose spacing or dyslexia-friendly typefaces and watch which controls they ignore.",
        },
        {
          constraint: "It is a DEMO, not a published extension.",
          whyItMatters: "It has never faced Chrome Web Store review, auto-update, or a site changing underneath it.",
          nextValidation: "Publish it, then watch which sites break and how quickly.",
        },
      ],
      takeaway:
        "This case proves I can turn accessibility guidance into a working tool and keep it working on pages I do not control. It does not prove the tool has helped anyone yet.",
    },
    maze: {
      decisions: [
        {
          label: "Replace the electric-shock concept with vibration",
          choice:
            "The original trap feedback was a mild electric shock. I built it with relay-driven vibration motors in finger sleeves instead.",
          evidence:
            "The maze was destined for a public exhibition with unsupervised players of unknown age and health, where consent and calibration could not be guaranteed per person.",
          tradeoff:
            "Vibration is a weaker sensation than shock, so the trap lost some shock value — the point players remember it by.",
          impact:
            "The system stayed exhibitable without a supervisor gating every round, and the feedback still landed because it arrived on the finger, not on a screen.",
        },
        {
          label: "Debounce the IR sensors instead of trusting raw reads",
          choice:
            "I added debounce and a cooldown window to each of the ten FC-51 IR sensors.",
          evidence:
            "A single ball pass produced multiple raw trigger events, so score and trap effects fired several times for one physical event.",
          tradeoff:
            "The cooldown adds a blind window where a genuinely fast second pass would be missed.",
          impact:
            "One physical event became one game event, which is the precondition for score, timer, and haptics agreeing with each other.",
        },
        {
          label: "Split the tilt controller off the main feedback controller",
          choice:
            "Platform tilt moved to its own SafeTouchServoController with hold-to-move behaviour, separate from the main PlanB feedback firmware.",
          evidence:
            "Servo motion and time-sensitive sensor polling on one board made feedback timing unreliable, and a servo fault could take the whole round down.",
          tradeoff:
            "Two controllers mean more wiring and another failure point at setup time.",
          impact:
            "Feedback timing stopped competing with actuator motion, and hold-to-move made the tilt safe to hand to a stranger.",
        },
        {
          label: "Build a browser console with demo and live modes",
          choice:
            "I built a Web Serial console that mirrors the maze and also runs standalone in demo mode.",
          evidence:
            "The hardware is not always available — during development, and certainly not inside a portfolio or an interview.",
          tradeoff:
            "Two modes mean two code paths that can drift apart.",
          impact:
            "The system is inspectable without the physical build, and regression tests keep the demo honest about firmware rules.",
        },
      ],
      evidence: [
        {
          method: "Sensor bench testing",
          sample: "Ten FC-51 IR sensors mapped across trap, diagnostic, spare, and finish zones",
          question: "Does one ball pass produce exactly one game event?",
          finding: "Raw reads double- and triple-fired; debounce plus a cooldown window reduced a pass to a single event.",
          implication: "Sensor timing is an interaction design problem, not just an electronics detail.",
        },
        {
          method: "Firmware/web parity tests",
          sample: "Regression tests over serial sync, feedback sync, servo response, and audio parity",
          question: "Does the browser console still behave like the firmware after either side changes?",
          finding: "Drift showed up in feedback timing and serial event shape whenever one side was edited alone.",
          implication: "The demo can be trusted as a description of the real system rather than a separate story.",
        },
        {
          method: "Public exhibition play",
          sample: "Group play at a university exhibition; sessions not formally logged",
          question: "Do players understand what the system is telling them without instruction?",
          finding:
            "Players reacted to vibration and audio faster than to the score display, and needed the finger sleeves fitted for them rather than self-fitted.",
          implication: "Wearable fit and setup ritual are part of the interaction, not preconditions to it.",
        },
      ],
      iterations: [
        {
          version: "Shock trap",
          change: "Started from a trap concept built around a mild electric shock.",
          reason: "It was the most visceral version of 'you hit a trap'.",
          improvement: "Made the safety and consent problem concrete enough to force a redesign.",
        },
        {
          version: "Vibration sleeves",
          change: "Moved trap feedback to relay-driven vibration motors in wearable finger sleeves.",
          reason: "Feedback had to reach the player's body without a risk that needed supervision.",
          improvement: "Kept the physical sensation while making the maze safe to run for a queue of strangers.",
        },
        {
          version: "Synchronised loop",
          change: "Tied sensor events to score, timer, lights, audio, and the browser console through one round state machine.",
          reason: "Separate subsystems reacting on their own made the maze feel like unrelated gadgets.",
          improvement: "One event now produces one coherent multi-channel response the player can read.",
        },
      ],
      limits: [
        {
          constraint: "Exhibition play was observed, not instrumented.",
          whyItMatters:
            "I can describe what players reacted to, but I cannot quantify which feedback channel carried the most information.",
          nextValidation:
            "Log sensor events, feedback fires, and completion times per session, then compare rounds with channels selectively disabled.",
        },
        {
          constraint: "The build is a single exhibition unit, not a manufacturable product.",
          whyItMatters:
            "Wiring is hand-run and calibration is per-venue, so nothing here proves durability, yield, or repeatable assembly.",
          nextValidation:
            "Rebuild on a fabricated harness and measure setup time and sensor drift across several venues.",
        },
      ],
      takeaway:
        "This case proves I can take an interaction concept through firmware, sensing, and physical feedback into a browser control surface, and make safety and calibration calls on hardware that strangers will actually touch.",
    },
    vigil: {
      decisions: [
        {
          label: "Write the corpus instead of downloading one",
          choice:
            "All 140 messages are written from scratch inside a fictional company, rather than sampled from SpamAssassin, Nazario, or Enron.",
          evidence:
            "The public corpora are 2002–2015 mail, they carry real personal data, and cue highlighting needs exact character offsets that only authored text can guarantee.",
          tradeoff:
            "Constructed stimuli buy control at the cost of ecological validity — nothing here proves how the interface behaves against real mail.",
          impact:
            "Error placement, difficulty, and cue offsets all became design parameters instead of accidents of the dataset.",
        },
        {
          label: "Make confidence deliberately weak evidence",
          choice:
            "Confidence is stratified so it cannot predict which calls the classifier got wrong, and the build script fails if that stops being true.",
          evidence:
            "In the first build confidence separated cleanly — correct calls all sat at 0.84 and above, errors at 0.82 and below. A participant reading only the number would have caught every error without reading a single email.",
          tradeoff:
            "Every future content edit now has to survive a statistical gate, which makes the corpus more expensive to change.",
          impact:
            "Error-ranking AUC sits at 0.72 against a 0.75 ceiling, with 7 high-confidence errors and 36 low-confidence-but-correct calls, so the interface question is askable at all.",
        },
        {
          label: "Generate each rationale from that email's own cues",
          choice:
            "The classifier's one-line explanation is assembled from the cues actually present in the message, replacing a fixed pool of plausible sentences.",
          evidence:
            "A spot check found em_052 explained as an external sender with an attachment or sign-in prompt. The message had neither.",
          tradeoff:
            "Cue-driven rationales read more formulaic than hand-written ones.",
          impact:
            "Explanation quality is the thing being studied — once a participant catches the explanation being fake, every measurement after it is contaminated.",
        },
        {
          label: "Record the variant predictions before testing anything",
          choice:
            "Which variant I expected to win, and the bet behind each, went into the repository in writing before a single variant was flipped.",
          evidence:
            "Predictions written after the fact always agree with the outcome, which makes them worthless as evidence of reasoning.",
          tradeoff:
            "It commits a wrong call to the record permanently.",
          impact:
            "The gap between prediction and result becomes the most useful thing the write-up can contain, in either direction.",
        },
      ],
      evidence: [
        {
          method: "Corpus validation gate",
          sample: "140 synthetic messages, 17 classifier errors (9 false positives, 8 false negatives)",
          question: "Can the confidence number alone tell you which calls the classifier got wrong?",
          finding:
            "In the first build, yes — completely. After stratified resampling, error-ranking AUC is 0.72 with 7 high-confidence errors in the set.",
          implication:
            "The stimulus set had to be engineered before the interface question could be measured at all.",
        },
        {
          method: "Rationale audit",
          sample: "Spot check of generated explanations against their own message bodies",
          question: "Does the classifier's stated reasoning match the message it is reasoning about?",
          finding:
            "Rationales drawn from a fixed pool described cues that were not in the email.",
          implication:
            "Explanation fidelity is a precondition of the study, not a polish item.",
        },
        {
          method: "Contrast measurement",
          sample: "Every text-on-surface pair in the palette, measured with a script rather than eyeballed",
          question: "Does the palette hold WCAG AA at normal text size?",
          finding: "One rail token failed at 4.41 and was reworked to 5.11; the palette now passes throughout.",
          implication:
            "Accessibility was checked with a measurement rather than an assumption, and can be re-run after any palette change.",
        },
        {
          method: "Prototype smoke test",
          sample: "176 assertions across eight variant combinations, run against the real decision code",
          question: "Does the decision and scoring logic survive every combination of the three variants?",
          finding: "All 176 pass; the React build carries 101 unit tests over the same rules.",
          implication:
            "The rewrite has a behavioural baseline, so a variant cannot quietly break scoring on the way to Phase 3.",
        },
      ],
      iterations: [
        {
          version: "First visual pass",
          change: "White cards on grey, a safe blue accent, six uppercase letterspaced labels on one screen, system-ui throughout.",
          reason: "It was the default any generator reaches for, and it was competent.",
          improvement: "Rejected. It looked like software rather than like a decision, which named the actual problem.",
        },
        {
          version: "Instrument, not inbox",
          change:
            "Everything the system says moved to monospace; the message body is the only thing in a text face. The verdict is carried by weight and a rule rather than a tinted card.",
          reason:
            "A coloured verdict card lends the classifier authority it has not earned, and impersonation hides in letter pairs a proportional face closes up.",
          improvement: "The reader has to read the word, and a lookalike domain stays legible as a lookalike.",
        },
        {
          version: "Industry-convention pass",
          change:
            "Added authentication results with a note on what they do not prove, domain-first-seen dates, campaign clustering, and an optional note on escalation.",
          reason:
            "An audit against real mail-security consoles showed the interface was missing signals an analyst would expect to have.",
          improvement:
            "The sharpest teaching case now exists: CEO fraud sent from a real consumer account passes every authentication check over a domain registered in 1995.",
        },
      ],
      limits: [
        {
          constraint: "No participant has run it yet.",
          whyItMatters:
            "All three design questions are still open. Every argument for a variant in this case is reasoning, not evidence — and the predictions are on record precisely so that stays visible.",
          nextValidation:
            "Five hallway sessions on the config rotation already written into the test protocol, then fill in the decision and what-it-gives-up blocks.",
        },
        {
          constraint: "The corpus is synthetic and the classifier is scripted.",
          whyItMatters:
            "Error placement is authored, so this measures how an interface shapes oversight — not how a real detection system fails.",
          nextValidation:
            "The honest version needs an organisational partner and ethics approval, which is out of scope for a coursework build.",
        },
        {
          constraint: "The evaluation study is designed but not run.",
          whyItMatters:
            "The counterbalanced comparison, the measures, and the 2×2 payoff matrix all exist on paper only.",
          nextValidation:
            "Recruit 8–12 participants, run both conditions per person, and report the result even if the conditions do not separate.",
        },
      ],
      takeaway:
        "This case proves I can turn a research brief into a running system — corpus, variants, protocol, and a validation gate that fails the build when the material stops being usable — and that I can direct an AI coding workflow without handing it the design argument.",
    },
    hoop: {
      decisions: [
        {
          label: "Write the art bible before generating any assets",
          choice:
            "Three reference documents — pixel players, organic scenes, flat logos — were written first, and every batch prompt cites them.",
          evidence:
            "Generated art drifts. Each batch is independently plausible, and the drift only becomes visible once they sit in the same screen, by which point you have hundreds of files to reconcile.",
          tradeoff:
            "Writing the rules before seeing output means committing to a look you have not yet proven works.",
          impact:
            "299 assets across six batches share one palette and one linework language, because the rules existed before the volume did.",
        },
        {
          label: "Gate batches on style, and name what is rejected",
          choice:
            "Each batch passes a style gate reviewed against existing runtime anchors, with an explicit rejected list: photoreal, 3D, anime, neon, random text, real trademarks.",
          evidence:
            "A generator will happily produce any of those on a slightly different prompt, and each is individually defensible in isolation.",
          tradeoff:
            "A gate rejects work that took real time to produce, and it is tempting to let a near-miss through when the batch is already late.",
          impact:
            "The rejected list is the load-bearing half. Saying what the world is not turned out to be more actionable than describing what it is.",
        },
        {
          label: "Compress a lifetime into 146 nodes rather than a calendar",
          choice:
            "A career from age twelve to retirement runs across 146 nodes in eight kinds — training, match, story, relationship, risk, reward, rest, legacy — instead of simulating days.",
          evidence:
            "Calendar-based career sims spend most of their runtime on repetition, and the interesting decisions get buried in maintenance clicking.",
          tradeoff:
            "Discrete nodes lose the texture of a season grinding on; the player never feels time passing the slow way.",
          impact:
            "Every node has to earn its place, and action combinations carry consequences — repeated training raises readiness while raising body risk and pressure and lowering team trust.",
        },
        {
          label: "Derive the visual language from a product, and say so",
          choice:
            "The palette and typographic system are reverse-engineered from Anthropic's product design — warm parchment, terracotta accent, exclusively warm-toned neutrals — and documented as such.",
          evidence:
            "A game about one person's whole life needed a surface that reads as unhurried and literary rather than as a sports UI full of cold blues and energy gradients.",
          tradeoff:
            "It is a borrowed language, not an invented one, and a reader who recognises the source will notice.",
          impact:
            "Stating the derivation in the design document is what makes it a transfer exercise instead of an uncredited copy.",
        },
      ],
      evidence: [
        {
          method: "Batch production log",
          sample: "Six batches: 64 portraits, 40 scenes, 73 CGs, 72 UI icons, 18 court/tactics, 32 static VFX",
          question: "Can generated art hold one style across a volume no one would draw by hand?",
          finding: "299 assets passed the style gate against the art bible anchors; the log records counts per stage, not just a total.",
          implication:
            "The pipeline is auditable — anyone can ask which batch an asset came from and what rules it was checked against.",
        },
        {
          method: "Automated regression suite",
          sample: "355 test files, 1,975 tests, run against the career, contract, injury, season and save systems",
          question: "Does a systems-heavy career sim stay correct while content keeps landing?",
          finding: "All 1,975 pass; save data carries a schema version so old saves are migrated rather than silently broken.",
          implication:
            "Scale here is a design constraint, not a bragging point — without it, adding a chapter quietly breaks a contract rule three chapters earlier.",
        },
        {
          method: "Playable build check",
          sample: "The public deployment, played from the main menu through character creation into the first career node",
          question: "Does the loop actually run for someone arriving cold?",
          finding:
            "Character creation gates on a required name, archetype choice propagates into the six attributes, and the first node opens with status, relationships and actions all populated.",
          implication: "The systems are wired end to end, not mocked at the seams.",
        },
      ],
      iterations: [
        {
          version: "Concept",
          change: "Framed as a pixel-art career sim, referencing NBA 2K MyCareer, Punch Club, New Star Soccer and Stardew Valley.",
          reason: "Each reference solves one piece: career arc, attribute decay, off-court life, daily-loop satisfaction.",
          improvement: "Named what to borrow from each, which kept the scope from becoming 'a basketball game'.",
        },
        {
          version: "Systems build",
          change: "Draft, contracts, seasons, off-season, retirement, New Game+ and tactical matches all landed as systems.",
          reason: "A career sim is only as interesting as the consequences it can carry across a decade of in-game time.",
          improvement: "A career can now run from youth to retirement and be sealed into a Legacy that affects the next run.",
        },
        {
          version: "Art pipeline",
          change: "Moved from ad-hoc asset generation to art bible, batch prompts, style gate and a production log.",
          reason: "The first assets were fine individually and did not agree with each other.",
          improvement: "Coherence became a property of the process rather than something re-litigated per asset.",
        },
      ],
      limits: [
        {
          constraint: "No player research. The game self-labels DEMO v0.6.",
          whyItMatters:
            "Everything here is systems design and production discipline. Whether the pacing works for someone who is not me is untested.",
          nextValidation:
            "Sit five people who do not follow basketball in front of chapter one and watch where the systems stop explaining themselves.",
        },
        {
          constraint: "The first load is large and mobile QA is thin.",
          whyItMatters:
            "A 3.8 MB JavaScript bundle is a real barrier on a phone, which is where a Chinese audience would meet it.",
          nextValidation: "Code-split the bundle and run device QA before calling it a public beta.",
        },
        {
          constraint: "The visual language is derived, not invented.",
          whyItMatters:
            "It is a transfer exercise from an existing product's design system, and presenting it as original would be dishonest.",
          nextValidation:
            "Push the system somewhere the source could not go — the basketball-specific screens are where it would have to stop being borrowed.",
        },
      ],
      takeaway:
        "This case proves I can run generative production at a volume that would otherwise be incoherent — by writing the rules first, gating on them, and naming what gets rejected — while keeping a systems-heavy build correct under 1,975 tests.",
    },
  },
  zh: {
    connect: {
      decisions: [
        {
          label: "把及格线写在收数据之前",
          choice:
            "每条假设在第一场访谈之前就写好了数字门槛——「至少 70% 的学生，参与度随每周精力变化」「孤独感与幸福感相关系数 r ≤ −0.4」，诸如此类。",
          evidence:
            "没有事先约定的门槛，访谈回来的任何结果都能被读成支持。这些门槛是唯一挡在我们和自我印证之间的东西。",
          tradeoff: "结果有几条假设没过自己定的线，我们得把「我们错了」写下来。",
          impact:
            "learning cards 里留着哪些假设垮掉了——语言能力才是障碍、缺的是曝光——而不是把它们悄悄重新表述成发现。",
        },
        {
          label: "让匹配自己解释自己",
          choice: "推荐一个人的时候，一并给出匹配理由——学习习惯相近、时间表兼容——而不是只给一个契合度分数。",
          evidence: "学生对黑箱匹配明确表示怀疑，但同一条推荐一旦说出具体理由，他们就愿意行动。",
          tradeoff: "每条匹配占的竖向空间变大，一屏能放的更少，列表也更长。",
          impact: "那个分数不再是一个只能选择相信的数字，而变成学生可以同意或反对的东西。",
        },
        {
          label: "九月测完之后，回到纸上",
          choice:
            "没有去补那个可点击原型，而是在 10 月 3 日把整个应用重画在一张纸上：五个屏、每条从首页出发的路径都画了箭头、每块功能挂一个人名。",
          evidence:
            "九月抓到的缺陷是结构性的——没有可见的返回路径、卡片状态和它自己的按钮互相矛盾。这类问题不是一个组件一个组件能补掉的。",
          tradeoff: "在学期中间付出了开发时间，而且纸面结构砍掉了一些已经写好的功能。",
          impact: "十一月的开发是从一套固定骨架和明确分工开始的，而不是从一个不断堆积的原型开始。",
        },
      ],
      evidence: [
        {
          method: "探索式访谈",
          sample: "第一轮 33 份逐字稿，2025 年 8 月 15–30 日；其中 7 场是我做的",
          question: "UQ 给国际学生办的活动本来就不少。为什么它们没有变成关系？",
          finding:
            "把人挡在外面的是场合的规模与节奏，不是词汇量。一位受访者把天花板说得很直白：除了「大家都是国际学生」，很难再找到共同点。",
          implication: "问题不是活动不够多，而是没有任何东西把一个人从这场活动带到下一场。",
        },
        {
          method: "出声思考可用性测试",
          sample: "第二轮 28 份逐字稿，2025 年 9 月 17–24 日；其中 5 场是我做的",
          question: "没有我坐在旁边，学生能不能自己把这些功能用起来？",
          finding:
            "活动卡片一边显示「已报名」，一边还留着报名按钮；一个次级按钮没人看得出是干什么的；没有回上一页的入口；「Skill swap」这个标签本身讲不清自己。",
          implication: "状态反馈和导航才是当下的阻塞点，比匹配质量早得多。",
        },
        {
          method: "任务式可用性测试",
          sample: "第三轮 10 份逐字稿，2025 年 11 月 8–12 日；其中 2 场是我做的",
          question: "学生能不能独自走完一整条链路——创建圈子、设可见范围、进聊天室、发言、再回到列表？",
          finding:
            "链路走通了。受测者把配色化的首页读成了整个应用的地图。但 Circles 的入口不是一眼看到的，他是在侧栏里找到的。",
          implication: "进到流程里之后是站得住的；进得去与否，仍然取决于能不能找到那个入口。",
        },
      ],
      iterations: [
        {
          version: "可点击原型，九月",
          change: "直接拿已经做出来的功能集去测，让受测者出声思考。",
          reason: "当时敞着的风险是「学生能不能自己用」，不是「他们喜不喜欢这个点子」。",
          improvement: "抓出了导航与状态缺陷——这些东西在一场演示式走查里会被直接讲过去。",
        },
        {
          version: "纸面，10 月 3 日",
          change:
            "把应用重画成五个屏——首页、学习伙伴、校园地图上的附近圈子、wellness、资源中心——并为每条从首页出发的路径画上箭头。",
          reason: "结构性的缺陷需要结构性的回答，而纸是给出这个回答最便宜的地方。",
          improvement: "产出了一套开发可以照着走的骨架，每块功能都落到了具体的人身上。",
        },
        {
          version: "24 屏 MVP，十一月",
          change: "把这些屏做成共享的组件系统，用 React context 承载跨屏状态，而不是每个屏各写各的样式。",
          reason: "24 个屏、五个人各自手写样式，撑不了多久就不像同一个产品了。",
          improvement: "十一月的测试跑在同一套视觉系统上，受测者靠它的配色去预测东西在哪里。",
        },
      ],
      limits: [
        {
          constraint: "MVP 跑在 mock 数据上。后端写了，但从来没接上去。",
          whyItMatters:
            "匹配、消息和日程从未面对过真实记录、并发或空状态。这几轮测的是一个界面，不是一个能用的产品。",
          nextValidation: "把 API 层接上，用同一条任务链重跑一次，专门盯列表为空、消息变慢的时候会怎么塌。",
        },
        {
          constraint: "没有做前后测量。",
          whyItMatters:
            "我能说九月那个导航缺陷在十一月没有再出现。我说不出改善了多少——因为没有任何一轮记录过完成时间或事先定好的成功标准。",
          nextValidation: "带着计时和事先写好的及格线重跑十一月那条链路，让这一轮产出一个数字，而不是一个印象。",
        },
        {
          constraint: "这是五个人的团队，不是我一个人做的。",
          whyItMatters: "组件系统、共享状态层和我自己那几轮访谈之外的部分，都是别人的工作。",
          nextValidation: "可以直接问我负责哪几块，提交记录会和我说的对得上。",
        },
      ],
      takeaway:
        "这个案例证明我能把研究做成「有可能证明自己错」的样子，再把活下来的结论落进一套 24 个屏共用的组件系统里。",
    },
    spectra: {
      decisions: [
        {
          label: "字体打包进扩展，不走 CDN",
          choice:
            "OpenDyslexic 直接打包在扩展里，不在运行时去远端取。",
          evidence:
            "远端字体请求会把「谁在读哪一页」告诉第三方，而且主机一变或者断网就失效。",
          tradeoff:
            "安装包更大，字体也只能靠发新版本更新。",
          impact:
            "离线能用，也不会泄露读者的浏览行为。",
        },
        {
          label: "设置按站点保存，不做全局",
          choice:
            "每个域名各自保存自己的间距和字体状态。",
          evidence:
            "在密集的文档页有用的宽行距，放到新闻站就是多余的；一个全局开关只会逼读者反复切换。",
          tradeoff:
            "存储上要多记一层，第一次访问新站点也是没有样式的。",
          impact:
            "读者对一个站点设置一次，之后就一直是那样。",
        },
        {
          label: "控件放 popup，不放右键菜单",
          choice:
            "所有控件集中在工具栏打开的一个 popup 面板里。",
          evidence:
            "右键菜单把「能调什么」藏在一次右键后面，而且一次只显示一项。",
          tradeoff:
            "够到控件要点两次而不是一次，也占用了工具栏位置。",
          impact:
            "能调的东西一眼看全，不需要靠摸索发现。",
        },
      ],
      evidence: [
        {
          method: "Guideline review",
          sample: "WCAG 文本间距条款",
          question: "这个工具至少要开放哪些排版属性，才算有用？",
          finding: "行高、字距、词距、段距，这四项有明确阈值可依。",
          implication: "控件就定在这四项上，而不是做成一个通用 CSS 编辑器。",
        },
        {
          method: "Cross-site injection testing",
          sample: "手动跑文档站、新闻站与单页应用",
          question: "注入的样式在什么地方会输给网页自己的 CSS？",
          finding: "内联样式和高优先级选择器会盖掉注入层；单页应用一切换路由就把它重新渲染掉了。",
          implication: "内容脚本必须在路由变化时重新应用，不能只在页面加载时跑一次。",
        },
        {
          method: "Unit tests",
          sample: "Jest 覆盖设置与工具层",
          question: "按站点保存的状态，经得起保存、重载和重置吗？",
          finding: "持久化逻辑所在的工具层已经被覆盖。",
          implication: "设置出问题会在到达页面之前就被测出来。",
        },
      ],
      iterations: [
        {
          version: "样式注入",
          change: "先做一个内容脚本，往页面里写一段样式表。",
          reason: "这是能看出「这个想法成不成立」的最小实现。",
          improvement: "简单页面能用，遇到优先级强的网站就失效。",
        },
        {
          version: "popup 控件",
          change: "加了 popup 面板，放四项间距控件和字体切换。",
          reason: "要手改数值的东西，没人会用第二次。",
          improvement: "「能调到什么程度」从暗示变成了看得见。",
        },
        {
          version: "按站点保存 + 双语界面",
          change: "加上按域名持久化，以及中英两套语系文件。",
          reason: "每次访问都重置的设置比没有设置更糟，而且我两种语言都读。",
          improvement: "它从一个注入演示，变成了每天真能用的东西。",
        },
      ],
      limits: [
        {
          constraint: "真正需要它的人，一个都还没用过。",
          whyItMatters: "这里每一个控件都是从准则推出来的，不是看着谁读得吃力才做的。",
          nextValidation: "找那些真的依赖宽间距或阅读障碍字体的人坐下来看，他们从来不碰哪几个控件。",
        },
        {
          constraint: "它是 DEMO，不是已发布的扩展。",
          whyItMatters: "它没经历过 Chrome 应用商店审核、自动更新，也没遇到过网站在它脚下改版。",
          nextValidation: "先发出去，然后看哪些网站先坏、坏得多快。",
        },
      ],
      takeaway:
        "这个案例证明我能把无障碍准则做成一个真能用的工具，并让它在我控制不了的页面上继续可用。它还不能证明这个工具帮到了谁。",
    },
    maze: {
      decisions: [
        {
          label: "用震动取代电击方案",
          choice: "最初的陷阱反馈是轻微电击。我改成用继电器驱动的震动马达，装在手指套里。",
          evidence: "这台迷宫要放在公开展览上，玩家年龄与身体状况未知且无人全程看管，无法逐人取得同意与校准。",
          tradeoff: "震动的刺激强度不如电击，陷阱少了那种「让人记住」的冲击感。",
          impact: "系统不需要有人守着每一轮也能展出，而反馈依然有效——因为它落在手指上，不是落在屏幕上。",
        },
        {
          label: "给红外传感器加防抖，而不是直接信任原始读数",
          choice: "我为 10 个 FC-51 红外传感器各自加上防抖与冷却窗口。",
          evidence: "球经过一次会产生多个原始触发事件，导致同一个物理事件重复计分、重复触发陷阱。",
          tradeoff: "冷却窗口会带来一段盲区，真的很快的第二次经过会被漏掉。",
          impact: "一个物理事件变成一个游戏事件，这是计分、计时与震动能彼此对上的前提。",
        },
        {
          label: "把倾斜控制器从主反馈控制器上拆出来",
          choice: "平台倾斜改由独立的 SafeTouchServoController 负责，采用「按住才动」的行为，与主 PlanB 反馈固件分开。",
          evidence: "舵机运动和对时间敏感的传感器轮询挤在同一块板上，会让反馈时机不稳定，而且一次舵机故障可能拖垮整轮。",
          tradeoff: "两个控制器意味着更多接线，布展时也多了一个故障点。",
          impact: "反馈时机不再和执行机构抢资源，「按住才动」也让倾斜功能可以安全地交给陌生人操作。",
        },
        {
          label: "做一个同时支持 demo 与 live 模式的浏览器控制台",
          choice: "我做了一个 Web Serial 控制台，既能镜像实体迷宫，也能独立以 demo 模式运行。",
          evidence: "硬件并不是随时都在手边——开发期间如此，放进作品集或面试场合更是如此。",
          tradeoff: "两种模式意味着两条代码路径，可能各自漂移。",
          impact: "没有实体也能查看这套系统，而回归测试保证 demo 不会偏离固件的真实规则。",
        },
      ],
      evidence: [
        {
          method: "传感器台架测试",
          sample: "10 个 FC-51 红外传感器，分布在陷阱区、诊断区、备用区与终点区",
          question: "球经过一次，是否刚好产生一个游戏事件？",
          finding: "原始读数会重复触发两到三次；加上防抖与冷却窗口后，一次经过收敛成单一事件。",
          implication: "传感器时序是交互设计问题，不只是电子细节。",
        },
        {
          method: "固件与网页一致性回归测试",
          sample: "覆盖串口同步、反馈同步、舵机响应与音频一致性的回归测试",
          question: "任一侧改动之后，浏览器控制台是否仍然与固件行为一致？",
          finding: "只要单独改一侧，反馈时机与串口事件结构就会出现漂移。",
          implication: "这个 demo 可以被当成对真实系统的描述，而不是另一套说法。",
        },
        {
          method: "公开展览游玩观察",
          sample: "大学展览中的多人游玩；未做正式场次记录",
          question: "玩家不经讲解，能否理解系统在告诉他们什么？",
          finding: "玩家对震动和音效的反应比对计分显示更快，而且手指套需要别人帮忙戴，自己戴不顺。",
          implication: "可穿戴的佩戴方式与布置流程本身就是交互的一部分，不是交互开始前的杂事。",
        },
      ],
      iterations: [
        {
          version: "电击陷阱",
          change: "从以轻微电击为核心的陷阱概念开始。",
          reason: "那是「你踩到陷阱了」最直接的版本。",
          improvement: "把安全与知情同意的问题摆到台面上，逼出了重新设计。",
        },
        {
          version: "震动手指套",
          change: "陷阱反馈改为继电器驱动的震动马达，装进可穿戴手指套。",
          reason: "反馈必须传到玩家身上，同时不能带来需要专人看管的风险。",
          improvement: "保住了身体层面的感受，同时让迷宫可以安全地面对排队的陌生人。",
        },
        {
          version: "同步反馈闭环",
          change: "把传感器事件、计分、计时、灯光、音效与浏览器控制台接到同一个回合状态机上。",
          reason: "各子系统各自反应时，整台迷宫像是一堆互不相干的小装置。",
          improvement: "现在一个事件会产生一组连贯的多通道反馈，玩家读得懂。",
        },
      ],
      limits: [
        {
          constraint: "展览游玩是观察记录，没有做数据埋点。",
          whyItMatters: "我能描述玩家对什么有反应，但无法量化哪一种反馈通道承载了最多信息。",
          nextValidation: "记录每场的传感器事件、反馈触发与完成时间，再对比选择性关闭某些通道的回合。",
        },
        {
          constraint: "这是一台展览用的单机，不是可量产的产品。",
          whyItMatters: "接线是手工走的，校准要按场地来，所以它无法证明耐久性、良率或可重复的组装流程。",
          nextValidation: "改用制作好的线束重做一台，并在多个场地测量布置时间与传感器漂移。",
        },
      ],
      takeaway:
        "这个案例证明我能把一个交互概念一路做穿固件、感测与实体反馈，再接回浏览器控制界面，并在陌生人真的会上手的硬件上做安全与校准判断。",
    },
    vigil: {
      decisions: [
        {
          label: "语料自己写，不下载现成的",
          choice: "140 封邮件全部在一家虚构公司的设定里从头写，没有取自 SpamAssassin、Nazario 或 Enron。",
          evidence:
            "公开语料都是 2002–2015 年的邮件，带真实个资，而线索高亮需要精确到字元的偏移量——只有受控撰写才保证得了。",
          tradeoff: "构建型测试素材换来的是控制力，代价是生态效度：这里没有任何东西能证明界面在真实邮件里的表现。",
          impact: "错误的落点、难度分布和线索偏移全部变成可设计的参数，而不是数据集的偶然产物。",
        },
        {
          label: "刻意把置信度做成弱证据",
          choice: "置信度经过分层采样，无法单独预测分类器判错在哪里；一旦这个性质失效，建构脚本直接让 build 失败。",
          evidence:
            "第一版的置信度是完全可分离的——判对的全在 0.84 以上，判错的全在 0.82 以下。使用者只读数字、一封邮件都不看，就能抓出全部 17 个错误。",
          tradeoff: "之后每一次内容修改都得先过统计闸门，语料的改动成本变高了。",
          impact: "错误排序 AUC 现在是 0.72（上限 0.75），含 7 个高置信度错误与 36 个低置信度但判对的案例——界面这个问题才问得下去。",
        },
        {
          label: "解释由该封邮件自己的线索组装",
          choice: "分类器那一句解释改成从邮件里实际存在的线索拼出来，不再从一个固定文案池里抽。",
          evidence: "抽查发现 em_052 被解释成「外部寄件人带附件或登入提示」，但那封信两者都没有。",
          tradeoff: "由线索驱动的解释读起来比手写的更公式化。",
          impact: "解释品质本身就是研究对象——参与者一旦识破解释是假的，后面所有测量都被污染。",
        },
        {
          label: "测试之前先把预测写下来",
          choice: "我预期哪个变体会赢、每个赌注押的是什么，在翻动第一个变体之前就写进了仓库。",
          evidence: "事后补的预测永远和结果一致，因此完全不能当作推理过程的证据。",
          tradeoff: "这等于把一个可能猜错的判断永久留在记录里。",
          impact: "预测与结果之间的落差，反而成了这份记录里最有价值的东西——无论哪个方向。",
        },
      ],
      evidence: [
        {
          method: "语料验证闸门",
          sample: "140 封合成邮件，17 个分类器错误（9 个误报、8 个漏报）",
          question: "光看置信度这个数字，能不能判断出分类器错在哪里？",
          finding: "第一版完全可以。分层重采样之后，错误排序 AUC 是 0.72，其中有 7 个高置信度错误。",
          implication: "测试素材必须先被工程化，界面这个问题才有得测。",
        },
        {
          method: "解释内容审查",
          sample: "把生成的解释逐条对回它所解释的那封邮件",
          question: "分类器给出的理由，和它正在判断的那封信对得上吗？",
          finding: "从固定文案池抽出来的解释，描述了邮件里根本不存在的线索。",
          implication: "解释的可信度是研究的前提，不是收尾时的打磨项。",
        },
        {
          method: "对比度实测",
          sample: "配色里每一组文字与底色的搭配，用脚本量测，不靠肉眼",
          question: "这套配色在正常字号下守得住 WCAG AA 吗？",
          finding: "有一个侧栏色以 4.41 未过，调整后为 5.11；整套配色现在全数通过。",
          implication: "无障碍是量出来的，不是假设出来的，而且改配色之后可以直接重跑。",
        },
        {
          method: "原型冒烟测试",
          sample: "八种变体组合、176 条断言，跑的是真实的决策程式码",
          question: "三个变体的每一种组合下，决策与计分逻辑还站得住吗？",
          finding: "176 条全过；React 版本另有 101 个单元测试覆盖同一套规则。",
          implication: "重写有了行为基准，某个变体不会在通往 Phase 3 的路上悄悄弄坏计分。",
        },
      ],
      iterations: [
        {
          version: "第一版视觉",
          change: "灰底白卡片、安全的蓝色强调色、同一屏上六个大写加字距的标签、全篇 system-ui。",
          reason: "这是任何生成器都会先给出的默认解，而且它并不差。",
          improvement: "被否决。它看起来像一个软件，而不像一个判断——问题就出在这句话上。",
        },
        {
          version: "仪器，而不是收件箱",
          change: "系统说的每一句话改成等宽字，只有邮件正文留在文字字体里；判定靠字重与一条横线承载，不用色块卡片。",
          reason: "着色的判定卡片会赋予分类器它并没有挣得的权威；而仿冒藏在字母对里，比例字体恰好会把那几对挤在一起。",
          improvement: "读者必须真的去读那个词，仿冒域名也仍然看得出是仿冒。",
        },
        {
          version: "行业惯例补强",
          change: "补上认证结果与「它证明不了什么」的附注、域名首见时间、campaign 聚类提示，以及升级时的选填备注。",
          reason: "对照真实邮件安全产品做了一次审计，发现界面缺了分析师本来就期待看到的信号。",
          improvement:
            "最锋利的教学案例因此成立：用真实个人邮箱寄出的 CEO 诈骗，在一个 1995 年注册的域名上通过了每一项认证检查。",
        },
      ],
      limits: [
        {
          constraint: "目前还没有任何一个受试者跑过它。",
          whyItMatters:
            "三个设计问题全都还开着。这个案例里每一个支持某个变体的论证都是推理，不是证据——预测之所以留在记录里，就是为了让这件事一直看得见。",
          nextValidation: "按已经写好的 config 轮替表跑完五场走廊测试，再回头把「选了哪个 / 为什么 / 放弃了什么」填上。",
        },
        {
          constraint: "语料是合成的，分类器是脚本写死的。",
          whyItMatters: "错误落在哪里是我安排的，所以它衡量的是界面如何塑造监督行为，而不是一个真实检测系统会怎么失败。",
          nextValidation: "诚实的版本需要一个组织方合作与伦理审查，这超出了课程项目的范围。",
        },
        {
          constraint: "评估实验设计好了，但还没跑。",
          whyItMatters: "对照设计、测量指标、以及那张 2×2 收益矩阵，目前都只存在于纸面上。",
          nextValidation: "招募 8–12 人，每人跑两个条件，就算两组之间没有显著差异也照样把结果写出来。",
        },
      ],
      takeaway:
        "这个案例证明我能把一份研究 brief 变成一套真的跑得起来的系统——语料、变体、测试脚本，以及一道材料一旦失效就让 build 挂掉的验证闸门——同时证明我能指挥 AI 写代码，而不把设计论证一并交出去。",
    },
    hoop: {
      decisions: [
        {
          label: "先写美术圣经，再开始生成",
          choice: "先写三份参考文档——像素球员、有机场景、扁平队徽——之后每一批的 prompt 都引用它们。",
          evidence:
            "生成的美术会漂。每一批单独看都说得过去，漂移只有在它们同框的时候才看得出来——而那时候你已经有几百个文件要收拾了。",
          tradeoff: "在看到产出之前就把规则定死，等于对一个还没被验证过的风格先下注。",
          impact: "六个批次 299 张资产共用同一套配色和同一种线条语言，因为规则比产量先存在。",
        },
        {
          label: "按批次过风格闸门，并且写清楚拒绝什么",
          choice:
            "每一批都要对照已有的运行时锚点过一道风格闸门，并附明确的拒绝清单：写实照片、3D、动漫、霓虹、随机文字、真实商标。",
          evidence: "只要 prompt 稍微变一点，生成器会很乐意给你上面任何一种，而且每一种单独看都站得住。",
          tradeoff: "闸门会打掉真的花了时间做出来的东西；批次已经晚了的时候，人很容易想放一个「差一点」的过去。",
          impact: "拒绝清单才是承重的那一半。说清楚这个世界「不是什么」，比描述它「是什么」更能落地。",
        },
        {
          label: "用 146 个节点压缩一生，而不是模拟日历",
          choice:
            "从 12 岁到退役的生涯，跑在 146 个节点上，分八种类型——训练、比赛、剧情、关系、风险、奖励、休息、传承——而不是一天一天地模拟。",
          evidence: "以日历为单位的生涯模拟，大部分运行时间都花在重复上，真正有意思的决定被埋在维护性点击里。",
          tradeoff: "离散节点会丢掉「一个赛季慢慢磨过去」的质感，玩家感受不到时间用慢的方式流逝。",
          impact:
            "每个节点都得挣得自己的位置，而行动的组合会留下后果——反复训练会抬高竞技状态，同时抬高身体风险和压力、拉低队友信任。",
        },
        {
          label: "视觉语言是从一个产品反推的，而且明说",
          choice:
            "配色与字体系统是从 Anthropic 的产品设计反推出来的——羊皮纸底色、赤陶强调色、全部暖调中性色——并且在设计文档里写明来源。",
          evidence: "一个讲「一个人的一生」的游戏，需要的表层是从容的、带文学感的，而不是一套塞满冷蓝和能量渐变的体育 UI。",
          tradeoff: "这是借来的语言，不是发明出来的；认得出来源的人一眼就会认出来。",
          impact: "把来源写进设计文档，才让它成为一次迁移练习，而不是一次没署名的挪用。",
        },
      ],
      evidence: [
        {
          method: "批次生产记录",
          sample: "六个批次：头像 64、场景 40、CG 73、UI 图标 72、球场战术 18、静态特效 32",
          question: "生成的美术，能不能在一个没人会手绘完的量级上保持同一种风格？",
          finding: "299 张资产全部对照美术圣经的锚点过了风格闸门；记录写的是每个阶段的数量，不只是一个总数。",
          implication: "这条管线是可审计的——任何人都能问某张图出自哪一批、按哪套规则查过。",
        },
        {
          method: "自动化回归测试",
          sample: "355 个测试文件、1975 个测试，覆盖生涯、合同、伤病、赛季与存档系统",
          question: "一个系统很重的生涯模拟，在内容持续落地的同时还能保持正确吗？",
          finding: "1975 个全过；存档数据带 schema 版本号，旧存档会被迁移，而不是悄悄坏掉。",
          implication: "这里的规模是一个设计约束，不是拿来炫的——没有它，加一章会安静地弄坏三章之前的一条合同规则。",
        },
        {
          method: "可玩性实测",
          sample: "线上公开版本，从主菜单一路走过角色创建，进到第一个生涯节点",
          question: "对一个刚进来、什么都不知道的人，这个循环真的跑得起来吗？",
          finding:
            "角色创建卡在「姓名必填」上，打法风格的选择会传导进六维属性，第一个节点打开时状态、关系网和可选行动全部就位。",
          implication: "这些系统是端到端接通的，接缝处没有拿假数据糊过去。",
        },
      ],
      iterations: [
        {
          version: "概念",
          change: "定位成像素风生涯模拟，参考 NBA 2K MyCareer、Punch Club、New Star Soccer 与 Stardew Valley。",
          reason: "每个参考各解决一块：生涯弧、属性衰减、场外生活、日常循环的满足感。",
          improvement: "先说清楚各自要借什么，scope 才没有膨胀成「做一个篮球游戏」。",
        },
        {
          version: "系统搭建",
          change: "选秀、合同、赛季、休赛期、退役、New Game+ 与战术比赛全部作为系统落地。",
          reason: "一个生涯模拟有多好玩，取决于它能把后果扛过多长的游戏时间。",
          improvement: "现在一段生涯可以从少年走到退役，并被封存成 Legacy，影响下一周目。",
        },
        {
          version: "美术管线",
          change: "从零散生成，改成美术圣经 + 批次 prompt + 风格闸门 + 生产记录。",
          reason: "最早那批资产单看都不错，但它们彼此对不上。",
          improvement: "一致性变成流程的属性，而不是每张图都要重新吵一次的事。",
        },
      ],
      limits: [
        {
          constraint: "没有做过玩家研究。游戏自己标的是 DEMO v0.6。",
          whyItMatters: "这里的一切都是系统设计和生产纪律。这套节奏对一个不是我的人管不管用，还没测过。",
          nextValidation: "找五个平时不看篮球的人玩第一章，看这些系统在哪一步开始讲不清自己。",
        },
        {
          constraint: "首包偏大，移动端真机 QA 不足。",
          whyItMatters: "3.8 MB 的 JS 首包在手机上是实打实的门槛——而华语玩家恰恰主要在手机上遇到它。",
          nextValidation: "先做代码分包，再补真机 QA，然后才谈公开测试。",
        },
        {
          constraint: "视觉语言是反推来的，不是原创的。",
          whyItMatters: "它是从一个既有产品的设计系统迁移过来的；把它说成原创就是不诚实。",
          nextValidation: "把这套系统推到来源到不了的地方——篮球特有的那些界面，就是它必须停止「借」的位置。",
        },
      ],
      takeaway:
        "这个案例证明我能在一个「本来一定会失控」的量级上跑生成式生产——靠先写规则、按规则设闸门、并且写清楚什么会被拒——同时让一个系统很重的实现在 1975 个测试下保持正确。",
    },
  },
};



const caseInterviewScans: Record<ProofLocale, Record<ProjectEvidenceSlug, CaseInterviewScan>> = {
  en: {
    connect: {
      proves:
        "This case proves I can run research capable of proving itself wrong, then carry what survives into a component system twenty-four screens share.",
      inspect: [
        "The hypotheses that failed their own pre-written threshold, and what replaced them.",
        "Why the team went back to paper in October instead of patching the prototype.",
        "What the November task chain established, and what it could not.",
      ],
      questions: [
        "Which of your assumptions did the research kill, and how did you find out?",
        "You were one of five. Which parts of this are yours?",
      ],
      bestFit: [
        "Product teams where a designer is expected to build as well as research.",
        "Roles where research has to survive contact with a delivery deadline.",
      ],
    },
    spectra: {
      proves:
        "This case proves I can turn accessibility guidance into a working tool, and keep it working on pages I do not control.",
      inspect: [
        "Why the font is bundled in the extension instead of fetched from a CDN.",
        "Why settings are saved per site rather than globally.",
        "Where injected styles lose to a page's own CSS, and what that forced.",
      ],
      questions: [
        "How do you make injected styles win without breaking the layout?",
        "What would you watch first if you put this in front of a real reader?",
      ],
      bestFit: [
        "Accessibility teams that want a designer who can also ship the tool.",
        "Product teams where design work reaches the browser, not just the mockup.",
      ],
    },
    maze: {
      proves:
        "This case proves I can build the thing, not just specify it: sensing, firmware, physical feedback, and a browser control surface wired into one loop.",
      inspect: [
        "Why the electric-shock trap became vibration in wearable finger sleeves.",
        "How sensor debounce turned one ball pass into exactly one game event.",
        "How the Web Serial console keeps demo mode honest about firmware rules.",
      ],
      questions: [
        "Where did hardware constraints change the interaction rather than just the build?",
        "What would you instrument to learn which feedback channel players actually use?",
      ],
      bestFit: [
        "Design technologist, creative technologist, or prototyping roles.",
        "Teams building physical products, installations, or hardware-software interfaces.",
      ],
    },
    vigil: {
      proves:
        "This case proves I can design the conditions under which a study is worth running — and direct an AI coding workflow through spec, corpus, variants, and protocol without losing the design argument.",
      inspect: [
        "Why the classifier's confidence had to be made a deliberately weak signal before any interface question could be asked.",
        "Why the variant predictions were written down before testing, and what each one bets on.",
        "What the interface refuses to do: no search, no batch actions, no severity tiers, no success green.",
      ],
      questions: [
        "How do you design an interface that makes someone check an AI rather than defer to it?",
        "What did you keep for yourself when an AI wrote all the code?",
      ],
      bestFit: [
        "AI UX, human-AI interaction, and trust-and-safety teams.",
        "Teams that need a designer who can specify a system precisely enough to be built fast.",
      ],
    },
    hoop: {
      proves:
        "This case proves I can run generative production at a volume that would otherwise go incoherent, and keep a systems-heavy build correct while content keeps landing.",
      inspect: [
        "Why the art bible was written before any asset was generated, not after the drift showed up.",
        "Why the rejected-style list turned out to be the load-bearing half of the style gate.",
        "Why a career runs on 146 discrete nodes instead of a simulated calendar.",
      ],
      questions: [
        "How do you keep hundreds of generated assets looking like one world?",
        "The visual language is derived from another product's design system — how do you think about that?",
      ],
      bestFit: [
        "Teams shipping generative content pipelines who need coherence, not just throughput.",
        "Games, narrative systems, or any product where content volume is the design problem.",
      ],
    },
  },
  zh: {
    connect: {
      proves:
        "这个案例证明我能把研究做成「有可能证明自己错」的样子，再把活下来的结论落进一套 24 个屏共用的组件系统里。",
      inspect: [
        "哪几条假设没过自己事先写好的门槛，以及后来换成了什么。",
        "十月为什么选择回到纸上重画，而不是去补那个原型。",
        "十一月那条任务链证明了什么，又有什么是它证明不了的。",
      ],
      questions: [
        "研究杀掉了你哪些假设？你是怎么发现的？",
        "你们是五个人。这里面哪些部分是你的？",
      ],
      bestFit: [
        "期待设计师既做研究也能动手写的产品团队。",
        "研究必须在真实交付期限下活下来的岗位。",
      ],
    },
    spectra: {
      proves:
        "这个案例证明我能把无障碍准则做成一个真能用的工具，并让它在我控制不了的页面上继续可用。",
      inspect: [
        "为什么字体打包进扩展，而不是从 CDN 取。",
        "为什么设置按站点保存，而不是做成全局。",
        "注入的样式在哪里会输给网页自己的 CSS，以及这件事逼出了什么改动。",
      ],
      questions: [
        "怎么让注入的样式赢过网站，又不把布局撑坏？",
        "如果把它交到一个真实读者手上，你会先看什么？",
      ],
      bestFit: [
        "希望设计师能顺手把工具做出来的无障碍团队。",
        "设计工作要一路做到浏览器里、而不是停在稿子上的产品团队。",
      ],
    },
    maze: {
      proves:
        "这个案例证明我不只是写规格，而是真的做得出来：感测、固件、实体反馈与浏览器控制界面被接成同一个闭环。",
      inspect: [
        "为什么电击陷阱最后变成了可穿戴手指套里的震动。",
        "传感器防抖如何把一次球的经过收敛成刚好一个游戏事件。",
        "Web Serial 控制台如何让 demo 模式忠于固件规则。",
      ],
      questions: [
        "硬件约束在哪些地方改变了交互本身，而不只是改变了实现方式？",
        "你会记录什么数据，才能知道玩家真正依赖哪一种反馈通道？",
      ],
      bestFit: [
        "Design technologist、creative technologist 或原型开发岗位。",
        "做实体产品、装置或软硬件接口的团队。",
      ],
    },
    vigil: {
      proves:
        "这个案例证明我能先把「这个实验值不值得做」的条件设计好，并且能带着 AI 走完规格、语料、变体到测试脚本的全程，而不把设计论证一起交出去。",
      inspect: [
        "为什么必须先把分类器的置信度做成弱信号，界面这个问题才问得下去。",
        "为什么变体预测要写在测试之前，以及每一个预测押的是什么。",
        "这个界面刻意不做什么：没有搜索、没有批量操作、没有严重度分级、没有代表成功的绿色。",
      ],
      questions: [
        "你怎么设计一个界面，让人真的去复核 AI，而不是顺着它点下去？",
        "代码全部由 AI 写的时候，你把什么留给了自己？",
      ],
      bestFit: [
        "AI UX、人机协作与 trust & safety 团队。",
        "需要一个能把系统说清楚到可以被快速实现的设计师的团队。",
      ],
    },
    hoop: {
      proves:
        "这个案例证明我能在一个本来一定会失控的量级上跑生成式生产，并且在内容持续落地的同时，让一个系统很重的实现保持正确。",
      inspect: [
        "为什么美术圣经写在生成之前，而不是等风格漂了才补。",
        "为什么「拒绝清单」才是风格闸门里承重的那一半。",
        "为什么一段生涯跑在 146 个离散节点上，而不是模拟日历。",
      ],
      questions: [
        "几百张生成的资产，你怎么让它们看起来还是同一个世界？",
        "这套视觉语言是从别人的产品设计系统反推来的——你怎么看这件事？",
      ],
      bestFit: [
        "在做生成式内容管线、要的是一致性而不只是产能的团队。",
        "游戏、叙事系统，或任何「内容体量本身就是设计问题」的产品。",
      ],
    },
  },
};

const sharedCaseReaderSections: CaseReaderSection[] = [
  {
    id: "snapshot",
    label: "Snapshot",
    description: "Problem, role, evidence, outcome.",
  },
  {
    id: "interviewer-scan",
    label: "2-minute scan",
    description: "The fastest proof route for interviewers.",
  },
  {
    id: "artifact",
    label: "Artifact",
    description: "The visual case artifact.",
  },
  {
    id: "decision-timeline",
    label: "Decisions",
    description: "Choices, evidence, trade-offs, and impact.",
  },
  {
    id: "evidence-board",
    label: "Evidence",
    description: "Methods, samples, findings, and implications.",
  },
  {
    id: "iteration-gallery",
    label: "Iterations",
    description: "How the design changed after testing.",
  },
  {
    id: "outcome-limits",
    label: "Limits",
    description: "Measured results and what still needs validation.",
  },
  {
    id: "interview-takeaway",
    label: "Takeaway",
    description: "The hiring signal this case supports.",
  },
  {
    id: "long-form",
    label: "Deep read",
    description: "The complete case narrative.",
  },
  {
    id: "related-projects",
    label: "Continue",
    description: "Adjacent cases to inspect next.",
  },
];

const sharedCaseReaderModes: CaseReaderMode[] = [
  {
    id: "scan",
    label: "2-minute scan",
    description: "Check relevance quickly.",
    anchorIds: ["snapshot", "interviewer-scan", "artifact", "interview-takeaway"],
  },
  {
    id: "manager",
    label: "Design manager review",
    description: "Inspect decisions, iteration, and limits.",
    anchorIds: [
      "snapshot",
      "decision-timeline",
      "iteration-gallery",
      "outcome-limits",
      "interview-takeaway",
    ],
  },
  {
    id: "research",
    label: "Research evidence review",
    description: "Trace method to product direction.",
    anchorIds: ["snapshot", "evidence-board", "outcome-limits", "long-form"],
  },
  {
    id: "interview",
    label: "Interview prep",
    description: "Find questions and the evidence behind them.",
    anchorIds: ["interviewer-scan", "decision-timeline", "evidence-board", "interview-takeaway"],
  },
];

const caseReaderSections: Record<ProofLocale, CaseReaderSection[]> = {
  en: sharedCaseReaderSections,
  zh: sharedCaseReaderSections,
};

const caseReaderModes: Record<ProofLocale, CaseReaderMode[]> = {
  en: sharedCaseReaderModes,
  zh: sharedCaseReaderModes,
};

const sharedCaseReaderPrompts: Record<ProjectEvidenceSlug, CaseInterviewPrompt[]> = {
  connect: [
    {
      question: "Why write a pass mark for each hypothesis before running any interviews?",
      reason: "Tests whether the research was set up to be able to fail, or only to confirm.",
      anchorId: "decision-timeline",
    },
    {
      question: "Which assumption did the interviews kill, and what did you do about it?",
      reason: "Separates research that changed the product from research that decorated it.",
      anchorId: "evidence-board",
    },
    {
      question: "The MVP runs on mock data. What does that mean you have not proven?",
      reason: "Checks whether the limits of a course project are stated or glossed over.",
      anchorId: "outcome-limits",
    },
  ],
  spectra: [
    {
      question: "Why did you avoid colour-only feedback as the core interaction?",
      reason: "Shows whether accessibility decisions are inclusive in practice, not only compliant.",
      anchorId: "decision-timeline",
    },
    {
      question: "Why bundle the font instead of loading it from a CDN?",
      reason: "Tests judgment around social exposure, glanceability, and user control.",
      anchorId: "evidence-board",
    },
    {
      question: "What would field testing need to prove before shipping?",
      reason: "Grounds the outcome story in lighting, motion, and real-world constraints.",
      anchorId: "outcome-limits",
    },
  ],
  maze: [
    {
      question: "Why did the trap become vibration instead of the original electric shock?",
      reason: "Tests whether safety and consent were treated as design constraints, not afterthoughts.",
      anchorId: "decision-timeline",
    },
    {
      question: "How did you make one ball pass produce exactly one game event?",
      reason: "Checks whether sensor timing is understood as an interaction problem, not just wiring.",
      anchorId: "evidence-board",
    },
    {
      question: "What would you instrument before calling this more than an exhibition unit?",
      reason: "Keeps a working build honest about what was observed versus measured.",
      anchorId: "outcome-limits",
    },
  ],
  vigil: [
    {
      question: "Why did the classifier's confidence have to be a weak signal by construction?",
      reason: "Tests whether the study was designed to be measurable before it was designed to look good.",
      anchorId: "decision-timeline",
    },
    {
      question: "You wrote your predictions before testing. What are you betting on, and why?",
      reason: "Checks whether design reasoning exists independently of the result.",
      anchorId: "evidence-board",
    },
    {
      question: "Nobody has run it yet. What does the case actually prove today?",
      reason: "Keeps an unfinished project honest about the line between built and validated.",
      anchorId: "outcome-limits",
    },
  ],
  hoop: [
    {
      question: "Why write the art bible before generating a single asset?",
      reason: "Tests whether coherence was designed into the process or patched in afterwards.",
      anchorId: "decision-timeline",
    },
    {
      question: "What did the rejected-style list catch that a positive description would not?",
      reason: "Checks whether the style gate is a real constraint or a restatement of taste.",
      anchorId: "evidence-board",
    },
    {
      question: "It says DEMO v0.6 and has no player research. What is it evidence of?",
      reason: "Keeps a large, polished build honest about what volume alone proves.",
      anchorId: "outcome-limits",
    },
  ],
};

const caseReaderPrompts: Record<ProofLocale, Record<ProjectEvidenceSlug, CaseInterviewPrompt[]>> = {
  en: sharedCaseReaderPrompts,
  zh: sharedCaseReaderPrompts,
};


export function getCaseSummary(
  slug: ProjectEvidenceSlug,
  locale: ProofLocale
): CaseSummary {
  return caseSummaries[locale][slug];
}

export function getCaseDepth(
  slug: ProjectEvidenceSlug,
  locale: ProofLocale
): CaseDepth {
  return caseDepth[locale][slug];
}

export function getCaseInterviewScan(
  slug: ProjectEvidenceSlug,
  locale: ProofLocale
): CaseInterviewScan {
  return caseInterviewScans[locale][slug];
}

export function getCaseReaderGuide(
  slug: ProjectEvidenceSlug,
  locale: ProofLocale
): CaseReaderGuide {
  return {
    sections: caseReaderSections[locale],
    modes: caseReaderModes[locale],
    prompts: caseReaderPrompts[locale][slug],
  };
}
