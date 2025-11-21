import { usePathname } from "next/navigation"
import { getSidebarContent } from "@/lib/utils/sidebar"

export function AppSidebar() {
  const pathname = usePathname()
  const sidebarContent = getSidebarContent(pathname)

  return <div className="w-[240px] relative hidden lg:block">{sidebarContent}</div>
}
