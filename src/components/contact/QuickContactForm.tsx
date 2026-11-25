"use client";

import { useId, useRef, useState } from "react";
import type { ProofLocale } from "@/lib/portfolio-proof";

interface QuickContactFormProps {
  locale: ProofLocale;
  initialRole?: string;
}

export function QuickContactForm({ locale, initialRole = "" }: QuickContactFormProps) {
  const isZh = locale === "zh";
  const headingId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyOrRole, setCompanyOrRole] = useState(initialRole);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    text: string;
    mailtoHref?: string;
    isError?: boolean;
  } | null>(null);

  const copy = isZh
    ? {
        eyebrow: "快速留言通道",
        title: "直接发送合作或面试留言",
        summary: "留言会直接发到我这里。如果暂时发不出去，会帮你准备一封写好正文的邮件。",
        nameLabel: "你的称呼 *",
        nameErr: "请填写你的称呼。",
        emailLabel: "回复邮箱 *",
        emailHint: "格式：you@example.com",
        emailErr: "请填写有效的邮箱地址（如 you@example.com）。",
        roleLabel: "团队 / 岗位方向（可选）",
        msgLabel: "想聊的内容（至少 10 个字）*",
        msgErr: "请至少输入 10 个字符的留言说明。",
        submit: submitting ? "发送中..." : "发送留言",
        mailtoBtn: "使用系统邮件客户端发送 →",
      }
    : {
        eyebrow: "Direct message",
        title: "Send a quick note",
        summary:
          "Your note comes straight to me. If it cannot send right now, you get a pre-filled email to send instead.",
        nameLabel: "Your name *",
        nameErr: "Enter your name.",
        emailLabel: "Reply email *",
        emailHint: "Format: you@example.com",
        emailErr: "Enter a valid email address such as you@example.com.",
        roleLabel: "Team or role scope (optional)",
        msgLabel: "Message (min 10 characters) *",
        msgErr: "Please include at least 10 characters so I have context to reply.",
        submit: submitting ? "Sending..." : "Send message",
        mailtoBtn: "Open pre-filled email client →",
      };

  const nameValid = name.trim().length > 0;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const msgValid = message.trim().length >= 10;

  const showNameErr = Boolean(touched.name && !nameValid);
  const showEmailErr = Boolean(touched.email && !emailValid);
  const showMsgErr = Boolean(touched.message && !msgValid);

  const markTouched = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!nameValid) {
      nameRef.current?.focus();
      setResult({ text: copy.nameErr, isError: true });
      return;
    }
    if (!emailValid) {
      emailRef.current?.focus();
      setResult({ text: copy.emailErr, isError: true });
      return;
    }
    if (!msgValid) {
      msgRef.current?.focus();
      setResult({ text: copy.msgErr, isError: true });
      return;
    }

    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          companyOrRole: companyOrRole.trim(),
          message: message.trim(),
          locale,
          website,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        mode?: string;
        mailtoHref?: string;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setResult({
          text: data.error ?? (isZh ? "提交未成功，请稍后再试。" : "Could not send message."),
          isError: true,
        });
        return;
      }

      if (data.mode === "kv" || data.mode === "webhook") {
        setName("");
        setEmail("");
        setMessage("");
        setTouched({});
        setResult({
          text: isZh ? "已收到留言，我会在 48 小时内回复。" : "Message received. I will reply within 48 hours.",
        });
      } else {
        setResult({
          text: isZh
            ? "留言暂时发不出去，请点下方按钮，用邮件发送。"
            : "The form cannot send right now. Use the button below to send it by email.",
          mailtoHref: data.mailtoHref,
        });
      }
    } catch {
      setResult({
        text: isZh ? "网络异常，请直接使用页面上方邮箱联系。" : "Network error — please use the direct email link above.",
        isError: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section container" aria-labelledby={headingId}>
      <div className="case-sim-shell">
        <header className="case-sim-head">
          <div className="case-sim-head-copy">
            <div className="label">{copy.eyebrow}</div>
            <h2 id={headingId}>{copy.title}</h2>
            <p className="case-sim-prompt">{copy.summary}</p>
          </div>
        </header>

        <div className="case-sim-stage proc-stage">
          <form className="proc-stage" onSubmit={handleSubmit} noValidate>
            <div className="v3-card-grid">
              <div className="sim-field">
                <label htmlFor="contact-name">{copy.nameLabel}</label>
                <input
                  ref={nameRef}
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  maxLength={80}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => markTouched("name")}
                  aria-invalid={showNameErr ? "true" : "false"}
                  aria-describedby={showNameErr ? "contact-name-err" : undefined}
                />
                {showNameErr && (
                  <span id="contact-name-err" className="sim-field-rule" style={{ color: "var(--error)" }}>
                    {copy.nameErr}
                  </span>
                )}
              </div>

              <div className="sim-field">
                <label htmlFor="contact-email">{copy.emailLabel}</label>
                <span id="contact-email-hint" className="sim-field-rule">
                  {copy.emailHint}
                </span>
                <input
                  ref={emailRef}
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={120}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => markTouched("email")}
                  aria-invalid={showEmailErr ? "true" : "false"}
                  aria-describedby={
                    showEmailErr ? "contact-email-hint contact-email-err" : "contact-email-hint"
                  }
                />
                {showEmailErr && (
                  <span id="contact-email-err" className="sim-field-rule" style={{ color: "var(--error)" }}>
                    {copy.emailErr}
                  </span>
                )}
              </div>

              <div className="sim-field">
                <label htmlFor="contact-role">{copy.roleLabel}</label>
                <input
                  id="contact-role"
                  name="companyOrRole"
                  type="text"
                  maxLength={100}
                  autoComplete="organization"
                  value={companyOrRole}
                  onChange={(e) => setCompanyOrRole(e.target.value)}
                />
              </div>
            </div>

            <div className="sim-field">
              <label htmlFor="contact-msg">{copy.msgLabel}</label>
              <textarea
                ref={msgRef}
                id="contact-msg"
                name="message"
                rows={4}
                required
                minLength={10}
                maxLength={2000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => markTouched("message")}
                aria-invalid={showMsgErr ? "true" : "false"}
                aria-describedby={showMsgErr ? "contact-msg-err" : undefined}
              />
              {showMsgErr && (
                <span id="contact-msg-err" className="sim-field-rule" style={{ color: "var(--error)" }}>
                  {copy.msgErr}
                </span>
              )}
            </div>

            {/* Honeypot hidden from keyboard and assistive tech */}
            <div
              aria-hidden="true"
              style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}
            >
              <label htmlFor="contact-website">Leave blank</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="lab-pill-row">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {copy.submit}
              </button>
              {result?.mailtoHref && (
                <a href={result.mailtoHref} className="btn btn-ghost">
                  {copy.mailtoBtn}
                </a>
              )}
            </div>
          </form>
        </div>

        {result && (
          <div className="case-sim-takeaway" role="status" aria-live="polite">
            <span className="case-sim-takeaway-label">
              {result.isError ? (isZh ? "检查" : "Check") : isZh ? "状态" : "Status"}
            </span>
            <p>{result.text}</p>
          </div>
        )}
      </div>
    </section>
  );
}
