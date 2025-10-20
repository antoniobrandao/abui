import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  className?: string
  children: React.ReactNode
}

const DashboardHeader = ({ className, children }: DashboardHeaderProps) => (
  <header
    className={cn(
      "sticky top-0 z-10",
      "flex flex-col gap-3",
      "md:flex-row",
      "items-start",
      "md:items-center",
      "md:justify-between",
      "!bg-sidebar/80 dark:bg-zinc-900/80",
      "border-b",
      "border-zinc-200 dark:border-zinc-800",
      "backdrop-blur-sm",
      "p-6",
      className,
    )}
  >
    {children}
  </header>
)

export default DashboardHeader
