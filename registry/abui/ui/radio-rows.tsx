"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

interface RadioRowsProps extends React.ComponentProps<typeof RadioGroupPrimitive.Root> {
  containerClassName?: string
}

function RadioRows({ className, containerClassName, ...props }: RadioRowsProps) {
  const containerStyles = cn("flex flex-col gap-y-1", "h-auto items-start", containerClassName)

  return (
    <RadioGroupPrimitive.Root data-slot="radio-rows" className={cn("w-full", className)} {...props}>
      <div className={containerStyles}>{props.children}</div>
    </RadioGroupPrimitive.Root>
  )
}

const radioRowsItemVariants = cva(
  [
    "group w-full",
    "p-3 pr-4 rounded-md relative flex items-center gap-x-3 justify-between",
    "transition-all duration-300 font-medium",
    "cursor-pointer select-none outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-2 border-muted-foreground/20",
          "bg-muted/5",
          "data-[state=checked]:bg-foreground data-[state=checked]:text-background data-[state=checked]:border-muted-foreground/20",
          "hover:border-muted-foreground/30",
        ],
        outline: [
          "border-2 border-muted-foreground/20",
          "bg-transparent",
          "data-[state=checked]:border-foreground data-[state=checked]:bg-foreground/5 data-[state=checked]:text-foreground",
          "hover:border-muted-foreground/30",
        ],
        primary: [
          "border-2 border-muted-foreground/20",
          "bg-transparent",
          "data-[state=checked]:border-primary data-[state=checked]:bg-primary/5 data-[state=checked]:text-foreground",
          "hover:border-muted-foreground/30",
        ],
        secondary: [
          "border border-muted-foreground/10",
          "bg-muted/5",
          "data-[state=checked]:bg-muted data-[state=checked]:border-muted-foreground/20 data-[state=checked]:text-foreground",
          "hover:bg-muted/10",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface RadioRowsItemProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioRowsItemVariants> {
  children: React.ReactNode
}

function RadioRowsItem({ className, variant = "default", children, ...props }: RadioRowsItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-rows-item"
      className={cn(radioRowsItemVariants({ variant }), className)}
      {...props}
    >
      {/* Custom Radio Indicator */}
      <div
        className={cn(
          "w-[19px] h-[19px] rounded-xl shrink-0 grow-0",
          "border-[3px]",
          "flex justify-center items-center",
          "transition-all duration-300",
          variant === "default" && ["border-muted-foreground/40", "group-data-[state=checked]:border-background"],
          variant === "outline" && ["border-muted-foreground/30", "group-data-[state=checked]:border-foreground"],
          variant === "primary" && ["border-muted-foreground/30", "group-data-[state=checked]:border-primary"],
          variant === "secondary" && ["border-muted-foreground/30", "group-data-[state=checked]:border-foreground"],
        )}
      >
        <div
          className={cn(
            "w-[9px] h-[9px] rounded-full",
            "transition-all duration-300",
            "opacity-0 scale-0",
            "group-data-[state=checked]:opacity-100 group-data-[state=checked]:scale-100",
            variant === "default" && "group-data-[state=checked]:bg-background",
            variant === "outline" && "bg-foreground",
            variant === "primary" && "bg-primary",
            variant === "secondary" && "bg-foreground",
          )}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-start gap-y-1 w-full">{children}</div>
    </RadioGroupPrimitive.Item>
  )
}

interface RadioRowsItemTitleProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

function RadioRowsItemTitle({ className, children, ...props }: RadioRowsItemTitleProps) {
  return (
    <p
      data-slot="radio-rows-item-title"
      className={cn("font-bold text-base tracking-normal leading-none", "transition-colors duration-300", className)}
      {...props}
    >
      {children}
    </p>
  )
}

interface RadioRowsItemDescriptionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

function RadioRowsItemDescription({ className, children, ...props }: RadioRowsItemDescriptionProps) {
  return (
    <p
      data-slot="radio-rows-item-description"
      className={cn(
        "text-sm font-medium leading-none",
        "text-muted-foreground",
        "transition-colors duration-300",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export { RadioRows, RadioRowsItem, RadioRowsItemTitle, RadioRowsItemDescription, radioRowsItemVariants }
