import { Link } from "react-router";

import type { SongSummary } from "./interaction-types";

export interface SongCardProps {
  song: SongSummary;
  href?: string;
  selected?: boolean;
}

function SongCardContent({ song }: { song: SongSummary }) {
  return (
    <>
      <span className="ac-song-card__media" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className={`ac-status-badge ac-status-badge--${song.status}`}>
        <span aria-hidden="true">◇</span>
        {song.status}
      </span>
      <strong className="ac-song-card__title">{song.title}</strong>
      <span className="ac-song-card__artist">{song.artist}</span>
      <span className="ac-song-card__metadata">
        <b>{song.difficulty}</b>
        <span>{song.pack}</span>
        <span>{song.bpm} BPM</span>
      </span>
    </>
  );
}

export function SongCard({ song, href, selected = false }: SongCardProps) {
  const className = "ac-song-card";
  const navigable = Boolean(href) && song.status !== "unavailable";

  if (navigable && href) {
    return (
      <Link
        className={className}
        to={href}
        data-selected={selected || undefined}
        aria-current={selected ? "page" : undefined}
      >
        <SongCardContent song={song} />
      </Link>
    );
  }

  return (
    <article
      className={className}
      data-selected={selected || undefined}
      data-unavailable={song.status === "unavailable" || undefined}
      aria-disabled={song.status === "unavailable" || undefined}
    >
      <SongCardContent song={song} />
    </article>
  );
}
