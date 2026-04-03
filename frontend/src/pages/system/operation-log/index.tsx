import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, Card, Form, Input, Select, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import PageContainer from '../../../components/common/PageContainer'
import EmptyBlock from '../../../components/common/EmptyBlock'
import StatusTag from '../../../components/common/StatusTag'
import { getOperationLogPage, operationLogResultOptions } from '../../../services/system'
import type { OperationLog } from '../../../types/system'
import { operationLogResultColorMap, operationLogResultLabelMap } from '../constants'

const moduleOptions = [
  { label: '公告管理', value: '公告管理' },
  { label: '固定群管理', value: '固定群管理' },
  { label: '推送策略', value: '推送策略' },
  { label: '上报策略', value: '上报策略' },
]

function OperationLogPage() {
  const [keyword, setKeyword] = useState('')
  const [moduleName, setModuleName] = useState<string | undefined>()
  const [result, setResult] = useState<OperationLog['result'] | undefined>()

  const queryParams = useMemo(() => ({ keyword, moduleName, result }), [keyword, moduleName, result])
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['operation-log-page', queryParams],
    queryFn: () => getOperationLogPage(queryParams),
  })

  const items = data?.items ?? []

  const columns: ColumnsType<OperationLog> = [
    {
      title: '操作时间',
      dataIndex: 'operatedAt',
      key: 'operatedAt',
      width: 180,
    },
    {
      title: '操作人',
      dataIndex: 'operatorName',
      key: 'operatorName',
      width: 120,
    },
    {
      title: '所属部门',
      dataIndex: 'operatorDepartment',
      key: 'operatorDepartment',
      width: 160,
    },
    {
      title: '功能模块',
      dataIndex: 'moduleName',
      key: 'moduleName',
      width: 140,
    },
    {
      title: '操作行为',
      dataIndex: 'actionName',
      key: 'actionName',
      width: 120,
    },
    {
      title: '操作对象',
      dataIndex: 'targetName',
      key: 'targetName',
    },
    {
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      width: 100,
      render: (value: OperationLog['result']) => (
        <StatusTag status={value} colorMap={operationLogResultColorMap} labelMap={operationLogResultLabelMap} />
      ),
    },
    {
      title: '客户端 IP',
      dataIndex: 'clientIp',
      key: 'clientIp',
      width: 140,
    },
  ]

  return (
    <PageContainer title="操作日志">
      <div className="space-y-4">
        <Card>
          <div className="space-y-2">
            <Typography.Title level={5} className="mb-0">
              页面说明
            </Typography.Title>
            <Typography.Paragraph className="mb-0 text-slate-500">
              查看系统管理相关操作轨迹，支持按关键字、模块和执行结果快速筛选近期日志记录。
            </Typography.Paragraph>
          </div>
        </Card>

        <Card>
          <Form layout="inline">
            <Form.Item label="关键字">
              <Input
                placeholder="请输入操作人/操作对象/操作行为"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                allowClear
                className="w-[320px]"
              />
            </Form.Item>
            <Form.Item label="功能模块">
              <Select
                placeholder="请选择功能模块"
                value={moduleName}
                onChange={(value) => setModuleName(value)}
                allowClear
                className="w-[180px]"
                options={moduleOptions}
              />
            </Form.Item>
            <Form.Item label="执行结果">
              <Select
                placeholder="请选择执行结果"
                value={result}
                onChange={(value) => setResult(value)}
                allowClear
                className="w-[160px]"
                options={operationLogResultOptions}
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  setKeyword('')
                  setModuleName(undefined)
                  setResult(undefined)
                }}
              >
                重置
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <Typography.Text className="text-sm text-slate-500">共 {items.length} 条操作日志</Typography.Text>
          </div>
          {isError ? (
            <Alert
              type="error"
              showIcon
              message="操作日志加载失败，请稍后重试。"
              action={
                <Button size="small" onClick={() => void refetch()}>
                  重新加载
                </Button>
              }
            />
          ) : null}
          {!isError ? (
            !isLoading && items.length === 0 ? (
              <EmptyBlock title="暂无操作日志" description="可以调整筛选条件后重试。" />
            ) : (
              <Table<OperationLog>
                rowKey="logId"
                loading={isLoading}
                columns={columns}
                dataSource={items}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1200 }}
              />
            )
          ) : null}
        </Card>
      </div>
    </PageContainer>
  )
}

export default OperationLogPage
