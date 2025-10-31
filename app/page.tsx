import * as React from "react"
import { components, blocks, utils } from "@/components/components_and_blocks"
import registry from "@/registry.json"
import { Separator } from "@/components/ui/separator"
import { registryItemSchema } from "shadcn/schema"
import PageWithBreadcrumbs from "@/components/PageWithBreadcrumbs"
import Link from "next/link"

const getRegistryItemFromJson = React.cache((name: string) => {
  const registryItem = registry.items.find(item => item.name === name)

  const result = registryItemSchema.safeParse(registryItem)
  if (!result.success) {
    return null
  }

  return result.data
})

export default function Home() {
  return (
    <PageWithBreadcrumbs>
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-2xl font-bold">Components</h2>
          <Separator className="my-4" />
          <div className="grid grid-cols-3 gap-4">
            {components.map(component => {
              const registryItem = getRegistryItemFromJson(component.name)
              if (!registryItem) {
                return null
              }

              return (
                <div key={component.name} className="flex flex-col gap-1">
                  <Link href={`/components/${component.name}`} className="text-sm text-foreground hover:underline">
                    {registryItem.title}
                  </Link>
                  <span className="text-sm text-muted-foreground">{registryItem.description}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Blocks</h2>
          <Separator className="my-4" />
          <div className="grid grid-cols-3 gap-4">
            {blocks.map(block => {
              const registryItem = getRegistryItemFromJson(block.name)
              if (!registryItem) {
                return null
              }

              return (
                <div key={block.name} className="flex flex-col gap-1">
                  <Link href={`/blocks/${block.name}`} className="text-sm text-foreground hover:underline">
                    {registryItem.title}
                  </Link>
                  <span className="text-sm text-muted-foreground">{registryItem.description}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Utils</h2>
          <Separator className="my-4" />
          <div className="grid grid-cols-3 gap-4">
            {utils.map(util => {
              const registryItem = getRegistryItemFromJson(util.name)
              if (!registryItem) {
                return null
              }

              return (
                <div key={util.name} className="flex flex-col gap-1">
                  <Link href={`/utils/${util.name}`} className="text-sm text-foreground hover:underline">
                    {registryItem.title}
                  </Link>
                  <span className="text-sm text-muted-foreground">{registryItem.description}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </PageWithBreadcrumbs>
  )
}
