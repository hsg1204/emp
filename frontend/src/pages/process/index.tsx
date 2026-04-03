import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Form, Input, Select, Space, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import { getProcessPage } from '../../services/process'
import type { PublishStatus } from '../../types/common'
import type { ProcessDefinition } from '../../types/process'

const statusOptions: Array<{ label: string; value: PublishStatus }> = [
  { label: '草稿', value: 'draft' },
  { label: '待审批', value: 'pendingApproval' },
  { label: '已发布', value: 'published' },
  { label: '已废止', value: 'deprecated' },
]

const processTypeOptions = [
  { label: '排查流程', value: '排查流程' },
  { label: '决策流程', value: '决策流程' },
  { label: '恢复流程', value: '恢复流程' },
  { label: '补偿流程', value: '补偿流程' },
]

function ProcessListPage() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState<PublishStatus | undefined>()
  const [processType, setProcessType] = useState<string | undefined>()

  const queryParams = useMemo(() => ({ keyword, status, processType }), [keyword, status, processType])
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['process-page', queryParams],
    queryFn: () => getProcessPage(queryParams),
  })

  const items = data?.items ?? []
  const total = data?.total ?? 0

  const columns: ColumnsType<ProcessDefinition> = [
    {
      title: '流程名称',
      dataIndex: 'processName',
      key: 'processName',
      render: (value: string, record) => <Link to={`/emergency/processes/${record.processId}`}>{value}</Link>,
    },
    {
      title: '流程类型',
      dataIndex: 'processType',
      key: 'processType',
      width: 120,
    },
    {
      title: '适用系统',
      dataIndex: 'applicableSystem',
      key: 'applicableSystem',
      width: 140,
    },
    {
      title: '归口部门',
      dataIndex: 'ownerDepartment',
      key: 'ownerDepartment',
      width: 140,
    },
    {
      title: '关联场景数',
      dataIndex: 'relatedScenarioCount',
      key: 'relatedScenarioCount',
      width: 120,
    },
    {
      title: '节点数',
      dataIndex: 'nodeCount',
      key: 'nodeCount',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
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
          <Link to={`/emergency/processes/${record.processId}`}>详情</Link>
          <Link to={`/emergency/processes/${record.processId}/edit`}>编辑</Link>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title="流程管理"
      extra={
        <Button type="primary" onClick={() => navigate('/emergency/processes/new')}>
          新建流程
        </Button>
      }
    >
      <div className="space-y-4">
        <Card>
          <Form layout="inline">
            <Form.Item label="关键字">
              <Input
                placeholder="请输入流程名称/流程类型/适用系统/归口部门"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                allowClear
                className="w-[320px]"
              />
            </Form.Item>
            <Form.Item label="流程类型">
              <Select
                placeholder="请选择流程类型"
                value={processType}
                onChange={(value) => setProcessType(value)}
                allowClear
                className="w-[180px]"
                options={processTypeOptions}
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
                  setProcessType(undefined)
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
            <Typography.Text className="text-sm text-slate-500">共 {total} 条流程记录</Typography.Text>
          </div>
          {isError ? (
            <Alert
              type="error"
              showIcon
              message="流程数据加载失败，请稍后重试。"
              action={
                <Button size="small" onClick={() => void refetch()}>
                  重试
                </Button>
              }
            />
          ) : !isLoading && items.length === 0 ? (
            <EmptyBlock title="暂无流程数据" description="可以调整筛选条件，或直接新建一个流程。" />
          ) : (
            <Table<ProcessDefinition>
              rowKey="processId"
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

export default ProcessListPage
