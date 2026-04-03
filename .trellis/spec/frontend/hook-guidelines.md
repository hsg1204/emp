# Hook Guidelines

> Rules for reusable React hooks in the frontend application.

---

## Overview

Custom hooks are the default place for reusable request orchestration, derived
behavior, and side-effect handling that would otherwise be duplicated across
components. Hooks must stay focused on behavior, not presentation.

Follow `.trellis/spec/frontend/state-management.md` for state ownership decisions
such as local state versus Zustand versus React Query.

---

## Required Patterns

- Name every custom hook with the `useXxx` convention.
- Keep reusable request logic in hooks instead of repeating `useQuery`, `useMutation`,
  loading state, and error state wiring across components.
- Extract reusable client-side coordination into hooks when multiple consumers share
  the same behavior.
- Keep hook inputs and return values explicitly typed.
- Use `useEffect` only when synchronizing with external systems such as browser APIs,
  subscriptions, timers, event listeners, or imperative libraries.
- Clean up side effects from `useEffect` whenever the effect creates subscriptions,
  timers, listeners, in-flight requests, or other disposable resources.
- Keep hooks small enough that a consumer can understand the contract quickly.
- Prefer hooks to return data, derived flags, and callbacks rather than opaque objects.
- Keep reusable hooks close to the owning service or feature unless they are truly
  shared across the app.

---

## What Belongs in a Hook

- React Query request and mutation orchestration.
- Reusable derived state that depends on React state or query results.
- Shared workflow or form coordination when it is used by more than one component.
- Lifecycle management for subscriptions, timers, event listeners, and abort logic.
- Composition over multiple lower-level hooks when the higher-level behavior is reused.

---

## What Does Not Belong in a Hook

- Pure presentation logic that only chooses markup or class names.
- Static data transforms that can be plain utility functions.
- One-off page logic that is clearer inside the page component itself.
- JSX rendering.
- Store definitions or directory-placement decisions that belong to state-management
  or directory-structure rules.

---

## Side-Effect Rules

- Prefer computed values over `useEffect` when state can be derived during render.
- Prefer React Query for request lifecycle management instead of manual fetch state.
- When side effects create disposable resources, return a cleanup function.
- Keep effect dependencies honest and complete.
- Keep asynchronous cleanup safe by cancelling or ignoring stale work when needed.

---

## Forbidden Patterns

- Do not name custom hooks without the `use` prefix.
- Do not hide pure presentational decisions inside hooks.
- Do not return JSX from hooks.
- Do not call hooks conditionally or inside loops.
- Do not use `useEffect` to mirror props into state without a real synchronization need.
- Do not leave timers, listeners, or subscriptions running after unmount.
- Do not duplicate the same request and error-handling logic across multiple components
  when a shared hook would clarify the behavior.

---

## Review Checklist

- Is the hook named with the `useXxx` pattern?
- Does the hook encapsulate reusable request or behavior orchestration logic?
- Are inputs, outputs, and derived flags typed explicitly?
- Does every necessary side effect clean up correctly?
- Is pure presentation logic left in components or utilities instead of the hook?
- Would consuming components become simpler and clearer by using this hook?
