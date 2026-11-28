import "@/lib/zod-jitless";
import { z } from "zod";
import { LocalizedStringSchema } from "@/lib/cases/schema";
import { CaseVerifiedStatusSchema } from "@/lib/cases/modules-schema";
import {
  CURRENT_PROJECT_SLUGS,
  isUnlistedProject,
  type CurrentProjectSlug,
} from "@/lib/project-routes";

export const VaultArchiveCategorySchema = z.enum([
  "abandoned",
  "superseded",
  "scoped-out",
  "coursework-archive",
]);

export type VaultArchiveCategory = z.infer<typeof VaultArchiveCategorySchema>;

export const VaultLineageSuccessorSchema = z.object({
  slug: z.enum(CURRENT_PROJECT_SLUGS).refine((slug) => !isUnlistedProject(slug), {
    message: "A related case must be one of the listed cases.",
  }),
  title: LocalizedStringSchema,
  transferMechanism: LocalizedStringSchema,
});

export const VaultAutopsyRecordSchema = z.object({
  slug: z.enum(CURRENT_PROJECT_SLUGS).refine((slug) => isUnlistedProject(slug), {
    message: "Archive Vault entries must correspond exclusively to unlisted archival slugs.",
  }),
  title: LocalizedStringSchema,
  year: z.string().min(4),
  // v6.9 (R12): Chinese pages showed "Sem 1", "Sep–Nov", "DEMO".
  yearZh: z.string().min(4).optional(),
  archiveCategory: VaultArchiveCategorySchema,
  statusLabel: LocalizedStringSchema,
  whatItBuilt: LocalizedStringSchema,
  autopsyReason: LocalizedStringSchema,
  structuralFlawExposed: LocalizedStringSchema,
  lineageLesson: LocalizedStringSchema,
  lineageSuccessors: z.array(VaultLineageSuccessorSchema).min(1),
  verifiedStatus: CaseVerifiedStatusSchema,
  directArchivePath: z.string().startsWith("/projects/"),
});

export type VaultAutopsyRecord = z.infer<typeof VaultAutopsyRecordSchema>;

export const VAULT_AUTOPSIES: readonly VaultAutopsyRecord[] = [
  {
    slug: "fencepost",
    title: { en: "Fencepost", zh: "Fencepost 社区野生动物故事板" },
    year: "2026 · Sep–Nov",
    yearZh: "2026 · 9–11 月",
    archiveCategory: "scoped-out",
    statusLabel: { en: "Scoped Out of Top 6 (Live Demo)", zh: "退出主展 6 案（保留在线归档）" },
    whatItBuilt: {
      en: "Brisbane community wildlife storyboard with EXIF-stripped uploads, 3-role AI proxy (Screener/Writer/Chat), Turso libSQL, and revocable QR grants verified by 431 offline tests.",
      zh: "布里斯班后院动物目击故事板：入库剥离 EXIF、三角色 AI 安全代理、Turso 存储与可吊销二维码权限，附带 431 项离线测试。",
    },
    autopsyReason: {
      en: "Curated out of the 6 public flagships so the portfolio stays tightly focused on physical-digital, calm agency, and systems-craft builds—while keeping open coursework signup clearly isolated from production claims.",
      zh: "为了让 6 大公开旗舰聚焦软硬件协同与设计工程主线，这件课程全栈项目退入档案馆。同时也把课程开放注册边界与真实生产安全严格区隔开。",
    },
    structuralFlawExposed: {
      en: "Prompt-level privacy rules fail silently under edits or stale share links unless visibility isolation lives inside the database query layer itself.",
      zh: "靠系统提示词约束 AI「别提删掉的帖子」极易漏网；隐私撤权必须在 SQL/查询层就让模型根本读不到那条记录。",
    },
    lineageLesson: {
      en: "Enforce AI trust boundaries in data queries and cryptographic state rather than polite prompt instructions, and verify live routes after deploy.",
      zh: "AI 的隐私与权限承诺必须钉死在数据查询隔离与密钥层，不能靠口头提示词赌运气。",
    },
    lineageSuccessors: [
      {
        slug: "walkie",
        title: { en: "Walkie", zh: "Walkie" },
        transferMechanism: {
          en: "Related: another build where access limits live in code rather than in prompts. Walkie seals its transport with AES-256-GCM.",
          zh: "相关：同样把访问边界写在代码里，不靠提示词。Walkie 的传输用 AES-256-GCM 封装。",
        },
      },
      {
        slug: "autofill",
        title: { en: "Resume Autofill", zh: "Resume Autofill" },
        transferMechanism: {
          en: "Related: another build that handles personal data. Autofill keeps the resume on the device.",
          zh: "相关：同样处理个人资料。Autofill 的简历只留在本机。",
        },
      },
    ],
    verifiedStatus: "bench-tested",
    directArchivePath: "/projects/fencepost",
  },
  {
    slug: "gapmapper",
    title: { en: "Perception Gap Mapper", zh: "走夜路（感知落差测绘）" },
    year: "2026 · Sem 1",
    yearZh: "2026 · 第 1 学期",
    archiveCategory: "coursework-archive",
    statusLabel: { en: "Coursework Archive (DECO7380)", zh: "课程研究归档（DECO7380）" },
    whatItBuilt: {
      en: "Reframed a 6-person UQ studio project from a predictive 'safe route recommender' into a slow planning tool surfacing gaps between lighting data and pedestrian perception.",
      zh: "把 6 人团队的「夜路安全路线推荐器」扭转为面向市政规划者的慢界面工具。专门用来对照客观照明数据与行人主观不安感之间的落差。",
    },
    autopsyReason: {
      en: "Retired from featured work on 20 Nov 2026 because it remained a Figma/studio deliverable without real council planner trials or live urban sensor feeds.",
      zh: "2026 年 11 月 20 日调离首页精选，让位于工程实证更完整的主案。作品属纯课程研究与 Figma 原型交付，未接入真实市政规划人员试测与实时道路传感器。",
    },
    structuralFlawExposed: {
      en: "A polished route-ranking prototype creates unearned predictive authority—making an unmeasured safety problem look solved just because the UI renders crisp red/green lines.",
      zh: "安全路线打分界面做得越顺滑越危险。只要屏幕给出红绿推荐线，用户就会误以为系统真能担保人身安全。其实底层数据根本撑不住这种权威。",
    },
    lineageLesson: {
      en: "Never fabricate an authoritative verdict when underlying data is incomplete; expose evidence limits and contradiction explicitly in the UI.",
      zh: "底层证据不足时绝不替人下结论，而要把数据缺口与矛盾信号坦诚摆在界面里。",
    },
    lineageSuccessors: [
      {
        slug: "autofill",
        title: { en: "Resume Autofill", zh: "Resume Autofill" },
        transferMechanism: {
          en: "Related: both decline to show an answer the data cannot support. Autofill leaves an uncertain field blank or marks it for review.",
          zh: "相关：两者都不给数据撑不住的答案。Autofill 拿不准的字段就留空，或标出来等人核对。",
        },
      },
      {
        slug: "lamplight",
        title: { en: "Lamplight Nook", zh: "Lamplight Nook" },
        transferMechanism: {
          en: "Related: both case pages state plainly what was never tested.",
          zh: "相关：两个案例页都直接写明哪些没有测过。",
        },
      },
    ],
    verifiedStatus: "observed",
    directArchivePath: "/projects/gapmapper",
  },
  {
    slug: "pricewise",
    title: { en: "PriceWise", zh: "PriceWise 超市比价原型" },
    year: "2026",
    archiveCategory: "superseded",
    statusLabel: { en: "Superseded (Demo Data Only)", zh: "已退役（仅含演示数据）" },
    whatItBuilt: {
      en: "Australian grocery comparison web prototype (65 demo products across Coles, Woolworths, Aldi) dissecting four silent runtime failures hidden behind green builds.",
      zh: "覆盖澳洲三大超市 65 件演示商品的比价原型。重点解剖「构建与测试全绿却在真实体验中静默失灵」的四类典型故障。",
    },
    autopsyReason: {
      en: "Moved to archive because it ran strictly on 65 simulated products with zero registered users—its core value was diagnostic methodology rather than a live consumer product.",
      zh: "因数据库仅含 65 件拟真商品、零真实注册用户，退入档案库专作故障方法论标本，不再占用公开旗舰展位。",
    },
    structuralFlawExposed: {
      en: "Semantic search silently fell back to keyword matching on every query, while receipt abbreviations ('MLK FC 2L') looked matched on screen even when the link was dubious.",
      zh: "语义搜索悄悄退回关键词匹配却毫无提示，小票缩写（如 MLK FC 2L）哪怕置信度极低也照样高亮「最便宜」。",
    },
    lineageLesson: {
      en: "Green unit builds prove nothing about silent degradation; every fallback and uncertain match requires a first-class UI state and end-to-end verification.",
      zh: "单测全绿不等于交互可信；任何静默降级与模糊匹配都必须在界面显性报错，并靠端到端实测守门。",
    },
    lineageSuccessors: [
      {
        slug: "autofill",
        title: { en: "Resume Autofill", zh: "Resume Autofill" },
        transferMechanism: {
          en: "Related: both deal with uncertain matches. Autofill leaves a field it cannot match blank instead of guessing.",
          zh: "相关：两者都要处理拿不准的匹配。Autofill 对不上的字段就留空，不去猜。",
        },
      },
    ],
    verifiedStatus: "bench-tested",
    directArchivePath: "/projects/pricewise",
  },
  {
    slug: "connect",
    title: { en: "UQ Connect", zh: "UQ Connect 校园社交原型" },
    year: "2025 · Sep–Nov",
    yearZh: "2025 · 9–11 月",
    archiveCategory: "coursework-archive",
    statusLabel: { en: "Coursework Archive (Mock Data)", zh: "课程归档（静态模拟数据）" },
    whatItBuilt: {
      en: "Campus study-buddy and events prototype from a five-person course team. Three rounds produced 71 research and test records: 33 exploratory interviews, 28 think-aloud tests on the prototype and 10 MVP task tests. I ran 14 of them. After the September tests the team redrew the structure on paper on 3 October.",
      zh: "五人课程团队做的校园学习搭子与活动原型。三轮共 71 份研究与测试记录：33 场探索访谈、28 场原型出声思考测试、10 场 MVP 任务测试，其中 14 场由我主持。9 月测试之后，团队在 10 月 3 日回到纸面重画了结构。",
    },
    autopsyReason: {
      en: "Archived from top 6 because backend APIs remained unwired and earlier cohort work lacked the hardware/AI systems depth of later 2026 builds.",
      zh: "因后端接口未真正联调，且属于早期课程阶段作品，项目从 6 大旗舰中退场归档。展位让给深度更高的软硬件与 AI 工程主案。",
    },
    structuralFlawExposed: {
      en: "Think-aloud tests on the clickable prototype found navigation and state problems, such as screens with no clear way back.",
      zh: "在可点击原型上做出声思考测试，抓到了导航与状态缺陷，比如有的页面找不到返回路径。",
    },
    lineageLesson: {
      en: "When tests keep finding navigation problems, check the structure before patching single buttons.",
      zh: "测试反复抓到导航问题时，先看整体结构，再去修单个按钮。",
    },
    lineageSuccessors: [
      {
        slug: "onthebeat",
        title: { en: "On The Beat", zh: "On The Beat" },
        transferMechanism: {
          en: "Related: both are social coursework projects about helping people who do not know each other start talking.",
          zh: "相关：两者都是社交类课程项目，帮互不认识的人开口说第一句话。",
        },
      },
    ],
    verifiedStatus: "observed",
    directArchivePath: "/projects/connect",
  },
  {
    slug: "rules",
    title: { en: "Requirements into Rules", zh: "把要求变成规则" },
    year: "2025 · DECO7250",
    archiveCategory: "coursework-archive",
    statusLabel: { en: "Coursework Archive (Marked)", zh: "课程规范归档（已结课）" },
    whatItBuilt: {
      en: "Two coursework briefs on turning soft requirements into rules. Numbers such as a 150–250 m cycling warning lead and a 48 px tap floor come from proposal drafts that were mostly AI-drafted; they were never tested thresholds.",
      zh: "两份课程作业，练的是把模糊要求写成规则。骑行提前 150–250 m 预警、48 px 触控下限这类数字出自提案草稿，草稿多半由 AI 起草，从没当作阈值测过。",
    },
    autopsyReason: {
      en: "Retired from the homepage on 20 Nov 2026 because neither brief went beyond coursework specs and static designs.",
      zh: "2026 年 11 月 20 日调入档案馆。两份作业都停在课程规范与静帧设计阶段，没有真机上线。",
    },
    structuralFlawExposed: {
      en: "AI-generated design guidelines sound polished yet flatten contradictory edge cases and smuggle unsourced numbers unless audited line by line.",
      zh: "大模型写出的设计规范看似头头是道。实际上常抹平边缘矛盾，并夹带无出处的伪精确数字，必须逐条核源打回。",
    },
    lineageLesson: {
      en: "Every soft UX goal ('safe', 'timely', 'accessible') must compile down to falsifiable numeric thresholds, cooldowns, and copy templates before engineering starts.",
      zh: "一切柔和的体验目标都必须在施工前压实成毫秒、像素、米数与触发冷却窗口。否则工程师无从落地，也无法校验。",
    },
    lineageSuccessors: [
      {
        slug: "maze",
        title: { en: "MazeRunners", zh: "MazeRunners" },
        transferMechanism: {
          en: "Related: MazeRunners also turns a timing rule into firmware: a three-sample IR debounce and a 400 ms cooldown.",
          zh: "相关：MazeRunners 同样把时序规则写进固件：红外连续三次取样去抖，触发后冷却 400 ms。",
        },
      },
      {
        slug: "grassland",
        title: { en: "Grassland Iron Tide", zh: "《草原铁潮》" },
        transferMechanism: {
          en: "Related: each Grassland defeat screen names the condition that lost the mission.",
          zh: "相关：《草原铁潮》每次战败都会写明是哪个条件导致失利。",
        },
      },
    ],
    verifiedStatus: "observed",
    directArchivePath: "/projects/rules",
  },
  {
    slug: "spectra",
    title: { en: "Spectra Lens", zh: "Spectra Lens 阅读扩展" },
    year: "2026 · DEMO",
    yearZh: "2026 · 演示版",
    archiveCategory: "superseded",
    statusLabel: { en: "Superseded Prototype", zh: "早期演示原型（已退出展位）" },
    whatItBuilt: {
      en: "Bilingual Chrome accessibility extension with one global settings store: a dyslexia mode (locally bundled OpenDyslexic, fixed line height and letter spacing), colour filters, a focus ruler and font scaling, with no CDN requests.",
      zh: "中英双语浏览器无障碍扩展，设置全局保存，不向 CDN 发请求。提供阅读障碍模式（本地打包 OpenDyslexic，行高与字距固定）、色觉滤镜、聚焦尺和字号缩放。",
    },
    autopsyReason: {
      en: "Retired on 20 Nov 2026: stayed at utility-tested DEMO fidelity with zero dyslexic or low-vision participant sessions, superseded by deeper accessibility engineering across the portfolio.",
      zh: "2026 年 11 月 20 日下线主展，长期停留在工具函数单测阶段，未组织阅读障碍受试实验。离线样式注入经验已融入后续浏览器扩展工程。",
    },
    structuralFlawExposed: {
      en: "Host pages fight back with high CSS specificity and inline styles; injecting unguarded overrides easily breaks navigation bars and rigid grids.",
      zh: "宿主网页各自拥有复杂选择器权重与内联样式，粗暴覆盖极易撑碎页头导航与固定栅格。",
    },
    lineageLesson: {
      en: "When acting as a guest inside third-party DOMs, bundle assets offline for privacy and scope overrides under one class on the page root.",
      zh: "作为「第三方网页里的访客」，用本地打包资源守住阅读隐私，注入样式统一挂在页面根节点的类名下。",
    },
    lineageSuccessors: [
      {
        slug: "autofill",
        title: { en: "Resume Autofill", zh: "Resume Autofill" },
        transferMechanism: {
          en: "Related: both run inside other sites' pages, so both have to cope with styles and markup they do not control.",
          zh: "相关：两者都在别人的网页里运行，都得应付自己管不了的样式和结构。",
        },
      },
    ],
    verifiedStatus: "bench-tested",
    directArchivePath: "/projects/spectra",
  },
  {
    slug: "hoop",
    title: { en: "Hoop Dream", zh: "Hoop Dream 篮球生涯 RPG" },
    year: "2026 · DEMO v0.6",
    yearZh: "2026 · 演示版 v0.6",
    archiveCategory: "superseded",
    statusLabel: { en: "Superseded (Early Phaser Build)", zh: "早期 Phaser 作品" },
    whatItBuilt: {
      en: "Chinese basketball career simulation RPG (Phaser + TypeScript) backed by 3 art bibles, negative prompts, and 299 registered asset specs.",
      zh: "使用 Phaser + TypeScript 搭建的篮球生涯模拟 RPG（DEMO v0.6），以三份书面美术圣经与 299 项资产注册表约束生成式视觉风格。",
    },
    autopsyReason: {
      en: "Kept off the main list. Grassland Iron Tide is the listed Phaser project; Hoop Dream stays here as an early DEMO v0.6.",
      zh: "不在主列表里。主列表上的 Phaser 项目是《草原铁潮》，Hoop Dream 作为早期的 DEMO v0.6 留在这里。",
    },
    structuralFlawExposed: {
      en: "Individual AI-generated sprites pass solo inspection yet clash violently once assembled on one screen unless governed by negative prompts and side-by-side audits.",
      zh: "单张抽检看似过关的生成式素材摆进同一画面立刻色温打架，单靠单图质检根本保不住整套世界观。",
    },
    lineageLesson: {
      en: "Codify written art bibles, negative constraint lists, and asset provenance manifests before scaling generative or multi-screen interactive worlds.",
      zh: "在规模化铺开交互界面或游戏资产前，先写定书面风格红线与资产溯源表，再让人工并排走查兜底。",
    },
    lineageSuccessors: [
      {
        slug: "grassland",
        title: { en: "Grassland Iron Tide", zh: "《草原铁潮》" },
        transferMechanism: {
          en: "Related: both are Phaser games made with AI-generated assets. Grassland keeps a manifest of 75 assets.",
          zh: "相关：两者都是用 Phaser 做的游戏，素材都由 AI 生成。《草原铁潮》有一份 75 项资产清单。",
        },
      },
    ],
    verifiedStatus: "bench-tested",
    directArchivePath: "/projects/hoop",
  },
];

export function getAllVaultAutopsies(): readonly VaultAutopsyRecord[] {
  return VAULT_AUTOPSIES;
}

export function getVaultAutopsyBySlug(slug: CurrentProjectSlug): VaultAutopsyRecord | undefined {
  return VAULT_AUTOPSIES.find((item) => item.slug === slug);
}
