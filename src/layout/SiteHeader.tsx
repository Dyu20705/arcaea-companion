import { useState } from "react";
import { Link } from "react-router";

import { routes } from "../app/route-paths";
import { PrimaryNavigation } from "./PrimaryNavigation";

export function SiteHeader() {
  const [navigationOpen, setNavigationOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" to={routes.home} aria-label="Arcaea Viewer home">
          <span className="brand-mark" aria-hidden="true">
            ◇
          </span>
          <span className="brand-copy">
            <strong>Arcaea Viewer</strong>
            <small>Synthetic prototype</small>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={navigationOpen}
          aria-controls="primary-navigation"
          onClick={() => setNavigationOpen((open) => !open)}
        >
          <span aria-hidden="true">{navigationOpen ? "×" : "☰"}</span>
          <span className="visually-hidden">Toggle navigation</span>
        </button>

        <PrimaryNavigation
          open={navigationOpen}
          onNavigate={() => setNavigationOpen(false)}
        />

        <span className="prototype-badge">
          <span aria-hidden="true">◇</span>
          Synthetic
        </span>
      </div>
    </header>
  );
}
