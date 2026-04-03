import type { PageResult } from '../types/common'
import type { ReviewIssue } from '../types/review-issue'

const mockIssues: ReviewIssue[] = [
  {
    issueId: 'issue-001',
    issueTitle: '演练通知链路存在延迟',
    sourceType: 'drillPlan',
    severity: 'medium',
    status: 'open',
    createdBy: 'admin',
    createdAt: '2026-04-02 11:00:00',
    updatedAt: '2026-04-02 11:00:00',
  },
]

export async function getReviewIssuePage(): Promise<PageResult<ReviewIssue>> {
  return Promise.resolve({ items: mockIssues, total: mockIssues.length, page: 1, pageSize: 10 })
}
