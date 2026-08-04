import { useId, type SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label: string;
  options: readonly SelectOption[];
  error?: string;
}

export function SelectField({
  label,
  options,
  error,
  id,
  className,
  ...selectProps
}: SelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <label className={`ac-select-field ${className ?? ""}`} htmlFor={selectId}>
      <span className="ac-select-field__label">{label}</span>
      <span className="ac-select-field__control">
        <select
          {...selectProps}
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span aria-hidden="true">⌄</span>
      </span>
      {error ? (
        <span id={errorId} className="ac-select-field__error">
          {error}
        </span>
      ) : null}
    </label>
  );
}
