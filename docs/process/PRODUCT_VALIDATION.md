# Issue #3 Product Requirements Validation

| Field | Value |
| --- | --- |
| Issue | [#3 — Wiki-first PRD, MVP boundaries, sitemap, and user journeys](https://github.com/Dyu20705/arcaea-viewer/issues/3) |
| Pull request | [#84](https://github.com/Dyu20705/arcaea-viewer/pull/84) |
| Reviewed artifact | [`docs/product/WEB_MVP_PRD.md`](../product/WEB_MVP_PRD.md) |
| Validation scope | Documentation structure, issue coverage, governing-document consistency, explicit unknowns, and reviewability |
| Base branch | `main` |
| Base commit observed before rewrite | `0dec7e90ef4d6622c60c425fc5217c2554404e23` |
| Decision status | Proposed; maintainer approval required |

## 1. Review outcome

The initial PR was not ready for product approval.

The review found that the main PRD file contained only a route table while personas, sitemap, journeys, commands, placeholders, and unsupported `PASS` claims were placed in a file named “Product Validation.” The branch also targeted `dev`, causing already-merged roadmap and CI work to appear in the PR diff.

The remediation:

- retargeted PR #84 to `main`, reducing the review surface to the two issue-specific documentation files;
- moved the product contract into `WEB_MVP_PRD.md`;
- restricted this file to validation method, findings, evidence mapping, residual decisions, and check status;
- replaced placeholders and mixed-language fragments with reviewable production documentation;
- added explicit route responsibilities, URL-state grammar, state behavior, dependencies, acceptance scenarios, rejected alternatives, scope cuts, legal/data unknowns, and human approval points;
- removed unsupported claims that commands or acceptance checks had passed.

## 2. Governing-document consistency

| Requirement | Project charter | Web MVP brief | Roadmap / issue | PRD evidence | Result |
| --- | --- | --- | --- | --- | --- |
| Ordinary players are the primary audience. | Audience and product promise | Primary audience | Issue #3 outcome | PRD §§2–4 | Consistent |
| Product is a static, public, wiki-first MVP. | MVP boundaries | Product intent and technology direction | Week 1/2 roadmap | PRD §§1, 5–6 | Consistent |
| Runtime, upload, playback, analytics, and replay are excluded from public MVP navigation. | MVP boundaries | Explicit exclusions | Issue #3 acceptance | PRD §§1, 6, 16 | Consistent |
| Public routes match the accepted brief. | Product promise | MVP routes | Issue #3 scope | PRD §§7–8 | Consistent |
| Explore filter/sort state is URL-owned. | Production workflow principles | Route contract | Issue #3 acceptance | PRD §9 and PRD-02–04 | Consistent |
| Provenance and uncertainty are first-class. | Accuracy and provenance | MVP promise | Issues #3, #11, #14 | PRD §§5, 10–11 | Consistent |
| Backend/accounts are not introduced. | MVP boundaries | Explicit exclusions | Issues #3 and #7 | PRD §§6 and 16 | Consistent |
| Original presentation is required. | Original, respectful presentation | Production credibility | Issues #3 and #4 | PRD §§5 and 16 | Consistent |
| Legal and asset decisions remain human-owned. | Governance and responsibility | Community principle | Issues #3 and #11 | PRD §§10, 17, 19 | Consistent |

## 3. Issue #3 acceptance-criteria mapping

| Acceptance criterion | Evidence | Review result |
| --- | --- | --- |
| PRD matches `docs/product/WEB_MVP_BRIEF.md`. | PRD route list, exclusions, static delivery, audience, and post-MVP path in §§1, 4, 6–8, and 18. | Covered; maintainer approval pending. |
| URL query parameters own sort/filter state. | Exact parameter, precedence, canonicalization, and history contract in §9; scenarios PRD-02–04. | Covered. |
| Runtime, upload, playback, analytics, and replay are excluded from MVP navigation. | Executive decision and explicit exclusions in §§1 and 6; rejected viewer-first approach in §16. | Covered. |
| Primary user journeys are testable. | Six journeys in §12 and twelve Given/When/Then scenarios in §15. | Covered at document level; implementation validation belongs to later route/UI issues. |

## 4. Required-deliverable mapping

| Required deliverable | Location |
| --- | --- |
| Approved PRD | `docs/product/WEB_MVP_PRD.md`; approval remains pending. |
| Personas and prioritized tasks | PRD §4. |
| Sitemap | PRD §7.2. |
| Content taxonomy | PRD §7.1. |
| Route/page responsibilities | PRD §8. |
| URL-state contract | PRD §9. |
| User-flow diagrams | PRD §12. |
| Route/data matrix | PRD §14. |
| Explicit cuts and post-MVP path | PRD §§6.2–6.3 and 18. |
| Measurable acceptance scenarios | PRD §15. |
| Decisions and rejected alternatives | PRD §16. |
| Residual risks, ownership, and next dependencies | PRD §17. |

## 5. Document-level walkthrough

This is a specification walkthrough, not a claim that the unimplemented web product works.

| Journey | Questions checked | Document result |
| --- | --- | --- |
| Browse to song and pack | Is entry navigation defined? Is URL state preserved? Are relationships and trust visible? | Contract is complete. |
| Direct song lookup | Is prior session unnecessary? Are invalid IDs and silent substitution addressed? | Contract is complete. |
| Shared explore state | Are supported parameters, defaults, invalid values, and history defined? | Contract is complete. |
| Story/game knowledge | Are spoiler and protected-prose boundaries explicit? | Contract is complete; legal approval remains external. |
| Missing/unavailable content | Are error classes and recovery actions distinguishable? | Contract is complete. |
| Narrow-screen keyboard flow | Are focus, reflow, reduced-motion, and state restoration required? | Contract is complete; prototype/implementation evidence remains external. |

## 6. Repository and change-scope review

- PR base is `main`.
- Changed files are limited to:
  - `docs/product/WEB_MVP_PRD.md`;
  - `docs/process/PRODUCT_VALIDATION.md`.
- No application code, dependencies, generated output, roadmap manifest, issue automation, catalog record, source record, asset, or workflow is changed.
- The preserved Rust/WebAssembly implementation is not modified.
- No official or third-party game media is introduced.
- No third-party wiki prose is reproduced.

## 7. Verification status

### Completed by document inspection

- [x] No placeholder fields remain.
- [x] No command result is represented as passing without evidence.
- [x] Product requirements and validation evidence are separated.
- [x] Route list matches the accepted Web MVP brief.
- [x] Every issue #3 acceptance criterion maps to a document section.
- [x] Data, legal, UI, and implementation dependencies are named rather than invented.
- [x] Scope excludes runtime/backend/account/analytics work.
- [x] The final diff is issue-focused after retargeting to `main`.

### Required on the final PR head

- [ ] `git diff --check`
- [ ] `pnpm check`
- [ ] GitHub CI completes successfully on the final documentation commit.
- [ ] Maintainer reviews the rendered Markdown, Mermaid diagrams, route table, and query-parameter contract.
- [ ] Maintainer records explicit product approval in GitHub.

Roadmap shell tests and the live roadmap dry-run are not required because this PR no longer changes roadmap manifests or automation.

## 8. Human decisions still required

The maintainer must decide or explicitly accept:

1. whether the route split among `/wiki`, `/information`, `/about`, and `/story` is correct;
2. whether `view` and `page` belong in canonical explore URLs;
3. whether the initial sort keys and filter categories are sufficiently small for MVP;
4. whether `/story` remains an index-only surface until legal/provenance policy is approved;
5. whether the stated scope-cut order protects the intended player value;
6. whether the legal risk recorded against issue #11 blocks public release, naming, or design work;
7. whether this PR is sufficient to unblock the product requirements needed by issues #7, #5, and #4.

## 9. Risks and rollback

### Residual risks

- No direct player interviews are claimed; the personas are modeled hypotheses.
- Exact data fields, IDs, search normalization, and catalog freshness remain unresolved by design.
- Legal interpretation and asset/publication permission remain outside this PR.
- Document-level walkthroughs do not replace later browser, accessibility, performance, or content validation.

### Rollback

Revert the focused documentation commit(s) on `docs/web-mvp-prd`. No data, application state, dependency, generated artifact, or deployment recovery is required.
