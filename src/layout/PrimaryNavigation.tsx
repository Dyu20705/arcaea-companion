import { NavLink } from "react-router";

import { routes } from "../app/route-paths";

export interface PrimaryNavigationProps {
  open: boolean;
  onNavigate?: () => void;
}

const items = [
  { to: routes.home, label: "Home", end: true },
  { to: routes.explore, label: "Explore", end: false },
  { to: routes.status, label: "Status", end: false },
] as const;

export function PrimaryNavigation({
  open,
  onNavigate,
}: PrimaryNavigationProps) {
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
          className={({ isActive }) =>
            `primary-nav__item${isActive ? " primary-nav__item--active" : ""}`
          }
        >
          <span className="primary-nav__marker" aria-hidden="true" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
