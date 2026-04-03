# Type Safety

> Rules for TypeScript usage in the frontend application.

---

## Overview

TypeScript is required for all frontend source files.
Type safety must make component contracts, hook APIs, service boundaries, and shared
frontend domain models explicit.

---

## Required Patterns

- Use TypeScript for components, hooks, services, stores, and utilities.
- Type component props explicitly.
- Type public hook parameters and return values explicitly.
- Avoid `any`. Use concrete types, generics, unions, or `unknown` plus narrowing.
- Keep request and response types close to the API client or related shared domain type.
- Keep local types local to the page, component, or hook when reuse does not cross that
  boundary.
- Promote only genuinely shared contracts to `src/types/`.
- Keep service-layer contracts aligned with `.trellis/spec/shared/api-design.md`.
- Keep nullability and optional fields explicit.
- Prefer small, composable types over large catch-all objects.

---

## API Contract Typing

Frontend service types must align with `.trellis/spec/shared/api-design.md` exactly.
Do not redefine the API envelope or pagination contract with a different shape,
field name, or nullability assumption.

When local helper types are useful, they must preserve the shared contract exactly.
In particular:

- keep `code`, `message`, and `data` unchanged
- keep `data` nullable when the shared contract allows `null`
- keep paginated payload fields as `items`, `total`, `page`, and `pageSize`
- do not model errors as a separate ad hoc response shape

Use request and response types close to the service module unless the contract is shared
across multiple features.

---

## Type Placement Rules

### Keep Types Local When

- a prop type is only used by one component
- a view model belongs only to one page or hook
- a temporary draft type is relevant only inside one feature

### Share Types When

- the same domain model is used by multiple services, hooks, pages, or stores
- a service contract must stay consistent across multiple consumers
- a reusable component depends on a stable shared contract

---

## Forbidden Patterns

- Do not use `any` as the default escape hatch.
- Do not leave component props untyped.
- Do not leave public hook parameters or return values implicit.
- Do not move every type into a global shared folder by default.
- Do not separate request and response types far away from the API module without a real
  reuse reason.
- Do not invent runtime validation dependencies outside the approved stack.
- Do not hide nullable or optional behavior behind inaccurate types.
- Do not redefine shared API contracts locally with alternate field names or narrower
  assumptions.

---

## Review Checklist

- Is TypeScript used for the changed frontend source?
- Are component props and hook contracts typed explicitly?
- Has `any` been avoided or replaced with a safer type?
- Are request and response types placed near the API client or a justified shared type?
- Are one-off local types kept local instead of promoted too early?
- Do API and pagination types match `.trellis/spec/shared/api-design.md` exactly?
