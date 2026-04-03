import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Form, Input, Select, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import { getReviewIssuePage } from '../../services/reviewIssue'
import type { ReviewIssue, ReviewIssueSeverity, ReviewIssueSourceType, ReviewIssueStatus } from '../../types/review-issue'
import {
  reviewIssueSeverityColorMap,
  reviewIssueSeverityLabelMap,
  reviewIssueSeverityOptions,
  reviewIssueSourceTypeLabelMap,
  reviewIssueSourceTypeOptions,
  reviewIssueStatusColorMap,
  reviewIssueStatusLabelMap,
  reviewIssueStatusOptions,
} from './constants'

function ReviewIssueListPage() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState<ReviewIssueStatus | undefined>()
  const [sourceType, setSourceType] = useState<ReviewIssueSourceType | undefined>()
  const [severity, setSeverity] = useState<ReviewIssueSeverity | undefined>()

  const queryParams = useMemo(
    () => ({ keyword, status, sourceType, severity }),
    [keyword, severity, sourceType, status],
  )

  const { data, isLoading, isError } = useQuery({
    queryKey: ['review-issue-page', queryParams],
    queryFn: () => getReviewIssuePage(queryParams),
  })

  const items = data?.items ?? []

  const columns: ColumnsType<ReviewIssue> = [
    {
      title: '问题编号',
      dataIndex: 'issueCode',
      key: 'issueCode',
      width: 140,
    },
    {
      title: '问题标题',
      dataIndex: 'issueTitle',
      key: 'issueTitle',
      render: (value: string, record) => <Link to={`/review/issues/${record.issueId}`}>{value}</Link>,
    },
    {
      title: '来源',
      key: 'sourceType',
      width: 180,
      render: (_, record) => (
        <div className="space-y-1">
          <div>{reviewIssueSourceTypeLabelMap[record.sourceType]}</div>
          <Typography.Text type="secondary" className="text-xs">
            {record.sourceLink.sourceName}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      width: 120,
      render: (value: ReviewIssueSeverity) => (
        <Tag color={reviewIssueSeverityColorMap[value]}>{reviewIssueSeverityLabelMap[value]}</Tag>
      ),
    },
    {
      title: '负责人',
      key: 'ownerName',
      width: 150,
      render: (_, record) => (
        <div className="space-y-1">
          <div>{record.ownerName}</div>
          <Typography.Text type="secondary" className="text-xs">
            {record.ownerDepartment}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: '整改截止',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 130,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (value: ReviewIssueStatus) => (
        <StatusTag
          status={value}
          colorMap={reviewIssueStatusColorMap}
          labelMap={reviewIssueStatusLabelMap}
        />
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
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/review/issues/${record.issueId}`}>详情</Link>
          <Link to={`/review/issues/${record.issueId}/edit`}>编辑</Link>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title="复盘问题"
      extra={
        <Button type="primary" onClick={() => navigate('/review/issues/new')}>
          新建问题
        </Button>
      }
    >
      <div className="space-y-4">
        <Card>
          <Form layout="inline" className="gap-y-4">
            <Form.Item label="关键字">
              <Input
                placeholder="请输入问题编号/标题/负责人/分类"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                allowClear
                className="w-[280px]"
              />
            </Form.Item>
            <Form.Item label="状态">
              <Select
                placeholder="请选择状态"
                value={status}
                onChange={(value) => setStatus(value)}
                allowClear
                className="w-[160px]"
                options={reviewIssueStatusOptions}
              />
            </Form.Item>
            <Form.Item label="来源类型">
              <Select
                placeholder="请选择来源"
                value={sourceType}
                onChange={(value) => setSourceType(value)}
                allowClear
                className="w-[160px]"
                options={reviewIssueSourceTypeOptions}
              />
            </Form.Item>
            <Form.Item label="严重程度">
              <Select
                placeholder="请选择严重程度"
                value={severity}
                onChange={(value) => setSeverity(value)}
                allowClear
                className="w-[160px]"
                options={reviewIssueSeverityOptions}
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  setKeyword('')
                  setStatus(undefined)
                  setSourceType(undefined)
                  setSeverity(undefined)
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
              共 {data?.total ?? 0} 条复盘问题，当前展示 {items.length} 条
            </Typography.Text>
          </div>
          {isError ? <Alert type="error" showIcon message="复盘问题数据加载失败，请稍后重试。" /> : null}
          <Table<ReviewIssue>
            rowKey="issueId"
            loading={isLoading}
            columns={columns}
            dataSource={items}
            locale={{
              emptyText: isError ? '数据加载失败' : '暂无符合条件的复盘问题，可调整筛选条件或新建问题。',
            }}
            pagination={{
              current: data?.page ?? 1,
              pageSize: data?.pageSize ?? 10,
              total: data?.total ?? 0,
              showSizeChanger: false,
            }}
          />
        </Card>
      </div>
    </PageContainer>
  )
}

export default ReviewIssueListPage
