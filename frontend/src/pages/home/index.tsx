import { useQuery } from '@tanstack/react-query'
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Empty,
  List,
  Progress,
  Row,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import PageContainer from '../../components/common/PageContainer'
import { getHomeDashboard } from '../../services/task'
import type {
  DashboardMetric,
  DashboardNotice,
  DashboardOverviewSection,
  DashboardQuickLink,
  TaskRecord,
} from '../../types/task'

type NoticeStatusConfig = {
  badge: 'processing' | 'warning' | 'success'
  label: string
}

const noticeStatusMap: Record<DashboardNotice['level'], NoticeStatusConfig> = {
  processing: { badge: 'processing', label: '进行中' },
  warning: { badge: 'warning', label: '提醒' },
  success: { badge: 'success', label: '已更新' },
}

const taskStatusLabelMap: Record<TaskRecord['status'], string> = {
  todo: '待处理',
  inProgress: '处理中',
  completed: '已完成',
  closed: '已关闭',
}

function MetricCard({ metric }: { metric: DashboardMetric }) {
  return (
    <Card className="h-full">
      <Statistic title={metric.title} value={metric.value} suffix={metric.suffix} />
      <Typography.Text className="mt-3 block text-sm text-slate-500">{metric.description}</Typography.Text>
    </Card>
  )
}

function NoticeCard({ notice }: { notice: DashboardNotice }) {
  const status = noticeStatusMap[notice.level]

  return (
    <div className="rounded-lg border border-slate-200 px-4 py-3 transition-colors hover:border-slate-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Space size={8}>
            <Badge status={status.badge} />
            <Typography.Text strong>{notice.title}</Typography.Text>
          </Space>
          <Typography.Paragraph className="!mb-0 !mt-2 text-sm text-slate-500">
            {notice.description}
          </Typography.Paragraph>
        </div>
        <div className="shrink-0 text-right">
          <Tag color="default">{status.label}</Tag>
          <div className="mt-2 text-xs text-slate-400">{notice.publishedAt}</div>
        </div>
      </div>
    </div>
  )
}

function OverviewCard({ section }: { section: DashboardOverviewSection }) {
  return (
    <Card className="h-full">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <Typography.Title level={5} className="!mb-1">
            {section.title}
          </Typography.Title>
          <Typography.Text className="text-sm text-slate-500">{section.description}</Typography.Text>
        </div>
        <div className="text-2xl font-semibold text-slate-800">{section.count}</div>
      </div>
      <Progress percent={section.progress} strokeColor="#1677ff" />
    </Card>
  )
}

function QuickLinkList({ links }: { links: DashboardQuickLink[] }) {
  return (
    <List
      dataSource={links}
      locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无快捷入口" /> }}
      renderItem={(item) => (
        <List.Item>
          <Link
            to={item.path}
            className={
              'block w-full rounded-lg border border-slate-200 px-4 py-3 transition-colors hover:border-slate-300'
            }
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <Typography.Text strong>{item.title}</Typography.Text>
                <Typography.Paragraph className="!mb-0 !mt-1 text-sm text-slate-500">
                  {item.description}
                </Typography.Paragraph>
              </div>
              <Typography.Text className="text-sm text-slate-400">进入</Typography.Text>
            </div>
          </Link>
        </List.Item>
      )}
    />
  )
}

function HomePage() {
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['home-dashboard'],
    queryFn: getHomeDashboard,
  })

  const metricPlaceholders: Array<DashboardMetric | null> = Array.from({ length: 4 }, () => null)
  const overviewPlaceholders: Array<DashboardOverviewSection | null> = Array.from({ length: 3 }, () => null)
  const metrics: Array<DashboardMetric | null> = isLoading ? metricPlaceholders : (data?.metrics ?? [])
  const overviewSections: Array<DashboardOverviewSection | null> = isLoading
    ? overviewPlaceholders
    : (data?.overviewSections ?? [])

  const taskColumns: ColumnsType<TaskRecord> = [
    {
      title: '任务标题',
      dataIndex: 'title',
      key: 'title',
      render: (value: string, record) => <Link to={record.detailPath}>{value}</Link>,
    },
    {
      title: '来源模块',
      dataIndex: 'sourceModule',
      key: 'sourceModule',
      width: 140,
    },
    {
      title: '当前节点',
      dataIndex: 'currentNode',
      key: 'currentNode',
      width: 160,
    },
    {
      title: '处理人',
      dataIndex: 'assignee',
      key: 'assignee',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value: TaskRecord['status']) => (
        <Tag color={value === 'inProgress' ? 'processing' : 'default'}>{taskStatusLabelMap[value]}</Tag>
      ),
    },
    {
      title: '截止时间',
      dataIndex: 'dueAt',
      key: 'dueAt',
      width: 160,
    },
  ]

  return (
    <PageContainer
      title="首页总览"
      extra={
        <Space>
          <Button onClick={() => navigate('/tasks/history')}>查看历史任务</Button>
          <Button type="primary" onClick={() => navigate('/tasks')}>
            进入我的任务
          </Button>
        </Space>
      }
    >
      <div className="space-y-4">
        <Card className="overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white">
          <div className="grid gap-4 lg:grid-cols-[2fr,1fr] lg:items-center">
            <div className="space-y-3">
              <Tag color="blue" className="!m-0 w-fit border-0 bg-white/15 text-white">
                Phase 1 Dashboard
              </Tag>
              <Typography.Title level={3} className="!mb-0 !text-white">
                聚焦当前待办、公告提醒与阶段性推进情况
              </Typography.Title>
              <Typography.Paragraph className="!mb-0 max-w-3xl text-sm text-slate-200">
                当前首页聚焦第一阶段骨架能力，用于帮助值班与管理角色快速查看待办压力、重点提醒、演练与复盘推进情况，所有数据均采用前端静态模拟。
              </Typography.Paragraph>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <Typography.Text className="text-xs uppercase tracking-wide text-slate-200">本日工作提示</Typography.Text>
              <div className="mt-2 text-3xl font-semibold text-white">
                {isLoading ? '--' : data?.metrics[1]?.value ?? 0}
              </div>
              <Typography.Paragraph className="!mb-0 !mt-2 text-sm text-slate-200">
                24 小时内临期任务需要优先处理，建议先查看我的任务页面中的高优先级项目。
              </Typography.Paragraph>
            </div>
          </div>
        </Card>

        {isError ? (
          <Alert
            type="error"
            showIcon
            message="首页概览加载失败，请稍后重试。"
            action={
              <Button size="small" onClick={() => void refetch()}>
                重新加载
              </Button>
            }
          />
        ) : null}

        <Row gutter={[16, 16]}>
          {metrics.map((metric, index) => (
            <Col key={metric?.key ?? index} xs={24} sm={12} xl={6}>
              {metric ? (
                <MetricCard metric={metric} />
              ) : (
                <Card>
                  <Skeleton active paragraph={{ rows: 2 }} />
                </Card>
              )}
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} xl={14}>
            <Card
              title="公告与提醒"
              extra={
                <Button type="link" className="!px-0" onClick={() => navigate('/system/announcements')}>
                  查看公告管理
                </Button>
              }
            >
              <div className="space-y-3">
                {isLoading
                  ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} active paragraph={{ rows: 2 }} />)
                  : data?.notices.map((notice) => <NoticeCard key={notice.id} notice={notice} />)}
              </div>
            </Card>
          </Col>
          <Col xs={24} xl={10}>
            <Card title="快捷入口">
              {isLoading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
              ) : (
                <QuickLinkList links={data?.quickLinks ?? []} />
              )}
            </Card>
          </Col>
        </Row>

        <Card title="阶段概览">
          <Row gutter={[16, 16]}>
            {overviewSections.map((section, index) => (
              <Col key={section?.key ?? index} xs={24} md={8}>
                {section ? (
                  <OverviewCard section={section} />
                ) : (
                  <Card>
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                )}
              </Col>
            ))}
          </Row>
        </Card>

        <Card
          title="近期待办"
          extra={
            <Button type="link" className="!px-0" onClick={() => navigate('/tasks')}>
              查看全部
            </Button>
          }
        >
          <Table<TaskRecord>
            rowKey="taskId"
            loading={isLoading}
            columns={taskColumns}
            dataSource={data?.recentTasks ?? []}
            pagination={false}
            locale={{ emptyText: '暂无近期待办任务' }}
            scroll={{ x: 960 }}
          />
        </Card>
      </div>
    </PageContainer>
  )
}

export default HomePage
