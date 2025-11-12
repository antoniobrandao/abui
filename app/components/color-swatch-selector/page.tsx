"use client"

import * as React from "react"
import PageWithBreadcrumbs from "@/components/PageWithBreadcrumbs"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { ColorSwatchSelector } from "@/registry/abui/ui/color-swatch-selector"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"

const componentName = "color-swatch-selector"

export default function Page() {
  const [value, setValue] = React.useState("#e91e63")
  const [value2, setValue2] = React.useState("#6366f1")
  const [value3, setValue3] = React.useState("#10b981")
  const [value4, setValue4] = React.useState("#f97316")
  const [value5, setValue5] = React.useState("#8b5cf6")

  const registryItem = getRegistryItemFromJson(componentName)
  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <PageWithBreadcrumbs>
      <RegistryItemHeader registryItem={registryItem} />
      <Content>
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Basic Example</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <ColorSwatchSelector.Root value={value} onValueChange={setValue}>
                <ColorSwatchSelector.Label value="Select color" />
                <ColorSwatchSelector.Content>
                  <ColorSwatchSelector.Item value="#e91e63" />
                  <ColorSwatchSelector.Item value="#e57373" />
                  <ColorSwatchSelector.Item value="#ec407a" />
                  <ColorSwatchSelector.Item value="#7dd3fc" />
                </ColorSwatchSelector.Content>
              </ColorSwatchSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "basic-example.tsx",
                  code: `const [value, setValue] = useState("#e91e63")

<ColorSwatchSelector.Root value={value} onValueChange={setValue}>
  <ColorSwatchSelector.Label value="Color" />
  <ColorSwatchSelector.Content>
    <ColorSwatchSelector.Item value="#e91e63" />
    <ColorSwatchSelector.Item value="#e57373" />
    <ColorSwatchSelector.Item value="#ec407a" />
    <ColorSwatchSelector.Item value="#7dd3fc" />
  </ColorSwatchSelector.Content>
</ColorSwatchSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Without Label</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <ColorSwatchSelector.Root value={value2} onValueChange={setValue2}>
                <ColorSwatchSelector.Content>
                  <ColorSwatchSelector.Item value="#ef4444" />
                  <ColorSwatchSelector.Item value="#f59e0b" />
                  <ColorSwatchSelector.Item value="#10b981" />
                  <ColorSwatchSelector.Item value="#3b82f6" />
                  <ColorSwatchSelector.Item value="#6366f1" />
                  <ColorSwatchSelector.Item value="#8b5cf6" />
                </ColorSwatchSelector.Content>
              </ColorSwatchSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "without-label.tsx",
                  code: `const [value, setValue] = useState("#6366f1")

<ColorSwatchSelector.Root value={value} onValueChange={setValue}>
  <ColorSwatchSelector.Content>
    <ColorSwatchSelector.Item value="#ef4444" />
    <ColorSwatchSelector.Item value="#f59e0b" />
    <ColorSwatchSelector.Item value="#10b981" />
    <ColorSwatchSelector.Item value="#3b82f6" />
    <ColorSwatchSelector.Item value="#6366f1" />
    <ColorSwatchSelector.Item value="#8b5cf6" />
  </ColorSwatchSelector.Content>
</ColorSwatchSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Custom Gap Spacing</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <ColorSwatchSelector.Root value={value3} onValueChange={setValue3}>
                <ColorSwatchSelector.Label value="Theme" />
                <ColorSwatchSelector.Content className="gap-6">
                  <ColorSwatchSelector.Item value="#10b981" />
                  <ColorSwatchSelector.Item value="#14b8a6" />
                  <ColorSwatchSelector.Item value="#06b6d4" />
                  <ColorSwatchSelector.Item value="#0ea5e9" />
                </ColorSwatchSelector.Content>
              </ColorSwatchSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "custom-gap.tsx",
                  code: `const [value, setValue] = useState("#10b981")

<ColorSwatchSelector.Root value={value} onValueChange={setValue}>
  <ColorSwatchSelector.Label value="Theme" />
  <ColorSwatchSelector.Content className="gap-6">
    <ColorSwatchSelector.Item value="#10b981" />
    <ColorSwatchSelector.Item value="#14b8a6" />
    <ColorSwatchSelector.Item value="#06b6d4" />
    <ColorSwatchSelector.Item value="#0ea5e9" />
  </ColorSwatchSelector.Content>
</ColorSwatchSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Custom Size</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <ColorSwatchSelector.Root value={value4} onValueChange={setValue4}>
                <ColorSwatchSelector.Label value="Size" />
                <ColorSwatchSelector.Content className="gap-4">
                  <ColorSwatchSelector.Item value="#f97316" className="h-14 w-14" />
                  <ColorSwatchSelector.Item value="#fb923c" className="h-14 w-14" />
                  <ColorSwatchSelector.Item value="#fdba74" className="h-14 w-14" />
                </ColorSwatchSelector.Content>
              </ColorSwatchSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "custom-size.tsx",
                  code: `const [value, setValue] = useState("#f97316")

<ColorSwatchSelector.Root value={value} onValueChange={setValue}>
  <ColorSwatchSelector.Label value="Size" />
  <ColorSwatchSelector.Content className="gap-4">
    <ColorSwatchSelector.Item value="#f97316" className="h-14 w-14" />
    <ColorSwatchSelector.Item value="#fb923c" className="h-14 w-14" />
    <ColorSwatchSelector.Item value="#fdba74" className="h-14 w-14" />
  </ColorSwatchSelector.Content>
</ColorSwatchSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">With Disabled Option</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <ColorSwatchSelector.Root defaultValue="#8b5cf6">
                <ColorSwatchSelector.Label value="Select Color" />
                <ColorSwatchSelector.Content>
                  <ColorSwatchSelector.Item value="#8b5cf6" />
                  <ColorSwatchSelector.Item value="#a78bfa" />
                  <ColorSwatchSelector.Item value="#c4b5fd" disabled />
                  <ColorSwatchSelector.Item value="#ddd6fe" />
                </ColorSwatchSelector.Content>
              </ColorSwatchSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "disabled-option.tsx",
                  code: `<ColorSwatchSelector.Root defaultValue="#8b5cf6">
  <ColorSwatchSelector.Label value="Select Color" />
  <ColorSwatchSelector.Content>
    <ColorSwatchSelector.Item value="#8b5cf6" />
    <ColorSwatchSelector.Item value="#a78bfa" />
    <ColorSwatchSelector.Item value="#c4b5fd" disabled />
    <ColorSwatchSelector.Item value="#ddd6fe" />
  </ColorSwatchSelector.Content>
</ColorSwatchSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Many Colors</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <ColorSwatchSelector.Root value={value5} onValueChange={setValue5}>
                <ColorSwatchSelector.Label value="Palette" />
                <ColorSwatchSelector.Content className="gap-2">
                  <ColorSwatchSelector.Item value="#ef4444" />
                  <ColorSwatchSelector.Item value="#f97316" />
                  <ColorSwatchSelector.Item value="#f59e0b" />
                  <ColorSwatchSelector.Item value="#eab308" />
                  <ColorSwatchSelector.Item value="#84cc16" />
                  <ColorSwatchSelector.Item value="#10b981" />
                  <ColorSwatchSelector.Item value="#14b8a6" />
                  <ColorSwatchSelector.Item value="#06b6d4" />
                  <ColorSwatchSelector.Item value="#3b82f6" />
                  <ColorSwatchSelector.Item value="#6366f1" />
                  <ColorSwatchSelector.Item value="#8b5cf6" />
                  <ColorSwatchSelector.Item value="#a855f7" />
                  <ColorSwatchSelector.Item value="#d946ef" />
                  <ColorSwatchSelector.Item value="#ec4899" />
                  <ColorSwatchSelector.Item value="#f43f5e" />
                </ColorSwatchSelector.Content>
              </ColorSwatchSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "many-colors.tsx",
                  code: `const [value, setValue] = useState("#8b5cf6")

<ColorSwatchSelector.Root value={value} onValueChange={setValue}>
  <ColorSwatchSelector.Label value="Palette" />
  <ColorSwatchSelector.Content className="gap-2">
    <ColorSwatchSelector.Item value="#ef4444" />
    <ColorSwatchSelector.Item value="#f97316" />
    <ColorSwatchSelector.Item value="#f59e0b" />
    <ColorSwatchSelector.Item value="#eab308" />
    <ColorSwatchSelector.Item value="#84cc16" />
    <ColorSwatchSelector.Item value="#10b981" />
    <ColorSwatchSelector.Item value="#14b8a6" />
    <ColorSwatchSelector.Item value="#06b6d4" />
    <ColorSwatchSelector.Item value="#3b82f6" />
    <ColorSwatchSelector.Item value="#6366f1" />
    <ColorSwatchSelector.Item value="#8b5cf6" />
    <ColorSwatchSelector.Item value="#a855f7" />
    <ColorSwatchSelector.Item value="#d946ef" />
    <ColorSwatchSelector.Item value="#ec4899" />
    <ColorSwatchSelector.Item value="#f43f5e" />
  </ColorSwatchSelector.Content>
</ColorSwatchSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Vertical Layout</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <ColorSwatchSelector.Root defaultValue="#ec4899" className="flex-col items-start">
                <ColorSwatchSelector.Label value="Color Theme" />
                <ColorSwatchSelector.Content className="gap-3">
                  <ColorSwatchSelector.Item value="#ec4899" />
                  <ColorSwatchSelector.Item value="#f472b6" />
                  <ColorSwatchSelector.Item value="#f9a8d4" />
                  <ColorSwatchSelector.Item value="#fbcfe8" />
                </ColorSwatchSelector.Content>
              </ColorSwatchSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "vertical-layout.tsx",
                  code: `<ColorSwatchSelector.Root defaultValue="#ec4899" className="flex-col items-start">
  <ColorSwatchSelector.Label value="Color Theme" />
  <ColorSwatchSelector.Content className="gap-3">
    <ColorSwatchSelector.Item value="#ec4899" />
    <ColorSwatchSelector.Item value="#f472b6" />
    <ColorSwatchSelector.Item value="#f9a8d4" />
    <ColorSwatchSelector.Item value="#fbcfe8" />
  </ColorSwatchSelector.Content>
</ColorSwatchSelector.Root>`,
                },
              ]}
            />
          </div>
        </div>
      </Content>

      <Content>
        <div className="flex flex-col gap-6 w-full">
          <div>
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="space-y-2 text-muted-foreground text-sm list-inside list-disc">
              <li>Built on Radix UI Radio Group primitives for accessibility</li>
              <li>Composable architecture with separate Root, Label, Content, and Item components</li>
              <li>Visual color swatch display with hex color values</li>
              <li>Selected state indication with center ring indicator</li>
              <li>Support for disabled states</li>
              <li>Flexible layout options (horizontal and vertical)</li>
              <li>Customizable size and spacing via className props</li>
              <li>Smooth transitions and hover effects</li>
              <li>Keyboard navigation and focus management</li>
              <li>Fully typed with TypeScript</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">ColorSwatchSelector.Root</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">value</code> - string - Currently selected color
                    value
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">onValueChange</code> - (value: string) =&gt; void -
                    Callback when value changes
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">defaultValue</code> - string - Default selected
                    value (uncontrolled)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string - Override default
                    container styles
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">ColorSwatchSelector.Label</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">value</code> - string (required) - The label text
                    to display
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">ColorSwatchSelector.Content</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string - Useful for customizing
                    gap spacing
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode -
                    ColorSwatchSelector.Item components
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">ColorSwatchSelector.Item</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">value</code> - string (required) - The color value
                    (hex format recommended)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">disabled</code> - boolean - Whether the item is
                    disabled
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string - Useful for customizing
                    swatch size (e.g., h-14 w-14)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </PageWithBreadcrumbs>
  )
}
