import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Col, Form, Input, Row, Select, Space, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import {
  getReviewIssueFormPreset,
  getReviewIssueSourceOptions,
} from '../../services/reviewIssue'
import type { ReviewIssueFormValues } from '../../types/review-issue'
import {
  reviewIssueSeverityOptions,
  reviewIssueSourceTypeLabelMap,
  reviewIssueSourceTypeOptions,
  reviewIssueStatusOptions,
} from './constants'

function ReviewIssueEditPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditMode = Boolean(id)
  const [form] = Form.useForm<ReviewIssueFormValues>()
  const selectedSourceType = Form.useWatch('sourceType', form)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['review-issue-form-preset', id],
    queryFn: () => getReviewIssueFormPreset(id),
  })

  const {
    data: sourceOptions = [],
    isLoading: isSourceOptionsLoading,
    isError: isSourceOptionsError,
  } = useQuery({
    queryKey: ['review-issue-source-options', selectedSourceType],
    queryFn: () => getReviewIssueSourceOptions(selectedSourceType),
  })

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data, form])

  useEffect(() => {
    if (!selectedSourceType || sourceOptions.length === 0) {
      return
    }

    const currentSourceId = form.getFieldValue('sourceId')
    const isCurrentValueValid = sourceOptions.some((option) => option.value === currentSourceId)

    if (!isCurrentValueValid) {
      form.setFieldValue('sourceId', sourceOptions[0]?.value)
    }
  }, [form, selectedSourceType, sourceOptions])

  const pageTitle = isEditMode ? '复盘问题编辑' : '新建复盘问题'
  const pageDescription = useMemo(() => {
    return isEditMode
      ? '更新问题信息、来源关联、整改责任人与跟踪计划。'
      : '录入复盘问题并建立来源关联，形成后续整改跟踪入口。'
  }, [isEditMode])

  const handleSubmit = async (values: ReviewIssueFormValues) => {
    void message.success(
      isEditMode
        ? `复盘问题已暂存（模拟），当前关联来源类型为${reviewIssueSourceTypeLabelMap[values.sourceType]}。`
        : `复盘问题已创建（模拟），当前关联来源类型为${reviewIssueSourceTypeLabelMap[values.sourceType]}。`,
    )
  }

  if (isLoading) {
    return (
      <PageContainer
        title={pageTitle}
        extra={
          <Space>
            <Button onClick={() => navigate(id ? `/review/issues/${id}` : '/review/issues')}>
              {isEditMode ? '查看详情' : '返回列表'}
            </Button>
            <Button type="primary" loading>
              保存
            </Button>
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
        title={pageTitle}
        extra={
          <Space>
            <Button onClick={() => navigate(id ? `/review/issues/${id}` : '/review/issues')}>
              {isEditMode ? '查看详情' : '返回列表'}
            </Button>
            <Button type="primary" onClick={() => form.submit()}>
              保存
            </Button>
          </Space>
        }
      >
        <div className="space-y-4">
          <Alert type="error" showIcon message="复盘问题表单数据加载失败，请稍后重试。" />
          <EmptyBlock title="无法加载表单数据" description="请稍后重试，或返回列表重新选择需要编辑的问题。" />
        </div>
      </PageContainer>
    )
  }

  if (!data && isEditMode) {
    return (
      <PageContainer title={pageTitle}>
        <EmptyBlock title="未找到复盘问题" description="请返回列表重新选择需要编辑的问题。" />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title={pageTitle}
      extra={
        <Space>
          <Button onClick={() => navigate(id ? `/review/issues/${id}` : '/review/issues')}>
            {isEditMode ? '查看详情' : '返回列表'}
          </Button>
          <Button type="primary" onClick={() => form.submit()}>
            保存
          </Button>
        </Space>
      }
    >
      <div className="space-y-4">
        <Card>
          <div className="space-y-2">
            <Typography.Title level={5} className="mb-0">
              页面说明
            </Typography.Title>
            <Typography.Paragraph className="mb-0 text-slate-500">{pageDescription}</Typography.Paragraph>
          </div>
        </Card>

        {isError ? <Alert type="error" showIcon message="复盘问题表单数据加载失败，请稍后重试。" /> : null}

        <Form<ReviewIssueFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ sourceType: 'drillPlan', severity: 'medium', status: 'open' }}
          disabled={isLoading}
        >
          <div className="space-y-4">
            <Card title="基础信息">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="问题标题"
                    name="issueTitle"
                    rules={[{ required: true, message: '请输入问题标题' }]}
                  >
                    <Input placeholder="请输入复盘问题标题" maxLength={60} showCount />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="问题分类"
                    name="issueCategory"
                    rules={[{ required: true, message: '请输入问题分类' }]}
                  >
                    <Input placeholder="如：通知机制、流程执行、资料归档" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="来源类型"
                    name="sourceType"
                    rules={[{ required: true, message: '请选择来源类型' }]}
                  >
                    <Select options={reviewIssueSourceTypeOptions} placeholder="请选择来源类型" />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    label="关联来源"
                    name="sourceId"
                    rules={[{ required: true, message: '请选择关联来源' }]}
                    extra={isSourceOptionsError ? '关联来源加载失败，请重新选择来源类型后重试。' : undefined}
                    validateStatus={isSourceOptionsError ? 'error' : undefined}
                  >
                    <Select
                      options={sourceOptions}
                      loading={isSourceOptionsLoading}
                      placeholder="请选择关联的演练计划或事件"
                      notFoundContent={isSourceOptionsError ? '关联来源加载失败' : undefined}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="严重程度"
                    name="severity"
                    rules={[{ required: true, message: '请选择严重程度' }]}
                  >
                    <Select options={reviewIssueSeverityOptions} placeholder="请选择严重程度" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="发现时间"
                    name="discoveredAt"
                    rules={[{ required: true, message: '请输入发现时间' }]}
                  >
                    <Input placeholder="格式示例：2026-04-03 09:00:00" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="整改状态"
                    name="status"
                    rules={[{ required: true, message: '请选择整改状态' }]}
                  >
                    <Select options={reviewIssueStatusOptions} placeholder="请选择整改状态" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="整改责任信息">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="责任人"
                    name="ownerName"
                    rules={[{ required: true, message: '请输入责任人' }]}
                  >
                    <Input placeholder="请输入责任人姓名" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="责任部门"
                    name="ownerDepartment"
                    rules={[{ required: true, message: '请输入责任部门' }]}
                  >
                    <Input placeholder="请输入责任部门" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="整改截止日期"
                    name="dueDate"
                    rules={[{ required: true, message: '请输入整改截止日期' }]}
                  >
                    <Input placeholder="格式示例：2026-04-18" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="问题分析与整改计划">
              <Form.Item
                label="问题描述"
                name="issueDescription"
                rules={[{ required: true, message: '请输入问题描述' }]}
              >
                <Input.TextArea rows={4} placeholder="请描述复盘发现的问题现象、触发场景与表现。" maxLength={300} showCount />
              </Form.Item>
              <Form.Item
                label="影响范围"
                name="impactScope"
                rules={[{ required: true, message: '请输入影响范围' }]}
              >
                <Input.TextArea rows={3} placeholder="请说明对系统、流程、人员协同等方面的影响。" maxLength={200} showCount />
              </Form.Item>
              <Form.Item
                label="整改措施"
                name="correctiveAction"
                rules={[{ required: true, message: '请输入整改措施' }]}
              >
                <Input.TextArea rows={4} placeholder="请填写整改方案、推进步骤和检查方式。" maxLength={300} showCount />
              </Form.Item>
            </Card>
          </div>
        </Form>
      </div>
    </PageContainer>
  )
}

export default ReviewIssueEditPage
