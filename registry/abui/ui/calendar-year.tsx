"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
dayjs.extend(timezone)
dayjs.extend(utc)
// ============================================================================
// Types
// ============================================================================

/**
 * State of a calendar day
 */
export type DayState = "blocked" | "disabled"

/**
 * Day data structure
 */
export interface CalendarDay {
  date: string // YYYY-MM-DD format
  state?: DayState
  disabled?: boolean
  tooltip?: string
}

/**
 * Month structure with rows of days
 */
export interface CalendarMonth {
  name: string
  monthIndex: number
  weekdayLabels: string[]
  rows: (CalendarDay | null)[][]
}

// ============================================================================
// Variants
// ============================================================================

const calendarYearDayVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative h-9 w-9 p-0",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background dark:text-background hover:bg-foreground/90 border border-foreground",
        "default-success":
          "bg-green-500 text-background hover:bg-green-600 hover:border-green-600 dark:hover:bg-green-400 dark:hover:border-green-400 border border-green-500",
        accent: "bg-accent text-background dark:text-background hover:bg-accent/90 border border-accent",
        destructive:
          "bg-destructive hover:!bg-destructive text-background focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 border border-destructive",
        outline:
          "border bg-background shadow-xs hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "outline-destructive": "border border-destructive bg-transparent shadow-xs text-destructive bg-transparent",
        "outline-accent": "border border-accent bg-transparent shadow-xs text-accent bg-transparent",
        "outline-success": "border border-green-500 bg-transparent shadow-xs text-green-500 bg-transparent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
)

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate calendar structure for a year
 * Uses dayjs locale for month and weekday names
 *
 * @param year - Year to generate calendar for
 * @param timezone - Timezone for date calculations (default: "Europe/Lisbon")
 * @returns Array of months with rows of days (dates only, no state)
 */
export function generateYearCalendar(year: number, timezone: string = "Europe/Lisbon"): CalendarMonth[] {
  const months: CalendarMonth[] = []

  // Get weekday labels (Monday to Sunday) using dayjs locale
  const weekdayLabels: string[] = []
  const weekDaysIndexes = [1, 2, 3, 4, 5, 6, 0] // Mon-Sun
  for (const dayIndex of weekDaysIndexes) {
    // Create a date that falls on this weekday
    const sampleDate = dayjs().tz(timezone).day(dayIndex)
    const dayName = sampleDate.format("dddd")
    // Capitalize first letter
    weekdayLabels.push(dayName.charAt(0).toUpperCase() + dayName.slice(1))
  }

  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    const firstDayOfMonth = dayjs().tz(timezone).year(year).month(monthIndex).date(1)
    const monthName = firstDayOfMonth.format("MMMM")
    // Capitalize first letter
    const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1)
    const daysInMonth = firstDayOfMonth.daysInMonth()
    const monthDays: CalendarDay[] = []

    // Generate all days for this month (just dates, no business logic)
    for (let day = 1; day <= daysInMonth; day++) {
      const date = dayjs().tz(timezone).year(year).month(monthIndex).date(day).format("YYYY-MM-DD")

      monthDays.push({
        date,
        state: undefined,
        disabled: false,
        tooltip: undefined,
      })
    }

    // Organize days into rows (weeks)
    const rows: (CalendarDay | null)[][] = []
    const monthDaysClone = [...monthDays]

    while (monthDaysClone.length > 0) {
      const newRow: (CalendarDay | null)[] = []
      for (const dayIndex of weekDaysIndexes) {
        const testingDay = monthDaysClone[0]
        if (testingDay && dayjs(testingDay.date).tz(timezone).day() === dayIndex) {
          newRow.push(testingDay)
          monthDaysClone.shift()
        } else {
          newRow.push(null)
        }
      }
      rows.push(newRow)
    }

    months.push({
      name: capitalizedMonthName,
      monthIndex,
      weekdayLabels,
      rows,
    })
  }

  return months
}

/**
 * Check if a date is today
 */
const isDateToday = (date: string, timezone: string): boolean => {
  return dayjs(date).tz(timezone).isSame(dayjs().tz(timezone), "day")
}

// ============================================================================
// Root Component (Container)
// ============================================================================

function CalendarYear({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="calendar-year" className={cn("flex h-full w-full flex-col", className)} {...props}>
      {children}
    </div>
  )
}

// ============================================================================
// Content Component (Scrollable Container)
// ============================================================================

interface CalendarYearContentProps extends React.ComponentProps<"div"> {
  scrollToCurrentMonth?: boolean
  timezone?: string
}

function CalendarYearContent({
  scrollToCurrentMonth = false,
  timezone = "Europe/Lisbon",
  className,
  children,
  ...props
}: CalendarYearContentProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [hasScrolled, setHasScrolled] = React.useState(false)

  React.useEffect(() => {
    if (scrollToCurrentMonth && !hasScrolled && scrollContainerRef.current) {
      const currentMonth = dayjs().tz(timezone).month()
      const monthClass = `calendar-month-${currentMonth}`
      const element = scrollContainerRef.current.querySelector(`.${monthClass}`)

      if (element) {
        element.scrollIntoView({ behavior: "instant", block: "start" })
        setHasScrolled(true)
      }
    }
  }, [scrollToCurrentMonth, hasScrolled, timezone])

  return (
    <div
      ref={scrollContainerRef}
      data-slot="calendar-year-content"
      className={cn(
        "flex flex-col gap-12 overflow-y-auto",
        "transition-opacity duration-300",
        scrollToCurrentMonth && !hasScrolled && "opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// Month Component
// ============================================================================

interface CalendarYearMonthProps extends React.ComponentProps<"div"> {
  name: string
  monthIndex: number
}

function CalendarYearMonth({ name, monthIndex, className, children, ...props }: CalendarYearMonthProps) {
  return (
    <div
      data-slot="calendar-month"
      className={cn(`calendar-month-${monthIndex} flex flex-col gap-3`, className)}
      {...props}
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      {children}
    </div>
  )
}

// ============================================================================
// Weekday Header Component
// ============================================================================

interface CalendarYearWeekdayHeaderProps extends Omit<React.ComponentProps<"div">, "children"> {
  labels: string[]
}

function CalendarYearWeekdayHeader({ labels, className, ...props }: CalendarYearWeekdayHeaderProps) {
  return (
    <div
      data-slot="calendar-weekday-header"
      className={cn("grid grid-cols-7 gap-2 border-b pb-2 mb-2 border-border", className)}
      {...props}
    >
      {labels.map((label, i) => (
        <p key={i} className="text-sm text-muted-foreground text-left truncate">
          {label}
        </p>
      ))}
    </div>
  )
}

// ============================================================================
// Week Component
// ============================================================================

function CalendarYearWeek({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="calendar-week" className={cn("grid grid-cols-7 gap-2", className)} {...props}>
      {children}
    </div>
  )
}

// ============================================================================
// Day Component
// ============================================================================

interface CalendarYearDayProps extends Omit<React.ComponentProps<"button">, "children"> {
  date: string
  state?: DayState
  variant?: VariantProps<typeof calendarYearDayVariants>["variant"]
  disabled?: boolean
  tooltip?: string
  timezone?: string
  asChild?: boolean
}

const CalendarYearDay = React.forwardRef<HTMLButtonElement, CalendarYearDayProps>(
  (
    {
      date,
      state,
      variant = "outline",
      disabled = false,
      tooltip,
      timezone = "Europe/Lisbon",
      className,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const dayNumber = dayjs(date).tz(timezone).format("DD")
    const isToday = isDateToday(date, timezone)
    const Comp = asChild ? Slot : "button"

    // Handle blocked state (not disabled but not clickable)
    const isBlocked = state === "blocked"
    const isDisabled = disabled || state === "disabled"

    const buttonContent = (
      <Comp
        ref={ref}
        data-slot="calendar-day"
        data-state={state}
        data-today={isToday}
        data-disabled={isDisabled}
        data-blocked={isBlocked}
        type="button"
        disabled={isDisabled}
        className={cn(
          calendarYearDayVariants({ variant, className }),

          // Blocked state (red) - not-allowed cursor, no hover effects
          // "data-[blocked=true]:!bg-background data-[blocked=true]:!text-destructive data-[blocked=true]:!border-destructive",
          "data-[blocked=true]:!cursor-not-allowed",

          // Today indicator
          "data-[today=true]:ring-4 data-[today=true]:ring-accent data-[today=true]:ring-offset-[0.5px]",
        )}
        {...props}
      >
        {dayNumber}
      </Comp>
    )

    if (!isDisabled && !isBlocked && tooltip) {
      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return buttonContent
  },
)
CalendarYearDay.displayName = "CalendarYearDay"

// ============================================================================
// Exports
// ============================================================================

export {
  CalendarYear,
  CalendarYearContent,
  CalendarYearMonth,
  CalendarYearWeekdayHeader,
  CalendarYearWeek,
  CalendarYearDay,
  calendarYearDayVariants,
}
