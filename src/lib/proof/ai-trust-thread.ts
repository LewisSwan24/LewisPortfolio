import { isUnlistedProject } from "../project-routes";
import type { AiTrustThread, ProjectEvidenceSlug, ProofLocale } from "./types";

/**
 * The /hire section that carries AI UX across several cases.
 *
 * AI UX used to rest on one abandoned case alone (dropped on 2026-09-23).
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
export const AI_TRUST_THREAD_HREF = "/interview#ai-trust-thread" as const;

const aiTrustThreads: Record<ProofLocale, AiTrustThread> = {
  en: {
    eyebrow: "AI UX",
    title: "Designing trust across AI-assisted workflows",
    intro:
      "One interaction principle connects these projects: an interface should make uncertainty, human authority, and refusal boundaries legible instead of hiding them behind confident UI polish. Each entry specifies authorship and verification scope.",
    entries: [
      {
        slug: "walkie",
        caseName: "Walkie",
        who: "Solo project (AI tools assisted code)",
        body:
          "Approving shell commands by voice alone fails in noisy rooms. I bound every Claude Code tool approval and new-PC pairing to deliberate physical button presses on an M5StickS3 watch over AES-256-GCM transport, verified via three automated hardware/relay gates.",
        href: "/projects/walkie#decision-timeline",
      },
      {
        slug: "lamplight",
        caseName: "Lamplight Nook",
        who: "Solo direction (Claude Code wrote code)",
        body:
          "Instead of streaming hundreds of terminal log lines or defaulting confirmation modals to Proceed, Lamplight spatializes agent state as a café blackboard and locks risky cards onto 'Not now' while working strictly on file copies.",
        href: "/projects/lamplight#decision-timeline",
      },
      {
        slug: "autofill",
        caseName: "Resume Autofill",
        who: "Solo rules & own-use testing (Claude Code wrote code)",
        body:
          "Ambiguous ATS dropdowns pause for review and open prompts stay blank rather than inviting LLM guesswork; final Submit stays human-locked and all resume data stays local with zero network calls.",
        href: "/projects/autofill#decision-timeline",
      },
      {
        slug: "onthebeat",
        caseName: "On The Beat",
        who: "Coursework individual build (Claude Code wrote code)",
        body:
          "Generated prototypes hid mocked MEET states and laptop dependency. Reviewing and rejecting deceptive drafts produced a standalone Fly.io relay and mutual-consent wristband pairing.",
        href: "/projects/onthebeat#decision-timeline",
      },
    ],
    limit: "Each project works with real prototypes under scoped conditions—solo desk runs, synthetic form suites, or two-device hardware checks—rather than participant studies or live production traffic.",
    linkLabel: "Inspect decision in case",
    caseMarker: { label: "Thread", link: "AI and trust" },
  },
  zh: {
    eyebrow: "AI 交互",
    title: "贯穿项目的一条主线：让信任机制与拒绝边界看得见",
    intro:
      "这组案例背后连着同一条交互原则：当系统底层存在不确定性或越权风险时，界面必须把人的确认权、拒绝分寸与真实状态摆在明处，而不是用过度肯定的视觉去掩盖它。每条记录都写明了署名分工与当前验证边界。",
    entries: [
      {
        slug: "walkie",
        caseName: "Walkie",
        who: "独立设计（AI 编码工具辅助实现）",
        body:
          "嘈杂环境下纯靠语音识别放行高危命令极易误触。我将所有 Claude Code 工具审批与新设备配对硬性绑定在 M5StickS3 实体按键上，辅以 AES-256-GCM 端到端加密中继与三组可复现硬件门禁。",
        href: "/projects/walkie#decision-timeline",
      },
      {
        slug: "lamplight",
        caseName: "Lamplight Nook",
        who: "独立方向与决策（代码由 Claude Code 编写）",
        body:
          "不堆叠滚动终端日志，也不把风险弹窗默认聚焦在「继续」；界面用咖啡馆黑板呈现任务计划，把高风险确认卡初始焦点锁死在「先不要」并强制仅处理文件副本。",
        href: "/projects/lamplight#decision-timeline",
      },
      {
        slug: "autofill",
        caseName: "Resume Autofill",
        who: "独立规则与自用实测（代码由 Claude Code 编写）",
        body:
          "面对有歧义的下拉框与开放问答，宁可标出待核或刻意留白，绝不让模型替求职者编造答案；最终提交永远留给人手点击，简历数据不出本地设备。",
        href: "/projects/autofill#decision-timeline",
      },
      {
        slug: "onthebeat",
        caseName: "On The Beat",
        who: "课程个人实现版（代码由 Claude Code 编写）",
        body:
          "AI 生成初稿曾把写死的假配对和离不开笔电的本地链路藏在精美界面下；9 月 25 日我发现画面上的 MEET 是模拟的。逐一打回重做后才跑通脱离电脑的双向手环协同。",
        href: "/projects/onthebeat#decision-timeline",
      },
    ],
    limit: "这些探索均立足于可运行原型，围绕特定验证范围（作者本人日常运行、合成表单套件或真机双端实测）展开，尚未经历外部参与者测试或真实生产流量考验。",
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
