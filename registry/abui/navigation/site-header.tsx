import { Logo } from "@/registry/abui/branding/logo"
import { MainNav } from "@/registry/abui/navigation/main-nav"
import { Button } from "@/registry/abui/ui/button"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center mx-auto px-4 gap-4">
        <Link href="/">
          <Logo /> <span className="sr-only">Abui</span>
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center gap-4">
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  )
}
