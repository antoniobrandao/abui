export const sourceCodeString = `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"

// ============================================================================
// Types
// ============================================================================

/**
 * State of a calendar day
 */
export type DayState = "default" | "selected" | "partial" | "blocked" | "active"

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
// Utility Functions
// ============================================================================

/**
 * Generate calendar structure for a year
 * Uses dayjs locale for month and weekday names
 *
 * @param year - Year to generate calendar for
 * @returns Array of months with rows of days (dates only, no state)
 */
export function generateYearCalendar(year: number): CalendarMonth[] {
  const months: CalendarMonth[] = []

  // Get weekday labels (Monday to Sunday) using dayjs locale
  const weekdayLabels: string[] = []
  const weekDaysIndexes = [1, 2, 3, 4, 5, 6, 0] // Mon-Sun
  for (const dayIndex of weekDaysIndexes) {
    // Create a date that falls on this weekday
    const sampleDate = dayjs().day(dayIndex)
    const dayName = sampleDate.format("dddd")
    // Capitalize first letter
    weekdayLabels.push(dayName.charAt(0).toUpperCase() + dayName.slice(1))
  }

  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    const firstDayOfMonth = dayjs().year(year).month(monthIndex).date(1)
    const monthName = firstDayOfMonth.format("MMMM")
    // Capitalize first letter
    const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1)
    const daysInMonth = firstDayOfMonth.daysInMonth()
    const monthDays: CalendarDay[] = []

    // Generate all days for this month (just dates, no business logic)
    for (let day = 1; day <= daysInMonth; day++) {
      const date = dayjs().year(year).month(monthIndex).date(day).format("YYYY-MM-DD")

      monthDays.push({
        date,
        state: "default",
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
        if (testingDay && dayjs(testingDay.date).day() === dayIndex) {
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
const isDateToday = (date: string): boolean => {
  return dayjs(date).isSame(dayjs(), "day")
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
}

function CalendarYearContent({
  scrollToCurrentMonth = false,
  className,
  children,
  ...props
}: CalendarYearContentProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [hasScrolled, setHasScrolled] = React.useState(false)

  React.useEffect(() => {
    if (scrollToCurrentMonth && !hasScrolled && scrollContainerRef.current) {
      const currentMonth = dayjs().month()
      const monthClass = \`calendar-month-\${currentMonth}\`
      const element = scrollContainerRef.current.querySelector(.\`\${monthClass}\`)

      if (element) {
        element.scrollIntoView({ behavior: "instant", block: "start" })
        setHasScrolled(true)
      }
    }
  }, [scrollToCurrentMonth, hasScrolled])

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
      className={cn(\`calendar-month-\${monthIndex} flex flex-col gap-3\`, className)}
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
  disabled?: boolean
  tooltip?: string
}

const CalendarYearDay = React.forwardRef<HTMLButtonElement, CalendarYearDayProps>(
  ({ date, state = "default", disabled = false, tooltip, className, ...props }, ref) => {
    const dayNumber = dayjs(date).format("DD")
    const isToday = isDateToday(date)

    const buttonContent = (
      <Button
        ref={ref}
        data-slot="calendar-day"
        data-state={state}
        data-today={isToday}
        data-disabled={disabled}
        type="button"
        variant="outline"
        size="icon"
        disabled={disabled}
        className={cn(
          "relative h-9 w-9 p-0 font-semibold transition-all rounded-full",
          "hover:scale-105 active:scale-95",

          // Default state
          "data-[state=default]:bg-background data-[state=default]:text-foreground data-[state=default]:border-border",

          // Selected state (blue)
          "data-[state=selected]:!bg-blue-500 data-[state=selected]:!text-white data-[state=selected]:!border-blue-500",
          "data-[state=selected]:hover:!bg-blue-600 data-[state=selected]:hover:!border-blue-600",

          // Partial selection state (blue border and text)
          "data-[state=partial]:!bg-background data-[state=partial]:!text-blue-500 data-[state=partial]:!border-blue-500",
          "data-[state=partial]:hover:!bg-blue-50 dark:data-[state=partial]:hover:!bg-blue-950",

          // Blocked state (red) - not-allowed cursor, no hover effects
          "data-[state=blocked]:!bg-background data-[state=blocked]:!text-red-500 data-[state=blocked]:!border-red-500",
          "data-[state=blocked]:!cursor-not-allowed",
          "data-[state=blocked]:hover:!scale-100",

          // Active state (green) - holidays
          "data-[state=active]:!bg-green-500 data-[state=active]:!text-background data-[state=active]:!border-green-500",
          "data-[state=active]:hover:!bg-green-600 data-[state=active]:hover:!border-green-600",

          // Disabled state
          "data-[disabled=true]:opacity-30 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:pointer-events-none",
          "data-[disabled=true]:hover:scale-100",

          // Today indicator
          "data-[today=true]:ring-2 data-[today=true]:ring-primary data-[today=true]:ring-offset-2",

          className,
        )}
        {...props}
      >
        {dayNumber}
      </Button>
    )

    if (!disabled && tooltip) {
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
}
`
