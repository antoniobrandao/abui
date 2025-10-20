import { RegistryItem } from "shadcn/schema"
import { AddCommand } from "../add-command"
import { OpenInV0 } from "../open-in-v0"

interface RegistryItemHeaderProps {
  registryItem: RegistryItem
}

export function RegistryItemHeader({ registryItem }: RegistryItemHeaderProps) {
  return (
    <div className="flex flex-col gap-4 items-start w-full mb-10">
      <div className="flex flex-col items-start gap-2">
        <div className="text-sm line-clamp-1 font-medium">{registryItem.title}</div>
        <div className="text-sm text-muted-foreground line-clamp-1 hidden lg:flex">{registryItem.description}</div>
      </div>
      <div className="flex gap-2">
        <OpenInV0 name={registryItem.name} className="w-fit" />
        <AddCommand registryItem={registryItem} />
      </div>
    </div>
  )
}
