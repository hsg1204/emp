# Backend Specifications

> Backend-specific hard constraints for Spring Boot 3 service and persistence architecture.

---

## Reading Order

For backend work, read documents in this order:

1. `../shared/index.md` for the project-wide baseline
2. This backend index for backend scope
3. The relevant backend specification files listed below
4. `../guides/index.md` only when advisory design support would help with implementation decisions

---

## Backend Specs Navigation

| Spec | Purpose |
|------|---------|
| [Directory Structure](./directory-structure.md) | Backend file organization, module boundaries, and responsibility placement |
| [Database Guidelines](./database-guidelines.md) | Persistence modeling, storage access patterns, and schema-related conventions |
| [Error Handling](./error-handling.md) | Error categories, propagation strategy, and response or logging expectations |
| [Logging Guidelines](./logging-guidelines.md) | Logging structure, signal quality, and operational observability conventions |
| [Quality Guidelines](./quality-guidelines.md) | Backend quality checks, review expectations, and validation requirements |

---

## Usage

Use the backend specifications for service design, persistence concerns, error handling, logging, and backend quality standards.
Shared specifications remain the baseline for cross-cutting concerns such as code style, testing, configuration, API contracts, data modeling, deployment, workflow, and AI generation rules.

---

**Language**: All documentation should be written in **English**.
