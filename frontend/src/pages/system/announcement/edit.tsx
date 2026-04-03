import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Col, Form, Input, Row, Select, Space, Switch, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../../components/common/EmptyBlock'
import PageContainer from '../../../components/common/PageContainer'
import { announcementStatusOptions, getAnnouncementFormPreset } from '../../../services/system'
import type { AnnouncementFormValues } from '../../../types/system'

const audienceOptions = [
  { label: '全员', value: '全员' },
  { label: '交易系统相关团队', value: '交易系统相关团队' },
  { label: '支付系统相关团队', value: '支付系统相关团队' },
  { label: '清算系统', value: '清算系统' },
]

function AnnouncementEditPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditMode = Boolean(id)
  const [form] = Form.useForm<AnnouncementFormValues>()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['announcement-form-preset', id],
    queryFn: () => getAnnouncementFormPreset(id),
  })

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data, form])

  const pageTitle = isEditMode ? '公告编辑' : '新建公告'
  const pageDescription = useMemo(() => {
    return isEditMode
      ? '更新公告标题、对象和发布时间窗，保持系统公告展示内容最新。'
      : '创建新的平台公告，用于发布值班安排、演练提醒或重要通知。'
  }, [isEditMode])

  const handleSubmit = async (values: AnnouncementFormValues) => {
    void message.success(
      isEditMode
        ? `公告已保存（模拟），当前发布对象为 ${values.audience}。`
        : `公告已创建（模拟），当前发布对象为 ${values.audience}。`,
    )
    navigate('/system/announcements')
  }

  if (isLoading) {
    return (
      <PageContainer
        title={pageTitle}
        extra={
          <Space>
            <Button onClick={() => navigate('/system/announcements')}>返回列表</Button>
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
            <Button onClick={() => navigate('/system/announcements')}>返回列表</Button>
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
            message="公告表单数据加载失败，请稍后重试。"
            action={
              <Button size="small" onClick={() => void refetch()}>
                重新加载
              </Button>
            }
          />
          <EmptyBlock title="无法加载公告" description="请返回列表后重试，或重新进入编辑页。" />
        </div>
      </PageContainer>
    )
  }

  if (!data && isEditMode) {
    return (
      <PageContainer title={pageTitle}>
        <EmptyBlock title="未找到公告" description="请返回列表重新选择需要编辑的公告。" />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title={pageTitle}
      extra={
        <Space>
          <Button onClick={() => navigate('/system/announcements')}>返回列表</Button>
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
            message="公告表单数据加载失败，请稍后重试。"
            action={
              <Button size="small" onClick={() => void refetch()}>
                重新加载
              </Button>
            }
          />
        ) : null}

        <Form<AnnouncementFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            audience: '全员',
            publishStart: '2026-04-03 09:00',
            publishEnd: '2026-04-03 18:00',
            topPinned: false,
            status: 'draft',
          }}
          disabled={isLoading}
        >
          <div className="space-y-4">
            <Card title="基础信息">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="公告标题" name="title" rules={[{ required: true, message: '请输入公告标题' }]}>
                    <Input placeholder="请输入公告标题" maxLength={60} showCount />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="发布对象" name="audience" rules={[{ required: true, message: '请选择发布对象' }]}>
                    <Select options={audienceOptions} placeholder="请选择发布对象" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="开始时间"
                    name="publishStart"
                    rules={[{ required: true, message: '请输入开始时间' }]}
                  >
                    <Input placeholder="格式示例：2026-04-03 09:00" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="结束时间"
                    name="publishEnd"
                    rules={[{ required: true, message: '请输入结束时间' }]}
                  >
                    <Input placeholder="格式示例：2026-04-03 18:00" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="状态" name="status" rules={[{ required: true, message: '请选择状态' }]}>
                    <Select options={announcementStatusOptions} placeholder="请选择状态" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="置顶展示" name="topPinned" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="公告内容">
              <Form.Item label="摘要" name="summary" rules={[{ required: true, message: '请输入公告摘要' }]}>
                <Input.TextArea rows={3} placeholder="请输入公告摘要" maxLength={120} showCount />
              </Form.Item>
              <Form.Item label="正文内容" name="content" rules={[{ required: true, message: '请输入公告正文' }]}>
                <Input.TextArea rows={6} placeholder="请输入公告正文内容" maxLength={500} showCount />
              </Form.Item>
            </Card>
          </div>
        </Form>
      </div>
    </PageContainer>
  )
}

export default AnnouncementEditPage
