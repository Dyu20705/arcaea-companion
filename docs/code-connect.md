# Code Connect handoff

## Source contract

- Repository branch: `feat/app-shell-routing`
- Figma file: `QJGevc16EkYfnOttxan2iK`
- Config: `figma.config.json`
- Templates: `code-connect/**/*.figma.ts`
- Dev Mode label: `React · Aether Prism`

## Connected component sets

| Code component | Figma node |
| --- | --- |
| `FilterChip` | `21:193` |
| `FilterGroup` | `21:213` |
| `SelectField` | `21:223` |
| `SegmentedControl` | `81:45` |
| `DifficultySelector` | `81:150` |
| `SongCard` | `22:83` |
| `SongRow` | `22:128` |
| `ContentCard` | `22:140` |

## Mapping rule

Business state is represented by React props:

- selected;
- expanded;
- disabled;
- selected value;
- unavailable data;
- featured emphasis.

Browser interaction state is not exposed as application props:

- hover;
- focus-visible;
- pressed.

Those states are implemented with CSS pseudo-classes and semantic tokens. This prevents Figma presentation states from leaking into application state management.

## Local review

Install or invoke the official Code Connect CLI, then preview the templates from the repository root:

```bash
npx figma connect preview
```

A specific template can be previewed with:

```bash
npx figma connect preview code-connect/FilterChip.figma.ts
```

## Publish blocker

Publishing is intentionally not part of this branch's Definition of Done. The currently connected Figma account/file does not expose Code Connect publishing through the available integration and reported that a supported Dev or Full seat on an Organization or Enterprise plan is required.

When the account requirement is resolved, publish explicitly with a Figma access token:

```bash
npx figma connect publish --token="$FIGMA_ACCESS_TOKEN"
```

Do not publish from an unreviewed branch. Confirm the final branch name and source links before publishing.
