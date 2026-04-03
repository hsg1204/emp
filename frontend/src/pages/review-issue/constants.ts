import type {
  ReviewIssueFollowUpActionType,
  ReviewIssueSeverity,
  ReviewIssueSourceType,
  ReviewIssueStatus,
} from '../../types/review-issue'

export const reviewIssueStatusOptions: Array<{ label: string; value: ReviewIssueStatus }> = [
  { label: '待整改', value: 'open' },
  { label: '整改中', value: 'inProgress' },
  { label: '已解决', value: 'resolved' },
  { label: '已关闭', value: 'closed' },
]

export const reviewIssueSeverityOptions: Array<{ label: string; value: ReviewIssueSeverity }> = [
  { label: '低', value: 'low' },
  { label: '中', value: 'medium' },
  { label: '高', value: 'high' },
  { label: '严重', value: 'critical' },
]

export const reviewIssueSourceTypeOptions: Array<{ label: string; value: ReviewIssueSourceType }> = [
  { label: '演练计划', value: 'drillPlan' },
  { label: '事件复盘', value: 'event' },
]

export const reviewIssueStatusLabelMap: Record<ReviewIssueStatus, string> = {
  open: '待整改',
  inProgress: '整改中',
  resolved: '已解决',
  closed: '已关闭',
}

export const reviewIssueStatusColorMap: Record<ReviewIssueStatus, string> = {
  open: 'warning',
  inProgress: 'processing',
  resolved: 'success',
  closed: 'default',
}

export const reviewIssueSeverityLabelMap: Record<ReviewIssueSeverity, string> = {
  low: '低',
  medium: '中',
  high: '高',
  critical: '严重',
}

export const reviewIssueSeverityColorMap: Record<ReviewIssueSeverity, string> = {
  low: 'default',
  medium: 'gold',
  high: 'orange',
  critical: 'red',
}

export const reviewIssueSourceTypeLabelMap: Record<ReviewIssueSourceType, string> = {
  drillPlan: '演练计划',
  event: '事件复盘',
}

export const reviewIssueFollowUpActionLabelMap: Record<ReviewIssueFollowUpActionType, string> = {
  created: '创建问题',
  assigned: '分派整改',
  tracked: '跟踪推进',
  updated: '更新方案',
  resolved: '完成整改',
  closed: '关闭问题',
}
