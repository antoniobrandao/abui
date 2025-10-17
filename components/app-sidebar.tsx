"use client"

import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"
import navItems from "@/lib/constants/nav/nav-items"
import { usePathname } from "next/navigation"
import { Logo } from "@/registry/abui/branding/logo"
import { NavBase } from "@/components/nav-base"
import { NavSimple } from "@/components/nav-simple"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar()
  const pathname = usePathname()
  console.log("pathname", pathname)
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
                <p className="truncate text-lg ml-2 font-semibold">ABUI</p>
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
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
