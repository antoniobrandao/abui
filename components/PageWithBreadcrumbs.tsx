import { cn } from "@/lib/utils"
interface PageWithBreadcrumbsProps {
  children: React.ReactNode
  className?: string
}

const PageWithBreadcrumbs = ({ children, className }: PageWithBreadcrumbsProps) => {
  return (
    <main className={cn("overflow-hidden border h-screen overflow-y-auto bg-background w-full", className)}>
      <div className="w-full">{children}</div>
    </main>
  )
}

export default PageWithBreadcrumbs
