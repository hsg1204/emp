# Data Modeling

> Project-wide rules for data objects, persistence modeling, and database conventions.

---

## Required Patterns

- Keep clear boundaries between Entity, DTO, VO, and Query objects.
- Use Snowflake-generated IDs as the default primary key strategy.
- Use logical delete as the default delete strategy for business tables unless a
  hard-delete case is explicitly required.
- Follow consistent MySQL naming and schema conventions.
- Model enums and statuses explicitly instead of using undocumented magic strings or numbers.

---

## Object Boundaries

### Entity

- Entity represents the persistence model mapped to database tables.
- Keep Entity focused on stored fields and persistence-related metadata.
- Do not use Entity directly as the external API contract by default.

### DTO

- DTO represents request or transfer input between layers or across service boundaries.
- Use DTO for create, update, import, and other write-oriented payloads.
- Keep validation-oriented fields in DTOs, not in Entities.

### VO

- VO represents response output for read scenarios.
- Shape VO for client-facing data needs instead of leaking raw persistence structure.
- Aggregate display-oriented or derived fields in VO when needed.

### Query Object

- Query object represents search and filter input.
- Keep pagination, sorting, filtering, and query conditions in Query objects.
- Do not overload DTOs or VOs with query-only fields.

---

## ID Strategy

- Use Snowflake ID as the default primary key strategy.
- Prefer a single project-wide ID type for consistency, typically `Long` in Java services and MySQL `BIGINT` in storage.
- Generate IDs in the application or through the configured Snowflake strategy
  instead of relying on auto-increment by default.
- Keep ID fields stable across Entity, DTO, and VO contracts where the same business object is referenced.

---

## Delete Strategy

- Use logical delete by default for business data.
- Store a dedicated logical delete flag or equivalent standard field in tables that support logical deletion.
- Exclude logically deleted records from normal queries by default.
- Hard delete only for explicitly approved cases such as temporary data,
  irreversible cleanup jobs, or strict storage-control requirements.

---

## Audit and Common Fields

- Use `created_at` and `updated_at` as the default timestamp field names.
- Use the `_at` suffix for persisted time fields and keep names explicit, such as `paid_at` or `archived_at`.
- Use `created_by` and `updated_by` as the default audit actor field names when actor tracking is required.
- Use `is_deleted` as the default logical delete flag and `deleted_at` as the default logical delete timestamp when delete time is tracked.
- Keep these field names consistent across tables, entities, DTO mappings, and query conventions.

---

## MySQL Conventions

- Use MySQL as the default relational database convention baseline.
- Use lowercase snake_case for table names and column names.
- Keep primary keys, relation lookup fields, timestamps, status fields, and delete flags named consistently across modules.
- Prefer `BIGINT` for Snowflake IDs.
- Keep character set and collation consistent across new tables.
- Define indexes for unique constraints, relation lookup fields, and common query paths.
- Do not use database-level foreign key constraints in application schemas. Represent relations with explicit `*_id` fields and enforce referential integrity in application logic and migration review.
- Keep nullable rules explicit. Do not rely on ambiguous defaults.

---

## Enum and Status Modeling

- Model business status explicitly with enums or equivalent typed constants.
- Persist stable code values for enums instead of relying on enum ordinal positions.
- Keep enum code, label, and meaning documented in code and API contracts where relevant.
- Use dedicated status fields for lifecycle state instead of mixing multiple meanings into one generic flag.
- Do not scatter raw literals such as `0`, `1`, `enabled`, `disabled`, or
  `PENDING` throughout business logic without a declared model.

---

## Review Checklist

- Are Entity, DTO, VO, and Query object responsibilities clearly separated?
- Does the model use Snowflake ID as the default key strategy?
- Is logical delete the default unless a hard-delete exception is justified?
- Do table and column names follow MySQL lowercase snake_case conventions?
- Do timestamp, audit, and logical delete fields follow the shared naming convention?
- Are table relations modeled with explicit lookup fields and indexes instead of database-level foreign key constraints?
- Are enums and statuses modeled explicitly with stable code values?
