# Arcaea Wiki Benchmark and Product Guardrails

## Status

| Field | Value |
| --- | --- |
| Scope | Web MVP 0.1 wiki quality and post-MVP product direction |
| Research snapshot | 2026-08-01 |
| Decision owner | Repository maintainer |
| Canonical product boundary | Wiki-first MVP; player inspiration and progression remain post-MVP |

This document converts competitor research into reusable product, content, data, UX, and maintenance rules. It is not permission to copy third-party prose, layouts, media, databases, or community conclusions.

The reviewed references are:

- [Arcaea Wiki on Fandom](https://arcaea.fandom.com/wiki/Arcaea_Wiki)
- [Wikipedia: Arcaea](https://en.wikipedia.org/wiki/Arcaea)
- [Arcaea Fan Wiki on Miraheze](https://arcaea.miraheze.org/wiki/Arcaea_Fan_Wiki)
- [Japanese Arcaea Wiki on WikiWiki](https://wikiwiki.jp/arcaea/)

Research findings are observations of public product behavior at the snapshot date. Facts intended for publication in Arcaea-Viewer still require the source hierarchy and approval process owned by the legal/provenance work.

## 1. Product boundary

### Web MVP 0.1

The current MVP remains a focused public wiki. Its job is to reduce:

1. lookup cost;
2. discovery cost;
3. trust cost.

The MVP must provide fast retrieval, coherent relationships, version-aware facts, explicit provenance, accessible presentation, and predictable maintenance. It does not include personal progression, recommendation, replay, score tracking, accounts, or behavioral retention systems.

### Post-MVP direction

After the wiki is stable, Arcaea-Viewer may become a broader fanmade player companion that helps players:

- regain inspiration;
- decide what to play;
- understand and improve specific skills;
- reflect on progress without punitive pressure;
- return to Arcaea through useful, explainable experiences.

The wiki catalog is the trusted substrate for that future product. Post-MVP work must not distort the MVP information architecture or force speculative fields, services, or personal-data collection into the current release.

## 2. What existing wikis do well

### 2.1 Fandom: breadth, onboarding, and deep mechanics

Strengths worth learning from:

- a dedicated beginner guide rather than assuming game knowledge;
- strong cross-linking between modes, songs, packs, partners, unlocks, and terminology;
- detailed mechanic pages such as World Mode and Course Mode;
- broad tables useful for expert lookup;
- visible recent-version news on the landing page;
- a contribution path and editing guidance.

MVP implication:

- provide a clear beginner entry path and concise “start here” explanations;
- answer common player questions before exposing exhaustive details;
- make relationships first-class data rather than prose-only links;
- separate concise overviews from advanced mechanic detail.

Do not copy Fandom prose, templates, tables, category structure, or media. Learn from the user tasks, not the expression.

### 2.2 Wikipedia: neutral overview and citation discipline

Strengths worth learning from:

- a compact explanation of what the game is before deep detail;
- separation of gameplay, release history, development, and reception;
- references attached to claims;
- conservative editorial tone and limited speculation.

MVP implication:

- keep `/about` and high-level game introductions concise and neutral;
- distinguish sourced fact, maintainer-authored summary, community interpretation, and unknown data;
- do not present community consensus as official authority.

Wikipedia is not a detailed player database and should not define the product information architecture.

### 2.3 Miraheze: structured entity pages and historical data

Strengths worth learning from:

- compact song and chart information blocks;
- explicit Mobile and Switch distinctions;
- unlock requirements near the relevant entity;
- chart constant history organized by game-version ranges;
- stable entity-centric structure.

MVP implication:

- model platform applicability explicitly where values differ;
- retain value history when a field changes materially across versions;
- separate current value from historical values;
- represent unlock requirements as structured data where maintainable;
- preserve stable IDs independent of display names.

Do not copy the exact table design or database organization. Arcaea-Viewer should generate its own view models and presentation.

### 2.4 WikiWiki: freshness and community intelligence

Strengths worth learning from:

- visible recent update activity;
- event and limited-time information;
- community research into Potential and chart constants;
- device latency reports;
- popularity voting and linked discussions;
- rapid collection of player observations.

MVP implication:

- make catalog freshness, applicable version, and reviewed-at state visible;
- support corrections and source conflicts without silently overwriting history;
- keep dated release/event records separate from evergreen encyclopedia content;
- record where community knowledge exists but is not yet verified.

Community research, voting, subjective difficulty, latency reports, and personal recommendations are post-MVP candidates. They require confidence, moderation, privacy, bias, and maintenance contracts before publication.

## 3. Competitor failure modes to avoid

### 3.1 Page-centric information architecture

Conventional wikis optimize for articles and categories. Players often arrive with a task: find an unlock requirement, compare charts, understand a mechanic, or verify whether information applies to their platform and version.

Guardrail:

- organize primary flows around player questions and entity relationships;
- do not require users to know the correct wiki taxonomy before searching;
- ensure every detail page has useful next links and no dead end.

### 3.2 Giant-table-first presentation

Large sortable tables can be useful but become unusable on narrow screens, at high zoom, or when the user needs one answer.

Guardrail:

- use progressive disclosure: summary, key facts, relationships, advanced history, provenance;
- expose exhaustive tables only where they answer a validated task;
- provide filters, result counts, active-state labels, reset, and shareable URLs;
- do not duplicate the same large data table across routes.

### 3.3 Uneven freshness

A wiki may have a current homepage and stale interior pages. A last-edited timestamp alone does not prove every field is current.

Guardrail:

- identify catalog version and applicable game version;
- record review status and reviewed-at date;
- distinguish current, historical, stale, disputed, unknown, and unsupported values;
- preserve the last reviewed snapshot instead of publishing partially reviewed updates as current;
- make stale-state UI intentional rather than silently serving old data.

### 3.4 Subjective claims presented as objective facts

Chart difficulty, skill demand, recommendation value, and player progression differ by device, play style, experience, and goal.

Guardrail:

- keep subjective difficulty and recommendations outside MVP factual fields;
- never infer player skill from unsupported proxies;
- future community claims require sample size, method, confidence, applicable population, and dissent visibility;
- use explicit labels such as `verified`, `community-observed`, `estimated`, `disputed`, or `unknown` where appropriate.

### 3.5 Copying structure instead of solving the task

Reproducing another wiki’s navigation, tables, wording, or visual system creates legal, originality, and product-quality risk while preserving its weaknesses.

Guardrail:

- benchmark user tasks and failure modes, not page appearance;
- create original summaries, taxonomy, visual design, and interaction patterns;
- treat third-party wikis as discovery aids whose facts must be independently verified where required;
- never import or scrape third-party wiki content into the catalog.

### 3.6 Unbounded content breadth

A solo maintainer cannot keep every song, mechanic, story detail, historical change, event, platform, and community theory current at equal depth.

Guardrail:

- publish a small reviewed catalog before broad coverage;
- define high-impact fields and entities;
- cut low-confidence or maintenance-heavy content first;
- show “not yet cataloged” separately from “not found”;
- measure update burden before expanding contribution or automation systems.

### 3.7 Media dependence

Image-heavy fan wikis may become visually broken, slow, inaccessible, or legally unsafe when assets are missing or disputed.

Guardrail:

- all routes must remain useful without artwork;
- use neutral original placeholders;
- require source and permission evidence for every published asset;
- reserve media dimensions and provide intentional missing-media states;
- never make an unlicensed image a prerequisite for content completeness.

### 3.8 Community features without governance

Comments, votes, research pages, and device reports can collect valuable knowledge but also produce unverifiable claims, moderation load, harassment, privacy exposure, and stale conclusions.

Guardrail:

- MVP community participation remains repository-based corrections and contributions;
- future community features require ownership, moderation limits, correction policy, provenance, privacy review, abuse handling, and export/removal behavior;
- do not promise response times or moderation capacity a solo maintainer cannot sustain.

## 4. MVP content and data contract requirements

The following requirements should guide issues #7, #11, #14, #39, and #49.

### 4.1 Separate content classes

Every publishable item must fit one of these classes:

- **verified fact** — supported by an approved source;
- **maintainer summary** — original explanatory prose with source context;
- **community observation** — not official and not treated as verified fact;
- **unknown** — no approved value;
- **disputed** — conflicting evidence exists;
- **historical** — correct only for an earlier version or platform.

A UI must not erase these distinctions.

### 4.2 Version and platform applicability

Fields that can differ between Mobile, Switch, or game versions should support:

- platform scope;
- first applicable version/date;
- last applicable version/date when superseded;
- current/historical status;
- source references;
- review timestamp.

Do not add history to every trivial field. Use it where changes affect lookup correctness, unlocks, difficulty, availability, mechanics, or player decisions.

### 4.3 Provenance granularity

Entity-level provenance is insufficient when important fields come from different evidence.

High-impact fact groups should be able to reference their own source records, including:

- release and availability;
- chart level/constant and note count;
- unlock requirements;
- platform-specific behavior;
- event window;
- mechanic formulas or thresholds.

The exact schema remains owned by the data and legal decisions. The requirement is that the model must not force unrelated facts to inherit one misleading source status.

### 4.4 Change and correction history

The publication workflow should produce a reviewable delta containing:

- added records;
- changed facts;
- removed or withdrawn content;
- source changes;
- permission changes;
- unresolved conflicts;
- catalog version and reviewer.

Corrections must not silently erase why a previous value was published.

## 5. MVP information architecture guardrails

### Homepage

- Lead with the project promise, search/discovery entry, and reviewed current information.
- Provide a beginner entry point.
- Avoid a long chronological news dump.
- Do not imply real-time coverage when the catalog is static.
- Avoid mandatory carousels and media-dependent hero interactions.

### Explore

- Search aliases and human-facing names.
- Keep filter state shareable and reversible.
- Show result definition and active filters.
- Support unknown values without dropping records silently.
- Add advanced filters only when they answer a measured task.

### Song and pack pages

- Put common lookup facts before exhaustive detail.
- Distinguish platform and version differences.
- Show unlock/availability status only when reviewed.
- Put change history behind progressive disclosure.
- Keep provenance and correction paths visible but not visually dominant.

### Partner, story, and topic pages

- Separate factual metadata from original summary prose.
- Use accessible spoiler boundaries.
- Avoid reproducing story text or third-party summaries.
- Prefer a small, accurate topic set over broad stale coverage.

### Information and release pages

- Separate dated release/event entries from evergreen mechanics.
- Show applicable time zone and source where event windows matter.
- Mark expired, current, upcoming, uncertain, and withdrawn states explicitly.
- Do not retain expired “current” content through stale configuration.

## 6. Post-MVP player companion program

The player-companion direction is intentionally deferred until the wiki public preview is stable. It should be evaluated as a separate product program, not appended casually to entity pages.

### Candidate value loop

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

### Candidate capabilities

- daily or situational song discovery;
- short-session planning;
- explainable practice ladders and bridge songs;
- skill taxonomy and chart-demand profiles;
- local-first goals, notes, and reflections;
- confidence-aware community observations;
- device-specific latency knowledge;
- Potential and chart-constant research with method and uncertainty;
- official outbound listening and source links;
- lore and relationship graph exploration.

### Required principles

- no account or upload by default;
- local-first storage, export, deletion, and recovery;
- no scraping of player accounts or protected services;
- no unexplainable recommendation score;
- no punitive streaks, shame, forced urgency, or fabricated scarcity;
- no subjective recommendation presented as official truth;
- no chart/runtime dependency until legal inputs and user value are approved;
- preserve a fully usable wiki when post-MVP services or personal data are unavailable.

### Entry criteria

The program may begin only when:

1. Web MVP 0.1 has passed the release gate;
2. catalog freshness and maintenance cost have been measured;
3. player research identifies a concrete problem beyond lookup;
4. legal inputs and prohibited data paths are documented;
5. privacy and deletion behavior are approved;
6. the smallest useful vertical slice is sustainable for one maintainer;
7. success can be measured without invasive tracking.

## 7. Review checklist for every content-facing issue

Before implementation or merge, verify:

- What player question does this surface answer?
- Is the information fact, summary, observation, unknown, disputed, or historical?
- Does platform or game version change the answer?
- Is each high-impact fact traceable to appropriate evidence?
- Can the route remain useful without media?
- Is dense data progressively disclosed and usable at narrow width and high zoom?
- Does the design avoid copying another wiki’s wording, layout, or visual identity?
- What causes the content to become stale, and how is that state shown?
- Can the maintainer update and audit it within current capacity?
- Is any attractive but nonessential feature actually post-MVP work?

## 8. Relationship to roadmap issues

MVP implications:

- #7: static catalog architecture must preserve version, platform, provenance, and migration seams.
- #11: legal/provenance rules must cover independent verification, third-party wiki use, copying, scraping, and source conflicts.
- #14: metadata schemas must distinguish fact classes, applicability, aliases, history, and missing values.
- #42–#49: page and update workflows must apply the information-architecture and freshness guardrails.
- #54: the release audit must sample originality, staleness, platform/version labels, and content density.

Post-MVP implications:

- #55 remains the parent expansion gate.
- New player-companion issues define strategy, explainable discovery/practice, local-first progress, and community knowledge separately from runtime/backend expansion.

When this document conflicts with an approved PRD, charter, legal decision, or roadmap gate, record the conflict and obtain maintainer approval before changing scope.