import type { AuditFields } from './common'

export type SystemConfigStatus = 'enabled' | 'disabled'
export type AnnouncementStatus = 'draft' | 'published' | 'expired'
export type OperationLogResult = 'success' | 'failed'

export interface EmergencyTeam extends AuditFields {
  teamId: string
  teamName: string
  businessSystem: string
  responseLevel: string
  leaderName: string
  dutyPhone: string
  memberCount: number
  dutyScope: string
  status: SystemConfigStatus
}

export interface OrganizationMember {
  memberId: string
  teamId: string
  teamName: string
  businessSystem: string
  memberName: string
  roleName: string
  department: string
  contactPhone: string
  notificationChannel: string
  onDuty: boolean
  updatedAt: string
}

export interface OrganizationSummary {
  totalTeams: number
  totalMembers: number
  onDutyMembers: number
  linkedSystems: number
}

export interface OrganizationPageData {
  summary: OrganizationSummary
  teams: EmergencyTeam[]
  keyMembers: OrganizationMember[]
}

export interface ReportingStrategy extends AuditFields {
  strategyId: string
  strategyName: string
  businessSystem: string
  triggerLevel: string
  targetType: string
  responseLimitMinutes: number
  escalationLimitMinutes: number
  notifyChannel: string
  status: SystemConfigStatus
  description: string
}

export interface ReportingStrategyFormValues {
  strategyName: string
  businessSystem: string
  triggerLevel: string
  targetType: string
  responseLimitMinutes: number
  escalationLimitMinutes: number
  notifyChannel: string
  status: SystemConfigStatus
  description: string
}

export interface PushStrategy extends AuditFields {
  pushStrategyId: string
  strategyName: string
  businessSystem: string
  triggerAction: string
  targetScope: string
  pushChannel: string
  templateName: string
  status: SystemConfigStatus
  description: string
}

export interface PushStrategyFormValues {
  strategyName: string
  businessSystem: string
  triggerAction: string
  targetScope: string
  pushChannel: string
  templateName: string
  status: SystemConfigStatus
  description: string
}

export interface FixedGroup extends AuditFields {
  fixedGroupId: string
  fixedGroupName: string
  businessSystem: string
  groupType: string
  channelType: string
  memberCount: number
  ownerName: string
  memberNames: string
  status: SystemConfigStatus
  description: string
}

export interface FixedGroupFormValues {
  fixedGroupName: string
  businessSystem: string
  groupType: string
  channelType: string
  ownerName: string
  memberNames: string
  status: SystemConfigStatus
  description: string
}

export interface Announcement extends AuditFields {
  announcementId: string
  title: string
  audience: string
  publishWindow: string
  topPinned: boolean
  status: AnnouncementStatus
  summary: string
  content: string
}

export interface AnnouncementFormValues {
  title: string
  audience: string
  publishStart: string
  publishEnd: string
  topPinned: boolean
  status: AnnouncementStatus
  summary: string
  content: string
}

export interface OperationLog {
  logId: string
  operatedAt: string
  operatorName: string
  operatorDepartment: string
  moduleName: string
  actionName: string
  targetName: string
  result: OperationLogResult
  clientIp: string
}
