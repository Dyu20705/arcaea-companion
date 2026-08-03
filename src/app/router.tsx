import { createBrowserRouter, type RouteObject } from "react-router";

import { AppShell } from "../layout/AppShell";
import { ExploreRoute } from "../routes/ExploreRoute";
import { HomeRoute } from "../routes/HomeRoute";
import { NotFoundRoute } from "../routes/NotFoundRoute";
import { RootRouteErrorBoundary } from "../routes/RootRouteErrorBoundary";
import { RoutePlaceholder } from "../routes/RoutePlaceholder";

export interface AppRouteHandler {
  title: string;
  description: string;
  keywords: string[];
}

function routeHandle(
  title: string,
  description: string,
  keywords: string[],
): AppRouteHandler {
  return { title, description, keywords };
}

const placeholderRoutes: RouteObject[] = [
  {
    path: "musicPlay",
    Component: RoutePlaceholder,
    handle: routeHandle(
      "Music Play",
      "The archive taxonomy route is registered for a later synthetic prototype.",
      ["music", "archive", "taxonomy"],
    ),
  },
  {
    path: "storyMode",
    Component: RoutePlaceholder,
    handle: routeHandle(
      "Story Mode",
      "Story information architecture remains blocked until an approved content scope exists.",
      ["story", "mode"],
    ),
  },
  {
    path: "worldMode",
    Component: RoutePlaceholder,
    handle: routeHandle(
      "World Mode",
      "World hierarchy is registered without copying protected map or game-interface assets.",
      ["world", "mode"],
    ),
  },
  {
    path: "courseMode",
    Component: RoutePlaceholder,
    handle: routeHandle(
      "Course Mode",
      "Course structures will be validated with invented fixtures before data integration.",
      ["course", "mode"],
    ),
  },
  {
    path: "achievements",
    Component: RoutePlaceholder,
    handle: routeHandle(
      "Achievements",
      "Achievement presentation remains a registered, non-public prototype route.",
      ["achievements"],
    ),
  },
  {
    path: "networkSystem",
    Component: RoutePlaceholder,
    handle: routeHandle(
      "Network System",
      "Network and account behavior is outside the current frontend-only MVP.",
      ["network", "account"],
    ),
  },
  {
    path: "elements",
    Component: RoutePlaceholder,
    handle: routeHandle(
      "Elements",
      "Element and partner templates will use synthetic identity records first.",
      ["elements", "partners"],
    ),
  },
  {
    path: "about",
    Component: RoutePlaceholder,
    handle: routeHandle(
      "About",
      "Project purpose, authorization boundaries, and attribution will live here.",
      ["about", "authorization"],
    ),
  },
  {
    path: "status",
    Component: RoutePlaceholder,
    handle: routeHandle(
      "Status",
      "Archive provenance, freshness, and availability reporting is registered for the status prototype.",
      ["status", "availability"],
    ),
  },
  {
    path: "categories/:entityId",
    Component: RoutePlaceholder,
    handle: routeHandle(
      "Category Detail",
      "Synthetic category detail route.",
      ["category", "detail"],
    ),
  },
  {
    path: "packs/:entityId",
    Component: RoutePlaceholder,
    handle: routeHandle("Pack Detail", "Synthetic pack detail route.", ["pack", "detail"]),
  },
  {
    path: "songs/:entityId",
    Component: RoutePlaceholder,
    handle: routeHandle("Song Detail", "Synthetic song detail route.", ["song", "detail"]),
  },
  {
    path: "acts/:entityId",
    Component: RoutePlaceholder,
    handle: routeHandle("Act Detail", "Synthetic act detail route.", ["act", "detail"]),
  },
  {
    path: "parts/:entityId",
    Component: RoutePlaceholder,
    handle: routeHandle("Part Detail", "Synthetic part detail route.", ["part", "detail"]),
  },
  {
    path: "chapters/:entityId",
    Component: RoutePlaceholder,
    handle: routeHandle(
      "Chapter Detail",
      "Synthetic chapter detail route.",
      ["chapter", "detail"],
    ),
  },
  {
    path: "partners/:entityId",
    Component: RoutePlaceholder,
    handle: routeHandle(
      "Partner Detail",
      "Synthetic partner detail route.",
      ["partner", "detail"],
    ),
  },
];

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    Component: AppShell,
    ErrorBoundary: RootRouteErrorBoundary,
    children: [
      {
        index: true,
        Component: HomeRoute,
        handle: routeHandle(
          "Home",
          "Synthetic-first archive home.",
          ["home", "archive"],
        ),
      },
      {
        path: "explore",
        Component: ExploreRoute,
        handle: routeHandle(
          "Explore",
          "Search, filter, and inspect synthetic archive entries.",
          ["explore", "search", "filter"],
        ),
      },
      ...placeholderRoutes,
      {
        path: "*",
        Component: NotFoundRoute,
        handle: routeHandle(
          "Not Found",
          "The requested route does not exist.",
          ["404"],
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(appRoutes);
