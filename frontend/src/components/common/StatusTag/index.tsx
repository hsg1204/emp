import { Tag } from 'antd'
import type { PublishStatus } from '../../../types/common'
import type { DrillPlanStatus } from '../../../types/drill-plan'
import type { EventDisposalStatus, EventProgressStatus, EventStatus } from '../../../types/event'

type StatusTagValue = PublishStatus | DrillPlanStatus | EventStatus | EventProgressStatus | EventDisposalStatus

interface StatusTagProps {
  status: StatusTagValue | string
  colorMap?: Record<string, string>
  labelMap?: Record<string, string>
}

const defaultStatusColorMap: Record<string, string> = {
  draft: 'default',
  pendingApproval: 'processing',
  published: 'success',
  deprecated: 'error',
  new: 'default',
  pendingResponse: 'warning',
  inProgress: 'processing',
  pending: 'default',
  processing: 'processing',
  running: 'processing',
  completed: 'success',
  resolved: 'success',
  cancelled: 'default',
  delayed: 'warning',
  notStarted: 'default',
  submitted: 'success',
}

const defaultStatusLabelMap: Record<string, string> = {
  draft: '草稿',
  pendingApproval: '待审批',
  published: '已发布',
  deprecated: '已废止',
  new: '待受理',
  pendingResponse: '待响应',
  inProgress: '处理中',
  pending: '待处理',
  processing: '处理中',
  running: '执行中',
  completed: '已完成',
  resolved: '已解除',
  cancelled: '已取消',
  delayed: '延期',
  notStarted: '未启动',
  submitted: '已提交',
}

function StatusTag({ status, colorMap, labelMap }: StatusTagProps) {
  const mergedColorMap = colorMap ?? defaultStatusColorMap
  const mergedLabelMap = labelMap ?? defaultStatusLabelMap

  return <Tag color={mergedColorMap[status] ?? 'default'}>{mergedLabelMap[status] ?? status}</Tag>
}

export default StatusTag
