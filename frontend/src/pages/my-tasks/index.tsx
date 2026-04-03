import TaskListPageView from './components/TaskListPageView'
import useTaskListPage from './hooks/useTaskListPage'

function MyTasksPage() {
  const data = useTaskListPage('active')

  return <TaskListPageView title="我的任务" mode="active" data={data} />
}

export default MyTasksPage
