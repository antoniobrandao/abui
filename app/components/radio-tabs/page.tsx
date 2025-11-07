"use client"

import * as React from "react"
import PageWithBreadcrumbs from "@/components/PageWithBreadcrumbs"
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
    <PageWithBreadcrumbs>
      <RegistryItemHeader registryItem={registryItem} />
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
    </PageWithBreadcrumbs>
  )
}
