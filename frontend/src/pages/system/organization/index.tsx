import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Col, Form, Input, List, Row, Select, Space, Statistic, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '../../../components/common/PageContainer'
import EmptyBlock from '../../../components/common/EmptyBlock'
import StatusTag from '../../../components/common/StatusTag'
import { getOrganizationPageData, systemBusinessSystemOptions } from '../../../services/system'
import type { EmergencyTeam, OrganizationMember } from '../../../types/system'
import { systemStatusColorMap, systemStatusLabelMap } from '../constants'

function OrganizationPage() {
  const [keyword, setKeyword] = useState('')
  const [businessSystem, setBusinessSystem] = useState<string | undefined>()

  const queryParams = useMemo(() => ({ keyword, businessSystem }), [keyword, businessSystem])
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['system-organization-page', queryParams],
    queryFn: () => getOrganizationPageData(queryParams),
  })

  const teamColumns: ColumnsType<EmergencyTeam> = [
    {
      title: '组织名称',
      dataIndex: 'teamName',
      key: 'teamName',
    },
    {
      title: '所属系统',
      dataIndex: 'businessSystem',
      key: 'businessSystem',
      width: 120,
    },
    {
      title: '响应级别',
      dataIndex: 'responseLevel',
      key: 'responseLevel',
      width: 100,
    },
    {
      title: '负责人',
      dataIndex: 'leaderName',
      key: 'leaderName',
      width: 100,
    },
    {
      title: '值班电话',
      dataIndex: 'dutyPhone',
      key: 'dutyPhone',
      width: 140,
    },
    {
      title: '成员数',
      dataIndex: 'memberCount',
      key: 'memberCount',
      width: 90,
    },
    {
      title: '值守范围',
      dataIndex: 'dutyScope',
      key: 'dutyScope',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value: EmergencyTeam['status']) => (
        <StatusTag status={value} colorMap={systemStatusColorMap} labelMap={systemStatusLabelMap} />
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
    },
  ]

  const members = data?.keyMembers ?? []
  const teams = data?.teams ?? []

  return (
    <PageContainer title="应急组织">
      <div className="space-y-4">
        <Card>
          <div className="space-y-2">
            <Typography.Title level={5} className="mb-0">
              页面说明
            </Typography.Title>
            <Typography.Paragraph className="mb-0 text-slate-500">
              维护应急组织、值班负责人和关键成员联系方式，便于演练与事件处理时快速拉起协同团队。
            </Typography.Paragraph>
          </div>
        </Card>

        <Card>
          <Form layout="inline">
            <Form.Item label="关键字">
              <Input
                placeholder="请输入组织名称/负责人/值守范围"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                allowClear
                className="w-[320px]"
              />
            </Form.Item>
            <Form.Item label="所属系统">
              <Select
                placeholder="请选择所属系统"
                value={businessSystem}
                onChange={(value) => setBusinessSystem(value)}
                allowClear
                className="w-[180px]"
                options={systemBusinessSystemOptions}
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  setKeyword('')
                  setBusinessSystem(undefined)
                }}
              >
                重置筛选
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {isError ? (
          <Alert
            type="error"
            showIcon
            message="应急组织数据加载失败，请稍后重试。"
            action={
              <Button size="small" onClick={() => void refetch()}>
                重新加载
              </Button>
            }
          />
        ) : null}

        {!isError ? (
          <>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Card loading={isLoading}>
                  <Statistic title="组织数量" value={data?.summary.totalTeams ?? 0} />
                </Card>
              </Col>
              <Col span={6}>
                <Card loading={isLoading}>
                  <Statistic title="成员总数" value={data?.summary.totalMembers ?? 0} />
                </Card>
              </Col>
              <Col span={6}>
                <Card loading={isLoading}>
                  <Statistic title="当前值班成员" value={data?.summary.onDutyMembers ?? 0} />
                </Card>
              </Col>
              <Col span={6}>
                <Card loading={isLoading}>
                  <Statistic title="覆盖系统" value={data?.summary.linkedSystems ?? 0} />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={16}>
                <Card
                  title="组织清单"
                  extra={<Typography.Text className="text-sm text-slate-500">共 {teams.length} 个组织</Typography.Text>}
                >
                  {!isLoading && teams.length === 0 ? (
                    <EmptyBlock title="暂无应急组织数据" description="可以调整筛选条件后重试。" />
                  ) : (
                    <Table<EmergencyTeam>
                      rowKey="teamId"
                      loading={isLoading}
                      columns={teamColumns}
                      dataSource={teams}
                      pagination={{ pageSize: 10 }}
                      scroll={{ x: 1080 }}
                    />
                  )}
                </Card>
              </Col>
              <Col span={8}>
                <Card title="关键成员联络卡" className="h-full">
                  {!isLoading && members.length === 0 ? (
                    <EmptyBlock title="暂无关键成员" description="当前筛选条件下没有匹配到组织成员。" />
                  ) : (
                    <List<OrganizationMember>
                      loading={isLoading}
                      dataSource={members}
                      renderItem={(member) => (
                        <List.Item>
                          <div className="w-full space-y-2">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-base font-medium text-slate-800">{member.memberName}</div>
                                <div className="text-sm text-slate-500">{member.roleName}</div>
                              </div>
                              <StatusTag
                                status={member.onDuty ? 'enabled' : 'disabled'}
                                colorMap={systemStatusColorMap}
                                labelMap={{ enabled: '值班中', disabled: '离岗' }}
                              />
                            </div>
                            <Space direction="vertical" size={2} className="w-full text-sm text-slate-500">
                              <span>所属组织：{member.teamName}</span>
                              <span>所属部门：{member.department}</span>
                              <span>联系号码：{member.contactPhone}</span>
                              <span>通知方式：{member.notificationChannel}</span>
                              <span>最近更新：{member.updatedAt}</span>
                            </Space>
                          </div>
                        </List.Item>
                      )}
                    />
                  )}
                </Card>
              </Col>
            </Row>
          </>
        ) : null}
      </div>
    </PageContainer>
  )
}

export default OrganizationPage
