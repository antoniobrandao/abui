"use client"

import * as React from "react"
import { type TOCItemType, TOCProvider, PageTOC, PageTOCItems } from "@/registry/abui/ui/toc"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { AnimatedChart } from "@/registry/abui/marketing/animated-chart"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import { Button } from "@/components/ui/button"
import { defaultExampleData, repositionedLabelsExampleData, coloredExampleData } from "./example-data"

const blockName = "animated-chart"

const tocItems: TOCItemType[] = [
  { title: "Default", url: "#default-example", depth: 1 },
  { title: "Repositioned Top Labels", url: "#repositioned-labels-example", depth: 1 },
  { title: "Colored", url: "#colored-example", depth: 1 },
  { title: "Features", url: "#features", depth: 2 },
  { title: "Component Props", url: "#component-props", depth: 3 },
  { title: "AnimatedChart", url: "#animatedchart-props", depth: 3 },
  { title: "ColumnData", url: "#columndata-props", depth: 3 },
]

export default function Page() {
  const [defaultDataIndex, setDefaultDataIndex] = React.useState(0)
  const [repositionedDataIndex, setRepositionedDataIndex] = React.useState(0)
  const [coloredDataIndex, setColoredDataIndex] = React.useState(0)
  const registryItem = getRegistryItemFromJson(blockName)

  if (!registryItem) {
    return <p>No registry item found</p>
  }

  const defaultData = defaultExampleData[defaultDataIndex]
  const repositionedData = repositionedLabelsExampleData[repositionedDataIndex]
  const coloredData = coloredExampleData[coloredDataIndex]

  return (
    <TOCProvider toc={tocItems}>
      <div className="flex gap-8 relative">
        <div className="flex-1 min-w-0">
          <RegistryItemHeader
            registryItem={registryItem}
            source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/marketing/animated-chart.tsx"
          />
          <Content>
            <div className="w-full flex flex-col gap-8">
              {/* Example 1: Default */}
              <div className="flex flex-col gap-4">
                <div className="text-sm font-medium">Default</div>
                <p className="text-sm text-muted-foreground">
                  Basic animated chart with default styling. Toggle between datasets to see the animation.
                </p>
                <div className="flex gap-2 mb-2">
                  <Button
                    onClick={() => setDefaultDataIndex(0)}
                    variant={defaultDataIndex === 0 ? "default" : "secondary"}
                    size="sm"
                  >
                    Dataset A
                  </Button>
                  <Button
                    onClick={() => setDefaultDataIndex(1)}
                    variant={defaultDataIndex === 1 ? "default" : "secondary"}
                    size="sm"
                  >
                    Dataset B
                  </Button>
                </div>
                <div className="w-full h-[300px] relative" id="default-example">
                  <AnimatedChart
                    columns={defaultData.columns}
                    maxValue={defaultData.maxValue}
                    restartOnDataChange={true}
                    className="h-[250px]"
                  />
                </div>
                <CodeBlockComponent
                  code={[
                    {
                      language: "tsx",
                      filename: "default-example.tsx",
                      code: `<AnimatedChart
  columns={[
    { title: "TV", value: 13.9, appendString: "h/wk", animationDelay: 0 },
    { title: "Social Media", value: 13.1, animationDelay: 0.3 },
    // ... more columns
  ]}
  maxValue={15}
  restartOnDataChange={true}
/>`,
                    },
                  ]}
                />
              </div>

              {/* Example 2: Repositioned Top Labels */}
              <div className="flex flex-col gap-4">
                <div className="text-sm font-medium">Repositioned Top Labels</div>
                <p className="text-sm text-muted-foreground">
                  For charts where values can reach maximum, labels can be repositioned to avoid overlapping with the
                  column bars.
                </p>
                <div className="flex gap-2 mb-2">
                  <Button
                    onClick={() => setRepositionedDataIndex(0)}
                    variant={repositionedDataIndex === 0 ? "default" : "secondary"}
                    size="sm"
                  >
                    Dataset A
                  </Button>
                  <Button
                    onClick={() => setRepositionedDataIndex(1)}
                    variant={repositionedDataIndex === 1 ? "default" : "secondary"}
                    size="sm"
                  >
                    Dataset B
                  </Button>
                </div>
                <div className="w-full h-[300px] relative pt-10" id="repositioned-labels-example">
                  <AnimatedChart
                    titleClassName="relative -top-10"
                    columns={repositionedData.columns}
                    maxValue={repositionedData.maxValue}
                    restartOnDataChange={true}
                    className="h-[250px]"
                  />
                </div>
                <CodeBlockComponent
                  code={[
                    {
                      language: "tsx",
                      filename: "repositioned-labels-example.tsx",
                      code: `<AnimatedChart
  titleClassName="relative -top-10"
  columns={[
    { title: "Gaming", value: 100, appendString: "%" },
    { title: "Online Video", value: 86 },
    // ... more columns
  ]}
  maxValue={100}
  restartOnDataChange={true}
/>`,
                    },
                  ]}
                />
              </div>

              {/* Example 3: Colored */}
              <div className="flex flex-col gap-4">
                <div className="text-sm font-medium">Colored</div>
                <p className="text-sm text-muted-foreground">
                  Customize colors per column using className props for titles, values, bars, and borders.
                </p>
                <div className="flex gap-2 mb-2">
                  <Button
                    onClick={() => setColoredDataIndex(0)}
                    variant={coloredDataIndex === 0 ? "default" : "secondary"}
                    size="sm"
                  >
                    Dataset A
                  </Button>
                  <Button
                    onClick={() => setColoredDataIndex(1)}
                    variant={coloredDataIndex === 1 ? "default" : "secondary"}
                    size="sm"
                  >
                    Dataset B
                  </Button>
                </div>
                <div className="w-full h-[300px] relative" id="colored-example">
                  <AnimatedChart
                    columns={coloredData.columns}
                    maxValue={coloredData.maxValue}
                    restartOnDataChange={true}
                    className="h-[250px]"
                  />
                </div>
                <CodeBlockComponent
                  code={[
                    {
                      language: "tsx",
                      filename: "colored-example.tsx",
                      code: `<AnimatedChart
  columns={[
    {
      title: "TV",
      value: 12,
      appendString: "h/wk",
      className: "bg-blue-500/10",
      titleClassName: "text-blue-500",
      valueClassName: "text-blue-500",
      topBorderClassName: "border-blue-500/50",
    },
    {
      title: "Mobile Games",
      value: 8,
      appendString: "h/wk",
      className: "bg-pink-500/10",
      titleClassName: "text-pink-500",
      valueClassName: "text-pink-500",
      topBorderClassName: "border-pink-500",
    },
    // ... more columns
  ]}
  maxValue={15}
  restartOnDataChange={true}
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
                  <li>
                    Optional restart animation on data change via <code className="code-text">restartOnDataChange</code>{" "}
                    prop
                  </li>
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
                        <code className="code-text">maxValue</code> - number (required) - Maximum value for scaling
                        column heights
                      </li>
                      <li>
                        <code className="code-text">titleClassName</code> - string - Global className for all column
                        titles
                      </li>
                      <li>
                        <code className="code-text">valueClassName</code> - string - Global className for all column
                        values
                      </li>
                      <li>
                        <code className="code-text">restartOnDataChange</code> - boolean - When true, columns animate
                        from zero whenever data changes (default: false)
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
                        <code className="code-text">prependString</code> - string - String to prepend before the value
                        (e.g., &quot;$&quot;)
                      </li>
                      <li>
                        <code className="code-text">appendString</code> - string - String to append after the value
                        (e.g., &quot;%&quot;, &quot;h/wk&quot;)
                      </li>
                      <li>
                        <code className="code-text">animationDuration</code> - number - Animation duration in seconds
                        (default: 1)
                      </li>
                      <li>
                        <code className="code-text">animationDelay</code> - number - Animation delay in seconds
                        (default: 0)
                      </li>
                      <li>
                        <code className="code-text">className</code> - string - ClassName for the animated column bar
                      </li>
                      <li>
                        <code className="code-text">topBorderClassName</code> - string - ClassName for the column&apos;s
                        top border
                      </li>
                      <li>
                        <code className="code-text">titleClassName</code> - string - ClassName for this column&apos;s
                        title (overrides global)
                      </li>
                      <li>
                        <code className="code-text">valueClassName</code> - string - ClassName for this column&apos;s
                        value (overrides global)
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
