# Product Validation

## Baseline

- Base branch: `main`
- Base commit: `<git rev-parse HEAD>`
- Node: `<node --version>`
- pnpm: `<pnpm --version>`
- Baseline command: `pnpm check`
- Result: PASS / FAIL
- Existing unrelated failures: none / list

## Personas

Persona 1 — Direct lookup player

Mục tiêu:

tìm nhanh một song, chart, pack hoặc partner;
kiểm tra difficulty, constant, BPM, note count, availability;
xác định dữ liệu có mới và có nguồn hay không.

| Field | Value |
|---|---|
| Trigger | Người chơi cần nguồn nhạc, cần tính toán lộ trình chơi game hiệu quả và yêu quý partner nào đó -> muốn hiểu hơn|
| Primary task |  |
| Required information | Dữ liệu tối thiểu |
| Failure condition | Khi nào flow bị xem là thất bại |
| Trust signal | Source, reviewed status, version, uncertainty |
| Narrow-screen impact | Hành vi trên màn hình hẹp |

Persona 2 — Discovery player

Mục tiêu:

chưa biết chính xác cần tìm gì;
browse/filter theo pack, difficulty, level hoặc category;
mở một entity rồi tiếp tục sang entity liên quan.

| Field | Value |
|---|---|
| Trigger | Điều gì khiến user mở website |
| Primary task | Việc chính cần hoàn thành |
| Required information | Dữ liệu tối thiểu |
| Failure condition | Khi nào flow bị xem là thất bại |
| Trust signal | Source, reviewed status, version, uncertainty |
| Narrow-screen impact | Hành vi trên màn hình hẹp |

Persona 3 — Knowledge-oriented player

Mục tiêu:

đọc story/game-topic/information;
hiểu thuật ngữ hoặc system;
nhận biết spoiler, uncertainty, version applicability và source status.

| Field | Value |
|---|---|
| Trigger | Điều gì khiến user mở website |
| Primary task | Việc chính cần hoàn thành |
| Required information | Dữ liệu tối thiểu |
| Failure condition | Khi nào flow bị xem là thất bại |
| Trust signal | Source, reviewed status, version, uncertainty |
| Narrow-screen impact | Hành vi trên màn hình hẹp |

## Content taxonomy

Catalog
├── Songs
│   └── Charts
├── Packs
├── Partners
├── Story
├── Game topics
├── Releases / current information
├── Sources
└── Review / uncertainty / version status

## Sitemap authoritative

/
├── /explore
├── /songs/:songId
├── /packs/:packId
├── /partners/:partnerId
├── /story
├── /game/:topic
├── /information
├── /wiki
├── /about
├── /legal
├── /settings
└── * / 404

flowchart TD
    Home["/"] --> Explore["/explore"]
    Home --> Information["/information"]
    Home --> Wiki["/wiki"]

    Explore --> Song["/songs/:songId"]
    Explore --> Pack["/packs/:packId"]
    Explore --> Partner["/partners/:partnerId"]

    Song --> Pack
    Song --> Partner
    Pack --> Song
    Partner --> Song

    Wiki --> Story["/story"]
    Wiki --> GameTopic["/game/:topic"]

    Home --> About["/about"]
    Home --> Legal["/legal"]
    Home --> Settings["/settings"]

## URL-state contract

Nguyên tắc bắt buộc:

Filter và sort của /explore thuộc URL query parameters.
Reload phải khôi phục cùng state.
Copy URL sang tab khác phải tái tạo cùng search/filter state.
Unknown query parameter bị bỏ qua an toàn.
Invalid value dùng default có chủ đích và không crash.
Reset filters phải tạo URL canonical.
Không lưu canonical filter state chỉ trong React state hoặc local storage.

## Primary user journeys

Journey A — Discover to detail
Home
→ Explore
→ apply filter
→ open song
→ inspect chart/source/status
→ open related pack
Journey B — Direct lookup
External/direct URL
→ Song detail
→ verify catalog/update/source status
→ navigate to related entity
Journey C — Shareable explore state
Explore
→ set search/filter/sort
→ copy URL
→ reload/open new browser
→ same controls and result definition restored
Journey D — Failure recovery
Invalid entity ID
→ intentional not-found/unavailable state
→ link back to Explore
→ search alternative
Journey E — Accessible narrow-screen flow
Keyboard or narrow viewport
→ open navigation
→ search
→ change filters
→ open result
→ return without losing context

## Success measures không cần analytic

- A reviewer completes each primary journey without implementation knowledge.
- Every `/explore` filter/sort state is reproducible from its URL.
- Every public route maps to a defined static entity, index, or editorial source.
- No runtime/upload/playback/analytics/replay route appears in public navigation.
- Every page has defined loading, empty/unavailable, error and not-found behavior where applicable.
- Every unknown data dependency is explicitly marked.

## Validation

| Requirement            | Charter | Brief         | Roadmap  | PRD     | Result |
| ---------------------- | ------- | ------------- | -------- | ------- | ------ |
| Ordinary-player-first  | section | section       | Week 1   | section | PASS   |
| Static wiki            | section | section       | section  | section | PASS   |
| Runtime excluded       | section | section       | section  | section | PASS   |
| URL-owned filter state | —       | route section | issue #3 | section | PASS   |
| Provenance visible     | section | section       | roadmap  | section | PASS   |

Commands

Documentation-only minimum:

git diff --check
git status --short

Strong final verification:

pnpm check

Nếu roadmap manifest bị sửa:

bash -n scripts/bootstrap-roadmap.sh
bash -n tests/roadmap/test-bootstrap-roadmap.sh
bash tests/roadmap/test-bootstrap-roadmap.sh

bash scripts/bootstrap-roadmap.sh \
  --dry-run \
  --phase all \
  --start-date 2026-07-14 \
  --repo Dyu20705/arcaea-viewer

Các validation path này đã được repository quy định theo change type.