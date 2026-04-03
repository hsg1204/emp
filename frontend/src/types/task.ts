import type { AuditFields } from './common'

export type TaskStatus = 'todo' | 'inProgress' | 'completed' | 'closed'

export type TaskPriority = 'high' | 'medium' | 'low'

export type DashboardNoticeLevel = 'processing' | 'warning' | 'success'

export interface TaskRecord extends AuditFields {
  taskId: string
  title: string
  taskType: string
  sourceModule: string
  businessSystem: string
  currentNode: string
  assignee: string
  priority: TaskPriority
  status: TaskStatus
  dueAt: string
  detailPath: string
  completedAt: string | null
  result: string | null
  durationText: string | null
}

export interface DashboardMetric {
  key: string
  title: string
  value: number
  suffix?: string
  description: string
}

export interface DashboardNotice {
  id: string
  title: string
  description: string
  level: DashboardNoticeLevel
  publishedAt: string
}

export interface DashboardOverviewSection {
  key: string
  title: string
  count: number
  progress: number
  description: string
}

export interface DashboardQuickLink {
  key: string
  title: string
  description: string
  path: string
}

export interface HomeDashboardData {
  metrics: DashboardMetric[]
  notices: DashboardNotice[]
  overviewSections: DashboardOverviewSection[]
  quickLinks: DashboardQuickLink[]
  recentTasks: TaskRecord[]
}
