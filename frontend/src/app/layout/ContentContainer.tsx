import type { PropsWithChildren } from 'react'

function ContentContainer({ children }: PropsWithChildren) {
  return <div className="min-h-[calc(100vh-64px)] bg-slate-100 p-6">{children}</div>
}

export default ContentContainer
