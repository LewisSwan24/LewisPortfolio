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
      challenge: "A portal used by thousands of students hid critical tasks behind staff-facing language and institutional categories.",
      role: "Solo UX researcher and designer",
      methods: ["open card sort", "tree test", "task analysis", "plain-language review"],
      evidence: ["open card sort", "unmoderated tree test", "task walk-through sessions"],
      outcome: "Twelve staff-owned categories became six task-led ones, tree-tested against the original. University project; not deployed.",
      next: "I would run a longitudinal post-launch study to compare search behaviour and support-ticket volume before and after rollout.",
    },
    spectra: {
      challenge: "Colour-dependent decisions were slow, awkward, and socially exposing for colourblind users.",
      role: "Lead UX designer",
      methods: ["interviews", "co-design", "field usability testing"],
      evidence: ["interviews with colourblind users", "competitor tool review", "real-environment testing"],
      outcome: "A one-tap overlay that answers the decision rather than naming the hue, silent by default. Prototype only.",
      next: "I would prototype the zero-state more deeply and test how little feedback the overlay can provide while still being useful.",
    },
    ai: {
      challenge: "Interview prep tools gave content, but they did not reduce the emotional friction of practice.",
      role: "UX designer and researcher",
      methods: ["survey", "interviews", "competitive teardown", "prototype test", "feedback timing test"],
      evidence: ["survey", "depth interviews", "competitive teardown", "moderated prototype sessions"],
      outcome: "Post-session feedback was clearly preferred over mid-answer interruption. Prototype only; no controlled experiment.",
      next: "I would test tone controls that let users choose a gentler or more rigorous interview persona.",
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
      challenge: "一个被大量学生使用的门户，把关键任务藏在部门语言与机构分类后面。",
      role: "独立 UX 研究与设计",
      methods: ["开放式卡片分类", "树测试", "任务分析", "普通语言审查"],
      evidence: ["开放式卡片分类", "非主持树测试", "任务走查"],
      outcome: "把十二个部门分类收敛成六个任务分类，并与原结构做树测试对比。课程项目，未上线。",
      next: "我会继续做上线后的纵向研究，对比搜索行为和支持工单量。",
    },
    spectra: {
      challenge: "对色盲用户来说，依赖颜色的判断既慢、尴尬，也容易暴露个人情况。",
      role: "Lead UX Designer",
      methods: ["访谈", "共创", "真实场景可用性测试"],
      evidence: ["色盲用户访谈", "竞品工具评估", "真实环境测试"],
      outcome: "一个单击即用的叠加层：给决定而不是报色名，默认静音。仅为原型。",
      next: "我会更深入测试 zero-state，验证 AR 覆层最少需要提供多少反馈才足够有用。",
    },
    ai: {
      challenge: "面试准备工具提供内容，但没有真正降低练习时的情绪阻力。",
      role: "UX Designer & Researcher",
      methods: ["问卷", "访谈", "竞品拆解", "原型测试", "反馈时机测试"],
      evidence: ["问卷", "深度访谈", "竞品拆解", "主持式原型测试"],
      outcome: "结束后反馈明显优于答题中打断。仅为原型，没有做受控实验。",
      next: "我会测试语气控制，让用户选择更温和或更严格的 AI 面试官。",
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
          label: "Move from department ownership to task-oriented IA",
          choice:
            "I reorganized the portal around task-oriented IA instead of internal university departments.",
          evidence:
            "Tree testing and task walk-throughs showed students searched by life task, not by staff ownership labels.",
          tradeoff:
            "The structure became less faithful to the institution chart, but easier for students to understand.",
          impact:
            "The proposed IA made findability measurable and gave later navigation decisions a user-centred benchmark.",
        },
        {
          label: "Rewrite labels in plain student language",
          choice:
            "I replaced staff-facing labels with plain-language categories such as Study, Belong, and Fees & finance.",
          evidence:
            "Card-sort patterns and task analysis showed that students grouped information by intent and urgency.",
          tradeoff:
            "Some labels became less administratively precise, but they reduced the translation work required from students.",
          impact:
            "The navigation became easier to scan and supported the measured lift in task success.",
        },
        {
          label: "Validate the IA before increasing visual fidelity",
          choice:
            "I used tree testing before investing in a high-fidelity interface redesign.",
          evidence:
            "The main risk was not visual polish; it was whether students could locate critical tasks.",
          tradeoff:
            "This delayed interface exploration, but it protected the project from polishing the wrong structure.",
          impact:
            "The team could discuss findability and task success before debating layout details.",
        },
      ],
      evidence: [
        {
          method: "Open card sort",
          sample: "Open card sort; group size not formally recorded",
          question: "How do students naturally group portal information when department labels are removed?",
          finding: "Participants clustered content around study, belonging, fees, and campus life tasks.",
          implication: "The IA should lead with student mental models rather than staff ownership.",
        },
        {
          method: "Tree testing",
          sample: "Unmoderated tree test; group size not formally recorded",
          question: "Can students find critical tasks in the proposed hierarchy without interface cues?",
          finding: "The task-led tree beat the department-led original; 'Money' vs. 'My account' had to be renamed and retested.",
          implication: "The task-oriented IA was strong enough to justify moving into interface design.",
        },
        {
          method: "Task analysis",
          sample: "10 task walk-through sessions",
          question: "Where do students hesitate when trying to complete high-importance portal tasks?",
          finding: "Students lost confidence when institutional terms did not match the words in their own task goal.",
          implication: "Labels needed to be tested as product decisions, not treated as copy polish.",
        },
      ],
      iterations: [
        {
          version: "Department map",
          change: "Started from the existing staff-oriented portal categories.",
          reason: "This made the current failure mode visible and gave the redesign a baseline.",
          improvement: "Exposed that navigation mirrored ownership rather than student intent.",
        },
        {
          version: "Task map",
          change: "Collapsed twelve staff-facing areas into six student task groups.",
          reason: "Card sorting and task analysis supported a smaller set of student-facing buckets.",
          improvement: "Reduced scanning effort and made the IA easier to validate through tree testing.",
        },
        {
          version: "Validation-ready tree",
          change: "Refined labels and hierarchy depth for the tree test.",
          reason: "The next decision needed evidence about findability, not another visual mockup.",
          improvement: "Produced a structure that could be tested against the original rather than argued about.",
        },
      ],
      limits: [
        {
          constraint: "The validation focused on information finding, not full post-launch behaviour.",
          whyItMatters:
            "A successful tree test does not prove support tickets or real search behaviour will drop after rollout.",
          nextValidation:
            "Compare search queries, support-ticket volume, and task completion analytics before and after launch.",
        },
        {
          constraint: "The sample represented student tasks more strongly than staff governance needs.",
          whyItMatters:
            "A portal must still remain maintainable for content owners even when the IA is student-facing.",
          nextValidation:
            "Run a content governance review with staff owners after the student-facing hierarchy is stable.",
        },
      ],
      takeaway:
        "This case proves I can restructure complex information architecture around user mental models, then validate the direction through tree testing and measurable findability.",
    },
    spectra: {
      decisions: [
        {
          label: "Use multi-modal feedback instead of colour-only correction",
          choice:
            "I designed multi-modal feedback that combined visual overlays with clear confirmation cues.",
          evidence:
            "Interviews with colourblind users showed that colour labels alone were not enough in fast public decisions.",
          tradeoff:
            "The interface became slightly more complex, but it did not force users to rely on another colour cue.",
          impact:
            "The design supported faster recognition while keeping the interaction inclusive for different colourblind types.",
        },
        {
          label: "Protect privacy in public contexts",
          choice:
            "I kept the assistance lightweight and glanceable so users would not feel exposed while using it.",
          evidence:
            "Participants described colour-dependent tasks as socially awkward when they had to ask others for help.",
          tradeoff:
            "The product avoided heavy explanatory screens, which meant onboarding had to be more concise.",
          impact:
            "The experience respected privacy and made the tool more plausible for real-world use.",
        },
        {
          label: "Move validation into field testing",
          choice:
            "I tested the prototype in realistic environments instead of relying only on desk-based review.",
          evidence:
            "The core risk was whether the AR cue worked under time pressure, movement, and visual noise.",
          tradeoff:
            "Field testing was messier than controlled testing, but it revealed context-specific usability issues.",
          impact:
            "The result was a more credible accessibility case with task success tied to real use conditions.",
        },
      ],
      evidence: [
        {
          method: "Semi-structured interviews",
          sample: "12 colourblind participants",
          question: "Where do colour-dependent tasks create friction, delay, or social exposure?",
          finding: "Participants wanted support that was fast, private, and did not require asking strangers.",
          implication: "The tool needed to solve confidence and privacy, not only colour identification.",
        },
        {
          method: "Co-design workshops",
          sample: "2 workshops with target users",
          question: "Which feedback modes feel helpful without becoming distracting?",
          finding: "Users preferred layered cues that confirmed meaning without overwhelming the scene.",
          implication: "The interaction model should use multi-modal feedback with restraint.",
        },
        {
          method: "Field usability testing",
          sample: "8 real-environment tests",
          question: "Can users complete colour-dependent tasks quickly in realistic public contexts?",
          finding: "In context, participants wanted the decision made, not the colour named — and preferred silence to announcement.",
          implication: "The prototype had enough contextual validity to support the accessibility direction.",
        },
      ],
      iterations: [
        {
          version: "Colour label overlay",
          change: "Started with direct colour naming and simple AR annotation.",
          reason: "It was the clearest way to test whether recognition improved at all.",
          improvement: "Showed that identification helped, but did not fully solve confidence or privacy.",
        },
        {
          version: "Multi-modal cue set",
          change: "Added confirmatory cues beyond colour labels.",
          reason: "Participants needed feedback that worked across colourblind types and noisy contexts.",
          improvement: "Reduced reliance on colour-only interpretation and improved task confidence.",
        },
        {
          version: "Field-tested interaction",
          change: "Simplified the cue timing and visual weight after realistic tests.",
          reason: "The overlay needed to stay useful while users were moving or scanning quickly.",
          improvement: "Made the prototype feel more usable outside a controlled design review.",
        },
      ],
      limits: [
        {
          constraint: "Field testing covered a small number of scenarios and lighting conditions.",
          whyItMatters:
            "AR accessibility tools can behave differently across surfaces, lighting, distance, and motion.",
          nextValidation:
            "Test the interaction across more lighting conditions, device cameras, and high-pressure tasks.",
        },
        {
          constraint: "The prototype tested recognition and satisfaction, not long-term dependence or trust.",
          whyItMatters:
            "A tool that feels useful once may still fail if users cannot trust it repeatedly.",
          nextValidation:
            "Run a repeated-use study that measures trust, error recovery, and abandonment over time.",
        },
      ],
      takeaway:
        "This case proves I can design accessibility interactions with target users, protect privacy in public contexts, and validate inclusive decisions through field testing.",
    },
    ai: {
      decisions: [
        {
          label: "Give feedback after the interview instead of interrupting",
          choice:
            "I prioritized post-session feedback so users could stay immersed during practice.",
          evidence:
            "Prototype testing showed interruption increased self-consciousness during already stressful practice.",
          tradeoff:
            "Users received less immediate correction, but the practice felt more emotionally safe.",
          impact:
            "The AI felt more like a coach than a critic and supported the reported confidence gain.",
        },
        {
          label: "Expose control over coaching tone",
          choice:
            "I shaped the concept around user control over how rigorous or gentle the AI persona should be.",
          evidence:
            "Interviews showed that users had different tolerance for pressure depending on confidence and stage.",
          tradeoff:
            "Tone control adds setup complexity, but reduces the risk of a one-size-fits-all coach.",
          impact:
            "The product direction treated trust as adjustable, not assumed.",
        },
        {
          label: "Design for emotional safety before feature breadth",
          choice:
            "I focused on anxiety reduction and expectation-setting before adding more interview modes.",
          evidence:
            "Survey and interview data showed emotional friction was a primary barrier to practice.",
          tradeoff:
            "The concept became narrower, but more coherent around the core user need.",
          impact:
            "The resulting AI UX had clearer principles for feedback timing, control, and trust.",
        },
      ],
      evidence: [
        {
          method: "Survey",
          sample: "85 responses",
          question: "What prevents job seekers from practicing interviews regularly?",
          finding: "Users described anxiety, uncertainty, and fear of judgment as major blockers.",
          implication: "The assistant needed to reduce emotional cost, not only provide more questions.",
        },
        {
          method: "Depth interviews",
          sample: "Depth interviews; group size not formally recorded",
          question: "What makes interview practice feel safe enough to repeat?",
          finding: "Participants wanted realistic pressure with control over tone and feedback intensity.",
          implication: "AI behaviour needed explicit expectation-setting and user control.",
        },
        {
          method: "Prototype test",
          sample: "Moderated prototype sessions; group size not formally recorded",
          question: "When should the assistant provide feedback without breaking confidence?",
          finding: "Post-session feedback was preferred over interruption during the answer.",
          implication: "Feedback timing became a core interaction design decision.",
        },
      ],
      iterations: [
        {
          version: "Question generator",
          change: "Started with basic interview prompts and answer review.",
          reason: "This tested whether content alone created enough value.",
          improvement: "Revealed that content was useful but did not address anxiety.",
        },
        {
          version: "Coaching flow",
          change: "Added session structure, expectation-setting, and post-session feedback.",
          reason: "Research showed emotional pacing mattered as much as answer quality.",
          improvement: "Made the experience feel safer and more repeatable.",
        },
        {
          version: "Tone-control concept",
          change: "Defined a path for gentle versus rigorous interviewer personas.",
          reason: "Users differed in how much pressure helped them improve.",
          improvement: "Turned AI trust into a controllable product variable.",
        },
      ],
      limits: [
        {
          constraint: "The beta measured self-reported confidence and anxiety rather than hiring outcomes.",
          whyItMatters:
            "Confidence is important, but it does not prove the assistant improves real interview performance.",
          nextValidation:
            "Track repeated practice quality and compare mock interview scores before and after use.",
        },
        {
          constraint: "The AI persona concept was not deeply tested across cultures or seniority levels.",
          whyItMatters:
            "Feedback tone can feel supportive or harsh depending on user background and context.",
          nextValidation:
            "Run tone preference tests across user groups and interview seniority levels.",
        },
      ],
      takeaway:
        "This case proves I can design AI interactions around trust, control, feedback timing, and emotional safety rather than treating AI as a feature layer.",
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
          label: "从部门结构转向 task-oriented IA",
          choice: "把入口从内部部门归属改成学生任务导向的信息架构。",
          evidence: "tree testing 和任务走查显示，学生按生活任务寻找信息，而不是按部门名称寻找。",
          tradeoff: "结构不再完全贴合组织图，但更贴近学生理解方式。",
          impact: "让 findability 成为可衡量指标，也让后续导航判断有了用户基准。",
        },
        {
          label: "用学生语言重写导航标签",
          choice: "把 staff-facing labels 改成 Study、Belong、Fees & finance 等更直接的类别。",
          evidence: "卡片分类和任务分析都显示，学生按意图和紧急程度组织信息。",
          tradeoff: "一些标签牺牲了行政精确性，但降低了学生的理解成本。",
          impact: "导航更容易扫描，也支持了任务成功率提升。",
        },
        {
          label: "先验证 IA，再提高视觉保真度",
          choice: "在高保真界面前先用 tree testing 验证结构。",
          evidence: "项目最大风险不是视觉，而是学生能否找到关键任务。",
          tradeoff: "界面探索被推后，但避免了打磨错误结构。",
          impact: "团队能先围绕 findability 和 task success 讨论方向。",
        },
      ],
      evidence: [
        {
          method: "Open card sort",
          sample: "开放式卡片分类；分组人数未正式记录",
          question: "去掉部门标签后，学生会如何自然组织门户信息？",
          finding: "参与者围绕学习、归属、费用和校园生活这几类任务聚类。",
          implication: "信息架构应该先映射学生心智模型，而不是部门归属。",
        },
        {
          method: "Tree testing",
          sample: "非主持树测试；分组人数未正式记录",
          question: "没有界面提示时，学生能否在新层级中找到关键任务？",
          finding: "按任务划分的结构胜过按部门划分的原版；「Money」和「My account」必须改名重跑。",
          implication: "这套按任务组织的结构够扎实，可以进入界面设计阶段。",
        },
        {
          method: "Task analysis",
          sample: "10 场任务走查",
          question: "学生完成关键任务时在哪里犹豫？",
          finding: "当机构术语和自己的任务目标不一致时，学生会失去信心。",
          implication: "标签需要作为产品决策测试，而不是最后的文案润色。",
        },
      ],
      iterations: [
        {
          version: "Department map",
          change: "从现有 staff-oriented 分类开始。",
          reason: "先明确当前失败模式，给重构提供基线。",
          improvement: "暴露了导航反映 ownership 而不是 student intent。",
        },
        {
          version: "Task map",
          change: "把十二个部门入口收敛为六个学生任务组。",
          reason: "卡片分类和任务分析支持更小、更面向学生的分组。",
          improvement: "减少扫描成本，并让 IA 可以通过 tree testing 验证。",
        },
        {
          version: "Validation-ready tree",
          change: "为树测调整标签和层级深度。",
          reason: "下一步需要 findability 证据，而不是另一个视觉稿。",
          improvement: "产出一个可以拿去和原结构做对比测试的方案，而不是停留在争论。",
        },
      ],
      limits: [
        {
          constraint: "验证主要关注信息查找，而不是上线后的完整行为。",
          whyItMatters: "tree test 成功不等于真实搜索行为和工单量一定下降。",
          nextValidation: "上线前后对比搜索词、支持工单量和任务完成数据。",
        },
        {
          constraint: "样本更偏学生任务，较少覆盖 staff governance。",
          whyItMatters: "门户必须对学生清晰，也要让内容所有者可维护。",
          nextValidation: "在学生层级稳定后，与内容 owner 做治理评审。",
        },
      ],
      takeaway:
        "这个案例证明我能围绕用户心智模型重构复杂 IA，并用 tree testing 和 findability 指标验证方向。",
    },
    spectra: {
      decisions: [
        {
          label: "用 multi-modal feedback 替代单一颜色提示",
          choice: "把视觉 overlay 和确认反馈组合起来，而不是只显示颜色名称。",
          evidence: "色盲用户访谈显示，快速公共场景中只给颜色标签仍然不够。",
          tradeoff: "界面略复杂，但用户不必再依赖另一个颜色线索。",
          impact: "不同色觉类型都能获得更包容的识别支持。",
        },
        {
          label: "保护 public contexts 中的 privacy",
          choice: "让辅助足够轻量、可快速扫读，避免用户在公共场景中被暴露。",
          evidence: "参与者提到向他人求助会让颜色相关任务变得尴尬。",
          tradeoff: "减少解释型界面，要求 onboarding 更克制。",
          impact: "体验更尊重隐私，也更接近真实使用场景。",
        },
        {
          label: "把验证移到 field testing",
          choice: "在真实环境中测试原型，而不只做桌面评审。",
          evidence: "关键风险是 AR cue 能否在时间压力、移动和视觉噪声中工作。",
          tradeoff: "field testing 更不可控，但能暴露情境问题。",
          impact: "让 accessibility 判断和真实任务成功率连接起来。",
        },
      ],
      evidence: [
        {
          method: "Semi-structured interviews",
          sample: "12 colourblind participants",
          question: "颜色依赖任务在哪里带来摩擦、延迟或社交暴露？",
          finding: "参与者需要快速、私密、无需向陌生人求助的支持。",
          implication: "工具要解决 confidence 和 privacy，而不只是识别颜色。",
        },
        {
          method: "Co-design workshops",
          sample: "2 workshops with target users",
          question: "哪些反馈模式有帮助但不过度打扰？",
          finding: "用户更喜欢克制的 layered cues 来确认含义。",
          implication: "交互模型应该使用克制的 multi-modal feedback。",
        },
        {
          method: "Field usability testing",
          sample: "8 real-environment tests",
          question: "用户能否在真实公共场景中快速完成颜色相关任务？",
          finding: "在真实场景里，参与者要的是「该怎么办」而不是色名，也更希望它安静，而不是替他们宣告。",
          implication: "原型有足够情境有效性来支撑 accessibility 方向。",
        },
      ],
      iterations: [
        {
          version: "Colour label overlay",
          change: "从直接命名颜色和简单 AR 标注开始。",
          reason: "先测试识别是否真的改善。",
          improvement: "证明识别有帮助，但还没有解决 confidence 和 privacy。",
        },
        {
          version: "Multi-modal cue set",
          change: "增加颜色标签之外的确认反馈。",
          reason: "参与者需要跨色觉类型、跨复杂环境的反馈。",
          improvement: "减少对颜色单一路径的依赖，提高任务信心。",
        },
        {
          version: "Field-tested interaction",
          change: "真实测试后简化 cue 的时机和视觉重量。",
          reason: "overlay 必须在用户移动和快速扫描时仍然有用。",
          improvement: "让原型更接近真实使用，而不只是设计评审可用。",
        },
      ],
      limits: [
        {
          constraint: "field testing 覆盖的场景和光照条件仍然有限。",
          whyItMatters: "AR accessibility 工具会受表面、光线、距离和运动影响。",
          nextValidation: "在更多光照、设备摄像头和高压力任务中测试。",
        },
        {
          constraint: "原型测试了识别和满意度，没有测试长期 trust。",
          whyItMatters: "一次有用不代表用户会长期信任这个工具。",
          nextValidation: "做重复使用研究，衡量 trust、错误恢复和放弃率。",
        },
      ],
      takeaway:
        "这个案例证明我能和目标用户一起设计 accessibility 交互，保护公共场景隐私，并通过 field testing 验证包容性决策。",
    },
    ai: {
      decisions: [
        {
          label: "把反馈放到面试后",
          choice: "优先使用 post-session feedback，让用户在练习中保持沉浸。",
          evidence: "原型测试显示，中途打断会提高自我意识和紧张感。",
          tradeoff: "即时纠正减少了，但练习更安全、更可重复。",
          impact: "AI 更像 coach，而不是随时打断的 critic。",
        },
        {
          label: "让用户控制 coaching tone",
          choice: "把温和或严格的 AI persona 控制作为方向。",
          evidence: "访谈显示，不同阶段的用户对压力的接受度不同。",
          tradeoff: "tone control 增加设置复杂度，但减少一刀切风险。",
          impact: "trust 被当作可调节的产品变量。",
        },
        {
          label: "先解决 emotional safety",
          choice: "先围绕 anxiety reduction 和 expectation-setting，而不是增加更多模式。",
          evidence: "问卷和访谈都显示情绪阻力是练习的主要障碍。",
          tradeoff: "范围更窄，但更聚焦核心需求。",
          impact: "AI UX 围绕 feedback timing、control 和 trust 建立原则。",
        },
      ],
      evidence: [
        {
          method: "Survey",
          sample: "85 份回收问卷",
          question: "是什么阻碍求职者持续练习面试？",
          finding: "受访者说得最多的三件事：紧张、心里没底、怕被评价。",
          implication: "助手要降低情绪成本，而不是只多给几道题。",
        },
        {
          method: "Depth interviews",
          sample: "深度访谈；分组人数未正式记录",
          question: "什么让面试练习安全到可以重复？",
          finding: "他们既要真实的压力，也要能自己调反馈的强度。",
          implication: "AI 的行为要先讲清楚会发生什么，再把控制权交回给人。",
        },
        {
          method: "Prototype test",
          sample: "主持式原型测试；分组人数未正式记录",
          question: "什么时候给反馈最不破坏信心？",
          finding: "答完再给，比中途打断更受欢迎。",
          implication: "反馈时机因此成为这个产品最核心的交互决策。",
        },
      ],
      iterations: [
        {
          version: "Question generator",
          change: "从基础面试题和回答点评开始。",
          reason: "先测试内容本身是否有足够价值。",
          improvement: "发现内容有帮助，但没有解决 anxiety。",
        },
        {
          version: "Coaching flow",
          change: "加入 session structure、expectation-setting 和 post-session feedback。",
          reason: "研究显示 emotional pacing 和答案质量同样重要。",
          improvement: "让体验更安全，也更容易重复使用。",
        },
        {
          version: "Tone-control concept",
          change: "定义温和/严格 AI interviewer 的方向。",
          reason: "用户对压力的偏好不同。",
          improvement: "把 AI trust 变成可控制的产品变量。",
        },
      ],
      limits: [
        {
          constraint: "beta 更多衡量自报 confidence 和 anxiety，而非真实录用结果。",
          whyItMatters: "信心重要，但不等于真实面试表现提升。",
          nextValidation: "跟踪重复练习质量，并比较使用前后的 mock interview score。",
        },
        {
          constraint: "AI persona 尚未跨文化和资历层级深测。",
          whyItMatters: "反馈语气会因背景和场景被理解成支持或冒犯。",
          nextValidation: "跨用户群和面试资历测试 tone preference。",
        },
      ],
      takeaway:
        "这个案例证明我能围绕 trust、control、feedback timing 和 emotional safety 设计 AI 交互，而不是只把 AI 当功能层。",
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
        "This case proves I can use research evidence to restructure complex information architecture and validate findability.",
      inspect: [
        "How task analysis changed the navigation model.",
        "How card sorting and tree testing shaped the final IA.",
        "How findability and task-success metrics constrained the design.",
      ],
      questions: [
        "How did you decide which navigation labels were user-facing enough?",
        "What would you test next if this portal went into production?",
      ],
      bestFit: [
        "Education, service design, or complex platform teams.",
        "UX roles where IA decisions need research evidence.",
      ],
    },
    spectra: {
      proves:
        "This case proves I can translate accessibility research into inclusive interaction decisions under real-world constraints.",
      inspect: [
        "How colourblind-user interviews shaped the feedback model.",
        "How privacy in public contexts changed the AR interaction.",
        "How field testing exposed environment and lighting constraints.",
      ],
      questions: [
        "How did you prevent colour-only feedback from becoming the core interaction?",
        "What privacy risks would you validate before shipping?",
      ],
      bestFit: [
        "Accessibility, health, public-space, or assistive technology teams.",
        "Product teams that need inclusive design beyond compliance.",
      ],
    },
    ai: {
      proves:
        "This case proves I can design AI feedback flows that protect user control, trust, and emotional safety.",
      inspect: [
        "Why feedback moved from live interruption to post-session coaching.",
        "How tone and confidence language shaped user trust.",
        "How anxiety, control, and usefulness were balanced in the flow.",
      ],
      questions: [
        "Where should AI intervene, and where should it stay quiet?",
        "How would you validate whether feedback improves confidence without increasing stress?",
      ],
      bestFit: [
        "AI UX, learning tools, coaching, or productivity teams.",
        "Teams designing AI assistance around trust and user agency.",
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
        "This case proves I can use research evidence to restructure complex information architecture and validate findability.",
      inspect: [
        "How task analysis changed the navigation model.",
        "How card sorting and tree testing shaped the final IA.",
        "How findability and task-success metrics constrained the design.",
      ],
      questions: [
        "How did you decide which navigation labels were user-facing enough?",
        "What would you test next if this portal went into production?",
      ],
      bestFit: [
        "Education, service design, or complex platform teams.",
        "UX roles where IA decisions need research evidence.",
      ],
    },
    spectra: {
      proves:
        "This case proves I can translate accessibility research into inclusive interaction decisions under real-world constraints.",
      inspect: [
        "How colourblind-user interviews shaped the feedback model.",
        "How privacy in public contexts changed the AR interaction.",
        "How field testing exposed environment and lighting constraints.",
      ],
      questions: [
        "How did you prevent colour-only feedback from becoming the core interaction?",
        "What privacy risks would you validate before shipping?",
      ],
      bestFit: [
        "Accessibility, health, public-space, or assistive technology teams.",
        "Product teams that need inclusive design beyond compliance.",
      ],
    },
    ai: {
      proves:
        "This case proves I can design AI feedback flows that protect user control, trust, and emotional safety.",
      inspect: [
        "Why feedback moved from live interruption to post-session coaching.",
        "How tone and confidence language shaped user trust.",
        "How anxiety, control, and usefulness were balanced in the flow.",
      ],
      questions: [
        "Where should AI intervene, and where should it stay quiet?",
        "How would you validate whether feedback improves confidence without increasing stress?",
      ],
      bestFit: [
        "AI UX, learning tools, coaching, or productivity teams.",
        "Teams designing AI assistance around trust and user agency.",
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
      question: "Why did you move from staff-oriented navigation to task-oriented IA?",
      reason: "Tests whether the IA decision came from user mental models, not taste.",
      anchorId: "decision-timeline",
    },
    {
      question: "Which research signal most changed the final navigation labels?",
      reason: "Connects card sorting, task analysis, and tree testing to product structure.",
      anchorId: "evidence-board",
    },
    {
      question: "What would you validate next before this became the university default?",
      reason: "Checks whether measured findability is being claimed with the right limits.",
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
      question: "How did privacy in public contexts change the AR product model?",
      reason: "Tests judgment around social exposure, glanceability, and user control.",
      anchorId: "evidence-board",
    },
    {
      question: "What would field testing need to prove before shipping?",
      reason: "Grounds the outcome story in lighting, motion, and real-world constraints.",
      anchorId: "outcome-limits",
    },
  ],
  ai: [
    {
      question: "Why did feedback move from live interruption to post-session coaching?",
      reason: "Tests whether the AI UX respects timing, anxiety, and user agency.",
      anchorId: "decision-timeline",
    },
    {
      question: "How did you decide what emotional safety means in an AI interview tool?",
      reason: "Connects trust, tone, and control to a concrete interaction model.",
      anchorId: "evidence-board",
    },
    {
      question: "What would you measure to prove confidence gains are durable?",
      reason: "Checks whether AI assistance is useful beyond a short first-session response.",
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
