"use client"

import * as React from "react"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { Spinner } from "@/registry/abui/ui/spinner"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import ExamplePlusCodeTabs from "@/components/custom/ExamplePlusCodeTabs"
import { Button } from "@/components/ui/button"

const componentName = "spinner"

export default function Page() {
  const registryItem = getRegistryItemFromJson(componentName)
  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <div>
      <RegistryItemHeader
        registryItem={registryItem}
        source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/ui/spinner.tsx"
      />
      <Content>
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Default Spinner</div>

            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center gap-8 p-8 bg-muted-foreground/3 rounded border">
                  <Spinner />
                </div>
              }
              code={{
                language: "tsx",
                filename: "default.tsx",
                code: `<Spinner />`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Custom Colors</div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center gap-8 p-8 bg-muted-foreground/3 rounded border">
                  <Spinner className="text-blue-500" />
                  <Spinner className="text-green-500" />
                  <Spinner className="text-red-500" />
                  <Spinner className="text-purple-500" />
                </div>
              }
              code={{
                language: "tsx",
                filename: "custom-colors.tsx",
                code: `<Spinner className="text-blue-500" />
<Spinner className="text-green-500" />
<Spinner className="text-red-500" />
<Spinner className="text-purple-500" />`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Sizes</div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center gap-8 p-8 bg-muted-foreground/3 rounded border">
                  <Spinner size="sm" />
                  <Spinner size="default" />
                  <Spinner size="lg" />
                  <Spinner size="xl" />
                </div>
              }
              code={{
                language: "tsx",
                filename: "sizes.tsx",
                code: `<Spinner size="sm" />
<Spinner size="default" />
<Spinner size="lg" />
<Spinner size="xl" />`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Speeds</div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center gap-8 p-8 bg-muted-foreground/3 rounded border">
                  <div className="flex flex-col items-center gap-2">
                    <Spinner speed="slow" />
                    <span className="text-xs text-muted-foreground">Slow</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Spinner speed="default" />
                    <span className="text-xs text-muted-foreground">Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Spinner speed="fast" />
                    <span className="text-xs text-muted-foreground">Fast</span>
                  </div>
                </div>
              }
              code={{
                language: "tsx",
                filename: "speeds.tsx",
                code: `<Spinner speed="slow" />
<Spinner speed="default" />
<Spinner speed="fast" />`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Custom Stroke Width</div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center gap-8 p-8 bg-muted-foreground/3 rounded border">
                  <div className="flex flex-col items-center gap-2">
                    <Spinner strokeWidth={1} />
                    <span className="text-xs text-muted-foreground">1px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Spinner strokeWidth={3} />
                    <span className="text-xs text-muted-foreground">3px (default)</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Spinner strokeWidth={5} />
                    <span className="text-xs text-muted-foreground">5px</span>
                  </div>
                </div>
              }
              code={{
                language: "tsx",
                filename: "stroke-width.tsx",
                code: `<Spinner strokeWidth={1} />
<Spinner strokeWidth={3} />
<Spinner strokeWidth={5} />`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Loading Button</div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center gap-8 p-8 bg-muted-foreground/3 rounded border">
                  <Button size="sm" className="rounded-sm">
                    <Spinner size="sm" className="text-background" bgClassName="stroke-background/20" />
                    Loading...
                  </Button>
                </div>
              }
              code={{
                language: "tsx",
                filename: "loading-button.tsx",
                code: `<Button size="sm" className="rounded-sm">
  <Spinner size="sm" className="text-background" bgClassName="stroke-background/20" />
  Loading...
</Button>`,
              }}
            />
          </div>
        </div>
      </Content>

      <Content>
        <div className="flex flex-col gap-6 w-full">
          <div>
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="space-y-2 text-muted-foreground text-sm list-inside list-disc">
              <li>Built with React forwardRef for proper ref handling</li>
              <li>Variant-based sizing (sm, default, lg, xl)</li>
              <li>Configurable animation speed (slow, default, fast)</li>
              <li>Customizable stroke width and colors</li>
              <li>Accessible background circle with configurable opacity</li>
              <li>Uses CSS currentColor for easy theming</li>
              <li>Smooth rotation animation with CSS</li>
              <li>Fully typed with TypeScript</li>
              <li>Extends native SVG props for full flexibility</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">Spinner</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">size</code> - &quot;sm&quot; | &quot;default&quot;
                    | &quot;lg&quot; | &quot;xl&quot; - Size variant (default: &quot;default&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">speed</code> - &quot;slow&quot; |
                    &quot;default&quot; | &quot;fast&quot; - Animation speed (default: &quot;default&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">strokeWidth</code> - number - Width of the spinner
                    stroke (default: 3)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">bgClassName</code> - string - CSS class for the
                    background circle (default: &quot;stroke-muted-foreground/20&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string - Additional CSS classes
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">...props</code> - All native SVG element props are
                    supported
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>
  )
}
