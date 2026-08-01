# Six-Week Web MVP Roadmap

## Capacity

The plan assumes approximately three focused hours per day for six weeks. Scope is intentionally limited to a public, desktop-first wiki MVP.

The long-term player-companion direction—helping players regain inspiration, decide what to play, improve deliberately, and return to Arcaea—remains post-MVP. It must not add personal progression, recommendation, community-research, runtime, account, or backend dependencies to the six-week critical path.

## Process

The project uses a stage-gated hybrid:

- waterfall-like decision gates keep product, legal, data, and design work ordered;
- weekly vertical increments keep the product testable;
- each phase ends with evidence before the next phase becomes the priority;
- competitor research is converted into reusable guardrails rather than copied feature lists;
- attractive post-MVP ideas are recorded as separate issues instead of silently expanding an active issue.

The shared benchmark and content rules are documented in [Arcaea Wiki Benchmark and Product Guardrails](../product/WIKI_BENCHMARK_AND_PRODUCT_GUARDRAILS.md).

## Cross-phase product guardrails

Every content-facing issue must answer:

- What player question does this surface answer?
- Is each value a verified fact, maintainer summary, community observation, unknown, disputed, or historical item?
- Does Mobile/Switch or game-version applicability change the answer?
- Are high-impact facts traceable to appropriate evidence?
- Can the route remain useful without media?
- Is dense data progressively disclosed and usable at narrow widths and high zoom?
- Does the design avoid copying another wiki’s wording, layout, templates, tables, media, or visual identity?
- What makes the content stale, and how is that state shown?
- Can one primary maintainer update and audit the surface sustainably?
- Is any proposed capability actually post-MVP work?

## Week 1 — Discovery and design gate

Outputs:

- charter, PRD, sitemap, content taxonomy, and non-goals;
- source and asset policy;
- static data architecture decision;
- reference research and original UI direction;
- competitor benchmark converted into content, data, UX, and maintenance guardrails;
- canonical issue/dependency map.

Required decisions:

- distinguish verified facts, original summaries, community observations, unknowns, disputes, and historical values;
- define when platform/version applicability and field-level provenance are required;
- prohibit copying or scraping third-party wiki prose, layouts, templates, media, and databases;
- define a small reviewed seed scope rather than claiming broad or real-time coverage;
- preserve the player-companion vision as post-MVP without encoding speculative fields into the current catalog.

Gate: a reviewer can explain the MVP, its data sources, legal boundaries, routes, user flows, visual direction, competitor-derived guardrails, and post-MVP exclusions without reading the implementation.

## Week 2 — Web foundation

Outputs:

- Rsbuild/Rspack migration plan and implementation;
- Tailwind CSS v4 foundation;
- routing, layout, theme, settings, design tokens;
- schema validation and static catalog loader;
- quality gate and initial security baseline;
- licensed-asset pipeline design.

Foundation requirements:

- catalog and view-model boundaries can represent unknown, disputed, stale, historical, platform-specific, and version-specific states where approved;
- media-free page behavior is a first-class state;
- generated indexes do not force raw multi-file joins into route components;
- presentation primitives support progressive disclosure, dense facts, histories, long labels, and source-status patterns;
- no recommendation, personal profile, subjective difficulty, community vote, or runtime field is added speculatively.

Gate: a production build renders the app shell, themes, routes, sample data, provenance/applicability states, and recovery states with no runtime viewer exposed.

## Week 3 — Core wiki product

Outputs:

- homepage with reviewed release/event content, project/game introduction, beginner entry, and catalog discovery;
- explore search, sort, filters, and shareable URL state;
- song and pack detail surfaces;
- related-entity navigation and source/status presentation.

Product requirements:

- the homepage does not become a long chronological news dump or imply real-time completeness;
- explore exposes result definition, active filters, reset, unknown-value behavior, and deterministic URL state;
- song/pack pages put common lookup facts before exhaustive history;
- platform/version differences and material value history are visible where approved;
- exhaustive tables are used only when they answer a validated task and remain accessible;
- every primary path works without artwork.

Gate: a player can discover and open useful song information through a coherent public flow, distinguish current/unknown/historical states, and continue through related entities without encountering a dead end.

## Week 4 — Game encyclopedia

Outputs:

- partner/character pages;
- story index and story content structure;
- World Mode, Course Mode, achievements, and game-topic pages;
- information/wiki hub;
- per-game-version content update workflow.

Content requirements:

- factual metadata is separated from original maintainer summaries;
- story text and third-party summaries are not reproduced;
- spoiler boundaries are accessible;
- dated release/event records remain separate from evergreen mechanics;
- community theory is not presented as verified fact;
- the update workflow records added, changed, removed, withdrawn, uncertain, source-changed, and permission-changed content;
- partially reviewed updates do not replace the last reviewed snapshot;
- breadth is cut before accuracy, provenance, accessibility, or maintainability.

Gate: the MVP covers the agreed wiki categories with consistent templates, original presentation, version-aware provenance, and one reproducible content-update/rollback cycle.

## Week 5 — Production quality

Outputs:

- accessibility and responsive audit;
- performance and image optimization;
- PWA/offline strategy for static catalog;
- SEO, metadata, structured data, and social previews;
- security, dependency, and supply-chain review;
- privacy-respecting error reporting decision.

Quality requirements:

- audit giant tables, horizontal overflow, source/status discoverability, high zoom, long labels, missing media, and stale content;
- prevent cached content or removed media from remaining indefinitely current;
- keep metadata honest about uncertainty, spoilers, freshness, and platform/version applicability;
- treat catalog, Markdown, external links, generated assets, and community-supplied corrections as untrusted inputs;
- omit invasive analytics rather than weakening privacy to prove engagement.

Gate: automated and manual evidence meets the release budgets, and no competitor-derived failure mode remains as an unresolved P0 defect.

## Week 6 — Public preview

Outputs:

- content accuracy and legal audit;
- end-to-end acceptance tests;
- GitHub Pages deployment;
- release checklist and rollback notes;
- release-ready contribution workflow expansion, issue forms, and maintainer guidance;
- public-preview readiness report.

Release audit requirements:

- sample high-impact facts at field/source level;
- verify Mobile/Switch and version labels where relevant;
- verify current, historical, stale, disputed, unknown, removed, and unavailable states;
- check originality of summaries and presentation;
- confirm no third-party wiki prose, layout, table, media, or database export was copied;
- verify all routes remain useful without media;
- freeze exact catalog/asset versions and produce a reviewable delta;
- document content breadth and freshness limitations honestly;
- reject release when the catalog looks current but cannot be maintained current.

Gate: the release checklist is complete, every known exception is documented, and the deployed preview satisfies the focused wiki promise without claiming the post-MVP player-companion capabilities.

## Scope-cut order

When capacity slips, cut in this order:

1. decorative effects and secondary homepage modules;
2. optional view modes and secondary filters;
3. low-demand or low-confidence topic breadth;
4. nonessential history depth;
5. PWA enhancements beyond safe browser caching;
6. post-MVP research not required for the wiki gate.

Do not cut legal provenance, original-content rules, catalog correctness, core lookup flows, unknown/stale behavior, accessibility, security, deterministic publication, or rollback readiness.

## Beyond the MVP

The roadmap retains post-MVP work for four distinct programs:

1. **Content scale and localization** — broader reviewed content, richer history, correction operations, and localization after update burden is measured.
2. **Player companion** — inspiration, explainable discovery/practice support, local-first goals/reflection, and confidence-aware community knowledge.
3. **Runtime and analysis** — chart rendering, legal fixtures, deterministic metrics, and replay/personal analysis behind separate legal and privacy decisions.
4. **Optional platform services** — hosted search, APIs, persistence, or synchronization only when measured static limits justify cost and operations.

The player-companion program should start with research and one small explainable vertical slice, not an account system or black-box recommendation engine. Candidate work includes daily discovery, short-session planning, practice ladders, skill-demand profiles, optional local reflection, device latency knowledge, Potential research, and richer relationship graphs.

Post-MVP work may begin only after Web MVP 0.1 passes the release gate and the relevant product, legal, privacy, accessibility, security, performance, moderation, operations, and maintenance decisions are approved.

All post-MVP capabilities must preserve a usable static wiki fallback and may not rely on scraping player accounts, official services, protected charts, or third-party wiki databases.