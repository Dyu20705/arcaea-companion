import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router";

import type { NavigationSection } from "../app/companion-data";

export interface SectionSidebarProps {
  section: NavigationSection;
  open: boolean;
  onClose: () => void;
}

function normalizePath(path: string) {
  return path.split("#", 1)[0];
}

export function SectionSidebar({ section, open, onClose }: SectionSidebarProps) {
  const location = useLocation();
  const activeParentLabels = useMemo(
    () =>
      section.nodes
        .filter((node) => {
          const parentPath = normalizePath(node.to);
          return (
            location.pathname === parentPath ||
            node.children?.some((child) => location.pathname === normalizePath(child.to))
          );
        })
        .map((node) => node.label),
    [location.pathname, section.nodes],
  );
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(
    () => new Set(activeParentLabels),
  );

  useEffect(() => {
    setExpanded((current) => new Set([...current, ...activeParentLabels]));
  }, [activeParentLabels]);

  return (
    <aside
      id="section-navigation"
      className="section-sidebar"
      aria-label={`${section.label} navigation`}
      data-open={open || undefined}
    >
      <div className="section-sidebar__header">
        <div>
          <p>{section.label.toUpperCase()}</p>
          <span>{section.description}</span>
        </div>
        <button type="button" className="section-sidebar__close" onClick={onClose}>
          <span aria-hidden="true">×</span>
          <span className="visually-hidden">Close section navigation</span>
        </button>
      </div>

      <nav className="section-tree">
        {section.nodes.map((node) => {
          const hasChildren = Boolean(node.children?.length);
          const isExpanded = expanded.has(node.label);
          return (
            <div className="section-tree__group" key={node.label}>
              <div className="section-tree__parent-row">
                <NavLink
                  to={node.to}
                  end={node.to === "/wiki" || node.to === "/tools" || node.to === "/about"}
                  onClick={onClose}
                  className={({ isActive }: { isActive: boolean }) =>
                    `section-tree__link section-tree__link--parent${
                      isActive ? " section-tree__link--active" : ""
                    }`
                  }
                >
                  {node.label}
                </NavLink>
                {hasChildren ? (
                  <button
                    type="button"
                    className="section-tree__toggle"
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? "Collapse" : "Expand"} ${node.label}`}
                    onClick={() =>
                      setExpanded((current) => {
                        const next = new Set(current);
                        if (next.has(node.label)) next.delete(node.label);
                        else next.add(node.label);
                        return next;
                      })
                    }
                  >
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="m6.5 8 3.5 3.5L13.5 8" />
                    </svg>
                  </button>
                ) : null}
              </div>
              {hasChildren && isExpanded ? (
                <div className="section-tree__children">
                  {node.children?.map((child) => (
                    <NavLink
                      key={child.label}
                      to={child.to}
                      onClick={onClose}
                      className={({ isActive }: { isActive: boolean }) =>
                        `section-tree__link section-tree__link--child${
                          isActive ? " section-tree__link--active" : ""
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
