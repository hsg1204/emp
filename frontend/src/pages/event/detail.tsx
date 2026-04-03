import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  List,
  Row,
  Space,
  Spin,
  Statistic,
  Tabs,
  Tag,
  Timeline,
  Typography,
} from 'antd'
import type { TabsProps } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import {
  disposalStatusLabelMap,
  eventLevelColorMap,
  eventSourceLabelMap,
  operationTypeLabelMap,
  progressStatusLabelMap,
} from './constants'
import { getEventDetail } from '../../services/event'
import type { EventDetail, EventDisposalRecord, EventOperationLog, EventProgressItem } from '../../types/event'

interface WorkspaceActionState {
  launchedCoordination: boolean
  escalatedResponse: boolean
  recordedConclusion: boolean
}

const initialWorkspaceActions: WorkspaceActionState = {
  launchedCoordination: false,
  escalatedResponse: false,
  recordedConclusion: false,
}

function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [workspaceActions, setWorkspaceActions] = useState<WorkspaceActionState>(initialWorkspaceActions)
  const [localProgress, setLocalProgress] = useState<EventProgressItem[]>([])
  const [localDisposalRecords, setLocalDisposalRecords] = useState<EventDisposalRecord[]>([])
  const [localOperationLogs, setLocalOperationLogs] = useState<EventOperationLog[]>([])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['event-detail', id],
    queryFn: () => getEventDetail(id ?? ''),
    enabled: Boolean(id),
  })

  useEffect(() => {
    if (!data) {
      return
    }

    setWorkspaceActions(initialWorkspaceActions)
    setLocalProgress(data.progress)
    setLocalDisposalRecords(data.disposalRecords)
    setLocalOperationLogs(data.operationLogs)
  }, [data])

  const actionSummary = useMemo(() => {
    const summaryItems: string[] = []

    if (workspaceActions.launchedCoordination) {
      summaryItems.push('已模拟发起轻量协同')
    }

    if (workspaceActions.escalatedResponse) {
      summaryItems.push('已模拟升级响应级别')
    }

    if (workspaceActions.recordedConclusion) {
      summaryItems.push('已模拟记录恢复结论')
    }

    return summaryItems.join('；')
  }, [workspaceActions])

  const handleLaunchCoordination = () => {
    if (!data || workspaceActions.launchedCoordination) {
      return
    }

    const timestamp = '2026-04-03 11:10:00'

    setWorkspaceActions((current) => ({ ...current, launchedCoordination: true }))
    setLocalProgress((current) => [
      {
        progressId: `workspace-progress-${data.eventId}-coordination`,
        title: '发起轻量协同',
        owner: data.emergencyCommander,
        status: 'completed',
        timestamp,
        description: `已在页面内模拟通知 ${data.responseOwner} 与相关支持角色进入协同状态。`,
      },
      ...current,
    ])
    setLocalOperationLogs((current) => [
      {
        logId: `workspace-log-${data.eventId}-coordination`,
        operator: data.emergencyCommander,
        action: '页面内发起轻量协同',
        detail: `同步协同群 ${data.collaborationGroup} 并提醒相关责任人关注事件进展。`,
        timestamp,
        type: 'coordination',
      },
      ...current,
    ])
  }

  const handleEscalateResponse = () => {
    if (!data || workspaceActions.escalatedResponse) {
      return
    }

    const timestamp = '2026-04-03 11:15:00'

    setWorkspaceActions((current) => ({ ...current, escalatedResponse: true }))
    setLocalProgress((current) => [
      {
        progressId: `workspace-progress-${data.eventId}-escalation`,
        title: '升级响应关注级别',
        owner: data.responseOwner,
        status: 'processing',
        timestamp,
        description: '已在轻量工作台中标记为重点跟踪，并提醒后续补充升级判断。',
      },
      ...current,
    ])
    setLocalOperationLogs((current) => [
      {
        logId: `workspace-log-${data.eventId}-escalation`,
        operator: data.responseOwner,
        action: '升级响应关注级别',
        detail: '页面内模拟升级动作，仅用于 Phase 1 本地协同展示。',
        timestamp,
        type: 'response',
      },
      ...current,
    ])
  }

  const handleRecordConclusion = () => {
    if (!data || workspaceActions.recordedConclusion) {
      return
    }

    const timestamp = '2026-04-03 11:20:00'

    setWorkspaceActions((current) => ({ ...current, recordedConclusion: true }))
    setLocalDisposalRecords((current) => [
      {
        recordId: `workspace-record-${data.eventId}-conclusion`,
        step: '记录阶段性恢复结论',
        owner: data.responseOwner,
        result: `已补充结论：${data.latestConclusion}`,
        nextAction: data.disposalSuggestion,
        timestamp,
        status: 'completed',
      },
      ...current,
    ])
    setLocalOperationLogs((current) => [
      {
        logId: `workspace-log-${data.eventId}-conclusion`,
        operator: data.responseOwner,
        action: '记录恢复结论',
        detail: '已在页面内完成一次结论登记，用于后续复盘整理。',
        timestamp,
        type: 'record',
      },
      ...current,
    ])
  }

  if (isLoading) {
    return (
      <PageContainer title="事件详情">
        <Card>
          <div className="flex min-h-[320px] items-center justify-center">
            <Spin tip="正在加载事件详情..." />
          </div>
        </Card>
      </PageContainer>
    )
  }

  if (isError) {
    return (
      <PageContainer title="事件详情">
        <Alert
          type="error"
          showIcon
          message="事件详情加载失败，请稍后重试。"
          action={<Button size="small" onClick={() => navigate(0)}>重新加载</Button>}
        />
      </PageContainer>
    )
  }

  if (!data) {
    return (
      <PageContainer title="事件详情">
        <EmptyBlock title="未找到事件详情" description="请返回事件列表重新选择，或检查访问地址是否正确。" />
      </PageContainer>
    )
  }

  const tabItems: TabsProps['items'] = [
    {
      key: 'overview',
      label: '事件信息',
      children: (
        <div className="space-y-4">
          <Card>
            <Descriptions column={2} bordered size="middle">
              <Descriptions.Item label="事件标题">{data.eventTitle}</Descriptions.Item>
              <Descriptions.Item label="事件编号">{data.eventCode}</Descriptions.Item>
              <Descriptions.Item label="所属系统">{data.businessSystem}</Descriptions.Item>
              <Descriptions.Item label="事件等级">
                <Tag color={eventLevelColorMap[data.eventLevel]}>{data.eventLevel}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="事件状态">
                <StatusTag status={data.status} />
              </Descriptions.Item>
              <Descriptions.Item label="事件来源">{eventSourceLabelMap[data.source]}</Descriptions.Item>
              <Descriptions.Item label="应急指挥">{data.emergencyCommander}</Descriptions.Item>
              <Descriptions.Item label="响应负责人">{data.responseOwner}</Descriptions.Item>
              <Descriptions.Item label="当前阶段">{data.currentPhase}</Descriptions.Item>
              <Descriptions.Item label="发生时间">{data.incidentTime}</Descriptions.Item>
              <Descriptions.Item label="关联预案">{data.planName}</Descriptions.Item>
              <Descriptions.Item label="关联流程">{data.relatedProcess}</Descriptions.Item>
              <Descriptions.Item label="协同群组">{data.collaborationGroup}</Descriptions.Item>
              <Descriptions.Item label="上报渠道">{data.reportChannel}</Descriptions.Item>
              <Descriptions.Item label="事件类别">{data.incidentCategory}</Descriptions.Item>
              <Descriptions.Item label="发生位置">{data.occurrenceLocation}</Descriptions.Item>
              <Descriptions.Item label="影响范围" span={2}>{data.impactScope}</Descriptions.Item>
              <Descriptions.Item label="事件摘要" span={2}>{data.summary}</Descriptions.Item>
              <Descriptions.Item label="业务影响" span={2}>{data.businessImpact}</Descriptions.Item>
              <Descriptions.Item label="最新结论" span={2}>{data.latestConclusion}</Descriptions.Item>
              <Descriptions.Item label="处置建议" span={2}>{data.disposalSuggestion}</Descriptions.Item>
              <Descriptions.Item label="事件标签" span={2}>
                <Space size={[8, 8]} wrap>
                  {data.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      ),
    },
    {
      key: 'progress',
      label: '应急进展',
      children: (
        <Card>
          {localProgress.length === 0 ? (
            <EmptyBlock title="暂无应急进展" description="可通过本页轻量动作模拟推进协同进展。" />
          ) : (
            <Timeline
              items={localProgress.map((item) => ({
                color:
                  item.status === 'completed'
                    ? 'green'
                    : item.status === 'processing'
                      ? 'blue'
                      : 'gray',
                children: (
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Typography.Text strong>{item.title}</Typography.Text>
                      <StatusTag status={item.status} />
                    </div>
                    <Typography.Text type="secondary">
                      {item.timestamp} · {item.owner}
                    </Typography.Text>
                    <div className="text-slate-600">{item.description}</div>
                    <Typography.Text type="secondary">
                      当前节点状态：{progressStatusLabelMap[item.status]}
                    </Typography.Text>
                  </div>
                ),
              }))}
            />
          )}
        </Card>
      ),
    },
    {
      key: 'disposal',
      label: '处置记录',
      children: (
        <Card>
          {localDisposalRecords.length === 0 ? (
            <EmptyBlock title="暂无处置记录" description="待应急动作落地后，可在此处查看处置步骤和后续建议。" />
          ) : (
            <List
              dataSource={localDisposalRecords}
              renderItem={(item) => (
                <List.Item>
                  <div className="w-full space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Typography.Text strong>{item.step}</Typography.Text>
                        <StatusTag status={item.status} />
                      </div>
                      <Typography.Text type="secondary">{item.timestamp}</Typography.Text>
                    </div>
                    <div className="text-slate-600">负责人：{item.owner}</div>
                    <div className="text-slate-700">处置结果：{item.result}</div>
                    <div className="text-slate-500">后续动作：{item.nextAction}</div>
                    <Typography.Text type="secondary">
                      节点状态：{disposalStatusLabelMap[item.status]}
                    </Typography.Text>
                  </div>
                </List.Item>
              )}
            />
          )}
        </Card>
      ),
    },
    {
      key: 'logs',
      label: '操作日志',
      children: (
        <Card>
          {localOperationLogs.length === 0 ? (
            <EmptyBlock title="暂无操作日志" description="当前还没有记录到系统、协同或处置动作。" />
          ) : (
            <List
              dataSource={localOperationLogs}
              renderItem={(item) => (
                <List.Item>
                  <div className="w-full space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Typography.Text strong>{item.action}</Typography.Text>
                        <Tag>{operationTypeLabelMap[item.type]}</Tag>
                      </div>
                      <Typography.Text type="secondary">{item.timestamp}</Typography.Text>
                    </div>
                    <div className="text-slate-600">操作人：{item.operator}</div>
                    <div className="text-slate-700">{item.detail}</div>
                  </div>
                </List.Item>
              )}
            />
          )}
        </Card>
      ),
    },
  ]

  return (
    <PageContainer
      title="事件详情"
      extra={
        <Space>
          <Link to={`/events/${data.eventId}/edit`}>编辑事件</Link>
          <Link to="/events">返回列表</Link>
        </Space>
      }
    >
      <div className="space-y-4">
        <Alert
          type="info"
          showIcon
          message="Phase 1 详情页采用轻量应急工作台方式，所有响应、协同和记录动作均为页面内本地交互。"
        />

        {actionSummary ? <Alert type="success" showIcon message={actionSummary} /> : null}

        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Typography.Title level={4} className="!mb-0">
                  {data.eventTitle}
                </Typography.Title>
                <Tag color={eventLevelColorMap[data.eventLevel]}>{data.eventLevel}</Tag>
                <StatusTag status={data.status} />
              </div>
              <Typography.Text type="secondary">
                事件编号：{data.eventCode} · 所属系统：{data.businessSystem} · 当前阶段：{data.currentPhase}
              </Typography.Text>
              <div className="text-slate-600">最新结论：{data.latestConclusion}</div>
            </div>
            <Space wrap>
              <Button onClick={handleLaunchCoordination} disabled={workspaceActions.launchedCoordination}>
                发起轻量协同
              </Button>
              <Button onClick={handleEscalateResponse} disabled={workspaceActions.escalatedResponse}>
                升级响应关注
              </Button>
              <Button type="primary" onClick={handleRecordConclusion} disabled={workspaceActions.recordedConclusion}>
                记录恢复结论
              </Button>
            </Space>
          </div>

          <Divider />

          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card size="small">
                <Statistic title="应急进展节点" value={localProgress.length} />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card size="small">
                <Statistic title="处置记录数" value={localDisposalRecords.length} />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card size="small">
                <Statistic title="操作日志数" value={localOperationLogs.length} />
              </Card>
            </Col>
          </Row>
        </Card>

        <Tabs items={tabItems} />
      </div>
    </PageContainer>
  )
}

export default EventDetailPage
