# AI Generation Rules

> Rules and guardrails for AI-authored implementation and documentation changes.

***

## Precedence

- `.trellis/spec/shared/`, `.trellis/spec/frontend/`, and `.trellis/spec/backend/` are the hard-constraint sources for generated changes.
- `.trellis/spec/guides/` is advisory only and supports design thinking, tradeoff evaluation, and implementation planning.
- `docs/specs/` is the richer background source used to derive and justify those standards.
- When both exist, generate work that follows the hard-constraint specs directly and use guides plus `docs/specs/` for deeper context, rationale, and derivation.

***

## Required Patterns

- Follow the approved stack, architecture, and layering rules defined by the shared, frontend, and backend specs.
- Use guide specs only as advisory design support, not as hard-rule sources.
- Reuse existing project utilities, components, services, and patterns before introducing new abstractions.
- Keep generated changes aligned with the documented boundaries between layers and responsibilities.
- Keep changes scoped to the requested outcome instead of expanding into speculative refactors.
- Update Trellis specs when a stable convention is established or clarified through implementation.
- Keep generated code, configuration, tests, and docs consistent with the approved hard-constraint spec set.

***

## Forbidden Patterns

- Do not invent tools, frameworks, platforms, or dependencies outside the approved stack.
- Do not bypass documented layering rules or cross-layer contracts.
- Do not duplicate abstractions when an existing project pattern already covers the need.
- Do not introduce speculative architecture that is not required by the task.
- Do not leave generated output inconsistent with `.trellis/spec/`.

***

## Working Rules

### Source of Truth

- Treat `.trellis/spec/shared/`, `.trellis/spec/frontend/`, and `.trellis/spec/backend/` as the instruction set to execute.
- Treat `.trellis/spec/guides/` as advisory support for design and planning.
- Treat `docs/specs/` as the richer background source that informs future spec refinement.

### Reuse and Scope

- Prefer extension of existing patterns over parallel implementations.
- Add new abstractions only when reuse would make the result less clear or less correct.
- Keep the implementation as small as possible while still meeting the requirement.

### Spec Maintenance

- When implementation reveals a repeatable and approved convention, update the relevant Trellis spec instead of leaving the rule implicit in code alone.
- Do not rewrite specs for unstable experiments or one-off exceptions.

***

## Review Checklist

- Does the generated work follow shared, frontend, and backend specs as the executable standard?
- Are guide specs used only as advisory design support?
- Is `docs/specs/` used only as richer background context?
- Does the change follow the approved stack and layering rules?
- Does the change reuse existing patterns instead of duplicating abstractions?
- Was a Trellis spec updated when a stable convention was established?
- Does the change avoid invented tools or frameworks outside the approved stack?

