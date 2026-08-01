# Synthetic-First Delivery and Controlled Publication Design

| Field | Decision |
| --- | --- |
| Status | Proposed for maintainer approval |
| Decision owner | Repository maintainer |
| Related roadmap issue | #34 |
| Primary legal issue | #11 |
| Strategy | Build a credible synthetic product first; request authorization before real-data integration and public release |
| Public release before authorization | Prohibited |

## 1. Decision

Arcaea-Viewer will proceed on two independent but coordinated tracks.

### Product track

The team may build and deploy a controlled prototype using:

- application architecture and build tooling;
- original UI and accessibility behavior;
- generic catalog schemas and typed repository interfaces;
- wholly synthetic records and prose;
- project-authored or compatibly licensed neutral placeholders;
- tests, validation, security controls, and rollback tooling.

### Publication track

The project may not publish an Arcaea-specific catalog or activate public indexing/promotion until:

1. a representative synthetic prototype and exact proposed scope exist;
2. lowiro receives a concrete permission/data-access request;
3. the written response is recorded and interpreted by the maintainer;
4. only the approved data and media scope is integrated;
5. source, permission, editorial, accessibility, security, and release audits pass;
6. the maintainer records an explicit public-release activation decision.

A deployed synthetic preview is an engineering milestone, not publication authorization.

## 2. Why this design

Sekai Viewer demonstrates two valuable engineering lessons:

- create an end-to-end vertical slice early instead of waiting for every future system;
- separate frontend consumption from independently maintained data pipelines.

Its public history also shows a real-data-first path: Create React App was followed almost immediately by real master-data JSON, extracted images, and GitHub Pages deployment. That sequence is not adopted here because another project's operation does not prove permission for Arcaea data, assets, naming, or software publication.

The chosen design therefore copies the delivery discipline, not the data-acquisition method.

## 3. Data architecture

UI routes consume an application-owned interface such as `CatalogRepository`.

```ts
interface CatalogRepository {
  getManifest(): Promise<CatalogManifest>;
  search(query: CatalogQuery): Promise<CatalogSearchResult>;
  getSong(id: string): Promise<SongViewModel | null>;
  getCollection(id: string): Promise<CollectionViewModel | null>;
  getCharacter(id: string): Promise<CharacterViewModel | null>;
  getStoryEntry(id: string): Promise<StoryEntryViewModel | null>;
  getTopic(id: string): Promise<TopicViewModel | null>;
}
```

Pre-authorization implementation:

```text
Synthetic JSON → validator/generator → SyntheticCatalogRepository → routes
```

Possible post-authorization implementation:

```text
Approved API/file/repository/database source
  → source-specific adapter
  → normalization and validation
  → immutable catalog snapshot
  → CatalogRepository
  → unchanged routes
```

The project must not design page components around an unknown lowiro database or API shape. If lowiro provides no data service but permits selected factual publication, maintainers may create reviewed static records only within that approved scope.

## 4. Publication states

| State | Meaning | Public indexing |
| --- | --- | --- |
| `development` | Local implementation with synthetic data | No |
| `controlled-preview` | Deployed synthetic build for review | No |
| `authorization-pending` | Request sent; no usable approval yet | No |
| `authorization-rejected` | Proposed scope rejected | No |
| `authorized-conditional` | Written approval with explicit conditions | No, until integration/audit |
| `release-candidate` | Approved data integrated and frozen | No |
| `public-active` | Final human activation completed | Yes |
| `revoked-or-rolled-back` | Permission withdrawn or release reverted | No |

Silence is never converted into `authorized-conditional`.

## 5. Six-phase delivery model

### Week 1 — Contracts

Approve product routes, original UI direction, static repository contract, synthetic schema, and pre-permission guardrails.

### Week 2 — Skeleton and foundations

Build the app shell, design system, synthetic loader, quality gate, and original placeholder pipeline.

### Week 3 — Core synthetic vertical slice

Complete home → explore → song/collection detail using production route and data contracts.

### Week 4 — Encyclopedia templates and prototype package

Complete character, story, and topic templates with synthetic content. Freeze screenshots, route inventory, field inventory, exclusions, and operating controls for lowiro.

### Week 5 — Quality and controlled-preview readiness

Run accessibility, performance, security, privacy, metadata, noindex, and rollback checks.

### Week 6 — Authorization and release path

Deploy a controlled synthetic preview, request lowiro authorization, integrate only approved data, audit the release candidate, run QA, and activate public release only after explicit sign-off.

## 6. Lowiro request package

The request must identify:

- repository and preview visibility;
- proposed project name and descriptive trademark use;
- exact routes;
- exact data fields by entity;
- whether data would come from an API, export, repository, manual official-source review, or another approved channel;
- proposed summaries and translations;
- media categories and transformations;
- caching, retention, attribution, and update cadence;
- open-source license and hosting;
- absence of accounts, tracking, monetization, scraping, datamining, extracted resources, audio, charts, and copied story text unless separately requested;
- correction, takedown, revocation, and rollback controls.

Permission must be interpreted narrowly. Approval for one category does not imply approval for another.

## 7. Release pipeline after approval

```text
written decision
→ authorization matrix
→ source adapter
→ normalized snapshot
→ schema/reference/provenance validation
→ generated diff
→ editorial and permission audit
→ frozen release candidate
→ controlled deployment
→ accessibility/security/performance/legal QA
→ maintainer go/no-go
→ public indexing and announcement
```

Rollback restores the last safe synthetic or approved snapshot and disables public indexing when necessary.

## 8. Explicit exclusions

Before authorization, do not:

- add real Arcaea catalog records as fixtures;
- reproduce names, story text, images, jackets, partner art, screenshots, logos, audio, charts, or extracted identifiers;
- scrape community wikis or official services;
- extract or decrypt game bundles;
- imply endorsement, permission, official status, or release readiness;
- optimize around an assumed lowiro API/database;
- use the existence of Sekai Viewer or another fan project as legal evidence.

## 9. Success criteria

This design succeeds when:

- a polished product can be evaluated with zero Arcaea data;
- routes do not change when the synthetic adapter is replaced;
- lowiro can review a concrete, narrow proposal;
- every approved field/media category maps to a validation control;
- public release is one reversible activation step after evidence, not an accidental consequence of deployment.
