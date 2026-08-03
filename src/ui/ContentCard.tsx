export interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  featured?: boolean;
}

export function ContentCard({
  title,
  description,
  href,
  actionLabel,
  featured = false,
}: ContentCardProps) {
  return (
    <a
      className="av-content-card"
      href={href}
      data-featured={featured || undefined}
    >
      <strong>{title}</strong>
      <span>{description}</span>
      <b>
        {actionLabel} <span aria-hidden="true">→</span>
      </b>
    </a>
  );
}
