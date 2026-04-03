import TaskListPageView from './components/TaskListPageView'
import useTaskListPage from './hooks/useTaskListPage'

function HistoryTasksPage() {
  const data = useTaskListPage('history')

  return <TaskListPageView title="历史任务" mode="history" data={data} />
}

export default HistoryTasksPage
