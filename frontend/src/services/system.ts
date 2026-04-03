import type { PageResult } from '../types/common'
import type {
  Announcement,
  AnnouncementFormValues,
  AnnouncementStatus,
  EmergencyTeam,
  FixedGroup,
  FixedGroupFormValues,
  OperationLog,
  OperationLogResult,
  OrganizationMember,
  OrganizationPageData,
  PushStrategy,
  PushStrategyFormValues,
  ReportingStrategy,
  ReportingStrategyFormValues,
  SystemConfigStatus,
} from '../types/system'

export interface OrganizationQueryParams {
  keyword?: string
  businessSystem?: string
}

export interface StrategyListQueryParams {
  keyword?: string
  businessSystem?: string
  status?: 'enabled' | 'disabled'
}

export interface AnnouncementListQueryParams {
  keyword?: string
  status?: 'draft' | 'published' | 'expired'
}

export interface OperationLogQueryParams {
  keyword?: string
  moduleName?: string
  result?: 'success' | 'failed'
}

const mockEmergencyTeams: EmergencyTeam[] = [
  {
    teamId: 'team-001',
    teamName: '交易系统一级响应组',
    businessSystem: '交易系统',
    responseLevel: '一级',
    leaderName: '张敏',
    dutyPhone: '13800001111',
    memberCount: 12,
    dutyScope: '核心交易链路、撮合服务、结算接口',
    status: 'enabled',
    createdBy: 'admin',
    createdAt: '2026-04-01 09:00:00',
    updatedAt: '2026-04-03 08:30:00',
  },
  {
    teamId: 'team-002',
    teamName: '支付系统应急协同组',
    businessSystem: '支付系统',
    responseLevel: '一级',
    leaderName: '李倩',
    dutyPhone: '13800002222',
    memberCount: 10,
    dutyScope: '支付网关、清结算对接、银行通道',
    status: 'enabled',
    createdBy: 'admin',
    createdAt: '2026-04-01 09:30:00',
    updatedAt: '2026-04-03 09:00:00',
  },
  {
    teamId: 'team-003',
    teamName: '客户中心支援组',
    businessSystem: '客户中心',
    responseLevel: '二级',
    leaderName: '王立',
    dutyPhone: '13800003333',
    memberCount: 8,
    dutyScope: '客户资料同步、统一认证、消息订阅',
    status: 'enabled',
    createdBy: 'admin',
    createdAt: '2026-04-01 10:00:00',
    updatedAt: '2026-04-02 18:20:00',
  },
  {
    teamId: 'team-004',
    teamName: '清算系统历史保障组',
    businessSystem: '清算系统',
    responseLevel: '三级',
    leaderName: '赵峰',
    dutyPhone: '13800004444',
    memberCount: 6,
    dutyScope: '历史对账、批量补单、报表生成',
    status: 'disabled',
    createdBy: 'admin',
    createdAt: '2026-03-28 15:00:00',
    updatedAt: '2026-04-01 17:00:00',
  },
]

const mockOrganizationMembers: OrganizationMember[] = [
  {
    memberId: 'member-001',
    teamId: 'team-001',
    teamName: '交易系统一级响应组',
    businessSystem: '交易系统',
    memberName: '张敏',
    roleName: '总指挥',
    department: '应用运维组',
    contactPhone: '13800001111',
    notificationChannel: '电话 + 短信',
    onDuty: true,
    updatedAt: '2026-04-03 08:30:00',
  },
  {
    memberId: 'member-002',
    teamId: 'team-001',
    teamName: '交易系统一级响应组',
    businessSystem: '交易系统',
    memberName: '陈航',
    roleName: '应用负责人',
    department: '交易研发组',
    contactPhone: '13800001112',
    notificationChannel: '企业微信',
    onDuty: true,
    updatedAt: '2026-04-03 08:10:00',
  },
  {
    memberId: 'member-003',
    teamId: 'team-002',
    teamName: '支付系统应急协同组',
    businessSystem: '支付系统',
    memberName: '李倩',
    roleName: '协调负责人',
    department: '支付运维组',
    contactPhone: '13800002222',
    notificationChannel: '电话 + 企业微信',
    onDuty: true,
    updatedAt: '2026-04-03 09:00:00',
  },
  {
    memberId: 'member-004',
    teamId: 'team-003',
    teamName: '客户中心支援组',
    businessSystem: '客户中心',
    memberName: '王立',
    roleName: '值班经理',
    department: '数据保障组',
    contactPhone: '13800003333',
    notificationChannel: '短信',
    onDuty: false,
    updatedAt: '2026-04-02 18:20:00',
  },
  {
    memberId: 'member-005',
    teamId: 'team-002',
    teamName: '支付系统应急协同组',
    businessSystem: '支付系统',
    memberName: '孙洁',
    roleName: '通道负责人',
    department: '支付研发组',
    contactPhone: '13800002229',
    notificationChannel: '电话',
    onDuty: true,
    updatedAt: '2026-04-03 08:40:00',
  },
]

const mockReportingStrategies: ReportingStrategy[] = [
  {
    strategyId: 'report-001',
    strategyName: '交易系统 P1 上报策略',
    businessSystem: '交易系统',
    triggerLevel: 'P1',
    targetType: '值班经理 + 应急总指挥',
    responseLimitMinutes: 5,
    escalationLimitMinutes: 15,
    notifyChannel: '电话 + 短信',
    status: 'enabled',
    description: '交易系统核心链路触发 P1 告警后 5 分钟内完成首轮上报。',
    createdBy: 'admin',
    createdAt: '2026-04-01 11:00:00',
    updatedAt: '2026-04-03 08:00:00',
  },
  {
    strategyId: 'report-002',
    strategyName: '支付系统夜间升级上报',
    businessSystem: '支付系统',
    triggerLevel: 'P1/P2',
    targetType: '值班经理 + 通道负责人',
    responseLimitMinutes: 10,
    escalationLimitMinutes: 20,
    notifyChannel: '企业微信 + 短信',
    status: 'enabled',
    description: '夜间发生支付异常时，优先通知值班经理并拉起通道负责人。',
    createdBy: 'admin',
    createdAt: '2026-04-01 11:30:00',
    updatedAt: '2026-04-02 17:10:00',
  },
  {
    strategyId: 'report-003',
    strategyName: '客户中心常规上报策略',
    businessSystem: '客户中心',
    triggerLevel: 'P2/P3',
    targetType: '业务负责人',
    responseLimitMinutes: 15,
    escalationLimitMinutes: 30,
    notifyChannel: '企业微信',
    status: 'disabled',
    description: '用于客户中心一般性数据同步异常的值班上报。',
    createdBy: 'admin',
    createdAt: '2026-03-30 16:20:00',
    updatedAt: '2026-04-01 14:30:00',
  },
]

const mockPushStrategies: PushStrategy[] = [
  {
    pushStrategyId: 'push-001',
    strategyName: '交易异常通知推送',
    businessSystem: '交易系统',
    triggerAction: 'P1 告警触发',
    targetScope: '交易系统应急组',
    pushChannel: '企业微信机器人',
    templateName: '交易异常标准模板',
    status: 'enabled',
    description: '向交易系统应急组织同步故障级别、影响范围和恢复窗口。',
    createdBy: 'admin',
    createdAt: '2026-04-01 12:00:00',
    updatedAt: '2026-04-03 08:10:00',
  },
  {
    pushStrategyId: 'push-002',
    strategyName: '支付通道异常广播',
    businessSystem: '支付系统',
    triggerAction: '支付网关失败率升高',
    targetScope: '支付系统协同组 + 管理群',
    pushChannel: '短信 + 企业微信',
    templateName: '支付通道波动模板',
    status: 'enabled',
    description: '支付通道异常达到阈值后，自动向值班群播报。',
    createdBy: 'admin',
    createdAt: '2026-04-01 12:30:00',
    updatedAt: '2026-04-03 07:55:00',
  },
  {
    pushStrategyId: 'push-003',
    strategyName: '历史报表失败通知',
    businessSystem: '清算系统',
    triggerAction: '批处理失败',
    targetScope: '清算保障组',
    pushChannel: '邮件',
    templateName: '批处理失败模板',
    status: 'disabled',
    description: '适用于清算历史批处理和报表生成异常。',
    createdBy: 'admin',
    createdAt: '2026-03-29 10:00:00',
    updatedAt: '2026-04-01 09:40:00',
  },
]

const mockFixedGroups: FixedGroup[] = [
  {
    fixedGroupId: 'group-001',
    fixedGroupName: '交易系统应急群',
    businessSystem: '交易系统',
    groupType: '处置群',
    channelType: '企业微信',
    memberCount: 16,
    ownerName: '张敏',
    memberNames: '张敏、陈航、周源、刘晨',
    status: 'enabled',
    description: '交易系统 P1/P2 事件处置统一沟通群。',
    createdBy: 'admin',
    createdAt: '2026-04-01 13:00:00',
    updatedAt: '2026-04-03 08:45:00',
  },
  {
    fixedGroupId: 'group-002',
    fixedGroupName: '支付值班群',
    businessSystem: '支付系统',
    groupType: '值班群',
    channelType: '钉钉',
    memberCount: 14,
    ownerName: '李倩',
    memberNames: '李倩、孙洁、吴帆',
    status: 'enabled',
    description: '支付系统夜间值班与升级通知固定群。',
    createdBy: 'admin',
    createdAt: '2026-04-01 13:30:00',
    updatedAt: '2026-04-02 19:20:00',
  },
  {
    fixedGroupId: 'group-003',
    fixedGroupName: '清算备份沟通群',
    businessSystem: '清算系统',
    groupType: '备份群',
    channelType: '企业微信',
    memberCount: 8,
    ownerName: '赵峰',
    memberNames: '赵峰、钱波',
    status: 'disabled',
    description: '用于历史批量任务异常时的补充沟通。',
    createdBy: 'admin',
    createdAt: '2026-03-30 10:20:00',
    updatedAt: '2026-04-01 16:00:00',
  },
]

const mockAnnouncements: Announcement[] = [
  {
    announcementId: 'announce-001',
    title: '清明节值班安排通知',
    audience: '全员',
    publishWindow: '2026-04-03 09:00 至 2026-04-06 18:00',
    topPinned: true,
    status: 'published',
    summary: '同步节假日期间应急值班联系人和升级流程。',
    content: '节假日期间请按值班安排执行事件响应，重大故障继续按一级升级路径处理。',
    createdBy: 'admin',
    createdAt: '2026-04-02 09:00:00',
    updatedAt: '2026-04-03 09:10:00',
  },
  {
    announcementId: 'announce-002',
    title: '交易系统演练预告',
    audience: '交易系统相关团队',
    publishWindow: '2026-04-05 10:00 至 2026-04-08 18:00',
    topPinned: false,
    status: 'draft',
    summary: '提醒交易系统相关部门准备本周应急演练。',
    content: '请交易研发、运维和值班经理提前确认演练窗口和回切方案。',
    createdBy: 'admin',
    createdAt: '2026-04-02 15:20:00',
    updatedAt: '2026-04-02 15:20:00',
  },
  {
    announcementId: 'announce-003',
    title: '历史公告归档样例',
    audience: '清算系统',
    publishWindow: '2026-03-25 09:00 至 2026-03-28 18:00',
    topPinned: false,
    status: 'expired',
    summary: '用于展示已过期公告状态。',
    content: '该公告展示过期状态与归档后的阅读范围。',
    createdBy: 'admin',
    createdAt: '2026-03-24 18:00:00',
    updatedAt: '2026-03-28 18:10:00',
  },
]

const mockOperationLogs: OperationLog[] = [
  {
    logId: 'log-001',
    operatedAt: '2026-04-03 09:12:11',
    operatorName: 'admin',
    operatorDepartment: '平台管理组',
    moduleName: '公告管理',
    actionName: '发布公告',
    targetName: '清明节值班安排通知',
    result: 'success',
    clientIp: '10.10.12.21',
  },
  {
    logId: 'log-002',
    operatedAt: '2026-04-03 08:46:30',
    operatorName: 'zhangmin',
    operatorDepartment: '应用运维组',
    moduleName: '固定群管理',
    actionName: '更新成员',
    targetName: '交易系统应急群',
    result: 'success',
    clientIp: '10.10.12.88',
  },
  {
    logId: 'log-003',
    operatedAt: '2026-04-03 08:15:02',
    operatorName: 'liqian',
    operatorDepartment: '支付运维组',
    moduleName: '推送策略',
    actionName: '禁用策略',
    targetName: '历史报表失败通知',
    result: 'success',
    clientIp: '10.10.13.45',
  },
  {
    logId: 'log-004',
    operatedAt: '2026-04-02 20:10:45',
    operatorName: 'wangli',
    operatorDepartment: '数据保障组',
    moduleName: '上报策略',
    actionName: '保存策略',
    targetName: '客户中心常规上报策略',
    result: 'failed',
    clientIp: '10.10.14.33',
  },
]

function includesKeyword(fields: string[], keyword?: string) {
  if (!keyword) {
    return true
  }

  const normalizedKeyword = keyword.trim().toLowerCase()
  if (!normalizedKeyword) {
    return true
  }

  return fields.some((field) => field.toLowerCase().includes(normalizedKeyword))
}

export async function getOrganizationPageData(params?: OrganizationQueryParams): Promise<OrganizationPageData> {
  const filteredTeams = mockEmergencyTeams.filter((team) => {
    const matchesKeyword = includesKeyword(
      [team.teamName, team.businessSystem, team.leaderName, team.dutyScope],
      params?.keyword,
    )
    const matchesSystem = !params?.businessSystem || team.businessSystem === params.businessSystem

    return matchesKeyword && matchesSystem
  })

  const filteredMembers = mockOrganizationMembers.filter((member) => {
    const matchesKeyword = includesKeyword(
      [member.memberName, member.teamName, member.roleName, member.department],
      params?.keyword,
    )
    const matchesSystem = !params?.businessSystem || member.businessSystem === params.businessSystem

    return matchesKeyword && matchesSystem
  })

  const summary = {
    totalTeams: filteredTeams.length,
    totalMembers: filteredTeams.reduce((total, item) => total + item.memberCount, 0),
    onDutyMembers: filteredMembers.filter((member) => member.onDuty).length,
    linkedSystems: new Set(filteredTeams.map((team) => team.businessSystem)).size,
  }

  return Promise.resolve({
    summary,
    teams: filteredTeams,
    keyMembers: filteredMembers.slice(0, 5),
  })
}

export async function getReportingStrategyPage(
  params?: StrategyListQueryParams,
): Promise<PageResult<ReportingStrategy>> {
  const items = mockReportingStrategies.filter((strategy) => {
    const matchesKeyword = includesKeyword(
      [strategy.strategyName, strategy.businessSystem, strategy.targetType, strategy.notifyChannel],
      params?.keyword,
    )
    const matchesSystem = !params?.businessSystem || strategy.businessSystem === params.businessSystem
    const matchesStatus = !params?.status || strategy.status === params.status

    return matchesKeyword && matchesSystem && matchesStatus
  })

  return Promise.resolve({
    items,
    total: items.length,
    page: 1,
    pageSize: 10,
  })
}

export async function getReportingStrategyFormPreset(
  strategyId?: string,
): Promise<ReportingStrategyFormValues | undefined> {
  if (!strategyId) {
    return Promise.resolve({
      strategyName: '',
      businessSystem: '交易系统',
      triggerLevel: 'P1',
      targetType: '',
      responseLimitMinutes: 5,
      escalationLimitMinutes: 15,
      notifyChannel: '电话 + 短信',
      status: 'enabled',
      description: '',
    })
  }

  const strategy = mockReportingStrategies.find((item) => item.strategyId === strategyId)
  if (!strategy) {
    return Promise.resolve(undefined)
  }

  return Promise.resolve({
    strategyName: strategy.strategyName,
    businessSystem: strategy.businessSystem,
    triggerLevel: strategy.triggerLevel,
    targetType: strategy.targetType,
    responseLimitMinutes: strategy.responseLimitMinutes,
    escalationLimitMinutes: strategy.escalationLimitMinutes,
    notifyChannel: strategy.notifyChannel,
    status: strategy.status,
    description: strategy.description,
  })
}

export async function getPushStrategyPage(params?: StrategyListQueryParams): Promise<PageResult<PushStrategy>> {
  const items = mockPushStrategies.filter((strategy) => {
    const matchesKeyword = includesKeyword(
      [strategy.strategyName, strategy.businessSystem, strategy.triggerAction, strategy.templateName],
      params?.keyword,
    )
    const matchesSystem = !params?.businessSystem || strategy.businessSystem === params.businessSystem
    const matchesStatus = !params?.status || strategy.status === params.status

    return matchesKeyword && matchesSystem && matchesStatus
  })

  return Promise.resolve({
    items,
    total: items.length,
    page: 1,
    pageSize: 10,
  })
}

export async function getPushStrategyFormPreset(
  strategyId?: string,
): Promise<PushStrategyFormValues | undefined> {
  if (!strategyId) {
    return Promise.resolve({
      strategyName: '',
      businessSystem: '交易系统',
      triggerAction: 'P1 告警触发',
      targetScope: '',
      pushChannel: '企业微信机器人',
      templateName: '',
      status: 'enabled',
      description: '',
    })
  }

  const strategy = mockPushStrategies.find((item) => item.pushStrategyId === strategyId)
  if (!strategy) {
    return Promise.resolve(undefined)
  }

  return Promise.resolve({
    strategyName: strategy.strategyName,
    businessSystem: strategy.businessSystem,
    triggerAction: strategy.triggerAction,
    targetScope: strategy.targetScope,
    pushChannel: strategy.pushChannel,
    templateName: strategy.templateName,
    status: strategy.status,
    description: strategy.description,
  })
}

export async function getFixedGroupPage(params?: StrategyListQueryParams): Promise<PageResult<FixedGroup>> {
  const items = mockFixedGroups.filter((group) => {
    const matchesKeyword = includesKeyword(
      [group.fixedGroupName, group.businessSystem, group.ownerName, group.channelType],
      params?.keyword,
    )
    const matchesSystem = !params?.businessSystem || group.businessSystem === params.businessSystem
    const matchesStatus = !params?.status || group.status === params.status

    return matchesKeyword && matchesSystem && matchesStatus
  })

  return Promise.resolve({
    items,
    total: items.length,
    page: 1,
    pageSize: 10,
  })
}

export async function getFixedGroupFormPreset(groupId?: string): Promise<FixedGroupFormValues | undefined> {
  if (!groupId) {
    return Promise.resolve({
      fixedGroupName: '',
      businessSystem: '交易系统',
      groupType: '处置群',
      channelType: '企业微信',
      ownerName: '',
      memberNames: '',
      status: 'enabled',
      description: '',
    })
  }

  const group = mockFixedGroups.find((item) => item.fixedGroupId === groupId)
  if (!group) {
    return Promise.resolve(undefined)
  }

  return Promise.resolve({
    fixedGroupName: group.fixedGroupName,
    businessSystem: group.businessSystem,
    groupType: group.groupType,
    channelType: group.channelType,
    ownerName: group.ownerName,
    memberNames: group.memberNames,
    status: group.status,
    description: group.description,
  })
}

export async function getAnnouncementPage(params?: AnnouncementListQueryParams): Promise<PageResult<Announcement>> {
  const items = mockAnnouncements.filter((announcement) => {
    const matchesKeyword = includesKeyword(
      [announcement.title, announcement.audience, announcement.summary],
      params?.keyword,
    )
    const matchesStatus = !params?.status || announcement.status === params.status

    return matchesKeyword && matchesStatus
  })

  return Promise.resolve({
    items,
    total: items.length,
    page: 1,
    pageSize: 10,
  })
}

export async function getAnnouncementFormPreset(
  announcementId?: string,
): Promise<AnnouncementFormValues | undefined> {
  if (!announcementId) {
    return Promise.resolve({
      title: '',
      audience: '全员',
      publishStart: '2026-04-03 09:00',
      publishEnd: '2026-04-03 18:00',
      topPinned: false,
      status: 'draft',
      summary: '',
      content: '',
    })
  }

  const announcement = mockAnnouncements.find((item) => item.announcementId === announcementId)
  if (!announcement) {
    return Promise.resolve(undefined)
  }

  const [publishStart = '', publishEnd = ''] = announcement.publishWindow.split(' 至 ')

  return Promise.resolve({
    title: announcement.title,
    audience: announcement.audience,
    publishStart,
    publishEnd,
    topPinned: announcement.topPinned,
    status: announcement.status,
    summary: announcement.summary,
    content: announcement.content,
  })
}

export async function getOperationLogPage(params?: OperationLogQueryParams): Promise<PageResult<OperationLog>> {
  const items = mockOperationLogs.filter((log) => {
    const matchesKeyword = includesKeyword(
      [log.operatorName, log.targetName, log.actionName, log.moduleName],
      params?.keyword,
    )
    const matchesModule = !params?.moduleName || log.moduleName === params.moduleName
    const matchesResult = !params?.result || log.result === params.result

    return matchesKeyword && matchesModule && matchesResult
  })

  return Promise.resolve({
    items,
    total: items.length,
    page: 1,
    pageSize: 10,
  })
}

export async function getSystemSummary() {
  return Promise.resolve({
    organizations: mockEmergencyTeams.length,
    reportingStrategies: mockReportingStrategies.length,
    pushStrategies: mockPushStrategies.length,
    fixedGroups: mockFixedGroups.length,
  })
}

export const systemBusinessSystemOptions: Array<{ label: string; value: string }> = [
  { label: '交易系统', value: '交易系统' },
  { label: '支付系统', value: '支付系统' },
  { label: '客户中心', value: '客户中心' },
  { label: '清算系统', value: '清算系统' },
]

export const systemStatusOptions: Array<{ label: string; value: SystemConfigStatus }> = [
  { label: '启用', value: 'enabled' },
  { label: '停用', value: 'disabled' },
]

export const announcementStatusOptions: Array<{ label: string; value: AnnouncementStatus }> = [
  { label: '草稿', value: 'draft' },
  { label: '已发布', value: 'published' },
  { label: '已过期', value: 'expired' },
]

export const operationLogResultOptions: Array<{ label: string; value: OperationLogResult }> = [
  { label: '成功', value: 'success' },
  { label: '失败', value: 'failed' },
]