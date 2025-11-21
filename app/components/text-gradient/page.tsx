"use client"

import { TextGradient } from "@/registry/abui/effects/text-gradient"
import { CardTitle } from "@/components/ui/card"

export default function TextGradientDemo() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Text Gradient Effect</h1>
          <p className="text-muted-foreground">
            A moving gradient animation effect for text, inspired by Vercel's components.build
          </p>
        </div>

        <div className="space-y-8">
          {/* Default Example */}
          <div className="space-y-4 p-8 border rounded">
            <CardTitle>Default</CardTitle>
            <div className="flex items-center justify-center min-h-[100px]">
              <TextGradient className="text-lg">Thinking...</TextGradient>
            </div>
          </div>

          {/* Fast Animation */}
          <div className="space-y-4 p-8 border rounded">
            <CardTitle>Fast Animation (0.5s)</CardTitle>
            <div className="flex items-center justify-center min-h-[100px]">
              <TextGradient className="text-lg" duration={0.5}>
                Loading...
              </TextGradient>
            </div>
          </div>

          {/* Large Text */}
          <div className="space-y-4 p-8 border rounded">
            <CardTitle>Large Text</CardTitle>
            <div className="flex items-center justify-center min-h-[100px]">
              <TextGradient className="text-2xl">Analyzing Data</TextGradient>
            </div>
          </div>

          {/* Custom Spread */}
          <div className="space-y-4 p-8 border rounded">
            <CardTitle>Wide Spread (100px)</CardTitle>
            <div className="flex items-center justify-center min-h-[100px]">
              <TextGradient className="text-2xl" spread={100}>
                Generating response...
              </TextGradient>
            </div>
          </div>

          {/* Narrow Spread */}
          <div className="space-y-4 p-8 border rounded">
            <CardTitle>Narrow Spread (10px)</CardTitle>
            <div className="flex items-center justify-center min-h-[100px]">
              <TextGradient className="text-2xl" spread={10}>
                Computing...
              </TextGradient>
            </div>
          </div>

          {/* In Context */}
          <div className="space-y-4 p-8 border rounded">
            <CardTitle>In Context</CardTitle>
            <div className="flex items-center justify-center min-h-[100px]">
              <p className="text-xl">
                AI is <TextGradient className="text-xl">thinking</TextGradient> about your question
              </p>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="space-y-4 p-8 border rounded-lg bg-muted/50">
          <CardTitle>Usage</CardTitle>
          <pre className="bg-background p-4 rounded-lg overflow-x-auto">
            <code>{`import { TextGradient } from "@/registry/abui/effects/text-gradient"

export default function Example() {
  return (
    <TextGradient 
      className="text-2xl"
      duration={3}
      spread={22}
    >
      Thinking...
    </TextGradient>
  )
}`}</code>
          </pre>
        </div>

        {/* Props Documentation */}
        <div className="space-y-4 p-8 border rounded-lg bg-muted/50">
          <CardTitle>Props</CardTitle>
          <div className="space-y-4">
            <div>
              <code className="text-sm font-mono bg-background px-2 py-1 rounded">children</code>
              <p className="text-sm text-muted-foreground mt-1">
                The text content to display with the gradient effect.
              </p>
            </div>
            <div>
              <code className="text-sm font-mono bg-background px-2 py-1 rounded">spread</code>
              <p className="text-sm text-muted-foreground mt-1">
                The spread distance for the gradient effect in pixels. Default: <code>22</code>
              </p>
            </div>
            <div>
              <code className="text-sm font-mono bg-background px-2 py-1 rounded">highlightColor</code>
              <p className="text-sm text-muted-foreground mt-1">
                The background color for the gradient highlight. Default: <code>"hsl(var(--background))"</code>
              </p>
            </div>
            <div>
              <code className="text-sm font-mono bg-background px-2 py-1 rounded">baseColor</code>
              <p className="text-sm text-muted-foreground mt-1">
                The base text color (shows through the gradient). Default: <code>"hsl(var(--muted-foreground))"</code>
              </p>
            </div>
            <div>
              <code className="text-sm font-mono bg-background px-2 py-1 rounded">duration</code>
              <p className="text-sm text-muted-foreground mt-1">
                Animation duration in seconds. Default: <code>3</code>
              </p>
            </div>
            <div>
              <code className="text-sm font-mono bg-background px-2 py-1 rounded">className</code>
              <p className="text-sm text-muted-foreground mt-1">Additional CSS classes to apply to the component.</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="space-y-4 p-8 border rounded-lg bg-muted/50">
          <CardTitle>How It Works</CardTitle>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>The text gradient effect uses a clever combination of CSS properties to create a moving highlight:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Two-layer background:</strong> A moving transparent-to-highlight-to-transparent gradient layered
                over a solid base color
              </li>
              <li>
                <strong>Background clipping:</strong> The <code>bg-clip-text</code> property clips the background to the
                text shape
              </li>
              <li>
                <strong>CSS animation:</strong> Animates the <code>background-position</code> from 0% to 200% for a
                smooth scrolling effect
              </li>
              <li>
                <strong>Custom properties:</strong> Uses CSS variables for easy customization of colors and spread
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
