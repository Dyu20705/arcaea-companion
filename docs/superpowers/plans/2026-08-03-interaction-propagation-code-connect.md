# Interaction Propagation and Code Connect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete Figma interaction coverage for filters, selection controls, and content cards, then synchronize the Aether Prism token/component contract into React/CSS on `feat/app-shell-routing` with Code Connect-ready mappings.

**Architecture:** Figma remains the visual interaction source, while `src/styles/tokens.css` and typed `src/ui` components become the runtime source. CSS pseudo-classes own hover/focus/pressed visuals; explicit props own selected, expanded, disabled, unavailable, and density states. Code Connect files import production components but production code never imports Code Connect.

**Tech Stack:** Figma Plugin API, React 19, TypeScript 5.9, React Router 7, CSS custom properties, Vitest, Figma Code Connect React.

## Global Constraints

- Work only on branch `feat/app-shell-routing`.
- Use synthetic copy and procedural media only.
- Do not add an external component library.
- Preserve native HTML semantics and minimum 44px interaction targets.
- Publish to Figma is blocked until a supported Dev/Full Organization or Enterprise seat exists.
- Do not merge the branch.

---

### Task 1: Propagate filter interaction variants in Figma

**Files:**
- Modify Figma page `01 Components`, section `Section/Filters`.

**Interfaces:**
- Produces: `FilterChip` states `Default`, `Hover`, `Focus-visible`, `Selected`, `Selected hover`, `Disabled`.
- Produces: `FilterGroup` states `Collapsed`, `Collapsed focus`, `Expanded`, `Expanded focus`, `Disabled`.
- Produces: `Select` states `Closed`, `Hover`, `Focus-visible`, `Open`, `Error`, `Disabled`.

- [ ] Inspect current component descendants, auto-layout, variable bindings, and text properties.
- [ ] Duplicate existing source variants and rename properties without detaching instances.
- [ ] Apply semantic token bindings for hover, focus, selected, error, and disabled states.
- [ ] Reflow documentation specimens into a readable grid.
- [ ] Verify screenshots and audit variant names, bound paints, text styles, and overflow.

### Task 2: Propagate selection-control interaction variants in Figma

**Files:**
- Modify Figma page `01 Components`, section `Section/Selection controls`.

**Interfaces:**
- Produces: `SegmentedControl` density variants for `Comfortable` and `Compact`, each with default, focus-visible, and disabled states.
- Produces: `DifficultySelector` selected difficulty variants plus focus-visible and unavailable treatment.

- [ ] Inspect the segment descendants and shared child naming.
- [ ] Build actual component sets rather than documentation-only state tags.
- [ ] Preserve radio-group semantics in component descriptions.
- [ ] Add keyboard behavior documentation for Left/Right/Home/End.
- [ ] Verify narrow-width horizontal-scroll affordance and selected option visibility.

### Task 3: Propagate content interaction variants in Figma

**Files:**
- Modify Figma page `01 Components`, section `Section/Content`.

**Interfaces:**
- Produces: `SongCard` states `Default`, `Hover`, `Focus-visible`, `Selected`, `Unavailable`.
- Produces: `SongRow` states `Default`, `Hover`, `Focus-visible`, `Selected`, `Unavailable`.
- Produces: `ContentCard` variants `Default` and `Featured`, each with `Default`, `Hover`, `Focus-visible`, and `Pressed` states.

- [ ] Duplicate source variants and retain synthetic fixture overrides.
- [ ] Ensure focus-visible differs from hover and selected does not rely on color alone.
- [ ] Ensure unavailable content remains readable and clearly non-interactive.
- [ ] Add content interaction evidence to the resilience board.
- [ ] Verify screenshots, bindings, typography, and root overflow.

### Task 4: Add failing runtime contract tests

**Files:**
- Create: `src/styles/tokens.test.ts`.
- Create: `src/ui/interaction-components.test.tsx`.
- Modify: `package.json` only when the branch lacks required test dependencies.

**Interfaces:**
- Consumes: component contracts from the approved design spec.
- Produces: executable acceptance tests for tokens, semantics, aria states, and keyboard selection.

- [ ] Write a token test that reads `src/styles/tokens.css` and asserts required Light/Dark variables.
- [ ] Write component tests for FilterChip remove label, FilterGroup disclosure, native SelectField, SegmentedControl keyboard selection, unavailable DifficultySelector options, SongCard link semantics, and ContentCard single-link behavior.
- [ ] Trigger CI and confirm tests fail because production files do not exist.

### Task 5: Implement semantic tokens and typed component APIs

**Files:**
- Create: `src/styles/tokens.css`.
- Create: `src/ui/interaction-types.ts`.
- Create: `src/ui/FilterChip.tsx`.
- Create: `src/ui/FilterGroup.tsx`.
- Create: `src/ui/SelectField.tsx`.
- Create: `src/ui/SegmentedControl.tsx`.
- Create: `src/ui/DifficultySelector.tsx`.
- Create: `src/ui/SongCard.tsx`.
- Create: `src/ui/SongRow.tsx`.
- Create: `src/ui/ContentCard.tsx`.
- Create: `src/ui/interaction-components.css`.
- Modify: `src/main.tsx` to import tokens before global styles.

**Interfaces:**
- Produces the exact typed contracts documented in the design spec.

- [ ] Add Aether Prism primitive and semantic custom properties for Light/Dark/System behavior.
- [ ] Implement native-semantic React components with no external UI dependency.
- [ ] Implement CSS pseudo-class state visuals using semantic variables only.
- [ ] Add roving keyboard behavior for segmented and difficulty radio groups.
- [ ] Trigger CI and confirm component/token tests pass.

### Task 6: Integrate representative components into app-shell routes

**Files:**
- Modify: `src/routes/ExploreRoute.tsx`.
- Modify: `src/routes/HomeRoute.tsx`.
- Modify: `src/layout/SiteHeader.tsx`.
- Modify: `src/layout/PrimaryNavigation.tsx`.
- Modify: `src/styles.css` to consume tokens and remove conflicting one-off variables.

**Interfaces:**
- Consumes typed UI components and synthetic fixtures.
- Produces a coherent shell demonstration without implementing full product routes.

- [ ] Add synthetic Home content cards.
- [ ] Add Explore filter, density, difficulty, SongCard, and SongRow examples.
- [ ] Implement navigation with `NavLink` and correct `aria-current` behavior.
- [ ] Restore the skip link in AppShell and verify focus restoration remains intact.
- [ ] Trigger CI and verify route rendering tests, typecheck, and build.

### Task 7: Create Code Connect-ready local contract

**Files:**
- Create: `figma.config.json`.
- Create: `src/ui/figma/FilterChip.figma.tsx`.
- Create: `src/ui/figma/FilterGroup.figma.tsx`.
- Create: `src/ui/figma/SelectField.figma.tsx`.
- Create: `src/ui/figma/SegmentedControl.figma.tsx`.
- Create: `src/ui/figma/DifficultySelector.figma.tsx`.
- Create: `src/ui/figma/SongCard.figma.tsx`.
- Create: `src/ui/figma/SongRow.figma.tsx`.
- Create: `src/ui/figma/ContentCard.figma.tsx`.
- Modify: `package.json` with non-runtime Code Connect scripts/dependency only if supported by current package constraints.

**Interfaces:**
- Consumes stable Figma node IDs after Tasks 1–3.
- Maps Figma properties to production props without runtime dependency.

- [ ] Add local Code Connect config for React and TypeScript.
- [ ] Map each target component set to the exact production component and prop values.
- [ ] Add `figma:parse` script and document `figma:publish` as seat-blocked.
- [ ] Run local parse when available; otherwise record the exact plan/seat blocker without claiming publish success.

### Task 8: Final verification and issue evidence

**Files:**
- Modify: `docs/superpowers/specs/2026-08-03-interaction-propagation-code-connect-design.md` only if implementation changed the contract.
- Add a comment to GitHub issue #38 with evidence; do not close automatically.

**Interfaces:**
- Produces review-ready evidence and remaining blocker list.

- [ ] Re-run Figma audits for variant coverage, bound paints, meaningful text styles, and overflow.
- [ ] Run or inspect CI evidence for `pnpm test`, `pnpm typecheck`, `pnpm build`, and `pnpm check`.
- [ ] Compare branch to its starting commit and review every changed file.
- [ ] Comment on issue #38 with completed scope, verification, and Code Connect publish blocker.
- [ ] Do not merge or close the issue without explicit user instruction.
