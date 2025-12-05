import * as React from "react"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { ItemContent } from "@/registry/abui/marketing/scroll-reveal-content-a"
import ScrollRevealContentA from "@/registry/abui/marketing/scroll-reveal-content-a"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"

const blockName = "scroll-reveal-content-a"

export default function Page() {
  const registryItem = getRegistryItemFromJson(blockName)
  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <>
      <RegistryItemHeader
        registryItem={registryItem}
        source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/marketing/scroll-reveal-content-a.tsx"
      />
      <ScrollRevealContentA contentA={dummyContentA} contentB={dummyContentB} contentC={dummyContentC} />
      <Content className="h-40"></Content>

      <Content>
        <div className="flex flex-col gap-6 w-full">
          <div>
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="space-y-2 text-muted-foreground text-sm list-inside list-disc">
              <li>Scroll-based content reveal animation</li>
              <li>Three content sections with synchronized image transitions</li>
              <li>Sticky positioning for smooth parallax-like effect</li>
              <li>Built with Framer Motion for smooth scroll tracking</li>
              <li>Progressive reveal with numbered sections</li>
              <li>Responsive layout with mobile and desktop variations</li>
              <li>Customizable title and description styling</li>
              <li>Opacity-based transitions for visual hierarchy</li>
              <li>Fully typed with TypeScript</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">ScrollRevealContentA</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="code-text">contentA</code> - ItemContent (required) - First section content
                  </li>
                  <li>
                    <code className="code-text">contentB</code> - ItemContent (required) - Second section content
                  </li>
                  <li>
                    <code className="code-text">contentC</code> - ItemContent (required) - Third section content
                  </li>
                  <li>
                    <code className="code-text">titleClass</code> - string - Custom CSS classes for titles
                  </li>
                  <li>
                    <code className="code-text">descriptionClass</code> - string - Custom CSS classes for descriptions
                  </li>
                  <li>
                    <code className="code-text">className</code> - string
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">ItemContent (Type)</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="code-text">title</code> - string - Section title
                  </li>
                  <li>
                    <code className="code-text">description</code> - string - Section description
                  </li>
                  <li>
                    <code className="code-text">image</code> - object - Image configuration:
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>
                        <code className="code-text">url</code> - string - Image URL
                      </li>
                      <li>
                        <code className="code-text">width</code> - number - Image width
                      </li>
                      <li>
                        <code className="code-text">height</code> - number - Image height
                      </li>
                      <li>
                        <code className="code-text">alt</code> - string - Alt text
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Usage Notes</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                This component creates a scroll-driven content reveal effect with three sections. As users scroll,
                content items fade in progressively with a vertical progress bar indicator.
              </p>
              <p>
                The component requires a substantial height (300vh) to create the scroll effect. Images transition at
                scroll thresholds of 0.33 and 0.66, creating a synchronized reveal.
              </p>
              <p>
                On desktop (lg breakpoint and above), images display on the right side. On mobile, only the text content
                is shown for better readability.
              </p>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

const dummyContentA: ItemContent = {
  title: "Join The Community",
  description: "Join over a billion people around the world who come to games to create, connect and be entertained.",
  image: {
    url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJlZCIvPjwvc3ZnPg==",
    width: 657.6,
    height: 715.3,
    alt: "Three Points",
  },
}
const dummyContentB: ItemContent = {
  title: "Bask in the spotlight",
  description:
    "This is where customer attention locks in — with your brand directly in the action of the biggest IP games.",
  image: {
    url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImdyZWVuIi8+PC9zdmc+",
    width: 657.6,
    height: 715.3,
    alt: "Three Points",
  },
}
const dummyContentC: ItemContent = {
  title: "Drive big results",
  description: "Reach massive, high-intent audiences — and turn attention into awareness, engagement, and sales.",
  image: {
    url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsdWUiLz48L3N2Zz4=",
    width: 657.6,
    height: 715.3,
    alt: "Three Points",
  },
}
