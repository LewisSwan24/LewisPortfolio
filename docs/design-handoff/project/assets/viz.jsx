// ============================================================
// Project card visuals — original CSS/SVG compositions
// Each reflects the PROJECT CONTENT, not generic decoration.
// ============================================================

function VizConnect() {
  // UQ Connect: before (chaotic tree) -> after (ordered tree)
  return (
    <div className="viz viz-connect">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="paper-c" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="39.5" x2="40" y2="39.5" stroke="#C9BEA2" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#paper-c)" opacity="0.5"/>
        {/* left column: "before" */}
        <text x="30" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#8B7355">BEFORE · 12 TOP LEVELS</text>
        {['Study','HiQ','SI-net','Money','my.UQ','Library','Hub','IT','ask.UQ','Calendar','More','Links'].map((s,i)=>(
          <g key={s}>
            <rect x={30 + (i%4)*50} y={50 + Math.floor(i/4)*32} width="46" height="26" fill="none" stroke="#8B7355" strokeWidth="0.8" strokeDasharray="2 2"/>
            <text x={53 + (i%4)*50} y={67 + Math.floor(i/4)*32} fontFamily="var(--font-ui)" fontSize="9" textAnchor="middle" fill="#5E5749">{s}</text>
          </g>
        ))}

        {/* right column: "after" */}
        <text x="300" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#A63F2A">AFTER · 6 TASKS</text>
        {['I\'m new','Study','Belong','Pay','Life','Leave'].map((s,i)=>(
          <g key={s}>
            <rect x={300} y={50 + i*22} width="180" height="18" fill="#FAF7F1" stroke="#A63F2A" strokeWidth="1"/>
            <text x={312} y={63 + i*22} fontFamily="var(--font-ui)" fontSize="11" fill="#3A362D">{s}</text>
            <text x={472} y={63 + i*22} fontFamily="var(--font-mono)" fontSize="9" textAnchor="end" fill="#8A8170">0{i+1}</text>
          </g>
        ))}

        {/* arrow between */}
        <path d="M 250 80 C 275 80, 275 110, 295 110" stroke="#C9523A" strokeWidth="1.2" fill="none"/>
        <path d="M 290 106 L 296 110 L 290 114" stroke="#C9523A" strokeWidth="1.2" fill="none"/>

        {/* ruler */}
        <line x1="30" y1="340" x2="490" y2="340" stroke="#8A8170" strokeWidth="0.8"/>
        {Array.from({length: 24}).map((_,i) => (
          <line key={i} x1={30+i*20} y1="340" x2={30+i*20} y2={i%5===0 ? 348 : 344} stroke="#8A8170" strokeWidth="0.6"/>
        ))}

        {/* stats */}
        <text x="30" y="372" fontFamily="var(--font-display)" fontStyle="italic" fontSize="28" fill="#3A362D">58% → 84%</text>
        <text x="30" y="390" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#8A8170">findability · tree test · n=50</text>
      </svg>
    </div>
  );
}

function VizSpectra() {
  // Spectra Lens: a phone silhouette with two halves — colour-blind vision vs. assisted
  return (
    <div className="viz viz-spectra">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <text x="30" y="30" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#B5AC99">SPECTRA LENS · VIEWFINDER</text>

        {/* phone */}
        <rect x="140" y="60" width="240" height="300" rx="18" stroke="#F5F2EC" strokeWidth="1.2" fill="none"/>
        <rect x="190" y="72" width="60" height="5" rx="2.5" fill="#F5F2EC"/>

        {/* split viewport */}
        <clipPath id="left-half">
          <rect x="150" y="90" width="110" height="220" rx="4"/>
        </clipPath>
        <clipPath id="right-half">
          <rect x="260" y="90" width="110" height="220" rx="4"/>
        </clipPath>

        {/* left: desaturated "how colourblind user sees" */}
        <g clipPath="url(#left-half)">
          <rect x="150" y="90" width="110" height="220" fill="#3A3A3A"/>
          <circle cx="195" cy="150" r="28" fill="#6B6B6B"/>
          <circle cx="215" cy="220" r="28" fill="#7A7A7A"/>
          <circle cx="195" cy="290" r="28" fill="#888888"/>
        </g>
        {/* right: tagged with labels */}
        <g clipPath="url(#right-half)">
          <rect x="260" y="90" width="110" height="220" fill="#25231D"/>
          <circle cx="305" cy="150" r="28" fill="#C9523A"/>
          <circle cx="325" cy="220" r="28" fill="#B8873E"/>
          <circle cx="305" cy="290" r="28" fill="#5B6B4A"/>
          <rect x="275" y="140" width="22" height="18" fill="#FAF7F1" stroke="#25231D" strokeWidth="0.5"/>
          <text x="286" y="152" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#25231D">STOP</text>
          <rect x="345" y="210" width="20" height="18" fill="#FAF7F1" stroke="#25231D" strokeWidth="0.5"/>
          <text x="355" y="222" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#25231D">WAIT</text>
          <rect x="275" y="280" width="20" height="18" fill="#FAF7F1" stroke="#25231D" strokeWidth="0.5"/>
          <text x="285" y="292" fontFamily="var(--font-mono)" fontSize="8" textAnchor="middle" fill="#25231D">GO</text>
        </g>

        {/* divider */}
        <line x1="260" y1="90" x2="260" y2="310" stroke="#F5F2EC" strokeWidth="0.6" strokeDasharray="3 3"/>

        {/* labels */}
        <text x="150" y="340" fontFamily="var(--font-mono)" fontSize="9" fill="#8A8170" letterSpacing="1">RAW</text>
        <text x="370" y="340" fontFamily="var(--font-mono)" fontSize="9" fill="#8A8170" letterSpacing="1" textAnchor="end">ASSISTED</text>

        <text x="30" y="382" fontFamily="var(--font-display)" fontStyle="italic" fontSize="22" fill="#F5F2EC">3.1s avg. recognition</text>
      </svg>
    </div>
  );
}

function VizAI() {
  // AI Interview Assistant: a waveform with filler-word spikes marked
  return (
    <div className="viz viz-ai">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <text x="30" y="30" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#7A2D1C">
          AI INTERVIEW · SESSION 04 · 02:31
        </text>

        {/* waveform */}
        <g transform="translate(30, 160)">
          {Array.from({length: 72}).map((_, i) => {
            const h = 8 + Math.abs(Math.sin(i*0.7) * 38) + Math.abs(Math.sin(i*0.21) * 20);
            const flag = [9, 23, 41, 58].includes(i);
            return (
              <rect key={i} x={i*6.3} y={-h/2} width="3.4" height={h}
                    fill={flag ? "#C9523A" : "#7A2D1C"} opacity={flag ? 1 : 0.55}
                    rx="1"/>
            );
          })}
        </g>

        {/* filler-word markers */}
        {[9, 23, 41, 58].map((x,i) => (
          <g key={i}>
            <circle cx={30 + x*6.3 + 1.7} cy="100" r="3" fill="#C9523A"/>
            <line x1={30 + x*6.3 + 1.7} y1="104" x2={30 + x*6.3 + 1.7} y2="140" stroke="#C9523A" strokeWidth="0.8" strokeDasharray="2 2"/>
            <text x={30 + x*6.3 + 1.7} y="92" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle" fill="#C9523A">{['um','like','uh','so'][i]}</text>
          </g>
        ))}

        {/* baseline */}
        <line x1="30" y1="160" x2="490" y2="160" stroke="#7A2D1C" strokeWidth="0.4" opacity="0.3"/>

        {/* bottom panel — metrics */}
        <g transform="translate(30, 240)">
          <rect x="0" y="0" width="460" height="110" fill="#FAF7F1" stroke="#E89678" strokeWidth="1" rx="4"/>
          <text x="16" y="28" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="#7A2D1C">REAL-TIME FEEDBACK</text>

          <text x="16" y="60" fontFamily="var(--font-display)" fontSize="20" fill="#3A362D">Pace</text>
          <rect x="16" y="70" width="120" height="3" fill="#E6DFCF" rx="1.5"/>
          <rect x="16" y="70" width="86" height="3" fill="#5B6B4A" rx="1.5"/>
          <text x="140" y="74" fontFamily="var(--font-mono)" fontSize="10" fill="#5B6B4A">142 wpm</text>

          <text x="240" y="60" fontFamily="var(--font-display)" fontSize="20" fill="#3A362D">Fillers</text>
          <rect x="240" y="70" width="120" height="3" fill="#E6DFCF" rx="1.5"/>
          <rect x="240" y="70" width="52" height="3" fill="#C9523A" rx="1.5"/>
          <text x="366" y="74" fontFamily="var(--font-mono)" fontSize="10" fill="#C9523A">4 in 30s</text>

          <text x="16" y="98" fontFamily="var(--font-display)" fontStyle="italic" fontSize="14" fill="#7A2D1C">Try pausing instead of "um".</text>
        </g>
      </svg>
    </div>
  );
}

function VizCircles() {
  // Connect Circles: two venn-ish overlapping activity clusters — "doing together" > "meeting people"
  return (
    <div className="viz viz-circles">
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
        <text x="30" y="30" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#5E5749">
          CONNECT CIRCLES · CO-DESIGN WS2 · STICKY CLUSTERS
        </text>

        {/* cluster 1 — shared activity */}
        <g>
          <ellipse cx="170" cy="200" rx="120" ry="110" fill="none" stroke="#C9523A" strokeWidth="1" strokeDasharray="4 3"/>
          <text x="170" y="100" fontFamily="var(--font-display)" fontStyle="italic" fontSize="18" textAnchor="middle" fill="#A63F2A">shared activity</text>
        </g>
        {/* cluster 2 — shared identity */}
        <g>
          <ellipse cx="350" cy="200" rx="120" ry="110" fill="none" stroke="#8B7355" strokeWidth="1" strokeDasharray="4 3"/>
          <text x="350" y="100" fontFamily="var(--font-display)" fontStyle="italic" fontSize="18" textAnchor="middle" fill="#5E5749">shared identity</text>
        </g>

        {/* stickies */}
        {[
          {x:120,y:190,t:"hiking",r:-3, big:true},
          {x:190,y:220,t:"cooking",r:2, big:true},
          {x:140,y:250,t:"boardgames",r:-4},
          {x:220,y:180,t:"run club",r:3},
          {x:230,y:255,t:"study",r:-2},
          {x:310,y:200,t:"same major",r:1},
          {x:380,y:230,t:"same country",r:-3},
          {x:400,y:190,t:"same uni",r:2},
          {x:350,y:260,t:"same dorm",r:-2},
        ].map((s,i)=>(
          <g key={i} transform={`translate(${s.x},${s.y}) rotate(${s.r})`}>
            <rect x="-28" y="-12" width={s.big ? 64 : 56} height="22"
                  fill={s.big ? "#FBEFE9" : "#F5F2EC"}
                  stroke={s.big ? "#E89678" : "#D9D2C3"} strokeWidth="0.8" rx="1"/>
            <text x={s.big ? 4 : 0} y="3" fontFamily="var(--font-ui)" fontSize={s.big ? 11 : 10} textAnchor="middle" fill="#3A362D" fontWeight={s.big ? 500 : 400}>{s.t}</text>
          </g>
        ))}

        {/* annotation */}
        <path d="M 100 170 Q 90 140 80 150" stroke="#A63F2A" strokeWidth="1" fill="none"/>
        <text x="20" y="140" fontFamily="var(--font-hand)" fontSize="16" fill="#A63F2A">winning cluster</text>

        <text x="30" y="382" fontFamily="var(--font-display)" fontStyle="italic" fontSize="20" fill="#3A362D">design meetups around <tspan fontWeight="600">doing</tspan>, not introducing.</text>
      </svg>
    </div>
  );
}

window.VIZ = { VizConnect, VizSpectra, VizAI, VizCircles };
