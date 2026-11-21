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
    title: "Designing trust across AI-assisted workflows",
    intro:
      "One interaction principle connects these projects: an interface should make uncertainty legible instead of hiding it behind confident UI polish. Each entry specifies authorship and verification scope.",
    entries: [
      {
        slug: "pricewise",
        caseName: "PriceWise",
        who: "Solo project",
        body:
          "Codex and Claude Code wrote the implementation while I defined the interaction specs, reviewed code behavior, and verified flows against live responses. When a receipt scan is ambiguous, the interface labels it unmatched instead of guessing silently—keeping uncertainty visible so the shopper stays in control. Even after automated checks passed, testing live calls exposed fallback behavior and regressions that static checks missed.",
        href: "/projects/pricewise#decision-timeline",
      },
      {
        slug: "gapmapper",
        caseName: "Perception Gap Mapper",
        who: "Six-person course team",
        body:
          "I prototyped the first route-recommendation view, and putting it on screen revealed the interaction flaw: suggesting a 'safer route' claimed authority an automated score had not earned. I pushed to pivot the audience toward city planners, surfacing where lived perception disagrees with objective lighting data without publishing a public safety score.",
        href: "/projects/gapmapper#decision-timeline",
      },
      {
        slug: "connect",
        caseName: "UQ Connect",
        who: "Five-person course team",
        body:
          "Research showed students ignored black-box recommendations, yet acted immediately when cards explained why a peer fit—listing shared courses, venue, schedule, and group size. I built the shared component system and co-ran usability sessions around an MVP powered by mock matching data.",
        href: "/projects/connect#decision-timeline",
      },
      {
        slug: "hoop",
        caseName: "Hoop Dream",
        who: "Solo project",
        body:
          "To keep hundreds of generated scenes feeling like one cohesive basketball world, I authored visual art bibles and negative-prompt constraints ahead of batch generation. While manifest scripts verify metadata integrity, visual tone and continuity are still reviewed manually side by side.",
        href: "/projects/hoop#decision-timeline",
      },
    ],
    limit: "Each project works with real prototypes under scoped conditions—mock data, manual style review, or solo testing—rather than live production traffic.",
    linkLabel: "Inspect decision in case",
    caseMarker: { label: "Thread", link: "AI and trust" },
  },
  zh: {
    eyebrow: "AI 交互",
    title: "贯穿项目的一条主线：让信任机制看得见",
    intro:
      "这组案例背后连着同一条交互原则：当系统底层存在不确定性时，界面应当把判断分寸摆在明处，而不是用过度肯定的视觉去掩盖它。每条记录都写明了署名分工与当前验证边界。",
    entries: [
      {
        slug: "pricewise",
        caseName: "PriceWise",
        who: "个人独立项目",
        body:
          "开发实现配合 Codex 与 Claude Code 完成，我负责交互规则定义、核心行为走查与线上接口实测。小票识别出现歧义时，界面主动标记为「未匹配」交给人眼核对，而不替用户盲猜；实测真实接口也帮助发现了静态测试未能暴露的语义搜索回退问题。",
        href: "/projects/pricewise#decision-timeline",
      },
      {
        slug: "gapmapper",
        caseName: "走夜路",
        who: "六人课程团队",
        body:
          "第一版路线建议原型上屏后，我们很快意识到界面隐患：推荐一条「更安全的路」赋予了算法不具备的担保权。中期评图后，我推动产品转向城市规划视角，只呈现主观安全感与客观照明数据的落差，放弃对外发布安全评分。",
        href: "/projects/gapmapper#decision-timeline",
      },
      {
        slug: "connect",
        caseName: "UQ Connect",
        who: "五人课程团队",
        body:
          "访谈观察发现学生几乎不信任黑箱推荐，但只要卡片列出具体依据（同修课程、地点、空闲时段与小组规模），就愿意发起联系。我主导前端共享组件系统，并与组员共同推进多轮原型测试；该 MVP 目前基于模拟数据运行。",
        href: "/projects/connect#decision-timeline",
      },
      {
        slug: "hoop",
        caseName: "Hoop Dream",
        who: "个人独立项目",
        body:
          "在批量生成角色与场景素材之前，我先制定美术规范与负面提示词约束，从源头控制画面叙事的一致性。清单校验脚本负责核对文件完整，而画风与氛围是否统一，依然依赖对照规范的逐张人工走查。",
        href: "/projects/hoop#decision-timeline",
      },
    ],
    limit: "这些探索均立足于可交互原型，各自围绕特定范围（如模拟数据、人工视觉走查或内部流程测试）展开验证，尚未经历真实生产流量考验。",
    linkLabel: "查看案例中的设计决策",
    caseMarker: { label: "主线", link: "AI 信任机制" },
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
