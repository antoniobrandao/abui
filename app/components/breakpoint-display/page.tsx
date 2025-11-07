import * as React from "react"
import PageWithBreadcrumbs from "@/components/PageWithBreadcrumbs"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { BreakpointDisplay } from "@/registry/abui/utils/breakpoint-display"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"

const componentName = "breakpoint-display"

export default function Page() {
  const registryItem = getRegistryItemFromJson(componentName)
  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <PageWithBreadcrumbs>
      <RegistryItemHeader registryItem={registryItem} />
      <Content>
        {/* Live default instance - fixed at top of viewport */}
        <BreakpointDisplay />

        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
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

          <div className="flex flex-col gap-4">
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

          <div className="flex flex-col gap-4">
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
    </PageWithBreadcrumbs>
  )
}
