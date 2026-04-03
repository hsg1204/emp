import { Tag } from 'antd'
import type { PublishStatus } from '../../../types/common'

interface StatusTagProps {
  status: PublishStatus | string
}

const statusColorMap: Record<string, string> = {
  draft: 'default',
  pendingApproval: 'processing',
  published: 'success',
  deprecated: 'error',
  running: 'processing',
  completed: 'success',
  resolved: 'success',
  cancelled: 'default',
  pending: 'default',
  inProgress: 'processing',
  delayed: 'warning',
  notStarted: 'default',
  submitted: 'success',
}

const statusLabelMap: Record<string, string> = {
  draft: '草稿',
  pendingApproval: '待审批',
  published: '已发布',
  deprecated: '已废止',
  running: '执行中',
  completed: '已完成',
  resolved: '已解除',
  cancelled: '已取消',
  pending: '待开始',
  inProgress: '进行中',
  delayed: '延期',
  notStarted: '未启动',
  submitted: '已提交',
}

function StatusTag({ status }: StatusTagProps) {
  return <Tag color={statusColorMap[status] ?? 'default'}>{statusLabelMap[status] ?? status}</Tag>
}

export default StatusTag
