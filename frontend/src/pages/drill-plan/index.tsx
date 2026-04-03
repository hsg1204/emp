import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Form, Input, Select, Space, Statistic, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import { getDrillPlanFormOptions, getDrillPlanPage, getDrillPlanSummary } from '../../services/drillPlan'
import type { DrillPlan, DrillPlanStatus } from '../../types/drill-plan'

const statusOptions: Array<{ label: string; value: DrillPlanStatus }> = [
  { label: '草稿', value: 'draft' },
  { label: '待审批', value: 'pendingApproval' },
  { label: '已发布', value: 'published' },
  { label: '执行中', value: 'running' },
  { label: '已完成', value: 'completed' },
  { label: '已废止', value: 'deprecated' },
]

function DrillPlanListPage() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState<DrillPlanStatus | undefined>()
  const [businessSystem, setBusinessSystem] = useState<string | undefined>()
  const [drillType, setDrillType] = useState<string | undefined>()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const queryParams = useMemo(
    () => ({
      keyword,
      status,
      businessSystem,
      drillType,
      page,
      pageSize,
    }),
    [keyword, status, businessSystem, drillType, page, pageSize],
  )

  const { data, isLoading, isError } = useQuery({
    queryKey: ['drill-plan-page', queryParams],
    queryFn: () => getDrillPlanPage(queryParams),
  })

  const { data: summary, isError: summaryError } = useQuery({
    queryKey: ['drill-plan-summary', queryParams.keyword, queryParams.status, queryParams.businessSystem, queryParams.drillType],
    queryFn: () =>
      getDrillPlanSummary({
        keyword: queryParams.keyword,
        status: queryParams.status,
        businessSystem: queryParams.businessSystem,
        drillType: queryParams.drillType,
      }),
  })

  const { data: formOptions } = useQuery({
    queryKey: ['drill-plan-form-options'],
    queryFn: getDrillPlanFormOptions,
  })

  const items = data?.items ?? []
  const total = data?.total ?? 0
  const stats = summary ?? {
    total: 0,
    running: 0,
    completed: 0,
    pendingReport: 0,
  }

  const columns: ColumnsType<DrillPlan> = [
    {
      title: '演练计划名称',
      dataIndex: 'drillPlanName',
      key: 'drillPlanName',
      render: (value: string, record) => <Link to={`/drills/plans/${record.drillPlanId}`}>{value}</Link>,
    },
    {
      title: '业务系统',
      dataIndex: 'businessSystem',
      key: 'businessSystem',
      width: 120,
    },
    {
      title: '演练类型',
      dataIndex: 'drillType',
      key: 'drillType',
      width: 120,
    },
    {
      title: '关联场景',
      dataIndex: 'relatedScenarioName',
      key: 'relatedScenarioName',
      width: 180,
    },
    {
      title: '计划负责人',
      dataIndex: 'commander',
      key: 'commander',
      width: 120,
    },
    {
      title: '计划时间',
      dataIndex: 'scheduledTime',
      key: 'scheduledTime',
      width: 180,
    },
    {
      title: '报告状态',
      dataIndex: 'reportStatus',
      key: 'reportStatus',
      width: 120,
      render: (value: DrillPlan['reportStatus']) => <StatusTag status={value} />,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (value: DrillPlanStatus) => <StatusTag status={value} />,
    },
    {
      title: '操作',
      key: 'actions',
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/drills/plans/${record.drillPlanId}`}>详情</Link>
          <Link to={`/drills/plans/${record.drillPlanId}/edit`}>编辑</Link>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title="应急演练计划"
      extra={
        <Button type="primary" onClick={() => navigate('/drills/plans/new')}>
          新建演练计划
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <Card>
            <Statistic title="计划总数" value={stats.total} />
          </Card>
          <Card>
            <Statistic title="执行中" value={stats.running} />
          </Card>
          <Card>
            <Statistic title="已完成" value={stats.completed} />
          </Card>
          <Card>
            <Statistic title="待提交报告" value={stats.pendingReport} />
          </Card>
        </div>

        <Card>
          <Form layout="inline" className="gap-y-4">
            <Form.Item label="关键字">
              <Input
                placeholder="请输入演练名称/系统/类型/负责人"
                value={keyword}
                onChange={(event) => {
                  setKeyword(event.target.value)
                  setPage(1)
                }}
                allowClear
                className="w-[320px]"
              />
            </Form.Item>
            <Form.Item label="状态">
              <Select
                placeholder="请选择状态"
                value={status}
                onChange={(value) => {
                  setStatus(value)
                  setPage(1)
                }}
                allowClear
                className="w-[180px]"
                options={statusOptions}
              />
            </Form.Item>
            <Form.Item label="业务系统">
              <Select
                placeholder="请选择业务系统"
                value={businessSystem}
                onChange={(value) => {
                  setBusinessSystem(value)
                  setPage(1)
                }}
                allowClear
                className="w-[180px]"
                options={formOptions?.businessSystems ?? []}
              />
            </Form.Item>
            <Form.Item label="演练类型">
              <Select
                placeholder="请选择演练类型"
                value={drillType}
                onChange={(value) => {
                  setDrillType(value)
                  setPage(1)
                }}
                allowClear
                className="w-[180px]"
                options={formOptions?.drillTypes ?? []}
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  setKeyword('')
                  setStatus(undefined)
                  setBusinessSystem(undefined)
                  setDrillType(undefined)
                  setPage(1)
                  setPageSize(10)
                }}
              >
                重置
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card>
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <Typography.Text className="text-sm text-slate-500">
              共 {total} 条演练计划，当前第 {page} 页
            </Typography.Text>
            <Typography.Text className="text-sm text-slate-500">
              覆盖演练编排、执行记录和报告跟踪的 Phase 1 视图
            </Typography.Text>
          </div>

          {isError || summaryError ? <Alert type="error" showIcon message="演练计划数据加载失败，请稍后重试。" /> : null}

          {!isLoading && !isError && items.length === 0 ? (
            <EmptyBlock title="暂无演练计划数据" description="可以调整筛选条件，或直接新建一个演练计划。" />
          ) : (
            <Table<DrillPlan>
              rowKey="drillPlanId"
              loading={isLoading}
              columns={columns}
              dataSource={items}
              pagination={{
                current: page,
                pageSize,
                total,
                showSizeChanger: true,
                onChange: (nextPage, nextPageSize) => {
                  setPage(nextPage)
                  setPageSize(nextPageSize)
                },
              }}
            />
          )}
        </Card>
      </div>
    </PageContainer>
  )
}

export default DrillPlanListPage
