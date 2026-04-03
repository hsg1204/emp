import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'

const titleMap: Record<string, string> = {
  '/': '首页',
  '/tasks': '我的任务',
  '/tasks/history': '历史任务',
  '/emergency/scenarios': '场景管理',
  '/emergency/plans': '预案管理',
  '/emergency/processes': '流程管理',
  '/drills/plans': '应急演练计划',
  '/events': '事件管理',
  '/review/issues': '复盘问题',
  '/system/organization': '应急组织',
  '/system/reporting-strategies': '上报策略',
  '/system/push-strategies': '推送策略',
  '/system/fixed-groups': '固定群管理',
  '/system/announcements': '公告管理',
  '/system/logs': '操作日志',
}

function getBreadcrumbTitle(pathname: string) {
  if (titleMap[pathname]) {
    return titleMap[pathname]
  }

  if (pathname === '/system/reporting-strategies/new') {
    return '新建上报策略'
  }

  if (pathname.startsWith('/system/reporting-strategies/') && pathname.endsWith('/edit')) {
    return '上报策略编辑'
  }

  if (pathname === '/system/push-strategies/new') {
    return '新建推送策略'
  }

  if (pathname.startsWith('/system/push-strategies/') && pathname.endsWith('/edit')) {
    return '推送策略编辑'
  }

  if (pathname === '/system/fixed-groups/new') {
    return '新建固定群'
  }

  if (pathname.startsWith('/system/fixed-groups/') && pathname.endsWith('/edit')) {
    return '固定群编辑'
  }

  if (pathname === '/system/announcements/new') {
    return '新建公告'
  }

  if (pathname.startsWith('/system/announcements/') && pathname.endsWith('/edit')) {
    return '公告编辑'
  }

  return '页面'
}

function AppBreadcrumb() {
  const location = useLocation()
  const title = getBreadcrumbTitle(location.pathname)

  return <Breadcrumb items={[{ title: '应急管理平台' }, { title }]} />
}

export default AppBreadcrumb
