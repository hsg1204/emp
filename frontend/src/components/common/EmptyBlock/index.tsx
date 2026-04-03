import { FileTextOutlined } from '@ant-design/icons'
import { Empty } from 'antd'

interface EmptyBlockProps {
  title: string
  description?: string
}

function EmptyBlock({ title, description }: EmptyBlockProps) {
  return (
    <div className="flex min-h-[240px] items-center justify-center rounded-lg bg-white p-6">
      <Empty
        image={<FileTextOutlined className="text-4xl text-slate-300" />}
        description={
          <div className="text-center">
            <div className="text-base font-medium text-slate-700">{title}</div>
            {description ? <div className="mt-2 text-sm text-slate-500">{description}</div> : null}
          </div>
        }
      />
    </div>
  )
}

export default EmptyBlock
