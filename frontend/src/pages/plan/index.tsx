import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Form, Input, Select, Space, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import { getPlanPage } from '../../services/plan'
import type { PublishStatus } from '../../types/common'
import type { Plan } from '../../types/plan'

const statusOptions: Array<{ label: string; value: PublishStatus }> = [
  { label: '草稿', value: 'draft' },
  { label: '待审批', value: 'pendingApproval' },
  { label: '已发布', value: 'published' },
  { label: '已废止', value: 'deprecated' },
]

function PlanListPage() {
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState<PublishStatus | undefined>()

  const queryParams = useMemo(() => ({ keyword, status }), [keyword, status])
  const { data, isLoading, isError } = useQuery({
    queryKey: ['plan-page', queryParams],
    queryFn: () => getPlanPage(queryParams),
  })

  const items = data?.items ?? []

  const columns: ColumnsType<Plan> = [
    {
      title: '预案名称',
      dataIndex: 'planName',
      key: 'planName',
      render: (value: string, record) => <Link to={`/emergency/plans/${record.planId}`}>{value}</Link>,
    },
    {
      title: '所属系统',
      dataIndex: 'businessSystem',
      key: 'businessSystem',
    },
    {
      title: '系统等级',
      dataIndex: 'systemLevel',
      key: 'systemLevel',
      width: 120,
    },
    {
      title: '关联场景数',
      key: 'relatedScenarioCount',
      width: 120,
      render: (_, record) => record.relatedScenarioIds.length,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (value: PublishStatus) => <StatusTag status={value} />,
    },
    {
      title: '版本',
      dataIndex: 'currentVersion',
      key: 'currentVersion',
      width: 100,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
    },
    {
      title: '操作',
      key: 'actions',
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/emergency/plans/${record.planId}`}>详情</Link>
          <Link to={`/emergency/plans/${record.planId}/edit`}>编辑</Link>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title="预案管理"
      extra={
        <Button type="primary">
          <Link to="/emergency/plans/new">新建预案</Link>
        </Button>
      }
    >
      <div className="space-y-4">
        <Card>
          <Form layout="inline">
            <Form.Item label="关键字">
              <Input
                placeholder="请输入预案名称/所属系统/系统等级"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                allowClear
                className="w-[320px]"
              />
            </Form.Item>
            <Form.Item label="状态">
              <Select
                placeholder="请选择状态"
                value={status}
                onChange={(value) => setStatus(value)}
                allowClear
                className="w-[180px]"
                options={statusOptions}
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  setKeyword('')
                  setStatus(undefined)
                }}
              >
                重置
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <Typography.Text className="text-sm text-slate-500">
              共 {items.length} 条预案记录
            </Typography.Text>
          </div>
          {isError ? <Alert type="error" showIcon message="预案数据加载失败，请稍后重试。" /> : null}
          {!isLoading && !isError && items.length === 0 ? (
            <EmptyBlock title="暂无预案数据" description="可以调整筛选条件，或直接新建一个预案。" />
          ) : (
            <Table<Plan>
              rowKey="planId"
              loading={isLoading}
              columns={columns}
              dataSource={items}
              pagination={{ pageSize: 10 }}
            />
          )}
        </Card>
      </div>
    </PageContainer>
  )
}

export default PlanListPage
