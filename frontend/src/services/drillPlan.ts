import type { PageResult } from '../types/common'
import type { DrillPlan, DrillPlanDetail, DrillPlanFormOptions, DrillPlanStatus, DrillPlanSummary } from '../types/drill-plan'

export interface DrillPlanPageParams {
  page?: number
  pageSize?: number
  keyword?: string
  status?: DrillPlanStatus
  businessSystem?: string
  drillType?: string
}

const mockDrillPlanOptions: DrillPlanFormOptions = {
  businessSystems: [
    { label: '交易系统', value: '交易系统' },
    { label: '支付系统', value: '支付系统' },
    { label: '客户中心', value: '客户中心' },
    { label: '清算系统', value: '清算系统' },
  ],
  drillTypes: [
    { label: '桌面推演', value: '桌面推演' },
    { label: '实战演练', value: '实战演练' },
    { label: '专项联调', value: '专项联调' },
  ],
  scenarios: [
    { label: '核心交易主机故障', value: 'scenario-001' },
    { label: '支付链路拥塞', value: 'scenario-002' },
    { label: '客户中心数据延迟', value: 'scenario-003' },
    { label: '清算批处理失败', value: 'scenario-004' },
  ],
  plans: [
    { label: '核心交易系统应急预案', value: 'plan-001' },
    { label: '支付平台应急处置预案', value: 'plan-002' },
    { label: '客户中心数据同步预案', value: 'plan-003' },
    { label: '清算系统历史预案', value: 'plan-004' },
  ],
  processes: [
    { label: '核心交易异常排查流程', value: 'process-001' },
    { label: '支付高峰响应流程', value: 'process-002' },
    { label: '客户中心同步恢复流程', value: 'process-003' },
    { label: '清算回补流程', value: 'process-004' },
  ],
  departments: [
    { label: '应用运维组', value: '应用运维组' },
    { label: '基础设施组', value: '基础设施组' },
    { label: '数据库组', value: '数据库组' },
    { label: '客服支撑组', value: '客服支撑组' },
    { label: '安全管理组', value: '安全管理组' },
  ],
  commanders: [
    { label: '张磊', value: '张磊' },
    { label: '李娜', value: '李娜' },
    { label: '王凯', value: '王凯' },
    { label: '陈敏', value: '陈敏' },
  ],
  reportTemplates: [
    { label: '标准演练报告模板', value: 'template-001' },
    { label: '监管专项报告模板', value: 'template-002' },
    { label: '系统复盘简版模板', value: 'template-003' },
  ],
}

const mockDrillPlanDetails: DrillPlanDetail[] = [
  {
    drillPlanId: 'drill-001',
    drillPlanName: '交易系统季度故障切换演练',
    businessSystem: '交易系统',
    drillType: '实战演练',
    scheduledTime: '2026-05-15 14:00:00',
    commander: '张磊',
    status: 'published',
    relatedScenarioId: 'scenario-001',
    relatedScenarioName: '核心交易主机故障',
    relatedPlanId: 'plan-001',
    relatedPlanName: '核心交易系统应急预案',
    relatedProcessId: 'process-001',
    relatedProcessName: '核心交易异常排查流程',
    participantDepartments: ['应用运维组', '基础设施组', '数据库组'],
    reportStatus: 'draft',
    createdBy: 'admin',
    createdAt: '2026-04-02 10:30:00',
    updatedAt: '2026-04-03 09:20:00',
    drillScope: '覆盖主机故障告警、交易切流、数据库连接恢复与业务验证。',
    drillTargets: ['验证主备切换耗时', '检查排障协同链路', '验证关键监控告警触达'],
    observationPoints: ['业务中断时长', '人工确认节点响应时间', '关键岗位值守情况'],
    remarks: 'Phase 1 先关注计划编排与执行记录，不接入自动化控制。',
    executionRecords: [
      {
        recordId: 'record-001',
        stageName: '演练准备会',
        owner: '张磊',
        startTime: '2026-05-15 13:30:00',
        endTime: '2026-05-15 13:50:00',
        status: 'completed',
        summary: '完成角色确认、观察点提醒和回退口令校验。',
      },
      {
        recordId: 'record-002',
        stageName: '主机故障注入',
        owner: '基础设施组',
        startTime: '2026-05-15 14:00:00',
        endTime: '2026-05-15 14:18:00',
        status: 'completed',
        summary: '模拟主机不可用并成功触发监控告警。',
      },
      {
        recordId: 'record-003',
        stageName: '业务验证',
        owner: '应用运维组',
        startTime: '2026-05-15 14:20:00',
        status: 'pending',
        summary: '待确认交易成功率与关键接口耗时。',
      },
    ],
    report: {
      status: 'draft',
      reportOwner: '李娜',
      lastUpdatedAt: '2026-05-15 15:10:00',
      summary: '已完成演练背景、执行过程和初步问题记录，待补充业务验证结果。',
      nextActions: ['补充交易验证截图', '确认切回窗口结论', '整理改进项责任人'],
      attachments: ['故障注入记录.xlsx', '监控截图.zip'],
    },
    operationLogs: [
      {
        logId: 'log-001',
        action: '创建计划',
        operator: 'admin',
        operatedAt: '2026-04-02 10:30:00',
        detail: '创建交易系统季度故障切换演练并选择实战演练模板。',
      },
      {
        logId: 'log-002',
        action: '发布计划',
        operator: '张磊',
        operatedAt: '2026-04-03 09:20:00',
        detail: '完成关联流程校验并发布计划。',
      },
    ],
  },
  {
    drillPlanId: 'drill-002',
    drillPlanName: '支付链路高峰保障桌面推演',
    businessSystem: '支付系统',
    drillType: '桌面推演',
    scheduledTime: '2026-05-18 10:00:00',
    commander: '李娜',
    status: 'running',
    relatedScenarioId: 'scenario-002',
    relatedScenarioName: '支付链路拥塞',
    relatedPlanId: 'plan-002',
    relatedPlanName: '支付平台应急处置预案',
    relatedProcessId: 'process-002',
    relatedProcessName: '支付高峰响应流程',
    participantDepartments: ['应用运维组', '客服支撑组', '安全管理组'],
    reportStatus: 'notStarted',
    createdBy: 'admin',
    createdAt: '2026-04-02 11:40:00',
    updatedAt: '2026-04-03 08:45:00',
    drillScope: '重点评估高峰时段链路拥塞处置、客服同步与风险告警升级。',
    drillTargets: ['统一处置口径', '验证跨团队通知效率'],
    observationPoints: ['客服同步时延', '升级链路完整性'],
    remarks: '当前处于执行中，Phase 1 仅展示轻量进展记录。',
    executionRecords: [
      {
        recordId: 'record-004',
        stageName: '演练启动',
        owner: '李娜',
        startTime: '2026-05-18 10:00:00',
        endTime: '2026-05-18 10:10:00',
        status: 'completed',
        summary: '已完成目标说明与角色分工确认。',
      },
      {
        recordId: 'record-005',
        stageName: '链路拥塞讨论',
        owner: '客服支撑组',
        startTime: '2026-05-18 10:12:00',
        status: 'inProgress',
        summary: '正在推演客服通报和用户影响研判。',
      },
    ],
    report: {
      status: 'notStarted',
      reportOwner: '李娜',
      lastUpdatedAt: '2026-05-18 10:15:00',
      summary: '演练进行中，报告暂未启动。',
      nextActions: ['等待执行结束后归集记录', '确认客服侧补充素材'],
      attachments: [],
    },
    operationLogs: [
      {
        logId: 'log-003',
        action: '调整时间',
        operator: 'admin',
        operatedAt: '2026-04-03 08:30:00',
        detail: '因支付营销活动预热，将计划时间调整为 10:00。',
      },
      {
        logId: 'log-004',
        action: '启动演练',
        operator: '李娜',
        operatedAt: '2026-05-18 10:00:00',
        detail: '确认参演人员到位后启动桌面推演。',
      },
    ],
  },
  {
    drillPlanId: 'drill-003',
    drillPlanName: '客户中心同步恢复专项联调',
    businessSystem: '客户中心',
    drillType: '专项联调',
    scheduledTime: '2026-05-22 19:30:00',
    commander: '王凯',
    status: 'draft',
    relatedScenarioId: 'scenario-003',
    relatedScenarioName: '客户中心数据延迟',
    relatedPlanId: 'plan-003',
    relatedPlanName: '客户中心数据同步预案',
    relatedProcessId: 'process-003',
    relatedProcessName: '客户中心同步恢复流程',
    participantDepartments: ['应用运维组', '数据库组'],
    reportStatus: 'notStarted',
    createdBy: 'admin',
    createdAt: '2026-04-02 15:00:00',
    updatedAt: '2026-04-03 07:55:00',
    drillScope: '覆盖消息积压识别、数据回补和业务核对步骤。',
    drillTargets: ['验证回补脚本执行步骤', '形成夜间值守沟通模板'],
    observationPoints: ['回补脚本耗时', '业务核对点'],
    remarks: '待补充业务核对负责人后发布。',
    executionRecords: [],
    report: {
      status: 'notStarted',
      reportOwner: '王凯',
      lastUpdatedAt: '2026-04-03 07:55:00',
      summary: '计划尚未启动，报告区域仅保留模板位。',
      nextActions: ['完善联调参与部门', '确认演练窗口'],
      attachments: [],
    },
    operationLogs: [
      {
        logId: 'log-005',
        action: '创建计划',
        operator: 'admin',
        operatedAt: '2026-04-02 15:00:00',
        detail: '按客户中心同步恢复流程创建专项联调计划。',
      },
    ],
  },
  {
    drillPlanId: 'drill-004',
    drillPlanName: '清算回补历史演练复盘计划',
    businessSystem: '清算系统',
    drillType: '桌面推演',
    scheduledTime: '2026-04-20 16:00:00',
    commander: '陈敏',
    status: 'completed',
    relatedScenarioId: 'scenario-004',
    relatedScenarioName: '清算批处理失败',
    relatedPlanId: 'plan-004',
    relatedPlanName: '清算系统历史预案',
    relatedProcessId: 'process-004',
    relatedProcessName: '清算回补流程',
    participantDepartments: ['基础设施组', '数据库组', '安全管理组'],
    reportStatus: 'submitted',
    createdBy: 'admin',
    createdAt: '2026-04-01 17:40:00',
    updatedAt: '2026-04-02 18:10:00',
    drillScope: '针对历史清算失败案例进行桌面推演与改进项确认。',
    drillTargets: ['沉淀复盘结论', '明确回补脚本优化方向'],
    observationPoints: ['风险识别完整性', '责任分工清晰度'],
    remarks: '已形成历史复盘结论，可作为后续模板参考。',
    executionRecords: [
      {
        recordId: 'record-006',
        stageName: '案例回顾',
        owner: '陈敏',
        startTime: '2026-04-20 16:00:00',
        endTime: '2026-04-20 16:30:00',
        status: 'completed',
        summary: '完成历史案例背景和影响面回顾。',
      },
      {
        recordId: 'record-007',
        stageName: '改进项确认',
        owner: '数据库组',
        startTime: '2026-04-20 16:35:00',
        endTime: '2026-04-20 17:10:00',
        status: 'completed',
        summary: '确认脚本幂等校验与值守升级要求。',
      },
    ],
    report: {
      status: 'submitted',
      reportOwner: '陈敏',
      lastUpdatedAt: '2026-04-21 09:00:00',
      summary: '演练报告已提交，复盘结论和改进项已同步责任团队。',
      nextActions: ['跟踪脚本优化上线时间', '下季度抽查执行情况'],
      attachments: ['演练报告.pdf', '改进项清单.xlsx'],
    },
    operationLogs: [
      {
        logId: 'log-006',
        action: '提交报告',
        operator: '陈敏',
        operatedAt: '2026-04-21 09:00:00',
        detail: '提交演练报告并完成复盘分发。',
      },
    ],
  },
]

function getFilteredDrillPlans(params?: DrillPlanPageParams): DrillPlan[] {
  const keyword = params?.keyword?.trim().toLowerCase()

  return mockDrillPlanDetails.filter((plan) => {
    const matchesKeyword =
      !keyword ||
      plan.drillPlanName.toLowerCase().includes(keyword) ||
      plan.businessSystem.toLowerCase().includes(keyword) ||
      plan.drillType.toLowerCase().includes(keyword) ||
      plan.commander.toLowerCase().includes(keyword)

    const matchesStatus = !params?.status || plan.status === params.status
    const matchesBusinessSystem = !params?.businessSystem || plan.businessSystem === params.businessSystem
    const matchesDrillType = !params?.drillType || plan.drillType === params.drillType

    return matchesKeyword && matchesStatus && matchesBusinessSystem && matchesDrillType
  })
}

export async function getDrillPlanPage(params?: DrillPlanPageParams): Promise<PageResult<DrillPlan>> {
  const page = params?.page ?? 1
  const pageSize = params?.pageSize ?? 10
  const filteredItems = getFilteredDrillPlans(params)
  const startIndex = (page - 1) * pageSize
  const items = filteredItems.slice(startIndex, startIndex + pageSize)

  return Promise.resolve({
    items,
    total: filteredItems.length,
    page,
    pageSize,
  })
}

export async function getDrillPlanSummary(params?: Omit<DrillPlanPageParams, 'page' | 'pageSize'>): Promise<DrillPlanSummary> {
  const filteredItems = getFilteredDrillPlans(params)

  return Promise.resolve({
    total: filteredItems.length,
    running: filteredItems.filter((item) => item.status === 'running').length,
    completed: filteredItems.filter((item) => item.status === 'completed').length,
    pendingReport: filteredItems.filter((item) => item.reportStatus !== 'submitted').length,
  })
}

export async function getDrillPlanDetail(drillPlanId: string): Promise<DrillPlanDetail | null> {
  const detail = mockDrillPlanDetails.find((item) => item.drillPlanId === drillPlanId) ?? null

  return Promise.resolve(detail)
}

export async function getDrillPlanFormOptions(): Promise<DrillPlanFormOptions> {
  return Promise.resolve(mockDrillPlanOptions)
}
