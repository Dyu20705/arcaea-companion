import type { ReactNode } from "react";

import type { DifficultyType } from "../../app/companion-data";

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export function AccentCard({ title, children, tone = "violet" }: { title: string; children: ReactNode; tone?: "violet" | "cyan" | "magenta" | "amber" | "green" }) {
  return (
    <article className={`accent-card accent-card--${tone}`}>
      <span className="accent-card__line" aria-hidden="true" />
      <h3>{title}</h3>
      <div>{children}</div>
    </article>
  );
}

export function DifficultyBadge({ type, level }: { type: DifficultyType; level: string }) {
  return (
    <span className={`difficulty-badge difficulty-badge--${type}`}>
      <span aria-hidden="true" />
      {type[0].toUpperCase() + type.slice(1)} {level}
    </span>
  );
}

export function ColumnHeader({ title, count }: { title: string; count: number }) {
  return (
    <header className="browser-column__header">
      <h2>{title}</h2>
      <span>{count}</span>
    </header>
  );
}

export function HierarchyItem({
  title,
  summary,
  selected,
  onSelect,
  trailing,
}: {
  title: string;
  summary?: string;
  selected: boolean;
  onSelect: () => void;
  trailing?: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`hierarchy-item${selected ? " hierarchy-item--selected" : ""}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span>
        <strong>{title}</strong>
        {summary ? <small>{summary}</small> : null}
      </span>
      {trailing ?? <span aria-hidden="true">›</span>}
    </button>
  );
}

export function MetricRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="metric-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function Trivia({ children }: { children: ReactNode }) {
  return (
    <section className="trivia-card" aria-labelledby="trivia-title">
      <span className="accent-card__line" aria-hidden="true" />
      <h2 id="trivia-title">Trivia</h2>
      <div>{children}</div>
    </section>
  );
}
