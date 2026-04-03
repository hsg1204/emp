# Quality Guidelines

> Frontend quality requirements for behavior, accessibility, and release readiness.

---

## Overview

Frontend quality must be enforced through explicit UI states, typed contracts,
automated testing, accessibility checks, and a clear verification gate.

Follow `.trellis/spec/shared/testing.md` as the single source of truth for the
approved frontend test stack, coverage thresholds, and CI fail gates.

---

## Required Patterns

- Every async UI must define loading, error, and empty-state behavior where relevant.
- Surface user-relevant failures clearly instead of failing silently.
- Keep props typed explicitly and preserve type safety across component boundaries.
- Changed frontend behavior must have automated coverage at the appropriate layer.
- Keep tests focused on user-visible behavior and contract-visible outcomes.
- Preserve accessibility when using Ant Design components and when writing custom markup.
- Keep styling stable and intentional across states, breakpoints, and themes.

---

## UI State Quality

- Loading states should preserve structure when possible and avoid unnecessary layout
  jumps.
- Error states should explain what failed and provide a sensible recovery path when one
  exists.
- Empty states should explain why no content is shown and what the user can do next.
- Mutation success and failure feedback should be visible and consistent.
- Do not swallow API failures, rejected promises, or mutation errors.

---

## Frontend Testing Focus

- Cover changed components, hooks through consumers, and page interactions from the
  user perspective.
- Prefer queries and assertions against accessible, rendered behavior instead of
  implementation details.
- Cover loading, success, error, and empty states for changed behavior.
- Cover changed critical journeys such as authentication, key CRUD paths, cross-page
  flows, and regression-prone business paths.
- Keep end-to-end coverage focused on meaningful user workflows rather than duplicating
  lower-level test cases.

---

## Accessibility Rules

- Use Ant Design components in accessible ways and keep their labels, status, and focus
  behavior intact.
- When custom markup is needed, use semantic HTML first.
- Ensure keyboard access for interactive custom elements.
- Preserve visible focus, readable labels, and meaningful status messaging.
- Treat accessibility regressions as quality failures, not optional polish.

---

## Frontend Quality Gate

Frontend changes must pass the project verification gate before merge:

- configured lint checks
- TypeScript typecheck
- relevant test suites required by `.trellis/spec/shared/testing.md`
- accessibility and user-state verification for changed flows

Treat failing lint, typecheck, required test suites, required scoped coverage,
or critical accessibility regressions as merge blockers.

---

## Forbidden Patterns

- Do not allow silent failures in request, mutation, or form flows.
- Do not ship untyped props or unsafe `any`-driven component boundaries.
- Do not test only happy paths when changed behavior has meaningful non-happy states.
- Do not write tests that depend mainly on implementation details.
- Do not introduce style drift without a documented product, design, or accessibility reason.
- Do not treat accessibility as complete just because an Ant Design component is present.

---

## Review Checklist

- Are loading, error, success, and empty states covered where relevant?
- Will failures be visible to users instead of disappearing silently?
- Are component contracts typed and testable?
- Does changed frontend behavior have automated coverage at the appropriate layer?
- Does the change follow `.trellis/spec/shared/testing.md` for test stack, coverage,
  and CI gates?
- Does the UI remain accessible with both Ant Design and custom markup?
- Does the change satisfy the frontend quality gate?
