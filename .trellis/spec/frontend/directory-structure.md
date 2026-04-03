# Directory Structure

> Frontend directory layout for the React 18 + TypeScript + Vite application.

---

## Overview

Frontend code must live in a predictable `src/` tree with clear boundaries between UI,
page orchestration, state, services, shared types, and static assets.

A reference layout is:

```text
src/
├── main.tsx                 # Vite entry point
├── App.tsx                  # App shell and top-level routes/providers wiring
├── assets/                  # Static images, icons, fonts, and non-code assets
├── components/              # Reusable UI components shared across pages/features
│   ├── common/              # Optional example: cross-feature building blocks
│   └── business/            # Optional example: reusable domain-aware UI components
├── hooks/                   # Reusable custom hooks for request/state orchestration
├── pages/                   # Route-level pages and page-local substructure
│   └── <page-name>/
│       ├── index.tsx        # Page entry component
│       ├── components/      # Page-local components not reused elsewhere
│       ├── hooks/           # Page-local hooks not reused elsewhere
│       └── types.ts         # Page-local types when reuse is limited to the page
├── services/                # API client, request helpers, and service modules
│   ├── client.ts            # Shared HTTP client setup
│   └── <domain>.ts          # Domain-specific API calls
├── store/                   # Zustand stores for cross-page client state only
├── types/                   # Shared frontend domain and API contract types
├── utils/                   # Pure helpers with no UI or network side effects
└── app/                     # Optional app-wide providers, router, and bootstrapping helpers
    ├── providers/
    └── router/
```

This is a reference layout, not a mandatory literal tree. `src/app/` and component
subfolders such as `components/common/` or `components/business/` are optional
organization choices when they improve clarity.

Follow `.trellis/spec/frontend/component-guidelines.md` for component boundaries,
`.trellis/spec/frontend/hook-guidelines.md` for hook behavior, and
`.trellis/spec/frontend/state-management.md` for state ownership rules.

---

## Required Patterns

- Use `src/` as the frontend application root.
- Keep reusable visual pieces in `src/components/`.
- Keep route-level screens in `src/pages/`.
- Keep reusable custom hooks in `src/hooks/`.
- Keep Zustand stores in `src/store/`.
- Keep HTTP access and API-facing logic in `src/services/`.
- Keep shared reusable types in `src/types/`.
- Keep pure utility helpers in `src/utils/`.
- Keep static assets in `src/assets/`.
- Keep Vite entry wiring in `src/main.tsx` and app bootstrapping in `src/App.tsx`
  or an optional `src/app/` organization layer.
- Co-locate page-only subcomponents, hooks, and types under the owning page when
  they are not reused elsewhere.
- Keep imports directional: pages may depend on components, hooks, services, store,
  types, and utils; shared components must not depend on page modules.
- Treat subdirectories inside `src/components/` as optional structure chosen for
  clarity, not as a required fixed taxonomy.

---

## Responsibility Boundaries

### `components/`

- Reusable UI modules.
- Keep component behavior aligned with `.trellis/spec/frontend/component-guidelines.md`.
- Organize reusable components with subfolders only when that structure clarifies the
  component catalog.

### `pages/`

- Route-level entry points and page composition.
- Own page-local subcomponents, hooks, and types when reuse is not yet justified.

### `hooks/`

- Reusable custom hook modules.
- Keep hook behavior aligned with `.trellis/spec/frontend/hook-guidelines.md`.

### `store/`

- Zustand store modules for cross-page client state.
- Keep state ownership aligned with `.trellis/spec/frontend/state-management.md`.

### `services/`

- API client configuration, request functions, and response normalization.
- Keep contracts aligned with `.trellis/spec/shared/api-design.md` and
  `.trellis/spec/frontend/type-safety.md`.
- Keep browser-exposed base URLs and runtime configuration aligned with
  `.trellis/spec/shared/config-env.md` and Vite `VITE_` rules.

### `types/`

- Shared contracts reused across pages, services, hooks, or stores.
- Keep local types near the owning page, component, hook, or service when reuse is still local.

### `utils/`

- Pure helpers such as formatting, mapping, and small deterministic transforms.
- Keep utilities framework-agnostic when possible.

### `assets/`

- Static files imported by the frontend bundle.
- Keep assets named clearly by feature or purpose.

---

## Forbidden Patterns

- Do not put route pages inside `components/`.
- Do not promote page-local components, hooks, or types into shared top-level directories
  before reuse is real.
- Do not use `utils/` as a dumping ground for unrelated business logic.
- Do not let shared components import from page-specific folders.
- Do not expose non-public runtime values through frontend environment variables.

---

## Review Checklist

- Does the change place files under the correct top-level frontend directory?
- Are reusable components separated from route-level pages?
- Are shared hooks, stores, services, types, and utils kept in their own layers?
- Are page-local helpers colocated instead of promoted prematurely?
- Are API and environment concerns aligned with shared specs?
- Does the structure avoid circular or backward dependencies between layers?
