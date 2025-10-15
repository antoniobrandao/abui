import { Logo } from "@/registry/abui/branding/logo"
import { MainNav } from "@/registry/abui/navigation/main-nav"
import { Button } from "@/components/ui/button"
import { CommandSearch } from "@/components/search"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { Github } from "lucide-react"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold sm:inline-block text-lg uppercase">ABUI</span>
          </Link>
          <MainNav />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandSearch />
          </div>
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/shadcn-ui/ui"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <ThemeToggle />
            <Separator orientation="vertical" className="h-6" />
            <Button asChild>
              <Link href="/docs">Get Started</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
