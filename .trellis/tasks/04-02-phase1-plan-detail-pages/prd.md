# Phase 1 Plan Detail Pages

## Goal
Implement the plan edit and detail pages for phase 1, following the approved detail-page structure for plans.

## Requirements
- Replace placeholder plan edit and detail pages with usable page implementations.
- Plan detail page should reflect the planned information structure:
  - plan information
  - related scenarios
  - document or attachment area
  - version history
  - operation log
- Plan edit page should present a realistic form structure for phase-1 plan data.
- Keep the work frontend-only with mock data and local page interactions.

## Acceptance Criteria
- [ ] Plan edit page is implemented as a structured form page.
- [ ] Plan detail page is implemented with a clear information architecture matching the PRD.
- [ ] Related scenario and attachment areas are represented in a phase-1 suitable way.
- [ ] The implementation remains aligned with frontend specs and current project structure.
- [ ] `npm run build` passes in `frontend/`.

## Technical Notes
- Development type: frontend
- Keep attachment capability lightweight in phase 1; preview / metadata / action placeholders are acceptable.
- Reuse established list/detail shell patterns where it improves consistency.
