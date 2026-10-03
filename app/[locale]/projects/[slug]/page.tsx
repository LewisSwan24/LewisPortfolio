import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import {
  VizConnect,
  VizSpectra,
  VizMaze,
  VizVigil,
  VizHoop,
  VizPricewise,
  VizGapmapper,
  VizRules,
} from "@/components/viz/ProjectViz";
import { CaseInterviewPack } from "@/components/hiring/CaseInterviewPack";
import { DemoEmbed } from "@/components/case/DemoEmbed";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StructuredData, generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  CURRENT_PROJECT_SLUGS,
  isUnlistedProject,
  type CurrentProjectSlug,
} from "@/lib/project-routes";
import {
  AI_TRUST_THREAD_HREF,
  getAiTrustThread,
  getCaseDepth,
  getCaseInterviewPack,
  getCaseSummary,
  isOnAiTrustThread,
  type ProofLocale,
} from "@/lib/portfolio-proof";

type Slug = CurrentProjectSlug;
const SLUGS = [...CURRENT_PROJECT_SLUGS];

interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

interface CaseMediaImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  altZh: string;
  caption: string;
  captionZh: string;
}

interface CaseMedia {
  label: string;
  labelZh: string;
  blurb: string;
  blurbZh: string;
  images: CaseMediaImage[];
  video?: { src: string; poster: string; caption: string; captionZh: string };
}

/**
 * Artefact evidence, for cases where there is something to look at beyond the
 * cover viz: MazeRunners has photographs of the physical build, Vigil has the
 * variants themselves. The rest carry their argument in prose.
 */
const CASE_MEDIA: Partial<Record<Slug, CaseMedia>> = {
  connect: {
    label: "The sheet, and what came off it",
    labelZh: "那张纸，和从纸上做出来的东西",
    blurb:
      "The October paper reset and three screens captured from the team's live deployment — not mockups. The app runs on mock data; the backend was written and never connected.",
    blurbZh:
      "十月那次纸面重画，以及三张从团队线上部署直接抓的截图，不是效果图。应用跑在 mock 数据上，后端写了但从未接上。",
    images: [
      {
        src: "/projects/connect/04-paper-prototype.jpg",
        width: 2220,
        height: 2040,
        alt: "The 3 October pencil sheet: five phone screens with arrows drawn from the home screen to each one",
        altZh: "10 月 3 日的铅笔草图：五个手机屏，从首页各画一条箭头指向对应的屏",
        caption:
          "3 October. September's sessions found no way back and a card contradicting its own button — structural faults, so the answer was drawn as structure.",
        captionZh:
          "10 月 3 日。九月测出「没有返回路径」和「卡片与自己的按钮矛盾」，两个都是结构问题，所以答案也画成结构。",
      },
      {
        src: "/projects/connect/01-app-home.png",
        width: 1170,
        height: 2532,
        alt: "UQ Connect home screen: a colour-coded grid of feature cards above a five-tab bar",
        altZh: "UQ Connect 首页：配色化的功能卡片网格，下方是五个标签的底栏",
        caption:
          "The November home screen. A participant read the colour coding as a map of the app — that was the point of building it as one component system.",
        captionZh:
          "十一月的首页。受测者把这套配色读成了整个应用的地图：把界面做成一套组件系统，图的就是这个。",
      },
      {
        src: "/projects/connect/02-app-studybuddy.png",
        width: 1170,
        height: 2532,
        alt: "A study-buddy match card showing 94% match beside the course, library, availability and small-group size",
        altZh: "学习伙伴匹配卡：94% 契合度旁边列着课程、图书馆、可用时间与小组规模",
        caption:
          "The match states its reasons — course, place, availability, group size — because students were sceptical of a score on its own but acted on a concrete reason.",
        captionZh:
          "匹配把理由摆出来：课程、地点、可用时间、小组规模。因为学生怀疑一个孤零零的分数，却会照着具体理由行动。",
      },
      {
        src: "/projects/connect/03-app-events.png",
        width: 1170,
        height: 2532,
        alt: "Campus event cards showing price, location, attendance count, and separate Register and I'm Going states",
        altZh: "校园活动卡片：显示价格、地点、参加人数，以及「报名」与「我要去」两个不同状态",
        caption:
          "Price sits on the card. Nobody predicted that — it came out of the interviews, where $100–200 events were quietly ruled out.",
        captionZh:
          "价格就写在卡片上。没有人预测到这一点，是访谈里冒出来的：100–200 澳元的活动，默默就排掉了。",
      },
    ],
  },
  maze: {
    label: "Build evidence",
    labelZh: "实物证据",
    blurb: "Photographs of the actual build and a clip of the circuit running — not renders.",
    blurbZh: "以下是实际搭建与展出的照片和电路运行录像，不是渲染图。",
    images: [
      {
        src: "/projects/maze/01-exhibition-setup.png",
        width: 900,
        height: 520,
        alt: "The MazeRunners table set up at the exhibition with players around it",
        altZh: "MazeRunners 在展览现场的桌面布置，玩家围在四周",
        caption: "Exhibition setup, mid-round.",
        captionZh: "展览现场，回合进行中。",
      },
      {
        src: "/projects/maze/02-bracelet-finger-sleeve.png",
        width: 900,
        height: 520,
        alt: "Close-up of the wearable finger sleeve that delivers vibration feedback",
        altZh: "提供震动反馈的可穿戴手指套特写",
        caption: "The finger sleeve — where the trap actually lands.",
        captionZh: "手指套：陷阱真正落在这里。",
      },
      {
        src: "/projects/maze/03-wiring-layer.png",
        width: 900,
        height: 520,
        alt: "The wiring layer underneath the maze board",
        altZh: "迷宫板下方的接线层",
        caption: "Wiring layer under the board.",
        captionZh: "板子底下的接线层。",
      },
      {
        src: "/projects/maze/04-engineering-overview.png",
        width: 1536,
        height: 1024,
        alt: "Annotated engineering overview of sensors, controllers, and feedback hardware",
        altZh: "带标注的工程总览：传感器、控制器与反馈硬件",
        caption: "Annotated overview: sensors, controllers, feedback.",
        captionZh: "带标注的总览：传感器、控制器、反馈。",
      },
    ],
    video: {
      src: "/projects/maze/05-planb-circuit.mp4",
      poster: "/projects/maze/05-planb-circuit-thumbnail.jpg",
      caption: "The PlanB feedback circuit running.",
      captionZh: "PlanB 反馈电路运行录像。",
    },
  },
  vigil: {
    label: "The variants under test",
    labelZh: "正在测试的变体",
    blurb:
      "Screens generated from the running prototype by a script, so each image is a pure function of its URL and can be regenerated after any change.",
    blurbZh:
      "这些截图由脚本从跑起来的原型直接生成：每张图都是 URL 的纯函数，任何改动之后都可以重新生成一遍。",
    images: [
      {
        src: "/projects/vigil/02-review-q1percent-q3inline.png",
        width: 1440,
        height: 900,
        alt: "The review screen showing a precise confidence figure and cue spans highlighted inline in the message",
        altZh: "复核界面：显示精确置信度数值，线索直接在邮件正文里高亮",
        caption: "Q1 percent + Q3 inline. The evidence is marked where it sits.",
        captionZh: "Q1 精确百分比 + Q3 内文高亮。证据出现在哪，就标在哪。",
      },
      {
        src: "/projects/vigil/03-review-q1band-q3list.png",
        width: 1440,
        height: 900,
        alt: "The same message with a coarse confidence band and the cues collected in a side list instead of highlighted",
        altZh: "同一封邮件：置信度改为粗略分档，线索集中在侧栏列表而非正文高亮",
        caption: "Q1 band + Q3 list. Same message, same cues, nothing marked until asked.",
        captionZh: "Q1 分档 + Q3 侧栏列表。同一封信、同样的线索，不问就不标。",
      },
      {
        src: "/projects/vigil/05-gate-disagree.png",
        width: 1440,
        height: 900,
        alt: "The gate variant after the reviewer has committed, with the classifier disagreeing and the panel reading 'One of you is wrong'",
        altZh: "Q2 先判后揭的变体：使用者判断之后，分类器给出相反结论，面板写着「One of you is wrong」",
        caption:
          "The hardest message in the set: every authentication check passes, the classifier reports no indicators, and it is impersonation.",
        captionZh:
          "整组里最难的一封：每一项认证检查都通过，分类器报告零线索，这封信其实是冒用身分。",
      },
      {
        src: "/projects/vigil/06-summary.png",
        width: 1440,
        height: 900,
        alt: "The summary screen with a two-by-two table of whether the reviewer took the classifier's word against whether it was right",
        altZh: "总结页：一张 2×2 表格，交叉呈现「是否采信分类器」与「分类器是否正确」",
        caption:
          "The payoff screen. Bottom right — caught the classifier's mistake — is the cell the interface exists to grow.",
        captionZh: "收益页。右下角「抓到了分类器的错误」，正是这个界面存在的意义。",
      },
    ],
  },
  hoop: {
    label: "The build, running",
    labelZh: "跑起来的样子",
    blurb:
      "Captured from the public deployment, not mocked up: the menu, the two-step character creation, and the first career node with its status, attributes, relationships and actions all live.",
    blurbZh:
      "这些是从线上公开版本抓的，不是效果图：主菜单、两步角色创建，以及第一个生涯节点，状态、六维属性、关系网和可选行动全部是真的。",
    images: [
      {
        src: "/projects/hoop/01-main-menu.png",
        width: 1280,
        height: 800,
        alt: "Hoop Dream main menu, with the title set in a large terracotta serif on warm parchment",
        altZh: "Hoop Dream 主菜单，赤陶色衬线大标题落在暖色羊皮纸底上",
        caption:
          "The menu carries its own honesty label: DEMO v0.6, PROTOTYPE.",
        captionZh: "主菜单上自己挂着诚实标签：DEMO v0.6、PROTOTYPE。",
      },
      {
        src: "/projects/hoop/02-character-creation.png",
        width: 1280,
        height: 800,
        alt: "Character creation with a name field, four playing styles, and six attributes each at 15 of 40",
        altZh: "角色创建：姓名输入、四种打法风格，以及六项各 15/40 的属性",
        caption:
          "Four archetypes against six attributes. START JOURNEY stays disabled until the name is filled — validation, not a broken button.",
        captionZh:
          "四种原型对六维属性。姓名没填之前「开始旅程」一直是灰的。那是校验，不是按钮坏了。",
      },
      {
        src: "/projects/hoop/04-career-node.png",
        width: 1280,
        height: 800,
        alt: "The first career node: status and attribute rails on the left, a narrative modal in the centre, training and life actions on the right",
        altZh: "第一个生涯节点：左侧状态与属性条，中间剧情弹窗，右侧训练与生活行动",
        caption:
          "One node of 146. Status, six attributes, eight relationships and the action menu are all wired to the same career state.",
        captionZh:
          "146 个节点里的第一个。状态、六维属性、八段关系与行动菜单，全部接在同一份生涯状态上。",
      },
    ],
  },
  pricewise: {
    label: "The running app",
    labelZh: "跑起来的样子",
    blurb:
      "Captured from the live deployment, not mocked up. Amounts shown come from demo data, not from anyone's real bill — the database has zero registered users.",
    blurbZh:
      "从线上版本直接抓的，不是效果图。图中金额来自演示数据，不是任何人的真实账单：数据库里注册用户是 0。",
    images: [
      {
        src: "/projects/pricewise/02-scan.png",
        width: 2880,
        height: 1800,
        alt: "The receipt scanning screen, with an upload area and the list of recognised items",
        altZh: "小票扫描页：上传区域，以及识别出来的商品清单",
        caption:
          "Where the whole product lives or dies. A receipt prints MLK FC 2L and the catalogue says Full Cream Milk 2L; if those do not meet, nothing downstream can happen.",
        captionZh:
          "整个产品的成败都压在这一步。小票印 MLK FC 2L，商品库里是 Full Cream Milk 2L，对不上，后面什么都做不了。",
      },
      {
        src: "/projects/pricewise/03-compare.png",
        width: 2880,
        height: 1800,
        alt: "The comparison view, with the cheapest chain marked in green for each item",
        altZh: "比价页，每件商品最便宜的那一家标成绿色",
        caption:
          "Three chains, item by item. The green marker is the only claim this screen makes, and it is only as good as the match behind it.",
        captionZh:
          "三家超市逐件对比。绿色标记是这一屏唯一给出的判断，而这个判断有多可信，完全取决于背后那次匹配。",
      },
      {
        src: "/projects/pricewise/04-products.png",
        width: 2880,
        height: 1800,
        alt: "The product browser, each card listing the price at all three supermarkets",
        altZh: "商品浏览页，每张卡片列出三家超市的价格",
        caption:
          "65 products across Coles, Woolworths and Aldi. This is the page whose semantic search silently fell back to keyword matching on every query.",
        captionZh:
          "澳洲三大连锁超市 Coles、Woolworths、Aldi 共 65 件商品。这一页的语意搜索，每次查询都静默退回了关键字匹配。",
      },
    ],
  },
  gapmapper: {
    label: "The prototype I argued against",
    labelZh: "我主张放弃的那版原型",
    blurb:
      "The route-support prototype, kept in the portfolio because it is the evidence for the turn. It looked extremely usable — which is exactly what made it dangerous.",
    blurbZh:
      "那版路线支持原型。留在作品集里，是因为这就是那次转向的证据。看起来非常实用，危险恰恰在这里。",
    images: [
      {
        src: "/projects/gapmapper/01-route-options.png",
        width: 3768,
        height: 1650,
        alt: "Five phone screens side by side: the same trip as five route options, each overlaying risk density, lighting, surveillance or open-business layers, with trip duration marked",
        altZh: "五个手机界面并排：同一趟行程的五种路线方案，分别叠加风险密度、路灯、监控与营业店铺图层，各自标出行程时长",
        caption:
          "The version I built: one trip, scored and ranked by different cues. A system that recommends a safer route without being able to guarantee safety has acquired an authority it never earned.",
        captionZh:
          "我建的那一版：同一趟行程按不同线索评分排序。一个建议「更安全路线」却保证不了安全的系统，获得了一种自己没有挣来的权威。",
      },
    ],
  },
  rules: {
    label: "Both briefs, side by side",
    labelZh: "两份作业并排",
    blurb:
      "One turns 'safety' into routing weights, warning distances and tap sizes. The other turns a peer-reviewed paper into trigger conditions, copy templates and a checklist. Same move, twice.",
    blurbZh:
      "一份把「安全」变成路线权重、提示距离和点击区尺寸；另一份把一篇同行评审论文变成触发条件、文案模板和自查清单。同一个动作，做了两遍。",
    images: [
      {
        src: "/projects/rules/01-fietspad-ui.png",
        width: 2093,
        height: 1361,
        alt: "Three dark-theme phone screens: a home screen with mode selection and recent routes, a planning screen with a rider profile, and a riding screen with a left-hook warning and hazard list",
        altZh: "三张深色主题的手机界面：模式选择与最近路线的首页、含骑行档案的规划页、以及骑行中的左勾弯风险提示与危险清单",
        caption:
          "Fietspad is Dutch for bike path, and the hazard categories are cycling-specific too: left hook, dooring zone, shared lane. The hazard list carries an audio toggle, because a rider cannot look at a screen.",
        captionZh:
          "产品名 Fietspad 是荷兰语的「自行车道」。危险分类也是自行车专用的：左勾弯、开门区、共享道。清单上带音频开关，因为人在骑车时看不了屏。",
      },
      {
        src: "/projects/rules/02-guide-frames.jpg",
        width: 8297,
        height: 2306,
        alt: "Eight phone-shaped guide panels in a row: failure symptoms, impact, do and do-not, trigger thresholds, copy templates, before and after, a self-check list, and closing actions",
        altZh: "八格手机样式的图文指南横排：从失效现象、影响、该做与不该做、触发阈值、文案模板、效果对比、自查清单到收尾行动",
        caption:
          "Three failure causes became three independent triggers rather than one generic warning, each with its own copy in a fixed format: symptom, then one action, verb first.",
        captionZh:
          "三种失效成因变成三条独立触发条件，而不是一句通用警告；各配各的文案，格式固定为「现象 → 一个动作」，动词开头。",
      },
    ],
  },
};

interface CaseDemo {
  src: string;
  poster: string;
  title: string;
  titleZh: string;
  posterAlt: string;
  posterAltZh: string;
  label: string;
  labelZh: string;
  blurb: string;
  blurbZh: string;
  action: string;
  actionZh: string;
}

/**
 * Playable builds, for cases where the thing itself can be handed to a reader.
 * MazeRunners' showcase runs in demo mode with no hardware attached; Vigil's
 * prototype is a single self-contained file with no network calls at all, so it
 * ships from our own origin rather than needing a second deployment.
 */
const CASE_DEMO: Partial<Record<Slug, CaseDemo>> = {
  maze: {
    src: "https://maze-runners.vercel.app",
    poster: "/projects/maze/01-exhibition-setup.png",
    title: "MazeRunners interactive demo",
    titleZh: "MazeRunners 互动 demo",
    posterAlt: "MazeRunners at the exhibition; click to start the interactive demo",
    posterAltZh: "MazeRunners 展览现场，点击开始互动 demo",
    label: "Play it yourself",
    labelZh: "自己玩玩看",
    blurb:
      "This is the same console that drives the physical maze, running in demo mode with no hardware attached. Hit Start, then Trap Test, and watch the score, the haptic channels, and the event log all answer the same event.",
    blurbZh:
      "这是驱动实体迷宫的同一套控制台，跑在 demo 模式下，不用接硬件。按 Start 开一局，再按 Trap Test，看计分、震动通道和事件日志同时反应。",
    action: "Load the interactive demo",
    actionZh: "载入互动 demo",
  },
  vigil: {
    src: "/projects/vigil/prototype.html",
    poster: "/projects/vigil/02-review-q1percent-q3inline.png",
    title: "Vigil interactive prototype",
    titleZh: "Vigil 互动原型",
    posterAlt: "The Vigil review screen; click to open the interactive prototype",
    posterAltZh: "Vigil 的复核界面，点击打开互动原型",
    label: "Flip the variants yourself",
    labelZh: "自己切切看六个变体",
    blurb:
      "The six variants under evaluation, in one self-contained file. Press the gear at the bottom left, or the backtick key, to switch how confidence is shown, when the verdict appears, and where the evidence sits. Worth watching what changes in your own reading when the number becomes a band.",
    blurbZh:
      "正在评估的六个变体，全部在这一个独立文件里。按左下角的齿轮或反引号键，就能切换置信度怎么显示、判定什么时候出现、证据摆在哪。可以留意一下：当那个数字变成一个档位，你自己的读法会怎么变。",
    action: "Load the interactive prototype",
    actionZh: "载入互动原型",
  },
  hoop: {
    src: "https://hoop-dream.vercel.app",
    poster: "/projects/hoop/01-main-menu.png",
    title: "Hoop Dream, playable",
    titleZh: "Hoop Dream 可玩版本",
    posterAlt: "The Hoop Dream main menu; click to play the build in the page",
    posterAltZh: "Hoop Dream 主菜单，点击即可在页面里直接玩",
    label: "Play a career",
    labelZh: "自己开一段生涯",
    blurb:
      "The public build, in the page. Create a player — the name is required, and the archetype you pick propagates into the six attributes — then walk into the first node and spend an action. Everything past that point is the same systems the tests cover.",
    blurbZh:
      "线上版本，直接嵌在页面里。创建一名球员：姓名必填，选的打法风格会传导进六维属性；然后进第一个节点花掉一次行动。从那里往后，跑的都是测试覆盖的同一批系统。",
    action: "Load the playable build",
    actionZh: "载入可玩版本",
  },
  pricewise: {
    src: "https://pricewise-lewisdong.vercel.app",
    poster: "/projects/pricewise/01-home.png",
    title: "PriceWise, demo build",
    titleZh: "PriceWise 演示版本",
    posterAlt: "The PriceWise home screen; click to open the demo build in the page",
    posterAltZh: "PriceWise 首页，点击即可在页面里打开演示版本",
    label: "Open the demo build",
    labelZh: "打开演示版本",
    blurb:
      "The deployed prototype, in the page. Browse the 65-product catalogue and compare across the three chains without signing in. Prices come from simulated data, and the database has no registered users.",
    blurbZh:
      "已部署的功能原型，直接嵌在页面里。不登录也能浏览 65 件商品并做三家比价。价格是拟真数据，数据库里没有注册用户。",
    action: "Load the demo build",
    actionZh: "载入演示版本",
  },
};

const PROJECT_LINKS: Record<Slug, ProjectLink[]> = {
  // The team's own deployment. It is the one public artefact of this project —
  // the source repository stays private, carrying classmates' details and the
  // interview transcripts.
  connect: [
    { label: "Open the demo", href: "https://uq-connect.vercel.app/", external: true },
  ],
  spectra: [],
  maze: [],
  vigil: [],
  hoop: [],
  pricewise: [
    { label: "Open the demo", href: "https://pricewise-lewisdong.vercel.app", external: true },
  ],
  // No public artefact for either. Both are coursework: the reports and Figma
  // files are not mine alone to publish, and the same reasoning as UQ Connect
  // applies to the course repositories.
  gapmapper: [],
  rules: [],
};

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) return { title: "Project Not Found" };
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "zh";
  const title = t(`proj.${slug}.title`);
  const description = t(`proj.${slug}.sub`);
  const path = `/projects/${slug}`;
  // Per-case card rendered by ./opengraph-image.tsx, so a shared case link
  // previews with that case's title rather than the generic site card.
  const image = `/${locale}${path}/opengraph-image`;
  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale, type: "article", image }),
    twitter: buildTwitter({ title, description, image }),
    // An unlisted case keeps its URL but stays out of search results.
    ...(isUnlistedProject(slug) ? { robots: { index: false, follow: false } } : {}),
  };
}

function CoverViz({ slug, locale }: { slug: Slug; locale: ProofLocale }) {
  if (slug === "maze") return <VizMaze locale={locale} />;
  if (slug === "vigil") return <VizVigil locale={locale} />;
  if (slug === "hoop") return <VizHoop locale={locale} />;
  if (slug === "connect") return <VizConnect locale={locale} />;
  if (slug === "pricewise") return <VizPricewise locale={locale} />;
  if (slug === "gapmapper") return <VizGapmapper locale={locale} />;
  if (slug === "rules") return <VizRules locale={locale} />;
  return <VizSpectra locale={locale} />;
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) notFound();

  const k = slug as Slug;
  const t = await getTranslations();
  const locale = await getLocale();
  const isZh = locale === "zh";
  const idx = SLUGS.indexOf(k);
  // Neighbours walk the full order but skip unlisted cases, so no listed case
  // links to one. An unlisted case keeps its page (every slug above is still
  // generated), and that page still leads back into the listed ones.
  const neighbour = (step: 1 | -1): Slug => {
    for (let i = 1; i < SLUGS.length; i += 1) {
      const candidate = SLUGS[(((idx + step * i) % SLUGS.length) + SLUGS.length) % SLUGS.length];
      if (!isUnlistedProject(candidate)) return candidate;
    }
    return k;
  };
  const nextSlug = neighbour(1);
  const prevSlug = neighbour(-1);
  const projectLinks = PROJECT_LINKS[k];

  const siteUrl = siteConfig.url;
  const projectTitle = t(`proj.${k}.title`);
  const proofLocale: ProofLocale = isZh ? "zh" : "en";
  const caseSummary = getCaseSummary(k, proofLocale);
  const caseDepth = getCaseDepth(k, proofLocale);
  const caseInterviewPack = getCaseInterviewPack(k, proofLocale);
  const aiTrustMarker = isOnAiTrustThread(k) ? getAiTrustThread(proofLocale).caseMarker : null;
  const pageCopy = isZh
    ? {
        caseReaderAria: "案例阅读路径",
        caseReaderLabel: "案例阅读器",
        caseReaderIntro: "选择一种阅读路径，再跳到对应证据。",
        reviewModesAria: "阅读模式",
        askMeAbout: "可以问我",
        interviewerScanAria: "2 分钟面试官速览",
        interviewerScanLabel: "2 分钟面试官速览",
        whatThisCaseProves: "这个案例证明什么",
        whatToInspect: "建议检查",
        interviewQuestions: "面试问题",
        bestFitTeams: "最适合的团队",
        coverCaption:
          "概念视觉图。真实证据、方法、指标和限制写在案例摘要与下方深度说明中。",
        caseDepthAria: "面试可用的案例深度",
        caseDepthLabel: "案例深度",
        caseDepthTitle: "面试可用的案例深度",
        caseDepthIntro:
          "下面的说明帮助招聘方更快检查作品集：我做了什么选择、哪些证据推动了设计、迭代之间改变了什么，以及还需要验证什么。",
        decisionLogLabel: "决策记录",
        decisionTimeline: "决策时间线",
        choice: "选择",
        evidence: "证据",
        tradeoff: "取舍",
        impact: "影响",
        researchEvidenceLabel: "证据",
        researchEvidenceBoard: "研究证据板",
        finding: "发现",
        designImplication: "设计影响",
        iterationsLabel: "迭代",
        iterationGallery: "迭代展示",
        limitsLabel: "限制",
        outcomeLimits: "结果限制",
        whyItMatters: "为什么重要",
        nextValidation: "下一步验证",
        portfolioReadout: "作品集结论",
        interviewTakeaway: "面试要点",
      }
    : {
        caseReaderAria: "Case reader",
        caseReaderLabel: "Case reader",
        caseReaderIntro: "Choose a route, then jump to the proof.",
        reviewModesAria: "Review modes",
        askMeAbout: "Ask me about",
        interviewerScanAria: "2-minute interviewer scan",
        interviewerScanLabel: "2-minute interviewer scan",
        whatThisCaseProves: "What this case proves",
        whatToInspect: "What to inspect",
        interviewQuestions: "Interview questions",
        bestFitTeams: "Best-fit teams",
        coverCaption:
          "Concept visual. The evidence, methods, metrics, and limits are documented in the case summary and depth sections.",
        caseDepthAria: "Interview-ready case depth",
        caseDepthLabel: "Case depth",
        caseDepthTitle: "Interview-ready case depth",
        caseDepthIntro:
          "The following notes make the work easier to inspect in a portfolio review: what I chose, what evidence moved the design, what changed between iterations, and what still needs validation.",
        decisionLogLabel: "Decision log",
        decisionTimeline: "Decision timeline",
        choice: "Choice",
        evidence: "Evidence",
        tradeoff: "Trade-off",
        impact: "Impact",
        researchEvidenceLabel: "Evidence",
        researchEvidenceBoard: "Research evidence board",
        finding: "Finding",
        designImplication: "Design implication",
        iterationsLabel: "Iterations",
        iterationGallery: "Iteration gallery",
        limitsLabel: "Limits",
        outcomeLimits: "Outcome limits",
        whyItMatters: "Why it matters",
        nextValidation: "Next validation",
        portfolioReadout: "Portfolio readout",
        interviewTakeaway: "Interview takeaway",
      };

  return (
    <main className="page" data-screen-label={`03 Case · ${k}`}>
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: t("nav.home"), url: siteUrl },
          { name: t("nav.projects"), url: `${siteUrl}/projects` },
          { name: projectTitle, url: `${siteUrl}/projects/${k}` },
        ])}
      />
      <section className="container cs-hero">
        <Breadcrumb
          className="cs-breadcrumb"
          locale={locale}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.projects"), href: "/projects" },
            { label: projectTitle },
          ]}
        />
        <Link className="cs-back" href="/projects">
          {t("cs.back")}
        </Link>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          {t(`proj.${k}.kicker`)}
        </div>
        <h1>{t(`cs.${k}.hero.title`)}</h1>
        <p className="sub">{t(`cs.${k}.hero.sub`)}</p>
        {isUnlistedProject(k) && (
          <p className="sub" role="note" style={{ fontWeight: 600 }}>
            {isZh
              ? "这个项目已于 2026-09-23 放弃：评估协议写完了，受试实验从未运行，所以这一页没有任何受试者数据。"
              : "I abandoned this project on 23 Sep 2026. The evaluation protocol was finished and the participant study never ran, so this page holds no participant data."}
          </p>
        )}
        <dl className="cs-meta">
          <div>
            <dt>{t("cs.role")}</dt>
            <dd>{t(`cs.${k}.roleVal`)}</dd>
          </div>
          <div>
            <dt>{t("cs.time")}</dt>
            <dd>{t(`cs.${k}.timeVal`)}</dd>
          </div>
          <div>
            <dt>{t("cs.team")}</dt>
            <dd>{t(`cs.${k}.teamVal`)}</dd>
          </div>
          <div>
            <dt>{t("cs.tools")}</dt>
            <dd>{t(`cs.${k}.toolsVal`)}</dd>
          </div>
          {projectLinks.length > 0 && (
            <div>
              <dt>{isZh ? "链接" : "Links"}</dt>
              <dd>
                <ul className="cs-links">
                  {projectLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                        {link.external && (
                          <span aria-hidden className="cs-links-arrow">↗</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {/* The four cases the /hire AI and trust thread draws on point back to it. */}
          {aiTrustMarker && (
            <div>
              <dt>{aiTrustMarker.label}</dt>
              <dd>
                <ul className="cs-links">
                  <li>
                    <Link href={AI_TRUST_THREAD_HREF}>{aiTrustMarker.link}</Link>
                  </li>
                </ul>
              </dd>
            </div>
          )}
        </dl>
        {/* One interview surface, not three. The reader nav, its mode list and
            its prompt list all restated what the interview pack already answers
            with evidence links, so only the pack survives. */}
        <CaseInterviewPack pack={caseInterviewPack} locale={proofLocale} />
        <div id="snapshot" className="case-anchor" aria-hidden />
        {/* The 2-minute scan block was removed; its anchor now resolves to the
            case summary so existing proof links still land on something. */}
        <div id="interviewer-scan" className="case-anchor" aria-hidden />
        <aside className="case-summary" aria-label={isZh ? "案例摘要" : "Case summary"}>
          <div className="case-summary-head">
            <div className="label">{isZh ? "案例摘要" : "Case summary"}</div>
            <p>{caseSummary.challenge}</p>
          </div>
          <div className="case-summary-grid">
            <div>
              <h3>{isZh ? "我的角色" : "My role"}</h3>
              <p>{caseSummary.role}</p>
            </div>
            <div>
              <h3>{isZh ? "方法" : "Methods"}</h3>
              <ul>
                {caseSummary.methods.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{isZh ? "证据" : "Evidence collected"}</h3>
              <ul>
                {caseSummary.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{isZh ? "结果" : "Outcome"}</h3>
              <p>{caseSummary.outcome}</p>
            </div>
            <div className="case-summary-next">
              <h3>{isZh ? "下一步我会做什么" : "What I would do next"}</h3>
              <p>{caseSummary.next}</p>
            </div>
          </div>
        </aside>
        <div id="artifact" className="case-anchor" aria-hidden />
        <figure className="cs-cover">
          <CoverViz slug={k} locale={proofLocale} />
          <figcaption>{pageCopy.coverCaption}</figcaption>
        </figure>
      </section>

      {CASE_MEDIA[k] && (
        <section
          className="container case-build-evidence"
          aria-label={isZh ? CASE_MEDIA[k]!.labelZh : CASE_MEDIA[k]!.label}
        >
          <div className="case-build-head">
            <div className="label">{isZh ? CASE_MEDIA[k]!.labelZh : CASE_MEDIA[k]!.label}</div>
            <p>{isZh ? CASE_MEDIA[k]!.blurbZh : CASE_MEDIA[k]!.blurb}</p>
          </div>
          <div className="case-build-grid">
            {CASE_MEDIA[k]!.images.map((image) => (
              <figure key={image.src}>
                <Image
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={isZh ? image.altZh : image.alt}
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
                <figcaption>{isZh ? image.captionZh : image.caption}</figcaption>
              </figure>
            ))}
          </div>
          {CASE_MEDIA[k]!.video && (
            <figure className="case-build-video">
              <video
                controls
                preload="none"
                poster={CASE_MEDIA[k]!.video!.poster}
                src={CASE_MEDIA[k]!.video!.src}
              />
              <figcaption>
                {isZh ? CASE_MEDIA[k]!.video!.captionZh : CASE_MEDIA[k]!.video!.caption}
              </figcaption>
            </figure>
          )}
        </section>
      )}

      {CASE_DEMO[k] && (
        <DemoEmbed
          src={CASE_DEMO[k]!.src}
          poster={CASE_DEMO[k]!.poster}
          title={isZh ? CASE_DEMO[k]!.titleZh : CASE_DEMO[k]!.title}
          posterAlt={isZh ? CASE_DEMO[k]!.posterAltZh : CASE_DEMO[k]!.posterAlt}
          label={isZh ? CASE_DEMO[k]!.labelZh : CASE_DEMO[k]!.label}
          blurb={isZh ? CASE_DEMO[k]!.blurbZh : CASE_DEMO[k]!.blurb}
          action={isZh ? CASE_DEMO[k]!.actionZh : CASE_DEMO[k]!.action}
          openLabel={isZh ? "在新标签页打开 ↗" : "Open in a new tab ↗"}
        />
      )}

      <section className="container case-depth" aria-label={pageCopy.caseDepthAria}>
        <div id="outcome-limits" className="case-depth-block case-limits">
          <div className="case-depth-head">
            <div className="label">{pageCopy.limitsLabel}</div>
            <h2>{pageCopy.outcomeLimits}</h2>
          </div>
          <div className="case-limits-grid">
            {caseDepth.limits.map((limit) => (
              <article key={limit.constraint}>
                <h3>{limit.constraint}</h3>
                <dl className="case-depth-dl">
                  <div>
                    <dt>{pageCopy.whyItMatters}</dt>
                    <dd>{limit.whyItMatters}</dd>
                  </div>
                  <div>
                    <dt>{pageCopy.nextValidation}</dt>
                    <dd>{limit.nextValidation}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>

      </section>

      <section id="long-form" className="container">
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.ch.label`)}</div>
            </div>
            <div className="cs-row-body">
              <h2>{t(`cs.${k}.ch.title`)}</h2>
              <p className="prose">{t(`cs.${k}.ch.p`)}</p>
            </div>
          </div>
        </div>

        {/* The structured evidence board was removed as a duplicate of this
            narrative; its anchor moves here so proof links keep working. */}
        <div id="evidence-board" className="case-anchor" aria-hidden />
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.re.label`)}</div>
            </div>
            <div className="cs-row-body">
              <h2>{t(`cs.${k}.re.title`)}</h2>
              <div className="cs-method-grid">
                {([1, 2, 3] as const).map((i) => (
                  <div key={i}>
                    <h5>{t(`cs.${k}.re.m${i}.t`)}</h5>
                    <p>{t(`cs.${k}.re.m${i}.b`)}</p>
                  </div>
                ))}
              </div>
              <div className="quote" style={{ marginTop: 32, maxWidth: "36em" }}>
                <p>{t(`cs.${k}.re.quote`)}</p>
                <cite>— {t(`cs.${k}.re.quoteWho`)}</cite>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.sy.label`)}</div>
            </div>
            <div className="cs-row-body">
              <h2>{t(`cs.${k}.sy.title`)}</h2>
              <p className="prose">{t(`cs.${k}.sy.p`)}</p>
              {k === "connect" && (
                <div className="cs-tree">
                  <div>
                    <h6>{isZh ? "假设 · 进场之前" : "Assumed · before fieldwork"}</h6>
                    <ul>
                      <li className="ko">
                        {isZh ? "语言能力是障碍" : "Language proficiency is the barrier"}
                      </li>
                      <li className="ko">{isZh ? "缺口在曝光" : "The gap is exposure"}</li>
                      <li className="ko">
                        {isZh ? "迎新活动本身能建立连接" : "Mixers build connections"}
                      </li>
                      <li className="ko">
                        {isZh ? "给一个契合度分数就够了" : "A match score is enough"}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h6>
                      {isZh ? "发现 · 71 份记录之后" : "Found · after 71 sessions"}
                    </h6>
                    <ul>
                      <li className="ok">
                        {isZh ? "障碍是节奏与人数规模" : "Pace and group size"}
                      </li>
                      <li className="ok">
                        {isZh ? "缺口在跟进" : "The gap is follow-through"}
                      </li>
                      <li className="ok">
                        {isZh ? "重复 + 共同任务才留得住" : "Repetition plus a shared task"}
                      </li>
                      <li className="ok">
                        {isZh ? "匹配必须说明理由" : "A match has to say why"}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* The decision timeline duplicated these technical decisions.
            Its anchor moves here so proof links keep working. */}
        <div id="decision-timeline" className="case-anchor" aria-hidden />
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.id.label`)}</div>
            </div>
            <div className="cs-row-body">
              <p className="prose">{t(`cs.${k}.id.p`)}</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.pr.label`)}</div>
            </div>
            <div className="cs-row-body">
              <p className="prose">{t(`cs.${k}.pr.p`)}</p>
            </div>
          </div>
        </div>

        {/* The iteration gallery duplicated this testing narrative.
            Its anchor moves here so proof links keep working. */}
        <div id="iteration-gallery" className="case-anchor" aria-hidden />
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.te.label`)}</div>
            </div>
            <div className="cs-row-body">
              <p className="prose">{t(`cs.${k}.te.p`)}</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.ou.label`)}</div>
            </div>
            <div className="cs-row-body">
              <div className="cs-impact" role="figure" aria-label={t("cs.impactLabel")}>
                <div className="cs-impact-eyebrow">{t("cs.impactLabel")}</div>
                <p className="cs-impact-headline">
                  <span className="cs-impact-num">{t(`cs.${k}.ou.m1.v`)}</span>
                  <span className="cs-impact-label">
                    {t(`cs.${k}.ou.m1.label`)}
                  </span>
                </p>
              </div>
              <dl className="cs-metrics">
                {([1, 2, 3] as const).map((i) => {
                  const v = t(`cs.${k}.ou.m${i}.v`);
                  const parts = v.split("→");
                  return (
                    <div key={i}>
                      <dt>{t(`cs.${k}.ou.m${i}.label`)}</dt>
                      <dd>
                        {parts[0]}
                        {parts.length > 1 && <em>→</em>}
                        {parts.slice(1).join("→")}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <p className="prose">{t(`cs.${k}.ou.p`)}</p>
            </div>
          </div>
        </div>

        {/* The structured interview takeaway duplicated this reflection.
            Its anchor moves here so proof links keep working. */}
        <div id="interview-takeaway" className="case-anchor" aria-hidden />
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.rf.label`)}</div>
            </div>
            <div className="cs-row-body">
              <p className="prose">{t(`cs.${k}.rf.p`)}</p>
            </div>
          </div>
        </div>

        <div
          id="related-projects"
          className="cs-section cs-related-section"
          style={{ borderTop: "1px solid var(--border)", paddingTop: 48 }}
        >
          <div className="label" style={{ marginBottom: 20 }}>
            {t("cs.related")}
          </div>
          <div className="cs-related">
            <Link
              href={`/projects/${prevSlug}`}
              className="cs-related-card cs-related-prev"
            >
              <div className="cs-related-eyebrow">← {t("cs.prev")}</div>
              <div className="cs-related-viz" aria-hidden>
                <CoverViz slug={prevSlug} locale={proofLocale} />
              </div>
              <div className="cs-related-meta">
                <h4>{t(`proj.${prevSlug}.title`)}</h4>
                <p>{t(`proj.${prevSlug}.sub`)}</p>
              </div>
            </Link>
            <Link
              href={`/projects/${nextSlug}`}
              className="cs-related-card cs-related-next"
            >
              <div className="cs-related-eyebrow">{t("cs.next")} →</div>
              <div className="cs-related-viz" aria-hidden>
                <CoverViz slug={nextSlug} locale={proofLocale} />
              </div>
              <div className="cs-related-meta">
                <h4>{t(`proj.${nextSlug}.title`)}</h4>
                <p>{t(`proj.${nextSlug}.sub`)}</p>
              </div>
            </Link>
          </div>
          <div className="cs-related-foot">
            <Link href="/projects" className="btn btn-ghost">
              ← {t("nav.work")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
