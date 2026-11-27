import type { CaseRecord } from "@/lib/cases/schema";

export const fencepostCase: CaseRecord = {
  slug: "fencepost",
  status: "unlisted",
  roleTracks: ["product", "ai-ux", "design-eng"],
  workSummary: {
    order: 10,
    tags: ["flag", "ai", "research"],
    year: "2026",
    dur: "Live deployment",
    durZh: "已上线部署",
    problem: {
      en: "Sharing backyard wildlife sightings risks leaking EXIF, private entries, or unsafe AI replies",
      zh: "分享社区野生动物记录容易泄露 EXIF、私密条目或引发不安全的 AI 回复",
    },
    changed: {
      en: "Revocable QR sharing, EXIF-free storage, and immediate AI context cut-off upon revocation",
      zh: "可吊销二维码分享、无 EXIF 存储，以及撤权后模型即时断联的上下文隔离",
    },
  },
  reviewMeta: {
    reviewedAt: "2026-11-21",
    nextReviewAt: "2027-02-21",
    auditNote: "Verified LewisSwan24/fencepost 431 offline tests, 29 red-line cases, and public deployment note.",
  },
  cover: {
    src: "/projects/fencepost/01-ringtail-brisbane.jpg",
    width: 1200,
    height: 800,
    fit: "cover",
    alt: {
      en: "A Brisbane ringtail possum frame from the Fencepost community wildlife storyboard",
      zh: "Fencepost 布里斯班社区野生动物故事板中的环尾负鼠实景画面",
    },
  },
  links: [
    {
      label: "Open live app",
      labelZh: "打开线上应用",
      href: "https://fencepost-app.vercel.app",
      external: true,
    },
    {
      label: "Source on GitHub",
      labelZh: "GitHub 源码",
      href: "https://github.com/LewisSwan24/fencepost",
      external: true,
    },
  ],
  media: {
    label: "Frames from the Brisbane storyboard",
    labelZh: "布里斯班故事板实景帧",
    blurb:
      "Wildlife frames shipped inside web/public/frames/ of the Fencepost repository. Entries strip EXIF by design (keeping only a storage key) and reach other residents solely through revocable permissioned QR links.",
    blurbZh:
      "来自 Fencepost 仓库 web/public/frames/ 的实景画面。每条记录在数据结构层面即剥离 EXIF（仅保留存储键），且仅通过可随时吊销的权限二维码分享给其他居民。",
    images: [
      {
        src: "/projects/fencepost/01-ringtail-brisbane.jpg",
        width: 1200,
        height: 800,
        alt: "Ringtail possum perched on a branch in Brisbane",
        altZh: "栖息在布里斯班树枝上的环尾负鼠",
        caption:
          "Ringtail possum frame used in the storyboard flow. Visibility runs strictly through access_grants, never an open public feed.",
        captionZh:
          "故事板流程中的环尾负鼠画面。可见性严格经过 access_grants 权限表控制，而非公开广场信息流。",
      },
      {
        src: "/projects/fencepost/02-brushtail-peeking.jpg",
        width: 1200,
        height: 800,
        alt: "Brushtail possum peeking out in a Brisbane backyard",
        altZh: "在布里斯班后院探头的刷尾负鼠",
        caption:
          "Every resident entry passes through the Screener model before creation; edits are re-screened and rejected edits leave the original untouched.",
        captionZh:
          "居民提交的每条记录都会先经 Screener 模型审核；修改后也会重审，被拒的修改不会覆盖原记录。",
      },
      {
        src: "/projects/fencepost/03-shorncliffe-night.jpg",
        width: 1200,
        height: 900,
        alt: "Nighttime ringtail possum sighting at Shorncliffe",
        altZh: "桑克利夫夜间的环尾负鼠目击画面",
        caption:
          "Timeline and forum endpoints use cursor pagination (20 / 30 items) so base64 frames never breach Vercel's 4.5 MB payload cap.",
        captionZh:
          "时间线与讨论区接口采用游标分页（20/30 条），避免携带图像帧时触发 Vercel 4.5 MB 响应上限。",
      },
    ],
  },
  demo: {
    src: "https://fencepost-app.vercel.app",
    poster: "/projects/fencepost/01-ringtail-brisbane.jpg",
    title: "Fencepost live web app",
    titleZh: "Fencepost 线上应用",
    posterAlt: "Brisbane ringtail possum frame; click to open the live Fencepost app",
    posterAltZh: "布里斯班环尾负鼠画面，点击载入 Fencepost 线上应用",
    label: "Inspect the live deployment",
    labelZh: "查看线上部署",
    blurb:
      "The public course deployment (fencepost-web talking to fencepost-api on Turso libSQL). Note: the course build intentionally enables open handle signup for demo convenience, while read visibility stays strictly gated by access_grants.",
    blurbZh:
      "公开课程部署版本（fencepost-web 连接跑在 Turso libSQL 上的 fencepost-api）。注：课程演示版特意开启了免密代号登录以便体验，而读取权限仍严格受 access_grants 约束。",
    action: "Load Fencepost live app",
    actionZh: "载入 Fencepost 线上应用",
  },
  interactiveDemo: {
    id: "fencepost-revoke",
    placement: "after-summary",
    eyebrow: {
      en: "Interactive prototype · Revocable AI context boundary",
      zh: "可操作活原型 · 权限边界与 AI 上下文即时截断",
    },
    title: {
      en: "Revoke a resident QR grant and watch the AI lose access",
      zh: "吊销居民二维码权限，看 AI 助手如何立刻失明",
    },
    prompt: {
      en: "Ask the guest AI a question while the share is Active, then click Revoked QR or Soft-deleted on the left and re-ask to test immediate context cut-off.",
      zh: "先在「有效分享」状态下向访客 AI 提问，再切换左侧的「已吊销二维码」或「已软删除」，重新提问验证零缓存延迟截断。",
    },
    takeaway: {
      en: "Community AI trust is enforced at the query layer, not by polite prompt disclaimers: revoking access_grants or soft-deleting removes the record from model context immediately.",
      zh: "社区 AI 的隐私承诺靠查询层隔离而非口头提示词：吊销 access_grants 或软删除条目后，下一瞬即彻底从模型上下文中消失。",
    },
  },
  card: {
    en: {
      kicker: "Community AI · Access Boundaries",
      title: "Fencepost",
      sub: "A Brisbane backyard wildlife storyboard where revocable QR grants and data-layer isolation ensure deleted or private sightings vanish from AI replies immediately.",
      role: "Product architecture, AI trust & verification",
      date: "2026 · Sep–Nov",
      m1: "Zero-EXIF photo privacy",
      m2: "Instant AI context cut-off",
      m3: "Revocable QR sharing",
    },
    zh: {
      kicker: "社区 AI 交互 · 隐私边界与撤权",
      title: "Fencepost",
      sub: "布里斯班后院野生动物故事板：借助可吊销二维码与数据层查询隔离，让居民撤销分享后 AI 助手也立刻「看不见」对应内容。",
      role: "交互与隐私边界 · AI 安全代理",
      date: "2026 · 9–11",
      m1: "入库即剥离 EXIF 隐私",
      m2: "撤权后立刻切断 AI 上下文",
      m3: "可随时吊销的二维码分享",
    },
  },
  narrative: {
    en: {
      hero: {
        title: "Designing a community AI storyboard where revoking access actually cuts the model off.",
        sub: "Brisbane residents film possums, write sightings, and share permissioned QR storyboards — backed by a Python AI proxy, Turso libSQL, and a Next.js frontend.",
      },
      roleVal: "Product design, AI safety proxy architecture, data-layer invariants, and deployment verification",
      timeVal: "2026 · September–November",
      teamVal: "Coursework + full-stack engineering build",
      toolsVal: "Python 3.12 · Vercel Serverless · Turso libSQL · Next.js · OpenAI / DashScope · QR / NFC tag",
      ch: {
        label: "Challenge",
        title: "Sharing neighborhood wildlife sightings invites both privacy leaks and unsafe AI replies.",
        p: "Residents filming possums around their homes do not want exact addresses, EXIF metadata, or private entries leaking into a public feed or an AI assistant's context window. Meanwhile, an AI-assisted community storyboard needs content screening, clear moderation voting, and a hard guarantee that deleting an entry or revoking a share link takes effect on the very next model call.",
      },
      re: {
        label: "Verification",
        title: "Privacy guarantees verified through offline data invariants and safety red-line reviews.",
        m1: {
          t: "Data-layer isolation checks",
          b: "Zero-network checks isolate the model to verify three core rules: private entries stay out of assistant context; deleted sightings vanish immediately; revoked grants block follow-up chat.",
        },
        m2: {
          t: "Safety red-line cases",
          b: "run_redline.py evaluates prompt boundaries alongside non-English checks and structured human judgment whenever assistant instructions change.",
        },
        m3: {
          t: "Real-route deploy check",
          b: "After a September .vercelignore mistake left web/ missing even while Vercel reported green, scripts/check_deploy.py was built to probe every live page and API endpoint after release.",
        },
      },
      sy: {
        label: "Architecture & Trust",
        title: "Separating what the model sees from what the timeline renders.",
        p: "The API deliberately runs separate queries for the contributor timeline and the AI assistant context. Videos store only an opaque storage key so EXIF has no column to land in. Permissioned share tokens are returned once at creation and stored solely as hashes with 1–90 day expiry; revoking a link or grant takes effect immediately with zero cache lag, and closing a storyboard archives it without breaking existing QR posters.",
      },
      id: {
        label: "Three-Role AI Proxy",
        p: "POST /api/assistant dispatches across three scoped roles (Screener, Writer, Chat with SSE streaming), recording prompt_version beside every database output. Every error returns fixed copy so upstream model text, prompts, and API keys never leak to the client, and a sliding 24-hour global call cap (LIMIT_MODEL_CALLS_PER_DAY) bounds spend even under open course signup.",
      },
      pr: {
        label: "Two-Project Deployment",
        p: "One repository serves two Vercel projects: fencepost (Python single-entrypoint api/index.py + Turso libSQL) and fencepost-web (Next.js frontend at fencepost-app.vercel.app). Cursor-paginated timeline (20/page) and forum (30/page) routes keep base64 frames safely under Vercel's 4.5 MB payload limit, while version-tagged tokens (v2|) prevent rollback confusion.",
      },
      te: {
        label: "Operational Honesty",
        p: "The README documents real operational trade-offs explicitly: the course deployment keeps FENCEPOST_OPEN_SIGNUP enabled so evaluators can try the frontend without account provisioning, while read visibility stays locked behind access_grants; a real production launch would disable open signup and enforce strict password/session auth.",
      },
      ou: {
        label: "Outcome",
        p: "A live full-stack community storyboard deployed on Vercel and Turso, with permission invariants, safety red-line review, and live route verification keeping sharing boundaries intact. Built for a course rollout context, with neighborhood field trials scoped next.",
        m1: { v: "Revocable", label: "QR grants cut off assistant context immediately" },
        m2: { v: "Red-lined", label: "safety checks gating prompt and tone changes" },
        m3: { v: "Zero EXIF", label: "no location columns or plaintext tokens persisted" },
      },
      rf: {
        label: "Reflection",
        p: "Trust in an AI community product is mostly plumbing that users never see until it fails: revoking a grant without stale cache, keeping EXIF out of the schema altogether, and refusing to believe a green deploy badge until a script verifies every live route.",
      },
    },
    zh: {
      hero: {
        title: "设计一个社区 AI 故事板：当权限被吊销时，连 AI 模型也会立刻失明。",
        sub: "布里斯班居民拍摄负鼠目击、共同编写故事板，并通过可吊销的权限二维码分享——背后由 Python 三角色安全代理、Turso libSQL 与 Next.js 前端驱动。",
      },
      roleVal: "产品架构、AI 安全代理设计、数据层权限不变量与部署校验体系",
      timeVal: "2026 年 9–11 月",
      teamVal: "课程与全栈工程项目",
      toolsVal: "Python 3.12 · Vercel Serverless · Turso libSQL · Next.js · OpenAI / DashScope · QR / NFC 标签",
      ch: {
        label: "问题",
        title: "分享社区野生动物目击记录，天然伴随着隐私泄露与 AI 越界回复风险。",
        p: "居民在自家院子拍摄负鼠，不希望家庭住址、照片 EXIF 或私密条目漏进公开广场，更不希望被塞进 AI 助手的上下文。与此同时，社区协作故事板还需要内容审核、投票处置机制，以及一条铁律：一旦删除记录或吊销分享链接，下一次模型调用必须立刻生效。",
      },
      re: {
        label: "验证体系",
        title: "由数据层权限检查、红线用例与真实路由巡检共同兜底隐私承诺。",
        m1: {
          t: "离线权限边界校验",
          b: "在隔离外部网络的本地测试下钉死三条数据规则：他人私密条目永不进入助手上下文；软删除记录立即消失；吊销权限后立刻切断读取与对话历史。",
        },
        m2: {
          t: "安全红线提示词评审",
          b: "每次调整提示词均运行 run_redline.py，覆盖越界试探、多语言输入及人工措辞抽查。",
        },
        m3: {
          t: "真实路由部署巡检",
          b: "经历过一次配置文件误删前端目录却仍显示绿灯的上线事故后，专门补建 check_deploy.py 在发布后逐一核对在线页面与接口。",
        },
      },
      sy: {
        label: "架构与信任边界",
        title: "把「模型能看到的」与「时间线展示的」在查询层彻底拆开。",
        p: "后端刻意为贡献者时间线与 AI 助手上下文编写两套独立查询。视频记录只保存不透明存储键，表结构里根本没有 EXIF 落脚处。权限分享 Token 只在创建时返回一次、库中仅存哈希并设 1–90 天有效期；吊销链接无缓存延迟立即生效，而关闭故事板采用归档而非硬删，避免实体二维码海报失效。",
      },
      id: {
        label: "三角色 AI 代理",
        p: "POST /api/assistant 按角色分派给 Screener（审核）、Writer（撰写）与 Chat（流式对话），并在数据库每条结果旁落盘 prompt_version。所有异常只返回固定文案，上游模型报错、提示词原文与密钥绝不泄露给前端；24 小时滑动总调用上限（LIMIT_MODEL_CALLS_PER_DAY）在课程开放注册下仍能兜住费用。",
      },
      pr: {
        label: "双工程部署与分页约束",
        p: "单仓库承载两个 Vercel 项目：Python API（api/index.py + Turso libSQL）与 Next.js 前端（fencepost-app.vercel.app）。时间线（每页 20 条）与讨论区（每页 30 条）均采用游标分页，确保携带图像帧时不触发 Vercel 4.5 MB 响应体上限，并用 v2| 签名版本标签避免回滚期的 Token 误判。",
      },
      te: {
        label: "诚实的运行边界",
        p: "仓库 README 如实记录了演示环境的权衡：课程部署版开启了 FENCEPOST_OPEN_SIGNUP 以便评审体验，但读取权限仍完全走 access_grants 校验；若面向真实公众上线，必须关闭开放注册并启用完整账号密码鉴权。",
      },
      ou: {
        label: "产出与边界",
        p: "上线了可访问的社区故事板与权限受控的 AI 安全代理，结合离线权限验证、安全红线评审与上线后路由检查保障分享边界可靠生效；当前为课程评审环境，真实街区长期试用列在下一步。",
        m1: { v: "可随时撤销", label: "吊销二维码即刻切断助手上下文" },
        m2: { v: "红线护栏", label: "提示词变更前必经边界与多语言核查" },
        m3: { v: "零位置泄露", label: "库表彻底省略 EXIF 栏位与明文 Token" },
      },
      rf: {
        label: "反思",
        p: "社区 AI 产品的信任感大多藏在平时看不见的管道里：吊销权限不留缓存死角、从 Schema 根源拒绝 EXIF、以及不再轻信部署面板的绿色对勾，直到脚本把每条线上路由真实跑通。",
      },
    },
  },
};
