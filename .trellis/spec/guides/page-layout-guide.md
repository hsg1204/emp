# Page Layout Guide

> **Purpose**: Support page-level planning by making structure, hierarchy, and UI regions easier to reason about before implementation.

---

## Use This Guide When

This guide can help when a task involves a new page, a major page redesign, or a workflow that needs clearer structure.
It is intended to support planning and design decisions rather than define hard rules.

---

## Start With Page-Level Structure

It often helps to sketch the page before thinking about individual components.
At page level, focus first on:

- the primary user goal
- the most important information
- the order in which users should notice and use each section
- what needs to stay visible versus what can appear later

A simple hierarchy is usually easier to scan than a layout where all sections compete for attention.

---

## Prefer Clear, Recognizable Regions

Many pages become easier to understand when they are organized into consistent regions such as:

- **Header** for title, context, and high-level summary
- **Filters** for narrowing or shaping the visible dataset
- **Content** for the main table, list, detail view, or form body
- **Actions** for important next steps or page-level operations
- **Feedback** for status messages, validation, confirmations, or warnings

Not every page needs all of these regions, but naming them during planning can help avoid mixed responsibilities and crowded layouts.

---

## Use Information Hierarchy Deliberately

When deciding what goes where, it can help to ask:

- What should users understand within the first few seconds?
- What task-critical information needs the strongest visual priority?
- Which controls are supporting details rather than primary actions?
- Which content should remain close together because users interpret it as one unit?

In general, pages are easier to use when the most important context appears early and secondary detail does not interrupt the main flow.

---

## Reserve Room for Non-Happy Paths

Page planning usually improves when loading, empty, and error states are considered as part of the layout instead of as late additions.

It is often helpful to leave room for:

- **Loading states** that preserve structure while content is being prepared
- **Empty states** that explain why nothing is shown and what a user can do next
- **Error states** that communicate what failed and whether recovery is possible
- **Inline feedback** where users already look, instead of forcing them to search for it

Thinking about these states early can reduce layout shifts and make the page feel more intentional.

---

## Keep Page Layout Distinct From Component Detail

A page layout should usually answer questions like:

- What regions exist on the page?
- Which region owns the main task?
- How do scanning and action flow move from top to bottom?

Detailed component design can happen after the page-level structure is clear.
This separation often makes planning discussions simpler and reduces premature detail work.

---

## Planning Prompts

Before implementation, it may help to check:

- Is the page structure obvious at a glance?
- Are header, filters, content, actions, and feedback placed where users would expect them?
- Does the hierarchy support the main task rather than compete with it?
- Is there a sensible place for loading, empty, and error states?

If the answer is not yet clear, refining the layout concept first is often worthwhile.
