import type { PageResult, PublishStatus } from '../types/common'
import type {
  Scenario,
  ScenarioDetail,
  ScenarioOperationLog,
  ScenarioRelatedProcess,
  ScenarioUsageReference,
  ScenarioVersionRecord,
} from '../types/scenario'

export interface ScenarioPageParams {
  keyword?: string
  status?: PublishStatus
}

const mockScenarioVersions: Record<string, ScenarioVersionRecord[]> = {
  'scenario-001': [
    {
      version: 'V1.0',
      status: 'published',
      changeSummary: '补充核心交易链路的处置目标、协同团队和恢复动作。',
      operator: '张晨',
      updatedAt: '2026-04-02 10:00:00',
    },
    {
      version: 'V0.9',
      status: 'pendingApproval',
      changeSummary: '完成场景基础信息录入并提交审批。',
      operator: '张晨',
      updatedAt: '2026-04-01 18:20:00',
    },
  ],
  'scenario-002': [
    {
      version: 'V0.9',
      status: 'pendingApproval',
      changeSummary: '新增支付网关超时升级处置步骤和通知范围。',
      operator: '李敏',
      updatedAt: '2026-04-02 11:30:00',
    },
    {
      version: 'V0.8',
      status: 'draft',
      changeSummary: '完善支付链路监控指标与预警条件。',
      operator: '李敏',
      updatedAt: '2026-04-01 17:40:00',
    },
  ],
  'scenario-003': [
    {
      version: 'V0.3',
      status: 'draft',
      changeSummary: '补充数据回补动作和相关流程引用。',
      operator: '王磊',
      updatedAt: '2026-04-02 12:00:00',
    },
  ],
  'scenario-004': [
    {
      version: 'V1.2',
      status: 'deprecated',
      changeSummary: '历史对账流程下线，场景转为保留归档。',
      operator: '陈欣',
      updatedAt: '2026-04-02 08:00:00',
    },
    {
      version: 'V1.1',
      status: 'published',
      changeSummary: '统一对账异常通知名单并优化升级路径。',
      operator: '陈欣',
      updatedAt: '2026-03-20 14:00:00',
    },
  ],
}

const mockScenarioRelatedProcesses: Record<string, ScenarioRelatedProcess[]> = {
  'scenario-001': [
    {
      processId: 'process-101',
      processName: '核心交易异常升级流程',
      processType: '处置流程',
      ownerDepartment: '应用运维组',
      status: 'published',
      updatedAt: '2026-03-28 16:00:00',
    },
    {
      processId: 'process-102',
      processName: '核心交易服务回切流程',
      processType: '恢复流程',
      ownerDepartment: '平台运维组',
      status: 'published',
      updatedAt: '2026-03-30 09:30:00',
    },
  ],
  'scenario-002': [
    {
      processId: 'process-201',
      processName: '支付链路超时处置流程',
      processType: '处置流程',
      ownerDepartment: '支付运维组',
      status: 'pendingApproval',
      updatedAt: '2026-04-02 10:50:00',
    },
  ],
  'scenario-003': [
    {
      processId: 'process-301',
      processName: '客户数据回补流程',
      processType: '修复流程',
      ownerDepartment: '数据保障组',
      status: 'draft',
      updatedAt: '2026-04-02 11:20:00',
    },
  ],
  'scenario-004': [
    {
      processId: 'process-401',
      processName: '历史对账异常补偿流程',
      processType: '补偿流程',
      ownerDepartment: '清算运维组',
      status: 'deprecated',
      updatedAt: '2026-03-12 15:40:00',
    },
  ],
}

const mockScenarioUsageReferences: Record<string, ScenarioUsageReference[]> = {
  'scenario-001': [
    {
      referenceId: 'plan-001',
      referenceName: '核心交易应急预案',
      referenceType: '应急预案',
      description: '用于触发 P1 交易故障时的标准处置和协同通知。',
      updatedAt: '2026-03-29 10:00:00',
    },
    {
      referenceId: 'drill-001',
      referenceName: '交易系统主备切换演练计划',
      referenceType: '演练计划',
      description: '用于验证主备切换动作与恢复窗口。',
      updatedAt: '2026-03-25 18:00:00',
    },
  ],
  'scenario-002': [
    {
      referenceId: 'plan-002',
      referenceName: '支付系统稳定性处置预案',
      referenceType: '应急预案',
      description: '覆盖支付链路超时和降级切换的处置步骤。',
      updatedAt: '2026-03-31 14:10:00',
    },
  ],
  'scenario-003': [
    {
      referenceId: 'issue-001',
      referenceName: '客户信息同步失败复盘项',
      referenceType: '复盘问题',
      description: '用于跟踪同步任务重试策略和补偿动作。',
      updatedAt: '2026-04-01 20:00:00',
    },
  ],
  'scenario-004': [
    {
      referenceId: 'plan-004',
      referenceName: '历史对账异常应急预案',
      referenceType: '应急预案',
      description: '已归档，仅在历史核查和培训中引用。',
      updatedAt: '2026-03-14 09:00:00',
    },
  ],
}

const mockScenarioOperationLogs: Record<string, ScenarioOperationLog[]> = {
  'scenario-001': [
    {
      logId: 'log-001',
      action: '发布场景',
      operator: '张晨',
      detail: '场景版本 V1.0 发布成功，并同步给应用运维组。',
      occurredAt: '2026-04-02 10:05:00',
    },
    {
      logId: 'log-002',
      action: '提交审批',
      operator: '张晨',
      detail: '提交核心交易链路异常场景审批。',
      occurredAt: '2026-04-01 18:25:00',
    },
  ],
  'scenario-002': [
    {
      logId: 'log-003',
      action: '更新场景',
      operator: '李敏',
      detail: '补充支付网关超时告警的协同团队与升级动作。',
      occurredAt: '2026-04-02 11:20:00',
    },
    {
      logId: 'log-004',
      action: '提交审批',
      operator: '李敏',
      detail: '提交支付链路超时场景审批。',
      occurredAt: '2026-04-02 11:30:00',
    },
  ],
  'scenario-003': [
    {
      logId: 'log-005',
      action: '保存草稿',
      operator: '王磊',
      detail: '保存客户信息同步失败场景草稿。',
      occurredAt: '2026-04-02 12:05:00',
    },
  ],
  'scenario-004': [
    {
      logId: 'log-006',
      action: '废止场景',
      operator: '陈欣',
      detail: '历史对账流程停用后，将该场景状态更新为已废止。',
      occurredAt: '2026-04-02 08:10:00',
    },
  ],
}

const mockScenarioDetails: ScenarioDetail[] = [
  {
    scenarioId: 'scenario-001',
    scenarioCode: 'SCN-JY-001',
    scenarioName: '核心交易链路异常',
    businessSystem: '交易系统',
    faultObject: '核心交易服务',
    scenarioType: '应用故障',
    impactLevel: 'P1',
    disposalDepartment: '应用运维组',
    owner: '张晨',
    ownerDepartment: '应用运维组',
    status: 'published',
    currentVersion: 'V1.0',
    createdBy: 'admin',
    createdAt: '2026-04-01 09:00:00',
    updatedAt: '2026-04-02 10:00:00',
    summary: '针对核心交易链路响应超时、服务不可用等高风险故障的标准化处置场景。',
    disposalGoal: '在 30 分钟内完成故障定位、业务降级或回切，保障核心交易成功率恢复。',
    applicableScope: '适用于交易接入层、交易服务集群和依赖中间件出现异常时的处置。',
    coreImpact: '可能导致交易受理失败、订单积压和客户侧大面积超时。',
    tags: ['核心业务', '高频触发', '需快速升级'],
    collaborationTeams: ['平台运维组', '数据库团队', '业务值班经理'],
    triggerConditions: ['核心交易成功率低于 92%', '连续 5 分钟交易耗时超过 3 秒', '监控出现服务不可用告警'],
    responsePrinciples: ['先止损后恢复', '优先保障核心支付链路', '升级通知同步到值班经理'],
    keyRecoveryActions: ['确认是否需要流量切换', '执行交易服务降级策略', '按流程组织核心依赖排查'],
    remarks: '发布后需要每季度复核一次处置联系人和升级策略。',
    relatedProcesses: mockScenarioRelatedProcesses['scenario-001'],
    usageReferences: mockScenarioUsageReferences['scenario-001'],
    versionHistory: mockScenarioVersions['scenario-001'],
    operationLogs: mockScenarioOperationLogs['scenario-001'],
  },
  {
    scenarioId: 'scenario-002',
    scenarioCode: 'SCN-ZF-003',
    scenarioName: '核心支付超时告警',
    businessSystem: '支付系统',
    faultObject: '支付网关服务',
    scenarioType: '性能异常',
    impactLevel: 'P1',
    disposalDepartment: '支付运维组',
    owner: '李敏',
    ownerDepartment: '支付运维组',
    status: 'pendingApproval',
    currentVersion: 'V0.9',
    createdBy: 'admin',
    createdAt: '2026-03-31 15:00:00',
    updatedAt: '2026-04-02 11:30:00',
    summary: '针对支付网关响应超时、交易回执积压的场景定义。',
    disposalGoal: '在 20 分钟内完成支付链路止损并拉起跨团队协同。',
    applicableScope: '适用于支付接入、支付网关和支付回调链路的性能突增场景。',
    coreImpact: '导致用户支付确认慢、部分订单状态回写延迟。',
    tags: ['支付', '时延敏感'],
    collaborationTeams: ['平台运维组', '清结算团队'],
    triggerConditions: ['支付成功回执超时率超过 15%', '支付网关平均耗时超过 2 秒'],
    responsePrinciples: ['快速识别瓶颈节点', '必要时启用限流和降级'],
    keyRecoveryActions: ['检查网关线程池与依赖接口', '确认是否开启支付降级策略'],
    remarks: '当前仍处于审批阶段，联系人名单待业务确认。',
    relatedProcesses: mockScenarioRelatedProcesses['scenario-002'],
    usageReferences: mockScenarioUsageReferences['scenario-002'],
    versionHistory: mockScenarioVersions['scenario-002'],
    operationLogs: mockScenarioOperationLogs['scenario-002'],
  },
  {
    scenarioId: 'scenario-003',
    scenarioCode: 'SCN-KH-007',
    scenarioName: '客户信息同步失败',
    businessSystem: '客户中心',
    faultObject: '同步任务',
    scenarioType: '数据异常',
    impactLevel: 'P2',
    disposalDepartment: '数据保障组',
    owner: '王磊',
    ownerDepartment: '数据保障组',
    status: 'draft',
    currentVersion: 'V0.3',
    createdBy: 'admin',
    createdAt: '2026-04-01 10:30:00',
    updatedAt: '2026-04-02 12:00:00',
    summary: '针对客户中心向下游系统同步失败、数据补偿延迟的场景定义。',
    disposalGoal: '在 2 小时内完成同步链路恢复和关键客户数据回补。',
    applicableScope: '适用于客户中心批量和实时同步任务异常。',
    coreImpact: '可能导致客户画像、授信、营销等下游数据不一致。',
    tags: ['数据一致性', '补偿场景'],
    collaborationTeams: ['客户中心团队', '营销平台团队'],
    triggerConditions: ['同步失败任务数持续增加', '关键客户变更未按 SLA 下发'],
    responsePrinciples: ['优先恢复主链路', '补偿动作需评估重复写入风险'],
    keyRecoveryActions: ['确认失败任务范围', '执行批量回补和对账'],
    relatedProcesses: mockScenarioRelatedProcesses['scenario-003'],
    usageReferences: mockScenarioUsageReferences['scenario-003'],
    versionHistory: mockScenarioVersions['scenario-003'],
    operationLogs: mockScenarioOperationLogs['scenario-003'],
  },
  {
    scenarioId: 'scenario-004',
    scenarioCode: 'SCN-QS-002',
    scenarioName: '历史对账流程下线',
    businessSystem: '清算系统',
    faultObject: '对账批处理',
    scenarioType: '批处理异常',
    impactLevel: 'P3',
    disposalDepartment: '清算运维组',
    owner: '陈欣',
    ownerDepartment: '清算运维组',
    status: 'deprecated',
    currentVersion: 'V1.2',
    createdBy: 'admin',
    createdAt: '2026-03-10 09:00:00',
    updatedAt: '2026-04-02 08:00:00',
    summary: '用于历史对账批处理任务异常的标准处置场景，现已归档。',
    disposalGoal: '保留归档信息，供历史核查和培训使用。',
    applicableScope: '适用于停用前的历史批处理链路异常核查。',
    coreImpact: '影响对账结果生成和下游账务核对。',
    tags: ['归档场景'],
    collaborationTeams: ['清结算团队'],
    triggerConditions: ['历史批处理任务异常退出', '对账结果文件缺失'],
    responsePrinciples: ['仅保留历史参考，不再作为新故障模板'],
    keyRecoveryActions: ['查询历史流程归档', '联系清结算团队人工核查'],
    remarks: '该场景已停用，不建议继续新增引用。',
    relatedProcesses: mockScenarioRelatedProcesses['scenario-004'],
    usageReferences: mockScenarioUsageReferences['scenario-004'],
    versionHistory: mockScenarioVersions['scenario-004'],
    operationLogs: mockScenarioOperationLogs['scenario-004'],
  },
]

const mockScenarios: Scenario[] = mockScenarioDetails.map((scenario) => ({
  scenarioId: scenario.scenarioId,
  scenarioName: scenario.scenarioName,
  businessSystem: scenario.businessSystem,
  faultObject: scenario.faultObject,
  scenarioType: scenario.scenarioType,
  impactLevel: scenario.impactLevel,
  disposalDepartment: scenario.disposalDepartment,
  status: scenario.status,
  currentVersion: scenario.currentVersion,
  createdBy: scenario.createdBy,
  createdAt: scenario.createdAt,
  updatedAt: scenario.updatedAt,
}))

export async function getScenarioPage(params?: ScenarioPageParams): Promise<PageResult<Scenario>> {
  const keyword = params?.keyword?.trim().toLowerCase()
  const items = mockScenarios.filter((scenario) => {
    const matchesKeyword =
      !keyword ||
      scenario.scenarioName.toLowerCase().includes(keyword) ||
      scenario.businessSystem.toLowerCase().includes(keyword) ||
      scenario.faultObject.toLowerCase().includes(keyword)

    const matchesStatus = !params?.status || scenario.status === params.status

    return matchesKeyword && matchesStatus
  })

  return Promise.resolve({
    items,
    total: items.length,
    page: 1,
    pageSize: 10,
  })
}

export async function getScenarioDetail(id: string): Promise<ScenarioDetail | null> {
  const scenario = mockScenarioDetails.find((item) => item.scenarioId === id) ?? null
  return Promise.resolve(scenario)
}
