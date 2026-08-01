const foundations = [
  {
    eyebrow: "01 · Discover",
    title: "Explore interface",
    description:
      "Search, filter, and browse flows will be designed against synthetic records before any external data source is connected.",
  },
  {
    eyebrow: "02 · Understand",
    title: "Detail templates",
    description:
      "Reusable information layouts will establish hierarchy, missing-data behavior, and accessible navigation without official media.",
  },
  {
    eyebrow: "03 · Release",
    title: "Controlled publication",
    description:
      "Deployment, authorization, approved-data integration, review, and public activation remain separate reversible gates.",
  },
] as const;

const stages = [
  "Build the frontend shell and original design system.",
  "Validate primary flows with synthetic content.",
  "Deploy a clearly labelled, non-indexed review preview.",
  "Prepare a precise permission and data-access request for lowiro.",
  "Integrate only the scope explicitly approved in writing.",
] as const;

export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Arcaea Viewer home">
          <span className="brand-mark" aria-hidden="true">
            AV
          </span>
          <span>
            <strong>Arcaea Viewer</strong>
            <small>Frontend prototype</small>
          </span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#foundation">Foundation</a>
          <a href="#process">Process</a>
          <a href="#status">Status</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="kicker">Synthetic-only development · No game data</p>
            <h1>A serious product shell before the data request.</h1>
            <p className="hero-lede">
              This repository now focuses on the frontend MVP: information
              architecture, interaction quality, accessibility, and a
              controlled path from prototype to an authorized release.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#foundation">
                Review the foundation
              </a>
              <a className="button button-secondary" href="#process">
                See the release path
              </a>
            </div>
          </div>

          <aside className="status-card" id="status" aria-labelledby="status-title">
            <p className="status-label">Current state</p>
            <h2 id="status-title">Frontend skeleton</h2>
            <dl>
              <div>
                <dt>Catalog</dt>
                <dd>Synthetic only</dd>
              </div>
              <div>
                <dt>Official assets</dt>
                <dd>Not included</dd>
              </div>
              <div>
                <dt>Backend</dt>
                <dd>Not required</dd>
              </div>
              <div>
                <dt>Public release</dt>
                <dd>Blocked</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="section" id="foundation">
          <div className="section-heading">
            <p className="kicker">MVP foundation</p>
            <h2>Build product value before infrastructure.</h2>
            <p>
              The first milestone is a coherent, testable user experience.
              Data services are introduced only when an approved source and a
              measured product requirement exist.
            </p>
          </div>

          <div className="card-grid">
            {foundations.map((item) => (
              <article className="feature-card" key={item.title}>
                <p>{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <span>{item.description}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section process" id="process">
          <div className="section-heading">
            <p className="kicker">Controlled delivery</p>
            <h2>One product repo now. Split only at real boundaries.</h2>
            <p>
              A future data repository needs its own validated source,
              versioning, and publication lifecycle. A backend repository needs
              independently deployable behavior that static delivery cannot
              satisfy.
            </p>
          </div>

          <ol className="stage-list">
            {stages.map((stage, index) => (
              <li key={stage}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{stage}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer>
        <p>
          Unofficial development prototype. Not affiliated with, sponsored by,
          approved by, or endorsed by lowiro.
        </p>
        <p>No Arcaea catalog data, artwork, audio, charts, or story text is included.</p>
      </footer>
    </>
  );
}
