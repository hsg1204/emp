# Testing

> Project-wide testing requirements across backend, frontend, and end-to-end scopes.

---

## Required Patterns

- Treat this document as the single source of truth for the approved test stack, coverage thresholds, and CI fail gates.
- Write automated tests for behavior that changes.
- Use JUnit 5 with Mockito for Java unit and integration tests.
- Use Vitest with React Testing Library for frontend component and interaction tests.
- Use Playwright for end-to-end and critical user-flow coverage.
- Structure test cases with Given-When-Then so setup, action, and expectation are clear.
- Maintain at least 80% coverage for backend core service, domain, and business logic, and for frontend critical business flows and critical UI logic.
- Apply the 80% threshold by default at the changed module or application scope.
- Do not use a repository-wide average to hide missing coverage in critical logic.
- Treat performance testing as an on-demand requirement when the change affects latency, throughput, concurrency, or other performance-sensitive behavior.
- Configure CI fail gates so lint, typecheck, required test suites, and the scoped 80% coverage requirement must pass before merge.

---

## Forbidden Patterns

- Do not introduce alternative primary test stacks when the required stack already covers the need.
- Do not merge changes that reduce required coverage below 80% without an approved exception.
- Do not rely only on manual testing for behavior that can be covered automatically.
- Do not write opaque tests that hide setup, action, or assertions.
- Do not bypass CI fail gates for routine development work.

---

## Test Scope

### Backend

- Use JUnit 5 as the default test framework.
- Use Mockito for doubles, stubs, and interaction verification where isolation is needed.
- Use `@SpringBootTest` as the baseline for backend integration testing.
- Cover business rules, validation, error handling, and integration boundaries.

### Frontend

- Use Vitest as the default unit and component test runner.
- Use React Testing Library to verify behavior from the user perspective.
- Prefer assertions against rendered behavior over implementation details.

### End-to-End

- Use Playwright for browser-level flows.
- Cover critical paths such as authentication, core CRUD flows, and cross-page interactions.

---

## Coverage and CI

- Keep coverage thresholds at 80% or higher for backend core service, domain, and business logic, and for frontend critical business flows and critical UI logic.
- Enforce the threshold by default at the changed module or application scope, not by repository-wide average.
- Treat coverage regression within that enforced scope as a CI failure unless explicitly approved.
- Treat failing lint, typecheck, unit, integration, end-to-end, or scoped coverage checks as merge blockers.
- Add performance testing only when the change makes performance behavior a relevant acceptance concern.

---

## Test Writing Checklist

- Is the test written with a clear Given-When-Then structure?
- Does the test assert user-visible or contract-visible behavior?
- Does the changed behavior have automated coverage at the correct layer?
- Will CI fail if the relevant quality gate fails?
- Does the change preserve or improve the scoped 80% coverage target for the changed module or application?
