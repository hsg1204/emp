import type { AuditFields, PublishStatus } from './common'

export type DrillPlanStatus = PublishStatus | 'running' | 'completed'

export interface DrillPlan extends AuditFields {
  drillPlanId: string
  drillPlanName: string
  businessSystem: string
  scheduledTime: string
  status: DrillPlanStatus
}
