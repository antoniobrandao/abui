"use client"

import * as React from "react"
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import {
  TimelineProvider,
  Timeline,
  TimelineGrid,
  TimelineRow,
  TimelineRowData,
  TimelineSlot,
  TimelineSlotData,
  TimelineSlotLabel,
  TimelineSlotContent,
  TimelineHeader,
  TimelineCurrentTime,
} from "@/registry/abui/ui/timeline"
import { Users, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Page() {
  const [slots, setSlots] = useState<TimelineSlotData[]>(initialSlots)
  const [percentageInView, setPercentageInView] = useState(100)

  const config = {
    startHour: 9,
    endHour: 18,
    snapIntervalMinutes: 15,
    columnWidth: 160,
  }

  const handlePositionChange = async (slotId: string, newTime: string, newRowId: string) => {
    console.log(`Slot ${slotId} moved to ${newTime} in row ${newRowId}`)

    // Update slots state
    setSlots(prevSlots =>
      prevSlots.map(slot => (slot.id === slotId ? { ...slot, startTime: newTime, rowId: newRowId } : slot)),
    )

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100))
    return true
  }

  const validateDrop = (slotId: string, newTime: string, newRowId: string) => {
    // Example: Check for time conflicts
    const draggedSlot = slots.find(s => s.id === slotId)
    if (!draggedSlot) return false

    const conflicts = slots.filter(s => {
      if (s.id === slotId) return false
      if (s.rowId !== newRowId) return false

      // Simple overlap check
      const sStart = timeToMinutes(s.startTime)
      const sEnd = sStart + s.duration
      const dragStart = timeToMinutes(newTime)
      const dragEnd = dragStart + draggedSlot.duration

      return dragStart < sEnd && dragEnd > sStart
    })

    return conflicts.length === 0
  }

  const handleSlotClick = (slotId: string) => {
    const slot = slots.find(s => s.id === slotId)
    if (slot) {
      console.log("Clicked slot:", slot)
      alert(`Clicked: ${slot.title}\nTime: ${slot.startTime}\nDuration: ${slot.duration} min`)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-2 mt-4 w-full">
        <p className="leading-none mb-0 pb-2">Zoom level</p>
        <Slider
          min={50}
          max={100}
          step={1}
          defaultValue={[percentageInView]}
          onValueChange={(value: number[]) => setPercentageInView(value[0])}
        />
      </div>
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span>Meeting</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span>Workshop</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <span>Break</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          <span>Review</span>
        </div>
      </div>
      <TimelineProvider
        config={config}
        percentageInView={percentageInView}
        onSlotPositionChange={handlePositionChange}
        onValidateDrop={validateDrop}
        onSlotClick={handleSlotClick}
        className="w-full"
      >
        <Timeline slots={slots} rows={dummyRows}>
          <TimelineGrid>
            <TimelineHeader columnLabel="Rooms" className="bg-background" />
            {dummyRows.map(row => (
              <TimelineRow
                key={row.id}
                row={row}
                slots={slots}
                className="text-xs bg-background"
                renderRowHeader={(row: TimelineRowData) => {
                  return (
                    <div className="flex flex-col gap-0.5 items-start pl-3">
                      <p className="text-xs font-medium">{row.label}</p>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <p className="text-xs font-medium text-muted-foreground">{row.capacity}</p>
                      </div>
                    </div>
                  )
                }}
              >
                {(slot: TimelineSlotData) => (
                  <TimelineSlot
                    slot={slot}
                    className={cn("gap-0 flex flex-col items-start justify-center px-2 bg-background dark:bg-zinc-900")}
                  >
                    <div className={cn(getSlotBgColorClass(slot.type), "w-1 h-full absolute top-0 left-0")} />
                    <div className="p-1 h-full flex flex-col justify-between">
                      <TimelineSlotLabel className={cn(getSlotTextColorClass(slot.type))}>
                        {slot.title}
                      </TimelineSlotLabel>
                      <TimelineSlotContent className="text-foreground flex gap-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {slot.startTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {slot.attendees}
                        </span>
                      </TimelineSlotContent>
                    </div>
                  </TimelineSlot>
                )}
              </TimelineRow>
            ))}
            <TimelineCurrentTime />
          </TimelineGrid>
        </Timeline>
      </TimelineProvider>
    </div>
  )
}

// Utility function
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

// Styling helper
function getSlotBgColorClass(type: string): string {
  const colors = {
    meeting: "bg-blue-500",
    workshop: "bg-emerald-500",
    break: "bg-purple-500",
    review: "bg-amber-500",
  }
  return colors[type as keyof typeof colors] || "bg-foreground"
}
function getSlotTextColorClass(type: string): string {
  const colors = {
    meeting: "text-blue-500",
    workshop: "text-emerald-500",
    break: "text-purple-500",
    review: "text-amber-500",
  }
  return colors[type as keyof typeof colors] || "text-gray-500"
}

// Demo Data
const dummyRows: TimelineRowData[] = [
  {
    id: "room-1",
    label: "Conference Room A",
    capacity: 12,
  },
  {
    id: "room-2",
    label: "Conference Room B",
    capacity: 8,
  },
  {
    id: "room-3",
    label: "Meeting Room 1",
    capacity: 6,
  },
  {
    id: "room-4",
    label: "Meeting Room 2",
    capacity: 4,
  },
  {
    id: "room-5",
    label: "Training Room",
    capacity: 20,
  },
]

const initialSlots: TimelineSlotData[] = [
  {
    id: "slot-1",
    rowId: "room-1",
    startTime: "09:30",
    duration: 60,
    title: "Team Standup",
    type: "meeting",
    attendees: 8,
  },
  {
    id: "slot-2",
    rowId: "room-1",
    startTime: "11:00",
    duration: 90,
    title: "Product Review",
    type: "review",
    attendees: 6,
  },
  {
    id: "slot-3",
    rowId: "room-2",
    startTime: "10:00",
    duration: 120,
    title: "Design Workshop",
    type: "workshop",
    attendees: 5,
  },
  {
    id: "slot-4",
    rowId: "room-2",
    startTime: "14:00",
    duration: 45,
    title: "Client Meeting",
    type: "meeting",
    attendees: 4,
  },
  {
    id: "slot-5",
    rowId: "room-3",
    startTime: "09:00",
    duration: 30,
    title: "Quick Sync",
    type: "meeting",
    attendees: 3,
  },
  {
    id: "slot-6",
    rowId: "room-3",
    startTime: "13:00",
    duration: 60,
    title: "Coffee Break",
    type: "break",
    attendees: 10,
  },
  {
    id: "slot-7",
    rowId: "room-4",
    startTime: "10:30",
    duration: 90,
    title: "Code Review",
    type: "review",
    attendees: 4,
  },
  {
    id: "slot-8",
    rowId: "room-4",
    startTime: "15:00",
    duration: 60,
    title: "1-on-1",
    type: "meeting",
    attendees: 2,
  },
  {
    id: "slot-9",
    rowId: "room-5",
    startTime: "09:00",
    duration: 180,
    title: "React Workshop",
    type: "workshop",
    attendees: 15,
  },
  {
    id: "slot-10",
    rowId: "room-5",
    startTime: "14:30",
    duration: 120,
    title: "Security Training",
    type: "workshop",
    attendees: 18,
  },
]
