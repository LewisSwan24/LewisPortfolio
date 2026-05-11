"use client";

import { useState } from "react";

interface CopyEmailButtonProps {
  label: string;
  copiedLabel: string;
  subject: string;
  body: string;
}

export function CopyEmailButton({
  label,
  copiedLabel,
  subject,
  body,
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
  }

  return (
    <button className="btn btn-ghost" type="button" onClick={handleCopy}>
      {copied ? copiedLabel : label}
    </button>
  );
}
