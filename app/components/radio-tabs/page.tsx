"use client"

import * as React from "react"
import { type TOCItemType, TOCProvider, PageTOC, PageTOCItems } from "@/registry/abui/ui/toc"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { RadioTabs, RadioTabsItem, RadioTabsItemLabel, RadioTabsItemDescription } from "@/registry/abui/ui/radio-tabs"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"

const componentName = "radio-tabs"

const tocItems: TOCItemType[] = [
  { title: "Examples", url: "#examples", depth: 2 },
  { title: "Basic Example", url: "#basic-example", depth: 3 },
  { title: "With More Options", url: "#more-options", depth: 3 },
  { title: "With Disabled Option", url: "#disabled-option", depth: 3 },
  { title: "With Descriptions", url: "#with-descriptions", depth: 3 },
  { title: "Features", url: "#features", depth: 2 },
  { title: "Component Props", url: "#component-props", depth: 2 },
  { title: "RadioTabs", url: "#radiotabs-props", depth: 3 },
  { title: "RadioTabsItem", url: "#radiotabsitem-props", depth: 3 },
  { title: "RadioTabsItemLabel", url: "#radiotabsitemlabel-props", depth: 3 },
  { title: "RadioTabsItemDescription", url: "#radiotabsitemdescription-props", depth: 3 },
]

export default function Page() {
  const [value, setValue] = React.useState("1")
  const [value2, setValue2] = React.useState("daily")
  const [value3, setValue3] = React.useState("pro")
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
            source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/ui/radio-tabs.tsx"
          />
          <Content>
            <div className="w-full flex flex-col gap-8" id="examples">
              <div className="flex flex-col gap-4" id="basic-example">
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

              <div className="flex flex-col gap-4" id="more-options">
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

              <div className="flex flex-col gap-4" id="disabled-option">
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

              <div className="flex flex-col gap-4" id="with-descriptions">
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
            <div className="flex flex-col gap-6 w-full" id="features">
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

              <div id="component-props">
                <h2 className="text-lg font-semibold mb-4">Component Props</h2>
                <div className="space-y-6">
                  <div className="space-y-2" id="radiotabs-props">
                    <h3 className="font-mono text-sm font-medium">RadioTabs</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                      <li>
                        <code className="code-text">value</code> - string - Currently selected value
                      </li>
                      <li>
                        <code className="code-text">onValueChange</code> - (value: string) =&gt; void - Callback when
                        value changes
                      </li>
                      <li>
                        <code className="code-text">defaultValue</code> - string - Default selected value (uncontrolled)
                      </li>
                      <li>
                        <code className="code-text">stackAtBreakpoint</code> - &quot;sm&quot; | &quot;md&quot; |
                        &quot;lg&quot; | &quot;xl&quot; | &quot;2xl&quot; - Breakpoint at which tabs stack vertically
                      </li>
                      <li>
                        <code className="code-text">containerClassName</code> - string - Additional classes for the
                        container
                      </li>
                      <li>
                        <code className="code-text">className</code> - string
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2" id="radiotabsitem-props">
                    <h3 className="font-mono text-sm font-medium">RadioTabsItem</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                      <li>
                        <code className="code-text">value</code> - string (required) - The value for this radio item
                      </li>
                      <li>
                        <code className="code-text">disabled</code> - boolean - Whether the item is disabled
                      </li>
                      <li>
                        <code className="code-text">variant</code> - &quot;default&quot; | &quot;outline&quot; |
                        &quot;highlight&quot; | &quot;outline_highlight&quot; | &quot;primary&quot; |
                        &quot;secondary&quot; (default: &quot;default&quot;)
                      </li>
                      <li>
                        <code className="code-text">className</code> - string
                      </li>
                      <li>
                        <code className="code-text">children</code> - React.ReactNode - Either simple text or
                        RadioTabsItemLabel/Description components
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2" id="radiotabsitemlabel-props">
                    <h3 className="font-mono text-sm font-medium">RadioTabsItemLabel</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                      <li>
                        <code className="code-text">children</code> - React.ReactNode - The label content
                      </li>
                      <li>
                        <code className="code-text">className</code> - string
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2" id="radiotabsitemdescription-props">
                    <h3 className="font-mono text-sm font-medium">RadioTabsItemDescription</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                      <li>
                        <code className="code-text">children</code> - React.ReactNode - The description content
                      </li>
                      <li>
                        <code className="code-text">className</code> - string
                      </li>
                    </ul>
                  </div>
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
