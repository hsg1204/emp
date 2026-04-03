import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import { getPlanById } from '../../services/plan'
import { getScenarioPage } from '../../services/scenario'
import type { PublishStatus } from '../../types/common'
import type { Plan, PlanAttachment } from '../../types/plan'

interface PlanFormValues {
  planName: string
  planCode: string
  businessSystem: string
  systemLevel: string
  planType: string
  incidentLevel: string
  disposalDepartment: string
  status: PublishStatus
  relatedScenarioIds: string[]
  planObjectives: string
  applicableScope: string
  activationConditions: string
  disposalPrinciples: string
  emergencyActions: string
  recoveryMeasures: string
  reportingRequirements: string
}

interface SubmitFeedback {
  type: 'success' | 'info'
  message: string
  description: string
}

const systemLevelOptions = [
  { label: '一级', value: '一级' },
  { label: '二级', value: '二级' },
  { label: '三级', value: '三级' },
]

const planTypeOptions = [
  { label: '系统级应急预案', value: '系统级应急预案' },
  { label: '专项处置预案', value: '专项处置预案' },
  { label: '历史归档预案', value: '历史归档预案' },
]

const incidentLevelOptions = [
  { label: 'P1', value: 'P1' },
  { label: 'P2', value: 'P2' },
  { label: 'P3', value: 'P3' },
]

const statusOptions: Array<{ label: string; value: PublishStatus }> = [
  { label: '草稿', value: 'draft' },
  { label: '待审批', value: 'pendingApproval' },
  { label: '已发布', value: 'published' },
  { label: '已废止', value: 'deprecated' },
]

const departmentOptions = [
  { label: '应用运维组', value: '应用运维组' },
  { label: '支付运维组', value: '支付运维组' },
  { label: '数据保障组', value: '数据保障组' },
  { label: '清算运维组', value: '清算运维组' },
]

const defaultFormValues: PlanFormValues = {
  planName: '',
  planCode: '',
  businessSystem: '',
  systemLevel: '一级',
  planType: '系统级应急预案',
  incidentLevel: 'P1',
  disposalDepartment: '应用运维组',
  status: 'draft',
  relatedScenarioIds: [],
  planObjectives: '',
  applicableScope: '',
  activationConditions: '',
  disposalPrinciples: '',
  emergencyActions: '',
  recoveryMeasures: '',
  reportingRequirements: '',
}

function mapPlanToFormValues(plan: Plan): PlanFormValues {
  return {
    planName: plan.planName,
    planCode: plan.planCode,
    businessSystem: plan.businessSystem,
    systemLevel: plan.systemLevel,
    planType: plan.planType,
    incidentLevel: plan.incidentLevel,
    disposalDepartment: plan.disposalDepartment,
    status: plan.status,
    relatedScenarioIds: plan.relatedScenarioIds,
    planObjectives: plan.planObjectives,
    applicableScope: plan.applicableScope,
    activationConditions: plan.activationConditions,
    disposalPrinciples: plan.disposalPrinciples,
    emergencyActions: plan.emergencyActions,
    recoveryMeasures: plan.recoveryMeasures,
    reportingRequirements: plan.reportingRequirements,
  }
}

function PlanEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form] = Form.useForm<PlanFormValues>()
  const [submitFeedback, setSubmitFeedback] = useState<SubmitFeedback | null>(null)
  const [attachmentFeedback, setAttachmentFeedback] = useState<string | null>(null)
  const isEditing = Boolean(id)
  const pageTitle = isEditing ? '预案编辑' : '新建预案'

  const planQuery = useQuery({
    queryKey: ['plan-edit', id],
    queryFn: () => getPlanById(id ?? ''),
    enabled: isEditing,
  })

  const scenarioQuery = useQuery({
    queryKey: ['plan-edit-scenarios'],
    queryFn: () => getScenarioPage(),
  })

  const scenarioOptions = useMemo(
    () =>
      (scenarioQuery.data?.items ?? []).map((scenario) => ({
        label: `${scenario.scenarioName} / ${scenario.businessSystem}`,
        value: scenario.scenarioId,
      })),
    [scenarioQuery.data],
  )

  const selectedScenarioIds = Form.useWatch('relatedScenarioIds', form) ?? []
  const currentStatus = Form.useWatch('status', form) ?? defaultFormValues.status
  const selectedScenarios = useMemo(
    () => (scenarioQuery.data?.items ?? []).filter((scenario) => selectedScenarioIds.includes(scenario.scenarioId)),
    [scenarioQuery.data, selectedScenarioIds],
  )

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
      title: '操作',
      key: 'actions',
      width: 160,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            onClick={() => setAttachmentFeedback(`已触发附件替换占位：${record.fileName}`)}
          >
            替换
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => setAttachmentFeedback(`已触发附件预览占位：${record.fileName}`)}
          >
            预览
          </Button>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    if (isEditing) {
      if (planQuery.data) {
        form.setFieldsValue(mapPlanToFormValues(planQuery.data))
      }
      return
    }

    form.setFieldsValue(defaultFormValues)
  }, [form, isEditing, planQuery.data])

  const handleAction = async (action: 'draft' | 'submit') => {
    try {
      const values = await form.validateFields()
      const nextStatus = action === 'draft' ? 'draft' : 'pendingApproval'
      setSubmitFeedback({
        type: action === 'draft' ? 'info' : 'success',
        message: action === 'draft' ? '草稿已更新（本地模拟）' : '预案已提交审批（本地模拟）',
        description: `预案“${values.planName}”当前模拟状态为 ${nextStatus}，未调用后端接口。`,
      })
      form.setFieldValue('status', nextStatus)
    } catch {
      setSubmitFeedback(null)
    }
  }

  const handleReset = () => {
    if (isEditing && planQuery.data) {
      form.setFieldsValue(mapPlanToFormValues(planQuery.data))
    } else {
      form.resetFields()
      form.setFieldsValue(defaultFormValues)
    }
    setSubmitFeedback(null)
  }

  if (isEditing && planQuery.isLoading) {
    return (
      <PageContainer title={pageTitle}>
        <Card loading />
      </PageContainer>
    )
  }

  if (isEditing && planQuery.isError) {
    return (
      <PageContainer title={pageTitle}>
        <Alert type="error" showIcon message="预案数据加载失败，请稍后重试。" />
      </PageContainer>
    )
  }

  if (isEditing && !planQuery.data) {
    return (
      <PageContainer title={pageTitle}>
        <EmptyBlock title="预案不存在" description="请返回列表重新选择需要编辑的预案。" />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title={pageTitle}
      extra={
        <Space>
          <Button onClick={() => void navigate('/emergency/plans')}>返回列表</Button>
          {isEditing ? <Button onClick={() => void navigate(`/emergency/plans/${id}`)}>查看详情</Button> : null}
          <Button onClick={handleReset}>重置</Button>
          <Button onClick={() => void handleAction('draft')}>保存草稿</Button>
          <Button type="primary" onClick={() => void handleAction('submit')}>
            提交审批
          </Button>
        </Space>
      }
    >
      <div className="space-y-4">
        {scenarioQuery.isError ? (
          <Alert type="warning" showIcon message="场景选项加载失败，暂时无法选择关联场景。" />
        ) : null}
        {submitFeedback ? (
          <Alert
            type={submitFeedback.type}
            showIcon
            closable
            message={submitFeedback.message}
            description={submitFeedback.description}
            onClose={() => setSubmitFeedback(null)}
          />
        ) : null}
        {attachmentFeedback ? (
          <Alert
            type="info"
            showIcon
            closable
            message={attachmentFeedback}
            description="Phase 1 仅提供轻量附件交互占位，后续可接入真实上传与预览能力。"
            onClose={() => setAttachmentFeedback(null)}
          />
        ) : null}

        <Row gutter={[16, 16]}>
          <Col xs={24} xl={16}>
            <Form form={form} layout="vertical">
              <div className="space-y-4">
                <Card title="基础信息">
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="预案名称"
                        name="planName"
                        rules={[{ required: true, message: '请输入预案名称' }]}
                      >
                        <Input placeholder="请输入预案名称" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="预案编号"
                        name="planCode"
                        rules={[{ required: true, message: '请输入预案编号' }]}
                      >
                        <Input placeholder="例如：PLAN-TRD-001" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="所属系统"
                        name="businessSystem"
                        rules={[{ required: true, message: '请输入所属系统' }]}
                      >
                        <Input placeholder="请输入所属系统" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="系统等级"
                        name="systemLevel"
                        rules={[{ required: true, message: '请选择系统等级' }]}
                      >
                        <Select options={systemLevelOptions} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="预案类型"
                        name="planType"
                        rules={[{ required: true, message: '请选择预案类型' }]}
                      >
                        <Select options={planTypeOptions} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="应急等级"
                        name="incidentLevel"
                        rules={[{ required: true, message: '请选择应急等级' }]}
                      >
                        <Select options={incidentLevelOptions} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="处置部门"
                        name="disposalDepartment"
                        rules={[{ required: true, message: '请选择处置部门' }]}
                      >
                        <Select options={departmentOptions} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item label="当前状态" name="status">
                        <Select options={statusOptions} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="关联场景">
                  <Form.Item
                    label="选择关联场景"
                    name="relatedScenarioIds"
                    rules={[{ required: true, message: '请至少选择一个关联场景' }]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      loading={scenarioQuery.isLoading}
                      options={scenarioOptions}
                      placeholder="请选择关联场景"
                    />
                  </Form.Item>
                  <div className="rounded-lg bg-slate-50 p-4">
                    <Typography.Text strong>已选场景</Typography.Text>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedScenarios.length > 0 ? (
                        selectedScenarios.map((scenario) => (
                          <Tag key={scenario.scenarioId} color="blue">
                            {scenario.scenarioName}
                          </Tag>
                        ))
                      ) : (
                        <Typography.Text type="secondary">尚未选择场景</Typography.Text>
                      )}
                    </div>
                  </div>
                </Card>

                <Card title="预案内容">
                  <Form.Item
                    label="编制目标"
                    name="planObjectives"
                    rules={[{ required: true, message: '请输入编制目标' }]}
                  >
                    <Input.TextArea rows={4} placeholder="请输入预案目标，可按行拆分要点" />
                  </Form.Item>
                  <Form.Item
                    label="适用范围"
                    name="applicableScope"
                    rules={[{ required: true, message: '请输入适用范围' }]}
                  >
                    <Input.TextArea rows={4} placeholder="请输入适用范围，可按行拆分要点" />
                  </Form.Item>
                  <Form.Item
                    label="启动条件"
                    name="activationConditions"
                    rules={[{ required: true, message: '请输入启动条件' }]}
                  >
                    <Input.TextArea rows={4} placeholder="请输入启动条件，可按行拆分要点" />
                  </Form.Item>
                  <Form.Item
                    label="处置原则"
                    name="disposalPrinciples"
                    rules={[{ required: true, message: '请输入处置原则' }]}
                  >
                    <Input.TextArea rows={4} placeholder="请输入处置原则，可按行拆分要点" />
                  </Form.Item>
                  <Form.Item
                    label="应急动作"
                    name="emergencyActions"
                    rules={[{ required: true, message: '请输入应急动作' }]}
                  >
                    <Input.TextArea rows={5} placeholder="请输入应急处置动作，可按行拆分要点" />
                  </Form.Item>
                  <Form.Item
                    label="恢复措施"
                    name="recoveryMeasures"
                    rules={[{ required: true, message: '请输入恢复措施' }]}
                  >
                    <Input.TextArea rows={4} placeholder="请输入恢复措施，可按行拆分要点" />
                  </Form.Item>
                  <Form.Item
                    label="上报要求"
                    name="reportingRequirements"
                    rules={[{ required: true, message: '请输入上报要求' }]}
                  >
                    <Input.TextArea rows={4} placeholder="请输入上报要求，可按行拆分要点" />
                  </Form.Item>
                </Card>

                <Card
                  title="附件材料"
                  extra={
                    <Button onClick={() => setAttachmentFeedback('已触发新增附件占位，后续可接入真实上传能力。')}>
                      新增附件
                    </Button>
                  }
                >
                  <Table<PlanAttachment>
                    rowKey="attachmentId"
                    columns={attachmentColumns}
                    dataSource={planQuery.data?.attachmentList ?? []}
                    pagination={false}
                    locale={{ emptyText: '当前暂无附件，可通过上方按钮添加占位记录。' }}
                  />
                </Card>
              </div>
            </Form>
          </Col>

          <Col xs={24} xl={8}>
            <div className="space-y-4">
              <Card title="编制摘要">
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>页面模式</span>
                    <Typography.Text>{isEditing ? '编辑现有预案' : '创建新预案'}</Typography.Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>当前状态</span>
                    <StatusTag status={currentStatus} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>关联场景数</span>
                    <Typography.Text>{selectedScenarioIds.length}</Typography.Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>附件数量</span>
                    <Typography.Text>{planQuery.data?.attachmentList.length ?? 0}</Typography.Text>
                  </div>
                </div>
              </Card>

              <Card title="编制提示">
                <Space direction="vertical" size={12}>
                  <Typography.Text>1. 先补齐基础信息，再选择关联场景。</Typography.Text>
                  <Typography.Text>2. 预案内容建议按行拆分关键动作，便于详情页展示。</Typography.Text>
                  <Typography.Text>3. 附件能力在 Phase 1 使用轻量占位，后续再接真实上传流程。</Typography.Text>
                </Space>
              </Card>

              {planQuery.data ? (
                <Card title="当前版本信息">
                  <div className="space-y-2 text-sm text-slate-600">
                    <div>当前版本：{planQuery.data.currentVersion}</div>
                    <div>创建人：{planQuery.data.createdBy}</div>
                    <div>创建时间：{planQuery.data.createdAt}</div>
                    <div>最近更新：{planQuery.data.updatedAt}</div>
                  </div>
                </Card>
              ) : null}
            </div>
          </Col>
        </Row>
      </div>
    </PageContainer>
  )
}

export default PlanEditPage
