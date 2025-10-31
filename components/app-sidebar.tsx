"use client"

import * as React from "react"
// import { GalleryVerticalEnd } from "lucide-react"
import { getNavItemsFromRegistry } from "@/lib/utils/nav-from-registry"
import { usePathname } from "next/navigation"
import { Logo } from "@/registry/abui/branding/logo"
import { NavBase } from "@/components/nav-base"
import { NavSimple } from "@/components/nav-simple"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export function AppSidebar() {
  const { open } = useSidebar()
  const pathname = usePathname()
  const navItems = getNavItemsFromRegistry()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="!bg-transparent data-[state=open]:text-sidebar-accent-foreground">
              {!open && (
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary/5 text-sidebar-primary-foreground">
                  <Logo />
                </div>
              )}
              <div className="flex items-center flex-1 text-left text-sm leading-tight">
                <Logo />
                <p className="truncate text-lg ml-2 font-bold">ABUI</p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <ModeToggle />
      </SidebarHeader>
      <SidebarContent>
        <NavBase items={navItems.main} pathname={pathname} />
        <NavSimple items={navItems.components} label="Components" pathname={pathname} />
        <NavSimple items={navItems.blocks} label="Blocks" pathname={pathname} />
        <NavSimple items={navItems.utils} label="Utils" pathname={pathname} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
