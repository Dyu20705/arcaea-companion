# Interaction Propagation and Code Connect Design

## Goal

Complete the remaining interaction-state coverage in the Figma component library, define a stable React component contract, and synchronize the Aether Prism token system into the `feat/app-shell-routing` branch without introducing official game assets or coupling route code to Figma implementation details.

## Scope

### Figma

Propagate real variants and accessibility contracts through:

- Filters: `FilterChip`, `FilterGroup`, `Select`.
- Selection controls: `SegmentedControl`, `DifficultySelector`.
- Content: `SongCard`, `SongRow`, `ContentCard`.

Each interactive family must expose only states that correspond to browser behavior. Hover is omitted from touch-only patterns. Focus-visible is distinct from hover. Selected/current/unavailable/disabled states remain perceivable without color alone.

### React/CSS

Create a small, typed UI layer that maps one-to-one to the Figma contract:

- semantic design tokens and theme modes;
- shared interaction state types;
- filter, selection-control, and content-card components;
- app-shell integration examples using synthetic fixture content;
- accessibility-first keyboard and focus behavior.

### Code Connect

Create local Code Connect-ready configuration and `.figma.tsx` mappings. Publishing remains blocked until the Figma account has a supported Dev or Full seat on an Organization or Enterprise plan. Local parsing must remain possible without changing runtime application code.

## Architecture

### Token boundary

`src/styles/tokens.css` is the single CSS source of truth for Aether Prism semantic roles. Components consume semantic custom properties only; component files do not introduce one-off color literals.

### Component boundary

Components live under `src/ui/` and expose typed props rather than visual-state strings derived from Figma. Native semantics are preferred:

- buttons for removable filter chips and disclosure triggers;
- fieldset/radio semantics for segmented controls and difficulty selection;
- native select for sort selection;
- links for navigable song/content cards.

Visual-only states such as hover and focus-visible are produced by CSS pseudo-classes. Business states such as selected, expanded, unavailable, disabled, and density are explicit props.

### Code Connect boundary

Code Connect files live under `src/ui/figma/` and import production components. They may map Figma variant names to typed props, but production components never import Code Connect packages.

## Component contracts

### FilterChip

```ts
interface FilterChipProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onRemove?: () => void;
}
```

A selected removable chip renders a separate accessible remove target. `aria-pressed` communicates toggle state when the chip itself is interactive.

### FilterGroup

```ts
interface FilterGroupProps {
  title: string;
  selectedCount?: number;
  expanded: boolean;
  disabled?: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onClear?: () => void;
  children: React.ReactNode;
}
```

Disclosure uses `aria-expanded` and `aria-controls`. Clear remains a separate action.

### Select

```ts
interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly { value: string; label: string }[];
}
```

The native select is retained for robust keyboard, mobile, and high-zoom behavior.

### SegmentedControl

```ts
interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface SegmentedControlProps<T extends string> {
  label: string;
  value: T;
  options: readonly SegmentedOption<T>[];
  onValueChange: (value: T) => void;
}
```

Uses radio semantics. Arrow keys move selection without losing focus.

### DifficultySelector

```ts
type Difficulty = "past" | "present" | "future" | "beyond";

interface DifficultySelectorProps {
  value: Difficulty;
  options: readonly {
    value: Difficulty;
    label: string;
    rating: string;
    unavailable?: boolean;
  }[];
  onValueChange: (value: Difficulty) => void;
}
```

Unavailable options remain visible but cannot be selected. Selected state combines border, surface, typography, and marker.

### SongCard and SongRow

Both consume a shared synthetic `SongSummary` model and render links. Unavailable content remains inspectable only when a route exists; otherwise the component exposes a non-link unavailable state.

```ts
interface SongSummary {
  id: string;
  title: string;
  artist: string;
  pack: string;
  difficulty: string;
  bpm: number;
  status: "synthetic" | "reviewed" | "unavailable";
}
```

### ContentCard

```ts
interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  featured?: boolean;
}
```

The whole card is a single link; nested interactive elements are prohibited.

## Testing

- Component tests assert native roles, labels, aria state, disabled behavior, keyboard selection, and links.
- Token tests assert required semantic custom properties exist in both Light and Dark scopes.
- Code Connect configuration is parsed locally when dependencies and Figma seat permit; publishing is not part of acceptance.
- `pnpm test`, `pnpm typecheck`, `pnpm build`, and `pnpm check` must pass in CI.

## Non-goals

- Implementing complete route screens or real catalog data.
- Publishing Code Connect to Figma while the seat requirement is unmet.
- Adding a third-party component library.
- Reproducing official Arcaea UI, fonts, artwork, or protected media.

## Definition of Done

- Figma target families expose real, reviewed variants and no documentation-only state claims.
- Representative Light/Dark, keyboard, narrow-width, and unavailable states are visually reviewed.
- Typed React components and semantic CSS tokens exist on `feat/app-shell-routing`.
- Code Connect-ready local contracts map the production component API.
- CI provides passing test, typecheck, and build evidence; any seat-based publish blocker is documented explicitly.
