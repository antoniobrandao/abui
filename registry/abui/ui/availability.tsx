"use client"

import * as React from "react"
import { Settings, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  useDraggable,
  useDroppable,
  DragStartEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
} from "@dnd-kit/core"
import tunnel from "tunnel-rat"

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
  mergeAdjacent?: boolean // default true - merge spans that touch end-to-end
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

// Helper to generate a simple unique ID (not crypto secure but sufficient for UI)
const generateId = () => Math.random().toString(36).substring(2, 11)

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

/**
 * Merges adjacent (contiguous) time spans on the same day.
 * Adjacent means one span's end_time equals another's start_time.
 * The merged span keeps the nanoid of the earliest span.
 */
const mergeAdjacentSpans = (spans: TimeSpan[]): TimeSpan[] => {
  if (spans.length === 0) return spans

  // Group by day
  const byDay = new Map<number, TimeSpan[]>()
  spans.forEach(span => {
    const daySpans = byDay.get(span.week_day) || []
    daySpans.push(span)
    byDay.set(span.week_day, daySpans)
  })

  const merged: TimeSpan[] = []

  // Process each day
  byDay.forEach(daySpans => {
    // Sort by start time
    const sorted = [...daySpans].sort((a, b) => timeToMinutes(a.start_time) - timeToMinutes(b.start_time))

    let current = sorted[0]

    for (let i = 1; i < sorted.length; i++) {
      const next = sorted[i]

      // Check if current and next are adjacent (touching)
      if (current.end_time === next.start_time) {
        // Merge: extend current to include next
        current = {
          ...current,
          end_time: next.end_time,
          // Keep the earliest span's nanoid (current is already earlier due to sorting)
        }
      } else {
        // Not adjacent, push current and move to next
        merged.push(current)
        current = next
      }
    }

    // Push the last span
    merged.push(current)
  })

  return merged
}

// --- Hooks ---

/**
 * Hook to handle creation dragging logic on a day column.
 */
function useCalendarCreation({
  containerRef,
  timeIncrements,
  startTime,
  endTime,
  events,
  onCreate,
  colIndex,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
  timeIncrements: number
  startTime: number
  endTime: number
  events: TimeSpan[]
  onCreate: (dayIndex: number, start: number, end: number) => void
  colIndex: number
}) {
  const [isCreating, setIsCreating] = React.useState(false)
  const [creationStart, setCreationStart] = React.useState<number | null>(null)
  const [currentMouseY, setCurrentMouseY] = React.useState<number | null>(null)

  const totalMinutes = (endTime - startTime) * 60
  const startOffset = startTime * 60

  // Sort events to determine constraints
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

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.target !== e.currentTarget) return // Only trigger on empty space
    // Prevent default drag behavior and text selection, but allow touch scrolling if not handled
    e.preventDefault()

    // Capture pointer to track movement even if it leaves the element
    containerRef.current?.setPointerCapture(e.pointerId)

    const startMins = getMinutesFromY(e.clientY)

    // Check strict overlap at start point
    const isOverlapping = sortedEvents.some(ev => {
      const s = timeToMinutes(ev.start_time)
      const e = timeToMinutes(ev.end_time)
      return startMins >= s && startMins < e
    })
    if (isOverlapping) return

    // Find constraints
    const prevEvent = sortedEvents.filter(ev => timeToMinutes(ev.end_time) <= startMins).pop()
    const nextEvent = sortedEvents.find(ev => timeToMinutes(ev.start_time) >= startMins)

    const minStartMins = prevEvent ? timeToMinutes(prevEvent.end_time) : startOffset
    const maxEndMins = nextEvent ? timeToMinutes(nextEvent.start_time) : endTime * 60

    setCreationStart(startMins)
    setCurrentMouseY(startMins)
    setIsCreating(true)

    const handlePointerMove = (ev: PointerEvent) => {
      const currentMins = getMinutesFromY(ev.clientY)
      // Clamp to constraints
      const clampedMins = Math.max(minStartMins, Math.min(currentMins, maxEndMins))
      setCurrentMouseY(clampedMins)
    }

    const handlePointerUp = (ev: PointerEvent) => {
      const currentMins = getMinutesFromY(ev.clientY)

      let finalStart = Math.min(startMins, currentMins)
      let finalEnd = Math.max(startMins, currentMins)

      // Clamp to constraints
      finalStart = Math.max(minStartMins, finalStart)
      finalEnd = Math.min(maxEndMins, finalEnd)

      // Ensure minimum size
      if (finalEnd - finalStart < timeIncrements) {
        finalEnd = Math.min(finalStart + timeIncrements, maxEndMins)
      }

      // Click-to-create logic (if essentially no drag occurred, try to make a 1-hour slot)
      if (finalEnd - finalStart <= timeIncrements) {
        const oneHourEnd = finalStart + 60
        finalEnd = Math.min(oneHourEnd, maxEndMins)
      }

      if (finalEnd > finalStart) {
        onCreate(colIndex, finalStart, finalEnd)
      }

      setIsCreating(false)
      setCreationStart(null)
      setCurrentMouseY(null)

      // Release pointer capture
      containerRef.current?.releasePointerCapture(ev.pointerId)

      // Cleanup listeners (though using setPointerCapture implicitly handles some of this, explicit cleanup is safe)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
  }

  return {
    isCreating,
    creationStart,
    currentMouseY,
    totalMinutes,
    startOffset,
    sortedEvents,
    handlePointerDown,
  }
}

// --- Components ---

// Context to share dragging state across components
const AvailabilityDragContext = React.createContext<{
  dragPreviewTunnel: ReturnType<typeof tunnel>
  activeId: string | null
  activeSpan: TimeSpan | null
  overDayIndex: number | null
  deltaY: number
  timeIncrements: number
  isDropValid: boolean
} | null>(null)

export function Availability({
  value = [],
  onValueChange,
  days = [0, 1, 2, 3, 4, 5, 6],
  timeIncrements = 30,
  startTime = 7,
  endTime = 23,
  useAmPm = false,
  mergeAdjacent = true,
  className,
}: AvailabilityProps) {
  const [internalValue, setInternalValue] = React.useState<TimeSpan[]>(value)

  // Drag state
  const dragPreviewTunnel = React.useMemo(() => tunnel(), [])
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [overDayIndex, setOverDayIndex] = React.useState<number | null>(null)
  const [deltaY, setDeltaY] = React.useState(0)
  const [isDropValid, setIsDropValid] = React.useState(true)

  const mainContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setInternalValue(value)
  }, [value])

  const updateValue = (newValue: TimeSpan[], shouldMerge = false) => {
    const finalValue = shouldMerge && mergeAdjacent ? mergeAdjacentSpans(newValue) : newValue
    setInternalValue(finalValue)
    onValueChange?.(finalValue)
  }

  const handleResize = (id: string, newStart: string, newEnd: string, isComplete = false) => {
    const newValue = internalValue.map(span => {
      if (span.nanoid === id) {
        return { ...span, start_time: newStart, end_time: newEnd }
      }
      return span
    })
    updateValue(newValue, isComplete)
  }

  const handleCreate = (dayIndex: number, startMinutes: number, endMinutes: number) => {
    const newSpan: TimeSpan = {
      nanoid: generateId(),
      week_day: days[dayIndex],
      start_time: minutesToTime(startMinutes),
      end_time: minutesToTime(endMinutes),
      active: true,
    }
    updateValue([...internalValue, newSpan], true)
  }

  const handleDelete = (id: string) => {
    updateValue(
      internalValue.filter(s => s.nanoid !== id),
      true,
    )
  }

  const handleMove = (id: string, newStart: string, newEnd: string, newDayIndex: number) => {
    const newValue = internalValue.map(span => {
      if (span.nanoid === id) {
        return { ...span, start_time: newStart, end_time: newEnd, week_day: newDayIndex }
      }
      return span
    })
    updateValue(newValue, true)
  }

  // Validation helper
  const validatePlacement = (
    span: TimeSpan,
    targetDayIndex: number,
    deltaY: number,
    containerHeight: number,
  ): { isValid: boolean; newStart: number; duration: number } => {
    const totalMinutes = (endTime - startTime) * 60
    const pixelsPerMinute = containerHeight / totalMinutes
    const deltaMinutesRaw = deltaY / pixelsPerMinute
    const deltaMinutes = Math.round(deltaMinutesRaw / timeIncrements) * timeIncrements

    const originalStart = timeToMinutes(span.start_time)
    const duration = timeToMinutes(span.end_time) - originalStart

    const newStart = originalStart + deltaMinutes
    const newEnd = newStart + duration

    // Check bounds
    const dayStartMins = startTime * 60
    const dayEndMins = endTime * 60

    if (newStart < dayStartMins || newEnd > dayEndMins) {
      return { isValid: false, newStart, duration }
    }

    // Check collisions
    const dayEvents = internalValue.filter(e => e.week_day === targetDayIndex && e.nanoid !== span.nanoid)
    const hasOverlap = dayEvents.some(e => {
      const eStart = timeToMinutes(e.start_time)
      const eEnd = timeToMinutes(e.end_time)
      return newStart < eEnd && newEnd > eStart
    })

    if (hasOverlap) {
      return { isValid: false, newStart, duration }
    }

    return { isValid: true, newStart, duration }
  }

  // DnD Handlers
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
    setDeltaY(0)
    setOverDayIndex(null)
    setIsDropValid(true)
  }

  const handleDragMove = (event: DragMoveEvent) => {
    setDeltaY(event.delta.y)
    checkValidity(event.active.id as string, event.over?.id, event.delta.y)
  }

  const handleDragOver = (event: DragOverEvent) => {
    if (event.over) {
      const dayIndex = parseInt(event.over.id.toString().replace("day-", ""), 10)
      if (!isNaN(dayIndex)) {
        setOverDayIndex(dayIndex)
      }
    } else {
      setOverDayIndex(null)
    }
    checkValidity(event.active.id as string, event.over?.id, event.delta.y)
  }

  const checkValidity = (activeId: string, overId: string | number | undefined, currentDeltaY: number) => {
    if (!mainContainerRef.current || !overId) {
      setIsDropValid(false)
      return
    }

    const span = internalValue.find(s => s.nanoid === activeId)
    if (!span) return

    const targetDayIndex = parseInt(overId.toString().replace("day-", ""), 10)
    if (isNaN(targetDayIndex)) {
      setIsDropValid(false)
      return
    }

    const result = validatePlacement(span, targetDayIndex, currentDeltaY, mainContainerRef.current.clientHeight)
    setIsDropValid(result.isValid)
  }

  const handleDragCancel = () => {
    setActiveId(null)
    setOverDayIndex(null)
    setDeltaY(0)
    setIsDropValid(true)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta, over } = event
    setActiveId(null)
    setOverDayIndex(null)
    setDeltaY(0)
    setIsDropValid(true)

    const span = internalValue.find(s => s.nanoid === active.id)
    if (!span || !mainContainerRef.current || !over) return

    const targetDayIndex = parseInt(over.id.toString().replace("day-", ""), 10)
    if (isNaN(targetDayIndex)) return

    // Final validation before commit
    const { isValid, newStart, duration } = validatePlacement(
      span,
      targetDayIndex,
      delta.y,
      mainContainerRef.current.clientHeight,
    )

    if (!isValid) {
      // Invalid drop, do nothing (snaps back)
      return
    }

    const newEndVal = newStart + duration
    handleMove(span.nanoid, minutesToTime(newStart), minutesToTime(newEndVal), targetDayIndex)
  }

  const activeSpan = React.useMemo(
    () => internalValue.find(s => s.nanoid === activeId) || null,
    [activeId, internalValue],
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <AvailabilityDragContext.Provider
        value={{
          dragPreviewTunnel,
          activeId,
          activeSpan,
          overDayIndex,
          deltaY,
          timeIncrements,
          isDropValid,
        }}
      >
        <div
          className={cn(
            "flex h-[600px] w-full flex-col overflow-hidden rounded-md border bg-background select-none touch-none",
            className,
          )}
        >
          {/* Header */}
          <div className="flex w-full border-b bg-muted/40">
            <div className="w-16 flex-shrink-0 border-r p-2 text-xs font-medium text-muted-foreground" />
            <div className="flex flex-1">
              {days.map(dayIndex => (
                <div
                  key={dayIndex}
                  className="flex-1 border-r px-2 py-3 text-center text-sm font-medium last:border-r-0"
                >
                  {DAYS[dayIndex]}
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 overflow-y-auto relative" ref={mainContainerRef}>
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
              <div className="absolute inset-0 pointer-events-none flex flex-col">
                {Array.from({ length: endTime - startTime }).map((_, i) => (
                  <div key={i} className="flex-1 border-b border-dashed border-muted/60 w-full relative" />
                ))}
              </div>

              {days.map((dayIndex, i) => (
                <DayColumn
                  key={dayIndex}
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

          {/* Drag Overlay */}
          <DragOverlay>
            {activeSpan && (
              <div className="w-full h-full cursor-grabbing relative opacity-80">
                <dragPreviewTunnel.Out />
              </div>
            )}
          </DragOverlay>
        </div>
      </AvailabilityDragContext.Provider>
    </DndContext>
  )
}

interface DayColumnProps {
  dayIndex: number
  colIndex: number
  startTime: number
  endTime: number
  timeIncrements: number
  events: TimeSpan[]
  onCreate: (dayIndex: number, start: number, end: number) => void
  onResize: (id: string, start: string, end: string, isComplete?: boolean) => void
  onDelete: (id: string) => void
  useAmPm: boolean
}

function DayColumn({
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

  const context = React.useContext(AvailabilityDragContext)

  // Make the column a droppable zone for day detection
  const { setNodeRef } = useDroppable({
    id: `day-${dayIndex}`,
  })

  const mergedRef = (node: HTMLDivElement | null) => {
    containerRef.current = node
    setNodeRef(node)
  }

  const { isCreating, creationStart, currentMouseY, totalMinutes, startOffset, sortedEvents, handlePointerDown } =
    useCalendarCreation({
      containerRef,
      timeIncrements,
      startTime,
      endTime,
      events,
      onCreate,
      colIndex,
    })

  // Calculate ghost position
  const showGhost = context?.activeId && context.overDayIndex === dayIndex && containerRef.current

  const ghostStyle = React.useMemo(() => {
    if (!showGhost || !context?.activeSpan || !containerRef.current) return null

    const span = context.activeSpan
    const containerHeight = containerRef.current.clientHeight
    const pixelsPerMinute = containerHeight / totalMinutes

    const deltaMinutesRaw = context.deltaY / pixelsPerMinute
    const deltaMinutes = Math.round(deltaMinutesRaw / timeIncrements) * timeIncrements

    const originalStart = timeToMinutes(span.start_time)
    const duration = timeToMinutes(span.end_time) - originalStart

    // Calculate proposed start
    const newStart = originalStart + deltaMinutes

    // Determine visual feedback based on validity
    // If we are here, context.isDropValid has already determined if this position is valid
    // We just need to render the ghost at the proposed position (not clamped, so user sees why it fails)

    return {
      top: `${((newStart - startOffset) / totalMinutes) * 100}%`,
      height: `${(duration / totalMinutes) * 100}%`,
    }
  }, [
    context?.activeId,
    context?.deltaY,
    context?.activeSpan,
    context?.overDayIndex,
    timeIncrements,
    totalMinutes,
    startOffset,
    showGhost,
  ])

  return (
    <div
      ref={mergedRef}
      className={cn(
        "flex-1 relative border-r last:border-r-0 min-w-[100px] touch-none",
        context?.activeId && "z-10", // Ensure z-index when dragging
      )}
      onPointerDown={handlePointerDown}
    >
      {/* Ghost Element */}
      {ghostStyle && (
        <div
          className={cn(
            "absolute left-1 right-1 rounded-md border z-0 pointer-events-none transition-all duration-100 ease-out",
            context?.isDropValid ? "bg-foreground/20 border-foreground/30" : "bg-destructive/20 border-destructive/50",
          )}
          style={ghostStyle}
        />
      )}

      {sortedEvents.map((event, i) => {
        const prevEvent = sortedEvents[i - 1]
        const nextEvent = sortedEvents[i + 1]

        const minStart = prevEvent ? timeToMinutes(prevEvent.end_time) : startOffset
        const maxEnd = nextEvent ? timeToMinutes(nextEvent.start_time) : endTime * 60

        const isDragging = context?.activeId === event.nanoid

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
            isDragging={isDragging}
          />
        )
      })}

      {isCreating && creationStart !== null && currentMouseY !== null && (
        <div
          className="absolute left-0 right-0 mx-1 rounded bg-primary/30 border border-primary z-20 pointer-events-none"
          style={{
            top: `${((Math.min(creationStart, currentMouseY) - startOffset) / totalMinutes) * 100}%`,
            height: `${(Math.abs(currentMouseY - creationStart) / totalMinutes) * 100}%`,
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
  onResize: (id: string, start: string, end: string, isComplete?: boolean) => void
  onDelete: (id: string) => void
  useAmPm: boolean
  timeIncrements: number
  containerRef: React.RefObject<HTMLDivElement | null>
  isDragging?: boolean
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
  isDragging,
}: DraggableTimeSpanProps) {
  const context = React.useContext(AvailabilityDragContext)
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: span.nanoid,
    data: span,
  })

  const startMinutes = timeToMinutes(span.start_time)
  const endMinutes = timeToMinutes(span.end_time)
  const totalMinutes = (endTime - startTime) * 60
  const startOffset = startTime * 60
  const durationMinutes = endMinutes - startMinutes

  // Apply transform if dragging
  const style: React.CSSProperties = {
    top: `${((startMinutes - startOffset) / totalMinutes) * 100}%`,
    height: `${(durationMinutes / totalMinutes) * 100}%`,
    // We hide the original element when dragging, but we render the tunnel content
    opacity: isDragging ? 0 : 1,
  }

  const handleResizeStart = (e: React.PointerEvent, edge: "top" | "bottom") => {
    e.stopPropagation()
    e.preventDefault()

    // Capture pointer for resize drag
    const target = e.target as HTMLElement
    target.setPointerCapture(e.pointerId)

    const initialY = e.clientY
    const initialStart = startMinutes
    const initialEnd = endMinutes

    // Re-calculate local constraints for resize (using passed props or logic)
    // We can trust the parent passed correct minStart/maxEnd for neighbors

    const handlePointerMove = (ev: PointerEvent) => {
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
        // For resize we still want clamping to neighbors
        if (newStart < minStart) newStart = minStart
        if (newStart >= newEnd - timeIncrements) newStart = newEnd - timeIncrements
      } else {
        newEnd += deltaMinutes
        if (newEnd > maxEnd) newEnd = maxEnd
        if (newEnd <= newStart + timeIncrements) newEnd = newStart + timeIncrements
      }

      // During drag: don't merge (isComplete = false)
      onResize(span.nanoid, minutesToTime(newStart), minutesToTime(newEnd), false)
    }

    const handlePointerUp = (ev: PointerEvent) => {
      target.releasePointerCapture(ev.pointerId)

      // Final commit with clamping logic repeated
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight
        const pixelsPerMinute = containerHeight / totalMinutes
        const deltaY = ev.clientY - initialY
        const deltaMinutes = Math.round(deltaY / pixelsPerMinute / timeIncrements) * timeIncrements

        let newStart = initialStart
        let newEnd = initialEnd

        if (edge === "top") {
          newStart += deltaMinutes
          if (newStart < minStart) newStart = minStart
          if (newStart >= newEnd - timeIncrements) newStart = newEnd - timeIncrements
        } else {
          newEnd += deltaMinutes
          if (newEnd > maxEnd) newEnd = maxEnd
          if (newEnd <= newStart + timeIncrements) newEnd = newStart + timeIncrements
        }

        onResize(span.nanoid, minutesToTime(newStart), minutesToTime(newEnd), true)
      }

      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
  }

  const content = (
    <>
      {/* Resize Handle Top - Increased hit area */}
      <div
        className="absolute top-0 left-0 right-0 h-4 -mt-2 cursor-row-resize z-10"
        onPointerDown={e => handleResizeStart(e, "top")}
      />
      {/* Visual Top Handle */}
      <div className="absolute top-0 left-1 right-1 h-1 bg-transparent group-hover:bg-foreground/20 rounded-t-sm" />

      {/* Drag Handle Area (middle) - Use dnd-kit listeners here */}
      <div
        className="absolute inset-0 top-2 bottom-2 cursor-grab active:cursor-grabbing z-0"
        {...listeners}
        {...attributes}
      />

      <TimeSpanCard
        span={span}
        useAmPm={useAmPm}
        duration={durationMinutes / 60}
        onDelete={() => onDelete(span.nanoid)}
      />

      {/* Resize Handle Bottom - Increased hit area */}
      <div
        className="absolute bottom-0 left-0 right-0 h-4 -mb-2 cursor-row-resize z-10"
        onPointerDown={e => handleResizeStart(e, "bottom")}
      />
      {/* Visual Bottom Handle */}
      <div className="absolute bottom-0 left-1 right-1 h-1 bg-transparent group-hover:bg-foreground/20 rounded-b-sm" />
    </>
  )

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "absolute left-1 right-1 rounded-md border border-foreground/50 bg-foreground/10 p-3 shadow-sm text-xs group overflow-hidden touch-none",
          isDragging && "opacity-0", // Hide original while dragging
        )}
      >
        {content}
      </div>

      {/* Tunnel visual content to overlay if dragging */}
      {isDragging && context && (
        <context.dragPreviewTunnel.In>
          <div
            className={cn(
              "absolute left-0 right-0 rounded-md border p-3 shadow-lg text-xs overflow-hidden h-full w-full",
              context.isDropValid ? "border-foreground/50 bg-foreground/10" : "border-destructive/50 bg-destructive/20",
            )}
          >
            {/* Render content without interactive handlers for the preview */}
            <div className="absolute top-0 left-1 right-1 h-1 bg-transparent group-hover:bg-foreground/20 rounded-t-sm" />
            <TimeSpanCard
              span={span}
              useAmPm={useAmPm}
              duration={durationMinutes / 60}
              // No delete button in preview
            />
            <div className="absolute bottom-0 left-1 right-1 h-1 bg-transparent group-hover:bg-foreground/20 rounded-b-sm" />
          </div>
        </context.dragPreviewTunnel.In>
      )}
    </>
  )
}

function TimeSpanCard({
  span,
  useAmPm,
  duration,
  onDelete,
}: {
  span: TimeSpan
  useAmPm: boolean
  duration?: number
  onDelete?: () => void
}) {
  const calculatedDuration = duration || (timeToMinutes(span.end_time) - timeToMinutes(span.start_time)) / 60

  return (
    <div className="h-full flex flex-col relative items-between text-foreground timespan-inner-area pointer-events-none">
      <div className="flex flex-col gap-1 text-inherit">
        <p className="font-semibold leading-none">{formatDisplayTime(span.start_time, useAmPm)}</p>
        <p className="text-[10px] opacity-80">{calculatedDuration.toFixed(1).replace(".0", "")}h</p>
      </div>
      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 hover:bg-foreground/20 -mt-1 -mr-1 absolute top-0 right-0 z-20 pointer-events-auto"
          onPointerDown={e => {
            e.stopPropagation() // Prevent drag/resize from card
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
