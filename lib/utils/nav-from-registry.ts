import { NavItems } from "@/components/nav-types"
import registryData from "../../registry.json"

interface RegistryItem {
  name: string
  type: string
  title?: string
  description?: string
  files?: unknown[]
}

/**
 * Generates navigation items dynamically from registry.json
 * Filters components (registry:component with files), utils (registry:component without files), and blocks (registry:block)
 */
export function getNavItemsFromRegistry(): NavItems {
  const items = registryData.items as RegistryItem[]

  const components = items
    .filter(item => item.type === "registry:component" && item.files)
    .map(item => ({
      name: item.title || item.name,
      url: `/components/${item.name}`,
    }))

  const utils = items
    .filter(item => item.type === "registry:component" && !item.files)
    .map(item => ({
      name: item.title || item.name,
      url: `/utils/${item.name}`,
    }))

  const blocks = items
    .filter(item => item.type === "registry:block" && item.name !== "logo")
    .map(item => ({
      name: item.title || item.name,
      url: `/blocks/${item.name}`,
    }))

  return {
    main: [
      {
        name: "Overview",
        url: "/",
      },
    ],
    components,
    utils,
    blocks,
  }
}
