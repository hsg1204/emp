# Directory Structure

> Backend package layout and layer boundaries for Java 17, Spring Boot 3, Maven,
> MyBatis-Plus, MySQL, Nacos, Logback, and OpenAPI-based services.

---

## Overview

Backend modules must use a standard Spring Boot layout so controllers, services,
persistence code, and models stay predictable across services. Follow the shared
specs as the cross-cutting baseline, especially code style, API design,
configuration, testing, and data modeling.

Follow `.trellis/spec/shared/data-modeling.md` as the single source of truth for
Entity, DTO, VO, and Query object semantics. This document defines where those
objects live, how layers depend on them, and how backend packages stay separated.

Use package and directory names that make layer responsibility obvious. Keep HTTP,
business, and persistence concerns separate.

---

## Required Patterns

- Use Maven as the build layout baseline.
- Use `src/main/java` for application code and `src/test/java` for tests.
- Use `src/main/resources` for configuration, Logback config, and mapper XML files
  when XML is needed.
- Use a stable root package such as `com.company.project`.
- Use lowercase package names and keep package depth intentional.
- Separate controller, service, repository, model, config, exception, and utils
  packages.
- Keep layer boundaries aligned with the shared API and data-modeling specs.

---

## Recommended Layout

```text
<module-root>/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/company/project/
│   │   │       ├── Application.java
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       │   └── impl/
│   │   │       ├── repository/
│   │   │       ├── model/
│   │   │       │   ├── dto/
│   │   │       │   ├── entity/
│   │   │       │   ├── query/
│   │   │       │   └── vo/
│   │   │       ├── exception/
│   │   │       └── utils/
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-*.yml
│   │       ├── logback-spring.xml
│   │       └── mapper/
│   └── test/
│       ├── java/
│       │   └── com/company/project/
│       └── resources/
```

---

## Layer Responsibilities

### `config/`

- Keep Spring Boot, Nacos, MyBatis-Plus, OpenAPI, and other approved framework
  configuration here.
- If adopted, keep configuration for OpenAPI-derived interactive docs tooling
  such as Knife4j aligned to the same OpenAPI contract source.
- Keep framework wiring, interceptors, converters, and bean configuration here.
- Do not place business rules or request-specific logic in configuration classes.

### `controller/`

- Treat controllers as the HTTP boundary.
- Accept request DTOs or query objects, trigger validation, call services, and
  return the unified response envelope defined by the shared API spec.
- Keep controllers thin. They must not contain SQL, direct mapper calls,
  transaction orchestration, or cross-module business workflows.

### `service/` and `service/impl/`

- Define use-case-oriented service interfaces in `service/`.
- Use `service/impl/` only for implementations of service contracts declared in
  `service/`.
- Put business implementation, orchestration, and transaction boundaries in
  `service/impl/`.
- Keep business rules here rather than in controllers or repositories.
- Do not treat `service/impl/` as a generic misc layer for helpers, adapters, or
  classes that do not implement a service contract.

### `repository/`

- Use this package for MyBatis-Plus mapper or repository interfaces and
  persistence-only helper classes.
- Keep database access, query construction, and persistence mapping here.
- Do not return HTTP response objects or contain controller-specific validation.

### `model/`

- Use `model/` as the shared home for backend data shapes exchanged across layer
  boundaries, including `dto`, `entity`, `query`, and `vo`.
- Keep package placement and naming aligned with `.trellis/spec/shared/data-modeling.md`.
- Do not turn `model/` into a catch-all package for unrelated helpers or business
  logic.

### `model/entity/`

- Keep persistence models under `model/entity/`.
- Keep object semantics aligned with `.trellis/spec/shared/data-modeling.md`.

### `model/dto/`

- Keep request and transfer input models under `model/dto/`.
- Keep object semantics aligned with `.trellis/spec/shared/data-modeling.md`.

### `model/query/`

- Keep search, filter, sort, and pagination input models under `model/query/`.
- Keep object semantics aligned with `.trellis/spec/shared/data-modeling.md`.

### `model/vo/`

- Keep response and read-view output models under `model/vo/`.
- Keep object semantics aligned with `.trellis/spec/shared/data-modeling.md`.

### `exception/`

- Keep the custom exception hierarchy, result codes, and global exception handler
  here.
- Centralize `@RestControllerAdvice` and backend error mapping in this package or
  a clearly related subpackage.

### `utils/`

- Reserve utilities for stateless, reusable helpers with clear cross-cutting
  value.
- Keep utilities framework-light and business-agnostic.
- Do not hide core domain rules inside utility methods.

---

## Boundary Rules

- Controller depends on service contracts, not repository implementations.
- Service depends on repository and model objects needed for business work.
- Repository depends on entities and persistence tooling only.
- Use Entity, DTO, VO, and Query objects according to `.trellis/spec/shared/data-modeling.md`.
- Shared response envelopes, API versioning, and pagination contracts must follow
  the shared API spec.

---

## Forbidden Patterns

- Do not place mapper or SQL access code in controllers.
- Do not place HTTP annotations or response-envelope assembly in repositories.
- Do not use Entity as the default request or response model.
- Do not mix DTO, Entity, and VO responsibilities in one class.
- Do not create package names that hide responsibilities, such as generic
  `manager`, `helper`, or `common`, when a specific layer package is more correct.
- Do not put environment-specific secrets or deploy-specific values in Java code;
  follow the shared configuration and environment spec.

---

## Review Checklist

- Does the module follow the Spring Boot and Maven layout?
- Are `config`, `controller`, `service`, `service/impl`, `repository`, `model`,
  `model/entity`, `model/dto`, `model/query`, `model/vo`, `exception`, and `utils`
  used for the correct responsibilities?
- Are object roles aligned with `.trellis/spec/shared/data-modeling.md`?
- Is SQL or persistence behavior confined to the repository layer?
- Are controllers thin and service-oriented?
- Are shared API, config, testing, and data-modeling rules still respected?
