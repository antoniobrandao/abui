"use client"

import * as React from "react"
import { useState } from "react"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import CodeBlockComponent from "@/components/custom/CodeBlock"
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
import { exampleCodeString } from "./exampleCodeString"
import { dummyRows, initialSlots } from "./dummydata"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sourceCodeString } from "./timelineCodeString"

const blockName = "timeline"

export default function Page() {
  const registryItem = getRegistryItemFromJson(blockName)

  const [slots, setSlots] = useState<TimelineSlotData[]>(initialSlots)
  const [percentageInView, setPercentageInView] = useState(100)
  if (!registryItem) {
    return <p>No registry item found</p>
  }

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
      <RegistryItemHeader
        registryItem={registryItem}
        source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/ui/timeline.tsx"
      />
      <Content>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-2xl font-bold">Timeline Demo</h2>
          <p className="text-muted-foreground">
            &quot;Gantt-chart&quot; style timeline component with drag-and-drop. Try dragging slots between different
            rows and watch for conflict validation. Press ESC to cancel a drag operation.
          </p>
        </div>
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
                      className={cn(
                        "gap-0 flex flex-col items-start justify-center px-2 bg-background dark:bg-zinc-900",
                      )}
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
                  code: sourceCodeString,
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
                  code: exampleCodeString,
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
              <li>Gantt-chart style timeline with drag-and-drop functionality</li>
              <li>Built on @dnd-kit/core for smooth, accessible drag interactions</li>
              <li>Configurable time range (start/end hours) and grid intervals</li>
              <li>Snap-to-interval positioning for precise time alignment</li>
              <li>Real-time conflict validation during drag operations</li>
              <li>Visual drop indicators and ghost previews</li>
              <li>Mouse time indicator for precise positioning</li>
              <li>Current time marker with auto-update</li>
              <li>Customizable zoom/scale with percentageInView prop</li>
              <li>Row-based organization with custom header rendering</li>
              <li>Quarter-hour and hour grid lines for visual guidance</li>
              <li>Keyboard navigation (ESC to cancel drag)</li>
              <li>Composable slot content with label and custom content components</li>
              <li>Fully typed with TypeScript</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">TimelineProvider</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">config</code> - TimelineConfig (required) -
                    Timeline configuration object
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">percentageInView</code> - number - Zoom level
                    (default: 100)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">onSlotPositionChange</code> - (slotId: string,
                    newTime: string, newRowId: string) =&gt; Promise&lt;boolean&gt; - Callback when slot position
                    changes
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">onValidateDrop</code> - (slotId: string, newTime:
                    string, newRowId: string) =&gt; boolean - Validation callback for drop operations
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">onSlotClick</code> - (slotId: string) =&gt; void -
                    Click handler for slots
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
                <h3 className="font-mono text-sm font-medium">Timeline</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">slots</code> - TimelineSlotData[] (required) -
                    Array of slot data
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">rows</code> - TimelineRowData[] (required) - Array
                    of row data
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
                <h3 className="font-mono text-sm font-medium">TimelineGrid</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode - TimelineHeader,
                    TimelineRow, and TimelineCurrentTime components
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">TimelineHeader</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">columnLabel</code> - React.ReactNode - Label for
                    the left column (default: &quot;Row&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">TimelineRow</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">row</code> - TimelineRowData (required) - Row data
                    object
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">slots</code> - TimelineSlotData[] (required) -
                    Array of slots for this row
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - (slot: TimelineSlotData) =&gt;
                    React.ReactNode (required) - Render function for slots
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">renderRowHeader</code> - (row: TimelineRowData)
                    =&gt; React.ReactNode - Custom row header renderer
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">TimelineSlot</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">slot</code> - TimelineSlotData (required) - Slot
                    data object
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode - Slot content
                    (use TimelineSlotLabel and TimelineSlotContent)
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">TimelineSlotLabel</h3>
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
                <h3 className="font-mono text-sm font-medium">TimelineSlotContent</h3>
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
                <h3 className="font-mono text-sm font-medium">TimelineCurrentTime</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">nowLabel</code> - string - Label for current time
                    indicator (default: &quot;Now&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Type Definitions</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">TimelineConfig</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">startHour</code> - number - Start hour (e.g., 9 for
                    9:00 AM)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">endHour</code> - number - End hour (e.g., 18 for
                    6:00 PM)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">snapIntervalMinutes</code> - number - Snap interval
                    in minutes (default: 15)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">columnWidth</code> - number - Width of left column
                    in pixels (default: 112)
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">TimelineSlotData</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">id</code> - string - Unique slot identifier
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">rowId</code> - string - Parent row identifier
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">startTime</code> - string - Start time in
                    &quot;HH:MM&quot; format (e.g., &quot;14:30&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">duration</code> - number - Duration in minutes
                  </li>
                  <li>Additional custom properties can be added as needed</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">TimelineRowData</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">id</code> - string - Unique row identifier
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">label</code> - string - Row label/name
                  </li>
                  <li>Additional custom properties can be added as needed</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Helper Functions</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">timeToMinutes(time: string): number</h3>
                <p className="text-muted-foreground text-sm">
                  Converts time string (e.g., &quot;14:30&quot;) to total minutes from midnight.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">minutesToTime(minutes: number): string</h3>
                <p className="text-muted-foreground text-sm">
                  Converts total minutes from midnight to time string in &quot;HH:MM&quot; format.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Content>
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
