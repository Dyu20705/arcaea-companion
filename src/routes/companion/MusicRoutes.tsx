import { useMemo, useState, type ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { musicCategories, musicPacks, songs } from "../../app/companion-data";
import { routes } from "../../app/route-paths";
import { ColumnHeader, DifficultyBadge, HierarchyItem, MetricRow, PageIntro, Trivia } from "./primitives";

export function MusicRoute() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string>(musicCategories[0].id);
  const visiblePacks = useMemo(
    () => musicPacks.filter((pack) => pack.categoryId === categoryId),
    [categoryId],
  );
  const [packId, setPackId] = useState<string>(musicPacks[0].id);
  const selectedPackId = visiblePacks.some((pack) => pack.id === packId)
    ? packId
    : visiblePacks[0]?.id;
  const visibleSongs = useMemo(
    () =>
      songs.filter(
        (song) =>
          song.packId === selectedPackId &&
          `${song.title} ${song.composer}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, selectedPackId],
  );
  const [songId, setSongId] = useState<string>(songs[0].id);

  return (
    <div className="page-stack page-stack--compact">
      <PageIntro
        eyebrow="Music Play · Hierarchy browser"
        title="Music Play"
        description="Browse large collections without expanding every category or pack into the global sidebar."
      />
      <label className="browser-search">
        <span className="visually-hidden">Search categories, packs, or songs</span>
        <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="4" /><path d="m12 12 4 4" /></svg>
        <input value={query} onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} placeholder="Search categories, packs, or songs" />
      </label>
      <div className="selection-path" aria-label="Current selection">
        <span>{musicCategories.find((category) => category.id === categoryId)?.name}</span>
        <b aria-hidden="true">›</b>
        <span>{visiblePacks.find((pack) => pack.id === selectedPackId)?.name}</span>
        <b aria-hidden="true">›</b>
        <span>{visibleSongs.length} songs</span>
      </div>
      <div className="hierarchy-browser hierarchy-browser--music">
        <section id="categories" className="browser-column">
          <ColumnHeader title="Categories" count={musicCategories.length} />
          <div className="browser-column__list">
            {musicCategories.map((category) => (
              <HierarchyItem
                key={category.id}
                title={category.name}
                summary={category.summary}
                selected={category.id === categoryId}
                onSelect={() => {
                  setCategoryId(category.id);
                  const firstPack = musicPacks.find((pack) => pack.categoryId === category.id);
                  if (firstPack) setPackId(firstPack.id);
                }}
              />
            ))}
          </div>
        </section>
        <section id="packs" className="browser-column">
          <ColumnHeader title="Packs" count={visiblePacks.length} />
          <div className="browser-column__list">
            {visiblePacks.map((pack) => (
              <HierarchyItem
                key={pack.id}
                title={pack.name}
                summary={pack.summary}
                selected={pack.id === selectedPackId}
                onSelect={() => setPackId(pack.id)}
              />
            ))}
          </div>
        </section>
        <section id="songs" className="browser-column browser-column--songs">
          <ColumnHeader title="Songs" count={visibleSongs.length} />
          <div className="browser-column__list">
            {visibleSongs.map((song, index) => {
              const difficulty = song.difficulties[index % song.difficulties.length];
              return (
                <HierarchyItem
                  key={song.id}
                  title={song.title}
                  summary={song.composer}
                  selected={song.id === songId}
                  onSelect={() => {
                    setSongId(song.id);
                    navigate(routes.wikiSong(song.id));
                  }}
                  trailing={<DifficultyBadge type={difficulty.type} level={difficulty.level} />}
                />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export function SongDetailRoute() {
  const { songId } = useParams();
  const song = songs.find((item) => item.id === songId) ?? songs[0];

  return (
    <div className="page-stack page-stack--compact">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to={routes.wiki}>Wiki</Link><span>›</span><Link to={routes.wikiMusic}>Music Play</Link><span>›</span><span>{song.title}</span>
      </nav>
      <section className="song-hero">
        <div className="song-cover" aria-hidden="true"><span /></div>
        <div>
          <h1>{song.title}</h1>
          <p>{musicPacks.find((pack) => pack.id === song.packId)?.name} · {musicCategories.find((category) => category.id === song.categoryId)?.name} · {song.tags.join(" · ")}</p>
          {song.audioUrl ? <a href={song.audioUrl} className="audio-link">Audio link</a> : null}
        </div>
      </section>
      <section className="content-section">
        <h2>Song metadata</h2>
        <dl className="metric-grid">
          <MetricRow label="ID" value={song.id} />
          <MetricRow label="Composer" value={song.composer} />
          <MetricRow label="Actual playback time" value={song.playbackTime} />
          <MetricRow label="Lyricist" value={song.lyricist ?? "—"} />
          <MetricRow label="Available from" value={song.availableFrom} />
          <MetricRow label="Arranger" value={song.arranger ?? "—"} />
          <MetricRow label="Category / Pack" value={`${song.categoryId} / ${song.packId}`} />
          <MetricRow label="Tags" value={song.tags.join(", ")} />
        </dl>
      </section>
      <section className="content-section">
        <h2>Difficulties</h2>
        <div className="table-scroll">
          <table className="data-table difficulty-table">
            <thead><tr><th>Type</th><th>Level</th><th>Constant</th><th>Notes</th><th>Release condition</th><th>Chart</th></tr></thead>
            <tbody>
              {song.difficulties.map((difficulty) => (
                <tr key={difficulty.type}>
                  <th scope="row" className={`difficulty-cell difficulty-cell--${difficulty.type}`}><DifficultyBadge type={difficulty.type} level="" /></th>
                  <td>{difficulty.level}</td><td>{difficulty.constant}</td><td>{difficulty.noteCount}</td><td>{difficulty.releaseCondition}</td><td>{difficulty.chart}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Trivia>{song.trivia.length ? <ul>{song.trivia.map((item) => <li key={item}>{item}</li>)}</ul> : <p>No trivia has been recorded.</p>}</Trivia>
    </div>
  );
}
