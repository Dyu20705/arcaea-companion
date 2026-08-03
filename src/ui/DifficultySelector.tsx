import { useRef, type KeyboardEvent } from "react";

import {
  getBoundaryEnabledIndex,
  getNextEnabledIndex,
  type Difficulty,
  type DifficultyOption,
} from "./interaction-types";

export interface DifficultySelectorProps {
  value: Difficulty;
  options: readonly DifficultyOption[];
  onValueChange: (value: Difficulty) => void;
  label?: string;
}

export function DifficultySelector({
  value,
  options,
  onValueChange,
  label = "Difficulty",
}: DifficultySelectorProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const disabledOptions = options.map((option) => Boolean(option.unavailable));
  const selectedIndex = options.findIndex((option) => option.value === value);
  const fallbackIndex = getBoundaryEnabledIndex(disabledOptions, "first");
  const tabStopIndex =
    selectedIndex >= 0 && !disabledOptions[selectedIndex]
      ? selectedIndex
      : fallbackIndex;

  function selectAndFocus(index: number) {
    const option = options[index];
    if (!option || option.unavailable) {
      return;
    }

    onValueChange(option.value);
    refs.current[index]?.focus();
    refs.current[index]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLButtonElement>) {
    let targetIndex = -1;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      targetIndex = getNextEnabledIndex(index, 1, disabledOptions);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      targetIndex = getNextEnabledIndex(index, -1, disabledOptions);
    } else if (event.key === "Home") {
      targetIndex = getBoundaryEnabledIndex(disabledOptions, "first");
    } else if (event.key === "End") {
      targetIndex = getBoundaryEnabledIndex(disabledOptions, "last");
    }

    if (targetIndex >= 0) {
      event.preventDefault();
      selectAndFocus(targetIndex);
    }
  }

  return (
    <div
      className="av-difficulty-selector"
      role="radiogroup"
      aria-label={label}
    >
      {options.map((option, index) => {
        const selected = option.value === value;

        return (
          <button
            key={option.value}
            ref={(node: HTMLButtonElement | null) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${option.label} ${option.rating}${
              option.unavailable ? ", unavailable" : ""
            }`}
            disabled={option.unavailable}
            tabIndex={index === tabStopIndex ? 0 : -1}
            data-selected={selected || undefined}
            data-unavailable={option.unavailable || undefined}
            onClick={() => selectAndFocus(index)}
            onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) =>
              handleKeyDown(index, event)
            }
          >
            <span>{option.label}</span>
            <strong>{option.rating}</strong>
          </button>
        );
      })}
    </div>
  );
}
