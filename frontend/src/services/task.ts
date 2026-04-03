export interface PendingTaskSummary {
  total: number
  approved: number
  processing: number
}

export async function getPendingTaskSummary(): Promise<PendingTaskSummary> {
  return Promise.resolve({
    total: 18,
    approved: 6,
    processing: 12,
  })
}
