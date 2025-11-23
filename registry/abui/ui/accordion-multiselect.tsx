"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

// --- Architecture: Primitives (Unstyled but behaving) ---
// We are using Radix UI Accordion and Checkbox primitives directly.
// This component acts as a "Component" layer in the architecture:
// - Wraps primitives with styling
// - Supports controlled/uncontrolled usage
// - Uses data-attributes for state and slots for targeting

// --- Types ---
export interface Service {
  active: boolean
  nanoid: string
  service_category_nanoid: string
  name: string
  description?: string
  duration: number
  price: number
}

export interface ServiceCategory {
  active: boolean
  nanoid: string
  name: string
  description?: string
}

// --- Context ---
// We use a context to share selection state between the root and items/checkboxes
// This allows for the Compound Component pattern.
interface AccordionMultiselectContextValue {
  selectedValues: string[]
  onSelectionChange: (serviceId: string, checked: boolean) => void
}

const AccordionMultiselectContext = React.createContext<AccordionMultiselectContextValue | null>(null)

function useAccordionMultiselect() {
  const context = React.useContext(AccordionMultiselectContext)
  if (!context) {
    throw new Error("AccordionMultiselect subcomponents must be used within AccordionMultiselect")
  }
  return context
}

// --- Components ---

// We can't directly extend AccordionPrimitive.Root because it has specific props that might conflict or be typed in a way TS doesn't like for intersection
// Instead, we'll define our props and intersect with the primitive's props, excluding what we override/don't need if necessary
type AccordionRootProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>

interface AccordionMultiselectProps
  extends Omit<AccordionRootProps, "type" | "value" | "defaultValue" | "onValueChange"> {
  value?: string[]
  onValueChange?: (value: string[]) => void
  defaultValue?: string[]
}

function AccordionMultiselect({
  value: controlledValue,
  onValueChange,
  defaultValue = [],
  className,
  children,
  ...props
}: AccordionMultiselectProps) {
  // Controlled/Uncontrolled pattern
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue)
  const isControlled = controlledValue !== undefined
  const selectedValues = isControlled ? controlledValue : internalValue

  const handleSelectionChange = React.useCallback(
    (serviceId: string, checked: boolean) => {
      let newValues: string[]
      if (checked) {
        newValues = [...selectedValues, serviceId]
      } else {
        newValues = selectedValues.filter(id => id !== serviceId)
      }

      if (!isControlled) {
        setInternalValue(newValues)
      }
      onValueChange?.(newValues)
    },
    [selectedValues, isControlled, onValueChange],
  )

  return (
    <AccordionMultiselectContext.Provider value={{ selectedValues, onSelectionChange: handleSelectionChange }}>
      <AccordionPrimitive.Root
        type="multiple"
        data-slot="accordion-multiselect-root"
        className={cn("w-full space-y-4", className)}
        {...props}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionMultiselectContext.Provider>
  )
}

function AccordionMultiselectItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-multiselect-item"
      className={cn("border-b-0", className)}
      {...props}
    />
  )
}

function AccordionMultiselectTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-multiselect-trigger"
        className={cn(
          "flex flex-1 items-center justify-between py-2 font-semibold text-base transition-all hover:no-underline [&[data-state=open]>svg]:rotate-180 cursor-pointer",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionMultiselectContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-multiselect-content"
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pt-2 pb-4 flex flex-col gap-2", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

// --- Sub-components for Service Item ---

interface AccordionMultiselectServiceItemProps extends React.HTMLAttributes<HTMLDivElement> {
  service: Service
}

function AccordionMultiselectServiceItem({
  service,
  className,
  onClick,
  ...props
}: AccordionMultiselectServiceItemProps) {
  const { selectedValues, onSelectionChange } = useAccordionMultiselect()
  const isSelected = selectedValues.includes(service.nanoid)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onSelectionChange(service.nanoid, !isSelected)
    onClick?.(e)
  }

  return (
    <div
      data-slot="accordion-multiselect-service-item"
      data-state={isSelected ? "checked" : "unchecked"}
      className={cn(
        "flex items-start space-x-3 rounded-md group cursor-pointer transition-colors",
        "hover:bg-foreground/4 data-[state=checked]:bg-foreground/6",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <div className="flex items-center h-5 mt-1">
        <CheckboxPrimitive.Root
          id={service.nanoid}
          checked={isSelected}
          onCheckedChange={checked => onSelectionChange(service.nanoid, checked as boolean)}
          onClick={e => e.stopPropagation()}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-[3px] border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          )}
        >
          <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
            <Check className="h-4 w-4" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      </div>
      <div className="grid gap-1.5 leading-none flex-1">
        <label
          htmlFor={service.nanoid}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
          onClick={e => e.stopPropagation()} // Stop propagation from label to avoid double toggle (label click triggers input/button click + bubbles to div)
        >
          {service.name}
        </label>
        <div className="flex justify-between items-center text-muted-foreground text-sm">
          <span>{service.duration} min</span>
          <span>€{service.price.toFixed(2)}</span>
        </div>
        {service.description && <p className="text-sm text-muted-foreground">{service.description}</p>}
      </div>
    </div>
  )
}

export {
  AccordionMultiselect,
  AccordionMultiselectItem,
  AccordionMultiselectTrigger,
  AccordionMultiselectContent,
  AccordionMultiselectServiceItem,
}
