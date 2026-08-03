import { routes } from "../app/route-paths";
import { ContentCard } from "../ui/ContentCard";
import { SongCard } from "../ui/SongCard";
import type { SongSummary } from "../ui/interaction-types";

const recentSongs: readonly SongSummary[] = [
  {
    id: "prism-echo-001",
    title: "Prism Echo 001",
    artist: "Archive Artist 03",
    pack: "Archive Set B",
    difficulty: "FTR 9+",
    bpm: 180,
    status: "synthetic",
  },
  {
    id: "luminous-index-002",
    title: "Luminous Index 002",
    artist: "Archive Artist 08",
    pack: "Archive Set C",
    difficulty: "PRS 7",
    bpm: 164,
    status: "reviewed",
  },
  {
    id: "sealed-fragment-003",
    title: "Sealed Fragment 003",
    artist: "Archive Artist 11",
    pack: "Archive Set D",
    difficulty: "BYD 10",
    bpm: 196,
    status: "unavailable",
  },
];

export function HomeRoute() {
  return (
    <div className="route-stack">
      <section className="home-hero" aria-labelledby="home-title">
        <div>
          <p className="eyebrow">Prismatic archive · synthetic prototype</p>
          <h1 id="home-title">Explore a clear archive before data integration.</h1>
          <p>
            Search and inspect structured entries through an original,
            accessible interface that remains complete without official media.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href={routes.explore}>
              Explore archive
            </a>
            <a className="secondary-action" href={routes.status}>
              Review archive status
            </a>
          </div>
        </div>
        <div className="hero-prism" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="route-section" aria-labelledby="browse-title">
        <header className="section-heading">
          <p className="eyebrow">Discovery</p>
          <h2 id="browse-title">Quick browse</h2>
          <p>Compact entry points preserve context and avoid carousel traps.</p>
        </header>
        <div className="content-card-grid">
          <ContentCard
            title="Browse songs"
            description="Inspect synthetic identity, difficulty, status and metadata patterns."
            href={routes.explore}
            actionLabel="View songs"
          />
          <ContentCard
            title="Browse packs"
            description="Test collection hierarchy without depending on protected catalog data."
            href={routes.explore}
            actionLabel="View collections"
          />
          <ContentCard
            title="Recently updated"
            description="Surface review status and freshness with restrained provenance cues."
            href={routes.status}
            actionLabel="View status"
            featured
          />
        </div>
      </section>

      <section className="route-section" aria-labelledby="recent-title">
        <header className="section-heading">
          <p className="eyebrow">Synthetic catalog</p>
          <h2 id="recent-title">Recently updated</h2>
          <p>Every example is invented and safe to replace when authorization exists.</p>
        </header>
        <div className="song-card-grid">
          {recentSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              href={
                song.status === "unavailable"
                  ? undefined
                  : routes.songDetail(song.id)
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
