import type { AuditFields } from './common'

export type EventStatus = 'new' | 'pendingResponse' | 'inProgress' | 'resolved' | 'cancelled'

export interface EventRecord extends AuditFields {
  eventId: string
  eventTitle: string
  businessSystem: string
  eventLevel: string
  incidentTime: string
  status: EventStatus
}
