# API Design

> Project-wide rules for HTTP API contracts, response shapes, and documentation.

***

## Required Patterns

- Treat this document as the single source of truth for the unified response envelope, pagination contract, REST naming rules, versioning rules, and API documentation examples.
- Use a unified response envelope for both success and error responses.
- Every response body must include `code`, `message`, and `data`.
- Keep `code` machine-readable and stable for clients.
- Keep `message` short, human-readable, and suitable for logs or UI display.
- Use `data` for the business payload. Use `null` when no payload is needed.
- For paginated responses, use the fixed structure `data.items`, `data.total`, `data.page`, and `data.pageSize`.
- Keep REST naming consistent: use plural resource nouns, lowercase paths, and kebab-case when separators are needed.
- Use explicit versioned base paths for public APIs by default, such as `/api/v1/...`.
- Keep error responses inside the same envelope instead of returning a different JSON shape.
- Maintain OpenAPI definitions for externally used endpoints and keep Knife4j output
  aligned with the implemented contract.

***

## Unified Response Envelope

Use this envelope as the default response contract:

```json
{
  "code": 0,
  "message": "OK",
  "data": {}
}
```

### Field Rules

- `code`: business result code. Use a success code for successful requests and a
  non-success code for business or validation failures.
- `message`: concise description of the result.
- `data`: response payload object, array, scalar, or `null`, depending on the endpoint contract.

***

## Pagination Contract

Paginated list endpoints must return pagination metadata inside `data` and must keep the same field names everywhere:

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "items": [],
    "total": 0,
    "page": 1,
    "pageSize": 20
  }
}
```

### Pagination Rules

- `data.items`: current page records.
- `data.total`: total record count.
- `data.page`: current page number.
- `data.pageSize`: current page size.
- Do not rename these fields to alternatives such as `records`, `list`, `rows`, `size`, or `pages` in shared APIs.

***

## REST Naming Consistency

- Use resource-oriented paths such as `/users`, `/orders`, and `/order-items`.
- Use plural nouns for collection resources.
- Use path segments to express hierarchy only when the parent-child relation is real and stable.
- Use HTTP methods for intent: `GET` for read, `POST` for create, `PUT` for full
  update, `PATCH` for partial update, and `DELETE` for delete.
- Avoid action-style paths such as `/getUser`, `/createOrder`, or `/deleteById`.
- Keep request and response naming consistent across modules for the same concept.

***

## API Versioning

- Use explicit versioned base paths by default, such as `/api/v1/users`.
- Treat any breaking contract change as a new API version instead of silently changing an existing one.
- Evolve non-breaking additions, such as new optional fields or new endpoints, within the current API version by default.
- Keep version naming simple and monotonic, for example `v1`, `v2`, and `v3`.

***

## Error Responses

Error responses must follow the same envelope shape:

```json
{
  "code": 40001,
  "message": "Invalid request parameters",
  "data": null
}
```

### Error Rules

- Keep the envelope fields unchanged for errors.
- Put machine-facing failure meaning in `code`.
- Put operator-facing or user-facing summary text in `message`.
- Use `data` only when the error contract explicitly requires structured details; otherwise use `null`.
- Do not return ad hoc error bodies that omit `code`, `message`, or `data`.

***

## OpenAPI and Knife4j

- Document all externally used REST endpoints with OpenAPI annotations or generated schema definitions.
- Keep request models, response envelopes, field descriptions, and example values
  synchronized with the actual implementation.
- Show the unified response envelope in API documentation examples.
- Show the fixed pagination structure in paginated endpoint examples.
- Keep Knife4j enabled or configured from the same OpenAPI source so the
  interactive documentation matches the real contract.
- Update API documentation in the same change when the contract changes.

***

## Review Checklist

- Does every response include `code`, `message`, and `data`?
- Do paginated endpoints use `data.items`, `data.total`, `data.page`, and `data.pageSize` exactly?
- Are resource paths RESTful, plural, consistently named, and explicitly versioned when public?
- Do breaking API changes introduce a new version while non-breaking additions stay in the current version?
- Do error responses keep the same envelope shape?
- Are OpenAPI and Knife4j docs updated to match the contract?

