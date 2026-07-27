import Link from "next/link";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringRoleFitPanel } from "@/components/hiring/HiringRoleFitPanel";
import { InterviewBoundaryNotes } from "@/components/hiring/InterviewBoundaryNotes";
import { InterviewDecisionBrief } from "@/components/hiring/InterviewDecisionBrief";
import { InterviewEvidenceBrief } from "@/components/hiring/InterviewEvidenceBrief";
import { InterviewQuestionBank } from "@/components/hiring/InterviewQuestionBank";
import { RolePacketNav } from "@/components/hiring/RolePacketComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getProofUiLabels, getRolePackets } from "@/lib/proof";
import {
  getHiringRoleFits,
  getInterviewDecisionRoom,
  type ProofLocale,
} from "@/lib/portfolio-proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh" ? "面试 Lewis | 招聘决策页" : "Interview Lewis | Hiring Decision Room";
  const description =
    locale === "zh"
      ? "Lewis Dong 的快速招聘档案：岗位匹配、最强证据、面试问题和边界。"
      : "A fast hiring dossier for Lewis Dong: role fit, strongest evidence, interview questions, and boundaries.";

  return {
    title,
    description,
    alternates: buildAlternates("/hire", locale),
    openGraph: buildOpenGraph({ title, description, path: "/hire", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HirePage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const room = getInterviewDecisionRoom(proofLocale);
  const roleFits = getHiringRoleFits(proofLocale);
  const rolePackets = getRolePackets(proofLocale);
  const proofLabels = getProofUiLabels(proofLocale);
  const pageCopy =
    proofLocale === "zh"
      ? {
          roleTitle: "把岗位需求匹配到证据。",
          roleIntro: "先看岗位信号，再进入通话前最相关的案例证据。",
          nextStep: "下一步",
          moreTools: "更多决策工具",
          closeTitle: "带一个案例和一个问题进入面试。",
          closeBody:
            "最快路径是：扫一遍岗位匹配，检查一个证据锚点，然后提出与你团队最相关的问题。",
          contact: "联系 Lewis",
          browseWork: "查看作品",
          resume: "查看简历",
          proofReview: "证据评审页",
          compareRoles: "比较岗位路径",
          interviewAgenda: "面试议程",
          scorecard: "招聘评分卡",
          shortlist: "候选摘要",
          debrief: "经理复盘",
          decision: "决策包",
          offer: "Offer 准备",
          onboarding: "入职计划",
          kickoff: "启动计划",
          impact: "影响复盘",
          growth: "成长路线",
          retention: "留存准备",
          partnership: "协作方式",
          command: "招聘控制台",
          briefing: "招聘简报",
          readiness: "准备度检查",
          action: "行动板",
          tracker: "跟进追踪",
        }
      : {
          roleTitle: "Match the opening to the proof.",
          roleIntro: "Pick the role signal first, then inspect the exact case evidence before the call.",
          nextStep: "Next step",
          moreTools: "More decision tools",
          closeTitle: "Bring one case and one question to the interview.",
          closeBody:
            "The fastest route is: scan role fit, inspect one proof anchor, then ask the question that matches your team.",
          contact: "Contact Lewis",
          browseWork: "Browse work",
          resume: "Resume",
          proofReview: "Proof review room",
          compareRoles: "Compare role paths",
          interviewAgenda: "Interview agenda",
          scorecard: "Hiring scorecard",
          shortlist: "Shortlist memo",
          debrief: "Manager debrief",
          decision: "Decision pack",
          offer: "Offer readiness",
          onboarding: "Onboarding plan",
          kickoff: "Kickoff plan",
          impact: "Impact review",
          growth: "Growth roadmap",
          retention: "Retention readiness",
          partnership: "Partnership operating",
          command: "Hiring command",
          briefing: "Hiring briefing",
          readiness: "Hiring readiness",
          action: "Hiring action",
          tracker: "Hiring tracker",
        };
  const proofReviewLabel =
    pageCopy.proofReview;
  const compareRolesLabel =
    pageCopy.compareRoles;
  const interviewAgendaLabel =
    pageCopy.interviewAgenda;
  const scorecardLabel =
    pageCopy.scorecard;
  const shortlistLabel =
    pageCopy.shortlist;
  const debriefLabel =
    pageCopy.debrief;
  const decisionLabel =
    pageCopy.decision;
  const offerLabel =
    pageCopy.offer;
  const onboardingLabel =
    pageCopy.onboarding;
  const kickoffLabel =
    pageCopy.kickoff;
  const impactLabel =
    pageCopy.impact;
  const growthLabel =
    pageCopy.growth;
  const retentionLabel =
    pageCopy.retention;
  const partnershipLabel =
    pageCopy.partnership;
  const commandLabel =
    pageCopy.command;
  const briefingLabel =
    pageCopy.briefing;
  const readinessLabel =
    pageCopy.readiness;
  const actionLabel =
    pageCopy.action;
  const trackerLabel =
    pageCopy.tracker;
  const primaryActions = [
    { href: "/contact", label: pageCopy.contact, variant: "btn-primary" },
    { href: "/hire/review", label: proofReviewLabel, variant: "btn-ghost" },
    { href: "/hire/compare", label: compareRolesLabel, variant: "btn-ghost" },
    { href: "/hire/interview", label: interviewAgendaLabel, variant: "btn-ghost" },
    { href: "/resume", label: pageCopy.resume, variant: "btn-ghost" },
  ];
  const secondaryActions = [
    { href: "/hire/scorecard", label: scorecardLabel },
    { href: "/hire/shortlist", label: shortlistLabel },
    { href: "/hire/debrief", label: debriefLabel },
    { href: "/hire/decision", label: decisionLabel },
    { href: "/hire/offer", label: offerLabel },
    { href: "/hire/onboarding", label: onboardingLabel },
    { href: "/hire/kickoff", label: kickoffLabel },
    { href: "/hire/impact", label: impactLabel },
    { href: "/hire/growth", label: growthLabel },
    { href: "/hire/retention", label: retentionLabel },
    { href: "/hire/partnership", label: partnershipLabel },
    { href: "/hire/command", label: commandLabel },
    { href: "/hire/briefing", label: briefingLabel },
    { href: "/hire/readiness", label: readinessLabel },
    { href: "/hire/action", label: actionLabel },
    { href: "/hire/tracker", label: trackerLabel },
    { href: "/projects", label: pageCopy.browseWork },
  ];

  return (
    <main className="page interview-room-page" data-screen-label="05 Hire">
      <InterviewDecisionBrief brief={room.brief} />

      <section className="section container">
        <RolePacketNav packets={rolePackets} labels={proofLabels} />
      </section>

      <section className="section container">
        <HiringRoleFitPanel
          roles={roleFits}
          locale={proofLocale}
          title={pageCopy.roleTitle}
          intro={pageCopy.roleIntro}
          labels={proofLabels}
        />
      </section>

      <section className="section container">
        <InterviewEvidenceBrief items={room.evidenceBrief} labels={proofLabels} />
      </section>

      <section className="section container">
        <InterviewQuestionBank items={room.questionBank} labels={proofLabels} />
      </section>

      <section className="section container">
        <InterviewBoundaryNotes notes={room.boundaries} labels={proofLabels} />
      </section>

      <section className="section container interview-room-close">
        <div>
          <div className="label">{pageCopy.nextStep}</div>
          <h2>{pageCopy.closeTitle}</h2>
          <p>{pageCopy.closeBody}</p>
        </div>
        <div>
          <div className="interview-room-actions interview-room-primary-actions">
            {primaryActions.map((action) => (
              <Link className={`btn ${action.variant}`} href={action.href} key={action.href}>
                {action.label}
              </Link>
            ))}
          </div>
          <details className="interview-room-more-links">
            <summary>{pageCopy.moreTools}</summary>
            <div className="interview-room-actions interview-room-more-grid">
              {secondaryActions.map((action) => (
                <Link className="btn btn-ghost" href={action.href} key={action.href}>
                  {action.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </section>
    </main>
  );
}
