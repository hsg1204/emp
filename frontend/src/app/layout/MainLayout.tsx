import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import AppBreadcrumb from './AppBreadcrumb'
import AppHeader from './AppHeader'
import AppSider from './AppSider'
import ContentContainer from './ContentContainer'

function MainLayout() {
  return (
    <Layout className="min-h-screen">
      <AppSider />
      <Layout>
        <AppHeader />
        <ContentContainer>
          <div className="mb-4">
            <AppBreadcrumb />
          </div>
          <Outlet />
        </ContentContainer>
      </Layout>
    </Layout>
  )
}

export default MainLayout
