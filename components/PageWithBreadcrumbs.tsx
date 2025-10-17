interface PageWithBreadcrumbsProps {
  children: React.ReactNode
}

const PageWithBreadcrumbs = ({ children }: PageWithBreadcrumbsProps) => {
  return (
    <main className="overflow-hidden border h-screen overflow-y-auto bg-background w-full">
      <div className="p-6 w-full">{children}</div>
    </main>
  )
}

export default PageWithBreadcrumbs
