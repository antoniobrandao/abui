"use client"

import * as React from "react"
import { useState } from "react"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import { Availability, type TimeSpan } from "@/registry/abui/ui/availability"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sourceCodeString } from "./availabilityCodeString"
import { exampleCodeString } from "./exampleCodeString"

const blockName = "availability"

export default function Page() {
  const registryItem = getRegistryItemFromJson(blockName)

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

  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <div>
      <RegistryItemHeader registryItem={registryItem} />
      <Content>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-2xl font-bold">Availability Designer</h2>
          <p className="text-muted-foreground">
            A weekly schedule component for managing availability time slots. Supports creation by click or drag, and resizing time slots.
          </p>
        </div>
        
        <div className="mt-8 w-full">
          <Availability 
            value={data} 
            onValueChange={setData}
            startTime={7}
            endTime={23}
            useAmPm={false}
          />
        </div>
      </Content>

      <Content>
        <Tabs defaultValue="example" className="w-full">
          <TabsList>
            <TabsTrigger value="example">Example usage</TabsTrigger>
            <TabsTrigger value="code">Source code</TabsTrigger>
          </TabsList>
          <TabsContent value="example">
            <CodeBlockComponent
              className="max-h-[500px] overflow-y-auto"
              code={[
                {
                  language: "tsx",
                  filename: "example.tsx",
                  code: exampleCodeString,
                },
              ]}
            />
          </TabsContent>
          <TabsContent value="code">
            <CodeBlockComponent
              className="max-h-[500px] overflow-y-auto"
              code={[
                {
                  language: "tsx",
                  filename: "availability.tsx",
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
              <li>Drag and drop time slots between days</li>
              <li>Resize time slots from top or bottom</li>
              <li>Click and drag on empty space to create new slots</li>
              <li>Configurable start/end times and time increments</li>
              <li>Supports AM/PM or 24h format</li>
              <li>Built with @dnd-kit for accessible interactions</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">Availability</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">value</code> - TimeSpan[] - Array of time slot objects
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">onValueChange</code> - (value: TimeSpan[]) ={'>'} void - Callback when slots change
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">days</code> - number[] - Array of day indices (0-6) to display
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">timeIncrements</code> - number - Grid interval in minutes (default: 30)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">startTime</code> - number - Start hour (0-23)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">endTime</code> - number - End hour (0-23)
                  </li>
                  <li>
                     <code className="bg-muted rounded px-1.5 py-0.5">useAmPm</code> - boolean - Use AM/PM format instead of 24h
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>
  )
}

