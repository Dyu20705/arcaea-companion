# Player Companion Post-MVP Backlog

## Status

| Field | Value |
| --- | --- |
| Program | Player inspiration, discovery, practice, and return loop |
| Current state | Proposed backlog — not active roadmap issues |
| Provisional coordination gate | #55 — current managed post-MVP epic; player-companion parentage is not yet approved |
| Activation gate | Web MVP 0.1 public-preview completion, explicit maintainer approval, and a coordinated roadmap manifest/guidance change |
| Product dependency | Trusted, versioned, maintainable wiki catalog |

This backlog preserves the longer-term product direction without expanding the current six-week wiki MVP or prematurely creating managed issues.

The candidate work packages below should become roadmap-managed issues only after their entry criteria are met. At activation time, each issue must receive complete execution guidance, parent/dependency relationships, labels, acceptance criteria, tests, evidence requirements, and a pinned issue number after reconciliation. If #55 is retained as the parent gate, its canonical title, outcome, scope, and execution guidance must first be updated through the same focused roadmap change.

## Program outcome

Evaluate and deliver a small local-first player companion that turns trusted wiki information into:

- inspiration to play;
- a clearer decision about what to play next;
- deliberate, explainable improvement support;
- optional reflection on progress;
- healthy reasons to return to Arcaea.

The public wiki remains the factual foundation and independent fallback. Companion capabilities must never become required for catalog lookup, legal notices, correction flows, or public entity pages.

## Program entry criteria

Do not activate implementation work until all of the following are true:

1. Web MVP 0.1 has passed its public-preview gate.
2. Catalog freshness, correction volume, update burden, and maintenance cost have been measured.
3. Player research identifies a concrete problem beyond lookup and catalog discovery.
4. The required facts or observations have a legal, reviewable data path.
5. Personal-data lifecycle, consent, export, deletion, and recovery behavior are approved where applicable.
6. Accessibility, security, privacy, moderation, performance, and operations constraints are explicit.
7. The smallest useful vertical slice is sustainable for one primary maintainer.
8. Success can be evaluated without invasive tracking.
9. The wiki remains fully usable with the companion disabled or unavailable.

## Program non-goals

- Do not change or delay Web MVP 0.1.
- Do not begin with accounts, social feeds, global leaderboards, cloud sync, hosted personal data, or a recommendation backend.
- Do not scrape player accounts, official services, protected charts, or third-party wiki databases.
- Do not use punitive streaks, shame, forced urgency, fabricated scarcity, loss framing, or other engagement dark patterns.
- Do not use a black-box ranker whose suggestions cannot be explained and rejected.
- Do not present subjective difficulty, skill demand, or progression advice as official fact.
- Do not make chart runtime, replay, audio, or proprietary input a prerequisite for the first product slice.

## Candidate work package A — Player-problem research

### Outcome

Identify which inspiration, choice, improvement, reflection, or return problem is valuable enough to solve before implementing a companion feature.

### Research scope

- Interview or diary-study beginner, returning, progressing, and experienced players.
- Study how players choose songs, plan short sessions, respond to difficulty walls, use existing wikis, and return after breaks.
- Distinguish lookup problems from motivation, decision, practice, reflection, and return problems.
- Validate willingness to provide optional local inputs and determine the minimum useful feedback.
- Include device, platform, pack ownership, unlock access, time availability, and play-style constraints.
- Compare no-feature, editorial discovery, deterministic guidance, and personalized local-first approaches.
- Select one narrow vertical slice or explicitly decide not to build.

### Non-goals

- Do not recruit only highly engaged or high-Potential players.
- Do not present modeled personas or maintainer intuition as completed research.
- Do not collect credentials, private profiles, replay files, precise location, or unnecessary personal data.
- Do not implement recommendation or progression code during research.

### Acceptance criteria

- Research questions, participant segments, consent, data minimization, and analysis method are documented.
- Evidence identifies the triggering situation, current workaround, cost, failure condition, and desired outcome.
- The report includes alternatives, reasons players reject suggestions, and differences by experience/device/access.
- A selected problem has measurable user value, a lawful data path, and a sustainable smallest slice.
- Weak or contradictory evidence results in retaining the wiki without companion expansion.

## Candidate work package B — Explainable discovery and practice

### Outcome

Help a player choose a useful next song or short session with transparent reasoning grounded in reviewed catalog facts and clearly labeled observations.

### Candidate scope

- Validate intents such as discover, warm up, practice a skill, push difficulty, recover after a break, or play casually.
- Create deterministic rules for daily discovery, short-session composition, alternatives, and ownership/unlock constraints.
- Model skill tags, chart-demand profiles, bridge-song relationships, and practice ladders only when method and evidence exist.
- Associate each suggestion with rationale, limitations, confidence, applicable platform/version, and substitute options.
- Use legal official outbound listening and source links instead of hosting protected media.
- Allow a player to reject, replace, or ignore a suggestion without penalty.

### Suggested initial session structure

```text
Warm-up
    ↓
Focused practice or discovery
    ↓
Stretch, consolidation, or rewarding finish
```

This structure is a hypothesis, not a requirement. Research must validate whether players benefit from it.

### Non-goals

- Do not claim universal objective difficulty or player suitability.
- Do not optimize rank order for session length, advertising, monetization, or compulsive engagement.
- Do not require chart files, audio, replay data, accounts, or a backend for the first slice.
- Do not generate confident suggestions when required data is missing or disputed.

### Acceptance criteria

- Every suggestion exposes its inputs, rationale, limitations, confidence, and at least one alternative where possible.
- Verified catalog facts and subjective/community observations remain distinct in schema and UI.
- The same supported inputs produce deterministic results for the initial rules-based implementation.
- Missing ownership, unlock, platform, version, or skill data degrades gracefully.
- A player can reject or replace a suggestion without loss or negative messaging.
- The feature can be removed or disabled without affecting wiki routes.

## Candidate work package C — Local-first goals and reflection

### Outcome

Let players optionally record lightweight goals and reflections that can improve future guidance without creating an account or uploading personal play data.

### Candidate scope

- Define the minimum local profile and reflection fields justified by research.
- Consider low-friction feedback such as `too easy`, `good fit`, `too hard`, `retry later`, fatigue/discomfort, or a private note.
- Support inspect, edit, export, import, reset, delete, schema migration, and storage-failure recovery.
- Make local-only behavior and privacy status visible.
- Design supportive comeback behavior after a break.
- Keep canonical catalog data separate from personal local state.

### Non-goals

- Do not require exact scores, Potential, replay uploads, credentials, or cloud synchronization.
- Do not infer health, identity, or stable skill attributes from sparse local data.
- Do not retain data after explicit deletion.
- Do not remove progress, shame the player, or display punitive missed-session messaging.

### Acceptance criteria

- No personal progress data leaves the device by default.
- Users can inspect, edit, export, import, reset, and delete all stored data.
- Malformed imports, quota failures, interrupted writes, and schema migrations preserve the last valid dataset.
- The wiki remains usable when storage is unavailable or persistence is declined.
- Breaks and missed sessions do not remove earned state or trigger punitive messaging.
- Any synchronization requires a separate security, privacy, cost, and operations decision.

## Candidate work package D — Confidence-aware community knowledge

### Outcome

Evaluate whether community observations can add useful knowledge without presenting subjective, biased, private, disputed, or stale conclusions as verified fact.

### Candidate domains

- difficulty dimensions rather than one universal tier;
- device-specific latency observations;
- Potential and chart-constant research;
- skill tags and chart-demand profiles;
- bridge-song and practice relationships;
- player explanations of difficult mechanics.

### Required evidence model

Every published observation should identify:

- research or collection method;
- participant/sample context;
- platform, device, game version, and population scope;
- sample size where applicable;
- confidence and known limitations;
- dissent or conflicting observations;
- review date and freshness status;
- correction, dispute, and removal path.

### Governance scope

- Compare repository-reviewed submissions with forms, voting, comments, and hosted community systems.
- Define contribution, moderation, abuse, privacy, retention, dispute, correction, and removal behavior before accepting data.
- Pilot only one bounded workflow after maintainer approval.
- Measure moderation and review load against solo-maintainer capacity.

### Non-goals

- Do not publish one universal difficulty tier as objective truth.
- Do not collect account identifiers, private play history, or unnecessary device fingerprints.
- Do not open unmoderated comments, polls, or uploads without sustainable ownership.
- Do not let community observations overwrite independently verified catalog facts.

### Acceptance criteria

- Every published observation includes method, context, confidence, scope, review date, and correction path.
- Verified facts and community observations remain separate in data contracts and presentation.
- Low-sample, stale, conflicting, or biased results remain visibly limited or unpublished.
- Participants understand what data is public, retained, corrected, and removed.
- The pilot can be stopped and removed without damaging the core catalog.
- A no-go decision is acceptable when governance cost exceeds player value.

## Candidate work package E — Companion program gate

Before activating the implementation packages, approve the parent strategy. If #55 is retained, update its canonical manifest and execution guidance to include the player-companion program; otherwise select another approved managed parent. Then create one roadmap-managed companion epic that owns:

- the approved player problem;
- selected vertical slice;
- entry criteria and non-goals;
- dependency order;
- legal/privacy decisions;
- success evidence;
- scope cuts;
- rollback and wiki fallback.

Suggested dependency order:

```text
Player research decision
        ↓
Explainable discovery/practice prototype
        ↓
Optional local-first reflection, only if needed
        ↓
Community knowledge pilot, only after governance capacity exists
```

Runtime, analytics, replay, and hosted services remain separate programs. They may support a future companion but must not be assumed as dependencies.

## Activation procedure

When the program is approved:

1. Approve the managed parent strategy and update #55's canonical scope/guidance first if it remains the parent gate.
2. Convert the accepted work packages into `roadmap/issues/*.json` entries.
3. Add exact execution guidance for every active issue before including the manifest.
4. Run syntax, roadmap automation, existing-number, and stage-gate policy tests.
5. Run a live read-only `--dry-run --force-update` plan.
6. Confirm only intended post-MVP issue creations and relationships appear.
7. Obtain explicit maintainer approval.
8. Apply the roadmap change.
9. Pin newly created issue numbers in `roadmap/issues.index.json` through a focused synchronization PR.

## References

- [Web MVP product brief](WEB_MVP_BRIEF.md)
- [Wiki benchmark and product guardrails](WIKI_BENCHMARK_AND_PRODUCT_GUARDRAILS.md)
- [Six-week Web MVP roadmap](../roadmap/WEB_MVP_ROADMAP.md)
- [Current managed post-MVP coordination gate #55](https://github.com/Dyu20705/arcaea-viewer/issues/55)
