"use client"

import * as React from "react"
import { getNavItemsFromRegistry } from "@/lib/utils/nav-from-registry"
import { usePathname } from "next/navigation"
import { Logo } from "@/registry/abui/branding/logo"
import { NavBase } from "@/components/nav-base-b"

export function AppSidebar() {
  // const { open } = useSidebar()
  const pathname = usePathname()
  const navItems = getNavItemsFromRegistry()

  return (
    <div className="p-4 flex flex-col gap-6 border-r sticky top-0 h-screen items-start justify-start">
      <div className="flex items-center text-left text-sm leading-tight mb-4">
        <Logo />
        <p className="truncate text-lg ml-2 font-bold">ABUI</p>
      </div>
      <NavBase items={navItems.main} pathname={pathname} />
      <NavBase items={navItems.components} label="Components" pathname={pathname} />
      <NavBase items={navItems.blocks} label="Blocks" pathname={pathname} />
      <NavBase items={navItems.utils} label="Utils" pathname={pathname} />
    </div>
  )
}
