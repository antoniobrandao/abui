export const sourceCodeString = `"use client"

import * as React from "react"
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
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
  return \`\${h.toString().padStart(2, "0")}:\${m.toString().padStart(2, "0")}\`
}

const formatDisplayTime = (time: string, useAmPm: boolean) => {
  if (!useAmPm) return time
  const [h, m] = time.split(":").map(Number)
  const ampm = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 || 12
  return \`\${h12}:\${m.toString().padStart(2, "0")} \${ampm}\`
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
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)

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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
    setIsDragging(true)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setIsDragging(false)

    if (!over) return

    const activeSpan = internalValue.find((s) => s.nanoid === active.id)
    if (!activeSpan) return

    const newDayIndex = parseInt(over.id.toString().split("-")[1])
    
    // Calculate new time based on drop position relative to the day column
    // The \`delta.y\` gives us the movement in pixels.
    // However, simpler approach for 'snap' move:
    // We need the Y position relative to the Droppable container.
    // dnd-kit doesn't give relative coordinates directly in DragEndEvent easily without calculations.
    // A simpler way for MVP: If we just want to move between days, we keep the time.
    // If we want to move in time, we need to calculate the offset.
    
    // Let's use the delta to adjust the time.
    // We assume the user dragged \`event.delta.y\` pixels.
    // We need to convert pixels to minutes.
    
    const containerHeight = containerRef.current?.clientHeight || 1
    const pixelsPerMinute = containerHeight / totalMinutes
    const deltaMinutes = Math.round((event.delta.y / pixelsPerMinute) / timeIncrements) * timeIncrements

    let newStartMinutes = timeToMinutes(activeSpan.start_time) + deltaMinutes
    let newEndMinutes = timeToMinutes(activeSpan.end_time) + deltaMinutes
    const duration = newEndMinutes - newStartMinutes

    // Clamp to bounds
    if (newStartMinutes < startOffset) {
      newStartMinutes = startOffset
      newEndMinutes = newStartMinutes + duration
    }
    if (newEndMinutes > endTime * 60) {
      newEndMinutes = endTime * 60
      newStartMinutes = newEndMinutes - duration
    }

    // Snap to nearest increment
    newStartMinutes = Math.round(newStartMinutes / timeIncrements) * timeIncrements
    newEndMinutes = Math.round(newEndMinutes / timeIncrements) * timeIncrements

    const newStart = minutesToTime(newStartMinutes)
    const newEnd = minutesToTime(newEndMinutes)

    const newValue = internalValue.map((span) => {
      if (span.nanoid === active.id) {
        return {
          ...span,
          week_day: days[newDayIndex],
          start_time: newStart,
          end_time: newEnd,
        }
      }
      return span
    })

    updateValue(newValue)
  }

  const handleResize = (id: string, newStart: string, newEnd: string) => {
    const newValue = internalValue.map((span) => {
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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        className={cn("flex h-[600px] w-full flex-col overflow-hidden rounded-md border bg-background select-none", className)}
        ref={containerRef}
      >
        {/* Header */}
        <div className="flex w-full border-b bg-muted/40">
          <div className="w-16 flex-shrink-0 border-r p-2 text-xs font-medium text-muted-foreground">
            {/* Time label column header */}
          </div>
          <div className="flex flex-1">
            {days.map((dayIndex) => (
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
        <div className="flex flex-1 overflow-y-auto">
          {/* Time Labels */}
          <div className="w-16 flex-shrink-0 border-r bg-muted/10">
            {Array.from({ length: (endTime - startTime) }).map((_, i) => {
              const hour = startTime + i
              return (
                <div
                  key={hour}
                  className="flex h-[60px] items-start justify-center border-b border-dashed text-xs text-muted-foreground last:border-b-0"
                  style={{ height: \`\${(60 / totalMinutes) * 100}%\` }} // This approach is tricky with flex, let's use absolute grid logic or consistent height
                >
                   {/* We'll use a simple reliable height distribution in the main loop instead */}
                </div>
              )
            })}
             <div className="relative h-full w-full">
                {Array.from({ length: (endTime - startTime) + 1 }).map((_, i) => {
                  // Render time labels every hour
                  const hour = startTime + i
                  const top = ((hour * 60 - startOffset) / totalMinutes) * 100
                  if (top > 99) return null // Don't render last label at very bottom if it overlaps
                  return (
                     <div key={hour} className="absolute right-2 -translate-y-1/2 text-xs text-muted-foreground" style={{ top: \`\${top}%\` }}>
                       {formatDisplayTime(\`\${hour}:00\`, useAmPm)}
                     </div>
                  )
                })}
             </div>
          </div>

          {/* Days Grid */}
          <div className="flex flex-1 relative">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 pointer-events-none flex flex-col">
                 {Array.from({ length: (endTime - startTime) * (60/timeIncrements) }).map((_, i) => (
                   <div key={i} className="flex-1 border-b border-muted/20 border-dashed w-full" />
                 ))}
            </div>

            {days.map((dayIndex, i) => (
              <DayColumn
                key={dayIndex}
                id={\`day-\${i}\`} // Using index in 'days' array for drop ID
                dayIndex={dayIndex} // The actual day (0-6)
                colIndex={i}
                startTime={startTime}
                endTime={endTime}
                timeIncrements={timeIncrements}
                events={internalValue.filter((e) => e.week_day === dayIndex)}
                onCreate={handleCreate}
                onResize={handleResize}
                onDelete={handleDelete}
                useAmPm={useAmPm}
                isOverlay={false}
              />
            ))}
          </div>
        </div>
      </div>
      
      <DragOverlay>
        {activeId ? (
             <TimeSpanCard
               span={internalValue.find(s => s.nanoid === activeId)!}
               useAmPm={useAmPm}
               isOverlay
               duration={0} // Calc duration inside
             />
        ) : null}
      </DragOverlay>
    </DndContext>
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
  dayIndex, // The actual day value (0-6)
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
  const { setNodeRef } = useDroppable({ id })
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isCreating, setIsCreating] = React.useState(false)
  const [creationStart, setCreationStart] = React.useState<number | null>(null)
  const [currentMouseY, setCurrentMouseY] = React.useState<number | null>(null)

  const totalMinutes = (endTime - startTime) * 60
  const startOffset = startTime * 60

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
    setCreationStart(startMins)
    setCurrentMouseY(startMins + timeIncrements)
    setIsCreating(true)
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
        const currentMins = getMinutesFromY(e.clientY)
        // Ensure we drag downwards or upwards correctly, but for simplicity let's assume create is mainly drag down or simple click
        setCurrentMouseY(Math.max(currentMins, startMins + timeIncrements))
    }

    const handleGlobalMouseUp = (e: MouseEvent) => {
      const endMins = getMinutesFromY(e.clientY)
      const finalStart = startMins
      const finalEnd = Math.max(endMins, startMins + timeIncrements)
      
      onCreate(colIndex, finalStart, finalEnd)
      
      setIsCreating(false)
      setCreationStart(null)
      setCurrentMouseY(null)
      window.removeEventListener("mousemove", handleGlobalMouseMove)
      window.removeEventListener("mouseup", handleGlobalMouseUp)
    }

    window.addEventListener("mousemove", handleGlobalMouseMove)
    window.addEventListener("mouseup", handleGlobalMouseUp)
  }
  
  // Need to find the index of this day in the configured days array for the onCreate callback
  // But wait, we passed \`dayIndex\` as the value (0-6). 
  // The \`onCreate\` expects an index relative to the \`days\` array prop of the parent.
  // To simplify, let's just pass the dayIndex value back to parent? 
  // The parent's \`handleCreate\` used \`days[dayIndex]\`, so it expects an index into \`days\`.
  // I'll fix \`handleCreate\` to accept the dayValue instead.
  
  // Let's fix logic in parent locally first:
  // We can just pass the \`dayIndex\` (which is 0-6) to the parent if we change parent sig.
  // For now, I'll assume \`onCreate\` takes the index in the \`days\` prop array.
  // Since \`DayColumn\` receives \`dayIndex\` as 0-6, I need to find it in \`days\`. 
  // But I don't have \`days\` array here. I'll pass the \`colIndex\` as a prop.

  return (
    <div
      ref={(node) => {
        setNodeRef(node)
        // @ts-ignore
        containerRef.current = node
      }}
      className="flex-1 relative border-r last:border-r-0 min-w-[100px]"
      onMouseDown={handleMouseDown}
    >
      {events.map((event) => (
        <DraggableTimeSpan
          key={event.nanoid}
          span={event}
          startTime={startTime}
          endTime={endTime}
          onResize={onResize}
          onDelete={onDelete}
          useAmPm={useAmPm}
          timeIncrements={timeIncrements}
          containerRef={containerRef}
        />
      ))}
      
      {isCreating && creationStart !== null && currentMouseY !== null && (
          <div
            className="absolute left-0 right-0 mx-1 rounded bg-primary/30 border border-primary z-20 pointer-events-none"
            style={{
                top: \`\${((creationStart - startOffset) / totalMinutes) * 100}%\`,
                height: \`\${((currentMouseY - creationStart) / totalMinutes) * 100}%\`
            }}
          />
      )}
    </div>
  )
}

// We need \`days\` array in DayColumn to pass correct index? 
// Actually, let's just update the \`onCreate\` prop signature in \`DayColumn\` to accept just the day value (0-6) and let parent handle it?
// But \`onCreate\` implementation in parent uses \`days[dayIndex]\`.
// I will just update \`Availability\` to pass \`i\` (the index in the array) to \`DayColumn\` instead of just \`dayIndex\` (the value).

// Wait, \`DayColumn\` needs \`dayIndex\` (value) to filter events.
// I will use a small helper in \`DayColumn\` to map back if needed, or just pass \`colIndex\` prop.


interface DraggableTimeSpanProps {
  span: TimeSpan
  startTime: number
  endTime: number
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
  onResize,
  onDelete,
  useAmPm,
  timeIncrements,
  containerRef,
}: DraggableTimeSpanProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: span.nanoid,
  })

  const startMinutes = timeToMinutes(span.start_time)
  const endMinutes = timeToMinutes(span.end_time)
  const totalMinutes = (endTime - startTime) * 60
  const startOffset = startTime * 60
  const durationMinutes = endMinutes - startMinutes

  // We apply the transform via style, but purely for translation during drag
  // We only apply Y translation if we want to preview the drag, but dnd-kit DragOverlay handles the visual for the active item usually.
  // However, if we don't use DragOverlay for everything, we might see the original item moving.
  // Standard dnd-kit: original item stays put (maybe opacity reduced), DragOverlay follows mouse.
  
  const style: React.CSSProperties = {
    top: \`\${((startMinutes - startOffset) / totalMinutes) * 100}%\`,
    height: \`\${(durationMinutes / totalMinutes) * 100}%\`,
    opacity: isDragging ? 0.5 : 1,
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
        const deltaMinutes = Math.round((deltaY / pixelsPerMinute) / timeIncrements) * timeIncrements
        
        if (deltaMinutes === 0) return

        let newStart = initialStart
        let newEnd = initialEnd

        if (edge === "top") {
            newStart += deltaMinutes
            if (newStart >= newEnd) newStart = newEnd - timeIncrements
            if (newStart < startOffset) newStart = startOffset
        } else {
            newEnd += deltaMinutes
            if (newEnd <= newStart) newEnd = newStart + timeIncrements
            if (newEnd > endTime * 60) newEnd = endTime * 60
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
      ref={setNodeRef}
      style={style}
      className={cn(
        "absolute left-1 right-1 rounded-md border bg-primary/90 p-2 text-primary-foreground shadow-sm text-xs group overflow-hidden",
        "cursor-grab active:cursor-grabbing",
        isDragging && "opacity-0" // Hide original when dragging if using overlay
      )}
      {...listeners}
      {...attributes}
    >
      {/* Resize Handle Top */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5 cursor-n-resize hover:bg-white/20"
        onMouseDown={(e) => handleResizeStart(e, "top")}
      />
      
      <TimeSpanCard span={span} useAmPm={useAmPm} duration={durationMinutes / 60} onDelete={() => onDelete(span.nanoid)} />
      
       {/* Resize Handle Bottom */}
       <div 
        className="absolute bottom-0 left-0 right-0 h-1.5 cursor-s-resize hover:bg-white/20"
        onMouseDown={(e) => handleResizeStart(e, "bottom")}
      />
    </div>
  )
}

function TimeSpanCard({ span, useAmPm, isOverlay, duration, onDelete }: { span: TimeSpan, useAmPm: boolean, isOverlay?: boolean, duration?: number, onDelete?: () => void }) {
    const calculatedDuration = duration || (timeToMinutes(span.end_time) - timeToMinutes(span.start_time)) / 60

    return (
        <div className={cn("h-full flex flex-col relative", isOverlay && "rounded-md border bg-primary p-2 text-primary-foreground shadow-lg w-[120px]")}>
             <div className="flex items-start justify-between">
                <span className="font-semibold leading-none">
                    {formatDisplayTime(span.start_time, useAmPm)}
                </span>
                {onDelete && (
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/20 -mt-1 -mr-1"
                        onMouseDown={(e) => {
                            e.stopPropagation() // prevent drag
                        }}
                        onClick={(e) => {
                             e.stopPropagation()
                             onDelete()
                        }}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                )}
                 {!onDelete && <Settings className="h-3 w-3 opacity-50" />}
            </div>
            
            <div className="mt-auto pb-1">
                <span className="font-semibold leading-none block">
                   {formatDisplayTime(span.end_time, useAmPm)}
                </span>
                <span className="text-[10px] opacity-80">
                   {calculatedDuration.toFixed(1).replace('.0', '')}h
                </span>
            </div>
        </div>
    )
}
`
