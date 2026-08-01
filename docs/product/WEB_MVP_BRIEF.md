# Arcaea-Viewer Web MVP 0.1 Product Brief

## Product intent

Arcaea-Viewer is an unofficial, community-oriented public fan database created from genuine enthusiasm for Arcaea. The project must be useful to ordinary players first, credible to contributors, and strong enough to demonstrate production-minded software engineering.

The MVP is a fast, accessible, image-conscious wiki experience. It is not a chart runtime, replay tool, analytics platform, backend platform, recommendation engine, progression tracker, or infrastructure showcase.

The wiki MVP is the trusted information foundation for a possible post-MVP player companion. That future direction must not expand the current critical path or force speculative personal, recommendation, community-research, runtime, or service requirements into Web MVP 0.1.

## Primary audience

Ordinary Arcaea players who want to discover and look up:

- songs, artists, packs, difficulties, chart constants, BPM, and note counts;
- partners and characters;
- story and world information;
- World Mode, Course Mode, achievements, and other game elements;
- current release and event information.

## MVP promise

A visitor can land on the homepage, understand the project and current game highlights, search or browse the catalog, open a high-quality content page, navigate between related entities, switch between light and dark themes, and use the site comfortably on desktop.

The first public preview should feel more focused and efficient than a conventional wiki:

- strong information architecture organized around player questions rather than an article tree;
- fast search and filtering;
- clear provenance, applicable platform/version, uncertainty, and update status;
- original concise summaries rather than copied third-party prose;
- high-quality responsive images where use is permitted, with useful media-free fallbacks;
- accessible, keyboard-friendly navigation;
- progressive disclosure instead of giant-table-first presentation;
- minimal dependencies and strong performance budgets;
- security, legal, freshness, and maintenance constraints designed in, not added later.

The benchmark and content rules are documented in [Arcaea Wiki Benchmark and Product Guardrails](WIKI_BENCHMARK_AND_PRODUCT_GUARDRAILS.md).

## Competitive position

Arcaea-Viewer does not attempt to win by copying or immediately matching the content volume of established wikis.

The MVP differentiates through:

- a coherent home → explore → entity-detail flow;
- field-appropriate provenance and visible uncertainty;
- explicit Mobile/Switch and game-version applicability where relevant;
- current versus historical values rather than silently overwritten facts;
- original presentation with useful behavior when images are unavailable;
- deterministic catalog publication, correction history, and rollback;
- accessibility and performance as product requirements;
- sustainable scope for one primary maintainer.

Existing wikis are research references, not source material for copied layouts, prose, templates, media, or databases. Third-party community facts must follow the approved source hierarchy and independent-verification rules.

## MVP routes

- `/`
- `/explore`
- `/songs/:songId`
- `/packs/:packId`
- `/partners/:partnerId`
- `/story`
- `/game/:topic`
- `/information`
- `/wiki`
- `/about`
- `/legal`
- `/settings`
- `*` / 404

Sorting and filters belong in URL query parameters rather than in route path syntax. Example:

```text
/explore?sort=level&pack=absolute-reason&difficulty=future
```

## Content model principles

MVP content must preserve the distinction between:

- verified fact;
- maintainer-authored summary;
- community observation;
- unknown data;
- disputed data;
- historical data.

The UI must not flatten these categories into equally authoritative values.

Fields that materially differ across Mobile, Switch, or game versions should support applicable platform/version and review status. High-impact fact groups such as release/availability, difficulty or chart constant, unlock requirements, event windows, and mechanic formulas should be able to reference appropriate source records without forcing unrelated fields to inherit one source state.

History should be retained where a changed value affects lookup correctness or player decisions. The project should not add speculative history to every field.

## Information architecture guardrails

- The homepage should provide the project promise, search/discovery entry, a beginner path, and reviewed current information without becoming a long news archive.
- Explore state must remain reversible, shareable, keyboard-accessible, and explicit about active filters and unknown values.
- Detail pages should put common lookup facts before exhaustive history and advanced data.
- Dated releases/events must remain separate from evergreen mechanics and story information.
- Every page must remain useful without media.
- Exhaustive tables are allowed only when they answer a validated task and remain usable at narrow widths and high zoom.
- No route may imply real-time completeness when it is backed by a reviewed static catalog.

## Explicit MVP exclusions

The existing Rust/WASM parser, timing, renderer, and analytics work stays preserved in the repository but is not exposed in the public MVP navigation.

The MVP excludes:

- chart upload, AFF editing, chart playback, chart analytics, and replay;
- audio previews;
- user accounts and application-hosted user-generated content;
- personal goals, score history, practice plans, recommendations, progression tracking, and retention mechanics;
- subjective difficulty rankings or community observations presented as verified facts;
- a production backend, database server, microservices, or Kubernetes;
- automatic scraping of official services or third-party wikis;
- copied third-party wiki prose, page structure, tables, templates, media, or database exports;
- unlicensed redistribution of game assets;
- community comments, voting, latency reports, and research tooling beyond repository contribution documentation;
- community moderation tooling beyond contribution documentation.

## Technology direction

Keep React, TypeScript, Rust/WASM, and the existing monorepo boundaries.

For the public web surface:

- migrate Vite to Rsbuild/Rspack through the approved focused issue;
- use Tailwind CSS v4;
- keep dependencies minimal;
- use static, versioned JSON with schemas and validation;
- generate indexes and route view models deterministically;
- add PWA/offline support only for the public catalog and app shell;
- deploy the first preview to GitHub Pages;
- keep the runtime crates available but outside the MVP bundle and navigation.

## Delivery model

Use a six-week, stage-gated hybrid process:

1. discovery and design decisions;
2. web foundation;
3. core wiki product;
4. game encyclopedia surfaces;
5. production quality pass;
6. public preview release.

Each stage has a visible acceptance gate, but implementation remains incremental inside the stage. This preserves the speed of a waterfall-style plan without postponing validation until the end.

Competitor research is converted into the shared benchmark/guardrail document. Individual implementation issues should reference and apply those rules rather than repeating an uncontrolled competitor feature list.

## Production credibility

Production quality for this MVP means:

- reproducible builds and deterministic content generation;
- explicit legal and provenance records;
- schema-validated data;
- platform/version applicability where required;
- visible current, historical, stale, disputed, unknown, and unsupported states;
- least-privilege GitHub Actions;
- accessibility acceptance criteria;
- performance and image budgets;
- responsive and empty/error/loading states;
- security headers and safe content rendering where hosting permits;
- automated checks and release evidence;
- contribution guidance and a maintainable update workflow;
- an auditable catalog delta and rollback path;
- measured scope that one primary maintainer can keep current.

It does not mean unnecessary infrastructure, maximum content breadth, or superficial similarity to an established wiki.

## Community principle

The project should invite contributions without pretending one maintainer can make every page perfect. Content, design, accessibility, localization, and data corrections should be easy to propose through documented pull-request workflows.

MVP community participation remains repository-based. Community observations, voting, device latency reports, Potential research, subjective difficulty, and personal recommendations remain post-MVP candidates and require governance, confidence, privacy, moderation, correction, and maintenance contracts before publication.

## Post-MVP player companion direction

After the wiki MVP is stable, the project may develop into a local-first player companion that helps players gain inspiration, decide what to play, improve deliberately, and return to Arcaea through useful experiences.

This direction should be evaluated as a separate product program with the following potential loop:

```text
Choose an intent or question
        ↓
Receive an explainable discovery or practice suggestion
        ↓
Play in Arcaea
        ↓
Record an optional local reflection
        ↓
Adapt the next suggestion without punitive pressure
```

Candidate capabilities include daily discovery, short-session planning, practice ladders, skill-demand profiles, local goals/reflections, confidence-aware community knowledge, device latency reports, Potential research, and richer lore/entity graphs.

The program must remain:

- local-first by default;
- explainable rather than black-box;
- optional and fully separable from the public wiki;
- free of punitive streaks, shame, forced urgency, or fabricated scarcity;
- honest about subjective claims and confidence;
- independent of scraping player accounts or protected services;
- gated by product research, legal review, privacy/deletion behavior, maintenance capacity, and a small sustainable vertical slice.

## Post-MVP sequence

After the wiki MVP is stable, the project can grow in this order:

1. measure wiki usage, catalog freshness, update burden, correction patterns, and player needs without invasive tracking;
2. broaden versioned community-maintained content where maintenance capacity supports it;
3. improve search, cross-linking, history, and localization;
4. approve the player-companion strategy and its legal/privacy boundaries;
5. prototype explainable discovery or practice support using the trusted catalog;
6. add local-first goals, notes, reflection, export, deletion, and recovery only when they create measured value;
7. evaluate community knowledge such as subjective difficulty, latency, and Potential research with explicit method and confidence;
8. reconnect chart viewer and deterministic analytics surfaces only through legal inputs and isolated contracts;
9. add optional hosted data/search services only when static delivery is proven insufficient;
10. consider replay or personal analysis only after a separate privacy and supported-input decision.

Each expansion must pass a separate product, legal, privacy, performance, accessibility, security, operations, and maintenance decision.