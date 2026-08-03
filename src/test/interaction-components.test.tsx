import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { ContentCard } from "../ui/ContentCard";
import { DifficultySelector } from "../ui/DifficultySelector";
import { FilterChip } from "../ui/FilterChip";
import { FilterGroup } from "../ui/FilterGroup";
import { SegmentedControl } from "../ui/SegmentedControl";
import { SelectField } from "../ui/SelectField";
import { SongCard } from "../ui/SongCard";
import { getNextEnabledIndex, type SongSummary } from "../ui/interaction-types";

function test(name: string, run: () => void) {
  run();
  console.log(`✓ ${name}`);
}

function render(element: ReactElement) {
  return renderToStaticMarkup(element);
}

const song: SongSummary = {
  id: "prism-echo-001",
  title: "Prism Echo 001",
  artist: "Archive Artist 03",
  pack: "Archive Set B",
  difficulty: "FTR 9+",
  bpm: 180,
  status: "reviewed",
};

test("semantic tokens define Light and Dark interaction roles", () => {
  const css = readFileSync("src/styles/tokens.css", "utf8");
  for (const token of [
    "--av-background-canvas",
    "--av-background-interactive-hover",
    "--av-background-interactive-pressed",
    "--av-border-strong",
    "--av-text-disabled",
    "--av-action-primary",
    "--av-action-pressed",
    "--av-focus-ring",
  ]) {
    assert.match(css, new RegExp(token));
  }
  assert.match(css, /prefers-color-scheme:\s*dark/);
  assert.match(css, /\[data-theme="dark"\]/);
});

test("FilterChip exposes selected and remove semantics", () => {
  const html = render(
    createElement(FilterChip, {
      label: "Future",
      selected: true,
      onSelectedChange: () => undefined,
      onRemove: () => undefined,
    }),
  );
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /aria-label="Remove Future filter"/);
});

test("FilterGroup exposes controlled disclosure state", () => {
  const html = render(
    createElement(
      FilterGroup,
      {
        title: "Difficulty",
        selectedCount: 2,
        expanded: true,
        onExpandedChange: () => undefined,
        onClear: () => undefined,
      },
      createElement("span", null, "Future"),
    ),
  );
  assert.match(html, /aria-expanded="true"/);
  assert.match(html, /2 selected/);
  assert.match(html, />Clear</);
});

test("SelectField retains native select semantics", () => {
  const html = render(
    createElement(SelectField, {
      label: "Sort",
      value: "title",
      options: [
        { value: "title", label: "Title A–Z" },
        { value: "updated", label: "Recently updated" },
      ],
      onChange: () => undefined,
    }),
  );
  assert.match(html, /<label/);
  assert.match(html, /<select/);
  assert.match(html, /Title A–Z/);
});

test("SegmentedControl renders a labelled radio group", () => {
  const html = render(
    createElement(SegmentedControl, {
      label: "Density",
      value: "comfortable",
      options: [
        { value: "comfortable", label: "Comfortable" },
        { value: "compact", label: "Compact" },
      ],
      onValueChange: () => undefined,
    }),
  );
  assert.match(html, /role="radiogroup"/);
  assert.match(html, /aria-checked="true"/);
});

test("keyboard navigation skips disabled segmented options", () => {
  const next = getNextEnabledIndex(0, 1, [false, true, false]);
  assert.equal(next, 2);
});

test("DifficultySelector keeps unavailable options visible and disabled", () => {
  const html = render(
    createElement(DifficultySelector, {
      value: "future",
      options: [
        { value: "past", label: "PAST", rating: "3" },
        { value: "future", label: "FUTURE", rating: "9+" },
        {
          value: "beyond",
          label: "BEYOND",
          rating: "10",
          unavailable: true,
        },
      ],
      onValueChange: () => undefined,
    }),
  );
  assert.match(html, /BEYOND/);
  assert.match(html, /disabled=""/);
});

test("SongCard is one link when navigable and no link when unavailable", () => {
  const available = render(
    createElement(SongCard, {
      song,
      href: "/songs/prism-echo-001",
    }),
  );
  const unavailable = render(
    createElement(SongCard, {
      song: { ...song, status: "unavailable" },
    }),
  );
  assert.match(available, /href="\/songs\/prism-echo-001"/);
  assert.doesNotMatch(unavailable, /<a/);
});

test("ContentCard uses a single anchor without nested controls", () => {
  const html = render(
    createElement(ContentCard, {
      title: "Browse packs",
      description: "Structured entry point with limited supporting information.",
      href: "/explore",
      actionLabel: "View collection",
      featured: true,
    }),
  );
  assert.equal((html.match(/<a/g) ?? []).length, 1);
  assert.equal((html.match(/<button/g) ?? []).length, 0);
});

console.log("Interaction component contract tests passed.");
