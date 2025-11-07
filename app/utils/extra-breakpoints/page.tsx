import * as React from "react"
import PageWithBreadcrumbs from "@/components/PageWithBreadcrumbs"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import CodeBlockComponent from "@/components/custom/CodeBlock"

const componentName = "extra-breakpoints"

export default function Page() {
  const registryItem = getRegistryItemFromJson(componentName)
  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <PageWithBreadcrumbs>
      <RegistryItemHeader registryItem={registryItem} />
      <Content>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Add a few missing breakpoints missing in the TailwindCSS defaults.
            </div>
          </div>
        </div>
        <CodeBlockComponent
          code={[
            {
              language: "css",
              filename: "extra-breakpoints.css",
              code: `theme: {
  --breakpoint-xxs: 20rem,
  --breakpoint-xs: 30rem,
  --breakpoint-3xl: 116rem
}`,
            },
          ]}
        />
      </Content>
    </PageWithBreadcrumbs>
  )
}
