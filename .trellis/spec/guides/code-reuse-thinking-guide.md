# Code Reuse Thinking Guide

> **Purpose**: Pause before adding new code so duplication, drift, and premature abstraction are less likely.

---

## Use This Guide When

Use this guide when you are about to add a helper, extract a shared module,
repeat a pattern across files, or decide whether similar code should stay local.

This guide is advisory. For executable placement and boundary rules, follow the
relevant shared, frontend, or backend specifications.

---

## Start With Discovery

Before creating a new abstraction, it helps to check:

- does similar code or a similar contract already exist?
- is the repeated part actually the same behavior, or only superficially similar?
- would extending an existing module be clearer than adding a new one?
- is this duplication local and temporary, or already spreading across the codebase?

If the answers are still unclear, search the codebase first and review nearby
patterns before writing new code.

---

## Prefer One Source of Truth

Reuse usually works best when one place clearly owns the behavior, constant,
or contract.

Helpful prompts:

- If this logic changes later, where would people expect to update it?
- If two copies drift, which one would downstream code trust?
- Is the shared part stable enough to name and explain clearly?

When ownership is fuzzy, duplicating or extracting too early often creates more
confusion than clarity.

---

## Common Duplication Signals

Consider a reuse decision when you notice any of these:

- the same logic is being copied into multiple files
- the same constant or mapping appears in more than one place
- a new component, hook, or service is mostly a renamed version of an existing one
- batch edits require making the same change repeatedly across similar modules

These signals do not automatically require abstraction, but they are good points
to stop and check whether a shared source of truth would reduce drift.

---

## When Reuse Usually Helps

Reuse is often worth it when:

- the same behavior appears in multiple places and means the same thing
- the shared logic is bug-prone enough that drift would be costly
- consumers become simpler when the shared unit exists
- the shared boundary can be explained in one or two sentences

Reuse is often premature when:

- the code is only used once
- the commonality is still unstable or speculative
- the abstraction would need too many conditionals, variants, or flags
- the extracted API is harder to understand than the duplicated code

---

## Batch-Change Thinking Prompts

When similar edits were made across several files, check:

- Did all instances follow the same intended rule?
- Is there still a missed copy elsewhere?
- Should the repeated mechanism be centralized before the next change?
- Would a regression test help prove that parallel mechanisms stay aligned?

---

## Checklist Before Commit

- [ ] I checked whether similar code or contracts already exist.
- [ ] I know which module should own this behavior if it needs to change later.
- [ ] I did not introduce copy-pasted logic that should clearly share one source of truth.
- [ ] I did not extract a reusable abstraction before its boundary became clear.
- [ ] If multiple mechanisms must stay aligned, I considered a regression check or stronger shared ownership.
