import { useEffect, useMemo } from 'react'
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  message,
} from 'antd'
import type { FormProps } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import useScenarioDetail from './hooks/useScenarioDetail'
import type { PublishStatus } from '../../types/common'
import type { ScenarioDetail } from '../../types/scenario'

interface ScenarioFormValues {
  scenarioName: string
  scenarioCode: string
  businessSystem: string
  faultObject: string
  scenarioType: string
  impactLevel: string
  owner: string
  ownerDepartment: string
  disposalDepartment: string
  status: PublishStatus
  summary: string
  disposalGoal: string
  applicableScope: string
  coreImpact: string
  tags: string[]
  collaborationTeams: string[]
  triggerConditions: string[]
  responsePrinciples: string[]
  keyRecoveryActions: string[]
  remarks?: string
}

const scenarioTypeOptions = [
  { label: '应用故障', value: '应用故障' },
  { label: '性能异常', value: '性能异常' },
  { label: '数据异常', value: '数据异常' },
  { label: '批处理异常', value: '批处理异常' },
  { label: '基础设施异常', value: '基础设施异常' },
]

const impactLevelOptions = [
  { label: 'P1', value: 'P1' },
  { label: 'P2', value: 'P2' },
  { label: 'P3', value: 'P3' },
  { label: 'P4', value: 'P4' },
]

const statusOptions: Array<{ label: string; value: PublishStatus }> = [
  { label: '草稿', value: 'draft' },
  { label: '待审批', value: 'pendingApproval' },
  { label: '已发布', value: 'published' },
  { label: '已废止', value: 'deprecated' },
]

function mapScenarioToFormValues(scenario: ScenarioDetail): ScenarioFormValues {
  return {
    scenarioName: scenario.scenarioName,
    scenarioCode: scenario.scenarioCode,
    businessSystem: scenario.businessSystem,
    faultObject: scenario.faultObject,
    scenarioType: scenario.scenarioType,
    impactLevel: scenario.impactLevel,
    owner: scenario.owner,
    ownerDepartment: scenario.ownerDepartment,
    disposalDepartment: scenario.disposalDepartment,
    status: scenario.status,
    summary: scenario.summary,
    disposalGoal: scenario.disposalGoal,
    applicableScope: scenario.applicableScope,
    coreImpact: scenario.coreImpact,
    tags: scenario.tags,
    collaborationTeams: scenario.collaborationTeams,
    triggerConditions: scenario.triggerConditions,
    responsePrinciples: scenario.responsePrinciples,
    keyRecoveryActions: scenario.keyRecoveryActions,
    remarks: scenario.remarks,
  }
}

const newScenarioInitialValues: ScenarioFormValues = {
  scenarioName: '',
  scenarioCode: '',
  businessSystem: '',
  faultObject: '',
  scenarioType: '应用故障',
  impactLevel: 'P2',
  owner: '',
  ownerDepartment: '',
  disposalDepartment: '',
  status: 'draft',
  summary: '',
  disposalGoal: '',
  applicableScope: '',
  coreImpact: '',
  tags: [],
  collaborationTeams: [],
  triggerConditions: [],
  responsePrinciples: [],
  keyRecoveryActions: [],
  remarks: '',
}

function ScenarioEditPage() {
  const [form] = Form.useForm<ScenarioFormValues>()
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const [messageApi, contextHolder] = message.useMessage()

  const isCreateMode = !id || id === 'new'

  const { data, isLoading, isError } = useScenarioDetail(id, { enabled: !isCreateMode })

  const initialValues = useMemo(
    () => (isCreateMode ? newScenarioInitialValues : data ? mapScenarioToFormValues(data) : undefined),
    [data, isCreateMode],
  )

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [form, initialValues])

  const handleSubmit: FormProps<ScenarioFormValues>['onFinish'] = async (values) => {
    const summary = values.summary.trim() || '未填写摘要'
    await messageApi.success(isCreateMode ? `已保存新场景草稿：${summary}` : `已更新场景信息：${summary}`)

    if (!isCreateMode && id) {
      navigate(`/emergency/scenarios/${id}`)
      return
    }

    navigate('/emergency/scenarios')
  }

  const hasLoadFailure = !isCreateMode && isError && !data
  const hasMissingScenario = !isCreateMode && !isLoading && !isError && !data

  const pageTitle = isCreateMode ? '新建场景' : '编辑场景'
  const pageExtra = (
    <Space>
      <Button onClick={() => navigate(isCreateMode ? '/emergency/scenarios' : `/emergency/scenarios/${id}`)}>
        {isCreateMode ? '返回列表' : '返回详情'}
      </Button>
      <Button type="primary" onClick={() => form.submit()} loading={isLoading}>
        保存场景
      </Button>
    </Space>
  )

  return (
    <PageContainer title={pageTitle} extra={pageExtra}>
      {contextHolder}
      {hasLoadFailure ? <Alert type="error" showIcon message="场景数据加载失败，请稍后重试。" className="mb-4" /> : null}
      {hasLoadFailure ? (
        <EmptyBlock title="场景数据加载失败" description="请稍后重试，或返回场景列表重新选择需要编辑的场景。" />
      ) : hasMissingScenario ? (
        <EmptyBlock title="未找到场景" description="请返回场景列表后重新选择需要编辑的场景。" />
      ) : (
        <div className="space-y-4">
          {!isCreateMode && data ? (
            <Card>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Typography.Title level={4} className="!mb-0">
                      {data.scenarioName}
                    </Typography.Title>
                    <StatusTag status={data.status} />
                    <Tag color="blue">当前版本 {data.currentVersion}</Tag>
                  </div>
                  <Typography.Text type="secondary">
                    场景编码 {data.scenarioCode}，最近更新时间 {data.updatedAt}
                  </Typography.Text>
                </div>
                <div className="grid min-w-[260px] grid-cols-2 gap-3 rounded-lg bg-slate-50 p-4">
                  <div>
                    <Typography.Text type="secondary">场景负责人</Typography.Text>
                    <div className="mt-1 font-medium text-slate-700">{data.owner}</div>
                  </div>
                  <div>
                    <Typography.Text type="secondary">归属部门</Typography.Text>
                    <div className="mt-1 font-medium text-slate-700">{data.ownerDepartment}</div>
                  </div>
                  <div>
                    <Typography.Text type="secondary">业务系统</Typography.Text>
                    <div className="mt-1 font-medium text-slate-700">{data.businessSystem}</div>
                  </div>
                  <div>
                    <Typography.Text type="secondary">故障对象</Typography.Text>
                    <div className="mt-1 font-medium text-slate-700">{data.faultObject}</div>
                  </div>
                </div>
              </div>
            </Card>
          ) : null}

          <Card loading={isLoading}>
            <Form<ScenarioFormValues>
              form={form}
              layout="vertical"
              initialValues={newScenarioInitialValues}
              onFinish={handleSubmit}
            >
              <Typography.Title level={5}>基础信息</Typography.Title>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="场景名称"
                    name="scenarioName"
                    rules={[{ required: true, message: '请输入场景名称' }]}
                  >
                    <Input placeholder="请输入场景名称" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="场景编码"
                    name="scenarioCode"
                    rules={[{ required: true, message: '请输入场景编码' }]}
                  >
                    <Input placeholder="示例：SCN-JY-001" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="业务系统"
                    name="businessSystem"
                    rules={[{ required: true, message: '请输入业务系统' }]}
                  >
                    <Input placeholder="请输入业务系统名称" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="故障对象"
                    name="faultObject"
                    rules={[{ required: true, message: '请输入故障对象' }]}
                  >
                    <Input placeholder="请输入故障对象" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="场景类型" name="scenarioType" rules={[{ required: true, message: '请选择场景类型' }]}>
                    <Select options={scenarioTypeOptions} placeholder="请选择场景类型" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="影响等级" name="impactLevel" rules={[{ required: true, message: '请选择影响等级' }]}>
                    <Select options={impactLevelOptions} placeholder="请选择影响等级" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="状态" name="status" rules={[{ required: true, message: '请选择状态' }]}>
                    <Select options={statusOptions} placeholder="请选择状态" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="场景负责人" name="owner" rules={[{ required: true, message: '请输入场景负责人' }]}>
                    <Input placeholder="请输入场景负责人" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="归属部门"
                    name="ownerDepartment"
                    rules={[{ required: true, message: '请输入归属部门' }]}
                  >
                    <Input placeholder="请输入归属部门" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="处置部门"
                    name="disposalDepartment"
                    rules={[{ required: true, message: '请输入处置部门' }]}
                  >
                    <Input placeholder="请输入处置部门" />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />
              <Typography.Title level={5}>处置说明</Typography.Title>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="场景摘要" name="summary" rules={[{ required: true, message: '请输入场景摘要' }]}>
                    <Input.TextArea rows={3} placeholder="概述该场景的故障背景和适用条件" showCount maxLength={200} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="处置目标"
                    name="disposalGoal"
                    rules={[{ required: true, message: '请输入处置目标' }]}
                  >
                    <Input.TextArea rows={4} placeholder="说明预期的止损、恢复或升级目标" showCount maxLength={200} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="适用范围"
                    name="applicableScope"
                    rules={[{ required: true, message: '请输入适用范围' }]}
                  >
                    <Input.TextArea rows={4} placeholder="描述该场景适用的系统、链路或对象" showCount maxLength={200} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="核心影响"
                    name="coreImpact"
                    rules={[{ required: true, message: '请输入核心影响' }]}
                  >
                    <Input.TextArea rows={3} placeholder="说明对业务、系统或客户侧的核心影响" showCount maxLength={200} />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />
              <Typography.Title level={5}>协同与动作</Typography.Title>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="标签" name="tags">
                    <Select mode="tags" placeholder="请输入标签后回车" tokenSeparators={[',']} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="协同团队" name="collaborationTeams">
                    <Select mode="tags" placeholder="请输入协同团队后回车" tokenSeparators={[',']} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="触发条件"
                    name="triggerConditions"
                    extra="建议填写监控阈值、异常现象或升级条件。"
                  >
                    <Select mode="tags" placeholder="请输入触发条件后回车" tokenSeparators={[',']} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="处置原则" name="responsePrinciples">
                    <Select mode="tags" placeholder="请输入处置原则后回车" tokenSeparators={[',']} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="关键恢复动作" name="keyRecoveryActions">
                    <Select mode="tags" placeholder="请输入关键恢复动作后回车" tokenSeparators={[',']} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="备注" name="remarks">
                    <Input.TextArea rows={4} placeholder="补充说明审批、维护周期或引用限制" showCount maxLength={200} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      )}
    </PageContainer>
  )
}

export default ScenarioEditPage
