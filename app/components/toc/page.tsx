"use client"

import { type TOCItemType, TOCProvider, PageTOC, PageTOCItems } from "@/registry/abui/ui/toc"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import CodeBlock from "@/components/custom/CodeBlock"
import { CardDescription } from "@/components/ui/card"

const componentName = "toc"

const tocItems: TOCItemType[] = [
  { title: "Features", url: "#features", depth: 2 },
  { title: "Installation", url: "#installation", depth: 2 },
  { title: "Usage", url: "#usage", depth: 2 },
  { title: "Basic Setup", url: "#basic-setup", depth: 3 },
  { title: "With Clerk Variant", url: "#with-clerk-variant", depth: 3 },
  { title: "Variants", url: "#variants", depth: 2 },
  { title: "Default", url: "#variant-default", depth: 3 },
  { title: "Clerk", url: "#variant-clerk", depth: 3 },
  { title: "Component Props", url: "#component-props", depth: 2 },
  { title: "TOCProvider", url: "#tocprovider-props", depth: 3 },
  { title: "PageTOCItems", url: "#pagetocitems-props", depth: 3 },
  { title: "TOCItemType", url: "#tocitemtype", depth: 3 },
  { title: "Hooks", url: "#hooks", depth: 2 },
]

export default function Page() {
  const registryItem = getRegistryItemFromJson(componentName)

  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <TOCProvider toc={tocItems}>
      <div className="flex gap-8 relative">
        <div className="flex-1 min-w-0">
          <RegistryItemHeader registryItem={registryItem} />

          <Content>
            <div className="flex flex-col gap-6 w-full">
              <CardDescription className="mb-2 text-primary">
                Self-container TOC component inspired by the Fumadocs TOC component.
              </CardDescription>

              <div id="features">
                <h2 className="text-lg font-semibold mb-2">Features</h2>
                <ul className="space-y-2 text-muted-foreground text-sm list-inside list-disc">
                  <li>Active anchor tracking using IntersectionObserver</li>
                  <li>Two variants: default (straight line) and clerk (depth-aware line)</li>
                  <li>Smooth auto-scroll within the TOC container when active item changes</li>
                  <li>Animated indicator thumb that highlights active sections</li>
                  <li>Support for nested headings with depth-based indentation</li>
                  <li>Self-contained - no external providers required</li>
                  <li>Fully typed with TypeScript</li>
                  <li>RTL support</li>
                </ul>
              </div>
            </div>
          </Content>

          <Content>
            <div className="flex flex-col gap-6 w-full">
              <div id="installation">
                <h2 className="text-lg font-semibold mb-4">Installation</h2>
                <CodeBlock
                  code={[
                    {
                      language: "bash",
                      filename: "terminal",
                      code: `npx shadcn@latest add "https://crux-ui.vercel.app/r/toc.json"`,
                    },
                  ]}
                />
              </div>
            </div>
          </Content>

          <Content>
            <div className="flex flex-col gap-6 w-full" id="usage">
              <h2 className="text-lg font-semibold mb-2">Usage</h2>

              <div id="basic-setup">
                <h3 className="text-base font-medium mb-3">Basic Setup</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Wrap your page content with <code className="code-text">TOCProvider</code> and pass an array of TOC
                  items. Then place the <code className="code-text">PageTOC</code> and{" "}
                  <code className="code-text">PageTOCItems</code> components in your sidebar.
                </p>
                <CodeBlock
                  code={[
                    {
                      language: "tsx",
                      filename: "page.tsx",
                      code: `import { 
  type TOCItemType, 
  TOCProvider, 
  PageTOC, 
  PageTOCItems 
} from "@/registry/abui/ui/toc"

const tocItems: TOCItemType[] = [
  { title: "Introduction", url: "#introduction", depth: 2 },
  { title: "Getting Started", url: "#getting-started", depth: 2 },
  { title: "Installation", url: "#installation", depth: 3 },
  { title: "Configuration", url: "#configuration", depth: 3 },
  { title: "Advanced Usage", url: "#advanced-usage", depth: 2 },
]

export default function Page() {
  return (
    <TOCProvider toc={tocItems}>
      <div className="flex gap-8">
        {/* Main content */}
        <div className="flex-1">
          <section id="introduction">...</section>
          <section id="getting-started">...</section>
          <section id="installation">...</section>
          <section id="configuration">...</section>
          <section id="advanced-usage">...</section>
        </div>

        {/* TOC Sidebar */}
        <aside className="w-64 shrink-0">
          <PageTOC className="sticky top-20">
            <p className="mb-1 font-medium text-sm">On This Page</p>
            <PageTOCItems />
          </PageTOC>
        </aside>
      </div>
    </TOCProvider>
  )
}`,
                    },
                  ]}
                />
              </div>

              <div id="with-clerk-variant">
                <h3 className="text-base font-medium mb-3">With Clerk Variant</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  The clerk variant renders a depth-aware line that follows the hierarchy of your headings. This creates
                  a visual connection between nested items.
                </p>
                <CodeBlock
                  code={[
                    {
                      language: "tsx",
                      filename: "clerk-variant.tsx",
                      code: `<PageTOC className="sticky top-20">
  <p className="mb-1 font-medium text-sm">On This Page</p>
  <PageTOCItems variant="clerk" />
</PageTOC>`,
                    },
                  ]}
                />
              </div>
            </div>
          </Content>

          <Content>
            <div className="flex flex-col gap-6 w-full" id="variants">
              <h2 className="text-lg font-semibold mb-2">Variants</h2>

              <div id="variant-default">
                <h3 className="text-base font-medium mb-3">Default</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  A simple straight vertical line with depth-based indentation. The active indicator slides along the
                  line to show the current position.
                </p>
                <div className="p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground">
                    👉 Look at the TOC on the right side of this page - toggle between variants to see the difference!
                  </p>
                </div>
              </div>

              <div id="variant-clerk">
                <h3 className="text-base font-medium mb-3">Clerk</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  A depth-aware line that changes horizontal position based on the heading depth. Creates a visual
                  hierarchy with diagonal connectors between different depth levels.
                </p>
                <ul className="text-muted-foreground text-sm list-inside list-disc space-y-1">
                  <li>
                    Depth ≤ 2: Line at position <code className="code-text">0px</code>
                  </li>
                  <li>
                    Depth ≥ 3: Line at position <code className="code-text">10px</code>
                  </li>
                  <li>Diagonal SVG lines connect different depth levels</li>
                  <li>SVG mask creates the full path for the active indicator</li>
                </ul>
              </div>
            </div>
          </Content>

          <Content>
            <div className="flex flex-col gap-6 w-full" id="component-props">
              <h2 className="text-lg font-semibold mb-4">Component Props</h2>

              <div className="space-y-6">
                <div className="space-y-2" id="tocprovider-props">
                  <h3 className="font-mono text-sm font-medium">TOCProvider</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    The main context provider that manages active anchor state.
                  </p>
                  <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                    <li>
                      <code className="code-text">toc</code> - <code>TOCItemType[]</code> - Array of TOC items
                      (required)
                    </li>
                    <li>
                      <code className="code-text">single</code> - <code>boolean</code> - Only allow one active item at a
                      time (default: false)
                    </li>
                    <li>
                      <code className="code-text">children</code> - <code>ReactNode</code> - Content to wrap
                    </li>
                  </ul>
                </div>

                <div className="space-y-2" id="pagetocitems-props">
                  <h3 className="font-mono text-sm font-medium">PageTOCItems</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Renders the TOC list with the selected variant style.
                  </p>
                  <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                    <li>
                      <code className="code-text">variant</code> - <code>&quot;default&quot; | &quot;clerk&quot;</code>{" "}
                      - Visual style variant (default: &quot;default&quot;)
                    </li>
                    <li>
                      <code className="code-text">emptyText</code> - <code>string</code> - Text shown when no headings
                      (default: &quot;No Headings&quot;)
                    </li>
                  </ul>
                </div>

                <div className="space-y-2" id="tocitemtype">
                  <h3 className="font-mono text-sm font-medium">TOCItemType</h3>
                  <p className="text-muted-foreground text-sm mb-2">The shape of each TOC item.</p>
                  <CodeBlock
                    code={[
                      {
                        language: "typescript",
                        filename: "types.ts",
                        code: `interface TOCItemType {
  title: ReactNode    // The text to display
  url: string         // The anchor URL (e.g., "#section-id")
  depth: number       // Heading depth (2 = h2, 3 = h3, etc.)
}`,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </Content>

          <Content>
            <div className="flex flex-col gap-6 w-full" id="hooks">
              <h2 className="text-lg font-semibold mb-4">Hooks</h2>
              <p className="text-muted-foreground text-sm mb-4">
                The component exports several hooks for advanced usage:
              </p>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>
                  <code className="code-text">useActiveAnchor()</code> - Returns the first active anchor ID
                </li>
                <li>
                  <code className="code-text">useActiveAnchors()</code> - Returns all visible anchor IDs
                </li>
                <li>
                  <code className="code-text">useTOCItems()</code> - Returns the TOC items from context
                </li>
              </ul>
              <CodeBlock
                code={[
                  {
                    language: "tsx",
                    filename: "custom-indicator.tsx",
                    code: `import { useActiveAnchor } from "@/registry/abui/ui/toc"

function CurrentSection() {
  const activeAnchor = useActiveAnchor()
  
  return (
    <div>
      Currently viewing: {activeAnchor || "none"}
    </div>
  )
}`,
                  },
                ]}
              />
            </div>
          </Content>
        </div>

        {/* TOC Sidebar - This IS the demo! */}
        <aside className="hidden xl:block w-64 shrink-0">
          <PageTOC className="sticky top-20">
            <p className="mb-1 font-medium text-sm">On This Page</p>
            <PageTOCItems variant="clerk" />
          </PageTOC>
        </aside>
      </div>
    </TOCProvider>
  )
}
