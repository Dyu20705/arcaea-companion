# Web MVP UI Reference Research

| Field | Value |
| --- | --- |
| Status | Research complete; synthesis proposed for maintainer approval |
| Related issue | [#4 — Research references and approve an original Arcaea-inspired UI direction](https://github.com/Dyu20705/arcaea-viewer/issues/4) |
| Pull request | [#85](https://github.com/Dyu20705/arcaea-viewer/pull/85) |
| Product dependency | [PR #84 — Web MVP product requirements](https://github.com/Dyu20705/arcaea-viewer/pull/84) |
| Research date | 2026-07-25 |
| Research owner | Repository maintainer with AI-assisted analysis |

## 1. Purpose

This research identifies reusable interaction and information-design patterns for Arcaea-Viewer without copying a game interface, Sekai Viewer, a community wiki, or another product's distinctive visual language.

The study covers eight references across:

- official Arcaea publication and policy;
- an Arcaea community reference;
- a game database viewer;
- a structured music database;
- a large faceted catalog;
- a data-query explorer;
- technical documentation;
- an accessibility-oriented design system.

The references are evidence, not templates. The accepted direction must remain original, static-catalog-first, source-aware, media-optional, accessible, and maintainable by one primary maintainer.

## 2. Method and evidence rules

For each reference, the review asked:

1. How does a user understand the information architecture?
2. How are global navigation, local navigation, search, filters, and result state exposed?
3. When are cards, tables, lists, or prose used?
4. How are missing media, uncertainty, version differences, empty results, and errors handled?
5. Which patterns remain usable by keyboard, at narrow widths, and under zoom?
6. Which patterns create legal, originality, performance, or maintenance risk for this project?

Evidence consists of public pages and official documentation reviewed on the research date. Third-party screenshots are intentionally not committed because visual captures and game media may be protected or require separate permission review. This document records observations and links only.

No source is treated as permission to copy prose, data expression, layout, branding, artwork, icons, screenshots, or other media.

## 3. Reference matrix

| Reference | Category | Evidence | Useful pattern | Limitation or risk | Decision |
| --- | --- | --- | --- | --- | --- |
| Official Arcaea site and derivative-works policy | Official product/policy | [Official site](https://arcaea.lowiro.com/en), [derivative policy](https://arcaea.lowiro.com/derivative_policy) | Establishes terminology, unofficial-content boundaries, and the need to avoid official logos/assets. | The policy states that official assets/logo may not be used and that software is not included in the default derivative-work permission. It is not a UI template. | Adopt the legal caution, visible unofficial status, and neutral placeholders. Do not copy presentation or treat this PR as legal approval. |
| Arcaea Wiki | Community domain reference | [Home](https://arcaea.fandom.com/wiki/Arcaea_Wiki), [songs by pack](https://arcaea.fandom.com/wiki/Songs_by_Pack), [story](https://arcaea.fandom.com/wiki/Story) | Demonstrates the breadth of player questions, version distinctions, dense comparison data, and the need for spoiler warnings. | Fandom chrome, very dense tables, uneven freshness, copied prose/media risk, and an article hierarchy not designed for this MVP. | Adopt domain-coverage questions and explicit version/spoiler status. Reject its layout, prose, table composition, and navigation hierarchy. |
| Sekai Viewer | Game database viewer | [Application](https://sekai.best), [repository](https://github.com/Sekai-World/sekai-viewer) | Shows fast list/detail discovery, dense metadata, media-led catalog browsing, and route-oriented feature separation. | Broad feature surface, strong media dependence, distinctive Material-style composition, and a different data/legal/maintenance context. | Adopt the expectation of fast discovery and related-entity navigation. Reject cloning cards, navigation, filters, colors, assets, or platform scope. |
| MusicBrainz | Structured music database | [Documentation](https://musicbrainz.org/doc/MusicBrainz_Documentation), [relationships](https://musicbrainz.readthedocs.io/en/latest/relationships/relationships.html), [search](https://musicbrainz.org/doc/MusicBrainz_API/Search) | Stable entity identity, explicit relationships, disambiguation, edit/review provenance, and entity-specific search. | Contributor/editor complexity and database terminology are too heavy for ordinary-player primary journeys. | Adopt relationship-centered detail pages, stable identity, and provenance visibility. Keep editing and schema complexity out of the public MVP. |
| Open Library | Large faceted catalog | [Search](https://openlibrary.org/search), [search help](https://openlibrary.org/search/howto), [search API](https://openlibrary.org/dev/docs/api/search) | Faceted browsing, query persistence, result counts, multiple result representations, and graceful missing-cover behavior. | Library-specific metadata, legacy density, and broad search syntax are unnecessary for the first release. | Adopt visible facets, active-filter context, result counts, shareable search state, and media-independent result cards. |
| Wikidata Query Service | Data explorer | [Query service](https://query.wikidata.org), [documentation](https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service) | Makes query state explicit, preserves reproducible results, distinguishes query input from output, and provides actionable failures. | SPARQL and developer-oriented controls impose excessive cognitive load for ordinary players. | Adopt transparent, reproducible state and clear failure boundaries. Hide query-language complexity behind focused product controls. |
| GitHub Docs | Technical information product | [Docs](https://docs.github.com), [accessibility](https://docs.github.com/en/get-started/accessibility) | Strong page hierarchy, breadcrumbs, local/on-page navigation, predictable content templates, and keyboard-aware interaction. | Dense global chrome and shortcut-heavy expert workflows should not become a dependency. | Adopt semantic hierarchy, breadcrumbs where they clarify location, and progressive disclosure. Keep primary actions visible without shortcuts. |
| GOV.UK Design System | Accessible information/service design | [Design System](https://design-system.service.gov.uk), [accessibility](https://design-system.service.gov.uk/accessibility/) | Plain language, robust focus treatment, explicit error patterns, accessible form controls, restrained visual hierarchy, and evidence-based components. | Government branding and exact component styling are not appropriate for this fan project. An accessible component library does not guarantee an accessible product. | Adopt clarity, focus/error discipline, and testing mindset. Re-express all components in the project's original visual system. |

## 4. Detailed findings

### 4.1 Official Arcaea site and policy

**Observed value**

- Official terminology and notices establish the authoritative naming context.
- The derivative-works policy is a direct design constraint: official assets, logos, music, and story text cannot be assumed reusable.
- The project must avoid appearing affiliated with or endorsed by lowiro.

**Adopt**

- Visible unofficial-project wording on home, about, and legal surfaces.
- Neutral original geometry and synthetic prototype data.
- A publication path in which missing permission produces omission or a neutral placeholder.
- Public theme labels `Light`, `Dark`, and `System`.

**Reject**

- Official logo treatment, close logo resemblance, copied character art, song jackets, screenshots, official UI chrome, story prose, audio, or color extraction from official artwork.
- Using internal character-inspired research codenames as public branding before legal review.

**Open risk**

The public fan-wiki/software legal basis remains **UNKNOWN — REQUIRES VALIDATION BY ISSUE #11 AND THE MAINTAINER**. This design PR cannot resolve it.

### 4.2 Arcaea Wiki

**Observed value**

- Players need cross-category coverage: songs, packs, partners, story, versions, systems, and recent information.
- Version differences and stale per-page information are significant trust concerns.
- Story content requires prominent spoiler treatment.
- Large tables can be useful for comparison but become difficult to scan and reflow.

**Adopt**

- Version/date applicability near the relevant information.
- Spoiler state as an explicit component state.
- Comparison tables only when column comparison is the user's primary task.
- Clear separation between category navigation and detail content.

**Reject**

- Article-tree navigation as the primary product model.
- Fandom-specific chrome, copied prose, copied table layouts, or media.
- Presenting every available field at the same hierarchy level.
- Treating a community page's presence as source or permission evidence.

### 4.3 Sekai Viewer

**Observed value**

- Game-database users expect responsive list/detail transitions and compact metadata.
- Related entities and category switching reduce repeated search.
- Dense media grids can make browsing fast when assets are available.

**Adopt**

- Fast catalog entry, compact result summaries, and direct related-entity links.
- Route-level boundaries between discovery and details.
- Lazy, optional media that does not block core metadata.

**Reject**

- A visual clone, equivalent navigation, identical card anatomy, copied filter layout, or Material-style dependency.
- Media-first page composition.
- Broad platform features outside the six-week wiki MVP.
- Any assumption that another GPL repository grants permission to reuse third-party game assets or content.

### 4.4 MusicBrainz

**Observed value**

- Entity identity and relationships are first-class rather than buried in prose.
- Disambiguation and aliases help users distinguish similar names.
- Edit/review history provides a model for visible trust and change status.
- Search is entity-aware.

**Adopt**

- Stable entity links, relationship sections, concise disambiguation, and visible source/review status.
- Specific relationship labels instead of generic “related” collections when the catalog can support them.
- Provenance accessible without overwhelming the primary summary.

**Reject**

- Public editing complexity, vote workflows, database terminology, and exhaustive relationship types in MVP UI.
- Exposing raw schema or source records as the ordinary-player interface.

### 4.5 Open Library

**Observed value**

- Facets remain visible around a large result set.
- Search state maps naturally to URLs and APIs.
- Missing covers do not prevent textual results from remaining useful.
- Result counts and active filters help users understand why a list changed.

**Adopt**

- Shareable active facets, clear result count, reset behavior, and a stable missing-media frame.
- Card/table selection only where each representation serves a distinct task.
- Result summaries that remain meaningful without an image.

**Reject**

- Advanced search syntax, library-specific metadata, and every available facet in the initial release.
- Large undifferentiated filter sidebars at narrow widths.

### 4.6 Wikidata Query Service

**Observed value**

- The query definition is inspectable and reproducible.
- Input, execution, loading, result, export, and error states are distinct.
- Failures provide enough context to correct the request.

**Adopt**

- Make the explore result definition visible through controls and URL state.
- Distinguish invalid parameters, empty results, unavailable indexes, and application errors.
- Preserve deterministic state for shared links.

**Reject**

- Raw query languages, developer-centric controls, arbitrary exports, or unrestricted data exploration in MVP.
- Treating powerful controls as inherently usable.

### 4.7 GitHub Docs

**Observed value**

- Predictable content templates and headings make large documentation sets scannable.
- Breadcrumbs, local navigation, and on-page navigation communicate location at different scales.
- Accessibility settings and keyboard documentation are explicit rather than implied.

**Adopt**

- Consistent page templates, clear landmarks/headings, contextual breadcrumbs on deep routes, and a small local contents pattern for long game-topic pages.
- Visible focus and keyboard-operable navigation without requiring shortcut knowledge.

**Reject**

- Repository/product chrome, dense multi-rail layouts, hover-dependent navigation, or character-key shortcuts for core tasks.

### 4.8 GOV.UK Design System

**Observed value**

- Plain language and restrained hierarchy keep task completion ahead of decoration.
- Error summaries and field-level messages explain what failed and how to recover.
- Components are supported by accessibility research and still require product-specific testing.
- Zoom, keyboard, focus, and assistive-technology behavior are treated as ongoing work.

**Adopt**

- Clear actions, concise recovery copy, visible focus, semantic controls, progressive disclosure, and evidence-based testing.
- Neutral accessible primitives as the fallback when decorative effects reduce clarity.

**Reject**

- GOV.UK branding, exact component appearance, or the assumption that reusing a pattern proves conformance.

## 5. Cross-reference synthesis

### 5.1 Information architecture

| Finding | Decision for Arcaea-Viewer |
| --- | --- |
| Community wikis provide breadth but often inherit article-tree complexity. | Use task-oriented entry points: Home, Explore, Wiki, Information, then entity details. |
| Structured databases make identity and relationships explicit. | Detail pages center stable identity, key facts, trust status, and typed relationships. |
| Documentation products use predictable templates. | Song, pack, partner, and game-topic surfaces use consistent section order and resilient states. |

### 5.2 Navigation

| Finding | Decision for Arcaea-Viewer |
| --- | --- |
| Dense products expose many top-level categories. | Keep four primary entries: Home, Explore, Wiki, Information. |
| Breadcrumbs help on deep content but add noise on shallow pages. | Use breadcrumbs on entity/topic routes, not on Home or Explore. |
| Narrow screens cannot retain permanent multi-rail navigation. | Collapse primary navigation and filters into separate, focus-managed disclosures/dialogs. |

### 5.3 Cards and tables

| Finding | Decision for Arcaea-Viewer |
| --- | --- |
| Cards support recognition and media; tables support comparison. | Cards are the default browse representation; tables are optional when supported comparison fields are available. |
| Media-first cards fail when images are missing or unlicensed. | Identity and key metadata remain primary; media occupies a reserved optional frame. |
| Wide tables become unusable under zoom. | Provide a stacked comparison alternative or controlled horizontal region with labels; never force whole-page horizontal scrolling. |

### 5.4 Search and filters

| Finding | Decision for Arcaea-Viewer |
| --- | --- |
| Faceted catalogs show active filters and counts. | Expose active filters, result count, clear/reset, and URL-owned state. |
| Data explorers make requests reproducible but expose expert complexity. | Keep the URL contract transparent while offering domain-specific controls. |
| Huge filter sets create decision cost. | Start with search, type, pack, difficulty, level range, sort, view, and page only when the catalog supports them. |

### 5.5 Image treatment

| Finding | Decision for Arcaea-Viewer |
| --- | --- |
| Game databases gain recognition speed from images. | Permit media only through the approved asset pipeline and permission record. |
| Large catalogs frequently contain missing covers. | Reserve dimensions and use a neutral geometric placeholder with useful text. |
| Official/game media creates licensing and performance risk. | No image is required for navigation, result identity, or page comprehension. |

### 5.6 Accessibility and resilience

| Finding | Decision for Arcaea-Viewer |
| --- | --- |
| Accessible patterns still require contextual testing. | Treat contrast, keyboard, zoom, reduced motion, and screen-reader review as acceptance evidence, not a component-library claim. |
| Errors are more useful when request and recovery are explicit. | Distinguish empty, invalid parameter, unavailable entity, stale snapshot, offline, corrupt catalog, and unexpected error. |
| Focus can be lost behind sticky navigation or overlays. | Define focus return, scroll padding, and focus-not-obscured behavior before implementation. |

## 6. Accepted design direction

The recommended direction is **Prismatic Archive**:

- an editorial data-atlas rather than a game-screen imitation;
- neutral layered surfaces with small original angular accents;
- high information clarity and visible trust status;
- media-optional entity cards and detail pages;
- compact desktop density with explicit narrow-screen transformations;
- semantic light/dark token systems labeled publicly as Light and Dark;
- no official visual assets, logos, character silhouettes, extracted palette, copied iconography, or copied layout.

The implementation contract is defined in [`WEB_MVP_UI_DIRECTION.md`](WEB_MVP_UI_DIRECTION.md).

## 7. Rejected directions

| Direction | Rejection reason |
| --- | --- |
| Official-game imitation | High affiliation, copyright, trademark, originality, and maintainability risk; conflicts with project policy. |
| Sekai Viewer clone | Fails the originality requirement and imports a different product/data/legal context. |
| Conventional wiki skin | Preserves article-tree navigation and weakens fast discovery, state visibility, and entity relationships. |
| Media-first gallery | Fails when assets are unavailable and increases layout-shift/performance/legal pressure. |
| Heavy glassmorphism and animated shards | Reduces contrast, focus clarity, text rendering, performance, and reduced-motion usability. |
| Enterprise analytics dashboard | Prioritizes portfolio appearance and metrics density over ordinary-player tasks. |

## 8. Research limitations

- This study is a structured expert review, not a usability study with Arcaea players.
- Responsive observations were limited to publicly observable behavior and documentation; no third-party screenshot corpus is stored.
- Legal interpretation remains outside the researcher's authority.
- The final frontend still requires keyboard, screen-reader, zoom, viewport, contrast, and performance testing.
- Catalog shape, record counts, and available media remain unresolved by issues #7, #11, and #14.

## 9. Handoff

This research unlocks a proposed visual direction for issue #4. It does not by itself authorize implementation or issue closure.

Before approval, the maintainer must review:

- the legal/originality boundary;
- the accepted and rejected patterns;
- the `Prismatic Archive` direction;
- the public Light/Dark/System naming;
- the component and state contract;
- the prototype evidence and known limitations.
