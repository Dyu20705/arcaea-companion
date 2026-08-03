import {
    createBrowserRouter,
    type RouteObject,
} from "react-router";

import { AppShell } from "../layout/AppShell";
import { AboutRoute } from "../routes/AboutRoute";
import { ExploreRoute } from "../routes/ExploreRoute";
import { MusicPlayRoute } from "../routes/MusicPlayRoute";
import { StoryModeRoute } from "../routes/StoryModeRoute";
import { WorldModeRoute } from "../routes/WorldModeRoute";
import { CourseModeRoute } from "../routes/CourseModeRoute";
import { AchievementsRoute } from "../routes/AchievementsRoute";
import { NetworkSystemRoute } from "../routes/NetworkSystemRoute";
import { ElementsRoute } from "../routes/ElementsRoute";
import { StatusRoute } from "../routes/StatusRoute";
import { CategoryDetailRoute } from "../routes/CategoryDetailRoute";
import { PackDetailRoute } from "../routes/PackDetailRoute";
import { SongDetailRoute } from "../routes/SongDetailRoute";
import { ActDetailRoute } from "../routes/ActDetailRoute";
import { PartDetailRoute } from "../routes/PartDetailRoute";
import { ChapterDetailRoute } from "../routes/ChapterDetailRoute";
import { PartnerDetailRoute } from "../routes/PartnerDetailRoute";
import { HomeRoute } from "../routes/HomeRoute";
import { NotFoundRoute } from "../routes/NotFoundRoute";
import { RootRouteErrorBoundary } from "../routes/RootRouteErrorBoundary";

export interface AppRouteHandler {
    title: string;
    description: string;
    keywords: string[];
}

export const appRoutes: RouteObject[] = [
    {
        path: '/',
        Component: AppShell,
        ErrorBoundary: RootRouteErrorBoundary,
        children: [
            {
                index: true,
                Component: HomeRoute,
                handle: {
                    title: "Home",
                    description: "Welcome to the Home page",
                    keywords: ["home", "welcome"]
                } as AppRouteHandler,
                
            },
            {
                path: 'explore',
                Component: ExploreRoute,
                handle: {
                    title: "Explore",
                    description: "Discover new content and features",
                    keywords: ["explore", "discover"]
                } as AppRouteHandler,
            },
            {
                path: 'musicPlay',
                Component: MusicPlayRoute,
                handle: {
                    title: "Music Play",
                    description: "Enjoy your favorite music tracks",
                    keywords: ["music", "play", "tracks"]
                } as AppRouteHandler,
            },
            {
                path: 'storyMode',
                Component: StoryModeRoute,
                handle: {
                    title: "Story Mode",
                    description: "Engage in immersive story experiences",
                    keywords: ["story", "mode", "immersive"]
                } as AppRouteHandler,
            },
            {
                path: 'worldMode',
                Component: WorldModeRoute,
                handle: {
                    title: "World Mode",
                    description: "Explore different worlds and environments",
                    keywords: ["world", "mode", "explore"]
                } as AppRouteHandler,
            },
            {
                path: 'courseMode',
                Component: CourseModeRoute,
                handle: {
                    title: "Course Mode",
                    description: "Learn and progress through structured courses",
                    keywords: ["course", "mode", "learn"]
                } as AppRouteHandler,
            },
            {
                path: 'achievements',
                Component: AchievementsRoute,
                handle: {
                    title: "Achievements",
                    description: "Track your accomplishments and milestones",
                    keywords: ["achievements", "milestones", "track"]
                } as AppRouteHandler,
            },
            {
                path: 'networkSystem',
                Component: NetworkSystemRoute,
                handle: {
                    title: "Network System",
                    description: "Friends, your data in cloud and more",
                    keywords: ["network", "system", "connections"]
                } as AppRouteHandler,
            },
            {
                path: 'elements',
                Component: ElementsRoute,
                handle: {
                    title: "Elements",
                    description: "Explore the various elements in the game",
                    keywords: ["elements", "game", "explore"]
                } as AppRouteHandler,
            },
            {
                path: 'about',
                Component: AboutRoute,
                handle: {
                    title: "About",
                    description: "Learn more about our application and team",
                    keywords: ["about", "team", "application"]
                } as AppRouteHandler,
            },
            {
                path: 'status',
                Component: StatusRoute,
                handle: {
                    title: "Status",
                    description: "Check the current status of the application",
                    keywords: ["status", "application", "check"]
                } as AppRouteHandler,
            },
            {
                path: 'categories/:entityId',
                Component: CategoryDetailRoute,
                handle: {
                    title: "Category Detail",
                    description: "View details of the music play's category",
                    keywords: ["category", "detail", "view"]
                } as AppRouteHandler,
            },
            {
                path: 'packs/:entityId',
                Component: PackDetailRoute,
                handle: {
                    title: "Pack Detail",
                    description: "View details of the category's pack",
                    keywords: ["pack", "detail", "view"]
                } as AppRouteHandler,
            },
            {
                path: 'songs/:entityId',
                Component: SongDetailRoute,
                handle: {
                    title: "Song Detail",
                    description: "View details of the pack's song",
                    keywords: ["song", "detail", "view"]
                } as AppRouteHandler,
            },
            {
                path: 'acts/:entityId',
                Component: ActDetailRoute,
                handle: {
                    title: "Act Detail",
                    description: "View details of the story mode's act",
                    keywords: ["act", "detail", "view"]
                } as AppRouteHandler,
            },
            {
                path: 'parts/:entityId',
                Component: PartDetailRoute,
                handle: {
                    title: "Part Detail",
                    description: "View details of the story's arc's part",
                    keywords: ["part", "detail", "view"]
                } as AppRouteHandler,
            },
            {
                path: 'chapters/:entityId',
                Component: ChapterDetailRoute,
                handle: {
                    title: "Chapter Detail",
                    description: "View details of the world mode's chapter",
                    keywords: ["chapter", "detail", "view"]
                } as AppRouteHandler,
            },
            {
                path: 'partners/:entityId',
                Component: PartnerDetailRoute,
                handle: {
                    title: "Partner Detail",
                    description: "View details of the elements' partner",
                    keywords: ["partner", "detail", "view"]
                } as AppRouteHandler,
            },
        ],
    },
];

export const router = createBrowserRouter(appRoutes);



