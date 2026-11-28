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
// Lively Icons rules: no italics, in either locale.
const displayStyle = (_locale: VizLocale) => "normal";

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
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="var(--viz-rule)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-c)" opacity="0.5" />
        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="var(--viz-muted)">
          {zh ? "三轮研究与测试 · 2025 年 8–11 月" : "THREE ROUNDS · AUG–NOV 2025"}
        </text>

        {rounds.map((round, i) => (
          <g key={round.month}>
            <text x={30} y={64 + i * 84} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--viz-focus)">
              {round.month}
            </text>
            <text x={70} y={64 + i * 84} fontFamily="var(--font-ui)" fontSize="11" fill="var(--viz-ink)">
              {round.label}
            </text>
            {Array.from({ length: round.total }).map((_, n) => (
              <rect
                key={n}
                x={30 + (n % 17) * 13}
                y={76 + i * 84 + Math.floor(n / 17) * 15}
                width="9"
                height="11"
                fill={n < round.mine ? "var(--viz-focus)" : "none"}
                stroke={n < round.mine ? "var(--viz-focus)" : "var(--viz-muted)"}
                strokeWidth="0.8"
              />
            ))}
            <text
              x={490}
              y={86 + i * 84}
              fontFamily="var(--font-mono)"
              fontSize="10"
              textAnchor="end"
              fill="var(--viz-muted)"
            >
              {round.mine}/{round.total}
            </text>
          </g>
        ))}

        <line x1="30" y1="228" x2="490" y2="228" stroke="var(--viz-focus)" strokeWidth="1" strokeDasharray="3 3" />
        <text x={30} y={242} fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" fill="var(--viz-focus)">
          {zh ? "10 月 3 日 · 回到纸面，重画成 5 屏" : "3 OCT · BACK TO PAPER — REDRAWN AS 5 SCREENS"}
        </text>

        <line x1="30" y1="340" x2="490" y2="340" stroke="var(--viz-muted)" strokeWidth="0.8" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1={30 + i * 20}
            y1="340"
            x2={30 + i * 20}
            y2={i % 5 === 0 ? 348 : 344}
            stroke="var(--viz-muted)"
            strokeWidth="0.6"
          />
        ))}

        <text
          x="30"
          y="372"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="28"
          fill="var(--viz-ink)"
        >
          14 / 71
        </text>
        <text x="30" y="390" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--viz-muted)">
          {zh ? "我主持的场次 / 团队总数" : "sessions I ran, of the team’s total"}
        </text>
      </svg>
    </div>
  );
}

export function VizSpectra({ locale = "en" }: VizProps) {
  const zh = locale === "zh";
  // The extension rewrites type and spacing on a page the reader does not
  // control, so the picture is one paragraph twice: as the author set it, and
  // after the reader turns on the dyslexia mode. Bars stand in for text on
  // purpose; no invented sentence, no numbers.
  const rawBars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const rawWidth = [190, 200, 176, 198, 192, 150, 200, 164, 196, 182, 200, 172, 120];
  const setBars = [0, 1, 2, 3, 4, 5];
  const setWidth = [178, 190, 168, 186, 176, 124];
  const controls = zh ? ["行高", "字距", "词距", "段距"] : ["LINE", "LETTER", "WORD", "PARA"];

  return (
    <div className="viz viz-spectra">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <text x="30" y="30" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2" fill="var(--viz-rule)">
          {zh ? "SPECTRA LENS · 浏览器扩展" : "SPECTRA LENS · BROWSER EXTENSION"}
        </text>

        <rect x="30" y="56" width="215" height="226" rx="6" stroke="var(--viz-paper)" strokeWidth="1.2" fill="none" />
        <rect x="275" y="56" width="215" height="226" rx="6" stroke="var(--viz-paper)" strokeWidth="1.2" fill="none" />

        {rawBars.map((i) => (
          <rect key={`r${i}`} x="42" y={72 + i * 14} width={rawWidth[i] - 18} height="5" rx="2.5" fill="var(--viz-muted)" />
        ))}
        {setBars.map((i) => (
          <rect key={`s${i}`} x="287" y={74 + i * 38} width={setWidth[i] - 18} height="6" rx="3" fill="var(--viz-paper)" />
        ))}

        <text x="30" y="306" fontFamily="var(--font-mono)" fontSize="11" fill="var(--viz-muted)" letterSpacing="1">
          {zh ? "作者写死的" : "AS THE AUTHOR SET IT"}
        </text>
        <text x="490" y="306" fontFamily="var(--font-mono)" fontSize="11" fill="var(--viz-muted)" letterSpacing="1" textAnchor="end">
          {zh ? "读者调整后" : "AS THE READER SETS IT"}
        </text>

        {controls.map((label, i) => (
          <g key={label}>
            {/* v7.0 R29: plain labels; pill outlines read as buttons in a picture. */}
            <line x1={30 + i * 118 + 22} y1="348" x2={30 + i * 118 + 82} y2="348" stroke="var(--viz-paper)" strokeWidth="1" />
            <text
              x={30 + i * 118 + 52}
              y="341"
              fontFamily="var(--font-mono)"
              fontSize="11"
              letterSpacing="1"
              textAnchor="middle"
              fill="var(--viz-paper)"
            >
              {label}
            </text>
          </g>
        ))}

        <text
          x="30"
          y={zh ? 384 : 388}
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="20"
          fill="var(--viz-paper)"
        >
          {zh ? "字体和行距，由读者自己改" : "the reader, not the page, sets the type"}
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
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="var(--viz-rule)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-m)" opacity="0.5" />

        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="var(--viz-muted)">
          {zh ? "一次通过 · 一个事件" : "ONE PASS · ONE EVENT"}
        </text>

        <circle cx="46" cy="120" r="7" fill="var(--viz-focus)" />
        <path d="M 56 120 L 116 120" stroke="var(--viz-muted)" strokeWidth="0.8" strokeDasharray="3 3" />

        <line x1="128" y1="88" x2="128" y2="152" stroke="var(--viz-focus)" strokeWidth="1.4" />
        <text x="128" y="80" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="var(--viz-focus)">
          IR
        </text>
        <text x="128" y="168" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="var(--viz-muted)">
          {zh ? "消抖" : "debounce"}
        </text>

        <rect x="176" y="94" width="104" height="52" fill="var(--viz-surface)" stroke="var(--viz-ink)" strokeWidth="1" />
        <text x="228" y="116" fontFamily="var(--font-ui)" fontSize="11" textAnchor="middle" fill="var(--viz-ink)">
          {zh ? "回合状态" : "round state"}
        </text>
        <text x="228" y="132" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle" fill="var(--viz-muted)">
          {zh ? "推进" : "advance"}
        </text>
        <path d="M 138 120 L 174 120" stroke="var(--viz-ink)" strokeWidth="1" />

        {channels.map((c, i) => {
          const y = 66 + i * 42;
          return (
            <g key={c}>
              <path
                d={`M 282 120 C 322 120, 322 ${y + 11}, 356 ${y + 11}`}
                stroke="var(--viz-focus)"
                strokeWidth="0.9"
                fill="none"
              />
              <rect x="356" y={y} width="128" height="22" fill="var(--viz-surface)" stroke="var(--viz-focus)" strokeWidth="0.9" />
              <text x="368" y={y + 15} fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" fill="var(--viz-ink)">
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
          stroke="var(--viz-muted)"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
        <text x="228" y="217" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="var(--viz-muted)">
          WEB SERIAL
        </text>
        <path d="M 228 148 L 228 194" stroke="var(--viz-muted)" strokeWidth="0.8" strokeDasharray="2 2" />

        <text
          x="30"
          y="352"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="22"
          fill="var(--viz-ink)"
        >
          {zh ? "振动比分数先到" : "the buzz lands before the score does"}
        </text>
        <text x="30" y="378" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--viz-muted)">
          {zh ? "arduino mega · 10 个传感器 · 已公开展出" : "arduino mega · 10 sensors · exhibited"}
        </text>
      </svg>
    </div>
  );
}

export function VizHoop({ locale = "en" }: VizProps) {
  // What the repo supports: six batches logged into one registry, rules written
  // before them, and one automated check that reads the registry, never the
  // style. Counts transcribed from the project log.
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
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="var(--viz-rule)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-h)" opacity="0.5" />

        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="var(--viz-muted)">
          {zh ? "六个批次 · 一份登记表" : "SIX BATCHES · ONE REGISTRY"}
        </text>

        {batches.map((batch, i) => {
          const y = 62 + i * 26;
          return (
            <g key={batch.label}>
              <text x="30" y={y + 9} fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--viz-muted)">
                {batch.label}
              </text>
              <rect x="118" y={y} width={scale(batch.n)} height="12" fill="var(--viz-focus)" opacity="0.24" />
              <text
                x={118 + scale(batch.n) + 8}
                y={y + 10}
                fontFamily="var(--font-mono)"
                fontSize="9"
                fill="var(--viz-ink)"
              >
                {batch.n}
              </text>
            </g>
          );
        })}

        {/* The registry every batch is logged into. Its script reads names and sizes, never style. */}
        <line x1="300" y1="52" x2="300" y2="230" stroke="var(--viz-ink)" strokeWidth="1.2" />
        <text
          x="300"
          y="246"
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          textAnchor="middle"
          fill="var(--viz-ink)"
        >
          {zh ? "登记表" : "REGISTRY"}
        </text>
        <text
          x="300"
          y="258"
          fontFamily="var(--font-mono)"
          fontSize="8"
          textAnchor="middle"
          fill="var(--viz-muted)"
        >
          {zh ? "脚本只读清单，不查风格" : "SCRIPT READS THE MANIFEST, NOT STYLE"}
        </text>

        <path d="M 306 141 L 386 141" stroke="var(--viz-ink)" strokeWidth="1" />
        <text x="396" y="132" fontFamily="var(--font-display)" fontSize="40" fill="var(--viz-ink)">
          299
        </text>
        {/* Registry records, not finished art: the image files behind the 299
            were never verified (canonical facts, Hoop Dream 299). */}
        <text x="396" y="152" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--viz-muted)">
          {zh ? "条登记规格" : "REGISTERED SPECS"}
        </text>
        <text x="396" y="164" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--viz-muted)">
          {zh ? "原图未核实" : "IMAGES NOT VERIFIED"}
        </text>

        <text x="30" y="288" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.5" fill="var(--viz-focus)">
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
          fill="var(--viz-ink)"
        >
          {zh ? "说清楚「不要什么」更管用" : "saying what it is not did more work"}
        </text>
        <text x="30" y="362" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--viz-muted)">
          {zh ? "146 个生涯节点 · 10 章 · 1,975 个测试" : "146 career nodes · 10 chapters · 1,975 tests"}
        </text>
        <text x="30" y="380" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--viz-muted)">
          {zh ? "规则写在大量产出之前" : "the rules were written before the volume existed"}
        </text>
      </svg>
    </div>
  );
}

export function VizPricewise({ locale = "en" }: VizProps) {
  // The case's argument in one image: three gates all say PASS, and four
  // classes of defect walk straight through them, because none of the three asks
  // whether the feature executed. The fifth line is the regression my own fix
  // introduced (PriceWise e066106), so the count reads 4+1, not 5 defects: the
  // fix commits name more than ten individual defects inside the four classes.
  const zh = locale === "zh";
  const gates = [
    { label: zh ? "构建" : "BUILD", x: 150 },
    { label: zh ? "类型" : "TYPES", x: 232 },
    { label: zh ? "测试" : "TESTS", x: 314 },
  ];
  const defects = [
    zh ? "语义搜索没用过向量" : "search never used a vector",
    zh ? "模板建的清单是空的" : "template lists came out empty",
    zh ? "鉴权缺密钥时不拒绝" : "auth failed open without its key",
    zh ? "六张表从没建过" : "six tables were never created",
    zh ? "我的修复引入的回归：向量撑爆返回" : "my fix's regression: a bloated response",
  ];

  return (
    <div className="viz viz-pricewise">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="paper-p" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="var(--viz-rule)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-p)" opacity="0.5" />

        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="var(--viz-muted)">
          {zh ? "三道关卡 · 全部通过" : "THREE GATES · ALL GREEN"}
        </text>

        {/* The three gates, drawn as openings rather than barriers. */}
        {gates.map((gate) => (
          <g key={gate.label}>
            <line x1={gate.x} y1="52" x2={gate.x} y2="228" stroke="var(--viz-ink)" strokeWidth="1.2" />
            <text
              x={gate.x}
              y="244"
              fontFamily="var(--font-mono)"
              fontSize="8.5"
              textAnchor="middle"
              fill="var(--viz-ink)"
            >
              {gate.label}
            </text>
          </g>
        ))}

        {/* Four classes and one regression, passing through every gate untouched. */}
        {defects.map((defect, i) => {
          const y = 70 + i * 31;
          return (
            <g key={defect}>
              <text x="30" y={y + 4} fontFamily="var(--font-mono)" fontSize="8" fill="var(--viz-muted)">
                {String(i + 1).padStart(2, "0")}
              </text>
              <line x1="52" y1={y} x2="404" y2={y} stroke="var(--viz-focus)" strokeWidth="1" opacity="0.55" />
              <path d={`M 404 ${y} l -6 -3 l 0 6 z`} fill="var(--viz-focus)" opacity="0.55" />
              <text x="52" y={y - 6} fontFamily="var(--font-mono)" fontSize="8" fill="var(--viz-focus)">
                {defect}
              </text>
            </g>
          );
        })}

        <text x="412" y="152" fontFamily="var(--font-display)" fontSize="40" fill="var(--viz-ink)">
          4+1
        </text>
        <text x="412" y="172" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--viz-muted)">
          {zh ? "全过" : "GOT THROUGH"}
        </text>

        <text x="30" y="288" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.5" fill="var(--viz-focus)">
          {zh
            ? "查出来靠的是：打真实接口 · 读返回内容 · 直接查数据库"
            : "FOUND BY: CALLING THE REAL ENDPOINT · READING THE RESPONSE · QUERYING THE DB"}
        </text>

        <text
          x="30"
          y="336"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="22"
          fill="var(--viz-ink)"
        >
          {zh ? "渲染出来了，不等于跑起来了" : "renders correctly is not runs correctly"}
        </text>
        <text x="30" y="362" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--viz-muted)">
          {zh ? "109 条 API 路由 · 36 条页面路由 · 311 个测试" : "109 API routes · 36 page routes · 311 tests"}
        </text>
        <text x="30" y="380" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--viz-muted)">
          {zh ? "没有一道关卡在问「功能有没有真的执行」" : "no gate was asking whether the feature executed"}
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
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="var(--viz-rule)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-g)" opacity="0.5" />

        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="var(--viz-muted)">
          {zh ? "两类证据 · 并排 · 不合并" : "TWO KINDS OF EVIDENCE · SIDE BY SIDE · NEVER MERGED"}
        </text>

        <text x="30" y="62" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1" fill="var(--viz-ink)">
          {zh ? "客观指标" : "OBJECTIVE"}
        </text>
        {objective.map((item, i) => (
          <g key={item}>
            <rect x="30" y={74 + i * 22} width="152" height="14" fill="var(--viz-ink)" opacity="0.1" />
            <text x="38" y={84 + i * 22} fontFamily="var(--font-mono)" fontSize="8" fill="var(--viz-ink)">
              {item}
            </text>
          </g>
        ))}

        <text x="338" y="62" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1" fill="var(--viz-focus)">
          {zh ? "感知信号" : "PERCEIVED"}
        </text>
        {perceived.map((item, i) => (
          <g key={item}>
            <rect x="338" y={74 + i * 22} width="152" height="14" fill="var(--viz-focus)" opacity="0.16" />
            <text x="346" y={84 + i * 22} fontFamily="var(--font-mono)" fontSize="8" fill="var(--viz-ink)">
              {item}
            </text>
          </g>
        ))}

        {/* The gap itself. Nothing bridges it — that is the whole point. */}
        <line x1="206" y1="74" x2="206" y2="206" stroke="var(--viz-ink)" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="314" y1="74" x2="314" y2="206" stroke="var(--viz-focus)" strokeWidth="1" strokeDasharray="2 4" />
        <text
          x="260"
          y="136"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="19"
          textAnchor="middle"
          fill="var(--viz-ink)"
        >
          {zh ? "落差" : "the gap"}
        </text>
        <text x="260" y="158" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="var(--viz-muted)">
          {zh ? "去查一查的理由" : "A REASON TO LOOK"}
        </text>
        <text x="260" y="172" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="var(--viz-muted)">
          {zh ? "不是危险的证明" : "NOT PROOF OF DANGER"}
        </text>

        <text x="30" y="248" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.5" fill="var(--viz-focus)">
          {zh
            ? "写进系统要求：匿名上报 · 位置取整到街段 · 显示置信度与偏差 · 不出安全分数"
            : "AS REQUIREMENTS: ANONYMOUS · ROUNDED TO A STREET SEGMENT · CONFIDENCE SHOWN · NO SAFETY SCORE"}
        </text>

        <text
          x="30"
          y="300"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="22"
          fill="var(--viz-ink)"
        >
          {zh ? "一合并，不确定性就消失了" : "merge them and the uncertainty disappears"}
        </text>
        <text x="30" y="330" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--viz-muted)">
          {zh
            ? "18 个访谈 · 6 人完成 · 我做第 10、11、12 个"
            : "18 interviews · six completed · numbers 10, 11 and 12 are mine"}
        </text>
        <text x="30" y="350" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--viz-muted)">
          {zh ? "18 个访谈撑不起一个安全分数" : "18 interviews cannot support a safety score"}
        </text>
        <text x="30" y="378" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--viz-focus)">
          {zh
            ? "路线原型是我建的，也是我主张放弃的"
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
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="var(--viz-rule)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-r)" opacity="0.5" />

        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="var(--viz-muted)">
          {zh ? "谁都同意的一句话 → 能被反驳的一条规则" : "A SENTENCE ANYONE AGREES WITH → A RULE ANYONE CAN REFUTE"}
        </text>

        <text x="30" y="62" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1" fill="var(--viz-muted)">
          {zh ? "软要求" : "SOFT"}
        </text>
        <text x="266" y="62" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1" fill="var(--viz-focus)">
          {zh ? "能施工、也能被指着说不对" : "BUILDABLE, AND ARGUABLE"}
        </text>

        {rows.map((row, i) => {
          const y = 92 + i * 40;
          return (
            <g key={row.soft}>
              <text x="30" y={y} fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--viz-muted)">
                {row.soft}
              </text>
              <line x1="212" y1={y - 4} x2="256" y2={y - 4} stroke="var(--viz-ink)" strokeWidth="1" />
              <path d={`M 256 ${y - 4} l -6 -3 l 0 6 z`} fill="var(--viz-ink)" />
              <text x="266" y={y} fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--viz-ink)">
                {row.hard}
              </text>
              <line x1="30" y1={y + 14} x2="490" y2={y + 14} stroke="var(--viz-rule)" strokeWidth="0.5" />
            </g>
          );
        })}

        <text x="30" y="278" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.5" fill="var(--viz-focus)">
          {zh
            ? "按钮写「See safer routes」：比较级，因为没有数据支撑「最安全」"
            : "THE BUTTON READS 'SEE SAFER ROUTES' — COMPARATIVE, BECAUSE NO DATA SUPPORTS 'SAFEST'"}
        </text>

        <text
          x="30"
          y="326"
          fontFamily="var(--font-display)"
          fontStyle={displayStyle(locale)}
          fontSize="22"
          fill="var(--viz-ink)"
        >
          {zh ? "能被反驳，规则才有用" : "being refutable is what makes it useful"}
        </text>
        <text x="30" y="354" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--viz-muted)">
          {zh ? "两份作业 · 同一个动作 · 均已提交并评分" : "two briefs · one move · both submitted and marked"}
        </text>
        <text x="30" y="376" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--viz-muted)">
          {zh ? "指南里的效果数字出自所引论文，不是我的实验" : "the guide's effect figures are the cited paper's, not mine"}
        </text>
      </svg>
    </div>
  );
}
