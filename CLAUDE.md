# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow constraints

- This repo uses the Trellis workflow. Prefer starting from `/trellis:start`.
- Before changing code, read the relevant spec indexes under `.trellis/spec/`, then the specific guideline files for the task.
- `AGENTS.md` is Trellis-managed. Keep the managed block markers intact.
- AI should not create git commits here; humans commit after testing.

## Common commands

### Trellis

- `python3 ./.trellis/scripts/get_context.py` — show developer, current task, and git context.
- `python3 ./.trellis/scripts/get_developer.py` — show the active developer identity.
- `python3 ./.trellis/scripts/task.py list` — list active Trellis tasks.
- `python3 ./.trellis/scripts/task.py create "<title>" --slug <slug>` — create a task directory.
- `python3 ./.trellis/scripts/task.py init-context "<task-dir>" frontend|backend|fullstack` — initialize injected task context.
- `python3 ./.trellis/scripts/task.py start "<task-dir>"` — make a task current.
- `python3 ./.trellis/scripts/add_session.py --title "..." --commit "<hash>" --summary "..."` — record a finished session after the human has committed.

### Frontend (`frontend/`)

- `cd frontend && npm install` — install dependencies.
- `cd frontend && npm run dev` — start the Vite dev server on port 5173.
- `cd frontend && npm run build` — production build; also the main typecheck gate because it runs `tsc -b && vite build`.
- `cd frontend && npm run preview` — preview the production build.
- `cd frontend && npx tsc -b` — run TypeScript project build/typecheck without bundling.

### Tests and lint

- There is currently **no** `lint` script in `frontend/package.json`.
- There is currently **no** `test` script, so there is also no repo-defined single-test command.
- Specs expect Vitest + React Testing Library for frontend tests and Playwright for E2E (`.trellis/spec/shared/testing.md`), but that setup is not wired into the checked-in app yet. Do not invent commands.

## Repository structure

- `frontend/` is the only runnable application currently checked in.
- `.trellis/` contains the workflow, task system, and hard-constraint specs that govern implementation.
- `.trellis/tasks/04-02-emergency-management-platform/prd.md` is the current product source document for the emergency-management work. The frontend route tree and navigation are built directly from this PRD.

There is no runnable backend module checked in yet. The repo includes backend specs, but do not assume a Spring Boot service exists until it is added.

## Frontend architecture

### Stack

- React 18 + Vite + TypeScript
- Ant Design for enterprise UI primitives
- Tailwind CSS for layout and utility styling
- React Router for application routing
- TanStack Query for server-state access
- Zustand for lightweight global UI state
- Axios client in `frontend/src/services/client.ts`, with `VITE_API_BASE_URL` defaulting to `/api`

### App shell

- `frontend/src/main.tsx` bootstraps the app.
- `frontend/src/App.tsx` wraps the app with `ConfigProvider`, `QueryProvider`, and `BrowserRouter`.
- `frontend/src/app/router/index.tsx` is the single route table.
- `frontend/src/app/layout/MainLayout.tsx` is the shared shell.
- `frontend/src/app/layout/AppSider.tsx` owns the left-nav structure.
- `frontend/src/app/layout/AppBreadcrumb.tsx` maps routes to breadcrumb labels.

When adding or renaming pages, update the router, sider menu, and breadcrumb mapping together.

### Feature layout

- `frontend/src/pages/` is organized by domain: `home`, `my-tasks`, `scenario`, `plan`, `process`, `drill-plan`, `event`, `review-issue`, and `system/*`.
- `frontend/src/services/` contains feature-level data access.
- `frontend/src/types/` contains shared domain contracts plus pagination/status types.
- `frontend/src/components/common/` contains reusable presentational building blocks.
- `frontend/src/store/app.ts` currently stores only shell-level UI state such as sider collapse.

## Current implementation pattern

This app is still in a product-skeleton / prototype phase.

- `scenario/index.tsx` and `plan/index.tsx` are the best reference implementations for list pages.
- Most other edit/detail/list pages are still placeholders built from shared primitives.
- Most service modules currently return mock data with `Promise.resolve(...)` instead of real HTTP calls.
- `client.ts` exists as the future API boundary, but pages should keep calling feature service modules rather than using axios directly.

Keep this split when extending the app:

- page = orchestration, route state, query wiring, view composition
- service = fetch/mutation boundary
- types = shared contracts
- common components = reusable presentational UI

## Shared UI patterns to reuse

Prefer existing primitives before adding parallel wrappers:

- `PageContainer` — standard page header and content frame
- `EmptyBlock` — placeholder or empty-state block
- `StatusTag` — shared status rendering for publish/runtime states

For async pages, follow the local pattern used by the scenario and plan list pages: explicit loading, error, and empty states around TanStack Query + Ant Design tables/forms.

## Business model and navigation shape

The phase-1 core flow from the PRD is:

1. Scenario Management
2. Plan Management
3. Process Management
4. Emergency Drill Plan
5. Event Management
6. Review Improvement

System-management pages are supporting configuration, not the main business flow.

Key entity relationships:

- Scenario is the base entity.
- Plan and Process reference Scenario.
- Drill Plan and Event reference Scenario + Plan + Process.
- Review Issue references Drill Plan or Event.

Approval-driven entities share the same lifecycle already reflected in frontend types and `StatusTag`:

- `draft -> pendingApproval -> published -> deprecated`

## Fast path for common changes

### When adding or renaming a page

Usually update these together:

- `frontend/src/app/router/index.tsx`
- `frontend/src/app/layout/AppSider.tsx`
- `frontend/src/app/layout/AppBreadcrumb.tsx`

### When building a new list page

Use these as the local reference pattern:

- `frontend/src/pages/scenario/index.tsx`
- `frontend/src/pages/plan/index.tsx`

Expected pattern: filter form + TanStack Query + Ant Design table + explicit loading/error/empty states.

### When replacing mock data with real APIs

- Put request logic in `frontend/src/services/*`.
- Keep pages calling feature service modules instead of using axios directly.
- Reuse `frontend/src/services/client.ts` as the shared axios boundary.

## Implementation guidance specific to this repo

- Keep reusable components presentational; page-level orchestration belongs at the page/feature boundary.
- Keep list/pagination contracts aligned with the shared spec shape: `items`, `total`, `page`, `pageSize`.
