# Database Guidelines

> Persistence rules for Spring Boot 3 services using MySQL and MyBatis-Plus.

---

## Overview

Use MySQL as the relational database baseline and MyBatis-Plus as the default
persistence helper layer. Database design and persistence code must stay aligned
with the shared data-modeling, API, and configuration specs.

Follow `.trellis/spec/shared/data-modeling.md` for object boundaries, ID
strategy, logical delete, audit fields, enum/status modeling, relation-field
naming, and schema consistency. This document adds backend-specific
persistence rules only.

Keep SQL and persistence concerns explicit and inside the repository boundary.

---

## Required Patterns

- Use MySQL as the default relational database.
- Use MyBatis-Plus as the default mapper and persistence helper layer.
- Keep SQL and persistence behavior inside the repository boundary.
- Keep MyBatis-Plus details out of controller contracts and external API models.
- Do not use database-level foreign key constraints in application schemas.
- Follow the shared data-modeling rules for object boundaries, ID strategy,
  logical delete, audit fields, enum modeling, relation-field naming, and
  schema consistency.

---

## Persistence Baseline

### MySQL Conventions

- Use lowercase snake_case for table names and column names.
- Use `BIGINT` for Snowflake IDs by default.
- Keep nullable rules, defaults, indexes, and unique constraints explicit.
- Keep character set and collation consistent across new tables in the same
  service.
- Index common query paths, relation lookup fields, and unique business keys.

### Foreign Key Constraint Policy

- Do not create database-level foreign key constraints in application schemas.
- Represent relations with explicit lookup fields such as `user_id`,
  `order_id`, or `parent_id`.
- Keep relation ownership, delete behavior, and update behavior explicit in
  service logic, repository logic, and migration review instead of relying on
  database-level cascade rules.
- When referential integrity is required, validate related records explicitly in
  write flows and cleanup flows.
- Add indexes for relation lookup fields when they participate in joins,
  filtering, or integrity checks.

### MyBatis-Plus Usage

- Use MyBatis-Plus for standard CRUD, paging, and logical delete support.
- Keep mapper or repository interfaces in the `repository` package.
- Use wrappers and built-in helpers for straightforward queries.
- Keep custom SQL explicit and readable when wrappers would reduce clarity.
- Keep MyBatis-Plus details out of controller contracts and external API models.

---

## Scenario: Relation Modeling Without Database-Level Foreign Keys

### 1. Scope / Trigger

- Trigger: new schema design, relation-field addition, table migration, or any
  change that would otherwise introduce a `FOREIGN KEY` clause.

### 2. Signatures

- Schema field signature: `<related_entity>_id BIGINT [NOT NULL|NULL]`
- Index signature: `INDEX idx_<table>_<related_entity>_id (<related_entity>_id)`
- No migration in application schemas may add a `FOREIGN KEY (...) REFERENCES ...`
  clause.

### 3. Contracts

- Relation fields use explicit `*_id` names and keep type compatibility with the
  referenced Snowflake ID.
- Create and update flows that require the related record to exist must validate
  that existence before commit.
- Delete and cleanup behavior must be documented explicitly in service logic or
  migration steps; do not rely on `ON DELETE CASCADE` or `ON UPDATE CASCADE`.

### 4. Validation & Error Matrix

- Required related record missing on create or update -> reject with a
  documented validation or business error.
- Migration includes a database-level foreign key clause -> reject in schema
  review.
- Relation field has no supporting index for join or lookup paths -> treat as a
  schema review issue.
- Cleanup depends on hidden database cascade behavior -> reject until the delete
  flow is explicit.

### 5. Good / Base / Bad Cases

- Good: `order.user_id BIGINT NOT NULL` with an index, plus explicit user
  existence validation in the write flow.
- Base: `category_id BIGINT NULL` for an optional relation, with explicit null
  handling and no database-level foreign key.
- Bad: `FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE` in an
  application migration.

### 6. Tests Required

- Schema or migration review must confirm that no application table adds a
  database-level foreign key clause.
- Service or repository tests must assert relation validation for writes when a
  related record is required.
- Delete-flow tests must assert that cleanup behavior is explicit and does not
  depend on hidden database cascade rules.

### 7. Wrong vs Correct

#### Wrong

- Add `FOREIGN KEY (order_id) REFERENCES orders(id)` and depend on cascade rules
  for cleanup.

#### Correct

- Store `order_id` as a relation lookup field, index it, validate the related
  order explicitly, and implement cleanup behavior in the application flow or
  migration plan.

---

## Persistence Boundary Rules

- Controllers must not call MyBatis-Plus mappers directly.
- Services may orchestrate entity loading and persistence through repositories but
  must not leak persistence-specific structures to API clients.
- Repositories own SQL, wrappers, paging queries, and entity persistence.
- Entities are repository-facing models, not default request or response models.
- DTO-to-Entity and Entity-to-VO mapping must happen outside repository SQL
  concerns so contracts stay decoupled from storage details.

---

## Forbidden Patterns

- Do not place SQL strings or MyBatis-Plus query construction in controllers.
- Do not let controllers call MyBatis-Plus mappers directly.
- Do not leak persistence-specific structures to API consumers.
- Do not add database-level foreign key constraints or rely on `ON DELETE` /
  `ON UPDATE` cascade rules in application schemas.

---

## Review Checklist

- Is MySQL the schema and naming baseline?
- Is MyBatis-Plus confined to the repository and persistence boundary?
- Are controllers insulated from direct mapper access and persistence-specific
  structures?
- Are table relations modeled with explicit lookup fields and indexes instead of
  database-level foreign key constraints?
- Is referential integrity enforced explicitly in application logic and
  migration review?
- Are repository SQL, wrappers, and paging concerns kept inside the repository
  boundary?
