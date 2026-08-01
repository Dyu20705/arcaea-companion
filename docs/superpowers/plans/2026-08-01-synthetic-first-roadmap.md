# Synthetic-First Roadmap Reconciliation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconcile the managed GitHub issue graph so Arcaea-Viewer can build and deploy a credible synthetic skeleton before requesting lowiro authorization, while keeping real-data integration and public release behind explicit gates.

**Architecture:** Preserve the six-phase roadmap but split technical delivery from publication authority. All route and UI work consumes a replaceable catalog repository interface; synthetic data drives development and controlled preview, and a later permission-approved adapter drives the frozen release candidate without route rewrites.

**Tech Stack:** JSON roadmap manifests, Bash/jq roadmap reconciler, GitHub Issues dependencies, Markdown decision records, React/TypeScript static catalog contracts.

## Global Constraints

- Branch name: `chore/synthetic-first-roadmap`; do not use `agent/`.
- Before authorization, use only synthetic records, original prose, and project-authored or compatibly licensed neutral placeholders.
- Do not add real Arcaea data, official media/text, extracted resources, scraping, datamining, or public-release claims.
- A controlled synthetic deployment must remain clearly labeled and non-indexed.
- Silence from lowiro is not permission.
- Do not introduce a hosted database before measured requirements and an approved architecture decision.
- Roadmap changes require roadmap shell tests and a live read-only dry-run in addition to applicable repository checks.

---

### Task 1: Record the delivery decision

**Files:**
- Create: `docs/roadmap/SYNTHETIC_FIRST_DELIVERY_STRATEGY.md`

**Interfaces:**
- Consumes: accepted PRD, original UI direction, current issue graph, and Sekai Viewer repository findings.
- Produces: the normative distinction between synthetic development, controlled preview, authorization, approved-data integration, and public activation.

- [ ] **Step 1: Write the design record**

Include the two-track model, `CatalogRepository` boundary, publication states, six-phase delivery model, lowiro request package, post-approval pipeline, exclusions, and success criteria.

- [ ] **Step 2: Review for legal overclaiming**

Confirm the document does not claim permission, legal clearance, endorsement, or entitlement to data.

- [ ] **Step 3: Verify formatting**

Run:

```bash
git diff --check
```

Expected: exit code `0`.

### Task 2: Reconcile canonical issue manifests

**Files:**
- Modify: `roadmap/issues/roadmap.json`
- Modify: `roadmap/issues/week-1.json`
- Modify: `roadmap/issues/week-2.json`
- Modify: `roadmap/issues/week-3.json`
- Modify: `roadmap/issues/week-4.json`
- Modify: `roadmap/issues/week-5.json`
- Modify: `roadmap/issues/week-6.json`

**Interfaces:**
- Consumes: the design record from Task 1.
- Produces: unique roadmap keys, parents, blockers, scopes, acceptance criteria, and two new release gates.

- [ ] **Step 1: Change Week 1 from publication clearance to synthetic-development readiness**

Update #7, #11, and #14 so the static adapter, pre-permission rules, and synthetic schema unblock foundation work.

- [ ] **Step 2: Make Weeks 2–4 synthetic-first**

Require original UI, synthetic records, neutral placeholders, and reusable templates. Remove requirements for current game news, real Arcaea topics, and official media.

- [ ] **Step 3: Make Week 5 controlled-preview ready**

Require noindex metadata, protected-content checks, quality evidence, and safe preview controls.

- [ ] **Step 4: Split Week 6 into explicit gates**

Add:

```text
lowiro-publication-authorization
public-release-activation
```

Move roadmap key `content-update` (#49) to Week 6 and redefine it as permission-approved source integration.

- [ ] **Step 5: Validate JSON and references**

Run:

```bash
jq -e . roadmap/issues/roadmap.json >/dev/null
for file in roadmap/issues/week-{1..6}.json; do jq -e . "$file" >/dev/null; done
```

Expected: all commands exit `0`.

### Task 3: Align execution guidance

**Files:**
- Modify: `roadmap/issue-execution-guidance.json`

**Interfaces:**
- Consumes: all active issue keys from the manifests.
- Produces: resolved nonempty execution guidance for every active non-epic issue.

- [ ] **Step 1: Add global synthetic-first controls**

Require synthetic data before authorization, typed adapters, no scraping/extraction, no speculative database, and explicit preview/release states.

- [ ] **Step 2: Add gate-specific instructions**

Define exact work and evidence for lowiro authorization, approved-source integration, release audit, QA, and final activation.

- [ ] **Step 3: Validate guidance coverage**

Run:

```bash
bash tests/roadmap/test-issue-standard.sh
bash tests/roadmap/test-bootstrap-roadmap.sh
```

Expected: both scripts pass.

### Task 4: Align the human-readable roadmap

**Files:**
- Modify: `docs/roadmap/WEB_MVP_ROADMAP.md`

**Interfaces:**
- Consumes: canonical manifest phases and blockers.
- Produces: a concise execution guide that matches generated issues.

- [ ] **Step 1: Rewrite phase outputs and gates**

Describe contracts, skeleton, synthetic vertical slice, template completion, quality/controlled preview, and authorization/release activation.

- [ ] **Step 2: Add lessons adopted and rejected from Sekai Viewer**

Adopt rapid vertical slicing and separated data delivery. Reject extracted proprietary data, asset hosting, and automatic public deployment before permission.

- [ ] **Step 3: Check terminology**

Search for stale unconditional claims:

```bash
git grep -nE 'public preview|current game information|Hikari|Tairitsu|per-game-version content' -- docs/roadmap roadmap/issues
```

Expected: every remaining match is historically intentional or explicitly conditional.

### Task 5: Verify and publish the roadmap PR

**Files:**
- Review all files changed in Tasks 1–4.

**Interfaces:**
- Consumes: final branch diff.
- Produces: a reviewable draft PR; no merge or issue-body mutation before review.

- [ ] **Step 1: Run syntax and roadmap tests**

```bash
git diff --check
bash -n scripts/bootstrap-roadmap.sh
bash -n tests/roadmap/test-bootstrap-roadmap.sh
bash tests/roadmap/test-bootstrap-roadmap.sh
bash tests/roadmap/test-issue-standard.sh
```

Expected: all pass.

- [ ] **Step 2: Run repository validation**

```bash
pnpm install --frozen-lockfile
pnpm check
```

Expected: exit code `0`.

- [ ] **Step 3: Run live read-only reconciliation**

```bash
bash scripts/bootstrap-roadmap.sh \
  --dry-run \
  --phase all \
  --start-date 2026-07-14 \
  --repo Dyu20705/arcaea-viewer
```

Expected: only intentional title/body/dependency changes plus creation of the two new gate issues.

- [ ] **Step 4: Open a draft PR**

Title:

```text
chore(roadmap): adopt synthetic-first delivery and release gates
```

The PR body must list the two-track model, moved #49 scope, new issues, expected reconciliation changes, validation results, rollback, and required maintainer decisions.

- [ ] **Step 5: Do not merge automatically**

Maintainer review must approve the dependency graph and publication semantics before the canonical manifests are reconciled to GitHub issues.
