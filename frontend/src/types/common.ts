export interface BaseOption {
  label: string
  value: string
}

export interface AuditFields {
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface PageQuery {
  page: number
  pageSize: number
  keyword?: string
}

export interface PageResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export type PublishStatus = 'draft' | 'pendingApproval' | 'published' | 'deprecated'
