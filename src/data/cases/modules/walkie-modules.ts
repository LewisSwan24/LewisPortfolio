import type { CaseModulesRecord } from "@/lib/cases/modules-schema";

export const walkieModules: CaseModulesRecord = {
  slug: "walkie",
  journey: [
    {
      id: "walkie-pair-trust",
      step: 1,
      title: {
        en: "30-second physical pairing & key sealing",
        zh: "30 秒实体配对与密钥封存",
      },
      shortTitle: {
        en: "Physical pairing",
        zh: "实体配对",
      },
      trigger: {
        en: "Workstation bridge starts without an existing pair.key file",
        zh: "桌面 Node 24 桥接启动时未检测到现有 pair.key 文件",
      },
      userMentalModel: {
        en: "Granting an unattended watch access to live coding repositories feels equivalent to handing over terminal keys—it must happen face-to-face with the hardware.",
        zh: "让腕表接入本地真实代码仓库等同于交出终端控制权，必须人与真机当面确认才安心。",
      },
      systemAction: {
        en: "Bridge issues a PAIR challenge; S3 opens a 30-second window requiring a physical Front Key press before deriving and storing the AES-256-GCM pair.key.",
        zh: "桥接端发起 PAIR 挑战；S3 屏幕开启 30 秒倒计时，必须物理按下前键确认后才派生并落盘 AES-256-GCM 密钥 pair.key。",
      },
      cognitiveFriction: {
        en: "Typing hex tokens on a 1.14-inch screen invites shortcuts like hardcoded dev secrets, whereas silent auto-pairing risks unauthorized bridges hijacking the watch.",
        zh: "在 1.14 寸小屏手输十六进制密钥太反人类，而无确认静默配对又怕被未授权宿主劫持。",
      },
      edgeRecovery: {
        en: "If the 30-second countdown expires or Side Key is pressed, pairing aborts cleanly with zero key written (verified in gate-p5).",
        zh: "若 30 秒超时或按下侧键拒绝，配对立即中止且不写入任何密钥文件（已通过 gate-p5 实测验证）。",
      },
      focusTags: ["ai-trust", "systems-hardware"],
      verifiedStatus: "bench-tested",
    },
    {
      id: "walkie-ptt-capture",
      step: 2,
      title: {
        en: "Press-to-talk capture from away from the desk",
        zh: "离桌单手按住录音采集",
      },
      shortTitle: {
        en: "Press-to-talk",
        zh: "按住说话",
      },
      trigger: {
        en: "User steps away from the monitor and holds the M5StickS3 Front Key",
        zh: "用户离开显示器后按住 M5StickS3 实体前键",
      },
      userMentalModel: {
        en: "The watch should behave like a walkie-talkie: only listen while my thumb actively holds the button, never passively hot-mic.",
        zh: "期望像对讲机一样：只有拇指按住期间才录音，绝不在后台常开麦克风偷听。",
      },
      systemAction: {
        en: "S3 samples 16 kHz audio during hold, streams raw PCM over USB or 4-bit ADPCM over Wi-Fi/Fly.io, and dispatches audio to OpenAI speech (Gemini fallback).",
        zh: "按住期间以 16 kHz 采样，插线走 USB 原始 PCM、无线走 4-bit ADPCM 经 Fly.io 传至桥接端转写（OpenAI 主通道，失败切 Gemini）。",
      },
      cognitiveFriction: {
        en: "Ambient room chatter or brief thumb bumps could trigger false prompts if wake-word detection or tap-to-toggle were used.",
        zh: "若采用唤醒词或单击切换开关，室内杂音或误碰都会触发多余的 Agent 指令。",
      },
      edgeRecovery: {
        en: "Releasing below minimum hold duration discards buffer locally; command classifier separates control verbs (stop, compact, switch project) from prose prompts.",
        zh: "短于最短按压门限的误触直接在本地丢弃缓冲；指令分类器将 stop/compact/切换项目 与常规对话明确拆开。",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "bench-tested",
    },
    {
      id: "walkie-transport-switch",
      step: 3,
      title: {
        en: "Deterministic USB preemption & relay routing",
        zh: "有线 USB 优先抢占与端到端加密中继路由",
      },
      shortTitle: {
        en: "USB preemption",
        zh: "USB 优先",
      },
      trigger: {
        en: "USB-C cable is plugged in at the desk or unplugged to move across the room",
        zh: "在桌边插上 USB-C 线缆或拔线移步客厅/沙发",
      },
      userMentalModel: {
        en: "Plugging in a cable should immediately give lowest latency without manual Wi-Fi menus; unplugging should clearly indicate when a turn is dropped.",
        zh: "插线就该立刻走稳健有线连接，拔线若打断当前这轮说话则必须明说而非悄悄丢包。",
      },
      systemAction: {
        en: "USB link immediately preempts the Fly.io wss:// relay when attached; off-cable frames stay sealed with AES-256-GCM across pinned ISRG Root X1/X2 TLS.",
        zh: "只要检测到 USB 插入立即抢占 Fly.io wss:// 中继；离缆帧全程使用 AES-256-GCM 封包并锁定 ISRG Root X1/X2 证书链。",
      },
      cognitiveFriction: {
        en: "Silent mid-turn channel stitching risks duplicate tool invocations or truncated ADPCM audio frames.",
        zh: "在单轮语音中途静默拼接双通道流，极易导致语音残帧或重复下发工具调用。",
      },
      edgeRecovery: {
        en: "Mid-turn cable transitions intentionally drop the in-flight turn and display an explicit link transition state rather than guessing.",
        zh: "单轮进行中插拔线缆会主动中止当前这轮并明确提示链路切换，绝不硬拼半截数据。",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "bench-tested",
    },
    {
      id: "walkie-wrist-approval",
      step: 4,
      title: {
        en: "Asymmetric Front/Side physical tool permission gate",
        zh: "前键批准 / 侧键拒绝的非对称实体审批门控",
      },
      shortTitle: {
        en: "Wrist approval",
        zh: "实体审批",
      },
      trigger: {
        en: "Prewarmed Claude Code session requests permission for a shell or file-write tool",
        zh: "预热中的 Claude Code 会话请求执行命令或改写文件的工具权限",
      },
      userMentalModel: {
        en: "I need a concise summary of what Claude wants to do and a deliberate physical action to approve or reject—without mistaking a deny click for an accept.",
        zh: "需要一句话听懂或看清它要改什么，再用不会按混的物理动作决定放行或拦下。",
      },
      systemAction: {
        en: "Watch enters the explicit approval queue screen showing tool summary; Front Key approves, Side Key denies with an optional spoken reason.",
        zh: "手表切入独立审批队列界面展示精简摘要；按前键放行，按侧键拒绝（并支持紧接语音口述拒绝理由）。",
      },
      cognitiveFriction: {
        en: "Streaming raw terminal diffs onto a 1.14-inch screen creates miniature scrolling fatigue and hides the critical irreversible action.",
        zh: "把完整终端 diff 塞进 1.14 寸小屏会产生逐行阅读疲劳，反而掩盖真正不可逆的破坏性命令。",
      },
      edgeRecovery: {
        en: "Complex multi-file diffs remain queued safely until user approves on wrist or returns to the full monitor.",
        zh: "遇到复杂多文件改动时队列安全挂起，既可按侧键拒绝对话微调，也可回到显示器前完整审阅。",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "bench-tested",
    },
    {
      id: "walkie-spoken-brief-and-slot",
      step: 5,
      title: {
        en: "Spoken brief return & dual-boot slot handoff",
        zh: "语音简报回传与双启动安全切区",
      },
      shortTitle: {
        en: "Spoken brief",
        zh: "语音简报",
      },
      trigger: {
        en: "Claude completes the turn or user holds both watch buttons for 3 seconds",
        zh: "Claude 完成本轮任务，或用户同时长按双键 3 秒切换应用",
      },
      userMentalModel: {
        en: "Hearing a two-sentence spoken recap lets me stay away from the monitor, while switching to the sibling app must never jeopardize either firmware.",
        zh: "听两句简报即可确认结果而不必盯屏；切去同机另一个课程项目时也不能互相破坏。",
      },
      systemAction: {
        en: "Node 24 bridge synthesizes a short spoken summary back to the wrist speaker; dual-3s hold reboots cleanly between app1 (Walkie) and app0 (On The Beat).",
        zh: "Node 24 桥接合成简短语音简报播报至手表扬声器；双键长按 3 秒安全重启切回 app0（On The Beat）。",
      },
      cognitiveFriction: {
        en: "External developer wrist ergonomics and multi-hour battery wear outside Lewis's own desk remain unverified hypotheses.",
        zh: "目前只有 Lewis 本人用过，其他开发者离桌佩戴的舒适度与整日续航尚无外部样本。",
      },
      edgeRecovery: {
        en: "Flashing scripts enforce firmware/guard.py pre-checks, blocking -t erase and -t uploadfs so sibling partitions cannot be wiped.",
        zh: "烧录链路强制先过 firmware/guard.py，自动拦截 -t erase 与 -t uploadfs，锁死双系统分区隔离。",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "observed",
    },
  ],
  stateMatrix: [
    {
      state: "normal",
      label: { en: "Normal · Connected & Paired", zh: "正常态 · 已配对在线" },
      entryCondition: {
        en: "Valid pair.key present and either USB serial or Fly.io wss:// relay handshake verified.",
        zh: "存在有效 pair.key，且 USB 串口或 Fly.io wss:// 加密中继握手成功。",
      },
      uiFeedback: {
        en: "Shows active project slug, link badge (USB or RELAY), listening/thinking state, and paged approval cards.",
        zh: "屏幕清晰显示当前项目名、链路标记（USB 或 RELAY）、录音/思考状态与分页审批卡。",
      },
      keyboardFocus: {
        en: "Front Key = PTT / Approve; Side Key = Deny / Page; Dual-3s = Switch to app0 (no screen focus trap).",
        zh: "前键 = 对讲/批准；侧键 = 拒绝/翻页；双键 3 秒 = 切换至 app0，不存在按键死锁。",
      },
      fallbackGuarantee: {
        en: "All post-PAIR frames stay sealed with AES-256-GCM; API secrets stay isolated in %APPDATA%\\walkie\\keys.env.",
        zh: "PAIR 之后全部帧走 AES-256-GCM 加密；密钥独立存放在仓库外 %APPDATA%\\walkie\\keys.env。",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "bench-tested",
    },
    {
      state: "empty",
      label: { en: "Empty · Unpaired / Idle Queue", zh: "空状态 · 未配对或队列空闲" },
      entryCondition: {
        en: "Fresh flash without pair.key, or bridge online with zero pending tool permissions.",
        zh: "新刷固件尚未写入 pair.key，或桥接在线但暂无待审批工具调用。",
      },
      uiFeedback: {
        en: "Unpaired displays explicit 30s pairing prompt; idle displays active project name and 'Hold Front to Talk'.",
        zh: "未配对态明确提示 30 秒按键确认；空闲态仅显示当前项目名与「按住前键说话」指引。",
      },
      keyboardFocus: {
        en: "Front Key initiates pairing acceptance or PTT recording; Side Key cycles project list when idle.",
        zh: "前键触发配对确认或按住录音；空闲时侧键用于切换预设项目队列。",
      },
      fallbackGuarantee: {
        en: "Refuses encrypted command execution until physical Front Key confirmation writes pair.key.",
        zh: "在未通过实体前键写入 pair.key 前，拒绝执行任何来自网络的编码指令。",
      },
      focusTags: ["ux-research", "ai-trust"],
      verifiedStatus: "bench-tested",
    },
    {
      state: "offline",
      label: { en: "Offline · Three-Way Diagnostic Split", zh: "离线态 · 三段式故障拆解" },
      entryCondition: {
        en: "Watch loses Wi-Fi, cannot reach Fly.io TLS endpoint, or relay reports desktop bridge disconnected.",
        zh: "手表无 Wi-Fi、连不上 Fly.io 节点，或云端中继反馈桌面桥接端已离线。",
      },
      uiFeedback: {
        en: "Distinct screens separate 'No Wi-Fi', 'Relay Unreachable', and 'PC Bridge Offline' instead of a generic error.",
        zh: "独立界面严格区分「无 Wi-Fi」「中继不可达」「电脑桥离线」三种断点，杜绝笼统报错。",
      },
      keyboardFocus: {
        en: "Front Key triggers immediate reconnect probe; Side Key switches diagnostic page or aborts retry.",
        zh: "前键可手动触发立即重连探测；侧键翻看诊断明细或中止等待。",
      },
      fallbackGuarantee: {
        en: "Plugging USB cable bypasses Wi-Fi & Fly.io instantly; gate-l proves 75s idle keep-alive & reconnect recovery.",
        zh: "插上 USB 线即可瞬间绕过 Wi-Fi 与中继恢复工作；gate-l 已实测 75 秒空闲保活与断线重连。",
      },
      focusTags: ["systems-hardware", "ux-research"],
      verifiedStatus: "bench-tested",
    },
    {
      state: "error",
      label: { en: "Error · Speech / Transport / Flash Guard", zh: "错误态 · 语音回退与防误擦拦截" },
      entryCondition: {
        en: "Primary OpenAI speech API fails, frame decrypt check fails, or a developer runs unsafe esptool flags.",
        zh: "OpenAI 语音主通道异常、AES-GCM 帧校验失败，或烧录命令携带危险擦除参数。",
      },
      uiFeedback: {
        en: "Speech pipeline falls back to Gemini automatically and speaks error notice if both fail; guard.py prints exact blocked flag.",
        zh: "语音管线自动回退 Gemini（双挂则语音播报提示）；guard.py 直接打印被拦截的危险参数原因。",
      },
      keyboardFocus: {
        en: "Any stuck approval card times out or accepts Side Key deny so the watch never hangs on a failed turn.",
        zh: "异常审批卡支持侧键随时拒绝脱出，避免手表界面卡死在失败轮次。",
      },
      fallbackGuarantee: {
        en: "Encrypted frames failing GCM tag check are dropped silently without feeding partial bytes to Claude.",
        zh: "未通过 GCM 完整性校验的残帧直接丢弃，绝不向 Claude 进程注入半截异常指令。",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "synthetic-gate",
    },
    {
      state: "refused",
      label: { en: "Refused · Pairing & Tool Denial", zh: "拒绝态 · 配对拒签与工具驳回" },
      entryCondition: {
        en: "User presses Side Key on pairing or tool approval, or pairing 30s timeout expires.",
        zh: "用户在配对或工具审批界面按下侧键拒绝，或 30 秒配对窗口超时。",
      },
      uiFeedback: {
        en: "Shows 'DENIED' receipt on S3, optionally captures spoken denial reason, and returns Claude tool result as rejected.",
        zh: "S3 屏幕显式给出「已拒绝」回执（可选紧接语音补充原因），并向 Claude 返回工具调用被拒。",
      },
      keyboardFocus: {
        en: "Focus returns cleanly to idle project view immediately after denial confirmation.",
        zh: "拒绝确认发送后焦点立即复位至项目空闲待机态。",
      },
      fallbackGuarantee: {
        en: "Voice alone cannot override a Side Key refusal or execute an unapproved destructive shell call.",
        zh: "纯环境语音永远无法覆盖实体侧键拒绝结果，高危命令行不会在无物理确认时执行。",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "bench-tested",
    },
  ],
  rejectionArchive: [
    {
      id: "walkie-reject-voice-yes",
      round: { en: "Protocol Design v1", zh: "协议设计第 1 版" },
      date: "2026-09",
      artifactBefore: {
        en: "Hands-free spoken confirmation ('Yes, run it') directly authorizing Claude tool calls",
        zh: "纯语音口令确认（识别到「好/同意」即自动放行 Claude 工具调用）",
      },
      failureExposed: {
        en: "Background media or nearby conversation in shared rooms can false-trigger 'yes', leaving zero tactile boundary before irreversible shell commands.",
        zh: "共享空间背景对话或视频声音极易误触发「同意」识别，不可逆命令前缺乏物理隔离手感。",
      },
      fixApplied: {
        en: "Removed voice-auto-approve completely; bound tool approval to physical Front Key and denial (+ reason) to Side Key.",
        zh: "彻底废除语音自动放行，将批准硬性绑定至实体前键、拒绝（含口述原因）绑定至侧键。",
      },
      sourceReceipt: {
        en: "protocol/frames.md + host g++ lib/ui key-gesture tests",
        zh: "protocol/frames.md 与宿主机 g++ lib/ui 按键状态机测试",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "bench-tested",
    },
    {
      id: "walkie-reject-esptool-erase",
      round: { en: "Dual-Boot S3 Safety Gate", zh: "S3 双启动刷机门禁" },
      date: "2026-10",
      artifactBefore: {
        en: "Standard PlatformIO upload workflow exposing -t erase and -t uploadfs",
        zh: "沿用默认 PlatformIO 烧录命令，允许直接执行 -t erase 与 -t uploadfs",
      },
      failureExposed: {
        en: "Sharing one M5StickS3 watch between Walkie (app1) and On The Beat (app0) meant one careless flash command could wipe the sibling coursework firmware.",
        zh: "同一块 M5StickS3 共存 Walkie（app1）与 On The Beat（app0），一条误敲的全片擦除命令会瞬间抹掉另一套固件。",
      },
      fixApplied: {
        en: "Added firmware/guard.py pre-flash check blocking -t erase and -t uploadfs, plus Dual-3s hardware slot switcher.",
        zh: "新增 firmware/guard.py 烧录前拦截器封禁 -t erase 与 -t uploadfs，并确立双键 3 秒切区规范。",
      },
      sourceReceipt: {
        en: "firmware/guard.py + gate-h / gate-p5 on-device test suites",
        zh: "firmware/guard.py 与真机 gate-h / gate-p5 验证序列",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "bench-tested",
    },
    {
      id: "walkie-reject-generic-offline",
      round: { en: "Hardware Screen UX Pass", zh: "腕表小屏诊断走查" },
      date: "2026-10",
      artifactBefore: {
        en: "Single generic 'Disconnected' banner when remote link failed away from USB",
        zh: "拔线离桌断连时只显示单一笼统的「Disconnected」提示",
      },
      failureExposed: {
        en: "Away from the desk, users could not tell whether Wi-Fi dropped, Fly.io relay was down, or the laptop went to sleep.",
        zh: "离开桌面时完全分不清是没连上 Wi-Fi、Fly.io 中继挂了，还是家里电脑休眠导致桥接离线。",
      },
      fixApplied: {
        en: "Split OFFLINE state into three explicit diagnostic screens and added gate-l 75-second keep-alive / bridge-takeover verification.",
        zh: "将离线界面拆分为三段式明确诊断，并在 gate-l 门禁实测 75 秒心跳保活与重连抢占。",
      },
      sourceReceipt: {
        en: "02-key-state-machine.svg + gate-l Fly.io relay audit",
        zh: "02-key-state-machine.svg 与 Fly.io gate-l 中继门禁记录",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "bench-tested",
    },
  ],
};
