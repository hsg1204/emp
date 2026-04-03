import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Form, Input, Select, Switch, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import EmptyBlock from '../../../components/common/EmptyBlock'
import PageContainer from '../../../components/common/PageContainer'
import StatusTag from '../../../components/common/StatusTag'
import { announcementStatusOptions, getAnnouncementPage } from '../../../services/system'
import type { Announcement } from '../../../types/system'
import { announcementStatusColorMap, announcementStatusLabelMap } from '../constants'

function AnnouncementPage() {
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState<Announcement['status'] | undefined>()

  const queryParams = useMemo(() => ({ keyword, status }), [keyword, status])
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['announcement-page', queryParams],
    queryFn: () => getAnnouncementPage(queryParams),
  })

  const items = data?.items ?? []

  const columns: ColumnsType<Announcement> = [
    {
      title: '公告标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '公告对象',
      dataIndex: 'audience',
      key: 'audience',
      width: 180,
    },
    {
      title: '发布时间窗',
      dataIndex: 'publishWindow',
      key: 'publishWindow',
      width: 240,
    },
    {
      title: '置顶',
      dataIndex: 'topPinned',
      key: 'topPinned',
      width: 90,
      render: (value: boolean) => <Switch checked={value} disabled size="small" />,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value: Announcement['status']) => (
        <StatusTag status={value} colorMap={announcementStatusColorMap} labelMap={announcementStatusLabelMap} />
      ),
    },
    {
      title: '摘要',
      dataIndex: 'summary',
      key: 'summary',
      width: 260,
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
      render: (_, record) => <Link to={`/system/announcements/${record.announcementId}/edit`}>编辑</Link>,
    },
  ]

  return (
    <PageContainer
      title="公告管理"
      extra={
        <Button type="primary">
          <Link to="/system/announcements/new">新建公告</Link>
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
              发布平台通知、值班安排和演练提示，支持按状态查看公告草稿、已发布和历史过期内容。
            </Typography.Paragraph>
          </div>
        </Card>

        <Card>
          <Form layout="inline">
            <Form.Item label="关键字">
              <Input
                placeholder="请输入公告标题/对象/摘要"
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
                className="w-[160px]"
                options={announcementStatusOptions}
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
            <Typography.Text className="text-sm text-slate-500">共 {items.length} 条公告</Typography.Text>
          </div>
          {isError ? (
            <Alert
              type="error"
              showIcon
              message="公告数据加载失败，请稍后重试。"
              action={
                <Button size="small" onClick={() => void refetch()}>
                  重新加载
                </Button>
              }
            />
          ) : null}
          {!isError ? (
            !isLoading && items.length === 0 ? (
              <EmptyBlock title="暂无公告数据" description="可以调整筛选条件，或新建一条公告。" />
            ) : (
              <Table<Announcement>
                rowKey="announcementId"
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

export default AnnouncementPage
