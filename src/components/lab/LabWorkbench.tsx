"use client";

import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { getGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Locale = "en" | "zh";
type EaseId = "power2.out" | "power3.out" | "back.out(1.2)";
type DemoId = "onthebeat" | "autofill" | "walkie";

const SWATCHES = [
  { token: "--bg", hexLight: "#EFE8DA", hexDark: "#141413", ratio: "Base canvas" },
  { token: "--surface", hexLight: "#F7F4EC", hexDark: "#1C1C1B", ratio: "Card layer" },
  { token: "--surface-2", hexLight: "#E7DFD1", hexDark: "#262624", ratio: "Quiet fill" },
  { token: "--text", hexLight: "#161412", hexDark: "#F5F5F4", ratio: "15.1:1 / 16.9:1" },
  { token: "--text-2", hexLight: "#4E4840", hexDark: "#D0D0CC", ratio: "7.4:1 / 11.9:1" },
  { token: "--text-3", hexLight: "#5F584F", hexDark: "#A8A8A3", ratio: "5.8:1 / 7.7:1" },
  { token: "--border", hexLight: "#9C9182", hexDark: "#5C5C58", ratio: "1px divider" },
  { token: "--accent", hexLight: "#A63F2A", hexDark: "#F5F5F4", ratio: "5.1:1 · actions only" },
] as const;

interface StateStep {
  id: string;
  name: Record<Locale, string>;
  state: Record<Locale, string>;
  rule: Record<Locale, string>;
}

const STATE_DEMOS: Record<
  DemoId,
  {
    title: Record<Locale, string>;
    summary: Record<Locale, string>;
    steps: StateStep[];
  }
> = {
  onthebeat: {
    title: { en: "On The Beat · Zero-Identity Pairing", zh: "On The Beat · 匿名挥手配对" },
    summary: {
      en: "Two strangers at a gig only learn names and a meeting spot after both opt in — never before.",
      zh: "演出里的两位陌生人只有在双方都明确点头之后才互相看到名字与碰面点，绝不提前暴露身份。",
    },
    steps: [
      {
        id: "idle",
        name: { en: "Idle", zh: "待命" },
        state: {
          en: "Wristband quiet, phone dark. Nobody nearby can see you exist in the room.",
          zh: "手环静默、手机息屏。附近任何人都看不到你的存在。",
        },
        rule: {
          en: "Invariant: Presence is opt-in per moment, never always-on broadcasting.",
          zh: "不变量：在场状态必须按次主动开启，禁止常驻广播。",
        },
      },
      {
        id: "armed",
        name: { en: "Armed (SAY HI)", zh: "点亮 SAY HI" },
        state: {
          en: "SAY HI card is lit on the phone; ESP32 wristband arms its IMU wave detector.",
          zh: "手机端 SAY HI 卡点亮；ESP32 手环开启 IMU 挥手检测。",
        },
        rule: {
          en: "Invariant: Single gesture commits intent without browsing profiles.",
          zh: "不变量：单次实体动作表达意愿，不引入刷资料卡片。",
        },
      },
      {
        id: "waved",
        name: { en: "Nearby Wave", zh: "收到挥手（匿名）" },
        state: {
          en: "Relay forwards a nearby pulse. Screen says only that someone nearby waved — zero name, zero photo.",
          zh: "中继转发附近信号。屏幕只提示「附近有人挥手」——无名字、无照片。",
        },
        rule: {
          en: "Invariant: Unilateral interest never leaks identity.",
          zh: "不变量：单方兴趣绝不泄露对方身份。",
        },
      },
      {
        id: "match",
        name: { en: "Mutual Nod", zh: "双向确认碰面" },
        state: {
          en: "Both nodded. Names and one meeting landmark appear, then the app gets out of the way.",
          zh: "双方点头后才显示彼此名字与唯一碰面点，随后应用退场。",
        },
        rule: {
          en: "Invariant: Success metric is phones returning to pockets.",
          zh: "不变量：成功标准是手机重新放回口袋。",
        },
      },
    ],
  },
  autofill: {
    title: { en: "Resume Autofill · Zero-Guess Confidence Gate", zh: "Resume Autofill · 零猜测置信度门控" },
    summary: {
      en: "Every form field is classified into three explicit buckets; the extension never fabricates answers and never clicks Submit.",
      zh: "每个表单字段被严格分为三档；扩展永不猜测编造，也永不代点提交按钮。",
    },
    steps: [
      {
        id: "scan",
        name: { en: "Local DOM Scan", zh: "本地 DOM 扫描" },
        state: {
          en: "47 inputs detected on ATS page. Resume stays in local browser storage; zero network upload.",
          zh: "检测到 47 个 ATS 输入框。简历仅留在本地存储，零网络外发。",
        },
        rule: {
          en: "Invariant: Local-first privacy — personal data never leaves the browser.",
          zh: "不变量：本地优先隐私，个人简历绝不离开设备。",
        },
      },
      {
        id: "filled",
        name: { en: "Auto-Filled (45)", zh: "高置信直填（45 项）" },
        state: {
          en: "Deterministic fields (name, degree, dates, links) filled with exact schema match and field-level log.",
          zh: "确定性字段（姓名、学位、日期、链接）按精确规则填入并记录原因。",
        },
        rule: {
          en: "Invariant: Only verified 1:1 mappings write automatically.",
          zh: "不变量：仅经过校验的 1:1 映射才允许自动写入。",
        },
      },
      {
        id: "review",
        name: { en: "Needs Review (1)", zh: "待人工确认（1 项）" },
        state: {
          en: "Work-rights dropdown is ambiguous; highlighted with both word + border (never color alone).",
          zh: "工作权限下拉框存在歧义；同时用文字与线框标记（不只靠颜色）。",
        },
        rule: {
          en: "Invariant: Uncertainty surfaces as a review item, never a silent guess.",
          zh: "不变量：不确定性必须显式暴露给用户确认，绝不静默猜测。",
        },
      },
      {
        id: "submit-lock",
        name: { en: "Human Submit Lock", zh: "人工提交锁" },
        state: {
          en: "Side panel reports 45 filled · 1 to review · 1 not filled. Final Submit remains strictly human-triggered.",
          zh: "侧栏汇报 45 已填 · 1 待确认 · 1 未填。最终提交按钮严格锁定为人工点击。",
        },
        rule: {
          en: "Invariant: Automation stops before irreversible external commitment.",
          zh: "不变量：自动化在不可逆外部提交之前强制停止。",
        },
      },
    ],
  },
  walkie: {
    title: { en: "Walkie · Wrist Voice Approval Gate for Claude Code", zh: "Walkie · 手腕语音与工具权限审批流" },
    summary: {
      en: "M5StickS3 firmware + AES-256-GCM sealed link + Node bridge routing spoken instructions and Claude tool approvals to the wrist.",
      zh: "M5StickS3 固件 + AES-256-GCM 加密链路 + Node 桥接，把语音指令与 Claude 工具审批直接送到手腕。",
    },
    steps: [
      {
        id: "ptt",
        name: { en: "Hold Front Key", zh: "按住前键说话" },
        state: {
          en: "M5StickS3 captures 16 kHz audio (PCM over USB, or 4-bit ADPCM over Fly.io sealed relay).",
          zh: "M5StickS3 采集 16 kHz 语音（USB 走 PCM，Fly.io 加密中继走 4-bit ADPCM）。",
        },
        rule: {
          en: "Invariant: Physical press-to-talk guarantees deliberate mic capture.",
          zh: "不变量：实体按键按住说话，确保录音意图清晰可控。",
        },
      },
      {
        id: "seal",
        name: { en: "Sealed Frame", zh: "AES-256-GCM 封包" },
        state: {
          en: "Frame encrypted with HKDF session key from pair.key; relay forwards ciphertext without reading it.",
          zh: "由 pair.key 派生 HKDF 会话密钥加密帧；云端中继仅转发密文无法解密。",
        },
        rule: {
          en: "Invariant: Relay is zero-knowledge; USB cable always wins when plugged in.",
          zh: "不变量：中继零知识；插线时 USB 永远优先于无线中继。",
        },
      },
      {
        id: "perm",
        name: { en: "Wrist Permission", zh: "手腕审批门控" },
        state: {
          en: "Claude Code requests a tool call. Bridge queues approval on the S3 screen: front key approves, side key denies (with optional voice reason).",
          zh: "Claude Code 请求工具调用。桥接将审批推到手腕屏幕：前键同意、侧键拒绝（可附口述原因）。",
        },
        rule: {
          en: "Invariant: High-impact agent actions require physical confirmation.",
          zh: "不变量：高风险 Agent 动作必须经过实体按键确认。",
        },
      },
      {
        id: "reply",
        name: { en: "Spoken Summary", zh: "语音简报回传" },
        state: {
          en: "Bridge summarizes the turn via OpenAI (Gemini fallback) and streams audio back to the wrist speaker.",
          zh: "桥接通过 OpenAI（Gemini 兜底）合成简短结果回传至手腕扬声器。",
        },
        rule: {
          en: "Invariant: Eyes-free feedback loop closes without returning to the desk.",
          zh: "不变量：免看屏幕完成闭环，无需走回电脑前。",
        },
      },
    ],
  },
};

export function LabWorkbench({ locale }: { locale: Locale }) {
  const isZh = locale === "zh";
  const { resolvedTheme, setTheme } = useTheme();
  const osReducedMotion = useReducedMotion();

  // Module 02 state: GSAP Paper Motion Sandbox
  const [duration, setDuration] = useState(0.36);
  const [ease, setEase] = useState<EaseId>("power3.out");
  const [simulateReduced, setSimulateReduced] = useState(false);
  const [cardAtRight, setCardAtRight] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Module 03 state: State-Machine Micro-Demos
  const [activeDemo, setActiveDemo] = useState<DemoId>("onthebeat");
  const [stepIdx, setStepIdx] = useState(0);

  const effectiveReduced = osReducedMotion || simulateReduced;
  const demo = STATE_DEMOS[activeDemo];
  const currentStep = demo.steps[stepIdx] ?? demo.steps[0];

  const triggerMotion = () => {
    const nextSide = !cardAtRight;
    setCardAtRight(nextSide);
    const el = cardRef.current;
    if (!el) return;
    const { gsap } = getGsap();
    const targetX = nextSide ? 160 : 0;
    const targetRot = nextSide ? 2 : -1.5;

    if (effectiveReduced) {
      gsap.set(el, { x: targetX, rotation: 0, opacity: 1 });
      return;
    }

    gsap.to(el, {
      x: targetX,
      rotation: targetRot,
      duration,
      ease,
      overwrite: "auto",
    });
  };

  const switchDemo = (next: DemoId) => {
    setActiveDemo(next);
    setStepIdx(0);
  };

  return (
    <div className="container lab-grid">
      {/* Module 01: Lively Icons Token & Contrast Inspector */}
      <section className="lab-module" aria-labelledby="lab-tokens-title">
        <div className="lab-module-head">
          <div>
            <div className="label">01 · {isZh ? "设计语言检查器" : "Design System Inspector"}</div>
            <h2 id="lab-tokens-title">
              {isZh ? "Lively Icons 暖纸色与单强调色规范" : "Lively Icons Warm-Paper & Single-Accent Tokens"}
            </h2>
            <p>
              {isZh
                ? "零阴影、零渐变、零毛玻璃。层级全靠 1px 线框区分；亮色仅用赤陶红标记可点击动作，暗色完全去色相。"
                : "No shadows, no gradients, no blur. Layers separate with 1px lines; terra marks actions only in light mode, while dark mode drops hue completely."}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {isZh
              ? `切换主题（当前：${resolvedTheme === "dark" ? "暗色" : "亮色"}）`
              : `Toggle theme (${resolvedTheme === "dark" ? "dark" : "light"})`}
          </button>
        </div>

        <div className="lab-swatch-grid">
          {SWATCHES.map((s) => (
            <div className="lab-swatch" key={s.token}>
              <div className="lab-swatch-chip" style={{ background: `var(${s.token})` }} />
              <div className="lab-swatch-meta">
                <code>{s.token}</code>
                <span>{resolvedTheme === "dark" ? s.hexDark : s.hexLight}</span>
                <span>{s.ratio}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lab-type-row">
          <div className="lab-type-card">
            <div className="eyebrow">01 · Page Title (700)</div>
            <div className="lab-type-sample-title">
              {isZh ? "交互即规则" : "Rules you can feel"}
            </div>
            <span className="eyebrow">Shantell Sans / ZCOOL KuaiLe · h1 only</span>
          </div>
          <div className="lab-type-card">
            <div className="eyebrow">02 · Interface & Body (400 / 600)</div>
            <div className="lab-type-sample-ui">
              {isZh ? "清晰胜过装饰，证据先于修辞。" : "Clarity over ornament, proof before prose."}
            </div>
            <span className="eyebrow">Lexend · no italics, two weights</span>
          </div>
          <div className="lab-type-card">
            <div className="eyebrow">03 · Technical Metadata (400)</div>
            <div className="lab-type-sample-mono">2026-11-21 · v3.0 · 15.1:1</div>
            <span className="eyebrow">Geist Mono · dates, tokens, specs</span>
          </div>
        </div>
      </section>

      {/* Module 02: GSAP Paper Motion Sandbox */}
      <section className="lab-module" aria-labelledby="lab-motion-title">
        <div className="lab-module-head">
          <div>
            <div className="label">02 · {isZh ? "GSAP 纸面动效实验台" : "GSAP Paper Motion Sandbox"}</div>
            <h2 id="lab-motion-title">
              {isZh ? "克制、仅合成属性的交互曲线" : "Restrained, Transform-Only Motion Curves"}
            </h2>
            <p>
              {isZh
                ? "全站统一采用 GSAP（移除 framer-motion），只动画 x / rotation / opacity，并在 reduced-motion 下自动退化为 0ms 瞬时切换。"
                : "Powered by a single GSAP layer (framer-motion removed), animating transform properties only and snapping instantly under reduced motion."}
            </p>
          </div>
        </div>

        <div className="lab-motion-wrap">
          <div className="lab-motion-stage">
            <div ref={cardRef} className="lab-motion-card" style={{ transform: "rotate(-1.5deg)" }}>
              <strong>{isZh ? "纸面卡片样本" : "Paper Card Specimen"}</strong>
              <span>{effectiveReduced ? "duration: 0ms (reduced)" : `${duration.toFixed(2)}s · ${ease}`}</span>
            </div>
            <button type="button" className="btn btn-primary" onClick={triggerMotion}>
              {isZh ? "触发位移" : "Trigger motion"} →
            </button>
          </div>

          <div className="lab-motion-controls">
            <div className="lab-control-row">
              <label htmlFor="lab-duration">
                <span>{isZh ? "时长 (duration)" : "Duration"}</span>
                <span>{duration.toFixed(2)}s</span>
              </label>
              <input
                id="lab-duration"
                type="range"
                min={0.16}
                max={0.65}
                step={0.02}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>

            <div className="lab-control-row">
              <label>{isZh ? "缓动曲线 (ease)" : "Easing preset"}</label>
              <div className="lab-pill-row">
                {(["power2.out", "power3.out", "back.out(1.2)"] as const).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className="lab-pill"
                    aria-pressed={ease === preset}
                    onClick={() => setEase(preset)}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="lab-control-row">
              <label>{isZh ? "无障碍降级模拟" : "Reduced-motion simulation"}</label>
              <button
                type="button"
                className="lab-pill"
                aria-pressed={simulateReduced}
                onClick={() => setSimulateReduced((v) => !v)}
              >
                {simulateReduced
                  ? isZh
                    ? "已开启 reduced-motion（瞬时切换）"
                    : "Reduced motion ON (instant)"
                  : isZh
                    ? "模拟 prefers-reduced-motion"
                    : "Simulate prefers-reduced-motion"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Module 03: Interactive State-Machine Micro-Demos */}
      <section className="lab-module" aria-labelledby="lab-sm-title">
        <div className="lab-module-head">
          <div>
            <div className="label">03 · {isZh ? "交互状态机微原型" : "State-Machine Micro-Demos"}</div>
            <h2 id="lab-sm-title">
              {isZh ? "从真实项目中抽离的核心规则" : "Core Interaction Invariants from Real Builds"}
            </h2>
            <p>
              {isZh
                ? "点击下方不同项目与状态节点，直接走查每个系统「绝不越界」的交互契约。"
                : "Step through the finite states of three real builds to inspect the exact invariants that keep trust and hardware feedback predictable."}
            </p>
          </div>
        </div>

        <div className="lab-sm-tabs" role="tablist" aria-label={isZh ? "选择状态机案例" : "Select state machine"}>
          {(["onthebeat", "autofill", "walkie"] as const).map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeDemo === id}
              className="lab-pill"
              onClick={() => switchDemo(id)}
            >
              {STATE_DEMOS[id].title[locale]}
            </button>
          ))}
        </div>

        <p style={{ marginBottom: 16, color: "var(--text-2)", fontSize: 15 }}>
          {demo.summary[locale]}
        </p>

        <div className="lab-sm-steps">
          {demo.steps.map((step, i) => (
            <button
              key={step.id}
              type="button"
              className={`lab-sm-step${i === stepIdx ? " is-current" : ""}`}
              onClick={() => setStepIdx(i)}
            >
              <div className="lab-sm-step-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="lab-sm-step-name">{step.name[locale]}</div>
            </button>
          ))}
        </div>

        <div className="lab-sm-detail" aria-live="polite">
          <div className="eyebrow">
            {isZh ? "当前状态" : "Active state"} · {String(stepIdx + 1).padStart(2, "0")} /{" "}
            {String(demo.steps.length).padStart(2, "0")}
          </div>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{currentStep.name[locale]}</h3>
          <p style={{ margin: 0, color: "var(--text-2)", lineHeight: 1.6 }}>
            {currentStep.state[locale]}
          </p>
          <div className="lab-sm-rule">{currentStep.rule[locale]}</div>
          <div className="lab-sm-actions">
            <button
              type="button"
              className="btn btn-ghost"
              disabled={stepIdx === 0}
              onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
            >
              ← {isZh ? "上一步" : "Previous"}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setStepIdx((i) => (i + 1) % demo.steps.length)}
            >
              {stepIdx === demo.steps.length - 1
                ? isZh
                  ? "重新开始"
                  : "Restart flow"
                : isZh
                  ? "推进到下一状态 →"
                  : "Advance state →"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
