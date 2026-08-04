import { createBrowserRouter, type RouteObject } from "react-router";

import { AppShell } from "../layout/AppShell";
import {
  AboutRoute,
  AchievementsRoute,
  CourseRoute,
  ElementsRoute,
  MusicRoute,
  NetworkRoute,
  NotFoundRoute,
  SongDetailRoute,
  StoryRoute,
  ToolsRoute,
  WikiOverviewRoute,
  WorldRoute,
} from "../routes/companion";
import { HomeRoute } from "../routes/HomeRoute";
import { RootRouteErrorBoundary } from "../routes/RootRouteErrorBoundary";

export interface AppRouteHandler {
  title: string;
  description: string;
  keywords: string[];
}

function routeHandle(title: string, description: string, keywords: string[]): AppRouteHandler {
  return { title, description, keywords };
}

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    Component: AppShell,
    ErrorBoundary: RootRouteErrorBoundary,
    children: [
      {
        index: true,
        Component: HomeRoute,
        handle: routeHandle("Home", "Events, news, and entry points into Arcaea Companion.", ["home", "events", "news"]),
      },
      {
        path: "wiki",
        Component: WikiOverviewRoute,
        handle: routeHandle("Wiki", "Structured Arcaea game reference.", ["wiki", "reference"]),
      },
      {
        path: "wiki/music",
        Component: MusicRoute,
        handle: routeHandle("Music Play", "Browse categories, packs, songs, and charts.", ["music", "packs", "songs"]),
      },
      {
        path: "wiki/music/songs/:songId",
        Component: SongDetailRoute,
        handle: routeHandle("Song Detail", "Song metadata and chart difficulties.", ["song", "difficulty"]),
      },
      {
        path: "wiki/story",
        Component: StoryRoute,
        handle: routeHandle("Story Mode", "Browse lore by act, part, story, and chapter.", ["story", "lore"]),
      },
      {
        path: "wiki/world",
        Component: WorldRoute,
        handle: routeHandle("World Mode", "World chapter and map reference.", ["world", "maps"]),
      },
      {
        path: "wiki/course",
        Component: CourseRoute,
        handle: routeHandle("Course Mode", "Course phases, charts, and rewards.", ["course", "phase"]),
      },
      {
        path: "wiki/achievements",
        Component: AchievementsRoute,
        handle: routeHandle("Achievements", "Achievement conditions, points, XP, and notes.", ["achievements"]),
      },
      {
        path: "wiki/network",
        Component: NetworkRoute,
        handle: routeHandle("Network System", "Friends and cloud-data mechanism reference.", ["network", "friends", "cloud"]),
      },
      {
        path: "wiki/elements/:slug?",
        Component: ElementsRoute,
        handle: routeHandle("Elements", "Gameplay, scoring, interface, currency, partners, and Potential.", ["elements", "gameplay"]),
      },
      {
        path: "tools",
        Component: ToolsRoute,
        handle: routeHandle("Tools", "Future utility development.", ["tools"]),
      },
      {
        path: "about",
        Component: AboutRoute,
        handle: routeHandle("About", "Project information and support routes.", ["about"]),
      },
      {
        path: "about/announcements",
        Component: AboutRoute,
        handle: routeHandle("Announcements", "Project announcements.", ["announcements"]),
      },
      {
        path: "about/status",
        Component: AboutRoute,
        handle: routeHandle("Status", "Application and data status.", ["status"]),
      },
      {
        path: "about/support",
        Component: AboutRoute,
        handle: routeHandle("Support", "Support and reporting guidance.", ["support"]),
      },
      {
        path: "*",
        Component: NotFoundRoute,
        handle: routeHandle("Not Found", "The requested route does not exist.", ["404"]),
      },
    ],
  },
];

export const router = createBrowserRouter(appRoutes);
