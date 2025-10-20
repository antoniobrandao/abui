import { AddCommand } from "@/components/add-command"
import { OpenInV0 } from "@/components/open-in-v0"
import * as React from "react"
import { Separator } from "@/components/ui/separator"
import PageWithBreadcrumbs from "@/components/PageWithBreadcrumbs"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { Logo } from "@/registry/abui/branding/logo"

const componentName = "orientation-media-queries"

export default function Page() {
  const registryItem = getRegistryItemFromJson(componentName)
  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <PageWithBreadcrumbs>
      <Content>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="text-sm line-clamp-1 font-medium">{registryItem.title}</div>
            <Separator orientation="vertical" className="!h-4 hidden lg:flex" />
            <div className="text-sm text-muted-foreground line-clamp-1 hidden lg:flex">{registryItem.description}</div>
          </div>
          <div className="flex gap-2">
            <AddCommand registryItem={registryItem} />
            <OpenInV0 name={registryItem.name} className="w-fit" />
          </div>
        </div>
        <div className="w-full flex items-center border rounded-lg justify-center min-h-[400px] p-4 md:p-10 relative bg-muted/30">
          <Logo />
        </div>
      </Content>
    </PageWithBreadcrumbs>
  )
}
