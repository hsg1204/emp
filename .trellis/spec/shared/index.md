# Shared Specifications

> Cross-cutting specifications that define the project baseline.

---

## Reading Order

Use the shared specifications as the starting point for any implementation task:

1. Read this shared index first.
2. Read the relevant stack index after this file:
   - frontend tasks: `../frontend/index.md`
   - backend tasks: `../backend/index.md`
   - full-stack or cross-layer tasks: read both `../frontend/index.md` and `../backend/index.md`
3. Read `../guides/index.md` only when advisory design support would help with
   implementation or cross-cutting decisions.

---

## Shared Specs

Read these shared specs when the task touches cross-cutting project conventions:

| File | Scope |
|------|-------|
| `code-style.md` | Project-wide formatting, encoding, indentation, and readability rules |
| `testing.md` | Testing stack, coverage expectations, and CI quality gates |
| `config-env.md` | Configuration structure, environment variable rules, and secrets boundaries |
| `api-design.md` | API contract design, request/response conventions, versioning, and error shapes |
| `data-modeling.md` | Shared expectations for domain modeling, schema design, and data lifecycle decisions |
| `deployment.md` | Deployment baseline, containerization, runtime checks, and environment isolation |
| `git-workflow.md` | Branching, commit, review, and protected integration workflow conventions |
| `ai-generation-rules.md` | AI-authored change rules, precedence, reuse, and approved-stack guardrails |

## Usage

Use the shared specifications as the cross-cutting default for project-wide concerns.
Frontend and backend specifications add hard constraints within their own scope.
Guides are advisory only and do not override task requirements or shared, frontend, or backend specifications.

---

**Language**: All documentation should be written in **English**.
