import React from "react";

export function CrossPracticeArchitectureSvg({ locale }: { locale: "en" | "zh" }) {
  const isZh = locale === "zh";
  return (
    <figure className="editorial-svg-figure">
      <svg
        aria-hidden="true"
        viewBox="0 0 880 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="16"
          y="24"
          width="248"
          height="212"
          rx="10"
          fill="var(--surface-2)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        <text
          x="36"
          y="58"
          fill="var(--accent)"
          fontSize="11"
          fontFamily="var(--font-mono)"
          letterSpacing="1.2"
        >
          2020–2024 · SWANSEA UK
        </text>
        <text
          x="36"
          y="88"
          fill="var(--text)"
          fontSize="17"
          fontWeight="600"
          fontFamily="var(--font-display)"
        >
          {isZh ? "CS 工程底座 (2:1)" : "BSc (Hons) CS (2:1)"}
        </text>
        <text
          x="36"
          y="120"
          fill="var(--text-2)"
          fontSize="12.5"
          fontFamily="var(--font-ui)"
        >
          {isZh ? "• 状态约束与并发系统基础" : "• State invariants & concurrency"}
        </text>
        <text
          x="36"
          y="144"
          fill="var(--text-2)"
          fontSize="12.5"
          fontFamily="var(--font-ui)"
        >
          {isZh ? "• 异常分支与边界防错思路" : "• Failure modes & fault recovery"}
        </text>
        <text
          x="36"
          y="168"
          fill="var(--text-2)"
          fontSize="12.5"
          fontFamily="var(--font-ui)"
        >
          {isZh ? "• 本科荣誉毕业论文长篇实践" : "• Extended honours dissertation"}
        </text>
        <text
          x="36"
          y="206"
          fill="var(--text-3)"
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          {isZh ? "确定性系统逻辑训练" : "Deterministic engineering lens"}
        </text>

        <path
          d="M270 130H308M308 130L300 123M308 130L300 137"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="316"
          y="24"
          width="248"
          height="212"
          rx="10"
          fill="var(--surface-2)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        <text
          x="336"
          y="58"
          fill="var(--accent)"
          fontSize="11"
          fontFamily="var(--font-mono)"
          letterSpacing="1.2"
        >
          2025 · UQ BRISBANE
        </text>
        <text
          x="336"
          y="88"
          fill="var(--text)"
          fontSize="17"
          fontWeight="600"
          fontFamily="var(--font-display)"
        >
          {isZh ? "交互研究与物理计算" : "UQ IxD Methods Bridge"}
        </text>
        <text
          x="336"
          y="120"
          fill="var(--text-2)"
          fontSize="12.5"
          fontFamily="var(--font-ui)"
        >
          {isZh ? "• 信息架构重绘与出声思考" : "• IA redraws & think-aloud logs"}
        </text>
        <text
          x="336"
          y="144"
          fill="var(--text-2)"
          fontSize="12.5"
          fontFamily="var(--font-ui)"
        >
          {isZh ? "• WCAG 无障碍规则与隐私红线" : "• WCAG injection & consent scope"}
        </text>
        <text
          x="336"
          y="168"
          fill="var(--text-2)"
          fontSize="12.5"
          fontFamily="var(--font-ui)"
        >
          {isZh ? "• 传感器、舵机与桌面反馈" : "• Sensors, actuators & feedback"}
        </text>
        <text
          x="336"
          y="206"
          fill="var(--text-3)"
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          {isZh ? "人的注意力与社会摩擦视角" : "Human friction & research framing"}
        </text>

        <path
          d="M570 130H608M608 130L600 123M608 130L600 137"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="616"
          y="24"
          width="248"
          height="212"
          rx="10"
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeWidth="2"
        />
        <text
          x="636"
          y="58"
          fill="var(--accent)"
          fontSize="11"
          fontFamily="var(--font-mono)"
          letterSpacing="1.2"
        >
          2026 · 6 FLAGSHIP BUILDS
        </text>
        <text
          x="636"
          y="88"
          fill="var(--text)"
          fontSize="17"
          fontWeight="600"
          fontFamily="var(--font-display)"
        >
          {isZh ? "近一年可验证全栈/硬件交付" : "Design Engineering Proof"}
        </text>
        <text
          x="636"
          y="120"
          fill="var(--text-2)"
          fontSize="12.5"
          fontFamily="var(--font-ui)"
        >
          {isZh ? "• Walkie / On The Beat ESP32 联调" : "• Walkie / On The Beat ESP32"}
        </text>
        <text
          x="636"
          y="144"
          fill="var(--text-2)"
          fontSize="12.5"
          fontFamily="var(--font-ui)"
        >
          {isZh ? "• Lamplight / Autofill 隐私守护" : "• Lamplight / Autofill AI locks"}
        </text>
        <text
          x="636"
          y="168"
          fill="var(--text-2)"
          fontSize="12.5"
          fontFamily="var(--font-ui)"
        >
          {isZh ? "• MazeRunners 36人展出 · 草原铁潮" : "• MazeRunners (36p) · Iron Tide"}
        </text>
        <text
          x="636"
          y="206"
          fill="var(--text-3)"
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          {isZh ? "TS · Electron · C++ · Playwright" : "TS · Electron · C++ · Playwright"}
        </text>
      </svg>
      <figcaption>
        {isZh
          ? "能力演进脉络：2020–2024 年英国斯旺西 CS 科班训练与荣誉毕业论文奠定状态机确定性思考，2025 年 UQ 研究生课程沉淀出以人因和可验证架构为中心的重构习惯，最终在 2026 年汇成六件软硬件兼修的主力交付作品。"
          : "Training arc from BSc Computer Science at Swansea (2020–24, 2:1 with extended honours dissertation) through 2025 UQ Interaction Design research methods into six 2026 shipped software and hardware prototypes."}
      </figcaption>
    </figure>
  );
}

export function WalkieTactileSchematicSvg({ locale }: { locale: "en" | "zh" }) {
  const isZh = locale === "zh";
  return (
    <figure className="editorial-svg-figure">
      <svg
        aria-hidden="true"
        viewBox="0 0 880 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="20"
          y="24"
          width="360"
          height="232"
          rx="14"
          fill="var(--surface-2)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        <text
          x="42"
          y="54"
          fill="var(--accent)"
          fontSize="11"
          fontFamily="var(--font-mono)"
          letterSpacing="1"
        >
          {isZh ? "M5STICKS3 · 双启动非对称物理门控" : "M5STICKS3 · DUAL-BOOT TACTILE GATE"}
        </text>
        <rect
          x="42"
          y="72"
          width="150"
          height="54"
          rx="8"
          fill="var(--surface)"
          stroke="var(--border)"
        />
        <text x="54" y="95" fill="var(--text)" fontSize="13" fontWeight="600" fontFamily="var(--font-ui)">
          app0: On The Beat
        </text>
        <text x="54" y="114" fill="var(--text-3)" fontSize="11" fontFamily="var(--font-mono)">
          {isZh ? "演出近场互助固件" : "Gig BLE mutual-nod"}
        </text>
        <rect
          x="208"
          y="72"
          width="150"
          height="54"
          rx="8"
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeWidth="1.8"
        />
        <text x="220" y="95" fill="var(--text)" fontSize="13" fontWeight="600" fontFamily="var(--font-ui)">
          app1: Walkie
        </text>
        <text x="220" y="114" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)">
          {isZh ? "guard.py 防误擦保护" : "guard.py protected"}
        </text>
        <rect x="42" y="144" width="150" height="92" rx="8" fill="var(--surface)" stroke="var(--text-2)" />
        <text x="54" y="170" fill="var(--text)" fontSize="13" fontWeight="600" fontFamily="var(--font-ui)">
          {isZh ? "正面大键 (Front)" : "Front Key (PTT)"}
        </text>
        <text x="54" y="192" fill="var(--text-2)" fontSize="11.5" fontFamily="var(--font-ui)">
          {isZh ? "按住录音 / 短按批准" : "Hold talk / Tap approve"}
        </text>
        <text x="54" y="214" fill="var(--text-3)" fontSize="11" fontFamily="var(--font-mono)">
          {isZh ? "30s 配对确权按键" : "30s pair.key anchor"}
        </text>
        <rect x="208" y="144" width="150" height="92" rx="8" fill="var(--surface)" stroke="var(--text-2)" />
        <text x="220" y="170" fill="var(--text)" fontSize="13" fontWeight="600" fontFamily="var(--font-ui)">
          {isZh ? "垂直侧键 (Side)" : "Side Key (Vertical)"}
        </text>
        <text x="220" y="192" fill="var(--text-2)" fontSize="11.5" fontFamily="var(--font-ui)">
          {isZh ? "翻页 / 拒绝并口述理由" : "Page / Deny + reason"}
        </text>
        <text x="220" y="214" fill="var(--text-3)" fontSize="11" fontFamily="var(--font-mono)">
          {isZh ? "双键长按 3s 切槽" : "Both 3s -> swap slot"}
        </text>

        <path
          d="M390 100H454M454 100L446 93M454 100L446 107"
          stroke="var(--text-2)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M390 190H454M454 190L446 183M454 190L446 197"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <rect
          x="466"
          y="46"
          width="172"
          height="84"
          rx="10"
          fill="var(--surface-2)"
          stroke="var(--border-strong)"
        />
        <text x="482" y="76" fill="var(--text)" fontSize="13" fontWeight="600" fontFamily="var(--font-ui)">
          {isZh ? "路径 A · USB 优先" : "Path A · USB Preempt"}
        </text>
        <text x="482" y="98" fill="var(--text-2)" fontSize="11.5" fontFamily="var(--font-mono)">
          16 kHz PCM · 0ms Hop
        </text>
        <text x="482" y="116" fill="var(--text-3)" fontSize="11" fontFamily="var(--font-ui)">
          {isZh ? "插线即断无线中继" : "Overrides relay"}
        </text>

        <rect
          x="466"
          y="150"
          width="172"
          height="84"
          rx="10"
          fill="var(--surface-2)"
          stroke="var(--accent)"
        />
        <text x="482" y="180" fill="var(--text)" fontSize="13" fontWeight="600" fontFamily="var(--font-ui)">
          {isZh ? "路径 B · 零知识中继" : "Path B · Fly.io Relay"}
        </text>
        <text x="482" y="202" fill="var(--accent)" fontSize="11.5" fontFamily="var(--font-mono)">
          AES-256-GCM · ADPCM
        </text>
        <text x="482" y="220" fill="var(--text-3)" fontSize="11" fontFamily="var(--font-ui)">
          {isZh ? "三段精确离线故障提示" : "3-way offline split"}
        </text>

        <path
          d="M646 140H684M684 140L676 133M684 140L676 147"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <rect
          x="692"
          y="46"
          width="168"
          height="188"
          rx="10"
          fill="var(--surface)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        <text x="708" y="78" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)">
          NODE 24 BRIDGE
        </text>
        <text x="708" y="106" fill="var(--text)" fontSize="15" fontWeight="600" fontFamily="var(--font-display)">
          Claude Code
        </text>
        <text x="708" y="136" fill="var(--text-2)" fontSize="12" fontFamily="var(--font-ui)">
          {isZh ? "• 预热工程进程池" : "• Prewarmed sessions"}
        </text>
        <text x="708" y="160" fill="var(--text-2)" fontSize="12" fontFamily="var(--font-ui)">
          {isZh ? "• 密钥只存本地 env" : "• Keys outside repo"}
        </text>
        <text x="708" y="184" fill="var(--text-2)" fontSize="12" fontFamily="var(--font-ui)">
          {isZh ? "• 语音风险简报回腕" : "• Spoken risk brief"}
        </text>
        <text x="708" y="216" fill="var(--text-3)" fontSize="10.5" fontFamily="var(--font-mono)">
          gate-h · gate-p5 · gate-l
        </text>
      </svg>
      <figcaption>
        {isZh
          ? "硬件实体门控剖面（响应式内联矢量图，尚未添加外部佩戴实拍图）：Walkie 与 On The Beat 安全共存于同一块 M5StickS3（app0/app1），通过物理正/侧垂直键分离批准与拒绝，并以 USB 抢占和 AES-256-GCM 零知识中继连接本地 Claude Code 桥接端。"
          : "Tactile M5StickS3 dual-boot schematic (responsive inline SVG while external wearer photography is pending): Walkie (app1) coexists safely alongside On The Beat (app0) under guard.py, physically splits Approve (Front) from Deny (Side), and routes over USB-first or AES-256-GCM Fly.io relay."}
      </figcaption>
    </figure>
  );
}
