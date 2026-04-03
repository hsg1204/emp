import type { AuditFields, PublishStatus } from './common'

export interface Plan extends AuditFields {
  planId: string
  planName: string
  businessSystem: string
  systemLevel: string
  relatedScenarioIds: string[]
  status: PublishStatus
  currentVersion: string
}
