import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Alert,
  Button,
  Card,
  Descriptions,
  Empty,
  Row,
  Col,
  Space,
  Statistic,
  Table,
  Tabs,
  Timeline,
  Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import { getPlanById } from '../../services/plan'
import { getScenarioPage } from '../../services/scenario'
import type { PlanAttachment } from '../../types/plan'
import type { Scenario } from '../../types/scenario'

function renderMultilineText(value: string) {
  const lines = value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return (
    <Space direction="vertical" size={4}>
      {lines.map((line, index) => (
        <Typography.Text key={`${line}-${index}`}>{line}</Typography.Text>
      ))}
    </Space>
  )
}

function PlanDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [attachmentActionMessage, setAttachmentActionMessage] = useState<string | null>(null)

  const planQuery = useQuery({
    queryKey: ['plan-detail', id],
    queryFn: () => getPlanById(id ?? ''),
    enabled: Boolean(id),
  })

  const scenarioQuery = useQuery({
    queryKey: ['plan-detail-scenarios'],
    queryFn: () => getScenarioPage(),
  })

  const plan = planQuery.data
  const relatedScenarios = useMemo(() => {
    if (!plan) {
      return []
    }

    return (scenarioQuery.data?.items ?? []).filter((scenario) =>
      plan.relatedScenarioIds.includes(scenario.scenarioId),
    )
  }, [plan, scenarioQuery.data])

  const scenarioColumns: ColumnsType<Scenario> = [
    {
      title: '关联场景',
      dataIndex: 'scenarioName',
      key: 'scenarioName',
      render: (value: string, record) => <Link to={`/emergency/scenarios/${record.scenarioId}`}>{value}</Link>,
    },
    {
      title: '所属系统',
      dataIndex: 'businessSystem',
      key: 'businessSystem',
    },
    {
      title: '故障对象',
      dataIndex: 'faultObject',
      key: 'faultObject',
    },
    {
      title: '场景类型',
      dataIndex: 'scenarioType',
      key: 'scenarioType',
      width: 140,
    },
    {
      title: '影响等级',
      dataIndex: 'impactLevel',
      key: 'impactLevel',
      width: 100,
    },
  ]

  const attachmentColumns: ColumnsType<PlanAttachment> = [
    {
      title: '文件名称',
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: '类型',
      dataIndex: 'fileType',
      key: 'fileType',
      width: 100,
    },
    {
      title: '大小',
      dataIndex: 'fileSize',
      key: 'fileSize',
      width: 120,
    },
    {
      title: '上传时间',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      width: 180,
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'actions',
      width: 160,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            onClick={() => setAttachmentActionMessage(`已触发附件预览占位：${record.fileName}`)}
          >
            预览
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => setAttachmentActionMessage(`已触发附件下载占位：${record.fileName}`)}
          >
            下载
          </Button>
        </Space>
      ),
    },
  ]

  if (!id) {
    return (
      <PageContainer title="预案详情">
        <EmptyBlock title="未找到预案" description="当前路由缺少预案标识，请返回列表后重试。" />
      </PageContainer>
    )
  }

  if (planQuery.isLoading) {
    return (
      <PageContainer title="预案详情">
        <Card loading />
      </PageContainer>
    )
  }

  if (planQuery.isError) {
    return (
      <PageContainer title="预案详情">
        <Alert type="error" showIcon message="预案详情加载失败，请稍后重试。" />
      </PageContainer>
    )
  }

  if (!plan) {
    return (
      <PageContainer title="预案详情">
        <EmptyBlock title="预案不存在" description="请确认预案已创建，或返回列表选择其他记录。" />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="预案详情"
      extra={
        <Space>
          <Button onClick={() => void navigate('/emergency/plans')}>返回列表</Button>
          <Button type="primary" onClick={() => void navigate(`/emergency/plans/${plan.planId}/edit`)}>
            编辑预案
          </Button>
        </Space>
      }
    >
      <div className="space-y-4">
        {scenarioQuery.isError ? (
          <Alert type="warning" showIcon message="关联场景信息加载失败，已展示预案主体信息。" />
        ) : null}
        {attachmentActionMessage ? (
          <Alert
            type="info"
            showIcon
            closable
            message={attachmentActionMessage}
            onClose={() => setAttachmentActionMessage(null)}
          />
        ) : null}

        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Typography.Title level={4} className="!mb-0">
                  {plan.planName}
                </Typography.Title>
                <StatusTag status={plan.status} />
              </div>
              <Space size="large" wrap>
                <Typography.Text type="secondary">预案编号：{plan.planCode}</Typography.Text>
                <Typography.Text type="secondary">预案类型：{plan.planType}</Typography.Text>
                <Typography.Text type="secondary">处置部门：{plan.disposalDepartment}</Typography.Text>
              </Space>
            </div>
            <Typography.Text type="secondary">最后更新：{plan.updatedAt}</Typography.Text>
          </div>

          <Row gutter={[16, 16]} className="mt-6">
            <Col xs={24} sm={12} lg={6}>
              <Card size="small">
                <Statistic title="当前版本" value={plan.currentVersion} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card size="small">
                <Statistic title="关联场景" value={plan.relatedScenarioIds.length} suffix="个" />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card size="small">
                <Statistic title="附件数量" value={plan.attachmentList.length} suffix="份" />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card size="small">
                <Statistic title="操作记录" value={plan.operationLogs.length} suffix="条" />
              </Card>
            </Col>
          </Row>
        </Card>

        <Card title="预案信息">
          <Descriptions column={2} bordered labelStyle={{ width: '160px' }}>
            <Descriptions.Item label="预案名称">{plan.planName}</Descriptions.Item>
            <Descriptions.Item label="预案编号">{plan.planCode}</Descriptions.Item>
            <Descriptions.Item label="所属系统">{plan.businessSystem}</Descriptions.Item>
            <Descriptions.Item label="系统等级">{plan.systemLevel}</Descriptions.Item>
            <Descriptions.Item label="预案类型">{plan.planType}</Descriptions.Item>
            <Descriptions.Item label="应急等级">{plan.incidentLevel}</Descriptions.Item>
            <Descriptions.Item label="处置部门">{plan.disposalDepartment}</Descriptions.Item>
            <Descriptions.Item label="当前状态">
              <StatusTag status={plan.status} />
            </Descriptions.Item>
            <Descriptions.Item label="编制目标" span={2}>
              {renderMultilineText(plan.planObjectives)}
            </Descriptions.Item>
            <Descriptions.Item label="适用范围" span={2}>
              {renderMultilineText(plan.applicableScope)}
            </Descriptions.Item>
            <Descriptions.Item label="启动条件" span={2}>
              {renderMultilineText(plan.activationConditions)}
            </Descriptions.Item>
            <Descriptions.Item label="处置原则" span={2}>
              {renderMultilineText(plan.disposalPrinciples)}
            </Descriptions.Item>
            <Descriptions.Item label="应急动作" span={2}>
              {renderMultilineText(plan.emergencyActions)}
            </Descriptions.Item>
            <Descriptions.Item label="恢复措施" span={2}>
              {renderMultilineText(plan.recoveryMeasures)}
            </Descriptions.Item>
            <Descriptions.Item label="上报要求" span={2}>
              {renderMultilineText(plan.reportingRequirements)}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card>
          <Tabs
            items={[
              {
                key: 'scenarios',
                label: '关联场景',
                children: scenarioQuery.isLoading ? (
                  <Table<Scenario>
                    rowKey="scenarioId"
                    columns={scenarioColumns}
                    dataSource={[]}
                    loading
                    pagination={false}
                  />
                ) : relatedScenarios.length > 0 ? (
                  <Table<Scenario>
                    rowKey="scenarioId"
                    columns={scenarioColumns}
                    dataSource={relatedScenarios}
                    pagination={false}
                  />
                ) : (
                  <Empty description="暂无关联场景" />
                ),
              },
              {
                key: 'attachments',
                label: '文档与附件',
                children:
                  plan.attachmentList.length > 0 ? (
                    <Table<PlanAttachment>
                      rowKey="attachmentId"
                      columns={attachmentColumns}
                      dataSource={plan.attachmentList}
                      pagination={false}
                    />
                  ) : (
                    <Empty description="暂无附件材料" />
                  ),
              },
              {
                key: 'versions',
                label: '版本历史',
                children: (
                  <Timeline
                    items={plan.versionHistory.map((record) => ({
                      children: (
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Typography.Text strong>{record.version}</Typography.Text>
                            <StatusTag status={record.status} />
                          </div>
                          <Typography.Text type="secondary">
                            {record.changedAt} · {record.changedBy}
                          </Typography.Text>
                          <div>{record.summary}</div>
                        </div>
                      ),
                    }))}
                  />
                ),
              },
              {
                key: 'logs',
                label: '操作日志',
                children: (
                  <Timeline
                    items={plan.operationLogs.map((record) => ({
                      color: record.result === '成功' ? 'green' : 'red',
                      children: (
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Typography.Text strong>{record.action}</Typography.Text>
                            <Typography.Text type="secondary">{record.result}</Typography.Text>
                          </div>
                          <Typography.Text type="secondary">
                            {record.operatedAt} · {record.operator}
                          </Typography.Text>
                          <div>{record.detail}</div>
                        </div>
                      ),
                    }))}
                  />
                ),
              },
            ]}
          />
        </Card>
      </div>
    </PageContainer>
  )
}

export default PlanDetailPage
