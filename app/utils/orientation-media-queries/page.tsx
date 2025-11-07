import * as React from "react"
import PageWithBreadcrumbs from "@/components/PageWithBreadcrumbs"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"

const componentName = "orientation-media-queries"

export default function Page() {
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
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Orientation Media Queries</div>
              <div className="w-full flex items-center border rounded-lg justify-center min-h-[100px] p-4 md:p-10 relative bg-muted/30">
                <p className="portrait:block hidden">Your screen is in a portrait orientation</p>
                <p className="landscape:block hidden">Your screen is in a landscape orientation</p>
              </div>
              <CodeBlockComponent
                code={[
                  {
                    language: "tsx",
                    filename: "basic-example.tsx",
                    code: `<p className="portrait:block hidden">Your screen is in a portrait orientation</p>
<p className="landscape:block hidden">Your screen is in a landscape orientation</p>`,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Content>
    </PageWithBreadcrumbs>
  )
}
