import type { CurrentProjectSlug } from "@/lib/project-routes";

export interface CodeDiffLine {
  kind: "context" | "remove" | "add";
  code: string;
}

export interface CaseCodeDiffSpec {
  slug: Extract<
    CurrentProjectSlug,
    "walkie" | "lamplight" | "autofill" | "maze" | "onthebeat" | "grassland"
  >;
  filePath: string;
  symbolName: string;
  title: { en: string; zh: string };
  antiPatternLabel: { en: string; zh: string };
  invariantLabel: { en: string; zh: string };
  rationale: { en: string; zh: string };
  hunks: readonly CodeDiffLine[];
}

export const CASE_CODE_DIFFS: readonly CaseCodeDiffSpec[] = [
  {
    slug: "walkie",
    filePath: "firmware/transport-owner.ts",
    symbolName: "acquireActiveAudioOwner",
    title: {
      en: "Abort In-Flight Turn on USB Unplug Instead of Stitching Codecs",
      zh: "拔线即中止当前轮次：禁止硬拼有线 PCM 与无线 ADPCM",
    },
    antiPatternLabel: {
      en: "Anti-Pattern: Auto-switch mid-stream codec buffer",
      zh: "反模式：说话中途热切流、硬拼不同采样缓冲",
    },
    invariantLabel: {
      en: "Production Invariant: Fail-closed single owner",
      zh: "线上铁律：单一传输属主，物理断线即熔断重启",
    },
    rationale: {
      en: "Mid-utterance switching from 16 kHz USB PCM to 4-bit ADPCM corrupts transcription offsets and hides packet drops. Failing closed surfaces a clear 3-way hardware prompt immediately.",
      zh: "录音中途切换音频编码会导致语音切分错位并掩盖真实丢包。宁可显式中止并提示三段链路状态，也绝不拼出半截错乱提示词。",
    },
    hunks: [
      { kind: "context", code: "function onUsbDtrDrop(turn: ActiveVoiceTurn) {" },
      { kind: "remove", code: "  turn.transport = 'fly-wss-adpcm'; // unsafe codec splice" },
      { kind: "remove", code: "  flushPartialBuffer(turn.pcmChunks);" },
      { kind: "add", code: "  turn.abortWithReason('USB_PREEMPT_DROPPED');" },
      { kind: "add", code: "  emitThreeWayLinkDiagnostic({ usb: 'down', relay: 'standby' });" },
      { kind: "context", code: "}" },
    ],
  },
  {
    slug: "lamplight",
    filePath: "domain/caregiver-commit-gate.ts",
    symbolName: "applySuggestedScheduleChange",
    title: {
      en: "Require Two-Phase Proposal Sign-Off Before Caregiver Mutations",
      zh: "两步提案签名落库：禁止模型静默改写家庭照护日程",
    },
    antiPatternLabel: {
      en: "Anti-Pattern: Direct DB mutation from assistant suggestion",
      zh: "反模式：AI 输出解析后直接覆盖排班表",
    },
    invariantLabel: {
      en: "Production Invariant: Pending proposal card + rollback token",
      zh: "线上铁律：悬停待批提案态 + 一键撤回快照",
    },
    rationale: {
      en: "A quiet false-positive reschedule breaks family trust far harder than one explicit confirmation tap. Separating draft computation from commit isolates AI latency from household state.",
      zh: "家庭照护协作中哪怕一次静默改错时间，代价都是整晚安排失灵。将模型推理锁定在可预览提案态，未获确认前业务表纹丝不动。",
    },
    hunks: [
      { kind: "context", code: "export async function handleTriageAction(proposal: AiScheduleDraft) {" },
      { kind: "remove", code: "  await db.shifts.update(proposal.shiftId, proposal.patch);" },
      { kind: "add", code: "  const token = await db.proposals.stageReversible(proposal);" },
      { kind: "add", code: "  return { status: 'awaiting_human_signoff', rollbackToken: token };" },
      { kind: "context", code: "}" },
    ],
  },
  {
    slug: "autofill",
    filePath: "extension/field-snapshot-guard.ts",
    symbolName: "commitFieldFillSafely",
    title: {
      en: "Protect Manual Form Edits & Stage Reversible Field Snapshots",
      zh: "人工编辑字段锁定 + 写前快照保护：绝不悄然覆盖",
    },
    antiPatternLabel: {
      en: "Anti-Pattern: Blindly overwrite value across all matched inputs",
      zh: "反模式：正则命中即强制覆盖所有输入框旧值",
    },
    invariantLabel: {
      en: "Production Invariant: Skip dirty/compliance fields + push snapshot",
      zh: "线上铁律：人工态与声明框硬跳过，写入前必存历史快照",
    },
    rationale: {
      en: "Applicants tweak nuanced answers directly inside forms. Locking user-edited inputs and storing the exact pre-fill string enables effortless per-field revert.",
      zh: "求职者常在页面上逐字微调关键陈述。拒绝强行覆写已改动字段，并在自动填充前一刻压入原始文本快照，确保随时可单项撤销。",
    },
    hunks: [
      { kind: "context", code: "function writeSlot(el: HTMLInputElement, candidate: string) {" },
      { kind: "remove", code: "  el.value = candidate;" },
      { kind: "add", code: "  if (el.dataset.userDirty === 'true' || isDeclarationControl(el)) return 'locked';" },
      { kind: "add", code: "  snapshotHistory.push({ el, prev: el.value });" },
      { kind: "add", code: "  applyNativeSetter(el, candidate);" },
      { kind: "context", code: "}" },
    ],
  },
  {
    slug: "maze",
    filePath: "firmware/fc51-debounce.ts",
    symbolName: "evaluateIrWallHit",
    title: {
      en: "Enforce 45 ms Hardware Debounce Against High-Gloss Glitches",
      zh: "焊死 45 ms 红外防抖门槛：拒绝高反光噪点冤枉扣分",
    },
    antiPatternLabel: {
      en: "Anti-Pattern: Instant edge interrupt triggers penalty buzzer",
      zh: "反模式：上升沿毛刺直接触发撞墙惩罚与舵机抖动",
    },
    invariantLabel: {
      en: "Production Invariant: Sustained 45 ms low dwell window required",
      zh: "线上铁律：连续遮挡满 45 ms 方记为有效碰撞",
    },
    rationale: {
      en: "Stage spotlights bounce off glossy maze acrylic and cause 12-18 ms false spikes. Ignoring any pulse shorter than 45 ms eliminates phantom penalties without delaying human collisions.",
      zh: "展厅聚光灯照在亚克力挡板上常激起十几毫秒瞬时跳变。低于 45 ms 的信号直接归零丢弃，在不拖慢正常手感的同时消除莫名扣分。",
    },
    hunks: [
      { kind: "context", code: "function sampleIrChannel(rawHigh: boolean, elapsedLowMs: number) {" },
      { kind: "remove", code: "  if (rawHigh) triggerWallPenalty();" },
      { kind: "add", code: "  if (rawHigh && elapsedLowMs < 45) return 'discard_glitch_15ms';" },
      { kind: "add", code: "  if (elapsedLowMs >= 45) confirmIsolatedWallHit();" },
      { kind: "context", code: "}" },
    ],
  },
  {
    slug: "onthebeat",
    filePath: "ble/proximity-reveal-gate.ts",
    symbolName: "handleMutualNodReveal",
    title: {
      en: "Auto-Dim Wearable Display After Mutual Physical Reveal",
      zh: "双向点头后主动熄屏退场：硬件只在破冰那一秒发光",
    },
    antiPatternLabel: {
      en: "Anti-Pattern: Keep polling RSSI and streaming peer lists after match",
      zh: "反模式：配对成功后继续常亮轮询并展示附近人流表",
    },
    invariantLabel: {
      en: "Production Invariant: Clear transient IDs and hibernate display",
      zh: "线上铁律：清空临时信标、渐隐屏显并把注意力交还真人对话",
    },
    rationale: {
      en: "Social wearables fail if attendees stare at wrist alerts instead of talking. Once mutual acknowledgment flips true, transient handles expire so real conversation takes over.",
      zh: "如果见面之后用户还在低头刷手腕上的状态卡片，这套系统就算彻底失败。双方确认互认后立刻销毁临时句柄并息屏退场。",
    },
    hunks: [
      { kind: "context", code: "function onReciprocalReveal(session: ProximitySession) {" },
      { kind: "remove", code: "  bleScanner.keepContinuousWatch(session.peerTempId);" },
      { kind: "add", code: "  session.purgeEphemeralTokens();" },
      { kind: "add", code: "  oledDisplay.fadeToIdleAfterMs(4000);" },
      { kind: "context", code: "}" },
    ],
  },
  {
    slug: "grassland",
    filePath: "lib/redaction/pii-scrubber.ts",
    symbolName: "scrubBeforeRetrieval",
    title: {
      en: "Deterministic Client PII & Secret Scrubbing Before Search Scoring",
      zh: "入检前强制剥离邮箱、电话与秘钥前缀：绝不带密上链",
    },
    antiPatternLabel: {
      en: "Anti-Pattern: Send raw recruiter JD text straight to API endpoint",
      zh: "反模式：原封不动把招聘 JD 和内部联系串直传服务端",
    },
    invariantLabel: {
      en: "Production Invariant: Local regex redaction + bounded return payload",
      zh: "线上铁律：端侧先行匿名脱敏，仅放行摘要供检索计分",
    },
    rationale: {
      en: "Recruiters often copy full internal email threads containing emails, phone lines, or staging keys. Scrubbing locally guarantees private tokens never cross the network boundary.",
      zh: "招聘方常顺手连同直属邮箱、分机号乃至内测密钥整段贴入框内。端侧硬剥离能从根部保证隐私字段绝不出浏览器半步。",
    },
    hunks: [
      { kind: "context", code: "export function sanitizeQuery(rawInput: string): string {" },
      { kind: "remove", code: "  return rawInput.trim();" },
      { kind: "add", code: "  return scrubSecretsAndEmails(rawInput).slice(0, 600);" },
      { kind: "context", code: "}" },
    ],
  },
];

export function getCaseCodeDiff(slug: string): CaseCodeDiffSpec | undefined {
  return CASE_CODE_DIFFS.find((entry) => entry.slug === slug);
}
