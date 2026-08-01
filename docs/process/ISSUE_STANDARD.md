# Production Issue Standard

## 1. Purpose

GitHub Issues are the durable record for product intent, defects, decisions, delivery evidence, and operational history. They are not private scratchpads and they are not a substitute for source-controlled architecture, legal, data, or design artifacts.

This standard applies to public intake and roadmap-managed issues. It is intentionally proportional: a reproducible browser defect needs environment and reproduction evidence; a research or design issue needs a decision artifact and handoff, not fake runtime logs.

## 2. Sources of truth

Use this precedence when records disagree:

1. accepted product, legal, architecture, data, and design documents;
2. `roadmap/issues/*.json` for managed issue scope, ownership, priority, milestone, parent, dependencies, and state;
3. `roadmap/issue-execution-guidance.json` for execution guidance;
4. GitHub issue and pull-request discussion for evidence and review history;
5. GitHub Projects for workflow visualization;
6. private chat or local notes only as temporary context.

GitHub Projects must mirror managed issue state; it must not silently redefine scope or dependencies. Durable changes belong in the repository manifests or accepted documents.

## 3. Title conventions

Managed roadmap titles use context-first prefixes:

- `[Roadmap] ...`
- `[Epic · Week N] ...`
- `[Week N · Domain] ...`
- `[Post-MVP Domain] ...`

Public intake uses intent-first prefixes:

- `[Bug] ...`
- `[Data correction] ...`
- `[A11y] ...`
- `[Research] ...`
- `[Design] ...`
- `[Proposal] ...`

A title must name the affected behavior or decision. Avoid titles such as “broken,” “improve UI,” or “fix server.” Conventional Commit syntax is optional for issues because type, area, priority, phase, and workflow are represented by metadata.

## 4. Required metadata

Every accepted managed issue has:

- exactly one `type:*` label;
- exactly one `priority:*` label;
- one primary accountable assignee;
- a milestone or explicit post-MVP bucket;
- a parent issue except for the root roadmap;
- native blockers for readiness dependencies;
- objective acceptance criteria and a Definition of Done.

New public reports start with `status:needs-triage`. Triage confirms duplicate status, type, area, priority, roadmap fit, owner, privacy/legal safety, and whether the report is actionable.

Priority describes delivery order and gate impact, not personal urgency:

- `priority:p0`: blocks the active phase or release safety;
- `priority:p1`: important within the active phase;
- `priority:p2`: useful but cuttable without invalidating the gate.

For incidents and bugs, impact and severity are recorded in the issue body before maintainers assign delivery priority.

## 5. Required content by work type

| Type | Required context | Required output / closure evidence |
| --- | --- | --- |
| Roadmap / Epic | Outcome, boundaries, child hierarchy, critical path, gate risks, scope cuts | Child outcomes classified, gate report, unresolved exceptions, next gate decision; no direct product implementation is owned by the epic |
| Research | Question, evidence sources, evaluation criteria, constraints, unknowns | Reproducible report or experiment, findings, limitations, recommendation or explicit no-go |
| Design / Decision | Problem, constraints, alternatives, interfaces/data flows, security/privacy/legal implications | Accepted ADR/design record, rejected alternatives, migration/rollback, downstream handoff |
| Feature / Task | User or system outcome, scope/non-goals, dependencies, affected contracts, acceptance criteria | Focused PR, changed-behavior tests, applicable manual evidence, docs, risks, rollback |
| Chore / Tech debt | Measured maintenance or reliability cost, affected boundary, non-goals | Focused change, regression protection, before/after evidence where relevant, no hidden behavior expansion |
| Bug | Impact/frequency, environment, expected/actual behavior, minimal reproduction, logs/screenshots when safe | Root cause or bounded explanation, failing-then-passing regression test, verified fix/workaround, affected-version and rollback notes |
| QA / Release | Candidate commit/version, environment matrix, acceptance matrix, budgets, exception policy | Reproducible report, blocker disposition, known-issues register, explicit go/no-go and rollback evidence |
| Data correction | Current claim, proposed correction, entity/version, authoritative sources, downstream relations | Reviewed source-backed change, validator results, correction history, affected snapshot/version |
| Accessibility | Affected flow, input method/assistive technology, browser/platform, expected accessible behavior, reproduction | Verified remediation, automated and manual evidence, relevant WCAG mapping when appropriate |

Do not require irrelevant sections. A documentation decision does not need Docker/Kubernetes details. A production defect does need enough environment and evidence to reproduce or bound the failure.

## 6. Definition of Ready

An issue is Ready only when:

- the outcome and user/system value are explicit;
- scope and non-goals prevent silent expansion;
- all native `blockedBy` dependencies are complete;
- required research, ADR, UX, data, legal, security, privacy, or release decisions are linked;
- acceptance criteria are objective and testable;
- the accountable owner and milestone are set;
- affected interfaces, routes, records, commands, or documents can be identified;
- required evidence and rollback expectations are known;
- no P0 contradiction would force the implementer to invent policy.

`status:agent-ready` describes suitability for AI-assisted execution after readiness is satisfied. It never overrides blockers or human approval requirements.

## 7. Type-specific Definition of Done

### Research

- evidence and method are reproducible;
- findings distinguish evidence, inference, and unknowns;
- alternatives and limitations are recorded;
- a report, experiment record, or no-go decision is committed and linked;
- downstream decision/design issues receive an explicit handoff.

### Design / Decision

- an ADR or equivalent accepted artifact records context, options, decision, consequences, security/privacy/legal impact, migration, and rollback;
- interfaces, data flows, states, and compatibility boundaries are explicit where applicable;
- rejected alternatives include reasons;
- maintainers record required approval;
- engineering children are created or updated with implementation-ready contracts.

### Engineering / Maintenance

- a focused pull request references the issue;
- changed behavior has deterministic tests or a documented reason tests are not applicable;
- required format, lint, type, unit, integration, build, security, data, and roadmap checks pass;
- manual UX, accessibility, performance, operational, or release evidence is attached where relevant;
- documentation and migration notes are updated;
- residual risks, scope cuts, observability, and rollback are recorded;
- required review is complete before merge.

A solo-maintained repository cannot honestly require an independent second reviewer for every change. Human-owned product, legal, licensing, security, privacy, and release decisions still require explicit maintainer review; automated checks do not replace that judgment.

### Bug

- the original symptom is reproduced or the inability to reproduce is bounded with evidence;
- a regression test fails before the fix and passes after it when technically feasible;
- root cause and affected versions/surfaces are recorded;
- the fix and workaround are verified in the relevant environment;
- rollback or recovery is documented;
- follow-up debt is split into linked issues rather than hidden in the fix.

### QA / Release

- the tested commit, catalog, asset, and deployment versions are frozen and identified;
- every P0 acceptance row links evidence;
- failures are resolved, explicitly cut, or approved as owned exceptions;
- known issues and rollback are published;
- the maintainer records a go/no-go decision.

### Epic / Phase gate

- required P0 child outcomes are complete;
- deferred P1/P2 work is explicit and does not invalidate the gate;
- evidence, exceptions, scope cuts, and schedule variance are recorded;
- canonical state and live relationships are reconciled;
- the authoritative dry-run reports no unexplained drift.

## 8. Workflow states

GitHub Projects may present these states:

1. **Backlog / Icebox** — useful idea or report, not committed to the active plan.
2. **In Research / Design** — feasibility, product, UX, architecture, data, legal, privacy, or security work is unresolved.
3. **Ready for Development** — Definition of Ready is satisfied and blockers are complete.
4. **In Progress** — one accountable owner is actively producing the outcome.
5. **In Review** — a PR or decision artifact is complete enough for review; implementation work is not expanded silently.
6. **Done** — type-specific Definition of Done is evidenced and canonical/live state is reconciled.

A complex feature must not jump from Backlog directly to In Progress when unresolved design or policy would force invention. A small, bounded, reproducible bug may move directly to Ready for Development after triage when no design decision is needed.

For a solo maintainer, keep at most one implementation issue and two independent research/decision issues in progress unless an exception and return condition are recorded.

## 9. Handoff standard

A research or design handoff to engineering must link:

- the accepted report, ADR, prototype, or decision record;
- exact scope and non-goals;
- affected routes, files, records, APIs, schemas, interfaces, or workflows;
- request/response or data contracts only where they actually exist;
- required states, errors, compatibility, security, privacy, accessibility, and performance behavior;
- acceptance criteria, validation commands, manual evidence, and rollback;
- unresolved risks and the human owner of each decision.

The implementer must not need private chat context to determine behavior. Missing facts are recorded as `UNKNOWN — REQUIRES VALIDATION`, not guessed.

## 10. PR and closure traceability

Every delivery PR references its issue:

- use `Refs #123` while the PR contributes evidence but does not fully satisfy closure;
- use `Fixes #123`, `Closes #123`, or `Resolves #123` only when merging the PR should close the complete issue;
- do not auto-close decision, legal, release, or epic issues before required human approval and final evidence are recorded.

Before closure, add or retain evidence linking:

- merged PR or accepted artifact;
- exact verification commands and observed results;
- screenshots, reports, logs, metrics, traces, or source review when applicable;
- residual risks, exceptions, rollback, and the next dependency unlocked.

## 11. Evidence safety

Never post secrets, personal data, private URLs, proprietary chart/audio files, unlicensed media, copied third-party prose, credentials, or sensitive security/licensing evidence in public issues. Redact tokens, local paths, account identifiers, and unrelated logs. Use minimal fixtures and original or permitted evidence.

## 12. Automation boundary

Structured issue forms prevent empty public reports. The roadmap bootstrap validates canonical labels, ownership, milestones, hierarchy, dependencies, acceptance criteria, execution guidance, and live drift. Automation may validate and reconcile metadata; it must not invent facts, approvals, severity, product decisions, or legal conclusions.
