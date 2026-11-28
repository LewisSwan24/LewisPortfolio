import type { CaseStory } from "./types";

/**
 * Sources: src/data/cases/walkie.ts (summary, narrative, designDecisions,
 * interactiveDemo, media), src/data/cases/modules/walkie-modules.ts
 * (journey, stateMatrix, rejectionArchive), src/lib/proof/case-walkie.ts
 * (summary, depth decisions, evidence, limits, pack boundaries), and the
 * walkie invariant card in src/components/case/CaseInvariantLink.tsx
 * (folded into the first decision). No photographs exist for this case.
 */
export const walkieStory: CaseStory = {
  en: {
    problem:
      "A wrist voice remote for Claude Code only earns trust when physical buttons control approvals, cloud relays carry only ciphertext, and flashing updates won't erase the sibling wristband app.",
    roleLine:
      "Solo project: interaction model, protocol constraints, hardware flashing and gate checks. AI coding tools assisted implementation across firmware and bridge.",
    result:
      "A working wrist voice remote for multi-project Claude Code sessions, keeping deliberate physical key presses as the gate for every sensitive agent action.",
    problemBody: [
      "Walkie is a voice remote for Claude Code that runs on an M5StickS3 watch. It answers Claude Code's permission prompts and short follow-ups from the wrist, for a user who has stepped away from the monitor. The watch should behave like a walkie-talkie: it only listens while a thumb holds the button.",
      "Three constraints shaped it. A voice remote cannot silently approve destructive commands, cannot leak credentials through a cloud relay, and cannot brick the other firmware (On The Beat) living on the same M5StickS3.",
      "The watch has a 1.14-inch screen and no keyboard.",
    ],
    decisions: [
      {
        id: "decision-physical-approval",
        title: "The thumb approves, never the voice",
        conflict:
          "Speech is the quickest input on a wrist, but a misheard 'yes' could approve a destructive shell command. Background media or nearby conversation in a shared room can false-trigger it.",
        chosen:
          "An asymmetric key grammar on the M5StickS3. Holding the Front Key captures press-to-talk audio locally. Claude Code tool permissions enter an explicit approval queue on the watch: Front Key approves, Side Key denies, with an optional spoken reason. Destructive agent permissions block until a watch button is physically pressed.",
        gaveUp:
          "Hands-free voice confirmation ('Yes, run it'), because speech-to-text cannot tell deliberate intent from background conversation or media audio. Mirroring the terminal on a phone, because a phone re-exposes notifications and drags a two-second decision back into desktop context switching. The cost: approvals are slightly slower than hands-free speech, and the watch has to stay charged.",
        evidence:
          "The rule is recorded in protocol/frames.md and backed by host g++ tests of the lib/ui key-gesture logic; gate-h drives 11 real screen and button scenes on the S3.",
      },
      {
        id: "decision-spoken-summary-offline",
        title: "Say it short, and say why the link dropped",
        conflict:
          "A thumb-sized wrist screen cannot carry diffs or stack traces. Raw logs overwhelm a glance, while a generic 'Disconnected' error leaves the user guessing whether Wi-Fi, the cloud relay, or the laptop failed.",
        chosen:
          "The Node 24 bridge distills replies into short spoken summaries. USB always preempts the AES-256-GCM Fly.io relay when plugged in. OFFLINE screens distinguish no Wi-Fi, relay unreachable, and PC bridge offline.",
        gaveUp:
          "Streaming full terminal output onto paginated watch cards, which turns a quick check into miniature terminal reading. A silent mid-turn USB-to-relay handover, which hides transport failures and risks partial or duplicated frames. The cost: plugging or unplugging mid-turn drops the in-flight turn, and complex code diffs still require returning to the monitor.",
        evidence:
          "gate-l ran a 75-second idle keep-alive, reconnect, and second-bridge takeover across the Fly.io wss:// relay, using a stand-in S3 and a PC.",
      },
      {
        id: "decision-flash-guard-pairing",
        title: "One watch, two apps, and neither can wipe the other",
        conflict:
          "Walkie shares one ESP32-S3 watch with On The Beat. One reckless uploadfs command could brick the other coursework device, and a leaky cloud relay could expose live repository prompts over public WebSockets.",
        chosen:
          "Walkie lives in app1 beside On The Beat in app0, and holding both keys for 3 seconds switches between them. firmware/guard.py blocks -t erase and -t uploadfs before flashing. Pairing writes the AES-256-GCM shared key to pair.key only after a physical Front Key press within 30 seconds, and the Fly.io relay routes opaque binary envelopes without decrypting them.",
        gaveUp:
          "Default full-chip flash commands and plaintext JSON relay frames, which silently erase the sibling app and expose prompts and transcripts to the relay host. A hex token typed on the tiny screen every session, which tempts developers into hardcoding secrets. The cost: custom flashing tooling, partition rebalancing if a third firmware is added, and an in-person re-pair if the workstation loses pair.key.",
        evidence:
          "gate-p5 verifies on-chip HKDF/AES-GCM self-test vectors and pairing refusal: if the 30-second countdown expires or Side Key is pressed, pairing aborts with zero key written.",
      },
    ],
    watchFor:
      "Watch the wait: switch between USB and the encrypted relay, trigger a Claude Code tool request, and nothing runs until you press Front (Enter) to approve or Side (Backspace) to deny.",
    tryLinks: [
      { href: "/lab?demo=walkie#lab-sm-title", label: "Inspect Walkie in /lab →" },
      { href: "/studio/replay?track=walkie", label: "Inspect millisecond protocol frames in Replay Studio →" },
    ],
    built: {
      body: [
        "PlatformIO C++ firmware runs on the M5StickS3. Holding the Front Key samples 16 kHz audio, sent as PCM over USB or as 4-bit ADPCM over Wi-Fi and the Fly.io relay. Every frame after HELLO and PAIR is sealed with AES-256-GCM under a session key derived from pair.key.",
        "The Node 24 bridge prewarms one Claude Code process per configured project, routes recordings through OpenAI speech (Gemini on failure), separates control commands such as yes, no [reason] and stop from prompts, and speaks the reply back to the wrist. API keys live outside the repository in %APPDATA%\\walkie\\keys.env and are never printed.",
      ],
      tested: [
        "Host tests: before touching hardware, npm test runs the wire framing (lib/proto) and the key, paging and state-machine logic (lib/ui) through g++ on the PC. Automated tests run against a fake-claude.js stand-in, never live paid APIs.",
        "On the physical S3: gate-h checks the screens and keys through TEST frames, and gate-p5 checks pairing and 4-bit ADPCM audio takes.",
        "Relay: check-relay-roots pins the ISRG Root X1/X2 certificates, and gate-l needs no COM port.",
        "Not run: the three OFFLINE screens exist in code, but the on-device checks away from the cable (gates M and N) have not been run.",
      ],
      states: [
        {
          state: "Normal",
          what: "Paired and connected: the screen shows the active project, a USB or RELAY badge, listening or thinking, and paged approval cards.",
          recovery: "All post-PAIR frames stay sealed with AES-256-GCM.",
        },
        {
          state: "Empty",
          what: "With no pair.key yet, a 30-second pairing prompt; when idle, the project name and 'Hold Front to Talk'.",
          recovery: "Encrypted commands are refused until a physical Front Key confirmation writes pair.key.",
        },
        {
          state: "Offline",
          what: "No Wi-Fi, an unreachable Fly.io endpoint, or a disconnected desktop bridge, each on its own screen.",
          recovery: "Plugging in USB bypasses Wi-Fi and the relay; Front Key probes a reconnect.",
        },
        {
          state: "Error",
          what: "The OpenAI speech API fails, a frame fails its decrypt check, or someone runs unsafe esptool flags.",
          recovery: "Speech falls back to Gemini, frames failing the GCM tag check are dropped, and guard.py prints the exact blocked flag.",
        },
        {
          state: "Refused",
          what: "Side Key on a pairing or approval screen, or a pairing timeout: a 'DENIED' receipt, with an optional spoken reason.",
          recovery: "Claude gets the tool result as rejected, and voice alone cannot override a Side Key refusal.",
        },
      ],
    },
    outcome: {
      body: [
        "A working dual-boot wrist voice remote with sealed USB and Wi-Fi relay transports and multi-project Claude session switching, publicly documented in LewisSwan24/walkie. The encryption is verified by the gate-p5 and gate-l scripts, with no external security audit.",
        "Building hardware for an AI coding agent forced every vague UX idea into a concrete wire frame or button rule. When the screen is tiny and there is no keyboard, you discover quickly which agent states truly matter: listening, waiting on approval, which project is active, and why the link dropped.",
      ],
      limits: [
        {
          title: "Single developer (Lewis) has used it; no external user study has been run.",
          body: "Tiny-screen paging and voice-approval ergonomics are untested with other engineers.",
        },
        {
          title: "No wrist photographs or live video clips are committed in the repository yet.",
          body: "Readers see the architecture schematic rather than physical form-factor photos.",
        },
        {
          title: "AI coding tools assisted implementation across firmware and bridge.",
          body: "The portfolio claim is interaction design, security boundaries, and verification gates, not solo hand-typed C++.",
        },
      ],
      next:
        "Have 2–3 Claude Code users test an approval-heavy session away from their desk, check standby battery pacing, and photograph the watch in everyday desk-side use.",
    },
  },
  zh: {
    problem:
      "手腕上的 Claude Code 语音遥控，前提是实体按键握住最终审批权，云端中继只看得到密文。更新固件时，也不能误删同一支表里原本装着的项目。",
    roleLine:
      "独立项目。交互模型、协议约束、固件刷写与硬件门禁验收由我负责；固件与桥接代码由 AI 编码工具辅助实现。",
    result:
      "做出了一套真正跑通的多项目 Claude Code 手腕语音遥控交互。看一眼小屏，按一下实体键，就能稳妥放行或拒绝高风险操作。",
    problemBody: [
      "Walkie 是跑在 M5StickS3 手表上的 Claude Code 语音遥控器。用户离开显示器后，可以在手腕上回应 Claude Code 的权限确认和简短追问。手表要像对讲机一样，只有拇指按住期间才录音。",
      "设计受三条约束。语音遥控不能静默放行高风险操作，也不能把会话明文暴露给云端中继。刷机时，不能误擦同一块 M5StickS3 上的另一个项目（On The Beat）。",
      "手表只有 1.14 寸屏幕，没有键盘。",
    ],
    decisions: [
      {
        id: "decision-physical-approval",
        title: "放行靠拇指按键，语音只管提需求",
        conflict:
          "在手腕上，说话是最快的输入方式。可是一句听错的「同意」，就可能放行一条危险的命令行。共享空间里的背景对话或视频声音，都可能误触发识别。",
        chosen:
          "在 M5StickS3 上建立非对称实体按键语法。前键按住说话，音频在本地采集。Claude Code 工具权限进入手表上的独立审批队列：前键批准，侧键拒绝，并可口述原因。高风险权限必须等手表实体键确认才会放行。",
        gaveUp:
          "纯语音口令确认（识别到「同意」即执行）：语音转文字无法区分环境旁白与刻意授权。在手机上重开完整终端：掏出手机就会遇到各类通知，把 2 秒钟的决策拖回桌面级的注意力碎片里。代价是响应比纯语音慢半拍，手表也要一直保持有电。",
        evidence:
          "这条规则写进 protocol/frames.md，并有宿主机 g++ 的 lib/ui 按键手势测试；gate-h 在真机上跑完 11 个屏幕与按键场景。",
      },
      {
        id: "decision-spoken-summary-offline",
        title: "回传只说一句摘要，断线要讲清原因",
        conflict:
          "拇指大小的腕表屏幕装不下代码 diff 与堆栈。塞满滚动文本就没法一眼看清。笼统的一句「已断线」，只会让人盲猜是 Wi-Fi、云中继还是电脑出了问题。",
        chosen:
          "Node 24 桥接把执行结果收敛为简短语音简报，回传手腕。插线时 USB 永远抢占 AES-256-GCM 加密的 Fly.io 中继。离线界面明确区分无 Wi-Fi、中继不可达与电脑桥离线三种状态。",
        gaveUp:
          "把完整终端输出分页推到手表：翻几十页字符，一次快速查看就变成缩小版的终端阅读。单轮对话中途静默切换 USB 与中继：容易掩盖传输异常，双通道还可能产生残帧或重复指令。代价是中途插拔 USB 会主动放弃当前这轮，复杂代码审查依然要回到电脑屏幕前完成。",
        evidence:
          "gate-l 用一台替身 S3 和电脑，在 Fly.io wss:// 中继上验证了 75 秒空闲保活、断线重连与第二个桥接的抢占。",
      },
      {
        id: "decision-flash-guard-pairing",
        title: "一块表装两个应用，谁也擦不掉谁",
        conflict:
          "Walkie 与 On The Beat 共享同一块 M5StickS3。一次失误的擦除命令会毁掉另一套课程原型；明文云端中继则会把私密仓库上下文暴露在公网。",
        chosen:
          "Walkie 驻留 app1，On The Beat 留在 app0，双键长按 3 秒即可切换。firmware/guard.py 在烧录前拦截 -t erase 与 -t uploadfs。配对须在 30 秒内按下手表前键，AES-256-GCM 共享密钥才会写入 pair.key。Fly.io 只转发无法解密的二进制信封。",
        gaveUp:
          "沿用默认全片擦除烧录命令，并用明文 WebSocket 转发 JSON。这样每次刷写都会无声抹掉同机的另一套系统，中继服务也能直接看到语音与命令内容。每次连接都在小屏上手输十六进制配对码：反而诱导开发者写死明文密钥。代价是要维护自定义刷机脚本。以后塞入第三套固件，仍需重新平衡分区表。电脑端一旦丢失 pair.key，就必须当面重走配对流程。",
        evidence:
          "gate-p5 验证了芯片内 HKDF/AES-GCM 测试向量与配对拒绝：30 秒超时或按下侧键，配对立即中止，不写入任何密钥文件。",
      },
    ],
    watchFor:
      "注意看等待：切换 USB 有线或加密中继，在右侧触发一条 Claude Code 请求。在你按下前键（Enter）批准或侧键（Backspace）拒绝之前，什么都不会执行。",
    tryLinks: [
      { href: "/lab?demo=walkie#lab-sm-title", label: "前往 /lab 走查 Walkie 状态机 →" },
      { href: "/studio/replay?track=walkie", label: "进入硬件协议帧步进重放工作台 →" },
    ],
    built: {
      body: [
        "PlatformIO C++ 固件跑在 M5StickS3 上。按住前键采集 16 kHz 录音：插线时走 USB 原始 PCM，离缆后经 Wi-Fi 与 Fly.io 中继传输，可选 4-bit ADPCM。除 HELLO 与 PAIR 外，所有帧都用 pair.key 派生的会话密钥做 AES-256-GCM 加密。",
        "Node 24 桥接为每个配置好的项目预热独立的 Claude Code 进程。录音经 OpenAI 语音接口处理，失败时自动回退 Gemini。桥接区分同意、拒绝、停止等控制指令与对话内容，再把摘要语音回传手表。API 密钥放在仓库外的 %APPDATA%\\walkie\\keys.env，永不打印到日志。",
      ],
      tested: [
        "宿主机测试：刷入硬件之前，npm test 先调 g++ 在 PC 端编译运行线协议封包（lib/proto）与按键、分页、状态机逻辑（lib/ui）。自动化测试使用 fake-claude.js 替身进程，不消耗真实付费 API。",
        "S3 真机：gate-h 通过 TEST 帧检查画面与按键，gate-p5 检查配对与 4-bit ADPCM 录音。",
        "中继：check-relay-roots 校验 ISRG Root X1/X2 证书链；gate-l 不需要 COM 口。",
        "还没做：代码里有三个离线画面，但离开数据线的真机检查（gate M、N）还没做。",
      ],
      states: [
        {
          state: "正常",
          what: "已配对且在线。屏幕显示当前项目名、USB 或 RELAY 标记、录音或思考状态与分页审批卡。",
          recovery: "PAIR 之后全部帧走 AES-256-GCM 加密。",
        },
        {
          state: "空状态",
          what: "新刷固件尚未写入 pair.key 时，明确提示 30 秒按键确认；空闲时只显示项目名与「按住前键说话」。",
          recovery: "实体前键写入 pair.key 之前，拒绝执行任何来自网络的编码指令。",
        },
        {
          state: "离线",
          what: "手表无 Wi-Fi、连不上 Fly.io 节点，或桌面桥接已离线，三种断点各有独立界面。",
          recovery: "插上 USB 线即可绕过 Wi-Fi 与中继；前键可手动触发立即重连探测。",
        },
        {
          state: "错误",
          what: "OpenAI 语音主通道异常、AES-GCM 帧校验失败，或烧录命令带着危险擦除参数。",
          recovery: "语音自动回退 Gemini，未通过 GCM 校验的残帧直接丢弃；guard.py 打印拦下的参数。",
        },
        {
          state: "拒绝",
          what: "在配对或审批界面按下侧键，或配对超时。屏幕给出「已拒绝」回执，可以紧接着口述原因。",
          recovery: "Claude 收到工具调用遭拒的结果；纯语音永远无法覆盖侧键的拒绝。",
        },
      ],
    },
    outcome: {
      body: [
        "完成了一台能用的双启动手腕语音遥控器，跑通有线 USB 与加密云中继两种传输，以及多项目对话切换。项目公开记录在 LewisSwan24/walkie。加密由 gate-p5 与 gate-l 脚本验证，未经过外部安全审计。",
        "为编码 Agent 做硬件交互，会逼着你把所有模糊的 UX 想法压缩成清晰的帧协议和按键规则。屏幕只有拇指大小、没有键盘时，哪些 Agent 状态真正不可或缺，会立刻浮出水面。那就是正在听、等待审批、当前在哪个项目，以及为什么断连。",
      ],
      limits: [
        {
          title: "仅由 Lewis 本人使用，尚未开展外部用户测试。",
          body: "微屏分页阅读与语音审批在他人手中的可用性尚未验证。",
        },
        {
          title: "仓库尚未归档手腕屏幕实拍照片或运行录像。",
          body: "读者目前看到的是源码架构图，没有实体外观照片。",
        },
        {
          title: "固件与桥接代码由 AI 编码工具辅助实现。",
          body: "本案例主张的是交互规则、安全边界与验收门禁，纯手写 C++ 不在主张之内。",
        },
      ],
      next: "邀请 2–3 位 Claude Code 用户在离桌场景下完成一轮审批任务，实测离桌待机续航，并补拍日常桌边佩戴的真机照片。",
    },
  },
};
