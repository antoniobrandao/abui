"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import Content from "@/components/custom/Content"
import {
  CalendarYear,
  CalendarYearContent,
  CalendarYearMonth,
  CalendarYearWeekdayHeader,
  CalendarYearWeek,
  CalendarYearDay,
  generateYearCalendar,
} from "@/registry/abui/ui/calendar-year"
import dayjs from "dayjs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CalendarYearExample() {
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

  // Helper to get day state based on business logic
  const getDayState = (date: string) => {
    const isHoliday = bookedHolidays.includes(date)
    const openingDay = !isWeekendDay(date)
    return isHoliday ? "active" : !openingDay ? "blocked" : "default"
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

  return (
    <div>
      <Content>
        <div className="flex gap-2 text-sm items-center w-full">
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => setYear(year - 1)}>
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => setYear(year + 1)}>
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
    </div>
  )
}
