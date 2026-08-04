import { Link, useLocation } from "react-router";

import { routes } from "../../app/route-paths";
import { AccentCard, MetricRow, PageIntro } from "./primitives";

export function ToolsRoute() {
  return (
    <div className="page-stack">
      <PageIntro eyebrow="Future development" title="Tools" description="Utilities will be introduced after the Wiki data model and application shell are stable." />
      <section className="future-panel" id="planned-tools"><span className="status-badge status-badge--planned">Planned · not yet available</span><div className="future-panel__grid"><div><h2>Built when the data is trustworthy.</h2><p>This route establishes the information architecture without presenting unfinished calculators or trackers as usable features.</p></div><AccentCard title="Dependency gate" tone="cyan"><p>Stable Wiki schema · defined provenance · tests available · accessible interaction contract approved.</p></AccentCard></div></section>
    </div>
  );
}

const aboutCards = [
  { to: routes.announcements, title: "Announcements", description: "Product updates, content changes, and important notices.", tone: "violet" as const },
  { to: routes.status, title: "Status", description: "Availability, data freshness, and upstream health.", tone: "green" as const },
  { to: routes.support, title: "Support", description: "Known issues, reporting guidance, and contact paths.", tone: "amber" as const },
];

export function AboutRoute() {
  const location = useLocation();
  const leaf = location.pathname.split("/").filter(Boolean).at(-1) ?? "about";
  if (leaf === "announcements") return <AboutLeaf title="Announcements" description="Product updates, content changes, and important notices." />;
  if (leaf === "status") return <AboutLeaf title="Status" description="Service availability, data freshness, and upstream health." />;
  if (leaf === "support") return <AboutLeaf title="Support" description="Known issues, reporting guidance, and contact paths." />;
  return (
    <div className="page-stack">
      <PageIntro eyebrow="About · Overview" title="About Arcaea Companion" description="Project information, service health, announcements, and support routes." />
      <div className="overview-grid overview-grid--three">{aboutCards.map((card) => <AccentCard key={card.title} title={card.title} tone={card.tone}><p>{card.description}</p><Link to={card.to}>Open {card.title.toLowerCase()}</Link></AccentCard>)}</div>
      <section className="content-section"><h2>Current snapshot</h2><dl className="metric-list"><MetricRow label="Application version" value="v0.1.0" /><MetricRow label="Wiki data" value="Schema development" /><MetricRow label="Tools" value="Future development" /><MetricRow label="Authentication" value="Icon placeholder only" /></dl></section>
      <AccentCard title="Project boundary" tone="magenta"><p>Arcaea Companion is an independent companion project. Original interface work, temporary placeholders, and sourced factual information must remain distinguishable from official game assets.</p></AccentCard>
    </div>
  );
}

function AboutLeaf({ title, description }: { title: string; description: string }) {
  return (
    <div className="page-stack">
      <PageIntro eyebrow={`About · ${title}`} title={title} description={description} />
      <article className="article-card"><span className="accent-card__line" aria-hidden="true" /><h2>{title} information</h2><p>This page is ready for maintained project content and does not expose unavailable functionality.</p><Link to={routes.about}>Return to About overview</Link></article>
    </div>
  );
}

export function NotFoundRoute() {
  return (
    <section className="not-found"><p className="eyebrow">404</p><h1>Page not found</h1><p>The requested route does not exist.</p><Link className="primary-button" to={routes.home}>Return home</Link></section>
  );
}
