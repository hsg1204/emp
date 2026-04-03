import type { PageResult } from '../types/common'
import type { DrillPlan } from '../types/drill-plan'

const mockDrillPlans: DrillPlan[] = [
  {
    drillPlanId: 'drill-001',
    drillPlanName: '交易系统季度演练计划',
    businessSystem: '交易系统',
    scheduledTime: '2026-05-15 14:00:00',
    status: 'published',
    createdBy: 'admin',
    createdAt: '2026-04-02 10:30:00',
    updatedAt: '2026-04-02 10:30:00',
  },
]

export async function getDrillPlanPage(): Promise<PageResult<DrillPlan>> {
  return Promise.resolve({ items: mockDrillPlans, total: mockDrillPlans.length, page: 1, pageSize: 10 })
}
