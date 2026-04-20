interface AvailabilityPillProps {
  label: string;
}

export function AvailabilityPill({ label }: AvailabilityPillProps) {
  return (
    <span
      role="status"
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "color-mix(in srgb, var(--success) 30%, transparent)",
        backgroundColor: "color-mix(in srgb, var(--success) 10%, transparent)",
        color: "var(--success)",
      }}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "var(--success)" }}
      />
      {label}
    </span>
  );
}
