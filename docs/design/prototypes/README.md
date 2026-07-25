# Web MVP Prototype Evidence

These SVG files are static, annotated design evidence for issue [#4](https://github.com/Dyu20705/arcaea-viewer/issues/4). They demonstrate layout direction and representative states for Home, Explore, and Song detail at desktop and narrow widths.

They are not production components, interactive prototypes, game assets, or legal approval.

## Files

| File | Viewport | Theme | Primary evidence |
| --- | ---: | --- | --- |
| [`home-desktop-light.svg`](home-desktop-light.svg) | 1440 × 900 | Light | App shell, project promise, search, freshness, highlights, categories, missing media. |
| [`home-narrow-dark.svg`](home-narrow-dark.svg) | 390 × 844 | Dark | Narrow navigation, priority order, compact search, stale state, single-column modules. |
| [`explore-desktop-dark.svg`](explore-desktop-dark.svg) | 1440 × 900 | Dark | Persistent filter rail, active filters, URL-owned result definition, media-optional cards. |
| [`explore-narrow-light.svg`](explore-narrow-light.svg) | 390 × 844 | Light | Filter trigger, active-filter chips, one-column results, stale catalog status. |
| [`song-detail-desktop-light.svg`](song-detail-desktop-light.svg) | 1440 × 900 | Light | Breadcrumb, identity/status, missing media, metadata, chart comparison, sources, relations. |
| [`song-detail-narrow-dark.svg`](song-detail-narrow-dark.svg) | 390 × 844 | Dark | Identity-first order, stacked charts, unknown value, source summary, related links. |

## Synthetic content

All names, identifiers, pack names, values, dates, and status examples in the prototypes are fictional. They exist only to exercise:

- long titles;
- multilingual text;
- missing images;
- uncertain values;
- stale catalog state;
- large result counts;
- multiple active filters;
- source/review status;
- related entities;
- narrow-screen wrapping.

No official Arcaea logo, character art, song jacket, screenshot, chart, audio, story text, or copied third-party UI asset is included.

## Review method

Review each SVG at:

- native size;
- 50% scale for overall hierarchy;
- 200% browser zoom;
- a high-contrast display setting where available.

Check:

1. Is the primary task and first action obvious?
2. Does content remain intelligible without media?
3. Are stale, unknown, missing, and reviewed states distinguishable without color alone?
4. Does the narrow version preserve task order rather than merely shrink the desktop layout?
5. Are source/review signals visible before the footer?
6. Does any element appear to imitate the official game, Sekai Viewer, or a community wiki?
7. Are text sizes and control targets plausible for implementation?
8. Do decorative accents remain subordinate to content and focus?

## Accessibility limitation

SVGs are static evidence. They cannot prove:

- keyboard behavior;
- focus movement/return;
- screen-reader output;
- live-region announcements;
- URL/history behavior;
- reduced-motion implementation;
- semantic table or disclosure markup;
- pointer target spacing in the final browser layout.

Those requirements are specified in [`../WEB_MVP_UI_DIRECTION.md`](../WEB_MVP_UI_DIRECTION.md) and require interactive implementation evidence in later issues.

Each SVG includes `<title>` and `<desc>` metadata for repository browsing, but the final application must use semantic HTML rather than embedding these SVGs as page implementations.

## Theme relationship

The prototypes use the proposed semantic tokens documented in [`../WEB_MVP_UI_DIRECTION.md`](../WEB_MVP_UI_DIRECTION.md). The Light and Dark labels are public-facing. Character-inspired roadmap labels are not exposed as product branding.

## Publication and reuse

These prototypes are original repository documentation. They use only geometric shapes, text, and synthetic data. They do not grant permission to use any Arcaea or third-party asset, trademark, prose, database expression, or UI design.
