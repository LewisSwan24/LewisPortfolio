import { getApplicationPacket } from "./application-packets";
import { getFollowThroughBrief } from "./follow-through";
import { getProofHandoffExport } from "./handoff-export";
import { getProofHandoffManifest } from "./handoff";
import { getProofMaintenanceReport } from "./maintenance";
import { getProofReleaseBundle } from "./release-bundle";
import { getRolePackets } from "./role-packets";
import { getProofValidationReport } from "./validation";
import type {
  HiringRoleId,
  ProofLocale,
  ProofReviewCommand,
  ProofReviewHero,
  ProofReviewRoom,
  ProofReviewSignal,
} from "./types";

const reviewCopy = {
  en: {
    hero: {
      eyebrow: "Stage 22 proof review",
      headline: "Proof review room for hiring decisions.",
      subhead:
        "A single review surface for role fit, application packets, follow-through plans, proof anchors, and release-readiness checks.",
      readyStatus:
        "Proof is ready for recruiter review: validation is clean, maintenance is fresh, and the handoff bundle is available locally.",
      blockedStatus:
        "Proof needs review before recruiter handoff. Use the command checklist to find the blocked gate.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Compare role paths", href: "/hire/compare" },
    },
    signals: {
      validation: "Validation",
      maintenance: "Maintenance",
      handoff: "Handoff",
      export: "Export",
      bundle: "Bundle",
    },
    commandLabels: {
      "pnpm proof:validate": "Release gate",
      "pnpm proof:handoff": "Handoff manifest",
      "pnpm proof:export": "Markdown export",
      "pnpm proof:bundle": "Local bundle",
    },
    commandDetails: {
      "pnpm proof:validate": "Checks routes, anchors, locale parity, and maintenance coverage.",
      "pnpm proof:handoff": "Summarizes role routes and readiness before sharing proof.",
      "pnpm proof:export": "Prints the deterministic Markdown handoff for review.",
      "pnpm proof:bundle": "Writes ignored Markdown and JSON artifacts under docs/proof-release.",
    },
    readingSequence: [
      {
        id: "status",
        label: "01",
        title: "Check readiness first",
        body: "Read validation, maintenance, handoff, export, and bundle status before opening role pages.",
        href: "#proof-review-commands",
        actionLabel: "Review commands",
      },
      {
        id: "role",
        label: "02",
        title: "Pick the hiring lane",
        body: "Choose the role card that matches the opening, then open the role room or application packet.",
        href: "#proof-review-roles",
        actionLabel: "Compare roles",
      },
      {
        id: "anchor",
        label: "03",
        title: "Inspect real proof anchors",
        body: "Use the anchor ledger to jump directly into case evidence instead of reading the whole portfolio.",
        href: "#proof-review-anchors",
        actionLabel: "Open anchors",
      },
      {
        id: "contact",
        label: "04",
        title: "Send a focused interview ask",
        body: "Use the follow-through route or contact page once the role and strongest case are clear.",
        href: "/contact",
        actionLabel: "Contact Lewis",
      },
    ],
    bundleLabel: "Local release bundle",
    bundleSummary:
      "Generated artifacts are local review aids only. They are ignored by git and should be regenerated before release review.",
    closeTitle: "Use the proof room as the hiring table of contents.",
    closeBody:
      "Start from the role, verify one anchor, then send a focused note with the role context already attached.",
    closePrimary: { label: "Contact Lewis", href: "/contact" },
    closeSecondary: { label: "Back to hire room", href: "/hire" },
  },
  zh: {
    hero: {
      eyebrow: "Stage 22 proof review",
      headline: "Proof review room：招聘评审总览。",
      subhead:
        "把岗位匹配、申请包、后续沟通计划、证据锚点和发布检查集中到一个可读页面。",
      readyStatus:
        "Proof 已准备好给招聘方查看：验证干净、维护新鲜，交接发布包也可以本地生成。",
      blockedStatus: "Proof 还需要检查。请先看命令清单，找出被阻塞的 gate。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "比较岗位路径", href: "/hire/compare" },
    },
    signals: {
      validation: "验证",
      maintenance: "维护",
      handoff: "交接",
      export: "导出",
      bundle: "发布包",
    },
    commandLabels: {
      "pnpm proof:validate": "发布 gate",
      "pnpm proof:handoff": "交接清单",
      "pnpm proof:export": "Markdown 导出",
      "pnpm proof:bundle": "本地发布包",
    },
    commandDetails: {
      "pnpm proof:validate": "检查路由、锚点、中英结构一致性和维护覆盖。",
      "pnpm proof:handoff": "在分享 proof 前总结岗位路径和准备状态。",
      "pnpm proof:export": "打印稳定的 Markdown 交接内容，方便评审。",
      "pnpm proof:bundle": "在 docs/proof-release 下写入被 git 忽略的 Markdown 和 JSON。",
    },
    readingSequence: [
      {
        id: "status",
        label: "01",
        title: "先看 readiness",
        body: "先确认 validation、maintenance、handoff、export 和 bundle 状态，再打开岗位页面。",
        href: "#proof-review-commands",
        actionLabel: "查看命令",
      },
      {
        id: "role",
        label: "02",
        title: "选择招聘岗位",
        body: "选择最接近 JD 的岗位卡片，再打开 role room 或 application packet。",
        href: "#proof-review-roles",
        actionLabel: "比较岗位",
      },
      {
        id: "anchor",
        label: "03",
        title: "检查真实证据锚点",
        body: "用 anchor ledger 直接跳到案例证据，不需要从头读完整个作品集。",
        href: "#proof-review-anchors",
        actionLabel: "打开锚点",
      },
      {
        id: "contact",
        label: "04",
        title: "发送聚焦的面试请求",
        body: "岗位和最强案例清楚后，再用 follow-through 或 contact 页面联系。",
        href: "/contact",
        actionLabel: "联系 Lewis",
      },
    ],
    bundleLabel: "本地 release bundle",
    bundleSummary:
      "生成文件只用于本地评审，已被 git 忽略；正式评审前请重新生成。",
    closeTitle: "把 proof room 当成招聘阅读目录。",
    closeBody: "先选岗位，再验证一个 anchor，最后带着岗位上下文发送清晰的联系信息。",
    closePrimary: { label: "联系 Lewis", href: "/contact" },
    closeSecondary: { label: "回到 hire room", href: "/hire" },
  },
} as const;

function commandStatus(ok: boolean) {
  return ok ? "ready" : "blocked";
}

function buildHero(locale: ProofLocale, ok: boolean): ProofReviewHero {
  const copy = reviewCopy[locale].hero;

  return {
    eyebrow: copy.eyebrow,
    headline: copy.headline,
    subhead: copy.subhead,
    status: ok ? copy.readyStatus : copy.blockedStatus,
    primaryAction: copy.primaryAction,
    secondaryAction: copy.secondaryAction,
  };
}

function buildCommands(locale: ProofLocale, ok: boolean): ProofReviewCommand[] {
  const copy = reviewCopy[locale];
  const commands = [
    "pnpm proof:validate",
    "pnpm proof:handoff",
    "pnpm proof:export",
    "pnpm proof:bundle",
  ];

  return commands.map((command) => ({
    command,
    label: copy.commandLabels[command as keyof typeof copy.commandLabels],
    detail: copy.commandDetails[command as keyof typeof copy.commandDetails],
    status: commandStatus(ok),
  }));
}

function buildSignals({
  locale,
  validationOk,
  validationRoutes,
  validationAnchors,
  maintenanceFresh,
  maintenanceTotal,
  handoffRoles,
  exportFilename,
  bundleOutputDir,
}: {
  locale: ProofLocale;
  validationOk: boolean;
  validationRoutes: number;
  validationAnchors: number;
  maintenanceFresh: number;
  maintenanceTotal: number;
  handoffRoles: number;
  exportFilename: string;
  bundleOutputDir: string;
}): ProofReviewSignal[] {
  const labels = reviewCopy[locale].signals;

  return [
    {
      id: "validation",
      label: labels.validation,
      value: validationOk ? "Ready" : "Blocked",
      detail: `${validationRoutes} routes, ${validationAnchors} anchors checked`,
      status: commandStatus(validationOk),
    },
    {
      id: "maintenance",
      label: labels.maintenance,
      value: `${maintenanceFresh}/${maintenanceTotal}`,
      detail: "fresh proof surfaces",
      status: commandStatus(maintenanceFresh === maintenanceTotal),
    },
    {
      id: "handoff",
      label: labels.handoff,
      value: `${handoffRoles} roles`,
      detail: "role, packet, and follow-through paths ready",
      status: commandStatus(handoffRoles > 0),
    },
    {
      id: "export",
      label: labels.export,
      value: "Markdown",
      detail: exportFilename,
      status: "ready",
    },
    {
      id: "bundle",
      label: labels.bundle,
      value: "Local",
      detail: bundleOutputDir,
      status: "ready",
    },
  ];
}

function assertRoleData(role: HiringRoleId, locale: ProofLocale) {
  const packet = getRolePackets(locale).find((candidate) => candidate.id === role);
  const applicationPacket = getApplicationPacket(role, locale);
  const followThrough = getFollowThroughBrief(role, locale);

  if (!packet || !applicationPacket || !followThrough) {
    throw new Error(`Missing proof review data for ${role}`);
  }

  return { packet, applicationPacket, followThrough };
}

export function getProofReviewRoom(
  locale: ProofLocale,
  generatedAt = new Date().toISOString().slice(0, 10)
): ProofReviewRoom {
  const validation = getProofValidationReport(generatedAt);
  const maintenance = getProofMaintenanceReport(generatedAt);
  const handoff = getProofHandoffManifest(generatedAt);
  const handoffExport = getProofHandoffExport(generatedAt);
  const bundle = getProofReleaseBundle(generatedAt);
  const ok = validation.ok && handoff.status === "ready" && bundle.status === "ready";
  const rolePackets = getRolePackets(locale);
  const roles = rolePackets.map((rolePacket) => {
    const { packet, applicationPacket, followThrough } = assertRoleData(
      rolePacket.id,
      locale
    );
    const anchorHrefs = packet.proofClaims.map((claim) => claim.strongestAnchor);

    return {
      id: packet.id,
      label: packet.label,
      fitThesis: packet.fitThesis,
      roleRoute: packet.route,
      packetRoute: applicationPacket.route,
      followThroughRoute: followThrough.route,
      contactRoute: `/contact?role=${packet.id}` as const,
      strongestCases: packet.strongestCases,
      claimCount: packet.proofClaims.length,
      proofAnchorCount: anchorHrefs.length,
      anchorHrefs,
      primaryClaim: packet.proofClaims[0]?.claim ?? packet.fitThesis,
    };
  });
  const anchorLedger = rolePackets.flatMap((packet) =>
    packet.proofClaims.map((claim) => ({
      id: `${packet.id}-${claim.id}`,
      roleId: packet.id,
      roleLabel: packet.label,
      claim: claim.claim,
      evidence: claim.evidence,
      boundary: claim.boundary,
      href: claim.strongestAnchor,
    }))
  );
  const copy = reviewCopy[locale];

  return {
    generatedAt,
    locale,
    status: ok ? "ready" : "blocked",
    hero: buildHero(locale, ok),
    signals: buildSignals({
      locale,
      validationOk: validation.ok,
      validationRoutes: validation.checkedRoutes.length,
      validationAnchors: validation.checkedAnchors,
      maintenanceFresh: maintenance.fresh.length,
      maintenanceTotal: maintenance.entries.length,
      handoffRoles: handoff.roles.length,
      exportFilename: handoffExport.filename,
      bundleOutputDir: bundle.outputDir,
    }),
    commands: buildCommands(locale, ok),
    roles,
    anchorLedger,
    readingSequence: copy.readingSequence.map((step) => ({ ...step })),
    bundle: {
      label: copy.bundleLabel,
      outputDir: bundle.outputDir,
      handoffFilename: bundle.handoff.filename,
      manifestFilename:
        bundle.artifacts.find((artifact) => artifact.kind === "release-manifest")?.filename ??
        `${bundle.label}.json`,
      summary: copy.bundleSummary,
    },
    close: {
      title: copy.closeTitle,
      body: copy.closeBody,
      primaryAction: copy.closePrimary,
      secondaryAction: copy.closeSecondary,
    },
  };
}
