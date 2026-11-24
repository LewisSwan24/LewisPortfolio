import type { CaseWireframeId } from "@/lib/cases/schema";

export function ProcessWireframe({
  id,
  locale,
}: {
  id: CaseWireframeId;
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";

  if (id === "connect-ia") {
    return (
      <svg
        viewBox="0 0 800 500"
        className="proc-wf-svg"
        role="img"
        aria-label={isZh ? "十月纸面信息架构线框草图" : "October paper IA wireframe"}
      >
        <rect width="800" height="500" fill="var(--bg)" />
        <g stroke="var(--border-strong)" strokeWidth="2" fill="var(--surface)">
          <rect x="44" y="42" width="210" height="416" rx="12" strokeDasharray="6 4" />
          <rect x="295" y="42" width="210" height="416" rx="12" />
          <rect x="546" y="42" width="210" height="416" rx="12" />
        </g>
        <g fill="var(--text)" fontFamily="var(--font-mono)" fontSize="14">
          <text x="64" y="76">{isZh ? "旧结构 · 无返回栏" : "LEGACY · NO BACK BAR"}</text>
          <text x="315" y="76">{isZh ? "重画首页地图" : "REDRAWN HOME MAP"}</text>
          <text x="566" y="76">{isZh ? "明确状态卡片" : "EXPLICIT MATCH CARD"}</text>
        </g>
        <g stroke="var(--accent)" strokeWidth="2" fill="none">
          <line x1="254" y1="180" x2="295" y2="180" />
          <line x1="505" y1="220" x2="546" y2="220" />
          <rect x="64" y="110" width="170" height="54" rx="6" strokeDasharray="4 3" />
          <rect x="315" y="110" width="170" height="90" rx="6" />
          <rect x="566" y="110" width="170" height="120" rx="6" />
        </g>
        <g fill="var(--text-2)" fontFamily="var(--font-ui)" fontSize="13">
          <text x="78" y="142">{isZh ? "重复点报名？" : "Tap Register twice?"}</text>
          <text x="78" y="216">{isZh ? "卡死在深层 Tab" : "Trapped in nested tab"}</text>
          <text x="330" y="150">{isZh ? "5 屏单层路由" : "5-screen flat map"}</text>
          <text x="330" y="176">{isZh ? "显性 ← 返回路径" : "Explicit ← Back"}</text>
          <text x="580" y="150">{isZh ? "写明契合依据" : "Show match reason"}</text>
          <text x="580" y="176">{isZh ? "课程 · 图书馆 · 人数" : "Course · Library · Cap"}</text>
        </g>
      </svg>
    );
  }

  if (id === "pricewise-match") {
    return (
      <svg
        viewBox="0 0 800 500"
        className="proc-wf-svg"
        role="img"
        aria-label={isZh ? "未加校验前的旧比价草图" : "Pre-validation matching schematic"}
      >
        <rect width="800" height="500" fill="var(--bg)" />
        <rect x="48" y="42" width="704" height="416" rx="12" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 4" />
        <text x="76" y="88" fill="var(--text)" fontFamily="var(--font-mono)" fontSize="15">
          {isZh ? "旧状态：静默退回关键字匹配（无置信度提示）" : "BEFORE: SILENT FALLBACK WITHOUT CONFIDENCE STATE"}
        </text>
        <g stroke="var(--border)" fill="var(--bg-alt)">
          <rect x="76" y="120" width="648" height="78" rx="8" />
          <rect x="76" y="218" width="648" height="78" rx="8" />
          <rect x="76" y="316" width="648" height="78" rx="8" />
        </g>
        <g fill="var(--text)" fontFamily="var(--font-mono)" fontSize="14">
          <text x="98" y="154">MLK FC 2L  →  {isZh ? "直接标绿：最便宜 $3.10" : "Auto-marked green: $3.10"}</text>
          <text x="98" y="252">BREAD WHT  →  {isZh ? "静默错配：全麦面包 $4.50" : "Silent mismatch: Rye loaf $4.50"}</text>
          <text x="98" y="350">CHKN BRST  →  {isZh ? "未标注单位（按克还是按盒？）" : "Missing unit check (kg vs pack)"}</text>
        </g>
        <g fill="var(--accent)" fontFamily="var(--font-ui)" fontSize="13">
          <text x="98" y="180">{isZh ? "隐患：底层向量失败却向用户展示确定结果" : "Risk: UI looks confident even when semantic search failed"}</text>
          <text x="98" y="278">{isZh ? "隐患：缺「未匹配 / 存疑」明确退避态" : "Risk: Missing explicit 'Unmatched' fallback state"}</text>
        </g>
      </svg>
    );
  }

  if (id === "hoop-style") {
    return (
      <svg
        viewBox="0 0 800 500"
        className="proc-wf-svg"
        role="img"
        aria-label={isZh ? "早期无规范约束的风格漂移示意图" : "Early unguided generated asset collage"}
      >
        <rect width="800" height="500" fill="var(--bg)" />
        <rect x="44" y="38" width="712" height="424" rx="12" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 4" />
        <text x="72" y="82" fill="var(--text)" fontFamily="var(--font-mono)" fontSize="15">
          {isZh ? "早期反例：无美术圣经与禁用词清单前的风格漂移" : "BEFORE: STYLE DRIFT WITHOUT WRITTEN ART BIBLES"}
        </text>
        <g stroke="var(--accent)" strokeWidth="2" fill="var(--bg-alt)">
          <rect x="72" y="114" width="200" height="290" rx="8" strokeDasharray="3 3" />
          <rect x="300" y="114" width="200" height="290" rx="8" strokeDasharray="8 4" />
          <rect x="528" y="114" width="200" height="290" rx="8" strokeDasharray="2 5" />
        </g>
        <circle cx="172" cy="215" r="46" fill="none" stroke="var(--text-3)" strokeWidth="5" />
        <polygon points="400,165 450,260 350,260" fill="none" stroke="var(--accent)" strokeWidth="2" />
        <rect x="582" y="170" width="92" height="92" rx="20" fill="none" stroke="var(--text)" strokeWidth="1.5" />
        <g fill="var(--text-2)" fontFamily="var(--font-ui)" fontSize="13" textAnchor="middle">
          <text x="172" y="305">{isZh ? "日系动画风" : "Anime style"}</text>
          <text x="172" y="330">{isZh ? "违背羊皮纸色板" : "Breaks paper palette"}</text>
          <text x="400" y="305">{isZh ? "塑料 3D 渲染质感" : "Glossy 3D plastic"}</text>
          <text x="400" y="330">{isZh ? "缺少禁用词约束" : "No negative prompts"}</text>
          <text x="628" y="305">{isZh ? "比例失衡与噪点" : "Inconsistent lineweight"}</text>
          <text x="628" y="330">{isZh ? "未并排人工走查" : "Skipped side-by-side QA"}</text>
        </g>
      </svg>
    );
  }

  if (id === "walkie-voice") {
    return (
      <svg
        viewBox="0 0 800 500"
        className="proc-wf-svg"
        role="img"
        aria-label={isZh ? "改造前：无实体门控的纯语音审批风险图" : "Before: hands-free voice approval risk wireframe"}
      >
        <rect width="800" height="500" fill="var(--bg)" />
        <rect x="44" y="38" width="712" height="424" rx="12" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 4" />
        <text x="72" y="82" fill="var(--text)" fontFamily="var(--font-mono)" fontSize="15">
          {isZh ? "改造前：语音直接授权执行（环境声与误识别无边界）" : "BEFORE: HANDS-FREE VOICE APPROVAL WITHOUT HARDWARE GATE"}
        </text>
        <g stroke="var(--accent)" strokeWidth="2" fill="var(--bg-alt)">
          <rect x="72" y="122" width="200" height="170" rx="8" strokeDasharray="4 3" />
          <rect x="300" y="122" width="200" height="170" rx="8" strokeDasharray="4 3" />
          <rect x="528" y="122" width="200" height="170" rx="8" />
        </g>
        <g fill="var(--text-2)" fontFamily="var(--font-ui)" fontSize="13">
          <text x="90" y="160">{isZh ? "环境杂音误触发" : "Ambient speech bleed"}</text>
          <text x="90" y="192">STT: &quot;Yes, run it&quot;</text>
          <text x="318" y="160">{isZh ? "无实体按键确认" : "Zero tactile barrier"}</text>
          <text x="318" y="192">{isZh ? "立即下发破坏性指令" : "Unchecked rm -rf runs"}</text>
          <text x="546" y="160" fill="var(--accent)">{isZh ? "离线报错含糊" : "Generic 'Offline'"}</text>
          <text x="546" y="192">{isZh ? "分不清 Wi-Fi 还是 PC 断" : "Wi-Fi vs Relay vs PC unclear"}</text>
        </g>
        <rect x="72" y="330" width="656" height="90" rx="8" fill="var(--bg-alt)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="96" y="380" fill="var(--text)" fontFamily="var(--font-ui)" fontSize="14">
          {isZh ? "代价：人离开桌面却不敢真正走开，必须一直紧盯终端以防误批准。" : "Cost: You stay paranoid beside the screen because speech alone lacks deliberate commitment."}
        </text>
      </svg>
    );
  }

  if (id === "autofill-guess") {
    return (
      <svg
        viewBox="0 0 800 500"
        className="proc-wf-svg"
        role="img"
        aria-label={isZh ? "改造前：100% 全自动猜测填表风险" : "Before: unconstrained LLM auto-fill wireframe"}
      >
        <rect width="800" height="500" fill="var(--bg)" />
        <rect x="44" y="38" width="712" height="424" rx="12" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 4" />
        <text x="72" y="82" fill="var(--text)" fontFamily="var(--font-mono)" fontSize="15">
          {isZh ? "改造前：追求 100% 自动填表率，对签证与合规题静默猜答" : "BEFORE: 100% AUTO-FILL OPTIMIZATION HIDING RISK"}
        </text>
        <g stroke="var(--border)" fill="var(--bg-alt)">
          <rect x="72" y="120" width="656" height="72" rx="8" />
          <rect x="72" y="210" width="656" height="72" rx="8" stroke="var(--accent)" />
          <rect x="72" y="300" width="656" height="72" rx="8" stroke="var(--accent)" />
        </g>
        <g fill="var(--text)" fontFamily="var(--font-mono)" fontSize="13.5">
          <text x="94" y="162">Full Name → &quot;Lewis Dong&quot; (OK)</text>
          <text x="94" y="252" fill="var(--accent)">Visa Sponsorship Needed? → LLM Guessed: &quot;No&quot; (Silent Hallucination)</text>
          <text x="94" y="342" fill="var(--accent)">Expected Salary &amp; Auto-Submit → Submitted without review</text>
        </g>
        <text x="72" y="420" fill="var(--text-2)" fontFamily="var(--font-ui)" fontSize="13.5">
          {isZh ? "失衡后果：扩展抢走了「真省事」的名声，求职者却承担 100% 误填合规题的拒信代价。" : "Asymmetric risk: Extension takes convenience credit while applicant pays 100% of legal/offer error."}
        </text>
      </svg>
    );
  }

  if (id === "maze-solo") {
    return (
      <svg
        viewBox="0 0 800 500"
        className="proc-wf-svg"
        role="img"
        aria-label={isZh ? "改造前：孤立单人控制与未隔离电击/舵机方案" : "Before: solo tapping & unbuffered maze loops"}
      >
        <rect width="800" height="500" fill="var(--bg)" />
        <rect x="44" y="38" width="712" height="424" rx="12" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 4" />
        <text x="72" y="82" fill="var(--text)" fontFamily="var(--font-mono)" fontSize="15">
          {isZh ? "初版失败模式：孤立控制、高风险电击与红外误重算" : "BEFORE: ISOLATED HARDWARE LOOPS & RAW IR BOUNCE"}
        </text>
        <g stroke="var(--border-strong)" fill="var(--bg-alt)">
          <rect x="72" y="122" width="204" height="240" rx="8" />
          <rect x="298" y="122" width="204" height="240" rx="8" />
          <rect x="524" y="122" width="204" height="240" rx="8" />
        </g>
        <g fill="var(--text-2)" fontFamily="var(--font-ui)" fontSize="13">
          <text x="90" y="160" fill="var(--accent)">{isZh ? "单手即可触发方向" : "Solo taps unlock axis"}</text>
          <text x="90" y="192">{isZh ? "四人站在一块仍各自看屏" : "No physical mutual consent"}</text>
          <text x="316" y="160" fill="var(--accent)">{isZh ? "原定轻微电击惩罚" : "Original shock trap"}</text>
          <text x="316" y="192">{isZh ? "展场无法逐人签署风险" : "Unsafe without supervision"}</text>
          <text x="542" y="160" fill="var(--accent)">{isZh ? "未去抖红外双次计分" : "Unbuffered IR double-fire"}</text>
          <text x="542" y="192">{isZh ? "震动与计分牌对不上" : "Score disagrees with haptics"}</text>
        </g>
        <text x="72" y="416" fill="var(--text)" fontFamily="var(--font-ui)" fontSize="13.5">
          {isZh ? "问题：硬件时序不对齐时，玩家会立刻怀疑系统是坏的。" : "Failure mode: When timing drifts across displays and fingers, players stop trusting the rules."}
        </text>
      </svg>
    );
  }

  if (id === "onthebeat-radar") {
    return (
      <svg
        viewBox="0 0 800 500"
        className="proc-wf-svg"
        role="img"
        aria-label={isZh ? "改造前：演出人群中强拉近距离与全屏雷达打扰" : "Before: intrusive live concert proximity radar wireframe"}
      >
        <rect width="800" height="500" fill="var(--bg)" />
        <rect x="44" y="38" width="712" height="424" rx="12" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 4" />
        <text x="72" y="82" fill="var(--text)" fontFamily="var(--font-mono)" fontSize="15">
          {isZh ? "改造前：亮屏身份雷达 + 同频强制亮灯提示" : "BEFORE: SURVEILLANCE PROXIMITY RADAR AT A LIVE GIG"}
        </text>
        <circle cx="240" cy="255" r="110" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 4" />
        <circle cx="240" cy="255" r="60" fill="none" stroke="var(--border-strong)" strokeWidth="1.5" />
        <text x="240" y="260" textAnchor="middle" fill="var(--text)" fontFamily="var(--font-mono)" fontSize="13">EXACT GPS / ID</text>
        <g fill="var(--text-2)" fontFamily="var(--font-ui)" fontSize="13.5">
          <text x="400" y="165" fill="var(--accent)">{isZh ? "问题 1：暴露实时头像与距离定位，人群中社死" : "1. Leaks identity & distance before consent"}</text>
          <text x="400" y="215">{isZh ? "问题 2：要求现场低头点按三屏表单配对" : "2. Forces bright mobile screens in dark crowd"}</text>
          <text x="400" y="265">{isZh ? "问题 3：相遇后还持续弹窗抢走演出注意力" : "3. Keeps pinging instead of receding after meet"}</text>
        </g>
      </svg>
    );
  }

  if (id === "grassland-auto") {
    return (
      <svg
        viewBox="0 0 800 500"
        className="proc-wf-svg"
        role="img"
        aria-label={isZh ? "改造前：关卡特设按钮与自动代打策略破坏公平" : "Before: level-specific macro shortcuts violating RTS rules"}
      >
        <rect width="800" height="500" fill="var(--bg)" />
        <rect x="44" y="38" width="712" height="424" rx="12" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 4" />
        <text x="72" y="82" fill="var(--text)" fontFamily="var(--font-mono)" fontSize="15">
          {isZh ? "改造前：靠「自动寻路宏 / 关卡专用按钮」硬凑通关" : "BEFORE: LEVEL-SPECIFIC SHORTCUTS & AUTO-KITE MACROS"}
        </text>
        <g stroke="var(--border-strong)" fill="var(--bg-alt)">
          <rect x="72" y="130" width="300" height="100" rx="8" />
          <rect x="428" y="130" width="300" height="100" rx="8" stroke="var(--accent)" />
          <rect x="72" y="260" width="656" height="120" rx="8" />
        </g>
        <g fill="var(--text-2)" fontFamily="var(--font-mono)" fontSize="13">
          <text x="94" y="175">[Mission 3 Only] Auto-Dodge Rain Key</text>
          <text x="450" y="175" fill="var(--accent)">[Mission 5] Auto-Play AI Commander</text>
          <text x="94" y="310">{isZh ? "失效原因：玩家学到的不是全局语法，而是每一关背一套外挂快捷按钮。" : "Failure: Players never trust transferable tactics when hidden auto-pilots change each stage."}</text>
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 800 500"
      className="proc-wf-svg"
      role="img"
      aria-label={isZh ? "旧版纯文本长日志视图" : "Raw scrolling terminal log view"}
    >
      <rect width="800" height="500" fill="var(--bg)" />
      <rect x="44" y="38" width="712" height="424" rx="12" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 4" />
      <text x="72" y="82" fill="var(--text)" fontFamily="var(--font-mono)" fontSize="15">
        {isZh ? "改造前：纯文本 Agent 滚动日志（看不出谁在等确认）" : "BEFORE: UNREADABLE RAW AGENT LOG STREAM"}
      </text>
      <g fill="var(--text-2)" fontFamily="var(--font-mono)" fontSize="13">
        <text x="72" y="130">[21:04:01] subagent_02: reading docs/outline.md (ok)</text>
        <text x="72" y="164">[21:04:19] tool_call: grep_search(&quot;tokens&quot;) -&gt; 14 hits</text>
        <text x="72" y="198">[21:04:44] tool_call: draft summary.md in temp</text>
        <text x="72" y="232" fill="var(--accent)">[21:05:02] WARN: waiting on write_file(&quot;config.json&quot;) [y/N]</text>
        <text x="72" y="266">[21:05:03] stdout: buffered 128 lines... (buried above)</text>
        <text x="72" y="300">[21:06:11] heartbeat: idle waiting for stdin...</text>
      </g>
      <rect x="72" y="338" width="656" height="84" rx="8" fill="var(--bg-alt)" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="94" y="374" fill="var(--text)" fontFamily="var(--font-ui)" fontSize="14">
        {isZh ? "问题：用户分不清任务推到哪一步、哪个角色卡住了，也不知道风险是否可逆。" : "Friction: Progress, stalled owner, and risk reversibility are buried in raw stdout."}
      </text>
    </svg>
  );
}
