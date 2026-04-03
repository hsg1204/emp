import type { AuditFields, BaseOption, PublishStatus } from './common'

export type DrillPlanStatus = PublishStatus | 'running' | 'completed'

export type DrillExecutionStatus = 'pending' | 'inProgress' | 'completed' | 'delayed'

export type DrillReportStatus = 'notStarted' | 'draft' | 'submitted'

export interface DrillPlan extends AuditFields {
  drillPlanId: string
  drillPlanName: string
  businessSystem: string
  drillType: string
  scheduledTime: string
  commander: string
  status: DrillPlanStatus
  relatedScenarioId: string
  relatedScenarioName: string
  relatedPlanId: string
  relatedPlanName: string
  relatedProcessId: string
  relatedProcessName: string
  participantDepartments: string[]
  reportStatus: DrillReportStatus
}

export interface DrillExecutionRecord {
  recordId: string
  stageName: string
  owner: string
  startTime: string
  endTime?: string
  status: DrillExecutionStatus
  summary: string
}

export interface DrillReportInfo {
  status: DrillReportStatus
  reportOwner: string
  lastUpdatedAt: string
  summary: string
  nextActions: string[]
  attachments: string[]
}

export interface DrillOperationLog {
  logId: string
  action: string
  operator: string
  operatedAt: string
  detail: string
}

export interface DrillPlanDetail extends DrillPlan {
  drillScope: string
  drillTargets: string[]
  observationPoints: string[]
  remarks: string
  executionRecords: DrillExecutionRecord[]
  report: DrillReportInfo
  operationLogs: DrillOperationLog[]
}

export interface DrillPlanSummary {
  total: number
  running: number
  completed: number
  pendingReport: number
}

export interface DrillPlanFormOptions {
  businessSystems: BaseOption[]
  drillTypes: BaseOption[]
  scenarios: BaseOption[]
  plans: BaseOption[]
  processes: BaseOption[]
  departments: BaseOption[]
  commanders: BaseOption[]
  reportTemplates: BaseOption[]
}
