import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import HomePage from '../../pages/home'
import MyTasksPage from '../../pages/my-tasks'
import HistoryTasksPage from '../../pages/my-tasks/history'
import ScenarioListPage from '../../pages/scenario'
import ScenarioEditPage from '../../pages/scenario/edit'
import ScenarioDetailPage from '../../pages/scenario/detail'
import PlanListPage from '../../pages/plan'
import PlanEditPage from '../../pages/plan/edit'
import PlanDetailPage from '../../pages/plan/detail'
import ProcessListPage from '../../pages/process'
import ProcessEditPage from '../../pages/process/edit'
import ProcessDetailPage from '../../pages/process/detail'
import DrillPlanListPage from '../../pages/drill-plan'
import DrillPlanEditPage from '../../pages/drill-plan/edit'
import DrillPlanDetailPage from '../../pages/drill-plan/detail'
import EventListPage from '../../pages/event'
import EventEditPage from '../../pages/event/edit'
import EventDetailPage from '../../pages/event/detail'
import ReviewIssueListPage from '../../pages/review-issue'
import ReviewIssueEditPage from '../../pages/review-issue/edit'
import ReviewIssueDetailPage from '../../pages/review-issue/detail'
import OrganizationPage from '../../pages/system/organization'
import ReportingStrategyPage from '../../pages/system/reporting-strategy'
import ReportingStrategyEditPage from '../../pages/system/reporting-strategy/edit'
import PushStrategyPage from '../../pages/system/push-strategy'
import PushStrategyEditPage from '../../pages/system/push-strategy/edit'
import FixedGroupPage from '../../pages/system/fixed-group'
import FixedGroupEditPage from '../../pages/system/fixed-group/edit'
import AnnouncementPage from '../../pages/system/announcement'
import AnnouncementEditPage from '../../pages/system/announcement/edit'
import OperationLogPage from '../../pages/system/operation-log'

function AppRouter() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'tasks', element: <MyTasksPage /> },
        { path: 'tasks/history', element: <HistoryTasksPage /> },
        { path: 'emergency/scenarios', element: <ScenarioListPage /> },
        { path: 'emergency/scenarios/new', element: <ScenarioEditPage /> },
        { path: 'emergency/scenarios/:id', element: <ScenarioDetailPage /> },
        { path: 'emergency/scenarios/:id/edit', element: <ScenarioEditPage /> },
        { path: 'emergency/plans', element: <PlanListPage /> },
        { path: 'emergency/plans/new', element: <PlanEditPage /> },
        { path: 'emergency/plans/:id', element: <PlanDetailPage /> },
        { path: 'emergency/plans/:id/edit', element: <PlanEditPage /> },
        { path: 'emergency/processes', element: <ProcessListPage /> },
        { path: 'emergency/processes/new', element: <ProcessEditPage /> },
        { path: 'emergency/processes/:id', element: <ProcessDetailPage /> },
        { path: 'emergency/processes/:id/edit', element: <ProcessEditPage /> },
        { path: 'drills/plans', element: <DrillPlanListPage /> },
        { path: 'drills/plans/new', element: <DrillPlanEditPage /> },
        { path: 'drills/plans/:id', element: <DrillPlanDetailPage /> },
        { path: 'drills/plans/:id/edit', element: <DrillPlanEditPage /> },
        { path: 'events', element: <EventListPage /> },
        { path: 'events/new', element: <EventEditPage /> },
        { path: 'events/:id', element: <EventDetailPage /> },
        { path: 'events/:id/edit', element: <EventEditPage /> },
        { path: 'review/issues', element: <ReviewIssueListPage /> },
        { path: 'review/issues/new', element: <ReviewIssueEditPage /> },
        { path: 'review/issues/:id', element: <ReviewIssueDetailPage /> },
        { path: 'review/issues/:id/edit', element: <ReviewIssueEditPage /> },
        { path: 'system/organization', element: <OrganizationPage /> },
        { path: 'system/reporting-strategies', element: <ReportingStrategyPage /> },
        { path: 'system/reporting-strategies/new', element: <ReportingStrategyEditPage /> },
        { path: 'system/reporting-strategies/:id/edit', element: <ReportingStrategyEditPage /> },
        { path: 'system/push-strategies', element: <PushStrategyPage /> },
        { path: 'system/push-strategies/new', element: <PushStrategyEditPage /> },
        { path: 'system/push-strategies/:id/edit', element: <PushStrategyEditPage /> },
        { path: 'system/fixed-groups', element: <FixedGroupPage /> },
        { path: 'system/fixed-groups/new', element: <FixedGroupEditPage /> },
        { path: 'system/fixed-groups/:id/edit', element: <FixedGroupEditPage /> },
        { path: 'system/announcements', element: <AnnouncementPage /> },
        { path: 'system/announcements/new', element: <AnnouncementEditPage /> },
        { path: 'system/announcements/:id/edit', element: <AnnouncementEditPage /> },
        { path: 'system/logs', element: <OperationLogPage /> },
        { path: '*', element: <Navigate to="/" replace /> },
      ],
    },
  ])
}

export default AppRouter
