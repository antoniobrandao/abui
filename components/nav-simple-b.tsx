"use client"

import Link from "next/link"
import { NavItemsSet } from "./nav-types"
import { cn } from "@/lib/utils"

export function NavSimple({ items, label, pathname }: { items: NavItemsSet[]; label: string; pathname: string }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <p className="text-xs uppercase font-normal mb-2 text-muted-foreground">{label}</p>}
      {items.map(item => (
        <Link href={item.url} key={item.name}>
          <p className={cn("text-sm", pathname === item.url ? "text-accent" : "text-foreground")}>{item.name}</p>
        </Link>
      ))}
    </div>
  )
}
