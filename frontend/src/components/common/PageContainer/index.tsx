import type { PropsWithChildren, ReactNode } from 'react'

interface PageContainerProps extends PropsWithChildren {
  title: string
  extra?: ReactNode
}

function PageContainer({ title, extra, children }: PageContainerProps) {
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow-sm">
        <div>
          <h1 className="m-0 text-xl font-semibold text-slate-800">{title}</h1>
        </div>
        {extra}
      </header>
      <div>{children}</div>
    </section>
  )
}

export default PageContainer
