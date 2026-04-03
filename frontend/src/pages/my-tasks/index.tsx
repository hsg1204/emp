import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'

function MyTasksPage() {
  return (
    <PageContainer title="我的任务">
      <EmptyBlock title="我的任务列表" description="后续接入审批待办、处理入口和任务明细。" />
    </PageContainer>
  )
}

export default MyTasksPage
