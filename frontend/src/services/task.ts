import type { HomeDashboardData, TaskRecord, TaskStatus } from '../types/task'
import type { PageResult } from '../types/common'

export interface TaskPageParams {
  keyword?: string
  status?: TaskStatus
  assignee?: string
  sourceModule?: string
}

const mockTasks: TaskRecord[] = [
  {
    taskId: 'task-001',
    title: '审核交易系统应急场景 V1.0',
    taskType: '审批任务',
    sourceModule: '场景管理',
    businessSystem: '交易系统',
    currentNode: '部门负责人审批',
    assignee: '张晨',
    priority: 'high',
    status: 'todo',
    dueAt: '2026-04-02 18:00',
    detailPath: '/emergency/scenarios/scenario-001',
    completedAt: null,
    result: null,
    durationText: null,
    createdBy: 'system',
    createdAt: '2026-04-02 09:10:00',
    updatedAt: '2026-04-02 09:10:00',
  },
  {
    taskId: 'task-002',
    title: '确认支付平台应急预案变更',
    taskType: '处理任务',
    sourceModule: '预案管理',
    businessSystem: '支付系统',
    currentNode: '预案补充材料',
    assignee: '李雯',
    priority: 'high',
    status: 'inProgress',
    dueAt: '2026-04-02 17:30',
    detailPath: '/emergency/plans/plan-002',
    completedAt: null,
    result: null,
    durationText: null,
    createdBy: 'system',
    createdAt: '2026-04-02 09:40:00',
    updatedAt: '2026-04-02 10:05:00',
  },
  {
    taskId: 'task-003',
    title: '补充客户中心同步预案附件',
    taskType: '处理任务',
    sourceModule: '预案管理',
    businessSystem: '客户中心',
    currentNode: '待提交',
    assignee: '王敏',
    priority: 'medium',
    status: 'todo',
    dueAt: '2026-04-03 12:00',
    detailPath: '/emergency/plans/plan-003',
    completedAt: null,
    result: null,
    durationText: null,
    createdBy: 'system',
    createdAt: '2026-04-02 11:20:00',
    updatedAt: '2026-04-02 11:20:00',
  },
  {
    taskId: 'task-004',
    title: '复核清算系统流程调整单',
    taskType: '审批任务',
    sourceModule: '流程管理',
    businessSystem: '清算系统',
    currentNode: '复核审批',
    assignee: '张晨',
    priority: 'low',
    status: 'inProgress',
    dueAt: '2026-04-04 10:00',
    detailPath: '/emergency/processes/process-001',
    completedAt: null,
    result: null,
    durationText: null,
    createdBy: 'system',
    createdAt: '2026-04-01 16:20:00',
    updatedAt: '2026-04-02 08:15:00',
  },
  {
    taskId: 'task-005',
    title: '确认应急演练计划参与名单',
    taskType: '协同任务',
    sourceModule: '应急演练计划',
    businessSystem: '综合管理',
    currentNode: '名单确认',
    assignee: '李雯',
    priority: 'medium',
    status: 'todo',
    dueAt: '2026-04-05 09:30',
    detailPath: '/drills/plans/drill-plan-001',
    completedAt: null,
    result: null,
    durationText: null,
    createdBy: 'system',
    createdAt: '2026-04-02 13:05:00',
    updatedAt: '2026-04-02 13:05:00',
  },
  {
    taskId: 'task-006',
    title: '审核应急公告发布内容',
    taskType: '审批任务',
    sourceModule: '公告管理',
    businessSystem: '综合管理',
    currentNode: '公告审批',
    assignee: '王敏',
    priority: 'low',
    status: 'todo',
    dueAt: '2026-04-03 17:00',
    detailPath: '/system/announcements',
    completedAt: null,
    result: null,
    durationText: null,
    createdBy: 'system',
    createdAt: '2026-04-02 14:00:00',
    updatedAt: '2026-04-02 14:00:00',
  },
  {
    taskId: 'task-101',
    title: '完成交易系统场景审批',
    taskType: '审批任务',
    sourceModule: '场景管理',
    businessSystem: '交易系统',
    currentNode: '已完成',
    assignee: '张晨',
    priority: 'high',
    status: 'completed',
    dueAt: '2026-03-30 18:00',
    detailPath: '/emergency/scenarios/scenario-001',
    completedAt: '2026-03-30 17:26',
    result: '审批通过',
    durationText: '2小时16分',
    createdBy: 'system',
    createdAt: '2026-03-30 15:10:00',
    updatedAt: '2026-03-30 17:26:00',
  },
  {
    taskId: 'task-102',
    title: '关闭支付系统历史告警跟踪',
    taskType: '处理任务',
    sourceModule: '事件管理',
    businessSystem: '支付系统',
    currentNode: '已关闭',
    assignee: '李雯',
    priority: 'medium',
    status: 'closed',
    dueAt: '2026-03-28 20:00',
    detailPath: '/events/event-001',
    completedAt: '2026-03-28 19:12',
    result: '已关闭',
    durationText: '1天4小时',
    createdBy: 'system',
    createdAt: '2026-03-27 15:12:00',
    updatedAt: '2026-03-28 19:12:00',
  },
  {
    taskId: 'task-103',
    title: '归档客户中心演练复盘问题',
    taskType: '协同任务',
    sourceModule: '复盘问题',
    businessSystem: '客户中心',
    currentNode: '已完成',
    assignee: '王敏',
    priority: 'low',
    status: 'completed',
    dueAt: '2026-03-29 16:00',
    detailPath: '/review/issues/review-issue-001',
    completedAt: '2026-03-29 11:30',
    result: '已归档',
    durationText: '4小时20分',
    createdBy: 'system',
    createdAt: '2026-03-29 08:10:00',
    updatedAt: '2026-03-29 11:30:00',
  },
  {
    taskId: 'task-104',
    title: '处理组织架构变更同步',
    taskType: '处理任务',
    sourceModule: '应急组织',
    businessSystem: '综合管理',
    currentNode: '已关闭',
    assignee: '张晨',
    priority: 'medium',
    status: 'closed',
    dueAt: '2026-03-26 12:00',
    detailPath: '/system/organization',
    completedAt: '2026-03-26 10:05',
    result: '已同步完成',
    durationText: '55分钟',
    createdBy: 'system',
    createdAt: '2026-03-26 09:10:00',
    updatedAt: '2026-03-26 10:05:00',
  },
]

const activeTasks = mockTasks.filter((task) => task.status === 'todo' || task.status === 'inProgress')
const historyTasks = mockTasks.filter((task) => task.status === 'completed' || task.status === 'closed')

function matchesKeyword(task: TaskRecord, keyword?: string) {
  const normalizedKeyword = keyword?.trim().toLowerCase()

  if (!normalizedKeyword) {
    return true
  }

  return (
    task.title.toLowerCase().includes(normalizedKeyword) ||
    task.sourceModule.toLowerCase().includes(normalizedKeyword) ||
    task.businessSystem.toLowerCase().includes(normalizedKeyword) ||
    task.assignee.toLowerCase().includes(normalizedKeyword)
  )
}

function matchesFilters(task: TaskRecord, params?: TaskPageParams) {
  const matchesStatus = !params?.status || task.status === params.status
  const matchesAssignee = !params?.assignee || task.assignee === params.assignee
  const matchesSourceModule = !params?.sourceModule || task.sourceModule === params.sourceModule

  return matchesKeyword(task, params?.keyword) && matchesStatus && matchesAssignee && matchesSourceModule
}

function buildPageResult(items: TaskRecord[]): PageResult<TaskRecord> {
  return {
    items,
    total: items.length,
    page: 1,
    pageSize: 10,
  }
}

export async function getPendingTaskSummary(): Promise<{ total: number; approved: number; processing: number }> {
  const approved = activeTasks.filter((task) => task.taskType === '审批任务').length
  const processing = activeTasks.filter((task) => task.taskType !== '审批任务').length

  return Promise.resolve({
    total: activeTasks.length,
    approved,
    processing,
  })
}

export async function getHomeDashboard(): Promise<HomeDashboardData> {
  return Promise.resolve({
    metrics: [
      {
        key: 'pending',
        title: '待办任务',
        value: activeTasks.length,
        description: '待审批、待处理与协同事项总量',
      },
      {
        key: 'sla',
        title: '今日临期',
        value: 3,
        description: '24 小时内需要完成的任务',
      },
      {
        key: 'plans',
        title: '预案覆盖',
        value: 86,
        suffix: '%',
        description: '重点业务系统已配置预案覆盖率',
      },
      {
        key: 'drills',
        title: '本月演练',
        value: 5,
        description: '本月已安排应急演练计划',
      },
    ],
    notices: [
      {
        id: 'notice-001',
        title: '值班提醒：今日 18:00 前完成高优先级审批事项',
        description: '交易系统和支付系统共有 2 条高优先级审批任务待确认，请相关负责人及时处理。',
        level: 'warning',
        publishedAt: '今天 09:00',
      },
      {
        id: 'notice-002',
        title: '演练计划准备完成率已更新',
        description: '4 月第一周演练计划准备完成率提升至 75%，仍有 1 个参与名单待确认。',
        level: 'processing',
        publishedAt: '今天 11:30',
      },
      {
        id: 'notice-003',
        title: '昨日复盘问题已全部归档',
        description: '客户中心演练复盘问题已关闭，建议同步检查经验沉淀与流程优化项。',
        level: 'success',
        publishedAt: '昨天 18:20',
      },
    ],
    overviewSections: [
      {
        key: 'scenario',
        title: '场景与预案梳理',
        count: 21,
        progress: 78,
        description: '重点系统场景梳理和预案补齐持续推进中。',
      },
      {
        key: 'drill',
        title: '演练准备进度',
        count: 5,
        progress: 75,
        description: '本月演练计划已排期，待补齐参与名单与通知。',
      },
      {
        key: 'review',
        title: '复盘改进闭环',
        count: 9,
        progress: 89,
        description: '高优先级复盘问题已基本完成闭环。',
      },
    ],
    quickLinks: [
      {
        key: 'tasks',
        title: '处理我的任务',
        description: '查看当前待审批、待处理和协同任务。',
        path: '/tasks',
      },
      {
        key: 'history',
        title: '查看历史任务',
        description: '回顾近期已完成和已关闭的任务记录。',
        path: '/tasks/history',
      },
      {
        key: 'plans',
        title: '进入预案管理',
        description: '继续补齐重点业务系统预案。',
        path: '/emergency/plans',
      },
    ],
    recentTasks: activeTasks.slice(0, 4),
  })
}

export async function getMyTaskPage(params?: TaskPageParams): Promise<PageResult<TaskRecord>> {
  const items = activeTasks.filter((task) => matchesFilters(task, params))
  return Promise.resolve(buildPageResult(items))
}

export async function getHistoryTaskPage(params?: TaskPageParams): Promise<PageResult<TaskRecord>> {
  const items = historyTasks.filter((task) => matchesFilters(task, params))
  return Promise.resolve(buildPageResult(items))
}

export async function getTaskFilterOptions(): Promise<{ assignees: string[]; sourceModules: string[] }> {
  const assignees = Array.from(new Set(mockTasks.map((task) => task.assignee)))
  const sourceModules = Array.from(new Set(mockTasks.map((task) => task.sourceModule)))

  return Promise.resolve({ assignees, sourceModules })
}
