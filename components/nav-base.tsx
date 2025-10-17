"use client"

// import { type LucideIcon } from "lucide-react"

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { NavItemsSet } from "./nav-types"

export function NavBase({ items, pathname }: { items: NavItemsSet[]; pathname: string }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map(item => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              // className={pathname === item.url ? "border-l-2 border-foreground !bg-sidebar-accent" : ""}
            >
              <a href={item.url}>
                {/* {item.icon && <item.icon className={pathname === item.url ? "text-foreground" : ""} />} */}
                <span className={pathname === item.url ? "text-foreground font-semibold" : ""}>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
