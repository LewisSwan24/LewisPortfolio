interface SkipLinkProps {
  label: string;
}

export function SkipLink({ label }: SkipLinkProps) {
  return (
    <a href="#main-content" className="skip-link">
      {label}
    </a>
  );
}
