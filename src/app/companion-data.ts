import { routes } from "./route-paths";

export type NavigationNode = {
  label: string;
  to: string;
  children?: readonly NavigationNode[];
};

export type NavigationSection = {
  label: string;
  description: string;
  nodes: readonly NavigationNode[];
};

export const navigationSections: Record<"wiki" | "tools" | "about", NavigationSection> = {
  wiki: {
    label: "Wiki",
    description: "Structured game reference",
    nodes: [
      { label: "Overview", to: routes.wiki },
      {
        label: "Music Play",
        to: routes.wikiMusic,
        children: [
          { label: "Categories", to: `${routes.wikiMusic}#categories` },
          { label: "Packs", to: `${routes.wikiMusic}#packs` },
          { label: "Songs", to: `${routes.wikiMusic}#songs` },
        ],
      },
      {
        label: "Story Mode",
        to: routes.wikiStory,
        children: [
          { label: "Acts", to: `${routes.wikiStory}#acts` },
          { label: "Parts", to: `${routes.wikiStory}#parts` },
          { label: "Stories", to: `${routes.wikiStory}#stories` },
          { label: "Chapters", to: `${routes.wikiStory}#chapters` },
        ],
      },
      {
        label: "World Mode",
        to: routes.wikiWorld,
        children: [
          { label: "Event World Mode", to: `${routes.wikiWorld}#event-world-mode` },
          { label: "Chapters", to: `${routes.wikiWorld}#chapters` },
          { label: "Lost Chapter: Beyond", to: `${routes.wikiWorld}#lost-chapter` },
          { label: "Breached Chapters", to: `${routes.wikiWorld}#breached-chapters` },
        ],
      },
      { label: "Course Mode", to: routes.wikiCourse },
      { label: "Achievements", to: routes.wikiAchievements },
      {
        label: "Network System",
        to: routes.wikiNetwork,
        children: [
          { label: "Friends", to: `${routes.wikiNetwork}#friends` },
          { label: "Cloud Data", to: `${routes.wikiNetwork}#cloud-data` },
        ],
      },
      {
        label: "Elements",
        to: routes.wikiElement(),
        children: [
          { label: "Gameplay", to: routes.wikiElement("gameplay") },
          { label: "Scoring", to: routes.wikiElement("scoring") },
          { label: "Interface & Features", to: routes.wikiElement("interface-and-features") },
          { label: "Currency", to: routes.wikiElement("currency") },
          { label: "Partners", to: routes.wikiElement("partners") },
          { label: "Potential", to: routes.wikiElement("potential") },
        ],
      },
    ],
  },
  tools: {
    label: "Tools",
    description: "Planned utilities",
    nodes: [
      { label: "Overview", to: routes.tools },
      { label: "Planned tools", to: `${routes.tools}#planned-tools` },
      { label: "Release notes", to: `${routes.tools}#release-notes` },
    ],
  },
  about: {
    label: "About",
    description: "Project information",
    nodes: [
      { label: "Overview", to: routes.about },
      { label: "Announcements", to: routes.announcements },
      { label: "Status", to: routes.status },
      { label: "Support", to: routes.support },
    ],
  },
};

export type GameEvent = {
  id: string;
  title: string;
  status: "active" | "upcoming";
  timing: string;
};

export const gameEvents: readonly GameEvent[] = [
  { id: "limited-event-map", title: "Limited event map", status: "active", timing: "12 days remaining" },
  { id: "partner-rerun", title: "Partner rerun", status: "active", timing: "6 days remaining" },
  { id: "archive-campaign", title: "Archive campaign", status: "upcoming", timing: "Starts soon" },
  { id: "season-challenge", title: "Season challenge", status: "active", timing: "20 days remaining" },
];

export const gameNews = [
  { id: "version-notes", title: "Version update notes and archive changes", date: "2026-08-04", category: "Update" },
  { id: "new-songs", title: "New songs and pack availability", date: "2026-08-01", category: "Music" },
  { id: "world-schedule", title: "World Mode event schedule", date: "2026-07-28", category: "Event" },
] as const;

export type DifficultyType = "past" | "present" | "future" | "beyond" | "eternal";

export type SongDifficulty = {
  type: DifficultyType;
  level: string;
  constant: number;
  noteCount: number;
  releaseCondition: string;
  chart: string;
};

export type Song = {
  id: string;
  title: string;
  composer: string;
  lyricist?: string;
  arranger?: string;
  categoryId: string;
  packId: string;
  playbackTime: string;
  availableFrom: string;
  tags: readonly string[];
  audioUrl?: string;
  difficulties: readonly SongDifficulty[];
  trivia: readonly string[];
};

export const musicCategories = [
  { id: "original", name: "Original", summary: "18 packs · 214 songs" },
  { id: "collaboration", name: "Collaboration", summary: "9 packs · 76 songs" },
  { id: "memory-archive", name: "Memory Archive", summary: "42 releases" },
  { id: "world-extend", name: "World Extend", summary: "31 songs" },
  { id: "event", name: "Event Collection", summary: "12 packs" },
  { id: "other", name: "Other", summary: "Imported categories" },
] as const;

export const musicPacks = [
  { id: "sample-pack-01", categoryId: "original", name: "Sample Pack 01", summary: "12 songs · Updated recently" },
  { id: "sample-pack-02", categoryId: "original", name: "Sample Pack 02", summary: "10 songs" },
  { id: "sample-pack-03", categoryId: "original", name: "Sample Pack 03", summary: "14 songs" },
  { id: "sample-pack-04", categoryId: "original", name: "Sample Pack 04", summary: "8 songs" },
  { id: "sample-pack-05", categoryId: "original", name: "Sample Pack 05", summary: "11 songs" },
  { id: "sample-pack-06", categoryId: "original", name: "Sample Pack 06", summary: "9 songs" },
  { id: "collaboration-pack-01", categoryId: "collaboration", name: "Collaboration Pack 01", summary: "9 songs" },
] as const;

const sharedDifficulties: readonly SongDifficulty[] = [
  { type: "past", level: "4", constant: 4.5, noteCount: 620, releaseCondition: "Available by default", chart: "Chart reference" },
  { type: "present", level: "7", constant: 7.8, noteCount: 880, releaseCondition: "Clear Past", chart: "Chart reference" },
  { type: "future", level: "10+", constant: 10.7, noteCount: 1264, releaseCondition: "Complete pack condition", chart: "Chart reference" },
  { type: "beyond", level: "11", constant: 11.2, noteCount: 1410, releaseCondition: "World Mode unlock", chart: "Chart reference" },
];

export const songs: readonly Song[] = [
  {
    id: "sample-song-001",
    title: "Sample Song 001",
    composer: "Example Composer",
    arranger: "Example Arranger",
    categoryId: "original",
    packId: "sample-pack-01",
    playbackTime: "02:34",
    availableFrom: "2026-08-01",
    tags: ["vocal", "energetic", "archive"],
    audioUrl: "#audio",
    difficulties: sharedDifficulties,
    trivia: ["This sample record demonstrates the reusable song detail template."],
  },
  ...([2, 3, 4, 5, 6] as const).map((number) => ({
    id: `sample-song-00${number}`,
    title: `Sample Song 00${number}`,
    composer: "Example Composer",
    categoryId: "original",
    packId: "sample-pack-01",
    playbackTime: "02:40",
    availableFrom: "2026-08-01",
    tags: ["archive"],
    difficulties: sharedDifficulties,
    trivia: [],
  })),
];

export const storyActs = [
  { id: "act-i", name: "Act I", summary: "4 parts · 17 stories" },
  { id: "act-ii", name: "Act II", summary: "5 parts · 22 stories" },
  { id: "act-iii", name: "Act III", summary: "3 parts · 13 stories" },
  { id: "side-stories", name: "Side Stories", summary: "8 collections" },
  { id: "event-stories", name: "Event Stories", summary: "Seasonal lore" },
] as const;

export const storyParts = [
  { id: "part-i", actId: "act-i", name: "Part I", summary: "5 stories" },
  { id: "part-ii", actId: "act-i", name: "Part II", summary: "4 stories" },
  { id: "part-iii", actId: "act-i", name: "Part III", summary: "3 stories" },
  { id: "part-iv", actId: "act-i", name: "Part IV", summary: "5 stories" },
  { id: "epilogue", actId: "act-i", name: "Epilogue", summary: "2 stories" },
] as const;

export const storyRecords = [
  { id: "absolute-reason", partId: "part-i", name: "Absolute Reason", summary: "5 chapters · spoiler level 2" },
  { id: "fragmented-memory", partId: "part-i", name: "Fragmented Memory", summary: "4 chapters" },
  { id: "silent-answer", partId: "part-i", name: "Silent Answer", summary: "6 chapters" },
  { id: "another-story", partId: "part-i", name: "Another Story", summary: "3 chapters" },
  { id: "interlude", partId: "part-i", name: "Interlude", summary: "2 chapters" },
] as const;

export const storyChapters = [
  { id: "chapter-3-1", storyId: "absolute-reason", name: "Chapter 3.1", lore: "A text-only lore entry is revealed here after explicit confirmation.", trivia: ["Four related notes are available."] },
  { id: "chapter-3-2", storyId: "absolute-reason", name: "Chapter 3.2", lore: "The next chapter continues the written account.", trivia: [] },
  { id: "chapter-3-3", storyId: "absolute-reason", name: "Chapter 3.3", lore: "The narrative remains text-only and spoiler-gated.", trivia: [] },
  { id: "chapter-3-4", storyId: "absolute-reason", name: "Chapter 3.4", lore: "A later chapter entry.", trivia: [] },
  { id: "chapter-3-5", storyId: "absolute-reason", name: "Chapter 3.5", lore: "The final sample chapter entry.", trivia: [] },
] as const;

export const worldFamilies = [
  { id: "event-world-mode", title: "Event World Mode", description: "Time-bounded map groups." },
  { id: "chapters", title: "Chapters 1 → 10++", description: "Standard chapter groups and maps." },
  { id: "lost-chapter", title: "Lost Chapter: Beyond", description: "Distinct mechanics documented at chapter level." },
  { id: "breached-chapters", title: "Breached Chapters 1 → 3++", description: "A separate chapter family using the same map detail template." },
] as const;

export const worldMap = {
  id: "event-map-01",
  name: "Map 01 · Sample World Archive",
  staminaCost: 2,
  tiles: 35,
  steps: 128,
  unlockRequirement: "Complete prerequisite song",
  rewards: ["Fragments", "Ether Drops", "Partner"],
  mechanics: ["Restriction tiles", "Random song", "Stamina modifier"],
  trivia: ["Map-specific notes are attached to the map record."],
} as const;

export const courses = [1, 2, 3].map((courseNumber) => ({
  id: `course-${courseNumber}`,
  title: `Course ${courseNumber} · Phase ${courseNumber}`,
  available: courseNumber === 1,
  charts: [
    { title: "1. Sample Song", difficulty: "Past 7" },
    { title: "2. Sample Song", difficulty: "Present 9" },
    { title: "3. Sample Song", difficulty: "Future 10+" },
    { title: "4. Sample Song", difficulty: "Beyond 11" },
  ],
  rewards: ["Banner", "Fragments", "Archive item"],
}));

export const achievements = [
  { id: "first-steps", title: "First Steps", conditions: "Clear any chart.", points: 5, xp: 100, notes: "Basic progression", category: "Gameplay" },
  { id: "world-traveller", title: "World Traveller", conditions: "Complete a World Mode map.", points: 10, xp: 250, notes: "Event maps included", category: "World Mode" },
  { id: "story-reader", title: "Story Reader", conditions: "Reveal and finish a story chapter.", points: 5, xp: 120, notes: "Spoiler-safe tracking", category: "Story" },
  { id: "pure-memory", title: "Pure Memory", conditions: "Earn a Pure Memory on any chart.", points: 20, xp: 500, notes: "Difficulty-independent", category: "Gameplay" },
  { id: "course-clear", title: "Course Clear", conditions: "Complete a Course Mode course.", points: 15, xp: 350, notes: "Rewards granted once", category: "Course" },
] as const;

export const elementArticles = {
  gameplay: { title: "Gameplay", summary: "Play screen and judgement model", body: "Core gameplay concepts, timing windows, interactions, and related systems are presented as readable reference articles." },
  scoring: { title: "Scoring", summary: "Timing-based performance", body: "Grades, score calculations, clear states, and score-related mechanics." },
  "interface-and-features": { title: "Interface & Features", summary: "Application surfaces and controls", body: "Navigation, settings, play interfaces, and supporting game features." },
  currency: { title: "Currency", summary: "Resource types and uses", body: "A reference for currencies, rewards, acquisition paths, and usage boundaries." },
  partners: { title: "Partners", summary: "Stats, skills, and progression", body: "Partner records link statistics, skills, progression, and related game systems." },
  potential: { title: "Potential", summary: "Rating theory and inputs", body: "Potential inputs, rating behavior, exceptions, and related scoring concepts." },
} as const;
