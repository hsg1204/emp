import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Form, Input, Select, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import EmptyBlock from '../../../components/common/EmptyBlock'
import PageContainer from '../../../components/common/PageContainer'
import StatusTag from '../../../components/common/StatusTag'
import { getPushStrategyPage, systemBusinessSystemOptions, systemStatusOptions } from '../../../services/system'
import type { PushStrategy } from '../../../types/system'
import { systemStatusColorMap, systemStatusLabelMap } from '../constants'

function PushStrategyPage() {
  const [keyword, setKeyword] = useState('')
  const [businessSystem, setBusinessSystem] = useState<string | undefined>()
  const [status, setStatus] = useState<PushStrategy['status'] | undefined>()

  const queryParams = useMemo(() => ({ keyword, businessSystem, status }), [keyword, businessSystem, status])
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['push-strategy-page', queryParams],
    queryFn: () => getPushStrategyPage(queryParams),
  })

  const items = data?.items ?? []

  const columns: ColumnsType<PushStrategy> = [
    {
      title: '策略名称',
      dataIndex: 'strategyName',
      key: 'strategyName',
    },
    {
      title: '所属系统',
      dataIndex: 'businessSystem',
      key: 'businessSystem',
      width: 120,
    },
    {
      title: '触发动作',
      dataIndex: 'triggerAction',
      key: 'triggerAction',
      width: 180,
    },
    {
      title: '推送对象',
      dataIndex: 'targetScope',
      key: 'targetScope',
      width: 200,
    },
    {
      title: '推送通道',
      dataIndex: 'pushChannel',
      key: 'pushChannel',
      width: 150,
    },
    {
      title: '消息模板',
      dataIndex: 'templateName',
      key: 'templateName',
      width: 180,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value: PushStrategy['status']) => (
        <StatusTag status={value} colorMap={systemStatusColorMap} labelMap={systemStatusLabelMap} />
      ),
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
      width: 100,
      render: (_, record) => <Link to={`/system/push-strategies/${record.pushStrategyId}/edit`}>编辑</Link>,
    },
  ]

  return (
    <PageContainer
      title="推送策略"
      extra={
        <Button type="primary">
          <Link to="/system/push-strategies/new">新建推送策略</Link>
        </Button>
      }
    >
      <div className="space-y-4">
        <Card>
          <div className="space-y-2">
            <Typography.Title level={5} className="mb-0">
              页面说明
            </Typography.Title>
            <Typography.Paragraph className="mb-0 text-slate-500">
              维护故障触发后的消息推送路径，统一通知对象、通道与消息模板。
            </Typography.Paragraph>
          </div>
        </Card>

        <Card>
          <Form layout="inline">
            <Form.Item label="关键字">
              <Input
                placeholder="请输入策略名称/触发动作/消息模板"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                allowClear
                className="w-[320px]"
              />
            </Form.Item>
            <Form.Item label="所属系统">
              <Select
                placeholder="请选择所属系统"
                value={businessSystem}
                onChange={(value) => setBusinessSystem(value)}
                allowClear
                className="w-[180px]"
                options={systemBusinessSystemOptions}
              />
            </Form.Item>
            <Form.Item label="状态">
              <Select
                placeholder="请选择状态"
                value={status}
                onChange={(value) => setStatus(value)}
                allowClear
                className="w-[160px]"
                options={systemStatusOptions}
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  setKeyword('')
                  setBusinessSystem(undefined)
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
            <Typography.Text className="text-sm text-slate-500">共 {items.length} 条推送策略</Typography.Text>
          </div>
          {isError ? (
            <Alert
              type="error"
              showIcon
              message="推送策略数据加载失败，请稍后重试。"
              action={
                <Button size="small" onClick={() => void refetch()}>
                  重新加载
                </Button>
              }
            />
          ) : null}
          {!isError ? (
            !isLoading && items.length === 0 ? (
              <EmptyBlock title="暂无推送策略" description="可以调整筛选条件，或新建一条推送策略。" />
            ) : (
              <Table<PushStrategy>
                rowKey="pushStrategyId"
                loading={isLoading}
                columns={columns}
                dataSource={items}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1320 }}
              />
            )
          ) : null}
        </Card>
      </div>
    </PageContainer>
  )
}

export default PushStrategyPage
