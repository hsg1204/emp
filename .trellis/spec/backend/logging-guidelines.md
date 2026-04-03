# Logging Guidelines

> Backend logging rules for Spring Boot services using Logback.

---

## Overview

Use Logback as the default logging backend for Spring Boot services. Logs must be
useful for diagnosis, safe for production, and consistent across modules.

Request-linked logs must include a `traceId` so a single request can be followed
across controller, service, and integration boundaries.

---

## Required Patterns

- Use the SLF4J logging API with Logback as the backend.
- Configure service logging through Spring Boot and `logback-spring.xml`.
- Include `traceId` in request-linked logs through a framework-standard request
  context propagation approach that is used consistently within the service.
- Record key business steps at `INFO` level.
- Record recoverable anomalies at `WARN` level.
- Record failures at `ERROR` level with enough context to diagnose the issue.
- Keep logs free of plaintext secrets, credentials, tokens, and private keys.
- Use parameterized logging instead of manual string concatenation.

---

## Level Guidance

### `INFO`

Use `INFO` for meaningful business milestones and operationally useful state
transitions, such as:

- request entry and completion at important boundaries
- major business workflow steps
- external dependency calls when start and result are relevant
- create, update, delete, publish, or approval outcomes

### `WARN`

Use `WARN` for recoverable or unexpected conditions that do not stop the entire
request, such as:

- fallback execution
- skipped optional integration data
- retryable downstream issues
- suspicious input patterns that are safely rejected

### `ERROR`

Use `ERROR` when the request, command, or integration step fails and operator
attention may be required.

Error logs must include enough context to diagnose the issue, for example:

- `traceId`
- stable business identifiers when relevant
- exception stack trace
- integration target or operation name when relevant

---

## Request Correlation

- Populate `traceId` at the request boundary.
- Keep `traceId` available to downstream logs generated during the same request
  through the service's standard request context propagation mechanism.
- Ensure the Logback pattern includes `traceId` so it is visible in log output.
- Preserve request correlation in async or background flows when the service
  explicitly hands work across threads or boundaries.

---

## Sensitive Data Rules

- Never log plaintext passwords, secrets, access tokens, refresh tokens,
  connection strings, or private keys.
- Mask or omit sensitive values before logging request or response context.
- Be cautious with DTO and entity `toString()` output if they may contain
  confidential fields.
- Do not dump full request or response bodies by default.

---

## Placement Rules

- Log once at the most useful boundary instead of repeating the same message in
  every layer.
- Keep business-progress logs mainly in controller and service boundaries.
- Keep repository logs focused on exceptional persistence issues, not routine SQL
  narration unless debugging is explicitly enabled.
- Keep logging consistent with the shared configuration and environment rules; do
  not hardcode deploy-specific logging behavior in source code.

---

## Forbidden Patterns

- Do not use `System.out.println` or `System.err.println` for backend service
  logging.
- Do not omit `traceId` from request-linked logs.
- Do not log secrets or other sensitive values in plaintext.
- Do not use noisy `INFO` logs for tight loops or low-level helper chatter.
- Do not build log messages with unnecessary string concatenation when placeholders
  are available.
- Do not log only a short error sentence when a stack trace is required for
  diagnosis.

---

## Review Checklist

- Is Logback the logging baseline for the service?
- Are request-linked logs correlated with `traceId`?
- Are key business steps recorded at `INFO`?
- Do `ERROR` logs contain enough context to diagnose failures?
- Are secrets and confidential values masked or omitted?
- Is `System.out.println` absent from backend service code?
