"use client"

import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { AppSidebar } from "@/components/app-sidebar"
import SidebarToggle from "@/app/sidebar-toggle"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { getSidebarContent } from "@/lib/utils/sidebar"

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const sidebarContent = getSidebarContent(pathname)
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" onClick={() => setOpen(false)}>
          <SheetHeader className="sr-only">
            <SheetTitle className="sr-only">ABUI</SheetTitle>
            <SheetDescription className="sr-only">Documentation</SheetDescription>
          </SheetHeader>
          {sidebarContent}
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
