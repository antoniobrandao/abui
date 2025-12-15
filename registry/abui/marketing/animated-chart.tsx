"use client"

import * as React from "react"
import { useRef, useEffect, useMemo } from "react"
import { motion, useInView, useAnimationControls } from "motion/react"

import { cn } from "@/lib/utils"

interface ColumnData {
  title: string
  value: number
  /** String to prepend before the value (e.g., "$") */
  prependString?: string
  /** String to append after the value (e.g., "%") */
  appendString?: string
  /** Animation duration in seconds */
  animationDuration?: number
  /** Animation delay in seconds */
  animationDelay?: number
  /** ClassName applied to the animated column bar element */
  className?: string
  /** ClassName applied to the column's top border */
  topBorderClassName?: string
  /** ClassName applied to this column's title (overrides global titleClassName) */
  titleClassName?: string
  /** ClassName applied to this column's value (overrides global valueClassName) */
  valueClassName?: string
}

interface AnimatedChartProps extends React.ComponentPropsWithoutRef<"div"> {
  columns: ColumnData[]
  maxValue: number
  /** ClassName applied to all column titles */
  titleClassName?: string
  /** ClassName applied to all column values */
  valueClassName?: string
  /** When true, columns animate from zero whenever data changes. Default: false */
  restartOnDataChange?: boolean
}

interface AnimatedChartColumnProps extends React.ComponentPropsWithoutRef<"div"> {
  title: string
  value: number
  maxValue: number
  prependString?: string
  appendString?: string
  animationDuration: number
  animationDelay: number
  columnClassName?: string
  topBorderClassName?: string
  /** Global titleClassName from parent */
  globalTitleClassName?: string
  /** Global valueClassName from parent */
  globalValueClassName?: string
  /** Column-specific titleClassName (overrides global) */
  columnTitleClassName?: string
  /** Column-specific valueClassName (overrides global) */
  columnValueClassName?: string
  isInView: boolean
  isLast: boolean
  restartTrigger: number
}

function AnimatedChartColumn({
  title,
  value,
  maxValue,
  prependString,
  appendString,
  animationDuration,
  animationDelay,
  columnClassName,
  topBorderClassName,
  globalTitleClassName,
  globalValueClassName,
  columnTitleClassName,
  columnValueClassName,
  isInView,
  isLast,
  restartTrigger,
  className,
  ...props
}: AnimatedChartColumnProps) {
  const heightPercentage = (value / maxValue) * 100
  const heightPercentageRef = useRef(heightPercentage)
  heightPercentageRef.current = heightPercentage

  const barControls = useAnimationControls()
  const valueControls = useAnimationControls()

  // Handle animation when in view or when restart is triggered
  useEffect(() => {
    const animateFromZero = async () => {
      // Stop any running animations first
      barControls.stop()
      valueControls.stop()

      // Reset to zero instantly
      barControls.set({ height: 0 })
      valueControls.set({ opacity: 0 })

      // Small delay to ensure the reset is rendered before animating
      await new Promise(resolve => requestAnimationFrame(resolve))

      // Animate to target values
      if (isInView) {
        barControls.start({
          height: `${heightPercentageRef.current}%`,
          transition: {
            type: "spring",
            damping: 25,
            stiffness: 50,
            delay: animationDelay,
          },
        })

        valueControls.start({
          opacity: 1,
          transition: {
            delay: animationDelay + animationDuration * 0.5,
            duration: 0.3,
          },
        })
      }
    }

    animateFromZero()
  }, [restartTrigger, isInView, animationDelay, animationDuration, barControls, valueControls])

  return (
    <div
      data-slot="animated-charts-column"
      className={cn("relative flex-1 flex flex-col", !isLast && "border-r", className)}
      {...props}
    >
      {/* Title wrapper - fixed position at top of column */}
      <div data-slot="animated-charts-column-title-wrapper" className="absolute top-0 left-0 right-0 p-2 px-3">
        <span
          data-slot="animated-charts-column-title"
          className={cn("text-base font-normal text-foreground/50", globalTitleClassName, columnTitleClassName)}
        >
          {title}
        </span>
      </div>

      {/* Bar container - takes remaining space and aligns bar to bottom */}
      <div className="relative flex-1 flex flex-col justify-end border-t border-border/10">
        {/* Column bar */}
        <motion.div
          data-slot="animated-charts-column-bar"
          className={cn("relative w-full border-t-2 border-border/30 bg-muted/20", columnClassName, topBorderClassName)}
          initial={{ height: 0 }}
          animate={barControls}
        >
          {/* Value positioned at top-left inside the bar */}
          <motion.span
            data-slot="animated-charts-column-value"
            className={cn(
              "absolute top-2 left-3 text-base font-normal text-foreground",
              globalValueClassName,
              columnValueClassName,
            )}
            initial={{ opacity: 0 }}
            animate={valueControls}
          >
            {prependString && `${prependString} `}
            {value}
            {appendString && ` ${appendString}`}
          </motion.span>
        </motion.div>
      </div>
    </div>
  )
}

function AnimatedChart({
  columns,
  maxValue,
  titleClassName,
  valueClassName,
  restartOnDataChange = false,
  className,
  ...props
}: AnimatedChartProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  // Generate a data signature to detect changes
  const dataSignature = useMemo(() => {
    return JSON.stringify(columns.map(c => ({ title: c.title, value: c.value })))
  }, [columns])

  // Track restart trigger - increments when data changes (if restartOnDataChange is true)
  const restartTriggerRef = useRef(0)
  const prevDataSignatureRef = useRef(dataSignature)

  if (restartOnDataChange && prevDataSignatureRef.current !== dataSignature) {
    restartTriggerRef.current += 1
    prevDataSignatureRef.current = dataSignature
  }

  return (
    <div ref={ref} data-slot="animated-charts" className={cn("flex w-full gap-0 border", className)} {...props}>
      {columns.map((column, index) => (
        <AnimatedChartColumn
          key={index}
          title={column.title}
          value={column.value}
          maxValue={maxValue}
          prependString={column.prependString}
          appendString={column.appendString}
          animationDuration={column.animationDuration ?? 1}
          animationDelay={column.animationDelay ?? 0}
          columnClassName={column.className}
          topBorderClassName={column.topBorderClassName}
          globalTitleClassName={titleClassName}
          globalValueClassName={valueClassName}
          columnTitleClassName={column.titleClassName}
          columnValueClassName={column.valueClassName}
          isInView={isInView}
          isLast={index === columns.length - 1}
          restartTrigger={restartTriggerRef.current}
        />
      ))}
    </div>
  )
}

export { AnimatedChart, AnimatedChartColumn }
export type { AnimatedChartProps, AnimatedChartColumnProps, ColumnData }
