export function VizConnect() {
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
          BEFORE · 12 TOP LEVELS
        </text>
        {["Study", "HiQ", "SI-net", "Money", "my.UQ", "Library", "Hub", "IT", "ask.UQ", "Calendar", "More", "Links"].map((s, i) => (
          <g key={s}>
            <rect
              x={30 + (i % 4) * 50}
              y={50 + Math.floor(i / 4) * 32}
              width="46"
              height="26"
              fill="none"
              stroke="#8B7355"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
            <text
              x={53 + (i % 4) * 50}
              y={67 + Math.floor(i / 4) * 32}
              fontFamily="var(--font-ui)"
              fontSize="9"
              textAnchor="middle"
              fill="#756D61"
            >
              {s}
            </text>
          </g>
        ))}

        <text x="300" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#A63F2A">
          AFTER · 6 TASKS
        </text>
        {["I'm new", "Study", "Belong", "Pay", "Life", "Leave"].map((s, i) => (
          <g key={s}>
            <rect x={300} y={50 + i * 22} width="180" height="18" fill="#F7F4EC" stroke="#A63F2A" strokeWidth="1" />
            <text x={312} y={63 + i * 22} fontFamily="var(--font-ui)" fontSize="11" fill="#3A362D">
              {s}
            </text>
            <text
              x={472}
              y={63 + i * 22}
              fontFamily="var(--font-mono)"
              fontSize="9"
              textAnchor="end"
              fill="#8A8170"
            >
              0{i + 1}
            </text>
          </g>
        ))}

        <path d="M 250 80 C 275 80, 275 110, 295 110" stroke="#C9523A" strokeWidth="1.2" fill="none" />
        <path d="M 290 106 L 296 110 L 290 114" stroke="#C9523A" strokeWidth="1.2" fill="none" />

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

        <text x="30" y="372" fontFamily="var(--font-display)" fontStyle="italic" fontSize="28" fill="#3A362D">
          12 → 6
        </text>
        <text x="30" y="390" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8A8170">
          top-level categories · card sort · tree test
        </text>
      </svg>
    </div>
  );
}

export function VizSpectra() {
  return (
    <div className="viz viz-spectra">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <text x="30" y="30" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#B5AC99">
          SPECTRA LENS · VIEWFINDER
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
          <text x="286" y="152" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#25231D">STOP</text>
          <rect x="345" y="210" width="20" height="18" fill="#F7F4EC" stroke="#25231D" strokeWidth="0.5" />
          <text x="355" y="222" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#25231D">WAIT</text>
          <rect x="275" y="280" width="20" height="18" fill="#F7F4EC" stroke="#25231D" strokeWidth="0.5" />
          <text x="285" y="292" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#25231D">GO</text>
        </g>

        <line x1="260" y1="90" x2="260" y2="310" stroke="#EFE8DA" strokeWidth="0.6" strokeDasharray="3 3" />

        <text x="150" y="340" fontFamily="var(--font-mono)" fontSize="9" fill="#8A8170" letterSpacing="1">RAW</text>
        <text x="370" y="340" fontFamily="var(--font-mono)" fontSize="9" fill="#8A8170" letterSpacing="1" textAnchor="end">
          ASSISTED
        </text>

        <text x="30" y="382" fontFamily="var(--font-display)" fontStyle="italic" fontSize="22" fill="#EFE8DA">
          answer the decision, not the hue
        </text>
      </svg>
    </div>
  );
}

export function VizAI() {
  const flagged = [9, 23, 41, 58];
  const fillerLabels = ["um", "like", "uh", "so"];
  return (
    <div className="viz viz-ai">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <text x="30" y="30" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#7A2D1C">
          AI INTERVIEW · SESSION 04 · 02:31
        </text>

        <g transform="translate(30, 160)">
          {Array.from({ length: 72 }).map((_, i) => {
            const h = 8 + Math.abs(Math.sin(i * 0.7) * 38) + Math.abs(Math.sin(i * 0.21) * 20);
            const flag = flagged.includes(i);
            return (
              <rect
                key={i}
                x={i * 6.3}
                y={-h / 2}
                width="3.4"
                height={h}
                fill={flag ? "#C9523A" : "#7A2D1C"}
                opacity={flag ? 1 : 0.55}
                rx="1"
              />
            );
          })}
        </g>

        {flagged.map((x, i) => (
          <g key={i}>
            <circle cx={30 + x * 6.3 + 1.7} cy="100" r="3" fill="#C9523A" />
            <line
              x1={30 + x * 6.3 + 1.7}
              y1="104"
              x2={30 + x * 6.3 + 1.7}
              y2="140"
              stroke="#C9523A"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
            <text
              x={30 + x * 6.3 + 1.7}
              y="92"
              fontFamily="var(--font-mono)"
              fontSize="9"
              textAnchor="middle"
              fill="#C9523A"
            >
              {fillerLabels[i]}
            </text>
          </g>
        ))}

        <line x1="30" y1="160" x2="490" y2="160" stroke="#7A2D1C" strokeWidth="0.4" opacity="0.3" />

        <g transform="translate(30, 240)">
          <rect x="0" y="0" width="460" height="110" fill="#F7F4EC" stroke="#E89678" strokeWidth="1" rx="4" />
          <text x="16" y="28" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#7A2D1C">
            REAL-TIME FEEDBACK
          </text>
          <text x="16" y="60" fontFamily="var(--font-display)" fontSize="20" fill="#3A362D">Pace</text>
          <rect x="16" y="70" width="120" height="3" fill="#E6DFCF" rx="1.5" />
          <rect x="16" y="70" width="86" height="3" fill="#5B6B4A" rx="1.5" />
          <text x="140" y="74" fontFamily="var(--font-mono)" fontSize="10" fill="#5B6B4A">142 wpm</text>
          <text x="240" y="60" fontFamily="var(--font-display)" fontSize="20" fill="#3A362D">Fillers</text>
          <rect x="240" y="70" width="120" height="3" fill="#E6DFCF" rx="1.5" />
          <rect x="240" y="70" width="52" height="3" fill="#C9523A" rx="1.5" />
          <text x="366" y="74" fontFamily="var(--font-mono)" fontSize="10" fill="#C9523A">4 in 30s</text>
          <text x="16" y="98" fontFamily="var(--font-display)" fontStyle="italic" fontSize="14" fill="#7A2D1C">
            Try pausing instead of &quot;um&quot;.
          </text>
        </g>
      </svg>
    </div>
  );
}

export function VizCircles() {
  const stickies = [
    { x: 120, y: 190, t: "hiking", r: -3, big: true },
    { x: 190, y: 220, t: "cooking", r: 2, big: true },
    { x: 140, y: 250, t: "boardgames", r: -4, big: false },
    { x: 220, y: 180, t: "run club", r: 3, big: false },
    { x: 230, y: 255, t: "study", r: -2, big: false },
    { x: 310, y: 200, t: "same major", r: 1, big: false },
    { x: 380, y: 230, t: "same country", r: -3, big: false },
    { x: 400, y: 190, t: "same uni", r: 2, big: false },
    { x: 350, y: 260, t: "same dorm", r: -2, big: false },
  ];
  return (
    <div className="viz viz-circles">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <text x="30" y="30" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#756D61">
          CONNECT CIRCLES · CO-DESIGN WS2 · STICKY CLUSTERS
        </text>

        <g>
          <ellipse cx="170" cy="200" rx="120" ry="110" fill="none" stroke="#C9523A" strokeWidth="1" strokeDasharray="4 3" />
          <text x="170" y="100" fontFamily="var(--font-display)" fontStyle="italic" fontSize="18" textAnchor="middle" fill="#A63F2A">
            shared activity
          </text>
        </g>
        <g>
          <ellipse cx="350" cy="200" rx="120" ry="110" fill="none" stroke="#8B7355" strokeWidth="1" strokeDasharray="4 3" />
          <text x="350" y="100" fontFamily="var(--font-display)" fontStyle="italic" fontSize="18" textAnchor="middle" fill="#756D61">
            shared identity
          </text>
        </g>

        {stickies.map((s, i) => (
          <g key={i} transform={`translate(${s.x},${s.y}) rotate(${s.r})`}>
            <rect
              x="-28"
              y="-12"
              width={s.big ? 64 : 56}
              height="22"
              fill={s.big ? "#FBEFE9" : "#EFE8DA"}
              stroke={s.big ? "#E89678" : "#D6CDBC"}
              strokeWidth="0.8"
              rx="1"
            />
            <text
              x={s.big ? 4 : 0}
              y="3"
              fontFamily="var(--font-ui)"
              fontSize={s.big ? 11 : 10}
              textAnchor="middle"
              fill="#3A362D"
              fontWeight={s.big ? 500 : 400}
            >
              {s.t}
            </text>
          </g>
        ))}

        <path d="M 100 170 Q 90 140 80 150" stroke="#A63F2A" strokeWidth="1" fill="none" />
        <text x="20" y="140" fontFamily="var(--font-hand)" fontSize="16" fill="#A63F2A">winning cluster</text>

        <text x="30" y="382" fontFamily="var(--font-display)" fontStyle="italic" fontSize="20" fill="#3A362D">
          design meetups around <tspan fontWeight="600">doing</tspan>, not introducing.
        </text>
      </svg>
    </div>
  );
}

export function VizMaze() {
  // One sensor event entering the round state machine, then fanning out to
  // every feedback channel at once — the whole point of the case.
  const channels = ["SCORE", "TIMER", "HAPTIC", "LIGHT", "AUDIO"];

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
          ONE PASS · ONE EVENT
        </text>

        <circle cx="46" cy="120" r="7" fill="#A63F2A" />
        <path d="M 56 120 L 116 120" stroke="#8B7355" strokeWidth="0.8" strokeDasharray="3 3" />

        <line x1="128" y1="88" x2="128" y2="152" stroke="#A63F2A" strokeWidth="1.4" />
        <text x="128" y="80" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#A63F2A">
          IR
        </text>
        <text x="128" y="168" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#8B7355">
          debounce
        </text>

        <rect x="176" y="94" width="104" height="52" fill="#F7F4EC" stroke="#25231D" strokeWidth="1" />
        <text x="228" y="116" fontFamily="var(--font-ui)" fontSize="11" textAnchor="middle" fill="#25231D">
          round state
        </text>
        <text x="228" y="132" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle" fill="#756D61">
          advance
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

        <text x="30" y="352" fontFamily="var(--font-display)" fontStyle="italic" fontSize="22" fill="#25231D">
          the buzz lands before the score does
        </text>
        <text x="30" y="378" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8B7355">
          arduino mega · 10 sensors · exhibited
        </text>
      </svg>
    </div>
  );
}
