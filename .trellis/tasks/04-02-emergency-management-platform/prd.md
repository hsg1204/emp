# Emergency Management Platform

## Goal
Build the emergency management platform for the integrated operations project based on the requirement workbook and referenced UI screens.

## Delivery Mode Confirmed
- Phase 1 output should start with scope decomposition and prioritization, rather than direct implementation.
- After scope is confirmed, the likely next step is interactive frontend pages for the selected phase-1 modules.

## Phase 1 Scope Direction Confirmed
- The project should follow the "product skeleton first" approach.
- Phase 1 should prioritize the platform backbone rather than a narrow emergency-only workflow.

### Recommended Phase 1 Modules
- Dashboard / Home
- My Tasks / Approval center
- Emergency Management
  - Scenario Management
  - Plan Management
  - Process Management
- Drill Center
  - Emergency Drill Plan
- Emergency Center
  - Event Management
- Review Improvement
- System Management (minimum support set)
  - Emergency Organization
  - Reporting Strategy
  - Push Strategy
  - Fixed Group Management
  - Announcement Feed
  - Operation Log

### Deferred to Later Phases
- Disaster Recovery Management full suite
- DR Drill Plan
- Annual auto scheduling
- Mobile emergency
- Plugin management
- Full ITSM integration
- Real external collaboration integrations
- Advanced workflow plugin nodes
- Large-screen / cockpit enhancements

### Proposed Core Phase 1 Flow
- Scenario Management -> Plan Management -> Process Management -> Emergency Drill Plan -> Event Management -> Review Improvement

## Acceptance Criteria (Draft)
- [ ] Scope for the first delivery is explicitly defined.
- [ ] Priority modules for implementation are explicitly defined.
- [ ] Expected delivery form is clarified (prototype, frontend pages, integrated app, etc.).
- [ ] Core business flow for the first phase is confirmed.
- [ ] Relevant code modules and project conventions are mapped before implementation.

## Phase 1 Page Inventory (Draft)

### P0 Pages

#### 1. Dashboard / Home
- Home dashboard page
  - Pending statistics cards
  - Drill calendar panel
  - Announcement panel
  - Base statistics charts / summary cards

#### 2. My Tasks
- My tasks list page
- Task detail / approval drawer or page
- History tasks list page

#### 3. Scenario Management
- Scenario list page
- Scenario create page
- Scenario edit page
- Scenario detail page
- Scenario version history page
- Scenario operation log page

#### 4. Plan Management
- Plan list page
- Plan create page
- Plan edit page
- Plan detail page
- Plan version history page
- Plan operation log page

#### 5. Process Management
- Process list page
- Process create page
- Process edit page
- Process detail page

### P1 Pages

#### 6. Emergency Drill Plan
- Drill plan list page
- Drill plan create page
- Drill plan edit page
- Drill plan detail page
- Drill report view / download page or drawer
- Drill operation log page

#### 7. Event Management
- Event list page
- Event edit page
- Event detail page
- Emergency start / response dialog
- Event operation log page

#### 8. Review Improvement
- Review issue list page
- Review issue create page
- Review issue edit / detail page

### P2 Pages

#### 9. System Management
- Emergency organization page
- Reporting strategy list page
- Reporting strategy create / edit page
- Push strategy list page
- Push strategy create / edit page
- Fixed group list page
- Fixed group create / edit page
- Announcement list page
- Announcement create / edit page
- System operation log page

## Phase 1 Navigation Structure (Draft)

### Left Navigation Groups
1. Home
2. My Tasks
3. Emergency Management
4. Drill Center
5. Emergency Center
6. Review Improvement
7. System Management

### Group Details

#### 1. Home
- Dashboard

#### 2. My Tasks
- My Tasks
- History Tasks

#### 3. Emergency Management
- Scenario Management
- Plan Management
- Process Management

#### 4. Drill Center
- Emergency Drill Plan

#### 5. Emergency Center
- Event Management

#### 6. Review Improvement
- Review Issues

#### 7. System Management
- Emergency Organization
- Reporting Strategy
- Push Strategy
- Fixed Group Management
- Announcement Management
- Operation Log

## Navigation and Page Hierarchy Principles
- Keep left navigation shallow in phase 1: only one visible level under each module group.
- Core entity navigation should land on list pages first.
- Create/edit pages should be entered from list pages.
- Detail pages should be entered from list pages.
- Version history and operation log should preferably be tabs or secondary views inside detail pages.
- Approval should not occupy a standalone left navigation item; it should route through My Tasks and entity detail actions.
- Emergency start / response should remain a dialog or drawer launched from Event Management, not a separate navigation node.
- Drill report should remain attached to Emergency Drill Plan detail rather than top-level navigation.

## Recommended Compressed View Strategy
- Merge create and edit into one page per entity.
- Move version history into detail tabs.
- Move operation log into detail tabs when applicable.
- Use dialogs/drawers for:
  - approval actions
  - emergency start / response
  - quick report preview
- Keep phase 1 total visible navigation items compact and predictable.## Detail Page Tab Structure (Draft)

### 1. Scenario Detail
Recommended tabs:
- Basic Information
- Related Processes / Usage Reference
- Version History
- Operation Log

Notes:
- Keep the first tab focused on scenario definition, impact scope, responsible department, and linked process summary.
- If process linkage is lightweight in phase 1, the second tab can be rendered as a simple relation list.

### 2. Plan Detail
Recommended tabs:
- Plan Information
- Related Scenarios
- Document / Attachment
- Version History
- Operation Log

Notes:
- This is one of the most important detail pages and should carry the strongest business semantics.
- Document preview/download may also be embedded in the Plan Information tab if phase 1 needs further compression.

### 3. Process Detail
Recommended tabs:
- Process Information
- Flow Preview
- Operation Log

Notes:
- Version history can be deferred for process management in phase 1 if implementation cost is high.
- Flow Preview can initially be a static or semi-interactive visual block rather than a full editor.

### 4. Emergency Drill Plan Detail
Recommended tabs:
- Plan Information
- Execution Records
- Drill Report
- Operation Log

Notes:
- Drill Report should remain part of the detail experience instead of becoming a separate navigation item.
- Execution records can be a list/table with status, operator, time, and result.

### 5. Event Detail
Recommended tabs:
- Event Information
- Emergency Progress
- Disposal Records
- Operation Log

Notes:
- This page should absorb the lightweight phase-1 version of the emergency workspace.
- Emergency start / response actions should be triggered by buttons or dialogs on top of the detail page.

### 6. Review Issue Detail
Recommended sections or tabs:
- Issue Information
- Related Source (drill / event)
- Follow-up / Resolution Record

Notes:
- Review issues can be lighter than other entities and may not require a multi-tab layout if phase 1 wants to stay compact.

## Detail Page Common Header Pattern
- Entity title + status
- Key metadata row (owner, creator, update time, version, related business system)
- Primary actions on the right:
  - edit
  - submit for approval
  - publish / withdraw / deprecate
  - view history
  - view log

## Core Entity Inventory (Draft)

### 1. Scenario
Purpose:
- Define emergency scenarios as the core fault / incident abstraction for plans, processes, drills, and event handling.

Suggested key fields:
- scenarioId
- scenarioName
- businessSystem
- faultObject
- scenarioType
- impactLevel
- impactDescription
- disposalDepartment
- linkedEmergencyProcessId
- linkedDisposalProcessId
- status
- currentVersion
- owner
- createdBy
- createdAt
- updatedAt

Suggested status set:
- draft
- pendingApproval
- published
- deprecated

Relationships:
- one scenario can be linked to many plans
- one scenario can be linked to many drill plans
- one scenario can reference one or more processes

### 2. Plan
Purpose:
- Define emergency plans around business systems and related scenarios.

Suggested key fields:
- planId
- planName
- businessSystem
- systemLevel
- planType
- relatedScenarioIds
- planDocument
- status
- approvalType
- currentVersion
- owner
- createdBy
- createdAt
- updatedAt

Suggested status set:
- draft
- pendingApproval
- published
- deprecated

Relationships:
- one plan can relate to many scenarios
- one plan can be used by many drill plans

### 3. Process
Purpose:
- Describe emergency investigation / disposal flow definitions.

Suggested key fields:
- processId
- processName
- processType
- applicableSystem
- linkedScenarioIds
- flowDefinitionSummary
- status
- owner
- createdBy
- createdAt
- updatedAt

Suggested status set:
- draft
- pendingApproval
- published
- deprecated

Relationships:
- one process can be referenced by many scenarios
- one process can be executed by many drill plans or events

### 4. Emergency Drill Plan
Purpose:
- Organize executable drill plans around scenarios / plans / processes.

Suggested key fields:
- drillPlanId
- drillPlanName
- drillType
- businessSystem
- relatedScenarioIds
- relatedPlanIds
- relatedProcessIds
- scheduledTime
- executionMode
- status
- reportFile
- owner
- createdBy
- createdAt
- updatedAt

Suggested status set:
- draft
- pendingApproval
- published
- running
- completed
- deprecated

Relationships:
- one drill plan can contain many scenarios
- one drill plan can reference many plans and processes
- one drill plan can produce one or more execution records and one report

### 5. Event
Purpose:
- Represent live emergency events and carry the lightweight emergency workspace in phase 1.

Suggested key fields:
- eventId
- eventTitle
- eventSource
- businessSystem
- eventLevel
- incidentTime
- impactScope
- eventDescription
- relatedScenarioId
- relatedPlanId
- relatedProcessId
- responseStatus
- disposalStatus
- closeStatus
- status
- owner
- createdBy
- createdAt
- updatedAt

Suggested status set:
- new
- pendingResponse
- inProgress
- resolved
- cancelled

Relationships:
- one event can reference one scenario, one plan, and one primary process in phase 1
- one event can produce many disposal records
- one event can produce review issues

### 6. Review Issue
Purpose:
- Capture issues found during drill execution or live event handling and support closure tracking.

Suggested key fields:
- issueId
- issueTitle
- sourceType
- sourceId
- severity
- issueDescription
- rectificationOwner
- deadline
- status
- createdBy
- createdAt
- updatedAt

Suggested status set:
- open
- inProgress
- resolved
- closed

Relationships:
- one review issue belongs to one source (drill plan or event)
- one source can generate many review issues

### 7. Emergency Organization
Purpose:
- Maintain emergency response groups and member relationships.

Suggested key fields:
- organizationId
- organizationName
- businessSystem
- groupType
- memberList
- leader
- contactChannel
- status

### 8. Reporting Strategy
Purpose:
- Define escalation rules for emergency reporting.

Suggested key fields:
- strategyId
- strategyName
- businessSystem
- triggerType
- responseTimeout
- disposalTimeout
- escalationLevel
- notifyTargets
- status

### 9. Push Strategy
Purpose:
- Define emergency information push rules.

Suggested key fields:
- pushStrategyId
- strategyName
- triggerAction
- pushContentTemplate
- pushTargetType
- pushTarget
- status

### 10. Fixed Group
Purpose:
- Maintain mappings between business systems and fixed emergency groups.

Suggested key fields:
- fixedGroupId
- fixedGroupName
- businessSystem
- groupIdentifier
- groupMembers
- status

## Cross-Entity Shared Fields Recommendation
For core entities, try to keep these shared fields consistent:
- id
- name / title
- businessSystem
- status
- owner
- createdBy
- createdAt
- updatedAt
- currentVersion (when versioned)

## Cross-Entity Shared State Principles
- Approval-driven entities should use a unified publication lifecycle:
  - draft
  - pendingApproval
  - published
  - deprecated
- Execution-driven entities may extend with runtime states:
  - running
  - completed
  - resolved
  - cancelled

## Key Relationship Model (Phase 1)
- Scenario is the base object.
- Plan references Scenario.
- Process references Scenario.
- Emergency Drill Plan references Scenario + Plan + Process.
- Event references Scenario + Plan + Process.
- Review Issue references Drill Plan or Event.

## Phase 1 Business Flow Inventory (Draft)

### Flow A: Scenario Lifecycle
1. User enters Scenario Management list.
2. User creates a scenario in draft state.
3. User edits and completes scenario information.
4. User submits scenario for approval.
5. Approver handles the task from My Tasks.
6. Approved scenario becomes published.
7. User can later update, republish, or deprecate the scenario.
8. Version history and operation log remain visible from detail.

Primary states:
- draft -> pendingApproval -> published -> deprecated

### Flow B: Plan Lifecycle
1. User enters Plan Management list.
2. User creates a plan and links one or more scenarios.
3. User uploads or references plan document / attachment.
4. User submits the plan for approval.
5. Approver handles the task from My Tasks.
6. Approved plan becomes published.
7. User can later update, withdraw, or deprecate the plan.
8. Version history and operation log remain visible from detail.

Primary states:
- draft -> pendingApproval -> published -> deprecated

### Flow C: Process Lifecycle
1. User enters Process Management list.
2. User creates a process in draft state.
3. User configures process summary / preview structure.
4. User submits the process for approval.
5. Approver handles the task from My Tasks.
6. Approved process becomes published.
7. User can later update or deprecate the process.

Primary states:
- draft -> pendingApproval -> published -> deprecated

### Flow D: Emergency Drill Plan Lifecycle
1. User enters Emergency Drill Plan list.
2. User creates a drill plan by selecting scenario(s), plan(s), and process(es).
3. User sets execution mode and scheduled time.
4. User submits the drill plan for approval.
5. Approver handles the task from My Tasks.
6. Approved drill plan becomes published.
7. User starts execution manually or waits for scheduled execution.
8. Execution records are generated.
9. Drill report is generated / attached.
10. Related review issues may be created after execution.

Primary states:
- draft -> pendingApproval -> published -> running -> completed

### Flow E: Event Handling Lifecycle
1. User enters Event Management list or receives an event from an external source / manual creation.
2. Event is created in new or pendingResponse status.
3. User opens event detail and chooses response action:
   - start emergency
   - ignore / cancel
4. Once emergency starts, the event moves into inProgress.
5. User records disposal actions / progress updates.
6. User may trigger escalation / collaboration actions via dialog-level controls.
7. User resolves the event.
8. User may create review issues from the event detail page.

Primary states:
- new -> pendingResponse -> inProgress -> resolved / cancelled

### Flow F: Review Improvement Lifecycle
1. User enters Review Issue list.
2. User creates a review issue from either:
   - emergency drill plan detail
   - event detail
3. User assigns rectification owner and deadline.
4. User updates handling progress.
5. User marks issue as resolved.
6. User closes the issue after verification.

Primary states:
- open -> inProgress -> resolved -> closed

## Phase 1 Cross-Module Flow Chain
Recommended demo chain:
1. Create Scenario
2. Create Plan and link Scenario
3. Create Process and link Scenario
4. Create Emergency Drill Plan using Scenario + Plan + Process
5. Execute / complete Drill Plan and generate Report
6. Create Event and reference Scenario + Plan + Process
7. Record disposal and resolve Event
8. Create Review Issue from Drill or Event
9. Track Review Issue to closure

## My Tasks / Approval Flow
Unified approval entry:
- All approval-driven entities submit tasks into My Tasks.
- Approver opens My Tasks list.
- Approver enters task detail drawer / page.
- Approver performs approve / reject action.
- Entity detail page reflects the latest approval result.

Applies to:
- Scenario
- Plan
- Process
- Emergency Drill Plan

## Recommended Phase 1 Action Set by Entity
- Scenario: create, edit, submit, approve, publish, deprecate
- Plan: create, edit, submit, approve, publish, withdraw, deprecate
- Process: create, edit, submit, approve, publish, deprecate
- Drill Plan: create, edit, submit, approve, publish, execute, complete, view report
- Event: create, respond, start emergency, update progress, resolve, cancel
- Review Issue: create, assign, update, resolve, close

## Phase 1 Simplification Rules for Flows
- Reject path can return the entity to draft.
- Publish and approval can be represented as one simplified transition after approval if needed.
- Ignore / cancel event can be a lightweight branch without full workflow support.
- Execution history can be stored as simple timeline/table records in phase 1.


