import { Button, Layout, Space, Typography } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useAppStore } from '../../store/app'

function AppHeader() {
  const collapsed = useAppStore((state) => state.collapsed)
  const setCollapsed = useAppStore((state) => state.setCollapsed)

  return (
    <Layout.Header className="flex items-center justify-between border-b border-slate-200 bg-white px-4">
      <Space>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Typography.Text className="text-base font-medium text-slate-700">应急管理平台</Typography.Text>
      </Space>
      <Typography.Text className="text-sm text-slate-500">Phase 1 Scaffold</Typography.Text>
    </Layout.Header>
  )
}

export default AppHeader
