# Issue #4 UI Direction Validation

| Field | Value |
| --- | --- |
| Issue | [#4 — Research references and approve an original Arcaea-inspired UI direction](https://github.com/Dyu20705/arcaea-viewer/issues/4) |
| Pull request | [#85](https://github.com/Dyu20705/arcaea-viewer/pull/85) |
| Research artifact | [`docs/design/UI_REFERENCE_RESEARCH.md`](../design/UI_REFERENCE_RESEARCH.md) |
| Direction artifact | [`docs/design/WEB_MVP_UI_DIRECTION.md`](../design/WEB_MVP_UI_DIRECTION.md) |
| Prototype evidence | [`docs/design/prototypes/`](../design/prototypes/) |
| Base branch | `main` |
| Base commit observed before rewrite | `0dec7e90ef4d6622c60c425fc5217c2554404e23` |
| Decision status | Proposed; maintainer approval required |

## 1. Review outcome

The initial PR was not ready for design approval.

It contained:

- an eight-row list without research evidence, comparison dimensions, links, findings, or rejected patterns;
- a direction file formatted as unstructured notes and future instructions rather than an approved design contract;
- no concrete token values;
- no contrast calculations;
- no actual wireframes or high-fidelity prototypes;
- a one-line placeholder prototype README;
- a validation checklist with no method, evidence, result, limitations, or ownership;
- no explicit treatment of the lowiro derivative-works policy;
- a `dev` base that added unrelated roadmap/CI history to the displayed diff.

The remediation:

- retargeted PR #85 to `main`;
- replaced the reference list with an evidence-backed eight-reference research matrix and synthesis;
- defined an original direction, semantic tokens, layout behavior, component inventory, state matrix, accessibility contract, responsive transformations, performance implications, and implementation handoff;
- added six static desktop/narrow SVG prototypes with synthetic data and no protected game assets;
- calculated preliminary contrast for both theme candidates;
- separated research, direction, prototype evidence, and validation responsibilities;
- recorded legal/originality risk without claiming legal clearance.

## 2. Issue #4 acceptance-criteria mapping

| Acceptance criterion | Evidence | Review result |
| --- | --- | --- |
| Accepted UI direction includes rejected alternatives and reasons. | `UI_REFERENCE_RESEARCH.md` §§6–7; `WEB_MVP_UI_DIRECTION.md` §§1 and 16. | Covered; maintainer acceptance pending. |
| Both themes pass preliminary contrast review. | Direction §4.4 and validation §4. | Token pairs pass the stated preliminary checks; implementation testing remains pending. |
| Component inventory and state matrix exist. | Direction §§10–11. | Covered. |
| Design notes include responsive, performance, and reduced-motion implications. | Direction §§12–14. | Covered. |

## 3. Required-deliverable mapping

| Required deliverable | Location |
| --- | --- |
| Eight-reference research matrix | `UI_REFERENCE_RESEARCH.md` §3. |
| Information architecture findings | Research §5.1 and direction §§5–6. |
| Navigation findings | Research §5.2 and direction §5. |
| Card/table findings | Research §5.3 and direction §7. |
| Filter behavior | Research §5.4 and direction §7.2. |
| Image treatment | Research §5.5 and direction §8. |
| Accessibility findings | Research §5.6 and direction §§12–13. |
| Accepted visual direction | Direction §§1–3. |
| Light and dark tokens | Direction §4. |
| Component inventory | Direction §10. |
| State matrix | Direction §11. |
| Home/Explore/Song desktop and narrow prototypes | `docs/design/prototypes/`. |
| Rejected directions and reasons | Research §7 and direction §16. |
| Responsive/performance/reduced-motion implications | Direction §§12–14. |
| Originality/legal boundary | Direction §15. |

## 4. Preliminary contrast validation

### 4.1 Method

Contrast ratios were calculated from the proposed hexadecimal sRGB token values using the WCAG relative-luminance formula:

1. convert each sRGB channel to linear light;
2. compute relative luminance;
3. calculate `(L1 + 0.05) / (L2 + 0.05)`.

Thresholds used for preliminary review:

- 4.5:1 for ordinary text;
- 3:1 for large text and required non-text boundaries;
- implemented focus, hover, disabled, selected, and overlapping states still require separate testing.

### 4.2 Results

| Theme | Pair | Ratio | Threshold | Result |
| --- | --- | ---: | ---: | --- |
| Light | Primary text / canvas | 16.40:1 | 4.5:1 | Pass |
| Light | Muted text / canvas | 6.88:1 | 4.5:1 | Pass |
| Light | Accent / surface | 6.37:1 | 4.5:1 | Pass |
| Light | Accent text / accent | 6.37:1 | 4.5:1 | Pass |
| Light | Focus / surface | 6.97:1 | 3:1 | Pass |
| Light | Strong border / canvas | 3.34:1 | 3:1 | Pass |
| Dark | Primary text / canvas | 17.30:1 | 4.5:1 | Pass |
| Dark | Muted text / canvas | 10.14:1 | 4.5:1 | Pass |
| Dark | Accent / surface | 8.59:1 | 4.5:1 | Pass |
| Dark | Accent text / accent | 9.47:1 | 4.5:1 | Pass |
| Dark | Focus / surface | 9.30:1 | 3:1 | Pass |
| Dark | Strong border / surface | 4.24:1 | 3:1 | Pass |

`border-subtle` is excluded from interactive-boundary evidence and must not be the sole control/focus boundary.

## 5. Prototype coverage

| Required scenario | Desktop evidence | Narrow evidence | Covered states |
| --- | --- | --- | --- |
| Home | `home-desktop-light.svg` | `home-narrow-dark.svg` | Unofficial status, search, freshness, stale information, reviewed highlight, missing media. |
| Explore | `explore-desktop-dark.svg` | `explore-narrow-light.svg` | Large result count, multiple filters, canonical query summary, stale catalog, missing media, uncertain result. |
| Song detail | `song-detail-desktop-light.svg` | `song-detail-narrow-dark.svg` | Long title, multiple chart rows, unknown value, missing jacket, reviewed/stale status, sources, related entities. |

### Static inspection criteria

- [x] Synthetic content is labeled and contains no official game media.
- [x] Each page preserves a readable hierarchy without media.
- [x] Desktop and narrow files use materially different layout structures.
- [x] Status examples include text, not color alone.
- [x] Source/review/freshness information appears in the content hierarchy.
- [x] Decorative geometry remains outside primary text blocks and controls.
- [x] Both theme candidates are represented.
- [x] Prototype README records limitations and review method.

### Not proven by static SVG

- [ ] Keyboard interaction.
- [ ] Focus movement and return.
- [ ] Screen-reader semantics.
- [ ] Live announcements.
- [ ] URL and browser-history behavior.
- [ ] Implemented reduced-motion behavior.
- [ ] Runtime image performance.
- [ ] Actual 200% zoom/reflow in production components.

These remain acceptance requirements for the Week 2 shell/design-system implementation and later accessibility/performance audit.

## 6. Standards and legal review

The design contract references:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for contrast, reflow, focus-not-obscured, and target-size requirements;
- [GOV.UK Design System accessibility guidance](https://design-system.service.gov.uk/accessibility/) as a research reference, not proof of conformance;
- [lowiro derivative-works policy](https://arcaea.lowiro.com/derivative_policy) as a risk source, not legal interpretation.

Recorded controls:

- [x] Public theme names are neutral.
- [x] No official logo, asset, screenshot, story text, audio, chart, character silhouette, or copied UI is included.
- [x] No legal approval is claimed.
- [x] The unresolved software/fan-wiki legal basis is assigned to issue #11 and maintainer review.
- [x] Missing/uncertain permission defaults to omission or a neutral placeholder.

## 7. Repository and change-scope review

After retargeting to `main`, the PR is limited to design/research documentation and original prototype evidence.

No application code, dependency, roadmap manifest, automation, catalog record, external service, analytics, or production asset is changed.

Expected final files:

- `docs/design/UI_REFERENCE_RESEARCH.md`;
- `docs/design/WEB_MVP_UI_DIRECTION.md`;
- `docs/design/prototypes/README.md`;
- six prototype SVG files;
- `docs/process/UI_VALIDATION.md`.

## 8. Verification status

### Completed by document and artifact inspection

- [x] Research includes at least eight relevant references.
- [x] Each reference records useful patterns, limitations, and adopt/reject decisions.
- [x] Direction is aligned with the product route contract rather than the existing viewer screen.
- [x] Both themes have concrete semantic tokens and preliminary contrast results.
- [x] Component inventory and state matrix cover requested edge states.
- [x] Responsive, zoom, keyboard, focus, reduced-motion, image, and performance implications are explicit.
- [x] Prototype evidence exists for all required pages and widths.
- [x] Rejected alternatives and originality controls are explicit.
- [x] Legal risk is visible and human-owned.

### Required on the final PR head

- [ ] `git diff --check`
- [ ] `pnpm check`
- [ ] GitHub CI completes successfully on the final documentation commit.
- [ ] Maintainer inspects the rendered SVGs and Markdown.
- [ ] Maintainer records explicit originality, theme, accessibility-direction, and legal-risk approval in GitHub.

Roadmap shell tests and live dry-run are not required because the final PR does not change roadmap manifests or automation.

## 9. Human decisions still required

1. Approve or reject the `Prismatic Archive` direction.
2. Approve public theme labels Light/Dark/System and internal-only use of character-inspired roadmap wording.
3. Approve the proposed token candidates for Week 2 implementation.
4. Approve the Home, Explore, and Song detail hierarchy and narrow transformations.
5. Decide whether card/table switching remains MVP scope.
6. Confirm that the legal risk recorded against issue #11 does not require pausing public-facing design or changing project naming.
7. Confirm the direction is sufficiently original and does not imitate the official game, Sekai Viewer, or a community wiki.
8. Confirm this PR is sufficient to unblock issues #5 and #38 after PR #84 is approved.

## 10. Risks and rollback

### Residual risks

- Static prototypes do not prove interactive accessibility.
- No player usability study is claimed.
- Final catalog fields and media availability may require layout adjustment.
- The legal basis for public Arcaea-related software remains unresolved.
- Actual component contrast can differ when opacity, overlays, images, hover, disabled, or focus states are implemented.

### Rollback

Revert the focused documentation/prototype commits on `docs/ui-direction`. No data, dependency, application state, generated production asset, or deployment recovery is required.
