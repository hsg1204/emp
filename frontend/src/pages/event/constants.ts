import type {
  EventDisposalStatus,
  EventLevel,
  EventOperationType,
  EventProgressStatus,
  EventSource,
  EventStatus,
} from '../../types/event'

export const eventStatusOptions: Array<{ label: string; value: EventStatus }> = [
  { label: '待受理', value: 'new' },
  { label: '待响应', value: 'pendingResponse' },
  { label: '处置中', value: 'inProgress' },
  { label: '已解除', value: 'resolved' },
  { label: '已取消', value: 'cancelled' },
]

export const eventLevelOptions: Array<{ label: string; value: EventLevel }> = [
  { label: 'P1', value: 'P1' },
  { label: 'P2', value: 'P2' },
  { label: 'P3', value: 'P3' },
  { label: 'P4', value: 'P4' },
]

export const eventSourceOptions: Array<{ label: string; value: EventSource }> = [
  { label: '监控告警', value: 'monitoring' },
  { label: '人工上报', value: 'manualReport' },
  { label: '客服工单', value: 'serviceDesk' },
  { label: '巡检发现', value: 'inspection' },
]

export const progressStatusLabelMap: Record<EventProgressStatus, string> = {
  pending: '待处理',
  processing: '处理中',
  completed: '已完成',
}

export const disposalStatusLabelMap: Record<EventDisposalStatus, string> = {
  processing: '处理中',
  completed: '已完成',
}

export const operationTypeLabelMap: Record<EventOperationType, string> = {
  system: '系统动作',
  coordination: '协同动作',
  response: '响应动作',
  record: '记录更新',
}

export const eventSourceLabelMap: Record<EventSource, string> = {
  monitoring: '监控告警',
  manualReport: '人工上报',
  serviceDesk: '客服工单',
  inspection: '巡检发现',
}

export const eventLevelColorMap: Record<EventLevel, string> = {
  P1: 'red',
  P2: 'orange',
  P3: 'gold',
  P4: 'blue',
}
