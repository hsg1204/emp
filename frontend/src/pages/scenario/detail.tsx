import { useMemo } from 'react'
import { Alert, Button, Card, Descriptions, List, Space, Table, Tag, Tabs, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import useScenarioDetail from './hooks/useScenarioDetail'
import type {
  ScenarioDetail,
  ScenarioOperationLog,
  ScenarioRelatedProcess,
  ScenarioUsageReference,
  ScenarioVersionRecord,
} from '../../types/scenario'

const relatedProcessColumns: ColumnsType<ScenarioRelatedProcess> = [
  {
    title: '流程名称',
    dataIndex: 'processName',
    key: 'processName',
  },
  {
    title: '流程类型',
    dataIndex: 'processType',
    key: 'processType',
    width: 140,
  },
  {
    title: '负责部门',
    dataIndex: 'ownerDepartment',
    key: 'ownerDepartment',
    width: 160,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (value: ScenarioRelatedProcess['status']) => <StatusTag status={value} />,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 180,
  },
]

const versionColumns: ColumnsType<ScenarioVersionRecord> = [
  {
    title: '版本号',
    dataIndex: 'version',
    key: 'version',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (value: ScenarioVersionRecord['status']) => <StatusTag status={value} />,
  },
  {
    title: '变更摘要',
    dataIndex: 'changeSummary',
    key: 'changeSummary',
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
    width: 120,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 180,
  },
]

const operationLogColumns: ColumnsType<ScenarioOperationLog> = [
  {
    title: '操作时间',
    dataIndex: 'occurredAt',
    key: 'occurredAt',
    width: 180,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
    width: 120,
  },
  {
    title: '详情',
    dataIndex: 'detail',
    key: 'detail',
  },
]

function renderTagList(items: string[]) {
  if (items.length === 0) {
    return <Typography.Text type="secondary">暂无</Typography.Text>
  }

  return (
    <Space wrap>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </Space>
  )
}

function ScenarioOverview({ scenario }: { scenario: ScenarioDetail }) {
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Typography.Title level={4} className="!mb-0">
                {scenario.scenarioName}
              </Typography.Title>
              <StatusTag status={scenario.status} />
              <Tag color="blue">版本 {scenario.currentVersion}</Tag>
              <Tag>{scenario.impactLevel}</Tag>
            </div>
            <Typography.Paragraph className="!mb-0 text-slate-600">
              {scenario.summary}
            </Typography.Paragraph>
          </div>
          <div className="grid min-w-[280px] grid-cols-2 gap-3 rounded-lg bg-slate-50 p-4">
            <div>
              <Typography.Text type="secondary">场景编码</Typography.Text>
              <div className="mt-1 font-medium text-slate-700">{scenario.scenarioCode}</div>
            </div>
            <div>
              <Typography.Text type="secondary">场景负责人</Typography.Text>
              <div className="mt-1 font-medium text-slate-700">{scenario.owner}</div>
            </div>
            <div>
              <Typography.Text type="secondary">归属部门</Typography.Text>
              <div className="mt-1 font-medium text-slate-700">{scenario.ownerDepartment}</div>
            </div>
            <div>
              <Typography.Text type="secondary">处置部门</Typography.Text>
              <div className="mt-1 font-medium text-slate-700">{scenario.disposalDepartment}</div>
            </div>
            <div>
              <Typography.Text type="secondary">创建人</Typography.Text>
              <div className="mt-1 font-medium text-slate-700">{scenario.createdBy}</div>
            </div>
            <div>
              <Typography.Text type="secondary">最近更新</Typography.Text>
              <div className="mt-1 font-medium text-slate-700">{scenario.updatedAt}</div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="基础信息">
        <Descriptions column={2} bordered size="middle">
          <Descriptions.Item label="业务系统">{scenario.businessSystem}</Descriptions.Item>
          <Descriptions.Item label="故障对象">{scenario.faultObject}</Descriptions.Item>
          <Descriptions.Item label="场景类型">{scenario.scenarioType}</Descriptions.Item>
          <Descriptions.Item label="影响等级">{scenario.impactLevel}</Descriptions.Item>
          <Descriptions.Item label="适用范围" span={2}>
            {scenario.applicableScope}
          </Descriptions.Item>
          <Descriptions.Item label="处置目标" span={2}>
            {scenario.disposalGoal}
          </Descriptions.Item>
          <Descriptions.Item label="核心影响" span={2}>
            {scenario.coreImpact}
          </Descriptions.Item>
          <Descriptions.Item label="标签" span={2}>
            {renderTagList(scenario.tags)}
          </Descriptions.Item>
          <Descriptions.Item label="协同团队" span={2}>
            {renderTagList(scenario.collaborationTeams)}
          </Descriptions.Item>
          <Descriptions.Item label="备注" span={2}>
            {scenario.remarks || '暂无备注'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="触发条件与处置动作">
        <Descriptions column={1} bordered size="middle">
          <Descriptions.Item label="触发条件">
            <List
              dataSource={scenario.triggerConditions}
              renderItem={(item) => <List.Item>{item}</List.Item>}
              locale={{ emptyText: '暂无触发条件' }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="处置原则">
            <List
              dataSource={scenario.responsePrinciples}
              renderItem={(item) => <List.Item>{item}</List.Item>}
              locale={{ emptyText: '暂无处置原则' }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="关键恢复动作">
            <List
              dataSource={scenario.keyRecoveryActions}
              renderItem={(item) => <List.Item>{item}</List.Item>}
              locale={{ emptyText: '暂无关键恢复动作' }}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

function ScenarioReferences({ scenario }: { scenario: ScenarioDetail }) {
  return (
    <div className="space-y-4">
      <Card title="关联流程">
        <Table<ScenarioRelatedProcess>
          rowKey="processId"
          columns={relatedProcessColumns}
          dataSource={scenario.relatedProcesses}
          pagination={false}
          locale={{ emptyText: '暂无关联流程' }}
          scroll={{ x: 760 }}
        />
      </Card>

      <Card title="引用记录">
        <List<ScenarioUsageReference>
          dataSource={scenario.usageReferences}
          locale={{ emptyText: '暂无引用记录' }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <div className="flex flex-wrap items-center gap-2">
                    <span>{item.referenceName}</span>
                    <Tag color="geekblue">{item.referenceType}</Tag>
                  </div>
                }
                description={
                  <div className="space-y-1">
                    <div>{item.description}</div>
                    <Typography.Text type="secondary">最近更新 {item.updatedAt}</Typography.Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

function ScenarioVersionHistory({ scenario }: { scenario: ScenarioDetail }) {
  return (
    <Card title="版本历史">
      <Table<ScenarioVersionRecord>
        rowKey="version"
        columns={versionColumns}
        dataSource={scenario.versionHistory}
        pagination={false}
        locale={{ emptyText: '暂无版本历史' }}
        scroll={{ x: 760 }}
      />
    </Card>
  )
}

function ScenarioOperationLogSection({ scenario }: { scenario: ScenarioDetail }) {
  return (
    <Card title="操作日志">
      <Table<ScenarioOperationLog>
        rowKey="logId"
        columns={operationLogColumns}
        dataSource={scenario.operationLogs}
        pagination={false}
        locale={{ emptyText: '暂无操作日志' }}
        scroll={{ x: 760 }}
      />
    </Card>
  )
}

function ScenarioDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, isError } = useScenarioDetail(id)

  const hasLoadFailure = isError && !data
  const hasMissingScenario = !isLoading && !isError && !data

  const extra = useMemo(
    () => (
      <Space>
        <Button onClick={() => navigate('/emergency/scenarios')}>返回列表</Button>
        {id && data ? (
          <Button type="primary" onClick={() => navigate(`/emergency/scenarios/${id}/edit`)}>
            编辑场景
          </Button>
        ) : null}
      </Space>
    ),
    [data, id, navigate],
  )

  return (
    <PageContainer title="场景详情" extra={extra}>
      {hasLoadFailure ? <Alert type="error" showIcon message="场景详情加载失败，请稍后重试。" className="mb-4" /> : null}
      {hasLoadFailure ? (
        <EmptyBlock title="场景详情加载失败" description="请稍后重试，或返回场景列表重新进入详情页。" />
      ) : hasMissingScenario ? (
        <EmptyBlock title="未找到场景详情" description="请返回场景列表后重新进入详情页。" />
      ) : (
        <Card loading={isLoading}>
          {data ? (
            <Tabs
              items={[
                {
                  key: 'basic',
                  label: '基础信息',
                  children: <ScenarioOverview scenario={data} />,
                },
                {
                  key: 'references',
                  label: '关联流程与引用',
                  children: <ScenarioReferences scenario={data} />,
                },
                {
                  key: 'versions',
                  label: '版本历史',
                  children: <ScenarioVersionHistory scenario={data} />,
                },
                {
                  key: 'logs',
                  label: '操作日志',
                  children: <ScenarioOperationLogSection scenario={data} />,
                },
              ]}
            />
          ) : null}
        </Card>
      )}
    </PageContainer>
  )
}

export default ScenarioDetailPage
