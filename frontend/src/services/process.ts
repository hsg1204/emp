import type { PageResult, PublishStatus } from '../types/common'
import type { ProcessDetail, ProcessDefinition } from '../types/process'

export interface ProcessPageParams {
  keyword?: string
  status?: PublishStatus
  processType?: string
}

const mockProcesses: ProcessDetail[] = [
  {
    processId: 'process-001',
    processName: '核心交易异常排查流程',
    processType: '排查流程',
    applicableSystem: '交易系统',
    ownerDepartment: '应用运维组',
    relatedScenarioCount: 2,
    nodeCount: 5,
    status: 'published',
    currentVersion: 'V1.2',
    description: '用于核心交易链路发生异常告警时，快速完成定位、升级和恢复动作编排。',
    triggerCondition: '监控平台触发 P1 告警，或值班经理手动发起流程。',
    exceptionStrategy: '若 10 分钟内未完成应用侧定位，则自动升级至平台主管和数据库支持团队。',
    approvalPolicy: '变更类动作需平台主管审批，通知类动作自动执行。',
    relatedScenarioNames: ['核心交易链路异常', '交易链路超时告警'],
    relatedPlanNames: ['核心交易系统应急预案'],
    tags: ['P1', '交易链路', '跨团队协同'],
    flowNodes: [
      {
        nodeId: 'node-001',
        nodeName: '告警受理',
        nodeType: 'start',
        ownerRole: '值班经理',
        slaMinutes: 5,
        output: '确认告警有效并创建处置单',
      },
      {
        nodeId: 'node-002',
        nodeName: '应用侧排查',
        nodeType: 'manual',
        ownerRole: '应用运维',
        slaMinutes: 10,
        output: '输出故障范围和初步原因',
      },
      {
        nodeId: 'node-003',
        nodeName: '升级决策',
        nodeType: 'decision',
        ownerRole: '平台主管',
        slaMinutes: 5,
        output: '决定继续排查或切换预案',
      },
      {
        nodeId: 'node-004',
        nodeName: '广播通知',
        nodeType: 'notification',
        ownerRole: '值班经理',
        slaMinutes: 3,
        output: '向固定群同步处置进度',
      },
      {
        nodeId: 'node-005',
        nodeName: '流程关闭',
        nodeType: 'finish',
        ownerRole: '值班经理',
        slaMinutes: 2,
        output: '归档结论与处置耗时',
      },
    ],
    operationLogs: [
      {
        logId: 'log-001',
        action: '发布流程',
        operator: 'admin',
        result: '成功',
        remark: '发布 V1.2，补充升级决策节点。',
        timestamp: '2026-04-02 10:20:00',
      },
      {
        logId: 'log-002',
        action: '调整节点 SLA',
        operator: 'ops.lead',
        result: '成功',
        remark: '应用侧排查时限由 15 分钟调整为 10 分钟。',
        timestamp: '2026-04-01 18:10:00',
      },
      {
        logId: 'log-003',
        action: '提交审批',
        operator: 'admin',
        result: '成功',
        remark: '流程进入正式发布审批。',
        timestamp: '2026-04-01 17:30:00',
      },
    ],
    createdBy: 'admin',
    createdAt: '2026-03-28 09:00:00',
    updatedAt: '2026-04-02 10:20:00',
    lastPublishedAt: '2026-04-02 10:20:00',
  },
  {
    processId: 'process-002',
    processName: '支付链路降级决策流程',
    processType: '决策流程',
    applicableSystem: '支付系统',
    ownerDepartment: '支付运维组',
    relatedScenarioCount: 1,
    nodeCount: 4,
    status: 'pendingApproval',
    currentVersion: 'V0.9',
    description: '在支付链路持续超时或外部依赖不稳定时，指导团队快速完成降级决策与通知。',
    triggerCondition: '支付成功率连续 5 分钟低于阈值时由值班经理发起。',
    exceptionStrategy: '若外部渠道恢复，流程可跳过降级执行节点并直接结束。',
    approvalPolicy: '降级动作需平台主管审批后执行。',
    relatedScenarioNames: ['核心支付超时告警'],
    relatedPlanNames: ['支付平台应急处置预案'],
    tags: ['支付', '降级', '审批必选'],
    flowNodes: [
      {
        nodeId: 'node-006',
        nodeName: '超时确认',
        nodeType: 'start',
        ownerRole: '值班经理',
        slaMinutes: 5,
        output: '确认是否进入降级评估',
      },
      {
        nodeId: 'node-007',
        nodeName: '影响评估',
        nodeType: 'manual',
        ownerRole: '支付运维',
        slaMinutes: 8,
        output: '评估影响范围与可回退路径',
      },
      {
        nodeId: 'node-008',
        nodeName: '降级审批',
        nodeType: 'decision',
        ownerRole: '平台主管',
        slaMinutes: 5,
        output: '批准或驳回降级方案',
      },
      {
        nodeId: 'node-009',
        nodeName: '结果通报',
        nodeType: 'notification',
        ownerRole: '支付运维',
        slaMinutes: 3,
        output: '同步业务和客服团队',
      },
    ],
    operationLogs: [
      {
        logId: 'log-004',
        action: '提交审批',
        operator: 'pay.owner',
        result: '成功',
        remark: '提交 V0.9 等待平台主管审核。',
        timestamp: '2026-04-02 11:40:00',
      },
      {
        logId: 'log-005',
        action: '新增节点',
        operator: 'pay.owner',
        result: '成功',
        remark: '增加结果通报节点。',
        timestamp: '2026-04-02 11:10:00',
      },
    ],
    createdBy: 'pay.owner',
    createdAt: '2026-04-02 09:30:00',
    updatedAt: '2026-04-02 11:40:00',
  },
  {
    processId: 'process-003',
    processName: '客户数据同步恢复流程',
    processType: '恢复流程',
    applicableSystem: '客户中心',
    ownerDepartment: '数据保障组',
    relatedScenarioCount: 1,
    nodeCount: 4,
    status: 'draft',
    currentVersion: 'V0.4',
    description: '针对客户中心数据同步失败场景，规范恢复窗口确认、补数执行和结果校验步骤。',
    triggerCondition: '日常巡检发现同步任务失败或业务方反馈数据延迟。',
    exceptionStrategy: '若补数窗口冲突，则转人工审批后延后执行。',
    approvalPolicy: '补数执行前需数据平台主管确认。',
    relatedScenarioNames: ['客户信息同步失败'],
    relatedPlanNames: ['客户中心数据同步预案'],
    tags: ['数据恢复', '补数', '草稿中'],
    flowNodes: [
      {
        nodeId: 'node-010',
        nodeName: '异常确认',
        nodeType: 'start',
        ownerRole: '数据保障组',
        slaMinutes: 10,
        output: '确认失败批次与影响范围',
      },
      {
        nodeId: 'node-011',
        nodeName: '恢复窗口确认',
        nodeType: 'decision',
        ownerRole: '数据平台主管',
        slaMinutes: 10,
        output: '确定补数时段',
      },
      {
        nodeId: 'node-012',
        nodeName: '补数执行',
        nodeType: 'manual',
        ownerRole: 'DBA',
        slaMinutes: 20,
        output: '执行补数脚本',
      },
      {
        nodeId: 'node-013',
        nodeName: '恢复确认',
        nodeType: 'finish',
        ownerRole: '数据保障组',
        slaMinutes: 10,
        output: '完成结果校验并关闭流程',
      },
    ],
    operationLogs: [
      {
        logId: 'log-006',
        action: '保存草稿',
        operator: 'data.owner',
        result: '成功',
        remark: '更新恢复窗口确认说明。',
        timestamp: '2026-04-02 12:20:00',
      },
    ],
    createdBy: 'data.owner',
    createdAt: '2026-04-02 11:50:00',
    updatedAt: '2026-04-02 12:20:00',
  },
  {
    processId: 'process-004',
    processName: '清算批处理补偿流程',
    processType: '补偿流程',
    applicableSystem: '清算系统',
    ownerDepartment: '清算运维组',
    relatedScenarioCount: 1,
    nodeCount: 3,
    status: 'deprecated',
    currentVersion: 'V1.0',
    description: '历史清算批处理异常场景的补偿处置流程，已由新版统一恢复流程替代。',
    triggerCondition: '批处理补偿失败且需人工介入时发起。',
    exceptionStrategy: '若存在账务差异，需转人工核账流程。',
    approvalPolicy: '补偿动作由清算平台主管审批。',
    relatedScenarioNames: ['历史对账流程下线'],
    relatedPlanNames: ['清算系统历史预案'],
    tags: ['清算', '历史版本'],
    flowNodes: [
      {
        nodeId: 'node-014',
        nodeName: '补偿申请',
        nodeType: 'start',
        ownerRole: '清算运维',
        slaMinutes: 10,
        output: '提交补偿申请单',
      },
      {
        nodeId: 'node-015',
        nodeName: '核账确认',
        nodeType: 'manual',
        ownerRole: '清算主管',
        slaMinutes: 20,
        output: '确认账务一致性',
      },
      {
        nodeId: 'node-016',
        nodeName: '流程关闭',
        nodeType: 'finish',
        ownerRole: '清算运维',
        slaMinutes: 5,
        output: '记录补偿结果',
      },
    ],
    operationLogs: [
      {
        logId: 'log-007',
        action: '废止流程',
        operator: 'clear.owner',
        result: '成功',
        remark: '由统一恢复流程替代。',
        timestamp: '2026-04-02 08:00:00',
      },
    ],
    createdBy: 'clear.owner',
    createdAt: '2026-03-15 14:00:00',
    updatedAt: '2026-04-02 08:00:00',
    lastPublishedAt: '2026-03-20 09:00:00',
  },
]

export async function getProcessPage(params?: ProcessPageParams): Promise<PageResult<ProcessDefinition>> {
  const keyword = params?.keyword?.trim().toLowerCase()
  const processType = params?.processType?.trim().toLowerCase()

  const items = mockProcesses.filter((process) => {
    const matchesKeyword =
      !keyword ||
      process.processName.toLowerCase().includes(keyword) ||
      process.processType.toLowerCase().includes(keyword) ||
      process.applicableSystem.toLowerCase().includes(keyword) ||
      process.ownerDepartment.toLowerCase().includes(keyword)

    const matchesStatus = !params?.status || process.status === params.status
    const matchesProcessType = !processType || process.processType.toLowerCase() === processType

    return matchesKeyword && matchesStatus && matchesProcessType
  })

  return Promise.resolve({
    items,
    total: items.length,
    page: 1,
    pageSize: 10,
  })
}

export async function getProcessById(processId: string): Promise<ProcessDetail | null> {
  return Promise.resolve(mockProcesses.find((process) => process.processId === processId) ?? null)
}
