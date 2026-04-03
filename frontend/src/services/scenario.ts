import type { PageResult, PublishStatus } from '../types/common'
import type { Scenario } from '../types/scenario'

export interface ScenarioPageParams {
  keyword?: string
  status?: PublishStatus
}

const mockScenarios: Scenario[] = [
  {
    scenarioId: 'scenario-001',
    scenarioName: '核心交易链路异常',
    businessSystem: '交易系统',
    faultObject: '核心交易服务',
    scenarioType: '应用故障',
    impactLevel: 'P1',
    disposalDepartment: '应用运维组',
    status: 'published',
    currentVersion: 'V1.0',
    createdBy: 'admin',
    createdAt: '2026-04-02 10:00:00',
    updatedAt: '2026-04-02 10:00:00',
  },
  {
    scenarioId: 'scenario-002',
    scenarioName: '核心支付超时告警',
    businessSystem: '支付系统',
    faultObject: '支付网关服务',
    scenarioType: '性能异常',
    impactLevel: 'P1',
    disposalDepartment: '支付运维组',
    status: 'pendingApproval',
    currentVersion: 'V0.9',
    createdBy: 'admin',
    createdAt: '2026-04-02 11:00:00',
    updatedAt: '2026-04-02 11:30:00',
  },
  {
    scenarioId: 'scenario-003',
    scenarioName: '客户信息同步失败',
    businessSystem: '客户中心',
    faultObject: '同步任务',
    scenarioType: '数据异常',
    impactLevel: 'P2',
    disposalDepartment: '数据保障组',
    status: 'draft',
    currentVersion: 'V0.3',
    createdBy: 'admin',
    createdAt: '2026-04-02 12:00:00',
    updatedAt: '2026-04-02 12:00:00',
  },
  {
    scenarioId: 'scenario-004',
    scenarioName: '历史对账流程下线',
    businessSystem: '清算系统',
    faultObject: '对账批处理',
    scenarioType: '批处理异常',
    impactLevel: 'P3',
    disposalDepartment: '清算运维组',
    status: 'deprecated',
    currentVersion: 'V1.2',
    createdBy: 'admin',
    createdAt: '2026-04-01 18:00:00',
    updatedAt: '2026-04-02 08:00:00',
  },
]

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
