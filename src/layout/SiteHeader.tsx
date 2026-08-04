import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { routes } from "../app/route-paths";
import { brandMark } from "../assets/brand-mark";
import { PrimaryNavigation } from "./PrimaryNavigation";

function BackIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M12.5 4.5 7 10l5.5 5.5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M8.1 2.7h3.8l.6 2.1c.4.2.8.4 1.2.7l2.1-.6 1.9 3.3-1.6 1.5v1.5l1.6 1.5-1.9 3.3-2.1-.6c-.4.3-.8.5-1.2.7l-.6 2.1H8.1l-.6-2.1c-.4-.2-.8-.4-1.2-.7l-2.1.6-1.9-3.3 1.6-1.5V9.7L2.3 8.2l1.9-3.3 2.1.6c.4-.3.8-.5 1.2-.7l.6-2.1Z" />
      <circle cx="10.78" cy="10" r="2.5" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="6.5" r="3" />
      <path d="M4.5 17c.6-3.1 2.4-4.7 5.5-4.7s4.9 1.6 5.5 4.7" />
    </svg>
  );
}

export function SiteHeader() {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const canGoBack = location.key !== "default" && location.pathname !== routes.home;

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" to={routes.home} aria-label="Arcaea Companion home">
          <img className="brand-mark" src={brandMark} alt="" />
          <span className="brand-copy">
            <strong>Arcaea Companion</strong>
            <small>v0.1.0</small>
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

        <div className="header-actions" aria-label="Application actions">
          <button
            type="button"
            className="header-action"
            aria-label={canGoBack ? "Go back" : "No previous page"}
            title={canGoBack ? "Back" : "No previous page"}
            disabled={!canGoBack}
            onClick={() => navigate(-1)}
          >
            <BackIcon />
          </button>
          <button
            type="button"
            className="header-action"
            aria-label="Settings — planned"
            title="Settings — planned"
            disabled
          >
            <SettingsIcon />
          </button>
          <button
            type="button"
            className="header-action"
            aria-label="Account — planned"
            title="Account — planned"
            disabled
          >
            <AccountIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
