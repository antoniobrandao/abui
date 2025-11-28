import { RegistryItem } from "shadcn/schema"
import { AddCommand } from "../add-command"
import { OpenInV0 } from "../open-in-v0"
import { Github } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

interface RegistryItemHeaderProps {
  registryItem: RegistryItem
  source?: string
}

export function RegistryItemHeader({ registryItem, source }: RegistryItemHeaderProps) {
  return (
    <div className="flex flex-col gap-4 items-start w-full p-6 border-b">
      <div className="flex flex-col items-start gap-2">
        <div className="text-sm line-clamp-1 font-medium">{registryItem.title}</div>
        <div className="text-sm text-muted-foreground line-clamp-1 hidden lg:flex">{registryItem.description}</div>
      </div>
      <div className="flex gap-2">
        <OpenInV0 name={registryItem.name} className="w-fit" />
        <AddCommand registryItem={registryItem} />
        {source && (
          <Link href={source} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <Github className="w-3 h-3" />
              Source
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
