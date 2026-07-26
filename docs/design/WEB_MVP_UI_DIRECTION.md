# Arcaea-Viewer Web MVP UI Direction

| Field | Decision |
| --- | --- |
| Status | Proposed for maintainer approval |
| Direction | Prismatic Archive |
| Related issue | [#4 — Original Arcaea-inspired UI direction](https://github.com/Dyu20705/arcaea-viewer/issues/4) |
| Pull request | [#85](https://github.com/Dyu20705/arcaea-viewer/pull/85) |
| Product contract | [PR #84 — Web MVP product requirements](https://github.com/Dyu20705/arcaea-viewer/pull/84) |
| Research evidence | [`UI_REFERENCE_RESEARCH.md`](UI_REFERENCE_RESEARCH.md) |
| Public theme labels | Light, Dark, System |
| Decision owner | Repository maintainer |

## 1. Direction summary

**Prismatic Archive** is an original editorial data-atlas for Arcaea information. It borrows only broad qualities appropriate to the project—contrast between light and dark, fragmented geometry, layered space, and musical rhythm—without reproducing the official game interface, Sekai Viewer, a community wiki, protected assets, logos, character silhouettes, or extracted color palettes.

The direction is defined by:

- clear identity and metadata before decoration;
- neutral layered surfaces with restrained angular accents;
- visible provenance, review, uncertainty, version, and freshness status;
- media-optional cards and details;
- compact but readable desktop information density;
- explicit narrow-screen, keyboard, zoom, reduced-motion, and missing-media behavior;
- a small semantic token system suitable for Tailwind CSS v4 implementation;
- neutral fallback primitives whenever an effect harms readability, performance, or originality.

The internal roadmap wording “Hikari-inspired light” and “Tairitsu-inspired dark” describes a research contrast only. The public UI uses **Light**, **Dark**, and **System**. Character names are not part of public theme branding.

## 2. Design principles

### 2.1 Information before decoration

A visitor should identify an entity, read its most useful facts, understand its status, and choose the next action before noticing decorative effects.

### 2.2 Original, not imitative

Existing products provide evidence about user problems. They do not provide reusable layout, composition, wording, iconography, branding, palette, or assets.

### 2.3 Trust is visible

Source, review, uncertainty, game-version, and catalog-freshness status are first-class UI elements. They are concise in the summary and available in detail through accessible disclosure.

### 2.4 Progressive density

The summary answers the primary task. Secondary facts, relationship detail, source detail, and long prose follow in predictable sections.

### 2.5 Media is optional

The layout remains complete when a song jacket, partner image, promotional image, or other media is legally unavailable or intentionally omitted.

### 2.6 Motion is nonessential

Motion may clarify state change but never carries required information, blocks input, or imitates game animation. Reduced motion disables nonessential transforms and transitions.

### 2.7 State is explicit

Loading, empty, invalid, unavailable, stale, offline, missing-media, uncertain, spoiler, unsupported, and error states have distinct visual and written treatment.

## 3. Visual language

### 3.1 Composition

- Use a stable rectangular content grid.
- Apply angular clipping or line accents to small decorative regions, never to the readable text container.
- Use one dominant content surface and at most one raised surface level per local region.
- Prefer whitespace, rule lines, typography, and status labels over ornamental panels.
- Keep decorative geometry outside focus outlines and hit targets.
- Avoid continuous background animation, parallax, particle systems, large blurs, and multiple stacked translucent layers.

### 3.2 Typography

Use the platform system font stack to avoid a font-download dependency:

```css
font-family:
  Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", sans-serif;
```

`Inter` is optional only when it is already available or a later issue approves self-hosting. The reliable fallback is the system stack.

Use `ui-monospace` only for IDs, versions, and diagnostic values.

| Role | Desktop target | Narrow target | Notes |
| --- | --- | --- | --- |
| Display | 40–48 px / 1.1 | 32–36 px / 1.15 | Home introduction only; never required for navigation. |
| Page title | 32–36 px / 1.2 | 28–32 px / 1.2 | One `h1` per route. |
| Section heading | 22–24 px / 1.3 | 20–22 px / 1.3 | Predictable content sections. |
| Body | 16–18 px / 1.55 | 16 px / 1.55 | Do not reduce below 16 px for dense tables. |
| Metadata | 14–16 px / 1.45 | 14–16 px / 1.45 | Muted color must still meet text contrast. |
| Label | 12–14 px / 1.3 | 12–14 px / 1.3 | Use weight and text, not all caps alone. |

### 3.3 Spacing and shape

Spacing scale:

```text
4, 8, 12, 16, 24, 32, 48, 64 CSS px
```

Shape rules:

- 4 px radius for compact controls and tags;
- 8 px radius for cards and panels;
- 12 px radius only for major raised surfaces;
- one optional clipped corner or angular pseudo-element per component;
- no pill shape for long text or every control;
- 1 px borders for structure; 2–3 px only for focus or active emphasis.

### 3.4 Iconography

- Prefer text labels for primary actions.
- Use a small, consistent open-source icon set only after dependency and license review.
- Every icon-only control requires an accessible name and at least a tooltip/help pattern that also works by keyboard.
- Do not redraw or imitate official Arcaea icons.

## 4. Theme token candidates

### 4.1 Semantic token contract

```css
--color-canvas;
--color-surface;
--color-surface-raised;
--color-text;
--color-text-muted;
--color-border-subtle;
--color-border-strong;
--color-accent;
--color-accent-contrast;
--color-focus;
--color-success;
--color-warning;
--color-danger;
--color-unknown;
--color-spoiler;
```

Components consume semantic tokens. They must not depend on character names or raw palette positions.

### 4.2 Light candidate

| Token | Value | Intended use |
| --- | --- | --- |
| `canvas` | `#F5F7FB` | Page background. |
| `surface` | `#FFFFFF` | Primary content surfaces. |
| `surface-raised` | `#E9EEF7` | Secondary/selected regions. |
| `text` | `#151922` | Primary text. |
| `text-muted` | `#4C566A` | Secondary text. |
| `border-subtle` | `#BCC6D6` | Decorative separation only. |
| `border-strong` | `#7D889B` | Control boundaries and non-text contrast. |
| `accent` | `#3D4FD7` | Links, selected state, primary accent. |
| `accent-contrast` | `#FFFFFF` | Text on accent. |
| `focus` | `#7A2FC2` | Focus indicator. |
| `success` | `#246B47` | Reviewed/available status. |
| `warning` | `#8A4B00` | Stale/attention status. |
| `danger` | `#B42318` | Error/unavailable status. |
| `unknown` | `#5C6470` | Unknown/unreviewed status. |
| `spoiler` | `#6C3BA0` | Spoiler state. |

### 4.3 Dark candidate

| Token | Value | Intended use |
| --- | --- | --- |
| `canvas` | `#11131A` | Page background. |
| `surface` | `#191D28` | Primary content surfaces. |
| `surface-raised` | `#232938` | Secondary/selected regions. |
| `text` | `#F5F7FB` | Primary text. |
| `text-muted` | `#B6C0D4` | Secondary text. |
| `border-subtle` | `#46506A` | Decorative separation only. |
| `border-strong` | `#73809B` | Control boundaries and non-text contrast. |
| `accent` | `#A8B5FF` | Links, selected state, primary accent. |
| `accent-contrast` | `#11131A` | Text on accent. |
| `focus` | `#F0A6FF` | Focus indicator. |
| `success` | `#74D5A7` | Reviewed/available status. |
| `warning` | `#FFC66D` | Stale/attention status. |
| `danger` | `#FF8B83` | Error/unavailable status. |
| `unknown` | `#B6C0D4` | Unknown/unreviewed status. |
| `spoiler` | `#D7B7FF` | Spoiler state. |

### 4.4 Preliminary contrast results

Ratios were calculated using the WCAG relative-luminance formula. These results validate token candidates only; every implemented component still requires state-specific testing.

| Pair | Ratio | Preliminary result |
| --- | ---: | --- |
| Light text / light canvas | 16.40:1 | Pass for normal text. |
| Light muted text / light canvas | 6.88:1 | Pass for normal text. |
| Light accent / light surface | 6.37:1 | Pass for normal text and links. |
| Light accent-contrast / light accent | 6.37:1 | Pass for normal text. |
| Light focus / light surface | 6.97:1 | Pass as a high-contrast focus candidate. |
| Light strong border / light canvas | 3.34:1 | Pass as a non-text boundary candidate. |
| Dark text / dark canvas | 17.30:1 | Pass for normal text. |
| Dark muted text / dark canvas | 10.14:1 | Pass for normal text. |
| Dark accent / dark surface | 8.59:1 | Pass for normal text and links. |
| Dark accent-contrast / dark accent | 9.47:1 | Pass for normal text. |
| Dark focus / dark surface | 9.30:1 | Pass as a high-contrast focus candidate. |
| Dark strong border / dark surface | 4.24:1 | Pass as a non-text boundary candidate. |

Do not use `border-subtle` as the sole visible boundary for interactive controls or focus.

## 5. App-shell and navigation contract

### 5.1 Desktop

Header order:

1. skip link;
2. project wordmark rendered as text, not an official-style logo;
3. primary navigation: Home, Explore, Wiki, Information;
4. global search entry;
5. settings/theme control.

The header may become sticky only when:

- focused content is not obscured;
- anchor and direct-navigation offsets are handled;
- the sticky height remains compact;
- zoom and narrow-screen testing passes.

Footer order:

- unofficial-project statement;
- About;
- Legal/corrections;
- contribution/repository link;
- catalog and application version where appropriate.

### 5.2 Narrow screen

- Use a text-labeled menu control with a visible expanded state.
- Keep global search separately reachable; do not hide all discovery behind the menu.
- The menu uses focus management and returns focus to its trigger on close.
- The menu is not a full-screen animated game panel.
- Theme and legal links remain reachable without scrolling through all content categories.

### 5.3 Breadcrumbs and local navigation

- No breadcrumb on Home or Explore.
- Entity and game-topic pages use concise breadcrumbs when they clarify category context.
- Long game-topic pages may use an on-page contents list after the introduction.
- Breadcrumbs do not replace the page heading.

## 6. Page-direction prototypes

The committed SVG files are annotated static prototypes using synthetic data and original geometry. They are not production components and do not prove interactive accessibility.

### 6.1 Home

Files:

- [`home-desktop-light.svg`](prototypes/home-desktop-light.svg)
- [`home-narrow-dark.svg`](prototypes/home-narrow-dark.svg)

Content order:

1. unofficial status and concise project promise;
2. global search;
3. catalog freshness;
4. reviewed highlights;
5. category entry points;
6. current information/status;
7. legal and source-aware footer.

Rules:

- No required hero image.
- Highlights may use neutral media placeholders.
- Stale or unavailable current information remains explicit.
- The primary action is search/explore, not a decorative call to action.

### 6.2 Explore

Files:

- [`explore-desktop-dark.svg`](prototypes/explore-desktop-dark.svg)
- [`explore-narrow-light.svg`](prototypes/explore-narrow-light.svg)

Desktop structure:

- query and result-definition header;
- left filter region;
- active-filter row;
- sort/view/result count;
- media-optional result cards or comparison table.

Narrow transformation:

- filters move to a focus-managed dialog/disclosure;
- active filters and clear/reset remain visible above results;
- sort and view controls remain text-labeled;
- results use one column;
- opening a result and returning preserves URL state.

Rules:

- Never show only icons for sort/view.
- Empty results retain the active result definition and recovery action.
- Invalid parameters are distinct from zero matches.
- A stale catalog notice remains outside the scrolling result list.

### 6.3 Song detail

Files:

- [`song-detail-desktop-light.svg`](prototypes/song-detail-desktop-light.svg)
- [`song-detail-narrow-dark.svg`](prototypes/song-detail-narrow-dark.svg)

Content order:

1. breadcrumb;
2. identity, aliases/disambiguation where approved, and status;
3. optional media frame;
4. key facts;
5. chart/difficulty comparison;
6. relationships;
7. provenance/review detail;
8. correction path.

Rules:

- A missing image does not displace the title or facts.
- Unknown values use an explicit textual state.
- Chart comparison must remain readable at narrow widths through stacked rows or a controlled labeled scroll region.
- Source and freshness status are visible before the footer.
- Related entities use typed labels rather than an undifferentiated recommendation carousel.

## 7. Search, filter, card, and table behavior

### 7.1 Search

- Search uses a visible label or persistent accessible name.
- The control communicates whether it searches all supported entities or the current type.
- Committed search state is reflected in the URL.
- Loading and result updates are announced without moving keyboard focus unexpectedly.
- No auto-complete suggestion may be required to submit a valid query.

### 7.2 Filters

- Group facets by user meaning, not schema storage.
- Show active filters outside the filter container.
- Each active filter is removable by keyboard and has a clear accessible name.
- “Clear all” is available only when at least one nondefault filter is active.
- Applying filters resets result page while retaining search and compatible sort state.
- Narrow-screen filter close returns focus to the trigger or result heading according to the action.

### 7.3 Cards

Cards are the default browse representation when:

- identity and a few high-value fields answer the scanning task;
- media is optional;
- the entire card is not implemented as nested interactive elements;
- status and missing values remain legible.

A card may contain:

- entity type;
- canonical name;
- one-line disambiguation;
- up to four comparison fields;
- concise review/uncertainty status;
- optional neutral media frame.

### 7.4 Tables

Tables are available when column comparison is the primary task and the catalog provides consistent fields.

Requirements:

- semantic table markup;
- visible column headings;
- sortable headings represented as buttons with state;
- no color-only difficulty/status encoding;
- narrow-screen stacked alternative or a contained labeled scroll region;
- sticky headings only after focus/zoom testing;
- missing values represented explicitly.

## 8. Media and image treatment

- Use a consistent reserved aspect ratio and dimensions to avoid layout shift.
- Prefer responsive AVIF/WebP outputs only after issue #11 and the asset-pipeline issue approve the source and permission record.
- Missing media uses an original neutral geometric placeholder, entity type, and concise text; it never substitutes copied media.
- Decorative geometry receives empty alternative text or is CSS-only.
- Informative media requires maintained alt text owned by the content record/workflow.
- Spoiler-sensitive media is not loaded or exposed in accessible names before reveal.
- Do not blur an unapproved protected image as a “placeholder.”
- Do not use remote third-party image URLs as an implicit asset pipeline.

## 9. Provenance and status presentation

Status components use text plus shape/icon where appropriate.

| Status | Summary treatment | Detailed treatment |
| --- | --- | --- |
| Reviewed | Compact success label and reviewed date. | Sources, applicable version/date, reviewer, and record status. |
| Unknown | Neutral label next to the missing field. | Explain that no approved value is available. |
| Uncertain | Warning label with concise reason. | Show conflicting/limited source context without choosing silently. |
| Stale | Persistent warning near page/result heading. | Catalog snapshot and last reviewed version/date. |
| Unavailable | Explicit neutral/danger treatment depending cause. | Explain publication or catalog limitation and recovery path. |
| Spoiler | Concealed region with scope label. | Explicit reveal control with reversible state. |
| Unsupported | Error boundary/status panel. | Version/validation details and safe support diagnostics. |

Do not encode reviewed as “official.” Community-maintained reviewed information remains unofficial.

## 10. Component inventory

| Component | Responsibility | Critical constraints |
| --- | --- | --- |
| App shell | Shared landmarks, navigation, footer, versions. | Skip link, focus order, direct-route recovery, no runtime navigation. |
| Primary navigation | Four product entry points. | Keyboard, current-page state, narrow transformation. |
| Search field | Enter catalog discovery. | URL ownership, visible scope, loading announcement. |
| Filter panel/dialog | Modify facets and ranges. | Focus management, active-state visibility, reset, narrow-screen behavior. |
| Active filter list | Explain the result definition. | Removable controls, no color-only state. |
| Sort/view controls | Change comparison order/representation. | Text labels, URL state, no icon-only ambiguity. |
| Result card | Scan entity identity and key facts. | Media optional, no nested interactive trap. |
| Comparison table | Compare consistent fields. | Semantic headers, sort state, zoom/narrow alternative. |
| Entity header | Establish identity, type, status, and key action. | Long/multilingual titles, missing media, uncertainty. |
| Metadata list | Present key/value facts. | Unknown state, wrapping, semantic description list where appropriate. |
| Chart list/table | Compare chart records. | Difficulty/status text, narrow transformation. |
| Media frame | Reserve optional visual content. | Permission-gated, alt-text ownership, no layout shift. |
| Provenance summary | Expose trust at a glance. | Never label community data “official.” |
| Source disclosure | Show review/source detail. | Keyboard disclosure, link clarity, long source names. |
| Status badge | Encode reviewed/unknown/stale/etc. | Text plus non-color cue, theme contrast. |
| Spoiler disclosure | Protect sensitive information. | No pre-reveal accessible-name leak, focus return. |
| Related-entity list | Continue typed navigation. | Stable links, relationship label, no recommendation claim. |
| Loading/empty/error/offline states | Explain system state and recovery. | Distinct causes, concise actions, safe diagnostics. |
| Theme control | Select Light/Dark/System. | No flash, system preference, storage failure. |

## 11. State matrix

Legend: `R` required, `A` applicable when data/interaction permits, `—` not applicable.

| Component | Default | Hover | Focus | Active/selected | Disabled | Loading | Empty | Error | Offline | Missing media | Unknown/uncertain | Stale | Spoiler |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Primary navigation | R | A | R | R | — | — | — | — | A | — | — | — | — |
| Search | R | A | R | A | A | R | A | R | R | — | — | R | — |
| Filter control | R | A | R | R | A | A | R | R | R | — | A | R | A |
| Result card | R | A | R | A | — | A | — | A | R | R | R | R | A |
| Comparison table | R | A | R | A | A | A | R | A | R | — | R | R | A |
| Entity header | R | A | R | — | — | A | — | R | R | R | R | R | A |
| Metadata list | R | — | A | — | — | A | A | R | R | A | R | R | R |
| Media frame | R | A | A | A | — | R | A | R | R | R | A | A | R |
| Provenance/source | R | A | R | A | — | A | A | R | R | — | R | R | A |
| Spoiler disclosure | R | A | R | R | A | — | A | R | R | A | R | R | R |
| Global route state | R | — | R | — | — | R | R | R | R | A | R | R | A |

## 12. Responsive behavior

### 12.1 Breakpoint principle

Breakpoints follow content failure, not a device list. Implementation may map them to Tailwind values after testing.

Initial review widths:

- 1440 px: dense desktop;
- 1024 px: compact desktop/tablet landscape;
- 768 px: single-rail transition;
- 390 px: common narrow viewport;
- 320 px: WCAG reflow acceptance width.

### 12.2 Required transformations

| Region | Wide behavior | Narrow behavior |
| --- | --- | --- |
| Header | Inline primary navigation and utility controls. | Menu disclosure/dialog plus separately reachable search. |
| Home highlights | Two/three-column editorial grid. | Single-column order preserving priority/status. |
| Explore filters | Persistent left rail. | Focus-managed overlay/disclosure; active filters remain on page. |
| Result cards | Two/three columns where content allows. | One column. |
| Result table | Full comparison columns. | Stacked rows or labeled contained horizontal region. |
| Entity header | Media and identity side by side. | Identity/status first, media second. |
| Metadata | Multi-column definition groups. | Single-column or two-column key/value pairs without truncation. |
| Related entities | Compact grid/list. | Stacked typed links. |
| Source detail | Inline summary and disclosure. | Full-width disclosure with wrapping links. |

At 200% text zoom, the layout must behave as a narrower layout rather than clipping or shrinking text.

## 13. Keyboard, focus, zoom, and motion contract

### 13.1 Keyboard and focus

- All interactive elements use native semantics where possible.
- Focus order matches reading and visual order.
- Visible focus uses the semantic `focus` token and is not removed.
- Sticky content and overlays must not fully obscure the focused component.
- Closing menu, filter, dialog, or spoiler disclosure returns focus predictably.
- Route changes move focus to the page heading or an intentional route announcement.
- Cards do not create nested link/button traps.
- Escape closes dismissible overlays without discarding already committed URL state.

### 13.2 Zoom and reflow

- Support 200% text zoom and a 320 CSS px viewport without whole-page horizontal scrolling.
- Do not truncate names, source labels, status text, or errors solely to preserve a desktop layout.
- Tables use the approved responsive alternative.
- Fixed heights are prohibited for prose, metadata, and error regions.

### 13.3 Reduced motion

Default motion guidelines:

- 120–180 ms for local opacity/color transitions;
- 180–240 ms for menu/filter spatial transitions;
- no continuous animation;
- no parallax;
- no essential information revealed only through motion.

Under `prefers-reduced-motion: reduce`:

- remove nonessential transforms and smooth scrolling;
- use immediate state changes or short opacity changes;
- preserve focus movement and status announcements.

## 14. Performance implications

These are design constraints, not final measured budgets.

- The app shell and core pages do not require a hero image, video, canvas, WebGL, or runtime/WASM import.
- Decorative geometry should be CSS or small original SVG; each committed prototype SVG is documentation, not a production bundle asset.
- Avoid multiple full-page `backdrop-filter` or blur layers.
- Reserve image dimensions before load.
- Lazy-load below-the-fold optional media.
- Do not render hidden mobile and desktop copies of the same large result set.
- Prefer pagination or measured incremental rendering over an unbounded result grid.
- Skeletons approximate final dimensions and stop when an error/empty state is known.
- Actual image, bundle, and Core Web Vitals budgets remain owned by later performance/asset issues.

## 15. Originality and legal boundary

### 15.1 Originality controls

- No official logo or close logo resemblance.
- No official UI layout, navigation, iconography, card composition, animation, or typography imitation.
- No copied Sekai Viewer or wiki layout.
- No palette extraction from official artwork.
- No character silhouette, song jacket, screenshot, audio waveform, chart, or story text in prototypes.
- All committed prototype content is synthetic and explicitly labeled.
- Angular accents are generic original geometry and remain subordinate to content.

### 15.2 Legal uncertainty

The lowiro derivative-works policy must be reviewed by issue #11 and the maintainer. This PR records, but does not resolve, the risk that an Arcaea-related software product may fall outside the policy's default permissions.

Until that decision is recorded:

- public theme names remain neutral;
- official assets and logos remain excluded;
- prototypes use synthetic content;
- no visual direction is described as endorsed, permitted, or legally cleared;
- public release remains subject to legal/provenance gate approval.

## 16. Rejected alternatives

| Alternative | Why rejected |
| --- | --- |
| Official Arcaea UI imitation | Affiliation, originality, asset, trademark, accessibility, and maintenance risk. |
| Sekai Viewer visual clone | Contradicts the issue outcome and imports another product's distinctive composition and assumptions. |
| Conventional wiki skin | Weakens fast discovery, URL-state clarity, and relationship-centered detail. |
| Heavy glassmorphism | Reduces text/focus contrast and creates GPU/performance cost. |
| Animated shard background | Nonessential motion competes with content and risks imitation. |
| Media-first masonry grid | Breaks when assets are missing, unlicensed, slow, or spoiler-sensitive. |
| Dashboard-style dense panels | Prioritizes metric volume and portfolio appearance over player tasks. |
| Custom font/icon package in Week 1 | Adds dependency/license/performance decisions before a demonstrated need. |
| Character-named public themes | Creates unnecessary branding/legal ambiguity; Light/Dark/System is clearer. |

## 17. Implementation handoff

### 17.1 Week 2 app shell (#5)

Must implement:

- landmarks, header, footer, skip link, primary/utility navigation;
- route shell and recovery states;
- Light/Dark/System preference behavior;
- direct navigation and focus movement;
- narrow-screen navigation;
- no public runtime/viewer entry.

### 17.2 Week 2 design system (#38)

Must implement:

- approved semantic tokens;
- typography, spacing, borders, focus, cards, tables, filters, status, provenance, media, and content primitives;
- component showcase covering both themes and representative states;
- reduced-motion and high-zoom behavior;
- no heavy component framework or copied asset.

### 17.3 Data and content issues (#7, #11, #14)

Must resolve:

- stable IDs and view models;
- source/review/version fields;
- legal publication and asset permission policy;
- long/multilingual labels;
- unknown/stale/spoiler/missing-media states;
- representative seed records for each prototype state.

## 18. Approval checklist

Issue #4 remains `status:human-required`. Before merge, the maintainer must explicitly approve:

- [ ] the reference-research synthesis and rejected patterns;
- [ ] the `Prismatic Archive` direction;
- [ ] public theme labels Light/Dark/System;
- [ ] the preliminary light and dark token candidates;
- [ ] component inventory and state matrix;
- [ ] Home, Explore, and Song detail desktop/narrow prototype direction;
- [ ] responsive, keyboard, focus, zoom, motion, media, and performance implications;
- [ ] originality controls and the unresolved legal dependency on issue #11;
- [ ] the handoff contract for issues #5 and #38.

Passing CI or AI-authored text is not maintainer approval.
