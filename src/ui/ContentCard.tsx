import { Link } from "react-router";

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
    <Link
      className="av-content-card"
      to={href}
      data-featured={featured || undefined}
    >
      <strong>{title}</strong>
      <span>{description}</span>
      <b>
        {actionLabel} <span aria-hidden="true">→</span>
      </b>
    </Link>
  );
}
