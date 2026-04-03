# Cross-Layer Thinking Guide

> **Purpose**: Think through data flow across layers before implementation so contracts and responsibilities stay coherent.

---

## Use This Guide When

Use this guide when a change spans multiple layers, such as frontend ↔ backend,
controller ↔ service ↔ repository, or service ↔ database.

This guide is advisory. For executable contract rules, follow the relevant hard
specs such as `.trellis/spec/shared/api-design.md`,
`.trellis/spec/shared/data-modeling.md`, `.trellis/spec/backend/error-handling.md`,
`.trellis/spec/backend/database-guidelines.md`, and
`.trellis/spec/frontend/type-safety.md`.

---

## Start by Mapping the Flow

Before implementation, it helps to write down the path the data follows:

```text
source -> transform -> store -> retrieve -> transform -> display
```

For each step, ask:

- what format is the data in here?
- which layer owns this transformation?
- what validation happens here, if any?
- what could go wrong at this handoff?

---

## Identify the Boundaries That Matter

Useful boundary checks include:

- API ↔ service
- service ↔ database
- backend ↔ frontend
- page/container ↔ reusable component
- service module ↔ state/cache owner

For each boundary, make sure you can describe:

- the input shape
- the output shape
- the owning layer
- the failure mode the next layer should expect

If those answers are unclear, the implementation contract is usually not ready yet.

---

## Watch for Cross-Layer Drift

Common warning signs:

- one layer assumes fields or formats that another layer never promised
- the same validation rule is implemented differently in multiple places
- persistence structure leaks into API or UI contracts
- frontend state mirrors backend data without a clear ownership boundary
- two layers silently translate the same concept in different ways

When you see these signals, stop and clarify the owning contract before continuing.

---

## Decide Where Meaning Lives

A cross-layer change is easier to reason about when each concern has one clear owner.
Ask:

- where is the source of truth for this contract?
- where should request-shape validation happen?
- where should business-rule validation happen?
- where should format conversion happen?
- where should errors be translated for the next layer?

If more than one layer seems to own the same decision, the boundary likely needs tightening.

---

## Before and After Checklists

### Before implementation

- [ ] I mapped the complete flow across layers.
- [ ] I identified every important boundary.
- [ ] I know which spec defines each contract.
- [ ] I know where validation, transformation, and error translation belong.

### After implementation

- [ ] Edge cases such as null, empty, invalid, and partial data were checked.
- [ ] Errors are translated consistently at the intended boundary.
- [ ] Round-trip data keeps the meaning the contract promised.
- [ ] No layer now depends on details it should not know.
