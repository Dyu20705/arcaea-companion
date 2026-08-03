import { Link } from "react-router";

import type { SongSummary } from "./interaction-types";

export interface SongRowProps {
  song: SongSummary;
  href?: string;
  selected?: boolean;
}

function SongRowContent({ song }: { song: SongSummary }) {
  return (
    <>
      <span className="av-song-row__media" aria-hidden="true">
        <span />
      </span>
      <span className="av-song-row__identity">
        <strong>{song.title}</strong>
        <small>{song.artist}</small>
      </span>
      <span className="av-song-row__pack">{song.pack}</span>
      <b className="av-song-row__difficulty">{song.difficulty}</b>
      <span className="av-song-row__bpm">{song.bpm}</span>
      <span className={`av-status-badge av-status-badge--${song.status}`}>
        {song.status}
      </span>
      <span className="av-song-row__chevron" aria-hidden="true">
        ›
      </span>
    </>
  );
}

export function SongRow({ song, href, selected = false }: SongRowProps) {
  const navigable = Boolean(href) && song.status !== "unavailable";

  if (navigable && href) {
    return (
      <Link
        className="av-song-row"
        to={href}
        data-selected={selected || undefined}
        aria-current={selected ? "page" : undefined}
      >
        <SongRowContent song={song} />
      </Link>
    );
  }

  return (
    <article
      className="av-song-row"
      data-selected={selected || undefined}
      data-unavailable={song.status === "unavailable" || undefined}
      aria-disabled={song.status === "unavailable" || undefined}
    >
      <SongRowContent song={song} />
    </article>
  );
}
