import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { StructuredData, generateResumePersonSchema } from "@/lib/seo";
import {
  getRoleFit,
  type ProofLocale,
} from "@/lib/portfolio-proof";
import { ResumeActions } from "./ResumeActions";

/*
 * This page carries the same content as the resume Lewis sends out
 * (career project, 05-portfolio/pdf-2026-08/resume-{en,zh}.html, merged 2026-11-25).
 * The PDFs in public/resume are copies of those send files, not renders of this page,
 * so change the send files first and copy them here; do not run `pnpm resume:pdf`
 * over them.
 */

type Item = [label: string, text: string];
type ExtLink = { href: string; label: string };
type Entry = {
  date: string;
  title: string;
  sub: string;
  caseHref?: string;
  org: string;
  items: Item[];
  links: ExtLink[];
};
type Row = { name: string; text: string; href?: string; linkLabel?: string };

const COPY = {
  en: {
    strip:
      "Interaction & Product Designer · Turning ideas into working AI prototypes · Graduating November 2026 · Brisbane",
    lede:
      "Computer science graduate finishing a master's in interaction design at the University of Queensland. I start from user needs, turn them into clear design rules, and build working prototypes to test them: phone apps, wristbands, and tools that act for users. AI coding tools write most of the code; I own the problem framing, rules, acceptance checks and iteration decisions. Each entry below separates my work from the team's.",
    projects: "Projects",
    other: "Other projects",
    coursework: "Coursework",
    skills: "Skills",
    entries: [
      {
        date: "2026 · 08 – 10",
        title: "On The Beat",
        sub: "phones and wristbands that help strangers at a gig start talking",
        caseHref: "/projects/onthebeat",
        org: "Research, interaction design and the working prototype (five-person DECO3500 team)",
        items: [
          ["Research", "the team ran two rounds of interviews with gig-goers (four to six per round), and I interviewed three. Fans wanted to talk to people around them but could not tell who was interested. The app lets users signal they are open to chatting and reveals first names only after both agree."],
          ["Testing", "I joined both team tests, asking questions, operating the prototype and wristbands, and taking notes. In the studio test, dancing straight away felt abrupt, so the flow shifted to match, talk, then play. Outside a Zara Larsson concert, pairs of fans found it fun and a good icebreaker, though some missed that they could choose or skip an activity."],
          ["My part", "I turned a teammate's Figma design into a working system: a phone app, firmware for two ESP32 wristbands and a cloud relay. Claude Code wrote and flashed the code; I defined the requirements, reviewed its output, and paired and tested the physical wristbands. I ran a four-user end-to-end test that found more than ten issues and fixed them the next day. After the trade show, I addressed 2 of the 6 feedback items we noted, including reducing steps before starting."],
        ],
        links: [
          { href: "https://onthebeat.lewisdong.com", label: "Live prototype ↗" },
          { href: "https://github.com/LewisSwan24/on-the-beat", label: "GitHub ↗" },
        ],
      },
      {
        date: "2026 · 03 – 06",
        title: "MazeRunners",
        sub: "contact-controlled co-operative maze",
        caseHref: "/projects/maze",
        org: "Interaction mechanics and control layer (team project) · built and publicly exhibited",
        items: [
          ["Core mechanic", "each wristband colour is worn by two players, and the maze tilts in that direction only when both touch, so nobody can steer alone. An earlier button-and-joystick version was playtested first, where one quick player ended up controlling everything."],
          ["At the exhibition", "9 groups (36 players) played it live and about 3 groups finished."],
          ["My part", "interaction mechanics, Arduino firmware (AI coding tools helped implement it; I debugged and signed it off), the circuit and all wiring, and the live scoring page. Teammates built the maze body and exterior."],
        ],
        links: [{ href: "https://maze.lewisdong.com", label: "Web console demo ↗" }],
      },
      {
        date: "2026 · 11 – Now",
        title: "Resume Autofill",
        sub: "fills job applications from one resume, without it leaving the device",
        caseHref: "/projects/autofill",
        org: "The problem, the rules the tool follows, and testing on real applications (solo; Claude Code wrote the code) · Chrome extension and Android app",
        items: [
          ["Problem", "graduate applications mean retyping the same resume across Workday, Greenhouse, Beisen, Moka and similar portals. An autofill tool earns trust only if it never fills fields incorrectly, never submits for you and never sends your resume externally."],
          ["Rules I set", "uncertain fields stay blank and outlined for review, while the fill report separately counts filled, needs-review and not-filled fields. On multi-page forms, it clicks Next and stops before final submission. The resume stays on-device: the extension makes no network calls, and Android encrypts it with a device-bound key."],
          ["How far it is verified", "I have used it on my own applications. All fields on the repository's synthetic test forms fill correctly; real-site accuracy has not been measured, and no one else has used it yet."],
        ],
        links: [{ href: "https://github.com/LewisSwan24/resume-autofill", label: "GitHub ↗" }],
      },
      {
        date: "2026 · 10 – Now",
        title: "Lamplight Nook",
        sub: "a pixel café that shows what a long AI task is doing",
        caseHref: "/projects/lamplight",
        org: "The café metaphor, the decision cards, art direction and acceptance (solo; Claude Code wrote the code) · Windows desktop app",
        items: [
          ["Problem", "long-running AI tasks appear as a scrolling log, making it hard to tell who is working, how far along the plan is, or whether it is waiting for you."],
          ["Design", "the main agent and its subagents appear as a café crew, with the plan shown on a blackboard. Questions open a dialog, while risky steps open a plain card defaulting to “Not now”. A small window keeps watch when the café is minimised. Bilingual Chinese and English throughout."],
          ["How far it is verified", "released 0.1.0 on 22 October and 1.0.0 on 5 November 2026. I use it daily; no one else has, and it has had no user testing. Pixel art is from purchased packs."],
        ],
        links: [{ href: "https://lamplight.lewisdong.com/", label: "Lamplight site ↗" }],
      },
    ] satisfies Entry[],
    uqConnect: {
      date: "2025 · 08 – 11",
      title: "UQ Connect",
      sub: "social platform for international students",
      caseHref: "/projects/connect",
      org: "User research and front-end (five-person course team) · demo build on mock data",
      items: [
        ["Hypotheses first", "13 hypotheses, each with a numeric threshold, written before the corresponding test. After three rounds of interviews and testing, the team produced 14 learning cards, 2 matching no hypothesis: event fees keeping students out, and clubs going quiet after recruitment."],
        ["Navigation redrawn", "in a think-aloud session I moderated, the participant could not find a way back. The team then went back to paper and redrew the app as five screens; in the third round, “no way back” did not recur (no quantitative comparison)."],
        ["My part", "of the team's 71 research and testing records, I moderated 14 sessions with 9 participants, 4 of whom returned across rounds. In code, 32 of the team's 157 commits are mine."],
      ],
      links: [{ href: "https://uqconnect.lewisdong.com", label: "Demo ↗" }],
    } satisfies Entry,
    otherRows: [
      { name: "PriceWise", text: "Solo, 2025–26 · receipt-based grocery price comparison. Calling each endpoint and checking the database found four classes of defect that a green build and passing tests had missed.", href: "https://pricewise.lewisdong.com", linkLabel: "pricewise.lewisdong.com" },
      { name: "Grassland Iron Tide", text: "Solo, 2026 · five-mission browser strategy game with one shared command grammar and recoverable failures. Not yet tested with outside players.", href: "https://irontide.lewisdong.com", linkLabel: "irontide.lewisdong.com" },
      { name: "Walkie", text: "Solo, 2026 · wrist-worn voice remote for Claude Code (M5StickS3), approving tool permissions directly on the wrist. The full flow works over USB.", href: "https://github.com/LewisSwan24/walkie", linkLabel: "github.com/LewisSwan24/walkie" },
    ] satisfies Row[],
    courseRows: [
      { name: "DECO7381 capstone", text: "Clipyard, a shared workspace for small video teams with a web app and Discord bot. I contributed 17 merged pull requests covering sign-in and workspace membership, video uploads to Google Drive, asset versions and variations, archive and restore, and end-to-end tests. The team ran six usability sessions in October, and I moderated some of them. The team chose not to deploy it. Course grade: High Distinction (7/7)." },
      { name: "DECO6500 Advanced HCI", text: "TidyMint, a team evaluation study on the unseen half of housework (SDG 5.4): noticing what needs doing, remembering when, knowing what “done” means. 20 participants, task sessions, NASA-TLX and self-report items. I built the prototype, wrote the consent materials and moderated some of the sessions. For the individual A3 I analysed nine published household studies and framed the findings as hypotheses." },
      { name: "Completed", text: "Interaction Design Studio (produced MazeRunners) · Physical Computing (sensor tuning, haptic, light and sound feedback)" },
    ] satisfies Row[],
    skillRows: [
      { name: "Research", text: "Interview guides · think-aloud and contextual testing · field observation · coding quotes into themes · evaluation plans" },
      { name: "Interaction", text: "User flows · information architecture · wireframes · states and edge cases · consent and privacy flows · problem framing and design rationale · bilingual content" },
      { name: "Standards", text: "Documented design rules · components and visual systems · WCAG AA contrast · full keyboard navigation" },
      { name: "Prototyping", text: "Figma / Miro · HTML / CSS / JavaScript · React / Next.js · Phaser · Arduino / ESP32 · Web Serial · haptic, light and sound feedback" },
      { name: "AI", text: "Designing fallback flows for system uncertainty · building with Codex and Claude Code, and verifying their output against real behaviour" },
    ] satisfies Row[],
    edu: [
      { date: "2025.02 – 2026.11", title: "Master of Interaction Design", org: "The University of Queensland, Brisbane" },
      { date: "2020.09 – 2024.07", title: "BSc (Hons) Computer Science", org: "Swansea University, Wales, UK · Upper Second-Class Honours (2:1): four years of core computer science, with an extended honours dissertation" },
    ],
    languages: "Mandarin (native) · English (UK bachelor's and Australian master's, both taught in English)",
  },
  zh: {
    strip: "交互与产品设计师｜能把想法做成可运行的 AI 原型 · 2026 年 11 月毕业 · 布里斯班",
    lede:
      "计算机科学本科，2026 年 11 月昆士兰大学交互设计硕士毕业。我从用户需求出发，将其转化为明确的设计规则，再做成可运行原型去验证。原型涵盖手机 App、手环及代用户执行操作的工具。代码大部分由 AI 编码工具编写，我负责问题定义、规则、验收和迭代判断。各项目均分开标明个人职责与团队贡献。",
    projects: "项目经验",
    other: "其他项目",
    coursework: "课程",
    skills: "专业技能",
    entries: [
      {
        date: "2026 · 08 – 10",
        title: "On The Beat",
        sub: "帮演出现场的陌生人开口聊天的手机与手环",
        caseHref: "/projects/onthebeat",
        org: "用户研究、交互设计与可运行原型（DECO3500 五人团队）",
        items: [
          ["用户研究", "团队做了两轮演出观众访谈，每轮 4 到 6 人，我访谈了其中 3 人。歌迷想和身边的人聊天，却看不出谁愿意聊，因此 App 让用户先表明「我愿意聊」，双方同意后才显示彼此名字。"],
          ["测试", "两轮团队测试我都在现场，负责提问、操作原型和手环、记录观察。studio 测试中，一上来就跳舞让人觉得突兀，流程因此改成先配对、再聊天、后玩游戏。在 Zara Larsson 演唱会场外，歌迷两两试用，觉得好玩、能破冰，也有人没发现活动可以选择或跳过。"],
          ["个人负责", "把组员的 Figma 设计做成可运行系统，包括手机 App、两种 ESP32 手环固件和云端 relay。代码由 Claude Code 编写并烧录，我负责定需求、审查产出，并在手环真机上配对实测。我主持了一场四人端到端测试，测出十多个问题，次日全部修完。展会记下 6 条反馈，我改了其中 2 条，包括精简开始前的步骤。"],
        ],
        links: [
          { href: "https://onthebeat.lewisdong.com", label: "在线原型 ↗" },
          { href: "https://github.com/LewisSwan24/on-the-beat", label: "GitHub ↗" },
        ],
      },
      {
        date: "2026 · 03 – 06",
        title: "MazeRunners",
        sub: "接触控制的多人协作迷宫",
        caseHref: "/projects/maze",
        org: "交互机制设计与控制层开发（小组项目）· 已搭建并公开展出",
        items: [
          ["核心机制", "每种颜色的腕带由两人佩戴，同色两人接触时，迷宫才朝对应方向倾斜，单人无法操控。前期做过按钮摇杆版并试玩，结果反应快的人包揽了全部操作。"],
          ["展出", "现场 9 组共 36 人试玩，约 3 组通关。"],
          ["个人负责", "交互机制、Arduino 程序、电路与全部布线，以及展出用的实时计分网页。程序由 AI 编码工具参与实现，我负责调试与验收；迷宫本体与外观由组员完成。"],
        ],
        links: [{ href: "https://maze.lewisdong.com", label: "在线模拟控制台 ↗" }],
      },
      {
        date: "2026 · 11 – 至今",
        title: "Resume Autofill",
        sub: "用一份简历自动填网申，资料不离开设备",
        caseHref: "/projects/autofill",
        org: "问题定义、工具规则与真实申请测试（个人项目，代码由 Claude Code 编写）· Chrome 扩展与 Android App",
        items: [
          ["问题", "投递应届岗位时，同一份简历要在 Workday、Greenhouse、北森、Moka 等系统里逐项重填。自动填表工具要值得信任，前提是不填错、不代人提交，也不把简历外传。"],
          ["我定的规则", "拿不准的字段留空并标黄，填写报告分开统计已填、待确认和未填。多页表单自动点击「下一步」，最后提交留给本人。简历仅存在设备上：扩展不发起网络请求，Android 端用设备绑定密钥加密。"],
          ["验证到哪一步", "我自己投递时用过。仓库自带测试表单全部填对；真实网站上的准确率尚未测量，也还没有其他人用过。"],
        ],
        links: [{ href: "https://github.com/LewisSwan24/resume-autofill", label: "GitHub ↗" }],
      },
      {
        date: "2026 · 10 – 至今",
        title: "小灯屋 Lamplight Nook",
        sub: "用像素咖啡馆演出长时间 AI 任务的进度",
        caseHref: "/projects/lamplight",
        org: "咖啡馆比喻、决定卡、美术方向与验收（个人项目，代码由 Claude Code 编写）· Windows 桌面应用",
        items: [
          ["问题", "长时运行的 AI 任务只有一屏滚动日志，谁在执行、计划做到哪、是否在等你，都很难看清。"],
          ["设计", "主代理与子代理化身为咖啡馆店员，计划写在黑板上。提问时弹出对话框；有风险的步骤弹出确认卡，默认选项为「先不要」。店面最小化后仍有小窗值守。全程中英双语。"],
          ["验证到哪一步", "2026 年 10 月 22 日发布 0.1.0，11 月 5 日发布 1.0.0。我自己每天在用，还没有其他人用过，也没做过用户测试。像素美术来自购买的素材包。"],
        ],
        links: [{ href: "https://lamplight.lewisdong.com/", label: "小灯屋官网 ↗" }],
      },
    ] satisfies Entry[],
    uqConnect: {
      date: "2025 · 08 – 11",
      title: "UQ Connect",
      sub: "国际学生社交平台",
      caseHref: "/projects/connect",
      org: "用户研究与前端（五人课程团队）· 演示版（模拟数据）",
      items: [
        ["假设前置", "13 条假设均设定量化门槛，在对应检验环节前写定。三轮访谈与测试后整理出 14 张学习卡。其中 2 张不在原有假设内：活动费用把人挡在门外，以及社团招新后缺乏后续。"],
        ["导航重画", "我主持的一场出声思考测试中，参与者找不到返回入口。团队随后回到纸面，将应用重画为 5 个页面；第 3 轮测试中「无法返回」未再出现（未做量化对照）。"],
        ["个人负责", "团队三轮共 71 份研究与测试记录，我主持其中 14 场，涉及 9 位参与者，4 位跨轮回访。团队 157 次提交中我完成 32 次。"],
      ],
      links: [{ href: "https://uqconnect.lewisdong.com", label: "演示版 ↗" }],
    } satisfies Entry,
    otherRows: [
      { name: "PriceWise", text: "个人项目，2025–26 · 小票比价应用。逐个调接口并查库，查出四类构建和测试全绿时未暴露的缺陷。", href: "https://pricewise.lewisdong.com", linkLabel: "pricewise.lewisdong.com" },
      { name: "草原铁潮", text: "个人项目，2026 · 五关网页即时战略游戏，全关共用一套命令语法，失败后可恢复。还没有外部玩家试玩。", href: "https://irontide.lewisdong.com", linkLabel: "irontide.lewisdong.com" },
      { name: "Walkie", text: "个人项目，2026 · 腕戴式 Claude Code 语音遥控器（M5StickS3），可在手腕上审批工具权限。USB 连接下已跑通全流程。", href: "https://github.com/LewisSwan24/walkie", linkLabel: "github.com/LewisSwan24/walkie" },
    ] satisfies Row[],
    courseRows: [
      { name: "DECO7381 毕业设计", text: "团队产品 Clipyard，面向小型视频团队的共享工作区，含网页应用和 Discord 机器人。我合入 17 个 PR，涵盖登录与工作区成员、视频直传 Google Drive、素材版本与变体、归档与恢复及端到端测试。团队 10 月做了 6 场可用性测试，其中几场由我主持。团队决定不上线部署。课程成绩 HD（7 分制满分）。" },
      { name: "DECO6500 高阶人机交互", text: "团队评估研究 TidyMint，关注家务中看不见的那一半：留意到该做、记得何时做、知道怎样算做完（SDG 5.4）。共 20 位参与者，采用任务测试、NASA-TLX 和自评题。我完成原型与知情同意材料，并主持部分测试。个人作业 A3 分析了 9 篇已发表家庭研究，结论定性为假设。" },
      { name: "已修", text: "交互设计工作室（产出 MazeRunners）、物理计算（传感器调校、触觉与声光反馈）" },
    ] satisfies Row[],
    skillRows: [
      { name: "研究", text: "访谈提纲、出声思考与情境测试、现场观察、原话编码归纳主题、评估方案" },
      { name: "交互与产品", text: "用户流程、信息架构、线框、状态与边界情况、知情同意与隐私流程、问题定义与设计论证、中英双语内容" },
      { name: "规范", text: "设计规则文档化、组件与视觉系统、WCAG AA 对比度、键盘全流程" },
      { name: "原型", text: "Figma / Miro、HTML / CSS / JavaScript、React / Next.js、Phaser、Arduino / ESP32、Web Serial、触觉与声光反馈" },
      { name: "AI", text: "系统不确定时的回退设计；用 Codex 和 Claude Code 实现，以真实运行结果核验 AI 写的功能" },
    ] satisfies Row[],
    edu: [
      { date: "2025.02 – 2026.11", title: "交互设计硕士", org: "昆士兰大学，布里斯班" },
      { date: "2020.09 – 2024.07", title: "计算机科学学士（荣誉）", org: "斯旺西大学，英国威尔士 · 二等一级荣誉（2:1）：四年计算机科学核心课程，并完成长篇本科荣誉毕业论文" },
    ],
    languages: "中文（母语）、英语（英国本科与澳洲硕士均以英语授课）",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "zh";
  const title = t("resume.kicker");
  const description =
    locale === "zh"
      ? "交互与产品设计师的简历：项目、研究、课程与教育背景，和投递用的 PDF 是同一份。"
      : "Resume of an interaction and product designer: projects, research, coursework and education, the same as the PDF I send.";
  return {
    title,
    description,
    alternates: buildAlternates("/resume", locale),
    openGraph: buildOpenGraph({ title, description, path: "/resume", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

function EntryBlock({ entry, colon }: { entry: Entry; colon: string }) {
  return (
    <div className="res-entry">
      <div className="date">{entry.date}</div>
      <div>
        <h4>
          {entry.caseHref ? <Link href={entry.caseHref}>{entry.title}</Link> : entry.title}
        </h4>
        <p className="org">
          {entry.sub} · {entry.org}
        </p>
        <ul>
          {entry.items.map(([label, text]) => (
            <li key={label}>
              <b>{label}{colon}</b>{colon === ":" ? " " : ""}{text}
            </li>
          ))}
        </ul>
        {entry.links.length > 0 && (
          <div className="res-inline-links no-print">
            {entry.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RowBlock({ row }: { row: Row }) {
  return (
    <div className="res-entry">
      <div className="date">{row.name}</div>
      <div>
        <p className="org" style={{ marginBottom: 0 }}>
          {row.text}
          {row.href && (
            <>
              {" "}
              <a href={row.href} target="_blank" rel="noopener noreferrer">
                {row.linkLabel}
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

const sideText = {
  margin: 0,
  fontFamily: "var(--font-ui)",
  fontSize: 14,
  color: "var(--text-2)",
  lineHeight: 1.7,
} as const;

export default async function ResumePage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isZh = locale === "zh";
  const proofLocale: ProofLocale = isZh ? "zh" : "en";
  const roleFit = getRoleFit(proofLocale);
  const c = COPY[proofLocale];
  const colon = isZh ? "：" : ":";

  return (
    <main className="page" data-screen-label="05 Resume">
      <StructuredData data={generateResumePersonSchema()} />
      <section className="container res-hero">
        <div>
          <div className="label">{t("resume.kicker")}</div>
          <h1 className="h-display h2" style={{ marginTop: 16 }}>
            {t("resume.headline")}
          </h1>
          <p className="res-hr-strip">{c.strip}</p>
          <p style={{ ...sideText, maxWidth: 760, marginTop: 12 }}>{c.lede}</p>
        </div>
        <ResumeActions />
      </section>

      <section className="container">
        <div className="res-body v4-editorial-grid">
          <div className="v4-span-8">
            <div className="res-section">
              <h3>{c.projects}</h3>
              {c.entries.map((entry) => (
                <EntryBlock key={entry.title} entry={entry} colon={colon} />
              ))}
            </div>

            <div className="res-section">
              <h3>{c.other}</h3>
              <EntryBlock entry={c.uqConnect} colon={colon} />
              {c.otherRows.map((row) => (
                <RowBlock key={row.name} row={row} />
              ))}
            </div>

            <div className="res-section">
              <h3>{c.coursework}</h3>
              {c.courseRows.map((row) => (
                <RowBlock key={row.name} row={row} />
              ))}
            </div>

            <div className="res-section">
              <h3>{t("resume.section.edu")}</h3>
              {c.edu.map((e) => (
                <div className="res-entry" key={e.title}>
                  <div className="date">{e.date}</div>
                  <div>
                    <h4>{e.title}</h4>
                    <p className="org">{e.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="res-side v4-span-4 v4-rail-sticky">
            <div className="res-side-card role-fit-card">
              <h4>{isZh ? "目标岗位" : "Target roles"}</h4>
              <p className="role-fit-availability">{roleFit.availability}</p>
              <div className="role-fit-tags">
                {roleFit.roles.map((role) => (
                  <span className="tag" key={role}>
                    {role}
                  </span>
                ))}
              </div>
              <div className="role-fit-links">
                <Link href="/hire">
                  {isZh ? "打开招聘与简历 →" : "Open Hire & CV →"}
                </Link>
                <Link href="/ai">
                  {isZh ? "在 AI 实验室评估匹配度 →" : "Check the fit in the AI Lab →"}
                </Link>
              </div>
            </div>
            <div className="res-side-card">
              <h4>{c.skills}</h4>
              {c.skillRows.map((row) => (
                <p key={row.name} style={{ ...sideText, marginBottom: 8 }}>
                  <b>{row.name}</b> · {row.text}
                </p>
              ))}
            </div>
            <div className="res-side-card">
              <h4>{isZh ? "语言" : "Languages"}</h4>
              <p style={sideText}>{c.languages}</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
