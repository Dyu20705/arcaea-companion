# Roadmap Operating Model

## 1. Purpose

This document defines how the declarative roadmap becomes executable work for a solo maintainer and AI-assisted contributors. It complements the product roadmap and contribution workflow; it does not replace issue-specific acceptance criteria or human approval gates.

## 2. Sources of truth

Use the following precedence when records disagree:

1. accepted product, legal, architecture, and design documents;
2. `roadmap/issues/*.json` for issue scope, state, ownership, parents, and dependencies;
3. `roadmap/issue-execution-guidance.json` for reusable and issue-specific execution guidance;
4. GitHub issues and pull requests for discussion, review, and evidence;
5. private chat or local notes only as temporary context.

A decision that must survive reconciliation belongs in the repository. Direct edits to roadmap-managed GitHub issue bodies are temporary unless the canonical manifests are updated.

## 3. Readiness rule

An open issue is Ready only when all of the following are true:

- every key in `blockedBy` is closed as completed;
- the outcome, scope, non-goals, acceptance criteria, validation, owner, and milestone are sufficiently explicit for the change;
- required product, design, legal, security, privacy, asset, or release decisions are linked;
- affected files or surfaces and required evidence are identifiable;
- no unresolved P0 contradiction would force the implementer to invent policy.

`blockedBy` relationships are the authoritative readiness signal. Status labels describe the kind of work or review required; they do not override dependencies.

## 4. Status label semantics

| Label | Meaning |
| --- | --- |
| `status:agent-ready` | The issue is suitable for AI-assisted execution after all dependencies are complete. |
| `status:human-required` | Maintainer judgment, approval, or manual evidence is required. The issue may still be blocked. |
| `status:needs-design` | UX or visual evidence is required. The issue may still be blocked. |
| `status:needs-decision` | A recorded product, architecture, data, legal, or design decision is required. |
| `status:blocked` | Optional visual hint only. Canonical `blockedBy` relationships remain authoritative. |

An issue may legitimately carry more than one review-mode label. Readiness must never be inferred from `status:agent-ready` alone.

## 5. Stage gates

The MVP uses one explicit phase chain:

```text
Week 1 discovery
  → Week 2 foundation
  → Week 3 core wiki
  → Week 4 encyclopedia/content workflow
  → Week 5 production quality
  → Week 6 public preview
```

A phase epic may close only when:

- all P0 child outcomes required by that gate are complete;
- acceptance evidence and required human approvals are linked;
- deferred P1/P2 work is explicitly recorded and does not invalidate the gate;
- no unresolved legal, accessibility, security, privacy, performance, data-integrity, or rollback exception is hidden;
- the canonical state is updated and the post-merge roadmap dry-run reports no unexplained drift.

Closing a child issue does not automatically close its phase epic. Starting research for a later phase is permitted when independent, but later-phase implementation must not bypass the preceding phase gate.

## 6. Solo-maintainer work-in-progress limits

To minimize context switching and unfinished work:

- keep at most **one implementation issue** actively in progress;
- keep at most **two independent research or decision issues** in progress;
- do not open a second implementation PR until the first is merged, closed, or explicitly blocked with a recorded handoff;
- split independent discoveries into linked follow-up issues instead of silently expanding scope;
- prefer one observable outcome per PR and one reviewable rollback boundary;
- cut P2 first, then P1, before weakening P0 correctness, provenance, accessibility, security, or release evidence.

Exceptions require a written reason, owner, and return condition in the relevant issue or pull request.

## 7. Schedule variance and rebaselining

Milestone due dates are forecasts, not completion evidence. When a phase remains open after its due date:

1. record the variance on the phase epic using the original due date, current date, unfinished gate items, and known cause;
2. keep the issue open and preserve the missed baseline instead of closing work to make the dashboard appear healthy;
3. choose an explicit response: reduce scope, change capacity, or rebaseline the remaining milestones;
4. record the reviewed forecast and the assumptions behind it;
5. update milestone dates only through the canonical roadmap workflow and verify the resulting dependency schedule.

Do not shift dates silently. When the remaining duration is unknown, write `UNKNOWN — REQUIRES VALIDATION`, finish the next decision-quality estimate, and then rebaseline. Historical baseline and actual completion evidence must remain recoverable from Git history and issue discussion.

## 8. Execution and closure sequence

Use this sequence for each non-epic issue:

1. confirm Ready status from canonical dependencies and required decisions;
2. create a focused branch from the current target branch;
3. capture baseline behavior and write the narrowest failing test or check where behavior changes;
4. implement the smallest end-to-end outcome;
5. run targeted verification, then every applicable repository check;
6. perform required manual, accessibility, legal, security, data, or release review;
7. open or update a focused pull request with acceptance evidence, risks, and rollback;
8. obtain required human approval and merge intentionally;
9. update canonical roadmap state and reconcile live GitHub relationships;
10. close the issue only after final evidence is linked and the roadmap dry-run is clean.

CI success is necessary but does not by itself prove the issue is Done.

## 9. Drift and rollback

Before any roadmap write, run the read-only plan. After an authorized apply, run the same plan with authoritative relationship reconciliation and require only expected no-op or intentional skip results.

If the plan reports unexpected create, update, close, parent, dependency, milestone, label, or assignee operations:

1. stop the apply;
2. identify whether the repository manifest or live GitHub state is correct;
3. repair the canonical source or explicitly review the intended migration;
4. rerun tests and dry-run;
5. apply only after the complete plan is understood.

Rollback is a focused revert of the canonical change followed by the same tested reconciliation workflow. Do not repair managed issue bodies manually as a permanent fix.
