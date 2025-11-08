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
      <RegistryItemHeader registryItem={registryItem} />
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
    </div>
  )
}
