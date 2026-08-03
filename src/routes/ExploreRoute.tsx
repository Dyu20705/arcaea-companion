import { useState } from "react";

import { routes } from "../app/route-paths";
import { DifficultySelector } from "../ui/DifficultySelector";
import { FilterChip } from "../ui/FilterChip";
import { FilterGroup } from "../ui/FilterGroup";
import { SegmentedControl } from "../ui/SegmentedControl";
import { SelectField } from "../ui/SelectField";
import { SongCard } from "../ui/SongCard";
import { SongRow } from "../ui/SongRow";
import type {
  Difficulty,
  DifficultyOption,
  SegmentedOption,
  SongSummary,
} from "../ui/interaction-types";

type Density = "comfortable" | "compact";

const densityOptions: readonly SegmentedOption<Density>[] = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
];

const difficultyOptions: readonly DifficultyOption[] = [
  { value: "past", label: "PAST", rating: "3" },
  { value: "present", label: "PRESENT", rating: "7" },
  { value: "future", label: "FUTURE", rating: "9+" },
  { value: "beyond", label: "BEYOND", rating: "10", unavailable: true },
];

const songs: readonly SongSummary[] = [
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
    difficulty: "FTR 9",
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

export function ExploreRoute() {
  const [density, setDensity] = useState<Density>("comfortable");
  const [difficulty, setDifficulty] = useState<Difficulty>("future");
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [futureSelected, setFutureSelected] = useState(true);
  const [sort, setSort] = useState("title");

  return (
    <div className="route-stack">
      <section className="route-intro" aria-labelledby="explore-title">
        <p className="eyebrow">Archive discovery</p>
        <h1 id="explore-title">Explore synthetic entries.</h1>
        <p>
          Filters update immediately on desktop. Keyboard focus and selected
          context remain stable across density and difficulty changes.
        </p>
      </section>

      <div className="explore-layout">
        <aside className="filter-panel" aria-label="Archive filters">
          <FilterGroup
            title="Difficulty"
            selectedCount={futureSelected ? 1 : 0}
            expanded={filtersExpanded}
            onExpandedChange={setFiltersExpanded}
            onClear={() => setFutureSelected(false)}
          >
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={futureSelected}
                onChange={(event) => setFutureSelected(event.target.checked)}
              />
              Future charts
            </label>
            <span className="filter-note">
              Beyond remains visible but unavailable in this fixture.
            </span>
          </FilterGroup>
        </aside>

        <section className="explore-results" aria-labelledby="results-title">
          <div className="explore-toolbar">
            <div className="active-filters" aria-label="Active filters">
              {futureSelected ? (
                <FilterChip
                  label="Future"
                  selected
                  onSelectedChange={setFutureSelected}
                  onRemove={() => setFutureSelected(false)}
                />
              ) : (
                <span className="filter-note">No active filters</span>
              )}
            </div>

            <SelectField
              label="Sort results"
              value={sort}
              options={[
                { value: "title", label: "Title A–Z" },
                { value: "updated", label: "Recently updated" },
              ]}
              onChange={(event) => setSort(event.target.value)}
            />

            <SegmentedControl
              label="Result density"
              value={density}
              options={densityOptions}
              onValueChange={setDensity}
            />
          </div>

          <div className="difficulty-region">
            <h2 id="results-title">Archive results</h2>
            <DifficultySelector
              value={difficulty}
              options={difficultyOptions}
              onValueChange={setDifficulty}
            />
          </div>

          <p className="results-summary" aria-live="polite">
            {songs.length} synthetic entries · {difficulty} · {sort}
          </p>

          {density === "comfortable" ? (
            <div className="song-card-grid">
              {songs.map((song) => (
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
          ) : (
            <div className="song-row-list">
              {songs.map((song) => (
                <SongRow
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
          )}
        </section>
      </div>
    </div>
  );
}
