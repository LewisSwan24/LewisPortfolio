import Link from "next/link";
import type { ProofLocale } from "@/lib/proof";
import { localizeInternalHref } from "@/lib/locale-href";

interface HiringRouteShelfLink {
  href: string;
  label: string;
}

interface HiringRouteShelfProps {
  label?: string;
  links: HiringRouteShelfLink[];
  locale?: ProofLocale;
}

const routeLabels: Record<ProofLocale, Record<string, string>> = {
  en: {
    "/hire": "Hire room",
    "/hire/review": "Proof review",
    "/hire/compare": "Compare roles",
    "/hire/interview": "Interview agenda",
    "/hire/scorecard": "Scorecard",
    "/hire/shortlist": "Shortlist memo",
    "/hire/debrief": "Manager debrief",
    "/hire/decision": "Decision pack",
    "/hire/offer": "Offer readiness",
    "/hire/onboarding": "Onboarding plan",
    "/hire/kickoff": "Kickoff plan",
    "/hire/impact": "Impact review",
    "/hire/growth": "Growth roadmap",
    "/hire/retention": "Retention readiness",
    "/hire/partnership": "Partnership operating",
    "/hire/command": "Hiring command",
    "/hire/briefing": "Hiring briefing",
    "/hire/readiness": "Hiring readiness",
    "/hire/action": "Hiring action",
    "/hire/tracker": "Hiring tracker",
  },
  zh: {
    "/hire": "招聘决策页",
    "/hire/review": "证据评审",
    "/hire/compare": "岗位比较",
    "/hire/interview": "面试议程",
    "/hire/scorecard": "招聘评分卡",
    "/hire/shortlist": "候选摘要",
    "/hire/debrief": "经理复盘",
    "/hire/decision": "决策包",
    "/hire/offer": "Offer 准备",
    "/hire/onboarding": "入职计划",
    "/hire/kickoff": "启动计划",
    "/hire/impact": "影响复盘",
    "/hire/growth": "成长路线",
    "/hire/retention": "留存准备",
    "/hire/partnership": "协作方式",
    "/hire/command": "招聘控制台",
    "/hire/briefing": "招聘简报",
    "/hire/readiness": "准备度检查",
    "/hire/action": "行动板",
    "/hire/tracker": "跟进追踪",
  },
};

const shelfCopy: Record<ProofLocale, { label: string; intro: string; more: string }> = {
  en: {
    label: "Related hiring routes",
    intro: "Use the first links for the next decision. Keep the full system collapsed unless you need another route.",
    more: "More related pages",
  },
  zh: {
    label: "相关招聘页面",
    intro: "优先使用前几个链接做下一步判断。完整工具链默认折叠，避免页面重复堆叠。",
    more: "更多相关页面",
  },
};

function normalizeHref(href: string) {
  return href.split("?")[0].split("#")[0];
}

function localizeLink(link: HiringRouteShelfLink, locale: ProofLocale) {
  if (locale === "en") return link;

  const localized = routeLabels[locale][normalizeHref(link.href)];
  return {
    ...link,
    label: localized ?? link.label,
  };
}

function dedupeLinks(links: HiringRouteShelfLink[]) {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function HiringRouteShelf({
  label,
  links,
  locale = "en",
}: HiringRouteShelfProps) {
  const copy = shelfCopy[locale];
  const localizedLinks = dedupeLinks(links.map((link) => localizeLink(link, locale)));
  const primaryLinks = localizedLinks.slice(0, 4);
  const secondaryLinks = localizedLinks.slice(4);

  return (
    <nav className="hiring-route-shelf" aria-label={label ?? copy.label}>
      <div className="hiring-route-shelf-head">
        <span>{label ?? copy.label}</span>
        <p>{copy.intro}</p>
      </div>
      <div className="hiring-route-shelf-body">
        <div className="hiring-route-shelf-primary">
          {primaryLinks.map((link) => (
            <Link
              href={localizeInternalHref(link.href, locale)}
              key={`${link.href}-${link.label}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {secondaryLinks.length > 0 && (
          <details className="hiring-route-shelf-more">
            <summary>{copy.more}</summary>
            <div>
              {secondaryLinks.map((link) => (
                <Link
                  href={localizeInternalHref(link.href, locale)}
                  key={`${link.href}-${link.label}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </details>
        )}
      </div>
    </nav>
  );
}
