# Component Design Guide

> **Purpose**: Support component-level planning by clarifying boundaries, composition choices, and reuse decisions before implementation.

---

## Use This Guide When

This guide can help when a task introduces new UI pieces, refactors an existing screen into smaller parts, or raises questions about where logic and presentation should live.
It is intended to guide design thinking rather than impose strict implementation rules.
For executable frontend rules, follow `.trellis/spec/frontend/component-guidelines.md`,
`.trellis/spec/frontend/hook-guidelines.md`, and `.trellis/spec/frontend/state-management.md`.

---

## Prefer One Clear Purpose Per Component

Components are often easier to understand when each one has a single clear purpose.
That purpose might be:

- presenting a specific piece of information
- capturing a focused user interaction
- arranging a small part of a page
- coordinating a clearly bounded UI workflow

When a component starts handling unrelated responsibilities, it is usually a sign that its boundary could be reconsidered.

---

## Think in Boundaries and Composition

Component planning is often clearer when the first question is not how to share code, but where one responsibility ends and another begins.

Useful questions include:

- What should this component own directly?
- What should be delegated to child components?
- Which parts need to be composed together but still remain separate?
- Which pieces are page-specific versus likely to be reused nearby?

A composition-friendly boundary often makes later changes easier than a large component that tries to manage everything itself.

---

## Extract Shared UI After Repetition Becomes Visible

Shared UI is usually most successful when it is extracted after repeated use is clearly visible.

In many cases, it is reasonable to wait until:

- the same UI pattern appears in multiple places
- the repeated structure is stable enough to describe clearly
- the abstraction would simplify usage rather than hide important differences

Extracting too early can produce generic components that are harder to use than the duplicated code they replaced.

---

## Separate Orchestration From Presentation When Practical

When a UI area contains both coordination logic and visual rendering, it is often helpful to separate them when the split is natural.

A practical separation might look like:

- a stateful or orchestration-focused layer that handles data fetching, derived state, or event wiring
- presentational pieces that focus on layout, display, and user-facing structure

This split is not always necessary, but it can help when the view should stay simple while the surrounding workflow grows more complex.

---

## Let Reuse Follow Clarity

Component reuse tends to work best when the reusable part is already understandable on its own.
Before extracting, it can help to ask:

- Is the shared behavior genuinely the same?
- Are the inputs easy to explain?
- Would the extracted component still have one clear purpose?
- Would consumers become simpler, or just more indirect?

If the answers are unclear, keeping the design local a little longer may be the better choice.

---

## Planning Prompts

Before implementation, it may help to check:

- Does each proposed component have one clear purpose?
- Are component boundaries aligned with responsibilities rather than file size?
- Is composition doing the work instead of one large component?
- Has shared UI been extracted only where repeated use is already visible?
- Would separating orchestration and presentational pieces make the design easier to reason about?

If these answers are still fuzzy, refining the component plan first is often useful.
