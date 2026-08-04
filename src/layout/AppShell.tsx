import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router";

import { navigationSections } from "../app/companion-data";
import { SectionSidebar } from "./SectionSidebar";
import { SiteHeader } from "./SiteHeader";

type SectionKey = keyof typeof navigationSections;

function getSection(pathname: string): SectionKey | null {
  if (pathname.startsWith("/wiki")) return "wiki";
  if (pathname.startsWith("/tools")) return "tools";
  if (pathname.startsWith("/about")) return "about";
  return null;
}

export function AppShell() {
  const location = useLocation();
  const sectionKey = getSection(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setSidebarOpen(false);
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="app-root">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <div className={`app-shell${sectionKey ? " app-shell--section" : ""}`}>
        {sectionKey ? (
          <SectionSidebar
            section={navigationSections[sectionKey]}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        ) : null}
        {sectionKey && sidebarOpen ? (
          <button
            type="button"
            className="sidebar-backdrop"
            aria-label="Close section navigation"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}
        <main ref={mainRef} id="main-content" className="app-main" tabIndex={-1}>
          {sectionKey ? (
            <button
              type="button"
              className="section-menu-toggle"
              aria-controls="section-navigation"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(true)}
            >
              Browse {navigationSections[sectionKey].label}
            </button>
          ) : null}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
