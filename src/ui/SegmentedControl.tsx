import { useRef, type KeyboardEvent } from "react";

import {
  getBoundaryEnabledIndex,
  getNextEnabledIndex,
  type SegmentedOption,
} from "./interaction-types";

export interface SegmentedControlProps<T extends string> {
  label: string;
  value: T;
  options: readonly SegmentedOption<T>[];
  onValueChange: (value: T) => void;
  disabled?: boolean;
}

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onValueChange,
  disabled = false,
}: SegmentedControlProps<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const disabledOptions = options.map(
    (option) => disabled || Boolean(option.disabled),
  );
  const selectedIndex = options.findIndex((option) => option.value === value);
  const fallbackIndex = getBoundaryEnabledIndex(disabledOptions, "first");
  const tabStopIndex =
    selectedIndex >= 0 && !disabledOptions[selectedIndex]
      ? selectedIndex
      : fallbackIndex;

  function selectAndFocus(index: number) {
    const option = options[index];
    if (!option || disabledOptions[index]) {
      return;
    }

    onValueChange(option.value);
    refs.current[index]?.focus();
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
    <div className="ac-segmented-control" role="radiogroup" aria-label={label}>
      {options.map((option, index) => {
        const selected = option.value === value;
        const optionDisabled = disabledOptions[index];

        return (
          <button
            key={option.value}
            ref={(node: HTMLButtonElement | null) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={optionDisabled}
            tabIndex={index === tabStopIndex ? 0 : -1}
            data-selected={selected || undefined}
            onClick={() => selectAndFocus(index)}
            onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) =>
              handleKeyDown(index, event)
            }
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
