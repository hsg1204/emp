import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import QueryProvider from './app/providers/QueryProvider'
import AppRouter from './app/router'

function App() {
  return (
    <ConfigProvider>
      <QueryProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </QueryProvider>
    </ConfigProvider>
  )
}

export default App
