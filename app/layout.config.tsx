import { Logo } from '@/registry/abui/branding/logo'
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center gap-2">
        <Logo />
        <span className="font-bold text-lg uppercase">Abui</span>
      </div>
    ),
    transparentMode: 'top',
  },
  links: [
    {
      text: 'Documentation',
      url: '/docs',
    },
    {
      text: 'Components',
      url: '/docs/components',
    },
    {
      text: 'Blocks',
      url: '/docs/blocks',
    },
  ],
}