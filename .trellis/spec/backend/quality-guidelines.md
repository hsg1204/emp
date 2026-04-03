# Quality Guidelines

> Backend quality rules for Java 17 and Spring Boot 3 services.

---

## Overview

Backend quality depends on clear layer boundaries, predictable validation,
transaction discipline, and automated tests. Follow the shared testing,
API-design, data-modeling, configuration, and code-style specs as hard
constraints.

Follow `.trellis/spec/shared/testing.md` as the single source of truth for the
approved backend test stack, coverage thresholds, and CI fail gates.
Follow `.trellis/spec/shared/data-modeling.md` as the single source of truth for
Entity, DTO, VO, and Query object semantics.

Use these backend rules to keep services maintainable and safe while staying
within the approved stack.

---

## Required Patterns

- Validate request input at the controller boundary.
- Keep business logic in the service layer and persistence logic in the
  repository layer.
- Define transaction boundaries in the service layer for write operations.
- Keep error responses inside the shared unified response envelope.
- Model statuses and result codes explicitly instead of using magic values.
- Ensure changed backend behavior has automated coverage at the correct layer.

---

## Layer Separation

- Controllers handle HTTP concerns, validation triggering, and response envelope
  return only.
- Services own business rules, orchestration, and transaction coordination.
- Repositories own MyBatis-Plus operations, SQL, and entity persistence.
- Use Entity, DTO, VO, and Query objects according to `.trellis/spec/shared/data-modeling.md`.

Keep code in the narrowest correct layer. If a method can be explained as HTTP,
it belongs in the controller. If it can be explained as business policy, it
belongs in the service. If it can be explained as persistence, it belongs in the
repository.

---

## Validation Rules

- Use `@Validated` or `@Valid` at controller entry points for request DTOs and
  query objects.
- Put field-level validation constraints on DTO or query types, not on entities by
  default.
- Perform cross-field or domain-rule validation in the service layer when it goes
  beyond request-shape validation.
- Return validation failures through the unified response envelope defined by the
  shared API spec.

---

## Transaction Principles

- Apply transactions to service-layer write operations that must succeed or fail
  as one business unit.
- Keep transaction scopes as small as practical.
- Do not place transaction annotations on controllers.
- Do not use repository methods as the main transaction-boundary definition point.
- Read-only queries may avoid transactions unless a specific consistency need
  requires one.
- Keep external side effects and database writes coordinated intentionally inside a
  clearly defined service use case.

---

## Backend Testing Focus

- Cover business rules, validation branches, mapping decisions, and error handling
  in service logic.
- Cover Spring wiring, repository integration, transaction behavior, and global
  exception handling when integration boundaries change.
- Verify the unified response envelope and important API contracts when tests touch
  controller boundaries.
- Use isolation only when it keeps the contract under test meaningful.
- Keep test intent clear and behavior-focused.

---

## Contract and Modeling Consistency

- Keep every success and error response inside the shared `code` / `message` /
  `data` envelope.
- Do not introduce ad hoc error shapes for validation, business failure, or system
  failure paths.
- Do not use magic status values, magic error codes, or magic lifecycle flags.
- Use explicit enums or declared constants for business statuses and result codes.
- Keep OpenAPI documentation, and any adopted OpenAPI-derived interactive docs,
  updated when contracts change.

---

## Backend Quality Gate

Backend changes must pass the project verification gate before merge:

- compilation and configured static analysis
- required test suites from `.trellis/spec/shared/testing.md`
- contract and transaction verification for changed backend flows

Treat failing compilation, configured static analysis, required test suites,
required scoped coverage, or broken backend contract checks as merge blockers.

---

## Forbidden Patterns

- Do not put business rules in controllers or repositories.
- Do not skip controller-boundary validation for request DTOs and query objects.
- Do not spread a single write use case across multiple uncoordinated transactions.
- Do not return ad hoc error shapes.
- Do not use undocumented magic status values or numeric flags in business logic.
- Do not rely only on manual testing for behavior that can be covered automatically.
- Do not merge changes that break required quality gates without an explicit exception.

---

## Review Checklist

- Is validation triggered at the controller boundary?
- Are controller, service, and repository responsibilities clearly separated?
- Are object roles aligned with `.trellis/spec/shared/data-modeling.md`?
- Are write operations wrapped in appropriate service-layer transactions?
- Does changed backend behavior have automated coverage at the correct layer?
- Does the change follow `.trellis/spec/shared/testing.md` for test stack, coverage,
  and CI gates?
- Do responses keep the shared unified envelope for both success and error cases?
- Are status values and error codes explicit instead of magic literals?
- Does the change satisfy the backend quality gate?
