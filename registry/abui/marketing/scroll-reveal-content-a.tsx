"use client"

import React from "react"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useMotionValueEvent, useScroll } from "motion/react"

export const centralColumnStyle = "w-[90%] max-w-[1340px] mx-auto"
export const pageYPadding = "py-10 md:py-12 lg:py-20 xl:py-30 2xl:py-40"
const defaultTitleClass = "text-2xl md:text-3xl font-semibold mb-2 text-foreground"
const defaultDescriptionClass = "text-base md:text-lg font-medium mb-2 text-foreground max-w-[400px] leading-[130%]"
const imageClass =
  "absolute top-[50%] -translate-y-1/2 right-0 ml-auto w-auto h-[70vh] object-cover rounded-2xl transition-opacity duration-300"

export interface ItemContent {
  title: string
  description: string
  image: {
    url: string
    width: number
    height: number
    alt: string
  }
}

interface Props extends React.ComponentProps<"div"> {
  contentA: ItemContent
  contentB: ItemContent
  contentC: ItemContent
  titleClass?: string
  descriptionClass?: string
}

const ScrollRevealContentA = ({
  contentA,
  contentB,
  contentC,
  titleClass = defaultTitleClass,
  descriptionClass = defaultDescriptionClass,
  className,
  ...props
}: Props) => {
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const ref0 = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref0,
  })
  useMotionValueEvent(scrollYProgress, "change", () => {
    // @ts-ignore
    setScrollProgress(scrollYProgress.current)
  })

  return (
    <div className={cn("bg-background", className)} ref={ref0} {...props}>
      <div className="max-w-[90%] mx-auto">
        <div className="flex w-full mx-auto relative z-20">
          <div
            className={cn(centralColumnStyle, "sticky top-0 flex flex-col w-full items-start justify-center h-[100vh]")}
          >
            <div className="flex flex-row gap-16 md:gap-24 lg:gap-32 xl:gap-40 2xl:gap-48 w-full h-full">
              <div className="lg:!w-[50%] !w-full h-auto flex flex-col justify-center gap-10 md:gap-auto">
                <PointItem
                  active={true}
                  number="01"
                  title={contentA.title}
                  description={contentA.description}
                  thresholdStart={0}
                  thresholdEnd={0.33}
                  scrollProgress={scrollProgress}
                />
                <PointItem
                  active={true}
                  number="02"
                  title={contentB.title}
                  description={contentB.description}
                  thresholdStart={0.33}
                  thresholdEnd={0.66}
                  scrollProgress={scrollProgress}
                />
                <PointItem
                  active={true}
                  number="03"
                  title={contentC.title}
                  description={contentC.description}
                  thresholdStart={0.66}
                  thresholdEnd={1}
                  scrollProgress={scrollProgress}
                />
              </div>
              <div className="hidden lg:flex flex-col justify-center items-center !w-[50%] relative h-full">
                <Image
                  width={contentA.image.width}
                  height={contentA.image.height}
                  src={contentA.image.url}
                  alt={contentA.image.alt}
                  className={cn(imageClass, scrollProgress > -1 ? "opacity-100" : "opacity-0")}
                />
                <Image
                  width={contentB.image.width}
                  height={contentB.image.height}
                  src={contentB.image.url}
                  alt={contentB.image.alt}
                  className={cn(imageClass, scrollProgress > 0.33 ? "opacity-100" : "opacity-0")}
                />
                <Image
                  width={contentC.image.width}
                  height={contentC.image.height}
                  src={contentC.image.url}
                  alt={contentC.image.alt}
                  className={cn(imageClass, scrollProgress > 0.66 ? "opacity-100" : "opacity-0")}
                />
              </div>
            </div>
          </div>
          <div className="h-[300vh]" />
        </div>
      </div>
    </div>
  )
}

export default ScrollRevealContentA

const getBarPercentageHeight = (scrollProgress: number, thresholdStart: number, thresholdEnd: number) => {
  if (scrollProgress < thresholdStart) {
    return 0
  }
  if (scrollProgress > thresholdEnd) {
    return 100
  }
  return ((scrollProgress - thresholdStart) / (thresholdEnd - thresholdStart)) * 100
}

const PointItem = ({
  active,
  number,
  title,
  description,
  thresholdStart,
  thresholdEnd,
  scrollProgress,
}: {
  active: boolean
  number: string
  title: string
  description: string
  thresholdStart: number
  thresholdEnd: number
  scrollProgress: number
}) => {
  const barHeightPercentage = getBarPercentageHeight(scrollProgress, thresholdStart, thresholdEnd)
  const isActive = barHeightPercentage > 0
  return (
    <div className={cn("flex flex-col interactive w-full", active ? "opacity-100" : "opacity-50")}>
      <div className="w-full">
        <h3 className={cn(defaultTitleClass, "mb-4 ml-5", isActive ? "opacity-100" : "opacity-50")}>{number}</h3>
      </div>
      <div className="w-full flex relative left-[16px]">
        <div className="w-[70px] flex items-start justify-center relative">
          <div className="h-full w-[2px] bg-foreground/10 absolute top-0 left-[50%] -translate-x-1/2" />
          <div
            className="h-full w-[2px] bg-foreground absolute top-0 left-[50%] -translate-x-1/2"
            style={{ height: `${barHeightPercentage}%` }}
          />
        </div>
        <div className="w-[calc(100% - 40px)] pl-4">
          <div className="flex flex-col gap-1">
            <h3 className={cn(defaultTitleClass, isActive ? "opacity-100" : "opacity-50")}>{title}</h3>
            <p className={cn(defaultDescriptionClass, isActive ? "opacity-100" : "opacity-50")}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
