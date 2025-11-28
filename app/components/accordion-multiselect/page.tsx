"use client"

import * as React from "react"
import { type TOCItemType, TOCProvider, PageTOC, PageTOCItems } from "@/registry/abui/ui/toc"
import { getRegistryItemFromJson } from "@/lib/utils/registry"
import Content from "@/components/custom/Content"
import { RegistryItemHeader } from "@/components/custom/RegistryItemHeader"
import ExamplePlusCodeTabs from "@/components/custom/ExamplePlusCodeTabs"
import {
  AccordionMultiselect,
  AccordionMultiselectContent,
  AccordionMultiselectItem,
  AccordionMultiselectOption,
  AccordionMultiselectTrigger,
} from "@/registry/abui/ui/accordion-multiselect"

// --- Types for Demo ---
interface Service {
  active: boolean
  nanoid: string
  service_category_nanoid: string
  name: string
  description?: string
  duration: number
  price: number
}

interface ServiceCategory {
  active: boolean
  nanoid: string
  name: string
  description?: string
}

const componentName = "accordion-multiselect"

const tocItems: TOCItemType[] = [
  { title: "Examples", url: "#examples", depth: 2 },
  { title: "Default (With Checkbox)", url: "#default-with-checkbox", depth: 3 },
  { title: "Controlled (No Checkbox)", url: "#controlled-no-checkbox", depth: 3 },
  { title: "Features", url: "#features", depth: 2 },
  { title: "Component Props", url: "#component-props", depth: 2 },
  { title: "AccordionMultiselect", url: "#accordionmultiselect-props", depth: 3 },
  { title: "AccordionMultiselectOption", url: "#accordionmultiselectoption-props", depth: 3 },
]

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

function ServiceItemContent({ service }: { service: Service }) {
  return (
    <div className="grid gap-1.5 leading-none">
      <label
        htmlFor={service.nanoid}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
        onClick={e => e.stopPropagation()}
      >
        {service.name}
      </label>
      <div className="flex justify-between items-center text-muted-foreground text-sm">
        <span>{service.duration} min</span>
        <span>€{service.price.toFixed(2)}</span>
      </div>
      {service.description && <p className="text-sm text-muted-foreground">{service.description}</p>}
    </div>
  )
}

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
            source="https://github.com/antoniobrandao/abui/blob/master/registry/abui/ui/accordion-multiselect.tsx"
          />
          <Content>
            <div className="w-full flex flex-col gap-8" id="examples">
              <div className="flex flex-col gap-4" id="default-with-checkbox">
                <div className="text-sm font-medium">Default (With Checkbox)</div>

            <ExamplePlusCodeTabs
              demoJSX={
                <div className="w-full max-w-md mx-auto border rounded-lg py-2 px-3">
                  <AccordionMultiselect>
                    {categories.map(category => (
                      <AccordionMultiselectItem key={category.nanoid} value={category.nanoid}>
                        <AccordionMultiselectTrigger className="px-2">{category.name}</AccordionMultiselectTrigger>
                        <AccordionMultiselectContent>
                          {servicesByCategory[category.nanoid]?.map(service => (
                            <AccordionMultiselectOption
                              key={service.nanoid}
                              value={service.nanoid}
                              showCheckbox={true}
                              className="px-3 py-3"
                            >
                              <ServiceItemContent service={service} />
                            </AccordionMultiselectOption>
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
  AccordionMultiselectOption,
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
                <AccordionMultiselectOption 
                  key={service.nanoid} 
                  value={service.nanoid}
                  showCheckbox={true}
                >
                  <div className="grid gap-1.5 leading-none">
                    <div className="font-medium">{service.name}</div>
                    <div className="flex justify-between text-muted-foreground text-sm">
                      <span>{service.duration} min</span>
                      <span>€{service.price.toFixed(2)}</span>
                    </div>
                    {service.description && (
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    )}
                  </div>
                </AccordionMultiselectOption>
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

          <div className="flex flex-col gap-4" id="controlled-no-checkbox">
            <div className="text-sm font-medium">Controlled (No Checkbox)</div>

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
  AccordionMultiselectOption,
  AccordionMultiselectTrigger,
} from "@/registry/abui/ui/accordion-multiselect"

export default function ControlledDemo() {
  const [selected, setSelected] = React.useState<string[]>(["srv_mani_french"])

  return (
    <div className="space-y-4">
      <AccordionMultiselect value={selected} onValueChange={setSelected}>
        {categories.map((category) => (
          <AccordionMultiselectItem key={category.nanoid} value={category.nanoid}>
            <AccordionMultiselectTrigger>{category.name}</AccordionMultiselectTrigger>
            <AccordionMultiselectContent>
              {servicesByCategory[category.nanoid]?.map((service) => (
                <AccordionMultiselectOption 
                  key={service.nanoid} 
                  value={service.nanoid}
                  // showCheckbox={false} // Default
                >
                  <div>{service.name}</div>
                </AccordionMultiselectOption>
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
        <div className="flex flex-col gap-6 w-full" id="features">
          <div>
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="space-y-2 text-muted-foreground text-sm list-inside list-disc">
              <li>Fully composable architecture using sub-components</li>
              <li>Built on top of Radix UI primitives (Accordion, Checkbox)</li>
              <li>Supports both controlled and uncontrolled selection states</li>
              <li>Agnostic content model - render any React Node as an option</li>
              <li>Optional checkbox display</li>
              <li>Accessible keyboard navigation and focus management</li>
              <li>Styling with Tailwind CSS and data-attributes</li>
            </ul>
          </div>

          <div id="component-props">
            <h2 className="text-lg font-semibold mb-4">Component Props</h2>
            <div className="space-y-6">
              <div className="space-y-2" id="accordionmultiselect-props">
                <h3 className="font-mono text-sm font-medium">AccordionMultiselect</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="code-text">value</code> - string[] - Controlled selected
                    values
                  </li>
                  <li>
                    <code className="code-text">defaultValue</code> - string[] - Default selected
                    values for uncontrolled mode
                  </li>
                  <li>
                    <code className="code-text">onValueChange</code> - (value: string[]) =&gt; void
                    - Callback when selection changes
                  </li>
                </ul>
              </div>

              <div className="space-y-2" id="accordionmultiselectoption-props">
                <h3 className="font-mono text-sm font-medium">AccordionMultiselectOption</h3>
                <ul className="text-muted-foreground space-y-1 text-sm ml-4">
                  <li>
                    <code className="code-text">value</code> - string - The unique identifier for
                    this option (used in selection)
                  </li>
                  <li>
                    <code className="code-text">showCheckbox</code> - boolean - Whether to show the
                    checkbox (default: false)
                  </li>
                  <li>
                    <code className="code-text">children</code> - ReactNode - The content to
                    display
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

function ControlledDemo() {
  const [selected, setSelected] = React.useState<string[]>(["srv_mani_french"])

  return (
    <div className="w-full max-w-md mx-auto border rounded-lg p-4 space-y-4">
      <AccordionMultiselect value={selected} onValueChange={setSelected}>
        {categories.map(category => (
          <AccordionMultiselectItem key={category.nanoid} value={category.nanoid}>
            <AccordionMultiselectTrigger className="px-2">{category.name}</AccordionMultiselectTrigger>
            <AccordionMultiselectContent>
              {servicesByCategory[category.nanoid]?.map(service => (
                <AccordionMultiselectOption key={service.nanoid} value={service.nanoid} className="px-3 py-3">
                  <ServiceItemContent service={service} />
                </AccordionMultiselectOption>
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
