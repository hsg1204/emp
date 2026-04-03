import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Form, Input, Select, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import { eventLevelColorMap, eventLevelOptions, eventSourceLabelMap, eventSourceOptions, eventStatusOptions } from './constants'
import { getEventPage } from '../../services/event'
import type { EventLevel, EventRecord, EventSource, EventStatus } from '../../types/event'

function EventListPage() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState<EventStatus | undefined>()
  const [level, setLevel] = useState<EventLevel | undefined>()
  const [source, setSource] = useState<EventSource | undefined>()

  const queryParams = useMemo(() => ({ keyword, status, level, source }), [keyword, status, level, source])
  const { data, isLoading, isError } = useQuery({
    queryKey: ['event-page', queryParams],
    queryFn: () => getEventPage(queryParams),
  })

  const items = data?.items ?? []

  const columns: ColumnsType<EventRecord> = [
    {
      title: '事件标题',
      dataIndex: 'eventTitle',
      key: 'eventTitle',
      render: (value: string, record) => <Link to={`/events/${record.eventId}`}>{value}</Link>,
    },
    {
      title: '事件编号',
      dataIndex: 'eventCode',
      key: 'eventCode',
      width: 160,
    },
    {
      title: '所属系统',
      dataIndex: 'businessSystem',
      key: 'businessSystem',
      width: 140,
    },
    {
      title: '事件等级',
      dataIndex: 'eventLevel',
      key: 'eventLevel',
      width: 110,
      render: (value: EventLevel) => <Tag color={eventLevelColorMap[value]}>{value}</Tag>,
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      width: 120,
      render: (value: EventSource) => eventSourceLabelMap[value],
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (value: EventStatus) => <StatusTag status={value} />,
    },
    {
      title: '应急指挥',
      dataIndex: 'emergencyCommander',
      key: 'emergencyCommander',
      width: 120,
    },
    {
      title: '当前阶段',
      dataIndex: 'currentPhase',
      key: 'currentPhase',
      width: 140,
    },
    {
      title: '发生时间',
      dataIndex: 'incidentTime',
      key: 'incidentTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'actions',
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/events/${record.eventId}`}>详情</Link>
          <Link to={`/events/${record.eventId}/edit`}>编辑</Link>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title="事件管理"
      extra={
        <Button type="primary" onClick={() => navigate('/events/new')}>
          新建事件
        </Button>
      }
    >
      <div className="space-y-4">
        <Card>
          <Form layout="inline" className="gap-y-3">
            <Form.Item label="关键字">
              <Input
                placeholder="请输入事件标题/事件编号/所属系统"
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
                options={eventStatusOptions}
              />
            </Form.Item>
            <Form.Item label="等级">
              <Select
                placeholder="请选择等级"
                value={level}
                onChange={(value) => setLevel(value)}
                allowClear
                className="w-[140px]"
                options={eventLevelOptions}
              />
            </Form.Item>
            <Form.Item label="来源">
              <Select
                placeholder="请选择来源"
                value={source}
                onChange={(value) => setSource(value)}
                allowClear
                className="w-[180px]"
                options={eventSourceOptions}
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  setKeyword('')
                  setStatus(undefined)
                  setLevel(undefined)
                  setSource(undefined)
                }}
              >
                重置
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <Typography.Text className="text-sm text-slate-500">
              共 {items.length} 条事件记录
            </Typography.Text>
            <Typography.Text className="text-sm text-slate-500">
              Phase 1 采用轻量工作台方式承载响应、协同与记录动作
            </Typography.Text>
          </div>

          {isError ? (
            <Alert
              type="error"
              showIcon
              message="事件数据加载失败，请稍后重试。"
              action={<Button size="small" onClick={() => navigate(0)}>重新加载</Button>}
            />
          ) : !isLoading && items.length === 0 ? (
            <EmptyBlock title="暂无事件数据" description="可以调整筛选条件，或直接新建一个事件。" />
          ) : (
            <Table<EventRecord>
              rowKey="eventId"
              loading={isLoading}
              columns={columns}
              dataSource={items}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1380 }}
            />
          )}
        </Card>
      </div>
    </PageContainer>
  )
}

export default EventListPage
