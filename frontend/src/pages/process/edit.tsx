import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Form, Input, Select, Space, Table, Typography, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import { getProcessById } from '../../services/process'
import type { PublishStatus } from '../../types/common'
import type { ProcessDetail, ProcessFlowNode, ProcessNodeType } from '../../types/process'

const { TextArea } = Input

interface ProcessFormValues {
  processName: string
  processType: string
  applicableSystem: string
  ownerDepartment: string
  description: string
  triggerCondition: string
  exceptionStrategy: string
  approvalPolicy: string
  status: PublishStatus
  tags: string[]
  relatedScenarioNames: string[]
  relatedPlanNames: string[]
}

const statusOptions: Array<{ label: string; value: PublishStatus }> = [
  { label: '草稿', value: 'draft' },
  { label: '待审批', value: 'pendingApproval' },
  { label: '已发布', value: 'published' },
  { label: '已废止', value: 'deprecated' },
]

const processTypeOptions = [
  { label: '排查流程', value: '排查流程' },
  { label: '决策流程', value: '决策流程' },
  { label: '恢复流程', value: '恢复流程' },
  { label: '补偿流程', value: '补偿流程' },
]

const approvalPolicyOptions = [
  { label: '无需审批，自动流转', value: '无需审批，自动流转' },
  { label: '值班经理审批', value: '值班经理审批' },
  { label: '平台主管审批', value: '平台主管审批' },
  { label: '跨部门联合审批', value: '跨部门联合审批' },
]

const scenarioOptions = [
  { label: '核心交易链路异常', value: '核心交易链路异常' },
  { label: '交易链路超时告警', value: '交易链路超时告警' },
  { label: '核心支付超时告警', value: '核心支付超时告警' },
  { label: '客户信息同步失败', value: '客户信息同步失败' },
  { label: '历史对账流程下线', value: '历史对账流程下线' },
]

const planOptions = [
  { label: '核心交易系统应急预案', value: '核心交易系统应急预案' },
  { label: '支付平台应急处置预案', value: '支付平台应急处置预案' },
  { label: '客户中心数据同步预案', value: '客户中心数据同步预案' },
  { label: '清算系统历史预案', value: '清算系统历史预案' },
]

const defaultFlowNodes: ProcessFlowNode[] = [
  {
    nodeId: 'draft-node-001',
    nodeName: '流程发起',
    nodeType: 'start',
    ownerRole: '值班经理',
    slaMinutes: 5,
    output: '确认进入流程',
  },
  {
    nodeId: 'draft-node-002',
    nodeName: '排查处理',
    nodeType: 'manual',
    ownerRole: '责任团队',
    slaMinutes: 15,
    output: '输出处置结论',
  },
  {
    nodeId: 'draft-node-003',
    nodeName: '流程完成',
    nodeType: 'finish',
    ownerRole: '值班经理',
    slaMinutes: 5,
    output: '归档流程记录',
  },
]

const nodeTypeLabelMap: Record<ProcessNodeType, string> = {
  start: '开始',
  manual: '人工处理',
  decision: '审批决策',
  notification: '通知广播',
  finish: '结束',
}

function createDefaultFormValues(): ProcessFormValues {
  return {
    processName: '',
    processType: '排查流程',
    applicableSystem: '',
    ownerDepartment: '',
    description: '',
    triggerCondition: '',
    exceptionStrategy: '',
    approvalPolicy: '平台主管审批',
    status: 'draft',
    tags: ['阶段一'],
    relatedScenarioNames: [],
    relatedPlanNames: [],
  }
}

function mapProcessToFormValues(process: ProcessDetail): ProcessFormValues {
  return {
    processName: process.processName,
    processType: process.processType,
    applicableSystem: process.applicableSystem,
    ownerDepartment: process.ownerDepartment,
    description: process.description,
    triggerCondition: process.triggerCondition,
    exceptionStrategy: process.exceptionStrategy,
    approvalPolicy: process.approvalPolicy,
    status: process.status,
    tags: process.tags,
    relatedScenarioNames: process.relatedScenarioNames,
    relatedPlanNames: process.relatedPlanNames,
  }
}

function ProcessEditPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isCreateMode = !id

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['process-detail', id],
    queryFn: () => getProcessById(id ?? ''),
    enabled: Boolean(id),
  })

  const initialValues = useMemo(
    () => (data ? mapProcessToFormValues(data) : createDefaultFormValues()),
    [data],
  )

  const flowNodes = data?.flowNodes ?? defaultFlowNodes

  const handleSaveDraft = () => {
    void message.success(isCreateMode ? '流程草稿已保存到本地示例数据。' : '流程草稿变更已保存到本地示例数据。')
  }

  const handleSubmitApproval = () => {
    void message.success(isCreateMode ? '流程已提交审批示例，后续将接入真实提交能力。' : '流程变更已提交审批示例，后续将接入真实提交能力。')
  }

  const nodeColumns: ColumnsType<ProcessFlowNode> = [
    {
      title: '节点名称',
      dataIndex: 'nodeName',
      key: 'nodeName',
    },
    {
      title: '节点类型',
      dataIndex: 'nodeType',
      key: 'nodeType',
      width: 120,
      render: (value: ProcessNodeType) => nodeTypeLabelMap[value],
    },
    {
      title: '责任角色',
      dataIndex: 'ownerRole',
      key: 'ownerRole',
      width: 140,
    },
    {
      title: 'SLA (分钟)',
      dataIndex: 'slaMinutes',
      key: 'slaMinutes',
      width: 120,
    },
    {
      title: '输出结果',
      dataIndex: 'output',
      key: 'output',
    },
  ]

  if (!isCreateMode && isLoading) {
    return (
      <PageContainer title="流程编辑">
        <Card loading />
      </PageContainer>
    )
  }

  if (!isCreateMode && !isLoading && !data) {
    return (
      <PageContainer title="流程编辑">
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
          description={isError ? '请重试加载流程数据，或稍后再返回编辑页面。' : '请返回流程列表后重新选择需要编辑的流程。'}
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title={isCreateMode ? '新建流程' : '流程编辑'}
      extra={
        <Space>
          <Button onClick={() => navigate('/emergency/processes')}>返回列表</Button>
          {!isCreateMode ? <Button onClick={() => navigate(`/emergency/processes/${id}`)}>查看详情</Button> : null}
        </Space>
      }
    >
      <div className="space-y-4">
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
          />
        ) : null}

        <Alert
          type="info"
          showIcon
          message="阶段一仅提供轻量配置表单与节点摘要预览，不包含可视化流程编排器。"
        />

        <Form key={data?.processId ?? 'new-process'} layout="vertical" initialValues={initialValues}>
          <div className="space-y-4">
            <Card title="基本信息">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Form.Item label="流程名称" name="processName" className="mb-0" rules={[{ required: true, message: '请输入流程名称' }]}>
                  <Input placeholder="请输入流程名称" />
                </Form.Item>
                <Form.Item label="流程类型" name="processType" className="mb-0" rules={[{ required: true, message: '请选择流程类型' }]}>
                  <Select placeholder="请选择流程类型" options={processTypeOptions} />
                </Form.Item>
                <Form.Item label="适用系统" name="applicableSystem" className="mb-0" rules={[{ required: true, message: '请输入适用系统' }]}>
                  <Input placeholder="请输入适用系统" />
                </Form.Item>
                <Form.Item label="归口部门" name="ownerDepartment" className="mb-0" rules={[{ required: true, message: '请输入归口部门' }]}>
                  <Input placeholder="请输入归口部门" />
                </Form.Item>
                <Form.Item label="流程状态" name="status" className="mb-0">
                  <Select placeholder="请选择流程状态" options={statusOptions} />
                </Form.Item>
                <Form.Item label="标签" name="tags" className="mb-0">
                  <Select mode="tags" placeholder="请输入流程标签" />
                </Form.Item>
                <Form.Item label="流程说明" name="description" className="mb-0 md:col-span-2">
                  <TextArea rows={4} placeholder="请输入流程说明" />
                </Form.Item>
              </div>
            </Card>

            <Card title="触发与治理策略">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Form.Item label="触发条件" name="triggerCondition" className="mb-0">
                  <TextArea rows={3} placeholder="请输入流程触发条件" />
                </Form.Item>
                <Form.Item label="异常升级策略" name="exceptionStrategy" className="mb-0">
                  <TextArea rows={3} placeholder="请输入异常升级策略" />
                </Form.Item>
                <Form.Item label="审批策略" name="approvalPolicy" className="mb-0 md:col-span-2">
                  <Select placeholder="请选择审批策略" options={approvalPolicyOptions} />
                </Form.Item>
              </div>
            </Card>

            <Card title="关联对象">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Form.Item label="关联场景" name="relatedScenarioNames" className="mb-0">
                  <Select mode="multiple" placeholder="请选择关联场景" options={scenarioOptions} />
                </Form.Item>
                <Form.Item label="关联预案" name="relatedPlanNames" className="mb-0">
                  <Select mode="multiple" placeholder="请选择关联预案" options={planOptions} />
                </Form.Item>
              </div>
            </Card>

            <Card
              title="节点配置预览"
              extra={<Typography.Text className="text-sm text-slate-500">用于确认流程结构与责任分工</Typography.Text>}
            >
              <Table<ProcessFlowNode>
                rowKey="nodeId"
                columns={nodeColumns}
                dataSource={flowNodes}
                pagination={false}
                size="small"
              />
            </Card>

            <Card>
              <Space>
                <Button htmlType="button" onClick={handleSaveDraft}>
                  保存草稿
                </Button>
                <Button type="primary" htmlType="button" onClick={handleSubmitApproval}>
                  提交审批
                </Button>
              </Space>
            </Card>
          </div>
        </Form>
      </div>
    </PageContainer>
  )
}

export default ProcessEditPage
