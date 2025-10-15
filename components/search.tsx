"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const searchItems = [
  {
    title: "Introduction",
    href: "/docs",
    description: "Welcome to Abui - A custom UI component registry"
  },
  {
    title: "Installation",
    href: "/docs/installation",
    description: "How to install and configure Abui components"
  },
  {
    title: "Button",
    href: "/docs/components/button",
    description: "Displays a button or a component that looks like a button"
  },
  {
    title: "Card",
    href: "/docs/components/card",
    description: "A card with header, content, and footer"
  },
  {
    title: "Input",
    href: "/docs/components/input",
    description: "Displays a form input field"
  },
  {
    title: "Hero Section",
    href: "/docs/blocks/hero",
    description: "A hero section with call to action"
  },
  {
    title: "Login Form",
    href: "/docs/blocks/login-form",
    description: "A complete login form with validation"
  },
]

export function CommandSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search documentation...
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Getting Started">
            {searchItems.filter(item => item.href.includes('docs') && !item.href.includes('components') && !item.href.includes('blocks')).map((item) => (
              <CommandItem
                key={item.href}
                value={item.title}
                onSelect={() => {
                  runCommand(() => router.push(item.href))
                }}
              >
                <div className="flex flex-col">
                  <span>{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Components">
            {searchItems.filter(item => item.href.includes('components')).map((item) => (
              <CommandItem
                key={item.href}
                value={item.title}
                onSelect={() => {
                  runCommand(() => router.push(item.href))
                }}
              >
                <div className="flex flex-col">
                  <span>{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Blocks">
            {searchItems.filter(item => item.href.includes('blocks')).map((item) => (
              <CommandItem
                key={item.href}
                value={item.title}
                onSelect={() => {
                  runCommand(() => router.push(item.href))
                }}
              >
                <div className="flex flex-col">
                  <span>{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}