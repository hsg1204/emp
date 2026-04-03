import type { AuditFields, PublishStatus } from './common'

export interface Scenario extends AuditFields {
  scenarioId: string
  scenarioName: string
  businessSystem: string
  faultObject: string
  scenarioType: string
  impactLevel: string
  disposalDepartment: string
  status: PublishStatus
  currentVersion: string
}

export interface ScenarioRelatedProcess {
  processId: string
  processName: string
  processType: string
  ownerDepartment: string
  status: PublishStatus
  updatedAt: string
}

export interface ScenarioUsageReference {
  referenceId: string
  referenceName: string
  referenceType: string
  description: string
  updatedAt: string
}

export interface ScenarioVersionRecord {
  version: string
  status: PublishStatus
  changeSummary: string
  operator: string
  updatedAt: string
}

export interface ScenarioOperationLog {
  logId: string
  action: string
  operator: string
  detail: string
  occurredAt: string
}

export interface ScenarioDetail extends Scenario {
  scenarioCode: string
  owner: string
  ownerDepartment: string
  summary: string
  disposalGoal: string
  applicableScope: string
  coreImpact: string
  tags: string[]
  collaborationTeams: string[]
  triggerConditions: string[]
  responsePrinciples: string[]
  keyRecoveryActions: string[]
  remarks?: string
  relatedProcesses: ScenarioRelatedProcess[]
  usageReferences: ScenarioUsageReference[]
  versionHistory: ScenarioVersionRecord[]
  operationLogs: ScenarioOperationLog[]
}
