import { Button } from "@/components/ui/button"
import { SidebarIcon } from "lucide-react"

const SidebarToggle = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  return (
    <Button
      variant="secondary"
      size="icon"
      className="size-8 lg:hidden"
      onClick={() => setOpen(!open)}
      aria-label="Toggle sidebar"
    >
      <SidebarIcon />
    </Button>
  )
}

export default SidebarToggle
