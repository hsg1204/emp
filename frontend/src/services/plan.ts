import type { PageResult, PublishStatus } from '../types/common'
import type { Plan } from '../types/plan'

export interface PlanPageParams {
  keyword?: string
  status?: PublishStatus
}

const mockPlans: Plan[] = [
  {
    planId: 'plan-001',
    planCode: 'PLAN-TRD-001',
    planName: '核心交易系统应急预案',
    businessSystem: '交易系统',
    systemLevel: '一级',
    planType: '系统级应急预案',
    incidentLevel: 'P1',
    disposalDepartment: '应用运维组',
    relatedScenarioIds: ['scenario-001'],
    status: 'published',
    currentVersion: 'V1.0',
    planObjectives: '保障核心交易服务在重大故障发生后 30 分钟内恢复关键交易能力。\n降低故障影响范围，确保业务连续性。',
    applicableScope: '适用于核心交易前置、撮合服务、订单持久化服务及关联中间件。\n适用于生产环境 P1/P2 级系统异常。',
    activationConditions: '核心交易链路连续 5 分钟不可用。\n关键交易成功率低于 60%，且无法通过自动化策略恢复。',
    disposalPrinciples: '先止损、后恢复。\n优先保障交易主链路与核心客户服务。\n变更操作必须双人复核。',
    emergencyActions: '立即启动应急群与升级汇报。\n执行流量切换与服务降级。\n组织应用、数据库、中间件联合排障。',
    recoveryMeasures: '完成业务验证后逐步恢复流量。\n补偿异常订单并复核监控告警。\n组织复盘并更新版本记录。',
    reportingRequirements: '5 分钟内完成首次上报。\n每 15 分钟同步处置进展，恢复后 2 小时内输出简报。',
    attachmentList: [
      {
        attachmentId: 'attachment-001',
        fileName: '核心交易系统应急预案-V1.0.pdf',
        fileType: 'PDF',
        fileSize: '2.4 MB',
        uploadedBy: 'admin',
        uploadedAt: '2026-04-02 10:10:00',
        description: '正式发布版本，供应急指挥和运维执行参考。',
      },
      {
        attachmentId: 'attachment-002',
        fileName: '交易系统切换清单.xlsx',
        fileType: 'XLSX',
        fileSize: '428 KB',
        uploadedBy: 'admin',
        uploadedAt: '2026-04-02 10:12:00',
        description: '主备切换步骤和验证项。',
      },
    ],
    versionHistory: [
      {
        version: 'V1.0',
        status: 'published',
        changedBy: 'admin',
        changedAt: '2026-04-02 10:10:00',
        summary: '补充系统切换步骤和恢复验证要求，完成正式发布。',
      },
      {
        version: 'V0.9',
        status: 'pendingApproval',
        changedBy: 'zhangsan',
        changedAt: '2026-04-01 16:40:00',
        summary: '根据联调意见完善职责分工和上报节奏。',
      },
    ],
    operationLogs: [
      {
        logId: 'log-001',
        action: '发布预案',
        operator: 'admin',
        operatedAt: '2026-04-02 10:10:00',
        result: '成功',
        detail: '预案版本 V1.0 发布成功。',
      },
      {
        logId: 'log-002',
        action: '提交审批',
        operator: 'zhangsan',
        operatedAt: '2026-04-01 16:45:00',
        result: '成功',
        detail: '提交至应急管理负责人审批。',
      },
      {
        logId: 'log-003',
        action: '创建预案',
        operator: 'zhangsan',
        operatedAt: '2026-03-31 09:20:00',
        result: '成功',
        detail: '初始化核心交易系统应急预案。',
      },
    ],
    createdBy: 'admin',
    createdAt: '2026-04-02 10:10:00',
    updatedAt: '2026-04-02 10:10:00',
  },
  {
    planId: 'plan-002',
    planCode: 'PLAN-PAY-002',
    planName: '支付平台应急处置预案',
    businessSystem: '支付系统',
    systemLevel: '一级',
    planType: '专项处置预案',
    incidentLevel: 'P1',
    disposalDepartment: '支付运维组',
    relatedScenarioIds: ['scenario-002'],
    status: 'pendingApproval',
    currentVersion: 'V0.8',
    planObjectives: '确保支付链路出现高延迟或超时告警时可快速降级。\n保障核心支付交易与清算数据一致性。',
    applicableScope: '适用于支付网关、收银台服务、风控路由和支付消息链路。',
    activationConditions: '核心支付接口超时率连续 10 分钟超过 20%。\n支付成功率下降且影响客户下单。',
    disposalPrinciples: '优先保障支付成功率和交易一致性。\n关键操作执行前必须同步业务负责人。',
    emergencyActions: '执行支付通道限流。\n切换备用路由。\n安排业务侧开启兜底提示。',
    recoveryMeasures: '验证支付成功率恢复情况。\n复核异常交易并执行补偿。',
    reportingRequirements: '10 分钟内完成首次上报。\n每 20 分钟同步处置进展。',
    attachmentList: [
      {
        attachmentId: 'attachment-003',
        fileName: '支付平台预案-评审版.docx',
        fileType: 'DOCX',
        fileSize: '816 KB',
        uploadedBy: 'admin',
        uploadedAt: '2026-04-02 11:40:00',
        description: '待审批版本，供评审使用。',
      },
    ],
    versionHistory: [
      {
        version: 'V0.8',
        status: 'pendingApproval',
        changedBy: 'admin',
        changedAt: '2026-04-02 11:45:00',
        summary: '新增支付通道限流策略和业务兜底说明。',
      },
      {
        version: 'V0.7',
        status: 'draft',
        changedBy: 'lisi',
        changedAt: '2026-04-01 18:10:00',
        summary: '完成初版处置流程和角色分工梳理。',
      },
    ],
    operationLogs: [
      {
        logId: 'log-004',
        action: '提交审批',
        operator: 'admin',
        operatedAt: '2026-04-02 11:45:00',
        result: '成功',
        detail: '预案提交审批，等待负责人确认。',
      },
      {
        logId: 'log-005',
        action: '编辑预案',
        operator: 'admin',
        operatedAt: '2026-04-02 11:35:00',
        result: '成功',
        detail: '补充支付通道切换步骤。',
      },
    ],
    createdBy: 'admin',
    createdAt: '2026-04-02 11:20:00',
    updatedAt: '2026-04-02 11:45:00',
  },
  {
    planId: 'plan-003',
    planCode: 'PLAN-CRM-003',
    planName: '客户中心数据同步预案',
    businessSystem: '客户中心',
    systemLevel: '二级',
    planType: '专项处置预案',
    incidentLevel: 'P2',
    disposalDepartment: '数据保障组',
    relatedScenarioIds: ['scenario-003'],
    status: 'draft',
    currentVersion: 'V0.2',
    planObjectives: '控制客户主数据同步异常影响范围。\n确保客户资料关键字段在 2 小时内恢复一致。',
    applicableScope: '适用于客户中心主数据同步链路、定时任务和目标库写入模块。',
    activationConditions: '主数据同步失败率持续升高。\n关键客户资料出现批量缺失或延迟。',
    disposalPrinciples: '优先恢复核心主数据流向。\n严格控制人工补录范围。',
    emergencyActions: '暂停非关键同步任务。\n核查消息积压与失败原因。\n安排数据回补验证。',
    recoveryMeasures: '执行分批补偿。\n复核客户信息一致性并更新监控阈值。',
    reportingRequirements: '首次上报时明确影响范围。\n恢复后补充异常客户清单。',
    attachmentList: [],
    versionHistory: [
      {
        version: 'V0.2',
        status: 'draft',
        changedBy: 'wangwu',
        changedAt: '2026-04-02 12:30:00',
        summary: '补充客户信息补偿方案。',
      },
    ],
    operationLogs: [
      {
        logId: 'log-006',
        action: '编辑预案',
        operator: 'wangwu',
        operatedAt: '2026-04-02 12:30:00',
        result: '成功',
        detail: '新增异常客户数据补偿说明。',
      },
    ],
    createdBy: 'admin',
    createdAt: '2026-04-02 12:30:00',
    updatedAt: '2026-04-02 12:30:00',
  },
  {
    planId: 'plan-004',
    planCode: 'PLAN-CLR-004',
    planName: '清算系统历史预案',
    businessSystem: '清算系统',
    systemLevel: '三级',
    planType: '历史归档预案',
    incidentLevel: 'P3',
    disposalDepartment: '清算运维组',
    relatedScenarioIds: ['scenario-004'],
    status: 'deprecated',
    currentVersion: 'V1.3',
    planObjectives: '保留历史清算系统处置经验，供类似问题参考。',
    applicableScope: '适用于历史清算流程下线相关的应急参考场景。',
    activationConditions: '仅作为历史参考，不再用于新的正式发布场景。',
    disposalPrinciples: '以归档查阅为主，不再继续扩展处置步骤。',
    emergencyActions: '无新增动作，保留历史记录。',
    recoveryMeasures: '无。',
    reportingRequirements: '如需引用，需在新预案中重新评审。',
    attachmentList: [
      {
        attachmentId: 'attachment-004',
        fileName: '清算系统历史预案归档.zip',
        fileType: 'ZIP',
        fileSize: '5.1 MB',
        uploadedBy: 'admin',
        uploadedAt: '2026-04-02 08:18:00',
        description: '历史版本归档材料。',
      },
    ],
    versionHistory: [
      {
        version: 'V1.3',
        status: 'deprecated',
        changedBy: 'admin',
        changedAt: '2026-04-02 08:20:00',
        summary: '预案废止并归档，仅保留查阅。',
      },
      {
        version: 'V1.2',
        status: 'published',
        changedBy: 'lisi',
        changedAt: '2026-03-15 14:00:00',
        summary: '补充批处理异常应对步骤。',
      },
    ],
    operationLogs: [
      {
        logId: 'log-007',
        action: '废止预案',
        operator: 'admin',
        operatedAt: '2026-04-02 08:20:00',
        result: '成功',
        detail: '历史清算流程已下线，预案转为归档状态。',
      },
    ],
    createdBy: 'admin',
    createdAt: '2026-04-01 17:30:00',
    updatedAt: '2026-04-02 08:20:00',
  },
]

export async function getPlanPage(params?: PlanPageParams): Promise<PageResult<Plan>> {
  const keyword = params?.keyword?.trim().toLowerCase()
  const items = mockPlans.filter((plan) => {
    const matchesKeyword =
      !keyword ||
      plan.planName.toLowerCase().includes(keyword) ||
      plan.businessSystem.toLowerCase().includes(keyword) ||
      plan.systemLevel.toLowerCase().includes(keyword) ||
      plan.planCode.toLowerCase().includes(keyword)

    const matchesStatus = !params?.status || plan.status === params.status

    return matchesKeyword && matchesStatus
  })

  return Promise.resolve({
    items,
    total: items.length,
    page: 1,
    pageSize: 10,
  })
}

export async function getPlanById(planId: string): Promise<Plan | null> {
  const plan = mockPlans.find((item) => item.planId === planId) ?? null

  return Promise.resolve(plan)
}
