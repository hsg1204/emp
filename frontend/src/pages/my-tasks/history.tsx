import EmptyBlock from '../../components/common/EmptyBlock'
import PageContainer from '../../components/common/PageContainer'

function HistoryTasksPage() {
  return (
    <PageContainer title="历史任务">
      <EmptyBlock title="历史任务列表" description="后续接入已审批、已处理、已关闭任务记录。" />
    </PageContainer>
  )
}

export default HistoryTasksPage
