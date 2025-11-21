"use client"

import * as React from "react"
import PageWithBreadcrumbs from "@/components/PageWithBreadcrumbs"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { LabelSelector } from "@/registry/abui/ui/label-selector"
import CodeBlockComponent from "@/components/custom/CodeBlock"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"

const componentName = "label-selector"

export default function Page() {
  const [size, setSize] = React.useState("M")
  const [size2, setSize2] = React.useState("L")
  const [size3, setSize3] = React.useState("M")
  const [variant, setVariant] = React.useState("pro")
  const [plan, setPlan] = React.useState("monthly")
  const [variantOutline, setVariantOutline] = React.useState("M")
  const [variantGhost, setVariantGhost] = React.useState("M")
  const [variantSolid, setVariantSolid] = React.useState("M")
  const [sizeSmall, setSizeSmall] = React.useState("M")
  const [sizeLarge, setSizeLarge] = React.useState("M")
  const [roundedFull, setRoundedFull] = React.useState("M")
  const [roundedNone, setRoundedNone] = React.useState("M")

  const registryItem = getRegistryItemFromJson(componentName)
  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <PageWithBreadcrumbs>
      <RegistryItemHeader
        registryItem={registryItem}
        source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/ui/label-selector.tsx"
      />
      <Content>
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Basic Example - Clothing Sizes</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root value={size} onValueChange={setSize}>
                <LabelSelector.Label value="Select size" />
                <LabelSelector.Content>
                  <LabelSelector.Item value="XS" rounded="full" />
                  <LabelSelector.Item value="S" rounded="full" />
                  <LabelSelector.Item value="M" rounded="full" />
                  <LabelSelector.Item value="L" rounded="full" />
                  <LabelSelector.Item value="XL" rounded="full" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "basic-example.tsx",
                  code: `const [size, setSize] = useState("M")

<LabelSelector.Root value={size} onValueChange={setSize}>
  <LabelSelector.Label value="Select size" />
  <LabelSelector.Content>
    <LabelSelector.Item value="XS" />
    <LabelSelector.Item value="S" />
    <LabelSelector.Item value="M" />
    <LabelSelector.Item value="L" />
    <LabelSelector.Item value="XL" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Without Label</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root value={size2} onValueChange={setSize2}>
                <LabelSelector.Content>
                  <LabelSelector.Item value="XXS" />
                  <LabelSelector.Item value="XS" />
                  <LabelSelector.Item value="S" />
                  <LabelSelector.Item value="M" />
                  <LabelSelector.Item value="L" />
                  <LabelSelector.Item value="XL" />
                  <LabelSelector.Item value="XXL" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "without-label.tsx",
                  code: `const [size, setSize] = useState("L")

<LabelSelector.Root value={size} onValueChange={setSize}>
  <LabelSelector.Content>
    <LabelSelector.Item value="XXS" />
    <LabelSelector.Item value="XS" />
    <LabelSelector.Item value="S" />
    <LabelSelector.Item value="M" />
    <LabelSelector.Item value="L" />
    <LabelSelector.Item value="XL" />
    <LabelSelector.Item value="XXL" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Variant: Outline</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root value={variantOutline} onValueChange={setVariantOutline}>
                <LabelSelector.Label value="Size" />
                <LabelSelector.Content>
                  <LabelSelector.Item value="XS" variant="outline" />
                  <LabelSelector.Item value="S" variant="outline" />
                  <LabelSelector.Item value="M" variant="outline" />
                  <LabelSelector.Item value="L" variant="outline" />
                  <LabelSelector.Item value="XL" variant="outline" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "variant-outline.tsx",
                  code: `const [size, setSize] = useState("M")

<LabelSelector.Root value={size} onValueChange={setSize}>
  <LabelSelector.Label value="Size" />
  <LabelSelector.Content>
    <LabelSelector.Item value="XS" variant="outline" />
    <LabelSelector.Item value="S" variant="outline" />
    <LabelSelector.Item value="M" variant="outline" />
    <LabelSelector.Item value="L" variant="outline" />
    <LabelSelector.Item value="XL" variant="outline" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Variant: Ghost</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root value={variantGhost} onValueChange={setVariantGhost}>
                <LabelSelector.Label value="Size" />
                <LabelSelector.Content>
                  <LabelSelector.Item value="XS" variant="ghost" />
                  <LabelSelector.Item value="S" variant="ghost" />
                  <LabelSelector.Item value="M" variant="ghost" />
                  <LabelSelector.Item value="L" variant="ghost" />
                  <LabelSelector.Item value="XL" variant="ghost" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "variant-ghost.tsx",
                  code: `const [size, setSize] = useState("M")

<LabelSelector.Root value={size} onValueChange={setSize}>
  <LabelSelector.Label value="Size" />
  <LabelSelector.Content>
    <LabelSelector.Item value="XS" variant="ghost" />
    <LabelSelector.Item value="S" variant="ghost" />
    <LabelSelector.Item value="M" variant="ghost" />
    <LabelSelector.Item value="L" variant="ghost" />
    <LabelSelector.Item value="XL" variant="ghost" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Variant: Solid</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root value={variantSolid} onValueChange={setVariantSolid}>
                <LabelSelector.Label value="Size" />
                <LabelSelector.Content>
                  <LabelSelector.Item value="XS" variant="solid" />
                  <LabelSelector.Item value="S" variant="solid" />
                  <LabelSelector.Item value="M" variant="solid" />
                  <LabelSelector.Item value="L" variant="solid" />
                  <LabelSelector.Item value="XL" variant="solid" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "variant-solid.tsx",
                  code: `const [size, setSize] = useState("M")

<LabelSelector.Root value={size} onValueChange={setSize}>
  <LabelSelector.Label value="Size" />
  <LabelSelector.Content>
    <LabelSelector.Item value="XS" variant="solid" />
    <LabelSelector.Item value="S" variant="solid" />
    <LabelSelector.Item value="M" variant="solid" />
    <LabelSelector.Item value="L" variant="solid" />
    <LabelSelector.Item value="XL" variant="solid" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Size: Small</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root value={sizeSmall} onValueChange={setSizeSmall}>
                <LabelSelector.Label value="Size" />
                <LabelSelector.Content>
                  <LabelSelector.Item value="XS" size="sm" />
                  <LabelSelector.Item value="S" size="sm" />
                  <LabelSelector.Item value="M" size="sm" />
                  <LabelSelector.Item value="L" size="sm" />
                  <LabelSelector.Item value="XL" size="sm" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "size-small.tsx",
                  code: `const [size, setSize] = useState("M")

<LabelSelector.Root value={size} onValueChange={setSize}>
  <LabelSelector.Label value="Size" />
  <LabelSelector.Content>
    <LabelSelector.Item value="XS" size="sm" />
    <LabelSelector.Item value="S" size="sm" />
    <LabelSelector.Item value="M" size="sm" />
    <LabelSelector.Item value="L" size="sm" />
    <LabelSelector.Item value="XL" size="sm" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Size: Large</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root value={sizeLarge} onValueChange={setSizeLarge}>
                <LabelSelector.Label value="Size" />
                <LabelSelector.Content>
                  <LabelSelector.Item value="XS" size="lg" />
                  <LabelSelector.Item value="S" size="lg" />
                  <LabelSelector.Item value="M" size="lg" />
                  <LabelSelector.Item value="L" size="lg" />
                  <LabelSelector.Item value="XL" size="lg" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "size-large.tsx",
                  code: `const [size, setSize] = useState("M")

<LabelSelector.Root value={size} onValueChange={setSize}>
  <LabelSelector.Label value="Size" />
  <LabelSelector.Content>
    <LabelSelector.Item value="XS" size="lg" />
    <LabelSelector.Item value="S" size="lg" />
    <LabelSelector.Item value="M" size="lg" />
    <LabelSelector.Item value="L" size="lg" />
    <LabelSelector.Item value="XL" size="lg" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Rounded: Full</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root value={roundedFull} onValueChange={setRoundedFull}>
                <LabelSelector.Label value="Size" />
                <LabelSelector.Content>
                  <LabelSelector.Item value="XS" rounded="full" />
                  <LabelSelector.Item value="S" rounded="full" />
                  <LabelSelector.Item value="M" rounded="full" />
                  <LabelSelector.Item value="L" rounded="full" />
                  <LabelSelector.Item value="XL" rounded="full" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "rounded-full.tsx",
                  code: `const [size, setSize] = useState("M")

<LabelSelector.Root value={size} onValueChange={setSize}>
  <LabelSelector.Label value="Size" />
  <LabelSelector.Content>
    <LabelSelector.Item value="XS" rounded="full" />
    <LabelSelector.Item value="S" rounded="full" />
    <LabelSelector.Item value="M" rounded="full" />
    <LabelSelector.Item value="L" rounded="full" />
    <LabelSelector.Item value="XL" rounded="full" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Rounded: None</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root value={roundedNone} onValueChange={setRoundedNone}>
                <LabelSelector.Label value="Size" />
                <LabelSelector.Content>
                  <LabelSelector.Item value="XS" rounded="none" />
                  <LabelSelector.Item value="S" rounded="none" />
                  <LabelSelector.Item value="M" rounded="none" />
                  <LabelSelector.Item value="L" rounded="none" />
                  <LabelSelector.Item value="XL" rounded="none" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "rounded-none.tsx",
                  code: `const [size, setSize] = useState("M")

<LabelSelector.Root value={size} onValueChange={setSize}>
  <LabelSelector.Label value="Size" />
  <LabelSelector.Content>
    <LabelSelector.Item value="XS" rounded="none" />
    <LabelSelector.Item value="S" rounded="none" />
    <LabelSelector.Item value="M" rounded="none" />
    <LabelSelector.Item value="L" rounded="none" />
    <LabelSelector.Item value="XL" rounded="none" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Custom Gap Spacing</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root value={size3} onValueChange={setSize3}>
                <LabelSelector.Label value="Size" />
                <LabelSelector.Content className="gap-4">
                  <LabelSelector.Item value="XS" />
                  <LabelSelector.Item value="S" />
                  <LabelSelector.Item value="M" />
                  <LabelSelector.Item value="L" />
                  <LabelSelector.Item value="XL" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "custom-gap.tsx",
                  code: `const [size, setSize] = useState("M")

<LabelSelector.Root value={size} onValueChange={setSize}>
  <LabelSelector.Label value="Size" />
  <LabelSelector.Content className="gap-4">
    <LabelSelector.Item value="XS" />
    <LabelSelector.Item value="S" />
    <LabelSelector.Item value="M" />
    <LabelSelector.Item value="L" />
    <LabelSelector.Item value="XL" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Custom Size - Larger Items</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root value={variant} onValueChange={setVariant}>
                <LabelSelector.Label value="Plan" />
                <LabelSelector.Content className="gap-3">
                  <LabelSelector.Item value="basic" label="Basic" className="min-w-[5rem] h-12 text-base" />
                  <LabelSelector.Item value="pro" label="Pro" className="min-w-[5rem] h-12 text-base" />
                  <LabelSelector.Item value="enterprise" label="Enterprise" className="min-w-[5rem] h-12 text-base" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "custom-size.tsx",
                  code: `const [variant, setVariant] = useState("pro")

<LabelSelector.Root value={variant} onValueChange={setVariant}>
  <LabelSelector.Label value="Plan" />
  <LabelSelector.Content className="gap-3">
    <LabelSelector.Item value="basic" label="Basic" className="min-w-[5rem] h-12 text-base" />
    <LabelSelector.Item value="pro" label="Pro" className="min-w-[5rem] h-12 text-base" />
    <LabelSelector.Item value="enterprise" label="Enterprise" className="min-w-[5rem] h-12 text-base" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">With Disabled Option</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root defaultValue="M">
                <LabelSelector.Label value="Select Size" />
                <LabelSelector.Content>
                  <LabelSelector.Item value="XS" />
                  <LabelSelector.Item value="S" />
                  <LabelSelector.Item value="M" />
                  <LabelSelector.Item value="L" disabled />
                  <LabelSelector.Item value="XL" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "disabled-option.tsx",
                  code: `<LabelSelector.Root defaultValue="M">
  <LabelSelector.Label value="Select Size" />
  <LabelSelector.Content>
    <LabelSelector.Item value="XS" />
    <LabelSelector.Item value="S" />
    <LabelSelector.Item value="M" />
    <LabelSelector.Item value="L" disabled />
    <LabelSelector.Item value="XL" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Long Labels</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root value={plan} onValueChange={setPlan}>
                <LabelSelector.Label value="Billing" />
                <LabelSelector.Content className="gap-2">
                  <LabelSelector.Item value="monthly" label="Monthly" className="min-w-[6rem]" />
                  <LabelSelector.Item value="quarterly" label="Quarterly" className="min-w-[6rem]" />
                  <LabelSelector.Item value="annually" label="Annually" className="min-w-[6rem]" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "long-labels.tsx",
                  code: `const [plan, setPlan] = useState("monthly")

<LabelSelector.Root value={plan} onValueChange={setPlan}>
  <LabelSelector.Label value="Billing" />
  <LabelSelector.Content className="gap-2">
    <LabelSelector.Item value="monthly" label="Monthly" className="min-w-[6rem]" />
    <LabelSelector.Item value="quarterly" label="Quarterly" className="min-w-[6rem]" />
    <LabelSelector.Item value="annually" label="Annually" className="min-w-[6rem]" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Numeric Values</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root defaultValue="38">
                <LabelSelector.Label value="EU Size" />
                <LabelSelector.Content className="gap-2">
                  <LabelSelector.Item value="36" />
                  <LabelSelector.Item value="37" />
                  <LabelSelector.Item value="38" />
                  <LabelSelector.Item value="39" />
                  <LabelSelector.Item value="40" />
                  <LabelSelector.Item value="41" />
                  <LabelSelector.Item value="42" />
                  <LabelSelector.Item value="43" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "numeric-values.tsx",
                  code: `<LabelSelector.Root defaultValue="38">
  <LabelSelector.Label value="EU Size" />
  <LabelSelector.Content className="gap-2">
    <LabelSelector.Item value="36" />
    <LabelSelector.Item value="37" />
    <LabelSelector.Item value="38" />
    <LabelSelector.Item value="39" />
    <LabelSelector.Item value="40" />
    <LabelSelector.Item value="41" />
    <LabelSelector.Item value="42" />
    <LabelSelector.Item value="43" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Vertical Layout</div>
            <div className="w-full flex items-center border rounded-lg justify-center min-h-[200px] p-4 md:p-10 relative bg-muted/30">
              <LabelSelector.Root defaultValue="M" className="flex-col items-start">
                <LabelSelector.Label value="Shirt Size" />
                <LabelSelector.Content className="gap-2">
                  <LabelSelector.Item value="XS" />
                  <LabelSelector.Item value="S" />
                  <LabelSelector.Item value="M" />
                  <LabelSelector.Item value="L" />
                  <LabelSelector.Item value="XL" />
                </LabelSelector.Content>
              </LabelSelector.Root>
            </div>
            <CodeBlockComponent
              code={[
                {
                  language: "tsx",
                  filename: "vertical-layout.tsx",
                  code: `<LabelSelector.Root defaultValue="M" className="flex-col items-start">
  <LabelSelector.Label value="Shirt Size" />
  <LabelSelector.Content className="gap-2">
    <LabelSelector.Item value="XS" />
    <LabelSelector.Item value="S" />
    <LabelSelector.Item value="M" />
    <LabelSelector.Item value="L" />
    <LabelSelector.Item value="XL" />
  </LabelSelector.Content>
</LabelSelector.Root>`,
                },
              ]}
            />
          </div>
        </div>
      </Content>

      <Content>
        <div className="flex flex-col gap-6 w-full">
          <div>
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="space-y-2 text-muted-foreground text-sm list-inside list-disc">
              <li>Built on Radix UI Radio Group primitives for accessibility</li>
              <li>Composable architecture with separate Root, Label, Content, and Item components</li>
              <li>Text label display with customizable values</li>
              <li>Multiple visual variants: default, outline, ghost, and solid</li>
              <li>Three size options: sm, default, and lg</li>
              <li>Configurable border radius: none, sm, md, lg, and full</li>
              <li>Visual selection state with border and background color changes</li>
              <li>Support for disabled states</li>
              <li>Flexible layout options (horizontal and vertical)</li>
              <li>Built with class-variance-authority for consistent variant handling</li>
              <li>Smooth transitions and hover effects</li>
              <li>Keyboard navigation and focus management</li>
              <li>Support for separate display labels and internal values</li>
              <li>Fully typed with TypeScript</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">LabelSelector.Root</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">value</code> - string - Currently selected value
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">onValueChange</code> - (value: string) =&gt; void -
                    Callback when value changes
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">defaultValue</code> - string - Default selected
                    value (uncontrolled)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string - Override default
                    container styles
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">LabelSelector.Label</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">value</code> - string (required) - The label text
                    to display
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">LabelSelector.Content</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string - Useful for customizing
                    gap spacing
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">children</code> - React.ReactNode -
                    LabelSelector.Item components
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">LabelSelector.Item</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">value</code> - string (required) - The internal
                    value for this option
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">label</code> - string - The display label (defaults
                    to value if not provided)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">variant</code> - &quot;default&quot; |
                    &quot;outline&quot; | &quot;ghost&quot; | &quot;solid&quot; - Visual style variant (default:
                    &quot;default&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">size</code> - &quot;sm&quot; | &quot;default&quot;
                    | &quot;lg&quot; - Size of the item (default: &quot;default&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">rounded</code> - &quot;none&quot; | &quot;sm&quot;
                    | &quot;md&quot; | &quot;lg&quot; | &quot;full&quot; - Border radius (default: &quot;lg&quot;)
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">disabled</code> - boolean - Whether the item is
                    disabled
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">className</code> - string - Additional custom
                    styles
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Use Cases</h2>
            <ul className="space-y-2 text-muted-foreground text-sm list-inside list-disc">
              <li>Product size selection (clothing, shoes, accessories)</li>
              <li>Plan or tier selection</li>
              <li>Billing frequency options</li>
              <li>Variant selection (colors as text, materials, etc.)</li>
              <li>Quantity or amount selection</li>
              <li>Any scenario requiring labeled options in a compact format</li>
            </ul>
          </div>
        </div>
      </Content>
    </PageWithBreadcrumbs>
  )
}
