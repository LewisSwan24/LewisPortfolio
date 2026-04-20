import Link from "next/link";

interface AuthorBioProps {
  name: string;
  tagline: string;
  email?: string;
  linkedin?: string;
  github?: string;
  contactLabel: string;
  linkedinLabel: string;
  githubLabel: string;
}

export function AuthorBio({
  name,
  tagline,
  email,
  linkedin,
  github,
  contactLabel,
  linkedinLabel,
  githubLabel,
}: AuthorBioProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="blog-bio" aria-label={name}>
      <div className="blog-bio-mark" aria-hidden>
        {initials}
      </div>
      <div className="blog-bio-body">
        <p className="blog-bio-name">{name}</p>
        <p className="blog-bio-tagline">{tagline}</p>
        <ul className="blog-bio-links">
          {email && (
            <li>
              <Link href={`mailto:${email}`}>{contactLabel}</Link>
            </li>
          )}
          {linkedin && (
            <li>
              <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                {linkedinLabel}
              </Link>
            </li>
          )}
          {github && (
            <li>
              <Link href={github} target="_blank" rel="noopener noreferrer">
                {githubLabel}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
}
