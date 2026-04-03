import { Card, Col, Row, Statistic } from 'antd'
import PageContainer from '../../components/common/PageContainer'

function HomePage() {
  return (
    <PageContainer title="首页总览">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic title="待办任务" value={18} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="应急场景" value={12} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="应急预案" value={9} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="事件总数" value={4} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default HomePage
