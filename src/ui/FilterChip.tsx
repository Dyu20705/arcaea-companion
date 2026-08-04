export interface FilterChipProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  onRemove?: () => void;
}

export function FilterChip({
  label,
  selected = false,
  disabled = false,
  onSelectedChange,
  onRemove,
}: FilterChipProps) {
  return (
    <span
      className="ac-filter-chip"
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
    >
      <button
        type="button"
        className="ac-filter-chip__toggle"
        aria-pressed={selected}
        disabled={disabled || !onSelectedChange}
        onClick={() => onSelectedChange?.(!selected)}
      >
        {label}
      </button>

      {selected && onRemove ? (
        <button
          type="button"
          className="ac-filter-chip__remove"
          aria-label={`Remove ${label} filter`}
          disabled={disabled}
          onClick={onRemove}
        >
          <span aria-hidden="true">×</span>
        </button>
      ) : null}
    </span>
  );
}
