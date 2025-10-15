import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Button as RegistryButton } from '@/registry/abui/ui/button'
import { ComponentPreview } from '@/components/component-preview'
import { ChevronUp } from 'lucide-react'

const buttonCode = `import { Button } from "@/registry/abui/ui/button"

export function ButtonDemo() {
  return <Button>Button</Button>
}`

// Static content for docs pages
const docsContent = {
  '': {
    title: 'Introduction',
    description: 'Welcome to Abui - A custom UI component registry built with shadcn',
    content: (
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          Abui is a custom UI component registry built on top of{' '}
          <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer">
            shadcn/ui
          </a>
          . It provides a collection of beautifully designed, accessible, and customizable React components that you can copy and paste into your projects.
        </p>
        
        <h2>Features</h2>
        <ul>
          <li>🎨 <strong>Beautifully Designed</strong> — All components are thoughtfully designed and follow modern design principles</li>
          <li>🚀 <strong>Copy & Paste</strong> — No complicated setup. Just copy the code and customize it to your needs</li>
          <li>♿ <strong>Accessible</strong> — Built with accessibility in mind using Radix UI primitives</li>
          <li>🎯 <strong>TypeScript Ready</strong> — Full TypeScript support out of the box</li>
          <li>🌙 <strong>Dark Mode</strong> — All components support dark mode</li>
          <li>📦 <strong>Registry System</strong> — Easy installation via the shadcn CLI</li>
        </ul>

        <h2>Getting Started</h2>
        <p>To use components from the Abui registry, first configure your <code>components.json</code>:</p>
        
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`{
  "registries": {
    "@abui": "https://abui.antoniobrandao.com/r/{name}.json"
  }
}`}</code>
        </pre>

        <p>Then install components using:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>npx shadcn@latest add @abui/button</code>
        </pre>
      </div>
    ),
  },
  'installation': {
    title: 'Installation',
    description: 'How to install and configure Abui components in your project',
    content: (
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>Learn how to get started with Abui components in your project.</p>
        
        <h2>Requirements</h2>
        <ul>
          <li>React 18+</li>
          <li>Tailwind CSS</li>
          <li>shadcn/ui CLI</li>
        </ul>

        <h2>Setup</h2>
        <p>First, make sure you have shadcn/ui set up in your project. Then configure the Abui registry:</p>
        
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`npx shadcn@latest init`}</code>
        </pre>
      </div>
    ),
  },
  'components/button': {
    title: 'Button',
    description: 'Displays a button or a component that looks like a button.',
    content: (
      <div className="space-y-8">
        <div>
          <p className="text-lg text-muted-foreground">
            Displays a button or a component that looks like a button.
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-amber-600 dark:text-amber-400 mt-0.5">ℹ️</div>
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                <strong>Updated:</strong> We have updated the button component to add new sizes: <code>icon-sm</code> and <code>icon-lg</code>.
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                See the <Link href="#changelog" className="underline">changelog</Link> for more details. Follow the instructions to update your project.
              </p>
            </div>
          </div>
        </div>

        <ComponentPreview code={buttonCode}>
          <div className="flex items-center gap-2">
            <RegistryButton>Button</RegistryButton>
            <RegistryButton size="icon">
              <ChevronUp className="h-4 w-4" />
            </RegistryButton>
          </div>
        </ComponentPreview>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>npx shadcn@latest add @abui/button</code>
          </pre>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Usage</h2>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`import { Button } from "@/components/ui/button"`}</code>
          </pre>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Examples</h2>
          
          <h3 className="text-lg font-medium mb-2">Default</h3>
          <ComponentPreview code={`<Button>Button</Button>`}>
            <RegistryButton>Button</RegistryButton>
          </ComponentPreview>

          <h3 className="text-lg font-medium mb-2 mt-6">Secondary</h3>
          <ComponentPreview code={`<Button variant="secondary">Secondary</Button>`}>
            <RegistryButton variant="secondary">Secondary</RegistryButton>
          </ComponentPreview>

          <h3 className="text-lg font-medium mb-2 mt-6">Destructive</h3>
          <ComponentPreview code={`<Button variant="destructive">Destructive</Button>`}>
            <RegistryButton variant="destructive">Destructive</RegistryButton>
          </ComponentPreview>

          <h3 className="text-lg font-medium mb-2 mt-6">Outline</h3>
          <ComponentPreview code={`<Button variant="outline">Outline</Button>`}>
            <RegistryButton variant="outline">Outline</RegistryButton>
          </ComponentPreview>

          <h3 className="text-lg font-medium mb-2 mt-6">Ghost</h3>
          <ComponentPreview code={`<Button variant="ghost">Ghost</Button>`}>
            <RegistryButton variant="ghost">Ghost</RegistryButton>
          </ComponentPreview>

          <h3 className="text-lg font-medium mb-2 mt-6">Link</h3>
          <ComponentPreview code={`<Button variant="link">Link</Button>`}>
            <RegistryButton variant="link">Link</RegistryButton>
          </ComponentPreview>

          <h3 className="text-lg font-medium mb-2 mt-6">Icon</h3>
          <ComponentPreview code={`<Button variant="outline" size="icon">
  <ChevronUp className="h-4 w-4" />
</Button>`}>
            <RegistryButton variant="outline" size="icon">
              <ChevronUp className="h-4 w-4" />
            </RegistryButton>
          </ComponentPreview>

          <h3 className="text-lg font-medium mb-2 mt-6">With Icon</h3>
          <ComponentPreview code={`<Button>
  <ChevronUp className="mr-2 h-4 w-4" />
  Button
</Button>`}>
            <RegistryButton>
              <ChevronUp className="mr-2 h-4 w-4" />
              Button
            </RegistryButton>
          </ComponentPreview>
        </div>
      </div>
    ),
  },
  'components': {
    title: 'Components',
    description: 'Browse our collection of UI components',
    content: (
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>Basic UI building blocks that you can use to create your applications.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose mt-8">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Button</h3>
            <p className="text-sm text-muted-foreground mb-4">Clickable button component with multiple variants</p>
            <Button size="sm" asChild>
              <Link href="/docs/components/button">Preview</Link>
            </Button>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Card</h3>
            <p className="text-sm text-muted-foreground mb-4">Container component for grouping related content</p>
            <Button size="sm">Preview</Button>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Input</h3>
            <p className="text-sm text-muted-foreground mb-4">Text input component with various states</p>
            <Button size="sm">Preview</Button>
          </Card>
        </div>
      </div>
    ),
  },
  'blocks': {
    title: 'Blocks',
    description: 'Pre-built sections and layouts for your projects',
    content: (
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>Pre-built sections and layouts ready to use in your projects.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-8">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Hero Section</h3>
            <p className="text-sm text-muted-foreground mb-4">Landing page hero section with title, description, and CTA</p>
            <Button size="sm">Preview</Button>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Login Form</h3>
            <p className="text-sm text-muted-foreground mb-4">Complete login form with validation</p>
            <Button size="sm">Preview</Button>
          </Card>
        </div>
      </div>
    ),
  },
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug = [] } = await params
  const slugKey = slug.join('/') || ''
  const page = docsContent[slugKey as keyof typeof docsContent]
  
  if (!page) notFound()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{page.title}</h1>
        <p className="text-lg text-muted-foreground">{page.description}</p>
      </div>
      {page.content}
    </div>
  )
}

export async function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['installation'] },
    { slug: ['components'] },
    { slug: ['components', 'button'] },
    { slug: ['blocks'] },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const { slug = [] } = await params
  const slugKey = slug.join('/') || ''
  const page = docsContent[slugKey as keyof typeof docsContent]
  
  if (!page) notFound()

  return {
    title: page.title,
    description: page.description,
  }
}