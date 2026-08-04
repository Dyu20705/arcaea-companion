import { Link, useParams } from "react-router";

import { elementArticles } from "../../app/companion-data";
import { routes } from "../../app/route-paths";
import { AccentCard, MetricRow, PageIntro, Trivia } from "./primitives";

export function NetworkRoute() {
  return (
    <div className="page-stack">
      <PageIntro eyebrow="Network · Explanation" title="Network System" description="Explain online game mechanisms without implementing account actions or exposing private player data." />
      <div className="overview-grid overview-grid--two"><AccentCard title="Friends" tone="violet"><p>Friend IDs, mutual status, rankings, and capacity are documented conceptually.</p></AccentCard><AccentCard title="Cloud Data" tone="cyan"><p>Synchronization scope, local state, and conflict-safe behavior are described without account controls.</p></AccentCard></div>
      <section className="content-section"><h2>Mechanism overview</h2><dl className="metric-list"><MetricRow label="Availability" value="Requires an account and online connectivity" /><MetricRow label="Friend records" value="User ID, display identity, partner, Potential, and recent play" /><MetricRow label="Cloud scope" value="Scores, unlocks, World progress, and supported account data" /><MetricRow label="Local-only examples" value="Device settings and other non-synchronized state" /></dl></section>
      <AccentCard title="Privacy boundary" tone="magenta"><p>The Wiki describes systems conceptually. Future authenticated features belong in separate account or Tools surfaces with explicit consent and security review.</p></AccentCard>
    </div>
  );
}

export function ElementsRoute() {
  const { slug = "gameplay" } = useParams();
  const article = elementArticles[slug as keyof typeof elementArticles] ?? elementArticles.gameplay;
  const entries = Object.entries(elementArticles);
  return (
    <div className="page-stack">
      <PageIntro eyebrow="Elements · Article" title={article.title} description="Core theory pages explain game systems and link related concepts." />
      <div className="filter-pills">{entries.map(([key, value]) => <Link className={key === slug ? "is-active" : ""} key={key} to={routes.wikiElement(key)}>{value.title}</Link>)}</div>
      <article className="article-card"><span className="accent-card__line" aria-hidden="true" /><h2>{article.summary}</h2><p>{article.body}</p><p className="related-links">Related concepts: Scoring · Partners · Potential · World Mode mechanics.</p></article>
      <div className="overview-grid overview-grid--three">{entries.filter(([key]) => key !== slug).slice(0, 3).map(([key, value], index) => <AccentCard key={key} title={value.title} tone={["cyan", "magenta", "amber"][index] as "cyan" | "magenta" | "amber"}><p>{value.summary}</p><Link to={routes.wikiElement(key)}>Read article</Link></AccentCard>)}</div>
      <Trivia><p>Optional notes are attached to each element article.</p></Trivia>
    </div>
  );
}
