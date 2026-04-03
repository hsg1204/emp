import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Form, Input, Select, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import EmptyBlock from '../../../components/common/EmptyBlock'
import PageContainer from '../../../components/common/PageContainer'
import StatusTag from '../../../components/common/StatusTag'
import { getFixedGroupPage, systemBusinessSystemOptions, systemStatusOptions } from '../../../services/system'
import type { FixedGroup } from '../../../types/system'
import { systemStatusColorMap, systemStatusLabelMap } from '../constants'

function FixedGroupPage() {
  const [keyword, setKeyword] = useState('')
  const [businessSystem, setBusinessSystem] = useState<string | undefined>()
  const [status, setStatus] = useState<FixedGroup['status'] | undefined>()

  const queryParams = useMemo(() => ({ keyword, businessSystem, status }), [keyword, businessSystem, status])
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['fixed-group-page', queryParams],
    queryFn: () => getFixedGroupPage(queryParams),
  })

  const items = data?.items ?? []

  const columns: ColumnsType<FixedGroup> = [
    {
      title: '群组名称',
      dataIndex: 'fixedGroupName',
      key: 'fixedGroupName',
    },
    {
      title: '所属系统',
      dataIndex: 'businessSystem',
      key: 'businessSystem',
      width: 120,
    },
    {
      title: '群组类型',
      dataIndex: 'groupType',
      key: 'groupType',
      width: 120,
    },
    {
      title: '通道类型',
      dataIndex: 'channelType',
      key: 'channelType',
      width: 120,
    },
    {
      title: '负责人',
      dataIndex: 'ownerName',
      key: 'ownerName',
      width: 100,
    },
    {
      title: '成员数',
      dataIndex: 'memberCount',
      key: 'memberCount',
      width: 90,
    },
    {
      title: '群成员摘要',
      dataIndex: 'memberNames',
      key: 'memberNames',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value: FixedGroup['status']) => (
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
      render: (_, record) => <Link to={`/system/fixed-groups/${record.fixedGroupId}/edit`}>编辑</Link>,
    },
  ]

  return (
    <PageContainer
      title="固定群管理"
      extra={
        <Button type="primary">
          <Link to="/system/fixed-groups/new">新建固定群</Link>
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
              管理应急处置固定群和值班群，保持群成员、负责人与业务系统映射关系清晰可用。
            </Typography.Paragraph>
          </div>
        </Card>

        <Card>
          <Form layout="inline">
            <Form.Item label="关键字">
              <Input
                placeholder="请输入群组名称/负责人/通道类型"
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
            <Typography.Text className="text-sm text-slate-500">共 {items.length} 个固定群</Typography.Text>
          </div>
          {isError ? (
            <Alert
              type="error"
              showIcon
              message="固定群数据加载失败，请稍后重试。"
              action={
                <Button size="small" onClick={() => void refetch()}>
                  重新加载
                </Button>
              }
            />
          ) : null}
          {!isError ? (
            !isLoading && items.length === 0 ? (
              <EmptyBlock title="暂无固定群数据" description="可以调整筛选条件，或新建一个固定群。" />
            ) : (
              <Table<FixedGroup>
                rowKey="fixedGroupId"
                loading={isLoading}
                columns={columns}
                dataSource={items}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1360 }}
              />
            )
          ) : null}
        </Card>
      </div>
    </PageContainer>
  )
}

export default FixedGroupPage
