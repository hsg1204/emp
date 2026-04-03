import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Col, Descriptions, Empty, List, Row, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate, useParams } from 'react-router-dom'
import PageContainer from '../../components/common/PageContainer'
import StatusTag from '../../components/common/StatusTag'
import { getDrillPlanDetail } from '../../services/drillPlan'
import type { DrillExecutionRecord, DrillOperationLog } from '../../types/drill-plan'

function DrillPlanDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['drill-plan-detail', id],
    queryFn: () => getDrillPlanDetail(id ?? ''),
    enabled: Boolean(id),
  })

  const executionColumns: ColumnsType<DrillExecutionRecord> = [
    {
      title: '阶段',
      dataIndex: 'stageName',
      key: 'stageName',
      width: 180,
    },
    {
      title: '负责人',
      dataIndex: 'owner',
      key: 'owner',
      width: 140,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 180,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 180,
      render: (value?: string) => value || '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (value: DrillExecutionRecord['status']) => <StatusTag status={value} />,
    },
    {
      title: '记录摘要',
      dataIndex: 'summary',
      key: 'summary',
    },
  ]

  const operationLogColumns: ColumnsType<DrillOperationLog> = [
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 140,
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
      width: 140,
    },
    {
      title: '操作时间',
      dataIndex: 'operatedAt',
      key: 'operatedAt',
      width: 180,
    },
    {
      title: '详情',
      dataIndex: 'detail',
      key: 'detail',
    },
  ]

  const progressStats = useMemo(() => {
    const records = data?.executionRecords ?? []

    return {
      total: records.length,
      completed: records.filter((item) => item.status === 'completed').length,
      inProgress: records.filter((item) => item.status === 'inProgress').length,
      pending: records.filter((item) => item.status === 'pending').length,
    }
  }, [data])

  return (
    <PageContainer
      title="应急演练计划详情"
      extra={
        <Space>
          <Button onClick={() => navigate('/drills/plans')}>返回列表</Button>
          {id ? <Button type="primary" onClick={() => navigate(`/drills/plans/${id}/edit`)}>编辑计划</Button> : null}
        </Space>
      }
    >
      <div className="space-y-4">
        {isError ? <Alert type="error" showIcon message="演练计划详情加载失败，请稍后重试。" /> : null}

        {!isLoading && !isError && !data ? (
          <Card>
            <Empty description="未找到对应的演练计划" />
          </Card>
        ) : null}

        {isLoading || data ? (
          <Row gutter={[16, 16]}>
            <Col xs={24} xl={16}>
              <Card loading={isLoading}>
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <Typography.Title level={4} className="!mb-2">
                      {data?.drillPlanName || '演练计划详情'}
                    </Typography.Title>
                    <Space wrap>
                      <StatusTag status={data?.status ?? 'draft'} />
                      <StatusTag status={data?.reportStatus ?? 'notStarted'} />
                      {data?.drillType ? <Tag color="blue">{data.drillType}</Tag> : null}
                      {data?.businessSystem ? <Tag>{data.businessSystem}</Tag> : null}
                    </Space>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-right">
                    <div>
                      <Typography.Text type="secondary">执行记录</Typography.Text>
                      <div className="text-lg font-semibold text-slate-800">{progressStats.total}</div>
                    </div>
                    <div>
                      <Typography.Text type="secondary">已完成</Typography.Text>
                      <div className="text-lg font-semibold text-emerald-600">{progressStats.completed}</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="计划信息" loading={isLoading} className="mt-4">
                <Descriptions bordered column={2} size="middle">
                  <Descriptions.Item label="业务系统">{data?.businessSystem || '-'}</Descriptions.Item>
                  <Descriptions.Item label="演练指挥人">{data?.commander || '-'}</Descriptions.Item>
                  <Descriptions.Item label="计划时间">{data?.scheduledTime || '-'}</Descriptions.Item>
                  <Descriptions.Item label="创建人">{data?.createdBy || '-'}</Descriptions.Item>
                  <Descriptions.Item label="关联场景">{data?.relatedScenarioName || '-'}</Descriptions.Item>
                  <Descriptions.Item label="关联预案">{data?.relatedPlanName || '-'}</Descriptions.Item>
                  <Descriptions.Item label="关联流程">{data?.relatedProcessName || '-'}</Descriptions.Item>
                  <Descriptions.Item label="最后更新时间">{data?.updatedAt || '-'}</Descriptions.Item>
                  <Descriptions.Item label="参演部门" span={2}>
                    {data?.participantDepartments?.join('、') || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="演练范围" span={2}>
                    {data?.drillScope || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="备注说明" span={2}>
                    {data?.remarks || '-'}
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              <Card title="演练目标与观察点" loading={isLoading} className="mt-4">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Typography.Title level={5}>演练目标</Typography.Title>
                    <List
                      size="small"
                      bordered
                      dataSource={data?.drillTargets ?? []}
                      locale={{ emptyText: '暂无演练目标' }}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Typography.Title level={5}>观察点</Typography.Title>
                    <List
                      size="small"
                      bordered
                      dataSource={data?.observationPoints ?? []}
                      locale={{ emptyText: '暂无观察点' }}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                  </Col>
                </Row>
              </Card>

              <Card title="执行记录" loading={isLoading} className="mt-4">
                <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Card size="small">
                    <Typography.Text type="secondary">总阶段数</Typography.Text>
                    <div className="mt-1 text-lg font-semibold text-slate-800">{progressStats.total}</div>
                  </Card>
                  <Card size="small">
                    <Typography.Text type="secondary">进行中</Typography.Text>
                    <div className="mt-1 text-lg font-semibold text-blue-600">{progressStats.inProgress}</div>
                  </Card>
                  <Card size="small">
                    <Typography.Text type="secondary">待开始</Typography.Text>
                    <div className="mt-1 text-lg font-semibold text-slate-800">{progressStats.pending}</div>
                  </Card>
                  <Card size="small">
                    <Typography.Text type="secondary">已完成</Typography.Text>
                    <div className="mt-1 text-lg font-semibold text-emerald-600">{progressStats.completed}</div>
                  </Card>
                </div>
                <Table<DrillExecutionRecord>
                  rowKey="recordId"
                  columns={executionColumns}
                  dataSource={data?.executionRecords ?? []}
                  pagination={false}
                  locale={{ emptyText: '当前暂无执行记录' }}
                  scroll={{ x: 960 }}
                />
              </Card>
            </Col>

            <Col xs={24} xl={8}>
              <Card title="演练报告" loading={isLoading}>
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="报告状态">
                    <StatusTag status={data?.report.status ?? 'notStarted'} />
                  </Descriptions.Item>
                  <Descriptions.Item label="报告负责人">{data?.report.reportOwner || '-'}</Descriptions.Item>
                  <Descriptions.Item label="最后更新">{data?.report.lastUpdatedAt || '-'}</Descriptions.Item>
                  <Descriptions.Item label="报告摘要">{data?.report.summary || '-'}</Descriptions.Item>
                </Descriptions>

                <div className="mt-4">
                  <Typography.Title level={5}>后续动作</Typography.Title>
                  <List
                    size="small"
                    bordered
                    dataSource={data?.report.nextActions ?? []}
                    locale={{ emptyText: '暂无后续动作' }}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                  />
                </div>

                <div className="mt-4">
                  <Typography.Title level={5}>附件</Typography.Title>
                  <List
                    size="small"
                    bordered
                    dataSource={data?.report.attachments ?? []}
                    locale={{ emptyText: '暂无附件' }}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                  />
                </div>
              </Card>

              <Card title="操作日志" loading={isLoading} className="mt-4">
                <Table<DrillOperationLog>
                  rowKey="logId"
                  columns={operationLogColumns}
                  dataSource={data?.operationLogs ?? []}
                  pagination={false}
                  locale={{ emptyText: '暂无操作日志' }}
                  scroll={{ x: 640 }}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        ) : null}
      </div>
    </PageContainer>
  )
}

export default DrillPlanDetailPage
