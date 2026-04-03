import type { AuditFields, PublishStatus } from './common'

export interface ProcessDefinition extends AuditFields {
  processId: string
  processName: string
  processType: string
  applicableSystem: string
  status: PublishStatus
}
