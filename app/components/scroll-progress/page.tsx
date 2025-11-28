"use client"

import * as React from "react"
import { type TOCItemType, TOCProvider, PageTOC, PageTOCItems } from "@/registry/abui/ui/toc"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import ExamplePlusCodeTabs from "@/components/custom/ExamplePlusCodeTabs"
import { ScrollProgress } from "@/registry/abui/ui/scroll-progress"

const componentName = "scroll-progress"

const tocItems: TOCItemType[] = [
  { title: "Examples", url: "#examples", depth: 2 },
  { title: "Default (Viewport Scroll)", url: "#default-viewport", depth: 3 },
  { title: "Custom Color", url: "#custom-color", depth: 3 },
  { title: "Bottom Position", url: "#bottom-position", depth: 3 },
  { title: "Custom Height", url: "#custom-height", depth: 3 },
  { title: "Container Scroll", url: "#container-scroll", depth: 3 },
  { title: "Features", url: "#features", depth: 2 },
  { title: "Component Props", url: "#component-props", depth: 2 },
  { title: "Positioning Note", url: "#positioning-note", depth: 3 },
  { title: "Dependencies", url: "#dependencies", depth: 2 },
]

export default function Page() {
  const registryItem = getRegistryItemFromJson(componentName)
  const targetRef = React.useRef<HTMLDivElement>(null)

  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <TOCProvider toc={tocItems}>
      <div className="flex gap-8 relative">
        <div className="flex-1 min-w-0">
          {/* Live instance - shows progress as you scroll this page */}
          <ScrollProgress />

          <RegistryItemHeader
            registryItem={registryItem}
            source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/ui/scroll-progress.tsx"
          />
          <Content>
            <div className="w-full flex flex-col gap-8" id="examples">
              <div className="flex flex-col gap-4" id="default-viewport">
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium">Default (Viewport Scroll)</div>
              <div className="text-sm text-muted-foreground">
                A primary-colored progress bar at the top of the viewport. Check the top of your screen as you scroll
                this page!
              </div>
            </div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="w-full flex items-center border rounded-lg justify-center min-h-[100px] p-4 md:p-10 relative bg-muted/30">
                  <p className="text-sm text-muted-foreground">Scroll this page to see the progress bar at the top</p>
                </div>
              }
              code={{
                language: "tsx",
                filename: "basic-example.tsx",
                code: `import { ScrollProgress } from "@/registry/crux-ui/ui/scroll-progress"

<ScrollProgress />`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4" id="custom-color">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Custom Color</div>
              <div className="text-sm text-muted-foreground">
                Use any Tailwind background color class to customize the progress bar
              </div>
            </div>
            <ExamplePlusCodeTabs
              demoJSX={null}
              code={{
                language: "tsx",
                filename: "custom-color.tsx",
                code: `<ScrollProgress color="bg-accent" />
<ScrollProgress color="bg-destructive" />
<ScrollProgress color="bg-green-500" />`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4" id="bottom-position">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Bottom Position</div>
              <div className="text-sm text-muted-foreground">
                Position the progress bar at the bottom of the viewport
              </div>
            </div>
            <ExamplePlusCodeTabs
              demoJSX={null}
              code={{
                language: "tsx",
                filename: "bottom-position.tsx",
                code: `<ScrollProgress position="bottom" />`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4" id="custom-height">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Custom Height</div>
              <div className="text-sm text-muted-foreground">Adjust the thickness of the progress bar</div>
            </div>
            <ExamplePlusCodeTabs
              demoJSX={null}
              code={{
                language: "tsx",
                filename: "custom-height.tsx",
                code: `<ScrollProgress height={1} />
<ScrollProgress height={4} />
<ScrollProgress height={8} />`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4" id="container-scroll">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Container Scroll</div>
              <div className="text-sm text-muted-foreground">
                Track scroll progress of a specific container instead of the viewport
              </div>
            </div>
            <ExamplePlusCodeTabs
              demoJSX={
                <div className="w-full border rounded-lg bg-muted/30 relative">
                  <ScrollProgress
                    container={targetRef}
                    color="bg-purple-500"
                    height={3}
                    className="sticky top-0 left-0 right-0"
                  />
                  <div ref={targetRef} className="h-[300px] overflow-y-auto p-4">
                    <article className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac rhoncus quam. Fringilla quam
                        urna. Cras turpis elit, euismod eget ligula quis, imperdiet sagittis justo.
                      </p>
                      <p>
                        In viverra fermentum ex ac vestibulum. Aliquam eleifend nunc a luctus porta. Mauris laoreet
                        augue ut felis blandit, at iaculis odio ultrices. Nulla facilisi.
                      </p>
                      <h3 className="text-foreground font-medium">Sub-header</h3>
                      <p>
                        Vestibulum cursus ipsum tellus, eu tincidunt neque tincidunt a. In eget sodales arcu,
                        consectetur efficitur metus. Duis efficitur tincidunt odio, sit amet laoreet massa fringilla eu.
                      </p>
                      <p>
                        Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna. Mauris id mauris vel arcu
                        commodo venenatis. Aliquam eu risus arcu.
                      </p>
                      <p>
                        Proin sit amet lacus mollis, semper massa ut, rutrum mi. Sed sem nisi, luctus consequat ligula
                        in, congue sodales nisl.
                      </p>
                      <p>
                        Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra leo vitae tristique rutrum.
                        Donec ut volutpat ante, ut suscipit leo.
                      </p>
                      <h3 className="text-foreground font-medium">Another section</h3>
                      <p>
                        Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla aliquet. Pellentesque auctor
                        vehicula malesuada. Aliquam id feugiat sem, sit amet tempor nulla.
                      </p>
                      <p>
                        Quisque fermentum felis faucibus, vehicula metus ac, interdum nibh. Curabitur vitae convallis
                        ligula. Integer ac enim vel felis pharetra laoreet.
                      </p>
                      <p>
                        Morbi ut scelerisque nibh. Integer auctor, massa non dictum tristique, elit metus efficitur
                        elit, ac pretium sapien nisl nec ante. In et ex ultricies, mollis mi in, euismod dolor.
                      </p>
                      <p>Quisque convallis ligula non magna efficitur tincidunt. Scroll to see the progress!</p>
                    </article>
                  </div>
                </div>
              }
              code={{
                language: "tsx",
                filename: "container-scroll.tsx",
                code: `const containerRef = useRef<HTMLDivElement>(null)

<div className="relative border rounded-lg">
  <ScrollProgress 
    container={containerRef} 
    color="bg-primary"
    height={3}
    className="sticky top-0 left-0 right-0"
  />
  <div ref={containerRef} className="h-[300px] overflow-y-auto p-4">
    {/* Scrollable content */}
  </div>
</div>`,
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
              <li>Smooth scroll progress animation using Motion</li>
              <li>Automatically uses fixed positioning for viewport scroll</li>
              <li>Supports container scroll with flexible positioning (sticky, absolute, etc.)</li>
              <li>Tracks viewport scroll or specific container scroll</li>
              <li>Customizable height (1px to any size)</li>
              <li>Customizable color using Tailwind classes</li>
              <li>Lightweight and performant</li>
              <li>TypeScript support with full type safety</li>
              <li>Extends motion.div for additional animation props</li>
              <li>Zero dependencies beyond motion/react</li>
            </ul>
          </div>

          <div id="component-props">
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">ScrollProgress</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="code-text">height</code> - number (default: 2) - Height of the
                    progress bar in pixels
                  </li>
                  <li>
                    <code className="code-text">color</code> - string (default:
                    &quot;bg-primary&quot;) - Tailwind background color class
                  </li>
                  <li>
                    <code className="code-text">position</code> - &quot;top&quot; |
                    &quot;bottom&quot; (default: &quot;top&quot;) - Position of the progress bar
                  </li>
                  <li>
                    <code className="code-text">container</code> -
                    React.RefObject&lt;HTMLElement&gt; - Optional container element to track scroll for. If not
                    provided, tracks viewport scroll
                  </li>
                  <li>
                    <code className="code-text">className</code> - string - Additional CSS classes
                  </li>
                  <li>
                    <code className="code-text">...props</code> - Extends motion.div props for
                    advanced customization
                  </li>
                </ul>
                <div className="flex flex-col gap-2 mt-6" id="positioning-note">
                  <h2 className="text-lg font-semibold">Positioning Note:</h2>
                  <p className="text-muted-foreground text-sm">
                    For viewport scroll, the component automatically uses{" "}
                    <code className="code-text">fixed</code> positioning.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    For container scroll, use <code className="code-text">sticky</code> positioning via
                    className and place the progress bar outside the scrollable container.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="dependencies">
            <h2 className="text-lg font-semibold mb-4">Dependencies</h2>
            <code className="text-orange-500">motion@12</code>
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
