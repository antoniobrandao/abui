"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

type StackAtBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl"

interface RadioTabsProps extends React.ComponentProps<typeof RadioGroupPrimitive.Root> {
  stackAtBreakpoint?: StackAtBreakpoint
  containerClassName?: string
}

function RadioTabs({ className, stackAtBreakpoint, containerClassName, ...props }: RadioTabsProps) {
  // Detect if any children contain descriptions to adjust container height
  const hasDescriptions = React.Children.toArray(props.children).some(child => {
    if (React.isValidElement(child) && child.props && typeof child.props === "object" && "children" in child.props) {
      const itemChildren = React.Children.toArray(child.props.children as React.ReactNode)
      return itemChildren.some(itemChild => {
        return React.isValidElement(itemChild) && itemChild.type === RadioTabsItemDescription
      })
    }
    return false
  })

  const containerStyles = cn(
    "flex gap-x-[2px] rounded-[6px] p-[2px]",
    !hasDescriptions && "h-[38px]",
    "bg-white dark:bg-zinc-900",
    "border",
    stackAtBreakpoint && getClassNamesForBreakpoint(stackAtBreakpoint),
    containerClassName,
  )

  return (
    <RadioGroupPrimitive.Root data-slot="radio-tabs" className={cn("w-full", className)} {...props}>
      <div className={containerStyles}>{props.children}</div>
    </RadioGroupPrimitive.Root>
  )
}

interface RadioTabsItemProps extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {
  children: React.ReactNode
}

function RadioTabsItem({ className, children, ...props }: RadioTabsItemProps) {
  // Check if children contain only text/simple content or structured components
  const hasStructuredChildren = React.Children.toArray(children).some(child => {
    return React.isValidElement(child) && (child.type === RadioTabsItemLabel || child.type === RadioTabsItemDescription)
  })

  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-tabs-item"
      className={cn(
        "group flex-1 overflow-hidden cursor-pointer",
        "px-[7px] py-[4px]",
        hasStructuredChildren
          ? "flex flex-col justify-center items-center text-center"
          : "flex justify-center items-center",
        "select-none outline-none rounded-[4px]",
        "transition-colors",
        "data-[state=checked]:bg-blue-500/5 dark:data-[state=checked]:bg-blue-500/10",
        "data-[state=checked]:border data-[state=checked]:border-blue-500",
        "hover:bg-muted/50",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        hasStructuredChildren && "px-10",
        className,
      )}
      {...props}
    >
      {hasStructuredChildren ? (
        children
      ) : (
        <span
          className={cn(
            "font-semibold text-[13px]",
            "overflow-hidden whitespace-nowrap text-ellipsis",
            "group-data-[state=checked]:text-blue-500",
            "text-muted-foreground",
          )}
        >
          {children}
        </span>
      )}
    </RadioGroupPrimitive.Item>
  )
}

interface RadioTabsItemLabelProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

function RadioTabsItemLabel({ className, children, ...props }: RadioTabsItemLabelProps) {
  return (
    <span
      data-slot="radio-tabs-item-label"
      className={cn(
        "font-semibold text-base",
        "overflow-hidden whitespace-nowrap text-ellipsis",
        "w-full",
        "group-data-[state=checked]:text-foreground",
        "text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

interface RadioTabsItemDescriptionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

function RadioTabsItemDescription({ className, children, ...props }: RadioTabsItemDescriptionProps) {
  return (
    <span
      data-slot="radio-tabs-item-description"
      className={cn(
        "text-sm",
        "group-data-[state=checked]:text-blue-500",
        "text-muted-foreground opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { RadioTabs, RadioTabsItem, RadioTabsItemLabel, RadioTabsItemDescription }

const getClassNamesForBreakpoint = (breakpoint: StackAtBreakpoint): string => {
  const breakpointClasses: Record<StackAtBreakpoint, string> = {
    sm: "flex-col gap-y-[2px] h-auto sm:flex-row sm:gap-x-[2px]",
    md: "flex-col gap-y-[2px] h-auto md:flex-row md:gap-x-[2px]",
    lg: "flex-col gap-y-[2px] h-auto lg:flex-row lg:gap-x-[2px]",
    xl: "flex-col gap-y-[2px] h-auto xl:flex-row xl:gap-x-[2px]",
    "2xl": "flex-col gap-y-[2px] h-auto 2xl:flex-row 2xl:gap-x-[2px]",
  }
  return breakpointClasses[breakpoint]
}
