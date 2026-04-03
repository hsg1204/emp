# State Management

> Rules for local state, Zustand, and React Query responsibilities.

---

## Overview

Frontend state must be managed by the smallest appropriate layer.
The default boundary is:

- local component state for local UI concerns
- Zustand for cross-page client state
- React Query for server data, caching, and request lifecycle

Keeping these boundaries clear prevents duplicated sources of truth and stale data.

---

## Required Patterns

- Use local React state (`useState` or `useReducer`) for component-local UI state such as
  toggles, modal visibility, tab selection, transient form steps, or draft values that
  do not need to outlive the local screen boundary.
- Use Ant Design Form state for form interaction details when the form stays local to
  the component tree.
- Use Zustand for cross-page client state that is not server cache, such as UI
  preferences, authenticated client flags, wizard progress, or temporary client-owned
  workflow state.
- Use React Query for remote data fetching, caching, background refetching, mutations,
  optimistic updates, and request status.
- Derive UI from React Query results directly whenever possible.
- Promote state upward only when more than one consumer actually needs the shared source.

---

## Boundary Rules

### Local State

Use local component state when:

- the state is only needed inside one component subtree
- the state can reset when the user leaves the screen
- the state mainly affects rendering or interaction within one view

### Zustand

Use Zustand when:

- multiple pages or distant components need the same client-owned state
- the state must survive component unmount within the current session
- the state represents UI coordination rather than remote resource truth

### React Query

Use React Query when:

- data originates from an HTTP API
- loading, error, retry, cache, invalidation, or mutation status matters
- optimistic or background refresh behavior is required
- the same remote data may be reused by multiple consumers

---

## Server Data Rules

- Treat React Query as the source of truth for server cache.
- Keep server-data handling aligned with `.trellis/spec/shared/api-design.md`.
- Normalize or map response data in services or feature hooks when needed, but avoid
  duplicating server cache into another store.
- If a local draft must temporarily diverge from server data, copy only the fields that
  truly become editable client-owned draft state and define the synchronization lifecycle
  explicitly.

---

## Forbidden Patterns

- Do not use Zustand as a generic replacement for React Query.
- Do not copy server cache into Zustand just for convenience.
- Do not keep the same remote list in both React Query and Zustand as parallel sources
  of truth.
- Do not promote page-local state to global state without a real shared-consumer need.
- Do not hide request status inside ad hoc local booleans when React Query already owns
  the lifecycle.
- Do not create global stores for one-off modal, dropdown, or tab state that belongs to
  a single page or component.

---

## Review Checklist

- Is local UI state kept local by default?
- Is Zustand limited to cross-page client-owned state?
- Is React Query the only owner of server cache and request lifecycle state?
- Does the change avoid mirroring remote data into Zustand?
- Are API envelope and pagination assumptions aligned with shared specs?
- Is the chosen state layer the smallest one that fits the requirement?
