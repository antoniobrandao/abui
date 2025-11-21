"use client"

import * as React from "react"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { RadioTabs, RadioTabsItem, RadioTabsItemLabel, RadioTabsItemDescription } from "@/registry/abui/ui/radio-tabs"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"

const componentName = "radio-tabs"

export default function Page() {
  const [value, setValue] = React.useState("1")
  const [value2, setValue2] = React.useState("daily")
  const [value3, setValue3] = React.useState("pro")
  const registryItem = getRegistryItemFromJson(componentName)
  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <div>
      <RegistryItemHeader
        registryItem={registryItem}
        source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/ui/radio-tabs.tsx"
      />
      <Content>
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Basic Example</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <RadioTabs value={value} onValueChange={setValue}>
                <RadioTabsItem value="1">Option 1</RadioTabsItem>
                <RadioTabsItem value="2">Option 2</RadioTabsItem>
                <RadioTabsItem value="3">Option 3</RadioTabsItem>
              </RadioTabs>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "basic-example.tsx",
                  code: `const [value, setValue] = useState("1")

<RadioTabs value={value} onValueChange={setValue}>
  <RadioTabsItem value="1">Option 1</RadioTabsItem>
  <RadioTabsItem value="2">Option 2</RadioTabsItem>
  <RadioTabsItem value="3">Option 3</RadioTabsItem>
</RadioTabs>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">With More Options</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <RadioTabs value={value2} onValueChange={setValue2}>
                <RadioTabsItem value="daily">Daily</RadioTabsItem>
                <RadioTabsItem value="weekly">Weekly</RadioTabsItem>
                <RadioTabsItem value="monthly">Monthly</RadioTabsItem>
                <RadioTabsItem value="yearly">Yearly</RadioTabsItem>
              </RadioTabs>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "more-options.tsx",
                  code: `const [value, setValue] = useState("daily")

<RadioTabs value={value} onValueChange={setValue}>
  <RadioTabsItem value="daily">Daily</RadioTabsItem>
  <RadioTabsItem value="weekly">Weekly</RadioTabsItem>
  <RadioTabsItem value="monthly">Monthly</RadioTabsItem>
  <RadioTabsItem value="yearly">Yearly</RadioTabsItem>
</RadioTabs>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">With Disabled Option</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <RadioTabs defaultValue="email">
                <RadioTabsItem value="email">Email</RadioTabsItem>
                <RadioTabsItem value="sms" disabled>
                  SMS
                </RadioTabsItem>
                <RadioTabsItem value="push">Push</RadioTabsItem>
              </RadioTabs>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "disabled-option.tsx",
                  code: `<RadioTabs defaultValue="email">
  <RadioTabsItem value="email">Email</RadioTabsItem>
  <RadioTabsItem value="sms" disabled>SMS</RadioTabsItem>
  <RadioTabsItem value="push">Push</RadioTabsItem>
</RadioTabs>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">With Descriptions</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <RadioTabs value={value3} onValueChange={setValue3}>
                <RadioTabsItem value="starter">
                  <RadioTabsItemLabel>Starter</RadioTabsItemLabel>
                  <RadioTabsItemDescription>Perfect for beginners</RadioTabsItemDescription>
                </RadioTabsItem>
                <RadioTabsItem value="pro">
                  <RadioTabsItemLabel>Pro</RadioTabsItemLabel>
                  <RadioTabsItemDescription>Best for professionals</RadioTabsItemDescription>
                </RadioTabsItem>
                <RadioTabsItem value="team">
                  <RadioTabsItemLabel>Team</RadioTabsItemLabel>
                  <RadioTabsItemDescription>Collaborate together</RadioTabsItemDescription>
                </RadioTabsItem>
              </RadioTabs>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "with-descriptions.tsx",
                  code: `const [value, setValue] = useState("pro")

<RadioTabs value={value} onValueChange={setValue}>
  <RadioTabsItem value="starter">
    <RadioTabsItemLabel>Starter</RadioTabsItemLabel>
    <RadioTabsItemDescription>Perfect for beginners</RadioTabsItemDescription>
  </RadioTabsItem>
  <RadioTabsItem value="pro">
    <RadioTabsItemLabel>Pro</RadioTabsItemLabel>
    <RadioTabsItemDescription>Best for professionals</RadioTabsItemDescription>
  </RadioTabsItem>
  <RadioTabsItem value="team">
    <RadioTabsItemLabel>Team</RadioTabsItemLabel>
    <RadioTabsItemDescription>Collaborate together</RadioTabsItemDescription>
  </RadioTabsItem>
</RadioTabs>`,
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
              <li>Composable architecture with separate label and description components</li>
              <li>Multiple style variants (default, outline, highlight, primary, secondary)</li>
              <li>Responsive with customizable stacking breakpoints</li>
              <li>Support for disabled states</li>
              <li>Automatic height adjustment when using descriptions</li>
              <li>Smooth transitions and hover effects</li>
              <li>Keyboard navigation and focus management</li>
              <li>Fully typed with TypeScript</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">RadioTabs</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">value</code> - string - Currently selected value
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
                    <code className="bg-muted rounded px-1.5 py-0.5">stackAtBreakpoint</code> - &quot;sm&quot; |
                    &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;2xl&quot; - Breakpoint at which tabs stack
                    vertically
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">containerClassName</code> - string - Additional
                    classes for the container
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">RadioTabsItem</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">value</code> - string (required) - The value for
                    this radio item
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">disabled</code> - boolean - Whether the item is
                    disabled
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">variant</code> - &quot;default&quot; |
                    &quot;outline&quot; | &quot;highlight&quot; | &quot;outline_highlight&quot; | &quot;primary&quot; |
                    &quot;secondary&quot; (default: &quot;default&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode - Either simple
                    text or RadioTabsItemLabel/Description components
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">RadioTabsItemLabel</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode - The label
                    content
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">RadioTabsItemDescription</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode - The description
                    content
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
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
