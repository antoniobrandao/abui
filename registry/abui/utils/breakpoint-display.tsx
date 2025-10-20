"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const breakpointDisplayVariants = cva(
  "pointer-events-none select-none bg-foreground text-background px-2 py-1 z-50 rounded-b",
  {
    variants: {
      position: {
        fixed: "fixed top-0 right-[50%] translate-x-1/2",
        relative: "relative",
        absolute: "absolute top-0 right-[50%] translate-x-1/2",
      },
    },
    defaultVariants: {
      position: "fixed",
    },
  },
)

// Canonical ordering of breakpoints from smallest to largest
// This defines the semantic order - actual pixel values are defined in Tailwind config
const BREAKPOINT_ORDER = ["xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const

type BreakpointKey = (typeof BREAKPOINT_ORDER)[number]

// Map breakpoint keys to their display labels
const BREAKPOINT_LABELS: Record<BreakpointKey, string> = {
  xxs: "XXS",
  xs: "XS",
  sm: "SM",
  md: "MD",
  lg: "LG",
  xl: "XL",
  "2xl": "2XL",
  "3xl": "3XL",
}

// Default Tailwind breakpoints (standard v3/v4)
const DEFAULT_BREAKPOINTS: BreakpointKey[] = ["sm", "md", "lg", "xl", "2xl"]

interface BreakpointDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof breakpointDisplayVariants> {
  /**
   * Additional breakpoints to include beyond the default Tailwind breakpoints.
   * These will be automatically sorted by semantic order (xxs < xs < sm < md < lg < xl < 2xl < 3xl).
   * Actual pixel values are defined in your Tailwind configuration.
   * @example extraBreakpoints={["xxs", "xs", "3xl"]}
   */
  extraBreakpoints?: BreakpointKey[]
}

function BreakpointDisplay({ className, position, extraBreakpoints = [], ...props }: BreakpointDisplayProps) {
  // Combine default and extra breakpoints, remove duplicates, and sort by semantic order
  const allBreakpoints = React.useMemo(() => {
    const combined = [...DEFAULT_BREAKPOINTS, ...extraBreakpoints]
    const unique = Array.from(new Set(combined))

    // Sort by their position in the canonical BREAKPOINT_ORDER array
    return unique.sort((a, b) => {
      return BREAKPOINT_ORDER.indexOf(a) - BREAKPOINT_ORDER.indexOf(b)
    })
  }, [extraBreakpoints])

  // Generate the display elements dynamically
  const breakpointElements = React.useMemo(() => {
    const elements: React.ReactNode[] = []

    // First element: show "Minimum" below the smallest breakpoint
    const firstBreakpoint = allBreakpoints[0]
    elements.push(
      <p key="minimum" className={cn("font-semibold block", `${firstBreakpoint}:hidden`)}>
        Minimum
      </p>,
    )

    // Middle elements: show each breakpoint between its range
    for (let i = 0; i < allBreakpoints.length - 1; i++) {
      const current = allBreakpoints[i]
      const next = allBreakpoints[i + 1]

      elements.push(
        <p key={current} className={cn("font-semibold hidden", `${current}:block`, `${next}:hidden`)}>
          {BREAKPOINT_LABELS[current]}
        </p>,
      )
    }

    // Last element: show largest breakpoint from its min-width up
    const lastBreakpoint = allBreakpoints[allBreakpoints.length - 1]
    elements.push(
      <p key={lastBreakpoint} className={cn("font-semibold hidden", `${lastBreakpoint}:block`)}>
        {BREAKPOINT_LABELS[lastBreakpoint]}
      </p>,
    )

    return elements
  }, [allBreakpoints])

  return (
    <div className={cn(breakpointDisplayVariants({ position }), className)} {...props}>
      {breakpointElements}
    </div>
  )
}

export { BreakpointDisplay, breakpointDisplayVariants }
export type { BreakpointDisplayProps, BreakpointKey }
