# Trellis Spec Expansion Design

## Goal

Expand `.trellis/spec/` from a minimal bootstrap guideline set into an executable specification system derived from `docs/specs/`, aligned with the project's intended production stack rather than the temporary bootstrap repository state.

## Scope

This design covers:
- The target information architecture for `.trellis/spec/`
- Mapping rules from `docs/specs/` into executable Trellis specs
- Which files should be rewritten, which should be added, and how they should be used
- The concrete technical decisions already confirmed with the user

This design does **not** yet implement the `.trellis/spec/` file changes.

## Source of Truth

Primary source documents:
- `docs/specs/02-data-model-spec.md`
- `docs/specs/03-api-spec.md`
- `docs/specs/05-project-structure-spec.md`
- `docs/specs/06-frontend-spec.md`
- `docs/specs/07-backend-spec.md`
- `docs/specs/08-code-style-spec.md`
- `docs/specs/09-git-spec.md`
- `docs/specs/11-test-spec.md`
- `docs/specs/12-deploy-spec.md`
- `docs/specs/13-page-layout-spec.md`
- `docs/specs/14-component-design-spec.md`
- `docs/specs/15-ai-generation-rules.md`
- `docs/specs/16-config-env-spec.md`

Interpretation rule:
- `docs/specs/` is the authoritative design source.
- `.trellis/spec/` is the executable AI-facing version of those specs.
- `.trellis/spec/` should optimize for implementation guidance, review guidance, and context injection.
- `.trellis/spec/` should not be a verbatim mirror of `docs/specs/`; it should be reorganized into development decision domains.

## Confirmed Technology Baseline

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Ant Design
- Vite

### Backend
- Java 17
- Spring Boot 3
- MyBatis-Plus

### Database
- MySQL

### Tooling / Delivery
- Maven
- Docker
- nginx
- Nacos as the default production configuration center

## Target `.trellis/spec/` Structure

```text
.trellis/spec/
├── backend/
│   ├── index.md
│   ├── directory-structure.md
│   ├── database-guidelines.md
│   ├── error-handling.md
│   ├── logging-guidelines.md
│   └── quality-guidelines.md
├── frontend/
│   ├── index.md
│   ├── directory-structure.md
│   ├── component-guidelines.md
│   ├── hook-guidelines.md
│   ├── state-management.md
│   ├── type-safety.md
│   └── quality-guidelines.md
├── shared/
│   ├── index.md
│   ├── code-style.md
│   ├── testing.md
│   ├── config-env.md
│   ├── api-design.md
│   ├── data-modeling.md
│   ├── deployment.md
│   ├── git-workflow.md
│   └── ai-generation-rules.md
└── guides/
    ├── index.md
    ├── code-reuse-thinking-guide.md
    ├── cross-layer-thinking-guide.md
    ├── page-layout-guide.md
    └── component-design-guide.md
```

## Design Principles

### 1. Organize by execution context, not original document number

The `docs/specs/` files are useful as source material, but the Trellis spec system should be organized by the questions an implementation agent must answer:
- What frontend conventions apply?
- What backend conventions apply?
- What rules cut across the whole system?
- What guides support design thinking rather than hard implementation constraints?

### 2. Separate hard rules from design guidance

- `frontend/`, `backend/`, and `shared/` contain implementation and review rules.
- `guides/` contains decision-support material used during planning and design.
- A page-layout recommendation should not be injected into every backend implementation task.

### 3. Convert broad business specs into concise executable constraints

Each `.trellis/spec/` document should be shorter and more actionable than its `docs/specs/` source. It should focus on:
- required patterns
- forbidden patterns
- naming conventions
- standard structures
- acceptance checks
- examples of expected output or behavior

### 4. Use the target stack as the standard

For this expansion task, `.trellis/spec/` should reflect the intended project stack rather than the temporary bootstrap repository implementation. This supersedes the earlier bootstrap-only approach.

## File Mapping Plan

### Rewrite existing frontend specs

#### `frontend/directory-structure.md`
Derived mainly from:
- `docs/specs/05-project-structure-spec.md`
- `docs/specs/06-frontend-spec.md`

Should define:
- `src/components`, `src/pages`, `src/hooks`, `src/store`, `src/services`, `src/types`, `src/utils`, `src/assets`
- page vs shared component boundaries
- feature/module grouping guidance

#### `frontend/component-guidelines.md`
Derived mainly from:
- `docs/specs/06-frontend-spec.md`
- `docs/specs/14-component-design-spec.md`

Should define:
- function components only
- props typing rules
- Tailwind + Ant Design usage boundaries
- composition and reuse guidance
- accessibility expectations where applicable

#### `frontend/hook-guidelines.md`
Derived mainly from:
- `docs/specs/06-frontend-spec.md`

Should define:
- custom hook naming (`useXxx`)
- data fetching abstraction patterns
- effect cleanup rules
- separation of UI and stateful logic

#### `frontend/state-management.md`
Derived mainly from:
- `docs/specs/06-frontend-spec.md`

Should define:
- local state vs global state vs server state
- React Query server-state rules
- Zustand usage boundaries
- when not to promote state globally

#### `frontend/type-safety.md`
Derived mainly from:
- `docs/specs/06-frontend-spec.md`
- `docs/specs/08-code-style-spec.md`

Should define:
- TS-first rules
- no `any` by default
- prop/interface/type organization
- response typing and API client typing strategy

#### `frontend/quality-guidelines.md`
Derived mainly from:
- `docs/specs/06-frontend-spec.md`
- `docs/specs/11-test-spec.md`
- `docs/specs/08-code-style-spec.md`

Should define:
- linting and formatting expectations
- unit test expectations
- Playwright E2E baseline
- forbidden shortcuts
- accessibility and loading/error-state requirements

### Rewrite existing backend specs

#### `backend/directory-structure.md`
Derived mainly from:
- `docs/specs/05-project-structure-spec.md`
- `docs/specs/07-backend-spec.md`

Should define:
- `config`, `controller`, `service`, `service/impl`, `repository`, `model/entity`, `model/dto`, `model/vo`, `utils`, `exception`
- layer responsibilities
- package placement rules

#### `backend/database-guidelines.md`
Derived mainly from:
- `docs/specs/07-backend-spec.md`
- `docs/specs/02-data-model-spec.md`

Should define:
- MyBatis-Plus conventions
- MySQL naming rules
- Snowflake ID as default primary key strategy
- logical delete as default strategy
- audit fields and common columns
- query and mapping conventions

#### `backend/error-handling.md`
Derived mainly from:
- `docs/specs/07-backend-spec.md`
- `docs/specs/03-api-spec.md`

Should define:
- `@RestControllerAdvice`
- custom business exception hierarchy
- API error response structure
- validation error handling rules

#### `backend/logging-guidelines.md`
Derived mainly from:
- `docs/specs/07-backend-spec.md`

Should define:
- Logback usage
- no `System.out.println`
- INFO / ERROR expectations
- traceId requirements
- sensitive data redaction

#### `backend/quality-guidelines.md`
Derived mainly from:
- `docs/specs/07-backend-spec.md`
- `docs/specs/11-test-spec.md`
- `docs/specs/08-code-style-spec.md`

Should define:
- controller/service/repository boundaries
- validation and transaction expectations
- JUnit 5 + Mockito + integration test baseline
- forbidden patterns
- review checklist

### Add shared specs

#### `shared/index.md`
Purpose:
- central navigation for all cross-cutting specs
- explain when frontend/backend tasks should also read shared docs

#### `shared/code-style.md`
Derived from:
- `docs/specs/08-code-style-spec.md`

Confirmed direction:
- UTF-8 without BOM
- LF line endings
- 2 spaces for frontend / YAML / JSON
- 4 spaces for Java / Python
- maximum line width: 120 characters
- no wildcard imports in Java
- React/TS naming rules and Java naming rules

#### `shared/testing.md`
Derived from:
- `docs/specs/11-test-spec.md`

Confirmed direction:
- unit, integration, E2E, and performance levels
- backend: JUnit 5 + Mockito + `@SpringBootTest`
- frontend: Vitest + React Testing Library
- E2E baseline: Playwright
- core logic coverage target: 80%
- Given-When-Then structure

#### `shared/config-env.md`
Derived from:
- `docs/specs/16-config-env-spec.md`

Confirmed direction:
- 12-Factor principles
- `kebab-case` config keys
- `UPPER_SNAKE_CASE` OS env names
- frontend env vars must use `VITE_`
- default production config center: Nacos
- no secrets committed to VCS
- Docker/nginx environment boundaries should remain aligned with deployment rules

#### `shared/api-design.md`
Derived from:
- `docs/specs/03-api-spec.md`

Confirmed direction:
- unified response envelope required
- paginated responses must use:
  - `data.items`
  - `data.total`
  - `data.page`
  - `data.pageSize`
- standard endpoint naming and versioning guidance
- error code and error body standards
- OpenAPI / Knife4j documentation expectations

#### `shared/data-modeling.md`
Derived from:
- `docs/specs/02-data-model-spec.md`
- `docs/specs/07-backend-spec.md`

Confirmed direction:
- entity / DTO / VO / query boundaries
- Snowflake ID default strategy
- logical delete default strategy
- MySQL naming and audit field conventions
- enum / status field conventions

#### `shared/deployment.md`
Derived from:
- `docs/specs/12-deploy-spec.md`

Confirmed direction:
- Docker + nginx as deployment baseline
- keep room for future Kubernetes evolution
- frontend static build + nginx serving
- backend service containerization
- health checks, reverse proxy, and environment isolation

#### `shared/git-workflow.md`
Derived from:
- `docs/specs/09-git-spec.md`

Should define:
- branch naming
- commit message rules
- pull request expectations
- merge rules
- protected branch expectations

#### `shared/ai-generation-rules.md`
Derived from:
- `docs/specs/15-ai-generation-rules.md`

Should define:
- how AI-generated code must follow the stack and layering rules
- reuse-first expectations
- when to update specs
- forbidden shortcuts and hallucinated dependencies
- precedence rule: generated code should follow `.trellis/spec/` as the executable standard derived from project specs

### Add new guides

#### `guides/page-layout-guide.md`
Derived from:
- `docs/specs/13-page-layout-spec.md`

Purpose:
- support page-level design decisions
- provide layout heuristics rather than hard coding rules

#### `guides/component-design-guide.md`
Derived from:
- `docs/specs/14-component-design-spec.md`

Purpose:
- support component boundary and composition decisions
- complement but not replace `frontend/component-guidelines.md`

## Confirmed Product Decisions

The following decisions are already approved and must be reflected in the resulting specs:

1. Use direct expansion from `docs/specs/`, not a current-state-only approach.
2. Use a shared cross-cutting spec layer instead of duplicating all common rules into frontend and backend docs.
3. Unified API response envelopes are required.
4. Pagination shape is fixed to:
   - `data.items`
   - `data.total`
   - `data.page`
   - `data.pageSize`
5. Default primary key strategy is Snowflake ID.
6. Default delete strategy is logical delete.
7. Frontend E2E baseline is Playwright.
8. Core business logic coverage target is 80%.
9. Default production configuration center is Nacos.
10. Deployment baseline is Docker + nginx, while preserving Kubernetes evolution space.

## Implementation Strategy

Implementation should happen in two passes.

### Pass 1: Structure and navigation
- add `shared/` directory and `shared/index.md`
- add the new shared spec files
- add the new guides
- update `frontend/index.md`, `backend/index.md`, and `guides/index.md` so the navigation reflects the new structure

### Pass 2: Content normalization
- rewrite existing frontend/backend docs from bootstrap-placeholder content into target-stack rules
- rewrite any current-state-only language that conflicts with the confirmed target architecture
- normalize wording so all `.trellis/spec/` documents read as enforceable project standards

## Risks and Mitigations

### Risk 1: `.trellis/spec/` becomes a duplicate documentation set
Mitigation:
- keep `.trellis/spec/` concise and operational
- use `docs/specs/` as the richer background source
- write Trellis specs as action-oriented implementation standards

### Risk 2: Mixed current-state and target-state language causes confusion
Mitigation:
- fully commit to target-state language in the rewritten specs
- remove bootstrap-era wording that refers to the temporary repository structure

### Risk 3: Overlapping topics create contradictory rules
Mitigation:
- define precedence by scope:
  - shared = cross-cutting default
  - frontend/backend = stack-specific override
  - guides = advisory design support, not hard constraints

## Acceptance Criteria

- `.trellis/spec/` has a clear `frontend / backend / shared / guides` structure.
- Every meaningful spec in `docs/specs/` is either mapped into an executable Trellis spec or intentionally excluded as out of scope.
- Existing frontend/backend Trellis specs are rewritten to match the approved stack.
- Shared cross-cutting rules are not duplicated unnecessarily.
- The resulting spec system is concise enough for agent context injection and specific enough for implementation and review tasks.

## Out of Scope

- Writing or changing application source code
- Updating CI pipelines
- Implementing runtime tooling such as ESLint, Maven plugins, or deployment scripts
- Refactoring `docs/specs/` itself
