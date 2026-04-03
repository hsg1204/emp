import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
  message,
} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../../components/common/EmptyBlock'
import PageContainer from '../../../components/common/PageContainer'
import {
  getReportingStrategyFormPreset,
  systemBusinessSystemOptions,
  systemStatusOptions,
} from '../../../services/system'
import type { ReportingStrategyFormValues } from '../../../types/system'

const triggerLevelOptions = [
  { label: 'P1', value: 'P1' },
  { label: 'P1/P2', value: 'P1/P2' },
  { label: 'P2/P3', value: 'P2/P3' },
]

const notifyChannelOptions = [
  { label: '电话 + 短信', value: '电话 + 短信' },
  { label: '企业微信 + 短信', value: '企业微信 + 短信' },
  { label: '企业微信', value: '企业微信' },
]

function ReportingStrategyEditPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditMode = Boolean(id)
  const [form] = Form.useForm<ReportingStrategyFormValues>()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['reporting-strategy-form-preset', id],
    queryFn: () => getReportingStrategyFormPreset(id),
  })

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data, form])

  const pageTitle = isEditMode ? '上报策略编辑' : '新建上报策略'
  const pageDescription = useMemo(() => {
    return isEditMode
      ? '更新故障上报对象、时限要求和升级路径，保持值班协同配置最新。'
      : '为业务系统配置新的故障上报规则，明确响应对象和升级时限。'
  }, [isEditMode])

  const handleSubmit = async (values: ReportingStrategyFormValues) => {
    void message.success(
      isEditMode
        ? `上报策略已保存（模拟），当前响应时限为 ${values.responseLimitMinutes} 分钟。`
        : `上报策略已创建（模拟），当前响应时限为 ${values.responseLimitMinutes} 分钟。`,
    )
    navigate('/system/reporting-strategies')
  }

  if (isLoading) {
    return (
      <PageContainer
        title={pageTitle}
        extra={
          <Space>
            <Button onClick={() => navigate('/system/reporting-strategies')}>返回列表</Button>
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
            <Button onClick={() => navigate('/system/reporting-strategies')}>返回列表</Button>
            <Button type="primary" onClick={() => form.submit()}>
              保存
            </Button>
          </Space>
        }
      >
        <div className="space-y-4">
          <Alert
            type="error"
            showIcon
            message="上报策略表单数据加载失败，请稍后重试。"
            action={
              <Button size="small" onClick={() => void refetch()}>
                重新加载
              </Button>
            }
          />
          <EmptyBlock title="无法加载上报策略" description="请返回列表后重试，或重新进入编辑页。" />
        </div>
      </PageContainer>
    )
  }

  if (!data && isEditMode) {
    return (
      <PageContainer title={pageTitle}>
        <EmptyBlock title="未找到上报策略" description="请返回列表重新选择需要编辑的策略。" />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title={pageTitle}
      extra={
        <Space>
          <Button onClick={() => navigate('/system/reporting-strategies')}>返回列表</Button>
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

        {isError ? (
          <Alert
            type="error"
            showIcon
            message="上报策略表单数据加载失败，请稍后重试。"
            action={
              <Button size="small" onClick={() => void refetch()}>
                重新加载
              </Button>
            }
          />
        ) : null}

        <Form<ReportingStrategyFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            businessSystem: '交易系统',
            triggerLevel: 'P1',
            responseLimitMinutes: 5,
            escalationLimitMinutes: 15,
            notifyChannel: '电话 + 短信',
            status: 'enabled',
          }}
          disabled={isLoading}
        >
          <div className="space-y-4">
            <Card title="基础信息">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="策略名称"
                    name="strategyName"
                    rules={[{ required: true, message: '请输入策略名称' }]}
                  >
                    <Input placeholder="请输入上报策略名称" maxLength={50} showCount />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="所属系统"
                    name="businessSystem"
                    rules={[{ required: true, message: '请选择所属系统' }]}
                  >
                    <Select options={systemBusinessSystemOptions} placeholder="请选择所属系统" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="触发等级"
                    name="triggerLevel"
                    rules={[{ required: true, message: '请选择触发等级' }]}
                  >
                    <Select options={triggerLevelOptions} placeholder="请选择触发等级" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="上报对象"
                    name="targetType"
                    rules={[{ required: true, message: '请输入上报对象' }]}
                  >
                    <Input placeholder="如：值班经理 + 应急总指挥" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="通知方式"
                    name="notifyChannel"
                    rules={[{ required: true, message: '请选择通知方式' }]}
                  >
                    <Select options={notifyChannelOptions} placeholder="请选择通知方式" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="时限与状态">
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="响应时限（分钟）"
                    name="responseLimitMinutes"
                    rules={[{ required: true, message: '请输入响应时限' }]}
                  >
                    <InputNumber min={1} max={120} className="w-full" placeholder="请输入响应时限" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="升级时限（分钟）"
                    name="escalationLimitMinutes"
                    rules={[{ required: true, message: '请输入升级时限' }]}
                  >
                    <InputNumber min={1} max={240} className="w-full" placeholder="请输入升级时限" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="状态" name="status" rules={[{ required: true, message: '请选择状态' }]}>
                    <Select options={systemStatusOptions} placeholder="请选择状态" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="补充说明">
              <Form.Item
                label="策略说明"
                name="description"
                rules={[{ required: true, message: '请输入策略说明' }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="请输入策略适用范围、触发条件和升级说明。"
                  maxLength={200}
                  showCount
                />
              </Form.Item>
            </Card>
          </div>
        </Form>
      </div>
    </PageContainer>
  )
}

export default ReportingStrategyEditPage
