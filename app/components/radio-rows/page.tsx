"use client"

import * as React from "react"
import PageWithBreadcrumbs from "@/components/PageWithBreadcrumbs"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { RadioRows, RadioRowsItem, RadioRowsItemTitle, RadioRowsItemDescription } from "@/registry/abui/ui/radio-rows"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"

const componentName = "radio-rows"

export default function Page() {
  const [value, setValue] = React.useState("1")
  const [value3, setValue3] = React.useState("pro")
  const [value4, setValue4] = React.useState("standard")
  const [value5, setValue5] = React.useState("free")
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
              <RadioRows value={value} onValueChange={setValue}>
                <RadioRowsItem value="1">Option 1</RadioRowsItem>
                <RadioRowsItem value="2">Option 2</RadioRowsItem>
                <RadioRowsItem value="3">Option 3</RadioRowsItem>
              </RadioRows>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "basic-example.tsx",
                  code: `const [value, setValue] = useState("1")

<RadioRows value={value} onValueChange={setValue}>
  <RadioRowsItem value="1">Option 1</RadioRowsItem>
  <RadioRowsItem value="2">Option 2</RadioRowsItem>
  <RadioRowsItem value="3">Option 3</RadioRowsItem>
</RadioRows>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">With Disabled Option</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <RadioRows defaultValue="email">
                <RadioRowsItem value="email">Email</RadioRowsItem>
                <RadioRowsItem value="sms" disabled>
                  SMS
                </RadioRowsItem>
                <RadioRowsItem value="push">Push</RadioRowsItem>
              </RadioRows>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "disabled-option.tsx",
                  code: `<RadioRows defaultValue="email">
  <RadioRowsItem value="email">Email</RadioRowsItem>
  <RadioRowsItem value="sms" disabled>SMS</RadioRowsItem>
  <RadioRowsItem value="push">Push</RadioRowsItem>
</RadioRows>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">With Descriptions</div>
            <div className="w-full flex border rounded-lg justify-start min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <RadioRows value={value3} onValueChange={setValue3}>
                <RadioRowsItem value="starter">
                  <RadioRowsItemTitle>Starter</RadioRowsItemTitle>
                  <RadioRowsItemDescription>Perfect for beginners</RadioRowsItemDescription>
                </RadioRowsItem>
                <RadioRowsItem value="pro">
                  <RadioRowsItemTitle>Pro</RadioRowsItemTitle>
                  <RadioRowsItemDescription>Best for professionals</RadioRowsItemDescription>
                </RadioRowsItem>
                <RadioRowsItem value="team">
                  <RadioRowsItemTitle>Team</RadioRowsItemTitle>
                  <RadioRowsItemDescription>Collaborate together</RadioRowsItemDescription>
                </RadioRowsItem>
              </RadioRows>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "with-descriptions.tsx",
                  code: `const [value, setValue] = useState("pro")

<RadioRows value={value} onValueChange={setValue}>
  <RadioRowsItem value="starter">
    <RadioRowsItemTitle>Starter</RadioRowsItemTitle>
    <RadioRowsItemDescription>Perfect for beginners</RadioRowsItemDescription>
  </RadioRowsItem>
  <RadioRowsItem value="pro">
    <RadioRowsItemTitle>Pro</RadioRowsItemTitle>
    <RadioRowsItemDescription>Best for professionals</RadioRowsItemDescription>
  </RadioRowsItem>
  <RadioRowsItem value="team">
    <RadioRowsItemTitle>Team</RadioRowsItemTitle>
    <RadioRowsItemDescription>Collaborate together</RadioRowsItemDescription>
  </RadioRowsItem>
</RadioRows>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Variant: Outline</div>
            <div className="w-full flex border rounded-lg justify-start min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <RadioRows value={value4} onValueChange={setValue4}>
                <RadioRowsItem value="basic" variant="outline">
                  <RadioRowsItemTitle>Basic</RadioRowsItemTitle>
                  <RadioRowsItemDescription>Free forever</RadioRowsItemDescription>
                </RadioRowsItem>
                <RadioRowsItem value="standard" variant="outline">
                  <RadioRowsItemTitle>Standard</RadioRowsItemTitle>
                  <RadioRowsItemDescription>$9/month</RadioRowsItemDescription>
                </RadioRowsItem>
                <RadioRowsItem value="premium" variant="outline">
                  <RadioRowsItemTitle>Premium</RadioRowsItemTitle>
                  <RadioRowsItemDescription>$29/month</RadioRowsItemDescription>
                </RadioRowsItem>
              </RadioRows>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "variant-outline.tsx",
                  code: `const [value, setValue] = useState("standard")

<RadioRows value={value} onValueChange={setValue}>
  <RadioRowsItem value="basic" variant="outline">
    <RadioRowsItemTitle>Basic</RadioRowsItemTitle>
    <RadioRowsItemDescription>Free forever</RadioRowsItemDescription>
  </RadioRowsItem>
  <RadioRowsItem value="standard" variant="outline">
    <RadioRowsItemTitle>Standard</RadioRowsItemTitle>
    <RadioRowsItemDescription>$9/month</RadioRowsItemDescription>
  </RadioRowsItem>
  <RadioRowsItem value="premium" variant="outline">
    <RadioRowsItemTitle>Premium</RadioRowsItemTitle>
    <RadioRowsItemDescription>$29/month</RadioRowsItemDescription>
  </RadioRowsItem>
</RadioRows>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Variant: Primary</div>
            <div className="w-full flex border rounded-lg justify-start min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <RadioRows value={value4} onValueChange={setValue4}>
                <RadioRowsItem value="basic" variant="primary">
                  <RadioRowsItemTitle>Basic</RadioRowsItemTitle>
                  <RadioRowsItemDescription>Free forever</RadioRowsItemDescription>
                </RadioRowsItem>
                <RadioRowsItem value="standard" variant="primary">
                  <RadioRowsItemTitle>Standard</RadioRowsItemTitle>
                  <RadioRowsItemDescription>$9/month</RadioRowsItemDescription>
                </RadioRowsItem>
                <RadioRowsItem value="premium" variant="primary">
                  <RadioRowsItemTitle>Premium</RadioRowsItemTitle>
                  <RadioRowsItemDescription>$29/month</RadioRowsItemDescription>
                </RadioRowsItem>
              </RadioRows>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "variant-primary.tsx",
                  code: `const [value, setValue] = useState("standard")

<RadioRows value={value} onValueChange={setValue}>
  <RadioRowsItem value="basic" variant="primary">
    <RadioRowsItemTitle>Basic</RadioRowsItemTitle>
    <RadioRowsItemDescription>Free forever</RadioRowsItemDescription>
  </RadioRowsItem>
  <RadioRowsItem value="standard" variant="primary">
    <RadioRowsItemTitle>Standard</RadioRowsItemTitle>
    <RadioRowsItemDescription>$9/month</RadioRowsItemDescription>
  </RadioRowsItem>
  <RadioRowsItem value="premium" variant="primary">
    <RadioRowsItemTitle>Premium</RadioRowsItemTitle>
    <RadioRowsItemDescription>$29/month</RadioRowsItemDescription>
  </RadioRowsItem>
</RadioRows>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Variant: Secondary</div>
            <div className="w-full flex border rounded-lg justify-start min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <RadioRows value={value5} onValueChange={setValue5}>
                <RadioRowsItem value="free" variant="secondary">
                  <RadioRowsItemTitle>Free Shipping</RadioRowsItemTitle>
                  <RadioRowsItemDescription>5-8 business days</RadioRowsItemDescription>
                </RadioRowsItem>
                <RadioRowsItem value="express" variant="secondary">
                  <RadioRowsItemTitle>Express Shipping</RadioRowsItemTitle>
                  <RadioRowsItemDescription>2-3 business days</RadioRowsItemDescription>
                </RadioRowsItem>
                <RadioRowsItem value="overnight" variant="secondary">
                  <RadioRowsItemTitle>Overnight</RadioRowsItemTitle>
                  <RadioRowsItemDescription>Next business day</RadioRowsItemDescription>
                </RadioRowsItem>
              </RadioRows>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "variant-secondary.tsx",
                  code: `const [value, setValue] = useState("free")

<RadioRows value={value} onValueChange={setValue}>
  <RadioRowsItem value="free" variant="secondary">
    <RadioRowsItemTitle>Free Shipping</RadioRowsItemTitle>
    <RadioRowsItemDescription>5-8 business days</RadioRowsItemDescription>
  </RadioRowsItem>
  <RadioRowsItem value="express" variant="secondary">
    <RadioRowsItemTitle>Express Shipping</RadioRowsItemTitle>
    <RadioRowsItemDescription>2-3 business days</RadioRowsItemDescription>
  </RadioRowsItem>
  <RadioRowsItem value="overnight" variant="secondary">
    <RadioRowsItemTitle>Overnight</RadioRowsItemTitle>
    <RadioRowsItemDescription>Next business day</RadioRowsItemDescription>
  </RadioRowsItem>
</RadioRows>`,
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
              <li>Composable architecture with separate title and description components</li>
              <li>Multiple style variants (default, outline, primary, secondary)</li>
              <li>Full-width row layout with custom radio indicators</li>
              <li>Support for disabled states</li>
              <li>Smooth transitions and hover effects</li>
              <li>Keyboard navigation and focus management</li>
              <li>Fully typed with TypeScript</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">RadioRows</h3>
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
                    <code className="bg-muted rounded px-1.5 py-0.5">containerClassName</code> - string - Additional
                    classes for the inner container
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">RadioRowsItem</h3>
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
                    &quot;outline&quot; | &quot;primary&quot; | &quot;secondary&quot; (default: &quot;default&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode - Either simple
                    text or RadioRowsItemTitle/Description components
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">RadioRowsItemTitle</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode - The title
                    content
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">RadioRowsItemDescription</h3>
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
    </PageWithBreadcrumbs>
  )
}
