"use client"

import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { AppSidebar } from "@/components/app-sidebar"
import SidebarToggle from "@/app/sidebar-toggle"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { getNavItemsFromRegistry } from "@/lib/utils/nav-from-registry"
import { usePathname } from "next/navigation"
import { Logo } from "@/registry/abui/branding/logo"
import { NavBase } from "@/components/nav-base-b"

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const navItems = getNavItemsFromRegistry()
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" onClick={() => setOpen(false)}>
          <SheetHeader className="sr-only">
            <SheetTitle className="sr-only">ABUI</SheetTitle>
            <SheetDescription className="sr-only">Documentation</SheetDescription>
          </SheetHeader>
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
        </SheetContent>
      </Sheet>
      <div className="flex w-screen">
        <AppSidebar />
        <div className="w-full lg:w-[calc(100%-240px)]">{children}</div>
      </div>
      <div className="fixed top-4 right-4 z-50 gap-2 flex items-center">
        <ModeToggle />
        <SidebarToggle open={open} setOpen={setOpen} />
      </div>
    </>
  )
}

export default ClientLayout
