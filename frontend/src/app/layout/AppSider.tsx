import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import {
  AppstoreOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  FundProjectionScreenOutlined,
  SettingOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { useAppStore } from '../../store/app'

const menuItems: MenuProps['items'] = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: <Link to="/">首页</Link>,
  },
  {
    key: 'tasks',
    icon: <ClockCircleOutlined />,
    label: '我的待办',
    children: [
      { key: '/tasks', label: <Link to="/tasks">我的任务</Link> },
      { key: '/tasks/history', label: <Link to="/tasks/history">历史任务</Link> },
    ],
  },
  {
    key: 'emergency-management',
    icon: <AppstoreOutlined />,
    label: '应急管理',
    children: [
      { key: '/emergency/scenarios', label: <Link to="/emergency/scenarios">场景管理</Link> },
      { key: '/emergency/plans', label: <Link to="/emergency/plans">预案管理</Link> },
      { key: '/emergency/processes', label: <Link to="/emergency/processes">流程管理</Link> },
    ],
  },
  {
    key: 'drill-center',
    icon: <FundProjectionScreenOutlined />,
    label: '演练中心',
    children: [{ key: '/drills/plans', label: <Link to="/drills/plans">应急演练计划</Link> }],
  },
  {
    key: 'event-center',
    icon: <WarningOutlined />,
    label: '应急中心',
    children: [{ key: '/events', label: <Link to="/events">事件管理</Link> }],
  },
  {
    key: 'review',
    icon: <FileDoneOutlined />,
    label: '复盘改进',
    children: [{ key: '/review/issues', label: <Link to="/review/issues">复盘问题</Link> }],
  },
  {
    key: 'system',
    icon: <SettingOutlined />,
    label: '系统管理',
    children: [
      { key: '/system/organization', label: <Link to="/system/organization">应急组织</Link> },
      { key: '/system/reporting-strategies', label: <Link to="/system/reporting-strategies">上报策略</Link> },
      { key: '/system/push-strategies', label: <Link to="/system/push-strategies">推送策略</Link> },
      { key: '/system/fixed-groups', label: <Link to="/system/fixed-groups">固定群管理</Link> },
      { key: '/system/announcements', label: <Link to="/system/announcements">公告管理</Link> },
      { key: '/system/logs', label: <Link to="/system/logs">操作日志</Link> },
    ],
  },
]

function AppSider() {
  const location = useLocation()
  const collapsed = useAppStore((state) => state.collapsed)
  const flattenedItems = menuItems?.flatMap((item) => {
    if (!item || item.type === 'divider') {
      return []
    }

    return 'children' in item && Array.isArray(item.children) ? item.children : [item]
  })
  const selectedKey = flattenedItems?.find(
    (item) => typeof item?.key === 'string' && location.pathname.startsWith(String(item.key)),
  )?.key

  return (
    <Layout.Sider collapsible collapsed={collapsed} trigger={null} width={240} theme="light" className="border-r border-slate-200">
      <div className="flex h-16 items-center px-4 text-lg font-semibold text-slate-800">EMP</div>
      <Menu mode="inline" selectedKeys={selectedKey ? [String(selectedKey)] : [location.pathname]} items={menuItems} className="border-r-0" />
    </Layout.Sider>
  )
}

export default AppSider
