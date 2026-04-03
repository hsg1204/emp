import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Descriptions, List, Space, Steps, Table, Tabs, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import { getProcessById } from '../../services/process'
import type { ProcessNodeType, ProcessOperationLog } from '../../types/process'

const nodeTypeLabelMap: Record<ProcessNodeType, string> = {
  start: '开始',
  manual: '人工处理',
  decision: '审批决策',
  notification: '通知广播',
  finish: '结束',
}

function ProcessDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['process-detail', id],
    queryFn: () => getProcessById(id ?? ''),
    enabled: Boolean(id),
  })

  const logColumns: ColumnsType<ProcessOperationLog> = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 140,
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
      width: 140,
    },
    {
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      width: 100,
    },
    {
      title: '说明',
      dataIndex: 'remark',
      key: 'remark',
    },
  ]

  if (isLoading) {
    return (
      <PageContainer title="流程详情">
        <Card loading />
      </PageContainer>
    )
  }

  if (!data) {
    return (
      <PageContainer title="流程详情">
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
            className="mb-4"
          />
        ) : null}
        <EmptyBlock
          title={isError ? '流程加载失败' : '未找到流程'}
          description={isError ? '请重试加载流程数据，或稍后再返回详情页面。' : '请返回流程列表后重新选择需要查看的流程。'}
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title={data.processName}
      extra={
        <Space>
          <Button onClick={() => navigate('/emergency/processes')}>返回列表</Button>
          <Button type="primary" onClick={() => navigate(`/emergency/processes/${data.processId}/edit`)}>
            编辑流程
          </Button>
        </Space>
      }
    >
      <div className="space-y-4">
        <Card>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <StatusTag status={data.status} />
              <Typography.Text className="text-sm text-slate-500">当前版本 {data.currentVersion}</Typography.Text>
              {data.lastPublishedAt ? (
                <Typography.Text className="text-sm text-slate-500">最近发布时间 {data.lastPublishedAt}</Typography.Text>
              ) : null}
            </div>
            <Typography.Paragraph className="mb-0 text-slate-600">{data.description}</Typography.Paragraph>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </Card>

        <Tabs
          defaultActiveKey="overview"
          items={[
            {
              key: 'overview',
              label: '信息总览',
              children: (
                <div className="space-y-4">
                  <Card title="流程信息">
                    <Descriptions column={2} size="small">
                      <Descriptions.Item label="流程名称">{data.processName}</Descriptions.Item>
                      <Descriptions.Item label="流程类型">{data.processType}</Descriptions.Item>
                      <Descriptions.Item label="适用系统">{data.applicableSystem}</Descriptions.Item>
                      <Descriptions.Item label="归口部门">{data.ownerDepartment}</Descriptions.Item>
                      <Descriptions.Item label="关联场景数">{data.relatedScenarioCount}</Descriptions.Item>
                      <Descriptions.Item label="节点数">{data.nodeCount}</Descriptions.Item>
                      <Descriptions.Item label="创建人">{data.createdBy}</Descriptions.Item>
                      <Descriptions.Item label="创建时间">{data.createdAt}</Descriptions.Item>
                      <Descriptions.Item label="更新时间">{data.updatedAt}</Descriptions.Item>
                      <Descriptions.Item label="审批策略">{data.approvalPolicy}</Descriptions.Item>
                      <Descriptions.Item label="触发条件" span={2}>
                        {data.triggerCondition}
                      </Descriptions.Item>
                      <Descriptions.Item label="异常升级策略" span={2}>
                        {data.exceptionStrategy}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card title="关联场景">
                      <List
                        dataSource={data.relatedScenarioNames}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                        locale={{ emptyText: '暂无关联场景' }}
                      />
                    </Card>
                    <Card title="关联预案">
                      <List
                        dataSource={data.relatedPlanNames}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                        locale={{ emptyText: '暂无关联预案' }}
                      />
                    </Card>
                  </div>
                </div>
              ),
            },
            {
              key: 'flow',
              label: '流程预览',
              children: (
                <div className="space-y-4">
                  <Alert
                    type="info"
                    showIcon
                    message="阶段一提供轻量流程预览，用于确认节点顺序、责任角色和输出结果。"
                  />
                  <Card title="流程节点预览">
                    <Steps
                      direction="vertical"
                      size="small"
                      items={data.flowNodes.map((node) => ({
                        title: `${node.nodeName} · ${nodeTypeLabelMap[node.nodeType]}`,
                        description: `${node.ownerRole} · SLA ${node.slaMinutes} 分钟 · ${node.output}`,
                      }))}
                    />
                  </Card>
                </div>
              ),
            },
            {
              key: 'logs',
              label: '操作日志',
              children: (
                <Card title="流程操作日志">
                  <Table<ProcessOperationLog>
                    rowKey="logId"
                    columns={logColumns}
                    dataSource={data.operationLogs}
                    pagination={false}
                    size="small"
                  />
                </Card>
              ),
            },
          ]}
        />
      </div>
    </PageContainer>
  )
}

export default ProcessDetailPage
