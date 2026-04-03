import type { PageResult } from '../types/common'
import type {
  EventDetail,
  EventLevel,
  EventRecord,
  EventSource,
  EventStatus,
} from '../types/event'

export interface EventPageParams {
  keyword?: string
  status?: EventStatus
  level?: EventLevel
  source?: EventSource
}

const mockEventDetails: EventDetail[] = [
  {
    eventId: 'event-001',
    eventCode: 'EVT-20260402-001',
    eventTitle: '交易系统服务降级事件',
    businessSystem: '交易系统',
    eventLevel: 'P1',
    incidentTime: '2026-04-02 09:30:00',
    status: 'inProgress',
    source: 'monitoring',
    emergencyCommander: '李晨',
    currentPhase: '应急处置中',
    reportChannel: '监控中心自动上报',
    incidentCategory: '应用性能异常',
    occurrenceLocation: '核心交易集群 A 区',
    summary: '核心交易链路响应时间持续升高，部分订单提交失败。',
    businessImpact: '客户下单成功率下降，盘中交易体验明显受损。',
    impactScope: '证券交易、委托下单、订单查询',
    responseOwner: '交易运维组',
    collaborationGroup: '交易系统应急协同群',
    latestConclusion: '已完成主节点扩容与限流调整，成功率恢复至 96%，持续观察中。',
    disposalSuggestion: '继续盯盘 30 分钟，并安排应用侧复盘性能瓶颈。',
    planName: '核心交易系统应急预案',
    relatedProcess: '交易链路性能异常处置流程',
    tags: ['交易核心', '高优先级', '盘中事件'],
    progress: [
      {
        progressId: 'progress-001-1',
        title: '成立应急响应小组',
        owner: '李晨',
        status: 'completed',
        timestamp: '2026-04-02 09:40:00',
        description: '交易运维、应用研发、数据库支持已加入临时协同群。',
      },
      {
        progressId: 'progress-001-2',
        title: '执行扩容与流量切换',
        owner: '交易运维组',
        status: 'processing',
        timestamp: '2026-04-02 10:15:00',
        description: '已完成实例扩容，正在观察核心接口成功率与 RT。',
      },
    ],
    disposalRecords: [
      {
        recordId: 'disposal-001-1',
        step: '主节点扩容',
        owner: '交易运维组',
        result: '交易服务实例由 4 台扩至 8 台，负载明显下降。',
        nextAction: '持续观察 30 分钟，并评估是否回收流量限制。',
        timestamp: '2026-04-02 10:10:00',
        status: 'completed',
      },
      {
        recordId: 'disposal-001-2',
        step: '应用限流调整',
        owner: '应用研发组',
        result: '核心下单接口已增加熔断保护，异常峰值得到控制。',
        nextAction: '回溯高峰期慢 SQL，确认是否存在数据库抖动。',
        timestamp: '2026-04-02 10:25:00',
        status: 'processing',
      },
    ],
    operationLogs: [
      {
        logId: 'log-001-1',
        operator: '系统',
        action: '事件创建',
        detail: '监控中心自动创建事件并指派值班经理。',
        timestamp: '2026-04-02 09:30:00',
        type: 'system',
      },
      {
        logId: 'log-001-2',
        operator: '李晨',
        action: '启动轻量应急协同',
        detail: '创建协同群并同步事件摘要、影响范围和初始负责人。',
        timestamp: '2026-04-02 09:42:00',
        type: 'coordination',
      },
      {
        logId: 'log-001-3',
        operator: '交易运维组',
        action: '更新处置记录',
        detail: '已完成扩容，订单成功率逐步恢复。',
        timestamp: '2026-04-02 10:15:00',
        type: 'record',
      },
    ],
    createdBy: 'admin',
    createdAt: '2026-04-02 09:30:00',
    updatedAt: '2026-04-02 10:40:00',
  },
  {
    eventId: 'event-002',
    eventCode: 'EVT-20260402-002',
    eventTitle: '支付网关超时告警',
    businessSystem: '支付系统',
    eventLevel: 'P2',
    incidentTime: '2026-04-02 11:20:00',
    status: 'pendingResponse',
    source: 'serviceDesk',
    emergencyCommander: '王磊',
    currentPhase: '待响应确认',
    reportChannel: '客服工单转派',
    incidentCategory: '接口超时',
    occurrenceLocation: '支付网关服务集群',
    summary: '客服集中反馈支付结果回调慢，部分订单状态长时间未更新。',
    businessImpact: '支付链路确认延迟，影响订单履约效率。',
    impactScope: '支付确认、回调通知',
    responseOwner: '支付运维组',
    collaborationGroup: '支付系统应急协调群',
    latestConclusion: '待支付运维组确认是否需要升级为全量应急协同。',
    disposalSuggestion: '先检查第三方通道抖动，再决定是否发起升级通知。',
    planName: '支付平台应急处置预案',
    relatedProcess: '支付链路超时处置流程',
    tags: ['支付链路', '客户反馈'],
    progress: [
      {
        progressId: 'progress-002-1',
        title: '值班经理确认告警来源',
        owner: '王磊',
        status: 'completed',
        timestamp: '2026-04-02 11:25:00',
        description: '已确认来自客服工单与外部监控双重反馈。',
      },
      {
        progressId: 'progress-002-2',
        title: '通知支付运维组评估',
        owner: '支付运维组',
        status: 'pending',
        timestamp: '2026-04-02 11:28:00',
        description: '等待值班工程师回填链路检查结果。',
      },
    ],
    disposalRecords: [
      {
        recordId: 'disposal-002-1',
        step: '收集用户反馈样本',
        owner: '客服支持组',
        result: '已整理 8 笔超时订单样本并同步给支付运维。',
        nextAction: '等待通道层排查结论。',
        timestamp: '2026-04-02 11:26:00',
        status: 'processing',
      },
    ],
    operationLogs: [
      {
        logId: 'log-002-1',
        operator: '系统',
        action: '事件创建',
        detail: '客服工单触发事件登记。',
        timestamp: '2026-04-02 11:20:00',
        type: 'system',
      },
      {
        logId: 'log-002-2',
        operator: '王磊',
        action: '指派响应人',
        detail: '已通知支付运维组在 10 分钟内完成响应。',
        timestamp: '2026-04-02 11:24:00',
        type: 'coordination',
      },
    ],
    createdBy: 'admin',
    createdAt: '2026-04-02 11:20:00',
    updatedAt: '2026-04-02 11:28:00',
  },
  {
    eventId: 'event-003',
    eventCode: 'EVT-20260403-001',
    eventTitle: '客户中心数据同步失败',
    businessSystem: '客户中心',
    eventLevel: 'P3',
    incidentTime: '2026-04-03 08:45:00',
    status: 'new',
    source: 'manualReport',
    emergencyCommander: '张敏',
    currentPhase: '事件受理',
    reportChannel: '人工上报',
    incidentCategory: '数据同步异常',
    occurrenceLocation: '客户中心同步任务节点',
    summary: '晨间批量同步任务失败，客户信息与画像数据存在延迟。',
    businessImpact: '客户画像延迟更新，部分营销任务受影响。',
    impactScope: '客户标签、画像同步',
    responseOwner: '数据保障组',
    collaborationGroup: '客户中心值班群',
    latestConclusion: '已建单待排查，暂未触发全面应急协同。',
    disposalSuggestion: '优先检查上游消息堆积和任务执行日志。',
    planName: '客户中心数据应急预案',
    relatedProcess: '同步任务失败排查流程',
    tags: ['数据同步', '晨间批处理'],
    progress: [
      {
        progressId: 'progress-003-1',
        title: '完成事件登记',
        owner: '张敏',
        status: 'completed',
        timestamp: '2026-04-03 08:50:00',
        description: '人工上报信息已补充影响范围和建议负责人。',
      },
    ],
    disposalRecords: [],
    operationLogs: [
      {
        logId: 'log-003-1',
        operator: '张敏',
        action: '事件登记',
        detail: '手工录入事件并补充同步任务失败截图。',
        timestamp: '2026-04-03 08:50:00',
        type: 'record',
      },
    ],
    createdBy: 'admin',
    createdAt: '2026-04-03 08:50:00',
    updatedAt: '2026-04-03 08:50:00',
  },
  {
    eventId: 'event-004',
    eventCode: 'EVT-20260401-004',
    eventTitle: '清算系统历史任务积压',
    businessSystem: '清算系统',
    eventLevel: 'P2',
    incidentTime: '2026-04-01 18:10:00',
    status: 'resolved',
    source: 'inspection',
    emergencyCommander: '周航',
    currentPhase: '事件已解除',
    reportChannel: '巡检发现',
    incidentCategory: '批处理积压',
    occurrenceLocation: '清算批处理集群',
    summary: '晚间巡检发现历史清算任务存在积压，影响 T+1 对账准备。',
    businessImpact: '影响清算对账准备时效，但未影响在线交易。',
    impactScope: '批量清算任务',
    responseOwner: '清算运维组',
    collaborationGroup: '清算系统应急群',
    latestConclusion: '积压任务已完成补跑，监控恢复正常。',
    disposalSuggestion: '纳入复盘问题库，优化批处理资源隔离。',
    planName: '清算系统夜间批处理应急预案',
    relatedProcess: '批处理积压恢复流程',
    tags: ['夜间巡检', '批处理'],
    progress: [
      {
        progressId: 'progress-004-1',
        title: '确认积压原因',
        owner: '清算运维组',
        status: 'completed',
        timestamp: '2026-04-01 18:20:00',
        description: '已确认因资源竞争导致历史任务调度延迟。',
      },
      {
        progressId: 'progress-004-2',
        title: '补跑任务并恢复监控',
        owner: '清算运维组',
        status: 'completed',
        timestamp: '2026-04-01 19:10:00',
        description: '任务全部完成，监控恢复至基线范围。',
      },
    ],
    disposalRecords: [
      {
        recordId: 'disposal-004-1',
        step: '补跑历史任务',
        owner: '清算运维组',
        result: '补跑完成，积压队列清零。',
        nextAction: '安排复盘并评估资源隔离策略。',
        timestamp: '2026-04-01 19:12:00',
        status: 'completed',
      },
    ],
    operationLogs: [
      {
        logId: 'log-004-1',
        operator: '系统',
        action: '事件创建',
        detail: '巡检任务自动登记异常。',
        timestamp: '2026-04-01 18:10:00',
        type: 'system',
      },
      {
        logId: 'log-004-2',
        operator: '周航',
        action: '事件关闭',
        detail: '确认监控恢复正常后关闭事件。',
        timestamp: '2026-04-01 19:20:00',
        type: 'response',
      },
    ],
    createdBy: 'admin',
    createdAt: '2026-04-01 18:10:00',
    updatedAt: '2026-04-01 19:20:00',
  },
]

function toEventRecord(event: EventDetail): EventRecord {
  return {
    eventId: event.eventId,
    eventCode: event.eventCode,
    eventTitle: event.eventTitle,
    businessSystem: event.businessSystem,
    eventLevel: event.eventLevel,
    incidentTime: event.incidentTime,
    status: event.status,
    source: event.source,
    emergencyCommander: event.emergencyCommander,
    currentPhase: event.currentPhase,
    createdBy: event.createdBy,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  }
}

function cloneEventDetail(event: EventDetail): EventDetail {
  return {
    ...event,
    tags: [...event.tags],
    progress: event.progress.map((item) => ({ ...item })),
    disposalRecords: event.disposalRecords.map((item) => ({ ...item })),
    operationLogs: event.operationLogs.map((item) => ({ ...item })),
  }
}

export async function getEventPage(params?: EventPageParams): Promise<PageResult<EventRecord>> {
  const keyword = params?.keyword?.trim().toLowerCase()

  const items = mockEventDetails
    .filter((event) => {
      const matchesKeyword =
        !keyword ||
        event.eventTitle.toLowerCase().includes(keyword) ||
        event.eventCode.toLowerCase().includes(keyword) ||
        event.businessSystem.toLowerCase().includes(keyword)

      const matchesStatus = !params?.status || event.status === params.status
      const matchesLevel = !params?.level || event.eventLevel === params.level
      const matchesSource = !params?.source || event.source === params.source

      return matchesKeyword && matchesStatus && matchesLevel && matchesSource
    })
    .map(toEventRecord)

  return Promise.resolve({
    items,
    total: items.length,
    page: 1,
    pageSize: 10,
  })
}

export async function getEventDetail(eventId: string): Promise<EventDetail | null> {
  const event = mockEventDetails.find((item) => item.eventId === eventId)

  return Promise.resolve(event ? cloneEventDetail(event) : null)
}
