import type { PageResult } from '../types/common'
import type { ProcessDefinition } from '../types/process'

const mockProcesses: ProcessDefinition[] = [
  {
    processId: 'process-001',
    processName: '核心交易异常排查流程',
    processType: '排查流程',
    applicableSystem: '交易系统',
    status: 'published',
    createdBy: 'admin',
    createdAt: '2026-04-02 10:20:00',
    updatedAt: '2026-04-02 10:20:00',
  },
]

export async function getProcessPage(): Promise<PageResult<ProcessDefinition>> {
  return Promise.resolve({ items: mockProcesses, total: mockProcesses.length, page: 1, pageSize: 10 })
}
