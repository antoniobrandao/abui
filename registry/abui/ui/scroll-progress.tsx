"use client"

import { motion, useScroll } from "motion/react"
import { cn } from "@/lib/utils"

interface ScrollProgressProps extends React.ComponentProps<typeof motion.div> {
  /**
   * Height of the progress bar in pixels
   * @default 2
   */
  height?: number
  /**
   * Color of the progress bar
   * @default "bg-primary"
   */
  color?: string
  /**
   * Position of the progress bar
   * @default "top"
   */
  position?: "top" | "bottom"
  /**
   * Container element to track scroll progress for
   * If not provided, tracks the entire viewport
   */
  container?: React.RefObject<HTMLElement | null>
}

function ScrollProgress({
  height = 4,
  color = "bg-primary",
  position = "top",
  className,
  container,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    container: container as any,
  })

  return (
    <motion.div
      data-slot="scroll-progress"
      className={cn(
        "left-0 right-0 z-50 origin-left",
        // Use fixed positioning for viewport scroll, allow override for container scroll
        !container && "fixed",
        position === "top" ? "top-0" : "bottom-0",
        color,
        className,
      )}
      style={{
        scaleX: scrollYProgress,
        height: `${height}px`,
      }}
      {...props}
    />
  )
}

export { ScrollProgress }
