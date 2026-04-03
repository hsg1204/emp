import { Alert, Button, Card, Form, Input, Progress, Select, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import EmptyBlock from '../../../components/common/EmptyBlock'
import PageContainer from '../../../components/common/PageContainer'
import type { TaskListMetric, TaskListPageData, TaskListPageMode } from '../hooks/useTaskListPage'
import type { TaskPriority, TaskRecord, TaskStatus } from '../../../types/task'

interface TaskListPageViewProps {
  title: string
  mode: TaskListPageMode
  data: TaskListPageData
}

const statusLabelMap: Record<TaskStatus, string> = {
  todo: '待处理',
  inProgress: '处理中',
  completed: '已完成',
  closed: '已关闭',
}

const statusColorMap: Record<TaskStatus, string> = {
  todo: 'default',
  inProgress: 'processing',
  completed: 'success',
  closed: 'default',
}

const priorityLabelMap: Record<TaskPriority, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

const priorityColorMap: Record<TaskPriority, string> = {
  high: 'error',
  medium: 'warning',
  low: 'default',
}

function TaskMetricCard({ metric }: { metric: TaskListMetric }) {
  return (
    <Card>
      <div className="space-y-2">
        <Typography.Text className="text-sm text-slate-500">{metric.title}</Typography.Text>
        <div className="text-3xl font-semibold text-slate-800">{metric.value}</div>
        <Typography.Text className="text-sm text-slate-500">{metric.description}</Typography.Text>
      </div>
    </Card>
  )
}

function TaskListPageView({ title, mode, data }: TaskListPageViewProps) {
  const navigate = useNavigate()

  const columns: ColumnsType<TaskRecord> = [
    {
      title: '任务标题',
      dataIndex: 'title',
      key: 'title',
      render: (value: string, record) => <Link to={record.detailPath}>{value}</Link>,
    },
    {
      title: '任务类型',
      dataIndex: 'taskType',
      key: 'taskType',
      width: 120,
    },
    {
      title: '来源模块',
      dataIndex: 'sourceModule',
      key: 'sourceModule',
      width: 130,
    },
    {
      title: '所属系统',
      dataIndex: 'businessSystem',
      key: 'businessSystem',
      width: 120,
    },
    {
      title: '当前节点',
      dataIndex: 'currentNode',
      key: 'currentNode',
      width: 140,
    },
    {
      title: '处理人',
      dataIndex: 'assignee',
      key: 'assignee',
      width: 100,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (value: TaskPriority) => <Tag color={priorityColorMap[value]}>{priorityLabelMap[value]}</Tag>,
    },
    {
      title: mode === 'history' ? '结果' : '状态',
      dataIndex: mode === 'history' ? 'result' : 'status',
      key: mode === 'history' ? 'result' : 'status',
      width: 120,
      render: (_, record) =>
        mode === 'history' ? (
          <Typography.Text>{record.result ?? '-'}</Typography.Text>
        ) : (
          <Tag color={statusColorMap[record.status]}>{statusLabelMap[record.status]}</Tag>
        ),
    },
    {
      title: mode === 'history' ? '完成时间' : '截止时间',
      dataIndex: mode === 'history' ? 'completedAt' : 'dueAt',
      key: mode === 'history' ? 'completedAt' : 'dueAt',
      width: 160,
      render: (value: string | null) => value ?? '-',
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Link to={record.detailPath}>查看详情</Link>
          <Link to={record.detailPath}>{mode === 'history' ? '查看记录' : '立即处理'}</Link>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title={title}
      extra={
        <Space>
          <Button onClick={() => navigate(mode === 'active' ? '/tasks/history' : '/tasks')}>
            {mode === 'active' ? '查看历史任务' : '返回我的任务'}
          </Button>
        </Space>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {data.metrics.map((metric) => (
            <TaskMetricCard key={metric.key} metric={metric} />
          ))}
        </div>

        <Card>
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Typography.Title level={5} className="!mb-1">
                {mode === 'active' ? '任务筛选' : '历史记录筛选'}
              </Typography.Title>
              <Typography.Text className="text-sm text-slate-500">
                {mode === 'active'
                  ? '按任务标题、来源模块、状态和处理人快速定位待办事项。'
                  : '按处理结果和来源模块快速查看近期已办结任务。'}
              </Typography.Text>
            </div>
            <div className="min-w-[220px] rounded-lg bg-slate-50 px-4 py-3">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>当前筛选结果</span>
                <span>{data.items.length} 条</span>
              </div>
              <Progress
                percent={Math.min(data.items.length * 10, 100)}
                showInfo={false}
                strokeColor="#1677ff"
                className="mb-0 mt-2"
              />
            </div>
          </div>

          <Form layout="inline" className="gap-y-3">
            <Form.Item label="关键字">
              <Input
                placeholder="请输入任务标题/来源模块/所属系统"
                value={data.filters.keyword}
                onChange={(event) => data.setKeyword(event.target.value)}
                allowClear
                className="w-[280px]"
              />
            </Form.Item>
            <Form.Item label="状态">
              <Select
                placeholder="全部状态"
                value={data.filters.status}
                onChange={(value) => data.setStatus(value)}
                allowClear
                className="w-[160px]"
                options={data.statusOptions}
              />
            </Form.Item>
            <Form.Item label="处理人">
              <Select
                placeholder="全部处理人"
                value={data.filters.assignee}
                onChange={(value) => data.setAssignee(value)}
                allowClear
                className="w-[160px]"
                options={data.assigneeOptions.map((value) => ({ label: value, value }))}
              />
            </Form.Item>
            <Form.Item label="来源模块">
              <Select
                placeholder="全部模块"
                value={data.filters.sourceModule}
                onChange={(value) => data.setSourceModule(value)}
                allowClear
                className="w-[180px]"
                options={data.sourceModuleOptions.map((value) => ({ label: value, value }))}
              />
            </Form.Item>
            <Form.Item>
              <Button onClick={data.resetFilters}>重置</Button>
            </Form.Item>
          </Form>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <Typography.Title level={5} className="!mb-1">
                {mode === 'active' ? '任务列表' : '历史任务列表'}
              </Typography.Title>
              <Typography.Text className="text-sm text-slate-500">
                {mode === 'active'
                  ? '展示当前仍需要处理的审批、协同与跟进任务。'
                  : '展示近期已完成或已关闭的历史任务记录。'}
              </Typography.Text>
            </div>
            <Typography.Text className="text-sm text-slate-500">共 {data.items.length} 条记录</Typography.Text>
          </div>

          {data.isError ? (
            <Alert
              type="error"
              showIcon
              message={mode === 'active' ? '我的任务加载失败，请稍后重试。' : '历史任务加载失败，请稍后重试。'}
              action={
                <Button size="small" onClick={data.retry}>
                  重新加载
                </Button>
              }
            />
          ) : null}

          {data.isError ? null : !data.isLoading && data.items.length === 0 ? (
            <EmptyBlock
              title={mode === 'active' ? '暂无符合条件的任务' : '暂无符合条件的历史任务'}
              description={
                mode === 'active'
                  ? '可以调整筛选条件，或稍后再查看新的待办事项。'
                  : '可以调整筛选条件，查看其他时间段的历史处理记录。'
              }
            />
          ) : (
            <Table<TaskRecord>
              rowKey="taskId"
              loading={data.isLoading}
              columns={columns}
              dataSource={data.items}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1280 }}
            />
          )}
        </Card>
      </div>
    </PageContainer>
  )
}

export default TaskListPageView
