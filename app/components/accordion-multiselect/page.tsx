"use client"

import * as React from "react"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import ExamplePlusCodeTabs from "@/components/custom/ExamplePlusCodeTabs"
import {
  AccordionMultiselect,
  AccordionMultiselectContent,
  AccordionMultiselectItem,
  AccordionMultiselectServiceItem,
  AccordionMultiselectTrigger,
  Service,
  ServiceCategory,
} from "@/registry/abui/ui/accordion-multiselect"

const componentName = "accordion-multiselect"

const categories: ServiceCategory[] = [
  {
    active: true,
    nanoid: "cat_nails",
    name: "Nails",
    description: "Hand and nail care",
  },
  {
    active: true,
    nanoid: "cat_face",
    name: "Face Treatments",
    description: "Facial care services",
  },
]

const services: Service[] = [
  {
    active: true,
    nanoid: "srv_mani_french",
    service_category_nanoid: "cat_nails",
    name: "French Manicure",
    duration: 45,
    price: 35,
  },
  {
    active: true,
    nanoid: "srv_mani_gel",
    service_category_nanoid: "cat_nails",
    name: "Gel Manicure",
    duration: 60,
    price: 45,
  },
  {
    active: true,
    nanoid: "srv_face_basic",
    service_category_nanoid: "cat_face",
    name: "Basic Facial",
    duration: 30,
    price: 50,
  },
  {
    active: true,
    nanoid: "srv_face_premium",
    service_category_nanoid: "cat_face",
    name: "Premium Facial",
    description: "Includes massage and mask",
    duration: 60,
    price: 85,
  },
]

// Helper to group services for the demo
const servicesByCategory = services.reduce(
  (acc, service) => {
    if (!acc[service.service_category_nanoid]) {
      acc[service.service_category_nanoid] = []
    }
    acc[service.service_category_nanoid].push(service)
    return acc
  },
  {} as Record<string, Service[]>,
)

export default function Page() {
  const registryItem = getRegistryItemFromJson(componentName)
  if (!registryItem) {
    return <p>No registry item found</p>
  }

  return (
    <div>
      <RegistryItemHeader
        registryItem={registryItem}
        source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/ui/accordion-multiselect.tsx"
      />
      <Content>
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Default</div>

            <ExamplePlusCodeTabs
              demoJSX={
                <div className="w-full max-w-md mx-auto border rounded-lg py-2 px-3">
                  <AccordionMultiselect>
                    {categories.map(category => (
                      <AccordionMultiselectItem key={category.nanoid} value={category.nanoid}>
                        <AccordionMultiselectTrigger className="px-2">{category.name}</AccordionMultiselectTrigger>
                        <AccordionMultiselectContent>
                          {servicesByCategory[category.nanoid]?.map(service => (
                            <AccordionMultiselectServiceItem
                              key={service.nanoid}
                              service={service}
                              className="px-3 py-3"
                            />
                          ))}
                        </AccordionMultiselectContent>
                      </AccordionMultiselectItem>
                    ))}
                  </AccordionMultiselect>
                </div>
              }
              code={{
                language: "tsx",
                filename: "example.tsx",
                code: `import {
  AccordionMultiselect,
  AccordionMultiselectContent,
  AccordionMultiselectItem,
  AccordionMultiselectServiceItem,
  AccordionMultiselectTrigger,
} from "@/registry/abui/ui/accordion-multiselect"

// ... data definitions ...

export default function Example() {
  return (
    <AccordionMultiselect>
      {categories.map((category) => (
        <AccordionMultiselectItem key={category.nanoid} value={category.nanoid}>
          <AccordionMultiselectTrigger>{category.name}</AccordionMultiselectTrigger>
          <AccordionMultiselectContent>
            {services
              .filter(s => s.service_category_nanoid === category.nanoid)
              .map((service) => (
                <AccordionMultiselectServiceItem key={service.nanoid} service={service} />
            ))}
          </AccordionMultiselectContent>
        </AccordionMultiselectItem>
      ))}
    </AccordionMultiselect>
  )
}
`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Controlled</div>

            <ExamplePlusCodeTabs
              demoJSX={<ControlledDemo />}
              code={{
                language: "tsx",
                filename: "controlled.tsx",
                code: `import * as React from "react"
import {
  AccordionMultiselect,
  AccordionMultiselectContent,
  AccordionMultiselectItem,
  AccordionMultiselectServiceItem,
  AccordionMultiselectTrigger,
} from "@/registry/abui/ui/accordion-multiselect"

export default function ControlledDemo() {
  const [selected, setSelected] = React.useState<string[]>(["srv_mani_french"])

  return (
    <div className="space-y-4">
      <AccordionMultiselect value={selected} onValueChange={setSelected}>
        {/* ... map categories and services ... */}
        {categories.map((category) => (
          <AccordionMultiselectItem key={category.nanoid} value={category.nanoid}>
            <AccordionMultiselectTrigger>{category.name}</AccordionMultiselectTrigger>
            <AccordionMultiselectContent>
              {servicesByCategory[category.nanoid]?.map((service) => (
                <AccordionMultiselectServiceItem key={service.nanoid} service={service} />
              ))}
            </AccordionMultiselectContent>
          </AccordionMultiselectItem>
        ))}
      </AccordionMultiselect>
      <div className="text-sm text-muted-foreground">
        Selected IDs: {selected.join(", ")}
      </div>
    </div>
  )
}
`,
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
              <li>Fully composable architecture using sub-components</li>
              <li>Built on top of Radix UI primitives (Accordion, Checkbox)</li>
              <li>Supports both controlled and uncontrolled selection states</li>
              <li>Accessible keyboard navigation and focus management</li>
              <li>Styling with Tailwind CSS and data-attributes</li>
              <li>Separation of layout and data logic</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">AccordionMultiselect</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">value</code> - string[] - Controlled selected
                    values
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">defaultValue</code> - string[] - Default selected
                    values for uncontrolled mode
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">onValueChange</code> - (value: string[]) =&gt; void
                    - Callback when selection changes
                  </li>
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">type</code> - &quot;multiple&quot; - Inherited from
                    Radix Accordion
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">AccordionMultiselectServiceItem</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="bg-muted rounded px-1.5 py-0.5">service</code> - Service - The service data object
                    containing name, price, duration, etc.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono text-sm font-medium">Other Components</h3>
                <p className="text-sm text-muted-foreground ml-4">
                  <code className="bg-muted rounded px-1.5 py-0.5">AccordionMultiselectItem</code>,{" "}
                  <code className="bg-muted rounded px-1.5 py-0.5">AccordionMultiselectTrigger</code>, and{" "}
                  <code className="bg-muted rounded px-1.5 py-0.5">AccordionMultiselectContent</code> correspond
                  directly to their Radix UI counterparts and accept the same props (className, children, etc.).
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">How It Works</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                The component uses a Compound Component pattern with React Context to share state between the parent and
                deeply nested children:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>AccordionMultiselect (Root):</strong> Manages the selection state (controlled or uncontrolled)
                  and provides it via Context. It wraps the Radix Accordion primitive.
                </li>
                <li>
                  <strong>Sub-components:</strong> <code>AccordionMultiselectItem</code>,{" "}
                  <code>AccordionMultiselectTrigger</code>, and <code>AccordionMultiselectContent</code> handle the
                  structural layout and accordion behavior using Radix primitives.
                </li>
                <li>
                  <strong>AccordionMultiselectServiceItem:</strong> Consumes the context to determine if its service ID
                  is selected. It renders the checkbox and label, and triggers updates via the context callback.
                </li>
                <li>
                  <strong>Data Attributes:</strong> Uses <code>data-state</code> and <code>data-slot</code> attributes
                  for reliable styling and animation hooks, consistent with the project architecture.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Content>
    </div>
  )
}

function ControlledDemo() {
  const [selected, setSelected] = React.useState<string[]>(["srv_mani_french"])

  return (
    <div className="w-full max-w-md mx-auto border rounded-lg p-4 space-y-4">
      <AccordionMultiselect value={selected} onValueChange={setSelected}>
        {categories.map(category => (
          <AccordionMultiselectItem key={category.nanoid} value={category.nanoid}>
            <AccordionMultiselectTrigger>{category.name}</AccordionMultiselectTrigger>
            <AccordionMultiselectContent>
              {servicesByCategory[category.nanoid]?.map(service => (
                <AccordionMultiselectServiceItem key={service.nanoid} service={service} />
              ))}
            </AccordionMultiselectContent>
          </AccordionMultiselectItem>
        ))}
      </AccordionMultiselect>
      <div className="p-4 bg-muted rounded-md text-sm">
        <span className="font-medium">Selected IDs:</span> {selected.length > 0 ? selected.join(", ") : "None"}
      </div>
    </div>
  )
}
