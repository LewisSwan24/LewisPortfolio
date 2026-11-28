"use client";

import { useId, useState } from "react";
import type { SimulatorProps } from "./types";

type FieldTier = "idle" | "filled" | "review" | "confirmed" | "blank";

export function AutofillConfidenceSim({ locale, onStatusChange }: SimulatorProps) {
  const isZh = locale === "zh";
  const formId = useId();

  const [scanned, setScanned] = useState(false);
  const [workAuth, setWorkAuth] = useState("");
  const [salary, setSalary] = useState("");
  const [motivation, setMotivation] = useState("");
  const [humanSubmitted, setHumanSubmitted] = useState(false);

  const handleScan = () => {
    setScanned(true);
    setHumanSubmitted(false);
    const msg = isZh
      ? "本地扫描完成：3 项高置信度直填，1 项下拉选项有歧义待你确认，2 项刻意留空不编造，0 字节上传。"
      : "Local scan complete: 3 exact matches filled, 1 ambiguous field flagged for review, 2 intentionally left blank. 0 bytes uploaded.";
    onStatusChange?.(msg);
  };

  const handleWorkAuthChange = (value: string) => {
    setWorkAuth(value);
    setHumanSubmitted(false);
    if (value) {
      const msg = isZh
        ? "已人工确认「签证 / 工作权限」选项，现在你可以亲自点击提交。"
        : "Work authorization confirmed by human applicant. Final submit remains yours.";
      onStatusChange?.(msg);
    }
  };

  const handleHumanSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!scanned) {
      onStatusChange?.(
        isZh
          ? "请先点击「一键本地扫描」查看三档字段分流。"
          : "Run the local scan first to inspect field confidence tiers."
      );
      return;
    }
    if (!workAuth) {
      onStatusChange?.(
        isZh
          ? "提交锁生效：请先手动确认 1 项待复核下拉框。"
          : "Submit guard: please confirm the 1 flagged dropdown field first."
      );
      return;
    }
    setHumanSubmitted(true);
    onStatusChange?.(
      isZh
        ? "已由你本人手动提交（扩展绝不代点提交按钮）。"
        : "Submitted manually by applicant — extension never auto-clicks Submit."
    );
  };

  const deterministicTier: FieldTier = scanned ? "filled" : "idle";
  const reviewTier: FieldTier = !scanned ? "idle" : workAuth ? "confirmed" : "review";
  const blankTier: FieldTier = scanned ? "blank" : "idle";

  const filledCount = scanned ? (workAuth ? 4 : 3) : 0;
  const reviewCount = scanned ? (workAuth ? 0 : 1) : 0;
  const blankCount = scanned ? 2 : 0;

  const copy = isZh
    ? {
        atsHeading: "模拟 ATS 申请表（6 个典型字段）",
        fullNameLabel: "姓名",
        fullNameRule: "规则：1:1 匹配 resume.basics.name",
        schoolLabel: "毕业院校",
        schoolRule: "规则：1:1 匹配 resume.education[0].school",
        degreeLabel: "学位",
        degreeRule: "规则：1:1 匹配 resume.education[0].degree",
        workAuthLabel: "签证与工作权限",
        workAuthPlaceholder: "请选择工作权限……",
        workAuthOptions: [
          { value: "unrestricted", label: "无限制全职工作权限" },
          { value: "graduate-485", label: "毕业生临时工签（485）" },
          { value: "sponsorship", label: "需要雇主担保" },
        ],
        workAuthRule: "歧义原因：简历未存当前签证类别，拒绝猜填",
        workAuthConfirmedRule: "已由申请人手动确认选项",
        salaryLabel: "期望薪资（敏感项）",
        salaryPlaceholder: "由你自行填写或留空",
        salaryRule: "刻意留空：敏感偏好不自动写入",
        motivationLabel: "开放题：为什么申请这个交互设计团队？",
        motivationPlaceholder: "扩展绝不编造开放式回答",
        motivationRule: "刻意留空：开放题绝不代写",
        tiers: {
          idle: "未扫描",
          filled: "实线 · 确定直填",
          review: "虚线 · 待人工确认",
          confirmed: "实线 · 已人工确认",
          blank: "粗实线 · 刻意留空",
        },
        panelTitle: "本地扩展侧栏",
        privacyBadge: "纯本地存储 · 0 字节外发",
        scanBtn: scanned ? "重新本地扫描" : "一键本地扫描",
        countFilled: "已直填",
        countReview: "待确认",
        countBlank: "刻意留空",
        lockTitle: "人工提交锁（Submit Lock）",
        lockNote: !scanned
          ? "点击「一键本地扫描」，观察如何只填确定字段。"
          : !workAuth
            ? "还有 1 项待确认字段。即使全部填完，最终提交按钮也只由人工点击。"
            : "确认完成。扩展到此止步，请亲自点击提交。",
        submitBtn: humanSubmitted ? "已由申请人手动提交 ✓" : "手动提交申请（仅限人工）",
      }
    : {
        atsHeading: "Simulated ATS form (6 representative fields)",
        fullNameLabel: "Full name",
        fullNameRule: "Rule: exact match resume.basics.name",
        schoolLabel: "University",
        schoolRule: "Rule: exact match resume.education[0].school",
        degreeLabel: "Degree",
        degreeRule: "Rule: exact match resume.education[0].degree",
        workAuthLabel: "Work authorization / visa",
        workAuthPlaceholder: "Select work rights...",
        workAuthOptions: [
          { value: "unrestricted", label: "Unrestricted full-time rights" },
          { value: "graduate-485", label: "Temporary Graduate Visa (485)" },
          { value: "sponsorship", label: "Requires employer sponsorship" },
        ],
        workAuthRule: "Ambiguous: visa subclass is not stored in local resume",
        workAuthConfirmedRule: "Confirmed manually by applicant",
        salaryLabel: "Expected salary (sensitive)",
        salaryPlaceholder: "Enter manually if applicable",
        salaryRule: "Left blank: sensitive expectation never guessed",
        motivationLabel: "Open prompt: Why this interaction team?",
        motivationPlaceholder: "Extension never fabricates free-text answers",
        motivationRule: "Left blank: open-ended prompt stays yours",
        tiers: {
          idle: "Not scanned",
          filled: "Solid · Auto-filled",
          review: "Dashed · Needs review",
          confirmed: "Solid · Confirmed",
          blank: "Thick · Left blank",
        },
        panelTitle: "Local extension side panel",
        privacyBadge: "Local storage only · 0 bytes sent",
        scanBtn: scanned ? "Re-scan form locally" : "Scan this form locally",
        countFilled: "Filled",
        countReview: "Needs review",
        countBlank: "Left blank",
        lockTitle: "Human submit lock",
        lockNote: !scanned
          ? "Run a local scan to see deterministic matching vs explicit blanks."
          : !workAuth
            ? "1 field needs your confirmation. Even after review, Submit never fires automatically."
            : "Review resolved. Extension stops here — click Submit yourself when ready.",
        submitBtn: humanSubmitted
          ? "Submitted manually by human ✓"
          : "Submit application (Human only)",
      };

  const fullNameId = `${formId}-name`;
  const schoolId = `${formId}-school`;
  const degreeId = `${formId}-degree`;
  const workAuthId = `${formId}-work-auth`;
  const salaryId = `${formId}-salary`;
  const motivationId = `${formId}-motivation`;

  return (
    <form className="sim-autofill" onSubmit={handleHumanSubmit} noValidate>
      <div className="sim-ats-form">
        <h3 className="sim-panel-title">{copy.atsHeading}</h3>

        <div className="sim-field" data-tier={deterministicTier}>
          <div className="sim-field-head">
            <label htmlFor={fullNameId}>{copy.fullNameLabel}</label>
            <span className="sim-tier-badge" data-tier={deterministicTier}>
              {copy.tiers[deterministicTier]}
            </span>
          </div>
          <input
            id={fullNameId}
            type="text"
            readOnly
            value={scanned ? "Lewis Dong" : ""}
            placeholder={scanned ? "" : "—"}
          />
          {scanned && <span className="sim-field-rule">{copy.fullNameRule}</span>}
        </div>

        <div className="sim-field" data-tier={deterministicTier}>
          <div className="sim-field-head">
            <label htmlFor={schoolId}>{copy.schoolLabel}</label>
            <span className="sim-tier-badge" data-tier={deterministicTier}>
              {copy.tiers[deterministicTier]}
            </span>
          </div>
          <input
            id={schoolId}
            type="text"
            readOnly
            value={scanned ? "The University of Queensland" : ""}
            placeholder={scanned ? "" : "—"}
          />
          {scanned && <span className="sim-field-rule">{copy.schoolRule}</span>}
        </div>

        <div className="sim-field" data-tier={deterministicTier}>
          <div className="sim-field-head">
            <label htmlFor={degreeId}>{copy.degreeLabel}</label>
            <span className="sim-tier-badge" data-tier={deterministicTier}>
              {copy.tiers[deterministicTier]}
            </span>
          </div>
          <input
            id={degreeId}
            type="text"
            readOnly
            value={scanned ? "Master of Interaction Design" : ""}
            placeholder={scanned ? "" : "—"}
          />
          {scanned && <span className="sim-field-rule">{copy.degreeRule}</span>}
        </div>

        <div className="sim-field" data-tier={reviewTier}>
          <div className="sim-field-head">
            <label htmlFor={workAuthId}>{copy.workAuthLabel}</label>
            <span className="sim-tier-badge" data-tier={reviewTier}>
              {copy.tiers[reviewTier]}
            </span>
          </div>
          <select
            id={workAuthId}
            value={workAuth}
            onChange={(e) => handleWorkAuthChange(e.target.value)}
            aria-describedby={`${workAuthId}-hint`}
          >
            <option value="">{copy.workAuthPlaceholder}</option>
            {copy.workAuthOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {scanned && (
            <span id={`${workAuthId}-hint`} className="sim-field-rule">
              {workAuth ? copy.workAuthConfirmedRule : copy.workAuthRule}
            </span>
          )}
        </div>

        <div className="sim-field" data-tier={blankTier}>
          <div className="sim-field-head">
            <label htmlFor={salaryId}>{copy.salaryLabel}</label>
            <span className="sim-tier-badge" data-tier={blankTier}>
              {copy.tiers[blankTier]}
            </span>
          </div>
          <input
            id={salaryId}
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder={copy.salaryPlaceholder}
          />
          {scanned && <span className="sim-field-rule">{copy.salaryRule}</span>}
        </div>

        <div className="sim-field" data-tier={blankTier}>
          <div className="sim-field-head">
            <label htmlFor={motivationId}>{copy.motivationLabel}</label>
            <span className="sim-tier-badge" data-tier={blankTier}>
              {copy.tiers[blankTier]}
            </span>
          </div>
          <textarea
            id={motivationId}
            rows={2}
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder={copy.motivationPlaceholder}
          />
          {scanned && <span className="sim-field-rule">{copy.motivationRule}</span>}
        </div>
      </div>

      <aside className="sim-ext-panel" aria-label={copy.panelTitle}>
        <div className="sim-ext-head">
          <h3 className="sim-panel-title">{copy.panelTitle}</h3>
          <span className="sim-mono-pill">{copy.privacyBadge}</span>
        </div>

        <button
          type="button"
          className="btn btn-primary sim-scan-btn"
          onClick={handleScan}
        >
          {copy.scanBtn}
        </button>

        <dl className="sim-tier-counts">
          <div data-tier="filled">
            <dt>{copy.countFilled}</dt>
            <dd>{filledCount}</dd>
          </div>
          <div data-tier="review">
            <dt>{copy.countReview}</dt>
            <dd>{reviewCount}</dd>
          </div>
          <div data-tier="blank">
            <dt>{copy.countBlank}</dt>
            <dd>{blankCount}</dd>
          </div>
        </dl>

        <div className="sim-submit-lock">
          <strong>{copy.lockTitle}</strong>
          <p>{copy.lockNote}</p>
          <button
            type="submit"
            className="btn btn-ghost sim-human-submit-btn"
            aria-disabled={!scanned || !workAuth}
          >
            {copy.submitBtn}
          </button>
        </div>
      </aside>
    </form>
  );
}
