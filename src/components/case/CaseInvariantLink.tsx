import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";

type LabDemoSlug = "walkie" | "autofill" | "onthebeat";

const INVARIANT_CARDS: Record<
  LabDemoSlug,
  {
    en: { title: string; rule: string; cta: string };
    zh: { title: string; rule: string; cta: string };
  }
> = {
  walkie: {
    en: {
      title: "Interactive State Machine · Physical Tool Approval",
      rule: "Press-to-talk captures audio locally; AES-256-GCM frames cross a zero-knowledge relay; destructive agent permissions block until a watch button is physically pressed.",
      cta: "Inspect Walkie in /lab →",
    },
    zh: {
      title: "交互状态机 · 实体按键工具审批闭环",
      rule: "前键按住说话本地采集；AES-256-GCM 密文走零知识中继；Claude 工具权限必须等待手表物理前/侧键确认才会放行。",
      cta: "前往 /lab 走查 Walkie 状态机 →",
    },
  },
  autofill: {
    en: {
      title: "Interactive State Machine · Zero-Guess Confidence Gate",
      rule: "45 high-confidence fields fill deterministically, ambiguous controls stay empty with review outlines, and the final Submit action stays locked strictly for the human applicant.",
      cta: "Inspect Autofill in /lab →",
    },
    zh: {
      title: "交互状态机 · 零猜测置信度门控",
      rule: "确定性字段自动填入，拿不准的控件留空高亮等待确认，最终 Submit 按钮在不可逆外部提交前严格锁定为人工操作。",
      cta: "前往 /lab 走查 Autofill 状态机 →",
    },
  },
  onthebeat: {
    en: {
      title: "Interactive State Machine · Zero-Identity Mutual Opt-In",
      rule: "Presence is armed on demand, nearby waves carry zero name or photo, and identities only unlock after both people accept on the same rhythm window.",
      cta: "Inspect On The Beat in /lab →",
    },
    zh: {
      title: "交互状态机 · 零身份预泄露双向破冰",
      rule: "在场状态按次开启，附近挥手只告知「有人挥手」不泄名字，双方在同窗口确认后才展示名称与碰面地标。",
      cta: "前往 /lab 走查 On The Beat 状态机 →",
    },
  },
};

export function isLabLinkedCase(slug: string): slug is LabDemoSlug {
  return slug === "walkie" || slug === "autofill" || slug === "onthebeat";
}

export function CaseInvariantLink({
  slug,
  isZh,
}: {
  slug: LabDemoSlug;
  isZh: boolean;
}) {
  const copy = INVARIANT_CARDS[slug][isZh ? "zh" : "en"];

  return (
    <section className="container" aria-label={copy.title}>
      <div className="case-invariant-card">
        <div className="case-invariant-copy">
          <div className="label">{isZh ? "互动规则沙盒" : "Interactive Invariant"}</div>
          <h2>{copy.title}</h2>
          <p>{copy.rule}</p>
        </div>
        <Link href={`/lab?demo=${slug}#lab-sm-title`} className="btn btn-primary">
          {copy.cta}
        </Link>
      </div>
    </section>
  );
}
