import { Tag } from 'antd'
import type { PublishStatus } from '../../../types/common'

interface StatusTagProps {
  status: PublishStatus | string
  colorMap?: Record<string, string>
  labelMap?: Record<string, string>
}

const defaultStatusColorMap: Record<string, string> = {
  draft: 'default',
  pendingApproval: 'processing',
  published: 'success',
  deprecated: 'error',
  running: 'processing',
  completed: 'success',
  resolved: 'success',
  cancelled: 'default',
}

const defaultStatusLabelMap: Record<string, string> = {
  draft: '草稿',
  pendingApproval: '待审批',
  published: '已发布',
  deprecated: '已废止',
  running: '执行中',
  completed: '已完成',
  resolved: '已解除',
  cancelled: '已取消',
}

function StatusTag({ status, colorMap, labelMap }: StatusTagProps) {
  const mergedColorMap = colorMap ?? defaultStatusColorMap
  const mergedLabelMap = labelMap ?? defaultStatusLabelMap

  return <Tag color={mergedColorMap[status] ?? 'default'}>{mergedLabelMap[status] ?? status}</Tag>
}

export default StatusTag
