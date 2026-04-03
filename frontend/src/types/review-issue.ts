import type { AuditFields } from './common'

export type ReviewIssueStatus = 'open' | 'inProgress' | 'resolved' | 'closed'

export interface ReviewIssue extends AuditFields {
  issueId: string
  issueTitle: string
  sourceType: 'drillPlan' | 'event'
  severity: string
  status: ReviewIssueStatus
}
