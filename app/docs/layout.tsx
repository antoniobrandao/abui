import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { source } from '@/app/source'
import { Logo } from '@/registry/abui/branding/logo'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <div className="flex items-center gap-0">
            <Logo />
            <span className="font-bold uppercase">Abui</span>
          </div>
        ),
        url: '/',
        transparentMode: 'top',
      }}
      sidebar={{
        defaultOpenLevel: 999,
      }}
    >
      {children}
    </DocsLayout>
  )
}