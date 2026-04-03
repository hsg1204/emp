import type { AuditFields, PublishStatus } from './common'

export interface PlanAttachment {
  attachmentId: string
  fileName: string
  fileType: string
  fileSize: string
  uploadedBy: string
  uploadedAt: string
  description?: string
}

export interface PlanVersionRecord {
  version: string
  status: PublishStatus
  changedBy: string
  changedAt: string
  summary: string
}

export interface PlanOperationLog {
  logId: string
  action: string
  operator: string
  operatedAt: string
  result: string
  detail: string
}

export interface Plan extends AuditFields {
  planId: string
  planCode: string
  planName: string
  businessSystem: string
  systemLevel: string
  planType: string
  incidentLevel: string
  disposalDepartment: string
  relatedScenarioIds: string[]
  status: PublishStatus
  currentVersion: string
  planObjectives: string
  applicableScope: string
  activationConditions: string
  disposalPrinciples: string
  emergencyActions: string
  recoveryMeasures: string
  reportingRequirements: string
  attachmentList: PlanAttachment[]
  versionHistory: PlanVersionRecord[]
  operationLogs: PlanOperationLog[]
}
