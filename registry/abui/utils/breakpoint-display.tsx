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
  const activeBreakpoints = React.useMemo(() => {
    const combined = [...DEFAULT_BREAKPOINTS, ...extraBreakpoints]
    const unique = Array.from(new Set(combined))

    // Sort by their position in the canonical BREAKPOINT_ORDER array
    return unique.sort((a, b) => {
      return BREAKPOINT_ORDER.indexOf(a) - BREAKPOINT_ORDER.indexOf(b)
    })
  }, [extraBreakpoints])

  // Create a Set for O(1) lookup
  const activeSet = React.useMemo(() => new Set(activeBreakpoints), [activeBreakpoints])

  // Determine the first and last active breakpoints
  const firstBreakpoint = activeBreakpoints[0]
  const lastBreakpoint = activeBreakpoints[activeBreakpoints.length - 1]

  // Helper to check if a breakpoint is the next active one after current
  const getNextActiveBreakpoint = (current: BreakpointKey): BreakpointKey | null => {
    const currentIndex = BREAKPOINT_ORDER.indexOf(current)
    for (let i = currentIndex + 1; i < BREAKPOINT_ORDER.length; i++) {
      if (activeSet.has(BREAKPOINT_ORDER[i])) {
        return BREAKPOINT_ORDER[i]
      }
    }
    return null
  }

  return (
    <div className={cn(breakpointDisplayVariants({ position }), className)} {...props}>
      {/* Minimum - shows below the first breakpoint */}
      {firstBreakpoint === "xxs" && <p className="font-semibold block xxs:hidden">Minimum</p>}
      {firstBreakpoint === "xs" && <p className="font-semibold block xs:hidden">Minimum</p>}
      {firstBreakpoint === "sm" && <p className="font-semibold block sm:hidden">Minimum</p>}
      {firstBreakpoint === "md" && <p className="font-semibold block md:hidden">Minimum</p>}
      {firstBreakpoint === "lg" && <p className="font-semibold block lg:hidden">Minimum</p>}
      {firstBreakpoint === "xl" && <p className="font-semibold block xl:hidden">Minimum</p>}
      {firstBreakpoint === "2xl" && <p className="font-semibold block 2xl:hidden">Minimum</p>}
      {firstBreakpoint === "3xl" && <p className="font-semibold block 3xl:hidden">Minimum</p>}

      {/* XXS breakpoint */}
      {activeSet.has("xxs") && getNextActiveBreakpoint("xxs") === "xs" && (
        <p className="font-semibold hidden xxs:block xs:hidden">XXS</p>
      )}
      {activeSet.has("xxs") && getNextActiveBreakpoint("xxs") === "sm" && (
        <p className="font-semibold hidden xxs:block sm:hidden">XXS</p>
      )}
      {activeSet.has("xxs") && getNextActiveBreakpoint("xxs") === "md" && (
        <p className="font-semibold hidden xxs:block md:hidden">XXS</p>
      )}
      {activeSet.has("xxs") && getNextActiveBreakpoint("xxs") === "lg" && (
        <p className="font-semibold hidden xxs:block lg:hidden">XXS</p>
      )}
      {activeSet.has("xxs") && getNextActiveBreakpoint("xxs") === "xl" && (
        <p className="font-semibold hidden xxs:block xl:hidden">XXS</p>
      )}
      {activeSet.has("xxs") && getNextActiveBreakpoint("xxs") === "2xl" && (
        <p className="font-semibold hidden xxs:block 2xl:hidden">XXS</p>
      )}
      {activeSet.has("xxs") && getNextActiveBreakpoint("xxs") === "3xl" && (
        <p className="font-semibold hidden xxs:block 3xl:hidden">XXS</p>
      )}
      {activeSet.has("xxs") && lastBreakpoint === "xxs" && <p className="font-semibold hidden xxs:block">XXS</p>}

      {/* XS breakpoint */}
      {activeSet.has("xs") && getNextActiveBreakpoint("xs") === "sm" && (
        <p className="font-semibold hidden xs:block sm:hidden">XS</p>
      )}
      {activeSet.has("xs") && getNextActiveBreakpoint("xs") === "md" && (
        <p className="font-semibold hidden xs:block md:hidden">XS</p>
      )}
      {activeSet.has("xs") && getNextActiveBreakpoint("xs") === "lg" && (
        <p className="font-semibold hidden xs:block lg:hidden">XS</p>
      )}
      {activeSet.has("xs") && getNextActiveBreakpoint("xs") === "xl" && (
        <p className="font-semibold hidden xs:block xl:hidden">XS</p>
      )}
      {activeSet.has("xs") && getNextActiveBreakpoint("xs") === "2xl" && (
        <p className="font-semibold hidden xs:block 2xl:hidden">XS</p>
      )}
      {activeSet.has("xs") && getNextActiveBreakpoint("xs") === "3xl" && (
        <p className="font-semibold hidden xs:block 3xl:hidden">XS</p>
      )}
      {activeSet.has("xs") && lastBreakpoint === "xs" && <p className="font-semibold hidden xs:block">XS</p>}

      {/* SM breakpoint */}
      {activeSet.has("sm") && getNextActiveBreakpoint("sm") === "md" && (
        <p className="font-semibold hidden sm:block md:hidden">SM</p>
      )}
      {activeSet.has("sm") && getNextActiveBreakpoint("sm") === "lg" && (
        <p className="font-semibold hidden sm:block lg:hidden">SM</p>
      )}
      {activeSet.has("sm") && getNextActiveBreakpoint("sm") === "xl" && (
        <p className="font-semibold hidden sm:block xl:hidden">SM</p>
      )}
      {activeSet.has("sm") && getNextActiveBreakpoint("sm") === "2xl" && (
        <p className="font-semibold hidden sm:block 2xl:hidden">SM</p>
      )}
      {activeSet.has("sm") && getNextActiveBreakpoint("sm") === "3xl" && (
        <p className="font-semibold hidden sm:block 3xl:hidden">SM</p>
      )}
      {activeSet.has("sm") && lastBreakpoint === "sm" && <p className="font-semibold hidden sm:block">SM</p>}

      {/* MD breakpoint */}
      {activeSet.has("md") && getNextActiveBreakpoint("md") === "lg" && (
        <p className="font-semibold hidden md:block lg:hidden">MD</p>
      )}
      {activeSet.has("md") && getNextActiveBreakpoint("md") === "xl" && (
        <p className="font-semibold hidden md:block xl:hidden">MD</p>
      )}
      {activeSet.has("md") && getNextActiveBreakpoint("md") === "2xl" && (
        <p className="font-semibold hidden md:block 2xl:hidden">MD</p>
      )}
      {activeSet.has("md") && getNextActiveBreakpoint("md") === "3xl" && (
        <p className="font-semibold hidden md:block 3xl:hidden">MD</p>
      )}
      {activeSet.has("md") && lastBreakpoint === "md" && <p className="font-semibold hidden md:block">MD</p>}

      {/* LG breakpoint */}
      {activeSet.has("lg") && getNextActiveBreakpoint("lg") === "xl" && (
        <p className="font-semibold hidden lg:block xl:hidden">LG</p>
      )}
      {activeSet.has("lg") && getNextActiveBreakpoint("lg") === "2xl" && (
        <p className="font-semibold hidden lg:block 2xl:hidden">LG</p>
      )}
      {activeSet.has("lg") && getNextActiveBreakpoint("lg") === "3xl" && (
        <p className="font-semibold hidden lg:block 3xl:hidden">LG</p>
      )}
      {activeSet.has("lg") && lastBreakpoint === "lg" && <p className="font-semibold hidden lg:block">LG</p>}

      {/* XL breakpoint */}
      {activeSet.has("xl") && getNextActiveBreakpoint("xl") === "2xl" && (
        <p className="font-semibold hidden xl:block 2xl:hidden">XL</p>
      )}
      {activeSet.has("xl") && getNextActiveBreakpoint("xl") === "3xl" && (
        <p className="font-semibold hidden xl:block 3xl:hidden">XL</p>
      )}
      {activeSet.has("xl") && lastBreakpoint === "xl" && <p className="font-semibold hidden xl:block">XL</p>}

      {/* 2XL breakpoint */}
      {activeSet.has("2xl") && getNextActiveBreakpoint("2xl") === "3xl" && (
        <p className="font-semibold hidden 2xl:block 3xl:hidden">2XL</p>
      )}
      {activeSet.has("2xl") && lastBreakpoint === "2xl" && <p className="font-semibold hidden 2xl:block">2XL</p>}

      {/* 3XL breakpoint */}
      {activeSet.has("3xl") && lastBreakpoint === "3xl" && <p className="font-semibold hidden 3xl:block">3XL</p>}
    </div>
  )
}

export { BreakpointDisplay, breakpointDisplayVariants }
export type { BreakpointDisplayProps, BreakpointKey }
