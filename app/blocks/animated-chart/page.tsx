"use client"

import * as React from "react"
import { type TOCItemType, TOCProvider, PageTOC, PageTOCItems } from "@/registry/abui/ui/toc"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { AnimatedChart } from "@/registry/abui/marketing/animated-chart"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import { Button } from "@/components/ui/button"
import { exampleData } from "./example-data"

const blockName = "animated-chart"

const tocItems: TOCItemType[] = [
  { title: "Examples", url: "#examples", depth: 2 },
  { title: "Interactive Demo", url: "#interactive-demo", depth: 3 },
  { title: "Features", url: "#features", depth: 2 },
  { title: "Component Props", url: "#component-props", depth: 2 },
  { title: "AnimatedChart", url: "#animatedchart-props", depth: 3 },
  { title: "ColumnData", url: "#columndata-props", depth: 3 },
]

export default function Page() {
  const [dataIndex, setDataIndex] = React.useState(0)
  const registryItem = getRegistryItemFromJson(blockName)

  if (!registryItem) {
    return <p>No registry item found</p>
  }

  const currentData = exampleData[dataIndex]

  return (
    <TOCProvider toc={tocItems}>
      <div className="flex gap-8 relative">
        <div className="flex-1 min-w-0">
          <RegistryItemHeader
            registryItem={registryItem}
            source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/marketing/animated-chart.tsx"
          />
          <Content>
            <div className="w-full flex flex-col gap-8" id="examples">
              <div className="flex flex-col gap-4" id="interactive-demo">
                <div className="text-sm font-medium">Interactive Demo</div>
                <p className="text-sm text-muted-foreground">
                  Toggle between datasets to see the chart animate smoothly between different values.
                </p>
                <div className="flex gap-2 mb-2">
                  <Button
                    onClick={() => setDataIndex(0)}
                    variant={dataIndex === 0 ? "default" : "secondary"}
                    size="sm"
                  >
                    Media Consumption (h/wk)
                  </Button>
                  <Button
                    onClick={() => setDataIndex(1)}
                    variant={dataIndex === 1 ? "default" : "secondary"}
                    size="sm"
                  >
                    Activity Reach (%)
                  </Button>
                </div>
                <div className="w-full h-[300px] relative">
                  <AnimatedChart
                    columns={currentData.columns}
                    maxValue={currentData.maxValue}
                    restartOnDataChange={true}
                    className="h-[250px]"
                  />
                </div>
                <CodeBlockComponent
                  code={[
                    {
                      language: "tsx",
                      filename: "interactive-demo.tsx",
                      code: `const [dataIndex, setDataIndex] = useState(0)
const datasets = [
  {
    maxValue: 15,
    columns: [
      { title: "TV", value: 13.9, appendString: "h/wk", ... },
      { title: "Social Media", value: 13.1, ... },
      // ... more columns
    ]
  },
  {
    maxValue: 100,
    columns: [
      { title: "Gaming", value: 100, appendString: "%", ... },
      { title: "Online Video", value: 86, ... },
      // ... more columns
    ]
  }
]

<AnimatedChart
  columns={datasets[dataIndex].columns}
  maxValue={datasets[dataIndex].maxValue}
  restartOnDataChange={true}
  className="h-[250px]"
/>`,
                    },
                  ]}
                />
              </div>
            </div>
          </Content>

          <Content>
            <div className="flex flex-col gap-6 w-full" id="features">
              <div>
                <h2 className="text-lg font-semibold mb-2">Features</h2>
                <ul className="space-y-2 text-muted-foreground text-sm list-inside list-disc">
                  <li>Animated column bars with spring physics using Motion</li>
                  <li>Automatic animation trigger when component enters viewport</li>
                  <li>Optional restart animation on data change via <code className="code-text">restartOnDataChange</code> prop</li>
                  <li>Configurable animation duration and delay per column for staggered effects</li>
                  <li>Support for prepend/append strings (currency, units, percentages)</li>
                  <li>Per-column styling with className overrides for bars, titles, and values</li>
                  <li>Global styling props that can be overridden at the column level</li>
                  <li>Responsive layout that adapts to container width</li>
                  <li>Fully typed with TypeScript</li>
                </ul>
              </div>

              <div id="component-props">
                <h2 className="text-lg font-semibold mb-4">Component Props</h2>
                <div className="space-y-6">
                  <div className="space-y-2" id="animatedchart-props">
                    <h3 className="font-mono text-sm font-medium">AnimatedChart</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                      <li>
                        <code className="code-text">columns</code> - ColumnData[] (required) - Array of column data
                      </li>
                      <li>
                        <code className="code-text">maxValue</code> - number (required) - Maximum value for scaling column heights
                      </li>
                      <li>
                        <code className="code-text">titleClassName</code> - string - Global className for all column titles
                      </li>
                      <li>
                        <code className="code-text">valueClassName</code> - string - Global className for all column values
                      </li>
                      <li>
                        <code className="code-text">restartOnDataChange</code> - boolean - When true, columns animate from zero whenever data changes (default: false)
                      </li>
                      <li>
                        <code className="code-text">className</code> - string - Additional classes for the container
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2" id="columndata-props">
                    <h3 className="font-mono text-sm font-medium">ColumnData</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                      <li>
                        <code className="code-text">title</code> - string (required) - Column title displayed at the top
                      </li>
                      <li>
                        <code className="code-text">value</code> - number (required) - The numeric value for this column
                      </li>
                      <li>
                        <code className="code-text">prependString</code> - string - String to prepend before the value (e.g., &quot;$&quot;)
                      </li>
                      <li>
                        <code className="code-text">appendString</code> - string - String to append after the value (e.g., &quot;%&quot;, &quot;h/wk&quot;)
                      </li>
                      <li>
                        <code className="code-text">animationDuration</code> - number - Animation duration in seconds (default: 1)
                      </li>
                      <li>
                        <code className="code-text">animationDelay</code> - number - Animation delay in seconds (default: 0)
                      </li>
                      <li>
                        <code className="code-text">className</code> - string - ClassName for the animated column bar
                      </li>
                      <li>
                        <code className="code-text">topBorderClassName</code> - string - ClassName for the column&apos;s top border
                      </li>
                      <li>
                        <code className="code-text">titleClassName</code> - string - ClassName for this column&apos;s title (overrides global)
                      </li>
                      <li>
                        <code className="code-text">valueClassName</code> - string - ClassName for this column&apos;s value (overrides global)
                      </li>
                    </ul>
                  </div>
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

