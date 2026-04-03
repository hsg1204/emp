# Phase 1 Process Management Pages

## Goal
Implement the phase-1 process management pages, starting with a real process list page and extending the edit/detail pages beyond placeholders when practical.

## Requirements
- Replace the process list placeholder with a usable list page.
- Follow the same interaction pattern used for scenario and plan list pages.
- Improve process edit and detail pages so they better reflect the approved phase-1 information architecture.
- Keep the implementation frontend-only with mock data.
- Preserve consistency with existing layout and navigation.

## Acceptance Criteria
- [ ] Process list page supports a realistic management-table experience.
- [ ] Process edit page is more than a placeholder and reflects process configuration intent.
- [ ] Process detail page reflects the planned detail structure such as information, flow preview, and log areas.
- [ ] The implementation follows frontend specs and existing page patterns.
- [ ] `npm run build` passes in `frontend/`.

## Technical Notes
- Development type: frontend
- Reuse common components where appropriate, but do not over-abstract.
- Keep flow preview lightweight; no full workflow editor is required in phase 1.
