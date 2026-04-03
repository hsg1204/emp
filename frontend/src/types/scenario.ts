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
