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
  const [value2, setValue2] = React.useState("daily")
  const [value3, setValue3] = React.useState("pro")
  const [value4, setValue4] = React.useState("standard")
  const [value5, setValue5] = React.useState("free")
  const registryItem = getRegistryItemFromJson(componentName)
  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <PageWithBreadcrumbs>
      <Content>
        <RegistryItemHeader registryItem={registryItem} />

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
    </PageWithBreadcrumbs>
  )
}
