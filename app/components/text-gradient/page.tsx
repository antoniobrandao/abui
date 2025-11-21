"use client"

import * as React from "react"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { TextGradient } from "@/registry/abui/effects/text-gradient"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import ExamplePlusCodeTabs from "@/components/custom/ExamplePlusCodeTabs"
import { Spinner } from "@/registry/abui/ui/spinner"

const componentName = "text-gradient"

export default function Page() {
  const registryItem = getRegistryItemFromJson(componentName)
  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <div>
      <RegistryItemHeader
        registryItem={registryItem}
        source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/effects/text-gradient.tsx"
      />
      <Content>
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Default</div>

            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center gap-8 p-8 bg-muted-foreground/3 rounded border">
                  <TextGradient className="text-base">Thinking...</TextGradient>
                </div>
              }
              code={{
                language: "tsx",
                filename: "default.tsx",
                code: `<TextGradient className="text-base">Thinking...</TextGradient>`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Fast animation</div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center gap-8 p-8 bg-muted-foreground/3 rounded border">
                  <TextGradient className="text-base" duration={0.5}>
                    Loading...
                  </TextGradient>
                </div>
              }
              code={{
                language: "tsx",
                filename: "fast-animation.tsx",
                code: `<TextGradient className="text-base" duration={0.5}>
  Loading...
</TextGradient>`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Large text</div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center gap-8 p-8 bg-muted-foreground/3 rounded border">
                  <TextGradient className="text-2xl">Analyzing Data</TextGradient>
                </div>
              }
              code={{
                language: "tsx",
                filename: "large-text.tsx",
                code: `<TextGradient className="text-2xl">Analyzing Data</TextGradient>`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Wide spread</div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center gap-8 p-8 bg-muted-foreground/3 rounded border">
                  <TextGradient className="text-base" spread={100}>
                    Generating response...
                  </TextGradient>
                </div>
              }
              code={{
                language: "tsx",
                filename: "wide-spread.tsx",
                code: `<TextGradient className="text-base" spread={100}>
  Generating response...
</TextGradient>`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">With spinner</div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center gap-2 p-8 bg-muted-foreground/3 rounded border">
                  <Spinner size="sm" />
                  <TextGradient className="text-base" spread={10}>
                    Computing...
                  </TextGradient>
                </div>
              }
              code={{
                language: "tsx",
                filename: "narrow-spread.tsx",
                code: `import { Spinner } from "@/components/ui/spinner"

<Spinner size="sm" />
<TextGradient className="text-base" spread={10}>
  Computing...
</TextGradient>`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Within text</div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="flex items-center justify-center gap-8 p-8 bg-muted-foreground/3 text-muted-foreground/80 border">
                  <p className="text-xl">
                    I am{" "}
                    <TextGradient className="text-xl" highlightColor="white" baseColor="var(--primary)">
                      thinking
                    </TextGradient>{" "}
                    about your question
                  </p>
                </div>
              }
              code={{
                language: "tsx",
                filename: "in-context.tsx",
                code: `<p className="text-xl">
  AI is <TextGradient className="text-xl">thinking</TextGradient> about your question
</p>`,
              }}
            />
          </div>
        </div>
      </Content>

      <Content>
        <div className="flex flex-col gap-6 w-full">
          <div>
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="space-y-2 text-muted-foreground text-sm list-inside list-disc">
              <li>Moving gradient animation effect for text</li>
              <li>Configurable animation duration</li>
              <li>Customizable spread distance for gradient effect</li>
              <li>Customizable highlight and base colors</li>
              <li>Uses CSS background-clip for text masking</li>
              <li>Smooth CSS animation with background-position</li>
              <li>Fully typed with TypeScript</li>
              <li>Inspired by Vercel&apos;s components.build</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">TextGradient</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode - The text
                    content to display with the gradient effect
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">spread</code> - number - The spread distance for
                    the gradient effect in pixels (default: 22)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">highlightColor</code> - string - The background
                    color for the gradient highlight (default: &quot;hsl(var(--background))&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">baseColor</code> - string - The base text color
                    (shows through the gradient) (default: &quot;hsl(var(--muted-foreground))&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">duration</code> - number - Animation duration in
                    seconds (default: 3)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string - Additional CSS classes
                    to apply to the component
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">How It Works</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>The text gradient effect uses a clever combination of CSS properties to create a moving highlight:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Two-layer background:</strong> A moving transparent-to-highlight-to-transparent gradient
                  layered over a solid base color
                </li>
                <li>
                  <strong>Background clipping:</strong> The{" "}
                  <code className="bg-muted rounded px-1.5 py-0.5">bg-clip-text</code> property clips the background to
                  the text shape
                </li>
                <li>
                  <strong>CSS animation:</strong> Animates the{" "}
                  <code className="bg-muted rounded px-1.5 py-0.5">background-position</code> from 0% to 200% for a
                  smooth scrolling effect
                </li>
                <li>
                  <strong>Custom properties:</strong> Uses CSS variables for easy customization of colors and spread
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Content>
    </div>
  )
}
