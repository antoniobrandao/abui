import { LucideIcon } from "lucide-react"

export interface ItemsSet {
  name: string
  url: string
  icon?: LucideIcon
  description?: string
}

export interface NavItems {
  main: ItemsSet[]
  components: ItemsSet[]
  utils: ItemsSet[]
  blocks: ItemsSet[]
}
