import { isUnlistedProject } from "../project-routes";
import type { AiTrustThread, ProjectEvidenceSlug, ProofLocale } from "./types";

/**
 * The /hire section that carries AI UX across several cases.
 *
 * AI UX used to rest on Vigil alone, and Vigil was abandoned on 2026-09-23.
 * On 2026-09-28 Lewis chose to show it as a thread through the work rather
 * than as one case: "AI UX是贯穿整个我的生涯的灵魂之一，而不是只限制于某个项目".
 *
 * Every sentence here is bounded by the canonical facts file in the career
 * project (rows 8, 11, 12, 16, 17 and 19):
 * - there is no finished AI-native case, and the intro says so first;
 * - each entry names who did the work, because two of the four are team
 *   projects;
 * - PriceWise is counted as four classes of defect, not five defects. Its six
 *   fix commits of 2026-08-09 name more than ten individual defects, and one
 *   regression came from Lewis's own fix (e066106);
 * - no Perception Gap Mapper route was scored by an AI model, so that entry is
 *   about how sure an automated recommendation may sound;
 * - Hoop Dream never quotes the 299 figure: the image files behind those
 *   registry records were never verified. Its forbidden lists live in the art
 *   bible and in the prompt templates' negative prompts. The only automated
 *   check reads the manifest and PNG headers (PDF portfolio, Hoop Dream 30),
 *   and the production log's style line is hard-coded in the generator
 *   (hoop-dream scripts/generate-stage15-assets.js:227). Style review was
 *   manual, side by side against the art bible, and the entry says so.
 */
export const AI_TRUST_THREAD_ANCHOR = "ai-trust-thread";
export const AI_TRUST_THREAD_HREF = "/hire#ai-trust-thread" as const;

const aiTrustThreads: Record<ProofLocale, AiTrustThread> = {
  en: {
    eyebrow: "AI UX",
    title: "AI and trust: one thread through the work",
    intro:
      "I have not finished an AI-native product yet. What runs through these cases is one habit: a system should never sound surer than its evidence. Each entry below says who did what.",
    entries: [
      {
        slug: "pricewise",
        caseName: "PriceWise",
        who: "Solo project",
        body:
          "Codex and Claude Code wrote the implementation; I wrote the specs, reviewed the code and verified the behaviour. Build, type-check and the full test suite all passed, and four classes of defect were still in the code. Semantic search was one: every query quietly fell back to keyword matching, and the page looked fine. My own fix to it then introduced a regression, which only calling the live endpoint showed. I also made a call: when a receipt match is unsure, it should show as unmatched, where the user can see it. That fallback is not built yet; what a test pins today is one known mismatch.",
        href: "/projects/pricewise#decision-timeline",
      },
      {
        slug: "gapmapper",
        caseName: "Perception Gap Mapper",
        who: "Six-person course team",
        body:
          "I built the first route-support prototype. Once it was on screen, so was the problem: an interface recommending a safer route had claimed an authority it had not earned. So I argued for dropping that direction. After the mid-project critique I pushed the change: the reader became planning agencies, and the output became the places where perception and objective indicators disagree. The team's one-page brief also made 'no public safety score' a constraint. No AI model scored the routes; this entry is about how sure an automated recommendation may sound. The team built the final dashboard, and no real planner has tested the prototype yet.",
        href: "/projects/gapmapper#decision-timeline",
      },
      {
        slug: "connect",
        caseName: "UQ Connect",
        who: "Five-person course team",
        body:
          "The team's research found that students distrusted black-box matching, but acted once a suggestion named a concrete reason. The match card lists its reasons: course, place, availability, group size. I built the shared front-end component system, ran 14 of the 71 sessions and co-wrote the learning cards. A teammate built the matching logic, and the MVP only ever ran on mock data.",
        href: "/projects/connect#decision-timeline",
      },
      {
        slug: "hoop",
        caseName: "Hoop Dream",
        who: "Solo project",
        body:
          "I wrote the art bible before the asset batches. Its forbidden lists went into the prompt templates as negative prompts, so any prompt built from a template carries them: photo, 3D render, neon and anime among them. Style review was manual, with the assets laid side by side against the bible. The only automated check covers the asset manifest, not the style. This entry is about constraining what generative AI produces; players never deal with an AI directly, and the original images have not all been verified.",
        href: "/projects/hoop#decision-timeline",
      },
    ],
    limit: "None of these is a finished AI-native product, and each entry states its own limits.",
    linkLabel: "See the decision in the case",
    caseMarker: { label: "Thread", link: "AI and trust" },
  },
  zh: {
    eyebrow: "AI UX",
    title: "AI 与信任：贯穿几个案例的一条线",
    intro:
      "我还没有做完一个 AI 原生产品。几个案例里一直都在的，是同一个习惯：系统说话的把握，不能超过手上的证据。下面四条，每一条都写明是谁做的。",
    entries: [
      {
        slug: "pricewise",
        caseName: "PriceWise",
        who: "个人项目",
        body:
          "实现由 Codex 和 Claude Code 完成，规格、审查和验收是我做的。构建、类型检查和整套测试都通过了，代码里照样藏着四类缺陷。语义搜索是其中一类：每次查询都静默退回关键字匹配，页面上看不出异常。修语义搜索时，我的修复又带进一处回归，打线上接口才发现。我还定了一条判断：小票匹配拿不准时，应该显示为「未匹配」，让用户看得见。这条判断还没做进产品，测试里目前钉住的，是一处已知的错配。",
        href: "/projects/pricewise#decision-timeline",
      },
      {
        slug: "gapmapper",
        caseName: "走夜路",
        who: "六人课程团队",
        body:
          "第一版路线支持原型是我做的。原型一上屏幕，问题也跟着出来：推荐「更安全路线」的界面，拿到了一种自己没有挣来的权威。所以我主张放弃这个方向。中期评图之后，我推动了转向：读者换成规划机构，输出改成显示感知和客观指标对不上的地方。团队的一页简报也把「不出公开的安全分数」写成约束。路线推荐没有用 AI 模型，这一条讲的是自动推荐该有多大把握。最终的仪表板由团队完成，原型也还没给真实的规划人员测过。",
        href: "/projects/gapmapper#decision-timeline",
      },
      {
        slug: "connect",
        caseName: "UQ Connect",
        who: "五人课程团队",
        body:
          "团队的研究发现：学生不信黑箱匹配，但推荐一旦说出具体理由，他们就愿意行动。匹配卡上也列出了理由：课程、地点、可用时间、小组规模。我负责共享的前端组件系统，做了 71 场研究与测试里的 14 场，也参与撰写 learning cards。匹配逻辑是组员做的，MVP 也只跑过 mock 数据。",
        href: "/projects/connect#decision-timeline",
      },
      {
        slug: "hoop",
        caseName: "Hoop Dream",
        who: "个人项目",
        body:
          "资产批次开工之前，我先写了美术圣经。里面的禁止项写进了提示词模板的负面提示词，用模板写出的提示词都会带上。其中有写实照片、3D 渲染、霓虹和动漫。风格靠人工审查，把资产并排摆开，对照美术圣经看。唯一的自动校验查的是资产清单，查不到风格。这一条讲的是怎么约束生成式 AI 的产出，玩家不会直接和 AI 打交道；原始图像也还没逐张核实。",
        href: "/projects/hoop#decision-timeline",
      },
    ],
    limit: "这四条里没有一个是做完的 AI 原生产品，每一条的边界都写在条目里。",
    linkLabel: "看案例里的决策",
    caseMarker: { label: "主线", link: "AI 与信任" },
  },
};

export function getAiTrustThread(locale: ProofLocale): AiTrustThread {
  const thread = aiTrustThreads[locale];
  return {
    ...thread,
    entries: thread.entries.filter((entry) => !isUnlistedProject(entry.slug)),
  };
}

/** Case pages that carry a one-line marker back to the thread. */
export function isOnAiTrustThread(slug: ProjectEvidenceSlug): boolean {
  return getAiTrustThread("en").entries.some((entry) => entry.slug === slug);
}
