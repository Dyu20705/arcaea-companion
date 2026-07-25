## Design principles

Information before decoration
Song/chart metadata phải đọc nhanh hơn decorative visual.
Original, not imitative
Chỉ lấy cảm hứng từ light/dark contrast, fragmented geometry và nhịp điệu; không copy official UI, Sekai Viewer hay wiki layout.
Provenance is visible
Source, reviewed state, uncertainty và catalog freshness là UI elements cấp một.
Progressive density
Summary trước, technical detail sau; desktop có density cao nhưng narrow screen không mất thông tin.
Media is optional
Layout vẫn hoàn chỉnh khi không có jacket/partner art.
Motion is non-essential
Animation chỉ hỗ trợ orientation; mọi information/function tồn tại khi motion bị tắt

## Themes tokens

Không chọn màu bằng cách eyedrop trực tiếp từ official artwork.

Dùng semantic tokens:

--color-canvas
--color-surface
--color-surface-raised
--color-text
--color-text-muted
--color-border
--color-accent
--color-accent-contrast
--color-focus
--color-success
--color-warning
--color-danger
--color-unknown
--color-spoiler
Hikari-inspired light

Đặc trưng:

bright neutral canvas;
cool translucent surfaces;
dark readable text;
restrained luminous accent;
không dùng pure-white trên toàn bộ page;
decorative shards có opacity thấp.
Tairitsu-inspired dark

Đặc trưng:

dark neutral canvas, không pure black;
elevated surfaces rõ hierarchy;
light text không glare;
violet/cool accent với focus color riêng;
không đặt muted purple text trên dark purple background.

Issue yêu cầu cả hai theme vượt preliminary contrast review.

Accessibility targets
Body text: tối thiểu 4.5:1.
Large text: tối thiểu 3:1.
Pointer targets: WCAG AA minimum 24×24 CSS px; project target nên là 44×44 CSS px cho controls chính khi layout cho phép.
Reflow: kiểm tra ở width tương đương 320 CSS px.
Motion triggered by interaction phải có thể tắt hoặc loại bỏ khi không thiết yếu.
Focus không được bị sticky header hoặc overlay che khuất.

Các ngưỡng này bám theo WCAG 2.2 và W3C guidance.

## Component inventory

App shell
├── Header
├── Primary navigation
├── Narrow-screen navigation
├── Skip link
├── Footer
└── Theme control

Discovery
├── Search field
├── Filter group
├── Active filter chips
├── Sort control
├── Result count
├── Card/table switch
├── Pagination
└── Clear/reset action

Content
├── Entity heading
├── Metadata definition list
├── Chart/difficulty table
├── Media frame
├── Missing-media placeholder
├── Source/provenance block
├── Review/uncertainty badge
├── Spoiler disclosure
├── Related-entity list
└── Breadcrumb

Resilience
├── Loading
├── Empty
├── Error
├── Offline
├── Not found
├── Stale catalog
└── Unsupported/missing data

## State matrix

| Component   | Default | Hover | Focus | Disabled | Loading     | Empty | Error | Offline | Missing media | Uncertain | Stale | Spoiler |
| ----------- | ------- | ----- | ----- | -------- | ----------- | ----- | ----- | ------- | ------------- | --------- | ----- | ------- |
| Search      | ✓       | ✓     | ✓     | —        | —           | —     | ✓     | ✓       | —             | —         | —     | —       |
| Song card   | ✓       | ✓     | ✓     | —        | skeleton    | —     | —     | ✓       | ✓             | ✓         | ✓     | —       |
| Metadata    | ✓       | —     | —     | —        | skeleton    | —     | ✓     | ✓       | —             | ✓         | ✓     | ✓       |
| Filter      | ✓       | ✓     | ✓     | ✓        | —           | ✓     | ✓     | ✓       | —             | —         | —     | —       |
| Media frame | ✓       | —     | —     | —        | placeholder | —     | ✓     | ✓       | ✓             | —         | —     | ✓       |

## Wireframes và high-fidelity prototype

Low-fidelity

Tạo desktop và narrow wireframes cho:

Home
Explore
Song detail

Mục tiêu low-fi:

hierarchy;
order;
navigation;
focus order;
filter behavior;
responsive transformation;
content density.
High-fidelity

Tạo ba page frames:

Home — desktop
Explore — desktop
Song detail — desktop

Dùng variables/tokens để switch giữa hai theme, thay vì duplicate thủ công toàn bộ component.

Tạo ba annotated narrow variants để chứng minh responsive flow:

Home — 320–390px
Explore — 320–390px
Song detail — 320–390px
Representative scenarios

Home

current release present;
no usable promotional image;
one stale status;
clear unofficial-project notice.

Explore

500+ representative result count;
long query;
multiple active filters;
no-result variant;
table and card modes;
URL state annotation.

Song detail

long multilingual title;
multiple charts;
unknown value;
missing jacket;
source status;
related pack/partner;
stale catalog warning;
spoiler-sensitive relationship

## Performance assumptions

decorative effects dùng CSS/SVG tự tạo;
không phụ thuộc large hero image để page hoạt động;
media frame luôn reserve dimensions;
blur/backdrop-filter không phải requirement;
không auto-play animation;
cards không render thông tin lặp quá mức;
narrow screen ưu tiên single-column;
table có responsive alternative, không ép mọi bảng thành horizontally scrolling grid;
missing media không tạo layout shift.

## Originality review

| Decision              | Inspiration level        | Original implementation        | Copying risk | Resolution                             |
| --------------------- | ------------------------ | ------------------------------ | ------------ | -------------------------------------- |
| Light/dark dual theme | Character-level mood     | Semantic token themes          | Medium       | Không dùng official palette/assets     |
| Polygon accent        | Abstract rhythm motif    | Original CSS/SVG geometry      | Low          | Limit density                          |
| Song cards            | General catalog pattern  | New layout based on PRD fields | Low          | No Sekai layout copy                   |
| Navigation            | Information architecture | Derived from issue #3 sitemap  | Low          | No official game navigation            |
| Images                | Optional media frame     | Neutral placeholders           | High         | Assets deferred to permission pipeline |
