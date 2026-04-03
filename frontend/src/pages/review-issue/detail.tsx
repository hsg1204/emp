import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Col, Descriptions, List, Row, Space, Tag, Timeline, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import { getReviewIssueById } from '../../services/reviewIssue'
import type { ReviewIssueSourceType } from '../../types/review-issue'
import {
  reviewIssueFollowUpActionLabelMap,
  reviewIssueSeverityColorMap,
  reviewIssueSeverityLabelMap,
  reviewIssueSourceTypeLabelMap,
  reviewIssueStatusColorMap,
  reviewIssueStatusLabelMap,
} from './constants'

function getReviewIssueSourceDetailPath(sourceType: ReviewIssueSourceType, sourceId: string) {
  return sourceType === 'drillPlan' ? `/drills/plans/${sourceId}` : `/events/${sourceId}`
}

function ReviewIssueDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['review-issue-detail', id],
    queryFn: () => getReviewIssueById(id ?? ''),
    enabled: Boolean(id),
  })

  if (!id) {
    return (
      <PageContainer title="复盘问题详情">
        <EmptyBlock title="缺少问题标识" description="请从列表页进入复盘问题详情。" />
      </PageContainer>
    )
  }

  if (isLoading) {
    return (
      <PageContainer
        title="复盘问题详情"
        extra={
          <Space>
            <Button onClick={() => navigate('/review/issues')}>返回列表</Button>
            {id ? <Button type="primary" onClick={() => navigate(`/review/issues/${id}/edit`)}>编辑问题</Button> : null}
          </Space>
        }
      >
        <Card loading />
      </PageContainer>
    )
  }

  if (isError && !data) {
    return (
      <PageContainer
        title="复盘问题详情"
        extra={
          <Space>
            <Button onClick={() => navigate('/review/issues')}>返回列表</Button>
            {id ? <Button type="primary" onClick={() => navigate(`/review/issues/${id}/edit`)}>编辑问题</Button> : null}
          </Space>
        }
      >
        <div className="space-y-4">
          <Alert type="error" showIcon message="复盘问题详情加载失败，请稍后重试。" />
          <EmptyBlock title="无法加载复盘问题" description="请稍后重试，或返回列表重新选择需要查看的问题。" />
        </div>
      </PageContainer>
    )
  }

  if (!data) {
    return (
      <PageContainer title="复盘问题详情">
        <EmptyBlock title="未找到复盘问题" description="请返回列表重新选择需要查看的问题。" />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="复盘问题详情"
      extra={
        <Space>
          <Button onClick={() => navigate('/review/issues')}>返回列表</Button>
          {id ? <Button type="primary" onClick={() => navigate(`/review/issues/${id}/edit`)}>编辑问题</Button> : null}
        </Space>
      }
    >
      <div className="space-y-4">
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Typography.Title level={4} className="mb-0">
                    {data.issueTitle}
                  </Typography.Title>
                  <StatusTag
                    status={data.status}
                    colorMap={reviewIssueStatusColorMap}
                    labelMap={reviewIssueStatusLabelMap}
                  />
                  <Tag color={reviewIssueSeverityColorMap[data.severity]}>{reviewIssueSeverityLabelMap[data.severity]}</Tag>
                </div>
                <Space split={<span className="text-slate-300">/</span>} wrap>
                  <Typography.Text type="secondary">问题编号：{data.issueCode}</Typography.Text>
                  <Typography.Text type="secondary">问题分类：{data.issueCategory}</Typography.Text>
                  <Typography.Text type="secondary">发现时间：{data.discoveredAt}</Typography.Text>
                  <Typography.Text type="secondary">整改截止：{data.dueDate}</Typography.Text>
                </Space>
                <Typography.Paragraph className="mb-0 text-slate-500">{data.issueDescription}</Typography.Paragraph>
              </div>
            </Col>
            <Col span={6}>
              <Card size="small" className="h-full bg-slate-50">
                <div className="space-y-3">
                  <div>
                    <Typography.Text type="secondary">责任人</Typography.Text>
                    <div className="mt-1 text-base font-medium text-slate-800">{data.ownerName}</div>
                  </div>
                  <div>
                    <Typography.Text type="secondary">责任部门</Typography.Text>
                    <div className="mt-1 text-base font-medium text-slate-800">{data.ownerDepartment}</div>
                  </div>
                  <div>
                    <Typography.Text type="secondary">最近更新</Typography.Text>
                    <div className="mt-1 text-base font-medium text-slate-800">{data.updatedAt}</div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>

        <Row gutter={[16, 16]}>
          <Col span={14}>
            <Card title="问题信息">
              <Descriptions column={1} labelStyle={{ width: 120 }}>
                <Descriptions.Item label="影响范围">{data.impactScope}</Descriptions.Item>
                <Descriptions.Item label="整改措施">{data.correctiveAction}</Descriptions.Item>
                <Descriptions.Item label="创建人">{data.createdBy}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{data.createdAt}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={10}>
            <Card
              title="来源关联"
              extra={
                <Button
                  type="link"
                  className="px-0"
                  onClick={() => navigate(getReviewIssueSourceDetailPath(data.sourceLink.sourceType, data.sourceLink.sourceId))}
                >
                  查看来源详情
                </Button>
              }
            >
              <Descriptions column={1} labelStyle={{ width: 110 }}>
                <Descriptions.Item label="来源类型">
                  {reviewIssueSourceTypeLabelMap[data.sourceLink.sourceType]}
                </Descriptions.Item>
                <Descriptions.Item label="来源编号">{data.sourceLink.sourceCode}</Descriptions.Item>
                <Descriptions.Item label="来源名称">{data.sourceLink.sourceName}</Descriptions.Item>
                <Descriptions.Item label="关联摘要">{data.sourceLink.summary}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Card title="跟踪概览">
              <List
                dataSource={[
                  { label: '跟踪记录数', value: `${data.followUpRecords.length} 条` },
                  { label: '当前状态', value: reviewIssueStatusLabelMap[data.status] },
                  { label: '责任团队', value: data.ownerDepartment },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <div className="flex w-full items-center justify-between gap-4">
                      <Typography.Text type="secondary">{item.label}</Typography.Text>
                      <Typography.Text>{item.value}</Typography.Text>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={14}>
            <Card title="跟踪记录">
              {data.followUpRecords.length > 0 ? (
                <Timeline
                  items={data.followUpRecords.map((record) => ({
                    children: (
                      <div className="space-y-1 pb-2">
                        <Space size={8} wrap>
                          <Tag>{reviewIssueFollowUpActionLabelMap[record.actionType]}</Tag>
                          <Typography.Text>{record.operator}</Typography.Text>
                          <Typography.Text type="secondary">{record.operatedAt}</Typography.Text>
                        </Space>
                        <Typography.Paragraph className="mb-0 text-slate-600">{record.content}</Typography.Paragraph>
                      </div>
                    ),
                  }))}
                />
              ) : (
                <EmptyBlock title="暂无跟踪记录" description="当前问题还没有新增跟踪记录，可在后续整改过程中补充。" />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  )
}

export default ReviewIssueDetailPage
