import type { PageResult } from '../types/common'
import type { EventRecord } from '../types/event'

const mockEvents: EventRecord[] = [
  {
    eventId: 'event-001',
    eventTitle: '交易系统服务降级事件',
    businessSystem: '交易系统',
    eventLevel: 'P1',
    incidentTime: '2026-04-02 09:30:00',
    status: 'inProgress',
    createdBy: 'admin',
    createdAt: '2026-04-02 09:30:00',
    updatedAt: '2026-04-02 10:40:00',
  },
]

export async function getEventPage(): Promise<PageResult<EventRecord>> {
  return Promise.resolve({ items: mockEvents, total: mockEvents.length, page: 1, pageSize: 10 })
}
