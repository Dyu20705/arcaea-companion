# Arcaea Viewer

Frontend-first prototype for an unofficial Arcaea information product.

The current repository intentionally contains **only the Web MVP shell**. It does not include Arcaea catalog data, official artwork, audio, chart files, story text, a backend, a database, Rust/WASM runtime code, or generated viewer artifacts.

> This project is not affiliated with, sponsored by, approved by, or endorsed by lowiro.

## Current scope

- original frontend information architecture and UI;
- responsive and keyboard-accessible foundations;
- synthetic-only product states;
- a controlled path from prototype review to permission request;
- frontend build and CI.

Public Arcaea-specific release remains blocked until written authorization, approved-source integration, audit, and an explicit release decision.

## Repository strategy

The project remains a single frontend repository during the MVP.

A separate `arcaea-data` repository is justified only when the project has an authorized source plus an independent validation, versioning, review, and publication lifecycle.

A separate `arcaea-api` or backend repository is justified only when measured product requirements cannot be met by static delivery and the service has an independent deployment and operations lifecycle.

The previous Rust/WASM chart prototype is preserved at:

```text
archive/runtime-prototype-2026-08-01
```

## Development

Requirements:

- Node.js 22 or newer;
- pnpm 10.32.1.

```bash
pnpm install
pnpm dev
```

Validation:

```bash
pnpm check
```

## Project status

- Frontend skeleton: active
- Synthetic catalog: not added
- lowiro request: not submitted
- Approved data integration: blocked
- Public release: blocked
- External contributions: not open during MVP development

## License

Repository source code is licensed under GPL-3.0-only. The license does not grant rights to Arcaea names, artwork, audio, charts, story text, screenshots, trademarks, or other third-party material.
