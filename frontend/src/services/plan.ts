import type { PageResult, PublishStatus } from '../types/common'
import type { Plan } from '../types/plan'

export interface PlanPageParams {
  keyword?: string
  status?: PublishStatus
}

const mockPlans: Plan[] = [
  {
    planId: 'plan-001',
    planName: '核心交易系统应急预案',
    businessSystem: '交易系统',
    systemLevel: '一级',
    relatedScenarioIds: ['scenario-001'],
    status: 'published',
    currentVersion: 'V1.0',
    createdBy: 'admin',
    createdAt: '2026-04-02 10:10:00',
    updatedAt: '2026-04-02 10:10:00',
  },
  {
    planId: 'plan-002',
    planName: '支付平台应急处置预案',
    businessSystem: '支付系统',
    systemLevel: '一级',
    relatedScenarioIds: ['scenario-002'],
    status: 'pendingApproval',
    currentVersion: 'V0.8',
    createdBy: 'admin',
    createdAt: '2026-04-02 11:20:00',
    updatedAt: '2026-04-02 11:45:00',
  },
  {
    planId: 'plan-003',
    planName: '客户中心数据同步预案',
    businessSystem: '客户中心',
    systemLevel: '二级',
    relatedScenarioIds: ['scenario-003'],
    status: 'draft',
    currentVersion: 'V0.2',
    createdBy: 'admin',
    createdAt: '2026-04-02 12:30:00',
    updatedAt: '2026-04-02 12:30:00',
  },
  {
    planId: 'plan-004',
    planName: '清算系统历史预案',
    businessSystem: '清算系统',
    systemLevel: '三级',
    relatedScenarioIds: ['scenario-004'],
    status: 'deprecated',
    currentVersion: 'V1.3',
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
      plan.systemLevel.toLowerCase().includes(keyword)

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
