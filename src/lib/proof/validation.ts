import { hiringRoleIds } from "./anchors";
import { getApplicationPackets } from "./application-packets";
import { getCaseReaderGuide } from "./case-depth";
import { getFollowThroughBriefs } from "./follow-through";
import { getProofMaintenanceEntries } from "./maintenance";
import { getRolePackets } from "./role-packets";
import type {
  ApplicationPacketRoute,
  CaseReaderHref,
  FollowThroughRoute,
  HiringRoleId,
  ProjectEvidenceSlug,
  ProofLocale,
  ProofValidationIssue,
  ProofValidationReport,
} from "./types";

const locales: ProofLocale[] = ["en", "zh"];
const projectSlugs: ProjectEvidenceSlug[] = ["connect", "spectra", "ai", "circles"];

function addIssue(
  issues: ProofValidationIssue[],
  issue: ProofValidationIssue
) {
  issues.push(issue);
}

function roleRoute(role: HiringRoleId): `/hire/${HiringRoleId}` {
  return `/hire/${role}`;
}

function packetRoute(role: HiringRoleId): ApplicationPacketRoute {
  return `/hire/${role}/packet`;
}

function followThroughRoute(role: HiringRoleId): FollowThroughRoute {
  return `/hire/${role}/next`;
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
  if (href === "/hire/review") return true;
  if (href === "/hire/compare") return true;
  if (href === "/hire/interview") return true;

  return hiringRoleIds.some(
    (role) =>
      href === roleRoute(role) ||
      href === packetRoute(role) ||
      href === followThroughRoute(role) ||
      href === `/contact?role=${role}` ||
      href === `/contact?role=${role}&intent=interview`
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
  const maintainedReviewRoles = new Set(
    maintenanceEntries
      .filter((entry) => entry.surface === "review-room")
      .map((entry) => entry.roleId)
  );
  const maintainedComparisonRoles = new Set(
    maintenanceEntries
      .filter((entry) => entry.surface === "role-comparison")
      .map((entry) => entry.roleId)
  );
  const maintainedAgendaRoles = new Set(
    maintenanceEntries
      .filter((entry) => entry.surface === "interview-agenda")
      .map((entry) => entry.roleId)
  );

  checkedRoutes.add("/hire/review");
  checkedRoutes.add("/hire/compare");
  checkedRoutes.add("/hire/interview");

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

    if (!maintainedReviewRoles.has(role)) {
      addIssue(issues, {
        id: `${role}-proof-review-maintenance-missing`,
        severity: "error",
        area: "maintenance",
        message: `Missing maintenance entry for /hire/review role card ${role}.`,
        roleId: role,
        href: "/hire/review",
      });
    }

    if (!maintainedComparisonRoles.has(role)) {
      addIssue(issues, {
        id: `${role}-role-comparison-maintenance-missing`,
        severity: "error",
        area: "maintenance",
        message: `Missing maintenance entry for /hire/compare role lane ${role}.`,
        roleId: role,
        href: "/hire/compare",
      });
    }

    if (!maintainedAgendaRoles.has(role)) {
      addIssue(issues, {
        id: `${role}-interview-agenda-maintenance-missing`,
        severity: "error",
        area: "maintenance",
        message: `Missing maintenance entry for /hire/interview agenda card ${role}.`,
        roleId: role,
        href: "/hire/interview",
      });
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
