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

printf 'test: public intake uses structured issue forms\n'
for form in \
  .github/ISSUE_TEMPLATE/bug_report.yml \
  .github/ISSUE_TEMPLATE/feature_request.yml \
  .github/ISSUE_TEMPLATE/data_correction.yml \
  .github/ISSUE_TEMPLATE/research_design.yml \
  .github/ISSUE_TEMPLATE/accessibility_report.yml \
  .github/ISSUE_TEMPLATE/config.yml; do
  require_file "$form"
done

grep -Fq 'id: reproduction' "$ROOT/.github/ISSUE_TEMPLATE/bug_report.yml" || fail 'bug form must require reproduction'
grep -Fq 'id: environment' "$ROOT/.github/ISSUE_TEMPLATE/bug_report.yml" || fail 'bug form must collect environment'
grep -Fq 'id: impact' "$ROOT/.github/ISSUE_TEMPLATE/bug_report.yml" || fail 'bug form must collect impact/frequency'
grep -Fq 'id: acceptance-criteria' "$ROOT/.github/ISSUE_TEMPLATE/feature_request.yml" || fail 'feature form must collect acceptance criteria'
grep -Fq 'id: non-goals' "$ROOT/.github/ISSUE_TEMPLATE/feature_request.yml" || fail 'feature form must collect non-goals'
grep -Fq 'id: source-evidence' "$ROOT/.github/ISSUE_TEMPLATE/data_correction.yml" || fail 'data correction form must collect sources'
grep -Fq 'id: decision-output' "$ROOT/.github/ISSUE_TEMPLATE/research_design.yml" || fail 'research/design form must define its decision output'
grep -Fq 'id: assistive-technology' "$ROOT/.github/ISSUE_TEMPLATE/accessibility_report.yml" || fail 'accessibility form must collect assistive technology context'
grep -Fq 'blank_issues_enabled: false' "$ROOT/.github/ISSUE_TEMPLATE/config.yml" || fail 'blank issues must remain disabled'

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

printf 'Production issue standard tests passed.\n'
