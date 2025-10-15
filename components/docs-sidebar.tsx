"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const sidebarItems = {
  "Getting Started": [
    {
      title: "Introduction",
      href: "/docs",
    },
    {
      title: "Installation", 
      href: "/docs/installation",
    },
  ],
  "Components": [
    {
      title: "Accordion",
      href: "/docs/components/accordion",
    },
    {
      title: "Alert",
      href: "/docs/components/alert",
    },
    {
      title: "Alert Dialog",
      href: "/docs/components/alert-dialog",
    },
    {
      title: "Aspect Ratio",
      href: "/docs/components/aspect-ratio",
    },
    {
      title: "Avatar",
      href: "/docs/components/avatar",
    },
    {
      title: "Badge",
      href: "/docs/components/badge",
    },
    {
      title: "Breadcrumb",
      href: "/docs/components/breadcrumb",
    },
    {
      title: "Button",
      href: "/docs/components/button",
    },
    {
      title: "Button Group",
      href: "/docs/components/button-group",
    },
    {
      title: "Calendar",
      href: "/docs/components/calendar",
    },
    {
      title: "Card",
      href: "/docs/components/card",
    },
    {
      title: "Carousel",
      href: "/docs/components/carousel",
    },
    {
      title: "Chart",
      href: "/docs/components/chart",
    },
    {
      title: "Checkbox",
      href: "/docs/components/checkbox",
    },
    {
      title: "Collapsible",
      href: "/docs/components/collapsible",
    },
    {
      title: "Combobox",
      href: "/docs/components/combobox",
    },
    {
      title: "Command",
      href: "/docs/components/command",
    },
    {
      title: "Context Menu",
      href: "/docs/components/context-menu",
    },
    {
      title: "Data Table",
      href: "/docs/components/data-table",
    },
    {
      title: "Date Picker",
      href: "/docs/components/date-picker",
    },
    {
      title: "Dialog",
      href: "/docs/components/dialog",
    },
    {
      title: "Drawer",
      href: "/docs/components/drawer",
    },
    {
      title: "Input",
      href: "/docs/components/input",
    },
    {
      title: "Label",
      href: "/docs/components/label",
    },
    {
      title: "Popover",
      href: "/docs/components/popover",
    },
    {
      title: "Separator",
      href: "/docs/components/separator",
    },
    {
      title: "Textarea",
      href: "/docs/components/textarea",
    },
  ],
  "Blocks": [
    {
      title: "Hero",
      href: "/docs/blocks/hero",
    },
    {
      title: "Login Form",
      href: "/docs/blocks/login-form",
    },
    {
      title: "Booking Form",
      href: "/docs/blocks/booking-form",
    },
    {
      title: "Contact Form",
      href: "/docs/blocks/contact-form",
    },
    {
      title: "Listing Card",
      href: "/docs/blocks/listing-card",
    },
    {
      title: "Listing Grid",
      href: "/docs/blocks/listing-grid",
    },
  ],
}

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
      <div className="w-full">
        {Object.entries(sidebarItems).map(([section, items], index) => (
          <div key={section} className="pb-4">
            <div className="flex items-center justify-between">
              <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                {section}
              </h4>
              {section === "Components" && (
                <Badge variant="secondary" className="text-xs">
                  {items.length}
                </Badge>
              )}
              {section === "Blocks" && (
                <Badge variant="secondary" className="text-xs">
                  {items.length}
                </Badge>
              )}
            </div>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                    pathname === item.href
                      ? "font-medium text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            {index < Object.entries(sidebarItems).length - 1 && (
              <Separator className="my-4" />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}