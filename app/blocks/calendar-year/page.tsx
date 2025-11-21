"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import {
  CalendarYear,
  CalendarYearContent,
  CalendarYearMonth,
  CalendarYearWeekdayHeader,
  CalendarYearWeek,
  CalendarYearDay,
  generateYearCalendar,
} from "@/registry/abui/ui/calendar-year"
import { exampleCodeString } from "./exampleCodeString"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sourceCodeString } from "./sourceCodeString"
import dayjs from "dayjs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const blockName = "calendar-year"

export default function Page() {
  const registryItem = getRegistryItemFromJson(blockName)
  const currentYear = dayjs().year()
  const [year, setYear] = useState<number>(currentYear)
  const [bookedHolidays, setBookedHolidays] = useState<string[]>([])

  const handleDayClick = (date: string) => {
    if (bookedHolidays.includes(date)) {
      setBookedHolidays(bookedHolidays.filter(d => d !== date))
    } else {
      setBookedHolidays([...bookedHolidays, date])
    }
  }

  // Generate calendar structure for the year
  const calendar = useMemo(() => {
    return generateYearCalendar(year)
  }, [year])

  const isWeekendDay = (date: string) => {
    return dayjs(date).day() === 0 || dayjs(date).day() === 6
  }

  // Helper to get day variant based on business logic
  const getDayVariant = (date: string) => {
    if (isWeekendDay(date)) return "outline-destructive"
    if (bookedHolidays.includes(date)) return "default"
    return "outline"
  }

  // Helper to get day state (blocked or disabled)
  const getDayState = (date: string) => {
    const openingDay = !isWeekendDay(date)
    return !openingDay ? "blocked" : undefined
  }

  // Helper to check if day is disabled
  const isDayDisabled = (date: string) => {
    return dayjs(date).isBefore(dayjs().startOf("day"))
  }

  // Helper to get tooltip
  const getDayTooltip = (date: string) => {
    const isHoliday = bookedHolidays.includes(date)
    const openingDay = !isWeekendDay(date)
    const isPast = isDayDisabled(date)

    if (isPast) return "Past ⏳"
    if (isHoliday) return "Holidays 🏝️"
    if (!openingDay) return "Closed 🚪"
    return "Open"
  }

  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <div>
      <RegistryItemHeader
        registryItem={registryItem}
        source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/ui/calendar-year.tsx"
      />
      <Content>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-2xl font-bold">Calendar Year</h2>
          <p className="text-muted-foreground">A calendar year component with a grid of days and months.</p>
          <p className="text-muted-foreground">
            An optional &quot;scrollToCurrentMonth&quot; prop can be used to make it automatically scroll to the current
            month upon loading.
          </p>
        </div>
        <div className="flex gap-2 text-sm items-center bg-muted dark:bg-muted/50 px-4 py-3 rounded-full">
          <Button variant="outline" size="icon" className="rounded-full w-8 h-8" onClick={() => setYear(year - 1)}>
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full w-8 h-8" onClick={() => setYear(year + 1)}>
            <ChevronRight />
          </Button>
          <p className="text-muted-foreground text-lg">
            Year: <span className="text-foreground">{year}</span>
          </p>
        </div>
        <CalendarYear className="h-[50vh]">
          <CalendarYearContent scrollToCurrentMonth={true}>
            {calendar.map(month => (
              <CalendarYearMonth key={month.monthIndex} name={month.name} monthIndex={month.monthIndex}>
                <CalendarYearWeekdayHeader labels={month.weekdayLabels} />
                {month.rows.map((row, rowIndex) => (
                  <CalendarYearWeek key={rowIndex}>
                    {row.map((day, dayIndex) =>
                      day ? (
                        <CalendarYearDay
                          key={day.date}
                          date={day.date}
                          variant={getDayVariant(day.date)}
                          state={getDayState(day.date)}
                          disabled={isDayDisabled(day.date)}
                          tooltip={getDayTooltip(day.date)}
                          onClick={getDayState(day.date) !== "blocked" ? () => handleDayClick(day.date) : undefined}
                        />
                      ) : (
                        <div key={`empty-${rowIndex}-${dayIndex}`} />
                      ),
                    )}
                  </CalendarYearWeek>
                ))}
              </CalendarYearMonth>
            ))}
          </CalendarYearContent>
        </CalendarYear>
      </Content>
      <Content>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="example">Example implementation</TabsTrigger>
            <TabsTrigger value="code">Source code</TabsTrigger>
          </TabsList>
          <TabsContent value="example">
            <CodeBlockComponent
              className="max-h-[300px] overflow-y-auto"
              code={[
                {
                  language: "tsx",
                  filename: "example-implementation.tsx",
                  code: exampleCodeString,
                },
              ]}
            />
          </TabsContent>
          <TabsContent value="code">
            <CodeBlockComponent
              className="max-h-[300px] overflow-y-auto"
              code={[
                {
                  language: "tsx",
                  filename: "source-code.tsx",
                  code: sourceCodeString,
                },
              ]}
            />
          </TabsContent>
        </Tabs>
      </Content>

      <Content>
        <div className="flex flex-col gap-6 w-full">
          <div>
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="space-y-2 text-muted-foreground text-sm list-inside list-disc">
              <li>Full year calendar view with month-by-month layout</li>
              <li>Composable architecture with separate components for months, weeks, and days</li>
              <li>Multiple day variants (default, outline, destructive, accent, success, and more)</li>
              <li>Automatic calendar generation with timezone support</li>
              <li>Optional auto-scroll to current month on mount</li>
              <li>Support for blocked, disabled, and custom day states</li>
              <li>Integrated tooltips for day information</li>
              <li>Today indicator with ring highlight</li>
              <li>Customizable click handlers for each day</li>
              <li>Built with dayjs for robust date handling</li>
              <li>Fully typed with TypeScript</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">CalendarYear</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">CalendarYearContent</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">scrollToCurrentMonth</code> - boolean -
                    Automatically scroll to current month (default: false)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">timezone</code> - string - Timezone for date
                    calculations (default: &quot;Europe/Lisbon&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">CalendarYearMonth</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">name</code> - string (required) - Month name
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">monthIndex</code> - number (required) - Month index
                    (0-11)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">CalendarYearWeekdayHeader</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">labels</code> - string[] (required) - Array of
                    weekday labels
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">CalendarYearWeek</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">CalendarYearDay</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">date</code> - string (required) - Date in
                    YYYY-MM-DD format
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">state</code> - &quot;blocked&quot; |
                    &quot;disabled&quot; - Day state
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">variant</code> - &quot;default&quot; |
                    &quot;default-success&quot; | &quot;accent&quot; | &quot;destructive&quot; | &quot;outline&quot; |
                    &quot;outline-destructive&quot; | &quot;outline-accent&quot; | &quot;outline-success&quot; |
                    &quot;secondary&quot; | &quot;ghost&quot; (default: &quot;outline&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">disabled</code> - boolean - Whether the day is
                    disabled
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">tooltip</code> - string - Tooltip text for the day
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">timezone</code> - string - Timezone for date
                    calculations (default: &quot;Europe/Lisbon&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">onClick</code> - () =&gt; void - Click handler
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Helper Function</h2>
            <div className="space-y-2">
              <h3 className="font-mono text-sm font-medium">generateYearCalendar(year, timezone?)</h3>
              <p className="text-muted-foreground text-sm">
                Utility function to generate calendar structure for a full year. Returns an array of months with rows of
                days.
              </p>
              <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                <li>
                  <code className="bg-muted rounded px-1.5 py-0.5">year</code> - number (required) - Year to generate
                  calendar for
                </li>
                <li>
                  <code className="bg-muted rounded px-1.5 py-0.5">timezone</code> - string - Timezone for calculations
                  (default: &quot;Europe/Lisbon&quot;)
                </li>
                <li>Returns: CalendarMonth[] - Array of month structures with date information</li>
              </ul>
            </div>
          </div>
        </div>
      </Content>
    </div>
  )
}
