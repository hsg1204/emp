# Component Guidelines

> Rules for React components in the frontend application.

---

## Overview

Frontend UI must be built with React 18 function components and TypeScript.
Components should stay readable, typed, and easy to compose.

Ant Design is the default source of enterprise-grade base components such as forms,
tables, inputs, modals, and feedback primitives. Tailwind CSS is the default tool
for layout, spacing, sizing, alignment, and small visual utility rules.

Follow `.trellis/spec/frontend/hook-guidelines.md` for reusable behavior
orchestration and `.trellis/spec/frontend/state-management.md` for state ownership
rules.

---

## Required Patterns

- Use function components only.
- Define props with an explicit TypeScript type or interface.
- Name component files and component symbols in PascalCase.
- Keep each component focused on one clear UI responsibility.
- Use Ant Design as the first choice for common enterprise UI primitives.
- Use Tailwind CSS for layout and utility styling such as spacing, flex/grid,
  width, height, alignment, and responsive adjustments.
- Separate presentation from orchestration.
- Reusable low-level components must remain presentational.
- Keep reusable components focused on rendering props and emitting events.
- Keep orchestration near the page or feature boundary instead of burying it in
  low-level UI.
- Prefer composition over large multi-purpose components.
- Keep accessibility intact when combining Ant Design components with custom markup.

---

## Component Boundaries

### Presentational Components

- Receive typed props and render UI.
- Keep business decisions shallow and visible.
- Prefer stateless rendering or minimal local UI state.
- Stay reusable across pages when the responsibility is stable.
- Must not directly own reusable request orchestration, routing side effects, or
  cross-page workflow coordination.

### Container or Page-Orchestration Components

- Compose hooks, routing state, and event handlers near the page or feature boundary.
- Prepare view models or callbacks for presentational children.
- Pass data and callbacks to reusable children through explicit typed props.
- Keep orchestration readable and close to the screen that owns it.

---

## Styling Rules

- Use Tailwind CSS for structural styling and utility classes.
- Use Ant Design component APIs, tokens, and supported extension points before
  introducing custom overrides.
- Keep custom markup semantic and lightweight around Ant Design primitives.
- Prefer consistent spacing, typography, and layout patterns across pages.
- Keep styling decisions close to the component unless the style is truly shared.

---

## Props and Composition

- Keep props explicit and narrowly typed.
- Prefer descriptive names such as `UserTableProps` or `FilterBarProps`.
- Pass callbacks and data intentionally rather than forwarding large untyped bags
  of values.
- Keep component APIs small enough to understand quickly.
- Extract repeated UI into shared components only after the repeated shape is clear.

---

## Forbidden Patterns

- Do not use class components.
- Do not leave props inferred as `any` or otherwise untyped.
- Do not use Tailwind as a replacement for Ant Design base widgets that already fit
  the need.
- Do not bury reusable request orchestration or cross-page state coordination inside
  low-level presentational components.
- Do not combine unrelated workflows into one large component just to reduce file count.
- Do not introduce style drift without a clear product or accessibility reason.
- Do not break accessibility when wrapping or customizing Ant Design components.

---

## Review Checklist

- Is the component a function component with explicit props typing?
- Does the component use Ant Design for base enterprise widgets where appropriate?
- Does Tailwind handle layout and utility styling rather than ad hoc CSS sprawl?
- Is presentation separated from orchestration, with reusable low-level components
  kept presentational?
- Is the component boundary narrow and reusable enough to understand quickly?
- Does the rendered markup preserve accessibility and predictable behavior?
