import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Form, Input, Select, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import EmptyBlock from '../../../components/common/EmptyBlock'
import PageContainer from '../../../components/common/PageContainer'
import StatusTag from '../../../components/common/StatusTag'
import {
  getReportingStrategyPage,
  systemBusinessSystemOptions,
  systemStatusOptions,
} from '../../../services/system'
import type { ReportingStrategy } from '../../../types/system'
import { systemStatusColorMap, systemStatusLabelMap } from '../constants'

function ReportingStrategyPage() {
  const [keyword, setKeyword] = useState('')
  const [businessSystem, setBusinessSystem] = useState<string | undefined>()
  const [status, setStatus] = useState<ReportingStrategy['status'] | undefined>()

  const queryParams = useMemo(() => ({ keyword, businessSystem, status }), [keyword, businessSystem, status])
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['reporting-strategy-page', queryParams],
    queryFn: () => getReportingStrategyPage(queryParams),
  })

  const items = data?.items ?? []

  const columns: ColumnsType<ReportingStrategy> = [
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
      title: '触发等级',
      dataIndex: 'triggerLevel',
      key: 'triggerLevel',
      width: 120,
    },
    {
      title: '上报对象',
      dataIndex: 'targetType',
      key: 'targetType',
      width: 180,
    },
    {
      title: '响应时限',
      key: 'responseLimitMinutes',
      width: 120,
      render: (_, record) => `${record.responseLimitMinutes} 分钟`,
    },
    {
      title: '升级时限',
      key: 'escalationLimitMinutes',
      width: 120,
      render: (_, record) => `${record.escalationLimitMinutes} 分钟`,
    },
    {
      title: '通知方式',
      dataIndex: 'notifyChannel',
      key: 'notifyChannel',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value: ReportingStrategy['status']) => (
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
      render: (_, record) => <Link to={`/system/reporting-strategies/${record.strategyId}/edit`}>编辑</Link>,
    },
  ]

  return (
    <PageContainer
      title="上报策略"
      extra={
        <Button type="primary">
          <Link to="/system/reporting-strategies/new">新建上报策略</Link>
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
              配置不同业务系统的故障上报等级、响应时限和升级对象，确保值班协同节奏一致。
            </Typography.Paragraph>
          </div>
        </Card>

        <Card>
          <Form layout="inline">
            <Form.Item label="关键字">
              <Input
                placeholder="请输入策略名称/上报对象/通知方式"
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
            <Typography.Text className="text-sm text-slate-500">共 {items.length} 条上报策略</Typography.Text>
          </div>
          {isError ? (
            <Alert
              type="error"
              showIcon
              message="上报策略数据加载失败，请稍后重试。"
              action={
                <Button size="small" onClick={() => void refetch()}>
                  重新加载
                </Button>
              }
            />
          ) : null}
          {!isError ? (
            !isLoading && items.length === 0 ? (
              <EmptyBlock title="暂无上报策略" description="可以调整筛选条件，或新建一条上报策略。" />
            ) : (
              <Table<ReportingStrategy>
                rowKey="strategyId"
                loading={isLoading}
                columns={columns}
                dataSource={items}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1250 }}
              />
            )
          ) : null}
        </Card>
      </div>
    </PageContainer>
  )
}

export default ReportingStrategyPage
