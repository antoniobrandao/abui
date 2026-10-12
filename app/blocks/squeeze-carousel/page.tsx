"use client"

import * as React from "react"
import { type TOCItemType, TOCProvider, PageTOC, PageTOCItems } from "@/registry/abui/ui/toc"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import { Button } from "@/components/ui/button"
import {
  SqueezeCarousel,
  SqueezeCarouselHeader,
  SqueezeCarouselHeading,
  SqueezeCarouselTitle,
  SqueezeCarouselDescription,
  SqueezeCarouselControls,
  SqueezeCarouselPrevious,
  SqueezeCarouselNext,
  SqueezeCarouselCanvas,
  SqueezeCarouselDetails,
  SqueezeCarouselDetail,
  SqueezeCarouselDetailCopy,
  SqueezeCarouselDetailTitle,
  SqueezeCarouselDetailDescription,
  SqueezeCarouselDetailAction,
  SqueezeCarouselActionIcon,
  SqueezeCarouselMobileList,
  SqueezeCarouselMobileItem,
  SqueezeCarouselMobileMedia,
} from "@/registry/abui/marketing/squeeze-carousel"
import { exampleItems, type ExampleItem } from "./example-data"

const blockName = "squeeze-carousel"

const tocItems: TOCItemType[] = [
  { title: "Demo", url: "#demo", depth: 1 },
  { title: "Controlled", url: "#controlled", depth: 1 },
  { title: "Viewport height & radius", url: "#viewport-height", depth: 1 },
  { title: "Usage", url: "#usage", depth: 2 },
  { title: "Features", url: "#features", depth: 2 },
  { title: "Anatomy", url: "#anatomy", depth: 2 },
  { title: "Props", url: "#props", depth: 2 },
  { title: "SqueezeCarousel", url: "#squeezecarousel-props", depth: 3 },
  { title: "SqueezeCarouselItem", url: "#item-props", depth: 3 },
  { title: "Sub-components", url: "#subcomponent-props", depth: 3 },
  { title: "Keyboard", url: "#keyboard", depth: 2 },
  { title: "Accessibility", url: "#accessibility", depth: 2 },
  { title: "Image guidelines", url: "#images", depth: 2 },
]

const usageCode = `import {
  SqueezeCarousel,
  SqueezeCarouselHeader,
  SqueezeCarouselHeading,
  SqueezeCarouselTitle,
  SqueezeCarouselDescription,
  SqueezeCarouselControls,
  SqueezeCarouselPrevious,
  SqueezeCarouselNext,
  SqueezeCarouselCanvas,
  SqueezeCarouselDetails,
  SqueezeCarouselDetail,
  SqueezeCarouselDetailCopy,
  SqueezeCarouselDetailTitle,
  SqueezeCarouselDetailDescription,
  SqueezeCarouselDetailAction,
  SqueezeCarouselActionIcon,
  SqueezeCarouselMobileList,
  SqueezeCarouselMobileItem,
  SqueezeCarouselMobileMedia,
  type SqueezeCarouselItem,
} from "@/components/squeeze-carousel"

// Keep the array reference stable (module scope or useMemo).
const items = [
  {
    id: "annual-letter",
    title: "Businesses on ABUI shipped 1.9 million components in 2025.",
    description: "Our annual letter explores the trends defining the component economy.",
    cta: "Read the letter",
    href: "/annual-letter",
    src: "/news/annual-letter.jpg",        // 16:9, e.g. 1632×918
    mobileSrc: "/news/annual-letter-m.jpg", // 336:350, e.g. 672×700
  },
  // ... at least 5 items for a full strip
] satisfies Array<SqueezeCarouselItem & { description: string; cta: string; href: string }>

export function WhatsHappening() {
  // Rendered once for the desktop details and once for the mobile cards.
  const renderCopy = (item: (typeof items)[number]) => (
    <>
      <SqueezeCarouselDetailCopy>
        <SqueezeCarouselDetailTitle>{item.title}</SqueezeCarouselDetailTitle>
        <SqueezeCarouselDetailDescription>{item.description}</SqueezeCarouselDetailDescription>
      </SqueezeCarouselDetailCopy>
      <SqueezeCarouselDetailAction asChild>
        <a href={item.href}>
          {item.cta}
          <SqueezeCarouselActionIcon />
        </a>
      </SqueezeCarouselDetailAction>
    </>
  )

  return (
    <SqueezeCarousel items={items}>
      <SqueezeCarouselHeader>
        <SqueezeCarouselHeading>
          <SqueezeCarouselTitle>What's happening</SqueezeCarouselTitle>
          <SqueezeCarouselDescription>See the latest from ABUI.</SqueezeCarouselDescription>
        </SqueezeCarouselHeading>
        <SqueezeCarouselControls>
          <SqueezeCarouselPrevious />
          <SqueezeCarouselNext />
        </SqueezeCarouselControls>
      </SqueezeCarouselHeader>

      <SqueezeCarouselCanvas />

      <SqueezeCarouselDetails>
        {(item, index) => (
          <SqueezeCarouselDetail index={index}>{renderCopy(item)}</SqueezeCarouselDetail>
        )}
      </SqueezeCarouselDetails>

      <SqueezeCarouselMobileList>
        {(item, index) => (
          <SqueezeCarouselMobileItem index={index}>
            <SqueezeCarouselMobileMedia />
            {renderCopy(item)}
          </SqueezeCarouselMobileItem>
        )}
      </SqueezeCarouselMobileList>
    </SqueezeCarousel>
  )
}`

const controlledCode = `const [active, setActive] = React.useState(0)

<SqueezeCarousel items={items} activeIndex={active} onActiveIndexChange={setActive}>
  ...
</SqueezeCarousel>

// Anywhere else on the page:
<button onClick={() => setActive(3)}>Jump to item 4</button>`

function renderCopy(item: ExampleItem) {
  return (
    <>
      <SqueezeCarouselDetailCopy>
        <SqueezeCarouselDetailTitle>{item.title}</SqueezeCarouselDetailTitle>
        <SqueezeCarouselDetailDescription>{item.description}</SqueezeCarouselDetailDescription>
      </SqueezeCarouselDetailCopy>
      <SqueezeCarouselDetailAction asChild>
        <a href={item.href}>
          {item.cta}
          <SqueezeCarouselActionIcon />
        </a>
      </SqueezeCarouselDetailAction>
    </>
  )
}

function Example({
  items,
  activeIndex,
  onActiveIndexChange,
  imageHeight,
  borderRadius,
}: {
  items: ExampleItem[]
  activeIndex?: number
  onActiveIndexChange?: (index: number) => void
  imageHeight?: number
  borderRadius?: number
}) {
  return (
    <SqueezeCarousel
      items={items}
      activeIndex={activeIndex}
      onActiveIndexChange={onActiveIndexChange}
      imageHeight={imageHeight}
      borderRadius={borderRadius}
    >
      <SqueezeCarouselHeader>
        <SqueezeCarouselHeading>
          <SqueezeCarouselTitle>What&apos;s happening</SqueezeCarouselTitle>
          <SqueezeCarouselDescription>See the latest from ABUI.</SqueezeCarouselDescription>
        </SqueezeCarouselHeading>
        <SqueezeCarouselControls>
          <SqueezeCarouselPrevious />
          <SqueezeCarouselNext />
        </SqueezeCarouselControls>
      </SqueezeCarouselHeader>

      <SqueezeCarouselCanvas />

      <SqueezeCarouselDetails>
        {(item, index) => (
          <SqueezeCarouselDetail index={index}>{renderCopy(item as ExampleItem)}</SqueezeCarouselDetail>
        )}
      </SqueezeCarouselDetails>

      <SqueezeCarouselMobileList>
        {(item, index) => (
          <SqueezeCarouselMobileItem index={index}>
            <SqueezeCarouselMobileMedia />
            {renderCopy(item as ExampleItem)}
          </SqueezeCarouselMobileItem>
        )}
      </SqueezeCarouselMobileList>
    </SqueezeCarousel>
  )
}

export default function Page() {
  const [controlledIndex, setControlledIndex] = React.useState(0)
  const registryItem = getRegistryItemFromJson(blockName)

  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <TOCProvider toc={tocItems}>
      <div className="flex gap-8 relative">
        <div className="flex-1 min-w-0">
          <RegistryItemHeader
            registryItem={registryItem}
            source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/marketing/squeeze-carousel.tsx"
          />

          <Content>
            <div className="w-full flex flex-col gap-12">
              <div className="flex flex-col gap-4" id="demo">
                <div className="text-sm font-medium">Demo</div>
                <p className="text-sm text-muted-foreground">
                  Hover a column to stretch it, click one to make it active, or use the arrows. Clicking the revealed
                  card opens its link, just like the button. Resize below 640px to see the scroll-snap mobile layout.
                  Photos by Unsplash.
                </p>
                <div className="w-full py-6">
                  <Example items={exampleItems} />
                </div>
              </div>

              <div className="flex flex-col gap-4" id="controlled">
                <div className="text-sm font-medium">Controlled</div>
                <p className="text-sm text-muted-foreground">
                  Pass <code className="code-text">activeIndex</code> and{" "}
                  <code className="code-text">onActiveIndexChange</code> to own the state. The canvas animates along the
                  shortest path around the loop.
                </p>
                <div className="flex flex-wrap gap-2">
                  {exampleItems.map((item, index) => (
                    <Button
                      key={item.id}
                      size="sm"
                      variant={controlledIndex === index ? "default" : "secondary"}
                      onClick={() => setControlledIndex(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                <div className="w-full py-6">
                  <Example
                    items={exampleItems}
                    activeIndex={controlledIndex}
                    onActiveIndexChange={setControlledIndex}
                  />
                </div>
                <CodeBlockComponent code={[{ language: "tsx", filename: "controlled.tsx", code: controlledCode }]} />
              </div>

              <div className="flex flex-col gap-4" id="viewport-height">
                <div className="text-sm font-medium">Viewport height &amp; radius</div>
                <p className="text-sm text-muted-foreground">
                  <code className="code-text">imageHeight={"{50}"}</code> makes the images exactly 50svh tall on desktop
                  and mobile, and <code className="code-text">borderRadius={"{16}"}</code> rounds the cards.
                </p>
                <div className="w-full py-6">
                  <Example items={exampleItems} imageHeight={50} borderRadius={16} />
                </div>
                <CodeBlockComponent
                  code={[
                    {
                      language: "tsx",
                      filename: "viewport-height.tsx",
                      code: `<SqueezeCarousel items={items} imageHeight={50} borderRadius={16}>
  ...
</SqueezeCarousel>`,
                    },
                  ]}
                />
              </div>

              <div className="flex flex-col gap-4" id="usage">
                <h2 className="text-lg font-semibold">Usage</h2>
                <CodeBlockComponent code={[{ language: "tsx", filename: "whats-happening.tsx", code: usageCode }]} />
              </div>
            </div>
          </Content>

          <Content>
            <div className="flex flex-col gap-8 w-full">
              <div id="features">
                <h2 className="text-lg font-semibold mb-2">Features</h2>
                <ul className="space-y-2 text-muted-foreground text-sm list-inside list-disc">
                  <li>
                    Canvas-rendered image strip: one 16:9 primary card plus progressively narrower companions, each
                    cover-fitted and clipped to a rounded rectangle, so cards squeeze instead of scaling
                  </li>
                  <li>
                    Hovering a column stretches it and squeezes its neighbours; hovering a sliver widens it by 3px
                  </li>
                  <li>Clicking any non-primary column advances by that many steps; the strip loops infinitely</li>
                  <li>
                    Clicking the revealed card activates the item&apos;s action (router links included) or opens{" "}
                    <code className="code-text">href</code>; modifier keys open a new tab
                  </li>
                  <li>
                    <code className="code-text">imageHeight</code> sizes the images as a percentage of the small
                    viewport height, <code className="code-text">borderRadius</code> rounds every card
                  </li>
                  <li>
                    1s ease-out-expo tween of every width, gap and image offset; 200ms and no hover squeeze under
                    reduced motion
                  </li>
                  <li>
                    Per-item <code className="code-text">collapsedOffsetX</code> keeps an image&apos;s focal point
                    visible while collapsed
                  </li>
                  <li>
                    Copy crossfades below the canvas; inactive copy is hidden from assistive tech and the tab order
                  </li>
                  <li>Scroll-snap mobile layout with scale, parallax and fade driven by scroll progress, all in CSS</li>
                  <li>Controlled or uncontrolled active index via the Radix controllable-state hook</li>
                  <li>
                    Compound component API: every part is its own element, spreads native props and exports its Props
                    type
                  </li>
                  <li>
                    <code className="code-text">data-slot</code>, <code className="code-text">data-state</code> and{" "}
                    <code className="code-text">data-index</code> attributes on every part for external styling
                  </li>
                  <li>
                    Lazy initialisation: the canvas engine and images only load when the block is near the viewport
                  </li>
                  <li>
                    Device-pixel-ratio aware backing store (capped at 2x), ResizeObserver driven, fully disposed on
                    unmount
                  </li>
                  <li>Theme-aware: only uses design tokens, works in light and dark mode</li>
                  <li>
                    No runtime dependencies beyond the registry Button, the Radix Slot and controllable-state hooks and
                    lucide icons
                  </li>
                </ul>
              </div>

              <div id="anatomy">
                <h2 className="text-lg font-semibold mb-2">Anatomy</h2>
                <CodeBlockComponent
                  code={[
                    {
                      language: "tsx",
                      filename: "anatomy.tsx",
                      code: `<SqueezeCarousel items={items}>
  <SqueezeCarouselHeader>
    <SqueezeCarouselHeading>
      <SqueezeCarouselTitle />
      <SqueezeCarouselDescription />
    </SqueezeCarouselHeading>
    <SqueezeCarouselControls>
      <SqueezeCarouselPrevious />
      <SqueezeCarouselNext />
    </SqueezeCarouselControls>
  </SqueezeCarouselHeader>

  <SqueezeCarouselCanvas />            {/* >= sm */}

  <SqueezeCarouselDetails>            {/* >= sm */}
    <SqueezeCarouselDetail index={i}>
      <SqueezeCarouselDetailCopy>
        <SqueezeCarouselDetailTitle />
        <SqueezeCarouselDetailDescription />
      </SqueezeCarouselDetailCopy>
      <SqueezeCarouselDetailAction>
        <SqueezeCarouselActionIcon />
      </SqueezeCarouselDetailAction>
    </SqueezeCarouselDetail>
  </SqueezeCarouselDetails>

  <SqueezeCarouselMobileList>         {/* < sm */}
    <SqueezeCarouselMobileItem index={i}>
      <SqueezeCarouselMobileMedia />
      <SqueezeCarouselDetailCopy>…</SqueezeCarouselDetailCopy>
      <SqueezeCarouselDetailAction>…</SqueezeCarouselDetailAction>
    </SqueezeCarouselMobileItem>
  </SqueezeCarouselMobileList>
</SqueezeCarousel>`,
                    },
                  ]}
                />
              </div>

              <div id="props">
                <h2 className="text-lg font-semibold mb-4">Props</h2>
                <div className="space-y-6">
                  <div className="space-y-2" id="squeezecarousel-props">
                    <h3 className="font-mono text-sm font-medium">SqueezeCarousel</h3>
                    <p className="text-sm text-muted-foreground">
                      Extends <code className="code-text">React.ComponentProps&lt;&quot;section&quot;&gt;</code>.
                    </p>
                    <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                      <li>
                        <code className="code-text">items</code> - SqueezeCarouselItem[] (required) - Items to show.
                        Keep the reference stable; a new array re-creates the canvas engine
                      </li>
                      <li>
                        <code className="code-text">activeIndex</code> - number - Controlled active index
                      </li>
                      <li>
                        <code className="code-text">defaultActiveIndex</code> - number - Initial index when uncontrolled
                        (default: 0)
                      </li>
                      <li>
                        <code className="code-text">onActiveIndexChange</code> - (index: number) =&gt; void - Fired on
                        every change, in both modes
                      </li>
                      <li>
                        <code className="code-text">borderRadius</code> - number - Card corner radius in px (default:
                        6). Also exposed as <code className="code-text">--squeeze-carousel-radius</code>
                      </li>
                      <li>
                        <code className="code-text">imageHeight</code> - number - Image height as a percentage of the
                        small viewport height (svh), applied to the canvas and the mobile cards. Omit to keep the
                        default 1232:460 and 336:350 aspect ratios
                      </li>
                      <li>
                        <code className="code-text">onActiveItemClick</code> - (item, index, event) =&gt; void - Called
                        when the revealed card is clicked. Default: activate the item&apos;s{" "}
                        <code className="code-text">SqueezeCarouselDetailAction</code>, or open{" "}
                        <code className="code-text">item.href</code>
                      </li>
                      <li>
                        <code className="code-text">crossOrigin</code> - &quot;anonymous&quot; |
                        &quot;use-credentials&quot; - Applied to canvas images. Only needed if you read pixels back from
                        the canvas
                      </li>
                      <li>
                        <code className="code-text">announce</code> - (item, index, count) =&gt; string - Live-region
                        text (default: &quot;Item 2 of 8: title&quot;). Use it for localisation
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2" id="item-props">
                    <h3 className="font-mono text-sm font-medium">SqueezeCarouselItem</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                      <li>
                        <code className="code-text">id</code> - string (required) - Stable key
                      </li>
                      <li>
                        <code className="code-text">title</code> - string (required) - Plain-text name, used for the
                        live-region announcement and the default mobile alt text
                      </li>
                      <li>
                        <code className="code-text">src</code> - string (required) - Desktop canvas image, 16:9
                      </li>
                      <li>
                        <code className="code-text">mobileSrc</code> - string - Mobile card image, 336:350 (default:
                        src)
                      </li>
                      <li>
                        <code className="code-text">alt</code> - string - Mobile image alt text (default: title). Pass
                        &quot;&quot; for decorative images
                      </li>
                      <li>
                        <code className="code-text">href</code> - string - Link opened when the revealed card is clicked
                        and no action is rendered for the item
                      </li>
                      <li>
                        <code className="code-text">collapsedOffsetX</code> - number - Horizontal image shift in px
                        while the card is collapsed, positive moves the image left (default: 0)
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      Extend the type with your own fields (description, cta, href) and read them in the render
                      function.
                    </p>
                  </div>

                  <div className="space-y-2" id="subcomponent-props">
                    <h3 className="font-mono text-sm font-medium">Sub-components</h3>
                    <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                      <li>
                        <code className="code-text">SqueezeCarouselHeader</code>,{" "}
                        <code className="code-text">Heading</code>, <code className="code-text">Controls</code>,{" "}
                        <code className="code-text">DetailCopy</code> - plain containers extending their element props
                      </li>
                      <li>
                        <code className="code-text">SqueezeCarouselTitle</code> (h2),{" "}
                        <code className="code-text">Description</code> (p),{" "}
                        <code className="code-text">DetailTitle</code> (h3),{" "}
                        <code className="code-text">DetailDescription</code> (p) - support{" "}
                        <code className="code-text">asChild</code>. Title is wired to the section&apos;s{" "}
                        <code className="code-text">aria-labelledby</code>
                      </li>
                      <li>
                        <code className="code-text">SqueezeCarouselPrevious</code> /{" "}
                        <code className="code-text">Next</code> - extend Button; default icon,{" "}
                        <code className="code-text">aria-label</code> and <code className="code-text">onClick</code> can
                        be overridden (call <code className="code-text">preventDefault</code> to cancel navigation)
                      </li>
                      <li>
                        <code className="code-text">SqueezeCarouselCanvas</code> - extends canvas props; hidden below sm
                      </li>
                      <li>
                        <code className="code-text">SqueezeCarouselDetails</code> /{" "}
                        <code className="code-text">MobileList</code> - children can be a render function{" "}
                        <code className="code-text">(item, index) =&gt; ReactNode</code>
                      </li>
                      <li>
                        <code className="code-text">SqueezeCarouselDetail</code> /{" "}
                        <code className="code-text">MobileItem</code> - <code className="code-text">index: number</code>{" "}
                        (required)
                      </li>
                      <li>
                        <code className="code-text">SqueezeCarouselDetailAction</code> - extends Button (outline).
                        Supports <code className="code-text">asChild</code> for links. Manages tab order and focus on
                        desktop
                      </li>
                      <li>
                        <code className="code-text">SqueezeCarouselMobileMedia</code> - renders the item image; pass
                        children to replace it
                      </li>
                      <li>
                        <code className="code-text">useSqueezeCarousel()</code> - context hook exposing{" "}
                        <code className="code-text">activeIndex</code>, <code className="code-text">goTo</code>,{" "}
                        <code className="code-text">goToNext</code>, <code className="code-text">goToPrevious</code> for
                        custom controls
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="keyboard">
                <h2 className="text-lg font-semibold mb-2">Keyboard</h2>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="code-text">Tab</code> - Previous, Next, then the active item&apos;s action only
                  </li>
                  <li>
                    <code className="code-text">← / →</code> on Previous or Next - move one item, focus stays on the
                    button
                  </li>
                  <li>
                    <code className="code-text">← / →</code> on the action - move one item and focus the new action
                  </li>
                  <li>
                    <code className="code-text">Home / End</code> on the action - jump to the first or last item
                  </li>
                  <li>Focusing an inactive action (for example via find-in-page) makes its item active</li>
                </ul>
              </div>

              <div id="accessibility">
                <h2 className="text-lg font-semibold mb-2">Accessibility</h2>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    Root is a <code className="code-text">section</code> with{" "}
                    <code className="code-text">aria-roledescription=&quot;carousel&quot;</code> labelled by the title
                  </li>
                  <li>
                    The canvas is decorative (<code className="code-text">aria-hidden</code>); all content lives in the
                    DOM copy
                  </li>
                  <li>
                    Each detail is a <code className="code-text">group</code> with{" "}
                    <code className="code-text">aria-roledescription=&quot;slide&quot;</code>; inactive details are{" "}
                    <code className="code-text">aria-hidden</code> with their action at{" "}
                    <code className="code-text">tabindex=-1</code>
                  </li>
                  <li>A polite live region announces &quot;Item N of M: title&quot; on every change</li>
                  <li>Controls are real buttons with accessible names inside a labelled group</li>
                  <li>
                    Honors <code className="code-text">prefers-reduced-motion</code>: short tweens, no hover squeeze, no
                    crossfade, no mobile parallax
                  </li>
                </ul>
              </div>

              <div id="images">
                <h2 className="text-lg font-semibold mb-2">Image guidelines</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Desktop images are cover-fitted into a 16:9 box as tall as the canvas and centred on their card, so
                    supply 16:9 images of at least 1632×918 with the subject near the centre. Use{" "}
                    <code className="code-text">collapsedOffsetX</code> when a subject sits off-centre.
                  </p>
                  <p>
                    Mobile images are shown at 336:350; 672×700 is a good size. Images load with the browser cache only,
                    so serve already-optimised files or a CDN URL with size parameters.
                  </p>
                  <p>
                    The strip shows 4 main columns plus 1 to 3 slivers (5 to 7 cards). With fewer than 5 items the
                    engine repeats items so the strip stays full. Five or more items is recommended.
                  </p>
                </div>
              </div>
            </div>
          </Content>
        </div>

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
