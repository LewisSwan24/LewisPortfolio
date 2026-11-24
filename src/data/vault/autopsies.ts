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
    message: "Lineage successor must be one of the 6 listed flagship cases.",
  }),
  title: LocalizedStringSchema,
  transferMechanism: LocalizedStringSchema,
});

export type VaultLineageSuccessor = z.infer<typeof VaultLineageSuccessorSchema>;

export const VaultAutopsyRecordSchema = z.object({
  slug: z.enum(CURRENT_PROJECT_SLUGS).refine((slug) => isUnlistedProject(slug), {
    message: "Archive Vault entries must correspond exclusively to unlisted archival slugs.",
  }),
  title: LocalizedStringSchema,
  year: z.string().min(4),
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
    slug: "vigil",
    title: { en: "Vigil", zh: "Vigil 邮件复核台" },
    year: "2026 · Sep",
    archiveCategory: "abandoned",
    statusLabel: { en: "Abandoned (Study Never Ran)", zh: "已中止（受试实验未执行）" },
    whatItBuilt: {
      en: "Six-variant email phishing oversight workbench over 140 synthetic messages with an intentionally fallible 87.9% classifier (AUC 0.72).",
      zh: "基于 140 封合成邮件与故意设为 87.9% 准确率（AUC 0.72）分类器的六变体人机监督工作台。",
    },
    autopsyReason: {
      en: "Abandoned on 23 Sep 2026 after realizing throughput-style oversight queues still reward rubber-stamping unless real operators sit in the chair—and the planned 5-participant evaluation never ran.",
      zh: "2026 年 9 月 23 日主动止损：若无真人连续复核，纯靠界面调整很难彻底根除队列惯性放行，且原定 5 人对照实验始终未执行，故撤下首页归档。",
    },
    structuralFlawExposed: {
      en: "Early builds leaked accuracy through confidence numbers (all errors <= 0.82, all hits >= 0.84), letting users game the score without reading a single email body.",
      zh: "初版把置信度数值做成了作弊提示（错误全 <= 0.82、正确全 >= 0.84），用户只盯数字就能猜出对错，完全绕开了真正的内容审读。",
    },
    lineageLesson: {
      en: "Never flatten ambiguous judgment into a single reassuring confidence number; enforce uncertainty tiers and pre-commitment gates before revealing AI verdicts.",
      zh: "绝不能把模糊判断压成极具欺骗性的单值百分比；必须改用分档区间与延迟/默认拒绝机制迫使人真正介入判断。",
    },
    lineageSuccessors: [
      {
        slug: "autofill",
        title: { en: "Resume Autofill", zh: "Resume Autofill" },
        transferMechanism: {
          en: "Replaced opaque single scores with visual three-tier certainty (Filled / Review / Blank) so uncertainty is unmissable.",
          zh: "用三档可视化确定性（直填 / 待核 / 刻意留空）彻底取代让人盲信的单值打分。",
        },
      },
      {
        slug: "lamplight",
        title: { en: "Lamplight Nook", zh: "Lamplight Nook" },
        transferMechanism: {
          en: "Inherited anti-rubber-stamping discipline via 'Not now' default keyboard focus on every high-risk decision card.",
          zh: "把反惯性放行思路继承为所有高风险弹窗默认聚焦「先不要」，防住手滑盲按。",
        },
      },
    ],
    verifiedStatus: "unverified-hypothesis",
    directArchivePath: "/projects/vigil",
  },
  {
    slug: "fencepost",
    title: { en: "Fencepost", zh: "Fencepost 社区野生动物故事板" },
    year: "2026 · Sep–Nov",
    archiveCategory: "scoped-out",
    statusLabel: { en: "Scoped Out of Top 6 (Live Demo)", zh: "退出主展 6 案（保留在线归档）" },
    whatItBuilt: {
      en: "Brisbane community wildlife storyboard with EXIF-stripped uploads, 3-role AI proxy (Screener/Writer/Chat), Turso libSQL, and revocable QR grants verified by 431 offline tests.",
      zh: "布里斯班后院动物目击故事板：入库剥离 EXIF、三角色 AI 安全代理、Turso 存储与可吊销二维码权限，附带 431 项离线测试。",
    },
    autopsyReason: {
      en: "Curated out of the 6 public flagships so the portfolio stays tightly focused on physical-digital, calm agency, and systems-craft builds—while keeping open coursework signup clearly isolated from production claims.",
      zh: "为让 6 大公开旗舰聚焦软硬件协同与设计工程主线，而将这件课程全栈项目退入档案馆；同时把课程开放注册边界与真实生产安全严格区隔。",
    },
    structuralFlawExposed: {
      en: "Prompt-level privacy rules fail silently under edits or stale share links unless visibility isolation lives inside the database query layer itself.",
      zh: "靠系统提示词约束 AI「别提删掉的帖子」极易漏网；隐私撤权必须在 SQL/查询层就让模型根本读不到那条记录。",
    },
    lineageLesson: {
      en: "Enforce AI trust boundaries in data queries and cryptographic state rather than polite prompt instructions, and verify live routes after deploy.",
      zh: "AI 的隐私与权限承诺必须钉死在数据查询隔离与密钥层，而非靠口头提示词赌运气。",
    },
    lineageSuccessors: [
      {
        slug: "walkie",
        title: { en: "Walkie", zh: "Walkie" },
        transferMechanism: {
          en: "Carried forward cryptographic fail-closed boundaries (AES-256-GCM sealing + 30s physical pairing + zero-knowledge relay).",
          zh: "将底层硬隔离思路升级为 Walkie 的 AES-256-GCM 密封帧与 30 秒当面配对锁钥。",
        },
      },
      {
        slug: "autofill",
        title: { en: "Resume Autofill", zh: "Resume Autofill" },
        transferMechanism: {
          en: "Transferred query/storage isolation into build-enforced zero-network unit gates so personal data never leaves the device.",
          zh: "把数据边界隔离转化为构建期零网络单测门禁，从工程源头锁死个人履历外传路径。",
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
    archiveCategory: "coursework-archive",
    statusLabel: { en: "Coursework Archive (DECO7380)", zh: "课程研究归档（DECO7380）" },
    whatItBuilt: {
      en: "Reframed a 6-person UQ studio project from a predictive 'safe route recommender' into a slow planning tool surfacing gaps between lighting data and pedestrian perception.",
      zh: "把 6 人团队的「夜路安全路线推荐器」扭转为面向市政规划者的慢界面工具，专门对照客观照明数据与行人主观不安感之间的落差。",
    },
    autopsyReason: {
      en: "Retired from featured work on 20 Nov 2026 because it remained a Figma/studio deliverable without real council planner trials or live urban sensor feeds.",
      zh: "2026 年 11 月 20 日调离首页精选：它是纯课程研究与 Figma 原型交付，未接入真实市政规划人员试测与实时道路传感器，让位于工程实证更完整的主案。",
    },
    structuralFlawExposed: {
      en: "A polished route-ranking prototype creates unearned predictive authority—making an unmeasured safety problem look solved just because the UI renders crisp red/green lines.",
      zh: "做得越顺滑的安全路线打分界面越危险：只要屏幕给出红绿推荐线，用户就会误以为系统真能担保人身安全，其实底层数据根本撑不住这种权威。",
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
          en: "Directly inspired the refusal to guess ambiguous ATS fields—preferring explicit blank/review states over fake certainty.",
          zh: "直接催生了网申填表里「宁可明标留空待核，也不靠猜测充数」的三档诚实表达。",
        },
      },
      {
        slug: "lamplight",
        title: { en: "Lamplight Nook", zh: "Lamplight Nook" },
        transferMechanism: {
          en: "Shaped the 'honest limits' stance: never disguise technical failure or missing data behind reassuring polish.",
          zh: "沉淀为「不拿精致视觉掩盖系统不确定性」的诚实边界准则。",
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
      zh: "覆盖澳洲三大超市 65 件演示商品的比价原型，重点解剖「构建与测试全绿却在真实体验中静默失灵」的四类典型故障。",
    },
    autopsyReason: {
      en: "Moved to archive because it ran strictly on 65 simulated products with zero registered users—its core value was diagnostic methodology rather than a live consumer product.",
      zh: "因数据库仅含 65 件拟真商品、零真实注册用户，退入档案库专作故障方法论标本，不再占用公开旗舰展位。",
    },
    structuralFlawExposed: {
      en: "Semantic search silently fell back to keyword matching on every query, while receipt abbreviations ('MLK FC 2L') looked matched on screen even when the link was dubious.",
      zh: "语意搜索悄悄退回关键词匹配却毫无提示，小票缩写（如 MLK FC 2L）哪怕置信度极低也照样高亮「最便宜」。",
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
          en: "Turned 'unmatched receipt item' failure mode into Autofill's Tier-3 explicit blank + skip-reason state.",
          zh: "将「未匹配缩写强行比价」的反面教训直接升级为 Autofill 三档留空与逐栏理由卡片。",
        },
      },
      {
        slug: "onthebeat",
        title: { en: "On The Beat", zh: "On The Beat" },
        transferMechanism: {
          en: "Sparked strict rejection of deceptive green mocks (catching static MEET JSON and '1 of 4' card illusions).",
          zh: "促成了 On The Beat 里对静态假 MEET、黑屏断点与伪顺滑画布的 12+ 轮零容忍打回。",
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
    archiveCategory: "coursework-archive",
    statusLabel: { en: "Coursework Archive (Mock Data)", zh: "课程归档（静态模拟数据）" },
    whatItBuilt: {
      en: "Campus study-buddy & events mobile prototype iterated across 71 think-aloud sessions (14 led personally), anchored by an October 3 paper IA redraw.",
      zh: "经三轮共 71 份出声思考记录（个人主导 14 份）迭代的校园学习搭子原型，核心转折为 10 月 3 日推翻重画五屏纸面信息架构。",
    },
    autopsyReason: {
      en: "Archived from top 6 because backend APIs remained unwired and earlier cohort work lacked the hardware/AI systems depth of later 2026 builds.",
      zh: "因后端接口未真联调且属于早期课程阶段作品，从 6 大旗舰中退场归档，把展位让给深度更高的软硬件与 AI 工程主案。",
    },
    structuralFlawExposed: {
      en: "Patching individual buttons could not fix missing return routes or distrusted bare match percentages ('94% match' meant nothing without course/library context).",
      zh: "在坏掉的信息架构上修补单个按钮根本没用：缺返回路径会让用户迷路，而孤零零的「94% 契合度」缺了课程与图书馆依据没人敢信。",
    },
    lineageLesson: {
      en: "When usability testing exposes broken mental models, throw away UI patches and redraw the structural state graph first—and always show reasoning behind scores.",
      zh: "可用性测试一旦暴露出返航迷路或状态歧义，立刻回纸面重画整体信息骨架；所有评分必须附带可核验上下文。",
    },
    lineageSuccessors: [
      {
        slug: "onthebeat",
        title: { en: "On The Beat", zh: "On The Beat" },
        transferMechanism: {
          en: "Evolved campus study-buddy icebreaking into zero-exposure 3-card gig co-presence that retreats once humans meet.",
          zh: "把校园找搭子破冰问题进一步提纯为演出现场「三卡匿名破冰 + 见面即退场」的物理数字协议。",
        },
      },
      {
        slug: "lamplight",
        title: { en: "Lamplight Nook", zh: "Lamplight Nook" },
        transferMechanism: {
          en: "Applied explicit context-over-percentage transparency to agent progress (Wick's blackboard subtasks over vague progress bars).",
          zh: "把「给依据不给黑箱百分比」延续到 Wick 黑板子任务拆解，让用户真看懂后台进度。",
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
      en: "Two HCI specifications turning vague safety briefs into testable thresholds (150–250 m cycling warning lead, 48 px tap floor, and 3 independent Quest 3 hand-tracking triggers).",
      zh: "两份把抽象人机交互需求逼成可施工、可反驳数值的规格研究（骑行 150–250 m 提前预警、48 px 触控下限，以及 Quest 3 手部断踪三类独立触发规则）。",
    },
    autopsyReason: {
      en: "Retired from homepage on 20 Nov 2026 because neither brief shipped into running field deployments—yet its rule-compilation method underpins every flagship.",
      zh: "2026 年 11 月 20 日调入档案馆：两份作业均停留在课程规范与静帧设计阶段未真机上线，但它确立的「可被反驳的数值规则」方法贯穿后续所有主案。",
    },
    structuralFlawExposed: {
      en: "AI-generated design guidelines sound polished yet flatten contradictory edge cases and smuggle unsourced numbers unless audited line by line.",
      zh: "大模型写出的设计规范看似头头是道，实则常抹平边缘矛盾并夹带无出处的伪精确数字，必须逐条核源打回。",
    },
    lineageLesson: {
      en: "Every soft UX goal ('safe', 'timely', 'accessible') must compile down to falsifiable numeric thresholds, cooldowns, and copy templates before engineering starts.",
      zh: "一切柔和的体验目标都必须在施工前压实成毫秒、像素、米数与触发冷却窗口，否则工程师无从落地也无法校验。",
    },
    lineageSuccessors: [
      {
        slug: "maze",
        title: { en: "MazeRunners", zh: "MazeRunners" },
        transferMechanism: {
          en: "Translated per-cause trigger cooldowns directly into 45 ms IR debounce and 1200 ms zone lockout firmware thresholds.",
          zh: "把分场景触发冷却思想直接写进 45 ms 红外消抖与 1200 ms 单区冷却锁固件参数。",
        },
      },
      {
        slug: "grassland",
        title: { en: "Grassland Iron Tide", zh: "《草原铁潮》" },
        transferMechanism: {
          en: "Applied non-ambiguous behavior copy ('symptom -> action') to causal defeat overlays and invariant cross-mission rules.",
          zh: "将「先现象、后唯一明确动作」的文案规约用于跨五关指令契约与因果战败引导。",
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
    archiveCategory: "superseded",
    statusLabel: { en: "Superseded Prototype", zh: "早期演示原型（已退出展位）" },
    whatItBuilt: {
      en: "Bilingual Chrome reading extension injecting per-origin typography, line-height, and locally bundled OpenDyslexic font overrides without CDN leaks.",
      zh: "中英双语浏览器阅读辅助扩展，支持按域名持久化改写字距行高，并将 OpenDyslexic 字体离线打包杜绝 CDN 隐私泄露。",
    },
    autopsyReason: {
      en: "Retired on 20 Nov 2026: stayed at utility-tested DEMO fidelity with zero dyslexic or low-vision participant sessions, superseded by deeper accessibility engineering across the portfolio.",
      zh: "2026 年 11 月 20 日下线主展：长期停留在工具函数单测阶段而未组织阅读障碍受试实验，其离线样式注入经验已融入后续浏览器扩展工程。",
    },
    structuralFlawExposed: {
      en: "Host pages fight back with high CSS specificity and inline styles; injecting unguarded overrides easily breaks navigation bars and rigid grids.",
      zh: "宿主网页各自拥有复杂选择器权重与内联样式，粗暴覆盖极易撑碎页头导航与固定栅格。",
    },
    lineageLesson: {
      en: "When acting as a guest inside third-party DOMs, bundle assets offline for privacy and isolate overrides per-origin rather than firing global hacks.",
      zh: "作为「第三方网页里的访客」，既要通过本地打包资产守住阅读隐私，也必须在 DOM 注入层做到分域名精准隔离。",
    },
    lineageSuccessors: [
      {
        slug: "autofill",
        title: { en: "Resume Autofill", zh: "Resume Autofill" },
        transferMechanism: {
          en: "Carried MV3 content-script isolation, local-only asset bundling, and hostile third-party CSS resilience directly into ATS form adapters.",
          zh: "把 Chrome MV3 内容脚本隔离与对抗陌生网页样式污染的工程经验直接复用至网申表单适配器。",
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
    archiveCategory: "superseded",
    statusLabel: { en: "Superseded (Early Phaser Build)", zh: "早期 Phaser 作品（被草原铁潮超越）" },
    whatItBuilt: {
      en: "Chinese basketball career simulation RPG (Phaser + TypeScript) backed by 3 art bibles, negative prompts, and 299 registered asset specs.",
      zh: "使用 Phaser + TypeScript 搭建的篮球生涯模拟 RPG（DEMO v0.6），以三份书面美术圣经与 299 项资产注册表约束生成式视觉风格。",
    },
    autopsyReason: {
      en: "Moved to Vault when Grassland Iron Tide proved a deeper 5-mission deterministic simulation, 20 Hz engine clock, and 430-test RC architecture.",
      zh: "随着《草原铁潮》交出更完整的五关 20 Hz 确定性模拟架构与 430 项发布门禁，将偏早期验证性质的 DEMO v0.6 收入档案馆。",
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
          en: "Inherited Phaser + TypeScript discipline and tightened the 299-item experiment into Grassland's disciplined 75-asset provenance manifest + lazy mission loading.",
          zh: "直接继承 Phaser + TypeScript 引擎管线，并将美术约束收束为 75 项资产溯源表与按关懒加载机制。",
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
