import type { CaseNarrativeCopy } from "@/lib/cases/schema";
import type { CurrentProjectSlug } from "@/lib/project-routes";

interface ShiftComparison {
  leftHeading: { en: string; zh: string };
  rightHeading: { en: string; zh: string };
  before: Array<{ en: string; zh: string }>;
  after: Array<{ en: string; zh: string }>;
}

const SHIFT_COMPARISONS: Partial<Record<CurrentProjectSlug, ShiftComparison>> = {
  connect: {
    leftHeading: { en: "Assumed · before fieldwork", zh: "假设 · 进场之前" },
    rightHeading: { en: "Found · after 71 sessions", zh: "发现 · 71 份记录之后" },
    before: [
      { en: "Language proficiency is the barrier", zh: "语言能力是障碍" },
      { en: "The gap is exposure", zh: "缺口在曝光" },
      { en: "Mixers build connections", zh: "迎新活动本身能建立连接" },
      { en: "A match score is enough", zh: "给一个契合度分数就够了" },
    ],
    after: [
      { en: "Pace and group size", zh: "障碍是节奏与人数规模" },
      { en: "The gap is follow-through", zh: "缺口在跟进" },
      { en: "Repetition plus a shared task", zh: "重复 + 共同任务才留得住" },
      { en: "A match has to say why", zh: "匹配必须说明理由" },
    ],
  },
  walkie: {
    leftHeading: { en: "Naive voice UX", zh: "直觉语音设想" },
    rightHeading: { en: "Physical gate & relay invariant", zh: "硬件边界与协议实现" },
    before: [
      { en: "Voice commands auto-approve tool calls", zh: "语音识别后直接放行高风险工具" },
      { en: "Route every message over remote cloud relay", zh: "不管连没连线都一律走云端中继" },
    ],
    after: [
      { en: "Physical wrist buttons own every approval gate", zh: "所有工具权限均由手腕实体按键确认" },
      { en: "USB cable wins; zero-knowledge Fly.io fallback", zh: "插线时 USB 优先，离缆切换零知识中继" },
    ],
  },
  fencepost: {
    leftHeading: { en: "Open community feed", zh: "常见公开广场假设" },
    rightHeading: { en: "Revocable context invariant", zh: "数据层可吊销边界" },
    before: [
      { en: "Public feed with raw photo uploads & EXIF", zh: "公开广场直接上传含 EXIF 的原始照片" },
      { en: "Model context reads every saved entry", zh: "模型问答默认读取库内全部邻里条目" },
    ],
    after: [
      { en: "Schema strips EXIF; revocable QR access_grants", zh: "表结构即剥离 EXIF，仅凭可吊销二维码授权" },
      { en: "431 offline tests verify context cut on revoke", zh: "431 项离线测试锁定撤权即截断模型上下文" },
    ],
  },
  lamplight: {
    leftHeading: { en: "Opaque background loop", zh: "黑盒长任务设想" },
    rightHeading: { en: "Risk-gated desktop UI", zh: "可见队列与默认暂缓" },
    before: [
      { en: "Terminal scroll logs with implicit writes", zh: "终端长日志滚动，风险修改默认继续" },
      { en: "Operate directly on original user files", zh: "直接在原工作文件目录就地覆写" },
    ],
    after: [
      { en: "Blackboard task steps; dismiss defaults to 'not now'", zh: "黑板状态拆解，忽略卡片默认退回「先不要」" },
      { en: "Files edited strictly as copies with spend caps", zh: "仅操作副本且每次委托标注花费上限" },
    ],
  },
  autofill: {
    leftHeading: { en: "Full auto-submit", zh: "全自动提交设想" },
    rightHeading: { en: "No-guess local boundary", zh: "不猜、不替点提交" },
    before: [
      { en: "Auto-guess low-confidence fields & submit", zh: "低置信度字段自动猜填并代点击提交" },
      { en: "Send resume to external parsing backend", zh: "将个人简历上传至远端解析服务器" },
    ],
    after: [
      { en: "Empty or flagged for review; submit stays human", zh: "低把握字段留空标黄，最终提交严格由人手点击" },
      { en: "Resume data never leaves the local device", zh: "全部简历数据始终停留在本地设备" },
    ],
  },
  pricewise: {
    leftHeading: { en: "Feature bloat cycle", zh: "功能堆叠阶段" },
    rightHeading: { en: "Scope cut & script check", zh: "收敛范围与脚本核对" },
    before: [
      { en: "AI predictions & social layers before real users", zh: "无真实用户先堆砌预测与社交 5,884 行" },
    ],
    after: [
      { en: "Stopped bloat; pinned deterministic 65-item checks", zh: "及时停掉无效扩展，聚焦 65 商品比价核对脚本" },
    ],
  },
};

export function CaseNarrative({
  slug,
  narrative,
  impactLabel,
  isZh,
}: {
  slug: CurrentProjectSlug;
  narrative: CaseNarrativeCopy;
  impactLabel: string;
  isZh: boolean;
}) {
  const methods = [narrative.re.m1, narrative.re.m2, narrative.re.m3];
  // ou.m1 leads .cs-impact above, so only show m2 and m3 in the supporting grid.
  const secondaryMetrics = [narrative.ou.m2, narrative.ou.m3];
  const shift = SHIFT_COMPARISONS[slug];
  const loc = isZh ? "zh" : "en";

  return (
    <>
      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.ch.label}</div>
          </div>
          <div className="cs-row-body">
            <h2>{narrative.ch.title}</h2>
            <p className="prose">{narrative.ch.p}</p>
          </div>
        </div>
      </div>

      <div id="evidence-board" className="case-anchor" aria-hidden />
      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.re.label}</div>
          </div>
          <div className="cs-row-body">
            <h2>{narrative.re.title}</h2>
            <div className="cs-method-grid">
              {methods.map((method, idx) => (
                <div key={idx}>
                  <h5>{method.t}</h5>
                  <p>{method.b}</p>
                </div>
              ))}
            </div>
            {narrative.re.quote && (
              <div className="quote" style={{ marginTop: 32, maxWidth: "36em" }}>
                <p>{narrative.re.quote}</p>
                {narrative.re.quoteWho && <cite>— {narrative.re.quoteWho}</cite>}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.sy.label}</div>
          </div>
          <div className="cs-row-body">
            <h2>{narrative.sy.title}</h2>
            <p className="prose">{narrative.sy.p}</p>
            {shift && (
              <div className="cs-tree">
                <div>
                  <h6>{shift.leftHeading[loc]}</h6>
                  <ul>
                    {shift.before.map((item) => (
                      <li className="ko" key={item.en}>
                        {item[loc]}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h6>{shift.rightHeading[loc]}</h6>
                  <ul>
                    {shift.after.map((item) => (
                      <li className="ok" key={item.en}>
                        {item[loc]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div id="decision-timeline" className="case-anchor" aria-hidden />
      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.id.label}</div>
          </div>
          <div className="cs-row-body">
            <p className="prose">{narrative.id.p}</p>
          </div>
        </div>
      </div>

      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.pr.label}</div>
          </div>
          <div className="cs-row-body">
            <p className="prose">{narrative.pr.p}</p>
          </div>
        </div>
      </div>

      <div id="iteration-gallery" className="case-anchor" aria-hidden />
      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.te.label}</div>
          </div>
          <div className="cs-row-body">
            <p className="prose">{narrative.te.p}</p>
          </div>
        </div>
      </div>

      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.ou.label}</div>
          </div>
          <div className="cs-row-body">
            <div className="cs-impact" role="figure" aria-label={impactLabel}>
              <div className="cs-impact-eyebrow">{impactLabel}</div>
              <p className="cs-impact-headline">
                <span className="cs-impact-num">{narrative.ou.m1.v}</span>
                <span className="cs-impact-label">{narrative.ou.m1.label}</span>
              </p>
            </div>
            <dl className="cs-metrics">
              {secondaryMetrics.map((metric, idx) => {
                const parts = metric.v.split("→");
                return (
                  <div key={idx}>
                    <dt>{metric.label}</dt>
                    <dd>
                      {parts[0]}
                      {parts.length > 1 && <em>→</em>}
                      {parts.slice(1).join("→")}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="prose">{narrative.ou.p}</p>
          </div>
        </div>
      </div>

      <div id="interview-takeaway" className="case-anchor" aria-hidden />
      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.rf.label}</div>
          </div>
          <div className="cs-row-body">
            <p className="prose">{narrative.rf.p}</p>
          </div>
        </div>
      </div>
    </>
  );
}
