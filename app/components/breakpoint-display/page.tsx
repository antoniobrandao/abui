import * as React from "react"
import { type TOCItemType, TOCProvider, PageTOC, PageTOCItems } from "@/registry/abui/ui/toc"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { BreakpointDisplay } from "@/registry/abui/utils/breakpoint-display"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"

const componentName = "breakpoint-display"

const tocItems: TOCItemType[] = [
  { title: "Examples", url: "#examples", depth: 2 },
  { title: "Fixed Position (Default)", url: "#fixed-position", depth: 3 },
  { title: "Absolute Position with Extra Breakpoints", url: "#absolute-position", depth: 3 },
  { title: "Relative Position", url: "#relative-position", depth: 3 },
  { title: "Features", url: "#features", depth: 2 },
  { title: "Component Props", url: "#component-props", depth: 2 },
  { title: "Default Breakpoints", url: "#default-breakpoints", depth: 2 },
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
          <RegistryItemHeader
            registryItem={registryItem}
            source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/utils/breakpoint-display.tsx"
          />
          <Content>
            {/* Live default instance - fixed at top of viewport */}
            <BreakpointDisplay />

            <div className="w-full flex flex-col gap-8" id="examples">
              <div className="flex flex-col gap-4" id="fixed-position">
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium">Fixed Position (Default)</div>
                  <div className="text-sm text-muted-foreground">
                    Fixed at the top of the viewport - check the top of your screen
                  </div>
                </div>
                <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
                  <p className="text-sm text-muted-foreground">
                    The breakpoint display at the top of the screen shows the current breakpoint
                  </p>
                </div>
                <CodeBlockComponent
                  code={[
                    {
                      language: "tsx",
                      filename: "fixed-position.tsx",
                      code: `// Default behavior - fixed at top of viewport
// Uses default Tailwind breakpoints: sm, md, lg, xl, 2xl
<BreakpointDisplay />`,
                    },
                  ]}
                />
              </div>

              <div className="flex flex-col gap-4" id="absolute-position">
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium">Absolute Position with Extra Breakpoints</div>
                  <div className="text-sm text-muted-foreground">
                    Positioned relative to nearest positioned ancestor with custom breakpoints
                  </div>
                </div>
                <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
                  <BreakpointDisplay position="absolute" extraBreakpoints={["xxs", "xs", "3xl"]} />
                </div>
                <CodeBlockComponent
                  code={[
                    {
                      language: "tsx",
                      filename: "absolute-position.tsx",
                      code: `// Absolute positioning with extra breakpoints
// Result: xxs, xs, sm, md, lg, xl, 2xl, 3xl
<div className="relative">
  <BreakpointDisplay 
    position="absolute" 
    extraBreakpoints={["xxs", "xs", "3xl"]} 
  />
</div>`,
                    },
                  ]}
                />
              </div>

              <div className="flex flex-col gap-4" id="relative-position">
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium">Relative Position</div>
                  <div className="text-sm text-muted-foreground">Displays inline with default breakpoints</div>
                </div>
                <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
                  <BreakpointDisplay position="relative" />
                </div>
                <CodeBlockComponent
                  code={[
                    {
                      language: "tsx",
                      filename: "relative-position.tsx",
                      code: `// Relative positioning - displays inline
<BreakpointDisplay position="relative" />`,
                    },
                  ]}
                />
              </div>
            </div>
          </Content>

          <Content>
            <div className="flex flex-col gap-6 w-full" id="features">
              <div>
                <h2 className="text-lg font-semibold mb-2">Features</h2>
                <ul className="space-y-2 text-muted-foreground text-sm list-inside list-disc">
                  <li>Real-time display of current Tailwind breakpoint</li>
                  <li>Support for all standard Tailwind breakpoints (sm, md, lg, xl, 2xl)</li>
                  <li>Optional extra breakpoints (xxs, xs, 3xl)</li>
                  <li>Multiple positioning options (fixed, absolute, relative)</li>
                  <li>Automatic sorting by semantic breakpoint order</li>
                  <li>Smart visibility management based on active breakpoints</li>
                  <li>Lightweight and non-interactive (pointer-events-none)</li>
                  <li>Perfect for development and debugging responsive layouts</li>
                  <li>Fully typed with TypeScript</li>
                </ul>
              </div>

              <div id="component-props">
                <h2 className="text-lg font-semibold mb-4">Component Props</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-mono text-sm font-medium">BreakpointDisplay</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                      <li>
                        <code className="code-text">position</code> - &quot;fixed&quot; | &quot;absolute&quot; |
                        &quot;relative&quot; (default: &quot;fixed&quot;) - Positioning strategy
                      </li>
                      <li>
                        <code className="code-text">extraBreakpoints</code> - Array&lt;&quot;xxs&quot; | &quot;xs&quot;
                        | &quot;3xl&quot;&gt; - Additional breakpoints beyond defaults
                      </li>
                      <li>
                        <code className="code-text">className</code> - string
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="default-breakpoints">
                <h2 className="text-lg font-semibold mb-4">Default Breakpoints</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>The component uses Tailwind&apos;s standard breakpoints by default:</p>
                  <ul className="space-y-1 text-sm ml-4 list-inside list-disc">
                    <li>
                      <code className="code-text">sm</code> - 640px
                    </li>
                    <li>
                      <code className="code-text">md</code> - 768px
                    </li>
                    <li>
                      <code className="code-text">lg</code> - 1024px
                    </li>
                    <li>
                      <code className="code-text">xl</code> - 1280px
                    </li>
                    <li>
                      <code className="code-text">2xl</code> - 1536px
                    </li>
                  </ul>
                  <p className="mt-4">
                    Extra breakpoints (xxs, xs, 3xl) can be added via the{" "}
                    <code className="code-text">extraBreakpoints</code> prop. The actual pixel values for these are
                    defined in your Tailwind configuration.
                  </p>
                </div>
              </div>
            </div>
          </Content>
        </div>

        {/* TOC Sidebar */}
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
