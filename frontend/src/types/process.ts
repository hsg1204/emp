import type { AuditFields, PublishStatus } from './common'

export type ProcessNodeType = 'start' | 'manual' | 'decision' | 'notification' | 'finish'

export interface ProcessFlowNode {
  nodeId: string
  nodeName: string
  nodeType: ProcessNodeType
  ownerRole: string
  slaMinutes: number
  output: string
}

export interface ProcessOperationLog {
  logId: string
  action: string
  operator: string
  result: string
  remark: string
  timestamp: string
}

export interface ProcessDefinition extends AuditFields {
  processId: string
  processName: string
  processType: string
  applicableSystem: string
  ownerDepartment: string
  relatedScenarioCount: number
  nodeCount: number
  status: PublishStatus
  currentVersion: string
}

export interface ProcessDetail extends ProcessDefinition {
  description: string
  triggerCondition: string
  exceptionStrategy: string
  approvalPolicy: string
  relatedScenarioNames: string[]
  relatedPlanNames: string[]
  tags: string[]
  flowNodes: ProcessFlowNode[]
  operationLogs: ProcessOperationLog[]
  lastPublishedAt?: string
}
