import type { AuditFields } from './common'

export type ReviewIssueStatus = 'open' | 'inProgress' | 'resolved' | 'closed'
export type ReviewIssueSourceType = 'drillPlan' | 'event'
export type ReviewIssueSeverity = 'low' | 'medium' | 'high' | 'critical'
export type ReviewIssueFollowUpActionType =
  | 'created'
  | 'assigned'
  | 'tracked'
  | 'updated'
  | 'resolved'
  | 'closed'

export interface ReviewIssueSourceLink {
  sourceId: string
  sourceType: ReviewIssueSourceType
  sourceName: string
  sourceCode: string
  summary: string
}

export interface ReviewIssueFollowUpRecord {
  recordId: string
  actionType: ReviewIssueFollowUpActionType
  content: string
  operator: string
  operatedAt: string
}

export interface ReviewIssue extends AuditFields {
  issueId: string
  issueCode: string
  issueTitle: string
  sourceType: ReviewIssueSourceType
  severity: ReviewIssueSeverity
  status: ReviewIssueStatus
  ownerName: string
  ownerDepartment: string
  dueDate: string
  discoveredAt: string
  issueCategory: string
  impactScope: string
  issueDescription: string
  correctiveAction: string
  sourceLink: ReviewIssueSourceLink
  followUpRecords: ReviewIssueFollowUpRecord[]
}

export interface ReviewIssuePageParams {
  keyword?: string
  status?: ReviewIssueStatus
  sourceType?: ReviewIssueSourceType
  severity?: ReviewIssueSeverity
}

export interface ReviewIssueFormValues {
  issueTitle: string
  issueCategory: string
  sourceType: ReviewIssueSourceType
  sourceId: string
  severity: ReviewIssueSeverity
  ownerName: string
  ownerDepartment: string
  discoveredAt: string
  dueDate: string
  issueDescription: string
  impactScope: string
  correctiveAction: string
  status: ReviewIssueStatus
}
