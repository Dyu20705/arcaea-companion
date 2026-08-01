#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="${ROADMAP_ROOT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"

fail() {
  printf 'FAIL: %s\n' "$*" >&2
  exit 1
}

assert_blocked_by() {
  local file="$1"
  local issue_key="$2"
  local blocker_key="$3"

  jq -e --arg issue_key "$issue_key" --arg blocker_key "$blocker_key" '
    .issues[]
    | select(.key == $issue_key)
    | (.blockedBy // [])
    | index($blocker_key) != null
  ' "$ROOT/$file" >/dev/null ||
    fail "$issue_key must be blocked by $blocker_key in $file"
}

printf 'test: weekly phase gates form one explicit critical path\n'
assert_blocked_by roadmap/issues/week-2.json week-2-epic week-1-epic
assert_blocked_by roadmap/issues/week-3.json week-3-epic week-2-epic
assert_blocked_by roadmap/issues/week-4.json week-4-epic week-3-epic
assert_blocked_by roadmap/issues/week-5.json week-5-epic week-4-epic
assert_blocked_by roadmap/issues/week-6.json week-6-epic week-5-epic

printf 'test: Week 2 implementation follows foundation prerequisites\n'
assert_blocked_by roadmap/issues/week-2.json repo-quality week-1-epic
assert_blocked_by roadmap/issues/week-2.json web-shell rsbuild-migration
assert_blocked_by roadmap/issues/week-2.json web-shell design-system
assert_blocked_by roadmap/issues/week-2.json asset-pipeline metadata-schema

printf 'test: final QA waits for the frozen content and asset audit\n'
assert_blocked_by roadmap/issues/week-6.json mvp-qa release-content-audit

printf 'Stage-gate policy tests passed.\n'
