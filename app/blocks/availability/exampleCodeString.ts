export const exampleCodeString = `"use client"

import { useState } from "react"
import { Availability, type TimeSpan } from "@/registry/abui/ui/availability"

export default function AvailabilityDemo() {
  const [data, setData] = useState<TimeSpan[]>([
    { 
      nanoid: "1", 
      week_day: 1, 
      start_time: "09:00", 
      end_time: "12:00", 
      active: true 
    },
    { 
      nanoid: "2", 
      week_day: 3, 
      start_time: "14:00", 
      end_time: "16:00", 
      active: true 
    },
    { 
      nanoid: "3", 
      week_day: 5, 
      start_time: "10:00", 
      end_time: "11:30", 
      active: true 
    }
  ])

  return (
    <div className="w-full p-4 bg-background border rounded-lg">
      <Availability 
        value={data} 
        onValueChange={setData}
        startTime={6}
        endTime={22}
      />
    </div>
  )
}
`
