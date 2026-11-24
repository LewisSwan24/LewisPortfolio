import { AnchorNote } from "@/components/ui/AnchorNote";
import type { CurrentProjectSlug } from "@/lib/project-routes";

interface TermNoteEntry {
  term: { en: string; zh: string };
  label: { en: string; zh: string };
  note: { en: string; zh: string };
}

const CASE_TERM_NOTES: Partial<Record<CurrentProjectSlug, TermNoteEntry>> = {
  walkie: {
    term: { en: "end-to-end encrypted relay", zh: "端到端加密中继" },
    label: { en: "Protocol note", zh: "协议注脚" },
    note: {
      en: "Every frame after PAIR is sealed with AES-256-GCM using a key derived from pair.key; the Fly.io relay forwards ciphertext without holding decryption keys.",
      zh: "PAIR 配对后的所有帧均使用 pair.key 派生的密钥进行 AES-256-GCM 加密，Fly.io 云端中继仅转发密文，无法读取任何指令与工具名。",
    },
  },
  lamplight: {
    term: { en: "default-safe triage", zh: "默认安全分流" },
    label: { en: "Interaction note", zh: "交互注脚" },
    note: {
      en: "High-risk confirmation cards assign initial keyboard focus and primary visual weight to 'Not now', ensuring an accidental Enter key pauses rather than overwrites.",
      zh: "高风险确认卡将初始键盘焦点与视觉权重落在「先不要」，避免用户误按 Enter 键直接覆写原文件。",
    },
  },
  autofill: {
    term: { en: "confidence gating", zh: "置信度门控" },
    label: { en: "Trust boundary", zh: "信任边界" },
    note: {
      en: "Fields only auto-write on deterministic 1:1 schema matches; ambiguous dropdowns require manual selection and final Submit remains strictly human-triggered.",
      zh: "仅确定性的 1:1 字段映射允许直填；存在歧义的下拉项标出等待人工确认，最终提交永远锁死为人工操作。",
    },
  },
  fencepost: {
    term: { en: "query-layer cut-off", zh: "查询层截断" },
    label: { en: "Privacy invariant", zh: "隐私不变量" },
    note: {
      en: "Revoking an access_grants token updates the database read join immediately with zero cache lag, so the assistant loses access on the very next prompt.",
      zh: "吊销 access_grants 权限即时更新数据库查询条件且零缓存延迟，AI 助手在下一次提问时立刻无法读取该条记录。",
    },
  },
  maze: {
    term: { en: "debounce & cooldown window", zh: "防抖与冷却窗口" },
    label: { en: "Hardware timing", zh: "硬件时序" },
    note: {
      en: "Raw FC-51 IR beams flicker two or three times per ball pass; a firmware cooldown locks score, timer, LEDs, and sleeve haptics to one shared event.",
      zh: "原始 FC-51 红外光束在小球经过时会抖动触发多次；固件冷却窗口把计分、计时、灯带与手指套震动锁定为同一个原子事件。",
    },
  },
  connect: {
    term: { en: "October paper reset", zh: "十月纸面重画" },
    label: { en: "IA inflection", zh: "架构拐点" },
    note: {
      en: "After September think-aloud sessions exposed missing back routes, the team redrew all 5 core screens on one sheet of paper before writing the shared React system.",
      zh: "九月出声思考测试暴露出缺少返回路径后，团队在一张纸上重画了全部 5 个核心页面，再重新搭起共享 React 组件系统。",
    },
  },
};

export function CaseTerminologyNotes({
  slug,
  locale,
}: {
  slug: CurrentProjectSlug;
  locale: "en" | "zh";
}) {
  const entry = CASE_TERM_NOTES[slug];
  if (!entry) return null;
  const isZh = locale === "zh";

  return (
    <div className="case-term-note-bar">
      <span className="case-term-note-prefix">
        {isZh ? "术语注脚 · 点击展开：" : "Design term note · inspect:"}
      </span>
      <AnchorNote
        term={entry.term[locale]}
        label={entry.label[locale]}
        note={entry.note[locale]}
      />
    </div>
  );
}
