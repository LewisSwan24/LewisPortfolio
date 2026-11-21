import { hiringRoleIds, projectEvidenceSlugs } from "./anchors";
import { getApplicationPackets } from "./application-packets";
import { getCaseReaderGuide } from "./case-depth";
import { getFollowThroughBriefs } from "./follow-through";
import { getProofMaintenanceEntries } from "./maintenance";
import { getRolePackets } from "./role-packets";
import type {
  ApplicationPacketRoute,
  CaseReaderHref,
  ConsolidatedHiringView,
  FollowThroughRoute,
  HiringRoleId,
  ProjectEvidenceSlug,
  ProofLocale,
  ProofMaintenanceSurface,
  ProofValidationIssue,
  ProofValidationReport,
} from "./types";

const CONSOLIDATED_HIRING_VIEWS: readonly ConsolidatedHiringView[] = [
  "review",
  "compare",
  "interview",
  "scorecard",
  "shortlist",
  "debrief",
  "decision",
  "offer",
  "onboarding",
  "kickoff",
  "impact",
  "growth",
  "retention",
  "partnership",
  "command",
  "briefing",
  "readiness",
  "action",
  "tracker",
];

const locales: ProofLocale[] = ["en", "zh"];
// Derived rather than hand-listed: the literal that used to sit here still said
// connect/spectra/ai/circles after MazeRunners shipped, so every /projects/maze
// anchor silently failed validation instead of being checked.
const projectSlugs: readonly ProjectEvidenceSlug[] = projectEvidenceSlugs;

function addIssue(
  issues: ProofValidationIssue[],
  issue: ProofValidationIssue
) {
  issues.push(issue);
}

function roleRoute(role: HiringRoleId): `/hire?role=${HiringRoleId}` {
  return `/hire?role=${role}`;
}

function packetRoute(role: HiringRoleId): ApplicationPacketRoute {
  return `/contact?role=${role}`;
}

function followThroughRoute(role: HiringRoleId): FollowThroughRoute {
  return `/contact?role=${role}&intent=interview`;
}

function parseCaseAnchor(href: string) {
  const [, slug, anchorId] = href.match(/^\/projects\/([^#]+)#(.+)$/) ?? [];

  if (!slug || !anchorId || !projectSlugs.includes(slug as ProjectEvidenceSlug)) {
    return undefined;
  }

  return { slug: slug as ProjectEvidenceSlug, anchorId };
}

function isValidCaseAnchor(href: string, locale: ProofLocale): href is CaseReaderHref {
  const parsed = parseCaseAnchor(href);
  if (!parsed) return false;

  const guide = getCaseReaderGuide(parsed.slug, locale);
  return guide.sections.some((section) => section.id === parsed.anchorId);
}

function isValidProofRoute(href: string) {
  if (CONSOLIDATED_HIRING_VIEWS.some((view) => href === `/hire?view=${view}`)) {
    return true;
  }

  return hiringRoleIds.some(
    (role) =>
      href === roleRoute(role) ||
      href === packetRoute(role) ||
      href === followThroughRoute(role) ||
      href === `/contact?role=${role}` ||
      href === `/contact?role=${role}&intent=interview` ||
      href === `/contact?role=${role}&intent=scorecard` ||
      href === `/contact?role=${role}&intent=debrief` ||
      href === `/contact?role=${role}&intent=decision` ||
      href === `/contact?role=${role}&intent=offer` ||
      href === `/contact?role=${role}&intent=onboarding` ||
      href === `/contact?role=${role}&intent=kickoff` ||
      href === `/contact?role=${role}&intent=impact` ||
      href === `/contact?role=${role}&intent=growth` ||
      href === `/contact?role=${role}&intent=retention` ||
      href === `/contact?role=${role}&intent=partnership` ||
      href === `/contact?role=${role}&intent=command` ||
      href === `/contact?role=${role}&intent=briefing` ||
      href === `/contact?role=${role}&intent=readiness` ||
      href === `/contact?role=${role}&intent=action` ||
      href === `/contact?role=${role}&intent=tracker`
  );
}

function validateAnchor(
  issues: ProofValidationIssue[],
  href: string,
  locale: ProofLocale,
  area: string,
  id: string,
  roleId?: HiringRoleId
) {
  if (isValidCaseAnchor(href, locale)) return 1;

  addIssue(issues, {
    id,
    severity: "error",
    area,
    message: `Invalid proof anchor: ${href}`,
    locale,
    roleId,
    href,
  });

  return 0;
}

export function getProofValidationReport(
  generatedAt = new Date().toISOString().slice(0, 10)
): ProofValidationReport {
  const issues: ProofValidationIssue[] = [];
  const checkedRoutes = new Set<string>();
  let checkedAnchors = 0;

  const enPackets = getRolePackets("en");
  const zhPackets = getRolePackets("zh");

  for (const locale of locales) {
    const packets = getRolePackets(locale);
    const packetIds = packets.map((packet) => packet.id);

    if (packetIds.join("|") !== hiringRoleIds.join("|")) {
      addIssue(issues, {
        id: `${locale}-role-id-parity`,
        severity: "error",
        area: "role-packets",
        message: `Role packet ids do not match hiringRoleIds for ${locale}.`,
        locale,
      });
    }

    for (const packet of packets) {
      checkedRoutes.add(packet.route);

      for (const claim of packet.proofClaims) {
        checkedAnchors += validateAnchor(
          issues,
          claim.strongestAnchor,
          locale,
          "role-claim-anchor",
          `${locale}-${packet.id}-${claim.id}-anchor`,
          packet.id
        );
      }
    }

    for (const packet of getApplicationPackets(locale)) {
      checkedRoutes.add(packet.route);

      for (const proof of packet.proof) {
        checkedAnchors += validateAnchor(
          issues,
          proof.href,
          locale,
          "application-packet-anchor",
          `${locale}-${packet.id}-${proof.id}-packet-anchor`,
          packet.id
        );
      }
    }

    for (const brief of getFollowThroughBriefs(locale)) {
      checkedRoutes.add(brief.route);

      for (const evidence of brief.preCallEvidence) {
        checkedAnchors += validateAnchor(
          issues,
          evidence.href,
          locale,
          "follow-through-anchor",
          `${locale}-${brief.id}-${evidence.id}-follow-anchor`,
          brief.id
        );
      }
    }
  }

  if (zhPackets.map((packet) => packet.id).join("|") !== enPackets.map((packet) => packet.id).join("|")) {
    addIssue(issues, {
      id: "locale-role-packet-parity",
      severity: "error",
      area: "locale-parity",
      message: "English and Chinese role packet ids are not aligned.",
    });
  }

  for (const enPacket of enPackets) {
    const zhPacket = zhPackets.find((packet) => packet.id === enPacket.id);
    const enClaimIds = enPacket.proofClaims.map((claim) => claim.id);
    const zhClaimIds = zhPacket?.proofClaims.map((claim) => claim.id) ?? [];

    if (enClaimIds.join("|") !== zhClaimIds.join("|")) {
      addIssue(issues, {
        id: `${enPacket.id}-claim-locale-parity`,
        severity: "error",
        area: "locale-parity",
        message: `English and Chinese claim ids are not aligned for ${enPacket.id}.`,
        roleId: enPacket.id,
      });
    }
  }

  const maintenanceEntries = getProofMaintenanceEntries();
  const roleClaimKeys = new Set(
    enPackets.flatMap((packet) =>
      packet.proofClaims.map((claim) => `${packet.id}:${claim.id}`)
    )
  );
  const maintainedRoleClaimKeys = new Set(
    maintenanceEntries
      .filter((entry) => entry.surface === "role-room")
      .map((entry) => `${entry.roleId}:${entry.claimId}`)
  );
  const maintenanceHrefs = new Set(maintenanceEntries.map((entry) => entry.href));
  const consolidatedSurfaceChecks: Array<{
    surface: ProofMaintenanceSurface;
    view: ConsolidatedHiringView;
    issueSuffix: string;
    label: string;
  }> = [
    { surface: "review-room", view: "review", issueSuffix: "proof-review", label: "role card" },
    { surface: "role-comparison", view: "compare", issueSuffix: "role-comparison", label: "role lane" },
    { surface: "interview-agenda", view: "interview", issueSuffix: "interview-agenda", label: "agenda card" },
    { surface: "hiring-scorecard", view: "scorecard", issueSuffix: "hiring-scorecard", label: "scorecard lane" },
    { surface: "hiring-shortlist", view: "shortlist", issueSuffix: "hiring-shortlist", label: "shortlist memo lane" },
    { surface: "hiring-debrief", view: "debrief", issueSuffix: "hiring-debrief", label: "manager debrief lane" },
    { surface: "hiring-decision", view: "decision", issueSuffix: "hiring-decision", label: "decision pack lane" },
    { surface: "hiring-offer", view: "offer", issueSuffix: "hiring-offer", label: "offer readiness lane" },
    { surface: "hiring-onboarding", view: "onboarding", issueSuffix: "hiring-onboarding", label: "onboarding readiness lane" },
    { surface: "hiring-kickoff", view: "kickoff", issueSuffix: "hiring-kickoff", label: "kickoff alignment lane" },
    { surface: "hiring-impact", view: "impact", issueSuffix: "hiring-impact", label: "early impact lane" },
    { surface: "hiring-growth", view: "growth", issueSuffix: "hiring-growth", label: "growth roadmap lane" },
    { surface: "hiring-retention", view: "retention", issueSuffix: "hiring-retention", label: "retention readiness lane" },
    { surface: "hiring-partnership", view: "partnership", issueSuffix: "hiring-partnership", label: "partnership operating lane" },
    { surface: "hiring-command", view: "command", issueSuffix: "hiring-command", label: "command lane" },
    { surface: "hiring-briefing", view: "briefing", issueSuffix: "hiring-briefing", label: "briefing lane" },
    { surface: "hiring-readiness", view: "readiness", issueSuffix: "hiring-readiness", label: "readiness lane" },
    { surface: "hiring-action", view: "action", issueSuffix: "hiring-action", label: "action lane" },
    { surface: "hiring-tracker", view: "tracker", issueSuffix: "hiring-tracker", label: "tracker lane" },
  ];

  const maintainedRolesBySurface = new Map(
    consolidatedSurfaceChecks.map((check) => [
      check.surface,
      new Set(
        maintenanceEntries
          .filter((entry) => entry.surface === check.surface)
          .map((entry) => entry.roleId)
      ),
    ])
  );

  for (const check of consolidatedSurfaceChecks) {
    checkedRoutes.add(`/hire?view=${check.view}`);
  }

  for (const key of Array.from(roleClaimKeys)) {
    if (!maintainedRoleClaimKeys.has(key)) {
      addIssue(issues, {
        id: `${key}-maintenance-missing`,
        severity: "error",
        area: "maintenance",
        message: `Missing maintenance entry for role claim ${key}.`,
      });
    }
  }

  for (const role of hiringRoleIds) {
    const requiredRoutes = [roleRoute(role), packetRoute(role), followThroughRoute(role)];

    for (const route of requiredRoutes) {
      checkedRoutes.add(route);
    }

    if (!maintenanceHrefs.has(packetRoute(role))) {
      addIssue(issues, {
        id: `${role}-packet-maintenance-missing`,
        severity: "error",
        area: "maintenance",
        message: `Missing maintenance entry for ${packetRoute(role)}.`,
        roleId: role,
        href: packetRoute(role),
      });
    }

    if (!maintenanceHrefs.has(followThroughRoute(role))) {
      addIssue(issues, {
        id: `${role}-follow-through-maintenance-missing`,
        severity: "error",
        area: "maintenance",
        message: `Missing maintenance entry for ${followThroughRoute(role)}.`,
        roleId: role,
        href: followThroughRoute(role),
      });
    }

    for (const check of consolidatedSurfaceChecks) {
      const maintainedRoles = maintainedRolesBySurface.get(check.surface);
      const route = `/hire?view=${check.view}`;
      if (!maintainedRoles?.has(role)) {
        addIssue(issues, {
          id: `${role}-${check.issueSuffix}-maintenance-missing`,
          severity: "error",
          area: "maintenance",
          message: `Missing maintenance entry for ${route} ${check.label} ${role}.`,
          roleId: role,
          href: route,
        });
      }
    }
  }

  for (const entry of maintenanceEntries) {
    if (!isValidCaseAnchor(entry.href, "en") && !isValidProofRoute(entry.href)) {
      addIssue(issues, {
        id: `${entry.id}-href-invalid`,
        severity: "error",
        area: "maintenance",
        message: `Invalid maintenance href: ${entry.href}`,
        roleId: entry.roleId,
        href: entry.href,
      });
    }
  }

  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");

  return {
    generatedAt,
    ok: errors.length === 0,
    checkedRoutes: Array.from(checkedRoutes).sort(),
    checkedAnchors,
    checkedLocales: locales,
    maintenanceEntries: maintenanceEntries.length,
    issues,
    errors,
    warnings,
  };
}
