import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Col, Form, Input, Row, Select, Space, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../../components/common/EmptyBlock'
import PageContainer from '../../../components/common/PageContainer'
import { getPushStrategyFormPreset, systemBusinessSystemOptions, systemStatusOptions } from '../../../services/system'
import type { PushStrategyFormValues } from '../../../types/system'

const triggerActionOptions = [
  { label: 'P1 告警触发', value: 'P1 告警触发' },
  { label: '支付网关失败率升高', value: '支付网关失败率升高' },
  { label: '批处理失败', value: '批处理失败' },
]

const pushChannelOptions = [
  { label: '企业微信机器人', value: '企业微信机器人' },
  { label: '短信 + 企业微信', value: '短信 + 企业微信' },
  { label: '邮件', value: '邮件' },
]

function PushStrategyEditPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditMode = Boolean(id)
  const [form] = Form.useForm<PushStrategyFormValues>()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['push-strategy-form-preset', id],
    queryFn: () => getPushStrategyFormPreset(id),
  })

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data, form])

  const pageTitle = isEditMode ? '推送策略编辑' : '新建推送策略'
  const pageDescription = useMemo(() => {
    return isEditMode
      ? '更新故障通知对象、推送通道和模板内容，保持系统通知链路有效。'
      : '为指定业务系统新增故障通知策略，配置触发动作与消息下发方式。'
  }, [isEditMode])

  const handleSubmit = async (values: PushStrategyFormValues) => {
    void message.success(
      isEditMode
        ? `推送策略已保存（模拟），当前推送通道为 ${values.pushChannel}。`
        : `推送策略已创建（模拟），当前推送通道为 ${values.pushChannel}。`,
    )
    navigate('/system/push-strategies')
  }

  if (isLoading) {
    return (
      <PageContainer
        title={pageTitle}
        extra={
          <Space>
            <Button onClick={() => navigate('/system/push-strategies')}>返回列表</Button>
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
            <Button onClick={() => navigate('/system/push-strategies')}>返回列表</Button>
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
            message="推送策略表单数据加载失败，请稍后重试。"
            action={
              <Button size="small" onClick={() => void refetch()}>
                重新加载
              </Button>
            }
          />
          <EmptyBlock title="无法加载推送策略" description="请返回列表后重试，或重新进入编辑页。" />
        </div>
      </PageContainer>
    )
  }

  if (!data && isEditMode) {
    return (
      <PageContainer title={pageTitle}>
        <EmptyBlock title="未找到推送策略" description="请返回列表重新选择需要编辑的策略。" />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title={pageTitle}
      extra={
        <Space>
          <Button onClick={() => navigate('/system/push-strategies')}>返回列表</Button>
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
            message="推送策略表单数据加载失败，请稍后重试。"
            action={
              <Button size="small" onClick={() => void refetch()}>
                重新加载
              </Button>
            }
          />
        ) : null}

        <Form<PushStrategyFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            businessSystem: '交易系统',
            triggerAction: 'P1 告警触发',
            pushChannel: '企业微信机器人',
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
                    <Input placeholder="请输入推送策略名称" maxLength={50} showCount />
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
                    label="触发动作"
                    name="triggerAction"
                    rules={[{ required: true, message: '请选择触发动作' }]}
                  >
                    <Select options={triggerActionOptions} placeholder="请选择触发动作" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="推送对象"
                    name="targetScope"
                    rules={[{ required: true, message: '请输入推送对象' }]}
                  >
                    <Input placeholder="如：应急组 + 管理群" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="推送通道"
                    name="pushChannel"
                    rules={[{ required: true, message: '请选择推送通道' }]}
                  >
                    <Select options={pushChannelOptions} placeholder="请选择推送通道" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="消息模板"
                    name="templateName"
                    rules={[{ required: true, message: '请输入消息模板名称' }]}
                  >
                    <Input placeholder="请输入消息模板名称" />
                  </Form.Item>
                </Col>
                <Col span={12}>
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
                  placeholder="请输入适用触发场景、下发对象和模板要点。"
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

export default PushStrategyEditPage
