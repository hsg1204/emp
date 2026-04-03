import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getHistoryTaskPage, getMyTaskPage, getTaskFilterOptions } from '../../../services/task'
import type { TaskPriority, TaskRecord, TaskStatus } from '../../../types/task'

export type TaskListPageMode = 'active' | 'history'

export interface TaskFilterState {
  keyword: string
  status?: TaskStatus
  assignee?: string
  sourceModule?: string
}

export interface TaskListMetric {
  key: string
  title: string
  value: number
  description: string
}

export interface TaskListPageData {
  filters: TaskFilterState
  items: TaskRecord[]
  assigneeOptions: string[]
  sourceModuleOptions: string[]
  statusOptions: Array<{ label: string; value: TaskStatus }>
  metrics: TaskListMetric[]
  isLoading: boolean
  isError: boolean
  retry: () => void
  setKeyword: (value: string) => void
  setStatus: (value: TaskStatus | undefined) => void
  setAssignee: (value: string | undefined) => void
  setSourceModule: (value: string | undefined) => void
  resetFilters: () => void
}

const activeStatusOptions: Array<{ label: string; value: TaskStatus }> = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'inProgress' },
]

const historyStatusOptions: Array<{ label: string; value: TaskStatus }> = [
  { label: '已完成', value: 'completed' },
  { label: '已关闭', value: 'closed' },
]

function countByStatus(items: TaskRecord[], status: TaskStatus) {
  return items.filter((item) => item.status === status).length
}

function countByPriority(items: TaskRecord[], priority: TaskPriority) {
  return items.filter((item) => item.priority === priority).length
}

function buildMetrics(mode: TaskListPageMode, items: TaskRecord[]): TaskListMetric[] {
  if (mode === 'active') {
    return [
      {
        key: 'total',
        title: '当前待办',
        value: items.length,
        description: '筛选结果中的全部待处理与处理中任务。',
      },
      {
        key: 'processing',
        title: '处理中',
        value: countByStatus(items, 'inProgress'),
        description: '已进入处理流程，仍需持续跟进。',
      },
      {
        key: 'highPriority',
        title: '高优先级',
        value: countByPriority(items, 'high'),
        description: '需要优先响应的关键任务。',
      },
    ]
  }

  return [
    {
      key: 'total',
      title: '历史记录',
      value: items.length,
      description: '筛选结果中的全部已办结任务。',
    },
    {
      key: 'completed',
      title: '已完成',
      value: countByStatus(items, 'completed'),
      description: '按流程完成并形成处理结果。',
    },
    {
      key: 'closed',
      title: '已关闭',
      value: countByStatus(items, 'closed'),
      description: '已关闭或归档，不再继续流转。',
    },
  ]
}

function useTaskListPage(mode: TaskListPageMode): TaskListPageData {
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState<TaskStatus | undefined>()
  const [assignee, setAssignee] = useState<string | undefined>()
  const [sourceModule, setSourceModule] = useState<string | undefined>()

  const filters = useMemo(
    () => ({ keyword, status, assignee, sourceModule }),
    [keyword, status, assignee, sourceModule],
  )

  const taskQuery = useQuery({
    queryKey: [mode === 'active' ? 'my-task-page' : 'history-task-page', filters],
    queryFn: () => (mode === 'active' ? getMyTaskPage(filters) : getHistoryTaskPage(filters)),
  })

  const filterOptionsQuery = useQuery({
    queryKey: ['task-filter-options'],
    queryFn: getTaskFilterOptions,
  })

  const items = taskQuery.data?.items ?? []
  const metrics = useMemo(() => buildMetrics(mode, items), [items, mode])

  return {
    filters,
    items,
    assigneeOptions: filterOptionsQuery.data?.assignees ?? [],
    sourceModuleOptions: filterOptionsQuery.data?.sourceModules ?? [],
    statusOptions: mode === 'active' ? activeStatusOptions : historyStatusOptions,
    metrics,
    isLoading: taskQuery.isLoading || filterOptionsQuery.isLoading,
    isError: taskQuery.isError || filterOptionsQuery.isError,
    retry: () => {
      void taskQuery.refetch()
      void filterOptionsQuery.refetch()
    },
    setKeyword,
    setStatus,
    setAssignee,
    setSourceModule,
    resetFilters: () => {
      setKeyword('')
      setStatus(undefined)
      setAssignee(undefined)
      setSourceModule(undefined)
    },
  }
}

export default useTaskListPage
