"use client";

interface PrintPacketButtonProps {
  label: string;
}

export function PrintPacketButton({ label }: PrintPacketButtonProps) {
  return (
    <button className="btn btn-ghost" type="button" onClick={() => window.print()}>
      {label}
    </button>
  );
}
