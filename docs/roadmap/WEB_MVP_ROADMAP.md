# Six-Week Web MVP Roadmap

## Delivery decision

Arcaea-Viewer follows a **synthetic-first, controlled-publication** model.

The project may build a production-quality application shell, original UI, generic schemas, tests, validation, and a controlled deployment before requesting lowiro authorization. Until authorization is recorded, every catalog record and prose example must be synthetic, and every media asset must be project-authored or covered by a compatible open license.

A deployed prototype is not an Arcaea-specific public release.

The detailed decision is recorded in [Synthetic-First Delivery and Controlled Publication](SYNTHETIC_FIRST_DELIVERY_STRATEGY.md).

## Capacity

The plan assumes approximately three focused hours per day for six implementation phases. Phase names preserve the existing Week 1–6 issue structure; calendar completion may extend when human authorization or review is outside the maintainer's control.

## Lessons from Sekai Viewer

The roadmap adopts two engineering lessons visible in Sekai Viewer's history:

1. deliver an end-to-end vertical slice early;
2. keep frontend consumption separate from independently maintained data pipelines.

It does **not** adopt:

- real-data-first implementation;
- extracted game databases or asset bundles;
- redistribution of jackets, character art, audio, charts, story text, or other proprietary resources;
- automatic public deployment before permission and release review;
- the existence of another fan project as evidence of authorization.

## Two-track operating model

### Product track

May proceed before authorization:

- build tooling and CI;
- route shell and navigation;
- light/dark/system themes;
- accessible design primitives;
- generic catalog schemas;
- synthetic records and original prose;
- original neutral placeholders;
- search, filters, relationships, and route states;
- security, performance, accessibility, and rollback controls;
- a clearly labeled, non-indexed controlled preview.

### Publication track

Must remain blocked until its gate:

- use of real Arcaea facts or naming as catalog data;
- connection to any lowiro-approved API, export, file source, repository, or database;
- official or third-party media;
- Arcaea-specific public indexing, sitemap, promotion, and release communication;
- claims of permission, endorsement, approval, or official status.

## Data boundary

Routes consume an application-owned typed repository/view-model interface.

```text
synthetic records
→ validation and generation
→ synthetic catalog adapter
→ route view models
→ UI
```

After written authorization:

```text
approved source
→ source-specific adapter
→ normalization and validation
→ immutable catalog snapshot
→ unchanged route view models
→ UI
```

Do not make route components depend directly on an unknown upstream API or database. A hosted backend remains post-MVP unless measured requirements justify it.

## Cross-phase guardrails

Every issue must answer:

- Is this work permitted before authorization?
- Does it use synthetic, permission-approved, or no catalog data?
- Can a visitor mistake synthetic content for Arcaea facts?
- Does the route remain useful without media?
- Does UI code depend only on application-owned view models?
- Which source or permission record would be required after approval?
- What blocks controlled preview?
- What blocks Arcaea-specific public release?
- How is rollback performed?
- Which decision requires explicit maintainer approval?

## Week 1 — Product contracts and synthetic-development gate

### Outputs

- accepted charter, PRD, and original UI direction;
- static catalog and replaceable adapter ADR;
- pre-permission legal/provenance guardrails;
- generic schemas and synthetic seed catalog;
- canonical dependency graph.

### Required decisions

- define allowed and prohibited pre-authorization work;
- define application-owned catalog interfaces;
- keep raw records separate from generated view models;
- define synthetic labeling and protected-content checks;
- define the later permission request package;
- preserve public release as a separate gate.

### Gate

A reviewer can explain how the entire UI will be built and tested without one real Arcaea record, and how a later approved source will be integrated without rewriting routes.

## Week 2 — Web skeleton and foundations

### Outputs

- one-command quality gate;
- Rsbuild/Rspack migration;
- original accessible design system;
- app shell, routes, themes, settings, and recovery states;
- synthetic catalog loader and generated indexes;
- original placeholder and permission-aware media pipeline.

### Requirements

- all representative output uses synthetic records;
- public theme labels are Light, Dark, and System;
- media is optional;
- runtime/debug surfaces remain isolated;
- no network database is required;
- protected-content policy violations fail validation.

### Gate

A production build renders the complete shell and representative synthetic records under the deployment base path with resilient states and no real Arcaea content.

## Week 3 — Synthetic core vertical slice

### Outputs

- synthetic homepage and product introduction;
- synthetic explore search, filters, sorting, and URL state;
- synthetic song and collection detail templates;
- related navigation, source/review status, and missing-media behavior;
- stable screenshots and route evidence.

### Requirements

- prioritize home → explore → detail over breadth;
- synthetic content is clearly identified;
- route contracts are production-ready;
- no real news, song, pack, difficulty, partner, or asset is required;
- every path works without artwork.

### Gate

A reviewer can complete the primary product journey and understand the intended value, information density, provenance UI, accessibility, and failure behavior without relying on protected content.

## Week 4 — Encyclopedia templates and prototype package

### Outputs

- synthetic character index/detail templates;
- synthetic story taxonomy, chronology, and spoiler patterns;
- generic topic encyclopedia and information hub;
- route inventory, field inventory, screenshots, exclusions, and operating controls for the lowiro request.

### Requirements

- all character identities, mechanics, and prose are invented;
- no official or community story text is used;
- generic templates remain capable of mapping a later approved domain;
- the permission package distinguishes names, facts, summaries, links, media, hosting, caching, and open-source distribution.

### Gate

The prototype is coherent enough for lowiro to evaluate a concrete proposed product and exact publication/data scope.

## Week 5 — Prototype quality and controlled-preview readiness

### Outputs

- accessibility and responsive audit;
- measured performance and media budgets;
- browser/content/dependency/supply-chain hardening;
- privacy-respecting diagnostics;
- optional offline strategy;
- deterministic metadata with pre-authorization noindex controls;
- preview and rollback checklist.

### Requirements

- no protected content appears in source, fixtures, generated output, metadata, screenshots, or deployment artifacts;
- preview status is visible;
- robots, sitemap, canonicals, and social metadata cannot imply a released Arcaea catalog;
- quality completion does not imply publication permission.

### Gate

The synthetic release candidate is stable, accessible, secure, performant, non-indexed, and reversible.

## Week 6 — Controlled preview, authorization, approved integration, and activation

### Step 1: Controlled synthetic preview

Deploy the production build with:

- synthetic records only;
- project-authored or approved neutral placeholders;
- explicit prototype status;
- noindex controls;
- immutable artifact/version inventory;
- tested rollback.

### Step 2: Lowiro authorization request

Submit:

- controlled preview and screenshots;
- exact routes and fields;
- project name and descriptive trademark proposal;
- proposed source and update method;
- API/file/repository/database access request where applicable;
- summaries, links, media, caching, transformation, attribution, hosting, license, and revocation details;
- excluded content and anti-scraping/extraction commitment;
- correction, takedown, security, privacy, and rollback controls.

No response is not permission.

### Step 3: Permission-approved source integration

Only after a recorded written scope:

- implement the source-specific adapter;
- normalize through the existing schema;
- reject unapproved fields/media;
- generate reviewable diffs and immutable snapshots;
- preserve synthetic fixtures;
- document upstream outages and rollback.

If lowiro does not provide data access but permits selected factual publication, use only reviewed sources and fields inside that scope. Do not invent access or extract data.

### Step 4: Final content and release audits

Freeze the candidate and verify:

- authorization category by category;
- source and permission records;
- attribution and transformation conditions;
- prose originality;
- record counts, checksums, relationships, and unknowns;
- rendered missing-media and spoiler states;
- no synthetic placeholder is presented as official.

### Step 5: QA and public activation

Run full route, accessibility, performance, security, SEO, legal, deployment, and rollback QA. QA does not activate release.

The maintainer then records a separate go/no-go decision. Only a go decision may enable:

- public indexing and sitemap;
- production canonicals;
- Arcaea-specific release communication;
- promotion of the deployment as the public product.

A no-go preserves the synthetic/private state.

## Scope-cut order

When capacity slips, cut in this order:

1. decorative effects;
2. optional card/table switching;
3. secondary filters;
4. encyclopedia breadth;
5. optional offline/PWA work;
6. nonessential history and editorial depth.

Do not cut:

- synthetic/approved data separation;
- authorization gates;
- source and permission controls;
- core routes;
- accessibility and security;
- protected-content validation;
- deterministic snapshots;
- rollback;
- explicit public activation.

## Release-state model

```text
development
→ controlled-preview
→ authorization-pending
→ authorized-conditional
→ approved-data integration
→ release-candidate
→ public-active
```

Alternative terminal states:

```text
authorization-rejected
authorization-unresolved
no-go
revoked-or-rolled-back
```

Only `public-active` is a public Arcaea-specific release.

## Beyond the MVP

Runtime viewer, chart analytics, replay/personal data, large-scale community dataset operations, hosted API/search/database services, and player-companion work remain post-MVP.

They require separate product, legal, privacy, accessibility, security, performance, operations, and maintenance decisions. The static catalog and synthetic fixture path must remain usable as fallback and test infrastructure.
