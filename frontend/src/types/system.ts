export interface Organization {
  organizationId: string
  organizationName: string
  businessSystem: string
}

export interface ReportingStrategy {
  strategyId: string
  strategyName: string
  businessSystem: string
}

export interface PushStrategy {
  pushStrategyId: string
  strategyName: string
  triggerAction: string
}

export interface FixedGroup {
  fixedGroupId: string
  fixedGroupName: string
  businessSystem: string
}
