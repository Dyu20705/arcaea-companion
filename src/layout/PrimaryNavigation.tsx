import { NavLink } from "react-router";

import { routes } from "../app/route-paths";

export interface PrimaryNavigationProps {
  open: boolean;
  onNavigate?: () => void;
}

const items = [
  { to: routes.home, label: "Home", end: true },
  { to: routes.wiki, label: "Wiki", end: false },
  { to: routes.tools, label: "Tools", end: false },
  { to: routes.about, label: "About", end: false },
] as const;

export function PrimaryNavigation({ open, onNavigate }: PrimaryNavigationProps) {
  return (
    <nav
      id="primary-navigation"
      className="primary-nav"
      aria-label="Primary navigation"
      data-open={open || undefined}
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }: { isActive: boolean }) =>
            `primary-nav__item${isActive ? " primary-nav__item--active" : ""}`
          }
        >
          {item.label}
          <span className="primary-nav__indicator" aria-hidden="true" />
        </NavLink>
      ))}
    </nav>
  );
}
