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
  Spin,
  Typography,
} from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import { eventLevelOptions, eventSourceOptions, eventStatusOptions } from './constants'
import { getEventDetail } from '../../services/event'
import type { EventLevel, EventSource, EventStatus } from '../../types/event'

const { TextArea } = Input

interface EventFormValues {
  eventTitle: string
  eventCode: string
  businessSystem: string
  eventLevel: EventLevel
  status: EventStatus
  source: EventSource
  incidentTime: string
  emergencyCommander: string
  responseOwner: string
  collaborationGroup: string
  currentPhase: string
  incidentCategory: string
  occurrenceLocation: string
  summary: string
  businessImpact: string
  impactScope: string
  latestConclusion: string
  disposalSuggestion: string
  planName: string
  relatedProcess: string
  tags: string[]
}

const defaultValues: EventFormValues = {
  eventTitle: '',
  eventCode: '',
  businessSystem: '',
  eventLevel: 'P2',
  status: 'new',
  source: 'manualReport',
  incidentTime: '2026-04-03 09:00:00',
  emergencyCommander: '',
  responseOwner: '',
  collaborationGroup: '',
  currentPhase: '事件受理',
  incidentCategory: '',
  occurrenceLocation: '',
  summary: '',
  businessImpact: '',
  impactScope: '',
  latestConclusion: '',
  disposalSuggestion: '',
  planName: '',
  relatedProcess: '',
  tags: [],
}

function EventEditPage() {
  const { id } = useParams<{ id: string }>()
  const [form] = Form.useForm<EventFormValues>()
  const navigate = useNavigate()
  const [submitSummary, setSubmitSummary] = useState<string | null>(null)
  const isCreateMode = !id

  const { data, isLoading, isError } = useQuery({
    queryKey: ['event-detail', id],
    queryFn: () => getEventDetail(id ?? ''),
    enabled: Boolean(id),
  })

  const pageTitle = useMemo(() => (isCreateMode ? '新建事件' : '编辑事件'), [isCreateMode])

  useEffect(() => {
    if (isCreateMode) {
      form.setFieldsValue(defaultValues)
      return
    }

    if (!data) {
      return
    }

    form.setFieldsValue({
      eventTitle: data.eventTitle,
      eventCode: data.eventCode,
      businessSystem: data.businessSystem,
      eventLevel: data.eventLevel,
      status: data.status,
      source: data.source,
      incidentTime: data.incidentTime,
      emergencyCommander: data.emergencyCommander,
      responseOwner: data.responseOwner,
      collaborationGroup: data.collaborationGroup,
      currentPhase: data.currentPhase,
      incidentCategory: data.incidentCategory,
      occurrenceLocation: data.occurrenceLocation,
      summary: data.summary,
      businessImpact: data.businessImpact,
      impactScope: data.impactScope,
      latestConclusion: data.latestConclusion,
      disposalSuggestion: data.disposalSuggestion,
      planName: data.planName,
      relatedProcess: data.relatedProcess,
      tags: data.tags,
    })
  }, [data, form, isCreateMode])

  const handleReset = () => {
    setSubmitSummary(null)

    if (isCreateMode) {
      form.setFieldsValue(defaultValues)
      return
    }

    if (data) {
      form.resetFields()
      form.setFieldsValue({
        eventTitle: data.eventTitle,
        eventCode: data.eventCode,
        businessSystem: data.businessSystem,
        eventLevel: data.eventLevel,
        status: data.status,
        source: data.source,
        incidentTime: data.incidentTime,
        emergencyCommander: data.emergencyCommander,
        responseOwner: data.responseOwner,
        collaborationGroup: data.collaborationGroup,
        currentPhase: data.currentPhase,
        incidentCategory: data.incidentCategory,
        occurrenceLocation: data.occurrenceLocation,
        summary: data.summary,
        businessImpact: data.businessImpact,
        impactScope: data.impactScope,
        latestConclusion: data.latestConclusion,
        disposalSuggestion: data.disposalSuggestion,
        planName: data.planName,
        relatedProcess: data.relatedProcess,
        tags: data.tags,
      })
    }
  }

  const handleFinish = (values: EventFormValues) => {
    setSubmitSummary(
      `${isCreateMode ? '已模拟创建' : '已模拟保存'}事件“${values.eventTitle}”，当前状态为“${eventStatusOptions.find((item) => item.value === values.status)?.label ?? values.status}”。`,
    )
  }

  if (!isCreateMode && isLoading) {
    return (
      <PageContainer title={pageTitle}>
        <Card>
          <div className="flex min-h-[320px] items-center justify-center">
            <Spin tip="正在加载事件数据..." />
          </div>
        </Card>
      </PageContainer>
    )
  }

  if (!isCreateMode && isError) {
    return (
      <PageContainer title={pageTitle}>
        <Alert
          type="error"
          showIcon
          message="事件数据加载失败，请稍后重试。"
          action={<Button size="small" onClick={() => navigate(0)}>重新加载</Button>}
        />
      </PageContainer>
    )
  }

  if (!isCreateMode && !data) {
    return (
      <PageContainer title={pageTitle}>
        <EmptyBlock title="未找到事件数据" description="请返回列表重新选择，或检查当前访问地址是否正确。" />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title={pageTitle}
      extra={
        <Space>
          {!isCreateMode && id ? <Link to={`/events/${id}`}>查看详情</Link> : null}
          <Link to="/events">返回列表</Link>
        </Space>
      }
    >
      <div className="space-y-4">
        <Alert
          type="info"
          showIcon
          message="Phase 1 仅提供前端结构化录入与本地交互，不对接外部系统。"
        />

        {submitSummary ? <Alert type="success" showIcon message={submitSummary} /> : null}

        <Form<EventFormValues>
          form={form}
          layout="vertical"
          initialValues={defaultValues}
          onFinish={handleFinish}
        >
          <div className="space-y-4">
            <Card title="事件基本信息">
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Form.Item<EventFormValues>
                    label="事件标题"
                    name="eventTitle"
                    rules={[{ required: true, message: '请输入事件标题' }]}
                  >
                    <Input placeholder="请输入事件标题" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<EventFormValues>
                    label="事件编号"
                    name="eventCode"
                    rules={[{ required: true, message: '请输入事件编号' }]}
                  >
                    <Input placeholder="请输入事件编号" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item<EventFormValues>
                    label="所属系统"
                    name="businessSystem"
                    rules={[{ required: true, message: '请输入所属系统' }]}
                  >
                    <Input placeholder="例如：交易系统" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item<EventFormValues> label="事件等级" name="eventLevel" rules={[{ required: true, message: '请选择事件等级' }]}>
                    <Select options={eventLevelOptions} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item<EventFormValues> label="事件来源" name="source" rules={[{ required: true, message: '请选择事件来源' }]}>
                    <Select options={eventSourceOptions} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item<EventFormValues> label="事件状态" name="status" rules={[{ required: true, message: '请选择事件状态' }]}>
                    <Select options={eventStatusOptions} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item<EventFormValues>
                    label="发生时间"
                    name="incidentTime"
                    rules={[{ required: true, message: '请输入发生时间' }]}
                  >
                    <Input placeholder="YYYY-MM-DD HH:mm:ss" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item<EventFormValues>
                    label="当前阶段"
                    name="currentPhase"
                    rules={[{ required: true, message: '请输入当前阶段' }]}
                  >
                    <Input placeholder="例如：事件受理 / 应急处置中" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<EventFormValues>
                    label="事件类别"
                    name="incidentCategory"
                    rules={[{ required: true, message: '请输入事件类别' }]}
                  >
                    <Input placeholder="例如：应用性能异常" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<EventFormValues>
                    label="发生位置"
                    name="occurrenceLocation"
                    rules={[{ required: true, message: '请输入发生位置' }]}
                  >
                    <Input placeholder="例如：核心交易集群 A 区" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item<EventFormValues>
                    label="事件摘要"
                    name="summary"
                    rules={[{ required: true, message: '请输入事件摘要' }]}
                  >
                    <TextArea rows={4} placeholder="概述事件现象、当前观察和初步判断" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<EventFormValues>
                    label="业务影响"
                    name="businessImpact"
                    rules={[{ required: true, message: '请输入业务影响' }]}
                  >
                    <TextArea rows={4} placeholder="描述对交易、客户、渠道或运营的影响" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<EventFormValues>
                    label="影响范围"
                    name="impactScope"
                    rules={[{ required: true, message: '请输入影响范围' }]}
                  >
                    <TextArea rows={4} placeholder="描述受影响模块、服务或业务域" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="应急协同与处置">
              <Row gutter={[16, 0]}>
                <Col span={8}>
                  <Form.Item<EventFormValues>
                    label="应急指挥"
                    name="emergencyCommander"
                    rules={[{ required: true, message: '请输入应急指挥' }]}
                  >
                    <Input placeholder="请输入应急指挥姓名" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item<EventFormValues>
                    label="响应负责人"
                    name="responseOwner"
                    rules={[{ required: true, message: '请输入响应负责人' }]}
                  >
                    <Input placeholder="请输入响应负责人或团队" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item<EventFormValues>
                    label="协同群组"
                    name="collaborationGroup"
                    rules={[{ required: true, message: '请输入协同群组' }]}
                  >
                    <Input placeholder="请输入群组名称" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<EventFormValues>
                    label="关联预案"
                    name="planName"
                    rules={[{ required: true, message: '请输入关联预案' }]}
                  >
                    <Input placeholder="请输入关联预案名称" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<EventFormValues>
                    label="关联流程"
                    name="relatedProcess"
                    rules={[{ required: true, message: '请输入关联流程' }]}
                  >
                    <Input placeholder="请输入关联流程名称" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item<EventFormValues> label="事件标签" name="tags">
                    <Select mode="tags" placeholder="输入后回车，可添加多个标签" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<EventFormValues>
                    label="最新结论"
                    name="latestConclusion"
                    rules={[{ required: true, message: '请输入最新结论' }]}
                  >
                    <TextArea rows={4} placeholder="同步当前判断、恢复进度或待决策事项" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<EventFormValues>
                    label="处置建议"
                    name="disposalSuggestion"
                    rules={[{ required: true, message: '请输入处置建议' }]}
                  >
                    <TextArea rows={4} placeholder="描述下一步动作、跟进要点和升级建议" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <Typography.Title level={5} className="!mb-1">
                    表单说明
                  </Typography.Title>
                  <Typography.Text type="secondary">
                    本页用于 Phase 1 结构化录入事件与轻量应急协同信息，保存结果仅在当前前端页面内反馈。
                  </Typography.Text>
                </div>
                <Space>
                  <Button onClick={handleReset}>重置表单</Button>
                  <Button type="primary" htmlType="submit">
                    {isCreateMode ? '创建事件' : '保存变更'}
                  </Button>
                </Space>
              </div>
            </Card>
          </div>
        </Form>
      </div>
    </PageContainer>
  )
}

export default EventEditPage
