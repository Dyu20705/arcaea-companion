#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="${ROADMAP_ROOT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"

fail() {
  printf 'FAIL: %s\n' "$*" >&2
  exit 1
}

require_file() {
  [[ -f "$ROOT/$1" ]] || fail "missing required file: $1"
}

require_label() {
  jq -e --arg name "$1" '.labels[] | select(.name == $name)' \
    "$ROOT/roadmap/labels.json" >/dev/null || fail "missing required label: $1"
}

printf 'test: production issue taxonomy is available\n'
for label in \
  type:bug \
  type:research \
  type:design \
  type:chore \
  type:tech-debt \
  status:needs-triage; do
  require_label "$label"
done

printf 'test: public intake uses schema-aware structured issue forms\n'
for form in \
  .github/ISSUE_TEMPLATE/bug_report.yml \
  .github/ISSUE_TEMPLATE/feature_request.yml \
  .github/ISSUE_TEMPLATE/data_correction.yml \
  .github/ISSUE_TEMPLATE/research_design.yml \
  .github/ISSUE_TEMPLATE/accessibility_report.yml \
  .github/ISSUE_TEMPLATE/config.yml; do
  require_file "$form"
done

require_file tests/roadmap/validate-issue-forms.rb
command -v ruby >/dev/null 2>&1 || fail 'Ruby is required for YAML issue-form validation'
ruby "$ROOT/tests/roadmap/validate-issue-forms.rb" "$ROOT"

printf 'test: active managed work is attributable and actionable\n'
jq -s -e '
  [.[].issues[]]
  | all(.[ ];
      select((.state // "open") == "open" and .phase != "cleanup")
      | ((.labels // []) | map(select(startswith("type:"))) | length) == 1
      and ((.labels // []) | map(select(startswith("priority:"))) | length) == 1
      and ((.assignees // []) | length) >= 1
      and (.milestone != null)
      and ((.key == "web-mvp-roadmap") or (.parent != null))
      and ((.outcome // "") | length) > 0
      and ((.scope // []) | length) > 0
      and ((.acceptanceCriteria // []) | length) > 0
      and ((.definitionOfDone // []) | length) > 0)
' "$ROOT"/roadmap/issues/*.json >/dev/null || fail 'an active managed issue lacks one type, one priority, ownership, hierarchy, scope, acceptance criteria, or DoD'

printf 'test: issue operating standard defines lifecycle and handoff\n'
require_file docs/process/ISSUE_STANDARD.md
grep -Fq 'Backlog / Icebox' "$ROOT/docs/process/ISSUE_STANDARD.md" || fail 'issue standard must define backlog state'
grep -Fq 'Ready for Development' "$ROOT/docs/process/ISSUE_STANDARD.md" || fail 'issue standard must define ready state'
grep -Fq 'In Review' "$ROOT/docs/process/ISSUE_STANDARD.md" || fail 'issue standard must define review state'
grep -Fq 'Handoff standard' "$ROOT/docs/process/ISSUE_STANDARD.md" || fail 'issue standard must define handoff'
grep -Fq 'Fixes #' "$ROOT/docs/process/ISSUE_STANDARD.md" || fail 'issue standard must define PR closure traceability'
grep -Fq '[Research/Design]' "$ROOT/docs/process/ISSUE_STANDARD.md" || fail 'issue standard must define the combined untriaged research/design prefix'
grep -Fq 'ROADMAP_OPERATING_MODEL.md' "$ROOT/docs/process/ISSUE_STANDARD.md" || fail 'issue standard must identify the canonical managed-workflow policy'
grep -Fq 'ISSUE_STANDARD.md' "$ROOT/roadmap/README.md" || fail 'roadmap documentation must link the production issue standard'

printf 'Production issue standard tests passed.\n'
