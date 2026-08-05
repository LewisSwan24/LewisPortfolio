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
    circles: {
      challenge: "International students wanted fewer, deeper relationships, while social apps rewarded volume and constant messaging.",
      role: "Product designer",
      methods: ["depth interviews", "diary study", "co-design", "research-through-design"],
      evidence: ["depth interviews", "two-week diary study", "co-design workshops"],
      outcome: "The product direction shifted toward small circles, structured prompts, and slow matching.",
      next: "I would instrument for perceived safety and relationship depth, not matches or time spent.",
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
    circles: {
      challenge: "国际学生想要更少但更深的关系，而社交 app 奖励的是数量和持续消息。",
      role: "Product Designer",
      methods: ["深度访谈", "日记研究", "共创", "研究型设计"],
      evidence: ["深度访谈", "两周日记研究", "共创工作坊"],
      outcome: "产品方向转向小组关系、结构化提示和慢匹配。",
      next: "我会衡量安全感与关系深度，而不是匹配数或使用时长。",
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
    circles: {
      decisions: [
        {
          label: "Optimize for slow matching instead of more matches",
          choice:
            "I framed the product around slow matching that gives relationships time to form.",
          evidence:
            "Interviews and diary entries showed students wanted fewer, deeper connections rather than more chats.",
          tradeoff:
            "The concept rejects easy growth metrics, but better matches the loneliness problem.",
          impact:
            "The product direction became more aligned with relationship depth than engagement volume.",
        },
        {
          label: "Use small circles rather than one-to-one discovery",
          choice:
            "I explored small group formats to reduce the pressure of initiating friendship alone.",
          evidence:
            "Co-design sessions suggested that group prompts could make vulnerability feel safer.",
          tradeoff:
            "Groups are harder to coordinate than one-to-one matching, but can lower social risk.",
          impact:
            "Small circles became a structural answer to belonging, not just a feature idea.",
        },
        {
          label: "Measure relationship depth instead of time spent",
          choice:
            "I defined success around perceived safety and relationship depth, not app usage volume.",
          evidence:
            "Academic frameworks and user research both pointed toward belonging quality over activity count.",
          tradeoff:
            "Depth metrics are harder to instrument, but they avoid rewarding shallow interaction loops.",
          impact:
            "The concept kept its social wellbeing purpose intact during product synthesis.",
        },
      ],
      evidence: [
        {
          method: "Depth interviews",
          sample: "Interviews across cultural cohorts; group size not formally recorded",
          question: "What makes friendship difficult for international students after arrival?",
          finding: "Students described social access, cultural uncertainty, and fear of shallow interaction.",
          implication: "The product needed to create safer entry points, not simply increase discovery.",
        },
        {
          method: "Diary study",
          sample: "Two-week diary study; group size not formally recorded",
          question: "When do students feel close to others versus merely socially busy?",
          finding: "Meaningful moments were small, repeated, and contextually specific.",
          implication: "Slow matching and recurring prompts fit the problem better than instant matching.",
        },
        {
          method: "Co-design workshops",
          sample: "3 workshops",
          question: "Which social formats feel safe enough to try with unfamiliar peers?",
          finding: "Small circles and guided prompts reduced the pressure of initiating alone.",
          implication: "The product should structure vulnerability instead of expecting users to create it.",
        },
      ],
      iterations: [
        {
          version: "Open social discovery",
          change: "Started from a broader matching and messaging concept.",
          reason: "This represented the dominant pattern in existing social apps.",
          improvement: "Made clear why more discovery could worsen shallow interaction.",
        },
        {
          version: "Small circle concept",
          change: "Shifted toward small groups, prompts, and shared context.",
          reason: "Research suggested safety and repetition mattered more than match volume.",
          improvement: "Reduced initiation pressure and better supported belonging.",
        },
        {
          version: "Depth-first prototype direction",
          change: "Defined success around relationship depth and perceived safety.",
          reason: "The product needed metrics that matched the social wellbeing goal.",
          improvement: "Protected the direction from drifting into generic engagement optimization.",
        },
      ],
      limits: [
        {
          constraint: "The project has a defined prototype direction but less measured product outcome data.",
          whyItMatters:
            "Research-through-design can frame a problem well, but still needs behavioural validation.",
          nextValidation:
            "Prototype small-circle onboarding and measure perceived safety after repeated sessions.",
        },
        {
          constraint: "The research spans cultural cohorts but not every international student context.",
          whyItMatters:
            "Belonging needs differ across language, culture, program type, and time since arrival.",
          nextValidation:
            "Run segmented tests by cohort and arrival stage before generalizing the model.",
        },
      ],
      takeaway:
        "This case proves I can work through ambiguous social problems, synthesize theory and field research, and choose metrics that protect the product's purpose.",
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
          sample: "Open card sort; group size not formally recorded",
          question: "去掉部门标签后，学生会如何自然组织门户信息？",
          finding: "参与者围绕学习、归属、费用和校园生活等任务聚类。",
          implication: "IA 应该优先映射学生心智模型，而不是 staff ownership。",
        },
        {
          method: "Tree testing",
          sample: "Unmoderated tree test; group size not formally recorded",
          question: "没有界面提示时，学生能否在新层级中找到关键任务？",
          finding: "Findability 从 58% 提升到 84%。",
          implication: "task-oriented IA 足够强，可以进入界面设计阶段。",
        },
        {
          method: "Task analysis",
          sample: "10 task walk-through sessions",
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
          sample: "85 responses",
          question: "是什么阻碍求职者持续练习面试？",
          finding: "用户把 anxiety、uncertainty 和 fear of judgment 描述为主要阻碍。",
          implication: "助手要降低情绪成本，而不是只提供更多题目。",
        },
        {
          method: "Depth interviews",
          sample: "Depth interviews; group size not formally recorded",
          question: "什么让面试练习安全到可以重复？",
          finding: "用户需要真实压力，也需要控制反馈强度。",
          implication: "AI 行为需要 expectation-setting 和 user control。",
        },
        {
          method: "Prototype test",
          sample: "Moderated prototype sessions; group size not formally recorded",
          question: "什么时候给反馈最不破坏信心？",
          finding: "用户更偏好回答结束后的反馈，而不是中途打断。",
          implication: "feedback timing 成为核心交互决策。",
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
    circles: {
      decisions: [
        {
          label: "优化 slow matching 而不是更多匹配",
          choice: "把产品方向放在 slow matching，让关系有时间形成。",
          evidence: "访谈和 diary study 显示，学生想要更少但更深的连接。",
          tradeoff: "方向拒绝容易增长的指标，但更贴近 loneliness 问题。",
          impact: "产品从 engagement volume 转向 relationship depth。",
        },
        {
          label: "用 small circles 降低社交压力",
          choice: "探索小组格式，而不是只做一对一发现。",
          evidence: "共创显示，小组 prompts 可以让 vulnerability 更安全。",
          tradeoff: "小组协调更难，但能降低单独发起的风险。",
          impact: "small circles 成为 belonging 的结构性答案。",
        },
        {
          label: "衡量 relationship depth",
          choice: "把成功定义为 perceived safety 和 relationship depth，而非使用时长。",
          evidence: "学术框架和用户研究都指向归属质量，而不是活动数量。",
          tradeoff: "depth metrics 更难埋点，但不会奖励浅层互动。",
          impact: "产品综合阶段保住了 social wellbeing 目的。",
        },
      ],
      evidence: [
        {
          method: "Depth interviews",
          sample: "Interviews across cultural cohorts; group size not formally recorded",
          question: "国际学生到达后，友谊为什么难建立？",
          finding: "学生提到 social access、cultural uncertainty 和 shallow interaction。",
          implication: "产品要创造更安全的入口，而不是只增加 discovery。",
        },
        {
          method: "Diary study",
          sample: "Two-week diary study; group size not formally recorded",
          question: "什么时候学生感觉真正亲近，而不是只是社交忙碌？",
          finding: "有意义的时刻通常小、重复、和具体情境有关。",
          implication: "slow matching 和 recurring prompts 比 instant matching 更贴合。",
        },
        {
          method: "Co-design workshops",
          sample: "3 workshops",
          question: "哪些社交形式安全到愿意和陌生同伴尝试？",
          finding: "small circles 和 guided prompts 降低了单独发起的压力。",
          implication: "产品应该结构化 vulnerability，而不是期待用户自己创造。",
        },
      ],
      iterations: [
        {
          version: "Open social discovery",
          change: "从更宽泛的 matching 和 messaging 概念开始。",
          reason: "这是现有社交 app 的主流模式。",
          improvement: "明确了更多发现可能加剧浅层互动。",
        },
        {
          version: "Small circle concept",
          change: "转向小组、prompt 和共享情境。",
          reason: "研究显示安全感和重复性比 match volume 更重要。",
          improvement: "降低发起压力，更支持 belonging。",
        },
        {
          version: "Depth-first prototype direction",
          change: "围绕 relationship depth 和 perceived safety 定义成功。",
          reason: "产品需要匹配 social wellbeing 目标的指标。",
          improvement: "避免方向漂移到通用 engagement optimization。",
        },
      ],
      limits: [
        {
          constraint: "项目有明确 prototype direction，但较少 measured product outcome data。",
          whyItMatters: "research-through-design 能框定问题，但仍需要行为验证。",
          nextValidation: "原型测试 small-circle onboarding，并在多次会话后衡量 perceived safety。",
        },
        {
          constraint: "研究覆盖多个文化群体，但不是所有国际学生情境。",
          whyItMatters: "归属需求会随语言、文化、项目类型和到达时间变化。",
          nextValidation: "按 cohort 和 arrival stage 做分段测试，再推广模型。",
        },
      ],
      takeaway:
        "这个案例证明我能处理模糊社会问题，综合理论和田野研究，并选择保护产品目的的指标。",
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
    circles: {
      proves:
        "This case proves I can frame an ambiguous social wellbeing problem with research, theory, and careful product boundaries.",
      inspect: [
        "How interviews and diary study reframed loneliness as relational confidence.",
        "Why slow matching and small circles were chosen over open discovery.",
        "How relationship depth became a better success signal than engagement volume.",
      ],
      questions: [
        "How would you avoid optimizing this product for shallow engagement?",
        "What would you measure before scaling to more student cohorts?",
      ],
      bestFit: [
        "Social impact, community, education, or wellbeing product teams.",
        "Research-led teams working with ambiguous human problems.",
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
    circles: {
      proves:
        "This case proves I can frame an ambiguous social wellbeing problem with research, theory, and careful product boundaries.",
      inspect: [
        "How interviews and diary study reframed loneliness as relational confidence.",
        "Why slow matching and small circles were chosen over open discovery.",
        "How relationship depth became a better success signal than engagement volume.",
      ],
      questions: [
        "How would you avoid optimizing this product for shallow engagement?",
        "What would you measure before scaling to more student cohorts?",
      ],
      bestFit: [
        "Social impact, community, education, or wellbeing product teams.",
        "Research-led teams working with ambiguous human problems.",
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
  circles: [
    {
      question: "Why choose slow matching and small circles instead of more matches?",
      reason: "Tests whether the social product avoids shallow engagement incentives.",
      anchorId: "decision-timeline",
    },
    {
      question: "Which evidence made relationship depth a better metric than activity volume?",
      reason: "Connects interviews, diary study, and theory synthesis to product success.",
      anchorId: "evidence-board",
    },
    {
      question: "What would you validate before scaling this across student cohorts?",
      reason: "Keeps an ambiguous wellbeing concept honest about cultural and adoption limits.",
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
