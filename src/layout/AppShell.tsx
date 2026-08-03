import { useRef } from "react";
import { Outlet } from "react-router";

import { RouteTransitionManager } from "./RouteTransitionManager";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function AppShell() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <SiteHeader />
      <RouteTransitionManager mainRef={mainRef} />

      <main
        ref={mainRef}
        id="main-content"
        className="app-main"
        tabIndex={-1}
      >
        <Outlet />
      </main>

      <SiteFooter />
    </>
  );
}
