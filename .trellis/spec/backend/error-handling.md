# Error Handling

> Rules for backend exceptions, validation failures, and unified API error
> responses.

---

## Overview

Backend services must handle errors through a centralized exception strategy.
Follow `.trellis/spec/shared/api-design.md` as the single source of truth for
the unified response envelope, error response shape, and API documentation
alignment.

This document defines backend-specific exception architecture, transport-level
status mapping, propagation, and logging expectations.

---

## Required Patterns

- Use `@RestControllerAdvice` as the default global exception handling mechanism.
- Use a custom business exception hierarchy for domain and use-case failures.
- Return validation failures in the same unified response envelope used for all
  other API responses.
- Keep error `code` values stable and machine-readable.
- Keep error `message` values short and human-readable.
- Use `data: null` for standard error responses unless structured error details
  are explicitly part of the contract.
- Log unexpected exceptions with enough context to diagnose the failure.

---

## Exception Architecture

### Global Handler

- Centralize backend exception translation with `@RestControllerAdvice`.
- Handle validation exceptions, business exceptions, and unexpected exceptions in
  one consistent place.
- Keep controller methods focused on business flow, not on repetitive try/catch
  response assembly.

### Business Exception Hierarchy

- Define a shared base business exception type such as `BusinessException`.
- Keep business exceptions responsible for stable error code and message values.
- Extend the base type for domain-specific failures when the distinction is
  meaningful, such as validation, resource state, or domain-rule violations.
- Throw business exceptions from service logic when business rules fail.

### Unexpected Exceptions

- Map uncaught framework or system exceptions to a generic internal-error code and
  safe message.
- Do not leak stack traces, SQL fragments, or internal class names to clients.
- Always log the full server-side error with stack trace and request context.

---

## Validation Failure Handling

- Trigger request validation at the controller boundary with `@Validated` or
  `@Valid` on DTO and query inputs.
- Handle validation failures from standard Spring and Jakarta Validation
  exception types in the global exception handler.
- Distinguish framework validation exceptions from business exceptions so
  request-shape failures and domain-rule failures do not collapse into one
  ambiguous category.
- Return validation failures through the same response envelope as business and
  system errors.
- Keep the top-level envelope shape unchanged even when validation detail is
  included.
- If a contract explicitly requires field-level details, keep them under `data`
  without changing the top-level envelope.

---

## Response Rules

- Keep every error response inside the shared `code` / `message` / `data`
  envelope regardless of HTTP status.
- Keep error code semantics stable across modules so clients can rely on them.
- Use one documented transport-level status strategy per error category and apply
  it consistently across modules; the same class of error must not map to
  different statuses without an explicit contract distinction.
- Map request-shape validation failures to HTTP 400 and unexpected server-side
  failures to HTTP 500 by default.
- Map business exceptions with the documented contract strategy for that failure
  category, such as 400, 404, or 409 when the contract distinguishes them, and
  keep the choice stable for the same failure type.
- Ensure OpenAPI and any adopted OpenAPI-derived interactive docs examples stay
  aligned with the error envelope defined in `.trellis/spec/shared/api-design.md`.

---

## Propagation Rules

- Let exceptions propagate to the global handler when the current layer cannot
  resolve them meaningfully.
- Keep controller-level catch blocks rare and justified.
- Do not convert business failure into fake success responses.
- Do not hide persistence or infrastructure errors behind ad hoc string messages.

---

## Forbidden Patterns

- Do not return ad hoc error shapes such as raw strings, arbitrary maps, or
  framework-default error bodies.
- Do not bypass `@RestControllerAdvice` with repetitive per-controller error
  formatting.
- Do not use magic error codes that have no declared meaning.
- Do not swallow exceptions and return a success envelope.
- Do not leak stack traces, SQL, or secrets to API consumers.
- Do not treat validation failures as a separate response contract shape.

---

## Review Checklist

- Is `@RestControllerAdvice` the central error translation mechanism?
- Does the service use a custom business exception hierarchy?
- Do validation failures return the same response envelope as all other errors?
- Do error responses stay aligned with `.trellis/spec/shared/api-design.md`?
- Are unexpected exceptions logged with diagnostic context but returned with a
  safe client-facing message?
- Is the transport-level status strategy consistent for the same error category
  across modules?
- Are OpenAPI and any adopted OpenAPI-derived interactive docs aligned with the
  implemented error contract?
