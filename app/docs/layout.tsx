import type { ReactNode } from 'react'
import { DocsSidebar } from '@/components/docs-sidebar'

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 lg:shrink-0">
          <div className="sticky top-8">
            <DocsSidebar />
          </div>
        </aside>
        <main className="flex-1 max-w-none">
          {children}
        </main>
      </div>
    </div>
  )
}