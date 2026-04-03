import type { BaseOption, PageResult } from '../types/common'
import type {
  ReviewIssue,
  ReviewIssueFormValues,
  ReviewIssuePageParams,
  ReviewIssueSourceType,
} from '../types/review-issue'

const sourceReferenceOptions: Array<{ label: string; value: string; sourceType: ReviewIssueSourceType }> = [
  { label: '年度核心系统桌面演练', value: 'drill-plan-001', sourceType: 'drillPlan' },
  { label: '支付切换专项演练', value: 'drill-plan-002', sourceType: 'drillPlan' },
  { label: '交易系统网络抖动事件', value: 'event-001', sourceType: 'event' },
  { label: '清算延迟处置事件', value: 'event-002', sourceType: 'event' },
]

const mockIssues: ReviewIssue[] = [
  {
    issueId: 'issue-001',
    issueCode: 'RI-2026-001',
    issueTitle: '演练通知链路存在延迟',
    sourceType: 'drillPlan',
    severity: 'high',
    status: 'open',
    ownerName: '张敏',
    ownerDepartment: '应急运营组',
    dueDate: '2026-04-15',
    discoveredAt: '2026-04-02 09:30:00',
    issueCategory: '通知机制',
    impactScope: '影响演练升级通知到达效率，可能延误跨团队联动。',
    issueDescription:
      '桌面演练中发现企业微信与短信通知串行执行，导致关键联系人收到通知平均延迟 6 分钟。',
    correctiveAction: '改为并行通知并补充失败重试策略，新增通知链路巡检任务。',
    sourceLink: {
      sourceId: 'drill-plan-001',
      sourceType: 'drillPlan',
      sourceName: '年度核心系统桌面演练',
      sourceCode: 'DRILL-2026-001',
      summary: '来源于 2026 年度核心系统桌面演练复盘结论。',
    },
    followUpRecords: [
      {
        recordId: 'record-001',
        actionType: 'created',
        content: '复盘会议确认问题并纳入首批整改清单。',
        operator: '李婷',
        operatedAt: '2026-04-02 10:00:00',
      },
      {
        recordId: 'record-002',
        actionType: 'assigned',
        content: '指定应急运营组负责整改，并要求一周内提交优化方案。',
        operator: '王磊',
        operatedAt: '2026-04-02 14:20:00',
      },
    ],
    createdBy: 'admin',
    createdAt: '2026-04-02 11:00:00',
    updatedAt: '2026-04-03 09:10:00',
  },
  {
    issueId: 'issue-002',
    issueCode: 'RI-2026-002',
    issueTitle: '事件升级联系人表单信息不完整',
    sourceType: 'event',
    severity: 'medium',
    status: 'inProgress',
    ownerName: '刘晨',
    ownerDepartment: '值班管理组',
    dueDate: '2026-04-20',
    discoveredAt: '2026-04-01 18:45:00',
    issueCategory: '流程执行',
    impactScope: '事件升级时需人工补录联系人，增加值班人员判断负担。',
    issueDescription:
      '生产事件复盘发现升级模板缺少业务负责人备用电话字段，导致夜间升级信息不完整。',
    correctiveAction: '完善升级模板字段并增加值班校验提示。',
    sourceLink: {
      sourceId: 'event-001',
      sourceType: 'event',
      sourceName: '交易系统网络抖动事件',
      sourceCode: 'EVENT-2026-017',
      summary: '来源于交易系统网络抖动事件复盘记录。',
    },
    followUpRecords: [
      {
        recordId: 'record-003',
        actionType: 'created',
        content: '生产事件复盘确认联系人字段缺失问题。',
        operator: '陈立',
        operatedAt: '2026-04-01 19:10:00',
      },
      {
        recordId: 'record-004',
        actionType: 'tracked',
        content: '值班管理组已提交表单字段调整方案，等待上线排期。',
        operator: '刘晨',
        operatedAt: '2026-04-03 10:20:00',
      },
    ],
    createdBy: 'admin',
    createdAt: '2026-04-01 19:00:00',
    updatedAt: '2026-04-03 10:20:00',
  },
  {
    issueId: 'issue-003',
    issueCode: 'RI-2026-003',
    issueTitle: '演练记录归档路径命名不统一',
    sourceType: 'drillPlan',
    severity: 'low',
    status: 'resolved',
    ownerName: '赵楠',
    ownerDepartment: '演练组织组',
    dueDate: '2026-04-10',
    discoveredAt: '2026-03-29 16:30:00',
    issueCategory: '资料归档',
    impactScope: '历史演练资料检索效率下降，但不影响当前处置。',
    issueDescription: '不同演练项目使用了不一致的归档命名规则，检索时需人工比对。',
    correctiveAction: '统一归档命名模板并补录历史目录映射表。',
    sourceLink: {
      sourceId: 'drill-plan-002',
      sourceType: 'drillPlan',
      sourceName: '支付切换专项演练',
      sourceCode: 'DRILL-2026-008',
      summary: '来源于支付切换专项演练资料归档检查。',
    },
    followUpRecords: [
      {
        recordId: 'record-005',
        actionType: 'updated',
        content: '已完成历史目录映射整理，并发布统一命名规范。',
        operator: '赵楠',
        operatedAt: '2026-04-02 17:00:00',
      },
      {
        recordId: 'record-006',
        actionType: 'resolved',
        content: '抽查近三次演练资料归档均已符合新规范。',
        operator: '王磊',
        operatedAt: '2026-04-03 08:40:00',
      },
    ],
    createdBy: 'admin',
    createdAt: '2026-03-29 17:20:00',
    updatedAt: '2026-04-03 08:40:00',
  },
  {
    issueId: 'issue-004',
    issueCode: 'RI-2026-004',
    issueTitle: '清算延迟事件整改项已关闭待归档',
    sourceType: 'event',
    severity: 'critical',
    status: 'closed',
    ownerName: '孙航',
    ownerDepartment: '清算支持组',
    dueDate: '2026-03-28',
    discoveredAt: '2026-03-20 11:00:00',
    issueCategory: '系统韧性',
    impactScope: '曾影响跨系统结算链路，需要重点保留闭环记录。',
    issueDescription: '清算延迟事件暴露批处理超时阈值配置不合理，峰值时段易触发重试堆积。',
    correctiveAction: '完成阈值重设、限流优化与值班监控告警补强。',
    sourceLink: {
      sourceId: 'event-002',
      sourceType: 'event',
      sourceName: '清算延迟处置事件',
      sourceCode: 'EVENT-2026-011',
      summary: '来源于清算延迟处置事件复盘。',
    },
    followUpRecords: [
      {
        recordId: 'record-007',
        actionType: 'resolved',
        content: '生产验证通过，未再出现批处理重试堆积。',
        operator: '孙航',
        operatedAt: '2026-03-27 18:10:00',
      },
      {
        recordId: 'record-008',
        actionType: 'closed',
        content: '复盘负责人确认闭环，问题转入归档。',
        operator: '李婷',
        operatedAt: '2026-03-28 09:00:00',
      },
    ],
    createdBy: 'admin',
    createdAt: '2026-03-20 13:00:00',
    updatedAt: '2026-03-28 09:00:00',
  },
]

const issueFormPresets: Record<string, ReviewIssueFormValues> = Object.fromEntries(
  mockIssues.map((issue) => [
    issue.issueId,
    {
      issueTitle: issue.issueTitle,
      issueCategory: issue.issueCategory,
      sourceType: issue.sourceType,
      sourceId: issue.sourceLink.sourceId,
      severity: issue.severity,
      ownerName: issue.ownerName,
      ownerDepartment: issue.ownerDepartment,
      discoveredAt: issue.discoveredAt,
      dueDate: issue.dueDate,
      issueDescription: issue.issueDescription,
      impactScope: issue.impactScope,
      correctiveAction: issue.correctiveAction,
      status: issue.status,
    },
  ]),
) as Record<string, ReviewIssueFormValues>

const createIssuePreset: ReviewIssueFormValues = {
  issueTitle: '',
  issueCategory: '',
  sourceType: 'drillPlan',
  sourceId: 'drill-plan-001',
  severity: 'medium',
  ownerName: '',
  ownerDepartment: '',
  discoveredAt: '2026-04-03 09:00:00',
  dueDate: '2026-04-17',
  issueDescription: '',
  impactScope: '',
  correctiveAction: '',
  status: 'open',
}

export async function getReviewIssuePage(params?: ReviewIssuePageParams): Promise<PageResult<ReviewIssue>> {
  const keyword = params?.keyword?.trim().toLowerCase()
  const items = mockIssues.filter((issue) => {
    const matchesKeyword =
      !keyword ||
      issue.issueCode.toLowerCase().includes(keyword) ||
      issue.issueTitle.toLowerCase().includes(keyword) ||
      issue.ownerName.toLowerCase().includes(keyword) ||
      issue.issueCategory.toLowerCase().includes(keyword)

    const matchesStatus = !params?.status || issue.status === params.status
    const matchesSourceType = !params?.sourceType || issue.sourceType === params.sourceType
    const matchesSeverity = !params?.severity || issue.severity === params.severity

    return matchesKeyword && matchesStatus && matchesSourceType && matchesSeverity
  })

  return Promise.resolve({
    items,
    total: items.length,
    page: 1,
    pageSize: 10,
  })
}

export async function getReviewIssueById(issueId: string): Promise<ReviewIssue | null> {
  const issue = mockIssues.find((item) => item.issueId === issueId) ?? null
  return Promise.resolve(issue)
}

export async function getReviewIssueFormPreset(issueId?: string): Promise<ReviewIssueFormValues | null> {
  if (!issueId) {
    return Promise.resolve(createIssuePreset)
  }

  return Promise.resolve(issueFormPresets[issueId] ?? null)
}

export async function getReviewIssueSourceOptions(
  sourceType?: ReviewIssueSourceType,
): Promise<BaseOption[]> {
  const options = sourceReferenceOptions
    .filter((option) => !sourceType || option.sourceType === sourceType)
    .map(({ label, value }) => ({ label, value }))

  return Promise.resolve(options)
}
