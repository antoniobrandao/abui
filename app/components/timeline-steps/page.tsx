"use client"

import * as React from "react"
import { type TOCItemType, TOCProvider, PageTOC, PageTOCItems } from "@/registry/abui/ui/toc"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import ExamplePlusCodeTabs from "@/components/custom/ExamplePlusCodeTabs"

import TimelineDemo from "./examples/timeline-steps-demo"
import TimelineActivityFeed from "./examples/timeline-steps-activity-feed"
import TimelineHorizontal from "./examples/timeline-steps-horizontal"
import TimelineWithIcons from "./examples/timeline-steps-with-icons"
import { demoCode, withIconsCode, activityFeedCode, horizontalCode } from "./code-strings"

const componentName = "timeline-steps"

const tocItems: TOCItemType[] = [
  { title: "Examples", url: "#examples", depth: 2 },
  { title: "Default", url: "#default", depth: 3 },
  { title: "With Icons and Status", url: "#with-icons", depth: 3 },
  { title: "Activity Feed", url: "#activity-feed", depth: 3 },
  { title: "Horizontal", url: "#horizontal", depth: 3 },
  { title: "Features", url: "#features", depth: 2 },
  { title: "Component Props", url: "#component-props", depth: 2 },
  { title: "TimelineSteps", url: "#timelinesteps-props", depth: 3 },
  { title: "TimelineStepsItem", url: "#timelinestepsitem-props", depth: 3 },
  { title: "TimelineStepsConnector", url: "#timelinestepsconnector-props", depth: 3 },
  { title: "TimelineStepsIcon", url: "#timelinestepsicon-props", depth: 3 },
  { title: "Other Components", url: "#other-components-props", depth: 3 },
  { title: "Usage", url: "#usage", depth: 2 },
]

export default function Page() {
  const registryItem = getRegistryItemFromJson(componentName)
  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <TOCProvider toc={tocItems}>
      <div className="flex gap-8 relative">
        <div className="flex-1 min-w-0">
          <RegistryItemHeader
            registryItem={registryItem}
            source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/ui/timeline-steps.tsx"
          />
          <Content>
            <div className="w-full flex flex-col gap-8" id="examples">
              <div className="flex flex-col gap-4" id="default">
                <div className="text-sm font-medium">Default</div>

            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center p-8 bg-muted-foreground/3 rounded border">
                  <TimelineDemo />
                </div>
              }
              code={{
                language: "tsx",
                filename: "timeline-steps-demo.tsx",
                code: demoCode,
              }}
            />
          </div>

          <div className="flex flex-col gap-4" id="with-icons">
            <div className="text-sm font-medium">With Icons and Status</div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center p-8 bg-muted-foreground/3 rounded border">
                  <TimelineWithIcons />
                </div>
              }
              code={{
                language: "tsx",
                filename: "timeline-steps-with-icons.tsx",
                code: withIconsCode,
              }}
            />
          </div>

          <div className="flex flex-col gap-4" id="activity-feed">
            <div className="text-sm font-medium">Activity Feed</div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center p-8 bg-muted-foreground/3 rounded border">
                  <TimelineActivityFeed />
                </div>
              }
              code={{
                language: "tsx",
                filename: "timeline-steps-activity-feed.tsx",
                code: activityFeedCode,
              }}
            />
          </div>

          <div className="flex flex-col gap-4" id="horizontal">
            <div className="text-sm font-medium">Horizontal</div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center p-8 bg-muted-foreground/3 rounded border">
                  <TimelineHorizontal />
                </div>
              }
              code={{
                language: "tsx",
                filename: "timeline-steps-horizontal.tsx",
                code: horizontalCode,
              }}
            />
          </div>
        </div>
      </Content>

      <Content>
        <div className="flex flex-col gap-6 w-full" id="features">
          <div>
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="space-y-2 text-muted-foreground text-sm list-inside list-disc">
              <li>Vertical and horizontal orientations</li>
              <li>Multiple status states: default, completed, current, upcoming</li>
              <li>Customizable icons with size variants (sm, default, lg)</li>
              <li>Icon color variants: default, primary, secondary, destructive, outline</li>
              <li>Connector line styles: solid, dashed, dotted</li>
              <li>Built with CSS variables for easy theming</li>
              <li>Fully composable component architecture</li>
              <li>Works with avatars and custom content</li>
              <li>Fully typed with TypeScript</li>
            </ul>
          </div>

          <div id="component-props">
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2" id="timelinesteps-props">
                <h3 className="font-mono text-sm font-medium">TimelineSteps</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="code-text">orientation</code> - &quot;vertical&quot; |
                    &quot;horizontal&quot; - Layout direction (default: &quot;vertical&quot;)
                  </li>
                  <li>
                    <code className="code-text">position</code> - &quot;left&quot; |
                    &quot;right&quot; | &quot;alternate&quot; - Position of the timeline line
                  </li>
                </ul>
              </div>

              <div className="space-y-2" id="timelinestepsitem-props">
                <h3 className="font-mono text-sm font-medium">TimelineStepsItem</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="code-text">orientation</code> - &quot;vertical&quot; |
                    &quot;horizontal&quot; - Layout direction for the item
                  </li>
                  <li>
                    <code className="code-text">status</code> - &quot;default&quot; |
                    &quot;completed&quot; | &quot;current&quot; | &quot;upcoming&quot; - Visual status of the item
                  </li>
                </ul>
              </div>

              <div className="space-y-2" id="timelinestepsconnector-props">
                <h3 className="font-mono text-sm font-medium">TimelineStepsConnector</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="code-text">orientation</code> - &quot;vertical&quot; |
                    &quot;horizontal&quot; - Direction of the connector line
                  </li>
                  <li>
                    <code className="code-text">variant</code> - &quot;default&quot; |
                    &quot;dashed&quot; | &quot;dotted&quot; - Line style
                  </li>
                  <li>
                    <code className="code-text">status</code> - &quot;default&quot; |
                    &quot;completed&quot; | &quot;current&quot; | &quot;upcoming&quot; - Visual status
                  </li>
                </ul>
              </div>

              <div className="space-y-2" id="timelinestepsicon-props">
                <h3 className="font-mono text-sm font-medium">TimelineStepsIcon</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="code-text">size</code> - &quot;sm&quot; | &quot;default&quot;
                    | &quot;lg&quot; - Icon size
                  </li>
                  <li>
                    <code className="code-text">variant</code> - &quot;default&quot; |
                    &quot;primary&quot; | &quot;secondary&quot; | &quot;destructive&quot; | &quot;outline&quot; - Icon
                    style variant
                  </li>
                </ul>
              </div>

              <div className="space-y-2" id="other-components-props">
                <h3 className="font-mono text-sm font-medium">Other Components</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="code-text">TimelineStepsHeader</code> - Container for icon and
                    title row
                  </li>
                  <li>
                    <code className="code-text">TimelineStepsContent</code> - Container for
                    description and time
                  </li>
                  <li>
                    <code className="code-text">TimelineStepsTitle</code> - Title text component
                  </li>
                  <li>
                    <code className="code-text">TimelineStepsDescription</code> - Description text
                    component
                  </li>
                  <li>
                    <code className="code-text">TimelineStepsTime</code> - Time/date display
                    component
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div id="usage">
            <h2 className="text-lg font-semibold mb-2">Usage</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>The TimelineSteps component is fully composable, allowing you to build various timeline layouts:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Order tracking:</strong> Show step-by-step order progress with status indicators
                </li>
                <li>
                  <strong>Activity feeds:</strong> Display user actions with avatars and timestamps
                </li>
                <li>
                  <strong>Process flows:</strong> Visualize multi-step workflows horizontally or vertically
                </li>
                <li>
                  <strong>Event history:</strong> Show chronological events with descriptions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Content>
        </div>

        {/* TOC Sidebar */}
        <aside className="hidden xl:block w-64 shrink-0">
          <PageTOC className="sticky top-20">
            <p className="mb-1 font-medium text-sm">On This Page</p>
            <PageTOCItems variant="clerk" />
          </PageTOC>
        </aside>
      </div>
    </TOCProvider>
  )
}
