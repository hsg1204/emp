import type { AuditFields } from './common'

export type EventStatus = 'new' | 'pendingResponse' | 'inProgress' | 'resolved' | 'cancelled'

export type EventLevel = 'P1' | 'P2' | 'P3' | 'P4'

export type EventSource = 'monitoring' | 'manualReport' | 'serviceDesk' | 'inspection'

export type EventProgressStatus = 'pending' | 'processing' | 'completed'

export type EventDisposalStatus = 'processing' | 'completed'

export type EventOperationType = 'system' | 'coordination' | 'response' | 'record'

export interface EventRecord extends AuditFields {
  eventId: string
  eventCode: string
  eventTitle: string
  businessSystem: string
  eventLevel: EventLevel
  incidentTime: string
  status: EventStatus
  source: EventSource
  emergencyCommander: string
  currentPhase: string
}

export interface EventProgressItem {
  progressId: string
  title: string
  owner: string
  status: EventProgressStatus
  timestamp: string
  description: string
}

export interface EventDisposalRecord {
  recordId: string
  step: string
  owner: string
  result: string
  nextAction: string
  timestamp: string
  status: EventDisposalStatus
}

export interface EventOperationLog {
  logId: string
  operator: string
  action: string
  detail: string
  timestamp: string
  type: EventOperationType
}

export interface EventDetail extends EventRecord {
  reportChannel: string
  incidentCategory: string
  occurrenceLocation: string
  summary: string
  businessImpact: string
  impactScope: string
  responseOwner: string
  collaborationGroup: string
  latestConclusion: string
  disposalSuggestion: string
  planName: string
  relatedProcess: string
  tags: string[]
  progress: EventProgressItem[]
  disposalRecords: EventDisposalRecord[]
  operationLogs: EventOperationLog[]
}
