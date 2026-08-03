import { useId, type ReactNode } from "react";

export interface FilterGroupProps {
  title: string;
  selectedCount?: number;
  expanded: boolean;
  disabled?: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onClear?: () => void;
  children: ReactNode;
}

export function FilterGroup({
  title,
  selectedCount = 0,
  expanded,
  disabled = false,
  onExpandedChange,
  onClear,
  children,
}: FilterGroupProps) {
  const contentId = useId();

  return (
    <section
      className="av-filter-group"
      data-expanded={expanded || undefined}
      data-disabled={disabled || undefined}
    >
      <div className="av-filter-group__header">
        <button
          type="button"
          className="av-filter-group__trigger"
          aria-expanded={expanded}
          aria-controls={contentId}
          disabled={disabled}
          onClick={() => onExpandedChange(!expanded)}
        >
          <span>{title}</span>
          <span className="av-filter-group__count">
            {selectedCount === 0 ? "0" : `${selectedCount} selected`}
          </span>
          <span aria-hidden="true">{expanded ? "⌃" : "⌄"}</span>
        </button>

        {onClear && selectedCount > 0 ? (
          <button
            type="button"
            className="av-filter-group__clear"
            disabled={disabled}
            onClick={onClear}
          >
            Clear
          </button>
        ) : null}
      </div>

      <div
        id={contentId}
        className="av-filter-group__content"
        hidden={!expanded}
      >
        {children}
      </div>
    </section>
  );
}
