import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Col, Form, Input, Row, Select, Space, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../../components/common/EmptyBlock'
import PageContainer from '../../../components/common/PageContainer'
import { getFixedGroupFormPreset, systemBusinessSystemOptions, systemStatusOptions } from '../../../services/system'
import type { FixedGroupFormValues } from '../../../types/system'

const groupTypeOptions = [
  { label: '处置群', value: '处置群' },
  { label: '值班群', value: '值班群' },
  { label: '备份群', value: '备份群' },
]

const channelTypeOptions = [
  { label: '企业微信', value: '企业微信' },
  { label: '钉钉', value: '钉钉' },
  { label: '短信组', value: '短信组' },
]

function FixedGroupEditPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditMode = Boolean(id)
  const [form] = Form.useForm<FixedGroupFormValues>()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['fixed-group-form-preset', id],
    queryFn: () => getFixedGroupFormPreset(id),
  })

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data, form])

  const pageTitle = isEditMode ? '固定群编辑' : '新建固定群'
  const pageDescription = useMemo(() => {
    return isEditMode
      ? '更新固定群的成员组成、通道类型和负责人信息，保障通知群可随时启用。'
      : '为业务系统新建固定群，建立应急处置时可直接使用的沟通入口。'
  }, [isEditMode])

  const handleSubmit = async (values: FixedGroupFormValues) => {
    const memberCount = values.memberNames
      .split('、')
      .map((item) => item.trim())
      .filter(Boolean).length

    void message.success(
      isEditMode
        ? `固定群已保存（模拟），当前录入成员 ${memberCount} 人。`
        : `固定群已创建（模拟），当前录入成员 ${memberCount} 人。`,
    )
    navigate('/system/fixed-groups')
  }

  if (isLoading) {
    return (
      <PageContainer
        title={pageTitle}
        extra={
          <Space>
            <Button onClick={() => navigate('/system/fixed-groups')}>返回列表</Button>
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
            <Button onClick={() => navigate('/system/fixed-groups')}>返回列表</Button>
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
            message="固定群表单数据加载失败，请稍后重试。"
            action={
              <Button size="small" onClick={() => void refetch()}>
                重新加载
              </Button>
            }
          />
          <EmptyBlock title="无法加载固定群" description="请返回列表后重试，或重新进入编辑页。" />
        </div>
      </PageContainer>
    )
  }

  if (!data && isEditMode) {
    return (
      <PageContainer title={pageTitle}>
        <EmptyBlock title="未找到固定群" description="请返回列表重新选择需要编辑的群组。" />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title={pageTitle}
      extra={
        <Space>
          <Button onClick={() => navigate('/system/fixed-groups')}>返回列表</Button>
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
            message="固定群表单数据加载失败，请稍后重试。"
            action={
              <Button size="small" onClick={() => void refetch()}>
                重新加载
              </Button>
            }
          />
        ) : null}

        <Form<FixedGroupFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            businessSystem: '交易系统',
            groupType: '处置群',
            channelType: '企业微信',
            status: 'enabled',
          }}
          disabled={isLoading}
        >
          <div className="space-y-4">
            <Card title="基础信息">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="群组名称"
                    name="fixedGroupName"
                    rules={[{ required: true, message: '请输入群组名称' }]}
                  >
                    <Input placeholder="请输入固定群名称" maxLength={50} showCount />
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
                    label="群组类型"
                    name="groupType"
                    rules={[{ required: true, message: '请选择群组类型' }]}
                  >
                    <Select options={groupTypeOptions} placeholder="请选择群组类型" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="通道类型"
                    name="channelType"
                    rules={[{ required: true, message: '请选择通道类型' }]}
                  >
                    <Select options={channelTypeOptions} placeholder="请选择通道类型" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="负责人"
                    name="ownerName"
                    rules={[{ required: true, message: '请输入负责人' }]}
                  >
                    <Input placeholder="请输入负责人姓名" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="成员与说明">
              <Form.Item
                label="群成员"
                name="memberNames"
                rules={[{ required: true, message: '请输入群成员' }]}
                extra="多个成员请使用中文顿号“、”分隔。"
              >
                <Input.TextArea rows={4} placeholder="如：张敏、陈航、周源、刘晨" maxLength={200} showCount />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="状态" name="status" rules={[{ required: true, message: '请选择状态' }]}>
                    <Select options={systemStatusOptions} placeholder="请选择状态" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="群组说明"
                name="description"
                rules={[{ required: true, message: '请输入群组说明' }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="请输入群组适用场景、使用约定和维护说明。"
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

export default FixedGroupEditPage
