import { getNavItemsFromRegistry } from "@/lib/utils/nav-from-registry"
import { Logo } from "@/registry/abui/branding/logo"
import { NavBase } from "@/components/nav-base-b"
import { Bird, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function getSidebarContent(pathname: string) {
  const navItems = getNavItemsFromRegistry()
  return (
    <div className="p-4 flex flex-col gap-6 border-r sticky top-0 h-screen items-start justify-start">
      <div className="flex items-center text-left text-sm leading-tight mb-4">
        <Logo />
        <p className="truncate text-sm ml-1.5 font-bold">ABUI</p>
      </div>
      <NavBase items={navItems.main} pathname={pathname} />
      <NavBase items={navItems.blocks} label="Blocks" pathname={pathname} />
      <NavBase items={navItems.components} label="Components" pathname={pathname} />
      <NavBase items={navItems.utils} label="Utils" pathname={pathname} />
      <div className="flex items-center gap-2">
        <Link href="https://github.com/antoniobrandao/abui" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="icon">
            <Github />
          </Button>
        </Link>
        <Link href="https://x.com/antonio_brandao" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="icon">
            <Bird />
          </Button>
        </Link>
      </div>
    </div>
  )
}
