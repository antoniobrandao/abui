import { LucideIcon } from "lucide-react"

export interface NavItemsSet {
  name: string
  url: string
  icon?: LucideIcon
}

export interface NavItems {
  main: NavItemsSet[]
  components: NavItemsSet[]
  blocks: NavItemsSet[]
}
