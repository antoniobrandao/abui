import { AddCommand } from "@/components/add-command"
import { OpenInV0 } from "@/components/open-in-v0"
import * as React from "react"
import { Separator } from "@/components/ui/separator"
import PageWithBreadcrumbs from "@/components/PageWithBreadcrumbs"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { Logo } from "@/registry/abui/branding/logo"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"

const componentName = "debug-utils"

export default function Page() {
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
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Debug-red</div>
              <div className="w-full flex items-center border rounded-lg justify-center min-h-[100px] p-4 md:p-10 relative bg-muted/30">
                <p className="debug-red">Debug-red</p>
              </div>
              <CodeBlockComponent
                code={[
                  {
                    language: "tsx",
                    filename: "basic-example.tsx",
                    code: `<p className="debug-red">Test</p>`,
                  },
                ]}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Debug-green</div>
              <div className="w-full flex items-center border rounded-lg justify-center min-h-[100px] p-4 md:p-10 relative bg-muted/30">
                <p className="debug-green">Debug-green</p>
              </div>
              <CodeBlockComponent
                code={[
                  {
                    language: "tsx",
                    filename: "basic-example.tsx",
                    code: `<p className="debug-green">Test</p>`,
                  },
                ]}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Debug-blue</div>
              <div className="w-full flex items-center border rounded-lg justify-center min-h-[100px] p-4 md:p-10 relative bg-muted/30">
                <p className="debug-blue">Debug-blue</p>
              </div>
              <CodeBlockComponent
                code={[
                  {
                    language: "tsx",
                    filename: "basic-example.tsx",
                    code: `<p className="debug-blue">Test</p>`,
                  },
                ]}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Debug-purple</div>
              <div className="w-full flex items-center border rounded-lg justify-center min-h-[100px] p-4 md:p-10 relative bg-muted/30">
                <p className="debug-purple">Debug-purple</p>
              </div>
              <CodeBlockComponent
                code={[
                  {
                    language: "tsx",
                    filename: "basic-example.tsx",
                    code: `<p className="debug-purple">Test</p>`,
                  },
                ]}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Debug-yellow</div>
              <div className="w-full flex items-center border rounded-lg justify-center min-h-[100px] p-4 md:p-10 relative bg-muted/30">
                <p className="debug-yellow">Debug-yellow</p>
              </div>
              <CodeBlockComponent
                code={[
                  {
                    language: "tsx",
                    filename: "basic-example.tsx",
                    code: `<p className="debug-yellow">Test</p>`,
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
