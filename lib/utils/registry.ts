import * as React from "react"
import registry from "@/registry.json"
import { registryItemSchema } from "shadcn/schema"

export const getRegistryItemFromJson = React.cache((name: string) => {
  const registryItem = registry.items.find(item => item.name === name)

  const result = registryItemSchema.safeParse(registryItem)
  if (!result.success) {
    return null
  }

  return result.data
})
