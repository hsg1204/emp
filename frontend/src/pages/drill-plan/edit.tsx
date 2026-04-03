import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
  message,
} from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import { useNavigate, useParams } from 'react-router-dom'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import { getDrillPlanDetail, getDrillPlanFormOptions } from '../../services/drillPlan'
import type { DrillPlanStatus } from '../../types/drill-plan'

interface DrillPlanFormValues {
  drillPlanName: string
  businessSystem: string
  drillType: string
  scheduledTime: Dayjs
  commander: string
  status: DrillPlanStatus
  relatedScenarioId: string
  relatedPlanId: string
  relatedProcessId: string
  participantDepartments: string[]
  reportTemplate: string
  drillTargets: string[]
  observationPoints: string[]
  drillScope: string
  remarks: string
}

function toDrillPlanFormValues(detail: {
  drillPlanName: string
  businessSystem: string
  drillType: string
  scheduledTime: string
  commander: string
  status: DrillPlanStatus
  relatedScenarioId: string
  relatedPlanId: string
  relatedProcessId: string
  participantDepartments: string[]
  drillTargets: string[]
  observationPoints: string[]
  drillScope: string
  remarks: string
}): DrillPlanFormValues {
  return {
    drillPlanName: detail.drillPlanName,
    businessSystem: detail.businessSystem,
    drillType: detail.drillType,
    scheduledTime: dayjs(detail.scheduledTime),
    commander: detail.commander,
    status: detail.status,
    relatedScenarioId: detail.relatedScenarioId,
    relatedPlanId: detail.relatedPlanId,
    relatedProcessId: detail.relatedProcessId,
    participantDepartments: detail.participantDepartments,
    reportTemplate: 'template-001',
    drillTargets: detail.drillTargets,
    observationPoints: detail.observationPoints,
    drillScope: detail.drillScope,
    remarks: detail.remarks,
  }
}

function DrillPlanEditPage() {
  const navigate = useNavigate()
  const [form] = Form.useForm<DrillPlanFormValues>()
  const [messageApi, contextHolder] = message.useMessage()
  const { id } = useParams()
  const isEditMode = Boolean(id)

  const { data: detail, isLoading: detailLoading, isError: detailError } = useQuery({
    queryKey: ['drill-plan-detail', id],
    queryFn: () => getDrillPlanDetail(id ?? ''),
    enabled: isEditMode,
  })

  const { data: options, isLoading: optionsLoading, isError: optionsError } = useQuery({
    queryKey: ['drill-plan-form-options'],
    queryFn: getDrillPlanFormOptions,
  })

  useEffect(() => {
    if (detail) {
      form.setFieldsValue(toDrillPlanFormValues(detail))
      return
    }

    if (isEditMode && !detailLoading) {
      form.resetFields()
    }
  }, [detail, detailLoading, form, isEditMode])

  const initialValues = useMemo<Partial<DrillPlanFormValues>>(
    () => ({
      status: 'draft',
      participantDepartments: [],
      drillTargets: [''],
      observationPoints: [''],
      reportTemplate: 'template-001',
    }),
    [],
  )

  const previewValues = Form.useWatch([], form)

  const handleSubmit = async (values: DrillPlanFormValues) => {
    await Promise.resolve(values)
    messageApi.success(isEditMode ? '演练计划已暂存，本阶段仅做本地交互展示。' : '演练计划已创建，本阶段仅做本地交互展示。')
  }

  return (
    <PageContainer
      title={isEditMode ? '应急演练计划编辑' : '新建应急演练计划'}
      extra={
        <Space>
          <Button onClick={() => navigate('/drills/plans')}>返回列表</Button>
          {isEditMode && id ? <Button onClick={() => navigate(`/drills/plans/${id}`)}>查看详情</Button> : null}
        </Space>
      }
    >
      {contextHolder}
      <div className="space-y-4">
        <Card>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <Typography.Title level={5} className="!mb-1">
                Phase 1 计划编排表单
              </Typography.Title>
              <Typography.Text type="secondary">
                当前先支持本地表单录入、资源关联和执行准备信息配置，不接入深度执行控制逻辑。
              </Typography.Text>
            </div>
            {detail?.status ? <StatusTag status={detail.status} /> : <StatusTag status="draft" />}
          </div>
        </Card>

        {detailError || optionsError ? <Alert type="error" showIcon message="演练计划数据加载失败，请刷新页面后重试。" /> : null}
        {isEditMode && !detailLoading && !detail ? (
          <Alert type="warning" showIcon message="未找到对应的演练计划，当前以新建模式展示表单结构。" />
        ) : null}

        <Row gutter={[16, 16]}>
          <Col xs={24} xl={16}>
            <Form<DrillPlanFormValues>
              form={form}
              layout="vertical"
              initialValues={initialValues}
              onFinish={handleSubmit}
              disabled={optionsLoading || detailLoading}
            >
              <Card title="基本信息">
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item name="drillPlanName" label="演练计划名称" rules={[{ required: true, message: '请输入演练计划名称' }]}>
                      <Input placeholder="请输入演练计划名称" maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="businessSystem" label="业务系统" rules={[{ required: true, message: '请选择业务系统' }]}>
                      <Select placeholder="请选择业务系统" options={options?.businessSystems ?? []} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="drillType" label="演练类型" rules={[{ required: true, message: '请选择演练类型' }]}>
                      <Select placeholder="请选择演练类型" options={options?.drillTypes ?? []} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="scheduledTime" label="计划时间" rules={[{ required: true, message: '请选择计划时间' }]}>
                      <DatePicker showTime className="w-full" placeholder="请选择计划时间" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="commander" label="演练指挥人" rules={[{ required: true, message: '请选择演练指挥人' }]}>
                      <Select placeholder="请选择演练指挥人" options={options?.commanders ?? []} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="status" label="计划状态" rules={[{ required: true, message: '请选择计划状态' }]}>
                      <Select
                        placeholder="请选择计划状态"
                        options={[
                          { label: '草稿', value: 'draft' },
                          { label: '待审批', value: 'pendingApproval' },
                          { label: '已发布', value: 'published' },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title="关联资源" className="mt-4">
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item name="relatedScenarioId" label="关联场景" rules={[{ required: true, message: '请选择关联场景' }]}>
                      <Select placeholder="请选择关联场景" options={options?.scenarios ?? []} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="relatedPlanId" label="关联预案" rules={[{ required: true, message: '请选择关联预案' }]}>
                      <Select placeholder="请选择关联预案" options={options?.plans ?? []} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="relatedProcessId" label="关联流程" rules={[{ required: true, message: '请选择关联流程' }]}>
                      <Select placeholder="请选择关联流程" options={options?.processes ?? []} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="participantDepartments"
                      label="参演部门"
                      rules={[{ required: true, message: '请选择至少一个参演部门' }]}
                    >
                      <Select mode="multiple" placeholder="请选择参演部门" options={options?.departments ?? []} />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item name="reportTemplate" label="报告模板">
                      <Select placeholder="请选择报告模板" options={options?.reportTemplates ?? []} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title="执行准备" className="mt-4">
                <Form.Item name="drillScope" label="演练范围" rules={[{ required: true, message: '请输入演练范围' }]}>
                  <Input.TextArea rows={4} placeholder="请输入本次演练覆盖的系统、链路和关键动作范围" />
                </Form.Item>

                <Form.List name="drillTargets">
                  {(fields, { add, remove }) => (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Typography.Text strong>演练目标</Typography.Text>
                        <Button onClick={() => add('')}>新增目标</Button>
                      </div>
                      {fields.map((field, index) => (
                        <Space key={field.key} align="baseline" className="flex w-full">
                          <Form.Item
                            {...field}
                            className="mb-0 flex-1"
                            rules={[{ required: true, message: '请输入演练目标' }]}
                          >
                            <Input placeholder={`请输入演练目标 ${index + 1}`} />
                          </Form.Item>
                          {fields.length > 1 ? <Button danger onClick={() => remove(field.name)}>删除</Button> : null}
                        </Space>
                      ))}
                    </div>
                  )}
                </Form.List>

                <div className="mt-4">
                  <Form.List name="observationPoints">
                    {(fields, { add, remove }) => (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Typography.Text strong>观察点</Typography.Text>
                          <Button onClick={() => add('')}>新增观察点</Button>
                        </div>
                        {fields.map((field, index) => (
                          <Space key={field.key} align="baseline" className="flex w-full">
                            <Form.Item
                              {...field}
                              className="mb-0 flex-1"
                              rules={[{ required: true, message: '请输入观察点' }]}
                            >
                              <Input placeholder={`请输入观察点 ${index + 1}`} />
                            </Form.Item>
                            {fields.length > 1 ? <Button danger onClick={() => remove(field.name)}>删除</Button> : null}
                          </Space>
                        ))}
                      </div>
                    )}
                  </Form.List>
                </div>
              </Card>

              <Card title="补充说明" className="mt-4">
                <Form.Item name="remarks" label="备注说明">
                  <Input.TextArea rows={4} placeholder="请输入补充说明，例如演练窗口限制、回退要求、素材准备情况等" />
                </Form.Item>
              </Card>

              <Card className="mt-4">
                <Space>
                  <Button type="primary" htmlType="submit">
                    保存计划
                  </Button>
                  <Button
                    onClick={() => {
                      form.setFieldValue('status', 'draft')
                      form.submit()
                    }}
                  >
                    暂存草稿
                  </Button>
                  <Button
                    onClick={() => {
                      if (detail) {
                        form.setFieldsValue(toDrillPlanFormValues(detail))
                        return
                      }

                      form.resetFields()
                    }}
                  >
                    重置表单
                  </Button>
                </Space>
              </Card>
            </Form>
          </Col>

          <Col xs={24} xl={8}>
            <Card title="当前配置预览">
              <Descriptions column={1} size="small" bordered>
                <Descriptions.Item label="计划名称">{previewValues?.drillPlanName || '待填写'}</Descriptions.Item>
                <Descriptions.Item label="业务系统">{previewValues?.businessSystem || '待选择'}</Descriptions.Item>
                <Descriptions.Item label="演练类型">{previewValues?.drillType || '待选择'}</Descriptions.Item>
                <Descriptions.Item label="计划时间">
                  {previewValues?.scheduledTime ? previewValues.scheduledTime.format('YYYY-MM-DD HH:mm:ss') : '待选择'}
                </Descriptions.Item>
                <Descriptions.Item label="指挥人">{previewValues?.commander || '待选择'}</Descriptions.Item>
                <Descriptions.Item label="计划状态">
                  <StatusTag status={previewValues?.status ?? 'draft'} />
                </Descriptions.Item>
                <Descriptions.Item label="参演部门">
                  {previewValues?.participantDepartments?.length ? previewValues.participantDepartments.join('、') : '待选择'}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="Phase 1 填写建议" className="mt-4">
              <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>优先补齐场景、预案、流程三项关联，确保详情页可串联查看。</li>
                <li>执行准备先记录目标、观察点和范围，不接入自动执行控制。</li>
                <li>报告模板只做轻量选择，后续阶段再补充深度报告编辑能力。</li>
                <li>若为编辑模式，可结合详情页中的执行记录与操作日志继续完善信息。</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  )
}

export default DrillPlanEditPage
