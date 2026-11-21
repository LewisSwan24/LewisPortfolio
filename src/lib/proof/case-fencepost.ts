/**
 * Fencepost, added 2026-11-21 from public repository LewisSwan24/fencepost.
 * All claims verified against README.md, tests/, api/index.py, and live fencepost-app.vercel.app.
 * Must not claim: public neighbourhood adoption metrics or disabled open-signup in the course build.
 */
import type {
  CaseDepth,
  CaseInterviewPack,
  CaseInterviewPrompt,
  CaseInterviewScan,
  CaseSummary,
  ProofLocale,
} from "./types";

export const fencepostSummary: Record<ProofLocale, { fencepost: CaseSummary }> = {
  en: {
    fencepost: {
      challenge:
        "Neighbors sharing backyard wildlife stories need to feel confident that photos won't expose home metadata, private entries won't echo inside an AI summary, and printed QR shares stay revocable.",
      role: "Interaction & privacy architecture, AI safety proxy design, access boundary rules, and deployment verification",
      methods: ["revocable QR sharing", "three-role AI workflow (Screener / Writer / Chat)", "offline invariant checks", "safety red-line review", "post-deploy route verification"],
      evidence: [
        "live interactive prototype at fencepost-app.vercel.app backed by Python API + Turso libSQL",
        "automated access checks enforcing three privacy rules: context isolation, soft-delete cut-off, and instant QR grant revocation",
        "red-line prompt review alongside automated post-deploy route checks built after a real .vercelignore incident",
      ],
      outcome:
        "A live community wildlife storyboarding app where revoking a QR grant or deleting an entry cuts it out of future AI context immediately.",
      next: "Replace demo handle login with full resident sign-in ahead of any public neighborhood pilot, and observe a first backyard sharing trial.",
    },
  },
  zh: {
    fencepost: {
      challenge:
        "邻居之间共同记录后院负鼠与鸟类故事时，必须能放心三件事：照片不会带出家庭位置信息、私密记录不会混进 AI 助手的上下文、贴出去的二维码也随时能收回。",
      role: "交互与隐私架构、AI 代理边界设计、数据层访问控制及部署核验",
      methods: ["可吊销二维码分享", "三角色 AI 协作代理（初筛 / 撰写 / 对话）", "离线权限不变量检查", "安全红线核验", "上线后路由可用性巡检"],
      evidence: [
        "已部署在线交互原型 fencepost-app.vercel.app（Python API + Turso libSQL）",
        "自动化权限检查确保三条隐私底线落地：他人上下文隔离、软删除即刻断联、吊销二维码后模型不再引用旧记录",
        "红线边界评审配合上线路由检查脚本，确保界面声明与后端实际行为一致",
      ],
      outcome: "交付了可交互的社区野生动物故事板与权限受控的 AI 代理，一旦居民撤销分享权限，下一次 AI 回答就会彻底停用该条目。",
      next: "在真实街区开放使用前关闭演示版免密代号登录，切换完整账号体系并在小范围邻里间实地观察试用体验。",
    },
  },
};

export const fencepostDepth: Record<ProofLocale, { fencepost: CaseDepth }> = {
  en: {
    fencepost: {
      decisions: [
        {
          label: "Isolated model context & hashed tokens",
          choice: "Keep separate queries for timeline display vs. AI assistant context, and hash all share-link tokens.",
          evidence: "README & test_data_layer.py: 431 offline tests verify that revoked grants and soft-deleted rows never re-enter assistant context.",
          tradeoff: "More explicit query paths and no token recovery once generated.",
          impact: "Permission revocation works on the next request with zero stale cache window.",
        },
        {
          label: "Zero-EXIF schema & cursor pagination",
          choice: "Strip EXIF by schema omission and paginate timeline/forum by cursor (20/30 items).",
          evidence: "POST /api/videos stores only a storage key; cursor pagination prevents base64 frames from hitting Vercel's 4.5 MB 413 cap.",
          tradeoff: "Clients cannot jump to arbitrary page numbers and must follow opaque cursors.",
          impact: "Eliminates location-EXIF leakage and 413 payload crashes by construction.",
        },
        {
          label: "Versioned expiring tokens & fixed error copy",
          choice: "Sign tokens with a v2| prefix and 30-day TTL, and return only fixed error messages from the AI proxy.",
          evidence: "README & api/index.py: rollback builds reject v2 tokens outright; upstream model errors and prompts never leave the server.",
          tradeoff: "Deploying the v2 token cutover signs everyone out once.",
          impact: "Prevents phantom user IDs across rollbacks and eliminates prompt/key leakage.",
        },
      ],
      evidence: [
        {
          method: "Offline data-layer & proxy test suite",
          sample: "431 tests across 7 Python suites with faked model calls",
          question: "Do soft-deletes and grant revocations cut off the AI assistant immediately?",
          finding: "Pinning access invariants in automated tests caught missing suite wiring and verified soft-delete + revocation cut-offs.",
          implication: "Every API endpoint enforces access_grants before touching model context.",
        },
        {
          method: "Red-line prompt evaluation & deploy verification",
          sample: "29 safety cases (10 automated, 19 human-judged) + scripts/check_deploy.py",
          question: "Does a green Vercel badge guarantee both frontend and API actually serve?",
          finding: "A 2026-09-17 .vercelignore change wiped web/ while Vercel stayed green — proving dashboard status alone is insufficient.",
          implication: "Isolated API exclusions into vercel.json and gated deploys on real-route probes.",
        },
        {
          method: "Rate-limit & cost-ceiling guards",
          sample: "LIMIT_MODEL_CALLS_PER_DAY (1000), scrypt per-IP caps, keyed address hashing",
          question: "How is API spend bounded when course open-signup is enabled?",
          finding: "Sliding 24-hour global call ceilings and keyed IP hashing bound abuse without storing raw client IP addresses.",
          implication: "Graceful degradation replaces uncapped model spend.",
        },
      ],
      iterations: [
        {
          version: "Versioned expiring tokens (2026-09-18)",
          change: "Moved from deterministic two-part tokens to 30-day expiring v2|-tagged tokens with per-user /api/sessions/revoke.",
          reason: "Old deterministic tokens could never expire or be revoked individually.",
          improvement: "Per-person sign-out works cleanly and rollback builds reject newer tokens outright.",
        },
        {
          version: "Two-project deploy hardening (2026-09-17+)",
          change: "Moved Python bundle excludes out of shared .vercelignore into vercel.json and added check_deploy.py.",
          reason: "Prevent one project's packaging tweak from silently blanking the other.",
          improvement: "Zero-credential live check verifies both frontend pages and API routes after every push.",
        },
      ],
      limits: [
        {
          constraint: "Course deployment intentionally leaves demo handle sign-in open so reviewers can explore without creating passwords.",
          whyItMatters: "Read visibility stays locked behind access grants, while handle sign-in itself fits a classroom review context rather than public streets.",
          nextValidation: "Require full resident authentication before any public neighborhood rollout.",
        },
        {
          constraint: "Built and checked through automated privacy invariants and red-line prompts; field adoption with Brisbane households has not started yet.",
          whyItMatters: "Privacy guarantees in the data layer are tested directly, while everyday neighborhood sharing habits still need real-world observation.",
          nextValidation: "Run a scoped trial with a few Brisbane households sharing backyard sightings.",
        },
      ],
      takeaway:
        "Safe community AI is built in the data layer: zero EXIF columns, hashed revocable tokens, 431 access-invariant tests, and live route verification after every deploy.",
    },
  },
  zh: {
    fencepost: {
      decisions: [
        {
          label: "上下文查询隔离与哈希 Token",
          choice: "将时间线展示查询与 AI 助手上下文查询彻底分离，且分享 Token 仅存哈希。",
          evidence: "README 与 test_data_layer.py：431 项离线测试验证吊销权限与软删条目绝不会再进入模型上下文。",
          tradeoff: "查询路径更显式，且分享 Token 生成后无法再次明文找回。",
          impact: "权限吊销无缓存窗口，在下一次请求即刻生效。",
        },
        {
          label: "零 EXIF 表结构与游标分页",
          choice: "从表结构根源省略 EXIF 字段，并对时间线与讨论区实施游标分页（20/30 条）。",
          evidence: "POST /api/videos 仅保存存储键；游标分页避免携带图像帧时触发 Vercel 4.5 MB 的 413 报错。",
          tradeoff: "前端不能任意跳页，必须按游标翻页。",
          impact: "从结构上杜绝位置 EXIF 泄露与大负载 413 崩溃。",
        },
        {
          label: "版本化过期 Token 与固定报错文案",
          choice: "为 Token 加入 v2| 版本前缀与 30 天有效期，且 AI 代理异常仅返回固定文案。",
          evidence: "README 与 api/index.py：回滚旧版直接拒收 v2 Token；上游模型报错与提示词永不出服务器。",
          tradeoff: "切换 v2 Token 的那次上线会让所有既有会话强制登出一次。",
          impact: "防止回滚期出现幽灵用户 ID，并杜绝提示词或密钥外泄。",
        },
      ],
      evidence: [
        {
          method: "离线数据层与代理测试套件",
          sample: "7 个 Python 测试文件共 431 项离线测试（假模型零网络）",
          question: "软删除与权限吊销是否会在下一次模型调用即刻生效？",
          finding: "把权限不变量固化进测试后，能稳定拦截越权上下文、软删残留与吊销失效。",
          implication: "所有 API 入口在触达模型上下文前强制校验 access_grants。",
        },
        {
          method: "安全红线评测与发布探活",
          sample: "29 条红线用例（10 自动 + 19 人工评审）+ scripts/check_deploy.py",
          question: "部署控制台变绿是否足以证明前后端都正常提供服务？",
          finding: "2026-09-17 的 .vercelignore 事故证明部署面板变绿并不等于线上服务正常。",
          implication: "将后端裁剪迁入 vercel.json，并在每次发布后执行真实路由探活。",
        },
        {
          method: "速率限制与日调用封顶保护",
          sample: "LIMIT_MODEL_CALLS_PER_DAY (1000)、scrypt IP 限流与加盐哈希计数",
          question: "课程演示开启开放注册时如何兜住模型账单？",
          finding: "24 小时全局滑动上限与密钥哈希 IP 限流在不落盘原始 IP 的前提下锁死了费用上限。",
          implication: "超限时走降级提示而非失控扣费。",
        },
      ],
      iterations: [
        {
          version: "带过期与版本标签的 Token（2026-09-18）",
          change: "从永久确定的两段式 Token 升级为 30 天过期、带 v2| 前缀的签名 Token 与单人吊销接口。",
          reason: "旧版确定性 Token 既无法过期，也无法单独踢出单个用户。",
          improvement: "支持按人登出，且旧版回滚部署会直接拒收新版 Token。",
        },
        {
          version: "双工程发布加固（2026-09-17 后）",
          change: "将 Python 打包排除项从共享 .vercelignore 迁入 vercel.json 并新增 check_deploy.py。",
          reason: "防止一侧打包配置误伤同仓库另一侧的 Next.js 前端源码。",
          improvement: "无需凭据即可在几秒内验证前端页面与全部 API 路由。",
        },
      ],
      limits: [
        {
          constraint: "课程演示版本刻意保留轻量代号登录，方便评审直接打开体验核心流程。",
          whyItMatters: "读取可见性仍严格受 access_grants 保护，但代号登录仅适用于课程评审演示，不适于公开邻里使用。",
          nextValidation: "真正面向街区开放前关闭免密入口，启用完整账号鉴权。",
        },
        {
          constraint: "当前重点验证了数据层隐私拦截与红线行为，尚未进入真实社区居民的长期留存试用。",
          whyItMatters: "技术层的不越界已有扎实验证，但居民日常分享的节奏与顾虑仍需实地试用去印证。",
          nextValidation: "先在一两个真实街区开展小规模后院目击分享观察。",
        },
      ],
      takeaway:
        "可信的社区 AI 产品建立在数据层之上：没有 EXIF 字段的表结构、可吊销哈希 Token、431 项权限不变量测试，以及发布后的真实路由校验。",
    },
  },
};

export const fencepostScan: Record<ProofLocale, { fencepost: CaseInterviewScan }> = {
  en: {
    fencepost: {
      proves: "Shows I can design and verify a full-stack community AI product around strict privacy, access revocation, and red-line safety testing.",
      inspect: ["The three access invariants pinned by 431 offline tests.", "How EXIF removal and hashed QR links protect residents.", "What the 2026-09-17 .vercelignore incident changed about deploy verification."],
      questions: ["How do you guarantee revoked access stops the AI assistant immediately?", "Why keep open signup documented as an explicit limit?"],
      bestFit: ["AI product & trust teams.", "Full-stack Product Designers and Design Engineers shipping LLM-backed workflows."],
    },
  },
  zh: {
    fencepost: {
      proves: "说明我能围绕隐私、权限吊销与红线安全评测，设计并验证全栈社区 AI 产品。",
      inspect: ["431 项离线测试钉死的三条权限不变量。", "零 EXIF 与哈希二维码如何保护居民隐私。", "2026-09-17 .vercelignore 事故如何催生真实路由部署探活。"],
      questions: ["怎么保证权限吊销后 AI 助手立刻停止读取旧上下文？", "为什么把开放注册直接写成显式边界？"],
      bestFit: ["AI 产品与可信体验团队。", "负责 LLM 全栈落地的产品设计师与 Design Engineer。"],
    },
  },
};

export const fencepostPrompts: { fencepost: CaseInterviewPrompt[] } = {
  fencepost: [
    {
      question: "How does Fencepost stop revoked users from remaining in the AI's context?",
      reason: "Tests data-layer vs. prompt-layer thinking for AI privacy.",
      anchorId: "evidence-board",
    },
    {
      question: "What broke on 17 September 2026 while Vercel reported green?",
      reason: "Shows real operational debugging and verification discipline.",
      anchorId: "decision-timeline",
    },
    {
      question: "What would you change before opening Fencepost to real Brisbane streets?",
      reason: "Checks awareness of the course open-signup trade-off.",
      anchorId: "outcome-limits",
    },
  ],
};

export const fencepostPack: Record<ProofLocale, { fencepost: CaseInterviewPack }> = {
  en: {
    fencepost: {
      answers: [
        {
          id: "fencepost-invariants",
          question: "How do you keep private or deleted sightings out of the AI assistant?",
          answer:
            "By enforcing it in SQL before the model is ever called, not via prompt instructions. The assistant runs its own access-checked query, and 431 offline tests verify that other users' entries, soft-deleted rows, and revoked grants disappear on the very next call.",
          evidenceHref: "/projects/fencepost#evidence-board",
          boundary: "Tests run against a faked model; live model phrasing is checked separately via 29 red-line cases.",
        },
        {
          id: "fencepost-deploy",
          question: "Why build scripts/check_deploy.py when Vercel already reports deployment status?",
          answer:
            "On 17 September 2026 a shared .vercelignore rule accidentally excluded web/, so Vercel built an empty 404 app and showed green for an hour. check_deploy.py probes real frontend pages and every API route after each release.",
          evidenceHref: "/projects/fencepost#decision-timeline",
          boundary: "Probes route availability without creating test database rows.",
        },
        {
          id: "fencepost-exif",
          question: "How does Fencepost stop neighbourhood sightings from leaking residents' addresses?",
          answer:
            "Video registration stores only an opaque storage key — there is no schema field for EXIF to land in — and storyboards reach outsiders strictly through revocable hashed QR links rather than a public map feed.",
          evidenceHref: "/projects/fencepost#decision-timeline",
          boundary: "Protects metadata and access scope; residents still choose what appears inside their video frames.",
        },
      ],
      managerFollowUp: {
        id: "fencepost-manager-follow-up",
        question: "Why leave open signup enabled in the live deployment?",
        answer:
          "It is an explicit trade-off for the course evaluation build so reviewers can open fencepost-app.vercel.app without provisioning accounts, while read visibility stays locked behind access_grants. The README flags it as mandatory to disable before public use.",
        evidenceHref: "/projects/fencepost#outcome-limits",
        boundary: "Acceptable for a demo environment, never for production residents.",
      },
    },
  },
  zh: {
    fencepost: {
      answers: [
        {
          id: "fencepost-invariants",
          question: "怎么防止私密或已删除的记录进入 AI 助手？",
          answer: "在调用模型之前的 SQL 层直接拦截，而不是靠提示词祈祷。助手走独立的权限查询，431 项离线测试确保他人条目、软删记录与吊销权限在下一次调用时立刻消失。",
          evidenceHref: "/projects/fencepost#evidence-board",
          boundary: "单测使用假模型隔离网络；真实模型措辞另由 29 条红线用例核验。",
        },
        {
          id: "fencepost-deploy",
          question: "Vercel 已经有部署状态了，为什么还要写 scripts/check_deploy.py？",
          answer: "2026 年 9 月 17 日共享的 .vercelignore 曾误删 web/ 目录，Vercel 编出一个空 404 站却显示绿灯长达一小时。check_deploy.py 会在每次发布后探活真实前端页与全部 API 路由。",
          evidenceHref: "/projects/fencepost#decision-timeline",
          boundary: "只探活路由可用性，不向生产库写入测试用户。",
        },
        {
          id: "fencepost-exif",
          question: "Fencepost 如何避免居民分享负鼠画面时泄露家庭住址？",
          answer: "视频入库只保存不透明存储键，表结构里根本没有 EXIF 栏位；故事板也绝不进入公开地图广场，只通过可随时吊销的哈希二维码链接分享。",
          evidenceHref: "/projects/fencepost#decision-timeline",
          boundary: "保护了元数据与访问范围，画面本身拍到什么仍由居民自己决定。",
        },
      ],
      managerFollowUp: {
        id: "fencepost-manager-follow-up",
        question: "为什么线上演示版保留了开放注册？",
        answer: "这是为课程评审刻意保留的权衡，方便直接打开 fencepost-app.vercel.app 体验，而读取权限依然严格走 access_grants。README 已明确标注公开上线前必须关闭。",
        evidenceHref: "/projects/fencepost#outcome-limits",
        boundary: "仅适用于演示环境，绝不用于真实居民生产环境。",
      },
    },
  },
};
