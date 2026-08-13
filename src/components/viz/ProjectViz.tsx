// These SVGs carry real prose, not decoration, so they were the largest
// remaining block of English on the /zh routes. Each takes an optional locale
// and defaults to "en", which keeps every existing call site unchanged.
//
// The type is written out rather than imported from the proof registry: this is
// a presentational component and should not pull that module graph in.
type VizLocale = "en" | "zh";

type VizProps = { locale?: VizLocale };

// Synthesised oblique on Chinese glyphs looks like a rendering fault, so the
// display lines stay upright in zh.
const displayStyle = (locale: VizLocale) => (locale === "zh" ? "normal" : "italic");

export function VizConnect({ locale = "en" }: VizProps) {
  const zh = locale === "zh";
  const rounds = [
    {
      month: zh ? "8月" : "AUG",
      label: zh ? "探索访谈" : "Exploratory interviews",
      total: 33,
      mine: 7,
    },
    {
      month: zh ? "9月" : "SEP",
      label: zh ? "原型出声思考" : "Think-aloud on prototype",
      total: 28,
      mine: 5,
    },
    {
      month: zh ? "11月" : "NOV",
      label: zh ? "MVP 任务链测试" : "Task chain on MVP",
      total: 10,
      mine: 2,
    },
  ];

  return (
    <div className="viz viz-connect">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="paper-c" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="#C9BEA2" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-c)" opacity="0.5" />
        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#8B7355">
          {zh ? "三轮访谈 · 2025 年 8–11 月" : "THREE ROUNDS · AUG–NOV 2025"}
        </text>

        {rounds.map((round, i) => (
          <g key={round.month}>
            <text x={30} y={64 + i * 84} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#A63F2A">
              {round.month}
            </text>
            <text x={70} y={64 + i * 84} fontFamily="var(--font-ui)" fontSize="11" fill="#3A362D">
              {round.label}
            </text>
            {Array.from({ length: round.total }).map((_, n) => (
              <rect
                key={n}
                x={30 + (n % 17) * 13}
                y={76 + i * 84 + Math.floor(n / 17) * 15}
                width="9"
                height="11"
                fill={n < round.mine ? "#C9523A" : "none"}
                stroke={n < round.mine ? "#C9523A" : "#8B7355"}
                strokeWidth="0.8"
              />
            ))}
            <text
              x={490}
              y={86 + i * 84}
              fontFamily="var(--font-mono)"
              fontSize="10"
              textAnchor="end"
              fill="#8A8170"
            >
              {round.mine}/{round.total}
            </text>
          </g>
        ))}

        <line x1="30" y1="228" x2="490" y2="228" stroke="#C9523A" strokeWidth="1" strokeDasharray="3 3" />
        <text x={30} y={242} fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" fill="#C9523A">
          {zh ? "10 月 3 日 · 回到纸面，重画成 5 屏" : "3 OCT · BACK TO PAPER — REDRAWN AS 5 SCREENS"}
        </text>

        <line x1="30" y1="340" x2="490" y2="340" stroke="#8A8170" strokeWidth="0.8" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1={30 + i * 20}
            y1="340"
            x2={30 + i * 20}
            y2={i % 5 === 0 ? 348 : 344}
            stroke="#8A8170"
            strokeWidth="0.6"
          />
        ))}

        <text
          x="30"
          y="372"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="28"
          fill="#3A362D"
        >
          14 / 71
        </text>
        <text x="30" y="390" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8A8170">
          {zh ? "我主持的场次，占团队总数" : "interviews I ran, of the team’s total"}
        </text>
      </svg>
    </div>
  );
}

export function VizSpectra({ locale = "en" }: VizProps) {
  const zh = locale === "zh";

  return (
    <div className="viz viz-spectra">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <text x="30" y="30" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#B5AC99">
          {zh ? "SPECTRA LENS · 取景器" : "SPECTRA LENS · VIEWFINDER"}
        </text>

        <rect x="140" y="60" width="240" height="300" rx="18" stroke="#EFE8DA" strokeWidth="1.2" fill="none" />
        <rect x="190" y="72" width="60" height="5" rx="2.5" fill="#EFE8DA" />

        <defs>
          <clipPath id="spectra-left-half">
            <rect x="150" y="90" width="110" height="220" rx="4" />
          </clipPath>
          <clipPath id="spectra-right-half">
            <rect x="260" y="90" width="110" height="220" rx="4" />
          </clipPath>
        </defs>

        <g clipPath="url(#spectra-left-half)">
          <rect x="150" y="90" width="110" height="220" fill="#3A3A3A" />
          <circle cx="195" cy="150" r="28" fill="#6B6B6B" />
          <circle cx="215" cy="220" r="28" fill="#7A7A7A" />
          <circle cx="195" cy="290" r="28" fill="#888888" />
        </g>
        <g clipPath="url(#spectra-right-half)">
          <rect x="260" y="90" width="110" height="220" fill="#25231D" />
          <circle cx="305" cy="150" r="28" fill="#C9523A" />
          <circle cx="325" cy="220" r="28" fill="#B8873E" />
          <circle cx="305" cy="290" r="28" fill="#5B6B4A" />
          <rect x="275" y="140" width="22" height="18" fill="#F7F4EC" stroke="#25231D" strokeWidth="0.5" />
          <text x="286" y="152" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#25231D">
            {zh ? "停" : "STOP"}
          </text>
          <rect x="345" y="210" width="20" height="18" fill="#F7F4EC" stroke="#25231D" strokeWidth="0.5" />
          <text x="355" y="222" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#25231D">
            {zh ? "等" : "WAIT"}
          </text>
          <rect x="275" y="280" width="20" height="18" fill="#F7F4EC" stroke="#25231D" strokeWidth="0.5" />
          <text x="285" y="292" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#25231D">
            {zh ? "走" : "GO"}
          </text>
        </g>

        <line x1="260" y1="90" x2="260" y2="310" stroke="#EFE8DA" strokeWidth="0.6" strokeDasharray="3 3" />

        <text x="150" y="340" fontFamily="var(--font-mono)" fontSize="9" fill="#8A8170" letterSpacing="1">
          {zh ? "原始" : "RAW"}
        </text>
        <text x="370" y="340" fontFamily="var(--font-mono)" fontSize="9" fill="#8A8170" letterSpacing="1" textAnchor="end">
          {zh ? "辅助后" : "ASSISTED"}
        </text>

        {/* Chinese glyphs carry a taller em box than the Latin line, so the zh
            baseline sits higher to keep the text inside the viewBox. */}
        <text
          x="30"
          y={zh ? 378 : 382}
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="22"
          fill="#EFE8DA"
        >
          {zh ? "回答该怎么办，而不是报出色名" : "answer the decision, not the hue"}
        </text>
      </svg>
    </div>
  );
}


export function VizMaze({ locale = "en" }: VizProps) {
  // One sensor event entering the round state machine, then fanning out to
  // every feedback channel at once — the whole point of the case.
  const zh = locale === "zh";
  const channels = zh
    ? ["分数", "计时", "振动", "灯光", "音效"]
    : ["SCORE", "TIMER", "HAPTIC", "LIGHT", "AUDIO"];

  return (
    <div className="viz viz-maze">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="paper-m" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="#C9BEA2" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-m)" opacity="0.5" />

        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#8B7355">
          {zh ? "一次通过 · 一个事件" : "ONE PASS · ONE EVENT"}
        </text>

        <circle cx="46" cy="120" r="7" fill="#A63F2A" />
        <path d="M 56 120 L 116 120" stroke="#8B7355" strokeWidth="0.8" strokeDasharray="3 3" />

        <line x1="128" y1="88" x2="128" y2="152" stroke="#A63F2A" strokeWidth="1.4" />
        <text x="128" y="80" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#A63F2A">
          IR
        </text>
        <text x="128" y="168" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#8B7355">
          {zh ? "消抖" : "debounce"}
        </text>

        <rect x="176" y="94" width="104" height="52" fill="#F7F4EC" stroke="#25231D" strokeWidth="1" />
        <text x="228" y="116" fontFamily="var(--font-ui)" fontSize="11" textAnchor="middle" fill="#25231D">
          {zh ? "回合状态" : "round state"}
        </text>
        <text x="228" y="132" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle" fill="#756D61">
          {zh ? "推进" : "advance"}
        </text>
        <path d="M 138 120 L 174 120" stroke="#25231D" strokeWidth="1" />

        {channels.map((c, i) => {
          const y = 66 + i * 42;
          return (
            <g key={c}>
              <path
                d={`M 282 120 C 322 120, 322 ${y + 11}, 356 ${y + 11}`}
                stroke="#A63F2A"
                strokeWidth="0.9"
                fill="none"
              />
              <rect x="356" y={y} width="128" height="22" fill="#F7F4EC" stroke="#A63F2A" strokeWidth="0.9" />
              <text x="368" y={y + 15} fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" fill="#3A362D">
                {c}
              </text>
            </g>
          );
        })}

        <rect
          x="176"
          y="196"
          width="104"
          height="34"
          fill="none"
          stroke="#8B7355"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
        <text x="228" y="217" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#756D61">
          WEB SERIAL
        </text>
        <path d="M 228 148 L 228 194" stroke="#8B7355" strokeWidth="0.8" strokeDasharray="2 2" />

        <text
          x="30"
          y="352"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="22"
          fill="#25231D"
        >
          {zh ? "振动比分数先到" : "the buzz lands before the score does"}
        </text>
        <text x="30" y="378" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8B7355">
          {zh ? "arduino mega · 10 个传感器 · 已公开展出" : "arduino mega · 10 sensors · exhibited"}
        </text>
      </svg>
    </div>
  );
}

export function VizVigil({ locale = "en" }: VizProps) {
  // The one fact the whole case turns on: the classifier's confidence spans
  // almost the same range whether it is right or wrong, so a reviewer cannot
  // read the number instead of the message. Drawn as ranges rather than
  // individual dots, because ranges are what the corpus actually validates.
  const zh = locale === "zh";
  const x = (confidence: number) => 60 + ((confidence - 0.55) / 0.45) * 410;
  const ticks = [0.6, 0.7, 0.8, 0.9, 1.0];
  const namedErrors = [
    { confidence: 0.89, label: "em_128" },
    { confidence: 0.91, label: "em_052" },
  ];

  return (
    <div className="viz viz-vigil">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="paper-v" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="#C9BEA2" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-v)" opacity="0.5" />

        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#8B7355">
          {zh ? "置信度 · 分类器落在哪里" : "CONFIDENCE · WHERE THE CLASSIFIER LANDS"}
        </text>

        {/* The overlap is the argument: both bands occupy the same stretch. */}
        <rect x={x(0.61)} y="86" width={x(0.91) - x(0.61)} height="128" fill="#A63F2A" opacity="0.07" />

        <rect
          x={x(0.58)}
          y="98"
          width={x(0.97) - x(0.58)}
          height="26"
          fill="#F7F4EC"
          stroke="#25231D"
          strokeWidth="1"
        />
        <text x={x(0.58) + 10} y="115" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" fill="#3A362D">
          {zh ? "判断对的 123 封" : "123 CALLS IT GOT RIGHT"}
        </text>

        <rect
          x={x(0.61)}
          y="176"
          width={x(0.91) - x(0.61)}
          height="26"
          fill="#F7F4EC"
          stroke="#A63F2A"
          strokeWidth="1.2"
        />
        <text x={x(0.61) + 10} y="193" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" fill="#A63F2A">
          {zh ? "判断错的 17 封" : "17 IT GOT WRONG"}
        </text>

        {namedErrors.map((error) => (
          <g key={error.label}>
            <line
              x1={x(error.confidence)}
              y1="176"
              x2={x(error.confidence)}
              y2="228"
              stroke="#A63F2A"
              strokeWidth="1"
            />
            <circle cx={x(error.confidence)} cy="189" r="3.4" fill="#A63F2A" />
            <text
              x={x(error.confidence)}
              y="242"
              fontFamily="var(--font-mono)"
              fontSize="8"
              textAnchor="middle"
              fill="#A63F2A"
            >
              {error.label}
            </text>
          </g>
        ))}

        <line x1="60" y1="272" x2="470" y2="272" stroke="#8B7355" strokeWidth="0.8" />
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={x(tick)} y1="272" x2={x(tick)} y2="278" stroke="#8B7355" strokeWidth="0.8" />
            <text
              x={x(tick)}
              y="292"
              fontFamily="var(--font-mono)"
              fontSize="9"
              textAnchor="middle"
              fill="#756D61"
            >
              {tick.toFixed(1)}
            </text>
          </g>
        ))}

        <text
          x="30"
          y="336"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="22"
          fill="#25231D"
        >
          {zh ? "这个数字不会告诉你它什么时候错了" : "the number can’t tell you when it’s wrong"}
        </text>
        <text x="30" y="362" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8B7355">
          {zh
            ? "140 封邮件 · 准确率 87.9% · 错误排序 auc 0.72"
            : "140 messages · 87.9% accurate · error-ranking auc 0.72"}
        </text>
        <text x="30" y="380" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8B7355">
          {zh ? "一旦这个数字爬过 0.75，构建就失败" : "the build fails if that number climbs past 0.75"}
        </text>
      </svg>
    </div>
  );
}

export function VizHoop({ locale = "en" }: VizProps) {
  // The case's actual argument: volume only stays coherent because every batch
  // clears the same written gate. Counts transcribed from the project's own
  // stage15 production log.
  const zh = locale === "zh";
  const batches = [
    { label: zh ? "人物立绘" : "PORTRAITS", n: 64 },
    { label: zh ? "场景" : "SCENES", n: 40 },
    { label: zh ? "CG" : "CGS", n: 73 },
    { label: zh ? "UI 图标" : "UI ICONS", n: 72 },
    { label: zh ? "球场" : "COURT", n: 18 },
    { label: zh ? "特效" : "VFX", n: 32 },
  ];
  const scale = (n: number) => (n / 73) * 132;

  return (
    <div className="viz viz-hoop">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="paper-h" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="#C9BEA2" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-h)" opacity="0.5" />

        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#8B7355">
          {zh ? "六个批次 · 一道风格闸门" : "SIX BATCHES · ONE STYLE GATE"}
        </text>

        {batches.map((batch, i) => {
          const y = 62 + i * 26;
          return (
            <g key={batch.label}>
              <text x="30" y={y + 9} fontFamily="var(--font-mono)" fontSize="8.5" fill="#756D61">
                {batch.label}
              </text>
              <rect x="118" y={y} width={scale(batch.n)} height="12" fill="#A63F2A" opacity="0.24" />
              <text
                x={118 + scale(batch.n) + 8}
                y={y + 10}
                fontFamily="var(--font-mono)"
                fontSize="9"
                fill="#3A362D"
              >
                {batch.n}
              </text>
            </g>
          );
        })}

        {/* The gate every batch has to clear. */}
        <line x1="300" y1="52" x2="300" y2="230" stroke="#25231D" strokeWidth="1.2" />
        <text
          x="300"
          y="246"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          textAnchor="middle"
          fill="#25231D"
        >
          {zh ? "风格闸门" : "STYLE GATE"}
        </text>

        <path d="M 306 141 L 386 141" stroke="#25231D" strokeWidth="1" />
        <text x="396" y="132" fontFamily="var(--font-display)" fontSize="40" fill="#25231D">
          299
        </text>
        <text x="396" y="152" fontFamily="var(--font-mono)" fontSize="8.5" fill="#8B7355">
          {zh ? "通过" : "PASSED"}
        </text>

        <text x="30" y="288" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.5" fill="#A63F2A">
          {zh
            ? "拒收：写实 · 3D · 日系动画 · 霓虹 · 随机文字 · 真实商标"
            : "REJECTED: PHOTOREAL · 3D · ANIME · NEON · RANDOM TEXT · REAL MARKS"}
        </text>

        <text
          x="30"
          y="336"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="22"
          fill="#25231D"
        >
          {zh ? "说清楚「不要什么」更管用" : "saying what it is not did more work"}
        </text>
        <text x="30" y="362" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8B7355">
          {zh ? "146 个生涯节点 · 10 章 · 1,975 个测试" : "146 career nodes · 10 chapters · 1,975 tests"}
        </text>
        <text x="30" y="380" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8B7355">
          {zh ? "规则写在产量出现之前" : "the rules were written before the volume existed"}
        </text>
      </svg>
    </div>
  );
}

export function VizPricewise({ locale = "en" }: VizProps) {
  // The case's argument in one image: three gates all say PASS, and five defects
  // walk straight through them, because none of the three asks whether the
  // feature executed. The five are the ones named in the case copy.
  const zh = locale === "zh";
  const gates = [
    { label: zh ? "构建" : "BUILD", x: 150 },
    { label: zh ? "类型" : "TYPES", x: 232 },
    { label: zh ? "测试" : "TESTS", x: 314 },
  ];
  const defects = [
    zh ? "语意搜索没用过向量" : "search never used a vector",
    zh ? "模板建的清单是空的" : "template lists came out empty",
    zh ? "鉴权比对 Bearer undefined" : "auth compared 'Bearer undefined'",
    zh ? "六张表从没建过" : "six tables were never created",
    zh ? "向量撑爆返回体积" : "a vector bloated the response",
  ];

  return (
    <div className="viz viz-pricewise">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="paper-p" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="#C9BEA2" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-p)" opacity="0.5" />

        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#8B7355">
          {zh ? "三道关卡 · 全部通过" : "THREE GATES · ALL GREEN"}
        </text>

        {/* The three gates, drawn as openings rather than barriers. */}
        {gates.map((gate) => (
          <g key={gate.label}>
            <line x1={gate.x} y1="52" x2={gate.x} y2="228" stroke="#25231D" strokeWidth="1.2" />
            <text
              x={gate.x}
              y="244"
              fontFamily="var(--font-mono)"
              fontSize="8.5"
              textAnchor="middle"
              fill="#25231D"
            >
              {gate.label}
            </text>
          </g>
        ))}

        {/* Five defects passing through every gate untouched. */}
        {defects.map((defect, i) => {
          const y = 70 + i * 31;
          return (
            <g key={defect}>
              <text x="30" y={y + 4} fontFamily="var(--font-mono)" fontSize="8" fill="#756D61">
                {String(i + 1).padStart(2, "0")}
              </text>
              <line x1="52" y1={y} x2="404" y2={y} stroke="#A63F2A" strokeWidth="1" opacity="0.55" />
              <path d={`M 404 ${y} l -6 -3 l 0 6 z`} fill="#A63F2A" opacity="0.55" />
              <text x="52" y={y - 6} fontFamily="var(--font-mono)" fontSize="8" fill="#A63F2A">
                {defect}
              </text>
            </g>
          );
        })}

        <text x="412" y="152" fontFamily="var(--font-display)" fontSize="40" fill="#25231D">
          5
        </text>
        <text x="412" y="172" fontFamily="var(--font-mono)" fontSize="8.5" fill="#8B7355">
          {zh ? "全过" : "GOT THROUGH"}
        </text>

        <text x="30" y="288" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.5" fill="#A63F2A">
          {zh
            ? "查出它们靠的是：打真实接口 · 读返回内容 · 直接查数据库"
            : "FOUND BY: CALLING THE REAL ENDPOINT · READING THE RESPONSE · QUERYING THE DB"}
        </text>

        <text
          x="30"
          y="336"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="22"
          fill="#25231D"
        >
          {zh ? "渲染出来了，不等于跑起来了" : "renders correctly is not runs correctly"}
        </text>
        <text x="30" y="362" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8B7355">
          {zh ? "109 条 API 路由 · 36 条页面路由 · 311 个测试" : "109 API routes · 36 page routes · 311 tests"}
        </text>
        <text x="30" y="380" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8B7355">
          {zh ? "没有一道关卡在问「它有没有真的执行」" : "no gate was asking whether the feature executed"}
        </text>
      </svg>
    </div>
  );
}

export function VizGapmapper({ locale = "en" }: VizProps) {
  // The core structure of the case: two columns of evidence that are never
  // merged, and the distance between them read as a reason to investigate
  // rather than as proof of danger.
  const zh = locale === "zh";
  const objective = zh
    ? ["照明", "公交可达", "事件背景", "视野", "还开着的店", "街道状况"]
    : ["LIGHTING", "TRANSIT", "INCIDENTS", "SIGHTLINES", "OPEN SHOPS", "STREET"];
  const perceived = zh
    ? ["绕开一侧走", "找还开着的店", "确认求助够近", "说不上来的不安"]
    : ["CROSSED OVER", "SOUGHT AN OPEN SHOP", "CHECKED HELP WAS NEAR", "UNEASE WITH NO CAUSE"];

  return (
    <div className="viz viz-gapmapper">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="paper-g" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="#C9BEA2" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-g)" opacity="0.5" />

        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#8B7355">
          {zh ? "两类证据 · 并排 · 不合并" : "TWO KINDS OF EVIDENCE · SIDE BY SIDE · NEVER MERGED"}
        </text>

        <text x="30" y="62" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1" fill="#25231D">
          {zh ? "客观指标" : "OBJECTIVE"}
        </text>
        {objective.map((item, i) => (
          <g key={item}>
            <rect x="30" y={74 + i * 22} width="152" height="14" fill="#25231D" opacity="0.1" />
            <text x="38" y={84 + i * 22} fontFamily="var(--font-mono)" fontSize="8" fill="#3A362D">
              {item}
            </text>
          </g>
        ))}

        <text x="338" y="62" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1" fill="#A63F2A">
          {zh ? "感知信号" : "PERCEIVED"}
        </text>
        {perceived.map((item, i) => (
          <g key={item}>
            <rect x="338" y={74 + i * 22} width="152" height="14" fill="#A63F2A" opacity="0.16" />
            <text x="346" y={84 + i * 22} fontFamily="var(--font-mono)" fontSize="8" fill="#3A362D">
              {item}
            </text>
          </g>
        ))}

        {/* The gap itself. Nothing bridges it — that is the whole point. */}
        <line x1="206" y1="74" x2="206" y2="206" stroke="#25231D" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="314" y1="74" x2="314" y2="206" stroke="#A63F2A" strokeWidth="1" strokeDasharray="2 4" />
        <text
          x="260"
          y="136"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="19"
          textAnchor="middle"
          fill="#25231D"
        >
          {zh ? "落差" : "the gap"}
        </text>
        <text x="260" y="158" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#8B7355">
          {zh ? "去查一查的理由" : "A REASON TO LOOK"}
        </text>
        <text x="260" y="172" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#8B7355">
          {zh ? "不是危险的证明" : "NOT PROOF OF DANGER"}
        </text>

        <text x="30" y="248" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.5" fill="#A63F2A">
          {zh
            ? "写进系统要求：匿名上报 · 位置取整到街段 · 显示信心与偏差 · 不出安全分数"
            : "AS REQUIREMENTS: ANONYMOUS · ROUNDED TO A STREET SEGMENT · CONFIDENCE SHOWN · NO SAFETY SCORE"}
        </text>

        <text
          x="30"
          y="300"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="22"
          fill="#25231D"
        >
          {zh ? "一合并，不确定性就消失了" : "merge them and the uncertainty disappears"}
        </text>
        <text x="30" y="330" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8B7355">
          {zh
            ? "18 个访谈 · 6 人完成 · 我做第 10、11、12 个"
            : "18 interviews · six completed · numbers 10, 11 and 12 are mine"}
        </text>
        <text x="30" y="350" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8B7355">
          {zh ? "六个完成的访谈撑不起任何一个分数" : "six completed interviews cannot support any score"}
        </text>
        <text x="30" y="378" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#A63F2A">
          {zh
            ? "我建了那个路线原型，然后主张放弃它"
            : "I built the route prototype, then argued for abandoning it"}
        </text>
      </svg>
    </div>
  );
}

export function VizRules({ locale = "en" }: VizProps) {
  // One move, drawn twice: a sentence everybody agrees with on the left,
  // the checkable numbers it was forced into on the right.
  const zh = locale === "zh";
  const rows = [
    {
      soft: zh ? "「提前警告」" : "'warn in time'",
      hard: zh ? "150–250 m，走音频与触觉" : "150–250 m, audio and haptic",
    },
    {
      soft: zh ? "「骑车时也点得到」" : "'usable while riding'",
      hard: zh ? "点击区不小于 48px" : "tap targets at least 48 px",
    },
    {
      soft: zh ? "「走更安全的路」" : "'take a safer route'",
      hard: zh ? "分隔路段加权，油漆车道降权" : "separated up, paint-only down",
    },
    {
      soft: zh ? "「追踪断之前提示」" : "'warn before tracking breaks'",
      hard: zh ? "三条触发条件，各配文案" : "three triggers, one template each",
    },
  ];

  return (
    <div className="viz viz-rules">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="paper-r" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="#C9BEA2" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-r)" opacity="0.5" />

        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#8B7355">
          {zh ? "谁都同意的一句话 → 能被反驳的一条规则" : "A SENTENCE ANYONE AGREES WITH → A RULE ANYONE CAN REFUTE"}
        </text>

        <text x="30" y="62" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1" fill="#8B7355">
          {zh ? "软要求" : "SOFT"}
        </text>
        <text x="266" y="62" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1" fill="#A63F2A">
          {zh ? "能施工、也能被指着说不对" : "BUILDABLE, AND ARGUABLE"}
        </text>

        {rows.map((row, i) => {
          const y = 92 + i * 40;
          return (
            <g key={row.soft}>
              <text x="30" y={y} fontFamily="var(--font-mono)" fontSize="8.5" fill="#756D61">
                {row.soft}
              </text>
              <line x1="212" y1={y - 4} x2="256" y2={y - 4} stroke="#25231D" strokeWidth="1" />
              <path d={`M 256 ${y - 4} l -6 -3 l 0 6 z`} fill="#25231D" />
              <text x="266" y={y} fontFamily="var(--font-mono)" fontSize="8.5" fill="#3A362D">
                {row.hard}
              </text>
              <line x1="30" y1={y + 14} x2="490" y2={y + 14} stroke="#C9BEA2" strokeWidth="0.5" />
            </g>
          );
        })}

        <text x="30" y="278" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.5" fill="#A63F2A">
          {zh
            ? "按钮写「See safer routes」——比较级，因为没有数据支撑「最安全」"
            : "THE BUTTON READS 'SEE SAFER ROUTES' — COMPARATIVE, BECAUSE NO DATA SUPPORTS 'SAFEST'"}
        </text>

        <text
          x="30"
          y="326"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="22"
          fill="#25231D"
        >
          {zh ? "能被反驳，是它有用的前提" : "being refutable is what makes it useful"}
        </text>
        <text x="30" y="354" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8B7355">
          {zh ? "两份作业 · 同一个动作 · 均已提交并评分" : "two briefs · one move · both submitted and marked"}
        </text>
        <text x="30" y="376" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8B7355">
          {zh ? "指南里的效果数字出自所引论文，不是我的实验" : "the guide's effect figures are the cited paper's, not mine"}
        </text>
      </svg>
    </div>
  );
}
