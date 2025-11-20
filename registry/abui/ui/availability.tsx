"use client"

import * as React from "react"
import { Settings, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// --- Types ---

export interface TimeSpan {
  active?: boolean
  nanoid: string
  week_day: number // 0-6 - Sunday-Saturday
  start_time: string // "HH:mm"
  end_time: string // "HH:mm"
}

interface AvailabilityProps {
  value?: TimeSpan[]
  onValueChange?: (value: TimeSpan[]) => void
  days?: number[] // 0-6
  timeIncrements?: number // minutes, default 30
  startTime?: number // hour 0-23, default 7
  endTime?: number // hour 0-23, default 23
  useAmPm?: boolean
  className?: string
}

// --- Utils ---

const timeToMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number)
  return h * 60 + m
}

const minutesToTime = (minutes: number) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
}

const formatDisplayTime = (time: string, useAmPm: boolean) => {
  if (!useAmPm) return time
  const [h, m] = time.split(":").map(Number)
  const ampm = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 || 12
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`
}

const generateId = () => Math.random().toString(36).substring(2, 11)

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// --- Components ---

export function Availability({
  value = [],
  onValueChange,
  days = [0, 1, 2, 3, 4, 5, 6],
  timeIncrements = 30,
  startTime = 7,
  endTime = 23,
  useAmPm = false,
  className,
}: AvailabilityProps) {
  const [internalValue, setInternalValue] = React.useState<TimeSpan[]>(value)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Sync controlled/uncontrolled state
  React.useEffect(() => {
    setInternalValue(value)
  }, [value])

  const updateValue = (newValue: TimeSpan[]) => {
    setInternalValue(newValue)
    onValueChange?.(newValue)
  }

  const totalMinutes = (endTime - startTime) * 60
  const startOffset = startTime * 60

  // --- Handlers ---

  const handleResize = (id: string, newStart: string, newEnd: string) => {
    const newValue = internalValue.map(span => {
      if (span.nanoid === id) {
        return { ...span, start_time: newStart, end_time: newEnd }
      }
      return span
    })
    updateValue(newValue)
  }

  const handleCreate = (dayIndex: number, startMinutes: number, endMinutes: number) => {
    const newSpan: TimeSpan = {
      nanoid: generateId(),
      week_day: days[dayIndex],
      start_time: minutesToTime(startMinutes),
      end_time: minutesToTime(endMinutes),
      active: true,
    }
    updateValue([...internalValue, newSpan])
  }

  const handleDelete = (id: string) => {
    updateValue(internalValue.filter(s => s.nanoid !== id))
  }

  return (
    <div
      className={cn(
        "flex h-[600px] w-full flex-col overflow-hidden rounded-md border bg-background select-none",
        className,
      )}
      ref={containerRef}
    >
      {/* Header */}
      <div className="flex w-full border-b bg-muted/40">
        <div className="w-16 flex-shrink-0 border-r p-2 text-xs font-medium text-muted-foreground">
          {/* Time label column header */}
        </div>
        <div className="flex flex-1">
          {days.map(dayIndex => (
            <div key={dayIndex} className="flex-1 border-r px-2 py-3 text-center text-sm font-medium last:border-r-0">
              {DAYS[dayIndex]}
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-y-auto relative">
        {/* Time Labels */}
        <div className="w-16 flex-shrink-0 border-r bg-muted/10 flex flex-col">
          {Array.from({ length: endTime - startTime }).map((_, i) => {
            const hour = startTime + i
            return (
              <div
                key={hour}
                className="flex-1 border-b border-dashed border-muted-foreground/20 relative flex items-center justify-start pl-3"
              >
                <span className="text-xs text-muted-foreground">{formatDisplayTime(`${hour}:00`, useAmPm)}</span>
              </div>
            )
          })}
        </div>

        {/* Days Grid */}
        <div className="flex flex-1 relative">
          {/* Background Grid Lines - Matches exact structure of Time Labels */}
          <div className="absolute inset-0 pointer-events-none flex flex-col">
            {Array.from({ length: endTime - startTime }).map((_, i) => (
              <div key={i} className="flex-1 border-b border-dashed border-muted/20 w-full relative">
                {/* We can also add intermediate lines if needed for 30min increments, but let's stick to hours for now to match left column */}
              </div>
            ))}
          </div>

          {days.map((dayIndex, i) => (
            <DayColumn
              key={dayIndex}
              id={`day-${i}`}
              dayIndex={dayIndex}
              colIndex={i}
              startTime={startTime}
              endTime={endTime}
              timeIncrements={timeIncrements}
              events={internalValue.filter(e => e.week_day === dayIndex)}
              onCreate={handleCreate}
              onResize={handleResize}
              onDelete={handleDelete}
              useAmPm={useAmPm}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// --- Sub Components ---

interface DayColumnProps {
  id: string
  dayIndex: number
  colIndex: number
  startTime: number
  endTime: number
  timeIncrements: number
  events: TimeSpan[]
  onCreate: (dayIndex: number, start: number, end: number) => void
  onResize: (id: string, start: string, end: string) => void
  onDelete: (id: string) => void
  useAmPm: boolean
  isOverlay?: boolean
}

function DayColumn({
  id,
  dayIndex,
  colIndex,
  startTime,
  endTime,
  timeIncrements,
  events,
  onCreate,
  onResize,
  onDelete,
  useAmPm,
}: DayColumnProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isCreating, setIsCreating] = React.useState(false)
  const [creationStart, setCreationStart] = React.useState<number | null>(null)
  const [currentMouseY, setCurrentMouseY] = React.useState<number | null>(null)

  const totalMinutes = (endTime - startTime) * 60
  const startOffset = startTime * 60

  // Sort events by start time to determine constraints
  const sortedEvents = React.useMemo(() => {
    return [...events].sort((a, b) => timeToMinutes(a.start_time) - timeToMinutes(b.start_time))
  }, [events])

  const getMinutesFromY = (y: number) => {
    if (!containerRef.current) return 0
    const rect = containerRef.current.getBoundingClientRect()
    const relativeY = y - rect.top
    const percentage = Math.max(0, Math.min(1, relativeY / rect.height))
    const minutes = percentage * totalMinutes + startOffset
    return Math.round(minutes / timeIncrements) * timeIncrements
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return // Only trigger on empty space
    e.preventDefault() // Prevent text selection

    const startMins = getMinutesFromY(e.clientY)
    
    // Check strict overlap at start point
    const isOverlapping = sortedEvents.some(ev => {
        const s = timeToMinutes(ev.start_time)
        const e = timeToMinutes(ev.end_time)
        return startMins >= s && startMins < e
    })
    if (isOverlapping) return

    // Find constraint
    const nextEvent = sortedEvents.find(ev => timeToMinutes(ev.start_time) >= startMins)
    const maxEndMins = nextEvent ? timeToMinutes(nextEvent.start_time) : (endTime * 60)

    setCreationStart(startMins)
    // Init with increment, but clamp to maxEndMins
    setCurrentMouseY(Math.min(startMins + timeIncrements, maxEndMins))
    setIsCreating(true)

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const currentMins = getMinutesFromY(e.clientY)
      // Clamp currentMins to maxEndMins
      const clampedMins = Math.min(currentMins, maxEndMins)
      
      const newEnd = Math.max(clampedMins, startMins + timeIncrements)
      // But newEnd cannot exceed maxEndMins
      const finalNewEnd = Math.min(newEnd, maxEndMins)
      
      setCurrentMouseY(finalNewEnd)
    }

    const handleGlobalMouseUp = (e: MouseEvent) => {
      const currentMins = getMinutesFromY(e.clientY)
      const finalStart = startMins
      
      // Same clamping logic for end
      let finalEnd = Math.min(currentMins, maxEndMins)
      finalEnd = Math.max(finalEnd, finalStart + timeIncrements)
      finalEnd = Math.min(finalEnd, maxEndMins) // Re-clamp in case increment pushed it over

      // Click-to-create 1 hour logic
      if (finalEnd - finalStart <= timeIncrements) {
          // Try 1 hour
          const oneHourEnd = finalStart + 60
          finalEnd = Math.min(oneHourEnd, maxEndMins)
      }
      
      if (finalEnd > finalStart) {
          onCreate(colIndex, finalStart, finalEnd)
      }

      setIsCreating(false)
      setCreationStart(null)
      setCurrentMouseY(null)
      window.removeEventListener("mousemove", handleGlobalMouseMove)
      window.removeEventListener("mouseup", handleGlobalMouseUp)
    }

    window.addEventListener("mousemove", handleGlobalMouseMove)
    window.addEventListener("mouseup", handleGlobalMouseUp)
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 relative border-r last:border-r-0 min-w-[100px]"
      onMouseDown={handleMouseDown}
    >
      {sortedEvents.map((event, i) => {
        const prevEvent = sortedEvents[i - 1]
        const nextEvent = sortedEvents[i + 1]
        
        const minStart = prevEvent ? timeToMinutes(prevEvent.end_time) : startOffset
        const maxEnd = nextEvent ? timeToMinutes(nextEvent.start_time) : endTime * 60

        return (
          <DraggableTimeSpan
            key={event.nanoid}
            span={event}
            startTime={startTime}
            endTime={endTime}
            minStart={minStart}
            maxEnd={maxEnd}
            onResize={onResize}
            onDelete={onDelete}
            useAmPm={useAmPm}
            timeIncrements={timeIncrements}
            containerRef={containerRef}
          />
        )
      })}

      {isCreating && creationStart !== null && currentMouseY !== null && (
        <div
          className="absolute left-0 right-0 mx-1 rounded bg-primary/30 border border-primary z-20 pointer-events-none"
          style={{
            top: `${((creationStart - startOffset) / totalMinutes) * 100}%`,
            height: `${((currentMouseY - creationStart) / totalMinutes) * 100}%`,
          }}
        />
      )}
    </div>
  )
}

interface DraggableTimeSpanProps {
  span: TimeSpan
  startTime: number
  endTime: number
  minStart: number
  maxEnd: number
  onResize: (id: string, start: string, end: string) => void
  onDelete: (id: string) => void
  useAmPm: boolean
  timeIncrements: number
  containerRef: React.RefObject<HTMLDivElement | null>
}

function DraggableTimeSpan({
  span,
  startTime,
  endTime,
  minStart,
  maxEnd,
  onResize,
  onDelete,
  useAmPm,
  timeIncrements,
  containerRef,
}: DraggableTimeSpanProps) {
  const startMinutes = timeToMinutes(span.start_time)
  const endMinutes = timeToMinutes(span.end_time)
  const totalMinutes = (endTime - startTime) * 60
  const startOffset = startTime * 60
  const durationMinutes = endMinutes - startMinutes

  const style: React.CSSProperties = {
    top: `${((startMinutes - startOffset) / totalMinutes) * 100}%`,
    height: `${(durationMinutes / totalMinutes) * 100}%`,
  }

  // Resize Handlers
  const handleResizeStart = (e: React.MouseEvent, edge: "top" | "bottom") => {
    e.stopPropagation() // Prevent drag start
    e.preventDefault()

    const initialY = e.clientY
    const initialStart = startMinutes
    const initialEnd = endMinutes

    const handleMouseMove = (ev: MouseEvent) => {
      if (!containerRef.current) return

      const containerHeight = containerRef.current.clientHeight
      const pixelsPerMinute = containerHeight / totalMinutes
      const deltaY = ev.clientY - initialY
      const deltaMinutes = Math.round(deltaY / pixelsPerMinute / timeIncrements) * timeIncrements

      if (deltaMinutes === 0) return

      let newStart = initialStart
      let newEnd = initialEnd

      if (edge === "top") {
        newStart += deltaMinutes
        
        // Clamp to limits
        if (newStart < minStart) newStart = minStart
        if (newStart >= newEnd - timeIncrements) newStart = newEnd - timeIncrements
      } else {
        newEnd += deltaMinutes
        
        // Clamp to limits
        if (newEnd > maxEnd) newEnd = maxEnd
        if (newEnd <= newStart + timeIncrements) newEnd = newStart + timeIncrements
      }

      onResize(span.nanoid, minutesToTime(newStart), minutesToTime(newEnd))
    }

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <div
      style={style}
      className={cn(
        "absolute left-1 right-1 rounded-md border border-foreground/50 bg-foreground/10 p-2 text-primary-foreground shadow-sm text-xs group overflow-hidden",
      )}
    >
      {/* Resize Handle Top */}
      <div
        className="absolute top-0 left-0 right-0 h-2 cursor-n-resize hover:bg-foreground/20"
        onMouseDown={e => handleResizeStart(e, "top")}
      />

      <TimeSpanCard
        span={span}
        useAmPm={useAmPm}
        duration={durationMinutes / 60}
        onDelete={() => onDelete(span.nanoid)}
      />

      {/* Resize Handle Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2 cursor-s-resize hover:bg-foreground/20"
        onMouseDown={e => handleResizeStart(e, "bottom")}
      />
    </div>
  )
}

function TimeSpanCard({
  span,
  useAmPm,
  isOverlay,
  duration,
  onDelete,
}: {
  span: TimeSpan
  useAmPm: boolean
  isOverlay?: boolean
  duration?: number
  onDelete?: () => void
}) {
  const calculatedDuration = duration || (timeToMinutes(span.end_time) - timeToMinutes(span.start_time)) / 60

  return (
    <div
      className={cn(
        "h-full flex flex-col relative items-between text-foreground",
        isOverlay && "rounded-md border p-2 shadow-lg w-[120px]",
      )}
    >
      <div className="flex flex-col gap-1 text-inherit">
        <p className="font-semibold leading-none">{formatDisplayTime(span.start_time, useAmPm)}</p>
        <p className="text-[10px] opacity-80">{calculatedDuration.toFixed(1).replace(".0", "")}h</p>
      </div>
      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 hover:bg-foreground/20 -mt-1 -mr-1 absolute top-0 right-0"
          onMouseDown={e => {
            e.stopPropagation() // prevent drag
          }}
          onClick={e => {
            e.stopPropagation()
            onDelete()
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
      <div className="flex flex-col gap-1 mt-auto text-inherit">
        {!onDelete && <Settings className="h-3 w-3 opacity-50" />}
        <p className="font-semibold leading-none !text-inherit">{formatDisplayTime(span.end_time, useAmPm)}</p>
      </div>
    </div>
  )
}
