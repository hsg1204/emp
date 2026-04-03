# Trellis Spec Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand `.trellis/spec/` into a target-stack executable spec system derived from `docs/specs/`, including new shared specs, new guides, and rewritten frontend/backend specs.

**Architecture:** Keep `.trellis/spec/` organized by execution context: `frontend/`, `backend/`, `shared/`, and `guides/`. Add shared cross-cutting specs from `docs/specs/`, then rewrite existing bootstrap-oriented frontend/backend docs so they read as enforceable project standards for the approved React + Spring Boot stack.

**Tech Stack:** Markdown documentation, Trellis spec structure, React 18, TypeScript, Tailwind CSS, Ant Design, Java 17, Spring Boot 3, MyBatis-Plus, MySQL, Vite, Maven, Docker, nginx, Nacos.

---

## File Map

### Create
- `.trellis/spec/shared/index.md` — navigation for all cross-cutting specs and when to read them
- `.trellis/spec/shared/code-style.md` — formatting and naming rules across frontend/backend
- `.trellis/spec/shared/testing.md` — shared testing levels, tools, coverage, and quality gates
- `.trellis/spec/shared/config-env.md` — config/env naming, environment separation, secrets, Nacos rules
- `.trellis/spec/shared/api-design.md` — API envelope, pagination, versioning, docs, and error conventions
- `.trellis/spec/shared/data-modeling.md` — entity/DTO/VO rules, Snowflake IDs, logical delete, MySQL conventions
- `.trellis/spec/shared/deployment.md` — Docker + nginx baseline with K8s evolution path
- `.trellis/spec/shared/git-workflow.md` — branch, commit, PR, merge rules derived from `docs/specs/09-git-spec.md`
- `.trellis/spec/shared/ai-generation-rules.md` — AI-specific execution rules derived from `docs/specs/15-ai-generation-rules.md`
- `.trellis/spec/guides/page-layout-guide.md` — layout design guidance derived from `docs/specs/13-page-layout-spec.md`
- `.trellis/spec/guides/component-design-guide.md` — component design guidance derived from `docs/specs/14-component-design-spec.md`

### Modify
- `.trellis/spec/frontend/index.md` — add shared-spec reading guidance and update status table
- `.trellis/spec/frontend/directory-structure.md` — rewrite for React/Vite project structure
- `.trellis/spec/frontend/component-guidelines.md` — rewrite for React + TS + Tailwind + Ant Design
- `.trellis/spec/frontend/hook-guidelines.md` — rewrite for custom hooks and request logic
- `.trellis/spec/frontend/state-management.md` — rewrite for Zustand + React Query boundaries
- `.trellis/spec/frontend/type-safety.md` — rewrite for TS-first rules and API typing
- `.trellis/spec/frontend/quality-guidelines.md` — rewrite for lint, unit, E2E, a11y, loading/error expectations
- `.trellis/spec/backend/index.md` — add shared-spec reading guidance and update status table
- `.trellis/spec/backend/directory-structure.md` — rewrite for Spring Boot layered structure
- `.trellis/spec/backend/database-guidelines.md` — rewrite for MyBatis-Plus + MySQL rules
- `.trellis/spec/backend/error-handling.md` — rewrite for `@RestControllerAdvice` + business exceptions
- `.trellis/spec/backend/logging-guidelines.md` — rewrite for Logback + traceId + redaction
- `.trellis/spec/backend/quality-guidelines.md` — rewrite for validation, transactions, tests, review rules
- `.trellis/spec/guides/index.md` — register the new page/component design guides and clarify guide usage

### Validation targets
- `.trellis/spec/shared/`
- `.trellis/spec/frontend/`
- `.trellis/spec/backend/`
- `.trellis/spec/guides/`

---

### Task 1: Create the shared spec directory and navigation

**Files:**
- Create: `.trellis/spec/shared/index.md`
- Modify: `.trellis/spec/frontend/index.md`
- Modify: `.trellis/spec/backend/index.md`
- Modify: `.trellis/spec/guides/index.md`
- Test: `.trellis/spec/shared/index.md`

- [ ] **Step 1: Verify the shared directory is not present yet**

Run:
```bash
test -d ".trellis/spec/shared" && echo EXISTS || echo MISSING
```

Expected: `MISSING`

- [ ] **Step 2: Create `.trellis/spec/shared/index.md` with the navigation contract**

```md
# Shared Development Guidelines

> Cross-cutting rules used by both frontend and backend tasks.

---

## Guidelines Index

| Guide | Description | When to Read |
|-------|-------------|--------------|
| [Code Style](./code-style.md) | Formatting, naming, and file hygiene rules | Before editing code in any language |
| [Testing](./testing.md) | Test levels, tools, and quality gates | Before adding or changing tests |
| [Config & Env](./config-env.md) | Environment variables, config naming, and secret rules | When touching env/config |
| [API Design](./api-design.md) | Response envelope, pagination, and API contracts | For any frontend-backend contract |
| [Data Modeling](./data-modeling.md) | Entity/DTO/VO boundaries and DB conventions | For database and payload modeling |
| [Deployment](./deployment.md) | Docker, nginx, environment delivery baseline | For deploy/build changes |
| [Git Workflow](./git-workflow.md) | Branch, commit, PR, and merge rules | Before preparing changes for review |
| [AI Generation Rules](./ai-generation-rules.md) | Rules for AI-authored code and spec updates | For agent-driven implementation |

---

## Reading Order

- Frontend tasks: `frontend/index.md` → relevant `frontend/*.md` → relevant `shared/*.md`
- Backend tasks: `backend/index.md` → relevant `backend/*.md` → relevant `shared/*.md`
- Cross-layer tasks: frontend/backend docs + `shared/api-design.md` + `shared/data-modeling.md` + related guides
```

- [ ] **Step 3: Update the frontend/backend/guides indexes to mention the shared layer**

Use these exact additions:

```md
## Shared Specs

Read the cross-cutting specs in `../shared/` whenever the task affects formatting, testing, config, API contracts, data models, deployment, git workflow, or AI-generated code behavior.
```

and in `guides/index.md` add rows for:

```md
| [Page Layout Guide](./page-layout-guide.md) | Design page-level layout patterns | When shaping page structure |
| [Component Design Guide](./component-design-guide.md) | Design component boundaries and composition | When designing or splitting components |
```

- [ ] **Step 4: Verify the navigation exists and all three indexes mention the shared layer**

Run:
```bash
grep -n "Shared Development Guidelines" ".trellis/spec/shared/index.md" && grep -n "Shared Specs" ".trellis/spec/frontend/index.md" && grep -n "Shared Specs" ".trellis/spec/backend/index.md"
```

Expected: three matches with line numbers

- [ ] **Step 5: Verify guides index exposes the new guide entries**

Run:
```bash
grep -n "Page Layout Guide\|Component Design Guide" ".trellis/spec/guides/index.md"
```

Expected: two matches

---

### Task 2: Add shared style, testing, and config rules

**Files:**
- Create: `.trellis/spec/shared/code-style.md`
- Create: `.trellis/spec/shared/testing.md`
- Create: `.trellis/spec/shared/config-env.md`
- Test: `.trellis/spec/shared/code-style.md`
- Test: `.trellis/spec/shared/testing.md`
- Test: `.trellis/spec/shared/config-env.md`

- [ ] **Step 1: Confirm the shared docs do not exist yet**

Run:
```bash
for f in code-style.md testing.md config-env.md; do test -f ".trellis/spec/shared/$f" && echo "$f EXISTS" || echo "$f MISSING"; done
```

Expected:
```text
code-style.md MISSING
testing.md MISSING
config-env.md MISSING
```

- [ ] **Step 2: Create `.trellis/spec/shared/code-style.md`**

```md
# Code Style

> Cross-cutting formatting and naming rules for the project.

---

## Baseline Rules

- Encoding: UTF-8 without BOM
- Line endings: LF
- Indentation: 2 spaces for frontend, YAML, and JSON; 4 spaces for Java and Python
- Maximum line width: 120 characters
- Keep files formatted consistently before review

## Frontend Naming

- Components: `PascalCase`
- Hooks, functions, variables: `camelCase`
- Component file names should match the component name
- Avoid `any` unless there is a documented boundary reason

## Backend Naming

- Classes: `PascalCase`
- Methods and variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Avoid wildcard imports

## Forbidden Patterns

- Mixed indentation in the same file
- Wildcard imports in Java
- Inconsistent quote or semicolon usage inside the same TS/JS file
- Renaming things only for style while touching unrelated logic
```

- [ ] **Step 3: Create `.trellis/spec/shared/testing.md`**

```md
# Testing

> Shared testing levels and quality gates.

---

## Test Levels

### Unit Testing
- Backend: JUnit 5 + Mockito
- Frontend: Vitest + React Testing Library
- Core business logic must have unit tests

### Integration Testing
- Backend: `@SpringBootTest`
- Frontend: integration-style component and data-flow tests where useful

### End-to-End Testing
- Frontend baseline: Playwright
- Cover critical user flows before release

### Performance Testing
- Use JMeter or k6 for critical APIs when needed

## Quality Gates

- Core business logic coverage target: 80%
- Tests should use Given-When-Then structure where it improves readability
- Tests must be isolated and order-independent
- CI should block merges when required tests fail
```

- [ ] **Step 4: Create `.trellis/spec/shared/config-env.md`**

```md
# Config & Environment

> Configuration and environment variable rules across frontend and backend.

---

## Core Principles

- Follow 12-Factor configuration separation
- Never commit production secrets
- Keep environment structure consistent across dev, test, and prod

## Naming Rules

- Config keys: `kebab-case`
- OS environment variables: `UPPER_SNAKE_CASE`
- Frontend environment variables exposed to Vite must start with `VITE_`

## Environment Strategy

- Dev: local defaults and development env files
- Test: dedicated test configuration
- Prod: configuration injected externally
- Default production config center: Nacos

## Forbidden Patterns

- Hard-coded secrets in source files
- Frontend code containing backend credentials or connection details
- Divergent variable names for the same concept across environments
```

- [ ] **Step 5: Validate the three shared docs contain the approved hard decisions**

Run:
```bash
grep -n "120 characters" ".trellis/spec/shared/code-style.md" && grep -n "Playwright\|80%" ".trellis/spec/shared/testing.md" && grep -n "VITE_\|Nacos" ".trellis/spec/shared/config-env.md"
```

Expected: matches for all required terms

---

### Task 3: Add shared API and data-model rules

**Files:**
- Create: `.trellis/spec/shared/api-design.md`
- Create: `.trellis/spec/shared/data-modeling.md`
- Test: `.trellis/spec/shared/api-design.md`
- Test: `.trellis/spec/shared/data-modeling.md`

- [ ] **Step 1: Verify the API and data-model docs are absent**

Run:
```bash
for f in api-design.md data-modeling.md; do test -f ".trellis/spec/shared/$f" && echo "$f EXISTS" || echo "$f MISSING"; done
```

Expected:
```text
api-design.md MISSING
data-modeling.md MISSING
```

- [ ] **Step 2: Create `.trellis/spec/shared/api-design.md` with the unified response contract**

```md
# API Design

> Shared API contract rules for frontend-backend integration.

---

## Response Envelope

All business APIs should return a unified envelope:

```json
{
  "code": 0,
  "message": "OK",
  "data": {}
}
```

## Pagination Contract

Paginated responses must use:
- `data.items`
- `data.total`
- `data.page`
- `data.pageSize`

## API Design Rules

- Use clear REST-style resource naming
- Keep path naming consistent within a module
- Version APIs explicitly when versioning is required
- Document all controller endpoints with OpenAPI / Knife4j annotations

## Error Responses

- Error responses must still follow the unified envelope shape
- Use stable error codes
- Validation errors should be machine-readable and user-displayable
```

- [ ] **Step 3: Create `.trellis/spec/shared/data-modeling.md` with the approved persistence rules**

```md
# Data Modeling

> Shared data modeling rules across API payloads and database models.

---

## Model Boundaries

- Entity: database persistence model
- DTO: request/response transfer object
- VO: presentation-oriented output object where needed
- Query object: filter and paging input for searches

## Primary Keys

- Default primary key strategy: Snowflake ID

## Delete Strategy

- Default delete strategy: logical delete

## Database Conventions

- Database: MySQL
- Use clear, stable table and column names
- Keep audit fields consistent across business tables
- Model enum/status fields explicitly rather than relying on magic values

## MyBatis-Plus Guidance

- Use MyBatis-Plus for standard CRUD and query assembly
- Keep mapping rules explicit when entity and DTO fields diverge
```

- [ ] **Step 4: Validate the approved API and DB rules appear exactly once in the right files**

Run:
```bash
grep -n "data.items\|data.total\|data.page\|data.pageSize" ".trellis/spec/shared/api-design.md" && grep -n "Snowflake ID\|logical delete\|MySQL" ".trellis/spec/shared/data-modeling.md"
```

Expected: matches for all required terms

- [ ] **Step 5: Sanity-check that envelope and pagination sections are readable in the final markdown**

Run:
```bash
python3 - <<'PY'
from pathlib import Path
for rel in [
    '.trellis/spec/shared/api-design.md',
    '.trellis/spec/shared/data-modeling.md',
]:
    text = Path(rel).read_text(encoding='utf-8')
    assert '## Response Envelope' in text or '## Model Boundaries' in text
print('OK')
PY
```

Expected: `OK`

---

### Task 4: Add shared deployment, git, and AI-generation rules

**Files:**
- Create: `.trellis/spec/shared/deployment.md`
- Create: `.trellis/spec/shared/git-workflow.md`
- Create: `.trellis/spec/shared/ai-generation-rules.md`
- Test: `.trellis/spec/shared/deployment.md`
- Test: `.trellis/spec/shared/git-workflow.md`
- Test: `.trellis/spec/shared/ai-generation-rules.md`

- [ ] **Step 1: Verify the deployment/git/AI docs are absent**

Run:
```bash
for f in deployment.md git-workflow.md ai-generation-rules.md; do test -f ".trellis/spec/shared/$f" && echo "$f EXISTS" || echo "$f MISSING"; done
```

Expected:
```text
deployment.md MISSING
git-workflow.md MISSING
ai-generation-rules.md MISSING
```

- [ ] **Step 2: Create `.trellis/spec/shared/deployment.md`**

```md
# Deployment

> Shared deployment baseline for frontend and backend delivery.

---

## Baseline

- Deployment baseline: Docker + nginx
- Keep the design compatible with future Kubernetes migration

## Frontend Delivery

- Build static assets with Vite
- Serve frontend assets through nginx
- Keep frontend environment injection aligned with `shared/config-env.md`

## Backend Delivery

- Package backend services with Maven
- Run backend services in containers where possible
- Expose health checks for runtime verification

## nginx Responsibilities

- Serve frontend static assets
- Reverse-proxy backend APIs
- Keep routing and environment separation explicit
```

- [ ] **Step 3: Create `.trellis/spec/shared/git-workflow.md` and `.trellis/spec/shared/ai-generation-rules.md`**

```md
# Git Workflow

> Shared source-control workflow rules.

---

## Branching

- Use descriptive branch names by work type, such as feature, fix, refactor, or docs
- Keep one logical change per branch when practical

## Commits

- Use clear commit messages
- Keep commits scoped to one logical change
- Do not mix formatting-only noise with business changes

## Pull Requests

- PRs should explain purpose, scope, and test evidence
- Reviewers should be able to identify which spec rules were applied

## Protected Branches

- Treat the main integration branch as protected
- Avoid direct pushes without review
```

```md
# AI Generation Rules

> Rules for AI-authored changes in this project.

---

## Precedence

- `.trellis/spec/` is the executable standard for generated changes
- `docs/specs/` is the richer background source used to derive those standards

## Required Behavior

- Follow the approved stack and layering rules
- Prefer reuse over duplicate abstractions
- Keep changes scoped to the requested outcome
- Update Trellis specs when new stable conventions are established

## Forbidden Behavior

- Inventing frameworks or tools outside the approved stack
- Ignoring shared API, testing, or config rules
- Adding speculative abstractions without a current need
- Leaving generated code inconsistent with the documented spec set
```

- [ ] **Step 4: Validate the baseline terms exist in the right files**

Run:
```bash
grep -n "Docker \+ nginx\|Kubernetes" ".trellis/spec/shared/deployment.md" && grep -n "Pull Requests\|Protected Branches" ".trellis/spec/shared/git-workflow.md" && grep -n "Precedence\|`.trellis/spec/`" ".trellis/spec/shared/ai-generation-rules.md"
```

Expected: matches for all three files

- [ ] **Step 5: Verify the shared directory now has all eight target shared docs**

Run:
```bash
ls ".trellis/spec/shared"
```

Expected output contains:
```text
ai-generation-rules.md
api-design.md
code-style.md
config-env.md
data-modeling.md
deployment.md
git-workflow.md
index.md
testing.md
```

---

### Task 5: Rewrite frontend specs for the approved stack

**Files:**
- Modify: `.trellis/spec/frontend/directory-structure.md`
- Modify: `.trellis/spec/frontend/component-guidelines.md`
- Modify: `.trellis/spec/frontend/hook-guidelines.md`
- Modify: `.trellis/spec/frontend/state-management.md`
- Modify: `.trellis/spec/frontend/type-safety.md`
- Modify: `.trellis/spec/frontend/quality-guidelines.md`
- Test: `.trellis/spec/frontend/*.md`

- [ ] **Step 1: Confirm the old bootstrap wording is still present before rewriting**

Run:
```bash
grep -n "no real frontend source code\|no React custom hooks\|target-state reference" .trellis/spec/frontend/*.md || true
```

Expected: one or more matches from the current bootstrap-oriented docs

- [ ] **Step 2: Rewrite `.trellis/spec/frontend/directory-structure.md` and `component-guidelines.md`**

Use these exact structures as anchors:

```md
## Directory Layout

```text
src/
├── components/
├── pages/
├── hooks/
├── store/
├── services/
├── types/
├── utils/
└── assets/
```

## Module Organization

- Put reusable UI in `components/`
- Put route-level views in `pages/`
- Keep API clients in `services/`
- Keep cross-page shared types in `types/`
```

```md
## Component Rules

- Use React function components
- Type props explicitly with TypeScript
- Prefer Tailwind for layout and utility styling
- Use Ant Design for standardized enterprise UI primitives
- Keep presentational components separate from request/state orchestration
```

- [ ] **Step 3: Rewrite `hook-guidelines.md`, `state-management.md`, and `type-safety.md`**

Use these exact sections:

```md
## Hook Rules

- Custom hooks must use the `useXxx` naming pattern
- Move reusable request/state logic into hooks
- Always clean up side effects in `useEffect` when cleanup is required
```

```md
## State Boundaries

- Local UI state stays in components
- Shared client state uses Zustand
- Server state uses React Query
- Do not move server cache into Zustand unless there is a documented reason
```

```md
## Type Rules

- TypeScript is required
- Avoid `any` by default
- Define request/response types close to the API client or shared domain types
- Keep component-local types local unless reused
```

- [ ] **Step 4: Rewrite `quality-guidelines.md` with test and UX quality gates**

```md
## Required Patterns

- Show loading and error states for async flows
- Cover core UI logic with Vitest + React Testing Library
- Use Playwright for critical end-to-end flows
- Keep accessibility semantics intact when composing Ant Design and custom markup

## Forbidden Patterns

- Silent request failures
- Untyped props or broad `any`
- Styling drift between Tailwind utility usage and Ant Design overrides without a clear reason
```

- [ ] **Step 5: Validate the frontend docs reference the approved stack and no longer describe the repo as frontend-less**

Run:
```bash
grep -n "React 18\|TypeScript\|Tailwind\|Ant Design\|Zustand\|React Query\|Playwright" .trellis/spec/frontend/*.md && ! grep -R "no real frontend source code\|current repository has no frontend" .trellis/spec/frontend
```

Expected: stack matches found, and the final `grep` returns no output

---

### Task 6: Rewrite backend specs for the approved stack

**Files:**
- Modify: `.trellis/spec/backend/directory-structure.md`
- Modify: `.trellis/spec/backend/database-guidelines.md`
- Modify: `.trellis/spec/backend/error-handling.md`
- Modify: `.trellis/spec/backend/logging-guidelines.md`
- Modify: `.trellis/spec/backend/quality-guidelines.md`
- Test: `.trellis/spec/backend/*.md`

- [ ] **Step 1: Confirm the old bootstrap wording is still present before rewriting**

Run:
```bash
grep -n "Python CLI\|workflow tool\|file-based persistence" .trellis/spec/backend/*.md || true
```

Expected: one or more matches from the current bootstrap-oriented docs

- [ ] **Step 2: Rewrite `directory-structure.md` and `database-guidelines.md`**

Use these exact anchors:

```md
## Package Layout

```text
src/main/java/<base-package>/
├── config/
├── controller/
├── service/
│   └── impl/
├── repository/
├── model/
│   ├── entity/
│   ├── dto/
│   └── vo/
├── utils/
└── exception/
```

## Layer Rules

- Controller handles request validation and response wrapping
- Service handles business logic and transactions
- Repository handles persistence access
```

```md
## Database Rules

- Database: MySQL
- ORM/data access: MyBatis-Plus
- Primary keys default to Snowflake ID
- Business tables default to logical delete
- Keep audit fields consistent across tables
```

- [ ] **Step 3: Rewrite `error-handling.md` and `logging-guidelines.md`**

Use these exact sections:

```md
## Exception Handling

- Use `@RestControllerAdvice` for global exception handling
- Business exceptions should use a custom exception hierarchy
- Validation failures should return stable error codes and messages inside the unified response envelope
```

```md
## Logging Rules

- Use Logback
- Do not use `System.out.println`
- Log key business steps at INFO
- Log errors with enough context for diagnosis
- Include `traceId` in request-linked logs
- Never log passwords, tokens, or other secrets in plaintext
```

- [ ] **Step 4: Rewrite `quality-guidelines.md` with backend test and review expectations**

```md
## Required Patterns

- Validate request payloads at the controller boundary
- Use transactions on write operations where needed
- Cover core service logic with JUnit 5 + Mockito
- Use `@SpringBootTest` for integration-level verification when module boundaries matter

## Forbidden Patterns

- Mixing controller, service, and repository responsibilities
- Returning ad-hoc error shapes
- Using magic status values without explicit modeling
```

- [ ] **Step 5: Validate the backend docs reference the approved stack and no longer describe the repo as a Python workflow tool**

Run:
```bash
grep -n "Spring Boot 3\|MyBatis-Plus\|MySQL\|Snowflake ID\|logical delete\|Logback\|@RestControllerAdvice" .trellis/spec/backend/*.md && ! grep -R "Python CLI\|workflow tool\|bootstrap repository" .trellis/spec/backend
```

Expected: stack matches found, and the final `grep` returns no output

---

### Task 7: Add page-layout and component-design guides

**Files:**
- Create: `.trellis/spec/guides/page-layout-guide.md`
- Create: `.trellis/spec/guides/component-design-guide.md`
- Modify: `.trellis/spec/guides/index.md`
- Test: `.trellis/spec/guides/page-layout-guide.md`
- Test: `.trellis/spec/guides/component-design-guide.md`

- [ ] **Step 1: Verify the two guide files do not exist yet**

Run:
```bash
for f in page-layout-guide.md component-design-guide.md; do test -f ".trellis/spec/guides/$f" && echo "$f EXISTS" || echo "$f MISSING"; done
```

Expected:
```text
page-layout-guide.md MISSING
component-design-guide.md MISSING
```

- [ ] **Step 2: Create `.trellis/spec/guides/page-layout-guide.md`**

```md
# Page Layout Guide

> Design guidance for page-level structure and information hierarchy.

---

## Use This Guide When

- Designing a new page
- Reworking information hierarchy
- Comparing page layout options

## Guidance

- Keep page regions explicit: header, filters, content, actions, feedback
- Use layout patterns consistently across similar pages
- Preserve room for loading, empty, and error states in the initial layout design
```

- [ ] **Step 3: Create `.trellis/spec/guides/component-design-guide.md`**

```md
# Component Design Guide

> Design guidance for component boundaries and composition.

---

## Use This Guide When

- Splitting a large component
- Designing a reusable enterprise UI component
- Deciding container vs presentational boundaries

## Guidance

- Give each component one clear purpose
- Extract shared UI behavior only after repeated use is visible
- Keep request/state orchestration separate from purely presentational pieces when practical
```

- [ ] **Step 4: Ensure `guides/index.md` links both guides with the correct purpose text**

Run:
```bash
grep -n "Page Layout Guide\|Component Design Guide" ".trellis/spec/guides/index.md"
```

Expected: two matches

- [ ] **Step 5: Verify both new guides contain a `Use This Guide When` section**

Run:
```bash
grep -n "Use This Guide When" ".trellis/spec/guides/page-layout-guide.md" ".trellis/spec/guides/component-design-guide.md"
```

Expected: one match in each file

---

### Task 8: Final consistency pass across the whole spec tree

**Files:**
- Modify: `.trellis/spec/frontend/index.md`
- Modify: `.trellis/spec/backend/index.md`
- Modify: `.trellis/spec/guides/index.md`
- Modify: `.trellis/spec/shared/index.md`
- Test: `.trellis/spec/`

- [ ] **Step 1: Check for stale bootstrap-era phrases across the spec tree**

Run:
```bash
grep -R -n "current repository has no frontend\|Python CLI / Trellis workflow\|bootstrap guideline\|target-state reference" .trellis/spec || true
```

Expected: no output after the rewrites are complete

- [ ] **Step 2: Check that the main stack terms appear somewhere in the final spec tree**

Run:
```bash
grep -R -n "React 18\|Spring Boot 3\|MyBatis-Plus\|MySQL\|Playwright\|Nacos\|Docker \+ nginx" .trellis/spec
```

Expected: matches across `frontend/`, `backend/`, and `shared/`

- [ ] **Step 3: Check that all mapped source domains are represented in the final tree**

Run:
```bash
python3 - <<'PY'
from pathlib import Path
expected = [
    '.trellis/spec/shared/code-style.md',
    '.trellis/spec/shared/testing.md',
    '.trellis/spec/shared/config-env.md',
    '.trellis/spec/shared/api-design.md',
    '.trellis/spec/shared/data-modeling.md',
    '.trellis/spec/shared/deployment.md',
    '.trellis/spec/shared/git-workflow.md',
    '.trellis/spec/shared/ai-generation-rules.md',
    '.trellis/spec/guides/page-layout-guide.md',
    '.trellis/spec/guides/component-design-guide.md',
]
missing = [p for p in expected if not Path(p).is_file()]
assert not missing, missing
print('OK')
PY
```

Expected: `OK`

- [ ] **Step 4: Read the four index files once and fix any broken wording or navigation drift**

Read and normalize:
```text
.trellis/spec/frontend/index.md
.trellis/spec/backend/index.md
.trellis/spec/shared/index.md
.trellis/spec/guides/index.md
```

Required outcome:
- no stale `To fill` wording for completed files
- shared-layer reading order is explicit
- guides are described as advisory, not hard implementation constraints

- [ ] **Step 5: Run a final file listing for handoff**

Run:
```bash
find .trellis/spec -maxdepth 2 -type f | sort
```

Expected output includes:
```text
.trellis/spec/backend/index.md
.trellis/spec/frontend/index.md
.trellis/spec/guides/component-design-guide.md
.trellis/spec/guides/page-layout-guide.md
.trellis/spec/shared/ai-generation-rules.md
.trellis/spec/shared/api-design.md
.trellis/spec/shared/code-style.md
.trellis/spec/shared/config-env.md
.trellis/spec/shared/data-modeling.md
.trellis/spec/shared/deployment.md
.trellis/spec/shared/git-workflow.md
.trellis/spec/shared/index.md
.trellis/spec/shared/testing.md
```
