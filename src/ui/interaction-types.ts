export type InteractionDirection = -1 | 1;

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export type Difficulty = "past" | "present" | "future" | "beyond";

export interface DifficultyOption {
  value: Difficulty;
  label: string;
  rating: string;
  unavailable?: boolean;
}

export interface SongSummary {
  id: string;
  title: string;
  artist: string;
  pack: string;
  difficulty: string;
  bpm: number;
  status: "synthetic" | "reviewed" | "unavailable";
}

export function getNextEnabledIndex(
  currentIndex: number,
  direction: InteractionDirection,
  disabled: readonly boolean[],
): number {
  if (disabled.length === 0) {
    return -1;
  }

  for (let offset = 1; offset <= disabled.length; offset += 1) {
    const candidate =
      (currentIndex + direction * offset + disabled.length) % disabled.length;

    if (!disabled[candidate]) {
      return candidate;
    }
  }

  return currentIndex;
}

export function getBoundaryEnabledIndex(
  disabled: readonly boolean[],
  boundary: "first" | "last",
): number {
  const start = boundary === "first" ? 0 : disabled.length - 1;
  const direction: InteractionDirection = boundary === "first" ? 1 : -1;

  for (let offset = 0; offset < disabled.length; offset += 1) {
    const candidate = start + direction * offset;
    if (!disabled[candidate]) {
      return candidate;
    }
  }

  return -1;
}
