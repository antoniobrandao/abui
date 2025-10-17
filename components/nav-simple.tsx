"use client"

import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavItemsSet } from "./nav-types"

export function NavSimple({ items, label, pathname }: { items: NavItemsSet[]; label: string; pathname: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
            >
              <a href={item.url}>
                {item.icon && <item.icon className={pathname === item.url ? "text-foreground" : ""} />}
                <span className={pathname === item.url ? "text-foreground font-semibold" : ""}>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
